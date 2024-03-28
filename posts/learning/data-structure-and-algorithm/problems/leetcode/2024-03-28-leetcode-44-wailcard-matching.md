---
title: LeetCode 44. Wailcard Matching
description: LeetCode 44. Wailcard Matching 解題思路分享
date: 2024-03-28
lastUpdated: 2024-03-28
estimatedReadingTime: 3 min
tags:
  - LeetCode
  - Hard
  - String
  - Dynamic Programming
  - Greedy
  - Recursion
  - 44. Wailcard Matching
---

<p hidden>
LeetCode 44. Wailcard Matching 解題思路分享。
</p>

---

# LeetCode 44. Wailcard Matching

## 題目

[44. Wailcard Matching](https://leetcode.com/problems/wildcard-matching/)

## 解題思路

這種需要用兩個字串做計算的題目通常預設就是開一個二維陣列，然後決定垂直與水平軸分別表示哪個字串。這題我將假設二維陣列為 `dp`，垂直軸表示 `s` 字串，水平軸表示 `p` 字串。


### 狀態定義

狀態很簡單，`dp[i][j]` 表示 `s` 的 `0 ~ i` 個字元與 `p` 的 `0 ~ j` 個字元是否匹配。

### 狀態轉移函式

在 dp[i][j] 狀態時，`p[j]` 可能出現的字元種類分為三種情況 (這裡就不列出狀態轉移的數學式了，直接看三種情況分析)。

#### 1. `p[j] == '?'`

此時 `dp[i][j] = dp[i - 1][j - 1]`，因為 `'?'` 能匹配任意字元，因此狀態等於 `dp[i - 1][j - 1]`。

#### 2. `p[j] == '*'`

此時 `dp[i][j] = dp[i][j - 1] || dp[i - 1][j]`，因為 `'*'` 可以匹配任意長度字元或空字元，而 `dp[i][j - 1]` 表示 `'*'` 為空字串，`dp[i - 1][j]` 表示 `'*'` 匹配 `s[i]` 的字元，因此只要任一個狀態為 `true`，`dp[i][j]` 就是 `true`。

#### 3. `p[j] 為英文字母`

此時 `dp[i][j]` 則取決於 `s[i]` 與 `p[j]` 是否相等，若相等則 `dp[i][j]` 等於 `dp[i - 1][j - 1]`，若不相等表示不匹配。


## 程式碼

```cpp:line-numbers
class Solution {
public:
  bool isMatch(string s, string p) {
    int m = s.size(), n = p.size();

    // 初始化 dp 陣列，注意這裡要多一行多一列，因為 s 與 p 有可能是空字串，index 0 表示空字串。
    // 由於多了一行一列，所以後續 dp[i][j] 對應到的是 s[i - 1] 和 p[j - 1]。
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1));
    // 初始狀態
    dp[0][0] = true;
    // p 為空字串時，s 只要不是空字串就一定不匹配
    for (int i = 1; i <= m; ++i) {
      dp[i][0] = false;
    }
    // s 為空字串時，p 如果是 '*' 就需要看前一個狀態是否為 true 才能匹配
    // p 如果是 '?' 或英文字母，則一定不匹配，因為 s 是空字串
    for (int j = 1; j <= n; ++j) {
      dp[0][j] = p[j - 1] == '*' ? dp[0][j - 1] : false;
    }

    for (int i = 1; i <= m; ++i) {
      for (int j = 1; j <= n; ++j) {
        // 實作上述狀態轉移分析的三種情況
        if (p[j - 1] == '?') {
          dp[i][j] = dp[i - 1][j - 1];
        } else if (p[j - 1] == '*') {
          dp[i][j] = dp[i][j - 1] | dp[i - 1][j];
        } else {
          dp[i][j] = s[i - 1] == p[j - 1] ? dp[i - 1][j - 1] : false;
        }
      }
    }

    return dp[m][n];
  }
};
```
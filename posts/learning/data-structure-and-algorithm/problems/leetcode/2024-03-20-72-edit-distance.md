---
title: LeetCode 72. Edit Distance
description: LeetCode 72. Edit Distance 解題思路分享
date: 2024-03-20
lastUpdated: 2024-03-20
estimatedReadingTime: 5 min
tags:
  - LeetCode
  - Medium
  - Dynamic Programming
  - 72. Edit Distance
---

<p hidden>
LeetCode 72. Edit Distance 解題思路分享。
</p>

---

# 72. Edit Distance

## 題目

[72. Edit Distance](https://leetcode.com/problems/edit-distance/)

## 解題思路

這題要找出狀態轉移函式直接以二維陣列輔助比較方便理解，下圖以 `測資1` 為例，橫軸為 `word1` 字串，縱軸為 `word2` 字串，這裡先用 `'x'` 表示二維陣列裡每個欄位的值，等定義好狀態後再填入數字。

```
    j 0 1 2 3 4
      h o r s e
i    ----------
0 r | x x x x x
1 o | x x x x x
2 s | x x x x x
```

### 狀態定義
動態規劃一開始都要先定義狀態，首先假設二維陣列為 `dp`，那麽 `dp[i][j]` 表示 `word1` 的 `0 ~ i` 個字元與 `word2` 的 `0 ~ j` 個字元的最小編輯距離。舉例來說 `dp[2][1]` 表示 `"hor"` 與 `"ro"` 的最小編輯距離為 `2` (將 `"hor"` 字串中的 `'h'` 取代為 `'r'`，再把最後一個 `'r'` 刪除)，以下為二維陣列 `dp` 每個欄位的最小編輯距離數值。

```
    j 0 1 2 3 4
      h o r s e
i    ----------
0 r | 1 2 2 3 4
1 o | 2 1 2 3 4
2 s | 3 2 2 2 3
```

### 狀態轉移函式
接著要找出狀態轉移函式，`dp[i][j]` 有兩種情況，分別是 `word2[i]` 與 `word1[j]` 相等與不相等 (注意：word2 為縱軸，word1 為橫軸)。在相等的情況下，表示不需要進行任何操作，因此此時的最小編輯距離等於 `dp[i-1][j-1]`；在不相等的情況下，則有三種操作，分別是插入、刪除、取代，因此最小編輯距離等於 `dp[i-1][j]`、`dp[i][j-1]`、`dp[i-1][j-1]` 中的最小值再加 `1`。總結狀態轉移函式如下：

<p overflow-scroll>

$
f(i, j) = 
\left\{
\begin{aligned}
& f(i - 1, j - 1)                                    & , & \ if \ w2[i] == w1[i] \\
& min(f(i - 1, j),\ f(i, j - 1),\ f(i - 1, j - 1)) + 1 & , & \ else \\
\end{aligned}
\right.
$

</p>

:::tip 在不相等的情況
這裡補充不相等情況下的思路，首先既然 `word2[i]` 與 `word1[j]` 不相等，那麼就需要進行操作讓這兩個字串相等，為了清楚說明情況，因此再放一次 `測資1` 的二維陣列 `dp` 且填上每個欄位的最小編輯距離數值，並且依序來探討題目給的三種操作方式 (插入、刪除、取代)。
```
    j 0 1 2 3 4
      h o r s e
i    ----------
0 r | 1 2 2 3 4
1 o | 2 1 2 3 4
2 s | 3 2 2 2 3
```
- **插入**
  
  以 `dp[2][1]` 為例，這是 `"ho"` 轉換成 `"ros"` 的最小編輯距離，接著我們觀察 `dp[1][1]`，這是 `"ho"` 轉換成 `"ro"` 的最小編輯距離，那麽假設在 dp[1][1] 狀態下進行插入 `'s'` 到最後面的操作不就可以達到將 `"ho"` 轉換成 `"ros"` 的目的嗎？因此我們得知 `dp[i - 1][j] + 1` 到 `dp[i][j]` 其實是在進行插入操作 (+ 1 的意思表示進行 1 次操作，操作方式為插入)。

- **刪除**

  以 `dp[2][1]` 為例，這是 `"ho"` 轉換成 `"ros"` 的最小編輯距離，接著我們觀察 `dp[2][0]`，這是 `"h"` 轉換成 `"ros"` 的最小編輯距離，那要如何將 `dp[2][0]` 狀態轉換成 `dp[2][1]` 狀態呢？答案是刪除 `'o'` 字元，因此我們得知 `dp[i][j - 1] + 1` 到 `dp[i][j]` 其實是在進行刪除操作 (+ 1 的意思表示進行 1 次操作，操作方式為刪除)。

- **取代**

  以 `dp[2][2]` 為例，這是 `"hor"` 轉換成 `"ros"` 的最小編輯距離，接著我們觀察 `dp[1][1]`，這是 `"ho"` 轉換成 `"ro"` 的最小編輯距離，讀到這裡你應該可以反應過來了，將 `dp[1][1]` 狀態轉換成 `dp[2][2]` 狀態的操作方式是將 `'r'` 取代為 `'s'`，因此我們得知 `dp[i - 1][j - 1] + 1` 到 `dp[i][j]` 其實是在進行取代操作 (+ 1 的意思表示進行 1 次操作，操作方式為取代)。

總結以上三種操作方式，我們可以得知 `dp[i][j]` 的最小編輯距離等於 `dp[i-1][j]`、`dp[i][j-1]`、`dp[i-1][j-1]` 中的最小值再加 `1` (為什麼是最小值？因為是最小編輯距離，所以要取得當前情況下最優解)。
:::

## 程式碼

```cpp:line-numbers
class Solution {
public:
  int minDistance(string word1, string word2) {
    int m = word2.size(), n = word1.size();
    // 為了方便後續寫程式，這裡多宣告一行一列
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));

    // 這裡定義初始化狀態
    // dp[j][0] 表示 word2 為空字串，word1 需要進行 j 次刪除操作才能轉換成 word2
    // dp[0][i] 表示 word1 為空字串，word1 需要進行 i 次插入操作才能轉換成 word2
    dp[0][0] = 0;
    for (int j = 1; j <= n; ++j) dp[0][j] = j;
    for (int i = 1; i <= m; ++i) dp[i][0] = i;

    for (int i = 1; i <= m; ++i) {
      for (int j = 1; j <= n; ++j) {
        // 注意：word2 為縱軸，word1 為橫軸，且由於 i、j 都是從 1 開始因此要 -1
        if (word2[i - 1] == word1[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          int lt = dp[i - 1][j - 1];
          int t = dp[i - 1][j];
          int l = dp[i][j - 1];
          dp[i][j] = min(lt, min(t, l)) + 1;
        }
      }
    }

    return dp[m][n];
  }
};
```
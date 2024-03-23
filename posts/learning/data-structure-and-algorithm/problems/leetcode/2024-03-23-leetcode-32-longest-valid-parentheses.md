---
title: LeetCode 32. Longest Valid Parentheses
description: LeetCode 32. Longest Valid Parentheses 解題思路分享
date: 2024-03-23
lastUpdated: 2024-03-23
estimatedReadingTime: 5 min
tags:
  - LeetCode
  - Hard
  - String
  - Dynamic Programming
  - Stack
  - 32. Longest Valid Parentheses
---

<p hidden>
LeetCode 32. Longest Valid Parentheses 解題思路分享。
</p>

---

# LeetCode 32. Longest Valid Parentheses

## 題目

[32. Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)

## 解題思路

### 括號判斷

要判斷括號是否有效，首先要判斷左右括號數量是否相等，一個簡單的方法是設一個計數器，遇到 `'('` 字元時，將計數器加 `1`，遇到 `')'` 字元時，將計數器減 `1`，最後判斷計數器是否為 `0`。但這種方法還缺少判斷括號是否有效的條件，例如 `")("` 字串，雖然左右括號數量相等，但括號不是有效的。

這裡我們先透過計數器來分析數字的變化，這種變化可以畫成折線圖，例如 `")()())"` 字串，折線圖如下：


```
 1 |
 0 |\  /\  /\
-1 | \/  \/  \
-2 |          \
-3 |_____________
```

透過上述計數器原理，可以簡單推論出在折線圖上任意取兩個相同高度的點，此兩點間括號數量是相等的。

那要如何判斷括號是否有效呢？首先我們知道括號無效的情況就是 `')'` 數量大於 `'('` 數量，那假設折線圖上兩個相同高度的點，無效的情況就是兩點間的最低點比兩點高度還要低，例如上述例子中，`")("` 字串，最低點為 `-1`，而兩個高度為 `0` 的點，最低點 `-1` 比高度 `0` 還要低，因此這個例子是無效的。

現在我們知道如何判斷括號是否有效了，接下來就是要找到折線圖上`任兩個相同高度且符合有效括號的區段`，並`計算兩點間的距離`，最後`找出最長的距離`就是答案了。

### 解法

既然要找兩點間的距離，那就需要一個陣列 (假設為 `preX`) 來記錄每個高度的位置，但這個陣列需要紀錄的位置是`前一個同高度點的位置`，而且要`確保前一個點位到當前點位間的括號是有效的`，這樣才能計算兩點間的距離。

首先我們來分析折線圖上的點，可以發現有兩種情況，我把這兩種情況區分為 `遞增點位` 和 `遞減點位`，`遞增點位` 是指前一個點位比當前點位高度還要低，反之就是 `遞減點位`。

#### 遞增點位

先來分析 `遞增點位`，由於前一個點位的高度比當前點位高度還要低，因此當前點位與前一個同高度點位間的括號是無效的，所以只要更新位置到 `preX` 即可。

#### 遞減點位

接著分析 `遞減點位`，由於前一個點位的高度比當前點位高度還要高，因此當前點位與前一個同高度點位間的括號是有效的，這時就可以計算兩點間的距離，並更新答案。

最後有一個例外，在 `遞減點位` 的情況下，假設點位是處于 [波谷](https://zh.wikipedia.org/zh-tw/%E6%B3%A2%E8%B0%B7) 的位置，需要判斷前一個同高度點位是否存在，如果不存在，則需要更新位置到 `preX`。

## 程式碼

```cpp:line-numbers
class Solution {
public:
  int longestValidParentheses(string s) {
    int n = s.size();
    int res = 0;
    
    // 這裡的 preX 陣列是用來記錄前一個同高度點位的位置
    // 由於高度可能是負數，因此需要分配 2n+1 的空間 (正負最大值和 0)
    vector<int> preX((n << 1) + 1, -1);
    // zero 就是指在 preX 陣列中高度為 0 的 index
    int zero = n;
    // 記錄一開始高度為 0 的位置
    preX[zero] = 0;
    // preY 是前一個點位的高度, y 是當前點位的高度, 用來判斷遞增或遞減
    int preY = 0, y = 0;
    for (int i = 0; i < s.size(); ++i) {
      y += s[i] == '(' ? 1 : -1;
      // 計算當前點位的高度在 preX 陣列中的 index
      int _y = y + zero;

      if (preY < y) { // 遞增點位
        // 更新位置到 preX
        preX[_y] = i + 1;
      } else { // 遞減點位
        if (preX[_y] != -1) { // 前一個同高度點位存在
          // 計算兩點間的距離，並更新答案
          res = max(res, i + 1 - preX[_y]);
        } else if (i + 1 < s.size() && s[i + 1] == '(') { // 波谷點位
          // 更新位置到 preX
          preX[_y] = i + 1;
        }
      }

      preY = y;
    }

    return res;
  }
};
```

## 其他解法

這題我想的太複雜了，雖然時間複雜度跟其他方法是相同的，但空間複雜度是花費比較多的，而且程式碼和思路都比較複雜，有興趣的人可以去參考以下解法，分別是使用 `Stack` 和 `Two Pointers` 的方式解題，這兩種方法比較直覺且容易理解。
- [🚀 ✅100% , Detailed explaination 🔥 with Pictures ✅ 🔥 🚀O(n) , in C++ , Java , Python , stack. 🔥](https://leetcode.com/problems/longest-valid-parentheses/solutions/3401956/100-detailed-explaination-with-pictures-o-n-in-c-java-python-stack/)
- [💡Hint + ✅Solution || C++ || O( N ) || Full Detailed explanation || Neat code🤔 🤔](https://leetcode.com/problems/longest-valid-parentheses/solutions/4857872/hint-solution-c-o-n-full-detailed-explanation-neat-code/)
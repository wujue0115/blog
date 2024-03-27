---
title: LeetCode 42. Trapping Rain Water
description: LeetCode 42. Trapping Rain Water 解題思路分享
date: 2024-03-27
lastUpdated: 2024-03-27
estimatedReadingTime: 5 min
tags:
  - LeetCode
  - Hard
  - Array
  - Two Pointers
  - Dynamic Programming
  - Stack
  - Monotonic Stack
  - 42. Trapping Rain Water
---

<p hidden>
LeetCode 42. Trapping Rain Water 解題思路分享。
</p>

---

# LeetCode 42. Trapping Rain Water

## 題目

[42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

## 解題思路

我們可以將所有點位分成三種情況，分別為 `最高點位在最右邊`、`最高點位在最左邊` 和 `最高點位在中間`。

### 最高點位在最右邊

此情況我可以從左往右掃描，利用一個變數 `h` 來記錄左邊點位的高度，當掃描到比 `h` 高的點位時，我們就可以計算 `h` 和當前點位之間的水量，並將 `h` 更新為當前點位的高度。

### 最高點位在最左邊

此情況我們若是從左往右掃描會非常麻煩，以下圖舉例，首先我們用變數 `h` 紀錄 `a` 的高度，當掃描到 `b` 時，我們只能用 `b` 的高度做為水位高度來計算 `a 到 b` 之間的水量，此時將 `h` 更新為 `b` 的高度。接著，繼續掃描到 `c` 時，我們可以用 `b` 的高度來計算 `b 到 c` 之間的水量，但是由於 `c` 比 `b` 高，我們少計算到 `a 到 c` 之間比 `b` 高的水量。

```
    a
    /\           c
   /  \   b      /\
  /    \  /\    /  \
 /      \/  \  /    \
/            \/      \
```

上述情況會變得非常複雜，我們可能需要儲存所有掃描過的點位點位，並加上複雜的邏輯才能計算出正確的水量。這樣除了增加時間複雜度外，也讓程式變的很難寫。因此，其實可以換個角度想，如果我們從右往左掃描，不就回到解前一個 `最高點位在最右邊` 的問題了！只是反過來而已。

### 最高點位在中間

這個情況不代表最高點位一定在中間，而是表示最高點位左右兩邊都有數個點位。此時我們可以將問題拆解成上述兩個的問題，分別從左往右和從右往左掃描，最後將兩個結果相加即可。

:::warning 忽略的情況
注意！還有一種情況是有多個最高點位，前面我們只計算一矮一高點位之間的水量，沒有計算到等高點位之間的水量。解決方法也很簡單，就是遇到等高的點位時我們也一併計算水量，不過要注意由於我們有兩個方向的掃描，為了避免重複計算，等高的情況加在其中一個掃描方向即可。
:::

## 程式碼

```cpp:line-numbers
class Solution {
public:
  int trap(vector<int>& height) {
    int n = height.size();
    int res = 0;

    // 左邊點位的高度和 index
    int h = height[0], pi = 0;
    // 從左往右掃描
    for (int i = 1; i < n; ++i) {
      // 遇到等高的點位也一併計算水量
      if (h <= height[i]) {
        // 計算 h 和 height[i] 之間的水量
        for (int j = pi; j <= i; ++j) {
          res += h > height[j] ? h - height[j] : 0;
        }
        // 更新左邊點位的高度和 index
        h = height[i];
        pi = i;
      }
    }

    h = height[n - 1], pi = n - 1;
    // 從右往左掃描
    for (int i = n - 1; i >= 0; --i) {
      // 注意這裡不用計算等高點位，避免重複計算
      if (h < height[i]) {
        // 計算 h 和 height[i] 之間的水量
        for (int j = i; j <= pi; ++j) {
          res += h > height[j] ? h - height[j] : 0;
        }
        // 更新左邊點位的高度和 index
        h = height[i];
        pi = i;
      }
    }

    return res;
  }
};
```
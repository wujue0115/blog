---
title: 單例模式 (Singleton Pattern)
description: 此篇文章介紹了單例模式在 JavaScript 中的實作方式，包含了一般的單例模式、惰性單例模式、ES6 Module 單例模式、用代理模式 (Proxy Pattern) 封裝單例模式等。
date: 2024-07-12
lastUpdated: 2024-07-17
estimatedReadingTime: 5 min
tags:
  - Singleton Pattern
  - Proxy Pattern
  - GoF
  - Creational Pattern
  - Design Pattern
  - JavaScript
---

<p hidden>
此篇文章介紹了單例模式在 JavaScript 中的實作方式，包含了一般的單例模式、惰性單例模式、ES6 Module 單例模式、用代理模式 (Proxy Pattern) 封裝單例模式等。
</p>

---

# 單例模式 (Singleton Pattern)

單例模式的定義為「保證一個類別僅有一個實例，並提供一個全局訪問點」([JavaScript 設計模式與開發實踐](https://www.tenlong.com.tw/products/9787115388889?list_name=srh))。而單例模式在前端開發中最常見的場景就是彈跳提示框，當使用者在網頁上進行操作時，往往需要一些提示框來提醒使用者，而這種提示框通常只需要創建一次，之後就可以重複使用。

以下是一個簡單的單例模式的實作：

```js:line-numbers
class Singleton {
  // 用來保存唯一實例的靜態屬性，並且設置為私有
  static #instance = new this();

  // 透過此方法取得唯一實例
  static getInstance() {
    return this.#instance;
  }
}
```

使用方法：

```js:line-numbers
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true
```

## 惰性單例模式 (Lazy Singleton Pattern)

上面的實作方式在剛載入時就會創建實例，除了在程式初始化時多了不必要的運算外，也佔用了記憶體空間。而惰性單例模式是一種更好的實作方式，只有在真正使用時才會創建實例。

以下是將上面的實作改為惰性單例模式 (使用方法相同)：

```js:line-numbers
class Singleton {
  // 一開始不創建實例
  static #instance;

  static getInstance() {
    // 當第一次使用時才創建實例
    if (!this.#instance) {
      this.#instance = new this();
    }
    return this.#instance;
  }
}
```

### 使用 `getter` 實作惰性單例

另外也可以用 `getter` 的方式來實作 (參考自 [7 ways to create Singleton Pattern in JavaScript](https://itnext.io/7-ways-to-create-singleton-in-javascript-db95a75fbb76))，這個方法與前一個沒什麼差別，看個人喜好：

```js:line-numbers
class Singleton {
  static #instance;

  static get instance() {
    if (!this.#instance) {
      this.#instance = new this();
    }
    return this.#instance;
  }
}
```

使用方法：

```js:line-numbers
const instance1 = Singleton.instance;
const instance2 = Singleton.instance;

console.log(instance1 === instance2); // true
```

### 更好的實作方式？

上面的實作只要使用 new 方法就無法達到單例模式的效果，由於我們不能控制使用者如何創建實例，所以可以直接在 constructor 中實作單例的邏輯：

```js:line-numbers
class Singleton {
  static #instance;

  constructor() {
    if (!Singleton.#instance) {
      Singleton.#instance = this;
    }
    return Singleton.#instance;
  }
}
```

使用方法：

```js:line-numbers
const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
```

:::info 這是更好的嗎？
由於查到的資料中比較少用此方式來實作單例模式，所以這個可能不是我所說「更好」的方式，因此我才在標題後加上問號。但這個方式避免了使用者直接使用 new 來創建實例，而且也不需要再透過 `getInstance` 或 `getter` 來取得實例，因此**我認為這個寫法更加的優雅**，若是讀者有更好的實作方式，或是對於這個寫法有疑問，歡迎透過任何方式聯絡我。
:::

## ES6 Module 下的單例模式

在 ES6 Module 中，每個模組都是單例的 ([ES Module 本身就是單例](https://pjchender.dev/pattern/design-pattern-singleton/#es-module-%E6%9C%AC%E8%BA%AB%E5%B0%B1%E6%98%AF%E5%96%AE%E4%BE%8B))，因此我們可以直接在摸組中定義類別，並且再創建一個實例後導出，這樣就可以達到單例模式的效果。

```js:line-numbers
class Singleton {
  constructor() {
    // ...
  }
}

export const instance = new Singleton();
```

使用方法：

```js:line-numbers
import { instance } from './Singleton.js';
```

:::info 這是惰性單例嗎？
沒錯，這種方式也是惰性單例模式，因為只有在真正引入模組時才會創建實例，而引入模組表示我們需要使用這個實例。
:::

## 用代理模式 (Proxy Pattern) 來封裝單例模式

上面的方式都需要在類別中實作單例模式，若每個需要單例模式的類別都要實作一次，會讓程式碼重複性增加，因此可以使用代理模式，將單例模式的邏輯抽離出來，讓所有需要單例的類別都可以使用。

以下是用代理模式實作單例模式 (此程式碼參考 [How can I implement a singleton in JavaScript?](https://www.30secondsofcode.org/js/s/singleton-proxy/))：

```js:line-numbers
const singletonProxy = (className) => {
  // 利用閉包保存私有實例
  let instance;
  // 透過 Proxy 來管理類別創建的過程
  return new Proxy(className.prototype.constructor, {
    // 當使用 new 關鍵字時，會觸發此方法
    construct: (target, arguments) => {
      if (!instance) {
        instance = new target(...arguments);
      }
      return instance;
    }
  });
}
```

使用方法：

```js:line-numbers
class MyClass {
  constructor() {
    // ...
  }
}

const SingletonMyClass = singletonProxy(MyClass);

const instance1 = new SingletonMyClass();
const instance2 = new SingletonMyClass();

console.log(instance1 === instance2); // true
```

## 結論

此篇文章提供了幾種單例模式在 JavaScript 中的實作方式，單例模式的實作方式有很多種，推薦有興趣的讀者可以多去查資料，例如 [7 ways to create Singleton Pattern in JavaScript](https://itnext.io/7-ways-to-create-singleton-in-javascript-db95a75fbb76) 這篇文章就提供了 7 種不同的實作方式，並且介紹了每種方式的優缺點，非常推薦讀者閱讀。

### 參考資料

- [JavaScript 設計模式與開發實踐](https://www.tenlong.com.tw/products/9787115388889?list_name=srh)
- [7 ways to create Singleton Pattern in JavaScript](https://itnext.io/7-ways-to-create-singleton-in-javascript-db95a75fbb76)
- [[GoF] 單例模式 Singleton | PJCHENder 未整理筆記](https://pjchender.dev/pattern/design-pattern-singleton/)
- [How can I implement a singleton in JavaScript?](https://www.30secondsofcode.org/js/s/singleton-proxy/)
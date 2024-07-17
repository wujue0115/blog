---
title: 工廠模式 (Factory Pattern)
description: 此篇文章用故事的方式介紹了三種工廠模式：簡單工廠模式 (Simple Factory Pattern)、工廠方法模式 (Factory Method Pattern) 和抽象工廠模式 (Abstract Factory Pattern)，並透過 TypeScript 實作，希望能幫助讀者更好的理解工廠模式。
date: 2024-07-17
lastUpdated: 2024-07-17
estimatedReadingTime: 10 min
tags:
  - Factory Pattern
  - Simple Factory Pattern
  - Factory Method Pattern
  - Abstract Factory Pattern
  - Design Pattern
  - GoF
  - TypeScript
---

<p hidden>
此篇文章用故事的方式介紹了三種工廠模式：簡單工廠模式 (Simple Factory Pattern)、工廠方法模式 (Factory Method Pattern) 和抽象工廠模式 (Abstract Factory Pattern)，並透過 TypeScript 實作，希望能幫助讀者更好的理解工廠模式。
</p>

---

# 工廠模式 (Factory Pattern)

工廠模式是非常實用的設計模式，透過工廠管理物件的創建方式，將物件的創建和使用方法分離，使得程式碼更加模組化，不論是在維護或擴展上都更加方便。工廠模式分為三種：簡單工廠模式、工廠方法模式和抽象工廠模式，我在剛開始學習時非常難理解這三者的區別，在理解之後發現其實概念並不難，因此這篇文章想用自己覺得比較能理解的方式 (說故事) 來介紹工廠模式，希望能幫助有同樣問題的人，那就讓我們開始吧！

在開始之前先了解背景故事：

<div text-justify>

> 小明是一個很喜歡吃甜食的人，而且他特別喜歡吃蛋糕，在長大之後，為了讓喜歡吃蛋糕的小朋友都能吃到好吃的蛋糕 (其實是要讓自己隨時都能做蛋糕來吃，滿足自己的口腹之慾)，於是他靠著自己努力打工賺錢，最後終於開了一家蛋糕店。

> 就這樣蛋糕店開幕了，小明也推出了第一款蛋糕：巧克力蛋糕。藉著他多年來吃蛋糕的經驗，以及之前打工下班後偷偷研究做蛋糕的技巧，小明的巧克力蛋糕有著非常獨特的口感和味道，讓很多人都讚不絕口。但在蛋糕店生意越來越好的情況下，小明也變的越來越忙，因為他都是自己做蛋糕，而且為了新鮮，他會在客人點完蛋糕後才去廚房做，於是小明開始思考，要怎麼樣才能讓自己的蛋糕店生意更好，同時自己也不用那麼忙。

> 聰明的小明很快就想到方法了，他決定打造一台 `巧克力蛋糕製造機`，這台機器可以做出和他做的一樣好吃的蛋糕，而且做的速度比他快很多，於是小明匆忙的設計好 `蛋糕製造機的藍圖` 後就連夜趕工去製造了。在機器製造完成後，現在小明只要在客人點蛋糕時，然後走到廚房對著機器按下開始製作的按鈕，機器就會開始製作蛋糕，而小明則可以回到櫃檯繼續接待客人，生意也變的更好了。

以下是 `蛋糕製造機藍圖` 的實作：

```ts:line-numbers
// 蛋糕製造機藍圖 (定義蛋糕類別介面)
type TCake = {
  // 蛋糕尺寸
  size: number;

  // 包裝蛋糕
  package: () => void;
};
```

以下為`巧克力蛋糕製造機`的實作：

```ts:line-numbers
// 巧克力蛋糕製造機
class ChocolateCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Chocolate cake of size ${this.size} is packaged.`);
  }
}
```

> 隨著生意越來越好，小明覺得是時候推出新的蛋糕了，於是他決定推出草莓蛋糕，並仿造之前的方式做了一台 `草莓蛋糕製造機`。現在，小明的蛋糕店有兩個種類的蛋糕了，客人有了更多選擇，生意也變的更好了。

以下為`草莓蛋糕製造機`的實作：

```ts:line-numbers
// 草莓蛋糕製造機
class StrawberryCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Strawberry cake of size ${this.size} is packaged.`);
  }
}
```

> 但是小明也發現了一件事，每當一個客人點完蛋糕時，他就要去廚房按下製作蛋糕的按鈕，然後再回櫃台接待客人，等蛋糕製作完成後再去廚房包裝好，接著再回櫃台給客人，反覆的來回讓小明疲憊不堪，而且也不是很有效率。

以下是模擬小明為客人製作蛋糕的過程：

```ts:line-numbers
// 製作巧克力蛋糕
const chocolateCake = new ChocolateCake(10);
// 包裝蛋糕
chocolateCake.package();

// 製作草莓蛋糕
const strawberryCake = new StrawberryCake(8);
// 包裝蛋糕
strawberryCake.package();
```

</div>

## 簡單工廠模式 (Simple Factory Pattern)

> 聰明的小明很快又想到了一個方法，他製作了一台 `蛋糕管理機`，這台機器讓小明可以直接在櫃檯上按下製作蛋糕的按鈕，機器就會判斷要製作的蛋糕種類，然後命令對應的蛋糕製造機開始製作蛋糕，製作完成後，管理機會將蛋糕包裝好，最後再透過輸送帶送至櫃檯，這樣小明就可以在櫃檯專心接待客人，不用再來回奔波了。

在這個故事中，小明的 `蛋糕管理機` 就是一個 `簡單工廠`，它將製作蛋糕的過程封裝起來，讓小明不用再去廚房控制蛋糕製造機，一切都交給蛋糕管理機去處理。以下是 `簡單工廠模式` 的實作：

::: code-group

```ts:line-numbers [CakeFactory.ts]
//  蛋糕管理機 (蛋糕工廠)
class CakeFactory {
  static createCake(type: string, size: number): TCake {
    // 根據蛋糕種類創建對應的蛋糕，並在包裝後回傳蛋糕實體
    switch (type) {
      case 'chocolate':
        const chocolateCake = new ChocolateCake(size);
        chocolateCake.package();
        return chocolateCake;

      case 'strawberry':
        const strawberryCake = new StrawberryCake(size);
        strawberryCake.package();
        return strawberryCake;

      default:
        throw new Error('Invalid cake type!');
    }
  }
}
```

```ts:line-numbers [ChocolateCake.ts]
class ChocolateCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Chocolate cake of size ${this.size} is packaged.`);
  }
}
```

```ts:line-numbers [StrawberryCake.ts]
class StrawberryCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Strawberry cake of size ${this.size} is packaged.`);
  }
}
```

```ts:line-numbers [types.ts]
type TCake = {
  size: number;
  package: () => void;
};
```

:::

以下是使用 `簡單工廠模式` 後的蛋糕製作過程：

```ts:line-numbers
// 製作包裝好的巧克力蛋糕
const chocolateCake = CakeFactory.createCake('chocolate', 10);

// 製作包裝好的草莓蛋糕
const strawberryCake = CakeFactory.createCake('strawberry', 8);
```

## 工廠方法模式 (Factory Method Pattern)

> 藉著 `蛋糕管理機` 這台方便又有效率的機器，小明覺得可以繼續推出新的蛋糕了，並決定了下一個蛋糕是檸檬蛋糕，於是開始著手打造 `檸檬蛋糕製造機`。在製造完成後，小明準備修改 `蛋糕管理機`，要讓它也可以管理製作檸檬蛋糕的流程，但問題來了，如果要將 `檸檬蛋糕製造機` 的輸送帶連接進 `蛋糕管理機`，就需要拆開 `蛋糕管理機` 的外殼，然後再接上 `檸檬蛋糕製造機` 的輸送帶，接著再裝回去，這樣的方式不僅非常消耗時間，若是未來每推出一種新的蛋糕都要這麼做，那 `蛋糕管理機` 內部只會越來越複雜，而且也不是很好維護。

> 當然這個問題是難不倒小明的，他馬上想到了一個方法，只要將每種蛋糕對應到一個特定的 `蛋糕管理機`，例如：`巧克力蛋糕管理機` 負責管理製作巧克力蛋糕的流程、`草莓蛋糕管理機` 負責管理製作草莓蛋糕的流程。由於每個 `蛋糕管理機` 都是使用相同的設計藍圖，因此每當推出新的蛋糕時，只要按照藍圖再新增一個對應的 `蛋糕管理機` 就可以了，不管是在維護或擴充上都非常方便。

在故事中，原本小明要推出新的蛋糕時，都要 `修改蛋糕管理機` 的內部結構，這樣的方式其實違反了 `開放封閉原則 (Open-Closed Principle)`，因此將 `蛋糕管理機抽象成類別介面`，然後讓`每種蛋糕的管理機都依照這個介面來實作`，這樣就可以保持每個蛋糕管理機 `封閉性`，同時在 `擴展` 上只要實作新的蛋糕管理機就好了，這就是 `工廠方法模式`。

以下是 `蛋糕管理機藍圖` 的實作：

```ts:line-numbers
// 蛋糕管理機藍圖 (蛋糕工廠抽象介面)
// 這裡可以使用抽象類別或介面，使用抽象類別可以提供一些共用的方法，例如：生成訂單號碼
abstract class AbstractCakeFactory {
  abstract createCake(size: number): TCake;
}
```

以下是 `巧克力蛋糕管理機` 的實作：

::: code-group

```ts:line-numbers [ChocolateCakeFactory.ts]
// 巧克力蛋糕管理機 (巧克力蛋糕工廠)
class ChocolateCakeFactory extends AbstractCakeFactory {
  createCake(size: number) {
    const chocolateCake = new ChocolateCake(size);
    chocolateCake.package();
    return chocolateCake;
  }
}
```

```ts:line-numbers [ChocolateCake.ts]
class ChocolateCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Chocolate cake of size ${this.size} is packaged.`);
  }
}
```

```ts:line-numbers [types.ts]
type TCake = {
  size: number;
  package: () => void;
};

abstract class AbstractCakeFactory {
  abstract createCake(size: number): TCake;
}
```

:::

以下是 `草莓蛋糕管理機` 的實作：

::: code-group

```ts:line-numbers [StrawberryCakeFactory.ts]
// 草莓蛋糕管理機 (草莓蛋糕工廠)
class StrawberryCakeFactory extends AbstractCakeFactory {
  createCake(size: number) {
    const strawberryCake = new StrawberryCake(size);
    strawberryCake.package();
    return strawberryCake;
  }
}
```

```ts:line-numbers [StrawberryCake.ts]
class StrawberryCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Strawberry cake of size ${this.size} is packaged.`);
  }
}
```

```ts:line-numbers [types.ts]
type TCake = {
  size: number;
  package: () => void;
};

abstract class AbstractCakeFactory {
  abstract createCake(size: number): TCake;
}
```

:::

以下是使用 `工廠方法模式` 後的蛋糕製作過程：

```ts:line-numbers
// 巧克力蛋糕管理機
const chocolateCakeFactory = new ChocolateCakeFactory();
// 製作包裝好的巧克力蛋糕
const chocolateCake = chocolateCakeFactory.createCake(10);

// 草莓蛋糕管理機
const strawberryCakeFactory = new StrawberryCakeFactory();
// 製作包裝好的草莓蛋糕
const strawberryCake = strawberryCakeFactory.createCake(8);
```

## 抽象工廠模式 (Abstract Factory Pattern)

> 就這樣蛋糕店的知名度越來越高，小明又開始計劃新的產品了，這次他想要推出以口味為主的甜點禮盒，例如：巧克力甜點禮盒包含巧克力蛋糕、巧克力泡芙等甜點，而草莓甜點禮盒則包含草莓蛋糕、草莓泡芙等甜點。這次小明從先前的經驗學乖了，沒有馬上開始製作機器，而是先思考有什麼問題，很快他就發現了一個問題，如果依照先前的方式，每個產品都要有一個 `管理產品的機器` (巧克力泡芙管理機、巧克力餅乾管理機等)，那他絕對會累死，而且目前蛋糕店也沒有那麼多空間可以放這麼多機器。

> 從前面的故事中讀者已經知道小明是一個非常聰明的人，他思考了一下拿起筆開始修改 `蛋糕管理機藍圖`，新的藍圖將 `管理產品的機器` 改成 `管理一系列產品的機器`，例如：`巧克力產品管理機` 負責管理巧克力系列的產品、`草莓產品管理機` 負責管理草莓系列的產品。這樣就不用再為每個產品都做一台管理機器了。

在這個故事中，小明將 `管理產品的機器` 抽象成 `管理一系列產品的機器`，透過抽象將相同系列的產品統一給工廠管理，這就是 `抽象工廠模式`。

以下是 `蛋糕` 和 `泡芙` 的製造機藍圖：

```ts:line-numbers
// 蛋糕製造機藍圖 (蛋糕類別介面)
type TCake = {
  size: number;
  package: () => void;
};

// 泡芙製造機藍圖 (泡芙類別介面)
type TPuff = {
  package: () => void;
};
```

以下是 `產品管理機藍圖` 的實作：

```ts:line-numbers
// 產品管理機藍圖 (產品工廠抽象介面)
abstract class AbstractProductFactory {
  abstract createCake(size: number): TCake;
  abstract createPuff(): TPuff;
}
```

以下是 `巧克力產品管理機` 的實作：

::: code-group

```ts:line-numbers [ChocolateProductFactory.ts]
// 巧克力產品管理機 (巧克力產品工廠)
class ChocolateProductFactory extends AbstractProductFactory {
  createCake(size: number) {
    const chocolateCake = new ChocolateCake(size);
    chocolateCake.package();
    return chocolateCake;
  }

  createPuff() {
    const chocolatePuff = new ChocolatePuff();
    chocolatePuff.package();
    return chocolatePuff;
  }
}
```

```ts:line-numbers [ChocolateCake.ts]
class ChocolateCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Chocolate cake of size ${this.size} is packaged.`);
  }
}
```

```ts:line-numbers [ChocolatePuff.ts]
class ChocolatePuff implements TPuff {
  package() {
    console.log(`Chocolate puff is packaged.`);
  }
}
```

```ts:line-numbers [types.ts]
type TCake = {
  size: number;
  package: () => void;
};

type TPuff = {
  package: () => void;
};

abstract class AbstractProductFactory {
  abstract createCake(size: number): TCake;
  abstract createPuff(): TPuff;
}
```

:::

以下是 `草莓產品管理機` 的實作：

::: code-group

```ts:line-numbers [StrawberryProductFactory.ts]
// 草莓產品管理機 (草莓產品工廠)
class StrawberryProductFactory extends AbstractProductFactory {
  createCake(size: number) {
    const strawberryCake = new StrawberryCake(size);
    strawberryCake.package();
    return strawberryCake;
  }

  createPuff() {
    const strawberryPuff = new StrawberryPuff();
    strawberryPuff.package();
    return strawberryPuff;
  }
}
```

```ts:line-numbers [StrawberryCake.ts]
class StrawberryCake implements TCake {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  package() {
    console.log(`Strawberry cake of size ${this.size} is packaged.`);
  }
}
```

```ts:line-numbers [StrawberryPuff.ts]
class StrawberryPuff implements TPuff {
  package() {
    console.log(`Strawberry puff is packaged.`);
  }
}
```

```ts:line-numbers [types.ts]
type TCake = {
  size: number;
  package: () => void;
};

type TPuff = {
  package: () => void;
};

abstract class AbstractProductFactory {
  abstract createCake(size: number): TCake;
  abstract createPuff(): TPuff;
}
```

:::

以下是使用 `抽象工廠模式` 後的產品製作過程：

```ts:line-numbers
// 巧克力產品管理機
const chocolateProductFactory = new ChocolateProductFactory();
// 製作包裝好的巧克力蛋糕
const chocolateCake = chocolateProductFactory.createCake(10);
// 製作包裝好的巧克力泡芙
const chocolatePuff = chocolateProductFactory.createPuff();

// 草莓產品管理機
const strawberryProductFactory = new StrawberryProductFactory();
// 製作包裝好的草莓蛋糕
const strawberryCake = strawberryProductFactory.createCake(8);
// 製作包裝好的草莓泡芙
const strawberryPuff = strawberryProductFactory.createPuff();
```

## 結論

透過這個故事，我們了解了 `工廠模式` 的三種實作方式：`簡單工廠模式`、`工廠方法模式` 和 `抽象工廠模式`，都是很實用的設計模式，也是在開發過程中比較常會遇到的情境，其實只要理解這三種模式的概念，自然而然就會在開發過程中使用，最後感謝讀者耐心的讀完這個故事，希望能幫助你更好的理解 `工廠模式`！

### 參考資料

- [TypeScript 設計模式之工廠](https://github.com/brookshi/Blog/blob/master/design%20pattern/TypeScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B9%8B%E5%B7%A5%E5%8E%82.md)
- [設計模式學習筆記](https://skyyen999.gitbooks.io/-study-design-pattern-in-java/content/)
- [設計模式 - 工廠方法及抽象工廠](https://blog.techbridge.cc/2017/05/22/factory-method-and-abstract-factory/?source=post_page-----8c28d29cb3ac--------------------------------)
- [設計模式 - 工廠與抽象工廠 (Factory & Abstract Factory Design Pattern)](https://medium.com/wenchin-rolls-around/%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F-%E5%B7%A5%E5%BB%A0%E8%88%87%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%BB%A0-factory-abstract-factory-design-pattern-8c28d29cb3ac)
- [JavaScript 設計模式 : 工廠模式](https://medium.com/walkout/js-%E5%8E%9F%E5%8A%9B%E8%A6%BA%E9%86%92-%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F-%E5%B7%A5%E5%BB%A0%E6%A8%A1%E5%BC%8F-dfc094f06e78)
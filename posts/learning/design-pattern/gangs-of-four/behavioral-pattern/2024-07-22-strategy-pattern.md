---
title: 策略模式 (Strategy Pattern)
description: 此文章透過計算機運算的例子來介紹策略模式 (Strategy Pattern) 的概念和實作方式，並提供了用 Class 和 Function 兩種方式來實現策略模式，還介紹了如何使用 Lookup Table 管理策略行為，最後則是使用策略模式封裝表單驗證的 Vue 3 Composable 實作方式。
date: 2024-07-22
lastUpdated: 2024-08-02
estimatedReadingTime: 8 min
tags:
  - Strategy Pattern
  - GoF
  - Behavioral Pattern
  - Design Pattern
  - TypeScript
---

<p hidden>
此文章透過計算機運算的例子來介紹策略模式 (Strategy Pattern) 的概念和實作方式，並提供了用 Class 和 Function 兩種方式來實現策略模式，還介紹了如何使用 Lookup Table 管理策略行為，最後則是使用策略模式封裝表單驗證的 Vue 3 Composable 實作方式。
</p>

---

# 策略模式 (Strategy Pattern)

策略模式的定義為「定義一系列的算法，把它們一個個封裝起來，並且使它們可以互相替換」([JavaScript 設計模式與開發實踐](https://www.tenlong.com.tw/products/9787115388889?list_name=srh))。策略模式在很多場景下都可以使用，我認為是一個非常實用的設計模式，也是我最喜歡的設計模式之一。

來看一個簡單的例子，假設我們要實現計算機運算功能，可以進行加、減、乘、除四種運算，先看看不使用策略模式的實作：

```ts:line-numbers
type TOperator = "add" | "subtract" | "multiply" | "divide";

class Calculator {
  calculate(operator: TOperator, a: number, b: number): number {
    switch (operator) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        return a / b;
    }
  }
}

const calculator = new Calculator();

console.log(calculator.calculate('add', 6, 2)); // 8
console.log(calculator.calculate('subtract', 6, 2)); // 4
console.log(calculator.calculate('multiply', 6, 2)); // 12
console.log(calculator.calculate('divide', 6, 2)); // 3
```

這樣的實作方式看起來沒有問題，但是當我們需要新增一種運算時，就需要修改 `calculate` 函數，這樣的實作方式違反了 `開放封閉原則 (Open-Closed Principle)`，另外當運算的種類變多時，`calculate` 函數也會變得越來越龐大，而且在實際開發中肯定會出現更複雜的情況，就會更加難以維護 (以本人親身經歷為例，在讀別人寫的 code 時就有遇過每個 if 裡面需要做一堆事情，或是是很深的巢狀 if 結構，甚至是 if 和 switch 交織的巢狀結構，不論是在閱讀、維護、擴展上絕對會讓你生不如死)。

## 用 Class 實作策略模式

下面程式碼將每種運算的實現都 `封裝` 在一個獨立的類別中，並且透過 `setStrategy` 方法來 `替換` 要使用的運算，完全符合策略模式的定義，而且當我們需要新增一種運算時，只需要新增一個新的類別，不需要修改原有的程式碼，這樣就符合了 `開放封閉原則`。

```ts:line-numbers
interface TStrategy {
  calculate(a: number, b: number): number;
}

class AddStrategy implements TStrategy {
  calculate(a: number, b: number) {
    return a + b;
  }
}

class SubtractStrategy implements TStrategy {
  calculate(a: number, b: number) {
    return a - b;
  }
}

class MultiplyStrategy implements TStrategy {
  calculate(a: number, b: number) {
    return a * b;
  }
}

class DivideStrategy implements TStrategy {
  calculate(a: number, b: number) {
    return a / b;
  }
}

class Calculator {
  private strategy: TStrategy;

  setStrategy(strategy: TStrategy) {
    this.strategy = strategy;
  }

  calculate(a: number, b: number) {
    return this.strategy.calculate(a, b);
  }
}

const calculator = new Calculator();

calculator.setStrategy(new AddStrategy());
console.log(calculator.calculate(6, 2)); // 8

calculator.setStrategy(new SubtractStrategy());
console.log(calculator.calculate(6, 2)); // 4

calculator.setStrategy(new MultiplyStrategy());
console.log(calculator.calculate(6, 2)); // 12

calculator.setStrategy(new DivideStrategy());
console.log(calculator.calculate(6, 2)); // 3
```

## 用 Function 實作策略模式

當然有時候用 Class 來實現策略模式會顯得有點冗長和繁瑣，我個人比較喜歡用 Function 實現策略模式的寫法，更加簡潔和直觀：

```ts:line-numbers
type TStrategy = (a: number, b: number) => number;

const add: TStrategy = (a, b) => a + b;
const subtract: TStrategy = (a, b) => a - b;
const multiply: TStrategy = (a, b) => a * b;
const divide: TStrategy = (a, b) => a / b;

const calculate = (
  strategy: TStrategy, a: number, b: number
) => strategy(a, b);

console.log(calculate(add, 6, 2)); // 8
console.log(calculate(subtract, 6, 2)); // 4
console.log(calculate(multiply, 6, 2)); // 12
console.log(calculate(divide, 6, 2)); // 3
```

## 用 Lookup Table 管理策略行為

另外也可以使用 [Lookup Table](https://en.wikipedia.org/wiki/Lookup_table) 來儲存每一個策略，這是我個人非常喜歡的寫法，可以用在很多場景下 (不只是策略模式)，當遇到很多相似的判斷邏輯或資料時，使用 `Lookup Table` 會讓程式碼更加的清楚好管理：

```ts:line-numbers
type TOperator = "add" | "subtract" | "multiply" | "divide";
type TStrategy = (a: number, b: number) => number;

const strategies: Record<TOperator, TStrategy> = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

const calculate = (
  operator: TOperator, a: number, b: number
) => strategies[operator](a, b);

console.log(calculate('add', 6, 2)); // 8
console.log(calculate('subtract', 6, 2)); // 4
console.log(calculate('multiply', 6, 2)); // 12
console.log(calculate('divide', 6, 2)); // 3
```

若是有更加複雜的判斷邏輯，更能體現出 `Lookup Table` 的好處，例如除了數字之外我們還希望擴展出向量運算，而兩者 (數字和向量) 在計算上都可以使用相同的運算子 (加、減、乘、除) 來處理各自的運算，這時候就可以使用 `Lookup Table` 來管理兩者的計算策略。

接著將兩者的計算策略分開並封裝起來，然後把整個程式碼獨立成一個檔案 (模組)，統一管理各種計算相關的邏輯，這樣不論是在維護、擴展和使用上都會變得更加方便。

:::code-group

```ts:line-numbers [calculator.ts]
type TOperator = "add" | "subtract" | "multiply" | "divide";
type TStrategy<T> = (a: T, b: T) => T;
type TStrategies = {
  number: Record<TOperator, TStrategy<number>>;
  vector: Record<TOperator, TStrategy<number[]>>;
};

const strategies: TStrategies = {
  number: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
  },
  vector: {
    add: (a, b) => a.map((v, i) => v + b[i]),
    subtract: (a, b) => a.map((v, i) => v - b[i]),
    multiply: (a, b) => a.map((v, i) => v * b[i]),
    divide: (a, b) => a.map((v, i) => v / b[i]),
  },
};

// 這裡也可以使用 Class 來封裝，或是直接 export { calculateNumber, calculateVector }
// 看當下的場景或個人喜好來決定
export const calculator = () => {
  const calculateNumber = (operator: TOperator, a: number, b: number) => {
    return strategies.number[operator](a, b);
  };

  const calculateVector = (operator: TOperator, a: number[], b: number[]) => {
    return strategies.vector[operator](a, b);
  };

  return {
    calculateNumber,
    calculateVector,
  };
};
```

```ts:line-numbers [main.ts]
import { calculator } from './calculator';

const { calculateNumber, calculateVector } = calculator();

console.log(calculateNumber("add", 6, 2)); // 8
console.log(calculateVector("add", [1, 2, 3], [4, 5, 6])); // [5, 7, 9]
```

:::

## 實戰：使用策略模式來封裝表單驗證 (以 Vue 3 為例)

在前端開發中，表單驗證是一個非常常見的需求，也是一個很好的使用策略模式的場景。

我們先來設定幾個資料驗證的規則需求：
- 必填：資料不能為空
- 長度：資料長度必須在一定範圍內
- 數字：資料必須為數字
- 英文字母：資料必須為英文字母
- 電子郵件：資料必須為電子郵件格式

接下來就可以把表單驗證封裝成 [Composable](https://vuejs.org/guide/reusability/composables.html#composables) 了。

:::code-group

```ts:line-numbers [useValidator.ts]
type TStrategy = 'isNotEmpty' | 'isLength' | 'isNumber' | 'isAlpha' | 'isEmail';

const validatedStrategies = {
  isNotEmpty: (value: string) => value.trim().length > 0,
  isLength: (value: string, options: { min?: number; max?: number }) => {
    // 預設最小長度為 0，最大長度為 Infinity
    const { min = 0, max = Infinity } = options;
    return value.length >= min && value.length <= max;
  },
  isNumber: (value: string) => !isNaN(Number(value)),
  isAlpha: (value: string) => /^[a-zA-Z]+$/.test(value),
  // 簡易版電子郵件格式驗證
  isEmail: (value: string) =>
    /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(value),
};

export const useValidator = () => {
  const validate = (value: string, strategy: TStrategy, options?: any) => {
    return validatedStrategies[strategy](value, options);
  };

  return { validate };
};
```

```ts:line-numbers [main.ts]
import { useValidator } from './useValidator';

const { validate } = useValidator();

console.log(validate('', 'isNotEmpty')); // false
console.log(validate('123', 'isLength', { min: 3, max: 5 })); // true
console.log(validate('123', 'isNumber')); // true
console.log(validate('abc', 'isAlpha')); // true
console.log(validate('abc123@email.com', 'isEmail')); // true
```

:::

### 單次驗證支持多個規則

通常一個欄位可能需要同時驗證多個規則，比如一個密碼欄位需要同時滿足長度、數字和英文字母三個規則，所以我們就來升級一下驗證的寫法吧！除了驗證多個規則之外，再加上自定義錯誤訊息，並且將驗證結果包裝成一個物件回傳 (錯誤時可以包含錯誤資訊)，這樣就可以更加方便的處理表單驗證了。

:::code-group

```ts:line-numbers [useValidator.ts]
type TStrategy = "isNotEmpty" | "isLength" | "isNumber" | "isAlpha" | "isEmail";
// 單一規則可以是字串 (驗證策略)，也可以是物件，物件可以設定驗證策略、驗證時需要的參數和自定義錯誤訊息
type TRule =
  | TStrategy
  | { strategy: TStrategy; options?: any; errorMessage?: string };
// 回傳的單一錯誤規則資訊包含驗證策略和錯誤訊息
type TErrorRule = { strategy: TStrategy; errorMessage: string };

const validatedStrategies = {
  isNotEmpty: (value: string) => value.trim().length > 0,
  isLength: (value: string, options: { min?: number; max?: number }) => {
    const { min = 0, max = Infinity } = options;
    return value.length >= min && value.length <= max;
  },
  isNumber: (value: string) => !isNaN(Number(value)),
  isAlpha: (value: string) => /^[a-zA-Z]+$/.test(value),
  isEmail: (value: string) =>
    /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(value),
};

export const useValidator = () => {
  const validate = (value: string, rules: TRule[] = []) => {
    // 回傳的結果包含是否通過驗證和錯誤資訊
    const result: { isValid: boolean; errorRules: TErrorRule[] } = {
      isValid: true,
      errorRules: [],
    };

    for (const rule of rules) {
      // 將字串規則轉換成物件格式，方便後續處理
      const ruleObject = typeof rule === "string" ? { strategy: rule } : rule;
      const { strategy, errorMessage, options } = ruleObject;

      // 驗證通過則繼續下一個驗證
      if (validatedStrategies[strategy](value, options)) continue;

      // 驗證失敗則將結果設為失敗，並將此規則加入錯誤資訊中
      result.isValid = false;
      result.errorRules.push({
        strategy,
        errorMessage:
          // 如果有自定義錯誤訊息則使用，否則使用預設錯誤訊息
          errorMessage || `The value does not pass the '${strategy}' rule`,
      });
    }

    return result;
  };

  return { validate };
};
```

```ts:line-numbers [main.ts]
import { useValidator } from './useValidator';

const { validate } = useValidator();

// 驗證密碼
const validatedResult = validate("abc123", [
  "isNotEmpty",
  { strategy: "isLength", options: { min: 6, max: 12 } },
  "isNumber",
  "isAlpha",
]);

console.log(validatedResult.isValid); // true

// 驗證密碼，並自定義錯誤訊息
const validatedErrorResult = validate("abc", [
  {
    strategy: "isNotEmpty",
    errorMessage: "密碼尚未填寫",
  },
  {
    strategy: "isLength",
    options: { min: 6, max: 12 },
    errorMessage: "密碼長度必須在 6 到 12 個字元之間",
  },
  {
    strategy: "isNumber",
    errorMessage: "密碼必須包含數字",
  },
  {
    strategy: "isAlpha",
    errorMessage: "密碼必須包含英文字母",
  },
]);

console.log(validatedErrorResult.isValid); // false
console.log(validatedErrorResult.errorRules);
// [
//   {
//     strategy: "isLength",
//     errorMessage: "密碼長度必須在 6 到 12 之間",
//   },
//   {
//     strategy: "isNumber",
//     errorMessage: "密碼必須包含數字",
//   }
// ]
```

:::info 關於表單驗證
由於表單驗證是一個非常常見的需求，所以有很多現成的套件可以使用，而且這些套件通常都會有更加嚴謹的驗證規則和更多的驗證選項，因此在實際開發中不要因為學會用策略模式封裝表單驗證就一定要自己實作，依照團隊和專案需求來決定才是最重要的呦！
:::

## 結論

策略模式是非常實用的設計模式，在開發中我們很容易就會遇到相同類型的判斷邏輯，當你覺得判斷邏輯變多變複雜時，就可以考慮使用策略模式來封裝，但要注意不要每個地方都用策略模式，在簡單的情況下直接使用 if-else 或 switch-case 絕對是最快也最直觀的方式。

## 參考資料
- [JavaScript 設計模式與開發實踐](https://www.tenlong.com.tw/products/9787115388889?list_name=srh)
- [Strategy | Refactoring.Guru](https://refactoring.guru/design-patterns/strategy?source=post_page-----463e894c8714--------------------------------)
- [Lookup Table](https://en.wikipedia.org/wiki/Lookup_table)
- [Vue 3 Composables](https://vuejs.org/guide/reusability/composables.html#composables)
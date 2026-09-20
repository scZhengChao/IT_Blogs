# Merge

- 合并
- 将两个对象合并为一个对象

```typescript 
namespace g {
  type Obj1 = {
    id: number,
    name: string
  }
  type Obj2 = {
    id: number,
    age: number
  }
  type Compute<T extends any> = T extends Function ? T : { [K in keyof T]: T[K] };
  type SetDifference<T, U> = T extends U ? never : T;
  type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;
  type Merge<T extends object, U extends object> = Compute<Obj1 & Omit<Obj2, keyof Obj1>>;
  type obj = Merge<Obj1, Obj2>;
  /**
    type obj = {
      id: number;
      name: string;
      age: number;
    }
   */
}

```

# 让一个参数的类型依赖于另一个参数

```typescript 
enum ActionType {
  FETCH_DATA,
  UPDATE_DATA,
  DELETE_DATA,
}

function performAction<T extends ActionType>(action: T, payload: ActionTypeToPayload[T]): void {
  // 实现根据不同的action执行不同的逻辑
}

type ActionTypeToPayload = {
  [ActionType.FETCH_DATA]: { url: string };
  [ActionType.UPDATE_DATA]: { id: number, data: object };
  [ActionType.DELETE_DATA]: { id: number };
};

// 使用示例
performAction(ActionType.FETCH_DATA, { url: 'https://www.example.com/data' });
performAction(ActionType.UPDATE_DATA, { id: 1, data: { name: 'Example' } });
performAction(ActionType.DELETE_DATA, { id: 2 });

```

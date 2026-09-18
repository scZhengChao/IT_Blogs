# 自动捕获错误

```typescript 
export function autoCatchError(report: boolean) {
    return function (
        target: any,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        if(typeof target === 'function'){
            throw '不能用于静态方法'
        }
        const original = descriptor.value;
        if(typeof original !== 'function'){
            throw '只能用于修饰函数'
        }
        descriptor.value = function (...args:Parameters<typeof original>[]) {
            try {
                const result = original.call(this, ...args);
                return result;
            }catch (e){
                if(report){
                    // todo something
                }
            }
        };
    };
}


```

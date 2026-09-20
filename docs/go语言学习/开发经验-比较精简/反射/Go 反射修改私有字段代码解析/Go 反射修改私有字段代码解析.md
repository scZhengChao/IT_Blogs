# Go 反射修改私有字段代码解析

## 目录

- [关键点说明](#关键点说明)

这段代码演示了如何使用 Go 的反射机制来访问和修改结构体中的私有字段。下面是对每行代码的详细解释：

```go 
// 创建一个 Person 结构体指针，并通过 reflect.ValueOf 获取其反射值
// 然后调用 Elem() 获取指针指向的实际结构体的反射值
rValue := reflect.ValueOf(&Person{
    Name:    "",
    Age:     0,
    Address: "",
    money:   0,
}).Elem()

// 使用 FieldByName 方法尝试获取名为 "money" 的字段的反射值
// 由于 money 是私有字段，正常情况下无法直接访问
money := rValue.FieldByName("money")

// 检查是否成功获取到了 money 字段
if (money != reflect.Value{}) {
    // reflect.NewAt 创建一个指向 money 字段类型的新指针
    // money.Addr().UnsafePointer() 获取 money 字段的内存地址
    p := reflect.NewAt(money.Type(), money.Addr().UnsafePointer())
    
    // 通过 Elem() 获取指针指向的实际值
    field := p.Elem()
    
    // 使用 SetInt 方法将字段值设置为 164
    field.SetInt(164)
}

// 打印修改后的结构体
// rValue.Interface() 将反射值转换回接口类型
fmt.Printf("%+v\n", rValue.Interface())
```


## 关键点说明

1. **反射基础**：
   - `reflect.ValueOf`获取值的反射对象
   - `Elem()`用于获取指针或接口指向的实际值
2. **访问私有字段**：
   - 正常情况下 Go 的反射不允许访问私有字段
   - 这里使用了 `reflect.NewAt`和 `UnsafePointer`来绕过这个限制
3. **安全注意事项**：
   - 使用 `unsafe`包的操作是不安全的，可能会破坏 Go 的类型系统
   - 在生产环境中应尽量避免这种操作
4. **代码流程**：
   - 创建结构体实例并获取其反射值
   - 尝试获取私有字段的反射值
   - 通过指针操作修改私有字段的值
   - 输出修改后的结构体
5. **输出结果**：
   - 这段代码会输出类似：`&{Name: Age:0 Address: money:164}`
   - 可以看到私有字段 `money`的值被成功修改为 164

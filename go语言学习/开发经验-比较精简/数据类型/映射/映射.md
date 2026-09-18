# 映射

## 目录

- [3.2 创建映射（Map）](#32-创建映射Map)

### 3.2 创建映射（Map）

```go 
// 语法：make(map[K]V, initialCapacity)
// 创建初始容量为 10 的 map
map1 := make(map[string]int, 10)

// 创建默认容量的 map
map2 := make(map[int]string)

// 使用示例
scores := make(map[string]float64)
scores["Alice"] = 95.5
scores["Bob"] = 88.0
```


**参数说明：**

- 初始容量（initialCapacity）：可选的初始空间分配提示

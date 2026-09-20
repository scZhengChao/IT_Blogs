# 手机号格式化

## 目录

- [手机号格式化](#手机号格式化)

### 手机号格式化

当你需要将手机号码格式化成xxx-xxxx-xxxx的形式

```typescript 
const formatPhone = (str, sign = '-') => str.replace(/(\W|\s)/g, "").split(/^(\d{3})(\d{4})(\d{4})$/).filter(item => item).join(sign)

formatPhone('13123456789') // '131-2345-6789'
formatPhone('13 1234 56 789', ' ') // '131 2345 6789'

```

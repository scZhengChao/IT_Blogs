# 修改密码

## 目录

- [方法 1: 使用ALTER USER语句（适用于 MySQL 5.7.6 及以上版本）](#方法-1-使用ALTER-USER语句适用于-MySQL-576-及以上版本)
- [方法 2: 使用SET PASSWORD语句（适用于所有 MySQL 版本）](#方法-2-使用SET-PASSWORD语句适用于所有-MySQL-版本)

在 MySQL 中修改密码的步骤取决于你使用的 MySQL 版本以及你是要修改当前用户的密码还是其他用户的密码。以下是几种常见的方法：

### 方法 1: 使用`ALTER USER`语句（适用于 MySQL 5.7.6 及以上版本）

1. **登录 MySQL**：

```sql 
mysql -u root -p
```


​2. **修改当前用户的密码**：

```sql 
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```


​3. **刷新权限**

```sql 
FLUSH PRIVILEGES;
```


### 方法 2: 使用`SET PASSWORD`语句（适用于所有 MySQL 版本）

> 实际使用下来不是这样的

1. **登录 MySQL**：

```bash 
mysql -u root -p
```


​2. **修改当前用户的密码**：

```sql 
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('new_password');
```


​3. 刷新权限：

```sql 
FLUSH PRIVILEGES;
```

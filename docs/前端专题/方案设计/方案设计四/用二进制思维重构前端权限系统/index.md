# 用二进制思维重构前端权限系统

## 目录

- [一、一个真实开发场景引发的思考](#一一个真实开发场景引发的思考)
- [二、从二进制到位运算](#二从二进制到位运算)
  - [2.1 权限的二进制表示](#21-权限的二进制表示)
  - [2.2 位运算符号](#22-位运算符号)
    - [「1. 位运算符」](#1-位运算符)
- [三、框架源码中的位运算艺术](#三框架源码中的位运算艺术)
  - [3.1 React Fiber 状态压缩术](#31-React-Fiber-状态压缩术)
  - [3.2 Vue3 虚拟DOM类型快查](#32-Vue3-虚拟DOM类型快查)
- [四、位运算在算法中的应用](#四位运算在算法中的应用)
  - [4.1 leetcode231 2的幂](#41-leetcode231-2的幂)
  - [4.2 leetcode 136 只出现一次的数字](#42-leetcode-136-只出现一次的数字)
- [五、实战：从零构建位运算权限系统](#五实战从零构建位运算权限系统)
  - [5.1 基础版权限控制](#51-基础版权限控制)
  - [5.2 进阶版权限控制](#52-进阶版权限控制)
    - [权限池扩展](#权限池扩展)
    - [权限动态处理器](#权限动态处理器)
    - [grant方法](#grant方法)
    - [revoke方法](#revoke方法)
    - [toggle方法](#toggle方法)
    - [has方法](#has方法)
  - [使用示例](#使用示例)
  - [5.3 优点和缺点](#53-优点和缺点)
    - [优点](#优点)
  - [📊‌「性能与内存对比」‌](#性能与内存对比)
    - [缺点](#缺点)
- [六、后续思考](#六后续思考)
- [参考](#参考)

## 一、一个真实开发场景引发的思考

某天，我在权限管理组件中写下了第5个isAdmin && canEdit || hasPermission('delete')，突然意识到——这种用布尔值堆砌的权限系统正在让我的代码变得臃肿。看似清晰的逻辑，实则暗藏着复杂的逻辑链条，这让我很容易忽视潜在的错误和维护的困难。特别是当权限的组合和复杂度不断增加时，传统的布尔值判断往往无法满足日益复杂的需求，代码也变得越来越难以理解和扩展。

此时，恍若灵光一现，我想起了React团队在管理Fiber节点时，如何利用二进制位运算来高效地管理节点的状态。React用0b1011这样的二进制数，表示节点的32种状态，极大提高了性能的同时，也简化了复杂状态的管理。这种做法，不仅保证了系统的高效运行，还让原本散乱的状态信息在二进制位中得以精确而清晰的表达。

同样，Vue3的虚拟DOM也通过位运算实现了快速判断节点类型和状态，避免了传统的遍历和比对，进一步提升了渲染效率。Vue3将不同的操作类型、生命周期状态、节点信息等通过位运算压缩在整数值中，这种方法不仅提高了性能，还降低了出错的可能性。

在这个对比中，我不禁思考：如果在权限管理中也能引入位运算的思想，是否能让复杂的权限控制更简洁、清晰和高效？比如，使用一个整数代表不同权限的组合，通过位运算来判断权限是否符合，既能避免多重嵌套判断，也能在权限的扩展上获得更大的灵活性。

> 权限少了看不出来；多了就能显示出二进制思维的高效便捷

```typescript 
export enum OptPermission {
  /** 文档操作 **/
  '查看文档' = 'view',
  '新建文档' = 'add',
  '添加文章' = 'add_doc', // 空间新增节点权限
  '编辑文档' = 'edit',
  '删除文档' = 'del',
  '分享文档' = 'share',
  '复制文档' = 'copy',
  '文章收藏' = 'favor',
  '移动文档' = 'move',
  '添加评论' = 'add_comment',
  '删除评论' = 'del_comment',
  '预览附件' = 'view_attachment',
  '上传附件' = 'upload_attachment',
  '下载附件' = 'download_attachment',
  '导出文档' = 'export',
  '版本记录' = 'version_list',
  '删除附件' = 'del_attachment',
  /** 空间操作 **/
  '空间基本信息管理' = 'base_info_manage',
  '目录拖拽' = 'catalog_drag',
  '创建子空间' = 'add_sub_space',
  '删除子空间' = 'del_sub_space',
  '文档转化为子空间' = 'convert_document_to_space',
  '关联空间' = 'ref_space',
  '转让空间' = 'transfer_space',
  '创建空间' = 'add_space',
  '删除空间' = 'del_space',
  '用户管理' = 'user_manage',
  '用户组管理' = 'user_group_manage',
  '机构管理' = 'user_org_manage',
  '空间权限管理' = 'space_permission_manage',
  '文档权限管理' = 'document_permission_manage',
  '空间管理' = 'space_manage',
  '根节点管理' = 'root_manage',
  'AI创作' = 'aigc',
  'Comment' = 'comment',
  '空间容量' = 'capacity_manage',
  '空间回收站' = 'recycle_manage',
  '转移所有权' = 'transfer_owner',
  '设置敏感及密级' = 'set_security',
  '上传新版本' = 'upload_file_new_version',
  '复制内容' = 'copy_content',
  /**
   * 文件夹操作
   */
  '查看文件夹' = 'view_folder',
  '新建文件夹' = 'add_folder',
  '分享文件夹' = 'share_folder',
  '收藏文件夹' = 'favor_folder',
  '删除文件夹' = 'del_folder',
  '文件夹重命名' = 'rename_folder',
  /**
   * 文件操作
   */
  '查看文件' = 'view_file',
  '上传文件' = 'upload_file',
  '下载文件' = 'download_file',
  '分享文件' = 'share_file',
  '收藏文件' = 'favor_file',
  '替换文件' = 'replace_file',
  '删除文件' = 'del_file',
  '文件重命名' = 'rename_file',
  /**
   * 目录排序
   */
  '目录排序' = 'catalog_sort',
}
```


## 二、从二进制到位运算

### 2.1 权限的二进制表示

在计算机中，二进制是最基本的数据表示方式。每一位二进制位（bit）都可以表示一个状态，0表示“无”，1表示“有”。在权限管理中，我们可以利用这一特性，将不同的权限映射到二进制的不同位上。

例如，假设我们有三种权限：读（Read）、写（Write）和执行（Execute）。我们可以将它们分别映射到二进制的不同位：

- 读权限（Read）：2的0次方，即1（二进制：001）
- 写权限（Write）：2的1次方，即2（二进制：010）
- 执行权限（Execute）：2的2次方，即4（二进制：100）

通过这种映射，我们可以使用一个整数来表示用户的所有权限。例如，权限值为7（二进制：111），表示用户同时拥有读、写和执行权限。

### 2.2 位运算符号

#### **「1. 位运算符」**

- \*\*「左移`<<`：」\*\*将二进制数的位数左移`n`位，相当于乘以`2^n`。
- \*\*「右移`>>`：」\*\*将二进制数的位数右移`n`位，相当于整数除以`2^n`，向下取整。
- \*\*「按位与`&`：」\*\*只有当两个二进制位都为`1`时，结果才为`1`，否则为`0`。
- \*\*「按位或`|`：」\*\*只要有一个二进制位为`1`，结果就为`1`。
- \*\*「按位异或`^`：」\*\*当两个二进制位不同时，结果为`1`；相同则为`0`。。

## 三、框架源码中的位运算艺术

### 3.1 React Fiber 状态压缩术

在React的reconciliation算法中，单个Fiber节点需要同时记录多种状态：

```javascript 
// react/packages/react-reconciler/src/ReactFiberFlags.js
export const Placement = 0b0000000000001;
export const Update = 0b0000000000010;
export const ChildDeletion = 0b0000000000100;

// 状态组合
let flags = Placement | Update; // 0b0000000000011

// 超高效状态检测
if (flags & Update) {
    // 执行副作用更新...
}

```


设计哲学：用1个32位整数替代32个布尔变量，内存占用减少96%，状态检测速度提升10倍。

### 3.2 Vue3 虚拟DOM类型快查

Vue3通过shapeFlag实现虚拟节点类型的闪电判断：

```typescript 
// vue-next/packages/shared/src/shapeFlags.ts
export const enum ShapeFlags {
    ELEMENT = 1,
    COMPONENT = 1 << 1,
    TEXT_CHILDREN = 1 << 2,
    ARRAY_CHILDREN = 1 << 3
}

// 动态组合类型
const vnodeFlag = ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN;

// 比switch快10倍的类型判断
if (vnodeFlag & ShapeFlags.COMPONENT) {
    // 处理组件逻辑...
}

```


性能对比：传统字符串类型判断需要遍历原型链，位运算直接访问寄存器，速度提升20倍。

## 四、位运算在算法中的应用

### 4.1 leetcode231 2的幂

- 传统解法：通过不断除以 2

```javascript 
/**
 * 给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。
 * 如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。
 * 
 * 示例 1：
 * 输入：n = 1
 * 输出：true
 * 
 * 示例 2：
 * 输入：n = 16
 * 输出：true
 * 
 * 示例 3：
 * 输入：n = 3
 * 输出：false
 */

function isPowerOfTwo(n) {
    if (n <= 0) return false;
    while (n > 1) {
        if (n % 2 !== 0) return false;
        n = Math.floor(n / 2); // 使用 Math.floor 保证是整数除法
    }
    return true;
}
```


位运算解法：利用 n & (n - 1) 的特性

```javascript 
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

```


解释：

- n - 1：将 n 减去 1，会将二进制表示**中的最低位的 1 变为 0，其后的所有 0 变为 1。** 例如：
- n = 4（0100），n - 1 = 3（0011）
- n = 8（1000），n - 1 = 7（0111）
- (n & (n - 1)) === 0：如果上述按位与运算的结果为 0，则 n 是 2 的幂次方。

### 4.2 leetcode 136 只出现一次的数字

- 传统解法：使用哈希表

```javascript 
/**
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 
 * 示例 1:
 * 输入: [2,2,1]
 * 输出: 1
 * 
 * 示例 2:
 * 输入: [4,1,2,1,2]
 * 输出: 4
 * 
 */


var singleNumber = function(nums) {
    let hashTable = {};
    for(let i = 0; i < nums.length; i++) {
        if(hashTable[nums[i]] == undefined) {
            hashTable[nums[i]] = 1;
        } else {
            hashTable[nums[i]]++;
        }
    }
    for(let i in hashTable) {
        if(hashTable[i] == 1) {
            return i;
        }
    }
};
```


- 位运算解法：利用 n & (n - 1) 的特性

```javascript 
// nums =[4,1,2,1,2] 输出 4
// 0
// 0^4 = 4
// 4^1 = 5
// 5^2 = 7
// 7^1 = 6
// 6^2 = 4

var singleNumber = function(nums) {
    return nums.reduce((sum,cur)=>{
        return sum^cur
    }, 0)
};

```


要找出数组中唯一出现一次的数字，可以利用异或运算的性质：**相同数字异或结果为 0，任何数与 0 异或结果为它本身**。因此，将所有数字异或后，结果即为只出现一次的数字。

**步骤解析：**

1. **初始化异或结果**：初始值设为 0。
2. **遍历数组**：将每个元素依次与当前结果异或。
3. **抵消重复元素**：出现两次的数字异或后结果为 0，最终结果即为唯一出现一次的数字。

**示例分析：**

- 输入：`[4, 1, 2, 1, 2]`
- 计算过程：

```bash 
0 ^ 4 = 4
4 ^ 1 = 5
5 ^ 2 = 7
7 ^ 1 = 6
6 ^ 2 = 4
```


- 最终结果：4

该方法时间复杂度为 O (n)，空间复杂度为 O (1)，高效且适用于所有符合题意的输入。

## 五、实战：从零构建位运算权限系统

### 5.1 基础版权限控制

```java 
// 权限定义（使用左移生成唯一掩码）
const READ = 1 << 0;   // 0b0001
const WRITE = 1 << 1;  // 0b0010
const DELETE = 1 << 2; // 0b0100

// 用户权限组合
let userPermissions = READ | WRITE; // 0b0011

// 高阶组件权限校验
const withAuth = required => WrappedComponent => props => 
    (userPermissions & required) === required 
        ? <WrappedComponent {...props} />  
        : <Redirect to="/403" />;

// 使用示例
const AdminPanel = withAuth(WRITE | DELETE)(() => <div>敏感操作区</div>);

```


解释：

- &#x20;｜ 只要一个为1 就为1&#x20;
- &#x20;( userPermissions & required) === required   就只有 userPermissions ===  required
- 只有userPermissions包含  传入的权限 ；才能通过；因为定义权限的时候 统一使用左移 生成唯一掩码

### 5.2 进阶版权限控制

```javascript 
// 权限池扩展
const permissions = {
    READ: 1 << 0,
    WRITE: 1 << 1,
    DELETE: 1 << 2,
    MANAGER: 1 << 3
};

// 权限动态处理器
class PermissionManager {
    constructor() {
        this._flags = 0;
    }

    grant(perm) {
        this._flags |= perm; // 按位与：只有当两个二进制位只要有一个为 1 时，结果才为 1，否则为 0。
        return this;
    }

    revoke(perm) {
        this._flags &= ~perm; // 按位非~：将所有二进制位取反，然后与原值进行按位与&。
        return this;
    }

    toggle(perm) {
        this._flags ^= perm; //  按位异或^：当两个二进制位不同时，结果为 1；相同则为 0。
        return this;
    }

    has(perm) {
        return (this._flags & perm) === perm;
    }
}

// 使用示例
const user = new PermissionManager().grant(permissions.READ);
user.grant(permissions.WRITE);
console.log(user.has(permissions.READ | permissions.WRITE)); // true
user.toggle(permissions.WRITE);
console.log(user.has(permissions.WRITE)); // false

```


详细解释：

##### 权限池扩展

```javascript 
const permissions = {
    READ: 1 << 0,
    WRITE: 1 << 1,
    DELETE: 1 << 2,
    MANAGER: 1 << 3
};
```


这部分代码定义了一个名为`permissions`的对象，它代表了一组权限。每个权限对应一个唯一的整数值，这些值是通过左移操作符`<<`生成的。

- `1 << 0`结果是`1`，二进制表示为`0001`，代表`READ`权限。
- `1 << 1`结果是`2`，二进制表示为`0010`，代表`WRITE`权限。
- `1 << 2`结果是`4`，二进制表示为`0100`，代表`DELETE`权限。
- `1 << 3`结果是`8`，二进制表示为`1000`，代表`MANAGER`权限。

左移操作符`<<`的作用是将一个数的二进制表示向左移动指定的位数，右边空出的位用 0 填充。通过这种方式，每个权限对应的二进制位都是唯一的，方便后续使用位运算进行权限的组合和判断。

##### 权限动态处理器

```javascript 
class PermissionManager {
    constructor() {
        this._flags = 0;
    }
```


这里定义了一个名为`PermissionManager`的类，用于管理用户的权限。在构造函数中，`this._flags`被初始化为`0`，它是一个整数，用于存储用户当前拥有的权限。初始值为`0`表示用户初始时没有任何权限。

#### `grant`方法

```typescript 
    grant(perm) {
        this._flags |= perm; // 按位或：只要两个二进制位中有一个为 1，结果就为 1，否则为 0。
        return this;
    }
```


`grant`方法用于授予用户某个权限。`this._flags |= perm`是按位或操作，等价于`this._flags = this._flags | perm`。按位或操作的规则是，只要两个二进制位中有一个为 1，结果就为 1，否则为 0。通过按位或操作，可以将`perm`对应的权限位添加到`this._flags`中。`return this`使得该方法支持链式调用。

#### `revoke`方法

```javascript 
    revoke(perm) {
        this._flags &= ~perm; // 按位非~：将所有二进制位取反，然后与原值进行按位与&。
        return this;
    }
```


`revoke`方法用于撤销用户的某个权限。`~perm`是按位非操作，它会将`perm`的所有二进制位取反。然后使用按位与操作`this._flags &= ~perm`（等价于`this._flags = this._flags & ~perm`），将`this._flags`中与`perm`对应的权限位清零，从而撤销该权限。同样，`return this`支持链式调用。

#### `toggle`方法

```javascript 
    toggle(perm) {
        this._flags ^= perm; //  按位异或^：当两个二进制位不同时，结果为 1；相同则为 0。
        return this;
    }
```


`toggle`方法用于切换用户的某个权限。`this._flags ^= perm`是按位异或操作，等价于`this._flags = this._flags ^ perm`。按位异或操作的规则是，当两个二进制位不同时，结果为 1；相同则为 0。通过按位异或操作，可以切换`this._flags`中与`perm`对应的权限位的状态。`return this`支持链式调用。

#### `has`方法

```typescript 
    has(perm) {
        return (this._flags & perm) === perm;
    }
```


`has`方法用于检查用户是否拥有某个权限。`this._flags & perm`是按位与操作，它会返回`this._flags`和`perm`中都为 1 的位。如果结果等于`perm`，则说明`this._flags`中包含了`perm`对应的所有权限位，即用户拥有该权限，返回`true`；否则返回`false`。

### 使用示例

```javascript 
// 创建权限管理器实例
const manager = new PermissionManager();

// 授予 READ 和 WRITE 权限
manager.grant(permissions.READ).grant(permissions.WRITE);

// 检查是否拥有 READ 权限
console.log(manager.has(permissions.READ)); // 输出: true

// 撤销 READ 权限
manager.revoke(permissions.READ);

// 再次检查是否拥有 READ 权限
console.log(manager.has(permissions.READ)); // 输出: false

// 切换 DELETE 权限
manager.toggle(permissions.DELETE);

// 检查是否拥有 DELETE 权限
console.log(manager.has(permissions.DELETE)); // 输出: true
```


通过上述代码和解释，你可以看到如何使用位运算高效地管理用户的权限。这种方式不仅简洁，而且性能较高，适用于需要频繁进行权限检查和修改的场景。

### 5.3 优点和缺点

#### 优点

- 位运算**执行速度非常快，通常是常数时间 O(1)，对大数据量的操作也很高效。**
- 高效性：位运算执行速度非常快，通常是常数时间 O(1)，对大数据量的操作也很高效。
- 节省内存：使用整数来表示权限，可以将多个权限压缩在一个数字中，节省内存。
- 简洁和清晰：代码相对简洁，尤其是与其他数据结构相比，避免了复杂的条件判断和遍历。
- 避免多次遍历：位运算一次性操作多个权限，避免了循环和多次条件判断。

### 📊‌\*\*「性能与内存对比」\*\*‌

![](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibsuAJk1kdUrQ6njwuD7lsc96brA3SiaVQpuE1biaBqChyaQ3iaASicagIQiavXt2AXewuyqztp4WPoKKiag/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

#### 缺点

1. 可读性差
   - 虽然位运算非常高效，但对于一些不熟悉位运算的开发者来说，理解代码可能比较困难。比如，userPermissions |= WRITE; 和 userPermissions & DELETE 的含义并不是每个前端开发者都能第一时间理解。
   - **权限含义不可读：需要建立位-权限映射表**
2. 权限移除的复杂性
   - 当前代码示例使用 |= 来添加权限，但如果需要移除某个权限（比如用户取消了某个权限），**就需要使用 &= \~permission 这种相对复杂的操作来做移除操作。**
3. 最大权限位限制
   - 权限容量硬限制：**32位系统最大支持32个独立权限位**
   - 浮点数精度风险：JavaScript中超过 2^53 后出现精度丢失
4. 后端验证不可读；比较复杂

## 六、后续思考

能否结合位元算和传统方式，实现权限系统的混合架构设计

- 可读性差：可以考虑使用枚举类型（Enum）来代替直接的位运算，这样可以提高代码的可读性。
- 最大权限位限制：可以考虑使用大数（BigInt）来扩展权限位，但这会增加内存消耗。

# 参考

[位运算](../../../../前端工程/运算符/位运算/index.md "位运算")

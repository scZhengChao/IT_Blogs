# 二分查找

## 目录

- [搜索插入位置](#搜索插入位置)
- [在排序数组中查找元素的第一个和最后一个位置](#在排序数组中查找元素的第一个和最后一个位置)
- [搜索旋转排序数组](#搜索旋转排序数组)

# 搜索插入位置

&#x20;     给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为O(log n)的算法。

**示例 1:**

```typescript 
输入: nums = [1,3,5,6], target = 5
输出: 2

```


```typescript 
/**
 * @description: 二分查找   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums   输入数组
 * @param {*} target 目标值
 * @return {*}
 */
function binarySearch(nums,target){
    // 初始化左指针为0，右指针为nums最后一个元素
    let left=0,right=nums.length-1,middle=0;
    // 当left>right证明比对完成数组元素，跳出循环
    while(left<=right)
    {
        // 计算中间指针位置
        middle=Math.floor((left+right)/2);
        // 如果middle所指值等于target，直接返回其位置
        if(nums[middle]==target) return middle;
        // 如果middle所指值大于target，由于数组为升序，
        // nums[middle]>target，证明区间[middle,right]
        // 元素都大于target，因此舍去，继续在[left,middle-1]
        // 区间二分查找
        if(nums[middle]>target) right=middle-1;
        // 反之nums[middle]<target，由于数组为升序，
        // 证明区间[left,middle]元素都小于target，因此
        // 社区，继续在[middle+1,right]区间二分查找
        else  left=middle+1;
    }

    // 如果未找到相等元素，则此时middle为其最接近的元素
    // 如果nums[middle]<target,则在middle+1插入target即可
    // 如果nums[middle]>target,则在middle插入target即可
    return nums[middle]>target?middle:middle+1;
}

```


# 在排序数组中查找元素的第一个和最后一个位置

&#x20;      给你一个按照非递减顺序排列的整数数组`nums`，和一个目标值`target`。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值`target`，返回`[-1, -1]`。

你必须设计并实现时间复杂度为`O(log n)`的算法解决此问题。

**示例：**

```typescript 
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

```


```typescript 
/**
 * @description: 二分查找   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums    输入数组
 * @param {*} target  目标值
 * @return {*}
 */
function binarySearch(nums,target)
{
    /**
     * 该方案使用二分查找的方法：
     * 
     * 对于查找元素的第一个位置，我们首先利用二分查找找到元素(设此时索引为middle)
     * 并记录该位置为元素的第一个位置，此时我们不知道middle前是否还存在该元素，因
     * 此继续利用二分查找区间[left,middle-1]中的元素，并重复上述过程，直至比对完
     * 数组元素为止。
     * 
     * 对于查找元素的最后一个位置，我们首先利用二分查找找到元素(设此时索引为middle)
     * 并记录该位置为元素的最后一个位置，此时我们不知道middle后是否还存在该元素，因
     * 此继续利用二分查找区间[middle+1, right]中的元素，并重复上述过程，直至比对完
     * 数组元素为止。
     */

    // 初始化元素第一个位置以及最后一个位置为-1，
    let firstIndex=-1,lastIndex=-1;
    /**
     * @description: 二分查找元素
     * @author: JunLiangWang
     * @param {*} isFindFirst  是否查找元素的第一个位置，
     *                         否则则为查找元素最后一个位置
     * @return {*}
     */    
    function binarySearchMethods(isFindFirst)
    {
        // 初始化左指针为首个元素，右指针为最后一个元素
        let left=0,right=nums.length-1;
        // 当左指针超出右指针证明比对完成数组所有元素，此时跳出循环
        while(left<=right)
        {
            // 计算中间索引
            let middle=Math.floor((left+right)/2);
            // 当中间索引处值等于target
            if(nums[middle]==target)
            {
                // 如果是查找元素的第一个元素，更新第一个位置值(firstIndex)
                // 为中间索引(middle),但我们不知middle前是否还存在相同元素
                // 因此则需要在区间[left,middle-1]继续重复该步骤，直至不满
                // 足循环条件位置
                if(isFindFirst)
                {
                    firstIndex=middle;
                    right=middle-1;
                }
                // 否则则是查找元素的最后一个位置，此时更新最后一个位置值
                // (lastIndex)为中间索引(middle),但我们不知middle后是否
                // 还存在相同元素，因此则需要在区间[middle+1,right]继续
                // 重复该步骤，直至不满足循环条件位置
                else
                {
                    lastIndex=middle;
                    left=middle+1
                }
            }
            // 当middle处值大于target，由于nums是单调递增的，因此可
            // 以得target是不在区间[middle,right]中的，因此我们在区
            // 间[left,middle-1]继续查找即可
            else if(nums[middle]>target)right=middle-1;
            // 反之，我们则在[middle+1,right]继续查找即可
            else left=middle+1;
        }
    }
    // 利用二分查找元素第一个位置
    binarySearchMethods(true);
    // 利用二分查找元素得最后一个位置
    binarySearchMethods(false);
    // 返回结果
    return [firstIndex,lastIndex];
}

```


# 搜索旋转排序数组

**这个相对于其他两个；比较难理解**

整数数组`nums`按升序排列，数组中的值**互不相同**。

在传递给函数之前，`nums`在预先未知的某个下标`k`（`0 <= k < nums.length`）上进行了`旋转`，使数组变为`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`（下标 从0开始计数）。例如，`[0,1,2,4,5,6,7]`在下标`3`处经旋转后变为`[4,5,6,7,0,1,2]`。

给你`旋转`后的数组`nums`和一个整数`target`，如果`nums`中存在这个目标值`target`，则返回它的下标，否则返回`-1`。

你必须设计一个时间复杂度为`O(log n)`的算法解决此问题。

**示例：**

```typescript 
输入：nums =[4,5,6,7,0,1,2], target = 0
输出：4

```


```typescript 
/**
 * @description: 二分查找   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums    输入数组
 * @param {*} target  目标值
 * @return {*}
 */
function binarySearch(nums,target){
    /**
     * 该方案使用二分查找的方式，其中的关键则为将局部有序的数组一分为二，其中一定有一个是有序的，
     * 另一个可能是有序，也能是部分有序。此时有序部分用二分法查找，如果目标值未在其范围。则将无
     * 序部分再一分为二，其中一个一定有序，另一个可能有序，可能无序。就这样循环，直至遍历完数组。
     */

    // 初始化左指针为0，右指针为数组最后一个元素
    let left=0,right=nums.length-1;
    // 当左指针超过右指针，证明遍历完成，跳出循环
    while(left<=right)
    {
        // 寻找中间值
        let middle=Math.floor((left+right)/2);
        // 如果中间值等于目标值，直接返回索引
        if(nums[middle]==target)return middle;

        // 找到有顺序的一半数组（无论如何分割数组，总有一半是全为升序的）
        // 如果nums[left]<=nums[middle]证明[left,middle]该区间全为升序
        if(nums[left]<=nums[middle])
        {
            // 如果目标值不在该区间值的范围内，则去掉区间[left,middle]从
            // [middle+1,right]区间继续遍历
            if(target<nums[left]||target>nums[middle])left=(middle+1);
            // 否则目标值在区间[left,middle]中，则去掉[middle,right]区间
            // 从[left,middle-1]继续遍历
            else right=(middle-1);
        }
        // 否则[middle,right]区间全为升序
        else
        {
            // 如果目标值不在该区间值的范围内，则去掉区间[middle,right]从
            // [left,middle-1]区间继续遍历
            if(target<nums[middle]||target>nums[right])right=(middle-1);
            // 否则目标值在区间[middle,right]中，则去掉[left,middle]区间
            // 从[middle+1,right]继续遍历
            else left=(middle+1);
        }
    }
    // 遍历完数组元素后仍未找到目标值，直接返回-1
    return -1;
}

```


[如何在排序后的数组中找到某个值？](./如何在排序后的数组中找到某个值？/index.md "如何在排序后的数组中找到某个值？")

[搜索算法](./搜索算法/index.md "搜索算法")

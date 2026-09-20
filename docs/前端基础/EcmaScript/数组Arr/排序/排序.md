# 排序

## 目录

- [冒泡排序](#冒泡排序)
- [快速排序](#快速排序)
- [复合排序](#复合排序)
- [ 原生排序](#原生排序)

## 冒泡排序

```javascript 
    //1. 冒泡排序,一次选一个最大的放在后面,arr.length次,每次少比较一个
  function mpSortFun(arr){
        for ( var i = 0 ; i < arr.length ; i++ ){
          //一遍就选一个最大的放在最后,要arr.length遍才能把这个数组排序好.
            for ( var j = 0 ; j < arr.length - 1 - i ; j++ ){
              //小循环，和其他元素进行比较,把最大的放在最后面,其余的我不管.
                //交换位置 arr[j] arr[j+1]
                var temp ;
                if ( arr[j] > arr[j+1] ){
                    temp = arr[j] ;
                    arr[j] = arr[j+1] ;
                    arr[j+1] = temp ;
                }
            }
        }
        return arr ;
    }
```


## 快速排序

```javascript 
 // 2. 快速排序 一次一轮 两两交换
    function quickSortFun(arr){
        for( var i = 0  ; i < arr.length ; i++ ){//数组中的每一个数
            var min = arr[i] ;  //假设最小的值
            var minIndex = i ;  //最小值所在的索引
            for ( var j = i + 1 ; j < arr.length ; j++ ){//当前项依次于其他项进行比较
                if ( min > arr[j]){  //如果不是最小的
                    min = arr[j] ;  //把更小的值和索引交给假定的最小的值和索引
                    minIndex = j ;
                }  
            }
            //通过中间变量互换值
            arr[minIndex] = arr[i] ;  //循环结束以后,把最小的值和假设最小的值交换
            arr[i] = min ;
          
        }
        return arr ;
    }


```


```javascript 
/**
 * 快速排序:
 * @param arr 需要进行快速排序的数组
 * @returns {*[]|*}
 */
const quickSort = function (arr) {
    if(arr.length < 2) return arr;
    // 随机选择0～arr.length之间选一个基准值
    const pivot = Math.floor(Math.random() * arr.length)
    // 声明两个数组，分别用于存放比基准值小的数据和比基准值大的数据
    let minArr = [];
    let maxArr = [];
    // 根据基准值填充数组
    for(let i = 0; i < arr.length; i++){
        // 大于基准值就放maxArr里
        if(arr[i] >= arr[pivot] && i !== pivot){
            maxArr.push(arr[i]);
        }
        // 小于基准值就放minArr里
        if(arr[i] < arr[pivot] && i !== pivot){
            minArr.push(arr[i])
        }
    }
    // 分别对基准值划分出来的数组递归调用快速排序，然后合并数组
    return [...quickSort(minArr), arr[pivot], ...quickSort(maxArr)];
}


```


## 复合排序

```javascript 
   var arr = ["sp12","su18","au13","wi14"]
    for(var i = 0 ; i < arr.length;i++){
        for(var j = 0 ; j < arr.length-i-1;j++){
            if(parseInt( arr[j].substr(2,2) ) > parseInt( arr[j+1].substr(2,2) ) ){
                var temp = arr[j];
                arr[j]=arr[j+1];
                arr[j+1] = temp
            }
        }
    }
```


##  原生排序

```javascript 
 arr.sort(function(a,b){return a.age-b.age}})
```


答案是D。MDN规范关于 reverse 的描述：

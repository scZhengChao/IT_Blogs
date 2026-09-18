# 本地数据库

## 目录

- [react-native-local-mongodb](#react-native-local-mongodb)
- [nedb-react-native  ](#nedb-react-native-)
  - [Nedb应用：](#Nedb应用)
- [react-native-sqlite-storage](#react-native-sqlite-storage)
  - [附上sql  基本语法](#附上sql-基本语法)
  - [demo](#demo)
    - [model](#model)
    - [helper](#helper)
    - [sqlte封装](#sqlte封装)
    - [中间层转换数据](#中间层转换数据)

# **react-native-local-mongodb**

[  https://github.com/antoniopresto/react-native-local-mongodb](https://github.com/antoniopresto/react-native-local-mongodb "  https://github.com/antoniopresto/react-native-local-mongodb")

# \*\*nedb-react-native  \*\*

[GitHub - nedbhq/nedb-react-native: \[WIP\] React Native NeDB storage adapter \[WIP\] React Native NeDB storage adapter. Contribute to nedbhq/nedb-react-native development by creating an account on GitHub. https://github.com/nedbhq/nedb-react-native](https://github.com/nedbhq/nedb-react-native "GitHub - nedbhq/nedb-react-native: \[WIP] React Native NeDB storage adapter \[WIP] React Native NeDB storage adapter. Contribute to nedbhq/nedb-react-native development by creating an account on GitHub. https://github.com/nedbhq/nedb-react-native")

api：可以参考&#x20;

[GitHub - nedbhq/nedb-core: The JavaScript Database, for Node.js, nw.js, electron and the browser The JavaScript Database, for Node.js, nw.js, electron and the browser - GitHub - nedbhq/nedb-core: The JavaScript Database, for Node.js, nw.js, electron and the browser https://github.com/nedbhq/nedb-core](https://github.com/nedbhq/nedb-core "GitHub - nedbhq/nedb-core: The JavaScript Database, for Node.js, nw.js, electron and the browser The JavaScript Database, for Node.js, nw.js, electron and the browser - GitHub - nedbhq/nedb-core: The JavaScript Database, for Node.js, nw.js, electron and the browser https://github.com/nedbhq/nedb-core")

或者 推荐

[Nedb new Datastore()\_w3cschool new Datastore(options)  作用： 初始化一个数据存储，相当于MongoDB的一个集合、Mysql的一张表。 options对象配置参数： ① filename(可选): 数据存储文件路径。如果为空，数据将会自动存储在内存中。注意路径不能以“\~”结尾。 ② inMemoryOnl\_来自NeDB—Node嵌入式数据库，w3cschool编程狮。 https://www.w3cschool.cn/nedbintro/nedbintro-t9z327mh.html](https://www.w3cschool.cn/nedbintro/nedbintro-t9z327mh.html "Nedb new Datastore()_w3cschool new Datastore(options)  作用： 初始化一个数据存储，相当于MongoDB的一个集合、Mysql的一张表。 options对象配置参数： ① filename(可选): 数据存储文件路径。如果为空，数据将会自动存储在内存中。注意路径不能以“~”结尾。 ② inMemoryOnl_来自NeDB—Node嵌入式数据库，w3cschool编程狮。 https://www.w3cschool.cn/nedbintro/nedbintro-t9z327mh.html")

```javascript 
 // @flow
import DataStore from 'react-native-nedb'
import  RNFS from 'react-native-fs'
import {onRequestErrorHandler} from "modern/utils/apirequest/trackRequestHandler";
import _ from "lodash";
import toastUtils from "modern/utils/toastUtils";
import {INN_EXPRESS_CABINET_GRID,UPLODA_TASK_QUEUE} from "../page/expressCabinet/utils/constant";

export let ElectronCabinetDB:any
export let UploadErrorDb:any
export const handDBError = (title:string,body:string)=>{
    onRequestErrorHandler({
        requestURL: `ElectronCabinetDB/ensureIndex`,
        requestHeader: '',
        requestBody: '',
        isTrackResponse: true,
        responseCode: '',
        responseHeader: '',
        responseBody: body,
        responseTime: 0,
    }).then(_.noop).catch(_.noop)
}
const handDBPromise = (name:string='handDBPromise',handle:any=_.noop)=>(param:any={})=> {
    const {callback=_.noop,data={}} = param
    return new Promise((resolve, reject) => {
        try{
            handle(data, (err: any, res: any={}) => {
                if (err) {
                    reject(err)
                } else {
                    callback(res)
                    resolve(res)
                }
            })
        }catch (err){
            reject(err)
        }
    }).then(docs => [null, docs]).catch(err => {
        handDBError(name, err.message || '')
        return [err, null]
    })
}

interface ISExpressGridLocalType  {
    id: string, // '唯一主键id',
    express_cabinet_id?: string, // 所属快递柜id
    device_id?: string,
    physics_status?: string, // 格子物理状态:-1故障，0关闭，1打开中,2打开
    logic_status?: string, // 格子逻辑状态:0：空格子, 1:非空格子, -1:异常  2预约   3 不可打开
    size?: string, // 格子规格大小:1小格子，2中格子，3大格子，4超大格子
    row?:string, // 格子所在行
    col?:string,  // 格子所在列
    create_at?:string, // 快递格子创建日期
    ec_scan_code?:string, // 扫描记录表id
    pickup_code?:string, // 取件码
    open_at?:string, // 开门时间
    close_at?:string, // 关门时间
    phone?:string, // 取件人手机号
    coordinate?:any, // 实际坐标
    appointCourier?:string  // 预约快递员id
    open_type?:string // 开柜类型
}
// init DB
export  const initGridDB = handDBPromise('initDB',  (param:any={},handle:any)=>{
    const newDB = (allowReload:boolean=false)=>{
        ElectronCabinetDB = new DataStore({
            filename: INN_EXPRESS_CABINET_GRID,
            autoload: true,
            corruptAlertThreshold:0,
            onload(err:any){
                if(err){
                    if(allowReload) reloadFs()
                    handle(err,{})
                }
                handle(null,ElectronCabinetDB)
            },
        })
    }
    newDB(true)

    const reloadFs = async  ()=>{
        try{
            const data = await RNFS.readDir(RNFS.DocumentDirectoryPath)
            const nedb  = data.find(item=> item.name === "nedb")
            if(nedb && nedb.isDirectory()){
                const nedbDir =  await RNFS.readDir(nedb.path)
                const nowDb =  nedbDir.find(val=>val.name === INN_EXPRESS_CABINET_GRID)
                if(nowDb){
                    const del = await RNFS.unlink(nowDb.path)
                }
            }
        }catch (err){
            handDBError('reloadFs',err.message || '')
        }finally {
            newDB(false)
        }

    }
})
export  const initTaskQueueDB = handDBPromise('initDB',  (param:any={},handle:any)=>{
    const newDB = (allowReload:boolean=false)=>{
        UploadErrorDb = new DataStore({
            filename: UPLODA_TASK_QUEUE,
            autoload: true,
            corruptAlertThreshold:0,
            onload(err:any){
                if(err){
                    if(allowReload) reloadFs()
                    handle(err,{})
                }
                handle(null,UploadErrorDb)
            },
        })
    }
    newDB(true)
    const reloadFs = async  ()=>{
        try{
            const data = await RNFS.readDir(RNFS.DocumentDirectoryPath)
            const nedb  = data.find(item=> item.name === "nedb")
            if(nedb && nedb.isDirectory()){
                const nedbDir =  await RNFS.readDir(nedb.path)
                const nowDb =  nedbDir.find(val=>val.name === UPLODA_TASK_QUEUE)
                if(nowDb){
                    const del = await RNFS.unlink(nowDb.path)
                }
            }
        }catch (err){
            handDBError('reloadFs',err.message || '')
        }finally {
            newDB(false)
        }
    }
})

// 查
export const findAll = handDBPromise('findAll', (param:any,handle:any)=>{
    ElectronCabinetDB.find(param,handle)
})
// 纯插入  一条或者多条
export const insetAny = handDBPromise('insetAny',(param:any,handle:any)=>{
    ElectronCabinetDB.insert(param,handle)
})
// 删除
export const removeOneOrAny = handDBPromise('removeOneOrAny',(param={},handle:any)=>{
    ElectronCabinetDB.remove(param,{multi: true }, handle)
})

// 根据 取件码 查格口
export const findGridFromCode = handDBPromise('findGridFromCode',(param={},handle:any)=>{
    ElectronCabinetDB.find(param,{multi: true }, handle)
})
// 跟新格子信息
export const updateGridInfo = handDBPromise('findGridFromCode',(param:any={},handle:any)=>{
    const { id, docs} = param
    ElectronCabinetDB.update({ id }, docs , {returnUpdatedDocs:true},(err:any, numAffected:number, affectedDocuments:any, upsert:any)=>{
        handle(err,affectedDocuments)
    })
})

// 开柜后 跟新格子信息  只知道 id 的情形下
export const updateGridStatus  = handDBPromise('updateGridInfo',async (param:any={},handle:any)=>{
    const { id ,updateInfo} = param
    findAll({data:{id}}).then(([error,res])=>{
        if(!_.isEmpty(res)){
            const docs ={...res[0],...updateInfo}
            updateGridInfo({
                data:{
                    id,
                    docs,
                }
            }).then(([err,value])=>{
                if(_.isEmpty(value))  toastUtils.showShortCenter('跟新失败')
                handle(err,value)
            })
        }else{
            toastUtils.showShortCenter('无该格口')
            handle(error,res)
        }
    })
})
// 给传入的 格子信息排序
export const sortGridList = (list:any[]=[])=>{
    try{
        const initArr = list.sort((a:any,b:any)=>a.row-b.row)
        const classGridList =  initArr.reduce((init,value,index)=>{
            if(!init[value.row]) init[value.row] = []
            init[value.row].push(value)
            return init
        },{})
        let  sortArr:any[] = []
        Object.values(classGridList).forEach((item:any)=>{
            sortArr = sortArr.concat(item.sort((a:any,b:any)=>a.col-b.col ))
        })
        return sortArr
    }catch (e) {
        return []
    }
}

// 传入 格子信息 计算 每种格子大小
export const countGridSize = (list:any[])=>{
    try{
        const statusObj:any = {
            '1':0,
            '2':0,
            '3':0,
            '4':0,
        }
        if(!_.isEmpty(list)){
            list.forEach((item:any)=>{
                statusObj[item.size] ++
            })
        }
        return statusObj
    }catch (e) {
        return {}
    }
}
// 预约 格子
export  const appointGridDB =handDBPromise('appointGrid',async (param:any={},handle:any)=>{
    const { filter ={},dbDoc={}}   = param
    const [error,gridList ] = await findAll({data:{logic_status:'0',...filter}})
    if(_.isEmpty(gridList)){
        handle('没有该类型格子',null)
        return
    }
    const minSortGrid =  sortGridList(gridList)[0]
    const docs = {...minSortGrid,logic_status:'2',...dbDoc}
    const [err,value] = await updateGridInfo({data:{id:minSortGrid.id,docs}})
    handle(err,value)
})



// 分配取件码  和 格子
export const  getTakeCodeAndGridInfo = handDBPromise('updateTakeCode',async (param:any={},handle:any)=>{
    // 生成取件码
    const createRandomCode = ()=>{
        return Array.apply(null,{length:8}).map(item=>{
            return _.random(0,9)
        }).join('')
    }
    // 去报取件码唯一
   const  isTheOnlyCode = async ()=>{
        const code:string = createRandomCode()
        const [error,res] = await findAll({data:{pickup_code:code}})
        if(_.isEmpty(res) && _.isArray(res)) return code
        const newCode:string  = await isTheOnlyCode()
        if(newCode) return newCode
        return ''
   }
   const  onlyCode = await isTheOnlyCode()

   // 找到最近的格子
   const [girdInfoError ,gridInfo] =  await  findAll({data:param})
    if(_.isEmpty(gridInfo)){
        handle({message:'没有剩余空箱'},null)
        return
    }
    const sortList = sortGridList(gridInfo)
    const row = sortList[0]?.row
    const Sortitem = sortList.filter((item:any)=>item.row === row).sort((a:any,b:any)=>a.col - b.col)[0]
    handle(null,{
        info:Sortitem,
        onlyCode
    })
})

// 设置电源格 永久不能打开
export const setNeverOpenGrid =  handDBPromise('setNeverOpenGrid',async (param:any={},handle:any)=>{
    const [error,data] = await findAll({data:{
            col:'0',
            row:'0',
        }})
    if(_.isEmpty(data)) return handle({message:'没有0，0 箱格'},null)
    const [err,value]  = await updateGridStatus({data:{
        id:data[0].id,
            updateInfo:{
                logic_status:'3'
            }
        }})
    if(err) return handle({message:'设置主机事变'},null)
    handle(null,value)
})



// 删除 所有的箱子
export const removeAll = handDBPromise('removeAll',async (param:any={},handle:any)=>{
   await ElectronCabinetDB.remove({}, { multi: true }, function (err:any, numRemoved:any) {
        handle(err,numRemoved)
    });

})


/*
 * 错误请求 表
 */


// 存入  请求 任务
export const writeIn = handDBPromise('writeIn',(param:any,handle:any)=>{
    UploadErrorDb.insert(param,handle)
})
// 获取所有 任务
export const getAllTask = handDBPromise('getAllTask',(param:any,handle:any)=>{
    UploadErrorDb.find(param,handle)
})

// 删除任务
export const deleteTask = handDBPromise('deleteTask',(param:any,handle:any)=>{
    UploadErrorDb.remove(param,{multi: true }, handle)
})

// 跟新任务
export const updateTask = handDBPromise('updateTask',(param:any,handle:any)=>{
    const { id ,updateInfo} = param

    getAllTask({data:{id}}).then(([error,res])=>{
        if(!_.isEmpty(res)){
            const docs ={...res[0],...updateInfo}
            updateGridInfo({
                data:{
                    id,
                    docs,
                }
            }).then(([err,value])=>{
                if(_.isEmpty(value))  toastUtils.showShortCenter('跟新失败')
                handle(err,value)
            })
        }else{
            toastUtils.showShortCenter('无该格口')
            handle(error,res)
        }
    })
})
```


## Nedb应用：

```javascript 
 
// @flow
import DataStore from 'react-native-nedb'
import  RNFS from 'react-native-fs'
import {onRequestErrorHandler} from "modern/utils/apirequest/trackRequestHandler";
import _ from "lodash";
import toastUtils from "modern/utils/toastUtils";
import {INN_EXPRESS_CABINET_GRID,UPLODA_TASK_QUEUE} from "../page/expressCabinet/utils/constant";

export let ElectronCabinetDB:any
export let UploadErrorDb:any
export const handDBError = (title:string,body:string)=>{
    onRequestErrorHandler({
        requestURL: `ElectronCabinetDB/ensureIndex`,
        requestHeader: '',
        requestBody: '',
        isTrackResponse: true,
        responseCode: '',
        responseHeader: '',
        responseBody: body,
        responseTime: 0,
    }).then(_.noop).catch(_.noop)
}
const handDBPromise = (name:string='handDBPromise',handle:any=_.noop)=>(param:any={})=> {
    const {callback=_.noop,data={}} = param
    return new Promise((resolve, reject) => {
        try{
            handle(data, (err: any, data: any={}) => {
                if (err) {
                    reject(err)
                } else {
                    callback(data)
                    resolve(data)
                }
            })
        }catch (err){
            reject(err)
        }
    }).then(docs => [null, docs]).catch(err => {
        handDBError(name, err.message || '')
        return [err, null]
    })
}

interface ExpressGridLocalType  {
    id: string, //'唯一主键id',
    express_cabinet_id?: string, //所属快递柜id
    device_id?: string,
    physics_status?: string, //格子物理状态:-1故障，0关闭，1打开中,2打开
    logic_status?: string, //格子逻辑状态:0：空格子, 1:非空格子, -1:异常  2预约   3 不可打开
    size?: string, //格子规格大小:1小格子，2中格子，3大格子，4超大格子
    row?:string, //格子所在行
    col?:string,  //格子所在列
    create_at?:string, // 快递格子创建日期
    ec_scan_code?:string, //扫描记录表id
    pickup_code?:string, //取件码
    open_at?:string, //开门时间
    close_at?:string, //关门时间
    phone?:string, //取件人手机号
    coordinate?:any, // 实际坐标
    appointCourier?:string  // 预约快递员id
    open_type?:string //开柜类型
}
interface FetchReLoadDb {
    [propName:string]:string
}
// init DB
export  const initGridDB = handDBPromise('initDB',  (param:any={},handle:any)=>{
    const newDB = (allowReload:boolean=false)=>{
        ElectronCabinetDB = new DataStore({
            filename: INN_EXPRESS_CABINET_GRID,
            autoload: true,
            corruptAlertThreshold:0,
            onload:function (err:any){
                if(err){
                    if(allowReload) reloadFs()
                    handle(err,{})
                }
                handle(null,ElectronCabinetDB)
            },
        })
    }
    newDB(true)

    const reloadFs = async  ()=>{
        try{
            const data = await RNFS.readDir(RNFS.DocumentDirectoryPath)
            const nedb  = data.find(item=> item.name === "nedb")
            if(nedb && nedb.isDirectory()){
                const nedbDir =  await RNFS.readDir(nedb.path)
                const nowDb =  nedbDir.find(val=>val.name === INN_EXPRESS_CABINET_GRID)
                if(nowDb){
                    const del = await RNFS.unlink(nowDb.path)
                }
            }
        }catch (err){
            handDBError('reloadFs',err.message || '')
        }finally {
            newDB(false)
        }

    }
})
export  const initTaskQueueDB = handDBPromise('initDB',  (param:any={},handle:any)=>{
    const newDB = (allowReload:boolean=false)=>{
        UploadErrorDb = new DataStore({
            filename: UPLODA_TASK_QUEUE,
            autoload: true,
            corruptAlertThreshold:0,
            onload:function (err:any){
                if(err){
                    if(allowReload) reloadFs()
                    handle(err,{})
                }
                handle(null,UploadErrorDb)
            },
        })
    }
    newDB(true)
    const reloadFs = async  ()=>{
        try{
            const data = await RNFS.readDir(RNFS.DocumentDirectoryPath)
            const nedb  = data.find(item=> item.name === "nedb")
            if(nedb && nedb.isDirectory()){
                const nedbDir =  await RNFS.readDir(nedb.path)
                const nowDb =  nedbDir.find(val=>val.name === UPLODA_TASK_QUEUE)
                if(nowDb){
                    const del = await RNFS.unlink(nowDb.path)
                }
            }
        }catch (err){
            handDBError('reloadFs',err.message || '')
        }finally {
            newDB(false)
        }
    }
})

// 查
export const findAll = handDBPromise('findAll', (param:any,handle:any)=>{
    ElectronCabinetDB.find(param,handle)
})
// 纯插入  一条或者多条
export const insetAny = handDBPromise('insetAny',(param:any,handle:any)=>{
    ElectronCabinetDB.insert(param,handle)
})
// 删除
export const removeOneOrAny = handDBPromise('removeOneOrAny',(param={},handle:any)=>{
    ElectronCabinetDB.remove(param,{multi: true }, handle)
})

//根据 取件码 查格口
export const findGridFromCode = handDBPromise('findGridFromCode',(param={},handle:any)=>{
    ElectronCabinetDB.find(param,{multi: true }, handle)
})
// 跟新格子信息
export const updateGridInfo = handDBPromise('findGridFromCode',(param:any={},handle:any)=>{
    const { id, docs} = param
    ElectronCabinetDB.update({ id }, docs , {returnUpdatedDocs:true},(err:any, numAffected:number, affectedDocuments:any, upsert:any)=>{
        handle(err,affectedDocuments)
    })
})

// 开柜后 跟新格子信息  只知道 id 的情形下
export const updateGridStatus  = handDBPromise('updateGridInfo',async (param:any={},handle:any)=>{
    const { id ,updateInfo} = param
    findAll({data:{id}}).then(([error,res])=>{
        if(!_.isEmpty(res)){
            const docs ={...res[0],...updateInfo}
            updateGridInfo({
                data:{
                    id,
                    docs,
                }
            }).then(([err,value])=>{
                if(_.isEmpty(value))  toastUtils.showShortCenter('跟新失败')
                handle(err,value)
            })
        }else{
            toastUtils.showShortCenter('无该格口')
            handle(error,res)
        }
    })
})
// 给传入的 格子信息排序
export const sortGridList = (list:any[]=[])=>{
    try{
        const initArr = list.sort((a:any,b:any)=>a.row-b.row)
        const classGridList =  initArr.reduce((init,value,index)=>{
            if(!init[value.row]) init[value.row] = []
            init[value.row].push(value)
            return init
        },{})
        let  sortArr:any[] = []
        Object.values(classGridList).forEach((item:any)=>{
            sortArr = sortArr.concat(item.sort((a:any,b:any)=>a.col-b.col ))
        })
        return sortArr
    }catch (e) {
        return []
    }
}

// 传入 格子信息 计算 每种格子大小
export const countGridSize = (list:any[])=>{
    try{
        const statusObj:any = {
            '1':0,
            '2':0,
            '3':0,
            '4':0,
        }
        if(!_.isEmpty(list)){
            list.forEach((item:any)=>{
                statusObj[item.size] ++
            })
        }
        return statusObj
    }catch (e) {
        return {}
    }
}
// 预约 格子
export  const appointGridDB =handDBPromise('appointGrid',async (param:any={},handle:any)=>{
    const { filter ={},dbDoc={}}   = param
    const [error,gridList ] = await findAll({data:{logic_status:'0',...filter}})
    if(_.isEmpty(gridList)){
        handle('没有该类型格子',null)
        return
    }
    const minSortGrid =  sortGridList(gridList)[0]
    const docs = {...minSortGrid,logic_status:'2',...dbDoc}
    const [err,value] = await updateGridInfo({data:{id:minSortGrid.id,docs}})
    handle(err,value)
})



// 分配取件码  和 格子
export const  getTakeCodeAndGridInfo = handDBPromise('updateTakeCode',async (param:any={},handle:any)=>{
    // 生成取件码
    const createRandomCode = ()=>{
        return Array.apply(null,{length:8}).map(item=>{
            return _.random(0,9)
        }).join('')
    }
    // 去报取件码唯一
   const  isTheOnlyCode = async ()=>{
        const code:string = createRandomCode()
        const [error,res] = await findAll({data:{pickup_code:code}})
        if(_.isEmpty(res) && _.isArray(res)) return code
        const newCode:string  = await isTheOnlyCode()
        if(newCode) return newCode
        return ''
   }
   const  onlyCode = await isTheOnlyCode()

   // 找到最近的格子
   const [girdInfoError ,gridInfo] =  await  findAll({data:param})
    if(_.isEmpty(gridInfo)){
        handle({message:'没有剩余空箱'},null)
        return
    }
    const sortList = sortGridList(gridInfo)
    const row = sortList[0]?.row
    const Sortitem = sortList.filter((item:any)=>item.row === row).sort((a:any,b:any)=>a.col - b.col)[0]
    handle(null,{
        info:Sortitem,
        onlyCode
    })
})

export const setNeverOpenGrid =  handDBPromise('setNeverOpenGrid',async (param:any={},handle:any)=>{
    const [error,data] = await findAll({data:{
            col:'0',
            row:'0',
        }})
    if(_.isEmpty(data)) return handle({message:'没有0，0 箱格'},null)
    const [err,value]  = await updateGridStatus({data:{
        id:data[0].id,
            updateInfo:{
                logic_status:'3'
            }
        }})
    if(err) return handle({message:'设置主机事变'},null)
    handle(null,value)
})


/*
 * 错误请求 表
 */


// 存入  请求 任务
export const writeIn = handDBPromise('writeIn',(param:any,handle:any)=>{
    UploadErrorDb.insert(param,handle)
})
// 获取所有 任务
export const getAllTask = handDBPromise('getAllTask',(param:any,handle:any)=>{
    UploadErrorDb.find(param,handle)
})

// 删除任务
export const deleteTask = handDBPromise('deleteTask',(param:any,handle:any)=>{
    UploadErrorDb.remove(param,{multi: true }, handle)
})

// 跟新任务
export const updateTask = handDBPromise('updateTask',(param:any,handle:any)=>{
    const { id ,updateInfo} = param

    getAllTask({data:{id}}).then(([error,res])=>{
        if(!_.isEmpty(res)){
            const docs ={...res[0],...updateInfo}
            updateGridInfo({
                data:{
                    id,
                    docs,
                }
            }).then(([err,value])=>{
                if(_.isEmpty(value))  toastUtils.showShortCenter('跟新失败')
                handle(err,value)
            })
        }else{
            toastUtils.showShortCenter('无该格口')
            handle(error,res)
        }
    })
})





// 本地队列
import _ from 'lodash'
import { pickupAction,gridStatusAction,openCbAction,orderAsyncAction,getBackAction }  from '../actions/cabinetInfoAction'
import {writeIn, getAllTask, deleteTask, updateGridStatus} from '../database'
import toastUtils from "modern/utils/toastUtils";
const apiMap:any = {
    'pickupAction':{
        action:pickupAction,
        nextDone:_.noop
    },
    'gridStatusAction':{
        action:gridStatusAction,
        nextDone:_.noop,
    },
    'openCbAction':{
        action:openCbAction,
        nextDone:_.noop,
    },
    'orderAsyncAction':{
        action:orderAsyncAction,
        nextDone:(res:any,err:any,param:any={})=>{
            if(res && Number(res.code) !== 0  ){
                updateGridStatus({data:{
                        id:param.grid,
                        updateInfo:{
                            logic_status:'-1'
                        }
                    }})
            }
        }
    },
    'getBackAction':{
        action:getBackAction,
        nextDone:_.noop,
    },
}
let  Task:any
export class TaskQueue {
    public task:any[]
    public dispatch:any
    public timeOut:any
    public stopHandleTash:any
    public frequency:number
    public count:number
    public constructor() {
        this.task = []
        this.dispatch = null
        this.stopHandleTash= null
        this.frequency = 10
        this.count = 0
        this.getAllTash(()=>{
            this.run()
        })
    }
    public getAllTash = async (cb:any=_.noop)=>{
       const [err,res] =  await getAllTask({data:{}})
        if(res && !_.isEmpty(res)){
            this.task = res
        }else{
            this.task = []
        }
        cb()
    }
    public getTaskLength = ()=> this.task.length
    public addTask = async (fetchAction:any,param:any)=> {
        const {callback=_.noop,...ext} = param || {}
        const {action=_.noop,} = apiMap[fetchAction] || {}
        await this.dispatch(action({
            ...ext,
            handleError:true,
            callback:(res:any,err:any)=>{
                if(err){
                    writeIn({
                        data:{
                            fetchAction,
                            param:ext,
                        }
                    })
                }
                callback(res,err)
            }
        }))
    }
    public run = ()=>{
        this.stop()
        this.stopHandleTash = setInterval(()=>{
            this.HandleTask()
        },this.frequency*1000)
    }
    public deleteTask = (firstTask:any)=>{
        deleteTask({
            data:{
                _id:firstTask._id
            }
        })
    }
    public nextTask =()=>{
        const task = this.task.shift()
        this.task.push(task)
    }
    public reloadFetch = (firstTask:any)=>{
        const { fetchAction ,param={}} = firstTask
        const {action=_.noop,nextDone} = apiMap[fetchAction] || {}
        this.dispatch(action({
                handleError:true,
                ...param,
                callback:(res:any,err:any)=>{
                    toastUtils.showShortBottom(`${fetchAction}----response:${err?'err':'ok'}`)
                    nextDone(res,err,param)
                    if(err){
                        this.nextTask()
                        return
                    }
                    this.deleteTask(firstTask)
                }
            }))
    }
    public checkNum=()=>{
        if(_.isEmpty(this.task)){
            this.count = 0
            return this.getAllTash()
        }

        const firstTask = this.task[this.count]
        if(!firstTask){
            this.count = 0
            return this.getAllTash()
        }
    }
    public HandleTask = ()=>{
        try{
            this.checkNum()
            if(_.isEmpty(this.task)) return
            const firstTask = this.task[this.count]
            this.count++
            this.reloadFetch(firstTask)
        }catch(err){
            this.removeAllTask()
            this.stop()
            this.run()
        }
    }
    public removeAllTask = ()=>{
        this.task = []
    }
    public setOptions = (options:{
        dispatch:any,
        frequency?:number,
    })=>{
        const {
            dispatch=_.noop,
            frequency= this.frequency,
        } = options
        this.dispatch = dispatch
        this.frequency = frequency
    }
    public stop = ()=>{
        clearInterval(this.stopHandleTash)
    }
}

export const setTask = (data:any)=>{
    Task = data
}
export default  ()=>Task
```


# react-native-sqlite-storage

[npm: react-native-sqlite-storage SQLite3 bindings for React Native (Android & iOS) https://www.npmjs.com/package/react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage "npm: react-native-sqlite-storage SQLite3 bindings for React Native (Android & iOS) https://www.npmjs.com/package/react-native-sqlite-storage")

## 附上sql  基本语法

[SQL 简介  https://www.w3school.com.cn/sql/sql\_intro.asp](https://www.w3school.com.cn/sql/sql_intro.asp "SQL 简介  https://www.w3school.com.cn/sql/sql_intro.asp")

sqlite

[SQLite 数据类型 | 菜鸟教程 SQLite 数据类型   SQLite 数据类型是一个用来指定任何对象的数据类型的属性。SQLite 中的每一列，每个变量和表达式都有相关的数据类型。 您可以在创建表的同时使用这些数据类型。SQLite 使用一个更普遍的动态类型系统。在 SQLite 中，值的数据类型与值本身是相关的，而不是与它的容器相关。   SQLite 存储类 每个存储在 SQLite 数据库中的值都具有以下存储类之一：  https://www.runoob.com/sqlite/sqlite-data-types.html](https://www.runoob.com/sqlite/sqlite-data-types.html "SQLite 数据类型 | 菜鸟教程 SQLite 数据类型   SQLite 数据类型是一个用来指定任何对象的数据类型的属性。SQLite 中的每一列，每个变量和表达式都有相关的数据类型。 您可以在创建表的同时使用这些数据类型。SQLite 使用一个更普遍的动态类型系统。在 SQLite 中，值的数据类型与值本身是相关的，而不是与它的容器相关。   SQLite 存储类 每个存储在 SQLite 数据库中的值都具有以下存储类之一：  https://www.runoob.com/sqlite/sqlite-data-types.html")

## demo

### model

```javascript 
import { singleLiteStorage } from 'react-common/database/sqlite/sqlite'
import { constraints, convert, Field, types } from 'react-common/database/sqlite/helper'
import {modelDbEnhance} from "react-common/database/sqlite/models/modelDbUtil";
import _ from "lodash";



const fieldSchema = ()=>{
  return {
    id: Field(types.primary),
    inStockSource: Field(types.string),
    otherTag: Field(types.string),
    userId: Field(types.integer),
    goodsType: Field(types.stringAt(3)),
    pickupCode: Field(types.stringAt(20)),
    phone:Field(types.stringAt(20)),
    waybill: Field(types.stringAt(40)),
    waybillNo: Field(types.stringAt(40)),
    brand: Field(types.stringAt(10)),
    brandName: Field(types.stringAt(20)),
    scan_time: Field(types.date),
    contactFlag: Field(types.stringAt(3)),
    contact: Field(types.stringAt(60)),
    telRepeatCount: Field(types.stringAt(4)),
    innId: Field(types.stringAt(11)),
    phoneNum: Field(types.stringAt(20)),
    remark: Field(types.stringAt(60)),
    expressType: Field(types.stringAt(3)),
    smsSupplier: Field(types.stringAt(4)),
    signer: Field(types.string),
    iscombine: Field(types.stringAt(2)),
    create_time: Field(types.date),
    isAutoUploadData: Field(types.boolean),
    autoUploadStatus: Field(types.stringAt(20)),
    batchNo: Field(types.string),
    storageOnlyNotCollection:Field(types.stringAt(2)),
    phoneMode:Field(types.stringAt(10)),
    lightBar:Field(types.stringAt(20)),
    pickupCodeMode:Field(types.stringAt(20)),
  }
}
export const fixStructure = (data: any) => {
  return _.pick(data, _.keys(fieldSchema()))
}
export const smsInstorageDb = ()=>modelDbEnhance({
  db: () => singleLiteStorage('smsInstorage211213', fieldSchema(), [
    constraints.indexAt(["phone"]),
    constraints.indexAt(["waybill"]),
    constraints.indexAt(["pickupCode"]),
  ]),
  converInsertFc: (data: any)=>{
    return Array.isArray(data) ? data.map(item => (convert.insert(fixStructure(item)))) : convert.insert(fixStructure(data))
  },
  converUpdateFc: (data: any)=>{
    return convert.set(_.pick(data, _.keys(fieldSchema())))
  }
})


```


### helper

```javascript 
const isPrimaryKey = (d) => d.toLowerCase().includes('primary key (')

export const types = {
  primary: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  primaryAt: (fields) => ` primary key (${fields.join(',')})`,
  auto_increment: ' INTEGER AUTOINCREMENT',
  integer: "INTEGER",
  money: "decimal",
  boolean: 'BOOL',
  float: 'float',
  string: 'TEXT',
  date: 'datetime',
  blob: 'BINARY',
  stringAt: (size = 128) => `VARCHAR(${size})`,
}

const constraint_types = {index: 'index', unique: 'unique'}
export const constraints = {
  indexAt: (fields) => ({type: constraint_types.index, sql: ` (${fields.join(',')})`}),
  uniqueAt: (fields) => ({type: constraint_types.unique, sql: ` (${fields.join(',')})`}),
}

export const whereTo = {
  and: 'AND',
  or: 'OR',
  none: ' ',
}
export const Field = (type) => type

const toParams = (object, keyTo, valueTo, join = whereTo.and) => {
  const params = []
  const sql = Object.entries(object).map(([key, value]) => {
    if (valueTo) params.push(valueTo(value))
    return keyTo(key, value)
  }).join(` ${join} `)
  return {sql, params}
}

export const convert = {
  insert: (object) => ({
    fields: Object.keys(object).join(' , '),
    holder: Object.keys(object).map(d => ' ? ').join(','),
    params: Object.values(object)
  }),
  merge: (object, join = whereTo.and) => {
    if (!Array.isArray(object)) return object
    const sql = object.map(d => d.sql).join(join)
    const params = []
    object.forEach(d => params.push(...d.params))
    return {sql, params}
  },
  group: (object, join = whereTo.and) => {
    const {sql, params} = convert.merge(object, join)
    return {sql: ` ( ${sql} ) `, params}
  },
  lt: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} <= ? `, (v) => v, join),
  gt: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} >= ? `, (v) => v, join),
  start: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} LIKE ? `, (v) => `${v}%`, join),
  equal: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} = ? `, (v) => v, join),
  includes: (object, join = whereTo.and) => {
    const parsed=toParams(object, (k, v) => ` ${k} in (${v.map(d => `?`).join(',')}) `, (v) => v, join)
    return {...parsed,params:parsed.params[0]}
  },
  set: (object) => toParams(object, (k) => ` ${k} = ? `, (v) => v, ','),
  end: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} LIKE ? `, (v) => `%${v}`, join),
  contains: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} LIKE ? `, (v) => `%${v}%`, join),
  isNull: (object, join = whereTo.and) => toParams(object, (k) => ` ${k} IS NULL`, null, join),
  orderBy: (object) => ` ORDER BY ` + Object.entries(object).map(([k, v]) => `${k}${v ? ` DESC ` : ' ASC '}`).join(' , '),    //默认ASC,传值降序
  limit: (lookAt, size) => ` Limit ${(lookAt - 1) * size},${size} `
}

export const tablePart = (model) => {
  const entries = Object.entries(model)
  const primark = []
  const fields = []
  for (const node of entries) {
    const [k, v] = node
    if (isPrimaryKey(v)) {
      primark.push(node)
    } else {
      fields.push(node)
    }
  }
  const sql_fields = fields.map(([key, value]) => `${key} ${value}`)
  return sql_fields.join(',') + primark.map(([k, v]) => v).join(',')
}

export const constraintPart = (tableName, constraint) => {
  const sql_constraints = []
  let idx = 0
  for (const one of constraint) {
    idx++
    if (one.type == constraint_types.unique) {
      sql_constraints.push(`CREATE UNIQUE INDEX IF NOT EXISTS ${tableName}_unique_${idx} ON ${tableName} ${one.sql}`)
    } else if (one.type == constraint_types.index) {
      sql_constraints.push(`CREATE INDEX IF NOT EXISTS ${tableName}_index_${idx} ON ${tableName} ${one.sql}`)
    }
  }
  return sql_constraints
}

```


### sqlte封装

```javascript 
import _ from 'lodash'
import { AsyncStorage } from 'react-native'
import SQLiteStorage from 'react-native-sqlite-storage'
import { constraintPart, tablePart } from './helper'

const lapseAt = 10 * 1000

const instances = {}
export const singleLiteStorage = async (name, model,constraints) => {
  if (instances[name]) return instances[name]
  const instance = await liteStorage(name, model,constraints)
  instances[name] = instance
  return instance
}

export const liteStorage = async (name, model, constraints) => {
  const instance = new SqliteStorage({name, model, constraints})
  const tableInitKey = `installed:sqlite_tableName_${name}`
  const tableAlterKey = `alter:sqlite_tableName_${name}-V5.5.0`

  if (!await AsyncStorage.getItem(tableInitKey)) {
    //是否需要初始化库
    await instance.initTable()
    await instance.initConstraints()
    await AsyncStorage.setItem(tableInitKey, String(Date.now()))
  } else if (!await AsyncStorage.getItem(tableAlterKey)) {
    //检查是否需要添加列
    await instance.cloumnAppend(model)
    await AsyncStorage.setItem(tableAlterKey, String(Date.now()))
  }

  return instance
}

export default class SqliteStorage {

  constructor({name, model, constraints, debug = false, version = "1.0.0", size = -1}) {
    this.name = name;
    this.tableName = name;
    this.model = model;
    this.constraints = constraints
    this.version = version
    this.size = size
    // SQLiteStorage.DEBUG(debug);
    this.debugMode = debug
    this.client = null;
    this.latestUsed = Date.now()
  }

  logDebug = (...args) => {
    if (this.debugMode) {
      console.log("sqlite.js: ", this.tableName, ...args)
    }
  }
  logError = (...args) => {
    const log = __DEV__ ? console.error : console.log
    log("sqlite.js: ", this.tableName, ...args)
  }
  _open = () => {
    const displayName = this.tableName
    this.client = SQLiteStorage.openDatabase(
      `${this.name}.db`, this.version, displayName, this.size,
      () => this.logDebug('open', this.tableName, 'success!'), () => {
        this.client = null
        this.logDebug('open', this.tableName, 'failed!')
      })
    return this
  }

  lapsed = () => Date.now() - this.latestUsed > lapseAt

  safeClose = () => {
    if (!this.lapsed()) return this._autoClose() //如果关闭前,链接又被使用了,再次延迟
    this.close() //真正关闭
  };


  _autoClose = (() => {
    let timer = null
    return () => {
      if (this.lapsed()) {
        this.safeClose()
        return
      }
      if (timer) {
        this.logDebug("clear closeTask")
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(this._autoClose, lapseAt)
    }
  })()

  //防抖版
  autoClose = _.throttle(this._autoClose, lapseAt)

  close = () => {
    if (!this.client) return
    try {
      this.logDebug('close')
      this.client.close(this.logDebug, this.logDebug)
    } catch (e) {
      this.logDebug('close', e)
    }
    this.client = null
  };


  transaction = (action, ...parser) => {
    return this._exec(true, action, ...parser)
  }

  exec = (action, ...parser) => {
    return this._exec(false, action, ...parser)
  }

  up_latest = () => this.latestUsed = Date.now()

  _batchParser = (...parser) => {
    const [cmd, params] = parser
    let batch_cmd = []
    let batch_params = []
    if (Array.isArray(cmd)) {
      batch_cmd = cmd
      batch_params = params
    } else {
      batch_cmd.push(cmd)
      batch_params.push(params)
    }
    return {batch_cmd, batch_params}
  }
  _exec = (canRollback, action, ...parser) => {
    if (!this.client) this._open();
    this.up_latest()

    const {batch_cmd, batch_params} = this._batchParser(...parser)
    return new Promise((done, crash) => {
      let executeAt = 0
      const doFinish = (result) => {
        this.up_latest()
        batch_results.push(result)
        executeAt++
        if (batch_results.length == executeAt) {
          const isBatch = Array.isArray(parser[0])
          isBatch ? done(batch_results) : done(batch_results[0])
          this.autoClose()
        }
      }

      const batch_results = []
      const onError = (e) => {
        this.logError("error", action, this.tableName, action, e)
        doFinish(e)
      }

      const onSuccess = (tx, _results) => {
        const results = _results || tx //不开事务的时候,第一个是结果,开启事务的时候,第二个是结果
        this.logDebug("success", action, this.tableName, results)

        if (['query', 'count', 'max'].includes(action) && results && results.rows) {
          const finalData = [];
          for (let i = 0; i < results.rows.length; i++) {
            finalData.push(results.rows.item(i));
          }
          doFinish(finalData)
          return
        }
        return doFinish(results)
      }

      const handler = (bridge) => {
        for (let i = 0; i < batch_cmd.length; i++) {
          const cmdAt = batch_cmd[i]
          const paramsAt = batch_params[i]
          this.logDebug(" ")
          this.logDebug(action, cmdAt)
          this.logDebug("params:", paramsAt)
          this.up_latest()
          bridge.executeSql(cmdAt, paramsAt, onSuccess, onError)
        }
      }

      if (canRollback) {
        this.up_latest()
        this.client.transaction(
          tx => handler(tx),
          (err) => this.logError("sqlite.js transaction:error:", action, this.tableName, err),
          () => this.logDebug("sqlite.js transaction:success:", action, this.tableName)
        )
        return
      }
      handler(this.client)
    })
  }


  initTable = () => {
    return this.transaction("create", `CREATE TABLE IF NOT EXISTS ${this.tableName} (` + tablePart(this.model, this.constraints) + ')', [])
  }
  initConstraints = () => {
    if (_.isEmpty(this.constraints)) return
    const batch_sql_constraints = constraintPart(this.tableName, this.constraints)
    const batch_params = batch_sql_constraints.map(d => [])
    return this.transaction("create", batch_sql_constraints, batch_params)
  }

  cloumnAdd = async (model) => {
    // console.log("cloumnAdd:", model)
    const columns = tablePart(model).split(',')
    for (const col of columns) {
      if (!col) continue
      await this.transaction("column_add", `ALTER TABLE ${this.tableName} add column ${col}`, [])
    }
  }

  cloumnAppend = _.throttle(async (model) => {
    const fields = Object.keys(model)
    const added = {}
    let pragma_info = await this.pragma()

    //记录已添加的列
    if (pragma_info && pragma_info.length > 0) {
      for (const field of fields) {
        //如果查到列需要检查添加
        for (const row of pragma_info) {
          if (row.name != field) continue
          added[row.name] = true
        }
      }

      //处理需要添加的列
      for (const field of fields) {
        if (added[field]) continue
        await this.cloumnAdd({[field]: model[field]})
      }

      //处理不需要的列(sqlite不支持)
      // for (const field of added) {
      //   if (!model[field])
      //     await this.cloumnDelete({[field]: model[field]})
      // }
    }
  }, 10 * 1000)
  pragma = () => {
    return this.exec("query", `PRAGMA table_info(${this.tableName})`, [])
  }

  batch_insert = _options => {
    const batch_cmd = []
    const batch_params = []
    const options = Array.isArray(_options) ? _options : [_options]
    for (let i = 0; i < options.length; i++) {
      const {fields, holder, params} = options[i];
      const cmd = `INSERT INTO ${this.tableName} (${fields}) VALUES (${holder})`
      batch_cmd.push(cmd)
      batch_params.push(params)
    }
    return this.transaction("insert", batch_cmd, batch_params)
  }

  update = (object, where = {}) => {
    const {sql = '', params = []} = this._toWhere(where)
    if (_.isEmpty(object.sql)) {
      return false
    }
    const cmd = `UPDATE ${this.tableName} SET ${object.sql} ${sql}`
    return this.transaction("update", cmd, [...object.params, ...params])
  };

  batch_update = (objects=[], wheres =[]) => {
    const batch_cmd = []
    const batch_params = []
    for(let i=0;i++;i<objects.length){
      const where=wheres[i]
      const object=objects[i]
      const {sql = '', params = []} = this._toWhere(where)
      const cmd = `UPDATE ${this.tableName} SET ${object.sql} ${sql}`
      batch_cmd.push(cmd)
      batch_params.push(params)
    }
    return this.transaction("update", batch_cmd, batch_params)
  }

  _toWhere = (where) => {
    const {sql = '', params = []} = where || {}
    if (!_.trim(sql)) return {sql, params}
    return {sql: `WHERE ${sql}`, params}
  }

  query = (where = {} = {}, orderBy) => {
    const _ext = Array.isArray(orderBy) ? orderBy : [orderBy].filter(d => d)
    const {sql = '', params = []} = this._toWhere(where)
    const cmd = `SELECT * FROM ${this.tableName} ${sql} ${_ext.join(' ')}`
    return this.exec("query", cmd, params)
  }

  count = async (where = {}) => {
    const {sql} = this._toWhere(where)
    const cmd = `SELECT count(1) FROM ${this.tableName} ${sql}`
    const ret = await this.exec("count", cmd, where.params)
    if (ret && ret.length > 0) return Object.values(ret[0])[0]
    return null
  }

  max = async (field, where = {}) => {
    const {sql} = this._toWhere(where)
    const cmd = `SELECT MAX(${field}) FROM ${this.tableName} ${sql}`
    const ret = await this.exec("max", cmd, where.params)
    if (ret && ret.length > 0) return Object.values(ret[0])[0]
    return null
  }

  //插入或者更新
  upinsert = (params, where = {}) => {
    return this.batch_insert(params)
      .then((results) => {
        //如果顺利插入
        if (results.rowsAffected > 0) {
          return results
        }
        //如果由于重复无法顺利插入
        return this.update(params, where);
      })
  }


  deleteIt = (where) => {
    const {sql = '', params = []} = this._toWhere(where)
    const cmd = `DELETE FROM ${this.tableName} ${sql}`
    return this.transaction("delete", cmd, params)
  };

  _deleteTable = (tableName) => {
    const cmd = `drop table ${tableName}`
    return this.transaction("drop", cmd, [])

  }

}

```


### 中间层转换数据

```javascript 
import _ from "lodash";

interface IBaseDb {
  insert: (data: object | object[]) => (Promise<number>),
  find: (where: any, ext?: any[]) => (Promise<any[]>),
  count: (where: any) => (Promise<number>),
  max: (field: string, where: any) => (Promise<any>),
  remove: (where: any) => (Promise<any>),
  update: (data: any, where: any) => (Promise<number>),
}

interface IServiceEnhanceProps {
  debug?: boolean,
  db: any,
  converInsertFc: any,
  converUpdateFc: any,
}

export const modelDbEnhance = async ({ db, converInsertFc, converUpdateFc, debug = false }: IServiceEnhanceProps): Promise<IBaseDb> => {
  const logDebug = (...args: any[]) => {
    // tslint:disable-next-line:no-console
    if (debug) console.log("customerDb: ", ...args)
  }
  const client = await db()

  return {
    insert: (data: object | object[]) => {
      logDebug('insert', data)
      if (_.isEmpty(data)) {
        return false
      }
      return client.batch_insert(converInsertFc(data))
    },
    find: (where: any, ext?: any[]) => {
      logDebug('find', where)
      return client.query(where, ext)
    },
    count: (where: any) => {
      logDebug('count', where)
      return client.count(where)
    },
    max: (field: string, where: any) => {
      logDebug('max', field, where)
      return client.max(field, where)
    },
    remove: (where: any) => {
      logDebug('remove', where)
      return client.deleteIt(where)
    },
    update: (data: object, where: any) => {
      logDebug('update', data, where)
      const updateData = converUpdateFc(data)
      return client.update(updateData, where)
    },
  }
}

```

# Picker类

## 目录

- [多级联动组件：](#多级联动组件)
  - [思路一： ](#思路一-)
    - [优化第一版：](#优化第一版)
    - [优化第二版](#优化第二版)
  - [思路二](#思路二)
    - [CascadePicker Demo](#CascadePicker-Demo)
  - [思路三：（最终版）](#思路三最终版)
    - [引用样式部分](#引用样式部分)
    - [默认配置部分](#默认配置部分)
    - [外层包裹部分](#外层包裹部分)
    - [list 逻辑部分](#list-逻辑部分)
- [react-native-picker](#react-native-picker)

# 多级联动组件：

## 思路一：&#x20;

- 循环组件
- 利用原生的FlatList 来定位调转和取整位置
- 利用position 来遮罩效果
- 缺点是没有滚动效果没有动画   样式细节不好调整

```javascript 
 import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React,{
  PureComponent,
  Component
} from 'react'
import _ from 'lodash'
import styleSheet, {getThemeColor} from '../utils/styleSheet'
import {Callback} from "modern/types/lang";
import Modal from './Modal'
import {getScreenHeight, getScreenWidth} from "modern/consts/ui-common";

const styles = styleSheet.create({
  container:{
    flex:1,
    backgroundColor: 0x00000074,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  contentView:{
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  stage:{
    top:0,
    bottom:0,
    left:0,
    right:0,
    position:'absolute',
    zIndex:10,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  maskView:{
    left:0,
    right:0,
    position:'absolute',
    top:0,
    bottom:0,
    zIndex:0,
    justifyContent:'space-between'
  },
  emptyView:{
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    backgroundColor: 'white',
  },
  maskStyle:{
    width:'100%',
    backgroundColor:'rgba(232,232,232,0.9)',
    borderColor:"rgb(181,181,181)"
  }
})


interface ISourceType {
  id:string,
  name:string,
  sub?:ISourceType[]
  [propname:string]:any
}
interface ISProps {
  sourceData:ISourceType[],
  cancel:Callback,
  confirm:Callback,
  selectData:ISourceType[],
  itemHeihght:number, // item 的 高度
  maxLength:5 | 7 | 9,
  textStyle:any
}
interface ISState {
  visible:boolean,
  floor:number,
}

class PickerAlertView extends PureComponent<ISProps,ISState>{
  public selectedData:ISourceType[] =[]
  constructor(props:ISProps) {
    super(props);
    this.state = {
      visible:false,
      floor:this.getMaxFloor()
    }
  }
  public getMaxFloor = ()=>{
    const { sourceData } = this.props
    if(_.isEmpty(sourceData)) return 0
    let floor:number = 1
    function treeData(arr:any){
      const sub:any = arr.find((item:any)=>item?.sub?.length > 0)

      if(sub){
        floor = floor + 1
        let arr2:any = []
        arr.forEach((item:any)=>{
          if(item?.sub?.length>0){
            arr2 = arr2.concat(item.sub)
          }
        })
        treeData(arr2)
      }
    }
    treeData(sourceData)
    return floor
  }
  public show = ()=>{
    this.setState({visible:true})
  }
  public hide = ()=>{
    this.setState({visible:false})
  }

  public renderEmpty = ()=>{
    return <TouchableWithoutFeedback  onPress={this.hide}>
      <View style={{flex:1,width:getScreenWidth()}} />
    </TouchableWithoutFeedback>
  }
  public confirm = ()=>{
    const { confirm=_.noop } = this.props
    this.hide()
    confirm(this.selectedData)
  }
  public renderHeader = ()=>{
    return <View style={styles.emptyView}>
      <TouchableOpacity style={{height:50,justifyContent: 'center'}} onPress={this.hide}>
        <Text style={{fontSize:16,color:'gray'}}>取消</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.confirm} style={{height:50,justifyContent: 'center'}}>
        <Text style={{color:getThemeColor(),fontSize:16}}>确定</Text>
      </TouchableOpacity>
    </View>
  }
  public setSelected = (item:ISourceType,floor:number)=>{
    this.selectedData[floor] = item
  }
  public componentDidUpdate(preProps,prevState,snapshot){
    if(!_.isEqual(this.props.sourceData,preProps.sourceData)){
      this.setState({
        floor:this.getMaxFloor()
      })
    }
  }


  public renderMask = ()=>{
    const { maxLength = 9,itemHeihght=50} = this.props
    const mid = Math.floor(maxLength/2)
    return  <View style={[styles.maskView]}>
      <View
        style={[styles.maskStyle,{height:itemHeihght*mid,borderBottomWidth:1,}]}
      />
      <View
        style={[styles.maskStyle,{height:itemHeihght*mid,borderTopWidth:1,}]}
      />
    </View>
  }
  public render(){
    const {
      visible,
      floor,
    } = this.state
    const {
      maxLength = 9,
      selectData=[],
      sourceData,
      itemHeihght=50,
      textStyle=null
    } = this.props
    if(!visible) return null
    if(!_.isEmpty(selectData) && selectData.length !== floor  ) return null
    if(_.isEmpty(sourceData)) return  null

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      >
        <View
          style={styles.container}
        >
          {this.renderEmpty()}
          <View style={{ width:getScreenWidth()}}>
            {this.renderHeader()}
            <View  style={[{height:itemHeihght*maxLength},styles.contentView]}>
              <View style={styles.stage}>
                <PickerAlertViewItem
                  sourceList={sourceData}
                  propSourceData={sourceData}
                  setSelect={this.setSelected}
                  floor={floor}
                  currentFloor={0}
                  maxLength={maxLength}
                  defaultSelected = {selectData}
                  itemHeihght={itemHeihght}
                  textStyle={textStyle}
                />
              </View>
              {this.renderMask()}
            </View>
          </View>
        </View>
      </Modal>
    )
  }

}



interface ISItemProps {
  sourceList:ISourceType[],
  setSelect:Callback,
  floor:number,
  currentFloor:number,
  maxLength: 5 | 7 | 9,
  defaultSelected:ISourceType[],
  propSourceData:ISourceType[],
  itemHeihght:number,
  textStyle:any,
}
interface ISItemState {
  nextData:ISourceType[],
  currentChoose:ISourceType,
  initialScrollIndex:number,
}
class PickerAlertViewItem extends PureComponent<ISItemProps,ISItemState> {
  public scrollView:any
  public flatEl:any
  public currentItem:any
  public itemEL:any
  public  constructor(props:ISItemProps) {
    super(props);
    this.state = {
      nextData:this.defaultRenderList(),
      currentChoose:this.getDefaultChoose(),
      initialScrollIndex:this.getInitialScrollIndex()
    }
  }
  public getInitialScrollIndex = ()=>{
    const {defaultSelected,currentFloor,sourceList } = this.props
    if(_.isEmpty(defaultSelected)) return 0
    const initIndex = sourceList.findIndex(item=>item.id === defaultSelected[currentFloor].id)
    return  initIndex<0?0:initIndex
  }
  public defaultRenderList = ()=>{
    const {
      currentFloor,
      floor,
      defaultSelected,
      propSourceData,
      sourceList,
    } = this.props
    const getDefaultList = ()=>{
      if(currentFloor + 1 === floor )  return []
      const data = sourceList.find(value=>value.id === defaultSelected[currentFloor].id)?.sub || []
      return data
    }

    const getNoFefault = ()=>{
      if(currentFloor === 0) return propSourceData?.[0]?.sub || []
      if(currentFloor + 1 === floor )  return []
      let data = [...propSourceData?.[0]?.sub || []]
      // @ts-ignore
      Array.apply(null,{length:currentFloor}).forEach(item=>{
        data = data?.[0]?.sub || []
      })
      return data
    }
    const defaultRenderList = _.isEmpty(defaultSelected)?getNoFefault():getDefaultList()
    return defaultRenderList
  }
  public getDefaultChoose = ()=>{
    const {
      defaultSelected,
      propSourceData,
      currentFloor
    } = this.props
    if(!_.isEmpty(defaultSelected)) return defaultSelected[currentFloor]
    let data  = [...propSourceData]
    for(let i = 0; i < currentFloor ; i++){
      data = data[0].sub || []
    }
    return data[0] || {}
  }

  public config = ()=>{
    return {
      waitForInteraction: false,
      itemVisiblePercentThreshold:100,
    }
  }
  public  scrollToIndex = (index:any)=>{
    if(this.flatEl){
      this.flatEl.scrollToIndex({
        index,
        viewPosition:0.5,
        animated:true
      })
    }
  }
  public mid = ()=>{
    const { maxLength=9 } = this.props
    return Math.floor(maxLength/2)
  }
  public  flatListData = ()=>{
    const { sourceList } = this.props
    // @ts-ignore
    const mid = this.mid()
    const arr = Array.apply(null,{length:mid}).map(()=>({id:'',name:''}))
    return [...arr,...sourceList,...arr]
  }


  public getItemLayout = (data:any,index:any) =>{
    const { itemHeihght=50 } = this.props
    return {length: itemHeihght, offset: itemHeihght * index, index}
  }
  public renderItem = ({item,index,separators}:any)=>{
    const { itemHeihght=50 ,textStyle=null} = this.props
    return <TouchableWithoutFeedback
      onPress={()=>this.clickItem(item,index)}
    >
      <Text
        numberOfLines={1}
        style={[{
          height:itemHeihght,
          textAlign:'center',
          lineHeight:itemHeihght,
          opacity:0.8,
          paddingHorizontal: 10,
        },textStyle]}
      >{item.name}</Text>
    </TouchableWithoutFeedback>
  }
  public  chooseItem = (index:number,item:ISourceType)=>{
    const { setSelect,currentFloor } = this.props
    const obj = {...item}
    setSelect(obj,currentFloor)
    this.setState({
      currentChoose:item || {},
      nextData:item?.sub || []
    },()=>{
      if(this.itemEL) this.itemEL.reduction()
    })
  }
  public clickItem =(item:ISourceType,index:any)=>{
    this.scrollToIndex(index)
    this.chooseItem(index,item)
  }
  public componentDidMount(){
    const {setSelect,currentFloor } = this.props
    const { currentChoose } = this.state
    setSelect(currentChoose,currentFloor)
    if(this.flatEl) this.flatEl.recordInteraction()
  }
  public reduction=()=>{
    const {setSelect,currentFloor } = this.props
    const currentChoose = this.props.sourceList?.[0] || {}
    const nextData = this.props.sourceList?.[0]?.sub || []
    setSelect(currentChoose,currentFloor)
    const mid = this.mid()
    this.setState({
      currentChoose,
      nextData,
    },()=>{
      _.delay(()=>{
        this.scrollToIndex(mid)
      },50)
    })
    if(this.itemEL) this.itemEL.reduction()
  }
  public render(){
    const {
      floor,
      currentFloor,
      setSelect,
      propSourceData,
      defaultSelected,
      maxLength,
      itemHeihght=50,
      textStyle=null
    } = this.props
    const {
      nextData,
      initialScrollIndex,
    } = this.state
    const flatListData = this.flatListData()
    const nextFloor = currentFloor + 1
    return (
      <>
        <FlatList
          style={{flex:1 }}
          ref={ref=>this.flatEl = ref}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: object, index: number) => String(index)}
          renderItem={this.renderItem}
          // onViewableItemsChanged={this._onScrollChanged}
          viewabilityConfig={this.config()}
          data={flatListData}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={initialScrollIndex}
          // snapToInterval={itemHeihght}
          // snapToAlignment={'center'}
          onMomentumScrollEnd={this._moveEnd}
        />
        {
          floor !== nextFloor ?
            <PickerAlertViewItem
              ref={ref=>this.itemEL = ref}
              sourceList={nextData}
              floor={floor}
              setSelect={setSelect}
              currentFloor={nextFloor}
              propSourceData={propSourceData}
              defaultSelected={defaultSelected}
              maxLength={maxLength}
              itemHeihght={itemHeihght}
              textStyle={textStyle}
            />:
            null
        }
      </>
    )
  }
  private _moveEnd=(e)=>{
    const {itemHeihght} = this.props
    const contentOffset = e.nativeEvent.contentOffset.y;
    const mid = this.mid()
    const index = Math.round(contentOffset/itemHeihght)+mid
    const flatListData = this.flatListData()
    _.delay(()=>{
      // this.chooseItem(this.currentItem.index,this.currentItem.item)
      this.chooseItem(index,flatListData[index])
      this.scrollToIndex(index)
    },60)
  }
  private _onScrollChanged =(info:any)=>{
    const {viewableItems= []} = info
    if(_.isEqual(viewableItems,this.scrollView)) return
    this.scrollView = viewableItems
    const length =Math.floor(viewableItems.length/2)>viewableItems.length?viewableItems.length:Math.floor(viewableItems.length/2)
    const item = viewableItems[length]
    this.currentItem = item
  }
}

export  default PickerAlertView


数据格式：
[
  {
    id:"1',
    name:'test1',
    sub:[]
  },
  {
    id:"2',
     name:'test2',
    sub:[]
  },
]


```


### 优化第一版：

```javascript 
 import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React,{
  PureComponent,
  Component,
} from 'react'
import _ from 'lodash'
import styleSheet, {getThemeColor} from '../utils/styleSheet'
import {Callback} from "modern/types/lang";
import Modal from './Modal'
import {getScreenHeight, getScreenWidth} from "modern/consts/ui-common";

const styles = styleSheet.create({
  container:{
    flex:1,
    backgroundColor: 0x00000074,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  contentView:{
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  stage:{
    top:0,
    bottom:0,
    left:0,
    right:0,
    position:'absolute',
    zIndex:10,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  maskView:{
    left:0,
    right:0,
    position:'absolute',
    top:0,
    bottom:0,
    zIndex:0,
    justifyContent:'space-between'
  },
  emptyView:{
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    backgroundColor: 'white',
  },
  maskStyle:{
    width:'100%',
    backgroundColor:'rgba(232,232,232,0.9)',
    borderColor:"rgb(181,181,181)"
  },
  headerBtnView:{
    height:50,justifyContent: 'center'
  },
  cancelText:{
    fontSize:16,color:'gray'
  }
})

interface ISHeadProps {
  customHead:any,
  confirm:Callback,
  hide:Callback,
  headOptions:any
}
const Head:React.FC<ISHeadProps> = React.memo(({customHead,confirm,hide,headOptions})=>{
    if(customHead){
      return customHead
    }
    const {
      cancelTextStyle={},
      cancelBtnView={},
      confirmBtnView={},
      confirmTextStyle={},
      leftText='取消',
      rightText='确定',
      headerContainView={},
    } = headOptions
    return <View style={[styles.emptyView,headerContainView]}>
      <TouchableOpacity style={[styles.headerBtnView,cancelBtnView]} onPress={hide}>
        <Text style={[styles.cancelText,cancelTextStyle]}>{leftText}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={confirm} style={[styles.headerBtnView,confirmBtnView]}>
        <Text style={[{color:getThemeColor(),fontSize:16},confirmTextStyle]}>{rightText}</Text>
      </TouchableOpacity>
    </View>
})
interface ISEmpty {
  hide:Callback
}
const Empty:React.FC<ISEmpty> = React.memo(({hide})=>{
  return <TouchableWithoutFeedback  onPress={hide}>
    <View style={{flex:1,width:getScreenWidth()}} />
  </TouchableWithoutFeedback>
})
interface ISMaskView {
  maxLength:number,
  itemHeihght:number,
  maskOptions:any,
}
const MaskView:React.FC<ISMaskView> = React.memo(({maxLength,itemHeihght,maskOptions={}})=>{
  const {
    upMaskView,
    bottomMaskView
  } = maskOptions
  const mid = Math.floor(maxLength/2)
  return  <View style={[styles.maskView]}>
    <View style={[styles.maskStyle,{height:itemHeihght*mid,borderBottomWidth:1,},upMaskView]}/>
    <View style={[styles.maskStyle,{height:itemHeihght*mid,borderTopWidth:1,},bottomMaskView]}/>
  </View>
})
interface ISourceType {
  id:string,
  name:string,
  sub?:ISourceType[]
  [propname:string]:any,
}
interface ISitemOptons  {
  itemHeihght?:number,
  maxLength?:5 | 7 | 9,
  ActiveTextStyle?:any,
  normalTextStyle?:any,
}
interface ISProps {
  sourceData:ISourceType[],
  cancel?:Callback,
  confirm:Callback,
  selectData:ISourceType[],
  pickerType:'scroll' | 'click' | 'all',
  customHead:any,
  headOptions:any,
  maskOptions:any,
  itemOptons:itemOptons,
}
interface ISState {
  visible:boolean,
  floor:number,
}
function WithHeadAndMethod(WrapComponent:any){
    return class PickerAlertView extends PureComponent<ISProps,ISState>{
      public selectedData:ISourceType[] =[]
      public static defaultProps = {
        itemOptons:{},
        selectData:[],
        headOptions:{},
        pickerType:'all',
        maskOptions:{}
      }
      constructor(props:ISProps) {
        super(props);
        this.state = {
          visible:false,
          floor:this.getMaxFloor(),
        }
      }
      public getMaxFloor = ()=>{
        const { sourceData } = this.props
        if(_.isEmpty(sourceData)) return 0
        let floor:number = 1
        function treeData(arr:any){
          const sub:any = arr.find((item:any)=>item?.sub?.length > 0)
          if(sub){
            floor = floor + 1
            let arr2:any = []
            arr.forEach((item:any)=>{
              if(item?.sub?.length>0){
                arr2 = arr2.concat(item.sub)
              }
            })
            treeData(arr2)
          }
        }
        treeData(sourceData)
        return floor
      }
      public show = ()=>{
        this.setState({visible:true})
      }
      public confirm = ()=>{
        const { confirm=_.noop } = this.props
        this.hide()
        confirm(this.selectedData)
      }
      public hide = ()=>{
        const { cancel=_.noop } = this.props
        cancel()
        this.setState({visible:false})
      }
      public getSelected = ()=>this.selectedData
      private setSelected = (item:ISourceType,floor:number)=>{
        this.selectedData[floor] = item
      }
      public componentDidUpdate(preProps,prevState,snapshot){
        if(!_.isEqual(this.props.sourceData,preProps.sourceData)){
          this.setState({
            floor:this.getMaxFloor()
          })
        }
      }
      public render(){
        const {
          visible,
          floor,
        } = this.state
        const {
          selectData,
          sourceData,
          pickerType,
          customHead,
          headOptions,
          maskOptions,
          itemOptons,
        } = this.props
        if(!visible) return null
        if(!_.isEmpty(selectData) && selectData.length !== floor  ) return null
        if(_.isEmpty(sourceData)) return  null
        const {
          maxLength=9,
          itemHeihght=50,
          ActiveTextStyle={},
          normalTextStyle={}
        }  = itemOptons
        return (
          <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
          >
            <View
              style={styles.container}
            >
              <Empty hide={this.hide}/>
              <View style={{ width:getScreenWidth()}}>
                <Head
                  headOptions={headOptions}
                  hide={this.hide}
                  confirm={this.confirm}
                  customHead={customHead}
                />
                <View  style={[{height:itemHeihght*maxLength},styles.contentView]}>
                  <View style={styles.stage}>
                    <WrapComponent
                      sourceList={sourceData}
                      setSelect={this.setSelected}
                      floor={floor}
                      currentFloor={0}
                      maxLength={maxLength}
                      defaultSelected = {selectData}
                      itemHeihght={itemHeihght}
                      ActiveTextStyle={ActiveTextStyle}
                      normalTextStyle={normalTextStyle}
                      pickerType={pickerType}
                    />
                  </View>
                  <MaskView
                    maxLength={maxLength}
                    itemHeihght={itemHeihght}
                    maskOptions={maskOptions}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )
      }

    }
}

interface ISItemProps {
  sourceList:ISourceType[],
  setSelect:Callback,
  floor:number,
  currentFloor:number,
  maxLength: 5 | 7 | 9,
  defaultSelected:ISourceType[],
  itemHeihght:number,
  ActiveTextStyle:any,
  normalTextStyle:any,
  pickerType:string
}
interface ISItemState {
  nextData:ISourceType[],
  currentChoose:ISourceType,
  initialScrollIndex:number,
  renderList:any[],
}
class PickerAlertViewItem extends PureComponent<ISItemProps,ISItemState> {
  public scrollView:any
  public flatEl:any
  public currentItem:any
  public itemEL:any
  public config:any = {
    waitForInteraction: false,
    itemVisiblePercentThreshold:100,
  }
  public  constructor(props:ISItemProps) {
    super(props);
    this.state = {
      nextData:this.defaultRenderList(),
      currentChoose:this.getDefaultChoose(),
      initialScrollIndex:this.getInitialScrollIndex(),
      renderList:this.flatListData(),
    }
  }
  public getInitialScrollIndex = ()=>{
    const {defaultSelected,currentFloor,sourceList } = this.props
    if(_.isEmpty(defaultSelected)) return 0
    const initIndex = sourceList.findIndex(item=>item.id === defaultSelected[currentFloor]?.id)
    return  initIndex<0?0:initIndex
  }
  public defaultRenderList = ()=>{
    const { currentFloor, floor, defaultSelected, sourceList,} = this.props
    const getDefaultList = ()=>{
      if(currentFloor + 1 === floor )  return []
      return sourceList.find(value=>value.id === defaultSelected[currentFloor].id)?.sub || []
    }
    const getNoFefault = ()=>this.props.sourceList?.[0]?.sub || []
    return _.isEmpty(defaultSelected)?getNoFefault():getDefaultList()
  }
  public getDefaultChoose = ()=>{
    const { defaultSelected, currentFloor, sourceList } = this.props
    return _.isEmpty(defaultSelected)?sourceList?.[0]:defaultSelected[currentFloor]
  }
  public mid = ()=>{
    const { maxLength } = this.props
    return Math.floor(maxLength/2)
  }
  public  flatListData = (nextData:any[])=>{
    const { sourceList } = this.props
    const mid = this.mid()
    const arr = Array(mid).fill({id:'',name:'',sub:[]})
    const currentData = nextData?nextData:sourceList
    return [...arr,...currentData,...arr]
  }
  public getItemLayout = (data:any,index:any) =>{
    const { itemHeihght } = this.props
    return {length: itemHeihght, offset: itemHeihght * index, index}
  }
  public renderItem = ({item,index,separators}:any)=>{
    const { itemHeihght ,ActiveTextStyle,normalTextStyle,pickerType} = this.props
    const {currentChoose} = this.state
    const itemPress =  (pickerType === 'scroll' || item.id === currentChoose?.id)?_.noop:this.clickItem
    return <TouchableWithoutFeedback  onPress={()=>itemPress(item,index)}>
              <Text
                numberOfLines={1}
                style={[
                  {
                    height:itemHeihght,
                    textAlign:'center',
                    lineHeight:itemHeihght,
                    opacity:0.8,
                    paddingHorizontal: 10,
                  },
                  item.id === currentChoose?.id?ActiveTextStyle:normalTextStyle
                ]}
              >{item.name}</Text>
            </TouchableWithoutFeedback>
  }

  public clickItem =(item:ISourceType,index:any)=>{
    const mid = this.mid()
    if(index<mid) return
    if(!item) return
    this.scrollToIndex(index)
    this.chooseItem(index,item)
  }
  public  scrollToIndex = (index:any)=>{
    if(this.flatEl){
      this.flatEl.scrollToIndex({
        index,
        viewPosition:0.5,
        animated:true
      })
    }
  }
  public  chooseItem = (index:number,item:ISourceType)=>{
    const { setSelect,currentFloor } = this.props
    setSelect(item,currentFloor)
    this.setState({
      currentChoose:item || {},
      nextData:item?.sub || []
    },()=>{
      if(this.itemEL) this.itemEL.reduction()
    })
  }
  public reduction=()=>{
    const currentChoose = this.props.sourceList?.[0] || {}
    const nextData = currentChoose?.sub || []
    const mid = this.mid()
    this.setState({
      currentChoose,
      nextData,
      renderList:this.flatListData()
    },()=>{
      _.delay(()=>this.clickItem(currentChoose,mid),60)
    })
  }
  public componentDidMount(){
    this.initSelected()
  }
  public initSelected = ()=>{
    const {setSelect,currentFloor } = this.props
    const { currentChoose } = this.state
    setSelect(currentChoose,currentFloor)
    if(this.flatEl) this.flatEl.recordInteraction()
  }
  public render(){
    const {
      floor,
      currentFloor,
      setSelect,
      defaultSelected,
      maxLength,
      itemHeihght=50,
      ActiveTextStyle,
      normalTextStyle,
      pickerType
    } = this.props
    const {
      nextData,
      initialScrollIndex,
      renderList,
    } = this.state

    const nextFloor = currentFloor + 1
    return (
      <>
        <FlatList
          style={{flex:1 }}
          ref={ref=>this.flatEl = ref}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: object, index: number) => String(index)}
          renderItem={this.renderItem}
          viewabilityConfig={this.config}
          data={renderList}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={initialScrollIndex}
          onMomentumScrollEnd={this._moveEnd}
          scrollEnabled={pickerType === 'click'?false:true}
        />
        {
          floor > nextFloor ?
            <PickerAlertViewItem
              ref={ref=>this.itemEL = ref}
              sourceList={nextData}
              floor={floor}
              setSelect={setSelect}
              currentFloor={nextFloor}
              defaultSelected={defaultSelected}
              maxLength={maxLength}
              itemHeihght={itemHeihght}
              ActiveTextStyle={ActiveTextStyle}
              normalTextStyle={normalTextStyle}
              pickerType={pickerType}
            />:
            null
        }
      </>
    )
  }
  private _moveEnd=(e)=>{
    const {itemHeihght} = this.props
    const { renderList } = this.state
    const contentOffset = e.nativeEvent.contentOffset.y;
    const mid = this.mid()
    const index = Math.round(contentOffset/itemHeihght)+mid
    this.clickItem(renderList[index],index)
  }
}
export default  WithHeadAndMethod(PickerAlertViewItem)
```


### 优化第二版

增加了无联动列表 和稳定性    （该思路已放弃；ios上有重大缺陷；滚动停止回调不执行）

```javascript 
 import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React,{
  PureComponent,
  Component,
} from 'react'
import _ from 'lodash'
import styleSheet, {getThemeColor} from '../utils/styleSheet'
import {Callback} from "modern/types/lang";
import Modal from './Modal'
import {getScreenHeight, getScreenWidth} from "modern/consts/ui-common";

const styles = styleSheet.create({
  container:{
    flex:1,
    backgroundColor: 0x00000074,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentView:{
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  stage:{
    top:0,
    bottom:0,
    left:0,
    right:0,
    position:'absolute',
    zIndex:10,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  maskView:{
    left:0,
    right:0,
    position:'absolute',
    top:0,
    bottom:0,
    zIndex:0,
    justifyContent:'space-between'
  },
  emptyView:{
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    backgroundColor: 'white',
  },
  maskStyle:{
    width:'100%',
    // backgroundColor:'rgba(232,232,232,0.9)',
    borderColor:"rgba(232,232,232,0.9)",
    backgroundColor:'white'
  },
  midMaskStyle:{
    backgroundColor:'#f9f9f9'
  },
  headerBtnView:{
    height:50,justifyContent: 'center'
  },
  cancelText:{
    fontSize:16,color:'gray'
  }
})

function DefaultView (){
  return (
    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
        <Text>暂无数据</Text>
    </View>
  )
}
interface ISHeadProps {
  customHead:any,
  confirm:Callback,
  hide:Callback,
  headOptions:any
}
const Head:React.FC<ISHeadProps> = React.memo(({customHead,confirm,hide,headOptions})=>{
    if(customHead && _.isFunction(customHead)){
      return customHead(confirm,hide)
    }
    const {
      cancelTextStyle={},
      cancelBtnView={},
      confirmBtnView={},
      confirmTextStyle={},
      leftText='取消',
      rightText='确定',
      headerContainView={},
    } = headOptions
    return <View style={[styles.emptyView,headerContainView]}>
      <TouchableOpacity style={[styles.headerBtnView,cancelBtnView]} onPress={hide}>
        <Text style={[styles.cancelText,cancelTextStyle]}>{leftText}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={confirm} style={[styles.headerBtnView,confirmBtnView]}>
        <Text style={[{color:getThemeColor(),fontSize:16},confirmTextStyle]}>{rightText}</Text>
      </TouchableOpacity>
    </View>
})
interface ISEmpty {
  hide:Callback
}
const Empty:React.FC<ISEmpty> = React.memo(({hide})=>{
  return <TouchableWithoutFeedback  onPress={hide}>
    <View style={{flex:1,width:getScreenWidth()}} />
  </TouchableWithoutFeedback>
})
interface ISMaskView {
  maxLength:number,
  itemHeihght:number,
  maskOptions:any,
}
const MaskView:React.FC<ISMaskView> = React.memo(({maxLength,itemHeihght,maskOptions={}})=>{
  const {
    upMaskView,
    bottomMaskView,
    midMaskView
  } = maskOptions
  const mid = Math.floor(maxLength/2)
  return  <View style={[styles.maskView]}>
    <View style={[styles.maskStyle,{height:itemHeihght*mid,borderBottomWidth:0.5,},upMaskView]}/>
    <View style={[styles.midMaskStyle,{height:itemHeihght},midMaskView]} />
    <View style={[styles.maskStyle,{height:itemHeihght*mid,borderTopWidth:0.5,},bottomMaskView]}/>
  </View>
})
interface ISourceType {
  id:string,
  name:string,
  sub?:ISourceType[]
  [propname:string]:any,
}
interface ISitemOptons  {
  itemHeihght?:number,
  maxLength?:5 | 7 | 9,
  ActiveTextStyle?:any,
  normalTextStyle?:any,
}
interface ISProps {
  sourceData:ISourceType[],
  cancel?:Callback,
  confirm:Callback,
  selectData:ISourceType[],
  pickerType:'scroll' | 'click' | 'all',
  customHead:any,
  headOptions:any,
  maskOptions:any,
  itemOptons:ISitemOptons,
  isLinkage:boolean,
  renderListEmptyComponent:Callback,
  emptyOptions:any,
  wrapOptions:any,
  EmptyView:any
}
interface ISState {
  visible:boolean,
  floor:number,
}
function WithHeadAndMethod(WrapComponent:any){
    return class PickerAlertView extends PureComponent<ISProps,ISState>{
      public selectedData:ISourceType[] =[]
      public static defaultProps = {
        itemOptons:{},
        selectData:[],
        headOptions:{},
        pickerType:'all',
        maskOptions:{},
        isLinkage:false,
        emptyOptions:{},
        wrapOptions:{
          stageView:{},
          forceSetFloor:undefined
        }
      }
      constructor(props:ISProps) {
        super(props);
        this.state = {
          visible:false,
          floor:this.getMaxFloor(),
        }
      }
      public getMaxFloor = ()=>{

        const { sourceData,isLinkage,wrapOptions } = this.props
        if(wrapOptions.forceSetFloor && _.isNumber(wrapOptions.forceSetFloor))  return wrapOptions.forceSetFloor
        if(_.isEmpty(sourceData)) return 0
        if(isLinkage) return sourceData.length
        let floor:number = 1
        function treeData(arr:any){
          const sub:any = arr.find((item:any)=>item?.sub?.length > 0)
          if(sub){
            floor = floor + 1
            let arr2:any = []
            arr.forEach((item:any)=>{
              if(item?.sub?.length>0){
                arr2 = arr2.concat(item.sub)
              }
            })
            treeData(arr2)
          }
        }
        treeData(sourceData)
        return floor
      }
      public show = ()=>{
        this.setState({visible:true})
      }
      public confirm = ()=>{
        const { confirm=_.noop } = this.props
        this.hide()
        confirm(this.selectedData)
      }
      public hide = ()=>{
        const { cancel=_.noop } = this.props
        cancel()
        this.setState({visible:false})
      }
      public getSelected = ()=>this.selectedData
      private setSelected = (item:ISourceType,floor:number)=>{
        this.selectedData[floor] = item
      }
      public componentDidUpdate(preProps,prevState,snapshot){
        if(!_.isEqual(this.props.sourceData,preProps.sourceData)){
          this.setState({
            floor:this.getMaxFloor()
          })
        }
      }
      public render(){
        const {
          visible,
          floor,
        } = this.state
        const {
          selectData,
          sourceData,
          pickerType,
          customHead,
          headOptions,
          maskOptions,
          itemOptons,
          isLinkage,
          renderListEmptyComponent,
          emptyOptions,
          wrapOptions,
          EmptyView = DefaultView
        } = this.props
        const { stageView } = wrapOptions
        if(!visible) return null
        const {
          maxLength=9,
          itemHeihght=50,
          ActiveTextStyle={},
          normalTextStyle={}
        }  = itemOptons
        return (
          <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
          >
            <View
              style={styles.container}
            >
              <Empty hide={this.hide}/>
              <View style={{ width:getScreenWidth()}}>
                <Head
                  headOptions={headOptions}
                  hide={this.hide}
                  confirm={this.confirm}
                  customHead={customHead}
                />
                <View  style={[{height:itemHeihght*maxLength},styles.contentView]}>
                  <View style={[styles.stage,stageView]}>
                    {
                      _.isEmpty(sourceData) ?<EmptyView/>:
                        <WrapComponent
                          sourceList={sourceData}
                          setSelect={this.setSelected}
                          floor={floor}
                          currentFloor={0}
                          maxLength={maxLength}
                          defaultSelected = {selectData}
                          itemHeihght={itemHeihght}
                          ActiveTextStyle={ActiveTextStyle}
                          normalTextStyle={normalTextStyle}
                          pickerType={pickerType}
                          originData={sourceData}
                          isLinkage={isLinkage}
                          renderListEmptyComponent={renderListEmptyComponent}
                          emptyOptions={emptyOptions}
                        />
                    }

                  </View>
                  <MaskView
                    maxLength={maxLength}
                    itemHeihght={itemHeihght}
                    maskOptions={maskOptions}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )
      }

    }
}

interface ISItemProps {
  sourceList:ISourceType[],
  setSelect:Callback,
  floor:number,
  currentFloor:number,
  maxLength: 5 | 7 | 9,
  defaultSelected:ISourceType[],
  itemHeihght:number,
  ActiveTextStyle:any,
  normalTextStyle:any,
  pickerType:string,
  isLinkage:boolean,
  originData:any,
  renderListEmptyComponent:Callback,
  emptyOptions:any
}
interface ISItemState {
  nextData:ISourceType[],
  currentChoose:ISourceType,
  initialScrollIndex:number,
  renderList:any[],
  surerefresh:any
}
class PickerAlertViewItem extends PureComponent<ISItemProps,ISItemState> {
  public scrollView:any
  public flatEl:any
  public currentItem:any
  public itemEL:any
  public config:any = {
    waitForInteraction: false,
    itemVisiblePercentThreshold:100,
  }
  public  constructor(props:ISItemProps) {
    super(props);
    this.state = {
      nextData:this.defaultRenderList(),
      currentChoose:this.getDefaultChoose(),
      initialScrollIndex:this.getInitialScrollIndex(),
      renderList:this.flatListData(),
      surerefresh:null,
    }
  }
  public getInitialScrollIndex = ()=>{
    const {defaultSelected,currentFloor,sourceList } = this.props
    if(_.isEmpty(defaultSelected)) return 0
    const initIndex = sourceList.findIndex(item=>String(item.id) === String(defaultSelected[currentFloor]?.id))
    return  initIndex<0?0:initIndex
  }
  public defaultRenderList = ()=>{
    const { currentFloor, floor, defaultSelected, sourceList,isLinkage,originData} = this.props
    if(isLinkage){
      return originData[currentFloor+1]
    }
    const getNoFefault = ()=>this.props.sourceList?.[0]?.sub || []
    const getDefaultList = ()=>{
      if(currentFloor + 1 === floor )  return []
      return sourceList.find(value=>value.id === defaultSelected[currentFloor].id)?.sub || getNoFefault()
    }
    return _.isEmpty(defaultSelected)?getNoFefault():getDefaultList()
  }
  public getDefaultChoose = ()=>{
    const { defaultSelected, currentFloor, sourceList } = this.props
    return _.isEmpty(defaultSelected)?sourceList?.[0]:(sourceList.find(item=>item.id === defaultSelected?.[currentFloor]?.id) || sourceList?.[0])
  }
  public mid = ()=>{
    const { maxLength } = this.props
    return Math.floor(maxLength/2)
  }
  public  flatListData = (nextData:any[])=>{
    const { sourceList,currentFloor,originData ,isLinkage} = this.props
    const mid = this.mid()
    const arr = Array(mid).fill({id:'',name:'',sub:[]})
    let currentData = nextData?nextData:sourceList
    if(isLinkage){
      currentData = originData[currentFloor]
    }
    if(currentData.length === 0 || !currentData) return []
    return [...arr,...currentData,...arr]
  }
  public getItemLayout = (data:any,index:any) =>{
    const { itemHeihght } = this.props
    return {length: itemHeihght, offset: itemHeihght * index, index}
  }
  public renderItem = ({item,index,separators}:any)=>{
    const { itemHeihght ,ActiveTextStyle,normalTextStyle,pickerType} = this.props
    const {currentChoose} = this.state
    const itemPress =  (pickerType === 'scroll' || item.id === currentChoose?.id)?_.noop:this.clickItem
    return <TouchableWithoutFeedback  onPress={()=>itemPress(item,index)}>
              <Text
                numberOfLines={1}
                style={[
                  {
                    height:itemHeihght,
                    textAlign:'center',
                    lineHeight:itemHeihght,
                    opacity:0.8,
                    paddingHorizontal: 10,
                  },
                  item.id === currentChoose?.id?ActiveTextStyle:normalTextStyle
                ]}
              >{item.name}</Text>
            </TouchableWithoutFeedback>
  }

  public clickItem =(item:ISourceType,index:any)=>{
    const mid = this.mid()
    if(index<mid) return
    if(!item) return
    this.scrollToIndex(index)
    this.chooseItem(index,item)
  }
  public  scrollToIndex = (index:any)=>{
    const { renderList } = this.state
    if(renderList.length === 0 || !renderList) return
    if(this.flatEl){
      this.flatEl.scrollToIndex({
        index,
        viewPosition:0.5,
        animated:true
      })
    }
  }
  public  chooseItem = (index:number,item:ISourceType)=>{
    const { setSelect,currentFloor,isLinkage } = this.props
    setSelect(item,currentFloor)
    if(isLinkage) return
    this.setState({
      currentChoose:item || {},
      nextData:item?.sub || []
    },()=>{
      if(this.itemEL) this.itemEL.reduction()
    })
  }
  public reduction=()=>{
    const currentChoose = this.props.sourceList?.[0] || {}
    const nextData = currentChoose?.sub || []
    const mid = this.mid()
    this.setState({
      currentChoose,
      nextData,
      renderList:this.flatListData(),
      surerefresh:Date.now()+Math.random(),
    })
  }
  public componentDidMount(){
    this.initSelected()
  }
  public componentDidUpdate(preProp:ISItemProps,preState:ISItemState){
    const mid = this.mid()
    if(this.state.surerefresh !== preState.surerefresh){
      _.delay(()=>this.clickItem(this.state.currentChoose,mid),100)
    }
  }
  public initSelected = ()=>{
    const {setSelect,currentFloor } = this.props
    const { currentChoose } = this.state
    setSelect(currentChoose,currentFloor)
    if(this.flatEl) this.flatEl.recordInteraction()
  }
  public renderListEmptyComponent = (data:any)=>{
    const {renderListEmptyComponent,itemHeihght,emptyOptions,maxLength} = this.props

    if(renderListEmptyComponent) return renderListEmptyComponent()
      return <View style={{height:itemHeihght*maxLength,justifyContent:'center',alignItems: 'center'}}>
        <Text
          numberOfLines={1}
          style={[
            {
              height:itemHeihght,
              textAlign:'center',
              lineHeight:itemHeihght,
              opacity:0.8,
              paddingHorizontal: 10,
            }
          ]}
        >{emptyOptions.descText || '暂无数据'}</Text>
      </View>
  }
  public render(){
    const {
      floor,
      currentFloor,
      setSelect,
      defaultSelected,
      maxLength,
      itemHeihght=50,
      ActiveTextStyle,
      normalTextStyle,
      pickerType,
      isLinkage,
      originData,
      emptyOptions,
    } = this.props
    const {
      nextData,
      initialScrollIndex,
      renderList,
    } = this.state

    const nextFloor = currentFloor + 1
    return (
      <>
        <FlatList
          style={{flex:1}}
          ref={ref=>this.flatEl = ref}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: object, index: number) => String(index)}
          renderItem={this.renderItem}
          viewabilityConfig={this.config}
          data={renderList}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={initialScrollIndex}
          onMomentumScrollEnd={this._moveEnd}
          scrollEnabled={pickerType === 'click'?false:true}
          ListEmptyComponent={this.renderListEmptyComponent}
        />
        {
          floor > nextFloor ?
            <PickerAlertViewItem
              ref={ref=>this.itemEL = ref}
              sourceList={nextData}
              floor={floor}
              setSelect={setSelect}
              currentFloor={nextFloor}
              defaultSelected={defaultSelected}
              maxLength={maxLength}
              itemHeihght={itemHeihght}
              ActiveTextStyle={ActiveTextStyle}
              normalTextStyle={normalTextStyle}
              pickerType={pickerType}
              isLinkage={isLinkage}
              originData={originData}
              emptyOptions={emptyOptions}
            />:
            null
        }
      </>
    )
  }
  private _moveEnd=(e)=>{
    const {itemHeihght} = this.props
    const { renderList } = this.state
    const contentOffset = e.nativeEvent.contentOffset.y;
    const mid = this.mid()
    const index = Math.round(contentOffset/itemHeihght)+mid
    this.clickItem(renderList[index],index)
  }
}

export default  WithHeadAndMethod(PickerAlertViewItem)

```


## 思路二

关键他用了**react-native-gesture-handler 很方便的处理手势；而不用react-native提供那一套比较繁琐**

源码：

[react-native-slidepicker.zip](react-native-slidepicker_3wEcebHmwP.zip "react-native-slidepicker.zip")

文档：[https://github.com/lexguy/react-native-slidepicker](https://github.com/lexguy/react-native-slidepicker "https://github.com/lexguy/react-native-slidepicker")

  网上参考  （他的思路和我基本是一样的；所以理起来非常顺畅）

核心组件代码：

```vue 
 /*
 * @Author: xuwei
 * @Date: 2020-11-06 21:51:46
 * @LastEditTime: 2021-02-05 16:29:13
 * @LastEditors: xuwei
 * @Description:
 */
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

export class SingleSlide extends PureComponent {
  static defaultProps = {
    itemHeight: 40,
    visibleNum: 5, // visible lins
    activeBgColor: '#fff',
    activeBgOpacity: 1,
    activeFontSize: 18,
    activeFontColor: '#F00',
    normalBgColor: '#fff',
    normalBgOpacity: 0.4,
    normalFontSize: 16,
    normalFontColor: '#333',
    inparindex: 0,
  };

  constructor(props) {
    super(props);
    this.init();
    this.state = {checkedIndex: this._deIndex};
  }

  init = () => {
    const {defaultIndex, itemHeight, list} = this.props;
    if (defaultIndex) {
      if (defaultIndex < 0 || defaultIndex > list.length - 1) {
        console.warn(
          '[slidepicker]defaultValueIndexes are out of range, default to 0',
        );
        this._deIndex = 0;
      } else {
        this._deIndex = defaultIndex;
      }
    } else {
      this._deIndex = 0;
    }
    this.transValue = new Animated.Value(-this._deIndex * itemHeight || 0);
  };

  componentDidMount() {
    const {inparindex} = this.props;
    this.props.done(this._deIndex, inparindex);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      this.transValue.setValue(0);
      this.dataBack(0);
    }
  }

  /** ----------------------------------- Gesture ----------------------------------------- */
  //滑动中
  _onPanGestureEvent = ({nativeEvent}) => {
    const {itemHeight} = this.props;
    if (
      nativeEvent.translationY > itemHeight * this.state.checkedIndex ||
      nativeEvent.translationY <
        -itemHeight * (this.props.list.length - this.state.checkedIndex - 1)
    ) {
      return;
    }
    this.transValue.setValue(nativeEvent.translationY);
  };

  _onHandlerStateChange = ({nativeEvent}) => {
    const {itemHeight} = this.props;
    if (nativeEvent.oldState === State.BEGAN) {
      this.transValue.setOffset(this.transValue._value);
    } else if (nativeEvent.oldState === State.ACTIVE) {
      const gesdy = nativeEvent.translationY;
      const ABSDy = Math.abs(gesdy);
      const count = Math.round(ABSDy / itemHeight);
      this.transValue.setValue(
        gesdy > 0 ? itemHeight * count : -itemHeight * count,
      );
      this.transValue.flattenOffset();
      this.adjustAniValue();
    }
  };

  adjustAniValue = () => {
    const {itemHeight, list} = this.props;
    const transvalue = this.transValue._value;
    const count = Math.round(transvalue / itemHeight);
    if (count > 0) {
      this.setAniAndDataback(0, 0);
    } else if (count < -list.length + 1) {
      this.setAniAndDataback(Math.round((-list.length + 1) * itemHeight), list.length - 1);
    } else {
      const finalIndex = Math.abs(count);
      this.dataBack(finalIndex);
    }
  };

  setAniAndDataback = (position, newIndex) => {
    this.transValue.setValue(position);
    this.dataBack(newIndex);
  };

  dataBack = (newIndex) => {
    const {done, inparindex} = this.props;
    if (newIndex !== this.state.checkedIndex && done) {
      done(newIndex, inparindex);
    }
    this.setState({checkedIndex: newIndex});
  };

  resetTrans = () => {
    this.transValue.setValue(0);
    this.setState({checkedIndex: 0});
  };

  /** ----------------------------------- Render ----------------------------------------- */
  renderItem = (item, index, offsetIndex) => {
    const {
      itemHeight,
      activeFontSize,
      activeFontColor,
      normalFontSize,
      normalFontColor,
    } = this.props;
    const {checkedIndex} = this.state;
    const isChecked = checkedIndex + offsetIndex === index;
    const itemStyle = {
      color: isChecked ? activeFontColor : normalFontColor,
      fontSize: isChecked ? activeFontSize : normalFontSize,
      height: itemHeight,
      lineHeight: itemHeight,
    };
    return (
      <Text numberOfLines={1} style={[sts.text, itemStyle]} key={index}>
        {item.name || ''}
      </Text>
    );
  };

  render() {
    const {
      list,
      itemHeight,
      visibleNum,
      activeBgColor,
      normalBgColor,
      normalBgOpacity,
      activeBgOpacity,
    } = this.props;

    let half = Math.floor(visibleNum / 2);
    const fillArr = Array(half).fill('');
    const offsetIndex = half;
    let finalList = list.slice();
    finalList.unshift(...fillArr);
    finalList = finalList.concat(fillArr);

    const maskBg = {
      backgroundColor: normalBgColor,
      opacity: normalBgOpacity,
      width: '100%',
      height: itemHeight * half,
    };
    return (
      <View style={[sts.contain, {height: itemHeight * visibleNum}]}>
        <PanGestureHandler
          onGestureEvent={this._onPanGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}>
          <View style={{flex: 1}}>
            <Animated.View
              style={[sts.f1, {transform: [{translateY: this.transValue}]}]}>
              {finalList.map((item, index) =>
                this.renderItem(item, index, offsetIndex),
              )}
            </Animated.View>
            <View style={maskBg} />
            <View
              style={{
                height: itemHeight,
                width: '100%',
                backgroundColor: activeBgColor,
                opacity: activeBgOpacity,
              }}
            />
            <View style={maskBg} />
          </View>
        </PanGestureHandler>
      </View>
    );
  }
}

const sts = StyleSheet.create({
  text: {
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  contain: {
    flexDirection: 'row',
    flex: 1,
  },
  f1: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    flex: 1,
  },
});

```


### CascadePicker Demo

```javascript 
 
import React, {PureComponent,Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text,Animated} from 'react-native';
import {GestureHandlerRootView,PanGestureHandler,State} from 'react-native-gesture-handler';

export class SingleSlide extends PureComponent {
  static defaultProps = {
    itemHeight: 40,
    visibleNum: 5, // visible lins
    activeBgColor: '#fff',
    activeBgOpacity: 1,
    activeFontSize: 18,
    activeFontColor: '#F00',
    normalBgColor: '#fff',
    normalBgOpacity: 0.4,
    normalFontSize: 16,
    normalFontColor: '#333',
    inparindex: 0,
  };

  constructor(props) {
    super(props);
    this.init();
    this.state = {checkedIndex: this._deIndex};
  }

  init = () => {
    const {defaultIndex, itemHeight, list} = this.props;
    if (defaultIndex) {
      if (defaultIndex < 0 || defaultIndex > list.length - 1) {
        console.warn(
          '[slidepicker]defaultValueIndexes are out of range, default to 0',
        );
        this._deIndex = 0;
      } else {
        this._deIndex = defaultIndex;
      }
    } else {
      this._deIndex = 0;
    }
    this.transValue = new Animated.Value(-this._deIndex * itemHeight || 0);
  };

  componentDidMount() {
    const {inparindex} = this.props;
    this.props.done(this._deIndex, inparindex);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      this.transValue.setValue(0);
      this.dataBack(0);
    }
  }

  /** ----------------------------------- Gesture ----------------------------------------- */
    //滑动中
  _onPanGestureEvent = ({nativeEvent}) => {
    const {itemHeight} = this.props;
    if (
      nativeEvent.translationY > itemHeight * this.state.checkedIndex ||
      nativeEvent.translationY <
      -itemHeight * (this.props.list.length - this.state.checkedIndex - 1)
    ) {
      return;
    }
    this.transValue.setValue(nativeEvent.translationY);
  };

  _onHandlerStateChange = ({nativeEvent}) => {
    const {itemHeight} = this.props;
    if (nativeEvent.oldState === State.BEGAN) {
      this.transValue.setOffset(this.transValue._value);
    } else if (nativeEvent.oldState === State.ACTIVE) {
      const gesdy = nativeEvent.translationY;
      const ABSDy = Math.abs(gesdy);
      const count = Math.round(ABSDy / itemHeight);
      this.transValue.setValue(
        gesdy > 0 ? itemHeight * count : -itemHeight * count,
      );
      this.transValue.flattenOffset();
      this.adjustAniValue();
    }
  };

  adjustAniValue = () => {
    const {itemHeight, list} = this.props;
    const transvalue = this.transValue._value;
    const count = Math.round(transvalue / itemHeight);
    if (count > 0) {
      this.setAniAndDataback(0, 0);
    } else if (count < -list.length + 1) {
      this.setAniAndDataback(Math.round((-list.length + 1) * itemHeight), list.length - 1);
    } else {
      const finalIndex = Math.abs(count);
      this.dataBack(finalIndex);
    }
  };

  setAniAndDataback = (position, newIndex) => {
    this.transValue.setValue(position);
    this.dataBack(newIndex);
  };

  dataBack = (newIndex) => {
    const {done, inparindex} = this.props;
    if (newIndex !== this.state.checkedIndex && done) {
      done(newIndex, inparindex);
    }
    this.setState({checkedIndex: newIndex});
  };

  resetTrans = () => {
    this.transValue.setValue(0);
    this.setState({checkedIndex: 0});
  };

  /** ----------------------------------- Render ----------------------------------------- */
  renderItem = (item, index, offsetIndex) => {
    const {
      itemHeight,
      activeFontSize,
      activeFontColor,
      normalFontSize,
      normalFontColor,
    } = this.props;
    const {checkedIndex} = this.state;
    const isChecked = checkedIndex + offsetIndex === index;
    const itemStyle = {
      color: isChecked ? activeFontColor : normalFontColor,
      fontSize: isChecked ? activeFontSize : normalFontSize,
      height: itemHeight,
      lineHeight: itemHeight,
    };
    return (
      <Text numberOfLines={1} style={[sts.text, itemStyle]} key={index}>
        {item.name || ''}
      </Text>
    );
  };

  render() {
    const {
      list,
      itemHeight,
      visibleNum,
      activeBgColor,
      normalBgColor,
      normalBgOpacity,
      activeBgOpacity,
    } = this.props;

    let half = Math.floor(visibleNum / 2);
    const fillArr = Array(half).fill('');
    const offsetIndex = half;
    let finalList = list.slice();
    finalList.unshift(...fillArr);
    finalList = finalList.concat(fillArr);

    const maskBg = {
      backgroundColor: normalBgColor,
      opacity: normalBgOpacity,
      width: '100%',
      height: itemHeight * half,
    };
    return (
      <View style={[sts.contain, {height: itemHeight * visibleNum}]}>
        <PanGestureHandler
          onGestureEvent={this._onPanGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}>
          <View style={{flex: 1}}>
            <Animated.View
              style={[sts.f1, {transform: [{translateY: this.transValue}]}]}>
              {finalList.map((item, index) =>
                this.renderItem(item, index, offsetIndex),
              )}
            </Animated.View>
            <View style={maskBg} />
            <View
              style={{
                height: itemHeight,
                width: '100%',
                backgroundColor: activeBgColor,
                opacity: activeBgOpacity,
              }}
            />
            <View style={maskBg} />
          </View>
        </PanGestureHandler>
      </View>
    );
  }
}



export class RelativedPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lists: this._initState(),
    };
  }
  _initState = () => {
    const lists = new Array(this.props.pickerDeep).fill([]);
    lists[0] = this.props.dataSource;
    return lists;
  };

  _dismantleBebindData = (array, index, inparIndex) => {
    const {pickerDeep} = this.props;
    if (pickerDeep === inparIndex) {
      this._onceChange();
      return;
    }
    const lists = this.state.lists.slice();
    const curObj = array[index];
    curObj && this._setParResult(inparIndex, curObj);
    if (array && array.length > 0) {
      lists[inparIndex] = array;
      this.setState({lists}, () => {
        inparIndex++;
        this._dismantleBebindData(curObj.list || [], 0, inparIndex);
      });
    } else {
      for (let i = inparIndex; i < pickerDeep; i++) {
        lists[i] = [];
        this._setParResult(i, {});
      }
      this.setState({lists});
      this._onceChange();
    }
  };

  _onceChange = () =>
    this.props.onceChange && this.props.onceChange(this.resultArray);

  _setParResult = (index, obj) => {
    const {list, ...item} = obj;
    this.props.setResult(index, item);
  };

  _setData = (checkedIndex, inparindex) => {
    this._dismantleBebindData(
      this.state.lists[inparindex],
      checkedIndex,
      inparindex,
    );
  };
  /** ----------------------------------- Render ----------------------------------------- */
  render() {
    return (
      <View style={sts.all}>
        {this.state.lists.map((list, index) => (
          <SingleSlide
            key={index}
            list={list}
            done={this._setData}
            inparindex={index}
            {...this.props.pickerStyle}
          />
        ))}
      </View>
    );
  }
}






const defaultOptions = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  headHeight: 50,
  backgroundColor: '#fff',
  confirmStyle: {},
  cancelStyle: {},
  borderTopRadius: 0,
};

export function WithHeadAndMethod(WrapComponent) {
  return class extends Component {
    static defaultProps = {
      dataSource: [],
      pickerDeep: 3,
      onceChange: null,
      confirm: null,
      cancel: null,
      customHead: null,
      pickerStyle: {},
    };
    constructor(props) {
      super(props);
      this.resultArray = [];
      this.headOptions = {...defaultOptions, ...this.props.headOptions};
    }

    _setResult = (index, value) => {
      this.resultArray[index] = value;
    };

    getResult = () => this.resultArray; // ref
    confirm = () => {
      if (this.props.confirm) {
        this.props.confirm(this.resultArray);
      } else {
        console.warn(`[slidepicker] should provide 'confirm' method`);
      }
    };
    cancel = () => {
      if (this.props.cancel) {
        this.props.cancel();
      } else {
        console.warn(`[slidepicker] should provide 'cancel' method`);
      }
    };
    onceChange = () =>
      this.props.onceChange && this.props.onceChange(this.resultArray);

    render() {
      const {customHead} = this.props;
      return (
        <GestureHandlerRootView>
          <View>
            <Head
              headOptions={this.headOptions}
              cancel={this.cancel}
              confirm={this.confirm}
              customHead={customHead}
            />
            <WrapComponent
              {...this.props}
              setResult={this._setResult}
              confirm={this.confirm}
              cancel={this.cancel}
              onceChange={this.onceChange}
            />
          </View>
        </GestureHandlerRootView>
      );
    }
  };
}

const Head = React.memo(({headOptions, customHead, confirm, cancel}) => {
  if (customHead) {
    return customHead;
  } else {
    const headerapstyle = {
      borderTopLeftRadius: headOptions.borderTopRadius,
      borderTopRightRadius: headOptions.borderTopRadius,
      height: headOptions.headHeight,
      backgroundColor: headOptions.backgroundColor,
    };
    return (
      <View style={[sts.btns, headerapstyle]}>
        <TouchableOpacity
          style={[sts.btn, {height: headOptions.headHeight}]}
          onPress={cancel}>
          <Text style={[sts.btn_text, headOptions.cancelStyle]}>
            {headOptions.cancelText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[sts.btn, {height: headOptions.headHeight}]}
          onPress={confirm}>
          <Text style={[sts.btn_text, headOptions.confirmStyle]}>
            {headOptions.confirmText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});
const sts = StyleSheet.create({
  all: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  btn: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  btn_text: {fontSize: 18, color: '#4169E1'},
  text: {
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  contain: {
    flexDirection: 'row',
    flex: 1,
  },
  f1: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    flex: 1,
  },
});



export const CascadePicker = WithHeadAndMethod(RelativedPicker);


// 使用
<CascadePicker
            dataSource={threeData}
            confirm={this.showData}
            cancel={this.close}
            onceChange={(arr) => {
              console.info('once', arr);
            }}
            pickerDeep={3}
            pickerStyle={{
              itemHeight: 50,
              visibleNum: 5,
              activeBgColor: '#A00',
              activeBgOpacity: 0.5,
              activeFontSize: 19,
              activeFontColor: '#FFF',

              normalBgColor: '#999',
              normalBgOpacity: 1,
              normalFontSize: 13,
              normalFontColor: '#333',
            }}
            headOptions={{
              cancelText: '取消',
              confirmText: '确认',
              headHeight: 50,
              borderTopRadius: 10,
              backgroundColor: '#444',
              confirmStyle: {fontSize: 20, color: '#fff', fontWeight: 'bold'},
              cancelStyle: {color: '#fff'},
            }}
          />

```


## 思路三：（最终版）

完整代码:

[PickerAlertView.tsx](PickerAlertView_3lilJHR-oR.tsx " PickerAlertView.tsx")

[React Native纯JS实现日期、地址选择控件 目前git上是没有看到js实现的Picker组件，git上比较火的 react-native-picker使用过程中发现了一堆bug，而且很不灵活，其他的就更无从谈起。这里分享我们项目中纯js实现的Picker控件。 先看效果（android、ios真机… https://zhuanlan.zhihu.com/p/33680472](https://zhuanlan.zhihu.com/p/33680472 "React Native纯JS实现日期、地址选择控件 目前git上是没有看到js实现的Picker组件，git上比较火的 react-native-picker使用过程中发现了一堆bug，而且很不灵活，其他的就更无从谈起。这里分享我们项目中纯js实现的Picker控件。 先看效果（android、ios真机… https://zhuanlan.zhihu.com/p/33680472")

[GitHub - iberHK/react-native-picker: 纯JS实现的一个高效流畅的日期选择器和区域选择器，支持android、ios 纯JS实现的一个高效流畅的日期选择器和区域选择器，支持android、ios. Contribute to iberHK/react-native-picker development by creating an account on GitHub. https://github.com/iberHK/react-native-picker](https://github.com/iberHK/react-native-picker "GitHub - iberHK/react-native-picker: 纯JS实现的一个高效流畅的日期选择器和区域选择器，支持android、ios 纯JS实现的一个高效流畅的日期选择器和区域选择器，支持android、ios. Contribute to iberHK/react-native-picker development by creating an account on GitHub. https://github.com/iberHK/react-native-picker")

[react-native-picker.zip](react-native-picker_zfGb2CPkLM.zip "react-native-picker.zip")

### 引用样式部分

```javascript 
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native'
import React,{
  PureComponent,
  Component,
} from 'react'
import Svg, {
  LinearGradient,
  Rect,
  Stop
} from 'react-native-svg';
import _ from 'lodash'
import styleSheet, {getThemeColor} from '../utils/styleSheet'
import {Callback} from "modern/types/lang";
import Modal from './Modal'
import {getScreenHeight, getScreenWidth} from "modern/consts/ui-common";

const styles = styleSheet.create({
  container:{
    flex:1,
    backgroundColor: 0x00000074,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentView:{
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  stage:{
    top:0,
    bottom:0,
    left:0,
    right:0,
    position:'absolute',
    zIndex:10,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  maskView:{
    left:0,
    right:0,
    position:'absolute',
    top:0,
    bottom:0,
    zIndex:0,
    justifyContent:'space-between'
  },
  emptyView:{
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    backgroundColor: 'white',
  },
  headView:{
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    backgroundColor: 'white',
  },
  maskStyle:{
    width:'100%',
    // backgroundColor:'rgba(232,232,232,0.9)',
    borderColor:"rgba(232,232,232,0.9)",
    backgroundColor:'white'
  },
  midMaskStyle:{
    backgroundColor:'#f9f9f9'
  },
  headerBtnView:{
    height:50,justifyContent: 'center'
  },
  cancelText:{
    fontSize:16,color:'gray'
  },
  headerTitle:{
    color:'#373737',
    fontSize: 18,
  }
})

```


### 默认配置部分

```javascript 
function DefaultView (){
  return (
    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
        <Text>暂无数据</Text>
    </View>
  )
}
interface ISHeadProps {
  customHead:any,
  confirm:Callback,
  hide:Callback,
  headOptions:{
    cancelTextStyle:any,
    cancelBtnView:any,
    confirmBtnView:any,
    confirmTextStyle:any,
    leftText:string,
    rightText:string,
    titleText:string,
    titleTextViewStyle:string,
    headerContainView:string,
  }
}
const Head:React.FC<ISHeadProps> = React.memo(({customHead,confirm,hide,headOptions})=>{
    if(customHead && _.isFunction(customHead)){
      return customHead(confirm,hide)
    }
    const {
      cancelTextStyle={},
      cancelBtnView={},
      confirmBtnView={},
      confirmTextStyle={},
      leftText='取消',
      rightText='确定',
      titleText='',
      titleTextViewStyle={},
      headerContainView={},
    } = headOptions
    return <View style={[styles.headView,headerContainView]}>
      <TouchableOpacity style={[styles.headerBtnView,cancelBtnView]} onPress={hide}>
        <Text style={[styles.cancelText,cancelTextStyle]}>{leftText}</Text>
      </TouchableOpacity>
      {!_.isEmpty(titleText)?
        <View style={[styles.headerBtnView]}>
          <Text style={[styles.headerTitle,titleTextViewStyle]}>{titleText}</Text>
        </View>
        :null}
      <TouchableOpacity onPress={confirm} style={[styles.headerBtnView,confirmBtnView]}>
        <Text style={[{color:getThemeColor(),fontSize:16},confirmTextStyle]}>{rightText}</Text>
      </TouchableOpacity>
    </View>
})
interface ISEmpty {
  hide:Callback
}
const Empty:React.FC<ISEmpty> = React.memo(({hide})=>{
  return <TouchableWithoutFeedback  onPress={hide}>
    <View style={{flex:1,width:getScreenWidth()}} />
  </TouchableWithoutFeedback>
})
interface ISMaskView {
  maxLength:number,
  itemHeihght:number,
  maskOptions:any,
}
const MaskView:React.FC<ISMaskView> = React.memo(({maxLength,itemHeihght,maskOptions={}})=>{
  const {
    upMaskView,
    bottomMaskView,
    midMaskView
  } = maskOptions
  const mid = Math.floor(maxLength/2)
  return  <View style={[styles.maskView]}>
    <View style={[styles.maskStyle,{height:itemHeihght*mid,borderBottomWidth:0.5,},upMaskView]}/>
    <View style={[styles.midMaskStyle,{height:itemHeihght},midMaskView]} />
    <View style={[styles.maskStyle,{height:itemHeihght*mid,borderTopWidth:0.5,},bottomMaskView]}/>
  </View>
})
```


### 外层包裹部分

```javascript 
interface ISourceType {
  id:string,
  name:string,
  sub?:ISourceType[]
  [propname:string]:any,
}
interface ISitemOptons  {
  itemHeihght?:number,
  maxLength?:5 | 7 | 9,
  ActiveTextStyle?:any,
  normalTextStyle?:any,
}
interface ISProps {
  sourceData:ISourceType[],
  cancel?:Callback,
  confirm:Callback,
  selectData:ISourceType[],
  customHead:any,
  headOptions:any,
  maskOptions:any,
  itemOptons:ISitemOptons,
  renderListEmptyComponent:Callback,
  emptyOptions:any,
  wrapOptions:any,
  EmptyView:any,
}
interface ISState {
  visible:boolean,
  floor:number,
}
function WithHeadAndMethod(WrapComponent:any){
    return class PickerAlertView extends PureComponent<ISProps,ISState>{
      public selectedData:ISourceType[] =[]
      public static defaultProps = {
        itemOptons:{},
        selectData:[],
        headOptions:{},
        maskOptions:{},
        emptyOptions:{},
        wrapOptions:{
          stageView:{},
          forceSetFloor:undefined
        }
      }
      constructor(props:ISProps) {
        super(props);
        this.state = {
          visible:false,
          floor:this.getMaxFloor(),
        }
      }
      public getMaxFloor = ()=>{

        const { sourceData,wrapOptions } = this.props
        if(wrapOptions.forceSetFloor && _.isNumber(wrapOptions.forceSetFloor))  return wrapOptions.forceSetFloor
        if(_.isEmpty(sourceData)) return 0
        let floor:number = 1
        function treeData(arr:any){
          const sub:any = arr.find((item:any)=>item?.sub?.length > 0)
          if(sub){
            floor = floor + 1
            let arr2:any = []
            arr.forEach((item:any)=>{
              if(item?.sub?.length>0){
                arr2 = arr2.concat(item.sub)
              }
            })
            treeData(arr2)
          }
        }
        treeData(sourceData)
        return floor
      }
      public show = ()=>{
        this.setState({visible:true})
      }
      public confirm = ()=>{
        const { confirm=_.noop } = this.props
        this.hide()
        confirm(this.selectedData)
      }
      public hide = ()=>{
        const { cancel=_.noop } = this.props
        cancel()
        this.setState({visible:false})
      }
      public getSelected = ()=>this.selectedData
      private setSelected = (item:ISourceType,floor:number)=>{
        this.selectedData[floor] = item ?? {}
      }
      public componentDidUpdate(preProps,prevState,snapshot){
        if(!_.isEqual(this.props.sourceData,preProps.sourceData)){
          this.setState({
            floor:this.getMaxFloor()
          })
        }
      }
      public render(){
        const {
          visible,
          floor,
        } = this.state
        const {
          selectData,
          sourceData,
          customHead,
          headOptions,
          maskOptions,
          itemOptons,
          renderListEmptyComponent,
          emptyOptions,
          wrapOptions,
          EmptyView = DefaultView
        } = this.props
        const { stageView } = wrapOptions
        if(!visible) return null
        const {
          maxLength=9,
          itemHeihght=50,
          ActiveTextStyle={},
          normalTextStyle={}
        }  = itemOptons
        return (
          <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
          >
            <View
              style={styles.container}
            >
              <Empty hide={this.hide}/>
              <View style={{ width:getScreenWidth()}}>
                <Head
                  headOptions={headOptions}
                  hide={this.hide}
                  confirm={this.confirm}
                  customHead={customHead}
                />
                <View  style={[{height:itemHeihght*maxLength},styles.contentView]}>
                  <View style={[styles.stage,stageView]}>
                    {
                      _.isEmpty(sourceData) ?<EmptyView/>:
                        <WrapComponent
                          sourceList={sourceData}
                          setSelect={this.setSelected}
                          floor={floor}
                          currentFloor={0}
                          maxLength={maxLength}
                          defaultSelected = {selectData}
                          itemHeihght={itemHeihght}
                          ActiveTextStyle={ActiveTextStyle}
                          normalTextStyle={normalTextStyle}
                          originData={sourceData}
                          renderListEmptyComponent={renderListEmptyComponent}
                          emptyOptions={emptyOptions}
                          surerefresh={0}
                        />
                    }
                  </View>
                  <MaskView
                    maxLength={maxLength}
                    itemHeihght={itemHeihght}
                    maskOptions={maskOptions}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )
      }

    }
}
```


### list 逻辑部分

```javascript 
interface ISItemProps {
  sourceList:ISourceType[],
  setSelect:Callback,
  floor:number,
  currentFloor:number,
  maxLength: 5 | 7 | 9,
  defaultSelected:ISourceType[],
  itemHeihght:number,
  ActiveTextStyle:any,
  normalTextStyle:any,
  originData:any,
  renderListEmptyComponent:Callback,
  emptyOptions:any,
  surerefresh:any,
}
interface ISItemState {
  nextData:any[],
  currentChoose:any,
  surerefresh:any,
  list:any[],
  selectedIndex:number
}
class PickerAlertViewItem extends PureComponent<ISItemProps,ISItemState> {
  public ref:any
  private _panResponder:any
  public parentTopY:number
  public parentBottomY:number
  public path:any
  public keyDown:any
  public lastTop:any
  public timer:any
  public _previousTop:any
  public maxTop:any
  public maxBottom:any
  public previousTop:any
  public velocity:any
  public pathListener:any
  public screenHeight:number = getScreenHeight()
  public itemRef:any
  public  constructor(props:ISItemProps) {
    super(props);
    const list = this.flatListData()
    this.state = {
      nextData:this.defaultRenderList(),
      currentChoose:this.getDefaultChoose(),
      surerefresh:null,
      list,
      selectedIndex:this.getInitialScrollIndex(),
    }
    this.init(list)
    this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
    this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
    this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderEnd = this.onPanResponderEnd.bind(this);

  }
  public static defaultProps = {
    ActiveTextStyle:{},
    normalTextStyle:{},
  }
  public getInitialScrollIndex = ()=>{
    const {defaultSelected,currentFloor,sourceList,itemHeihght } = this.props
    if(_.isEmpty(defaultSelected)) return 0
    const mid = this.mid()
    const initIndex = sourceList.findIndex(item=>String(item.id) === String(defaultSelected[currentFloor]?.id))
    this.path = new Animated.Value(-itemHeihght * initIndex);
    return  initIndex<0?0:(initIndex+mid)
  }
  public defaultRenderList = ()=>{
    const { currentFloor, floor, defaultSelected, sourceList,originData} = this.props
    const getNoFefault = ()=>this.props.sourceList?.[0]?.sub || []
    const getDefaultList = ()=>{
      if(currentFloor + 1 === floor )  return []
      return sourceList.find(value=>value.id === defaultSelected[currentFloor].id)?.sub || getNoFefault()
    }
    return _.isEmpty(defaultSelected)?getNoFefault():getDefaultList()
  }
  public getDefaultChoose = ()=>{
    const { defaultSelected, currentFloor, sourceList } = this.props
    return _.isEmpty(defaultSelected)?sourceList?.[0]:(sourceList.find(item=>item.id === defaultSelected?.[currentFloor]?.id) || sourceList?.[0])
  }
  public mid = ()=>{
    const { maxLength } = this.props
    return Math.floor(maxLength/2)
  }
  public  flatListData = (nextData:any[])=>{
    const { sourceList,currentFloor,originData } = this.props
    const mid = this.mid()
    const arr = Array(mid).fill({id:'',name:'',sub:[]})
    const currentData = nextData?nextData:sourceList
    if(currentData.length === 0 || !currentData) return []
    return [...arr,...currentData,...arr]
  }
  public initSelected = ()=>{
    const {setSelect,currentFloor } = this.props
    const { currentChoose } = this.state
    setSelect(currentChoose,currentFloor)
  }
  public componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd,
    });
  }
  // 用户开始触摸屏幕的时候，是否愿意成为响应者；
  private onStartShouldSetPanResponder(evt, gestureState) {
    if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
      return false;
    } else {
      this.path && this.path.removeAllListeners();
      this.path.stopAnimation();
      this.keyDown = Date.now();
      return true;
    }
  }

  // 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  private onMoveShouldSetPanResponder(evt, gestureState) {
    if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
      return false;
    } else {
      this.path && this.path.removeAllListeners();
      this.path.stopAnimation();
      return true;
    }
  }

  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  private onPanResponderGrant(evt, gestureState) {
    this.lastTop = this.path._value;
  }

  // 最近一次的移动距离为gestureState.move{X,Y}
  private onPanResponderMove(evt, gestureState) {
    const { itemHeihght  } = this.props
    if (this.timer != null) {
      this.timer.map(item => {
        clearTimeout(item);
      });
    }
    this._previousTop = this.lastTop + gestureState.dy;
    // 最多超出 一行的距离
    if (this._previousTop > 0) {
      this._previousTop = Math.min(this._previousTop, this.maxTop + itemHeihght);
    } else {
      this._previousTop = Math.max(this._previousTop, this.maxBottom - itemHeihght);
    }
    this.path.setValue(this._previousTop);

    if (this.previousTop) {
      this.velocity = gestureState.dy - this.previousTop;
    } else {
      this.velocity = 0;
    }
    // 记录上一次的纵向记录
    this.previousTop = gestureState.dy;
  }

  private onPanResponderEnd(evt, gestureState) {
    const {itemHeihght  } = this.props
    const mid = this.mid()
    const actionTime = Date.now() - this.keyDown;
    if (actionTime < 300 && Math.abs(gestureState.vy) < 0.1) {
      // @ts-ignore
      const clickPosition = -(parseInt((gestureState.y0 - this.parentTopY) / itemHeihght,10) - mid);
      let toValue = this.path._value;
      const num = Math.round(toValue / itemHeihght);
      toValue = itemHeihght * num;
      toValue = toValue + (itemHeihght * clickPosition);
      if (toValue > 0) {
        toValue = Math.min(toValue, this.maxTop);
      } else {
        toValue = Math.max(toValue, this.maxBottom);
      }
      if (!isNaN(toValue)) {
        Animated.timing(this.path, { toValue, duration: 200 }).start(() => {
          this.onSeleted(Math.abs(toValue / itemHeihght - mid));
        });
      }
    } else {

      this.lastTop = this._previousTop;
      let toValue = this._previousTop + gestureState.vy * itemHeihght * mid;
      const num = Math.round(toValue / itemHeihght);
      toValue = itemHeihght * num;
      if (toValue > 0) {
        toValue = Math.min(toValue, this.maxTop);
      } else {
        toValue = Math.max(toValue, this.maxBottom);
      }
      Animated.decay(this.path, {
        velocity: gestureState.vy, // 通过手势设置相关速度
        deceleration: 0.995,
      }).start(() => {
        if (this.path._value % itemHeihght === 0) {
          this.path.removeListener(this.pathListener);
          this.pathListener = null;
        } else {
          // 慣性動畫
          if (this.pathListener) {
            this.path.removeListener(this.pathListener);
            this.pathListener = null;
            const toValue = Math.round(this.path._value / itemHeihght) * itemHeihght;
            Animated.timing(this.path, {
              toValue,
              duration: 50
            }).start(() => {
              // onSeleted
              this.onSeleted(Math.abs(toValue / itemHeihght - mid));
            });
          }
        }
      });

      // 當滾动超出上限或者下限时，接管惯性运动
      this.pathListener = this.path.addListener((listener) => {
        if (listener.value < this.maxBottom && this.pathListener) {
          this.path.removeListener(this.pathListener);
          this.pathListener = null;
          Animated.timing(this.path, { toValue: this.maxBottom }).start(() => {
            // onSeleted
            this.onSeleted(Math.abs(this.maxBottom / itemHeihght - mid));
          });
        } else if (listener.value > this.maxTop - itemHeihght && this.pathListener) {
          this.path.removeListener(this.pathListener);
          this.pathListener = null;
          Animated.timing(this.path, { toValue: this.maxTop }).start(() => {
            // onSeleted
            this.onSeleted(Math.abs(this.maxTop / itemHeihght - mid));
          });
        }
      });
    }
  }
  private renderList() {
    const { list } = this.state
    const {renderListEmptyComponent,itemHeihght,emptyOptions,maxLength} = this.props
    if(_.isEmpty(list)){
      if(renderListEmptyComponent) return renderListEmptyComponent()
      return <View style={{height:itemHeihght*maxLength,justifyContent:'center',alignItems: 'center'}}>
        <Text
          numberOfLines={1}
          style={[
            {
              height:itemHeihght,
              textAlign:'center',
              lineHeight:itemHeihght,
              opacity:0.8,
              paddingHorizontal: 10,
            }
          ]}
        >{emptyOptions.descText || '暂无数据'}</Text>
      </View>
    }
    return this.state.list.map((item, index) => {
      return this.renderItem(item, index);
    });
  }
  private renderItem = (item:any, index:number)=>{
    const { itemHeihght ,ActiveTextStyle,normalTextStyle} = this.props
    const { selectedIndex } =this.state
    console.log(selectedIndex,index,selectedIndex===index,item.name,'-----asasgasga--')
      return <View
        key={index}
        style={{
          height: itemHeihght,
          justifyContent: 'center', alignItems: 'center',

        }}>
        <Animated.Text
          style={[{
            backgroundColor: 'transparent',
            fontWeight: 'normal',
        },normalTextStyle,selectedIndex===index?ActiveTextStyle:null]}>{item.name ?? ''}</Animated.Text>
      </View >
  }
  private onSeleted(selectedIndex) {
    const index = selectedIndex || 0
    console.log(selectedIndex,'----selectedIndex---')
    const {currentFloor,setSelect} = this.props
    const { list } = this.state
    if (this.timer == null) {
      this.timer = [];
    }
    this.timer.push(setTimeout(() => {
      setSelect(list?.[index],currentFloor)
      this.setState({
        nextData:list?.[index]?.sub || [],
        selectedIndex:index,
        surerefresh:Date.now() + Math.random()
      })
    }, 20));
  }
  public init = (list:any[]=[])=>{
    const {itemHeihght,maxLength} = this.props
    this.parentTopY = this.screenHeight - itemHeihght * maxLength ;
    this.parentBottomY = this.screenHeight
    this.maxTop = 0;
    this.maxBottom = _.isEmpty(list)? 0: - itemHeihght* (list.length - maxLength);
  }

  public componentDidUpdate(preProp:ISItemProps,preState:ISItemState){
    if(preProp.surerefresh !== this.props.surerefresh) {
      const mid =this.mid()
      const list = this.flatListData()
      this.init(list)
      this.setState({
        list,
      },()=>{
        this.onSeleted(mid)
        this.path.setValue(0);
      })

    }
  }
  public componentDidMount() {
    this.initSelected()
  }

  public render(){
    const {
      floor,
      currentFloor,
      setSelect,
      defaultSelected,
      maxLength,
      itemHeihght=50,
      ActiveTextStyle,
      normalTextStyle,
      originData,
      emptyOptions,
    } = this.props
    const {
      nextData,
      surerefresh
    } = this.state

    const nextFloor = currentFloor + 1
    return (
      <>
        <View
          ref={ref => this.ref = ref}
          {...this._panResponder.panHandlers}
          style={{
            overflow: 'hidden',
            height: itemHeihght * maxLength , backgroundColor: 'transparent',
            flex:1
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this.path
                }
              ],
              flex:1,
            }}
          >
            {this.renderList()}
          </Animated.View>
        </View>
        {
          floor > nextFloor ?
            <PickerAlertViewItem
              ref={el=>this.itemRef = el}
              sourceList={nextData}
              floor={floor}
              setSelect={setSelect}
              currentFloor={nextFloor}
              defaultSelected={defaultSelected}
              maxLength={maxLength}
              itemHeihght={itemHeihght}
              ActiveTextStyle={ActiveTextStyle}
              normalTextStyle={normalTextStyle}
              originData={originData}
              emptyOptions={emptyOptions}
              surerefresh={surerefresh}
            />:
            null
        }
      </>

    )
  }
}

export default  WithHeadAndMethod(PickerAlertViewItem)

```


# react-native-picker

[npm: react-native-picker A Native Picker with high performance.. Latest version: 4.3.7, last published: 4 years ago. Start using react-native-picker in your project by running \`npm i react-native-picker\`. There are 30 other p https://www.npmjs.com/package/react-native-picker](https://www.npmjs.com/package/react-native-picker "npm: react-native-picker A Native Picker with high performance.. Latest version: 4.3.7, last published: 4 years ago. Start using react-native-picker in your project by running `npm i react-native-picker`. There are 30 other p https://www.npmjs.com/package/react-native-picker")

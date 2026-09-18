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

# UI展示类（一）

## 目录

- [颜色渐变](#颜色渐变)
  - [1.locations](#1locations)
  - [2.从左到右](#2从左到右)
  - [3:斜角渐变](#3斜角渐变)
- [shadow 阴影](#shadow-阴影)
  - [react-native-shadow](#react-native-shadow)
  - [react-native-shadow-cards](#react-native-shadow-cards)
  - [Card:](#Card)
- [表格：](#表格)
- [SingleCell](#SingleCell)
- [多选地址页面](#多选地址页面)

# 颜色渐变

[react-native-linear-gradient颜色渐变 - qiqi715 - 博客园 \[TOC\] 一 安装 二 使用 2.1 colors 默认情况下，渐变色的方向是从上向下的 2.2 start / end 你想渐变色从左向右，或者斜角渐变，就需要设置下了 eg1:斜角渐变 eg2: https://www.cnblogs.com/qiqi715/p/10236596.html](https://www.cnblogs.com/qiqi715/p/10236596.html "react-native-linear-gradient颜色渐变 - qiqi715 - 博客园 \[TOC] 一 安装 二 使用 2.1 colors 默认情况下，渐变色的方向是从上向下的 2.2 start / end 你想渐变色从左向右，或者斜角渐变，就需要设置下了 eg1:斜角渐变 eg2: https://www.cnblogs.com/qiqi715/p/10236596.html")

```javascript 
<LinearGradient 
  start={{x:0.25,y:0.25}}
  end={{x:0.75,y:0.75}} 
  colors={['red','green','black']} 
  style={{height:150,flex:1}}
> 

</LinearGradient>
```


[react-native-linear-gradient颜色渐变](https://www.cnblogs.com/qiqi715/p/10236596.html "react-native-linear-gradient颜色渐变")

默认从上到下：

## 1.locations

假如想指定每种渐变颜色的范围，比如红色占20%， 绿色占70%，黑色占10%，也是可以设置的，就用到了另外一个属性了 locations

```javascript 
 locations 对应的是 colors 
locations={[0.2,0.7,1.0]} 
colors={['red', 'green', 'black']}  
red 范围就是 0.0 - 0.2 
green 范围就是 0.2 - 0.7
black 范围就是 0.7 - 1.0
```


## 2.从左到右

从左到右的渐变就可以设置出来了

```javascript 
 start={{x: 0, y: 0}}  
end={{x: 1, y: 0}}
```


## 3:斜角渐变

```javascript 
 start: { x: 0.3, y: 0.4 }   渐变是从 左侧30%， 上部 40% 开始 
end: { x: 0.7, y: 0.8 }  渐变是从 左侧70%， 上部 80% 结束
```


# shadow 阴影

RN提供了

[阴影样式属性](https://reactnative.cn/docs/shadow-props/ "阴影样式属性")

，但其仅支持ios平台，在Android中需要使用elevation属性实现，但

[elevation](https://reactnative.cn/docs/view-style-props/#elevation "elevation")

仅提供一个灰色阴影，视觉效果不好。

#### react-native-shadow

[react-native-shadow](https://www.npmjs.com/package/react-native-shadow "react-native-shadow")

插件是广为使用的一种阴影插件，ios于Android均兼容。但该插件需要原生支持，如果项目为非原生，则无法使用该方法。

#### react-native-shadow-cards

[react-native-shadow-cards](https://www.npmjs.com/package/react-native-shadow-cards "react-native-shadow-cards")

实现了一个阴影框，ios与Android均兼容。其不需要原生支持，可实现一般效果的阴影，可满足通常阴影需求。

[React Native阴影框效果实现 RN自带阴影 RN提供了阴影样式属性，但其仅支持ios平台，在Android中需要使用elevation属性实现，但elevation仅提供一个灰色阴影，视觉效果不好。 re... https://www.jianshu.com/p/bd9de0e14951](https://www.jianshu.com/p/bd9de0e14951 "React Native阴影框效果实现 RN自带阴影 RN提供了阴影样式属性，但其仅支持ios平台，在Android中需要使用elevation属性实现，但elevation仅提供一个灰色阴影，视觉效果不好。 re... https://www.jianshu.com/p/bd9de0e14951")

[https://www.npmjs.com/package/react-native-shadow-cards](https://www.npmjs.com/package/react-native-shadow-cards "https://www.npmjs.com/package/react-native-shadow-cards")

   github

import {Card} from 'react-native-shadow-cards';&#x20;

#### Card:

| **Property**    | **Type** | **Default** | **Description**                                                                    |
| --------------- | -------- | ----------- | ---------------------------------------------------------------------------------- |
| backgroundColor | string   | '#ffffff'   | card background color                                                              |
| elevation       | number   | 3           | An attribute to set the elevation of the card, increases 'drop-shadow' of the card |
| cornerRadius    | number   | 5           | Set the radius of the card                                                         |
| opacity         | number   | 0.5         | Set the opacity of the card                                                        |

但是这个只能是黑色，没有其他颜色了

overflow:hidden 会影响阴影的展示

# 表格：

react-native-table-component

[react-native-table-component/readme\_zh.md at master · Gil2015/react-native-table-component 🌱Build table for react native. Contribute to Gil2015/react-native-table-component development by creating an account on GitHub. https://github.com/Gil2015/react-native-table-component/blob/master/readme\_zh.md](https://github.com/Gil2015/react-native-table-component/blob/master/readme_zh.md "react-native-table-component/readme_zh.md at master · Gil2015/react-native-table-component 🌱Build table for react native. Contribute to Gil2015/react-native-table-component development by creating an account on GitHub. https://github.com/Gil2015/react-native-table-component/blob/master/readme_zh.md")

# SingleCell

```javascript 
 SingleCell
/**
 * @flow
 */

import type {Element} from 'react'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import styleSheet, {contentColor, lightAssistColor, titleColor} from '../utils/styleSheet'
import LineSpace from './LineSpace'
import Icon from './Icon'
import type {Callback} from '../types/langType'
import withNotingRender from '../base/hoc/withNotingRender'
import Tip from './Tip'
import {chooseForApp} from 'react-common/const/api-host'

const styles = styleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 49,
    },
    mainViewStyle: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    titleStyle: {
        fontSize: 15,
        color: titleColor,
    },
    contentStyle: {
        fontSize: 15,
        color: contentColor,
        flex: 1,
        paddingHorizontal: 5,
    },
    tipViewStyle: {
        alignSelf: 'flex-end',
    },
})

function SingleCell(props: {
    style?: any,
    title?: string,
    titleStyle?: any,
    leftEl?: Element<*>,
    rightEl?: Element<*>,
    hiddenRightEl?: boolean,
    content?: string,
    contentEl?: Element<*>,
    contentStyle?: any,
    lineLeftMargin?: number,
    hiddenLine?: boolean,
    onPress?: ?Callback,
    lineRightMargin?: number,
    showTipText?: boolean,
    tipText?: string,
    hasError?: boolean,
    mainViewStyle?: any,
    onLongPress?: Callback,
  tipViewStyle?:any,
}) {
    const {
        style,
        title,
        titleStyle,
        leftEl,
        rightEl = <Icon size={20} suite="Entypo" name="chevron-thin-right" color={lightAssistColor} />,
        hiddenRightEl = false,
        content,
        contentEl,
        contentStyle,
        lineLeftMargin = 10,
        lineRightMargin = 10,
        hiddenLine = false,
        onPress,
        showTipText = false,
        tipText,
        hasError = false,
        mainViewStyle,
        onLongPress,
        tipViewStyle={}
    } = props
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.2 : 1}
            style={[styles.container, showTipText ? { height: null } : null, style]}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View
                style={[
                    styles.mainViewStyle,
                    {
                        paddingHorizontal: chooseForApp({
                          yz: 15,
                          kdy: 10,
                          wzg: 15,
                        }),
                    },
                    mainViewStyle,
                ]}>
                {leftEl && React.Children.map(leftEl, (child: *) => child)}
                <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
                {content !== null && typeof content !== 'undefined' ? (
                    <Text style={[styles.contentStyle, contentStyle]}>{content}</Text>
                ) : null}
                {contentEl}
                {rightEl && !hiddenRightEl && React.Children.map(rightEl, (child: *) => child)}
            </View>
            {hiddenLine ? null : <LineSpace bottom={0} left={lineLeftMargin} right={lineRightMargin} />}
            {showTipText && (
                <View style={[styles.tipViewStyle,tipViewStyle]}>
                    <Tip tipMsg={tipText || ''} type={hasError ? 'error' : 'normal'} />
                </View>
            )}
        </TouchableOpacity>
    )
}

export default withNotingRender(SingleCell)
```


# 多选地址页面

```javascript 
 /* @flow */

import React, { Component,PureComponent } from 'react'
import { Text, View ,Image,SectionList} from 'react-native'
import { compose } from 'redux'
import NavBar from 'react-common/components/NavBar'
import BackButton from 'react-common/components/BackButton'
import styleSheet, { defaultBackgroundColor, getThemeColor, lightAssistColor } from 'react-common/utils/styleSheet'
import type { Callback } from 'react-common/types/langType'
import { pop, pushRoute } from 'react-common/actions/routes'
import { withRedux } from 'modern/components/NavWrapper'
import extendLiftCycle from 'react-common/base/hoc/extendLifeCycle'
import _ from 'lodash'
import FullWidthButton from "react-common/components/FullWidthButton";
import { groupCity } from 'react-common/utils/city.min'
import AreaItem  from './components/AreaItem'
import ModalAlertView from "react-common/components/ModalAlertView";
interface ISProps {
  pushTo: Callback,
  popTo:Callback,
  comfirmCallback?:Callback,
  initData?:any
}

interface ISState {
  searchValue:string,
  isConfirmReSet:boolean,
}

class MutipleSelectAreaPage extends PureComponent<ISProps,ISState> {
  public hasChoised:any={}
  constructor(props: ISProps) {
    super(props)
    this.state = {
      searchValue:'',
      reFreshSeconlist:true,
      isConfirmReSet:false
    }
    this.init()
  }
  public init=()=>{
    this.hasChoised = this.props.initData || {}
  }
  public changeSearchValue= (value: string) => {
    this.setState({ searchValue:value})
  }
  public componentDidMount = ()=>{
    //
  }
  public reSet = ()=>{
    this.hasChoised = {}
    this.setState({reFreshSeconlist:false},()=>{
      this.setState({reFreshSeconlist:true})
    })
  }
  public getChoise = ()=>this.hasChoised
  public save = ()=>{
      const {comfirmCallback=_.noop,popTo} = this.props
      comfirmCallback(this.getChoise())
      popTo()
  }
  public renderBtnFooter = ()=>{
    return <View style={styles.bottomView}>
      <FullWidthButton
        title={`重置`}
        style={styles.btnStyle}
        onPress={this.hideConfirmReSet}
        titleStyle={{fontSize:15}}
      />
      <FullWidthButton
        title={`保存`}
        style={styles.btnStyle}
        onPress={this.save}
        titleStyle={{fontSize:15}}
      />
    </View>
  }
  public renderHeader = ({ section: { title } }:any) => (
    <Text style={styles.header}>{title}</Text>
  )
  public setSelect = (isSelect:string,select:string,itemChoise:string[])=>{
    if(_.isEmpty(itemChoise)){
      _.unset(this.hasChoised,[isSelect,select])
      if(_.isEmpty(this.hasChoised[isSelect])){
        _.unset(this.hasChoised,isSelect)
      }
      return
    }
    if(this.hasChoised[isSelect]){
      this.hasChoised[isSelect][select] = itemChoise
    }else{
      this.hasChoised[isSelect] = {[select]:itemChoise}
    }
  }
  public getKey = (item:any, index:any) =>index
  public renderItem = ({ item }:any) => <AreaItem
    data={item}
    setSelect={this.setSelect}
    selected={this.hasChoised}
    currentFloor={'1'}
  />
  public hideConfirmReSet =()=>{
    this.setState(state=>{
      return {
        isConfirmReSet:!state.isConfirmReSet
      }
    })
  }
  public confirmReSet = ()=>{
    this.reSet()
    this.hideConfirmReSet()
  }
  public render() {
    const {reFreshSeconlist,isConfirmReSet} = this.state
    return (
      <View style={styles.container}>
        <NavBar
          title="选择区域"
          left={<BackButton/>}
        />
        {
          reFreshSeconlist?
          <SectionList
            style={{flex:1}}
            sections={groupCity}
            keyExtractor={this.getKey}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderHeader}
          />
          :null
        }
        <ModalAlertView
          visible={isConfirmReSet}
          onCancel={this.hideConfirmReSet}
          content={`是否重置所选区域？`}
          title={'温馨提示'}
          hiddenLine={true}
          button={[{
            text: '取消', onPress: this.hideConfirmReSet,textStyle:{color:'#696969'}
          }, {
            text: '确认重置',
            onPress: this.confirmReSet,textStyle:{color:'#696969'}
          }]}
        />
        {this.renderBtnFooter()}
      </View>
    )
  }
}

const styles = styleSheet.create({
  header:{
    height:30,
    backgroundColor:'#f2f2f2',
    lineHeight:30,
    paddingLeft: 15,
    fontSize:16,
  },
  filterImage: {width: 18, resizeMode: 'contain'},
  bottomView:{
    justifyContent: 'space-around',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal: 10,
    paddingBottom:20,
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    backgroundColor: defaultBackgroundColor,
  },
  headerView:{
    height: 50,
    paddingHorizontal:20,
    paddingVertical:5,
  },
  searchContent:{
    height: 40,backgroundColor:'white',textAlign:'left',borderRadius:4,
    flex:1,
  },
  searchView:{
    height: 40,
    paddingHorizontal:10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingLeft: 8,
  },
  btnStyle: {
    flex:1,
    height: 50,
    alignSelf:'center',
    marginHorizontal:10,
  },
})
function mapProps(props:any) {
  return {

  }
}

function mapAction(dispatch:Callback) {
  return {
    popTo: compose(dispatch, pop),
    pushTo: compose(dispatch, pushRoute),
  }
}

export default withRedux(mapProps, mapAction)(extendLiftCycle(MutipleSelectAreaPage))

```


[city.min的副本.js](city.min的副本_5B_q8jr80l.js "city.min的副本.js")

```javascript 
 //AreaItem
/* @flow */

import React, { Component,PureComponent ,Fragment} from 'react'
import {Text, View ,TouchableOpacity,} from 'react-native'
import styleSheet, { defaultBackgroundColor, getThemeColor, lightAssistColor } from 'react-common/utils/styleSheet'
import type { Callback } from 'react-common/types/langType'
import _ from 'lodash'
import LineSpace from "react-common/components/LineSpace";
interface ISProps {
  data:any,
  isSelect?:string,
  setSelect:Callback,
  style:any,
  selected:any,
  currentFloor?:string,
  provinceCount?:Callback,
}

interface ISState {
  dataArr:any,
  select:string,
  logicOpen:boolean,
  itemChoise:string[]
}
class AreaItem extends PureComponent<ISProps,ISState> {
  public textRef:any
  constructor(props: ISProps) {
    super(props)
    const {data = {},isSelect,selected} = props
    this.state = {
      dataArr:{},
      select:'',
      logicOpen:false,
      itemChoise:[],
      countyNum:'',
      provinceNum:''
    }
    if (_.isPlainObject(data)) {
      const [title, list]: any = Object.entries(data)[0]
      const choiseArr = selected?.[isSelect]?.[title]
      this.state.dataArr = {title, list}
      this.state.itemChoise = isSelect?choiseArr || [] :[]
      this.state.countyNum = isSelect?choiseArr?.length || '':''
    }
  }

  public componentDidMount() {
    this.getProvince()
  }
  public spread = ()=>{
    const { selected ,isSelect} = this.props
    const { dataArr,} = this.state
    const {title} = dataArr
    this.setState(state=>{
      const select = state.select?'':state.dataArr.title
      return {
        select,
        logicOpen:state.logicOpen?false:true,
      }
    })
  }
  public choised = (item:string)=>{
    const { isSelect,setSelect,provinceCount=_.noop } = this.props
    const { select,dataArr } = this.state
    const {title,list} = dataArr
    this.setState(state=>{
      if(item === '全部') {
        const arr: string[] = _.isEmpty(state.itemChoise) ? _.cloneDeep(list) : []
        return {
          itemChoise: arr,
          countyNum:arr.length === 0?'':arr.length
        }
      }else{
        const choiseArr = _.cloneDeep(state.itemChoise)
        const index = choiseArr.findIndex(value=>value===item)

        if(index < 0){
          choiseArr.push(item)
        }else{
          choiseArr.splice(index,1)
        }
        return {
          itemChoise:choiseArr,
          countyNum:choiseArr.length === 0 ?'':choiseArr.length
        }
      }
    },()=>{
      setSelect(isSelect,select,this.state.itemChoise)
      provinceCount()
    })
  }
  public renderLastBox = (list:any[])=>{
    const {itemChoise} = this.state
      return (
        <View style={styles.renderView}>
          <TouchableOpacity  style={[styles.itemView,itemChoise.length=== list.length?styles.currentStyle:null]} onPress={()=>this.choised('全部')} >
            <Text style={styles.itemDesc}>全部</Text>
          </TouchableOpacity>
          {
            _.map(list,(item:string)=>{
              return <TouchableOpacity key={item} style={[styles.itemView,itemChoise.includes(item)?styles.currentStyle:null]} onPress={()=>this.choised(item)} >
                <Text style={styles.itemDesc}>{item}</Text>
              </TouchableOpacity>
            })
          }
        </View>
      )
  }
  public setMidlleWare = (one:string,two:string,three:any[])=>{
    const { setSelect,} = this.props
    setSelect(one,two,three)
  }
  public getProvince = ()=>{
    const { dataArr} = this.state
    const { selected } = this.props
    const {title=''} = dataArr
    const county = selected?.[title]
    this.setState(state=>{
      const num = (!county || _.isEmpty(county))?'':Object.values(county).flat(1).length
      return {
        provinceNum:num
      }
    })
  }
  public render() {
    const { dataArr,select,logicOpen,countyNum,provinceNum} = this.state
    const {title='',list=[]} = dataArr
    const { isSelect,style={},selected,currentFloor} = this.props
    const isCurrent = isSelect && select
    const  isFold = _.isEmpty(select) && !logicOpen
    return (
      <Fragment>
        <TouchableOpacity style={[styles.container,style,isSelect?{paddingLeft:20}:null]} onPress={this.spread}>
          <Text style={isCurrent?[styles.currentTitle,{color:getThemeColor()}]:null}>
            {isCurrent?<Text style={styles.currentSubTitle}>{isSelect}   </Text>:''}
            {title}
            <Text style={[styles.currentTitle,{color:getThemeColor()}]}>
              {currentFloor === '1'?provinceNum?`    +${provinceNum}`:'':countyNum?`   +${countyNum}`:''}
            </Text>
          </Text>
          <LineSpace bottom={0} left={isSelect?20:0} right={0} />
        </TouchableOpacity>
        {
          isFold?null:
          _.isPlainObject(list[0])?
            _.map(list,(item:any,index:number)=>{
              return  <AreaItem
                        data={item}
                        key={index}
                        isSelect={select}
                        setSelect={this.setMidlleWare}
                        selected={selected}
                        currentFloor={'2'}
                        provinceCount={this.getProvince}
                    />
            }):
              this.renderLastBox(list)
        }
      </Fragment>
    )
  }
}

const styles = styleSheet.create({
  currentSubTitle:{
    fontSize: 14,paddingRight:10
  },
  currentTitle:{
    fontSize: 16
  },
  renderView:{
    flexDirection:'row',
    flexWrap:'wrap',
    paddingBottom:10,
    paddingTop:15,
    backgroundColor:'white',
    marginBottom: 5,
    paddingLeft: 5,
  },
  itemDesc:{
    color:'#666',fontSize:14
  },
  itemView:{
    width:98,height:30,
    borderRadius:4,
    borderWidth:0.5,
    borderColor:'#e6e6e6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal:10,
    marginBottom:10,
  },
  currentStyle:{
    backgroundColor:'#31b916',
    color:'white',
  },
  container: {
    minHeight:40,
    backgroundColor: 'white',
    justifyContent:'center',
    paddingLeft:15,
  },
})


export default AreaItem

```

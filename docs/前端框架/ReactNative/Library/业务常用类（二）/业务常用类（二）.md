# 业务常用类（二）

## 目录

- [tab-view](#tab-view)
  - [props and Methods](#props-and-Methods)
    - [renderTabBar](#renderTabBar)
    - [tabBarPosition(String，默认值’top’) ](#tabBarPositionString默认值top)
    - [onChangeTab(Function) ](#onChangeTabFunction)
    - [onScroll(Function) ](#onScrollFunction)
    - [ locked(Bool，默认为false) ](#lockedBool默认为false)
    - [initialPage(Integer) ](#initialPageInteger)
    - [page(Integer) ](#pageInteger)
    - [children(ReactComponents) ](#childrenReactComponents)
    - [tabBarUnderlineStyle(style) ](#tabBarUnderlineStylestyle)
    - [tabBarBackgroundColor(String) ](#tabBarBackgroundColorString)
    - [tabBarActiveTextColor(String) ](#tabBarActiveTextColorString)
    - [tabBarInactiveTextColor(String) ](#tabBarInactiveTextColorString)
    - [contentProps(Object) ](#contentPropsObject)
    - [scrollWithoutAnimation(Bool，默认为false) ](#scrollWithoutAnimationBool默认为false)
    - [tabBarTextStyle](#tabBarTextStyle)
    - [tabBarInactiveTextColor](#tabBarInactiveTextColor)
  - [实战案例：](#实战案例)
    - [tabBar的下滑线样式：](#tabBar的下滑线样式)
    - [常见用法](#常见用法)
- [页面左右切换](#页面左右切换)
- [分页列表](#分页列表)

# tab-view

react-native-scrollable-tab-view

顶部的tab-view 切换

[React Native之react-native-scrollable-tab-view详解\_大灰狼的小绵羊哥哥的博客-CSDN博客\_react-native-scrollable-tab-view 转载：https://blog.csdn.net/xiangzhihong8/article/details/72730951?ref=myread在React Native开发中，官方为我们提供的Tab控制器有两种：TabBarIOS和ViewPagerAndroid。TabBarIOS，仅适用于IOS平台 ViewPagerAndroid，仅适用于Android平台（严格来讲并不算，因为... https://blog.csdn.net/sinat\_17775997/article/details/81069260](https://blog.csdn.net/sinat_17775997/article/details/81069260 "React Native之react-native-scrollable-tab-view详解_大灰狼的小绵羊哥哥的博客-CSDN博客_react-native-scrollable-tab-view 转载：https://blog.csdn.net/xiangzhihong8/article/details/72730951?ref=myread在React Native开发中，官方为我们提供的Tab控制器有两种：TabBarIOS和ViewPagerAndroid。TabBarIOS，仅适用于IOS平台 ViewPagerAndroid，仅适用于Android平台（严格来讲并不算，因为... https://blog.csdn.net/sinat_17775997/article/details/81069260")

github地址

[GitHub - ptomasroos/react-native-scrollable-tab-view: Tabbed navigation that you can swipe between, each tab can have  its own ScrollView and maintain its own scroll position between swipes. Pleasantly animated. Customizable tab bar Tabbed navigation that you can swipe between, each tab can have  its own ScrollView and maintain its own scroll position between swipes. Pleasantly animated. Customizable tab bar - GitHub - ptomasr... https://github.com/ptomasroos/react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view "GitHub - ptomasroos/react-native-scrollable-tab-view: Tabbed navigation that you can swipe between, each tab can have  its own ScrollView and maintain its own scroll position between swipes. Pleasantly animated. Customizable tab bar Tabbed navigation that you can swipe between, each tab can have  its own ScrollView and maintain its own scroll position between swipes. Pleasantly animated. Customizable tab bar - GitHub - ptomasr... https://github.com/ptomasroos/react-native-scrollable-tab-view")

import   ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from  'react-native-scrollable-tab-view'；

## props and Methods

### renderTabBar

- DefaultTabBar：Tab会平分在水平方向的空间。 
- ScrollableTabBar：Tab可以超过屏幕范围，滚动可以显示。

### tabBarPosition(String，默认值’top’) 

top：位于屏幕顶部 

bottom：位于屏幕底部 

overlayTop：位于屏幕顶部，悬浮在内容视图之上（看颜色区分：视图有颜色，Tab栏没有颜色） 

overlayBottom：位于屏幕底部，悬浮在内容视图之上（看颜色区分：视图有颜色，Tab栏没有颜色）

### onChangeTab(Function) 

Tab切换之后会触发此方法，包含一个参数（Object类型），这个对象有两个参数: 

i：被选中的Tab的下标（从0开始） 

ref：被选中的Tab对象（基本用不到

### onScroll(Function) 

视图正在滑动的时候触发此方法，包含一个Float类型的数字，范围是\[0, tab的数量-1]

###  locked(Bool，默认为false) 

表示手指是否能拖动视图，默认为false（表示可以拖动）。设为true的话，我们只能“点击”Tab来切换视图。

### initialPage(Integer) 

初始化时被选中的Tab下标，默认是0（即第一页）。

### page(Integer) 

设置选中指定的Tab。

### children(ReactComponents) 

表示所有子视图的数组，比如下面的代码，children则是一个长度为6的数组，元素类型为Text。

### tabBarUnderlineStyle(style) 

设置DefaultTabBar和ScrollableTabBarTab选中时下方横线的颜 色。

### tabBarBackgroundColor(String) 

设置整个Tab这一栏的背景颜色 

### tabBarActiveTextColor(String) 

设置选中Tab的文字颜色

### tabBarInactiveTextColor(String) 

设置未选中Tab的文字颜色

### contentProps(Object) 

这里要稍微说下react-native-scrollable-tab-view的实现，其实在Android平台底层用的是ViewPagerAndroid，iOS平台用的是ScrollView。这个属性的意义是：比如我们设置了某个属性，最后这个属性会被应用在ScrollView/ViewPagerAndroid，这样会覆盖库里面默认的，通常官方不建议我们去使用。 

### scrollWithoutAnimation(Bool，默认为false) 

设置“点击”Tab时，视图切换是否有动画，默认为false（即：有动画效果）

### tabBarTextStyle

标签栏的文本的附加样式。例如:{fontFamily: 'Roboto'， fontSize: 15}

### tabBarInactiveTextColor

 不活动时，标签栏的默认文本颜色，默认为黑色

## 实战案例：

### tabBar的下滑线样式：

[https://github.com/ptomasroos/react-native-scrollable-tab-view/blob/master/ScrollableTabBar.js](https://github.com/ptomasroos/react-native-scrollable-tab-view/blob/master/ScrollableTabBar.js "https://github.com/ptomasroos/react-native-scrollable-tab-view/blob/master/ScrollableTabBar.js")

  源码

业务到最后提升技术多看看源码;

- props 里面有个tabStyle 作用于 ScrollableTabBar 里；可以修改样式，
- 还有你心心念念的 随着手势走的下划线样式
- 居然用的scrollView的横向滚动，自带的手势系统，居然没有集成手势系统，你怕不怕；

### 常见用法

```javascript 
 import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native'
import _ from 'lodash'
import {withRedux} from "modern/components/NavWrapper";
import { compose } from 'redux'
import StyleSheet, {darkAssistColor, defaultBackgroundColor, getThemeColor} from 'react-common/utils/styleSheet'
import { pop,pushRoute } from 'react-common/actions/routes'
import BackButton from 'react-common/components/BackButton'
import PageContainer from 'react-common/components/PageContainer'
import type { Callback } from 'react-common/types/langType'
import extendLiftCycle from 'react-common/base/hoc/extendLifeCycle'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import Button from "react-common/components/Button";
import {getScreenWidth} from "react-common/const/ui-common";
import SendTash from './components/SendTask'
import ModalSheet from "react-common/components/ModalSheet";
import Icon from "react-common/components/Icon";
interface ISPropsType {
  popTo:Callback,
  pushTo:Callback,
}
interface ISStateType {
  list:any[],
  openMenu:boolean,
  selectTabType:'hasAppointment'|'inTheDelivery'|'haveToTake'|'cancelled'
}

const itemWidth = getScreenWidth() / 4
class SendTheTaskPage extends React.PureComponent<ISPropsType,ISStateType>{
  public selectMenu:any[] =[
    {
      type:'hasAppointment',
      name:'已预约'
    },
    {
      type:'inTheDelivery',
      name:'派送中'
    },
    {
      type:'haveToTake',
      name:'已取件'
    },
    {
      type:'cancelled',
      name:'已取消'
    },
  ]
  public menuList :string[] = ['重新通知']
  constructor(props:ISPropsType){
    super(props)
    this.state = {
      list:[],
      openMenu:false,
      selectTabType:'hasAppointment'
    }
  }
  public componentDidMount(){
    this.fetchNextData()
  }
  public fetchNextData = async () => {
    //
  }
  public siteManagement = ()=>{
    //

  }
  public renderEmpty = ()=>{
    return (
      <View style={styles.placeholderView}>
        <Image source={require('react-common/components/images/global_kong.png')} />
        <Text style={styles.placeholderText}>暂无设备</Text>
      </View>
    )
  }
  private _renderTabBar = () => (
    <DefaultTabBar
      style={{ height: 45 }}
      backgroundColor={'white'}
      // @ts-ignore
      underlineStyle={[
        styles.underLineStyle,
        {
          backgroundColor: getThemeColor(),
        },
      ]}
      renderTab={this._renderTab}
    />
  )
  private _renderTab = (name: string, page: any, isTabActive: boolean, onPressHandler: Callback) => {
    const textColor = isTabActive ? getThemeColor() : '#aaaaaa'
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return (
      <Button style={{ flex: 1 }} key={name} onPress={() => onPressHandler(page)}>
        <View style={styles.tabStyle}>
          <Text
            style={[
              {
                color: textColor,
                fontWeight,
                fontSize: 14,
                marginLeft: 14,
              },
            ]}>
            {name}
          </Text>
          <View style={styles.tabAlertView} />
        </View>
      </Button>
    )
  }
  public tabOnPress = (index:number)=>{
    this.setState({selectTabType:this.selectMenu[index].type})
  }
  public addGoods = ()=>{

  }
  public renderRight = ()=>{
    const { selectTabType } = this.state
    let node = null
    switch (selectTabType) {
      case 'hasAppointment':{
        node = <TouchableOpacity
          style={{ paddingHorizontal: 15 }}
          onPress={this.addGoods}
        >
          <Text style={styles.rightText}>投件</Text>
        </TouchableOpacity>
        break;
      }
      case 'inTheDelivery':{
        node =<TouchableOpacity
          style={{ paddingHorizontal: 15 }}
          onPress={this.toggleMenu}
        >
          <Icon
            size={30}
            suite="Ionicons"
            name="ellipsis-horizontal"
          />
        </TouchableOpacity>
        break;
      }
      default:{
        node =null
      }
    }
    return node
  }
  public toggleMenu=()=>{
    this.setState((state)=>({
      openMenu:!state.openMenu,
    }))
  }
  public onRightMenuTouchedItemIndex = (index:number)=>{
    if(index === 0){
      this.toggleMenu()
    }
  }
  public render(){
    const {  list,selectTabType ,openMenu} = this.state
    const isEmpty = _.isEmpty(list)
    return (
      <PageContainer
        title={'送货上门'}
        left={<BackButton />}
        right={this.renderRight()}
      >
        <ScrollableTabView
          renderTabBar={this._renderTabBar}
          style={styles.scrollTabView}
          locked={true}
          onChangeTab={({ i, from }) => i !== from && this.tabOnPress(i)}
        >
          {
            this.selectMenu.map(item=>{
              return <SendTash
                      // @ts-ignore
                      tabLabel={item.name}
                      key={item.type}
                    />
            })
          }


        </ScrollableTabView>
        <ModalSheet
          visible={openMenu}
          onCancel={this.toggleMenu}
          onTouchedItemIndex={this.onRightMenuTouchedItemIndex}
          titles={this.menuList}
          position="right"
        />
      </PageContainer>
    )
  }
}
const styles = StyleSheet.create({
  rightText:{
    color:'white',fontSize:15
  },
  scrollTabView: {
    backgroundColor: 'white',
  },
  tabAlertView: {
    height: 20,
    width: 14,
    alignItems: 'center',
  },
  tabStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleStyle:{
    color:'#666'
  },
  placeholderView:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: -10,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText:{
    fontSize:20,
    color:darkAssistColor,
    marginTop:10
  },
  cellContentStyle:{
    textAlign:'left',
    color:'#333',
    fontSize:15,
    paddingLeft:30,
  },
  underLineStyle: {
    height: 1.5,
    width: 35,
    marginLeft: (itemWidth - 35) / 2,
  },
})

function mapAction(dispatch:any){
  return {
    popTo: compose(dispatch, pop),
    pushTo: compose(dispatch, pushRoute),
  }
}
export default withRedux(null,mapAction )(extendLiftCycle(SendTheTaskPage))

```


# **页面左右切换**

```javascript 
 this.scrollView.scrollTo({
      x: getScreenWidth() * index,
      y: 0,
      animated: true,
    })

<ScrollView
          ref={el => {
            this.scrollView = el
          }}
          style={styles.contentView}
          keyboardShouldPersistTaps="handled"
          horizontal
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          pagingEnabled
          scrollEnabled={false}
          contentContainerStyle={{
            width: getScreenWidth() * 2,
          }}
        >
          
        </ScrollView>

// data 
[
  {
    "name": "浙江省",
    "id": 1,
    "list": [
      {
        "name": "杭州市",
        "id": 100,
        "list": [
          {
            "name": "上城区",
            "id": 1101
          },
          {
            "name": "下城区",
            "id": 1102
          },
          {
            "name": "江干区",
            "id": 1103
          },
          {
            "name": "西湖区",
            "id": 1104
          },
          {
            "name": "滨江区",
            "id": 1105
          }
        ]
      },
      {
        "name": "湖州",
        "id": 200,
        "list": [
          {
            "name": "吴兴区",
            "id": 1201
          },
          {
            "name": "南浔区",
            "id": 1202
          },
          {
            "name": "德清县",
            "id": 1203
          },
          {
            "name": "安吉县",
            "id": 1204
          }
        ]
      },
      {
        "name": "嘉兴",
        "id": 300,
        "list": [
          {
            "name": "南湖区",
            "id": 1301
          },
          {
            "name": "秀洲区",
            "id": 1302
          },
          {
            "name": "海宁市",
            "id": 1303
          },
          {
            "name": "桐乡市",
            "id": 1304
          }
        ]
      }
    ]
  },
  {
    "name": "广东省",
    "id": 2,
    "list": [
      {
        "name": "广州",
        "id": 100,
        "list": [
          {
            "name": "天河区",
            "id": 2001
          },
          {
            "name": "白云区",
            "id": 2002
          },
          {
            "name": "海珠区",
            "id": 2003
          },
          {
            "name": "越秀区",
            "id": 2004
          }
        ]
      },
      {"name": "潮州", "id": 300, "list": [{"name": "潮安县"}]},
      {
        "name": "深圳",
        "id": 200,
        "list": [
          {
            "name": "福田区",
            "id": 2101
          },
          {
            "name": "罗湖区",
            "id": 2102
          },
          {
            "name": "南山区",
            "id": 2103
          },
          {
            "name": "宝安区",
            "id": 2104
          },
          {
            "name": "龙岗区",
            "id": 2105
          }
        ]
      },
      {"name": "东莞", "id": 400, "list": []},
      {"name": "佛山", "id": 400, "list": []}
    ]
  },
  {"name": "贵州省"},

  {
    "name": "河北省",
    "id": 3,
    "list": [
      {
        "name": "石家庄",
        "id": 300,
        "list": [
          {
            "name": "长安区",
            "id": 3001
          },
          {
            "name": "桥东区",
            "id": 3002
          },
          {
            "name": "桥西区",
            "id": 3003
          },
          {
            "name": "新华区",
            "id": 3004
          },
          {
            "name": "裕华区",
            "id": 3005
          },
          {
            "name": "高新区",
            "id": 3006
          }
        ]
      }
    ]
  }
]
```


# 分页列表

坑：

[https://www.jianshu.com/p/3203f413a887](https://www.jianshu.com/p/3203f413a887 "https://www.jianshu.com/p/3203f413a887")

```javascript 
 /**
 * @flow
 */

import React, { Component, Element } from 'react'
import { FlatList } from 'react-native'
import styleSheet from '../utils/styleSheet'
import { LoadMoreFooterView } from './PullRefresh'
import type { Func } from '../types/langType'

const styles = styleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})

type RefreshableListViewState = {
  dataSource: any,
  isRefreshing: boolean,
  isFooterLoading: boolean,
  containerHeight: number,
  contentHeight: number,
  hasLayout:boolean
}

type RefreshableListViewProps = {
  fetchNextData: Func<string, any>,
  resolve: boolean,
  page: string,
  renderRow: (args: Object) => Element<*>,
  dataSource: Array<any>,
  style?: any,
  hideResolvedTitle?: boolean,
  disablePullToRefresh?: boolean,
  getRef?: any,
}


class RefreshableFlatListView extends Component {

  // 构造
  constructor(props: Object) {
    super(props)

    this.state = {
      dataSource: props.dataSource,
      isRefreshing: false,
      isFooterLoading: false,
      containerHeight: 200,
      contentHeight: 0,
      hasLayout:false,
    }
  }

  state: RefreshableListViewState
  prePage: string

  componentWillReceiveProps(nextProps: Object) {
    const { dataSource } = nextProps
    if (this.props.dataSource !== dataSource) {
      this.setState({
        dataSource,
      })
    }
  }

  getDataList = async (page?: string) => {
    const { fetchNextData } = this.props
    const requestPage = page || '1'
    if (fetchNextData) {
      await fetchNextData(requestPage)
      this.setState({
        isRefreshing: false,
        isFooterLoading: false,
      })
    }
  }


  listOnRefresh = () => {
    if (this.props.disablePullToRefresh) return
    this.setState({
      isRefreshing: true,
    })
    this.getDataList()
  }

  listOnEndReached = () => {
    const { page, resolve } = this.props
    const { containerHeight, contentHeight } = this.state
    if (!this.state.isFooterLoading && !resolve && contentHeight > containerHeight) {
      if (page === this.prePage) {
        return
      }
      this.prePage = (parseInt(page, 10) === 1) ? '' : page

      this.setState({
        isFooterLoading: true,
      })
      const pageNum = (parseInt(page, 10) + 1).toString()
      this.getDataList(pageNum)
    }
  }

  handleFootLoadStatus = () => {
    const { isFooterLoading } = this.state
    const { resolve } = this.props
    if (resolve) {
      return 'resolved'
    }

    return isFooterLoading ? 'loading' : 'normal'
  }

  props: RefreshableListViewProps


  renderFooter = () => {
    const { containerHeight, contentHeight } = this.state
    const loadStatus = this.handleFootLoadStatus()
    if(!this.state.hasLayout) return null
    const footer = contentHeight > containerHeight - 5 ? (
      <LoadMoreFooterView
        hideResolvedTitle={this.props.hideResolvedTitle}
        loadStatus={loadStatus}
      />
    ) : null
    return footer
  }

  _onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({
      contentHeight,
    })
  }

  _onLayout = (event: Object) => {
    const {
      nativeEvent: { layout: { height } },
    } = event
    this.setState({
      containerHeight: height,
      hasLayout:true
    })
  }

  render() {
    const { style = {}, renderRow, getRef, ...otherSectionProps } = this.props

    return (
      <FlatList
        ref={getRef}
        style={[styles.container, style]}
        renderItem={renderRow}
        data={this.state.dataSource}
        keyExtractor={(item, index) => `key-${index}`}
        onEndReached={this.listOnEndReached}
        onEndReachedThreshold={0.1}
        refreshing={this.state.isRefreshing}
        onRefresh={
          this.listOnRefresh
        }
        ListFooterComponent={this.renderFooter}
        onContentSizeChange={this._onContentSizeChange}
        onLayout={this._onLayout}
        {...otherSectionProps}
      />
    )
  }
}

export default RefreshableFlatListView
```

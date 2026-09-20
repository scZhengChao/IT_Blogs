# 长列表渲染

## 目录

- [FlatList](#FlatList)
- [RecyclerListView](#RecyclerListView)
  - [安装](#安装)
  - [概述和功能](#概述和功能)
  - [RecyclerListView的使用](#RecyclerListView的使用)
    - [1、dataProvider](#1dataProvider)
    - [2、LayoutProvider](#2LayoutProvider)
    - [3、rowRenderer](#3rowRenderer)
    - [4、onEndReached](#4onEndReached)
    - [5、onEndReachedThreshold](#5onEndReachedThreshold)
    - [6、extendedState](#6extendedState)
    - [7、scrollViewProps](#7scrollViewProps)
    - [RecyclerListView所有属性](#RecyclerListView所有属性)

# **FlatList**

**ScrollView是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。ScrollView 不仅可以垂直滚动，还能水平滚动（通过horizontal属性来设置）**

ScrollView适合用来显示数量不多的滚动元素。放置在ScrollView中的所有组件都会被渲染，哪怕有些组件因为内容太长被挤出了屏幕外。如果你需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的**FlatList组件**。下面我们来看看如何使用**长列表**。

**React Native 提供了几个适用于展示长列表数据的组件，一般而言我们会选用FlatList或是SectionList。**

**列表视图  FlatList**

```纯文本 
 /** 
 * Sample React Native App 
 * https://github.com/facebook/react-native 
 * 
 * @format 
 * @flow strict-local 
 */ 
 
 
 import React,{Component} from 'react'; 
 import { 
   SafeAreaView,   // 安全高度 
   StyleSheet,     //style 列表 
   ScrollView, 
   View, 
   Text, 
   StatusBar,      
   FlatList,         //列表 
   TouchableOpacity,     //点击透明 
   Alert,        // 弹框 
   Dimensions,      // 获取屏幕的宽高 
   RefreshControl,    // 上拉下拉的一个loadding 
   ActivityIndicator, 
   ActivityIndicatorBase, // 菊花loading 
 
 
 } from 'react-native'; 
 
 
 
 
 import { 
   Header, 
   LearnMoreLinks, 
   Colors, 
   DebugInstructions, 
   ReloadInstructions, 
 } from 'react-native/Libraries/NewAppScreen'; 
 
 
 const { width } = Dimensions.get('window'); 
 
 
 import jsondata from './city_list.json' 
 export default class app extends  Component { 
   constructor(props){ 
     super(props) 
     this.state = { 
       dataList:[], 
       isRefresh:false, 
       loadMore:false, 
       loading:true 
     } 
     console.log(1) 
     this.fetchData() 
   } 
   fetchData(){ 
     setTimeout(() => { 
       this.setState({ 
         dataList:jsondata, 
         loading:false 
       }) 
     }, 3000); 
   } 
    
   _renderLoadingView=()=>{ 
     return ( 
       <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'gray',flex:1}}> 
         <ActivityIndicator size='large'></ActivityIndicator> 
       </View> 
     ) 
   } 
 
 
   _renderListView=()=>{ 
     return ( 
       <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}> 
       <FlatList 
         style={{flex:1,backgroundColor:"#fff"}} 
         data={this.state.dataList} 
         renderItem={this._renderItem} 
         // ListEmptyComponent={} //空数据 
         ListHeaderComponent={this._renderListHeader} 
         ListFooterComponent={this._renderListFooter} 
         refreshControl={    
             <RefreshControl 
                 title='loading...' 
                 refreshing={this.state.isRefresh} 
                 colors={['red']}   
                 onRefresh={()=>{ 
                   this.setState({ 
                     isRefresh:true 
                   }) 
                   setTimeout(()=>{ 
                     this.setState({ 
                       isRefresh:false 
                     }) 
                   },2000) 
                 }} 
             /> 
         } 
         onEndReached={()=>{ 
           this.setState({ 
             loadMore:true 
           }) 
           setTimeout(()=>{ 
             this.setState({ 
               loadMore:false 
             }) 
           },2000) 
         }} 
         onEndReachedThreshold={0.1} 
         ItemSeparatorComponent={()=>{ 
           return <View style={{height:1,backgroundColor:'#999999'}}></View> 
         }} 
         keyExtractor={this._keyExtractor} 
       /> 
   </SafeAreaView> 
     ) 
   } 
   _keyExtractor=(item,index)=>{ 
     return 'index'+item+index; 
   } 
   render(){ 
     if(this.state.loading){ 
       return this._renderLoadingView() 
     } 
     return this._renderListView() 
      
   } 
   _renderListHeader=({})=>{ 
     return ( 
       <View style={styles.listHeader}> 
         <Text style={{color:'white'}}>头部布局</Text> 
       </View> 
 
 
 
 
     ) 
   } 
   _renderListFooter=({})=>{ 
     return ( 
       <View style={styles.listFooter}> 
         {this.state.loadMore && <ActivityIndicator/> } 
         <Text style={{color:'gray'}}>{this.state.loadMore?'加载更多':'我是有底线的'}</Text> 
       </View> 
 
 
 
 
     ) 
   } 
   _renderItem=({item})=>{ 
     return ( 
       <TouchableOpacity onPress={()=>{ 
         console.log(item.name) 
         Alert.alert(item.name+'点击了') 
       }}> 
         <Text style={styles.itemStyle}>{item.name}</Text> 
       </TouchableOpacity> 
     ) 
   } 
    
 } 
 
 
 const styles = StyleSheet.create({ 
   itemStyle:{ 
     marginVertical:20, 
     marginLeft:10 
   }, 
   listHeader:{ 
     height:50, 
     width, 
     backgroundColor:'red', 
     justifyContent:'center', 
     alignItems:'center' 
   }, 
   listFooter:{ 
     height:50, 
     width, 
     backgroundColor:'red', 
     justifyContent:'center', 
     alignItems:'center', 
     flexDirection:'row' 
   } 
 }); 

```


**1.FlatList**

```纯文本 
 FlatList组件用于显示一个垂直的滚动列表，其中的元素之间结构近似而仅数据不同。 
     FlatList更适于长列表数据，且元素个数可以增删。和ScrollView不同的是，FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。 
     FlatList组件必须的两个属性是data和renderItem。data是列表的数据源，而renderItem则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。 
     import React, { Component } from 'react'; 
 import { FlatList, StyleSheet, Text, View } from 'react-native'; 
 
 export default class FlatListBasics extends Component { 
   render() { 
     return ( 
       <View style={styles.container}> 
         <FlatList 
           data={[ 
             {key: 'Devin'}, 
             {key: 'Jackson'}, 
             {key: 'James'}, 
             {key: 'Joel'}, 
             {key: 'John'}, 
             {key: 'Jillian'}, 
             {key: 'Jimmy'}, 
             {key: 'Julie'}, 
           ]} 
           renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>} 
         /> 
       </View> 
     ); 
   } 
 } 
 
 const styles = StyleSheet.create({ 
   container: { 
    flex: 1, 
    paddingTop: 22 
   }, 
   item: { 
     padding: 10, 
     fontSize: 18, 
     height: 44, 
   }, 
 })
```


```纯文本 
 如果要渲染的是一组需要分组的数据，也许还带有分组标签的，那么SectionList将是个不错的选择
```


```纯文本 
 import React, { Component } from 'react'; 
 import { SectionList, StyleSheet, Text, View } from 'react-native'; 
 
 
 
 
 export default class SectionListBasics extends Component { 
   render() { 
     return ( 
       <View style={styles.container}> 
         <SectionList 
           sections={[ 
             {title: 'D', data: ['Devin']}, 
             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']}, 
           ]} 
           renderItem={({item}) => <Text style={styles.item}>{item}</Text>} 
           renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>} 
           keyExtractor={(item, index) => index} 
         /> 
       </View> 
     ); 
   } 
 } 
 
 
 
 
 const styles = StyleSheet.create({ 
   container: { 
    flex: 1, 
    paddingTop: 22 
   }, 
   sectionHeader: { 
     paddingTop: 2, 
     paddingLeft: 10, 
     paddingRight: 10, 
     paddingBottom: 2, 
     fontSize: 14, 
     fontWeight: 'bold', 
     backgroundColor: 'rgba(247,247,247,1.0)', 
   }, 
   item: { 
     padding: 10, 
     fontSize: 18, 
     height: 44, 
   }, 
 })
```


# RecyclerListView

### 安装

```javascript 
npm install --save recyclerlistview
或者：
npm install --save recyclerlistview@beta
```


### 概述和功能

RecyclerListView 是一个高性能的列表（listview）组件，同时支持 React Native 和 Web ，并且可用于复杂的列表。RecyclerListView 组件的实现灵感，来自于 Android RecyclerView原生组件及iOS UICollectionView原生组件。

RecyclerListView使用“cell recycling”来重用不再可见的视图来呈现项目，而不是创建新的视图对象。 对象的创建非常昂贵并且带有内存开销，这意味着当您滚动列表时内存占用量不断增加。 从内存中释放不可见的项目是另一种技术，但这会导致创建更多的对象和大量的垃圾收集。 回收是渲染无限列表的最佳方式，不会影响性能或内存效率。

为什么需要RecyclerListView
我们知道，React Native 的其他列表组件如ListView,会一次性创建所有的列表单元格——cell。如果列表数据比较多，则会创建很多的视图对象，而视图对象是非常消耗内存的。所以，ListView组件，对于我们业务中的这种无限列表，基本上是不可以用的。

对于React Native 官方提供的高性能的列表组件FlatList, 在Android设备上的表现，并不是十分友好。它的实现原理，是将列表中不在可视区域内的视图，进行回收，然后根据页面的滚动，不断的渲染出现在可视区域内的视图。这里需要注意的是，**FlatList是将不可见的视图回收，从内存中清除了，下次需要的时候，再重新创建**。这就要求设备在滚动的时候，能快速的创建出需要的视图，才能让列表流畅的展现在用户面前。而问题也就出现在这里，Android设备因为老化等原因，计算力等跟不上，加之React Native 本身 JS 层与 Native 层之间交互的一些问题（这里不做深入追究），导致创建视图的速度达不到使列表流畅滚动的要求。

那怎样来解决这样的问题呢？

RecyclerListView 受到 Android RecyclerView 和 iOS UICollectionView 的启发，进行两方面的优化：

- 仅创建可见区域的视图，这步与FlatList是一致的。
- cell recycling，重用单元格，这个做法是FlatList缺乏的。

&#x20;         对于程序来说，视图对象的创建是非常昂贵的，并且伴随着内存的消耗。意味着如果不断的创建视图，在列表滚动的过程中，内存占用量会不断增加。FlatList中将不可见的视图从内存中移除，这是一个比较好的优化手段，但同时也会导致大量的视图重新创建以及垃圾回收。

RecyclerListView 通过对不可见视图对象进行缓存及重复利用，一方面不会创建大量的视图对象，另一方面也不需要频繁的创建视图对象和垃圾回收。

基于这样的理论，所以RecyclerListView的性能是会优于FlatList的

### RecyclerListView的使用

属性：

#### 1、dataProvider

首先需要定义一个数据驱动方法

```javascript 
let dataProvider = new DataProvider((r1, r2) => {

  return r1 !== r2;

})
//这个数据驱动方法真的是糟糕透了
```


定义完成之后去初始化数据

```javascript 
this.state = {
  dataProvider: dataProvider.cloneWithRows(this._generateArray(300))
};
_generateArray(n) {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
}
```


cloneWithRows

> 想要更新列表的dataProvider数据也就是（DataSource）必须每次通过cloneWithRows这个来重新挂载datasource的值。clone方法会自动提取新数据并进行逐行对比（使用rowHasChanged方法中的策略），这样列表就知道哪些行需要重新渲染了

#### 2、LayoutProvider

定义列表布局

在这之前我们可以根据我们的业务场景，规划处几类的布局，然后自定义每种布局的类型来区分

```javascript 
//表示列表中会出现三种ui类型的item
const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
}

```


下面就可以来区分布局了

为了进行`cell-recycling`,RecyclerListView要求对每个`cell`(通常也叫Item)定义一个`type`，根据`type`设置`cell`的`dim.width`和`dim.height`：

```javascript 
//第一个函数是定义item的ui类型，第二个是定义item的高宽
this._layoutProvider = new LayoutProvider(
    index => {
        if (index % 3 === 0) {
            return ViewTypes.FULL;
        } 
        ...
    },
    (type, dim) => {
        switch (type) {
            case ViewTypes.HALF_LEFT:
                dim.width = width / 2;
                dim.height = 160;
                break;
            ...
        }
    }
)

```


#### 3、rowRenderer

`rowRenderer`负责渲染一个`cell`,同样是根据`type`来进行渲染

```javascript 
_rowRenderer(type, data) {
    switch (type) {
        case ViewTypes.HALF_LEFT:
            return (
                <CellContainer style={styles.containerGridLeft}>
                    <Text>Data: {data}</Text>
                </CellContainer>
            );
        ...
      }
}

```


那么下面我们就来看看具体的一个简单的小栗子：

```javascript 
/***
 * To test out just copy this component and render in you root component
 */
export default class RecycleTestComponent extends React.Component {
    constructor(args) {
        super(args);

        let { width } = Dimensions.get("window");

        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the height and width for that type on given object
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        this._layoutProvider = new LayoutProvider(
            index => {
                if (index % 3 === 0) {
                    return ViewTypes.FULL;
                } else if (index % 3 === 1) {
                    return ViewTypes.HALF_LEFT;
                } else {
                    return ViewTypes.HALF_RIGHT;
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2 - 0.0001;
                        dim.height = 160;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = 160;
                        break;
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 140;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this._generateArray(300))
        };
    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }

    //Given type and data return the view component
    _rowRenderer(type, data) {
        //You can return any view here, CellContainer has no special significance
        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <CellContainer style={styles.containerGridLeft}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.HALF_RIGHT:
                return (
                    <CellContainer style={styles.containerGridRight}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.FULL:
                return (
                    <CellContainer style={styles.container}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            default:
                return null;
        }
    }

    render() {
        return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }
}
const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
};

```


![](./assets/image/image_vwAj4GL3Pl.png)

但是在实际的业务开发中肯定不会是这么简单的，一般都会用到分页，下拉刷新什么的；下面介绍几个比较常用的属性：

#### 4、onEndReached

列表触底是触发，一般是用来做上拉加载更过数据的时候来使用的

```javascript 
<RecyclerListView
    layoutProvider={this._layoutProvider}
    dataProvider={this.dataProvider.cloneWithRows(this.state.infoList)}
    rowRenderer={this._rowRenderer}
    onEndReached={this._onLoadMore}
/>

```


#### 5、onEndReachedThreshold

列表距离底部多大距离时触发onEndReached的回调，这个填写的是具体的像素值，与FlatList是有区别的，FlatList填写的是百分比

```javascript 
<RecyclerListView
    layoutProvider={this._layoutProvider}
    dataProvider={this.dataProvider.cloneWithRows(this.state.infoList)}
    rowRenderer={this._rowRenderer}
    onEndReached={this._onLoadMore}
    onEndReachedThreshold={50}
/>

```


#### 6、extendedState

在更新目前列表渲染以外的数据时，可以使用此属性更新状态，以便绘制出新的列表，并且不再重新渲染以前的列表数据

```javascript 
<RecyclerListView
    layoutProvider={this._layoutProvider}
    dataProvider={this.dataProvider.cloneWithRows(this.state.infoList)}
    rowRenderer={this._rowRenderer}
    onEndReached={this._onLoadMore}
    onEndReachedThreshold={50}
    extendedState={this.state}
/>

```


#### 7、scrollViewProps

继承scrollView的属性，RecyclerListView本身是不具有刷新属性的，要想使用刷新功能，就可以继承scrollView的下拉刷新

```javascript 
<RecyclerListView
    scrollViewProps={{
        refreshControl: (
            <RefreshControl
                refreshing={this.state.loading}
                onRefresh={async () => {
                    this.setState({ loading: true });
                    await this.getInfo();
                    this.setState({ loading: false });
                }}
            />
        )
    }}
/>

```


下面看一下完整的demo

```javascript 
import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, RefreshControl, Alert } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import WBCST from "./../../rn-app";
const ViewTypes = {
    FULL: 0
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
        // borderWidth: 1,
        borderColor: "#dddddd",
        margin: 15,
        marginTop: 0,
        padding: 15
    },
    topicLeft: {
        width: width - 210,
        marginRight: 10
    },
    topicRight: {
        backgroundColor: "#f5f5f5",
        width: 140,
        height: 140,
        padding: 15
    },
    topicTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 28
    },
    topicContext: {
        color: "#999",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 10
    },
    topicNum: {
        fontSize: 14,
        marginTop: 20
    },
    topicRightText: {
        fontSize: 14,
        color: "#666"
    }
});


```


```javascript 
export default class RecycleTestComponent extends Component {
    constructor(props) {
        super(props);
        this.dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let { width } = Dimensions.get("window");
        this._layoutProvider = new LayoutProvider(
            (index) => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 190;
            }
        );
        this.state = {
            pagenum: 1,
            infoList: [],
            loading: false,
            isLoadMore: false
        };
    }
    getInfo = () => {
        let num = this.state.pagenum;
        let info = this.state.infoList;
        WBCST.getFetch("http://app.58.com/api/community/aggregatepage/tabs/topic", {
            pagesize: 20,
            pagenum: num
        }).then((res) => {
            if (res) {
                let loadMore = false;
                if (num == 1) {
                    if (res.data.questions.length == 20) {
                        loadMore = true;
                    }
                    this.setState({
                        isLoadMore: loadMore,
                        infoList: res.data.questions
                    });
                } else {
                    // info.concat(res.data.questions);
                    if (res.data.questions.length < 20) {
                        loadMore = false;
                    } else {
                        loadMore = true;
                    }
                    this.setState({
                        isLoadMore: loadMore,
                        infoList: this.state.infoList.concat(res.data.questions)
                    });
                }
            }
        });
    };
    _rowRenderer = (type, data) => {
        return (
            <View style={styles.container}>
                <View style={styles.topicLeft}>
                    <Text numberOfLines={2} style={styles.topicTitle}>
                        {data.topic.title}
                    </Text>
                    <Text numberOfLines={2} style={styles.topicContext}>
                        {data.topic.context}
                    </Text>
                    <Text style={styles.topicNum}>
                        {data.topic.pn}
                        人参与此话题
                    </Text>
                </View>
                <View style={styles.topicRight}>
                    <Text style={styles.topicRightText}>{data.user.name}</Text>
                    <Text style={[{ marginTop: 10 }, styles.topicRightText]}>{data.title}</Text>
                </View>
            </View>
        );
    };
    _renderFooter = () => {
        return (
            <View>
                <Text>上拉加载更多</Text>
            </View>
        );
    };
    _onLoadMore = () => {
        // Alert.alert(JSON.stringify("num"));
        if (!this.state.isLoadMore) {
            return;
        }
        let num = this.state.pagenum;
        num = num + 1;
        this.setState(
            {
                pagenum: num
            },
            () => {
                // Alert.alert(JSON.stringify(num));
                this.getInfo();
            }
        );
    };
    componentDidMount = () => {
        this.getInfo();
    };
    render() {
        return (
            <RecyclerListView
                layoutProvider={this._layoutProvider}
                dataProvider={this.dataProvider.cloneWithRows(this.state.infoList)}
                rowRenderer={this._rowRenderer}
                extendedState={this.state}
                onEndReached={this._onLoadMore}
                onEndReachedThreshold={50}
                // renderFooter={this._renderFooter}
                scrollViewProps={{
                    refreshControl: (
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={async () => {
                                this.setState({ loading: true });
                                // analytics.logEvent("Event_Stagg_pull_to_refresh");
                                await this.getInfo();
                                this.setState({ loading: false });
                            }}
                        />
                    )
                }}
            />
        );
    }
}

```


![](./assets/image/image_sjvb00aAvk.png)

#### RecyclerListView所有属性

[ npm: recyclerlistview The listview that you need and deserve. It was built for performance, uses cell recycling to achieve smooth scrolling.. Latest version: 3.0.5, last published: a year ago. Start using recyclerlistview  https://www.npmjs.com/package/recyclerlistview](https://www.npmjs.com/package/recyclerlistview " npm: recyclerlistview The listview that you need and deserve. It was built for performance, uses cell recycling to achieve smooth scrolling.. Latest version: 3.0.5, last published: a year ago. Start using recyclerlistview  https://www.npmjs.com/package/recyclerlistview")

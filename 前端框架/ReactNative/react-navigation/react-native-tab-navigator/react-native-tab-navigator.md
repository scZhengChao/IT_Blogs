# react-native-tab-navigator

[npm: react-native-tab-navigator A tab bar that switches between scenes, written in JS for cross-platform support. Latest version: 0.3.4, last published: 5 years ago. Start using react-native-tab-navigator in your project by running  https://www.npmjs.com/package/react-native-tab-navigator](https://www.npmjs.com/package/react-native-tab-navigator "npm: react-native-tab-navigator A tab bar that switches between scenes, written in JS for cross-platform support. Latest version: 0.3.4, last published: 5 years ago. Start using react-native-tab-navigator in your project by running  https://www.npmjs.com/package/react-native-tab-navigator")

```javascript 
 App.js代码

 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Head from './Head';

export default class myapp extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: '首页'
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <Head title={this.state.selectedTab}/>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '首页'}
                        title="首页"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={{uri:'icon_menu_home'}}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'icon_menu_home'}}/>}
                        onPress={() => this.setState({ selectedTab: '首页' })}>
                        <View style={styles.content}>
                             <Text>{this.state.selectedTab}</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '应急'}
                        title="应急"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={{uri:'icon_menu_message'}}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'icon_menu_message'}}/>}
                        onPress={() => this.setState({ selectedTab: '应急' })}>
                         <View style={styles.content}>
                            <Text>{this.state.selectedTab}</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '我的'}
                        title="我的"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={{uri:'icon_menu_user'}}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'icon_menu_user'}}/>}
                        onPress={() => this.setState({ selectedTab: '我的' })}>
                         <View style={styles.content}>
                            <Text>{this.state.selectedTab}</Text>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabText: {
        color: "#666666",
        fontSize: 13
    },
    selectedTabText: {
        color: "#ff8a00",
        fontSize: 13
    },
    icon: {
        width: 25,
        height: 25
    },
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    }
});

Head.js 代码

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {Dimensions} from 'react-native'
export default class dh extends Component{
     render() {
        return (
            <View style={styles.container}>
                 <View style={styles.navBarStyle}>
                    {/* 中间标题 */}
                    <Text style={styles.navBarTitleStyle}>{this.props.title}</Text> 
                </View>
            </View>
        );
    }
     
}
   


      var styles = StyleSheet.create({
        container: {
            backgroundColor:'yellow',
        },

        navBarStyle: {
            width: Dimensions.get('window').width,
            // 尺寸
            // 当前系统为iOS时,导航栏高度为64
            height:Platform.OS === 'ios' ? 64 : 44,
            // 背景颜色
            backgroundColor:'rgba(255, 255, 255, 0.9)',
            // 底部分隔线
            borderBottomWidth:0.5,
            borderBottomColor:'gray',
           
            // 当前系统为iOS时,下次移动15
            paddingTop:Platform.OS === 'ios' ? 40 : 0
        },

  

        navBarTitleStyle: {
            // 字体大小
            fontSize:17,
            // 字体颜色
            color:'black',
            alignSelf: 'center',
            alignItems: 'center'
        }
    });
```

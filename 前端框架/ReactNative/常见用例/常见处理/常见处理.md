# 常见处理

## 目录

- [优雅的扩大RN组件点击范围 ](#优雅的扩大RN组件点击范围-)
- [失焦后需触发两次点击事件](#失焦后需触发两次点击事件)
- [TextInput无法自动拉起键盘](#TextInput无法自动拉起键盘)

# 优雅的扩大RN组件点击范围&#x20;

```javascript 
 <TouchableOpacity
            style={{
              position: 'absolute', justifyContent: 'center', alignItems: 'center', top: - 10, right: -5, width: 30, height: 30, zIndex: 99999,
              elevation: 99999
            }}
            onPress={() => onPressDelete(itemData)}
            hitSlop={{left: 30, right: 30, top: 30, bottom: 30}}
          >
            <View style={{
              position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 10, width: 30, height: 30, zIndex: 99999,
              elevation: 99999
            }}>
              <Image source={require('images/compared/delete_gray.png')} />
            </View>
          </TouchableOpacity>

```


注意： 不会超过父组件的的边界；也不会影响组件层叠

# 失焦后需触发两次点击事件

在TextInput获取焦点后我需要触发点击事件，需要点击两次：第一次失去焦点，第二次方可触发点击事件；

在外层套一个

```javascript 
<ScrollView keyboardShouldPersistTaps={'handled'}></ScrollView>
```


设置 keyboardShouldPersistTaps属性；

keyboardShouldPersistTaps
如果当前界面有软键盘，那么点击scrollview后是否收起键盘，取决于本属性的设置。（译注：很多人反应TextInput无法自动失去焦点/需要点击多次切换到其他组件等等问题，其关键都是需要将TextInput放到ScrollView中再设置本属性）

- 'never' （默认值），点击TextInput以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。
- 'always'，键盘不会自动收起，ScrollView也不会捕捉点击事件，但子组件可以捕获。
- 'handled'，当点击事件被子组件捕获时，键盘不会自动收起。这样切换TextInput时键盘可以保持状态。多数带有TextInput的情况下你应该选择此项。

# TextInput无法自动拉起键盘

简介
当点击按钮跳转到新Modal或新Page上有文本框时，有时会希望可以在新页面加载完后输入框自动获得焦点，并唤起键盘。TextInput本身有autoFocus属性，可以在组件加载完成后获得焦点，但是键盘并不一定会弹出。

解决方案
取消textInput的autoFoucs
获得要定位的TextInput的ref
在componentDidMount函数中调用setTimeout方法，延时20ms-100ms，个别机型需要延时大一些，函数内执行ref.focus()
如果是Modal，验证是否每次打开都会执行componentDidMount，也就是每次Modal关闭时内容是否会被销毁。如果不是，则可以在Modal的onShow属性上延时调用focus()方

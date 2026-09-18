# 开关交互类

## 目录

- [checkBox](#checkBox)
- [Switch](#Switch)
  - [Props ](#Props-)

# checkBox

```javascript 
 /**
 * @flow
 */
import React, { Component } from 'react'
import _ from 'lodash'
import {
    View,
    TouchableWithoutFeedback,
} from 'react-native'
import styleSheet, { lineColor } from '../utils/styleSheet'
import Icon from './Icon'

type Props = {
    checked:boolean,
    onChange:(arg:boolean)=>any,
    ref?:string,
    iconStyle?:any,
    containerStyle?:any,
}
type States = {
    checked:boolean
}
class CheckBox extends Component {
  props:Props
  state:States
  static defaultProps = {
    checked: false,
    onChange: arg => arg,
  }
  constructor(props:Props) {
    super(props)
    this.state = {
      checked: props.checked,
    }
  }
  componentWillReceiveProps(nextProps:Props) {
    this.setState({
      checked: nextProps.checked,
    })
  }
  toggle=() => {
    const { onChange } = this.props
    this.setState({ checked: !this.state.checked }, () => {
      if (_.isFunction(onChange)) onChange(this.state.checked)
    })
  }
  render() {
    const { ref = 'checkbox', containerStyle, iconStyle } = this.props
    const { checked } = this.state
    return (
      <TouchableWithoutFeedback ref={ref} onPress={this.toggle}>
        <View style={[styles.container, containerStyle]}>
          <Icon
            suite={'FontAwesome'}
            name={checked ? 'check-square-o' : 'square-o'}
            size={16}
            style={[styles.checkbox, iconStyle]}
            color="#00B4F7"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
const styles = styleSheet.create({
  container: {
    backgroundColor: lineColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    overflow: 'hidden',
  },
  checkbox: {

  },
})
export default CheckBox

```


# Switch

react-native-switch-pro

```javascript 
 import Switch from  'react-native-switch-pro' 
<Switch
  onSyncPress={this.changeFromOne}
  value={fromOne}
/>
```


[npm: react-native-switch-pro an universal switcher for andriod and iOS. Latest version: 1.0.5, last published: 2 years ago. Start using react-native-switch-pro in your project by running \`npm i react-native-switch-pro\`. There are https://www.npmjs.com/package/react-native-switch-pro](https://www.npmjs.com/package/react-native-switch-pro "npm: react-native-switch-pro an universal switcher for andriod and iOS. Latest version: 1.0.5, last published: 2 years ago. Start using react-native-switch-pro in your project by running `npm i react-native-switch-pro`. There are https://www.npmjs.com/package/react-native-switch-pro")

## Props&#x20;

| **Name**            | **Description**                                            | **Default**                           | **Type** |
| ------------------- | ---------------------------------------------------------- | ------------------------------------- | -------- |
| width               | width of switch                                            | 40                                    | number   |
| height              | height of switch                                           | 21                                    | number   |
| value               | state of switch which can be used to bidirectional binding | undefined                             | bool     |
| disabled            | whether switch is clickable                                | false                                 | bool     |
| circleColorActive   | color for circle handler of switch when it is on           | white                                 | string   |
| circleColorInactive | color for circle handler of switch when it is off          | white                                 | string   |
| style               | styles that will be applied for switch container           | undefined                             | style    |
| circleStyle         | styles that will be applied for the circle                 | undefined                             | style    |
| backgroundActive    | color of switch when it is on                              | green                                 | string   |
| backgroundInactive  | color of switch when it is off                             | '#ddd'                                | string   |
| onSyncPress         | callback when switch is clicked                            | () => null                            | func     |
| onAsyncPress        | has a callback with result of async                        | (value, callback) => {callback(true)} | func     |

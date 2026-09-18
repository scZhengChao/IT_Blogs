# 图标编码类

## 目录

- [Icon](#Icon)
- [图标库](#图标库)
- [svg](#svg)
- [二维码：](#二维码)
- [条形码](#条形码)

# Icon

# 图标库

react-native-vector-icons             &#x20;

```javascript 
 /**
 * @flow
 */

import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const mapping = {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  Zocial,
  EvilIcons,
  Foundation,
  MaterialIcons,
}

export type SuiteType = 'Entypo'
  | 'FontAwesome'
  | 'Ionicons'
  | 'Octicons'
  | 'Zocial'
  | 'EvilIcons'
  | 'Foundation'
  | 'MaterialIcons'


export type IconType = {
  suite: SuiteType,
  name: string,
  color?: string,
  size?: number,
}

export default function Icon(props: IconType) {
  const { suite, ...extraProps } = {
    color: 'white',
    size: 30,
    ...props,
  }
  const VectorIcon = mapping[suite]
  return <VectorIcon {...extraProps} />
}


使用：
<Icon
  size={22}
  suite="Ionicons"
  name={isSelected===item.desc? 'ios-checkmark-circle' : 'ios-radio-button-off'}
  color={isSelected===item.desc ? getThemeColor() : '#E8E8E8'}
/>
```


# svg

react-native-svg

[给RN应用增加绘图的翅膀 -- React Native SVG 解决 React Native 绘图痛点 https://mp.weixin.qq.com/s?\_\_biz=MzA4Nzg0MDM5Nw==\&mid=2247489101\&idx=2\&sn=084234c835e5daf06d859f108d0ae2e8\&chksm=903215afa7459cb9d0fa14303245a32c3e50927f3904aa195d9894588af294c28138fb9cc06b\&mpshare=1\&scene=1\&srcid=1209g3Rs73ALHAkcXoQDlbkg\&sharer\_sharetime=1607477329094\&sharer\_shareid=c581942ba12fd83f754283490bd7311e\&key=3caa3d481a13df719566bbbc249abe153d938c28cdfb212edc4b863dd9c1b676680119f95c490cbd41f7f3f625bb2fc1019a38400faf3674ffc2b6f9cf6a05e8b1206eba8938342fcf9cda48feddf6d15a7ec3a4141f345c61e9c43f9e19e51e6488b88105926cc053d47272019c857dab08293e536aee37f9d4173b573b9bfe\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh\_CN\&exportkey=A54N6LXf9WEQKXRuPnjSFAg%3D\&pass\_ticket=aEkIcvTp05dn9s4%2FgqXNp6gUXVz5cyRk3hHYgG7RNnoNgbASUF15hKsqHAF7teZH\&wx\_header=0](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==\&mid=2247489101\&idx=2\&sn=084234c835e5daf06d859f108d0ae2e8\&chksm=903215afa7459cb9d0fa14303245a32c3e50927f3904aa195d9894588af294c28138fb9cc06b\&mpshare=1\&scene=1\&srcid=1209g3Rs73ALHAkcXoQDlbkg\&sharer_sharetime=1607477329094\&sharer_shareid=c581942ba12fd83f754283490bd7311e\&key=3caa3d481a13df719566bbbc249abe153d938c28cdfb212edc4b863dd9c1b676680119f95c490cbd41f7f3f625bb2fc1019a38400faf3674ffc2b6f9cf6a05e8b1206eba8938342fcf9cda48feddf6d15a7ec3a4141f345c61e9c43f9e19e51e6488b88105926cc053d47272019c857dab08293e536aee37f9d4173b573b9bfe\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh_CN\&exportkey=A54N6LXf9WEQKXRuPnjSFAg%3D\&pass_ticket=aEkIcvTp05dn9s4%2FgqXNp6gUXVz5cyRk3hHYgG7RNnoNgbASUF15hKsqHAF7teZH\&wx_header=0 "给RN应用增加绘图的翅膀 -- React Native SVG 解决 React Native 绘图痛点 https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==\&mid=2247489101\&idx=2\&sn=084234c835e5daf06d859f108d0ae2e8\&chksm=903215afa7459cb9d0fa14303245a32c3e50927f3904aa195d9894588af294c28138fb9cc06b\&mpshare=1\&scene=1\&srcid=1209g3Rs73ALHAkcXoQDlbkg\&sharer_sharetime=1607477329094\&sharer_shareid=c581942ba12fd83f754283490bd7311e\&key=3caa3d481a13df719566bbbc249abe153d938c28cdfb212edc4b863dd9c1b676680119f95c490cbd41f7f3f625bb2fc1019a38400faf3674ffc2b6f9cf6a05e8b1206eba8938342fcf9cda48feddf6d15a7ec3a4141f345c61e9c43f9e19e51e6488b88105926cc053d47272019c857dab08293e536aee37f9d4173b573b9bfe\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh_CN\&exportkey=A54N6LXf9WEQKXRuPnjSFAg%3D\&pass_ticket=aEkIcvTp05dn9s4%2FgqXNp6gUXVz5cyRk3hHYgG7RNnoNgbASUF15hKsqHAF7teZH\&wx_header=0")

[react-native-svg的使用 - 程序猿--少停 - 博客园 今天学习一下react-native-svg,一如既往,在安装该库的时候,就有一大堆坑等你填. 首先,我新建一个rn项目,按照官方说明先导入库 再链接库文件 rnpm link react-nativ https://www.cnblogs.com/shaoting/p/8085136.html](https://www.cnblogs.com/shaoting/p/8085136.html "react-native-svg的使用 - 程序猿--少停 - 博客园 今天学习一下react-native-svg,一如既往,在安装该库的时候,就有一大堆坑等你填. 首先,我新建一个rn项目,按照官方说明先导入库 再链接库文件 rnpm link react-nativ https://www.cnblogs.com/shaoting/p/8085136.html")

# 二维码：

react-native-qrcode-svg&#x20;

[npm: react-native-qrcode-svg A QR Code generator for React Native based on react-native-svg and javascript-qrcode.. Latest version: 6.1.2, last published: 6 months ago. Start using react-native-qrcode-svg in your project by runni https://www.npmjs.com/package/react-native-qrcode-svg](https://www.npmjs.com/package/react-native-qrcode-svg "npm: react-native-qrcode-svg A QR Code generator for React Native based on react-native-svg and javascript-qrcode.. Latest version: 6.1.2, last published: 6 months ago. Start using react-native-qrcode-svg in your project by runni https://www.npmjs.com/package/react-native-qrcode-svg")

```javascript 
 <QRCode
  value={'asgasgasf'}
  size={200}
  color="#000000"
  backgroundColor="#f2f2f2"
  logoSize={50}
  logoMargin={4}
  logoBackgroundColor="transparent"
  logo={require('../images/logo.png')}
/>
```


# 条形码

```javascript 
 import Barcode from '@adrianso/react-native-barcode-builder'
<Barcode style={styles.barStyle} value={'asasf'}/>
```

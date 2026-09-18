# 常见登陆

## 目录

- [1.生物识别（指纹和人脸）](#1生物识别指纹和人脸)
  - [        react-native-fingerprint-scanner       ](#--react-native-fingerprint-scanner)
  - [     react-native-touch-id](#-react-native-touch-id)
- [6.手势登陆](#6手势登陆)
  - [        android （react-native-ok-gesture-password）](#--android-react-native-ok-gesture-password)
  - [    ios/android（react-native-gesture-password）  android 上可能不流畅](#-iosandroidreact-native-gesture-password-android上可能不流畅)

# **1.生物识别（指纹和人脸）**

## \*\*        \*\*​**react-native-fingerprint-scanner**       

基于本地touch id  和 face id 的指纹验证库

[https://www.npmjs.com/package/react-native-fingerprint-scanner](https://www.npmjs.com/package/react-native-fingerprint-scanner "https://www.npmjs.com/package/react-native-fingerprint-scanner")

   npm地址（很详细）

安装配置

**Android**

1\. Open up android/app/src/main/java/\[...]/MainApplication.java

    \* Add&#x20;

**import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;**

&#x20;to the imports at the top of the file

    \* Add&#x20;

**new ReactNativeFingerprintScannerPackage()**

&#x20;to the list returned by the&#x20;

**getPackages()**

&#x20;method

    1.Append the following lines to&#x20;

**android/settings.gradle**

：

        include ':react-native-fingerprint-scanner'

        project(':react-native-fingerprint-scanner').projectDir = new File(rootProject.projectDir, '../node\_modules/react-native-fingerprint-scanner/android')

    2.Insert the following lines inside the dependencies block in android/app/build.gradle；

        implementation project(':react-native-fingerprint-scanner')

**App Permissions**

    Add the following permissions to their respective files:

In your&#x20;

**AndroidManifest.xml:**

API level 28+ (Uses Android native BiometricPrompt) (Reference)

    \<uses-permission android:name="android.permission.USE\_BIOMETRIC" />

API level 23-28 (Uses Android native FingerprintCompat) Reference)

    \<uses-permission android:name="android.permission.USE\_FINGERPRINT" />

[https://github.com/hieuvp/react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner "https://github.com/hieuvp/react-native-fingerprint-scanner")

  github地址 和demo

**android 支持 touch id  phone x 支持 faceid**

但是这个插件在我本地项目跑不起来；android studio 的模拟器闪退；但是又不报错；所以尝试换了另一个插件：react-native-touch-id（推荐）

## \*\*     react-native-touch-id\*\*​

[https://www.npmjs.com/package/react-native-touch-id](https://www.npmjs.com/package/react-native-touch-id "https://www.npmjs.com/package/react-native-touch-id")

  npm

```javascript 
 import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import TouchID from "react-native-touch-id";


const optionalConfigObjectSupport = {
    unifiedErrors: false,
    passcodeFallback: false
}
const optionalConfigObjectAuth  = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false,
}
export default class FingerPrint extends Component {
    constructor() {
        super()
        this.state = {
            biometryType: null
        };
    }
    componentDidMount() {
        TouchID.isSupported(optionalConfigObjectSupport)
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    Alert.alert('FaceID is supported.');
                } else {
                    Alert.alert('TouchID is supported.');
                }
            })
            .catch(error => {
                // Failure code
                Alert.alert(error.message);
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={this.clickHandler}
                    underlayColor="#0380BE"
                    activeOpacity={1}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '600'
                    }}>
                        {`Authenticate with ${this.state.biometryType}`}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }


    clickHandler() {
        TouchID.authenticate('to demo this react-native component', optionalConfigObjectAuth)
        .then(success => {
            Alert.alert('Authenticated Successfully');
        })
        .catch(error => {
            Alert.alert('Authentication Failed');
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    btn: {
        borderRadius: 3,
        marginTop: 200,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#0391D7'
    }
});

```


# **6.手势登陆**

##         android （***react-native-ok-gesture-password***）

[https://github.com/MoMask/react-native-ok-gesture-password](https://github.com/MoMask/react-native-ok-gesture-password "https://github.com/MoMask/react-native-ok-gesture-password")

   android 上表现较好（）

```javascript 
 import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';import OkGesturePassword from "./source/OkGesturePassword";

typeProps = {};
export default class App extends Component<Props> {


    state = {
        point1: "#FFFFFF",
        point2: "#FFFFFF",
        point3: "#FFFFFF",
        point4: "#FFFFFF",
        point5: "#FFFFFF",
        point6: "#FFFFFF",
        point7: "#FFFFFF",
        point8: "#FFFFFF",
        point9: "#FFFFFF",
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 70, marginTop: 10}}>
                    <View style={styles.headContent}>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point1}]}/>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point2}]}/>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point3}]}/>
                    </View>
                    <View style={styles.headContent}>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point4}]}/>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point5}]}/>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point6}]}/>
                    </View>
                    <View style={styles.headContent}>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point7}]}/>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point8}]}/>
                        <View style={[styles.headCircle, {backgroundColor: this.state.point9}]}/>
                    </View>
                </View>
                <OkGesturePassword
                    style={styles.gesturePassword}
                    pointBackgroundColor={'white'}
                    showArrow={false}
                    color={'#1F67B9'}
                    activeColor={'#1F67B9'}
                    warningColor={'red'}
                    warningDuration={0}
                    allowCross={false}
                    onMove={(p) => {
                        console.log("onMove:" + p);
                        this._changeHeadPoint(p);
                    }}
                    onFinish={(password) => {
                        Alert.alert("密码",password);
                        this._resetHeadPoint();
                    }}
                />
            </View>
        );
    }

    _resetHeadPoint = () => {
        this.setState({
            point1: "#FFFFFF",
            point2: "#FFFFFF",
            point3: "#FFFFFF",
            point4: "#FFFFFF",
            point5: "#FFFFFF",
            point6: "#FFFFFF",
            point7: "#FFFFFF",
            point8: "#FFFFFF",
            point9: "#FFFFFF",
        });
    };

    _changeHeadPoint = (point) => {
        switch (point + 1) {
            case 1:
                this.setState({
                    point1: '#1F67B9'
                });
                break;
            case 2:
                this.setState({
                    point2: '#1F67B9'
                });
                break;
            case 3:
                this.setState({
                    point3: '#1F67B9'
                });
                break;
            case 4:
                this.setState({
                    point4: '#1F67B9'
                });
                break;
            case 5:
                this.setState({
                    point5: '#1F67B9'
                });
                break;
            case 6:
                this.setState({
                    point6: '#1F67B9'
                });
                break;
            case 7:
                this.setState({
                    point7: '#1F67B9'
                });
                break;
            case 8:
                this.setState({
                    point8: '#1F67B9'
                });
                break;
            case 9:
                this.setState({
                    point9: '#1F67B9'
                });
                break;


        }
    };

}

const styles = StyleSheet.create({
    gesturePassword: {
        backgroundColor: 'white',
    },
    headContent: {
        flex: 1, justifyContent: 'center', flexDirection: 'row'
    },
    headCircle: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#1F67B9",
        width: 15,
        height: 15,
        margin: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },});
```


## \*\*    ios/android（react-native-gesture-password）  android 上可能不流畅\*\*​

***<https://github.com/Spikef/react-native-gesture-password>***

\*\*\*      github\*\*\*​

```javascript 
 var PasswordGesture = require('react-native-gesture-password');
import React ,{component,PureComponent} from 'react'
import {
    StyleSheet,View,Text
} from 'react-native'
export default class MyPasswordGesture  extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            message: 'Please input your password.',
            status: 'normal'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Text>asfasf11111111</Text> */}
                <PasswordGesture
                    ref='pg'
                    status={this.state.status}
                    message={this.state.message}
                    onStart={() => this.onStart()}
                    onEnd={(password) => this.onEnd(password)}
                />
            </View>
           
        );
    }
    onEnd=(password)=> {
        if (password == '123') {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });


            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    onStart=()=>{
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onReset=()=>{
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }
    // onEnd=(password)=>{
    //     if ( Password1 === '' ) {
    //         // The first password
    //         Password1 = password;
    //         this.setState({
    //             status: 'normal',
    //             message: 'Please input your password secondly.'
    //         });
    //     } else {
    //         // The second password
    //         if ( password === Password1 ) {
    //             this.setState({
    //                 status: 'right',
    //                 message: 'Your password is set to ' + password
    //             });


    //             Password1 = '';
    //             // your codes to close this view
    //         } else {
    //             this.setState({
    //                 status: 'wrong',
    //                 message:  'Not the same, try again.'
    //             });
    //         }
    //     }
    // }
    // onStart=()=>{
    //     if ( Password1 === '') {
    //         this.setState({
    //             message: 'Please input your password.'
    //         });
    //     } else {
    //         this.setState({
    //             message: 'Please input your password secondly.'
    //         });
    //     }
    // }
  
}
const styles = StyleSheet.create({
    gesturePassword: {
        backgroundColor: 'white',
    },
    container:{
        flex:1,
        width:'100%',
        // backgroundColor:'red'
    }
})

```

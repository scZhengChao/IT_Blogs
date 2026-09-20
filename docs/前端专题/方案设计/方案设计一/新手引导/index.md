# 新手引导

前端开发如何做新手引导

[ 前端开发如何做新手引导 - 掘金 通常，在产品发布新版本或者有新功能上线时，都会开发一个新手引导功能来引导用户了解应用的功能。在前端开发中，如何快速地开发新手引导功能呢，下面介绍几个开箱即用的新手引导组件库。 1，Intro.js I https://juejin.cn/post/7170879983760441357](https://juejin.cn/post/7170879983760441357 " 前端开发如何做新手引导 - 掘金 通常，在产品发布新版本或者有新功能上线时，都会开发一个新手引导功能来引导用户了解应用的功能。在前端开发中，如何快速地开发新手引导功能呢，下面介绍几个开箱即用的新手引导组件库。 1，Intro.js I https://juejin.cn/post/7170879983760441357")

[ Shepherd — Guide your users through a tour of your app. Guide your users through a tour of your app. https://shepherdjs.dev/](https://shepherdjs.dev/ " Shepherd — Guide your users through a tour of your app. Guide your users through a tour of your app. https://shepherdjs.dev/")

```javascript 

export const steps:any[] = [
    {
        id: 'step1',
        // beforeShowPromise: function () {
        //     return new Promise(function (resolve) {
        //         setTimeout(function () {
        //             window.scrollTo(0, 0);
        //             resolve();
        //         }, 500);
        //     });
        // },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Exit',
                type: 'cancel'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Back',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
            enabled: true,
        },
        title: '欢迎使用本产品',
        text: ['这是第一个引导说明, 你好呀!朋友','哈哈数组第二项'],
        attachTo: {
            // 目标元素
            element: '.first-element',
            // 引导DOM位于目标元素的方位
            on: 'bottom'
        },
        when: {
            show: () => {
                console.log('show step');
            },
            hide: () => {
                console.log('hide step');
            }
        }
    },
    {
        title: '第二步',
        text: '第二步内容',
        attachTo: {
            element: '.second-element',
            on: 'right'
        },
        buttons: [
            {
                text: 'Back',
                type: 'back'
            },
            {

                text: 'Next',
                type: 'next'
            }
        ],
        id: 'step2'
    },
    {
        title: '第三步',
        text: '第三步内容.',
        attachTo: {
            element: '.third-element',
            on: 'left'
        },
        buttons: [
            {
                text: 'Back',
                type: 'back'
            },
            {

                text: 'Next',
                type: 'next'
            }
        ],
        id: 'step3'
    }
];

```


```javascript 
import React, { Component, useContext } from 'react'
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
import {steps} from './steps'
import 'shepherd.js/dist/css/shepherd.css'

const tour = useContext(ShepherdTourContext);

const tourOptions = {
    defaultStepOptions: {
        cancelIcon: {
            enabled: true
        },
        scrollTo: {
            behavior: 'smooth',
            block: 'center'
        }
    },
    useModalOverlay: true
};


function Button() {
    return (
        <button className="button dark" onClick={tour.start}>
            Start Tour
        </button>
    );
}


export default class App extends Component {
    render() {
        return (
            <div style={{flex:1,overflowY:"auto",height:'100%'}}>
                <ShepherdTour steps={steps} tourOptions={tourOptions}>
                    <Button />
                </ShepherdTour>
                <div className={'first-element'} style={{width:300,height:500,backgroundColor:"red",margin:20}}>first-element</div>
                <div className={'second-element'} style={{width:300,height:500,backgroundColor:"red",margin:20}}>second-element</div>
                <div className={'third-element'} style={{width:300,height:500,backgroundColor:"red",margin:20}}>third-element</div>
            </div>
        );
    }
}
```

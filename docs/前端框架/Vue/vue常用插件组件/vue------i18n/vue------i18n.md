# vue------i18n

```纯文本 
 https://www.cnblogs.com/rogerwu/p/7744476.html 
 
         注意循环的是后的{{$t(item)}}  $t()是this头上的 
         import VueI18n from 'vue-i18n'; 
         Vue.use(VueI18n) 
         const i18n = new VueI18n({ 
           locale: 'zh', // 语言标识 
           messages: { 
             'zh': require('./assets/lang/zh'), 
             'en': require('./assets/lang/en') 
           } 
         }) 
         英文： 
         module.exports = { 
             message: { 
                 title: 'Sport Brands' 
             }, 
             placeholder: { 
                 enter: 'Please type in your favorite brand' 
             }, 
             brands: { 
                 nike: 'Nike', 
                 adi: 'Adidas', 
                 nb: 'New Banlance', 
                 ln: 'LI Ning' 
             } 
         } 
         中文： 
         module.exports = { 
             message: { 
                 title: '运动品牌' 
             }, 
             placeholder: { 
                 enter: '请输入您喜欢的品牌' 
             }, 
             brands: { 
                 nike: '耐克', 
                 adi: '阿迪达斯', 
                 nb: '新百伦', 
                 ln: '李宁' 
             } 
         } 
         使用： 
           <h6>{{$t('placeholder.enter')}}</h6> 
           js：data () { 
                 return { 
                   brands: [this.$t('brands.nike'), this.$t('brands.adi'), this.$t('brands.nb'), this.$t('brands.ln')] 
                 } 
              }, 
 
 
         实例：结合element-ui 
         import Vue from 'vue' 
         import VueI18n from 'vue-i18n' 
         import Cookies from 'js-cookie' 
         import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang 
         import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang 
         import enLocale from './en' 
         import zhLocale from './zh' 
 
 
         Vue.use(VueI18n) 
 
 
         const messages = { 
           en: { 
             ...enLocale, 
             ...elementEnLocale 
           }, 
           zh: { 
             ...zhLocale, 
             ...elementZhLocale 
           } 
         } 
 
 
         const i18n = new VueI18n({ 
           locale: 'zh', 
           messages 
         }) 
 
 
         export default i18n 
         http://element-cn.eleme.io/#/zh-CN/component/i18n 官网国际化
```


**demo**

```纯文本 
 en.js 
              module.exports = { 
             message: { 
                 title: 'Sport Brands' 
             }, 
             placeholder: { 
                 enter: 'Please type in your favorite brand' 
             }, 
             brands: { 
                 nike: 'Nike', 
                 adi: 'Adidas', 
                 nb: 'New Banlance', 
                 ln: 'LI Ning' 
             } 
         } 
 zh.js 
              module.exports = { 
             message: { 
                 title: '运动品牌' 
             }, 
             placeholder: { 
                 enter: '请输入您喜欢的品牌' 
             }, 
             brands: { 
                 nike: '耐克', 
                 adi: '阿迪达斯', 
                 nb: '新百伦', 
                 ln: '李宁' 
             } 
         } 
 index.js 
     import Vue from 'vue' 
     import VueI18n from 'vue-i18n' 
 
 
     // import Cookies from 'js-cookie' 
 
 
     import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang 
     import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang 
 
 
     import enLocale from './en' 
     import zhLocale from './zh' 
 
 
     Vue.use(VueI18n) 
 
 
     const messages = { 
         en: { 
             ...enLocale, 
             ...elementEnLocale 
         }, 
         zh: { 
             ...zhLocale, 
             ...elementZhLocale 
         } 
     } 
     const i18n = new VueI18n({ 
         locale: localStorage.getItem('PLAY_LANG') || 'zh', // 语言标识 
         messages 
     }) 
     export default i18n 
 
 main.js 
     import i18n from './lang'; 
     Vue.use(element,{ 
         size: 'small', 
         i18n: (key, value) => i18n.t(key, value) 
     }) 
 lang.vue 
 
     <template> 
         <div> 
             <ul class="tab" @mouseover='change'> 
                 <span class="zhongwen">{{defaultLang}}</span> 
                 <li v-for="(item,index) in lang" :key='index' v-show="appear"                                 @click='select(index,$event)'>{{item.name}}</li> 
             </ul> 
             <div style="margin: 100px auto;"> 
                 <h5>{{$t("message.title")}}</h5> 
                 <input style="width: 300px;" class="form-control" :placeholder="$t('placeholder.enter')"> 
                 <ul> 
                     <li v-for="(brand,index) in brands" :key="index">{{$t(brand)}}</li> 
                 </ul> 
             </div> 
     </div> 
 </template> 
 <style scoped> 
 *{margin: 0;padding: 0;} 
 .tab{height: 100px;} 
 .tab li:hover{ 
     background: #399; 
 } 
 </style> 
 <script> 
     export default { 
         data(){return{ 
             lang:[ 
                 {name:'中文',value:'zh'}, 
                 {name:'英文',value:'en'} 
             ], 
             brands:['brands.nike', 'brands.adi', 'brands.nb', 'brands.ln'], 
             defaultLang:"中文", 
             appear:false, 
         }}, 
         methods:{ 
             change(ev){ 
                 var eve = ev || window.event 
                 var target = eve.target || eve.srcElement 
                 this.appear = true 
                 target.onmouseout = ()=>{ 
                     this.appear = false 
                 } 
             }, 
             select(id,ev){ 
                 this.defaultLang = this.lang[id].name 
                 this.appear = false 
                 // document.cookie = `PLAY_LANG=${this.lang[id].value}` 
                 localStorage.setItem('PLAY_LANG',this.lang[id].value) 
                 this.$i18n.locale = localStorage.getItem('PLAY_LANG') 
             }, 
         } 
 } 
 </script> 

```

# 动态样式

## 目录

- [clsx](#clsx)
- [classnames](#classnames)
  - [style绑定](#style绑定)
  - [class绑定](#class绑定)
  - [classnames库](#classnames库)

# clsx

[https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx "https://www.npmjs.com/package/clsx")

```javascript 
import clsx from "clsx";

<div
      style={{ height: "100%" }}
      className={clsx("excalidraw-app", {
        "is-collaborating": isCollaborating,
      })}
    >
    
    
    
    
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

// Strings (variadic)
clsx('foo', true && 'bar', 'baz');
//=> 'foo bar baz'

// Objects
clsx({ foo:true, bar:false, baz:isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
//=> 'foo --foobar'

// Arrays
clsx(['foo', 0, false, 'bar']);
//=> 'foo bar'

// Arrays (variadic)
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
//=> 'foo bar hello world cya'

```


# classnames

## `style`绑定

```typescript 
let ele = <div style={{color:'red',fontSize:'12px',['line-height']:40}}></div>

```


## `class`绑定

```typescript 
let ele = <div className="box special"></div>

.box{
  color:red;
}
.special{
  font-size:40px;
}
```


## `classnames`库

```typescript 
import classnames from 'classnames';

let ele = <div className={classnames({box:true , special: false},'common')}></div>

//转化为原生

let ele = <div className="box common"></div>

```


```typescript 
import classnames from 'classnames';

let ele = <div className={classnames(['box', useSpecial ? 'special' : '' ], 'common')}></div>

//如果useSpecial为true,转化为原生

let ele = <div className="box special common"></div>

```


```typescript 

import styles from './index.less';
const cx = classnames.bind(styles);
 <Switch
    className={cx('switch', {
      'checked-switch': !operationAuthorities?.canSetAsOfficialWebTheme,
    })}
    checked={!operationAuthorities?.canSetAsOfficialWebTheme}
    disabled={!operationAuthorities?.canSetAsOfficialWebTheme}
  />
```

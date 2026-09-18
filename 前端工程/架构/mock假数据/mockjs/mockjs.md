# mockjs

## 目录

- [umi中的使用](#umi中的使用)

类似的还有**Mock.js**

是一个模拟数据生成器，可帮助前端开发和原型与后端进度分开，并减少某些单调性，尤其是在编写自动化测试时。&#x20;

[ Home · nuysoft/Mock Wiki · GitHub A simulation data generator. Contribute to nuysoft/Mock development by creating an account on GitHub. https://github.com/nuysoft/Mock/wiki](https://github.com/nuysoft/Mock/wiki " Home · nuysoft/Mock Wiki · GitHub A simulation data generator. Contribute to nuysoft/Mock development by creating an account on GitHub. https://github.com/nuysoft/Mock/wiki")

[Mock.js  http://mockjs.com/examples.html#Random\\.province\\(\\)](http://mockjs.com/examples.html#Random\\.province\\\(\\\) "Mock.js  http://mockjs.com/examples.html#Random\\.province\\(\\)")

```javascript 
 import Mock from "mockjs";

const Random = Mock.Random

function generateCustomers () {
  const customers = []

  for (let id = 0; id < 50; id++) {
    const firstName = Random.first()
    const lastName = Random.last()
    const province = Random.province()
    const date = Random.date()

    customers.push({
      id,
      firstName,
      lastName ,
      province,
      date
    })
  }

  return { customers }

```


# umi中的使用

[ Mock Umi 提供了开箱即用的 Mock 功能，能够用方便简单的方式来完成 Mock 数据的设置。 https://umijs.org/docs/guides/mock](https://umijs.org/docs/guides/mock " Mock Umi 提供了开箱即用的 Mock 功能，能够用方便简单的方式来完成 Mock 数据的设置。 https://umijs.org/docs/guides/mock")

# xState

## 目录

- [官网](#官网)
- [实际应用](#实际应用)
- [总结](#总结)

[   https://juejin.cn/post/7028768435450413092](https://juejin.cn/post/7028768435450413092 "   https://juejin.cn/post/7028768435450413092")

[   https://juejin.cn/post/7041081378745630757](https://juejin.cn/post/7041081378745630757 "   https://juejin.cn/post/7041081378745630757")

# 官网

[   https://xstate.js.org/docs/zh/guides/introduction-to-state-machines-and-statecharts/#%E5%A4%8D%E5%90%88%E7%8A%B6%E6%80%81-compound-states](https://xstate.js.org/docs/zh/guides/introduction-to-state-machines-and-statecharts/#%E5%A4%8D%E5%90%88%E7%8A%B6%E6%80%81-compound-states "   https://xstate.js.org/docs/zh/guides/introduction-to-state-machines-and-statecharts/#%E5%A4%8D%E5%90%88%E7%8A%B6%E6%80%81-compound-states")

# 实际应用

[   https://juejin.cn/post/7119382536832172045](https://juejin.cn/post/7119382536832172045 "   https://juejin.cn/post/7119382536832172045")

# 总结

`XState` 版本更像是正常版本的 `声明式` 实现，其内敛了状态的变化逻辑，使得代码的组织和状态的变化更加有序，但同时也明显地增加了开发者的心智负担

从技术极致的角度看，我当然推荐你使用状态机来组织状态，但我们大部分人写的代码都是为业务所服务的，从权衡的角度来看，这种编写代码的方式或许不仅不能提升代码可维护性，反而会是一个拖累

首先，状态机的概念很多，我几乎花费了两天的时间才把文档看完，且相关的教程和文章相比于其他炙手可热的技术来说少得可怜（甚至比不上 `rxjs`），这就导致学习门槛较高，就算你给团队成员学习的时间，也难以保证大家都能学得到位，在没有充分理解的情况下很容易编写不符合理念的代码，代码都没写对，怎么指望能发挥应有的效果？

其次，业务千变万化，这就要求写的代码也要足够灵活，甚至有些时候要写一些反逻辑的 `hack`代码，`if...else` 再多再难看，最起码你明确地知道无论再怎么糟糕肯定能继续堆下去，但如果一上来就被状态机的条条框框给限死了，改起来痛苦就不说了，万一改都改不了那才叫大麻烦，以我多年从业经验来看，我实在想不到我所遇到的哪些实际场景用状态机来解决会明显更好

当然，我不是说这个东西不好，存在即合理，这个东西必然是以解决相应问题的目的而出现的，它必然是有可以大展拳脚的场景，但不应该认为这是万能灵药，要用辩证的眼光来看待问题

[入门](IT/前端工程/状态机/xState/入门/入门.md "入门")

[运行我们的状态机](./运行我们的状态机/index.md "运行我们的状态机")

[转换](IT/前端工程/状态机/xState/转换/转换.md "转换")

[接入服务](./接入服务/index.md "接入服务")

[接入上下文和行为](./接入上下文和行为/index.md "接入上下文和行为")

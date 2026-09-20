# forkJoin

> [forkJoin](https://rxjs.tech/api/index/function/forkJoin "forkJoin")(...args: any\[]): [Observable](https://rxjs.tech/api/index/class/Observable "Observable")\<any>

接受一个 [ObservableInput](https://rxjs.tech/api/index/type-alias/ObservableInput "ObservableInput") 的 `Array` 或 [ObservableInput](https://rxjs.tech/api/index/type-alias/ObservableInput "ObservableInput") 的字典 `Object`，并返回一个 [Observable](https://rxjs.tech/api/index/class/Observable "Observable")，它用与**传入的数组完全相同的顺序发出一个值数组，或者用与传入的字典相同的构型。**

> 等待这些 `Observables` 完成，然后把它们发出的最后一个值组合起来；如果传递了一个空数组，则立即完成。

![](image_fXOx4Na655.png)

`[forkJoin]` 是一个操作符，它接受任意数量的输入 `observable`，这些输入 `observable` 可以作为数组或输入 `observable` 的字典传递。如果没有提供输入 `observables`（例如传递一个空数组），那么结果流将立即完成。

`[forkJoin]` 将等待所有传入的 `observables` 发出并完成，然后它会发出一个数组或一个对象，其中包含来自相应 `observables` 的最后一个值。

如果你将一个包含 `n` 个 `observable` 的数组传给本操作符，那么结果数组将有 `n` 个值，其**第一个值是第一个 ****`observable`**** 发出的最后一个值**，**第二个值是第二个** `observable`发出的**最后一个值，** 依此类推。

如果你将 `Observable` 的**字典传递**给操作符，则**生成的对象将具有与传递的字典相同的键名**，它们发出的**最后一个值**位于相应的键名处。

这意味着 `[forkJoin]` **不会发出超过一个值，并且会在此之后完成**。如果**你不仅需要在传入**的 `Observable` 的**生命周期结束时发出组合**值，而且还需要在**整个生命周期中发出组合值**，请尝试使用 [combineLatest](https://rxjs.tech/api/index/function/combineLatest "combineLatest") 或 [zip](https://rxjs.tech/api/index/function/zip "zip")。

为了**使结果数组的长度与输入的** `observables` 的数量相同，只要任何给定的 `observables` **完成而没有发出任何值**，`[forkJoin]` 也会在**那个时刻完成并且它也不会发出任何值**，即使**它已经具有来自其它** `Observable` 的一些最后值。相反，如果有一个 `observable` **永远不会完成**，`[forkJoin]` **也永远不会完成**，除非其它 `observable` 在某个时刻都完成而不发出值，这会让我们回到前面的情况。总而言之，***为了让 ******`[forkJoin]`****** 发出一个值，所有给定的 ******`observables`****** 都必须至少发出一次并完成。***

如果在某个时候任何给定的 `observable` 出错，则 `[forkJoin]` 也**会出错并立即退订其它** observables。

`[forkJoin]` 会接受一个可选的 `resultSelector` 函数为参数，该函数将使用要发出的数组中的值为参数进行调用。无论 `resultSelector` 返回什么，**都会出现在输出** `observable` 中。这意味着默认的 `resultSelector` 可以被认为是一个函数，它接受它的所有参数并将它们放入一个数组中。请注意，只有当 `[forkJoin]` 应该发出结果时才会调用 `resultSelector`。

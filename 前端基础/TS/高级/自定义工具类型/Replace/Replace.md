# Replace

实现 Replace\<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。

字符串也是`${infer L}${infer M}${infer R}`，但注意这里L是第一个字符，M 是第二个字符，R 是剩下的字符，如果字符只有 2 个，则 R 是''，如果字符只有一位，则无法这么拆解成 3 个变量，`T extends` {infer M}\${infer R}\`\`条件会走到 false 的语句里去，这一点比较奇怪。

```typescript 
type Replace<S extends string, From extends string, To extends string> = From extends '' 
? S 
: S extends (`${infer L}${From}${infer R}`) ? `${L}${To}${R}`: S
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```

# prompts询问选择输入

## 目录

- [Prompt Chain](#Prompt-Chain)

询问选择之类的&#x20;

链接：[https://npm.im/prompts](https://npm.im/prompts "https://npm.im/prompts")

Single Prompt

```typescript 
const prompts = require('prompts');

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'meaning',
    message: 'What is the meaning of life?'
  });

  console.log(response.meaning);
})();

```


### Prompt Chain

```typescript 
const prompts = require('prompts');

const questions = [
  {
    type: 'text',
    name: 'username',
    message: 'What is your GitHub username?'
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?'
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?'
  }
];

(async () => {
  const response = await prompts(questions);

  // => response => { username, age, about }
})();
```

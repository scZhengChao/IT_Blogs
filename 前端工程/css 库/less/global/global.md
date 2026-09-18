# global

## 目录

- [:global](#global)

# :global

- 直接使用 :global 嵌套

不再嵌套模块化的class时

```typescript 
:global{
  .ant-card{
    background: #61dafb;
    .ant-card-body{
      background: red;
      opacity: 0.1;
    }
  }
}

```


- 将属性用:global（）包裹

嵌套模块化的class时

```typescript 
:global(.ant-collapse-content-box) {
  height: 150px;
   .content {
     color: red;
  }
}
```

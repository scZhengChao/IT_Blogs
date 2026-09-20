# when

## 目录

- [递归](#递归)

# 递归

```sass (sass)  
flex: none;
  height: 30px;
  margin-bottom: 10px;

  .col-10,
  .col-20,
  .col-30,
  .col-40,
  .col-50,
  .col-60,
  .col-70,
  .col-80,
  .col-90,
  .col-100,
  .col-5,
  .col-15,
  .col-25,
  .col-35,
  .col-45,
  .col-55,
  .col-65,
  .col-75,
  .col-85,
  .col-95 {
    flex: none;
    line-height: 30px;
  }

  .col-5 {
    width: 10%;
  }

  .col-10 {
    width: 10%;
  }

  .col-15 {
    width: 15%;
  }

  .col-20 {
    width: 20%;
  }

  .col-25 {
    width: 25%;
  }

  .col-30 {
    width: 30%;
  }

  .col-35 {
    width: 35%;
  }

  .col-40 {
    width: 40%;
  }

  .col-45 {
    width: 45%;
  }

  .col-50 {
    width: 50%;
  }

  .col-55 {
    width: 55%;
  }

  .col-60 {
    width: 60%;
  }

  .col-65 {
    width: 65%;
  }

  .col-70 {
    width: 70%;
  }

  .col-75 {
    width: 75%;
  }

  .col-80 {
    width: 80%;
  }

  .col-85 {
    width: 85%;
  }

  .col-90 {
    width: 90%;
  }

  .col-95 {
    width: 95%;
  }

  .col-100 {
    width: 100%;
  }
  .loopCol(@n) when (@n >= 5) {
    .col-@{n} {
      width: (@n / 100 * 100%);
      flex: none;
      line-height: 30px;
    }
    .loopCol(@n - 5);
  }
  .loopCol(100);
}
```


```text 

```

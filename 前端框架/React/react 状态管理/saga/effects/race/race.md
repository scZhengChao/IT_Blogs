# race

## 目录

- [race({start,stop})](#racestartstop)

### race({start,stop})

```javascript 
function * recorder(){
    yield race({
        start:call(start),
        stop:take(types.STOP),
    })
}
```

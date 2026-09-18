# 链表队列

```javascript 
class Node {
    value;
    next;
    prev;
    instance;
    constructor(value) {
        this.value = value
    }
}
class  Queue {
    #head;
    #tail;
    #size;
    constructor() {
        this.clear()
    }
    enqueue(value){
        const node = new Node(value)
        node.prev= this.#tail
        node.instance = this
        if(this.#head){
            this.#tail.next = node;
            this.#tail = node
        }else{
            this.#head = node
            this.#tail = node
        }
        this.#size ++
        return node
    }
    dequeue(){
        const current = this.#head
        if(!current){
            return
        }
        current.instance = undefined
        this.#head = this.#head.next
        this.#size --
        return current.value
    }
    clear(){
        this.#tail = undefined;
        this.#head = undefined;
        this.#size = 0;
    }
    get size(){
        return this.#size
    }
    *[Symbol.iterator](){
        let current = this.#head
        while (current){
            yield current.value
            current = current.next
        }
    }
}
```

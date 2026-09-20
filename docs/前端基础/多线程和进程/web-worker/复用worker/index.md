# 复用worker

```typescript 
import cumstomWorker from './cumstom.worker.js'
enum WorkerStatusEnum {
    空闲,
    繁忙
}
interface WorkerPostData {
    type:string;
    payload:any;
}
interface WorkerNode extends Omit<Worker, 'addEventListener'> {
    id: Function;
    status:WorkerStatusEnum;
    addEventListener:Worker['addEventListener'] | null
}
class WorkerItem {
    public worker;
    public callback;
    constructor(worker:WorkerNode,callback:Function) {
        this.worker = worker;
        this.callback = callback;
    }
    public postMessage(data:WorkerPostData){
        if(this.worker.id === this.callback){
            if(data.type === 'start'){
                this.setWorkerStatus(WorkerStatusEnum.繁忙)
            }
            this.worker.postMessage(data)
        }
    }
    public setWorkerStatus(status:WorkerStatusEnum){
        this.worker.status = status
    }

}
class WorkerCreate {
    static instance:WorkerCreate;
    public cpus:number = Math.min(navigator.hardwareConcurrency || 6,6)
    private workerList: WorkerNode[] = [];
    constructor() {
        if(!WorkerCreate.instance){
            WorkerCreate.instance = this
        }
        return WorkerCreate.instance
    }
    public create = (callback:Function)=>{
        if(this.workerList.length > this.cpus){
            // 不在创建新的worker
            const worker = this.findIdle()
            if(worker){
                this.config(worker,callback)
                return new WorkerItem(worker,callback)
            }
            return
        }
        const worker = new cumstomWorker();
        this.workerList.push(worker);
        this.config(worker,callback);
        return new WorkerItem(worker,callback);
    }
    private findIdle(){
        return this.workerList.find(item=>item.status === WorkerStatusEnum.空闲)
    }
    private config(worker:WorkerNode,callback:Function){
        worker.status = WorkerStatusEnum.空闲;
        worker.id = callback;
        worker.addEventListener = null;
        worker.onmessage = (e:{data:{type:any}})=>{
            worker.status = WorkerStatusEnum.空闲;
            callback(e.data)
        }
        worker.onerror = ()=>{
            callback({type:'error'})
            this.close(worker)
        }
        worker.onmessageerror = ()=>{
            callback({type:'error2'})
            this.close(worker)
        }
    }
    private close(worker:WorkerNode){
        if(!worker) return
        worker.terminate();
        const index = this.workerList.findIndex(item=>item=== worker);
        if(index !== -1){
            this.workerList.splice(index,1)
        }
    }
    public closeAll(){
        const temp = this.workerList;
        this.workerList = [];
        temp.forEach(worker=>{
            this.close(worker)
        })
    }
}
const enhanceWorker = new WorkerCreate();
export default enhanceWorker
```

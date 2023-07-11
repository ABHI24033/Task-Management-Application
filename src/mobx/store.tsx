import axios from "axios";
import { types,onSnapshot,flow,getSnapshot } from "mobx-state-tree";
// import { title } from "process";

const tudo=types.model({
    title:types.string,
    description:types.string
})


const TaskModel=types.model('task',{
    id:types.number,
    // tudos:types.optional(types.array(tudo),[]),
    title:types.string,
    description:types.string,
    // action:types.boolean,

})
.actions((self)=>({
    setTitle(value:string){
        self.title=value
    },
    setDescription(value:string){
        self.description=value;
    },


    StoreTasks:flow(function* StoreTasks(){
        yield axios.post("https://64a91cf58b9afaf4844a41a4.mockapi.io/tasks",{
            id:self.id,
            title:self.title,
            description:self.description
        });
       
    }),
    GetStoredData:flow(function* GetStoredData(){
        var res=yield axios.get("https://64a91cf58b9afaf4844a41a4.mockapi.io/tasks");
        // console.log(res.data);
        return (res);
    }),
    afterCreate(){
       
        // onSnapshot(self,(Snapshot)=>{console.log("+==++++++++++++++++",Snapshot)})
        // console.log("After Created HHHHHHHHHHHHHHHHHHH")
    }

}))
.views((self)=>({
    // actions:{
        
    // }
}))


const tasks=TaskModel.create({
    id:12,
    title:'',
    description:'',

});



// tasks.GetStoredData();
// console.log('TUDO',getSnapshot(tasks))
export default tasks;
"use client"

import { createContext, useState, useContext } from "react";
// import axios from "axios";
import { useRouter } from 'next/navigation';
import { data } from "autoprefixer";


export type Task = {
    id: string;
    title: string;
    description: string;
    inprogress: boolean;
    completed: boolean;
    createdAt: Date;
}
// export type Edit={
//     title:string;
//     description:string;
// }

export type TaskContext = {
    tasks: Task[];
    IdEdit:string;
    titleEdit:string;
    descriptionEdit:string;
    handleAddTask: (title: string, description: string) => void;//call signature
    toggleTaskInProgress: (id: string) => void;
    DeleteTask: (id: string) => void;
    ToggleTaskComplted: (id: string) => void;
    EditTask:(id:string)=>void;
    handleUpdateTask:(title:string,description:string,id:string)=>void;
}


export const tasksContext = createContext<TaskContext | null>(null);

export const TaskProvider = ({ children }: { children: any }) => {
    const Router=useRouter();

    const [tasks, setTask] = useState<Task[]>(()=>{
        const TaskLocalStore=localStorage.getItem("tasks")||"[]";
        return JSON.parse(TaskLocalStore) as Task[];
    });
    const[titleEdit,setTitleEdit]=useState('');
    const[descriptionEdit,setdescriptionEdit]=useState('');
    const[IdEdit,setIdEdit]=useState('');

    const handleAddTask = (title: string, description: string) => {


        setTask((prev) => {
            const newTasks: Task[] = [
                {
                    id: Math.random().toString(),
                    title,
                    description,
                    inprogress: false,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
           
            Router.push("/");

            localStorage.setItem("tasks",JSON.stringify(newTasks));//store data in local storage
            return newTasks;
        })
    }
    // Task complted function
    const toggleTaskInProgress = (id: string) => {
        setTask((prev) => {
            const newTasks = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, inprogress: !task.inprogress }
                }
                return task;
            })
            localStorage.setItem("tasks",JSON.stringify(newTasks));
            return newTasks;
        })
    }

    const ToggleTaskComplted = (id: string) => {
        setTask((prev) => {
            const newTasks = prev.map((task) => {
                if (task.id === id) {
                    if (task.inprogress === true) {
                        return { ...task, completed: !task.completed }
                    }
                }
                return task;
            })
            localStorage.setItem("tasks",JSON.stringify(newTasks));
            return newTasks;
        })
    }



    //if task is deleted
    const DeleteTask = (id: string) => {
        setTask((prev) => {
            const newTasks = prev.filter((item) => item.id !== id);
            localStorage.setItem("tasks",JSON.stringify(newTasks));
            return newTasks;
        })
    }

    const EditTask=(id:string)=>{
        Router.push('/edittask');
        setTask((prev)=>{
            const total=prev;
            prev.filter((item)=>{
                if(item.id==id){
                    setTitleEdit(item.title);
                    setdescriptionEdit(item.description);
                    setIdEdit(item.id);
                }
            });
            return total;
    })
    }

    const handleUpdateTask=(title:string,description:string,id:string)=>{
         setTask((prev)=>{
        const total=prev;
           prev.filter((item)=>{
                if(item.id==id){
                    item.title=title;
                    item.description=description;
                }
            })
            localStorage.setItem("tasks",JSON.stringify(total));
            Router.push("/");
            return total;
        })
        
    }


    return (
        <tasksContext.Provider value={{ tasks, handleAddTask, toggleTaskInProgress, DeleteTask, ToggleTaskComplted,EditTask,titleEdit,descriptionEdit,IdEdit,handleUpdateTask }}>
            {children}
        </tasksContext.Provider>
    )


}



//context api
export function UseTasks() {
    const TaskContextValues = useContext(tasksContext);
    if (!TaskContextValues) {
        throw new Error("UseTasks used outside of provider")
    }
    return TaskContextValues;
}
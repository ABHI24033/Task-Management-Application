"use client"

import { ChangeEvent, useState } from 'react';
import { UseTasks } from '../Store/Taskstore';

import { useRouter } from 'next/router'
// import { UseTasks } from '../Store/Taskstore';
// import store from '../../mobx/store'
// import { observer } from 'mobx-react-lite';
// import { type } from 'os';
// import { string } from 'mobx-state-tree/dist/internal';
function addtask() {

  var initialtasks:
    {
      id: number,
      title: string,
      description: string
    } = {
    id: Math.floor(Math.random() * 1000),
    title: '',
    description: ''
  }

  const [task, setTask] = useState(initialtasks);

  // console.log(task);
  // const Router=useRouter();
  const handleChange = (event: any) => {
    setTask({ ...task, [event.target.name]: event.target.value })
    // console.log(task.);
  }

  //  const {handleAddTask}=UseTasks();
  const { handleAddTask } = UseTasks();

  const TaskAdd = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask(task.title, task.description);

  }
  return (
    <>
      <div className=" bg-blue-500 h-screen w-full flex justify-center flex-col items-center">
        <h1 className=" text-center border-b-2 text-3xl text-white mb-10">Add New Task</h1>

        <div className="w-[90%] md:w-[60%] bg-white h-[70vh] rounded flex flex-col px-7 py-4">

          <form onSubmit={TaskAdd} className='flex flex-col'>
            <input type="text" name="title"
              className=" border-gray-400 border-2 rounded-xl pl-4 h-12 outline-none my-1"
              placeholder="Enter title of task"
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
            /><br />

            <textarea name="description" id="description"
              placeholder="Detailed description of Task"
              className="border-gray-400 border-2 rounded-xl pl-4 h-[40vh] outline-none pt-2 "
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleChange(event)}
            ></textarea>

            
            <input type="submit" value="Add Task"
              // onClick={TaskAdd}
              className="bg-blue-600 w-[45%] md:w-[25%] h-12 text-base text-white rounded mx-auto mt-7 cursor-pointer "
            />
          </form>
        </div>


      </div>

    </>
  );
}

export default addtask;

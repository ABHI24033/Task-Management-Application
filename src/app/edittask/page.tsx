"use client"

import { ChangeEvent, useEffect, useState } from 'react';
import { UseTasks } from '../Store/Taskstore';
import { useRouter } from 'next/navigation'
function addtask() {

  var initialtasks:
    {
      // id: number,
      title: string,
      description: string
    } = {
    // id: Math.floor(Math.random() * 1000),
    title: '',
    description: ''
  }

  const [task, setTask] = useState(initialtasks);

  // console.log(task);
  const Router=useRouter();
  const handleChange = (event: any) => {
    setTask({ ...task, [event.target.name]: event.target.value })

  }
  const { handleUpdateTask,descriptionEdit,titleEdit,IdEdit } = UseTasks();
  // console.log(EditTask);
  // console.log(editTask.title);

  const TaskAdd = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handleAddTask(task.title, task.description);
    handleUpdateTask(task.title,task.description,IdEdit);

  }

  return (
    <>
      <div className=" bg-blue-600 h-screen w-full flex justify-center flex-col items-center">
        <h1 className="mb-10 text-center border-b-2 text-3xl text-white">Update Task</h1>

        <div className="w-[90%] md:w-[60%] bg-white h-[70vh] rounded flex flex-col p-7 ">

          <form onSubmit={TaskAdd} className='flex flex-col'>
            <input type="text" name="title"
            defaultValue={titleEdit}
              className=" border-gray-400 border-2 rounded-xl pl-4 h-12 outline-none"
              placeholder="Enter title of task"
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
            /><br />

            <textarea name="description" id="description"
            defaultValue={descriptionEdit}
              placeholder="Detailed description of Task"
              className="border-gray-400 border-2 rounded-xl pl-4 h-[40vh]    pt-2 outline-none "
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleChange(event)}
            ></textarea>

            {/* <button type='submit'
          className="bg-blue-600 w-[25%] h-12 text-base text-white rounded mx-auto mt-7"
          // onClick={TaskAdd}
          >Add Task</button> */}
            <input type="submit" value="Update"
              // onClick={TaskAdd}
              className="bg-blue-600 w-[45%] h-12 text-base text-white rounded mx-auto mt-7 cursor-pointer"
            />
          </form>
        </div>


      </div>

    </>
  );
}

export default addtask;

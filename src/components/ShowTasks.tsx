"use client"

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { UseTasks } from '@/app/Store/Taskstore';
import  Link  from 'next/link';
import {useSearchParams} from "next/navigation";

function ShowTasks() {

  const { tasks, toggleTaskInProgress, DeleteTask, ToggleTaskComplted,EditTask} = UseTasks();

  let filterTasks = tasks;

  const SearchParams=useSearchParams();
  const urlSearch=SearchParams.get('tasks');
  

// =============make filter tasks=================
  if(urlSearch=="to_do"){
    filterTasks=filterTasks.filter((tasks)=>!tasks.inprogress && !tasks.completed)
  }else if(urlSearch=="progress"){
    filterTasks=filterTasks.filter((tasks)=>tasks.inprogress)
  }else if(urlSearch=="completed"){
    filterTasks=filterTasks.filter((tasks)=>tasks.completed)
  }
  
  return (
    <div className="bg-white w-[90%] h-[75vh] mx-auto my-2  overflow-y-scroll">
      <div className="">
        <ul className="flex  static w-full h-[4rem] ">

          <Link href="/" className='w-full'>
          <li className={`py-4 text-center border-r bg-red-600 w-[100%] cursor-pointer text-white text-lg ${urlSearch==null?"bg-red-900":''}`}>All</li>
          </Link>

          <Link href='/?tasks=to_do' className='justify-between w-full'>
          <li className={`px-[10%] py-4 text-center border-r bg-red-600 w-[100%] sm:w-[100%] cursor-pointer text-white text-lg ${urlSearch=="to_do"?"bg-red-900":''}`}>To Do</li>

          </Link>
          <Link href='/?tasks=progress' className='justify-between w-full'>
          <li className={`px-[10%] py-4 text-center border-r bg-red-600 w-[100%] cursor-pointer text-white text-lg ${urlSearch=="progress"?"bg-red-900":''}`}>Progress</li>
          </Link>
          <Link href='/?tasks=completed' className='justify-between w-full'>
          <li className={` px-[10%] py-4 text-center  bg-red-600 w-[100%] cursor-pointer  text-white text-lg ${urlSearch=="completed"?"bg-red-900":''}`}>Completed</li>
          </Link>
          
        </ul>

        {/* List of Tasks */}


        <ul className=" w-full p-3 ">

          {filterTasks.map((items, index: number) => {
            return (
              <li className="border-b-2 pb-0 p-2 text-lg flex justify-between" key={index}>
                {/* <input type="checkbox" name="" id="" /> */}
                <div className=''>
                  <div className='flex gap-3'>
{/* ====================================Title of Task============================================================== */}
                    {
                      items.inprogress==false?<><input type="checkbox" name="" id={`task-${items.id}`} checked={items.inprogress} 
                      onChange={() =>{ toggleTaskInProgress(items.id)}} key={index}  />
                        <label htmlFor={`task-${items.id}`}>
                      <h2 className='font-bold'>{index + 1}.{items.title}</h2>
                    </label>
                      </>

                      :<>
                      <label htmlFor={`task-${items.id}`}>
                      <h2 className='font-bold'>{index + 1}.{items.title}</h2>
                    </label>

                    <input type="checkbox" name="" id={`task-${items.id}`} checked={items.completed} 
                    onChange={() =>{ ToggleTaskComplted(items.id),toggleTaskInProgress(items.id)}} key={index}  />

                      </>  
                    }
{/* ======================================================================================================================= */}

                  </div>

                  <p className='text-sm pl-6'>{items.description}</p>
                </div>

                <span className='flex gap-4'>
                  {
                    items.inprogress && (
                      <p className={`text-xs text-green-600 ${items.completed==true?"hidden":""}`} >progress</p>
                    )
                  }

                  {
                    items.completed && (
                      <p className=' text-xs text-red-600'>completed</p>
                    )
                  }
                  
                  <AiFillEdit className=' text-xl text-blue-600 cursor-pointer' onClick={()=>EditTask(items.id)} />
                  <AiFillDelete className='text-xl text-red-600 cursor-pointer mr-5' onClick={() => DeleteTask(items.id)} />
                </span>

              </li>
            )
          })}

        </ul>
      </div>

    </div>
  );
}

export default ShowTasks;

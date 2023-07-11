import ShowTasks from "./ShowTasks";
import Link from "next/link";

function Task() {
  return (
    <>
      <div className="flex flex-col justify-center align-middle ">
        <h1
          className="py-3 border-b-2 font-sans text-4xl text-center text-white">
          Task Management System
        </h1>


        <ShowTasks />

        <Link href='/addtask' className="bg-orange-600 hover:bg-red-700 text-white py-4 px-4 rounded w-[50%] 
        lg:w-[15%] 
        mx-auto text-center mt-3 ">
        <button className=" text-center">
          Add New Task
        </button>
        </Link>
        

      </div>
    </>
  );
}

export default Task;

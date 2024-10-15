import React, { useEffect, useState } from "react";
import ListTask from "../ListTask/ListTask";
import axios from "axios"
import { ReactSortable } from "react-sortablejs";
import EditAbleText from "../EditAbleText/EditAbleText";
const MainWorkSpace = () => {
    const elements = []; // Tạo một mảng để chứa các phần tử
    const [listTask, setListTasks] = useState([

    ]);
    const addListTask = () => {
        setListTasks((prevListTasks) => [
            ...prevListTasks,
            { id: prevListTasks.length + 1, titleName: "Doing" }
        ]);
    };
    useEffect(() => {
        const response = async () => {
            const result = await axios.get("https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask");
            setListTasks(result.data)
        }
        response();
    }, [])

    return (
        <div className=" h-[100%] p-10 bg-slate-400 flex ">

            <ReactSortable
                animation={150} // Thêm hiệu ứng khi kéo
                group="shared1"
                list={listTask}
                setList={setListTasks}
                className=" flex"
                on
            >
                {listTask.map((Task) => {
                    console.log(Task);
                    return (
                        <div className="w-[16vw] h-[30%] mx-[30px]">
                            <ListTask titleName={Task.title} idList={Task.id} className="">
                            </ListTask>
                        </div>
                    )
                })}


            </ReactSortable>


            {/* {listTask} */}
            <button onClick={addListTask} className="h-[30px] w-[10vw] mx-[30px] bg-black text-slate-100 p-auto font-medium	" ><p>Add another list</p> </button>
        </div>
    );
};

export default MainWorkSpace;

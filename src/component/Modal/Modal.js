import React, { useState, useEffect } from "react";
import eyeIcon from "./../../assets/eyeIcon.png"
import iconTopic from "./../../assets/IconTopic.png"
import Description from "./../../assets/Description.png"
import AttachFile from "./../../assets/AttachFileIcon.png"
import CheckIcon from "./../../assets/CheckIcon.png"
import axios from "axios";
const ModalTask = ({ idlist, titleList, task, closeModall }) => {
    const [titleList1, setTitleList1] = useState(titleList);
    const [titleTask1, setTitleTask1] = useState(task.nameTask);
    const [stateWatch, setSateWatch] = useState(task.notification);
    const [description, setDescription] = useState(task.description);
    const [idTask, setIdTask] = useState(task.id);
    const [isFocused, setIsFocused] = useState(false);
    const [date1, setDate] = useState(task.date)
    const [stateDeadLine, setStateDeadline] = useState(task.stateDeadline)
    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setIsFocused(false);
    }
    const handelChangeNameTask = () => { }
    const changeStateWatch = () => {
        if (stateWatch == "Watch") {
            setSateWatch("Watching");
        }
        else setSateWatch("Watch");
    }
    const handleStateDeadLine = () => {
        const deadline = new Date(date1);
        const currentDate = new Date();
        if (stateDeadLine !== "Complete") {
            if (deadline < currentDate) {
                setStateDeadline('OverDue');
            }
            else setStateDeadline('');
        }
    }
    const setDeadLine = (e) => {
        setDate(e.target.value);
    }
    const setColorStateDeadline = (e) => {
        if (stateDeadLine === "Complete") {
            return 'bg-green-500';
        }
        else if (stateDeadLine === "OverDue") {
            return 'bg-red-700';
        }
        return 'bg-gray-600';
    }

    const updateTask = async () => {
        try {
            await axios.put(`https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask/${idlist}/Task/${idTask}`, {
                date: date1,
                stateDeadline: stateDeadLine,
                fileAttach: "Steel", // Giá trị này đang là cứng, bạn có thể thay thế bằng state tương ứng nếu cần.
                notification: stateWatch,
                description: description,
                nameTask: titleTask1,
            });
            closeModall();
        } catch (error) {
            console.error("Cập nhật task thất bại", error);
        }
    };

    useEffect(() => {
        console.log("task", task);
    }, []);

    useEffect(() => {

        if (stateDeadLine !== "Complete") {
            console.log(stateDeadLine);
            const intervalId = setInterval(() => {
                handleStateDeadLine();
            }, 1000); // Gọi hàm mỗi 5 giây (5000ms)
            return () => clearInterval(intervalId);
        }

    },); // Mảng phụ thuộc trống để chỉ gọi khi component mount

    return (
        <div className="text-gray-300 w-[100%] flex" >
            <div className="w-[80%]">

                <div >
                    <div className="flex items-center h-[40px]">
                        <img src={iconTopic} className="w-[30px] mr-[20px]"></img>
                        <p className="text-xl font-bold">{titleTask1}</p>
                    </div>
                    <div className="flex ml-[50px] p-[2px] mt-[10px] items-center">
                        <p className="">in list</p>
                        <p className="ml-[12px] p-[5px]  px-[10px] text-sm rounded-md bg-gray-600 font-bold  "> {titleList1.toUpperCase()}</p>
                        {/* Hiển thị CheckIcon khi stateWatch là "Watching" */}
                        {stateWatch === "Watching" && (
                            <img src={eyeIcon} alt="Watch icon" className="object-contain w-[20px] ml-[20px] " />
                        )}

                    </div>
                </div>
                <div className="flex mt-[30px] ml-[50px]">
                    <div className="flex">
                        <div className="mr-[40px] w-[180px]">
                            <p className="text-sm font-bold"> Notifications</p>
                            <div className="flex items-center">

                                <button className="bg-gray-600 rounded-md px-[20px] max-w-[200px] p-[5px] font-bold flex" onClick={changeStateWatch}>
                                    <img src={eyeIcon} alt="Watch icon" className="w-[20px] text-lg	 m-auto mr-[20px] h-auto " /> {stateWatch}
                                    {/* Hiển thị CheckIcon khi stateWatch là "Watching" */}
                                    {stateWatch === "Watching" && (
                                        <img src={CheckIcon} className="w-[25px] ml-[20px]" alt="Check icon" />
                                    )}
                                </button>

                            </div>
                        </div>
                        <div >
                            <p className="text-sm font-bold">Due date</p>
                            <div className="flex h-[28px]">
                                <input type="checkbox" onChange={(e) => setStateDeadline(e.target.checked ? 'Complete' : '')} className="m-auto w-[20px] h-[100%] mr-[5px] bg-gray-600 rounded-md"></input>
                                <div className="flex items-center h-[100%] " >
                                    <input onChange={setDeadLine} type="date" className="font-bold bg-gray-600 h-[100%] " value={date1}></input>
                                    {console.log("abc", stateDeadLine)}
                                    <p className={`p-[2px] ml-[10px] rounded-md p-[3px]  ${setColorStateDeadline()} h-[100%]`}>{stateDeadLine}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="flex items-center h-[40px] mt-[40px]">
                    <img src={Description} className="w-[30px] mr-[20px]"></img>
                    <p className="text-xl font-bold">Description</p>

                </div>
                <div className=" ml-[50px] p-[2px] mt-[10px] ">
                    <input className="bg-gray-600 w-[100%] p-[10px] font-bold rounded-md min-h-[60px]" onChange={(e) => { setDescription(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} placeholder="Add a detailed description ..." value={description} ></input>
                    {isFocused && <div className="grid place-items-end">
                        <div className="mt-[10px] font-bold ">
                            <button className=" mr-[20px] bg-cyan-400 rounded-md p-[5px]"> Save </button>
                            <button className=" " onClick={handleBlur}> Cancel</button>
                        </div>

                    </div>
                    }



                </div>
                <div className=" mt-[30px]">
                    <div className="flex items-center h-[40px] mt-[40px] ">
                        <img src={AttachFile} className="w-[30px] mr-[20px]"></img>
                        <p className="text-xl font-bold">Attach File</p>

                    </div>
                    <div className="flex ml-[50px] p-[2px] mt-[10px] items-center">
                        <input type="file" className="bg-gray-600 w-[40%] p-[10px] font-bold rounded-md min-h-[60px]" placeholder="Add a detailed description ..." ></input>

                    </div>
                </div>

            </div>
            <div className="w-[20%] text-right">
                <button onClick={closeModall} className="bg-gray-600 p-auto px-[10px] font-bold rounded-md h-[50px]"> Close</button>
                <button onClick={updateTask} className="bg-gray-600 p-auto px-[10px] font-bold rounded-md h-[50px]"> Save</button>

            </div>



        </div >
    )
}
export default ModalTask;
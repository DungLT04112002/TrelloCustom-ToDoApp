import React, { useEffect, useState } from "react";
import ListTask from "../ListTask/ListTask";
import axios from "axios"
import { ReactSortable } from "react-sortablejs";
import ImgBackground from './../../assets/BackgroudImg.jpg'
const MainWorkSpace = () => {
    const elements = []; // Tạo một mảng để chứa các phần tử
    const [listTask, setListTasks] = useState([

    ]);
    const [newListTitle, setNewListTitle] = useState(""); // State cho tiêu đề mới

    // Hàm thêm một danh sách mới và gửi POST request lên server
    const addListTask = async () => {
        if (newListTitle.trim() === "") {
            alert("Title cannot be empty"); // Kiểm tra nếu tiêu đề trống
            return;
        }

        const newTaskList = {
            title: newListTitle, // Lấy tiêu đề từ input
        };

        try {
            // Gửi POST request để thêm danh sách mới
            const response = await axios.post("https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask", newTaskList);

            // Nếu thành công, thêm danh sách vào state
            setListTasks((prevListTasks) => [...prevListTasks, response.data]);

            // Xóa input sau khi thêm
            setNewListTitle("");
        } catch (error) {
            console.error("Error adding new list:", error);
            alert("Failed to add new list.");
        }
    };
    const response = async () => {
        const result = await axios.get("https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask");
        setListTasks(result.data)
    }
    useEffect(() => {
        response();
    }, [])

    return (
        <div className=" h-[100%] flex ">
            <div
                className="h-[100%] w-[100%] p-10  overflow-x-auto flex"
                style={{
                    backgroundImage: `url(${ImgBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // filter: 'blur(8px)', // Điều chỉnh độ mờ của nền
                }}
            >

                <ReactSortable
                    animation={150} // Thêm hiệu ứng khi kéo
                    group="shared1"
                    list={listTask}
                    setList={setListTasks}
                    className="flex " // Đưa ReactSortable lên trên nền mờ
                >
                    {listTask.map((Task) => (
                        <div key={Task.id} className="w-[16vw] h-[30%] mx-[30px]">
                            <ListTask titleName={Task.title} updateListTask={response} idList={Task.id} />
                        </div>
                    ))}
                </ReactSortable>

                <div className="flex flex-col mx-[30px] "> {/* Đảm bảo nằm trên nền mờ */}
                    {/* Input cho tiêu đề */}
                    <input
                        type="text"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)} // Cập nhật tiêu đề
                        placeholder="Enter list title"
                        className="mb-2 p-2 rounded-md bg-slate-600 border border-gray-300"
                    />
                    <button
                        onClick={addListTask}
                        className="h-[30px] rounded-md w-[10vw] bg-black text-slate-100 font-medium"
                    >
                        <p>Add another list</p>
                    </button>
                </div>
            </div >
        </div>
    );
};

export default MainWorkSpace;

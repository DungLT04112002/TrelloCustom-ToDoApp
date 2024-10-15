import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ModalTask from "../Modal/Modal";
import EditAbleText from "../EditAbleText/EditAbleText";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import iconCancel from './../../assets/IconCancel.png'
const ListTask = ({ titleName, idList }) => {

    const [titleList, setTitleList] = useState(titleName);
    const [isChangeTitleList, setIsChangeTitleList] = useState(false);
    const [currTask, setCurrTask] = useState({});
    const [addTaskIsOpen, setAddTaskIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nameNewTask, setNameNewTask] = useState('')
    const openModal = (task) => {
        setModalIsOpen(true);
        setCurrTask(task);
        console.log("task:", task);
    }
    const closeModal = () => setModalIsOpen(false);
    const handelUpdateIdTask = (evt) => {
        console.log("hello", evt)
    }
    // Update nameList

    useEffect(() => {
        const updateTilteList = async () => {
            const updateTilteListTask = await axios.put(`https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask/${idList}`, {
                title: titleList
            });
        }
        if (isChangeTitleList) {
            updateTilteList();
            setIsChangeTitleList(false);
        }

    }, [titleList]);

    // Add new Task
    const addNewTask = async () => {
        const createNewTask = await axios.post(`https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask/${idList}/Task`, {

            date: '',
            stateDeadline: "",
            fileAttach: "",
            notification: "Watch",
            description: "",
            nameTask: nameNewTask,
            ListTaskId: idList,

        })
        setAddTaskIsOpen(false);
    }
    useEffect(() => {

    }, [titleList])
    const handleAddTask = () => {
        setAddTaskIsOpen(true);
    }
    const handleCanleAddTask = () => {
        setAddTaskIsOpen(false);
    }
    //Update new task in List
    useEffect(() => {
        const updateAllTasks = async () => {
            try {
                // Tạo các request PUT chỉ cho các task có ListTaskId khác idList
                const updateRequests = tasks
                    .filter(task => task.ListTaskId !== idList) // Lọc các task có ListTaskId khác idList
                    .map(task => {
                        return axios.put(`https://670a8197ac6860a6c2c9b555.mockapi.io/Task/${task.id}`, {
                            ...task,
                            ListTaskId: idList // Cập nhật ListTaskId của task bằng idList hiện tại
                        });
                    });

                // Gọi tất cả các request PUT cùng lúc
                if (updateRequests.length > 0) { // Kiểm tra nếu có yêu cầu nào để gửi
                    await Promise.all(updateRequests);
                    console.log("Các task đã được cập nhật với ListTaskId:", idList);
                } else {
                    console.log("Không có task nào cần cập nhật.");
                }
            } catch (error) {
                console.error("Error updating tasks:", error);
            }
        };

        // Kiểm tra nếu có task thì mới gọi updateAllTasks
        if (tasks.length > 0) {
            updateAllTasks();
        }
    }, [tasks, idList]); // Chạy lại khi tasks hoặc idList thay đổi

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const result = await axios.get(`https://670a8197ac6860a6c2c9b555.mockapi.io/ListTask/${idList}/Task`);
                setTasks(result.data); // Lấy dữ liệu từ result.data
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [])
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            width: '45%',
            height: '80%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(55 , 65, 81)',
            border: 'none',
            borderRadius: '1%'
        },
        overlay: {
            backgroundColor: 'rgba(1, 1, 1, 0.5)'
        },
    };

    const addTask = () => {
        // setTasks((preTasks) => [
        //     ...preTasks, { title: "hello" }
        // ]);
    };
    return (
        <div className="w-[100%] rounded-md bg-black px-[15px] py-[10px]	">

            <p className="text-slate-100 m-auto font-bold text-lg mb-[15px]">
                <EditAbleText text1={titleList} setIsChangeTitleList={setIsChangeTitleList} setText1={setTitleList}></EditAbleText>
            </p>

            <ReactSortable
                group="shared"
                list={tasks}
                setList={setTasks}
                animation={150}
                onEnd={handelUpdateIdTask}
                className="w-[100%]"
            >

                {tasks.map((task, index) => {
                    return (
                        <button
                            key={index} // Đừng quên thêm key cho phần tử trong map
                            className="w-[100%] rounded-md bg-slate-500 min-h-[50px] mb-[5px] h-[100%] border border-transparent border-4 hover:border-gray-50"
                            onClick={() => openModal(task)} // Sửa lại onClick
                        >
                            <p className="">{task.nameTask}</p>
                        </button>
                    );
                })}

            </ReactSortable>

            <div className=" w-[100%]">
                {
                    !addTaskIsOpen &&
                    <button onClick={handleAddTask} className="h-[40px] w-[100%] ">
                        <div >
                            <div class="flex flex-row">
                                <div class="basis-1/4"> <FontAwesomeIcon style={{ color: "#d6d1d5", }} className="m-auto mx-[5px]  " icon={faPlus} />
                                </div>
                                <p className="text-slate-100 font-bold">Add a Card</p>
                            </div>
                        </div>
                    </button>
                }

                {addTaskIsOpen &&
                    <div>
                        <input onChange={(e) => setNameNewTask(e.target.value)} placeholder="Enter a tilte or paste a link" className="m-5px w-[100%] min-h-[50px]  mb-[10px] rounded-md bg-slate-300 border border-transparent border-4 hover:border-gray-50 placeholder:text-slate-900" />
                        <div className="flex justify-end ">
                            <button className="rounded-md font-semibold p-[2px] mr-[10px] bg-sky-500	" onClick={addNewTask}> Add Card </button>
                            <button className="rounded-md p-[2px] bg-slate-500	" onClick={handleCanleAddTask}> <img className=" h-[30px]" src={iconCancel}></img> </button>
                        </div>
                    </div>
                }
            </div  >

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <ModalTask titleList={titleList} idlist={idList} task={currTask} closeModall={closeModal}></ModalTask>
                </Modal>
            </div>

        </div >
    )
}
export default ListTask;
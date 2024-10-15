import React from "react";
import TaskBash from "../TaskBash/TaskBash";
import MainWorkSpace from "../MainWorkSpace/MainWorkSpace";
const Body = () => {
    return (
        <div className="w-[100vw] h-[92vh] flex">
            <div className="w-[14%] h-[100%] bg-slate-800">
                <TaskBash></TaskBash>
            </div>
            <div className="min-w-[86%] h-[100%] overflow-x-auto" >
                <MainWorkSpace>

                </MainWorkSpace>
            </div>
        </div>


    )
}
export default Body;
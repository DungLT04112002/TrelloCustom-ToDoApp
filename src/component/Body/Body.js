import React from "react";
import TaskBash from "../TaskBash/TaskBash";
import MainWorkSpace from "../MainWorkSpace/MainWorkSpace";
const Body = () => {
    return (
        <div className=" h-[92vh] flex">
            <div className="w-[14vw] h-[100%] bg-slate-800">
                <TaskBash></TaskBash>
            </div>
            <div className="h-[100%] min-w-[86vw] overflow-x-auto" >
                <MainWorkSpace>

                </MainWorkSpace>
            </div>
        </div>


    )
}
export default Body;
import React from "react"
import logoCat from "./../../assets/logoCat.png"
const Header = () => {
    return (
        <div className="w-[100vw] h-[8vh] bg-slate-950 flex	" >
            <div className="w-[18%] flex mx-4">
                <img className="w-auto h-[80%] mr-6" src={logoCat}></img>
                <p className="text-white font-bold my-auto"> To Do App</p>
            </div>
            <div className="w-[60%]">

            </div>
            <div className="w-[20%]">

            </div>
        </div>
    )
}
export default Header
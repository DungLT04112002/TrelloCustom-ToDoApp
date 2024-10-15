import React, { useState } from "react";
const EditAbleText = ({ text1, setText1, setIsChangeTitleList }) => {
    const [text, setText] = useState(text1);
    const [ableEditText, setAbleEditText] = useState(true);
    const handelDoubleClick = () => {
        setAbleEditText(false);
    }
    const handleBlur = () => {
        setAbleEditText(true);
        setIsChangeTitleList(true);
        setText1(text);
    }
    const handelKeyDown = (e) => {
        if (e.key === "Enter") {
            setAbleEditText(true);
            setIsChangeTitleList(true);
            setText(text);
        }
    }
    const OnchangeText = (e) => {
        setText(e.target.value);
    }

    return (
        <div> {
            ableEditText ? <button onDoubleClick={handelDoubleClick}>
                {text1}
            </button>
                :
                <input className="rounded-md bg-slate-500" value={text} onChange={OnchangeText} onKeyDown={handelKeyDown} onBlur={handleBlur}>

                </input>
        }
        </div >
    )

}
export default EditAbleText;
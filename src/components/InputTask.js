import React from "react";

export default function InputTask(props) {
    // console.log(props)
    return (
            <label className="input-to-do-label">
                <input 
                className="input-to-do" 
                placeholder="Add to-do here" 
                value={props.newItem.title} 
                onChange={props.handleUpdateTask}
                />  {/*controlled inputs*/}
                
                {/* trim() removes any white spaces from the start and end of the string and returns a new string, without modifying the original string... */}
                {props.newItem.title.trim() && <div className="add-btn" onClick={props.handleAddItem}>
                    <h1>+</h1>
                </div>}
                
            </label>
        )
}
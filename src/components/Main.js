// import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Main(props) {
    const toDosArray = props.toDos;
    // console.log(props);
    // console.log(toDosArray)
    return (
        toDosArray.map((task) => {
            // console.log(task);
            const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            const amPm = task.currentHours < 12 ? 'AM' : 'PM';
            task.currentMinutes = (task.currentMinutes < 10) ? (parseInt('0' + task.currentMinutes)) : task.currentMinutes;     // parseInt() used to convert the whole string to number including concatinated '0' so that every re-render doesn't concat new '0' to the current minutes...

            const currentTime = `${task.currentHours % 12}:${task.currentMinutes} ${amPm}`;
            
            const currentDate = `${monthArr[task.currentMonth]} ${task.currentDate}, ${task.currentYear}`;

            return (
            <div className="task">
                <ul>
                    <li key={task.id}>
                        <label className="task-flex">
                            <input 
                            type="checkbox" className="checkbox"
                            checked = {task.isCompleted}
                            onChange = {(e) => props.handleCheckboxChange(task.id, e.target.checked)} // onChange props of input element only accepts function as an argument so enclosed inside an arrow function...
                            />
                            <div className= "task-body">
                                <h3 className={task.isCompleted ?"task-title accomplished" : "task-title"}>{task.title}</h3>
                                <p className="extra-info">
                                    <span>{currentTime}</span>, <span>{currentDate}</span>
                                </p>
                            </div>
                                <FontAwesomeIcon className="delete-btn" icon={faTrash} onClick={()=> props.handleDeletion(task.id)}/>
                        </label>
                    </li>
                </ul>
            </div>
            )
        })
    )
}
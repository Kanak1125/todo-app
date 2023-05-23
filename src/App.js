import './index.css';
import React from 'react';
import Header from "./components/Header";
import InputTask from "./components/InputTask";
import TaskStatus from "./components/TaskStatus";
import Main from "./components/Main";

export default function App() {
    let [newItem, setNewItem] = React.useState({
        id: crypto.randomUUID(),       // returns random UUID only applicable for HTTPS...
        title: "",
        currentHours: "",
        currentMinutes: "",
        currentDate: "",
        currentMonth: "",
        currentYear: "",
        isCompleted: false
    });
    const [toDos, setToDos] = React.useState(JSON.parse(localStorage.getItem('toDos')) || []);   // state of to-dos is array of objects stored in the local storage... // retreiving data from the localStorage of [] if there is no data in the localStorage...;

    React.useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos]);    // useEffect() hook in React is fired everytime when the 'toDos' state is updated...

    // function to keep track of input value...
    function updateTask(event) {
        const dateObj = new Date();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const date = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();

        const {value, checked} = event.target;   // destructuring the value from event.target...
        setNewItem({
            id: crypto.randomUUID(),
            title: value,
            currentHours: hour,
            currentMinutes: minute,
            currentDate: date,
            currentMonth: month,
            currentYear: year,
            isCompleted: checked
        });        
    }

    function updateCheckBox(id, isCompleted) {
        // can be needed in the future...
        // const {value, type, checked} = event.target;
        setToDos(prevToDos => {
            return prevToDos.map(todo => {
                if(todo.id === id) {
                    return {...todo, isCompleted}
                }
                return todo;
            })
        });
    }
    // console.log(countCompletedTask)

    // function to delete Todo using filter method()...
    function deleteTodo(id) {
        setToDos(prevToDos => {
            // return prevToDos == [] ? prevToDos : prevToDos.filter(todo => todo.id !== id);
            return prevToDos.filter(todo => todo.id !== id);
        })
    }

    // function invoked when the add-btn is clicked...
    function addItem() {
        setToDos(prevTodos => {
                    return [...prevTodos, newItem]; // when the newItem is added the toDos is set to the array with the newItem...
                })
        setNewItem({
            id: crypto.randomUUID(),
            title: "",
            currentHours: "",
            currentMinutes: "",
            currentDate: "",
            currentMonth: "",
            currentYear: "",
            isCompleted: false
        });
    }

    // console.log(toDos)
    return (
        <div className="container">
            <Header />
            <InputTask 
                newItem = {newItem}
                handleUpdateTask = {updateTask} // passing functions to the <InputTask> component as arguments...
                handleAddItem = {addItem}
            />
            <TaskStatus 
                completedTask = {toDos.filter(toDo => {
                    if(toDo.isCompleted) return toDo;
                    return 0;
                }).length}  // filter out the items in toDos array that are checked(i.e. isCompleted === true);
                totalTasks = {toDos.length}
            />
            <Main 
                toDos = {toDos}
                handleCheckboxChange = {(id, isCompleted) => updateCheckBox(id, isCompleted)}
                handleDeletion = {(id) => deleteTodo(id)}
            />
        </div>
    )
}
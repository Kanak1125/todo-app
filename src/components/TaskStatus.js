export default function TaskStatus(props) {
    return (
        <div className="task-heading task-flex">
            <div>
                <div className="progress"></div>
            </div>
            <div className="task-info">
                <h2>My Tasks</h2>
                <p className="extra-info">
                    <span>{props.completedTask}</span> of <span>{props.totalTasks}</span> tasks
                    <span className="completed"> completed</span>
                </p>
                <hr />
            </div>
        </div>
    )
}
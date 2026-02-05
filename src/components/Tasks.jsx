import { ChevronRightIcon, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Tasks({tasks, onTaskClick, excludeTask}) {

    const navigate = useNavigate()

    function seeDetails(task) {
        const query = new URLSearchParams()
        query.set("title", task.title)
        query.set("description", task.description)
        query.set("prazo", task.prazo)
        navigate(`/task-details?${query.toString()}`)
    }

    return(
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow backdrop-blur-lg mt-4">
            <ul>
                <h1>{tasks.map((task) => (
                    <li key={task.id} className="flex">
                        <button onClick={ () => onTaskClick(task.id)} 
                        className={`bg-slate-400 text-white text-left p-2 font-semibold rounded-md m-2 w-full 
                        ${task.isCompleted && 'line-through bg-green-600'} ${task.isLate && 'bg-red-400'}`}>
                            {task.title}
                        </button>
                        <button onClick={() => seeDetails(task)} className={`bg-slate-400 rounded-md text-white p-2 mb-2 mt-2
                         ${task.isCompleted && 'line-through bg-green-600'} ${task.isLate && 'bg-red-400'}`}>
                            <ChevronRightIcon />
                        </button>
                        <button onClick={ () => excludeTask(task.id)} 
                        className={`bg-slate-400 rounded-md text-white p-2 m-2
                         ${task.isCompleted && 'line-through bg-green-600'} ${task.isLate && 'bg-red-400'}`}>
                            <Trash/>
                        </button>
                    </li>
                    ))}
                </h1>
            </ul>
        </div>
    )
}

export default Tasks
import Tasks from './components/Tasks'
import AddTaskForm from './components/AddTaskForm'
import VideoOverlay from './components/VideoOverlay'
import { useEffect, useState } from 'react'
import {v4} from 'uuid'
import surpriseVideo from './assets/surpriseVideo.mp4'

function App(){
  const[tasks, setTasks] = useState (
    JSON.parse(localStorage.getItem("tasks")) || []
  )

  const [videoVisible, setVideoVisible] = useState(false)
  const [videoSrc, setVideoSrc] = useState("")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
      async function fetchTasks() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
          method: 'GET'
        })
        const data = await response.json()

        setTasks(data)

      }
      // fetchTasks()
  }, [])

  useEffect(() => {
    function verifyIfTaskIsOverdue() {
      const updatedTasks = tasks.map(task => {
        if (!task.prazo) return task

        const taskDate = new Date(task.prazo)
        if (isNaN(taskDate.getTime())) return task // invalid date

        const currentTime = Date.now()
        const taskTime = taskDate.getTime()

        if (task.isCompleted && task.isLate) return { ...task, isLate: false }

        if (!task.isCompleted && currentTime > taskTime+86400000 && !task.isLate) {
          return { ...task, isLate: true }
        }

        return task
      })

      const changed = updatedTasks.some((t, i) => t.isLate !== tasks[i]?.isLate)
      if (changed) setTasks(updatedTasks)
    }

    verifyIfTaskIsOverdue()
  }, [tasks])


  const onTaskClick = (taskId) => {
    const newTask = tasks.map(task => {
      if (task.id == taskId){
        return {...task, isCompleted: !task.isCompleted}
      }
      
      return task
    })
    setTasks(newTask)
  }

  const excludeTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasks(newTasks)
  }

  const addTask = (title, description, prazo) => {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      prazo: prazo,
      isCompleted: false,
      data: new Date().toLocaleDateString(),
      isLate: false
    }
       setTasks([...tasks, newTask])

       if (prazo === '2026-02-07') {
         setVideoSrc(surpriseVideo)
         setVideoVisible(true)
       }
  }

  return(
    <div className='w-screen h-screen bg-gradient-to-t from-slate-500 to-slate-400 flex justify-center'>
      <VideoOverlay visible={videoVisible} src={videoSrc} onClose={() => setVideoVisible(false)} />
      <div className='w-[500px]'>
           <h1 className='text-3xl text-slate-100 font-bold text-center'>Task Manager</h1>
           <AddTaskForm addTask={addTask} />
           <Tasks tasks={tasks} 
           onTaskClick={onTaskClick}
           excludeTask={excludeTask}
           addTask={addTask}/>
      </div>
    </div>
  )
   
}

export default App
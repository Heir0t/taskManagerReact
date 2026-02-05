import { useState } from "react"
import Input from "./Input"

function AddTaskForm({addTask}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prazo, setPrazo] = useState("")

    return (
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow mt-4 flex flex-col">
            <Input placeholder="Titulo" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Input placeholder="Descrição" value={description} onChange={(event) => setDescription(event.target.value)} />
            <Input type="date" value={prazo} onChange={(event) => setPrazo(event.target.value)} />
            
            <button onClick={() => { 
                if(!title.trim() || !description.trim() || !prazo.trim()){
                    return window.alert("Você deve informar um titulo, descrição e prazo válidos")
                } else {
                    addTask(title, description, prazo)
                    setTitle("")
                    setDescription("")
                    setPrazo("")
                }
            }}
            className="bg-slate-400 rounded-md text-white p-2 font-semibold"
            >
                Adicionar
            </button>
        </div>
    )
}   

export default AddTaskForm
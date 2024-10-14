import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import { v4 as uuidV4 }  from "uuid"

import { categorias } from "../data/categorias"
import { Activity } from "../type/Index"
import { activityActions, ActivityState} from "../reducers/activity-reduce"


type FormProps ={
    dispatch: Dispatch<activityActions>,
    state: ActivityState
}

export default function Forms({dispatch, state}: FormProps){

    const InitialState: Activity = { 
        id: uuidV4(), 
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(InitialState)

    useEffect(() =>{
        if(state.activeID){
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeID)[0]

            setActivity(selectActivity)
        }
    }, [state.activeID])

    const HandlerChangeAccion = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) =>{

        //const isnumbertField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
             [e.target.id]: e.target.value
            //[e.target.id]: isnumbertField?  + e.target.value : e.target.value})
        })
          
    }
    const isvalidActivity = () =>{
        const {name, calories} = activity

        return name.trim() !== '' && calories > 0
   }

    const handleButtonClick =(e: FormEvent<HTMLFormElement>) =>{
       
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity : activity}})

        setShowAlert(true);
       // se esta reset
        setActivity({
            ...InitialState,
             id: uuidV4()
        })

        setTimeout(() => {
            setShowAlert(false)
        }, 3000);

    }
    
    const [showAlert, setShowAlert] = useState(false);
    
   

    return(
        <form className="space-y-5 bg-white shadow p-10 rounded-xl shadow-lg" onSubmit={handleButtonClick}>

            <div className="grid grid-cols-1  gap-3">

                <label htmlFor="category" className="font-bold">Categoria</label>
                <select id="category" className=" border border-slate-300 p-2 rounded-lg w-full
                 bg-slate-200"
                  value={activity.category}
                  onChange={HandlerChangeAccion}
                  >

                    {categorias.map(category =>(
                        <option key={category.id} 
                               value={category.id}
                                //className="bg-lime-400"
                         >
                            {category.name}
                        </option>
                    )) }
                </select>
            </div>

            <div className="grid grid-cols-1  gap-3">
                <label htmlFor="name" className="font-bold">Actividad</label>

                <input id="name"
                    type="text"
                    placeholder="Registrar" 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-slate-200"
                    value={activity.name}
                    onChange={HandlerChangeAccion}
                    />
            </div>

            <div className="grid grid-cols-1  gap-3">
                <label htmlFor="calories" className="font-bold">Calorias</label>

                <input id="calories"
                    type="number"
                    placeholder="Registra las calorias de tus accines" 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-slate-200"
                    value={activity.calories}
                    onChange={HandlerChangeAccion}
                    />
            </div>

            <input
                type="submit" 
                className=" bg-lime-500  hover:bg-orange-600 w-full p-2 font-bold uppercase
                 text-white rounded-lg 
                    cursor-pointer  disabled:opacity-10 disabled:hover:bg-lime-500" 
                  value={activity.category > 3 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                  disabled={!isvalidActivity()}
                  //onClick={handleButtonClick}
                
                
           />

           {showAlert && (
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                  <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p className="font-bold"> Registro Éxitoso</p>
                    <p className="text-sm">Se realizaron los cambios solicitados.</p>
                  </div>
                </div>
              </div> 
            )}
        </form>
    )
}
import { useEffect, useMemo, useReducer } from "react"
import { Fragment } from "react/jsx-runtime"
import Forms from "./components/Forms"
import { activityReducer, initialState } from "./reducers/activity-reduce"
import ActivityList from "./components/ActivityList"
import CaloriesTracker from "./components/CaloriesTracker"



function App() {

  const [state, dispatch]= useReducer(activityReducer, initialState)

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  
  return (
    <Fragment>
     <header className="bg-lime-700 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de calorias 
        </h1>

        <button
          className="bg-gray-700 hover:bg-red-950 p-2 font-bold uppercase text-white 
                      cursor-pointer rounded-lg text-sm disabled:opacity-10"
          disabled={!canRestartApp()}
          onClick={() => dispatch({type: "restart-app"})}
       >
          Reiniciar Aplicación
        </button>
      </div>
     </header>

     <section className="bg-lime-500 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <Forms
            dispatch ={dispatch}
            state = {state}
          />
        </div>
     </section>

     <section className="bg-gray-800 py-5">
      <div className="max-w-4xl mx-auto">
          <CaloriesTracker
            activities={state.activities}
          />
      </div>
     </section>
     
    <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispach={dispatch}
        />
   </section>
    </Fragment>
    
  )
}

export default App

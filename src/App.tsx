import { useEffect, useReducer } from "react"
import { Fragment } from "react/jsx-runtime"
import Forms from "./components/Forms"
import { activityReducer, initialState } from "./reducers/activity-reduce"
import ActivityList from "./components/ActivityList"



function App() {

  const [state, dispatch]= useReducer(activityReducer, initialState)

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])
  
  return (
    <Fragment>
     <header className="bg-lime-700 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de calorias 
        </h1>
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

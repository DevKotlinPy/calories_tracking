import { Fragment } from "react/jsx-runtime"
import Forms from "./components/Forms"


function App() {
  
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
        <div className="max-w-3xl mx-auto">
          <Forms>

          </Forms>
        </div>
     </section>
     
    </Fragment>
    
  )
}

export default App

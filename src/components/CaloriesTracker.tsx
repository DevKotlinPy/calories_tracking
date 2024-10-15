import { Fragment } from 'react/jsx-runtime'
import { Activity } from '../type/Index'
import { useMemo } from 'react'
import CaloriesDisplay from './CaloriesDisplay'


type CaloriesTrackertProps = {
    activities: Activity[]
}

export default function CaloriesTracker({activities}: CaloriesTrackertProps) { 

    //contador de comida

    const caloriesConsumed = 
            useMemo(
                () => activities.reduce(
                    (total, activity) => activity.category < 5 ? total + +activity.calories : total, 0 )
                , [activities]
            )

    const caloriesQuemadas = 
            useMemo(
                () => activities.reduce(
                    (total, activity) => activity.category > 4 ? total + +activity.calories : total, 0 )
                , [activities]
            )

    const caloriesTotal =
            useMemo(() => caloriesConsumed- caloriesQuemadas ,[activities])

  return (
    <Fragment>
        <h2 className='text-4xl font-black text-white text-center font-serif'>
            Resumen de calorias
        </h2>

        <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 my-5'>
           <CaloriesDisplay
                calories={caloriesConsumed}
                titulo='Consumidas'
           />
           <CaloriesDisplay
                calories={caloriesQuemadas}
                titulo='Quemadas'
           />

           <CaloriesDisplay
                calories={caloriesTotal}
                titulo='Balance'
           />
            
        </div>
       
    
    </Fragment>
  )
}


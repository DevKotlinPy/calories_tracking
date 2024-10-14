
import { useMemo, Dispatch } from 'react'
import { Activity } from '../type/Index'
import {  categorias } from '../data/categorias'
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { activityActions } from '../reducers/activity-reduce'



type ActivityListProps ={
    activities: Activity[],
    dispach: Dispatch<activityActions>
}

export default function ActivityList( {activities, dispach}: ActivityListProps) {

    const categoriaName = useMemo(()=> 
        ( category: Activity['category']) => categorias.map( cat => cat.id === category ? cat.name : '') 
    , [activities])

  return (
    <>
        <h2 className='text-4xl font-bold text-slate-700 text-center'></h2>

        { activities.map(activity => (
            <div key={activity.id} className='px-5 py-10 bg-white mt-5 flex justify-between'>
                <div className='space-y-2 relative'>

                    <p className= {`absolute -top-8 -left-5 px-10 py-2 text-white uppercase font-bold rounded-xl
                        ${activity.category > 3 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {categoriaName(+activity.category)}
                    </p>
                    <p className='text-2xl font-bold pt-5'>
                        {activity.name}
                    </p>
                    <p className='font-black text-4xl, text-lime-600'>
                        {activity.calories} { }
                        <span>CALORIAS</span>
                    </p>

                </div>
                <div className='flex gap-5 items-center'>

                    <button 
                        id='btnEdit'
                        onClick={() =>(dispach({type:"set-activityID", payload:{id: activity.id}}))}
                    >
                        <PencilSquareIcon
                            className='h-7 w-7 text-green-400 hover:h-8 hover:w-8 hover:text-green-700'
                        />
                        
                    </button>

                    <button 
                        id='btnDelete'
                        onClick={() =>(dispach({type:"delete-activityID", payload:{id: activity.id}}))}
                    >
                        <XCircleIcon
                            className='h-7 w-7 text-red-400 hover:h-8 hover:w-8 hover:text-red-700'
                        />
                        
                    </button>

                </div>
            </div>
        ))}
    </>
  )
}

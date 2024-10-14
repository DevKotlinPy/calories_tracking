import { Activity } from "../type/Index"

export type activityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } |
    {type: 'set-activityID', payload: { id: Activity['id'] } } |
    {type: 'delete-activityID', payload: { id: Activity['id'] } } |
    {type: 'restart-app'} 
    

export type ActivityState = {
    activities: Activity[],
    activeID: Activity['id'] //lookup
}

const localStorageActivity = () : Activity[] =>{
    const activities = localStorage.getItem("activities")

    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivity(),
    activeID: ''
}


export const activityReducer = (
    state: ActivityState = initialState,
    accion: activityActions
) => {

    if (accion.type === 'save-activity'){

        //este codigo maneja la logica
        let updateActivities: Activity[] = []

        if(state.activeID){
            updateActivities = state.activities.map( activity => activity.id === state.activeID ? accion.payload.newActivity: activity)
        } else {

            updateActivities = [...state.activities, accion.payload.newActivity]
        }

        return{
            ...state,  
            activities: updateActivities,
            activeID: ''
        }
    }

    if(accion.type === 'set-activityID'){

        return{
            ...state,
            activeID: accion.payload.id
        }
    }

    if(accion.type === 'delete-activityID'){

        return{
            ...state,
           activities: state.activities.filter(activity => activity.id != accion.payload.id)
        }
    }

    if(accion.type ==='restart-app'){
        
        return {
            activities: [],
            activeID:''
        }
    }

    return state
}
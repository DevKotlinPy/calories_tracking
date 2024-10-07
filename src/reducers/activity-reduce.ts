import { Activity } from "../type/Index"

export type activityActions = {
    type: 'save-activity', payload: { newActivity: Activity}
     
}

type ActivityState = {
    activitie: Activity[]
}

export const initialState: ActivityState = {
    activitie: []
}


export const activityReducer = (
    state: ActivityState = initialState,
    accion: activityActions
) => {
    if (accion.type === 'save-activity'){
        //este codigo maneja la logica
        console.log("Hola ")

        return{
            ...state,  
            activities: [...state.activitie, accion.payload.newActivity]
        }
    }

    return state
}
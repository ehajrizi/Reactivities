import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}//qka ruhet nstore


export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
} //react hook, qka dojm me perdor 
//ku ruhen stores krejt qikjp store.ts
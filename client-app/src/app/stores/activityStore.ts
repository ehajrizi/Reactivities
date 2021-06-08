import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor(){
        // makeObservable(this,{
        //     title: observable,
        //     setTitle: action
            //setTitle: action.bound //e lidh funksionin me klasen = this per me u qas nproperty
        //})
        //this = this function will be used from this class
        makeAutoObservable(this)
    }

    //setTitle(){
    //    this.title = this.title + '!';
    //}

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
        Date.parse(a.date)-Date.parse(b.date))
    } //a,b activities qe krahasohen 

    loadActivities = async () => {
        try{
            const activities = await agent.Activities.list();
                activities.forEach(activity =>{
                    activity.date = activity.date.split('T')[0]; //e ndan te T edhe e merr pjesen e par (vec daten dmth)
                    this.activityRegistry.set(activity.id, activity);
                    //e pushim qat activity te qiky array
                  })
                  this.setLoadingInitial(false);
        }catch(error){
            console.log(error);
                this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }

    selectActivity = (id: string) =>{
        this.selectedActivity = this.activityRegistry.get(id);
        //na qet error se type osht activity ose undefined 
        //e nalt e kemi null e duhet me ndryshu te ^
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) =>{
        id ? this.selectActivity(id): this.cancelSelectedActivity();
        this.editMode = true;
    }
    //nese createAct sna duhet id
    //nese edit na duhet

    closeForm = () =>{
        this.editMode = false;
    }

    createActivity = async (activity:Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity:Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                //e krijon ni array t'ri edhe e zevedsojm tani ^ e largojm qat aktivitet qe e bojm update 
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id:string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                //me u largu edhe details nrast se e kemi select
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}
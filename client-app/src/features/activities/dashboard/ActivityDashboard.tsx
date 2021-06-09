import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';


export default observer (function ActivityDashboard(){

    const {activityStore} = useStore();
   //i qitem knej qe mos me na dal shenja e loading edhe
   //te home pa nevoje
   const {loadActivities,activityRegistry} = activityStore;

  useEffect(() =>{
    if(activityRegistry.size <= 1) loadActivities();
    //nese 0 i loadim se kur te inicializojm 0 a perndryshe e din
    //appi qfar aplik ka  se  kur e bojm edit mos me na met veq qaj aktivitet
  }, [activityRegistry.size, loadActivities])

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})
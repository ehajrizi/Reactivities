import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
const location = useLocation();

  return (
    <>
       <Route exact path='/' component={HomePage}/>
       <Route 
          path={'/(.+)'} //cdo route qe ka / edhe diqka tjeter matched me qit route
          render={() =>( //home loadet vet e kto tjerat vet dmth nhome se qet navbar
            <>
            <NavBar/>
              <Container style={{marginTop:'7em'}}>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
              </Container>
            </>
          )}
       />
    </>
  );
}
export default observer(App); //qe me mujt me ndryshu 

import { observer } from 'mobx-react-lite';
import React, {useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Header,Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';


export default observer (function ActivityForm(){
    const history = useHistory();

    const {activityStore} = useStore();
    const {loadActivity,createActivity,updateActivity,loading, loadingInitial} = activityStore;
    //na nimon mi marr krejt props te activityStore
    //pa pas nevoje me shkru activityStore.prop... gjithkun
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    }); //id ka me ekzistu gjithqysh se mrena useState

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required!'),
        description: Yup.string().required('The activity description is required!'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })
    

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
        //jem sig qe sktheht undefines
    },[id, loadActivity]);
    //masi qe ka states duhet gjithqysh me add dependencies qe mos me render
    //ton kohen pldh po veq kur ndryshon diqka

 
    
    

    function handleFormSubmit(activity: Activity){
        if(activity.id.length === 0){
            let newActivity = { //spread the activity
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
            //mi push nnew location
        }else{
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik 
            validationSchema = {validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) =>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='title'/>
                        <MyTextArea placeholder='Description'  name='description' rows={3}/>
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions}/>
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button 
                            disabled = {isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit'
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})

//se forma tash na duhet me ndryshu
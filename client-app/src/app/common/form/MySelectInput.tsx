
import React from "react";
import {useField } from "formik";
import {Form, Label, Select} from 'semantic-ui-react';


interface Props{
    placeholder: string;
    name: string;
    options: any;  //se i duhen opsionet prej kujt me zgjedh
    label?: string;
}


export default function MySelectInput(props: Props){
    const[field, meta, helpers] = useField(props.name); //helpers : manually set a value/ a touch status 
    return(
        <Form.Field error={meta.touched && !!meta.error}> 
            <label>{props.label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder = {props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}



// !! e bon boolean e shohim a ekziston
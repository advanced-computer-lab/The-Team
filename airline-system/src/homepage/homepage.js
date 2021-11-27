import * as React from 'react';
import useDatePicker from './DatePicker'
import Asynchronous from './ComboBox'



export default function Home(){
    const { render, value } = useDatePicker();
    var from='';
    var to = '';
    const get_from = (data) => {
         from = data;
         console.log('From: ' +from);
    }
    const get_to = (data) => {
         to = data;
         console.log('To: ' +to);
    }
    return (
        <div>
            {render}
            <br/>
            <div><Asynchronous func={get_from} title = "Depart from:"/></div>
            <br/>
            <div><Asynchronous func={get_to} title = "Arrive at:"/></div>
        </div>
    );

}
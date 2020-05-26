import React,{useReducer} from 'react';
import Auth from './Auth.js';
import socket from './socket';
import Chat from './components/chat/main_window_chat'
import axios from 'axios';
import reducer from './reducers/reducer.js';
//import reducer from './reducer.js';



export default function Entry() {
    const [state,dispatch]=useReducer(reducer,{
        IsLogged:false,
        fullname:null,
        nickname:null,
        rooms:null
    });
  
    const onLogin=async(inputData)=>{

          const data = await axios.get(`/user/${inputData.Login}`);
          //console.log(data)
          socket.emit('APP:JOIN',inputData);
          dispatch({
              type: 'SET_DATA',
              payload: data.data
            });       
          
    }; 
    return(
        <div>{state.IsLogged ? <Chat UserName={state.fullname} NickName={state.nickname} rooms={state.rooms}/> : <Auth onLogin={onLogin}/>}</div>        
    )
}
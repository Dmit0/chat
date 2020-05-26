import React /*,{useState, useEffect}*/ from 'react';
import socket from '../../socket';
import axios from 'axios';
import '../../css/chat.css';
import reducer from '../../reducers/Chat_reducer';
import UserChat from './UserChat.js'
import ChatIn from './ChatIn.js';



export default function Chat({UserName,NickName,rooms}){
  
 
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    users: [],
    messages: [],
    roomid:null,
    nickName:'',
  });


 
  
  const onRoom = async (obj) => {
    
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    
    socket.emit('ROOM:JOIN', obj);
    //console.log(obj.roomId)
    const {data}  = await axios.get(`/rooms/${obj.roomId}`);
    console.log(data);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  
  };
    
 

  const addMessage = (message) => {
    console.log(message);
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  const onInfo=(data)=>{
    //console.log(data.users)
    dispatch({
      type:'USERS_INFO',
      payload:data
    })
  }


  React.useEffect(() => {
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);


 
 return (
  <div>
   {!state.joined ? <ChatIn onRoom={onRoom} UserName={UserName} NickName={NickName} rooms={rooms} /> : <UserChat {...state} NickName={NickName} onAddMessage={addMessage} onInfo={onInfo} />}
  </div>
);
}

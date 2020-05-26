import React /*,{useState, useEffect}*/ from 'react';
import axios from 'axios';
export default function ChatIn ({UserName,onRoom,NickName,rooms}){
    //console.log(UserName,NickName,rooms)
  const [roomId, setRoomId] = React.useState('');
    const onEnter = async () => {
       
        if (!roomId) {
          return alert('Неверные данные');
        }
        const obj = {
          roomId,
          NickName
        };
        await axios.post('/rooms', obj);
        onRoom(obj);
      };


    return (
        <div>
          <div className="user-info">
            <h1>{UserName}</h1>
          </div>
          <div className="join-block">
            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
             onChange={(e) => setRoomId(e.target.value)}
            />
           
            <button className="btn btn-success" onClick={onEnter}>
              Войти
            </button>
          </div>
          <div className="roomList">
          <h1>List of rooms:</h1>
          <ul>
         
          {rooms.map((room,index)=>{
            return <li key={room._id}> room - {room.roomId}</li>
          })}
           
          </ul>
          </div>
        </div>
      );
}
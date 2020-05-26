import React from 'react';
import socket from '../../socket';
import AllUsers from './users' 


function Chat({ users, messages,NickName, nickName, roomid, onAddMessage,onInfo }) {
  //console.log(nickName);
  console.log(messages)
 // const [isInfo, setIsInfo] = React.useState(false);
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);
  //console.log(users);
  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      nickName,
      roomid,
      text: messageValue,
    });
    onAddMessage({ roomid,nickName, text: messageValue });
    setMessageValue('');
  };
 
  //console.log(roomid);
  // React.useEffect(() => {
  //   messagesRef.current.scrollTo(0, 99999);
  // }, [messages]);

  return (
    <div>
    <div>
      <div className="chat">
        <div className="chat-users">
          Комната: <b>{roomid}</b>
          <hr />
          
          <ul  >
          <li >{NickName}</li>
          </ul>
          <AllUsers roomid={roomid} users={users} onInfo={onInfo}/>
        </div>
        <div className="chat-messages">
                  <div  ref={messagesRef} className="messages">
                      {messages.map((message,index)=>(
                              <div key={message+index.toString()} className="message">
                                  <p>{message}</p> 
                              </div>
                          )
                      )}
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"></textarea>
            <button onClick={onSendMessage} type="button" className="btn btn-primary">
              Отправить
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
    
  );
}

export default Chat;
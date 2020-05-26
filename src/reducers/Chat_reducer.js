export default (state, action) => {
    switch (action.type){
        
      case 'JOINED':
        return{
          ...state,
          joined:true,
          roomid:action.payload.roomId,
          nickName:action.payload.NickName
        }
        case 'SET_DATA':
            return {
              ...state,
              messages:action.payload.messages,

            };
       
      
        case 'NEW_MESSAGE':
            return {
              ...state,
              messages:[...state.messages , action.payload.text],
              nickName:action.payload.nickName,
            };
            case 'USERS_INFO':
              return{
                ...state,
                users:action.payload.users,
              }
    
          default:
            return state;
        }
    }
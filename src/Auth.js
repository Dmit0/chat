import React,{useState} from 'react';
import './css/loginpage.css' ;
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';




export default function Auth({onLogin}) {
    const [Login,setLogin]=useState('');
    const [FullName,setFullName]=useState('');
    const [Password,setPassword]=useState('');
    const [PasswordSecond,setPasswordSecond]=useState('');
    const [isAuth,setIsAuth]=useState(false);
    
    const onRegistr=async()=>{
        setIsAuth(true)

        if(Password!==PasswordSecond || FullName ==='' || Login ===''){
           // alert("неверные данные")
        }
        else{
            
            const inputData={
                Login,
                FullName,
                Password
              };
              await axios.post('/user/registration',inputData);
              
              setIsAuth(false);
              setFullName('');
              setPassword('');
              setPasswordSecond('');
              setLogin('');

              console.log(inputData)
        }
        
        
    }
    const onLog=async()=>{
        setIsAuth(false)
        if(Password==='' || Login ===''){
            //alert("неверные данные")
        }
        else{
            const inputData={
                Login,
                Password
              };
              await axios.post('/user/login',inputData)
              onLogin(inputData);
        }
        
           
        
       
            
            
    }
    return(
        <div>
            <div className="login_head_bg"></div>
            <div className="Login_bg">
            {isAuth ? <div className="Login_page">
            <div className="input">
                            <TextField  label="Login" variant="outlined" className="input__item" margin="normal"value={Login} onChange={e=>{setLogin(e.target.value)}}/>
                            <TextField  label="FullName" variant="outlined" className="input__item" margin="normal"value={FullName} onChange={e=>{setFullName(e.target.value)}}/>
                            <TextField  label="Password" type="password" variant="outlined" className="input__item" margin="normal" value={Password} onChange={e=>{setPassword(e.target.value)} }/>
                            <TextField  label="Password again"   type="password" variant="outlined" className="input__item" margin="normal" value={PasswordSecond} onChange={e=>{setPasswordSecond(e.target.value)}}/>
                                <div className="buttons">
                                    <Button className="in_login" variant="outlined" color="primary" onClick={onLog}>LogIn</Button>
                                    <Button className="in_regist" variant="outlined" color="primary"  onClick={onRegistr} >regist</Button>
                                </div>
                        </div> 
                        
                    </div> : <div className="Regist_page">
                        <div className="input">
                            <TextField  label="Login" variant="outlined" className="input__item" margin="normal"value={Login} onChange={e=>{setLogin(e.target.value)}}/>
                            <TextField  label="Password" type="password" variant="outlined" className="input__item" margin="normal" value={Password} onChange={e=>{setPassword(e.target.value)} }/>     
                            <div className="buttons">
                            <Button className="in_login" variant="outlined" color="primary" onClick={onLog}>LogIn</Button>
                            <Button className="in_regist" variant="outlined" color="primary"  onClick={onRegistr} >regist</Button>
                        </div>
                        </div> 
                        
                    </div>}
                    
                  
            </div>
            
        </div>
        
    )
}
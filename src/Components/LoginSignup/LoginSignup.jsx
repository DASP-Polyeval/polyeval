import React, { useState } from 'react';
import './LoginSignup.css'



const LoginSignup = () => {
    const [action , setAction] = useState("Login")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const data = [
        {
            "username":"John",
            "Email":"John@gmail.com",
            "password":"123"
            
        },
        {
            "username":"Ahmad",
            "Email":"Ahmad@gmail.com",
            "password":"123"
            
        }
    ]

    const handleSubmit = () => {
        if (action === "Login") {
          // Login authentication logic
          const user = data.find(
            (user) => user.Email === email && user.password === password
          );
    
          if (user) {
            alert(`Welcome back, ${user.username}!`);
            // Redirect logic can be added here (e.g., navigate("/rating"))
          } else {
            alert("Invalid email or password.");
          }
        } else if (action === "Sign Up") {
          // Check if user already exists
          const userExists = data.some((user) => user.Email === email);
    
          if (userExists) {
            alert("User with this email already exists.");
          } else if (!username || !email || !password) {
            alert("Please fill in all the fields.");
          } else {
            alert(`Welcome, ${username}! Your account has been created.`);
            // Logic to add the new user can be implemented here
          }
        }
      };

    //   console.log(data);



    return (
        <div className="container">
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>

            <div className="inputs">
                {action === "Sign Up" && (
                <div className="input">
                    <label>Username: </label>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                
                </div>
                )}


                {/* {action ==="Login"? <></>: <div className="input">
                    <label>Username: </label>
                    <input type="text"/>
                </div> } */}
                


                

                <div className="input">
                    <label> Email: </label>
                    <input type="email" value= {email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input">
                    <label htmlFor="">Password: </label>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>
            </div>
            {action ==="Sign Up"? <></> : <div className='forgot-password'>Lost Password? <span>Click Here!</span></div>}

            <div className="submit-container">
                

                <div className={action === "Login"? "submit gray": "submit"} onClick={()=>{setAction("Login")}}> Sign Up</div>
                <div className={action === "Sign Up"? "submit gray": "submit"} onClick={()=> {setAction("Sign Up")}}> Login </div>

            </div>


        </div>

    )
}
export default LoginSignup;
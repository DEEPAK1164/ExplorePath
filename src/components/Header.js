import Title from "./Title";
import { useState } from "react";
// import { useState } from "react";


const Header = () => {
const[isLoggedIn,setIsLoggedIn]=useState(false);

// const[title,setTitle]=useState("Food Villa");
    return (
      //inline style in jsx
      <div className="header" style={{ backgroundColor: "red" }}>
        <Title />
        
        {/* <h1>{title}</h1>
        <button onClick={function(){
          setTitle("Food Mania");
        }}>Change Title</button> */}


        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Cart</li>
          </ul>
        </div>
        {isLoggedIn? (
            <button onClick={()=>setIsLoggedIn(false)}>LogOut</button>
        ):(
          <button onClick={()=>setIsLoggedIn(true)}>LogIn</button>
        )}
      </div>
    );
  };
  
  export default Header;
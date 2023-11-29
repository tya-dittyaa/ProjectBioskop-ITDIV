import { useState,useRef, useEffect } from 'react'
import './loginPage.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import NavBar from "../assets/NavBar";
export default function LoginPage(){
    const [emailValue,setEmailValue] = useState('');
    const [passValue,setPassValue] = useState('');
    const [visible,setVisible] = useState(false);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null)
    console.log(window.innerWidth)
    useEffect(() =>{
        setTimeout(() =>{
            if (pRef.current&&h1Ref.current && divRef.current&&leftRef.current){
                leftRef.current.style.transform = 'translate(0)';
                divRef.current.style.transform = 'translate(0)';
            }
        },1)
        setTimeout(() => {
            if (pRef.current&&h1Ref.current && divRef.current&&leftRef.current) {
              pRef.current.style.opacity = '1';
              h1Ref.current.style.opacity = '1';
              divRef.current.style.opacity = '1';
            }
        }, 1);
        
    },[])
    return (
      <>
      <NavBar/>
        <div className="loginPage">
          <div className="loginContainer">
            <div ref={leftRef} className="loginContainerLeft">
              <h1 ref={h1Ref}>"Nama Web"</h1>
              <br />
              <p ref={pRef}>"Tagline"</p>
            </div>
            <div ref={divRef} className="loginContainerRight">
              <form action="" method="post">
                <h1>Login</h1>
                <div className="emailPart">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className={emailValue ? "emailNotEmpty" : ""}
                    autoComplete="off"
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="passPart">
                  <input
                    type={visible ? "text" : "password"}
                    name="pass"
                    id="pass"
                    className={passValue ? "passNotEmpty" : ""}
                    autoComplete="off"
                    onChange={(e) => setPassValue(e.target.value)}
                  />
                  <label htmlFor="pass">Password</label>
                  {visible ? (
                    <VisibilityIcon
                      className="visibility"
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibility"
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                <button type="submit">Login</button>
              </form>
              <p>
                Don&apos;t Have An Account ?{" "}
                <Link to="/register" style={{ color: "black" }}>
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
}
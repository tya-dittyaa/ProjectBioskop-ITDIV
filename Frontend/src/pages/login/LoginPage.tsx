import { useState,useRef, useEffect } from 'react'
import './loginPage.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import NavBar from "../assets/NavBar";
export default function LoginPage(){
  const [user,setUser] = useState({
    email: '',
    password: ''
  })
    const [visible,setVisible] = useState(false);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null)
    console.log(window.innerWidth)
    const login = async () => {
      try {
        await fetch(
          "https://api-bioskop13.dittyaa.my.id/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        alert("login success");
        
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      if(user.email!= '' && user.password!= ''){
        login();
      }
    }
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
        <NavBar />
        <div className="loginPage">
          <div className="loginContainer">
            <div ref={leftRef} className="loginContainerLeft">
              <h1 ref={h1Ref}>"Nama Web"</h1>
              <br />
              <p ref={pRef}>"Tagline"</p>
            </div>
            <div ref={divRef} className="loginContainerRight">
              <form action="" method="post" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="emailPart">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className={user.email ? "emailNotEmpty" : ""}
                    autoComplete="off"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="passPart">
                  <input
                    type={visible ? "text" : "password"}
                    name="pass"
                    id="pass"
                    className={user.password ? "passNotEmpty" : ""}
                    autoComplete="off"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
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
                <button type='submit'>Login</button>
              </form>
              <p>
                Don&apos;t Have An Account ?
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
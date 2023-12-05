import { useState,useRef,useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './registerPage.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NavBar from "../assets/NavBar";
export default function RegisterPage(){
    const [user, setUser] = useState({
      name: '',
      email: '',
      password: ''
    })
    const navigate = useNavigate();
    const [confirmPassValue,setConfirmPassValue] = useState('');
    const [visible,setVisible] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const [userError,setUserError] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [passError,setPassError] = useState(false);
    const [confirmPassError,setConfirmPassError] = useState(false);
    const [isSubmit,setIsSubmit] = useState(false);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null)
    const checkUser = () => {
        
            setUserError(!user.name);
        
    }
    const checkEmail = () =>{
            setEmailError(!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(user.email)));
        
        
    }
    const checkPass = () => {
        
            setPassError((user.password.length<8))
        
    }
    const checkConfirm = () => {
        
            setConfirmPassError(!(user.password === confirmPassValue))
        
    }

    const register = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/user/register", 
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if(response.status === 201){
          alert("Register success");
          navigate('/login');
        }else if(response.status === 409){
          alert("Email has already exist!");
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsSubmit(true);
        checkUser();
        checkEmail();
        checkPass();
        checkConfirm();
        if(user.name!='' && user.password!='' && user.email!=''){
          register();
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
        <div className="registerPage">
          <div className="registerContainer">
            <div ref={divRef} className="registerContainerRight">
              <form action="" method="post" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="userPart">
                  <input
                    type="text"
                    name="user"
                    id="user"
                    autoComplete="off"
                    className={user.name ? "userNotEmpty" : ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    onKeyUp={checkUser}
                  />
                  <label htmlFor="user">Username</label>
                  {isSubmit && userError && <p>*You Must Filled UserName</p>}
                </div>
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
                    onKeyUp={checkEmail}
                  />
                  <label htmlFor="email">Email</label>
                  {emailError && isSubmit && <p>*Invalid Email</p>}
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
                    onKeyUp={checkPass}
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
                  {passError && isSubmit && (
                    <p>*Password must have min 8 Characters</p>
                  )}
                </div>
                <div className="confirmPassPart">
                  <input
                    type={visible2 ? "text" : "password"}
                    name="confirmPass"
                    id="confirmPass"
                    className={confirmPassValue ? "confirmPassNotEmpty" : ""}
                    autoComplete="off"
                    onChange={(e) => setConfirmPassValue(e.target.value)}
                    onKeyUp={checkConfirm}
                  />
                  <label htmlFor="confirmPass">Confirm Password</label>
                  {visible2 ? (
                    <VisibilityIcon
                      className="visibility2"
                      onClick={() => setVisible2(false)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibility2"
                      onClick={() => setVisible2(true)}
                    />
                  )}
                  {confirmPassError && isSubmit && (
                    <p>*Confirm Password Not Valid</p>
                  )}
                </div>
                <button type="submit">Register</button>
              </form>
              <p>
                Already Have An Account ?
                <Link to="/login" style={{ color: "black" }}>
                  Login
                </Link>
              </p>
            </div>
            <div ref={leftRef} className="registerContainerLeft">
              <h1 ref={h1Ref}>"Nama Web"</h1>
              <br />
              <p ref={pRef}>"Tagline"</p>
            </div>
          </div>
        </div>
      </>
    );
}
import {Link} from 'react-router-dom'
import '../App.css'
const NavBar = () =>{
  const loggedIn = window.localStorage.getItem('isLoggedIn')
    return (
      <div className="navbarContainer">
        <div className="leftNavbar">
          <Link to={"/"}>NontonYuk</Link>
          <Link to={"/movie"}>Movie</Link>
          <Link to={"/bioskop"}>Bioskop</Link>
          <Link to={"/payment"}>Payment</Link>
        </div>
        <div className="rightNavBar">
          <Link className={loggedIn==='true' ? "visible" : "unVisible"} to={"/account"}>
            Account
          </Link>
          <Link className={loggedIn==='true' ? "unVisible" : "visible"} to={"/login"}>
            Login
          </Link>
          <Link className={loggedIn==='true' ? "unVisible" : "visible"} to={"/register"}>
            Register
          </Link>
        </div>
      </div>
    );
}

export default NavBar;
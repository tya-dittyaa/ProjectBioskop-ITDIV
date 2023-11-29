import {Link} from 'react-router-dom'
import '../App.css'
const NavBar = () =>{
    return (
      <div className="navbarContainer">
        <div className="leftNavbar">
          <Link to={'/'}>NontonYuk</Link>
          <Link to={'/movie'}>Movie</Link>
        <Link to={'/bioskop'}>Bioskop</Link>
        <Link to={'/payment'}>Payment</Link>
        </div>
        <div className="rightNavBar">
            <Link to={"/account"}>Account</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
        </div>
      </div>
    );
}

export default NavBar;
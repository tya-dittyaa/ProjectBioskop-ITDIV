import { useEffect, useState } from 'react'
import './accountPage.css'
import NavBar from '../assets/NavBar';
import { useNavigate } from 'react-router-dom';
export default function AccountPage(){
    const userLog = JSON.parse(localStorage.getItem("userLog"));
    const [popup,setPopUp] = useState(false);
    const [history,setHistory] = useState([{}])
    const navigate = useNavigate()
    const handleLogout = () =>{
        window.localStorage.setItem('isLoggedIn',"")
        navigate('/')
    }

    useEffect(()=>{
        const getHistory = async () => {
          try {
            const response = await fetch(
              "https://api-bioskop13.dittyaa.my.id/transaction/history",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer fredjefdrewkardit",
                },
                body: JSON.stringify({userId :userLog.id})
              }
            );
            const data = await response.json();
            console.log(data.data);
            setHistory(data.data);
          } catch (error) {
            console.log(error);
          }
        };
        getHistory();
    },[])
    return(
        <>
        <NavBar/>
            <div className='accountPage'>
                <div className="profilePart">
                    <h1>My Profile</h1>
                    <img src="profile.jpg" alt="" />
                    <span className='username'>{userLog.name} </span>
                    <br />
                    <span>{userLog.email}</span>
                    <button onClick={handleLogout} className='logoutButton'>Logout</button>
                </div>
                <div className="purchaseHistory">
                    <h1 className='purchasettl'>Purchase History</h1>
                    <div className='listTicket'>
                        <div className="movieImg">
                            <img src="2.jpg" alt="" />
                        </div>
                        <div className="ticketDesc">
                            <h1>THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES</h1>
                            <br />
                            <span className='grey'>ALAM SUTERA</span>
                            <br />
                            <span className="grey">Booking Code: 12345</span>
                            <br />
                            <span className="grey">Date: 27/11/2023 Time: 10:00 AM</span>
                            <br />
                            <button>Detail</button>
                        </div>
                        
                    </div>
                    <div className='listTicket'>
                        <div className="movieImg">
                            <img src="2.jpg" alt="" />
                        </div>
                        <div className="ticketDesc">
                            <h1>THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES</h1>
                            <br />
                            <span className='grey'>ALAM SUTERA</span>
                            <br />
                            <span className="grey">Booking Code: 12345</span>
                            <br />
                            <span className="grey">Date: 27/11/2023 Time: 10:00 AM</span>
                            <br />
                            <button onClick={() => setPopUp(true)}>Detail</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            {popup &&
                <div className="popUpDetail">
                    <div className="popUpDetails">
                    <h1>THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES</h1>
                    <span><b>Location:</b> Alam Sutera</span>
                    <span><b>Date:</b> 19/11/2023</span>
                    <span><b>Time:</b> 19:00</span>
                    <span><b>Theatre:</b> 1</span>
                    <span><b>Seat:</b> F17</span>
                    <span><b>Total:</b> 50.000</span>
                    <br />
                    <button onClick={() => setPopUp(false)}>Close</button>
                    </div>
                </div>
            }
        </>
    )
}
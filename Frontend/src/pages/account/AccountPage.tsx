import { useState } from 'react'
import './accountPage.css'
import NavBar from '../assets/NavBar';
export default function AccountPage(){
    const [popup,setPopUp] = useState(false);
    return(
        <>
        <NavBar/>
            <div className='accountPage'>
                <div className="profilePart">
                    <h1>My Profile</h1>
                    <img src="profile.jpg" alt="" />
                    <span className='username'>Jefry </span>
                    <br />
                    <span>Jefry@gmail.com</span>
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
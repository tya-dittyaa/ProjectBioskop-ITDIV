// @ts-nocheck
import { useEffect, useState } from 'react'
import './accountPage.css'
import NavBar from '../assets/NavBar';
import { useNavigate } from 'react-router-dom';
export default function AccountPage(){
    const userLog = JSON.parse(localStorage.getItem("userLog"));
    const [popup,setPopUp] = useState(false);
    const [popupData,setpopupData] = useState({})
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
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
            setHistory(data.data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        getHistory();
    },[])


    const [loading,setLoading] = useState(true);
    const PurchaseHistory = ({purchase})=>{
        const ticketDate = new Date(purchase.schedule.showTime);
        const date = ticketDate.toLocaleDateString();
        const time = ticketDate.toLocaleTimeString();
        return (
          <div className="listTicket">
            <div className="movieImg">
              <img src={purchase.schedule.film.image_link} alt="" />
            </div>
            <div className="ticketDesc">
              <h1>{purchase.schedule.film.title}</h1>
              <br />
              <span className="grey">
                {purchase.schedule.studio.theater.location}
              </span>
              <br />
              <span className="grey">
                Date: {date}
              </span>
              <br />
              <span className="grey">
                Time: {time}
              </span>
              <br />
              <button onClick={()=> {setPopUp(true); setpopupData(purchase);setDate(date);setTime(time)}}>Detail</button>
            </div>
          </div>
        );
    }

    return (
      <>
        <NavBar />
        <div className="accountPage">
          <div className="profilePart">
            <h1>My Profile</h1>
            <img src="profile.jpg" alt="" />
            <span className="username">{userLog.name} </span>
            <br />
            <span>{userLog.email}</span>
            <button onClick={handleLogout} className="logoutButton">
              Logout
            </button>
          </div>
          <div className="purchaseHistory">
            <h1 className="purchasettl">Purchase History</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              history.map((h, idx) => (
                <PurchaseHistory purchase={h} key={idx}></PurchaseHistory>
              ))
            )}
          </div>
        </div>
        {popup && (
          <div className="popUpDetail">
            <div className="popUpDetails">
              <h1>{popupData.schedule.film.title}</h1>
              <span>
                <b>Location: </b> {popupData.schedule.studio.theater.location}
              </span>
              <span>
                <b>Date: </b> {date}
              </span>
              <span>
                <b>Time: </b> {time}
              </span>
              <span>
                <b>Studio: </b> {popupData.schedule.studio.roomNumber}
              </span>
              <span>
                <b>Seat: </b>{" "}
                {popupData.TransactionDetail.map((seat, idx) => (
                  <span key={idx}>| {seat.purchasedSeat.rowCharacter +
                      seat.purchasedSeat.columnNumber} |
                  </span>
                ))}
              </span>
              <span>
                <b>Total: </b>Rp {popupData.TransactionDetail.length * 60000}
              </span>
              <br />
              <button onClick={() => setPopUp(false)}>Close</button>
            </div>
          </div>
        )}
      </>
    );
}
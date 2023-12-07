import NavBar from "./assets/NavBar";
import bcaPic from "./assets/bca.png";
import mandiriPic from "./assets/mandiri.png";
import gojekPic from "./assets/gopay.png";
import ovoPic from "./assets/ovo.png";
import avengerPic from "./assets/avenger.jpeg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const PaymentMethod = ({ image, children, setPayment }) => {
  return (
    <div className={`paymentMethodDiv`}>
      <img src={image} width={"80px"} height={"24px"}></img>
      <p>{children}</p>
      <input
        className="paymentRadio"
        type="radio"
        name="paymentMethodRadio"
        onClick={() => setPayment(children)}
      ></input>
    </div>
  );
};
const PaymentPage = () => {
  const location = useLocation();
  const transactionInput = location.state.transaction;
  const movie = location.state.summary.movie;
  const [seats,setSeats] = useState(transactionInput.seat)
  console.log(seats[0]);
  // console.log(transactionInput.seat[0]);
  const [payment, setpayment] = useState("");
  const [paymentList, setpaymentList] = useState([])
  const [modalVisibility, setModalVisibility] = useState("notVisible");
  const navigate = useNavigate();

  useEffect(() => {
    const getPayment = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/payment/available",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer fredjefdrewkardit",
            },
          }
        );
        const data = await response.json();
        console.log(data)
        setpaymentList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPayment();

  }, []);

  const handlePayment = () => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    if (payment === "") {
      setModalVisibility("visible");
    } else {
      if (loggedIn === "true") {
        navigate("/account");
      } else {
        navigate("/login");
      }
    }
  };
  return (
    <>
      <NavBar />
      <p className="pageTitle">Checkout</p>
      <div className="paymentContainer">
        <div className="paymentMethodContainer">
          <p className="divTitle">Payment Method</p>
          <PaymentMethod image={bcaPic} setPayment={setpayment}>
            Virtual Account BCA
          </PaymentMethod>
          <PaymentMethod image={mandiriPic} setPayment={setpayment}>
            Virtual Account Mandiri
          </PaymentMethod>
          <PaymentMethod image={gojekPic} setPayment={setpayment}>
            gopay
          </PaymentMethod>
          <PaymentMethod image={ovoPic} setPayment={setpayment}>
            OVO
          </PaymentMethod>
          <p className="paymentPicked">Payment Method: {payment}</p>
        </div>

        <div className="paymentSummaryContainer">
          <p className="divTitle">Payment Summary</p>
          <div className="summaryHeader">
            <img src={movie.image_link} className="summaryPic"></img>
            <div className="summaryHeaderRight">
              <p>
                <span className="boldSpan">Movie Name:</span> {movie.title}
              </p>
              <p>
                <span className="boldSpan">Rating:</span> {movie.filmRating}
              </p>
              <span className="boldSpan">Synopsis:</span>
              <p>{movie.description}</p>
            </div>
          </div>
          <div className="summaryTicket">
            <p>
              <span className="boldSpan">Date: </span>
              Saturday, 20 Jun 2024
            </p>
            <p>
              <span className="boldSpan">Time: </span>
              13:00
            </p>
            <p>
              <span className="boldSpan">Seat: </span>{" "}
              {seats.map((seat, idx) => (
                <span key={idx}>{seat.rowCharacter+seat.columnNumber}, </span>
              ))}
            </p>
            <p>
              <span className="boldSpan">Ruangan: </span> 2
            </p>
            <p>
              <span className="boldSpan">Quantity: </span> 2
            </p>
            <p>
              <span className="boldSpan">Total Price: </span> Rp 120.000
            </p>
          </div>
          <div className="checkoutDiv">
            <button className="checkoutButton" onClick={handlePayment}>
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className={`paymentModal ${modalVisibility}`}>
        <div className="paymentModalTitle">
          <span
            style={{ color: "lightgrey", cursor: "pointer" }}
            onClick={() => setModalVisibility("notVisible")}
          >
            X{" "}
          </span>
          <span className="alertSpan">Alert!</span>
        </div>
        <div className="paymentModalDesc">
          Don't forget to choose a payment method
          <span style={{ color: "red" }}> *</span>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

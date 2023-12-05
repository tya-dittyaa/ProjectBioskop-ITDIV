import NavBar from "./assets/NavBar";
import bcaPic from "./assets/bca.png";
import mandiriPic from "./assets/mandiri.png";
import gojekPic from "./assets/gopay.png";
import ovoPic from "./assets/ovo.png";
import avengerPic from "./assets/avenger.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [payment, setpayment] = useState("");
  const [modalVisibility, setModalVisibility] = useState("notVisible");
  const navigate = useNavigate();

  const handlePayment = () => {
    const loggedIn = window.localStorage.getItem('isLoggedIn')
    if (payment === "") {
      setModalVisibility("visible");
    } else {
      if(loggedIn==='true'){
        navigate("/account");
      }else{
        navigate('/login');
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
            <img src={avengerPic} className="summaryPic"></img>
            <div className="summaryHeaderRight">
              <p>
                <span className="boldSpan">Movie Name:</span> Avenger: Endgame
              </p>
              <p>
                <span className="boldSpan">Rating:</span> 9.5
              </p>
              <span className="boldSpan">Synopsis:</span>
              <p>
                After the devastating events of Avengers: Infinity War (2018),
                the universe is in ruins due to the efforts of the Mad Titan,
                Thanos. With the help of remaining allies, the Avengers must
                assemble once more in order to undo Thanos's actions and undo
                the chaos to the universe, no matter what consequences may be in
                store, and no matter who they face...
              </p>
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
              <span className="boldSpan">Seat: </span> 1B
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

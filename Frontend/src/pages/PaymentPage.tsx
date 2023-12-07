import NavBar from "./assets/NavBar";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const PaymentMethod = ({ image, children, setPaymentId,setPaymentName,paymentId }) => {
  return (
    <div className={`paymentMethodDiv`}>
      <img src={image} width={"80px"} height={"24px"}></img>
      <p>{children}</p>
      <input
        className="paymentRadio"
        type="radio"
        name="paymentMethodRadio"
        onClick={() => {setPaymentId(paymentId); setPaymentName(children)}}
      ></input>
    </div>
  );
};
const PaymentPage = () => {
  const location = useLocation();
  const transactionInput = location.state.transaction;
  const movie = location.state.summary.movie;
  const jadwal = location.state.jadwal;
  const [seats, setSeats] = useState(transactionInput.seat);
  const [paymentId, setpaymentId] = useState("");
  const [paymentName, setpaymentName] = useState("");
  const [paymentList, setpaymentList] = useState([]);
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
        setpaymentList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPayment();
  }, []);

  const handlePayment = () => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    if (paymentId === "") {
      setModalVisibility("visible");
    } else {
      if (loggedIn === "true") {
        transactionInput.paymentMethodId = paymentId
        const createTransaction = async () => {
          try {
            const response = await fetch(
              "https://api-bioskop13.dittyaa.my.id/transaction/create",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer fredjefdrewkardit",
                },
                body: JSON.stringify(transactionInput),
              }
            );
            if(response.status === 400){
              alert("body is missing")
            }
          } catch (error) {
            alert(error);
            console.log(error);
          }
        };
        createTransaction();
        navigate("/account");
      } else {
        navigate("/login");
      }
    }
  };
  return (
    <>
      <NavBar />
      <Link
        to={`/bioskop/${movie.id}`}
        style={{ color: "black", fontSize: "25px", marginLeft: "20px" }}
      >
        &larr; back
      </Link>
      <p className="pageTitle">Checkout</p>
      <div className="paymentContainer">
        <div className="paymentMethodContainer">
          <p className="divTitle">Payment Method</p>
          <div className="paymentScroll">
            {paymentList.map((payment, idx) => (
              <PaymentMethod key={idx} image={payment.image} setPaymentId={setpaymentId} setPaymentName={setpaymentName} paymentId={payment.id}>
                {payment.name}
              </PaymentMethod>
            ))}
          </div>
          <p>Scroll for more payment</p>
          <p className="paymentPicked">Payment Method: {paymentName}</p>
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
              {jadwal.date}
            </p>
            <p>
              <span className="boldSpan">Time: </span>
              {jadwal.time}
            </p>
            <p>
              <span className="boldSpan">Seat: </span>{" "}
              {seats.map((seat, idx) => (
                <span key={idx}>{seat.rowCharacter + seat.columnNumber}, </span>
              ))}
            </p>
            <p>
              <span className="boldSpan">Ruangan: </span> 2
            </p>
            <p>
              <span className="boldSpan">Quantity: </span> {seats.length}
            </p>
            <p>
              <span className="boldSpan">Total Price: </span> Rp {60000*seats.length}
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

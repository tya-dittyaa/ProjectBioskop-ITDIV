import { useState } from "react";
import NavBar from "./assets/NavBar";
import avengerPic from "./assets/avenger.jpeg";
import { Link, useNavigate } from "react-router-dom";

const seatList = [
  { seatName: "1A", status: "taken" },
  { seatName: "2A", status: "available" },
  { seatName: "3A", status: "available" },
  { seatName: "4A", status: "available" },
  { seatName: "5A", status: "available" },
  { seatName: "6A", status: "available" },
];

const SeatDesign = ({ children, status, handleclick, id }) => {
  return (
    <div
      className={`${status} seatDetail`}
      onClick={() => handleclick(status, children, id)}
    >
      {children}
    </div>
  );
};
const CinemaLists = ({ children, handleclick }) => {
  return (
    <div onClick={() => handleclick(children)} className="cinemaLists">
      {children}
    </div>
  );
};
const BioskopListPage = () => {
  const navigate = useNavigate();
  const [timeVisibility, setTimeVisibility] = useState(false);
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [cinemaName, setCinemaName] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState([""]);
  const handleClickCinema = (cinema) => {
    setTimeVisibility(true);
    setCinemaName(cinema);
  };

  const handleClickTime = (time) => {
    setTime(time);
    setSeatVisibility(true);
  };

  const handleClickSeat = (status, seatname, id) => {
    if (status === "available") {
      seatList[id].status = "taken";
      setSeats((prevSeats) => [...prevSeats, seatname]);
    }
  };
  return (
    <>
      <NavBar />
      <div className="bioskopContainer">
        <div className="movieContainer">
          <p className="divTitle">Movie Detail</p>
          <div className="summaryHeader" id="bioskopMovies">
            <img src={avengerPic} className="summaryPic"></img>
            <div className="summaryHeaderRight" id="bioskopMovie">
              <p className="boldSpan">Movie Name:</p>
              <p style={{ fontSize: "20px" }}>Avengers: Endgame</p>
              <p>
                <span className="boldSpan">Rating:</span> 9.5
              </p>
            </div>
          </div>
          <div className="summaryTicket">
            <span className="boldSpan">Synopsis:</span>
            <p>
              After the devastating events of Avengers: Infinity War (2018), the
              universe is in ruins due to the efforts of the Mad Titan, Thanos.
              With the help of remaining allies, the Avengers must assemble once
              more in order to undo Thanos's actions and undo the chaos to the
              universe, no matter what consequences may be in store, and no
              matter who they face...
            </p>
          </div>
        </div>
        <div
          className={`bioskopListContainer ${timeVisibility ? "" : "visibles"}`}
        >
          <p className="cinemaListTitle">Cinema List</p>
          <div className="cinemaListScroll">
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>Ayani XXI</CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Taman Anggrek XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
            <CinemaLists handleclick={handleClickCinema}>
              Central Park XXI
            </CinemaLists>
          </div>
        </div>

        <div
          className={`bioskopListContainer ${timeVisibility ? "visibles" : ""}`}
        >
          <p className="cinemaListTitle">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setTimeVisibility(false)}
            >
              &larr;{" "}
            </span>{" "}
            {cinemaName} (Pick a Time)
          </p>
          <div className="cinemaListScroll">
            <CinemaLists handleclick={handleClickTime}>13:00</CinemaLists>
            <CinemaLists handleclick={handleClickTime}>14:00</CinemaLists>
            <CinemaLists handleclick={handleClickTime}>15:00</CinemaLists>
            <CinemaLists handleclick={handleClickTime}>16:00</CinemaLists>
          </div>
        </div>
      </div>

      <div className={`seatContainer ${seatVisibility ? "visibles" : ""}`}>
        <div
          className={`bioskopListContainer ${seatVisibility ? "visibles" : ""}`}
        >
          <p className="cinemaListTitle">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSeatVisibility(false)}
            >
              &larr;
            </span>
            {time} (Pick Available Seats)
          </p>
          <div className="seatDiv">
            {seatList.map((seat, idx) => (
              <SeatDesign
                key={idx}
                id={idx}
                handleclick={handleClickSeat}
                status={seat.status}
              >
                {seat.seatName}
              </SeatDesign>
            ))}
          </div>
          <Link to="/payment">
            <button className="seatButton">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BioskopListPage;

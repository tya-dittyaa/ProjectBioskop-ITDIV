import { useState, useEffect } from "react";
import NavBar from "./assets/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";

const seatList = [
  {
    rowCharacter: "A",
    columnNumber: 1,
    status: "available",
  },
  {
    rowCharacter: "A",
    columnNumber: 2,
    status: "available",
  },
  {
    rowCharacter: "A",
    columnNumber: 3,
    status: "available",
  },
  {
    rowCharacter: "A",
    columnNumber: 4,
    status: "available",
  },
  {
    rowCharacter: "A",
    columnNumber: 5,
    status: "available",
  },
  {
    rowCharacter: "A",
    columnNumber: 6,
    status: "available",
  },
  {
    rowCharacter: "B",
    columnNumber: 1,
    status: "available",
  },
  {
    rowCharacter: "B",
    columnNumber: 2,
    status: "available",
  },
  {
    rowCharacter: "B",
    columnNumber: 3,
    status: "available",
  },
  {
    rowCharacter: "B",
    columnNumber: 4,
    status: "available",
  },
  {
    rowCharacter: "B",
    columnNumber: 5,
    status: "available",
  },
  {
    rowCharacter: "B",
    columnNumber: 6,
    status: "available",
  },
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
const CinemaLists = ({ children, handleclick, bioskop }) => {
  return (
    <div onClick={() => handleclick(bioskop)} className="cinemaLists">
      {children}
    </div>
  );
};

const TimeLists = ({ children, handleclick }) => {
  return (
    <div onClick={() => handleclick(children)} className="cinemaLists">
      {children}
    </div>
  );
};
const BioskopListPage = () => {
  const [takenSeat, setTakenSeat] = useState([
    {
      id: 1,
      rowCharacter: "A",
      columnNumber: 1,
    },
  ]);

  useEffect(() => {
    //kosongin takenSeat
    // setTakenSeat([]);
    //fetch masukkin ke takenSeat
    seatList.map((seat, idx) => {
      for (let i = 0; i < takenSeat.length; i++) {
        let taken = takenSeat[i];
        if (
          seat.columnNumber === taken.columnNumber &&
          seat.rowCharacter === taken.rowCharacter
        ) {
          seatList[idx].status = "taken";
          break;
        }
      }
    });
  }, []);

  const navigate = useNavigate();
  const [timeVisibility, setTimeVisibility] = useState(false);
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [cinemaData, setCinemaData] = useState({});
  const [cinemaList, setCinemaList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState([{}]);
  const handleClickCinema = (cinema) => {
    setTimeVisibility(true);
    setCinemaData(cinema);

    const getTime = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/schedule/available",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer fredjefdrewkardit",
            },
            body: JSON.stringify({ filmId: id, theaterId: cinema.theaterId }),
          }
        );
        const data = await response.json();
        setTimeList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTime();
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
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/film/available",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer fredjefdrewkardit",
            },
          }
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCinema = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/theater/available",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer fredjefdrewkardit",
            },
            body: JSON.stringify({ filmId: id }),
          }
        );
        const data = await response.json();
        setCinemaList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
    getCinema();
  }, []);

  return (
    <>
      <NavBar />
      <div className="bioskopContainer">
        <div className="movieContainer">
          <p className="divTitle">Movie Detail</p>
          {movies.map((movie) => {
            if (movie.id === id) {
              return (
                <div
                  className="summaryHeader"
                  id="bioskopMovies"
                  key={movie.id}
                >
                  <img src={movie.image_link} className="summaryPic"></img>
                  <div className="summaryHeaderRight" id="bioskopMovie">
                    <p className="boldSpan">Movie Name:</p>
                    <p style={{ fontSize: "20px" }}>{movie.title}</p>
                    <p>
                      <span className="boldSpan">Rating:</span>{" "}
                      {movie.filmRating}
                    </p>
                  </div>
                </div>
              );
            }
          })}
          {movies.map((movie) => {
            if (movie.id === id) {
              return (
                <div className="summaryTicket" key={movie.id}>
                  <span className="boldSpan">Synopsis:</span>
                  <p>{movie.description}</p>
                </div>
              );
            }
          })}
          {/* <div className="summaryHeader" id="bioskopMovies">
            <img src={avengerPic} className="summaryPic"></img>
            <div className="summaryHeaderRight" id="bioskopMovie">
              <p className="boldSpan">Movie Name:</p>
              <p style={{ fontSize: "20px" }}>Avengers: Endgame</p>
              <p>
                <span className="boldSpan">Rating:</span> 9.5
              </p>
            </div>
          </div> */}
          {/* <div className="summaryTicket">
            <span className="boldSpan">Synopsis:</span>
            <p>
              After the devastating events of Avengers: Infinity War (2018), the
              universe is in ruins due to the efforts of the Mad Titan, Thanos.
              With the help of remaining allies, the Avengers must assemble once
              more in order to undo Thanos's actions and undo the chaos to the
              universe, no matter what consequences may be in store, and no
              matter who they face...
            </p>
          </div> */}
        </div>
        <div
          className={`bioskopListContainer ${timeVisibility ? "" : "visibles"}`}
        >
          <p className="cinemaListTitle">Cinema List</p>
          <div className="cinemaListScroll">
            {cinemaList.map((cinema, idx) => (
              <CinemaLists
                key={idx}
                bioskop={cinema}
                handleclick={handleClickCinema}
              >
                {cinema.name}
              </CinemaLists>
            ))}
          </div>
        </div>

        <div
          className={`bioskopListContainer ${timeVisibility ? "visibles" : ""}`}
        >
          <p className="cinemaListTitle" id="timeTitle">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setTimeVisibility(false)}
            >
              &larr;
            </span>
            {cinemaData.name} (Pick a Time)
          </p>
          <div className="cinemaListScroll">
            {timeList.map((time, idx) => (
              <TimeLists key={idx} handleclick={handleClickTime}>
                {time.showTime}
              </TimeLists>
            ))}
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
                {seat.rowCharacter + seat.columnNumber}
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

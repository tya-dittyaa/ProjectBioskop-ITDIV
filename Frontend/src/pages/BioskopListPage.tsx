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

const SeatDesign = ({ children, status, handleclick, id, temp }) => {
  return (
    <div
      className={`${status} seatDetail`}
      onClick={() => handleclick(status, id, temp)}
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

const TimeLists = ({ children, handleclick, schedule }) => {
  return (
    <div onClick={() => handleclick(schedule)} className="cinemaLists">
      {children}
    </div>
  );
};
const BioskopListPage = () => {
  // const [purchasedSeat, setPurchasedSeat] = useState([]);
  let purchasedSeat = [{}];
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const [timeVisibility, setTimeVisibility] = useState(false);
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [cinemaData, setCinemaData] = useState({});
  const [cinemaList, setCinemaList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [scheduleData, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);
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
        console.log(data.data);
        setTimeList(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTime();
  };

  const handleClickTime = (schedule) => {
    // console.log("id "+schedule.scheduleId)
    setSchedule(schedule);
    setSeatVisibility(true);
    // setPurchasedSeat([]);
    purchasedSeat = [];
    const getTaken = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/seat/purchased",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer fredjefdrewkardit",
            },
            body: JSON.stringify({ scheduleId: schedule.scheduleId }),
          }
        );
        const data = await response.json();
        purchasedSeat = data;
      } catch (error) {
        console.log(error);
      }
    };

    getTaken().then(()=>{
      // cek taken seat
      seatList.map((seat, idx) => {
        for (let i = 0; i < purchasedSeat.length; i++) {
          let taken = purchasedSeat[i];
          if (
            seat.columnNumber === taken.columnNumber &&
            seat.rowCharacter === taken.rowCharacter
          ) {
            seatList[idx].status = "taken";
            break;
          }
        }
      });
      setLoading(false)
    })
  };


  const handleClickSeat = (status, id, temp) => {
    let seatTemp = {
      columnNumber: temp.columnNumber,
      rowCharacter: temp.rowCharacter,
    };
    if (status === "available") {
      seatList[id].status = "taken";
      setSeats((prevSeats) => [...prevSeats, seatTemp]);
    } else {
      // masih disini(masih error blm ilang)
      for (let i = 0; i < seats.length; i++) {
        if (
          temp.columnNumber === seats[i].columnNumber &&
          temp.rowCharacter === seats[i].rowCharacter
        ) {
          seats.splice(i, 1);
          break;
        }
      }
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
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
    getCinema();
  }, []);

  const handleBack = () => {
    setSeatVisibility(false);
    setSeats([]);
    setLoading(true);
    seatList.forEach((s) => {
      s.status = "available";
    });
  };

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
            {timeList.length === 0 ? (
              <p>No Schedule Available</p>
            ) : (
              timeList.map((time, idx) => (
                <TimeLists
                  key={idx}
                  handleclick={handleClickTime}
                  schedule={time}
                >
                  {time.showTime}
                </TimeLists>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={`seatContainer ${seatVisibility ? "visibles" : ""}`}>
        <div
          className={`seatListContainer ${seatVisibility ? "visibles" : ""}`}
        >
          <p className="cinemaListTitle">
            <span style={{ cursor: "pointer" }} onClick={handleBack}>
              &larr;
            </span>
            {scheduleData.showTime} (Pick Available Seats)
          </p>
          <div className="screenDiv">screen</div>
          <div className="seatDiv">
            {loading? (<p>Loading...</p>):(

            seatList.map((seat, idx) => (
              <SeatDesign
                key={idx}
                id={idx}
                temp={seat}
                handleclick={handleClickSeat}
                status={seat.status}
              >
                {console.log(seat.status)}
                {seat.rowCharacter + seat.columnNumber}
              </SeatDesign>
            )
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

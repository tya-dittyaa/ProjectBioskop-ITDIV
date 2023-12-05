import { useEffect, useState } from "react";
import NavBar from "./assets/NavBar";
import WatchingPic from "./assets/Watching.png";
import avengerPic from "./assets/avenger.jpeg";
import { Link } from "react-router-dom";

const popularMovies = [
  {
    name: "Avenger: Endgame",
    image: avengerPic,
    rating: 9.5,
    synopsis:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan,Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
  },
  {
    name: "Spiderman",
    image: avengerPic,
    rating: 9.5,
    synopsis:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan,Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
  },
  {
    name: "Iron Man 3",
    image: avengerPic,
    rating: 9.5,
    synopsis:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan,Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
  },
  {
    name: "The Hulk",
    image: avengerPic,
    rating: 9.5,
    synopsis:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan,Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
  },
];



const HomePage = () => {
  useEffect(() => {
    fetch("https://api-bioskop13.dittyaa.my.id/film/top3")
    .then(res => {return res.json()})
    .then(data =>{
      console.log(data)
    })
}, []);

  const [index, setIndex] = useState(0);
  const loggedIn = window.localStorage.getItem('isLoggedIn')
  const handlePrevIndex = () => {
    if (index === 0) {
      setIndex(popularMovies.length - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextIndex = () => {
    if (index === popularMovies.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <NavBar />
      <div className="heroContainer">
        <p>
          "Nikmati Film-Film Terbaru<br></br> Bersama
          <span style={{ color: "#ffcd29" }}> NontonYuk!</span>"
        </p>
        <p style={{ fontSize: "1.8vw", marginTop: "3vw" }}>
          Segera Pesan Tiket untuk Memulai Petualangan Anda
        </p>
        <img className="watchingPic" src={WatchingPic}></img>
      </div>

      <div className={`centerDiv ${loggedIn === 'true'? "unVisible" : "visible"}`}>
        <Link to={"/register"} className="daftarButton">
          Daftar Sekarang
        </Link>
      </div>
      <p className="popularTitle">Popular Movies</p>
      <div className="popularMoviesContainer">
        <div className="leftArrow" onClick={handlePrevIndex}>
          &lt;
        </div>
        <div className="rightArrow" onClick={handleNextIndex}>
          &gt;
        </div>
        <div className="popularMoviesLeft">
          <p className="popularMoviesTitle">{popularMovies[index].name}</p>
          <p>{popularMovies[index].rating}</p>
          <p>{popularMovies[index].synopsis}</p>
        </div>
        <img
          src={popularMovies[index].image}
          className="popularMoviesRight"
        ></img>
      </div>
    </>
  );
};

export default HomePage;

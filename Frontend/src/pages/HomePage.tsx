import { useEffect, useState } from "react";
import NavBar from "./assets/NavBar";
import WatchingPic from "./assets/Watching.png";
import starPic from "./assets/star.png";
import { Link } from "react-router-dom";




const HomePage = () => {
  const [recommendMovies,setRecommend]= useState([])
  useEffect(() => {
    const fetchRecommend=async ()=>{
      const response = await fetch(
        "https://api-bioskop13.dittyaa.my.id/film/random",
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
      setRecommend(data)
      
    }
    fetchRecommend();
}, []);

  const [index, setIndex] = useState(0);
  const loggedIn = window.localStorage.getItem('isLoggedIn')
  const handlePrevIndex = () => {
    if (index === 0) {
      setIndex(recommendMovies.length - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextIndex = () => {
    if (index === recommendMovies.length - 1) {
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

      <div
        className={`centerDiv ${loggedIn === "true" ? "unVisible" : "visible"}`}
      >
        <Link to={"/register"} className="daftarButton">
          Daftar Sekarang
        </Link>
      </div>
      <p className="popularTitle">Popular Movies</p>
      <div className="popularMoviesContainer">
        {recommendMovies.length > 0 ? (
          <>
            <div className="leftArrow" onClick={handlePrevIndex}>
              &lt;
            </div>
            <div className="rightArrow" onClick={handleNextIndex}>
              &gt;
            </div>
            <div className="popularMoviesLeft">
              <p className="popularMoviesTitle">
                {recommendMovies[index].title}
              </p>
              <p style={{fontSize: "20px"}}><img width={"20px"} src={starPic}></img> {recommendMovies[index].filmRating}</p>
              <p>{recommendMovies[index].description}</p>
            </div>
            <img
              src={recommendMovies[index].image_link}
              className="popularMoviesRight"
            ></img>
          </>
        ) : (
          <p> Loading... </p>
        )}
      </div>

      {/* {recommendMovies.map((movie,idx)=>(
        <div key={idx}>
          <p>{movie.title}</p>
        </div>
      ))} */}
    </>
  );
};

export default HomePage;

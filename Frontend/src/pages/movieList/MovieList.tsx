import NavBar from "../assets/NavBar";
import "./movieList.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [comings, setComings] = useState([]);
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
    const getComing = async () => {
      try {
        const response = await fetch(
          "https://api-bioskop13.dittyaa.my.id/film/comingsoon",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer fredjefdrewkardit",
            },
          }
        );
        const data = await response.json();
        setComings(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
    getComing();
  }, []);

  return (
    <>
      <NavBar />
      <div className="movieList">
        <div className="nowPlaying">
          <h1>NOW SHOWING</h1>
          <div className="nowPlayingContainer">
            {movies.map((movie) => (
              <Link to={`/bioskop/${movie.id}`} key={movie.id}>
                <div className="nowPlayingList">
                  <img src={movie.image_link} alt="" />
                  <span>{movie.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="comingSoon">
          <h1>COMING SOON</h1>
          <div className="comingSoonContainer">
            {comings.map((coming) => (
              <div className="comingSoonList" key={coming.id}>
                <img src={coming.image_link} alt="" />
                <span>{coming.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

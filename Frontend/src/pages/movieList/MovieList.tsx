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

  const MovieCardNow =({id,image_link,title})=>{
    return (
      <Link to={`/bioskop/${id}`}>
        <div className="nowPlayingList">
          <img src={image_link} alt="" />
          <span>{title}</span>
        </div>
      </Link>
    );
  }

  const MovieCardComing = ({ image_link, title }) => {
    return (
      <div className="comingSoonList">
        <img src={image_link} alt="" />
        <span>{title}</span>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="movieList">
        <div className="nowPlaying">
          <h1>NOW SHOWING</h1>
          <div className="nowPlayingContainer">
            {movies.map((movie) => (
              <MovieCardNow id={movie.id} key={movie.id} image_link={movie.image_link}
              title ={movie.title}
              ></MovieCardNow>
            ))}
          </div>
        </div>

        <div className="comingSoon">
          <h1>COMING SOON</h1>
          <div className="comingSoonContainer">
            {comings.map((coming) => (
              <MovieCardComing image_link={coming.image_link} title={coming.title}></MovieCardComing>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import NavBar from '../assets/NavBar';
import './movieList.css'
import { Link } from 'react-router-dom'
export default function MovieList(){
    return (
      <>
      <NavBar/>
        <div className="movieList">
          <div className="nowPlaying">
            <h1>NOW SHOWING</h1>
            <div className="nowPlayingContainer">
              <div className="nowPlayingList">
                <img src="1.jpg" alt="" />
                <span>
                  THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES (IMAX 2D)
                </span>
              </div>
              <div className="nowPlayingList">
                <img src="2.jpg" alt="" />
                <span>
                  THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES
                </span>
              </div>
              <div className="nowPlayingList">
                <img src="3.jpg" alt="" />
                <span>SIJJIN</span>
              </div>
              <div className="nowPlayingList">
                <img src="4.jpg" alt="" />
                <span>RUMAH IBLIS</span>
              </div>
              <div className="nowPlayingList">
                <img src="5.jpg" alt="" />
                <span>172 DAYS</span>
              </div>
            </div>
          </div>

          <div className="comingSoon">
            <h1>COMING SOON</h1>
            <div className="comingSoonContainer">
              <Link to="">
                <div className="comingSoonList">
                  <img src="1.jpg" alt="" />
                  <span>
                    THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES (IMAX
                    2D)
                  </span>
                </div>
              </Link>

              <div className="comingSoonList">
                <img src="2.jpg" alt="" />
                <span>
                  THE HUNGER GAMES: THE BALLAD OF SONGBIRDS AND SNAKES
                </span>
              </div>

              <div className="comingSoonList">
                <img src="3.jpg" alt="" />
                <span>SIJJIN</span>
              </div>
              <div className="comingSoonList">
                <img src="4.jpg" alt="" />
                <span>RUMAH IBLIS</span>
              </div>
              <div className="comingSoonList">
                <img src="5.jpg" alt="" />
                <span>172 DAYS</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
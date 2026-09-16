import { useState, useEffect } from "react";
import movieDatabase from "../assets/movieDatabase.json";
import MovieCard from "../MovieCard/MovieCard";
import MovieSkeleton from "../MovieSkeleton/MovieSkeleton";
import SearchSkeleton from "../SearchSkeleton/SearchSkeleton";
import Search from "../Search/Search";
import Genrebtn from "../genre/Genrebtn";
import "./Movie.css";

function Movie() {
  const [loading, setLoading] = useState(true);
  const [selectGenre, set_SelectGenre] = useState("All");
  const [movie] = useState(movieDatabase);
  const [searchTerm, set_searchTerm] = useState("");
  const [sortBy, set_sortBy] = useState("name_a_z");

  // Skeleton loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // all genre available
  const allGenre = [
    "All",
    ...new Set(movie.flatMap((m) => m.genre.split(" "))),
  ];

  // Movie filter by search
  const filteredMovie = movie.filter((m) => {
    const searchLower = searchTerm.toLowerCase();
    const newGenre = selectGenre.toLowerCase();

    const searchMatches =
      searchLower === "" ||
      m.name.toLowerCase().includes(searchLower) ||
      m.genre.toLowerCase().includes(searchLower) ||
      m.director.toLowerCase().includes(searchLower) ||
      String(m.year).includes(searchLower) ||
      m.cast.some((actor) => actor.toLowerCase().includes(searchLower));

    const genreSelect =
      selectGenre === "All" || m.genre.toLowerCase().includes(newGenre);

    return searchMatches && genreSelect;
  });

  // Movie sort
  const soterdAndFilteredMovie = filteredMovie.sort((a, b) => {
    switch (sortBy) {
      case "name_a_z":
        return a.name.localeCompare(b.name);

      case "name_z_a":
        return b.name.localeCompare(a.name);

      case "rating_l_h":
        return a.rating - b.rating;

      case "rating_h_l":
        return b.rating - a.rating;

      case "year_nf":
        return b.year - a.year;

      case "year_of":
        return a.year - b.year;

      case "genre_a_z":
        return a.genre.localeCompare(b.genre);

      case "genre_z_a":
        return b.genre.localeCompare(a.genre);

      default:
        return a.name.localeCompare(b.name);
    }
  });

  const [fav, setFav] = useState([]);

  return (
    <div className="moives">
      <h1 className="heading" id="heading">
        My All time hit moives
      </h1>

      <hr />

      <button onClick={() => setLoading(!loading)}>
        {loading ? "Stop Skeleton Loading" : "Start Skeleton Loading"}
      </button>

      {loading ? (
        <div className="">
          <Genrebtn />
          <SearchSkeleton />

          <div className="movie-grid">
            {movieDatabase.map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        // If not loading
        <div className="main-content">
          <div className="genre-section">
            <a className={`genre-btn active`} href="#fav_movie">
              Favorite Movies
            </a>

            {allGenre.map((e) => (
              <button
                key={e}
                onClick={() => set_SelectGenre(e)}
                className={`genre-btn ${selectGenre === e ? "active" : ""} `}
              >
                {e}
              </button>
            ))}

            <div className="sort-section">
              <label htmlFor="sort-select">Sort by:</label>

              <select
                id="sort-select"
                className="select"
                onChange={(e) => set_sortBy(e.target.value)}
              >
                <option className="option" value="name_a_z">
                  Name(A-Z)
                </option>

                <option className="option" value="name_z_a">
                  Name(Z-A)
                </option>

                <option className="option" value="rating_h_l">
                  Rating(High to Low)
                </option>

                <option className="option" value="rating_l_h">
                  Rating(Low to High)
                </option>

                <option className="option" value="year_nf">
                  Year(Newest First)
                </option>

                <option className="option" value="year_of">
                  Year(Oldest First)
                </option>

                <option className="option" value="genre_a_z">
                  Genre(A-Z)
                </option>

                <option className="option" value="genre_z_a">
                  Genre(Z-A)
                </option>
              </select>
            </div>

            {selectGenre && <p>Genre Selected {selectGenre}</p>}
          </div>

          <div className="search-section">
            <Search searchTerm={searchTerm} set_searchTerm={set_searchTerm} />

            {searchTerm && (
              <p>
                Founded {soterdAndFilteredMovie.length} result
                {soterdAndFilteredMovie.length > 1 ? "s" : ""} for "{searchTerm}
                "
              </p>
            )}
          </div>

          <div className="movie-grid">
            {soterdAndFilteredMovie.length > 0 ? (
              soterdAndFilteredMovie.map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  movieName={m.name}
                  movieImg={m.movieimg}
                  year={m.year}
                  genre={m.genre}
                  s_desc={m.s_desc}
                  directorName={m.director}
                  castName={m.cast}
                  rating={m.rating}
                  fav={fav}
                  setFav={setFav}
                />
              ))
            ) : (
              <div className="empty">
                <h3>No Movies found! for '{searchTerm}'</h3>

                <p>
                  {searchTerm || selectGenre !== "All"
                    ? "Try Adjusting your search or filter criteria"
                    : "Start searching to find amazing movies!"}
                </p>

                <button
                  className="genre-btn"
                  onClick={() => {
                    set_SelectGenre("All");
                    set_searchTerm("");
                    set_sortBy("name_a_z");
                  }}
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <hr />

          <h1 id="fav_movie" className="heading">
            Favorite Movies
          </h1>

          <div className="movie-grid">
            {movie.filter((m) => fav.includes(m.id)).length > 0 ? (
              movie
                .filter((m) => fav.includes(m.id))
                .map((m) => (
                  <MovieCard
                    key={m.id}
                    id={m.id}
                    movieName={m.name}
                    movieImg={m.movieimg}
                    year={m.year}
                    genre={m.genre}
                    s_desc={m.s_desc}
                    directorName={m.director}
                    castName={m.cast}
                    rating={m.rating}
                    fav={fav}
                    setFav={setFav}
                  />
                ))
            ) : (
              <div className="empty">
                <h3>No Favorite Movies</h3>
                <p>Add some movies to your favorites!</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="top">
        <a className={`genre-btn active`} href="#heading">
          Top
        </a>
      </div>
    </div>
  );
}

export default Movie;

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

COMPONENT CONDITIONAL RENDERING

{<condition> && <component />}

COMPONENT CONDITIONAL RENDERING

{<condition> ? <valueIfTrue> : <valueIfFalse>}

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

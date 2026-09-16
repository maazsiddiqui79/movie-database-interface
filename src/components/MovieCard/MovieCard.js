import "./MovieCard.css";

function MovieCard({
  id,
  movieName,
  movieImg,
  year,
  genre,
  s_desc,
  directorName,
  castName,
  rating,
  fav,
  setFav,
}) {
  let ratingColor = null;

  if (rating === 10) {
    ratingColor = "#22C55E";
  } else if (rating === 9 || rating === 8) {
    ratingColor = "#86EFAC";
  } else if (rating >= 5 && rating <= 7) {
    ratingColor = "#D9ED92";
  } else if (rating === 3 || rating === 4) {
    ratingColor = "#FCA5A5";
  } else {
    ratingColor = "#EF4444";
  }

  const contains = fav.includes(id);

  const handelFav = () => {
    if (contains) {
      setFav((prevFav) => prevFav.filter((item) => item !== id));
    } else {
      setFav((prevFav) => [...prevFav, id]);
    }
  };

  return (
    <div className="movie-card">
      <img src={movieImg} alt={`${movieImg} poster`} className="movie-img" />

      <h3>{movieName}</h3>

      <div className="movie-info">
        <span className="year">{year}</span>
        <span className="genre"> {genre}</span>
      </div>

      <hr className="hrr" />

      <span className="s_desc">
        <span className="about">About</span>
        <span className="desc">{s_desc}</span>
      </span>

      <p className="director-name">Director Name: {directorName}</p>

      <p className="cast-name">Cast Name: {castName.join(",")}</p>

      <div className="rating" style={{ backgroundColor: `${ratingColor}` }}>
        {rating} / 10
      </div>

      <button
        className="fav"
        style={{
          backgroundColor: `${contains ? "#EC4899" : "#6366F1"}`,
        }}
        onClick={handelFav}
      >
        {contains ? "Remove from Favorite" : "Add to Favorite"}
      </button>
    </div>
  );
}

export default MovieCard;

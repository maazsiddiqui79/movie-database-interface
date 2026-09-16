import "./MovieSkeleton.css";

function MovieSkeleton() {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton movie-img-skeleton"></div>

      <div className="skeleton title-skeleton"></div>

      <div className="movie-info-skeleton">
        <div className="skeleton year-skeleton"></div>
        <div className="skeleton genre-skeleton"></div>
      </div>

      <hr />

      <div className="skeleton about-skeleton"></div>

      <div className="skeleton desc-skeleton"></div>
      <div className="skeleton desc-skeleton"></div>
      <div className="skeleton desc-small-skeleton"></div>

      <div className="skeleton director-skeleton"></div>
      <div className="skeleton cast-skeleton"></div>

      <div className="skeleton rating-skeleton"></div>
      <div className="skeleton rating-skeleton"></div>
    </div>
  );
}

export default MovieSkeleton;

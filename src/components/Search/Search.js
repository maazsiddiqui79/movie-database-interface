import "./Search.css";

function Search({searchTerm,set_searchTerm}) {
  return (
    <div className="search-section">
      <input
        placeholder="Search a movie"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          set_searchTerm(e.target.value);
        }}
        className="search-input"
      />
    </div>
  );
}

export default Search;

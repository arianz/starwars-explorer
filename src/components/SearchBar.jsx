export default function SearchBar({ query, setQuery, onSearch, placeholder = "Search..." }) {
  return (
    <form onSubmit={onSearch} className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
}
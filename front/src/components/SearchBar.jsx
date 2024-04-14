import "./SearchBar.css";
import { Search } from "react-bootstrap-icons";
function SearchBar() {
  return (
    <>
      <form className="searchbar" action="">
        <div className="rounded border rounded-pill mb-5">
          <div className="input-group">
    <button id="button-addon" type="submit" className="btn">
                <Search className="search-icon" />
              </button>
            <input
              type="search"
              placeholder="Search"
              aria-describedby="button-addon"
              className="form-control rounded-pill border-0 color"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
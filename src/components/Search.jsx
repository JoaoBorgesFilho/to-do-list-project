import { FaSearch } from "react-icons/fa";

const Search = ({ search, setSearch }) => {
    return (
        <div className="search">
            <h2>Pesquisar:</h2>
            <div className="search-input">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Digite para pesquisar..."
                />
                <span className="search-icon right">
                    <FaSearch />
                </span>
            </div>
        </div>
    );
};

export default Search;

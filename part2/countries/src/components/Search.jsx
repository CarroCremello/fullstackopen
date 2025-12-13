const Search = ({label, searchTerm, handleSearch}) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    )
}

export default Search
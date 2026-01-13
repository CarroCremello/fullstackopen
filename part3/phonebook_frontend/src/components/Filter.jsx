const Filter = ({searchTerm, handleSearch}) => {
    return (
        <div>
            <span>Filter contacts: </span>
            <input 
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    )
}

export default Filter
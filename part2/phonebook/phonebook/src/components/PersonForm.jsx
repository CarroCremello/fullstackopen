const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
            <span>Name: </span>
            <input 
                value={newName}
                onChange={handleNameChange}
                required
            />
            </div>
            <div>
            <span>Number: </span>
            <input 
                value={newNumber}
                onChange={handleNumberChange}
                required
            />
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm
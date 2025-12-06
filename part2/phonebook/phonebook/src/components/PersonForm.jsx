import Button from "./Button"

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
                <Button type="submit" text="Add" onClick={null} />
            </div>
        </form>
    )
}

export default PersonForm
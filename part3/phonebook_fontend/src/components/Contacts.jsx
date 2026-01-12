import Person from "./Person"

const Contacts = ({personsToShow, deletePerson}) => {
    return (
        <ul>
            {personsToShow.map((person)=> <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
        </ul>
    )
}

export default Contacts
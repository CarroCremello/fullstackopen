import Person from "./Person"

const Contacts = ({personsToShow}) => {
    return (
        <ul>
            {personsToShow.map((person)=> <Person key={person.id} person={person} />)}
        </ul>
    )
}

export default Contacts
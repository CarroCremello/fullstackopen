const Countries = ({countriesToShow}) => {
    return (
        <ul>
            {countriesToShow.map((country, index)=> <li key={index}>{country.name.common}</li>)}
        </ul>
    )
}

export default Countries
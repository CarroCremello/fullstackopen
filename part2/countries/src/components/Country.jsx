const Country = ({country, weather}) => {
    if (!country) return null

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>
                Capital: {country.capital}<br />
                Area: {country.area}
            </p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />

            <h3>Weather in {country.capital}</h3>
            <p>
                Temperature: {weather.temperature_2m} degrees Celcius<br />
                Wind: {weather.wind_speed_10m} m/s
            </p>
        </div>
    )
}

export default Country
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import React from 'react';
import { nanoid } from 'nanoid';

const provider = new OpenStreetMapProvider({
    params: {
    'accept-language': 'gb', // render results in Dutch
    countrycodes: 'cy', // limit search results to the Netherlands
    addressdetails: 1, // include additional address detail parts
    },
});

export default function SearchLocation({ label, route, setRoute }) {
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => {
        async function searchAddress(str) {
            let results = await provider.search({query: str})
            setSuggestions(results)
        }

        searchAddress(route[label])
    }, [route])

    function handleChange(event) {
        const { name, value } = event.target;
        setRoute(prevRoute => {
           return {
                ...prevRoute,
                [name]: value
           } 
        })
        console.log(value)
    }

    function handleSuggestionClicked(event) {
        console.log(event.target.getAttribute("x"))
        console.log(event.target.getAttribute("y"))
        setRoute(prevRoute => {
            return {
                 ...prevRoute,
                 [label]: event.target.innerHTML
            } 
         })
    }

    const allSuggestions = suggestions.map((obj) => {
        return (
            <li 
                key={nanoid()}
                onClick={handleSuggestionClicked}
                x={obj.x}
                y={obj.y}
            >{obj.label}
            </li>
        )
    })

    return (
        <>
            <label>
                {label}
                <input 
                    type='text' 
                    name={label} 
                    placeholder={label + " Location"} 
                    onChange={handleChange}
                    value={route[label]}
                />
            </label>
            <ul>{allSuggestions}</ul>
        </>
    )
}
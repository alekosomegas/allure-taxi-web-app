import { OpenStreetMapProvider } from 'leaflet-geosearch';
import React from 'react';
import { nanoid } from 'nanoid';
import Image from 'next/image';

const provider = new OpenStreetMapProvider({
    params: {
    'accept-language': 'gb',
    countrycodes: 'cy',
    addressdetails: 1,
    },
});

export default function SearchInput({ label, route, onChange, onClick, selected, onClear, isInvalid }) {

    const [suggestions, setSuggestions] = React.useState([])

    // Updates the suggestions when the route changes
    React.useEffect(() => {
        async function searchAddress(str) {
            let results = await provider.search({query: str})
            setSuggestions(results)
        }

        !selected[label] && searchAddress(route[label].address)
    }, [route[label]])

    // maps the suggestions to create a list
    const allSuggestions = suggestions.map((obj) => {
        // return nothing if a suggestion already selected
        if (selected[label]) return;

        return (
            <li 
                key={nanoid()}
                onClick={onClick}
                x={obj.x}
                y={obj.y}
            >{obj.label}
            </li>
        )
    })

    return (
        <div className='wrapper'>
            <div className={`search-container-${label}`}>
                <div className='search-icon'>
                <Image 
                        src={`/icons/${label}.png`}
                        width={18}
                        height={18}
                        alt={"dest"}
                    />
                </div>
                <label>
                    <input 
                        type='text' 
                        name={label} 
                        placeholder={label === "from" ? "Pick-up Location" : "Drop-off Location"} 
                        onChange={onChange}
                        value={route[label].address}
                        className={`input-search ${isInvalid && "check"}`}
                    />
                </label>
                    {
                        route[label].address && 
                        <button type="button" onClick={onClear} className="btn-clear">x</button>
                    }
                    
            </div>

            <div className='suggestions'>
                <ul>{allSuggestions}</ul>
            </div>
        </div>
    )
} 
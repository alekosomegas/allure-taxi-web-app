import DatePicker from "./DatePicker"
import dynamic from "next/dynamic"
import React from "react"
import Link from "next/link"

// import a non server side rendered search component(leaflet)
const SearchInput = dynamic(() => import("./SearchInput"), {
    ssr: false})
    
// Used by the RideRequest parent
export default function RouteForm({ route, setRoute, selected, setSelected, confirm }) {
    const [ride, setRide] = React.useState({
        route: route,
        notesFrom: "",
        notesTo: "",
        dateAndTime: "",
        email: "",
        tel: "",
        name: "",
        requests: "",
    })
    
    function handleRideChange(event) {
        const { name, value } = event.target
        setRide(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Passed to its children(search) to handle text input
    function handleChange(event) {
        const { name, value } = event.target;
        setRoute(prevRoute => {
           return {
                ...prevRoute,
                [name] : {coordinates: [], address: value}
           }})

        // resets the location selected bool at new input
        setSelected(prev => {
            return {
                ...prev,
                [name]: false
            }})
    }

    // Handles the event when a suggestion is clicked 
    // Uses label to distinguish between inputs
    function handleSuggestionClicked(event, label) {
        setRoute(prevRoute => {
            return {
                 ...prevRoute,
                 [label]: {coordinates: [event.target.getAttribute('y'), event.target.getAttribute('x')], address: event.target.innerHTML}
            } 
         })
        
         // prevents suggestions from showing
         setSelected(prev => {
            return {
                ...prev,
                [label]: true
            }})
    }

    function handleClear(event, label) {
        setRoute(prev => {
            return {
                ...prev,
                [label]: {coordinates: [], address: ""}
            }
        })

        setSelected(prev => {
            return {
                ...prev,
                [label]: false
            }})
    }

    return (
        <div className="ride-request--container">
        <form 
            className={confirm ? "ride-request--confirm" : "ride-request--search"}
            id={confirm ? "form-c" : "form-s"}
            >

            {confirm ? 
                <h5 className="confirm-title">Please provide more details</h5>
                :   
                <h3 className="book-title">Request a Ride</h3>
            }

            <SearchInput 
                label="from" 
                route={route} 
                setRoute={setRoute}
                selected={selected}
                onChange={handleChange} 
                onClick={(event) => handleSuggestionClicked(event, "from")}
                onClear={(event) => handleClear(event, "from")}
            />

            {confirm && 
                <input 
                    className="input-extra"
                    type={'text'}
                    placeholder={'notes eg. house no.'}
                    value={ride.notesFrom}
                    onChange={handleRideChange}
                    name="notesFrom"
                />
            }

            <SearchInput 
                label="to"   
                route={route}
                setRoute={setRoute} 
                selected={selected} 
                onChange={handleChange} 
                onClick={(event) => handleSuggestionClicked(event, "to")}
                onClear={(event) => handleClear(event, "to")}
            />

            {confirm && 
                <input 
                    className="input-extra"
                    type={'text'}
                    placeholder={'notes eg. house no.'}
                    value={ride.notesTo}
                    onChange={handleRideChange}
                    name="notesTo"
                    
                />
            }

            <br></br>
            <label style={{fontWeight: "600"}}>
                Date and Time
                <DatePicker />
            </label>



            {confirm &&
            <div>
                <label>
                    <input
                        className="input-extra"
                        type={'email'}
                        placeholder="Email" 
                        value={ride.email}
                        onChange={handleRideChange}
                        name="email"
                    />
                </label>
                <label>
                    <input
                        className="input-extra"
                        type={'tel'}
                        placeholder="Tel" 
                        value={ride.tel}
                        onChange={handleRideChange}
                        name='tel'
                    />
                </label>
                <label>
                    <input
                        className="input-extra"
                        type={'text'}
                        placeholder="Name"
                        value={ride.name}
                        onChange={handleRideChange}
                        name='name' 
                    />
                </label>
                <label>
                    <textarea
                        className="input-extra"
                        type={'text'}
                        placeholder="Requests eg. No of people, bags etc." 
                        value={ride.requests}
                        onChange={handleRideChange}
                        name='requests'
                    />
                </label>
                
                <Link href={{pathname:"/request-sent", query:{}}}>
                    <button 
                        className="btn-book" 
                        type="submit"
                        style={{fontWeight: "600"}}
                        form="form-c"
                        >Book Now
                    </button>
                </Link>
            </div>
    
            }
            </form>
            {!confirm &&
                <Link href={{pathname:"/confirm-ride", query:{}}}>
                    <button 
                        className="btn-book" 
                        type="button"
                        style={{fontWeight: "600"}}
                        >Book Now
                    </button>
                </Link>
            }
        </div>
    )
}
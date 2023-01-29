import DatePicker from "./DatePicker"
import dynamic from "next/dynamic"
import React from "react"
import Link from "next/link"
import {useRouter} from "next/router"
import {changeSingleStateValue} from '../../util'

// import a non server side rendered search component(leaflet)
const SearchInput = dynamic(() => import("./SearchInput"), {
    ssr: false})
    
// Used by the RideRequest parent
export default function RouteForm({  ride, setRide, confirm }) {
    const router = useRouter();

    function handleRideExtraChange(event) {
        const { name, value } = event.target
        if(name === "tel" && isNaN(event.nativeEvent.data)) {
            return}

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
        setRide(prev => {
           return {
                ...prev,
                route: {
                    ...prev.route,
                    [name] : {coordinates: [], address: value}},
                locationSelected: {...prev.locationSelected,
                                    [name]: false}
           }})
    }

    // Handles the event when a suggestion is clicked 
    // Uses label to distinguish between inputs
    function handleSuggestionClicked(event, label) {
        setRide(prev => {
            return {
                 ...prev,
                 route: {
                    ...prev.route,
                    [label]: {coordinates: [event.target.getAttribute('y'), event.target.getAttribute('x')],
                              address: event.target.innerHTML}},
                locationSelected: {...prev.locationSelected,
                                    [label]: true}
            } 
         })
    }

    function handleClear(event, label) {
        setRide(prev => {
            return {
                ...prev,
                route: {
                    ...prev.route,
                    [label]: {coordinates: [], address: ""}},
                locationSelected: {...prev.locationSelected,
                                    [label]: false}
            }
        })
    }

    const [invalidInputs, setInvalidInputs] = React.useState({from: false, to: false, tel: false})
    React.useEffect(() => {
        if(ride.route.from.address) {
            changeSingleStateValue(setInvalidInputs, "from", false)
        }

        if(ride.route.to.address) {
            changeSingleStateValue(setInvalidInputs, "to", false)
        }

        if(ride.tel) {
            changeSingleStateValue(setInvalidInputs, "tel", false)
        }
    }, [ride])

    function validateInputs() {
        let formIsValid = true

        if (!ride.route.from.address) {
            formIsValid = false;
            changeSingleStateValue(setInvalidInputs, "from", true)
        }
        if (!ride.route.to.address) {
            formIsValid = false;
            changeSingleStateValue(setInvalidInputs, "to", true)
        }    
        if (!ride.tel) {
            formIsValid = false;
            changeSingleStateValue(setInvalidInputs, "tel", true)
        }

        return formIsValid;
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (validateInputs()) {
            await fetch('api/mail', {
                method: 'POST',
                body: JSON.stringify(ride)
            })
            router.push("/request-sent")
        } else {
            alert("Please check inputs")
            router.push("/confirm-ride")
        }
    }

    return (
        <div className="ride-request--container">
        <form 
            className={confirm ? "ride-request--confirm" : "ride-request--search"}
            id={confirm ? "form-c" : "form-s"}
            method='post'
            onSubmit={handleSubmit}
            >

            {confirm ? 
                <h5 className="confirm-title">Please provide more details</h5>
                :   
                <h3 className="book-title">Request a Ride</h3>
            }

            <SearchInput 
                label="from" 
                route={ride.route} 
                selected={ride.locationSelected}
                onChange={handleChange} 
                onClick={(event) => handleSuggestionClicked(event, "from")}
                onClear={(event) => handleClear(event, "from")}
                isInvalid={invalidInputs.from}
            />
            {invalidInputs.from && 
                <span className="errors">Cannot be empty</span>
            }

            {confirm && 
                <input 
                    className="input-extra"
                    type={'text'}
                    placeholder={'notes eg. house no.'}
                    value={ride.notesFrom}
                    onChange={handleRideExtraChange}
                    name="notesFrom"
                />
            }

            <SearchInput 
                label="to"   
                route={ride.route} 
                selected={ride.locationSelected} 
                onChange={handleChange} 
                onClick={(event) => handleSuggestionClicked(event, "to")}
                onClear={(event) => handleClear(event, "to")}
                isInvalid={invalidInputs.to}
            />
            {invalidInputs.to && 
                <span className="errors">Cannot be empty</span>
            }

            {confirm && 
                <input 
                    className="input-extra"
                    type={'text'}
                    placeholder={'notes eg. house no.'}
                    value={ride.notesTo}
                    onChange={handleRideExtraChange}
                    name="notesTo"
                />
            }

            <br></br>
            <label style={{fontWeight: "600"}}>
                Date and Time
                <DatePicker 
                    ride={ride} setRide={setRide}
                />
            </label>

            {confirm &&
            <div>
                <label>
                    <input
                        className={`input-extra ${invalidInputs.email && "check"}`}
                        type={'email'}
                        placeholder="Email" 
                        value={ride.email}
                        onChange={handleRideExtraChange}
                        name="email"
                    />
                </label>
                <label>
                    <input
                        className={`input-extra ${invalidInputs.tel && "check"}`}
                        type={'tel'}
                        placeholder="Tel*" 
                        required={true}
                        value={ride.tel}
                        onChange={handleRideExtraChange}
                        name='tel'
                    />
                </label>
                {invalidInputs.tel && 
                <span className="errors">Cannot be empty</span>
                }
                <label>
                    <input
                        className="input-extra"
                        type={'text'}
                        placeholder="Name"
                        value={ride.name}
                        onChange={handleRideExtraChange}
                        name='name' 
                    />
                </label>
                <div className="select-car">
                    <label>
                        Select car
                    </label>
                    <select 
                        value={ride.car}
                        onChange={handleRideExtraChange}
                        name="car"
                        >
                        <option 
                            value={4}
                            >4-Seater</option>
                        <option 
                            value={6}
                            >6-Seater</option>
                    </select>
                </div>
                <label>
                    <textarea
                        className="input-extra"
                        type={'text'}
                        placeholder="Requests eg. No of people, bags etc." 
                        value={ride.requests}
                        onChange={handleRideExtraChange}
                        name='requests'
                    />
                </label>
                
                    <button 
                        className="btn-book" 
                        type="submit"
                        style={{fontWeight: "600"}}
                        form="form-c"
                        onClick={handleSubmit}
                        >Book Now
                    </button>
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
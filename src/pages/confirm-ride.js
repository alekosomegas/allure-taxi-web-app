import RideRequest from "@/components/RideRequest"
import Link from "next/link"

export default function ConfirmRide({ route, setRoute, selected, setSelected }) {
    // TODO: confirm inputs (route)
    //          use new ride request
    return (
        <>
            <h1>Confirm</h1>
            <RideRequest 
                confirm={true}
                route={route} setRoute={setRoute} 
                selected={selected} setSelected={setSelected} 
            />

            <label>
                Email:
                <input
                    type={'email'}
                    placeholder="Email" 
                />
            </label>
            <label>
                Tel:
                <input
                    type={'tel'}
                    placeholder="Tel" 
                />
            </label>
            <label>
                Name:
                <input
                    type={'text'}
                    placeholder="Name" 
                />
            </label>
            <label>
                Requests:
                <textarea
                    type={'text'}
                    placeholder="eg. No of Bags" 
                />
            </label>

 
            <Link href={{pathname:"/request-sent", query:{}}}>
                <button type="button">Book Now</button>
            </Link>

        </>

    )
}
import RideRequest from "@/components/RideRequest"
import Link from "next/link"

export default function ConfirmRide({ route, setRoute, selected, setSelected }) {
    // TODO: confirm inputs (route)
    //          use new ride request
    return (
        <>
            <RideRequest 
                confirm={true}
                route={route} setRoute={setRoute} 
                selected={selected} setSelected={setSelected} 
            />
        </>

    )
}
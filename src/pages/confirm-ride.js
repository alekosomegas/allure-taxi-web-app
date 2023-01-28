import RideRequest from "@/components/RideRequest"
import Link from "next/link"

export default function ConfirmRide({ date, setDate, ride, setRide, route, setRoute, selected, setSelected }) {
    // TODO: confirm inputs (route)
    //          use new ride request

    return (
        <>
            <RideRequest 
                date={date} setDate={setDate}
                ride={ride} setRide={setRide}
                confirm={true}
                route={route} setRoute={setRoute} 
                selected={selected} setSelected={setSelected} 
            />
        </>

    )
}
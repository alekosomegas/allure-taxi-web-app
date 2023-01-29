import RideRequest from "@/components/RideRequest"
import Link from "next/link"

export default function ConfirmRide({ ride, setRide }) {

    return (
        <>
            <RideRequest 
                ride={ride} setRide={setRide}
                confirm={true}
            />
        </>

    )
}
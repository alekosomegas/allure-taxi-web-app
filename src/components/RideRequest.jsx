import RouteForm from "./RideRequest/RouteForm";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const MapWithNoSSR = dynamic(() => import("./RideRequest/Map"), {
    ssr: false});

// TODO: sort out how rerender happens, need to be able to select location on map
export default function RideRequest({ ride, setRide, confirm }) {

    async function reverseAddressFinder(lat, lng, label) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&zoom=18&format=json`
        var result = fetch(url)
        .then(response => {
            if(!response.ok){
        }
        return response.json()
        })
        .then(responseJson =>{
            setRide(prev => {
                return {
                    ...prev,
                    route: { ...prev.route,
                            [label]: {coordinates: prev.route[label].coordinates, 
                                address: responseJson.display_name }
                            }
                }
            }) 
        })
    }

    function markerMoveHandlerFrom(event) {
        setRide(prev => {
            return {
                ...prev,
                route: { ...prev.route,
                        from: {coordinates: [event.target._latlng.lat, event.target._latlng.lng],
                               address: prev.route.from.address}
                }
            }
        })
        reverseAddressFinder(event.target._latlng.lat, event.target._latlng.lng, 'from')
    }

    function markerMoveHandlerTo(event) {
        setRide(prev => {
            return {
                ...prev,
                route: { ...prev.route,
                    to: {coordinates: [event.target._latlng.lat, event.target._latlng.lng],
                         address: prev.route.to.address }
                }
            }
        })
        reverseAddressFinder(event.target._latlng.lat, event.target._latlng.lng, 'to')
    }
        
    return (
        <div className="ride" id="Ride">
            <div className="ride-request">

                <div className={`map-container ${confirm && "map-c"}`}>
                    {((ride.locationSelected.from || ride.locationSelected.to) || confirm) &&
                            <MapWithNoSSR 
                                from={ride.route.from.coordinates} to={ride.route.to.coordinates} 
                                markerMoveHandlerFrom={markerMoveHandlerFrom} markerMoveHandlerTo={markerMoveHandlerTo}
                            />                    
                    }      
                </div>  
                    
                <RouteForm 
                    ride={ride} setRide={setRide} 
                    confirm={confirm}
                />
            </div>

            <div className="image-container">
                {!confirm && 
                    <Image className="hero-img" src="/images/home.jpg" width={1000} height={600} alt=""/>
                }
            </div>
            
        </div>
    )
}
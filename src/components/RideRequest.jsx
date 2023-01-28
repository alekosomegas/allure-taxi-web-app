import RouteForm from "./RideRequest/RouteForm";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const MapWithNoSSR = dynamic(() => import("./RideRequest/Map"), {
    ssr: false});

// TODO: sort out how rerender happens, need to be able to select location on map
export default function RideRequest({ date, setDate, ride, setRide, route, setRoute, selected, setSelected, confirm }) {

    async function reverseAddressFinder(lat, lng, label) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&zoom=18&format=json`
        var result = fetch(url)
        .then(response => {
            if(!response.ok){
        }
        return response.json()
        })
        .then(responseJson =>{
            setRoute(prev => {
                return {
                    ...prev,
                    [label]: {coordinates: prev[label].coordinates, address: responseJson.display_name }
                }
            }) 
        })
    }

    function markerMoveHandlerFrom(event) {
        setRoute(prev => {
            return {
                ...prev,
                from: {coordinates: [event.target._latlng.lat, event.target._latlng.lng] , address: prev.from.address}
            }
        })
        reverseAddressFinder(event.target._latlng.lat, event.target._latlng.lng, 'from')
    }

    function markerMoveHandlerTo(event) {
        setRoute(prev => {
            return {
                ...prev,
                to: {coordinates: [event.target._latlng.lat, event.target._latlng.lng], address: prev.to.address }
            }
        })
        reverseAddressFinder(event.target._latlng.lat, event.target._latlng.lng, 'to')
    }
        
    return (
        <div className="ride" id="Ride">
            <div className="ride-request">

                <div className={`map-container ${confirm && "map-c"}`}>
                    {((selected.from || selected.to) || confirm) &&
                            <MapWithNoSSR 
                                from={route.from.coordinates} to={route.to.coordinates} 
                                markerMoveHandlerFrom={markerMoveHandlerFrom} markerMoveHandlerTo={markerMoveHandlerTo}
                            />                    
                        }
                        
                </div>  
                    
                <RouteForm 
                    date={date} setDate={setDate}
                    ride={ride} setRide={setRide}
                    route={route} setRoute={setRoute} 
                    selected={selected} setSelected={setSelected}
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
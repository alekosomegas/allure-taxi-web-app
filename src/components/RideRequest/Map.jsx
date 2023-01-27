import { MapContainer, TileLayer, Marker, Polyline, useMapEvent } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { icon } from 'leaflet'

function FitBounds({ fit, coordinates }) {
    if (!fit) return
    const map = useMap()
    map.flyToBounds(coordinates)
}

function SetView({ set, center }) {
    if (!set) return
    const map = useMap()
    map.flyTo(center, 15)
}

const fromIcon = icon({
    iconUrl: '/icons/from.png',
    iconSize: [40,40],
    iconAnchor: [20, 35],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
})
const toIcon = icon({
    iconUrl: '/icons/to.png',
    iconSize: [40,40],
    iconAnchor: [20, 35],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
})

export default function Map(props) {

    return (
        <MapContainer 
            center={props.from.length > 0 ? props.from : [34.70612, 33.11655]} 
            zoom={15} 
            style={{height: "100%", width: "100%"}}
            >

            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {props.from.length > 0 && 
                <Marker 
                    icon={fromIcon}
                    position={props.from} 
                    draggable={true} 
                    eventHandlers={{
                        moveend: props.markerMoveHandlerFrom,
                    }}
                />
            }
            {props.to.length > 0 && 
                <Marker 
                    icon={toIcon}
                    position={props.to} 
                    draggable={true} 
                    eventHandlers={{
                        moveend: props.markerMoveHandlerTo,
                    }}
                    />
            }
            {props.from.length > 0 && props.to.length > 0 && 
                <Polyline positions={[props.from, props.to]} />
            }

            <FitBounds fit={props.from.length > 0 && props.to.length > 0} coordinates={[props.from, props.to]}/>
            <SetView 
                set={(props.from.length > 0 && !props.to.length > 0) || (!props.from.length > 0 && props.to.length > 0)} 
                center={props.from.length > 0 ? props.from : props.to.length > 0 ? props.to : [34.70612, 33.11655]} />

        </MapContainer>

    )
}
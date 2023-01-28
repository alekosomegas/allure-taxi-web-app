import '@/styles/globals.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }) {

  const [locationSelected, setLocationSelected] = React.useState(false);
      // whether a location is selected
  const [selected, setSelected] = React.useState({from: false, to: false})
  const [route, setRoute] = React.useState(
      {from: {coordinates: [], address: ""}, 
       to:   {coordinates: [], address: ""}})

  const [date, setDate] = React.useState(new Date());

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

  const [contact, setContact] = React.useState({
      contact: false,
      name: "",
      email: "",
      tel: "",
      message: "",
  })
    

  return (
    <>
        <Navbar />
        <Component 
            {...pageProps} 
            contact={contact}
            setContact={setContact}
            date={date}
            setDate={setDate}
            ride={ride}
            setRide={setRide}
            route={route}
            setRoute={setRoute}
            locationSelected={locationSelected}
            setLocationSelected={setLocationSelected}
            selected={selected}
            setSelected={setSelected}
            
          />
    </>

        )
}

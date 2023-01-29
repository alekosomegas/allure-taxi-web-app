import '@/styles/globals.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }) {
  const [ride, setRide] = React.useState({
        route: {
            from: {
                address: "",
                coordinates: [],
            },
            to: {
                address: "",
                coordinates: [],
            },
        },
        locationSelected: {from: false, to: false},
        notesFrom: "",
        notesTo: "",
        dateAndTime: new Date(),
        email: "",
        tel: "",
        name: "",
        car: 4,
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
            ride={ride}
            setRide={setRide}
          />
    </>

        )
}

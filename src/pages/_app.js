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

  return (
    <>
        <Navbar />
        <Component 
            {...pageProps} 
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

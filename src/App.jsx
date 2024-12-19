import React from 'react'
import { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Navbar from './components/Navbar'
import HospitalList from './components/HospitalList'
import HospitalMap from './components/HospitalMap';
function App() {

  const [location, setLocation] = useState({})
  const [hospital, setHospial] = useState([])
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState(4)

  const libraries = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDyvTvU89e-PTuzB24DpgbEks_AEjlH5Os',
    libraries
  })

  if (!isLoaded) return <div>....is Loading</div>

  const geocodeAddress = () => {
    const geocode = new window.google.maps.Geocoder()
    geocode.geocode({ address }, (result, status) => {
      if (status === 'OK') {
        const { location } = result[0].geometry()
        setLocation({ lat: location.lat(), lng: location.lng() })
        console.log("Latitiude and longitude is set successfully")
      } else {
        console.log("Latitiude and longitude is not set")
      }
    })
  }

  const findHospital = () => {
    if (!location) {
      console.log('Location is not defined')
      return
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    )

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: parseInt(radius),
      type: ["hospital"]
    }

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospial(results)
        console.log("Hospitals found")
      } else {
        console.log("No hospital found")
      }
    })

  }

  const handleSearch = () => {
    geocodeAddress()
    findHospital()
  }

  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <div className='w-full flex gap-4 justify-center mt-8'>
        <input type="text" className='border-2 p-2 rounded-md w-[300px]' placeholder='Enter The Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        <button className='bg-blue-500 text-white px-2 py-2 rounded-md' onClick={handleSearch}>Search Hospital</button>
      </div>
      <div>
        <button className='p-3 bg-blue-500 text-white rounded-md'>+</button>
        <p className='bg-blue-500 text-white p-4 round'>{`Radius : ${radius}`}</p>
        <button className='p-3 bg-blue-500 text-white'>-</button>
      </div>
      <HospitalList hospital={hospital} />
      <HospitalMap />
    </div>
  )
}

export default App
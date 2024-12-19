import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api";
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

  const geocodeAddress = async () => {
    const geocode = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocode.geocode({ address }, (result, status) => {
        if (status === 'OK') {
          const { location } = result[0].geometry;
          const latLng = { lat: location.lat(), lng: location.lng() };
          setLocation(latLng);
          console.log("Latitude and longitude are set successfully");
          resolve(latLng);
        } else {
          console.log("Latitude and longitude are not set");
          reject("Geocoding failed");
        }
      });
    });
  };


  const findHospital = (location) => {
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
        console.log("result", results);
        setHospial(results)
        console.log("Hospitals found")
      } else {
        console.log("No hospital found")
      }
    })

  }

  const handleSearch = async () => {
    try {
      const latLng = await geocodeAddress()
      if (latLng) {
        findHospital(latLng)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const increaseRadius = () => {
    setRadius(prev => prev + 1)
    handleSearch()
  }

  const decreaseRadius = () => {
    setRadius(prev => prev - 1)
    handleSearch()
  }

 
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <div className='w-full flex gap-4 justify-center mt-8'>
        <input type="text" className='border-2 p-2 rounded-md w-[300px]' placeholder='Enter The Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        <button className='bg-blue-500 text-white px-2 py-2 rounded-md' onClick={handleSearch}>Search Hospital</button>
      </div>
      <div className='w-full flex justify-center mt-8 gap-2'>
        <button className='py-2 px-4 bg-blue-500 text-white rounded-md' onClick={increaseRadius}>+</button>
        <p className='bg-blue-500 text-white p-4 rounded-md'>{`Radius : ${radius}`}</p>
        <button className='py-2 px-4 bg-blue-500 text-white rounded-md' onClick={decreaseRadius}>-</button>
      </div>
      <div className='flex justify-center text-xl my-4'>{`Total Hopitals : ${hospital.length}`}</div>
      <div  className={hospital.length > 0 ? "mt-8 flex justify-center gap-4" : "hidden"}>
        <HospitalList hospital={hospital} />
        <HospitalMap hospital={hospital} location={location} />
      </div>
    </div>
  )
}

export default App
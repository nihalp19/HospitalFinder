import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api";
import Navbar from './components/Navbar'
import HospitalList from './components/HospitalList'
import { libraries } from './utils/exportfunction';
import Footer from './components/Footer';


function App() {

  const [location, setLocation] = useState({})
  const [hospital, setHospital] = useState([])
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState(4)
  // const [hospitallocation, setHospialLocation] = useState({})
  // const [hospitallen,setHospitalLen] = useState(0)


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API,
    libraries
  })

  useEffect(() => {
    const localHospital = localStorage.getItem("hospital");
    const localAddress = localStorage.getItem("address")
    if (localHospital && localAddress) {
      setHospital(JSON.parse(localHospital));
      setAddress(localAddress)
    }
  }, []); 
  
  useEffect(() => {
    if (hospital.length > 0) {
      localStorage.setItem('hospital', JSON.stringify(hospital));
      localStorage.setItem('address',address)
    }
  }, [hospital]);
  
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
      radius: parseInt(radius) * 1000,
      type: ["hospital"]
    }

    const getDistance = (lat1, lng1, lat2, lng2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371;

      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance;
    }

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const hospitalsWithDistance = results.map((hospital) => {
          const hospitalLocation = hospital.geometry.location;
          const distance = getDistance(
            location.lat,
            location.lng,
            hospitalLocation.lat(),
            hospitalLocation.lng()
          );
          return { ...hospital, distance };
        });
        const sortedHospitals = hospitalsWithDistance.sort(
          (a, b) => a.distance - b.distance
        );

        setHospital(sortedHospitals);
        console.log("Hospitals sorted by distance");
      } else {
        console.log("No hospital found");
      }
    })

    // service.nearbySearch(request, (results, status) => {
    //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //     console.log("result", results);
    //     setHospital(results)
    //     console.log("Hospitals found")
    //   } else {
    //     console.log("No hospital found")
    //   }
    // })

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
    <div className='w-full min-h-screen '>
      <Navbar />
      <div className='w-full flex gap-4 justify-center mt-6'>
        <input type="text" className='border-2 p-2 rounded-md w-[300px]' placeholder='Enter The Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        <button className='bg-blue-500 text-white px-2 py-2 rounded-md' onClick={handleSearch}>Search Hospital</button>
      </div>
      <div className='w-full flex justify-center mt-4 gap-2'>
        {radius !== 0 && <button className='py-2 px-4 bg-blue-500 text-white rounded-md' onClick={decreaseRadius}>-</button>}
        <p className='bg-blue-500 text-white p-4 rounded-md'>{`Radius : ${radius}`}</p>
        <button className='py-2 px-4 bg-blue-500 text-white rounded-md' onClick={increaseRadius}>+</button>

      </div>
      <div className='flex justify-center text-xl my-4'>{`Total Hopitals : ${hospital.length}`}</div>
      <div className={hospital.length > 0 ? "mt-4 flex justify-center gap-4" : "hidden"}>
        <HospitalList hospital={hospital} />
      </div>
      <div className='w-full h-[350px]'>


      </div>
      <div className='w-full '>
        <Footer />
      </div>

    </div>
  )
}

export default App
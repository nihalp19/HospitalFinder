import React, { useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
function HospitalMap({ hospital, location }) {

    useEffect(() => {

    },[hospital,location])
    return (
        <div className='w-[400px] h-[300px] '>
            <GoogleMap center={location} zoom={14} mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "10px" }}>
                <Marker position={location} label="you" />
               
            </GoogleMap>
        </div>
    )
}

export default HospitalMap
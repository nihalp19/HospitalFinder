import { useState } from "react";
import { FaRegHospital } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
function HospitalList({ hospital }) {

    const [search, setSearch] = useState("")
    const [searchHospital, setSearchedHospital] = useState([])
    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (search !== "") {
            const HospitalName = search.toLowerCase().trim()
            const searchedHospital = hospital.filter(h => h.name.toLowerCase().trim().includes(HospitalName))
            setSearchedHospital(searchedHospital)
        }
    }

    return (
        <div className="w-[440px] h-[300px] flex flex-col items-center p-4 overflow-y-scroll border-2 rounded-md relative">
            <div className="flex gap-2 mb-4 border-2 items-center p-2 rounded-md relative">
                <input type="text" placeholder="Search Hospital Name" className=" rounded-md  w-[300px] focus:outline-none" onChange={(e) => handleSearch(e)} />
                <CiSearch className="abosulte top-0 text-blue-500" style={{width : "25px" ,height:"25px"}}/>
            </div>
            {searchHospital && searchHospital.length > 0 ?
                searchHospital.map((h, i) => (
                    <div className="flex w-[300px]  items-center mt-2 gap-1 bg-blue-500 p-2 text-white rounded-md transform transition-transform hover:scale-105" key={i} >
                        <FaRegHospital style={{ width: "30px", height: "30px" }} />
                        <div className="p-2">
                            <p>{h.name.length > 30 ? h.name.slice(0, 30) : h.name}</p>
                            <p>{h.vicinity.length > 30 ? h.vicinity.slice(0, 30) : h.vicinity}</p>
                            <p>distance : {h.distance.toFixed(2)} km</p>

                        </div>
                    </div>
                ))
                :hospital&& hospital.length > 0 ? hospital.map((h, i) => (
                    <div className="flex w-[300px]  items-center mt-2 gap-1 bg-blue-500 p-2 text-white rounded-md transform transition-transform hover:scale-105" key={i} >
                        <FaRegHospital style={{ width: "30px", height: "30px" }} />
                        <div className="p-2">
                            <p>{h.name.length > 30 ? h.name.slice(0, 30) : h.name}</p>
                            <p>{h.vicinity.length > 30 ? h.vicinity.slice(0, 30) : h.vicinity}</p>
                            <p>distance : {h.distance.toFixed(2)} km</p>

                        </div>
                    </div>)) : (<span>....Hospital found</span>)
            }
        </div>
    )
}

export default HospitalList


// onClick={() => setHospialLocation({ lat: h.geometry.location.lat(), lng: h.geometry.location.lng() })}
import { FaRegHospital } from "react-icons/fa";
function HospitalList({ hospital, setHospialLocation}) {
    
    return (
        <div className="w-[400px] h-[300px] flex flex-col items-center p-4 overflow-y-scroll border-2 rounded-md">
            {hospital && hospital.length > 0 ?
                hospital.map((h, i) => (
                    <div className="flex w-[300px]  items-center mt-2 gap-1 bg-blue-500 p-2 text-white rounded-md transform transition-transform hover:scale-105" key={i} >
                        <FaRegHospital style={{ width: "30px", height: "30px" }} />
                        <div className="p-2">
                            <p>{h.name.length > 30 ? h.name.slice(0, 30) : h.name}</p>
                            <p>{h.vicinity.length > 30 ? h.vicinity.slice(0, 30) : h.vicinity}</p>
                        </div>
                    </div>
                ))
                : (<span>.......Nothing is searched .......</span>)}
        </div>
    )
}

export default HospitalList


// onClick={() => setHospialLocation({ lat: h.geometry.location.lat(), lng: h.geometry.location.lng() })}
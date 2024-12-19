
function HospitalList({hospital}) {
  return (
    <div className="w-[400px] h-[300px]">
        {hospital && hospital.length > 0 ? 
            hospital.map((h,i) => (
                <div key={i}>
                    <p>{hospital.name}</p>
                    <p>{hospital.vicinity}</p>
                </div>
            ))
         :(<span>.......Nothing is searched .......</span>)}
    </div>
  )
}

export default HospitalList
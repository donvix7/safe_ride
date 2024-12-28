import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function ListCard({vehicles}) {    
    return (

        <>
            {vehicles.map((vehicle, index) => (

                <div className='form-control p-4 flex justify-between'>
                <div >
                    <h2 className=" font-bold text-2xl">Plate Number : {vehicle.plateNumber}</h2>
                    <div className="text-lg text-gray-800">Driver Name{vehicle.driver.name}</div>
                    <div className="text-lg text-gray-800">Driver Contact{vehicle.driver.contact}</div>
                    <div className="text-lg text-gray-800">Vehicle Model{vehicle.model}</div>
                    <div className="text-lg text-gray-800">Vehicle Route{vehicle.route}</div>
                </div>
                <div className="flex gap-2 items-center">


                    <RemoveBtn/>
                    <Link href={`/editVehicle/${vehicle._id}`  } className='w-fit btn'>Edit</Link>

                </div>
                </div>
                
            ))}
        </>
    )
}
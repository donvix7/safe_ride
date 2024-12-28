import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import ListCard from "./ListCard";


const getVehicles = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/post', {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export default async function VehicleList() {

   const vehicles = await getVehicles();

    return(
        <div className='flex gap-4 flex-col'>
            <ListCard vehicles={vehicles.vehicles} />

        </div>
    )
}
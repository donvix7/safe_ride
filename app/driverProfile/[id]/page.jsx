import { getServerSession } from "next-auth";
import EmergencyButton from "../../../components/EmergencyButton";
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";


export default async function DriverProfile({params}) {
    const {id} = params;
    
        const session = await getServerSession(NextAuthOptions);
    
        const user = session.user.name;
        
const getDriver = async () => {

    try {
        const response = await fetch(`http://localhost:3000/api/driver/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(id,data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}
    const driver = await getDriver();
    console.log(driver);
    return (
        <div className="bg-cover bg-no-repeat bg-center bg-fixed text-white flex-flex-col items-center justify-center"   style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
            <section className="bg-blue-800 p-4 rounded-lg ">
                <Link href="/">
                    <Image src="/safe.png" alt="logo" height={100} width={100} /> Safe Ride.

                </Link>
                <div className="flex justify-between items-center p-4 gap-4">
                    <div>
                        <div className="flex justify-center flex-col p-4">
                            <h1 className="text-3xl font-bold">Driver Profile</h1>
                            <p className="text-sm text-grey-200">Based on our data </p>
                        </div>
                        <div className="flex justify-center flex-col p-4">
                            <p className="text-sm font-bold">Name : {driver.driver.driver.name}</p>
                            <p className="text-sm font-bold">Driver License No : {driver.driver.license}</p>
                            <p className="text-sm font-bold">Car Model : {driver.driver.car.model}</p>
                            <p className="text-sm font-bold">Car Color : {driver.driver.car.color}</p>
                        </div>
                    </div>
                    <Image src={driver.driver.image} alt="profile" height={200} width={200} className="rounded-full border-4 border-white"/>
                </div>
            </section>
            <section className=" p-4 max-w-lg flex justify-center flex-col p-4 gap-4 mx-auto">
                <div className="">
                    <h1 className="font-bold ">Tracking Overview</h1>
                    <div className="flex justify-between text-black  items-center font-bold text-sm gap-20  p-4 ">
                        <div className="bg-white rounded-lg p-4 h-40 w-60">
                            <h1 className="text-center">No of people Tracked</h1>

                        </div>
                        <div className="bg-white rounded-lg p-4 h-40 w-60">
                            <h1 className="text-center">Drivers Route</h1>
                            <p>Point 1 : {driver.driver.route.pointA}</p>
                            <p>Point 2 : {driver.driver.route.pointB}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col p-4 gap-4">
                    <div>{}</div>
                    <textarea placeholder="Write an honest review" className="bg-white rounded-lg p-4 w-full"></textarea>
                    <button className="bg-yellow-500 rounded-lg py-4 px-8 font-bold text-white">View Reviews</button>
                </div>
            </section>
            <EmergencyButton user = {user} id = {id} />
        </div>
    )

    
}
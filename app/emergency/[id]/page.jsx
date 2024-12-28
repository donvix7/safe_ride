import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import EmergencyButton from "@/components/EmergencyButton";
import Driver from "@/models/driver";
import Emergency from "@/models/Emergency";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page ({params}) {

    const {id} = params;

    const session = await getServerSession(NextAuthOptions);

    const user = session.user.name;
    
    return(
        <div className="bg-blue-950  text-white text-sm h-screen flex flex-col justify-between items-center">
            <div className="flex flex-col items-center bg-blue-800 w-full rounded-lg min-h-60">
                <div className="flex gap-10 items-center justify-end p-10">
                    <h1 className="text-2xl font-bold ">Welcome {user}!</h1>
                    <Link href={`/driverProfile/${id}`} className="text-blue-500 hover:text-blue-200">Driver Profile</Link>
                </div>
                <p className='text-grey-500'>If your feel unsafe while on transit quickly click the red button</p>
            </div>
            <EmergencyButton user = {user} id = {id} />
        </div>
    )
}
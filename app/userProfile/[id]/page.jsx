

export default async function DriverProfile({params}) {
    const {id} = params;
    
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
        <div className="bg-cover bg-no-repeat bg-center bg-fixed"   style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
            <section className="bg-blue-800 text-white p-4 rounded-lg">
                <div className="flex justify-center flex-col p-4">
                    <h1 className="text-3xl font-bold">Driver Profile</h1>
                    <p className="text-sm text-grey-200">Based on our data </p>
                </div>
                <div className="flex justify-center flex-col p-4">
                    <p className="text-sm font-bold">Name : {}</p>
                    <p className="text-sm font-bold">Driver License No : {}</p>
                    <p className="text-sm font-bold">Car Model : {driver.driver.car.model}</p>
                    <p className="text-sm font-bold">Car Color : {driver.driver.car.color}</p>
                </div>
            </section>
            <section className="flex justify-center flex-col p-4 ">
                <div>
                    <h1 className="font-bold text-white">Tracking Overview</h1>
                    <div className="flex justify-between items-center font-bold text-sm   p-4">
                        <div className="bg-white rounded-lg p-4 h-40 w-60">
                            <h1 className="text-center">No of people Tracked</h1>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

    
}
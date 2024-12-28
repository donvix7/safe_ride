export default function Preload() {
  return (
<div id="preload-img" className='text-sm  text-white bg-blue-950 flex flex-col items-center justify-between h-screen p-10  bg-no-repeat bg-center' style={{backgroundImage: `url("safe.png")`}} >
        <h1 className=" text-4xl  text-center font-bold " >
            SAFERIDE
        </h1>
        <div className="flex justify-center gap-6" >
            <button
                className="shadow-lg shadow-white bg-yellow-500 text-white hover:bg-yellow-700 text-xl text-lg  font-bold py-2 px-8 rounded"
            >
                <a href="/api/auth/signin">Sign in</a>
            </button>
            <button
                className="shadow-lg shadow-white bg-yellow-500 text-white hover:bg-yellow-700 text-xl font-bold py-2 px-8 rounded"
            >
                <a href="/createAccount">Sign up</a>
            </button>
        </div>
        <button className="border-2 border-white rounded-full text-white py-2 px-20 rounded">Explore Now</button>
    </div>
  )
  
}
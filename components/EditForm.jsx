export default function EditForm() {    
  return (
    
    <form className='form mt-5 flex flex-col gap-3'>
    <h2 className='text-2xl font-bold'>Edit Vehicle</h2>
    <input type="text" className='form-control' placeholder='Enter Vehicle plate number'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle driver name'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle driver contact'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle route'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle model'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle color'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle location'/>
    <input type="text" className='form-control' placeholder='Enter Vehicle owner'/>
    <input type="file" className='form-control' placeholder='Enter Vehicle image'/>

    <button className='btn btn-primary w-fit'>Update Vehicle</button>
    </form> 
    );
}
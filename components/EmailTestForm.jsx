"use client";

import { sendEmail } from "@/lib/resend";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function EmailTestForm() {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [plateNumber, setPlateNumber] = useState('');

    const [mail, setMail] = useState('');
    const [subject, setSubject] = useState('');
 
    const [src,setSrc] = useState("default");

    const { data: session } = useSession();

    const sender = session?.user?.email;

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !subject || !mail){
            setError("Please fill all fields");
            return;
        }

        //await sendEmail();
        await sendEmail({ sender, email, subject, mail});
        alert("Email sent successfully");
        //console.log(name,email,mail)

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit} className="form flex gap-3 flex-col w-xl p-10">
                <input 
                    type='text' 
                    value={email}
                    className="form-control" 
                    placeholder="Enter reciepient email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='text' 
                    value={subject}
                    className="form-control" 
                    placeholder="Enter subject" 
                    onChange={(e) => setSubject(e.target.value)}
                />
                
                <textarea 
                    className="form-control" 
                    placeholder="Enter mail content"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}>

                    </textarea>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit" className='btn'>Submit</button>
            </form>
        </div>
    );
}

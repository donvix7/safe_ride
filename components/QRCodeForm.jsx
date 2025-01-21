"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import QRCode from 'qrcode'
import Image from "next/image";

export default function QRCodeForm({driver}) {



    const stringData = JSON.stringify(driver.driver.plateNumber);

    const [src,setSrc] = useState("default");


    const handleQrCode = async () => {

        try {
          const dataUrl = await QRCode.toDataURL(`http://localhost:3000/api/driver/${stringData}`).then(setSrc);
      } catch (error) {
          console.log("QR Code generation error:", error);
      }
    }

    handleQrCode();

    return (
        <div className="wx-auto">
                <img width={200} height={200}  src={`${src}`} alt="QR Code" /> {/* Ensure the img tag has an alt attribute */}
        </div>
    );
}Image

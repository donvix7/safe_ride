"use client";
import { useEffect, useState } from "react";

export default function TrackList({getHistory}) {

    
    const [histories, setHistories] = useState([]);

    const setUpHistory = async () => {
        const response = await getHistory();
        setHistories(response || []);
    };

    useEffect(() => {
        setUpHistory();
    }, []);

    if (!histories.length) {
        return <div>
            <p>{userName} has not created any track history yet.</p>
        </div>;
    }

    return (
        <div>
        {
            histories.map((history) => (
                <div >
                    <h2>{history.plateNumber}</h2>
                    <Link href={`/`}>{}</Link> {/* Assuming trackId is the property you want to display */}
                </div>
            ))
        }
        </div>
    )
}
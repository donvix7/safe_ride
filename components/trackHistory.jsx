"use client"
export default async function TrackHistory({ userId, userName }) {

    const id = userId;

    const getHistory = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                cache: 'no-store',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data, data.tracked);
            return data;
        } catch (error) {
            console.error('Failed to fetch track history:', error);
            // Optionally, you can return an empty array or handle the error in a more user-friendly way
            return [];
        }
    };


    return (
        <div className='flex gap-4 flex-col'>
           <TrackList userName={userName} getHistory={ getHistory} />
        </div>
    );
}

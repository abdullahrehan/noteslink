import React from 'react'

function AllUsers() {

    const data = [
        { name: "Total People Visited", number: 300 },
        { name: "Daily Visites", number: 50 },
        { name: "No of Account", number: 200 },
        { name: "Publiced Files", number: 100 },

    ]

    const tableData = [
        {
            No: 1,
            Name: 'Abdulah786',
            Email: 'abdullahrehan8118@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 2,
            Name: 'Mahad992',
            Email: 'abdullahrehan8118@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 3,
            Name: 'Haseeb212',
            Email: 'Haseeb212@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 4,
            Name: 'Ahmad431',
            Email: 'Ahmad431@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 5,
            Name: 'Hamid420',
            Email: 'Hamid420@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },
        {
            No: 6,
            Name: 'Abdulah786',
            Email: 'abdullahrehan8118@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 7,
            Name: 'Mahad992',
            Email: 'abdullahrehan8118@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 8,
            Name: 'Haseeb212',
            Email: 'Haseeb212@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        {
            No: 9,
            Name: 'Ahmad431',
            Email: 'Ahmad431@gmail.com',
            PublicFiles: 10,
            Complains: 0,
            Strikes: 0,
        },

        // {
        //     No: 10,
        //     Name: 'Hamid420',
        //     Email: 'Hamid420@gmail.com',
        //     PublicFiles: 10,
        //     Complains: 0,
        //     Strikes: 0,
        // },
    ];

    const handleDeleteAccount = (name) => {
        console.log('Delete account clicked for:', name);
        // Handle delete account action
    };

    const handleSendStrike = (name) => {
        console.log('Send strike clicked for:', name);
        // Handle send strike action
    };


    return (
        <div className='w-full h-full flex flex-col gap-4'>

            <div className='w-full h-auto bg-red-00 center flex flex-col'>
                <div className='text-4xl font-medium py-1'>Dashboard</div>
                <div className='w-[200px] h-[1px] bg-[#CCCCCC]'></div>
            </div>


            <div className='w-full pl-2 pr-4 flex justify-between bg-red-00'>
                <div className='px-2 text-3xl font-medium '>Users Data</div>
                <div className='w-auto text-2xl font-medium katibeh-regular'>Welcome Abdullah !</div>
            </div>
            <div className='w-full bg-red-00 px-2 max-h-[385px] overflow-y-auto scroll-style'>
                <table className="w-full">
                    <thead className='sticky top-0 bg-white'>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Public Files</th>
                            <th className="px-4 py-2">Complains</th>
                            <th className="px-4 py-2">Strikes</th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-00 '>
                     
                        {tableData.map(data =>
                            <tr className='hover:bg-[#0001] hover:cursor-pointer'>
                                <td className="border px-4 py-2 text-center font-bold">{data.No}</td>
                                <td className="border px-4 py-2 text-center">{data.Name}</td>
                                <td className="border px-4 py-2 text-center">{data.Email}</td>
                                <td className="border px-4 py-2 text-center">{data.PublicFiles}</td>
                                <td className="border px-4 py-2 text-center">{data.Complains}</td>
                                <td className="border px-4 py-2 text-center ">{data.Strikes}</td>

                                <td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleSendStrike(data.Name)} className="bg-yellow-400 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                                        Send Strike
                                    </button>
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleDeleteAccount(data.Name)} className="bg-red-400 hover:bg-red-700 text-white py-2 px-4 rounded">
                                        Delete Account
                                    </button>
                                </td>

                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

            <div className='h-auto w-full px-2 py-3 bg-red-00 flex gap-12 w-full center'>

                {data.map(data =>

                    <div className='flex gap-3'>
                        <div className='center'>
                            <div className='w-[10px] h-[10px] rounded-[1px] bg-red-400'></div>
                        </div>
                        <div className='text-[#5A5A5A]'>{data.name}</div>
                        <div className='font-medium'>{data.number}</div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default AllUsers

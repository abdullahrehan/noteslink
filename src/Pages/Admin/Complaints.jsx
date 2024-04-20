import React from 'react'

function Complaints() {

  const data = [
    { name: "Total Complaints", number: 300 },
    { name: "Completed Complaints", number: 50 },
    { name: "New Complaints", number: 200 },
    { name: "Unresoved Complaints", number: 100 },

  ]

  const tableData = [
    {
      No: 1721,
      status: 'Incomplete',
      type: 'complaint',
      subject: "Inappropriate Content",
      initiatedBy: "abdullahrehan8118@gmail.com",
      createdOn: "4/6/2024",
    },

    {
      No: 1201,
      status: 'Incomplete',
      type: 'Suggestion',
      subject: "User Interface",
      initiatedBy: "mahad765@gmail.com",
      createdOn: "2/1/2022",
    },

    {
      No: 1911,
      status: 'Incomplete',
      type: 'complaint',
      subject: "File Removed",
      initiatedBy: "hasseb112@gmail.com",
      createdOn: "2/6/2024",
    },

    {
      No: 1241,
      status: 'Incomplete',
      type: 'Help',
      subject: "Data Lost",
      initiatedBy: "hamid321@gmail.com",
      createdOn: "5/2/2024",
    },

    {
      No: 1121,
      status: 'Incomplete',
      type: 'Help',
      subject: "Storage Complete",
      initiatedBy: "hamza765@gmail.com",
      createdOn: "1/7/2022",
    },

    {
      No: 1981,
      status: 'Incomplete',
      type: 'complaint',
      subject: "Search Files",
      initiatedBy: "junaid665@gmail.com",
      createdOn: "3/1/2023",
    },

    
   
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
        <div className='text-4xl font-medium py-1'>Complaints</div>
        <div className='w-[200px] h-[1px] bg-[#CCCCCC]'></div>
      </div>


      <div className='w-full bg-red-00 px-2 max-h-[385px] overflow-y-auto scroll-style'>
        <table className="w-full">
          <thead className='sticky top-0 bg-white'>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Initiated By</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='bg-green-00 '>

            {tableData.map(data =>
              <tr className='hover:bg-[#0001] hover:cursor-pointer'>
                <td className="border px-4 py-2 text-center font-bold">{data.No}</td>
                <td className="border px-4 py-2 text-center">{data.status}</td>
                <td className="border px-4 py-2 text-center">{data.type}</td>
                <td className="border px-4 py-2 text-center">{data.subject}</td>
                <td className="border px-4 py-2 text-center">{data.initiatedBy}</td>
                <td className="border px-4 py-2 text-center ">{data.createdOn}</td>

                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleSendStrike(data.Name)} className="bg-[#2D2D2D] hover:bg-yellow-700 text-white py-2 px-4 rounded">
                    Open
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleDeleteAccount(data.Name)} className="bg-red-400 hover:bg-red-700 text-white py-2 px-4 rounded">
                    Remove
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

export default Complaints

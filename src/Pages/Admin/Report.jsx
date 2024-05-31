import React, { useContext, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";
import OpenReport from './OpenReport.jsx'

function Report() {
  const [tableData, setData] = useState([])
  const [openReportFile, setOpenReportFile] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [loader, setloader] = useState(true)
  const [reloadPage, setReloadPage] = useState(false)
  const [reportsNumber, setReportsNumber] = useState(0)
  const [reportsNumberUnresolved, setReportsNumberUnresolved] = useState(0)

  useEffect(() => {

    setReloadPage(true)

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await getDocs(query(collection(fdb, "reports"))).then((querySnapshot) => {
        setData([]);
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          setData((prev) => [...prev, { id: doc.id, data: doc.data() }]);
        });
      }).then(() => { setloader(false) }).catch((e) => console.log(e));

      await getDocs(query(collection(fdb, 'reports'))).then((querySnapshot) => {
        setReportsNumber(querySnapshot.size)
      })
      await getDocs(query(collection(fdb, 'reports'), where('status', '==', 'unresolved'))).then((querySnapshot) => {
        setReportsNumberUnresolved(querySnapshot.size)
      })
    }
    console.log(reportsNumber)

    fetchData()
  }, [reloadPage])

  const data = [
    { name: "Total Complaints", number: 300 },
    { name: "Completed Complaints", number: 50 },
    { name: "New Complaints", number: 200 },
  ]

  const viewFile = async (id) => {
    await getDoc(doc(fdb, 'files', id)).then((doc) => {
      setFileName(doc.data().name)
      setFileContent(doc.data().content.join("\n"))
      setOpenReportFile(true)
    })
  }
  const handleDeleteAccount = async (data) => {
    console.log('Delete account clicked for:', data.data.name);
    await deleteDoc(doc(fdb, 'reports', data.id)).then(() => {
      alert("file deleted successfully")
      setReloadPage(true)
    })
  };


  const handleLimitAccount = async (email, id) => {

    if (window.confirm("Are you sure you want to Restrict this account")) {

      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      await updateDoc(doc(fdb, 'users', email), {
        limitTill: currentDate,
        status: 'restricted'
      }).then(async () => {
        await updateDoc(doc(fdb, 'reports', id), {
          status: 'resolved'
        })
        setReloadPage(true)
        alert("Account Status Changed to Restricted")
      })

    }
  }


  return (
    <div className='w-full h-full flex flex-col gap-4'>

      <div className='w-full h-auto bg-red-00 center flex flex-col'>
        <div className='text-4xl font-medium py-1'>Content Report</div>
        <div className='w-[200px] h-[1px] bg-[#CCCCCC]'></div>
      </div>


      <div className='w-full bg-red-00 px-2 max-h-[385px] overflow-y-auto scroll-style'>
        <table className="w-full">
          <thead className='sticky top-0 bg-white'>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              {/* <th className="px-4 py-2">Type</th> */}
              <th className="px-4 py-2">File ID</th>
              {/* <th className="px-4 py-2">Initiated By</th> */}
              <th className="px-4 py-2">File Owner</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">status</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='bg-green-00 '>

            {
              !loader ? tableData.map((data, index) =>
                <tr className='hover:bg-[#0001] hover:cursor-pointer'>
                  <td className="border px-4 py-2 text-center font-bold">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{data.data.name}</td>
                  <td className="border px-4 py-2 text-center">{data.data.fileId.substring(0,5)}....</td>
                  {/* <td className="border px-4 py-2 text-center">{data.data.reportedBy}</td> */}
                  <td className="border px-4 py-2 text-center">{data.data.owner}</td>
                  <td className="border px-4 py-2 text-center ">{data.data.details.join(", ")}</td>
                  <td className="border px-4 py-2 text-center ">{data.data.reason}</td>
                  <td className="border px-4 py-2 text-center ">{data.data.status}</td>

                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => viewFile(data.data.fileId)} className="bg-[#2D2D2D] hover:bg-yellow-700 text-white py-2 px-4 rounded">
                      Open
                    </button>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleLimitAccount(data.data.owner + "@gmail.com", data.id)} className="bg-[#2D2D2D] hover:bg-yellow-700 text-white py-2 px-4 rounded">
                      Restrict Account
                    </button>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleDeleteAccount(data)} className="bg-red-400 hover:bg-red-700 text-white py-2 px-4 rounded">
                      Remove
                    </button>
                  </td>

                </tr>
              ) :
                ["", ""].map(() =>
                  // <>
                  <tr className='overflow-hidden'>
                    <td className="border px-4 py-2 text-center font-bold"><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                    <td className="border px-4 py-2 text-center"><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                    <td className="border px-4 py-2 text-center"><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                    <td className="border px-4 py-2 text-center"><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                    <td className="border px-4 py-2 text-center"><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                    <td className="border px-4 py-2 text-center "><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                    <td className="border px-4 py-2 text-center "><div className='w-[80px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>

                    <td className="border px-4 py-2 text-center">
                      <div className="bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow w-[80px] h-[50px] py-2 rounded"></div>
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <div className="bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow w-[80px] h-[50px] py-2 rounded"></div>
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <div className="bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow w-[80px] h-[50px] py-2 rounded"></div>
                    </td>

                    {/* </> */}
                  </tr>
                )}

          </tbody>
        </table>
      </div>

      <div className='h-auto w-full px-2 py-3 bg-red-00 flex gap-12 w-full center'>


        <div className='flex gap-3'>
          <div className='center'>
            <div className='w-[10px] h-[10px] rounded-[1px] bg-red-400'></div>
          </div>
          <div className='text-[#5A5A5A]'>Total Reports Received </div>
          <div className='font-medium'>{reportsNumber}</div>
        </div>

        <div className='flex gap-3'>
          <div className='center'>
            <div className='w-[10px] h-[10px] rounded-[1px] bg-red-400'></div>
          </div>
          <div className='text-[#5A5A5A]'>Total Unresolved Reports </div>
          <div className='font-medium'>{reportsNumberUnresolved}</div>
        </div>


      </div>

      {openReportFile ?
        <OpenReport fileContent={fileContent} fileName={fileName} setOpenReportFile={() => setOpenReportFile(false)} />
        : null}

    </div>
  )
}

export default Report

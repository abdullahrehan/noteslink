import React, { useContext, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";
import OpenReport from './OpenReport.jsx'

function Feedback() {
  const [tableData, setData] = useState([])
  const [openReportFile, setOpenReportFile] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [loader, setloader] = useState(true)
  const [reloadPage, setReloadPage] = useState(false)
const [totalFeedbacks, setTotalFeedbacks] = useState(0)

  useEffect(() => {

    setReloadPage(true)

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await getDocs(query(collection(fdb, "feedbacks"))).then((querySnapshot) => {
        setData([]);
        setTotalFeedbacks(querySnapshot.size)
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          setData((prev) => [...prev, { id: doc.id, data: doc.data() }]);

        });
        console.log("agasghakjg", tableData)
      })
        .then(() => {
          setloader(false)
        })
        .catch((e) => console.log(e));
    }
    fetchData()
  }, [reloadPage])

  const data = [
    { name: "Total Feedback", number: 300 },
    { name: "New Feedback", number: 200 },

  ]
  const convertDate = (d) => {
    const date = new Date(d);
    return `${date.toDateString()}`; 
  }
  const viewFile = async (id) => {
    await getDoc(doc(fdb, 'feedbacks', id)).then((doc) => {
      setFileName(doc.data().name)
      setFileContent(doc.data().message )
      setOpenReportFile(true)

      console.log(doc)
    })
  }
  const handleDeleteAccount = async (data) => {
    console.log('Delete account clicked for:', data.data.name);
    await deleteDoc(doc(fdb, 'feedbacks', data.id)).then(() => {
      alert("file deleted successfully")
      setReloadPage(true)

    })
  };


  const handleLimitAccount = async (email) => {

    if (window.confirm("Are you sure you want to Restrict this account")) {

      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      await updateDoc(doc(fdb, 'users', email), {
        limitTill: currentDate,
        status: 'restricted'
      }).then(() => {
        
        setReloadPage(true)
        alert("Account Status Changed to Restricted")
      })
    }
  }


  return (
    <div className='w-full h-full flex flex-col gap-4'>

      <div className='w-full h-auto bg-red-00 center flex flex-col'>
        <div className='text-4xl font-medium py-1'>Feedback</div>
        <div className='w-[200px] h-[1px] bg-[#CCCCCC]'></div>
      </div>


      <div className='w-full bg-red-00 px-2 max-h-[385px] overflow-y-auto scroll-style'>
        <table className="w-full">
          <thead className='sticky top-0 bg-white'>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Sent By</th>
              <th className="px-4 py-2">Email Address</th>
              <th className="px-4 py-2">Sent At</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='bg-green-00 '>

            {
              !loader ? tableData.map((data, index) =>
                <tr className='hover:bg-[#0001] hover:cursor-pointer'>
                  <td className="border px-4 py-2 text-center font-bold">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{data.data.subject}</td>
                  <td className="border px-4 py-2 text-center">{data.data.name}</td>
                  <td className="border px-4 py-2 text-center">{data.data.email}@gmail.com</td>
                  <td className="border px-4 py-2 text-center">{convertDate(data.data.date)}</td>

                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => viewFile(data.id)} className="bg-[#2D2D2D] hover:bg-yellow-700 text-white py-2 px-4 rounded">
                      Open
                    </button>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleDeleteAccount(data)} className="bg-red-400 hover:bg-red-700 text-white py-2 px-4 rounded">
                      Remove
                    </button>
                  </td>

                </tr>
              ) :
                ["", ""].map((data, index) =>

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
            <div className='text-[#5A5A5A]'>Total Feedbacks</div>
            <div className='font-medium'>{totalFeedbacks}</div>
          </div>
    

      </div>

      {openReportFile ?
        <OpenReport fileContent={fileContent} fileName={fileName} setOpenReportFile={() => setOpenReportFile(false)} />
        : null}

    </div>
  )
}

export default Feedback

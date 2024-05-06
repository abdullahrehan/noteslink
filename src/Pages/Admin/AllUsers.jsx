import React, { useContext, useEffect, useState } from 'react'
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";
import AppContext from "../../Context_Api/AppContext.js";

import { auth } from "../../Firebase/firebaseConfig.js";
import { sendPasswordResetEmail, } from 'firebase/auth';

function AllUsers() {
    const [tableData, setData] = useState([])
    const { state, dispatch } = useContext(AppContext);
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalUsersRestricted, setTotalUsersRestricted] = useState(0)
    const data = [
        { name: "Total People Visited", number: 300 },
        { name: "Daily Visites", number: 50 },
        { name: "No of Account", number: 200 },

    ]

    const [reloadPage, setReloadPage] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setReloadPage(true)

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await getDocs(query(collection(fdb, "users"))).then((querySnapshot) => {
                setData([]);
                setTotalUsers(querySnapshot.size)
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    if (doc.data().userType != 'admin') {

                        setData((prev) => [...prev, doc.data()]);
                        setReloadPage(false)
                    }
                });

            })
                .then(() => {
                    setLoader(false)
                })
                .catch((e) => console.log(e));

            await getDocs(query(collection(fdb, 'users'), where('status', '==', 'restricted'))).then((querySnapshot) => {
                setTotalUsersRestricted(querySnapshot.size)
            })
        }
        fetchData()
    }, [reloadPage])

    const handleRemoveRestriction = async (email) => {

        if (window.confirm("Are you sure you want to remove Restriction from this account")) {
            await updateDoc(doc(fdb, 'users', email), {
                limitTill: 0,
                status: 'open'
            }).then(() => {
                setLoader(true)
                setReloadPage(true)
                alert("Account Status Changed to Open")

            })
        }
    };

    const handleSendStrike = (email) => {
        console.log('Send strike clicked for:', email);
        if (window.confirm('Are you sure you want reset Password of this account?')) {

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Reset Email sent successfully")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        }
    };

    const handleLimitAccount = async (email) => {

        if (window.confirm("Are you sure you want to Restrict this account")) {

            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 7);
            await updateDoc(doc(fdb, 'users', email), {
                limitTill: currentDate,
                status: 'restricted'
            }).then(() => {
                setLoader(true)
                setReloadPage(true)
                alert("Account Status Changed to Restricted")
            })
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-4'>

            <div className='w-full h-auto bg-red-00 center flex flex-col'>
                <div className='text-4xl font-medium py-1'>Users Data</div>
                <div className='w-[200px] h-[1px] bg-[#CCCCCC]'></div>
            </div>


            <div className='w-full pl-2 pr-4 flex justify-between bg-red-00'>
                {/* <div className='px-2 text-3xl font-medium '>Users Data</div> */}
                {state.name ?
                    <div className='w-auto text-2xl font-medium katibeh-regular'>Welcome {state.name}!</div>
                    : null}
            </div>
            <div className='w-full bg-red-00 px-2 max-h-[385px] overflow-y-auto scroll-style'>
                <table className="w-full">
                    <thead className='sticky top-0 bg-white'>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className='bg-green-00 w-full'>


                        {!loader ? tableData.map((data, index) =>
                            <tr className='hover:bg-[#0001] hover:cursor-pointer'>
                                <td className="border px-4 py-2 text-center font-bold">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">{data.name}</td>
                                <td className="border px-4 py-2 text-center">{data.emailAddress}</td>
                                <td className="border px-4 py-2 text-center">{data.status}</td>

                                {data.status == "open" && (<td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleLimitAccount(data.emailAddress)} className="bg-red-400 w-[180px] hover:bg-yellow-700 text-white py-2 px-4 rounded">
                                        Limit Account
                                    </button>
                                </td>)}
                                {data.status == 'restricted' && (<td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleRemoveRestriction(data.emailAddress)} className="bg-green-400 w-[180px] hover:bg-red-700 text-white py-2 px-4 rounded">
                                        Remove Restriction
                                    </button>
                                </td>)}
                                <td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleSendStrike(data.emailAddress)} className="bg-yellow-400 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                                        Send Reset Password Email
                                    </button>
                                </td>

                            </tr>
                        )
                            :
                            ["", "", ""].map(data =>
                                <tr className=' '>
                                    <td className="border px-4 py-2 text-center font-bold center"><div className='w-[100px] h-[50px] rounded bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                                    <td className="border px-4 py-2 text-center"><div className='w-[100px] h-[50px] rounded bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                                    <td className="border px-4 py-2 text-center"><div className='w-[100px] h-[50px] rounded bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>
                                    <td className="border px-4 py-2 text-center"><div className='w-[100px] h-[50px] rounded bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow'></div></td>

                                    <td className="border px-4 py-2 text-center ">
                                        <div className="bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow w-[180px] h-[50px] py-2 rounded"></div>
                                    </td>

                                    <td className="border px-4 py-2 text-center center">
                                        <div className="bg-gray-300 bg-slate-200 duration-100 transition-all delay-70 ease-in-out animate-pulse shadow w-[180px] h-[50px] rounded"></div>
                                    </td>

                                </tr>

                            )
                        }



                    </tbody>
                </table>
            </div>

            <div className='h-auto w-full px-2 py-3 bg-red-00 flex gap-12 w-full center'>



                <div className='flex gap-3'>
                    <div className='center'>
                        <div className='w-[10px] h-[10px] rounded-[1px] bg-red-400'></div>
                    </div>
                    <div className='text-[#5A5A5A]'>Total Users</div>
                    <div className='font-medium'>{totalUsers-1}</div>
                </div>

                <div className='flex gap-3'>
                    <div className='center'>
                        <div className='w-[10px] h-[10px] rounded-[1px] bg-red-400'></div>
                    </div>
                    <div className='text-[#5A5A5A]'>Total Users with Restricted Status</div>
                    <div className='font-medium'>{totalUsersRestricted}</div>
                </div>


            </div>

        </div>
    )
}

export default AllUsers

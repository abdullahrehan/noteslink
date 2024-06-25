import React, { useContext, useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { GoBold } from "react-icons/go";
import { RiItalic } from "react-icons/ri";
import { AiOutlineUnderline } from "react-icons/ai";
import { HiMiniListBullet } from "react-icons/hi2";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdPublic } from "react-icons/md";
import { MdPublicOff } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { doc, updateDoc, getDocs, query, collection, getDoc } from 'firebase/firestore';
import { fdb } from '../../../Firebase/firebaseConfig.js';
import { IoIosShareAlt } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import DownloadFile from './DownloadFile.jsx'
import PopUp from '../../../Components/Others/PopUp.jsx'
// import { Document, Page } from 'react-pdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import loader from '../../../Assets/Images/loader.gif'


function OpenedFile() {

    const { state, dispatch } = useContext(AppContext)
    const { renameFilePopup, saveFilePopup } = state
    const [openSaveOptions, setSaveOptions] = useState(true)
    const [fileSaved, setFileSaved] = useState(false)
    const [openFileTypeSetting, setOpenFileTypeSetting] = useState(false)
    const [fileTypeSetting, setFileTypeSetting] = useState("private")
    const [fileName, setFileName] = useState(null)
    const [fileContent, setFileContent] = useState(null)
    const [fileLink, setFileLink] = useState(null)
    const [showSharedEmail, setShowSharedEmail] = useState(false)
    const [showWriteEmail, setShowWriteEmail] = useState(false)
    const [emailText, setEmailText] = useState()
    const [mappedEmails, setMappedEmails] = useState([])
    const [downloadFile, setdownloadFile] = useState(false)
    const [Likes, setLikes] = useState(state.fileViewerContent.likes)
    const [fileLiked, setFileLiked] = useState(state.fileViewerContent.likedBy?.includes(localStorage.getItem("userEmail").split("@")[0]))

    let allEmails = [];
    const likeIcon = useRef()

    // console.log(state.fileViewerContent)

    const settingsIcon = [
        { icon: <GoBold size={18} />, function: () => { } },
        { icon: <RiItalic size={18} />, function: () => { } },
        { icon: <AiOutlineUnderline size={18} />, function: () => { } },
        { icon: <HiMiniListBullet size={18} />, function: () => { } },
    ]


    const likeFile = async () => {
        if (fileLiked) {
            await updateDoc(doc(fdb, 'files', state.fileViewerContent.id), {
                likedBy: state.fileViewerContent.likedBy.filter(data => data !== localStorage.getItem('userEmail').split('@')[0]),
                likes: state.fileViewerContent.likes - 1,
            }).then(() => {
                setLikes(Likes - 1)
                console.log('File unliked')
                setFileLiked(false)
            })
        }
        else {
            await updateDoc(doc(fdb, 'files', state.fileViewerContent.id), {
                likedBy: [...state.fileViewerContent.likedBy, localStorage.getItem('userEmail').split('@')[0]],
                likes: state.fileViewerContent.likes + 1,
            }).then(() => {
                setLikes(Likes + 1)
                console.log('File unliked')
                setFileLiked(true)
            })
        }
    }


    const changeFileType = async (value) => {

        if (value !== state.fileViewerContent) {

            setFileTypeSetting(value)

            if (window.confirm("Are you sure to want to change the file status")) {

                await updateDoc(doc(fdb, 'files', state.fileViewerContent.id), { status: value }).then(() => { dispatch({ type: "setRefreshData", refreshDataAction: true }) }).catch(() => { })
            }
        }
    }

    const DownloadWord = async () => {
        // console.log('67', state.fileViewerContent.content);

        setdownloadFile(false);

        // Create the document
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: fileName,
                                    bold: true,
                                    size: 28,
                                }),
                            ],
                        }),
                        // Add each piece of content as a new paragraph
                        ...state.fileViewerContent.content.map((data) =>
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: data,
                                        size: 22,
                                    }),
                                ],
                            })
                        ),
                    ],
                },
            ],
        });

        // Generate the Word document and trigger the download
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${fileName}.docx`);
    };

    const handleDownloadPDF = () => {

    };



    const saveFileChanges = async () => {
        // console.log(state.fileViewerContent)
        // console.log(state.fileViewerContent.content,fileName)
        setFileSaved(true)
        await updateDoc(doc(fdb, 'files', state.fileViewerContent.id),
            {
                name: fileName,
                content: fileContent.split('\n'),
                Url: fileLink == null ? [] : fileLink
            })
            .then(() => { 
                setFileSaved(false);
                dispatch({
                    type: "setFileViewerContent",
                    fileViewerContentAction: {
                      value: false,
                    }})        
                dispatch({ type: "setLoadHomeFiles", loadHomeFilesAction: true }); })


    }


    const searchEmails = async () => {

        await getDocs(query(collection(fdb, "users"))).then((qs) => {
            allEmails = [];
            qs.forEach(d => {
                if (d.data().emailAddress !== localStorage.getItem("userEmail") && !(state.fileViewerContent.sharedWith.includes(d.data().emailAddress))) {
                    allEmails.push(d.data().emailAddress);
                }
            })
            setMappedEmails(allEmails.filter(data => data.includes(emailText)))
        })
    }

    const removeEmail = async (data) => {

        if (window.confirm("Are you sure to want to remove this email")) {
            await updateDoc(doc(fdb, 'files', state.fileViewerContent.id), { sharedWith: state.fileViewerContent.sharedWith.filter(Data => Data !== data) })
                .then(() => { }).catch(() => { })
        }

    }
    const sendNotification = async (receiverEmail, notificationTitle, notificationBody, file) => {
        let tokens = []
        const user = await getDoc(doc(fdb, 'users', receiverEmail.trim().toLowerCase())).then(async (user) => {
            tokens = user.data().tokens
        })
        console.log(tokens)
        const myHeaders = new Headers()
        myHeaders.append('Authorization', "key=AAAAoiZwGIM:APA91bGyIvP2MHJ12LbfZEm-miIRrUw77VWa8aX9Gaz6JXaqVCEx2A4kOEOD4vdgf9kzGBC9UCqajdd4ORcO-h0jd6L7MY9AlFhIT8wOxcplggjXvWVpmTgzvXz2JbGdChdIIvakJ1Iw")
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            data: { data: file },
            notification: {
                body: notificationBody,
                title: notificationTitle,
            },
            registration_ids: tokens,
        })

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        await fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.error(error))
    };

    const addEmail = async () => {

        setShowWriteEmail(false)

        //    sendNotification() 
        if (window.confirm("Are you sure to want to Share this file with: " + emailText)) {
            await updateDoc(doc(fdb, 'files', state.fileViewerContent.id), { sharedWith: [...state.fileViewerContent.sharedWith, emailText.split('@')[0].toLowerCase().trim()] })
            await sendNotification(
                emailText.toLowerCase().trim(),
                `${state.fileViewerContent.type} Received`,
                `${state.name} shared a ${state.fileViewerContent.type} "${state.fileViewerContent.name}" with you!`,
                state.fileViewerContent,
            );
        }
    }

    useEffect(() => {
console.log(state.fileViewerContent.url !== undefined ? state.fileViewerContent.url[0] : undefined);
        if (state.fileViewerContent.value) {
            setFileName(state.fileViewerContent.name);
            setFileLink(state.fileViewerContent.url !== undefined ? state.fileViewerContent.url[0] : undefined);
            setFileContent(state.fileViewerContent.content);
        }
        else if (state.sharedFileViewerContent.value) {
            setFileName(state.sharedFileViewerContent.name);
            setFileLink(state.sharedFileViewerContent.url !== undefined ? state.sharedFileViewerContent.url[0] : undefined);
            setFileContent(state.sharedFileViewerContent.content);
        }

    }, [state.fileViewerContent, state.sharedFileViewerContent])

    useEffect(() => { searchEmails() }, [emailText])

    useEffect(() => {
        const views = async () => {
            await updateDoc(doc(fdb, 'files', state.fileViewerContent.id), {
                interactions: state.fileViewerContent.interactions + 1,
            })
        }
        views()
    }, [])

    // console.log(state.fileViewerContent.likes)

    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[92%]  w-[50%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={() => dispatch({ type: "setFileViewerContent", fileViewerContentAction: { value: false, id: null, name: null, content: null, url: null } })}>

                    <RxCross2 color='white' size={24} />

                </div>

                <div className='w-[95%] h-[70px] flex bg-red-00 flex justify-between  text-center'>

                    <div className='w-[33%] h-full flex items-end justify-start gap-1'>

                        {settingsIcon.map(data =>

                            <div className={`w-[30px] h-[30px] bg-gray-00 hover:cursor-pointer shadow-[inset_-12px_-8px_40px_#46464620]  center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                                <div className='font-medium '>{data.icon}

                                </div>
                            </div>

                        )}

                    </div>

                    <div className='w-[33%] text-lg font-medium center flex-col '>

                        <div className='flex gap-5 items-center bg-red-00'>
                            <div className=' h-full '></div>
                            <input className='pt-2 pb-1 h-[40px] w-auto font-medium text-2xl bg-[#0000] outline-none text-center center' placeholder='FileName' onChange={(e) => setFileName(e.target.value)} value={fileName} />
                        </div>

                        <div className='h-[1px] w-[90%] bg-black  text-lg font-medium'></div>

                    </div>

                    <div className='w-[33%] h-full flex justify-end items-end pr-1 pb-2 bg-red-00 gap-3 '>

                        <div className='hover:cursor-pointer' onClick={() => setdownloadFile(true)}><FiDownload size={22} /></div>
                        <div className='w-[100px] h-[25px] relative rounded-[2px] borde border-gray-500 center hover:cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] ' onClick={() => setOpenFileTypeSetting(!openFileTypeSetting)}>
                            <div className='w-[70%] center text-base gap-1'><MdPublic size={15} />{state.fileViewerContent.status == "public" ? "Public" : "Private"}</div>
                            <div className='w-[30%] h-full  center bg-red-00' >
                                <IoIosArrowDown size={16} />
                            </div>

                            <div className={`absolute center ${openFileTypeSetting ? "flex" : "hidden"} flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] justify-around w-full h-[60px] bg-[#EAEAEA] rounded-[2px]  borde border-gray-500 z-50 top-[30px]`}>
                                <button className='w-[90%] h-[45%] flex items-center pl-1 gap-1 hover:cursor-pointer hover:bg-gray-200 text-base' disabled={fileTypeSetting == "public" ? true : false} onClick={() => changeFileType("public")}><MdPublic size={15} />Public</button>
                                <div className='w-[90%] h-[1px] bg-gray-500'></div>
                                <button className='w-[90%] h-[45%] flex items-center pl-1 gap-1 hover:cursor-pointer hover:bg-gray-200 text-base' disabled={state.fileViewerContent.status == "private" ? true : false} onClick={() => changeFileType("private")}><MdPublicOff size={15} />Private</button>

                            </div>
                        </div>
                    </div>


                </div>

                <div className='w-[95%] h-full  items-center flex flex-col'>

                    <div className={`w-full relative h-[96%] mt-1 relative overflow-hidden  bg-red-00 shadow-[inset_-12px_-8px_40px_#46464620] overflow-none`} >

                        <textarea className='bg-[#0000] w-full h-[100%] overflow-y-auto scroll-style text-sm p-2 outline-none' spellCheck={false} style={{ resize: 'none' }}
                            value={fileContent}
                            contentEditable={true}
                            placeholder='Enter Data here .....'
                            onChange={(e) => setFileContent(e.target.value)}
                        />


                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[70px]" : "delay-200 bottom-[45px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                            <div className='font-medium' ><FiSave size={16} className='' /></div>

                        </div>

                    </div>

                    <div className={`w-[100%]  bg-green-00 transition-all duration-500 ease-in-out overflow-hidden  border-black ${openSaveOptions ? 'h-[150px]' : 'h-[0px]'} rounded-tl-[5px] rounded-[5px] borde-t-[px]`}>
                        <div className='w-full relative h-[40%] bg-red-00 flex items-center justify-between pr-2 pl-2 '>
                            <div className='flex text-base gap-2'>
                                <div className='font-medium'>Link</div>
                                <div className='min-w-[200px] h-[30px] rounded-[4px overflow-hidden bg-green-00 flex items-center border-gray-400 border-b-[1px]'><input placeholder='https://www.youtube.com/' className='w-full text-sm pl-2 h-full bg-[#0000] outline-none ' onChange={(e) => setFileLink(e.target.value)} value={fileLink}/></div>

                            </div>

                            <div className={`flex text-base gap-2 shadow-[inset_-12px_-8px_40px_#46464620] absolute right-[10px] transition-all duration-200 ease-linear  ${openSaveOptions ? "delay-200 top-[10px]" : "-top-[32px]"}  w-[32px] h-[32px] bg-gray-300 hover:bg-gray-400 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>
                                <div className='font-medium '><MdKeyboardDoubleArrowUp size={16} /></div>

                            </div>


                            <div className={`flex text-base gap-2 shadow-[inset_-12px_-8px_40px_#46464620] absolute right-[50px] transition-all duration-200 ease-linear  ${openSaveOptions ? "delay-200 top-[10px]" : "-top-[32px]"}  w-[32px] h-[32px] bg-gray-300 hover:bg-gray-400 hover:cursor-pointer center rounded-full `}>
                                <div className='font-medium ' onClick={() => setShowSharedEmail(true)}><IoIosShareAlt size={16} /></div>

                            </div>

                        </div>

                        <div className='w-full h-[60%] bg-red-00 flex center justify-between'>

                            <div className={`w-[150px] bg-red-00  `}>

                                {state.fileViewerContent.status == "public" ?
                                    <div className='flex gap-2'>  <div className='font-medium flex items-center text-[14px] gap-1 center'>
                                        {state.fileViewerContent.interactions} <LuEye size={19} />
                                    </div>
                                        <div className='font-medium flex items-center text-[14px] gap-1 center'>
                                            {/* {state.fileViewerContent.likes} {state.fileViewerContent.likedBy.contains(localStorage.getItem('userEmail').split('@')[0])? 
                                            <BiSolidLike size={21} className='text-blue-500' onClick={unlikeFile} />
                                            : */}

                                            {Likes}
                                            {fileLiked ? <BiSolidLike size={21} className='hover:cursor-pointer' onClick={likeFile} /> : <BiLike size={21} className='hover:cursor-pointer' onClick={likeFile} />}
                                            {/* // } */}
                                        </div>

                                    </div> : null}
                            </div>

                            <div className='text-base bg-[#2D2D2D] py-3 px-8 rounded-[5px] text-white w-auto hover:cursor-pointer hover:bg-[#434343] '
                                onClick={saveFileChanges}>Save</div>
                            <div className='w-[150px]'></div>

                        </div>




                    </div>
                </div>

                <div className={`h-full ${renameFilePopup.value || fileSaved ? "flex" : "hidden"} center w-full absolute top-0 left-0 bg-[#0002] backdrop-blur-sm  rounded-[5px] flex flex-col center`}>

                    <div className='text-base gap-2 items-center flex font-medium'>
                        {/* <div><FaRegFileAlt /></div> */}
                        {/* <div>File Saved</div> */}
                        <img src={loader} className='w-[35px]'/>

                    </div>

                </div>

                <div className={`h-full ${showSharedEmail ? "flex" : "hidden"} center w-full absolute top-0 left-0 bg-[#0002] backdrop-blur-sm  rounded-[5px] flex flex-col center`}>

                    <div className={`w-[50%] h-[50%] bg-[#EAEAEA] rounded-[5px] items-center  flex flex-col`}>

                        <div className='w-full flex justify-between px-2 pt-[1px] text-center semi-bold'>
                            <div className=' '></div>
                            <div className='text-lg font-medium'>Share File</div>
                            <div className='pt-1 hover:cursor-pointer' onClick={() => setShowSharedEmail(false)}><RxCross2 color='black' size={24} /></div>
                        </div>

                        {showWriteEmail ?

                            <div className='w-[95%] h-full flex items-center flex-col text-base'>


                                <div className='w-full h-[20%] flex flex-col gap-1'>

                                    <input type="input" placeholder='write email ..' className='px-2 bg-[#0000] rounded outline-none py-2 shadow-lg' value={emailText} onChange={(e) => setEmailText(e.target.value)} />

                                </div>

                                <div className='w-full h-[60%] flex flex-col gap-1'>
                                    {mappedEmails.map(data =>

                                        <div className='w-full p-2 flex bg-gray-300 flex justify-around items-center rounded-full text-sm hover:bg-gray-400' onClick={() => setEmailText(data)}>
                                            <div className='w-full center'>{data}</div>
                                        </div>

                                    )}
                                </div>

                                <div className='w-full h-[10%]  center'>
                                    <button className='p-5 bg-black rounded w-[100px] h-[45px] center text-white' onClick={addEmail} >Add</button>
                                </div>
                            </div>

                            :


                            <div className='w-[95%] h-full flex items-center flex-col text-base'>
                                <div className='w-full h-[10%] pl-2 mb-2'>File Shared With</div>
                                <div className='w-full h-[65%] flex flex-col gap-1'>
                                    {state.fileViewerContent.sharedWith.map(data =>

                                        <div className='w-full p-2 flex bg-gray-300 flex justify-around items-center rounded-full text-sm'>
                                            <div className='w-[85%] center'>{data}@gmail.com</div>
                                            <div className='w-[15%] center hover:cursor-pointer' onClick={() => removeEmail(data)}><RxCross2 color='black' size={20} /></div>
                                        </div>

                                    )}
                                </div>

                                <div className='w-full h-[25%]  center'>
                                    <button className='p-5 bg-black rounded w-[100px] h-[45px] center text-white' onClick={() => setShowWriteEmail(true)}>Add</button>
                                </div>
                            </div>}



                    </div>

                </div>



            </div>
            {
                downloadFile ? <PopUp title={"Download File"} width="w-[350px]" height="h-[200px]" crossFunction={() => { setdownloadFile(false) }}>
                    <div className='w-full center pb-10'>Chosse the format of the download File </div>
                    <div className='flex flex-row gap-5 w-full center'>
                        <div className='px-2 py-2 bg-green-600 rounded hover:cursor-pointer' onClick={() => DownloadWord()}>Download As Word</div>
                        <div className='px-2 py-2 bg-green-600 rounded hover:cursor-pointer' onClick={handleDownloadPDF}>Download As PDF</div>
                    </div>
                </PopUp>
                    : null
            }

        </div>
    )
}

export default OpenedFile

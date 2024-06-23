import { doc, getDoc } from 'firebase/firestore';
import { fdb } from '../../Firebase/firebaseConfig';
const sendNotification = async (
    receiverEmail,
    notificationTitle,
    notificationBody,
    file
) => {
    console.log("===================================================> herer")
    // const user = await getDoc(doc(fdb, 'users', receiverEmail.trim().toLowerCase())).then(async (user) => {
    //     console.log("Tokens: ======================> ", user.data().tokens)
    // })

    // const myHeaders = new Headers()
    // myHeaders.append('Authorization', 'key=AAAAoiZwGIM:APA91bGBQBDFmZ9UkWeY45LgbHSAn8ga2mMq8jlTQcO9ujp1Wo2va7LOrDFoz_xDMBP2E0h7N74R2wdSI3QkVlxKUmFz30CTtIQyk8ErS1DPmCR5HoL10L4aElDBqA9FCLUzf31BcFz')
    // myHeaders.append('Content-Type', 'application/json')

    // const raw = JSON.stringify({
    //     data: { data: file },
    //     notification: {
    //         body: notificationBody,
    //         title: notificationTitle,
    //     },
    //     registration_ids: user.data().tokens,
    // })

    // const requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow',
    // }
    // await fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error))
}

export default sendNotification
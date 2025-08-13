// import { NextResponse } from 'next/server'
// import { v2 as cloudinary } from 'cloudinary'

// // Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function POST(req) {
//   try {
//     const formData = await req.formData()
//     const image = formData.get('image')
//     const phone = formData.get('phone')

//     if (!image || !phone) {
//       return NextResponse.json({ success: false, error: 'Missing data' }, { status: 400 })
//     }

//     // Convert image to base64 for Cloudinary
//     const buffer = await image.arrayBuffer()
//     const base64 = Buffer.from(buffer).toString('base64')
//     const dataUri = `data:${image.type};base64,${base64}`

//     // Upload to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(dataUri, {
//       folder: 'whatsapp-cards',
//     })

//     // Send via WASender API
//     const wasenderRes = await fetch(`${process.env.WASENDER_API_URL}/api/sendImage`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'apikey': process.env.WASENDER_API_KEY // WASender API key
//       },
//       body: JSON.stringify({
//         phone: phone, // recipient phone number
//         image: uploadResult.secure_url, // image URL from Cloudinary
//         caption: 'Here is the shared card.'
//       })
//     })

//     const wasenderData = await wasenderRes.json()

//     if (!wasenderRes.ok) {
//       return NextResponse.json({ success: false, error: wasenderData }, { status: 500 })
//     }

//     return NextResponse.json({ success: true, wasenderData })
//   } catch (error) {
//     console.error('Error:', error)
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//   }
// }


// import { NextResponse } from 'next/server'
// import { v2 as cloudinary } from 'cloudinary'

// // Cloudinary Config
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function POST(req) {
//     try {
//         const formData = await req.formData()
//         const image = formData.get('image')
//         const phone = formData.get('phone')

//         if (!image || !phone) {
//             return NextResponse.json({ success: false, error: 'Missing image or phone' }, { status: 400 })
//         }

//         // Convert image to base64
//         const buffer = await image.arrayBuffer()
//         const base64 = Buffer.from(buffer).toString('base64')
//         const dataUri = `data:${image.type};base64,${base64}`

//         // Upload to Cloudinary
//         const uploadResult = await cloudinary.uploader.upload(dataUri, {
//             folder: 'whatsapp-cards',
//         })

//         // Send via WASender API
//         const wasenderRes = await fetch(process.env.WASENDER_API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.WASENDER_API_KEY}`
//             }
//             ,
//             body: JSON.stringify({
//                 number: phone, // WASender expects "number"
//                 message: 'Here is the shared card.',
//                 media_url: uploadResult.secure_url
//             })
//         })

//         const wasenderData = await wasenderRes.json()

//         if (!wasenderRes.ok) {
//             return NextResponse.json({ success: false, error: wasenderData }, { status: 500 })
//         }

//         return NextResponse.json({ success: true, wasenderData })
//     } catch (error) {
//         console.error('Error:', error)
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//     }
// }


// import { NextResponse } from 'next/server'
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function POST(req) {
//     try {
//         const formData = await req.formData()
//         const image = formData.get('image')
//         const phone = formData.get('phone')

//         if (!image || !phone) {
//             return NextResponse.json({ success: false, error: 'Missing data' }, { status: 400 })
//         }

//         // Convert file to base64 data URI
//         const buffer = await image.arrayBuffer()
//         const base64 = Buffer.from(buffer).toString('base64')
//         const dataUri = `data:${image.type};base64,${base64}`

//         // Upload to Cloudinary
//         const uploadResult = await cloudinary.uploader.upload(dataUri, {
//             folder: 'whatsapp-cards',
//         })

//         // Send to WhatsApp API
//         const wasenderRes = await fetch(process.env.WASENDER_API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.WASENDER_API_KEY}`
//             },
//             body: JSON.stringify({
//                 to: phone, // ✅ Correct key
//                 image_url: uploadResult.secure_url, // ✅ match API docs
//                 text: 'Here is the shared card.' // ✅ required text
//             })
//         })

//         const wasenderData = await wasenderRes.json()

//         if (!wasenderRes.ok) {
//             return NextResponse.json({ success: false, error: wasenderData }, { status: 500 })
//         }

//         return NextResponse.json({ success: true, wasenderData })
//     } catch (error) {
//         console.error('Error:', error)
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//     }
// }


import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
    try {
        const formData = await req.formData()
        const image = formData.get('image')
        const phone = formData.get('phone')
        const label = formData.get('label') || '' // ✅ Capture label


        if (!image || !phone) {
            return NextResponse.json(
                { success: false, error: 'Missing image or phone number' },
                { status: 400 }
            )
        }

        // Convert file to base64 data URI
        const buffer = await image.arrayBuffer()
        const base64 = Buffer.from(buffer).toString('base64')
        const dataUri = `data:${image.type};base64,${base64}`

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: 'whatsapp-cards',
        })

        // Send WhatsApp message
        const wasenderRes = await fetch('https://www.wasenderapi.com/api/send-message', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WASENDER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: phone, // ✅ Correct field name
                // text: 'Here is the shared card.', // ✅ Required text
                imageUrl: uploadResult.secure_url, // ✅ Matches API docs
                // text: label // ✅ Send label as caption
            })
        })

        const wasenderData = await wasenderRes.json()

        if (!wasenderRes.ok) {
            return NextResponse.json({ success: false, error: wasenderData }, { status: 500 })
        }

        return NextResponse.json({ success: true, wasenderData })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

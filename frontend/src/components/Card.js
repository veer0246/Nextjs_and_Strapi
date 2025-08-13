
// 'use client'

// import { useRef } from 'react'
// import html2canvas from 'html2canvas'

// export default function ShareCard({ imageSrc, text, phoneNumber }) {
//   const cardRef = useRef(null)

//   const handleShare = async () => {
//     try {
//       // Convert card to image
//       const canvas = await html2canvas(cardRef.current)
//       const dataUrl = canvas.toDataURL('image/png')
//       const blob = await (await fetch(dataUrl)).blob()
//       const file = new File([blob], 'card.png', { type: 'image/png' })

//       // Send to API
//       const formData = new FormData()
//       formData.append('image', file)
//       formData.append('phone', phoneNumber)

//       const res = await fetch('/api/send-whatsapp', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       if (data.success) {
//         alert('✅ Image sent to WhatsApp successfully!')
//       } else {
//         alert('❌ Error sending image: ' + JSON.stringify(data.error))
//       }
//     } catch (err) {
//       alert('❌ Error: ' + err.message)
//     }
//   }

//   return (
//     <div>
//       <div ref={cardRef} className="w-[300px] p-4 border rounded shadow bg-white">
//         <img src={imageSrc} alt="Card Image" className="w-full h-auto rounded" />
//         <p className="mt-2">{text}</p>
//         <p className="mt-2">{phoneNumber}</p>
//       </div>
//       <button
//         onClick={handleShare}
//         className="mt-2 bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
//       >
//         Share to WhatsApp
//       </button>
//     </div>
//   )
// }



// 'use client'

// import { useRef, useState } from 'react'
// import html2canvas from 'html2canvas'

// export default function ShareCard({ imageSrc,name, text, phoneNumber }) {
//   const cardRef = useRef(null)
//   const [isSending, setIsSending] = useState(false)

//   const handleShare = async () => {
//     try {
//       setIsSending(true) // ✅ Change button text

//       const canvas = await html2canvas(cardRef.current, { backgroundColor: '#ffffff' })
//       const dataUrl = canvas.toDataURL('image/png')
//       const blob = await (await fetch(dataUrl)).blob()
//       const file = new File([blob], 'card.png', { type: 'image/png' })

//       const formData = new FormData()
//       formData.append('image', file)
//       formData.append('phone', phoneNumber)

//       const res = await fetch('/api/send-whatsapp', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       if (data.success) {
//         alert('✅ Image sent to WhatsApp successfully!')
//       } else {
//         alert('❌ Error sending image: ' + JSON.stringify(data.error))
//       }
//     } catch (err) {
//       alert('❌ Error: ' + err.message)
//     } finally {
//       setIsSending(false) // ✅ Reset button text
//     }
//   }

//   return (
//     <div>
//       <div ref={cardRef} className="card shadow-sm" style={{ width: '18rem' }}>
//         <img src={imageSrc} alt="Card" className="card-img-top h-50" />
//         <div className="card-body">
//           <p className="card-text font-bold">{name}</p>
//           <p className="card-text">{text}</p>
//           <p className="text-muted">{phoneNumber}</p>
//         </div>
//       </div>
//       <button
//         onClick={handleShare}
//         className="btn btn-success mt-3"
//         disabled={isSending} // ✅ Disable while sending
//       >
//         {isSending ? 'Sending...' : 'Share to WhatsApp'}
//       </button>
//     </div>
//   )
// }

'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

export default function ShareCard({ imageSrc, name, text, phoneNumber }) {
  const cardRef = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [label, setLabel] = useState('')

  const handleShare = async () => {
    try {
      setIsSending(true)

      // Capture card as image
      const canvas = await html2canvas(cardRef.current, { backgroundColor: '#ffffff' })
      const dataUrl = canvas.toDataURL('image/png')
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], 'card.png', { type: 'image/png' })

      // Send form data to API
      const formData = new FormData()
      formData.append('image', file)
      formData.append('phone', phoneNumber)
      formData.append('label', label)

      const res = await fetch('/api/send-whatsapp', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        alert('✅ Image sent to WhatsApp successfully!')
      } else {
        alert('❌ Error sending image: ' + JSON.stringify(data.error))
      }
    } catch (err) {
      alert('❌ Error: ' + err.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div>
      <div ref={cardRef} className="card shadow-sm" style={{ width: '18rem' }}>
        <img src={imageSrc} alt="Card" className="card-img-top" style={{width:'200px', height:'200px', borderRadius:'50%', margin:'auto'}} />
        <div className="card-body">
          <p className="card-text fw-bold">{name}</p>
          <p className="card-text">{text}</p>
          <p className="text-muted">{phoneNumber}</p>
          {/* Label inline input */}
          <div className="d-flex align-items-center">
            <strong className="me-2">Label:</strong>
            <input
              type="text"
              // className="form-control"
              style={{
                maxWidth: '120px', height:'30px', fontSize: '0.9rem', border: 'none',
                outline: 'none'
              }}
              placeholder="Enter label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

        </div>
      </div>

      <button
        onClick={handleShare}
        className="btn btn-success mt-3"
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Share to WhatsApp'}
      </button>
    </div>
  )
}

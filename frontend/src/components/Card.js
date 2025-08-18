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
async function rawData() {
  let data = await fetch("https://radiant-pleasure-e494182367.strapiapp.com/api/blogs");
  let raw = await data.json();
  console.log(raw);
}

rawData();

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

// import { useState, useEffect, useRef } from "react";

// export default function ShareCard() {
//   const [blogs, setBlogs] = useState([]);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return; // Prevent double fetch
//     hasFetched.current = true;

//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           "https://radiant-pleasure-e494182367.strapiapp.com/api/blogs"
//         );
//         const data = await res.json();
//         setBlogs(data.data || []); // Strapi's data is usually inside data[]
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {blogs.map((blog) => (
//         <div key={blog.id}>
//           <h2>{blog.Title}</h2>
//           <p>{blog.Description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

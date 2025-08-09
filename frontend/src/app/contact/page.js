// 'use client';
// import { useState } from "react";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/contact', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     const result = await res.json();
//     alert(result.message);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
//       <input name="name" placeholder="Name" onChange={handleChange} className="p-2 border w-full" required />
//       <input name="email" placeholder="Email" onChange={handleChange} className="p-2 border w-full" required />
//       <textarea name="message" placeholder="Message" onChange={handleChange} className="p-2 border w-full" required />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    image: null
  });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.append("data", JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message
    }));
    if (form.image) {
      formData.append("files.image", form.image);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        setStatus("Message sent!");
        setForm({ name: "", email: "", phone: "", message: "", image: null });
      } else {
        const data = await res.json();
        setStatus("Error: " + (data.error || "Failed to send"));
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error");
    }
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full border px-3 py-2"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full border px-3 py-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full border px-3 py-2"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label className="block mb-1">Message</label>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
            className="w-full border px-3 py-2"
            rows={4}
            placeholder="Your message"
          />
        </div>

        <div>
          <label className="block mb-1">Image</label>
          <input
            type="file"
            onChange={(e) => setForm(f => ({ ...f, image: e.target.files[0] }))}
            className="w-full"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="mt-2">{status}</p>}
      </form>
    </main>
  );
}

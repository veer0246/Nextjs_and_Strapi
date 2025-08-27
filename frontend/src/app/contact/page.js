"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    dob: "",
    password: "",
    photo: null,
  });

  const [status, setStatus] = useState(""); // Added state for form status

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending...");

    try {
      let photoId = null;
      if (formData.photo) {
        const fileData = new FormData();
        fileData.append("files", formData.photo);

        const uploadRes = await fetch("https://radiant-pleasure-e494182367.strapiapp.com/api/upload", {
          method: "POST",
          body: fileData,
        });
        const uploadData = await uploadRes.json();
        photoId = uploadData[0]?.id;
      }

      const res = await fetch("https://radiant-pleasure-e494182367.strapiapp.com/api/userds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            dob: formData.dob,
            password: formData.password,
            photo: photoId,
          },
        }),
      });

      const result = await res.json();
      console.log("Form Submitted:", result);
      if (result?.data) {
        setStatus("success");
        alert("Your form has been successfully submitted!");

        // Reset form
        setFormData({
          name: "",
          address: "",
          email: "",
          dob: "",
          password: "",
          photo: null,
        });

        // Also reset input fields manually
        e.target.reset();
      } else {
        setStatus("error");
        alert("Failed to submit form.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register Form
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 cursor-pointer"
          />

          <button
            type="submit"
            disabled={status === "sending..."}
            className={`${status === "sending..." ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-5 py-2 rounded transition`}
          >
            {status === "sending..." ? "Sending..." : "Submit"}
          </button>

          {/* {status && (
            <p
              className={`mt-2 text-center ${status.startsWith(" ") ? "text-green-600" : "text-red-600"
                }`}
            >
              {status}
            </p>
          )} */}
        </form>
      </div>
    </div>
  );
}

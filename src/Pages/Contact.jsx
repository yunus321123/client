 import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosinstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isEmail(userInput.email)) {
      toast.error("Invalid Email");
      return;
    }
    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="bg-[#111] text-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-700 space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-yellow-400">
            Contact Us
          </h1>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
              name="name"
              id="name"
              placeholder="Yunus Ansari"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-40"
              name="message"
              id="message"
              placeholder="Write your message..."
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md transition-all duration-300"
          >
            Submit Message
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;

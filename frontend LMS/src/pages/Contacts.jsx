import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { isEmailValid } from '../validators/validator.js'
import HomeLayout from '../layouts/HomeLayout'
import axiosInstance from '../config/axiosInstance'

export default function Contacts() {
    const [userInput, setUserInput] = useState({
        email: '',
        name: '',
        message: ''
    })

    // handle input change 
    function handleInputChange(e){
        const {name, value} = e.target;

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    // Form submit 
    async function onFormSubmit(event){
        event.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if(!isEmailValid(userInput.email)) {
            toast.error("Invalid email provided");
            return;
        }

        // server call
        try {
            const response = await axiosInstance.post("/contact", userInput);
            toast.loading("Submitting your query")
            toast.success("Form submitted successfully")
            toast.error("Failed to submit the form")
            const responseData =  response;
            console.log("contact us related info:",responseData);
            if(responseData?.data) {
                setUserInput({
                    email: "",
                    name: "",
                    message: ""
                })
            }
        } catch(error) {
            toast.error("Not submitted operation failed try again!");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white ">
                    <h1 className="text-3xl font-semibold">Contact form</h1>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            id="name"
                            className="bg-white border px-2 py-1 rounded-sm text-black"
                            type="text"
                            placeholder="enter your name"
                            name="name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            id="email"
                            className="bg-white border px-2 py-1 rounded-sm text-black"
                            type="email"
                            placeholder="enter your email"
                            name="email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            id="message"
                            className="bg-white border px-2 py-1 rounded-sm resize-none h-40 text-black"
                            type="text"
                            placeholder="enter your message"
                            name="message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}
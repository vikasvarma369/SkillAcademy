import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { isEmailValid } from '../validators/validator.js'
import HomeLayout from '../layouts/HomeLayout'
import axiosInstance from '../config/axiosInstance'
import TextArea from '../components/TextArea.jsx'

export default function Contacts() {
    const [userInput, setUserInput] = useState({
        email: '',
        name: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true)

        // server call
        try {
            const response = await axiosInstance.post("/contact", userInput);
            toast.success("Form submitted successfully")
            const responseData =  response;

            if(responseData?.data) {
                setUserInput({
                    email: "",
                    name: "",
                    message: ""
                })
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch(error) {
            toast.error("Not submitted operation failed try again!");
        }
    }

    return (
        <HomeLayout>
            <div className="flex flex-col gap-6 items-center justify-center py-8 px-3 min-h-[85vh]">
                <form onSubmit={onFormSubmit} 
                autoComplete='off'
                noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white ">
                    <h1 className="text-3xl font-semibold dark:text-yellow-500">Contact Form</h1>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            id="name"
                            className="bg-white border px-2 py-1 rounded-sm text-black"
                            type="text"
                            placeholder="Enter your name"
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
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        
                        <TextArea 
                            label={"Message"}
                            id = {"message"}
                            name = {"message"}
                            type = {"text"}
                            rows={4}
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>
                    <button
                        disabled = {isLoading}
                        type="submit" className="w-full bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        {isLoading ? "Wait" : "Submit"}
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}
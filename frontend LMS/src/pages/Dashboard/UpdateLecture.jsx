import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateCourseLecture } from '../../Redux/Slices/lectureSlice';
import toast from 'react-hot-toast';

function UpdateLecture() {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log("state pass display",state)
    // state 
    const [userInput, setUserInput] = useState({
        title: state?.lecture?.title,
        description: state?.lecture?.description,
        videoSrc: "",
        lecture: null
    })
    const [isLoading, setIsLoading] = useState(false);

    // handle input change
    function handleInputChange(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    // handle video 
    function handleVideo(e) {
        const video = e.target.files[0];
        const src = window.URL.createObjectURL(video);
        // console.log("src", src, video);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: src
        })
    }

    // handle the form submit 
    async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.title || !userInput.description) {
            toast.error("tittle and description required");
            return;
        }
        let fromdata = new FormData()
        fromdata.append("title", userInput.title)
        fromdata.append("description", userInput.description)
        fromdata.append("courseId", state._id )
        fromdata.append("lectureId",state?.lecture?._id )
        fromdata.append("lecture",userInput.lecture )
        setIsLoading(true)
        const response = await dispatch(updateCourseLecture(fromdata));
        // console.log("update lecture", response)
        if(response?.payload?.data?.success) {
            toast.success(response?.payload?.data?.message)
            setIsLoading(false)
            navigate(-1);
            setUserInput({
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            });
        }
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-15">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 sm:w-[70%] rounded-lg">
                    <header className="flex items-center justify-center relative">
                        
                        <h1 className="text-xl text-yellow-500 font-bold">
                            Update Lecture
                        </h1>
                    </header>

                    {/* main from */}

                    <form 
                        onSubmit={onFormSubmit}
                        className="flex flex-col gap-3">
                        <label htmlFor="title" className='text-xl font-semibold'>Lecture Title :</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            className="bg-transparent px-3 py-1 border"
                            value={userInput.title}
                            onChange={handleInputChange}
                        />

                        {/* description */}
                        <label htmlFor="description" className='text-xl font-semibold'>Lecture Description :</label>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="enter the description of the lecture"
                            className="bg-transparent px-3 py-1 resize-none h-36 overflow-y-scroll border"
                            onChange={handleInputChange}
                            value={userInput.description}
                        />
                        <h2 className='text-xl font-semibold'>Click in the box to add lecture :
                        </h2>
                        {
                            userInput.videoSrc ? (
                                <video 
                                    className="object-fill rounded-tl-lg w-full rounded-tr-lg"
                                    controls 
                                    muted
                                    src={userInput.videoSrc}
                                    controlsList="nodownload"
                                    disablePictureInPicture
                                >

                                </video>
                            ) : (
                                <div
                                    className="h-48 border flex items-center justify-center cursor-pointer"
                                >
                                    <label className="font-semibold text-xl cursor-pointer" htmlFor="lecture">Choose new file only if you want change the previous lecture </label>
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="lecture"
                                        name="lecture"
                                        onChange={handleVideo}
                                        accept="video/mp4 video/x-mp4 video/*"
                                    />
                                </div>
                            )
                        }
                        <button 
                            disabled = {isLoading}
                            type="submit" 
                            className="btn bg-yellow-800 hover:bg-yellow-500 py-1 text-lg font-semibold">
                            {isLoading? "Updating...":"Update"}
                        </button>
                    </form>
                    
                </div>
            </div>
        </HomeLayout>
    )
}

export default UpdateLecture
import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/lectureSlice'
import toast from 'react-hot-toast'

function DisplayLectures() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { state } = useLocation()
    const { lectures } = useSelector((state)=> state?.lecture)
    const { role } = useSelector((state)=> state.auth)

    // state 
    const [currentVideo, setCurrentVideo] = useState(0);

    // delete lecture
    async function handleLectureDelete(courseId, lectureId){
        setIsLoading(true)
        await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}));
        // toast.success("Lecture Deleted successfully !!")
        setIsLoading(false)
        await dispatch(getCourseLectures(courseId));
    }


    useEffect(()=>{
        if(!state) navigate("/courses")
        dispatch(getCourseLectures(state._id))
    }, [])
    return (
    <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
            <div className="text-center text-2xl font-semibold text-yellow-500">
            Course Name: {state?.title}
            </div>

            {/* add new lecture button */}
            <div className="font-semibold bg-accent hover:opacity-50 rounded-lg text-xl text-yellow-500 flex items-center justify-between">
                {role === "ADMIN" && (
                    <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                        Add New Lecture
                    </button>
                )}
            </div>

            {/* if lecture length > 0  */}
            {lectures && lectures.length > 0 && (
                    <div className="flex justify-center gap-10 w-full">
                        
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video
                                src={lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg w-full rounded-tr-lg"
                                controls
                                disablePictureInPicture
                                controlsList="nodownload"
                                muted
                            >
                            </video>
                            <h1>
                                <span className="text-yellow-500">
                                    Title: {" "}
                                </span>
                                {lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500">
                                    Description: {" "}
                                </span>
                                {lectures[currentVideo]?.description}
                            </p>
                        </div>

                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-5">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-center">
                                Lectures List
                            </li>
                            {lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id}>
                                        <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                            <span>Lecture {idx+1} : {" "}</span> {lecture?.title}
                                        </p>
                                        {/* delete Lecture */}
                                        {role === "ADMIN" && (
                                            <button
                                                disabled = {isLoading}
                                                onClick={() => handleLectureDelete(state?._id, lecture?._id)} className=" bg-accent hover:opacity-50 px-2 py-1 rounded-md font-semibold text-sm">
                                                {isLoading? "Deleting....": "Delete lecture"}
                                            </button>
                                        )}
                                        {/* Update lecture */}
                                        {role === "ADMIN" && (
                                            <button
                                            onClick={() => navigate("/course/updatelecture",{
                                                state:{...state, lecture:{...lecture}}
                                            }) }className="bg-accent hover:opacity-50 px-2 mx-4 py-1 rounded-md font-semibold text-sm">
                                                Update
                                            </button>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>

                    </div>

                )}
            
        </div>
    </HomeLayout>
    )
}

export default DisplayLectures
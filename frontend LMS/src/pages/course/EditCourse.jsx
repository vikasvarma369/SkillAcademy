import React, { useRef, useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { editCourse, getAllCourses } from '../../Redux/Slices/CourseSlice';
import toast from 'react-hot-toast';
function EditCourse() {
    // const ref = useRef(null)
    const {state} = useLocation()
    console.log(state)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // state 
    const [userInput, setUserInput] = useState({
        title: state.title,
        description: state.description,
        category:state.category,
        createdBy: state.createdBy,
        thumbnail: "",
        previewImage: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    // handle image upload
    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setUserInput({
                    ...userInput,
                    thumbnail: uploadedImage,
                    previewImage: this.result // result fileReader
                })
            })
        }
    }

    // handle user input 
    function handleUserInput(e){
        const {name, value} = e.target
        setUserInput({
            ...userInput,
            [name]: value
        })
    }
    
    // handle form sumbmit event 
    async function onFormSubmit(e){
        e.preventDefault();
        // if(!userInput.thumbnail){
        //     toast.error("thumbnail are required");
        //     setIsLoading(false)
        //     return
        // }
        if(!userInput.title || !userInput.description || !userInput.createdBy || !userInput.category) {
            toast.error("All field are mandatory except thumbnail");
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
        let formData = new FormData()
        formData.append("title", userInput?.title)
        formData.append("description", userInput?.description)
        formData.append("category", userInput?.category)
        formData.append("thumbnail", userInput?.thumbnail)
        formData.append("createdBy", userInput?.createdBy)
        formData.append("id", state._id)
        console.log("data edit course", formData)
        const response = await dispatch(editCourse(formData));
        
        if(response?.payload?.data?.success){
            await dispatch(getAllCourses())
            navigate("/admin/dashboard")
        }
    }
    return (
        <HomeLayout>
            <div className="h-[90vh] flex itmes-center justify-center">
                <form 
                    onSubmit={onFormSubmit}
                    noValidate
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white  w-[800px] my-10 shadow-[0_0_10px_black] relative"
                >
                    <h1 className="text-center text-yellow-500 text-2xl font-bold">
                        Edit Course
                    </h1>
                    {/* hero main */}
                    <main className="grid grid-cols-2 gap-x-10">
                        {/* grid left side  */}
                        <div className="gap-y-6">
                            <div>
                            <label htmlFor="image_uploads" className="cursor-pointer">
                                {userInput?.previewImage ? (
                                        <img 
                                            src={userInput?.previewImage}
                                            className="w-full h-44 m-auto border"
                                        />
                                    ): (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload course thumbnail</h1>
                                        </div>
                                )}
                            </label>
                            <input 
                                // ref={ref}
                                // defaultValue={state.thumbnail.secure_url
                                // }
                                className="hidden"
                                type="file"
                                id="image_uploads"
                                accept=".jpg, .png, .jpeg,"
                                name="image_uploads"
                                onChange={handleImageUpload}
                            />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold">Course title</label>
                                <input 
                                    // ref={ref}
                                    // defaultValue={state.title}
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="enter the title of the course"
                                    onChange={handleUserInput}
                                    value={userInput.title}
                                    className="bg-transparent px-2 py-1 border"
                                
                                />
                            </div>
                        </div>
                        {/* grid right side */}
                        {/* created by  */}
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold">Instructor</label>
                                <input 
                                    // ref={ref}
                                    // defaultValue={state.createdBy}
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter the instructor of the course"
                                    onChange={handleUserInput}
                                    value={userInput.createdBy}
                                    className="bg-transparent px-2 py-1 border"
                                
                                />
                            </div>
                            {/* category  */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="category" className="text-lg font-semibold">Category</label>
                                <input 
                                    // ref={ref}
                                    // defaultValue={state.category}
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter the category of the course"
                                    onChange={handleUserInput}
                                    value={userInput.category}
                                    className="bg-transparent px-2 py-1 border"
                                />
                            </div>
                            {/* Description */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-lg font-semibold">Description</label>
                                <textarea 
                                    // ref={ref}
                                    // defaultValue={state.description}
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter the description of the course"
                                    onChange={handleUserInput}
                                    value={userInput.description}
                                    className="bg-transparent px-2 py-1 border h-24 resize-none overflow-y-scroll"
                                />
                            </div>
                        </div>
                    </main>
                    {/* create button */}
                    <button 
                        disabled = {isLoading}
                        type="submit"
                        className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                    >{isLoading?"Updating...":"Update"}</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditCourse
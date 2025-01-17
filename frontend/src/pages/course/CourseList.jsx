import React, { useEffect } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import CourseCard from '../../components/CourseCard';

export default function CourseList() {

    const dispatch = useDispatch();

    const { courselist } = useSelector((state)=> state.course)

    // funtion that run and fetch all the course 
    async function reviceAllCourses(){
        await dispatch(getAllCourses());
    }
    useEffect(()=>{
        reviceAllCourses()
    },[])
    return (
        <HomeLayout>
            <div className="text-white flex flex-col gap-14 py-6  px-20 ">
                <h1 className="text-center m-auto text-4xl font-semibold mb-5 md:text-4xl  w-fit text-yellow-600 dark:text-white font-inter after:content-[' '] relative after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full">
                Explore courses made by { " " } <span className="font-bold text-yellow-500 ">Industry experts</span>
                </h1>
            </div>
            {/* card to show course */}
            <div className="mb-10 flex gap-10 md:justify-center justify-center flex-wrap">
                {courselist?.map((course)=> (
                    <CourseCard key={course._id} data = {course} />
                ))}
            </div>
        </HomeLayout>
    )
}

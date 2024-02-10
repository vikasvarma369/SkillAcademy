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
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-4xl font-semibold mb-5">
                Explore courses made by { " " } <span className="font-bold text-yellow-500">Industry experts</span>
                </h1>
            </div>
            {/* card to show course */}
            <div className="mb-10 flex flex-wrap gap-14">
                {courselist?.map((course)=> (
                    <CourseCard key={course._id} data = {course} />
                ))}
            </div>
        </HomeLayout>
    )
}

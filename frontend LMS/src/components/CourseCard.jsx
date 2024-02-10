import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CourseCard({data}) {
    const navigate = useNavigate();
    return (
        <div className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">
            {/* for image  */}
            <div className="overflow-hidden">
                <img 
                src={data?.thumbnail?.secure_url} 
                alt="Course thumbnail" 
                className="h-48 w-full rounded-tl-lg rounded-tr-lg group:hover:scale=[1,2] transition-all ease-in-out duration-300"
                />
                {/* for course info title description category createby */}
                <div className="p-3 space-y-1 text-white">
                    {/* title */}
                    <h2 className="text-cl font-bold text-yellow-500 line-clamp-2">
                        {data?.title}
                    </h2>
                    {/* description */}
                    <p className="line-clamp-2">
                        {data?.description}
                    </p>
                    {/* category */}
                    <p className= " font-semibold">
                        Category: <span className="font-bold text-yellow-500">
                            {data?.category}
                        </span>
                    </p>
                    {/* instructor */}
                    <p className= "font-semibold">
                        Instructor: <sapn className="font-bold text-yellow-500">
                            {data?.createdBy}
                        </sapn>
                    </p>
                    {/* total lectures */}
                    <p className= "font-semibold">
                        Total Lectures: <span className="font-bold text-yellow-500">
                            {data?.numberOfLectures}
                        </span>

                    </p>
                </div>
            </div>
        </div>
    )
}

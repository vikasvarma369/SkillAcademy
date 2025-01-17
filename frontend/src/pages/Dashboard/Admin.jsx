import React, { useEffect } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
  } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { getPaymentsRecords } from '../../Redux/Slices/razorpaySlice'
import { getStatusData } from '../../Redux/Slices/statusSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteCourse, getAllCourses } from '../../Redux/Slices/CourseSlice';
import toast from 'react-hot-toast';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip
  );


function Admin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // admin stats related data
    const {
        allUserCount, allSubscriberCount
    } = useSelector((state)=> state.status)

    // razorpay related data
    const { allPayments, finalMonths, monthlySalesRecord } = useSelector((state)=> state.razorpay)

    // course related data 
    const myCourses = useSelector((state)=> state.course.courselist);

    // user data 
    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [
          {
            label: "User Details",
            data: [allUserCount, allSubscriberCount],
            backgroundColor: ["yellow", "green"],
            borderColor: ["yellow", "green"],
            borderWidth: 1,
          },
        ],
    };

    // sales data 
    const salesData = {
        labels: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        fontColor: "white",
        datasets: [
          {
            label: "Sales / Month",
            data: monthlySalesRecord,
            backgroundColor: ["rgb(255, 99, 132)"],
            borderColor: ["white"],
            borderWidth: 2,
          },
        ],
    };

    
    // handle course delete
    const OnCourseDelete = async(id)=>{
        if(window.confirm("Are you sure you want to delete the course ?")){
            const res = await dispatch(deleteCourse(id))
            toast.success("Course deleted successfully")
            if(res){
                await dispatch(getAllCourses())
            }
        }
    }


    useEffect(() => {
        (async () => {
          await dispatch(getAllCourses());
          await dispatch(getStatusData());
          await dispatch(getPaymentsRecords());
        })();
      }, []);

    return (
        <HomeLayout>
            <div className='min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white'>
                <h1 className="text-center text-3xl font-semibold text-yellow-500">
                Admin Dashboard
                </h1>
                {/* records card and chart for sales and user details */}
                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                {/* displaying the users chart and data */}
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    {/* displaying the pie chart */}
                    <div className="w-80 h-80">
                    <Pie data={userData} />
                    </div>

                    {/* card for user data */}
                    <div className="grid grid-cols-2 gap-5">
                    {/* card for registered users */}
                    <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                        <div className="flex flex-col items-center">
                        <p className="font-semibold">Registered Users</p>
                        <h3 className="text-4xl font-bold">{allUserCount}</h3>
                        </div>
                        <FaUsers className="text-yellow-500 text-5xl" />
                    </div>

                    {/* card for enrolled users */}
                    <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                        <div className="flex flex-col items-center">
                        <p className="font-semibold">Subscribed Users</p>
                        <h3 className="text-4xl font-bold">{ allSubscriberCount}</h3>
                        </div>
                        <FaUsers className="text-green-500 text-5xl" />
                    </div>
                    </div>
                </div>

                {/* displaying the sales chart and data */}
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    {/* for displaying the bar chart */}
                    <div className="h-80 relative w-full">
                    <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                    </div>

                    {/* card for user data */}
                    <div className="grid grid-cols-2 gap-5">
                    {/* card for registered users */}
                    <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                        <div className="flex flex-col items-center">
                        <p className="font-semibold">Subscriptions Count</p>
                        <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                        </div>
                        <FcSalesPerformance className="text-yellow-500 text-5xl" />
                    </div>

                    {/* card for enrolled users */}
                    <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                        <div className="flex flex-col items-center">
                        <p className="font-semibold">Total Revenue</p>
                        <h3 className="text-4xl font-bold">
                            {allPayments?.count * 499}
                        </h3>
                        </div>
                        <GiMoneyStack className="text-green-500 text-5xl" />
                    </div>
                    </div>
                </div>
                </div>


                {/* CRUD courses section */}
                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-center text-3xl font-semibold">
                    Courses Overview
                    </h1>

                    {/* add course card */}
                    <button
                    onClick={() => {
                        navigate("/course/create", {
                        state: {
                            initialCourseData: {
                            newCourse: true,
                            title: "",
                            category: "",
                            createdBy: "",
                            description: "",
                            thumbnail: undefined,
                            previewImage: "",
                            },
                        },
                        });
                    }}
                    className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                    >
                    Create New Course
                    </button>
                </div>

                <table className="table overflow-x-scroll">
                    <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Course Title</th>
                        <th>Course Category</th>
                        <th>Instructor</th>
                        <th>Total Lectures</th>
                        <th>Course Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {/* {console.log("my course",myCourses)} */}
                    {myCourses?.map((element, index) => {
                        return (
                        <tr key={element?._id}>
                            <td>{index + 1}</td>
                            <td>
                            <textarea
                                readOnly
                                className="w-40 h-auto bg-transparent resize-none"
                                value={element?.title}
                            ></textarea>
                            </td>
                            <td>{element?.category}</td>
                            <td>{element?.createdBy}</td>
                            <td>{element?.numberOfLectures}</td>
                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                            <textarea
                                readOnly
                                className="w-80 h-auto bg-transparent resize-none"
                                value={element?.description}
                            ></textarea>
                            </td>

                            <td className="flex items-center gap-4">

                            {/* to edit the course */}
                            <button
                                onClick={() => navigate("/course/edit", {
                                    state: { ...element },
                                  })
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                            >
                                <MdOutlineModeEdit />
                            </button>

                            {/* to delete the course */}
                            <button
                                onClick={() => OnCourseDelete(element._id)}
                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                            >
                                <BsTrash />
                            </button>

                            {/* to CRUD the lectures */}
                            <button
                                onClick={() =>
                                navigate("/course/displaylectures", {
                                    state: { ...element },
                                })
                                }
                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                            >
                                <BsCollectionPlayFill />
                            </button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

            </div>
        </HomeLayout>
    )
}

export default Admin
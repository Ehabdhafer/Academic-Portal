import Hero from "./hero";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Teacher = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = token;
  const [courses, setCourses] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:5000/deletecourse/${id}`);
      fetchData();
    } catch (error) {
      console.error("error posting data", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getteachercourse`
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Hero />
      <Link to={"/addcourse"} className="px-16 ">
        <button className="inline-flex mb-8 items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          Add Course
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
      <div className="lg:px-16">
        {courses ? (
          <div className="flex flex-wrap gap-28">
            {courses.map((item) => (
              <div
                key={item.id}
                className="flex flex-col lg:w-[580px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row"
              >
                <img
                  className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
                  alt="Course"
                />
                <div className="flex flex-col justify-start p-6">
                  <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                    {item.course_name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Description: {item.description}
                  </p>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Instructor: {item.User.name}
                  </p>
                  <p className=" text-neutral-500 dark:text-neutral-300">
                    Start at: {item.start_date.split("T")[0]}
                  </p>
                  <p className=" text-neutral-500 dark:text-neutral-300">
                    End at: {item.end_date.split("T")[0]}
                  </p>
                  <div className="flex flex-wrap gap-16 pt-2">
                    <button className="w-20 text-white bg-blue-500 rounded-lg">
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-20 text-white bg-red-500 rounded-lg "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-2xl">Loading ...</div>
        )}
      </div>
    </div>
  );
};

export default Teacher;

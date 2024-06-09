import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [courses, setCourses] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getcourse/${id}`
        );
        setCourses(response.data);
      } catch (e) {
        console.error("error fetching data", e);
      }
    };
    fetchData();
  }, []);

  return courses ? (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={courses.image_url}
                alt="Blog Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              Course Title :{" "}
              {courses.course_name?.charAt(0).toUpperCase() +
                courses.course_name?.slice(1)}
            </h2>
            <div className="mb-4 mt-6">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Instructor :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.User.name?.charAt(0).toUpperCase() +
                  courses.User.name?.slice(1)}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Start Date :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.start_date?.split("T")[0]}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                End Date :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.end_date?.split("T")[0]}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Created At :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.createdAt?.split("T")[0]}
              </span>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Blog Description:
              </span>{" "}
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-2xl">Loading ...</div>
  );
};

export default Details;

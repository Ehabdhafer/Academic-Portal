import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [courses, setCourses] = useState(null);
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getcourse/${Id}`
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
                src={courses.image}
                alt="Blog Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              Blog Title :{" "}
              {courses.title.charAt(0).toUpperCase() + courses.title.slice(1)}
            </h2>
            <div className="mb-4 mt-6">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Author :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.author.charAt(0).toUpperCase() +
                  courses.author.slice(1)}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                User Name :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.username.charAt(0).toUpperCase() +
                  courses.username.slice(1)}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                City :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.city}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Created At :{" "}
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {courses.created_at.split("T")[0]}
              </span>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Blog Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 text-left">
                {courses.description}
              </p>
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

import Hero from "./hero";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = token;
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getcourse`);
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

export default Home;

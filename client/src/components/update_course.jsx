import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = token;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [courses, setCourses] = useState(null);
  const [formData, SetFormData] = useState({
    course_name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getcourse/${id}`);
      const courses = response.data;
      setCourses(courses);
      SetFormData({
        user_id: courses.user_id,
        course_name: courses.course_name,
        description: courses.description,
        start_date: courses.start_date,
        end_date: courses.end_date,
      });
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      await axios.put(`http://localhost:5000/updatecourse/${id}`, updatedData);
      setError("Your Course updated successfully");
      setTimeout(() => {
        navigate("/teacher");
      }, 4000);
    } catch (e) {
      console.error("error posting data", e);
      setError("All Fields are required");
    }
  };

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="bg-gray-100 ">
        <div className="mx-auto max-w-screen-xl px-4 py-16 xl:py-0 sm:px-6 lg:px-8 ">
          <div className="flex justify-center items-center h-screen lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <span>Course_name</span>
                    <input
                      type="text"
                      name="course_name"
                      placeholder="course_name"
                      value={formData.course_name}
                      onChange={handleChange}
                      className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                      id="course_name"
                    />
                  </div>
                  <div>
                    <span>start_date :</span>
                    <input
                      name="start_date"
                      type="date"
                      placeholder="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                      id="start_date"
                    />
                  </div>
                  <div>
                    <span>end_date :</span>
                    <input
                      name="end_date"
                      type="date"
                      placeholder="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                      id="end_date"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                    rows={8}
                  />
                </div>
                {error && (
                  <p className="text-red-500 transition delay-150 duration-300 ease-in-out">
                    {error}
                  </p>
                )}
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Add Your Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateCourse;

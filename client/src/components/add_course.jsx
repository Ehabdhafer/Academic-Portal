import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = token;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, SetFormData] = useState({
    course_name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("course_name", formData.course_name);
      data.append("description", formData.description);
      data.append("start_date", formData.start_date);
      data.append("end_date", formData.end_date);

      if (image) {
        data.append("image", image); // Ensure 'file' matches the server expectation
      }
      await axios.post("http://localhost:5000/postcourse", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError("Course added Successfully");
      setTimeout(() => {
        navigate("/teacher");
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.error("error posting data", e);
      setError("All Fields are required");
    }
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
                  <input
                    // name="image"
                    type="file"
                    placeholder="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                    // id="image"
                  />
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

export default AddCourse;

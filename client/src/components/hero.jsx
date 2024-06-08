import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" dark:bg-gray-900 ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
            Discover the Essence of Learning: Where Knowledge Blossoms and
            Futures Unfold
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Experience a world where the pursuit of excellence is at the heart
            of every lesson, and the thrill of discovery awaits at every turn.
            Academic_Portal calls to the learner within, presenting a rich
            tapestry of courses that ignite your passion and drive your success.
          </p>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="
            https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp              "
            alt="Courses"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

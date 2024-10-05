import React from "react";

const Login = () => {
  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full max-w-4xl p-5 md:p-0">
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-500 rounded-l-lg p-8">
          <img
            src="https://wallpaperaccess.com/full/1900857.jpg"
            alt="Illustration 1"
            className="h-28"
          />
        </div>

        {/* Login Section */}
        <div className="md:w-1/2 flex flex-col justify-center bg-gray-500 items-center p-8">
          <h1 className="text-2xl font-bold mb-2 pb-5">Log In</h1>
          <p className="text-white-500 mb-6 pb-5">
            Get insights to assessments
          </p>

          <form className="w-full">
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Submit Button */}
            <p className="pb-5"></p>

            <div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
              >
                Log in
              </button>
            </div>

            <p className="pb-5"></p>
          </form>

          <p className="text-white-500 pb-10">Submit</p>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white rounded-r-lg p-8">
          <img
            src="https://www.kindpng.com/picc/m/58-585203_graphic-with-table-and-four-people-sitting-around.png"
            alt="Illustration 2"
            className="h-48"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

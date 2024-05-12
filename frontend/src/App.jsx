import React, { useState } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/create", {
        originalUrl,
        customSlug,
      });
      setRedirectLink(response.data.redirectUrl);
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error creating custom redirect link:", error);
      if (error.response && error.response.status === 409) {
        setError("Custom slug already in use.");
      } else {
        setError("An error occurred while creating the custom redirect link.");
      }
      setRedirectLink(""); // Clear the redirect link in case of error
    }
  };

  return (
    <div className="container bg-cover bg-center bg-no-repeat flex flex-col h-screen" style={{ backgroundImage: 'url(/bgimg.jpeg)' }}>
      <div className="m-auto bgcontainer flex justify-center items-center text-white w-screen">
        <div className="flex flex-col bg-[#111827] border border-gray-500 p-8 rounded-lg h-full w-1/4 bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100 ">
          <div>
            <h1 className=" text-white font-bold mb-4 text-3xl flex items-center justify-center">
              RedirectMe
            </h1>
          </div>
          <h1 className="text-center font-bold m-5 ">
            Create a Custom Redirect Link
          </h1>
          <div className="formContiner">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col">
                <label htmlFor="#url">Enter your URL</label>
                <input
                  type="text"
                  id="url"
                  placeholder="Enter the original URL"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="#slug">Enter your custom slug</label>
                <input
                  id="slug"
                  type="text"
                  placeholder="Enter a custom slug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-[#1a56db] transition"
                type="submit"
              >
                Create Redirect
              </button>
            </form>
          </div>
          <div className="text-green-500">
            {redirectLink ? (
              <div className="flex flex-col justify-center items-center space-y-3 text-[.8rem]">
                <p>Your custom redirect link: {redirectLink}</p>
                <div className="flex space-x-2">
                  <button className="w-[5rem] bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-[#1a56db] transition">
                    Copy
                  </button>
                  <button
                    className="w-[5rem] bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-[#1a56db] transition"
                    onClick={() => setRedirectLink("")}
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : error ? (
              <p className="text-red-600 text-center mt-3">{error}</p>
            ) : ""}
          </div>
        </div>
      </div>
      <footer>
        <p className="bg-black text-white absolute bottom-0 w-full text-center p-3">
          Made by <a href="awindsr.codes">Awindsr</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

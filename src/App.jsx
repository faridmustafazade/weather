import React, { useState } from "react";
import { BASE_URL } from "./api/BASE_URL";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import clear from "./Assets/Images/clear.png";
import cloud from "./Assets/Images/cloud.png";
import drizzle from "./Assets/Images/drizzle.png";
import rain from "./Assets/Images/rain.png";
import snow from "./Assets/Images/snow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [icon, setIcon] = useState("");

  function handleChange(e) {
    setData({});
    setSearch(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    let url = `${BASE_URL.base}weather?q=${search}&units=metric&APPID=${BASE_URL.key}`;
    if (search !== "") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setIcon(getWeatherIcon(res.data.weather[0].icon));
        })
        .catch((err) => {
          const errorMessage =
            err.response.data.message.charAt(0).toUpperCase() +
            err.response.data.message.slice(1);
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    } else {
      toast.warning("Please enter city", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setSearch("");
  }

  function getWeatherIcon(iconCode) {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear;
      case "02d":
      case "02n":
        return cloud;
      case "03d":
      case "03n":
        return drizzle;
      case "04d":
      case "04n":
        return drizzle;
      case "09d":
      case "09n":
        return rain;
      case "10d":
      case "10n":
        return rain;
      case "13d":
      case "13n":
        return snow;
      default:
        return clear;
    }
  }

  return (
    <>
      <div className="bg-banner bg-cover bg-center h-[100vh] relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="text-white relative z-10 flex justify-center items-center h-[100vh]">
          <div className="bg-[#263747] sm:px-10 py-10 sm:w-auto w-[95%] rounded-2xl flex flex-col justify-center items-center">
            <h1 className="sm:text-8xl text-7xl font-bitter-rose">Weather</h1>
            <form
              onSubmit={(e) => {
                handleClick(e);
              }}
              className="flex justify-center items-end gap-5"
            >
              <input
                className="sm:text-xl w-[50%] sm:w-auto font-chillax-regular text-white bg-transparent placeholder:text-[#56636d] placeholder:font-chillax-regular focus:outline-none border-b py-1 border-[#E34533] "
                onChange={(e) => {
                  handleChange(e);
                }}
                value={search}
                type="text"
                placeholder="Enter City"
              />
              <button
                type="submit"
                className="bg-[#E34533] text-sm sm:text-base px-2 py-2 sm:px-5 sm:py-2 font-chillax-regular duration-200 hover:bg-[#e345339d]"
              >
                Get Weather
              </button>
            </form>
            {typeof data.main != "undefined" ? (
              <div className="flex flex-col items-center gap-3 w-full sm:mt-10 mt-5">
                <div className="text-center flex justify-center">
                  <img src={icon} className="w-32 sm:w-auto" alt="" />
                </div>
                <p className="capitalize tracking-widest sm:text-5xl text-3xl font-chillax-regular">
                  {parseFloat(data?.main?.temp).toFixed(1)}°C
                </p>
                <p className="capitalize tracking-wider sm:text-3xl text-xl font-chillax">
                  {data.name}
                  {", "}
                  {data?.sys?.country}
                </p>
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  className="sm:text-9xl text-8xl mt-16 mb-5 sm:mt-20 sm:mb-10"
                  icon={faMagnifyingGlassLocation}
                  bounce
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

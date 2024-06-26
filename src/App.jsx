import React, { useEffect, useState } from "react";
import { BASE_URL } from "./api/BASE_URL";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import clear from "./Assets/Images/clear.png";
import cloud from "./Assets/Images/cloud.png";
import rain from "./Assets/Images/rain.png";
import snow from "./Assets/Images/snow.png";
import mist from "./Assets/Images/mist.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassLocation,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import "aos/dist/aos.css";
import Aos from "aos";
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
          setIcon(getWeatherIcon(res.data.weather[0].main));
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

  function getWeatherIcon(main) {
    switch (main) {
      case "Clear":
        return clear;
      case "Clouds":
        return cloud;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Mist":
      case "Haze":
        return mist;
      default:
        return clear;
    }
  }
  useEffect(() => {
    Aos.init({});
  }, []);
  return (
    <>
      <div className="bg-[#263747] bg-cover bg-center h-[100vh] relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="text-white relative z-10 flex justify-center items-center h-[100vh]">
          <div className="bg-white sm:px-10 py-10 sm:w-auto w-[95%] rounded-2xl flex flex-col justify-center items-center">
            <form
              onSubmit={(e) => {
                handleClick(e);
              }}
              className="flex justify-center items-end gap-5"
            >
              <input
                className="capitalize
                sm:text-xl w-[50%] sm:w-auto font-chillax-regular text-[#263747] bg-transparent placeholder:text-[#56636d] placeholder:font-chillax-regular focus:outline-none border-b py-1 border-[#263747] "
                onChange={(e) => {
                  handleChange(e);
                }}
                value={search}
                type="text"
                placeholder="Enter City"
              />
              <button
                type="submit"
                className="bg-[#263747] text-sm sm:text-base px-2 py-2 sm:px-5 sm:py-2 font-chillax-regular duration-200 hover:bg-[#3f5f7e]"
              >
                Get Weather
              </button>
            </form>
            {typeof data.main != "undefined" ? (
              <div
                data-aos="zoom-in"
                data-aos-duration="500"
                className="flex flex-col items-center gap-4 w-full sm:mt-10 mt-5 text-[#263747]"
              >
                <p className="capitalize tracking-wider sm:text-3xl text-xl font-chillax">
                  {data.name}
                  {", "}
                  {data?.sys?.country}
                </p>
                <div className="text-center flex justify-center">
                  <img src={icon} className="w-44 sm:w-72" alt="" />
                </div>
                <p className="capitalize tracking-widest sm:text-5xl text-3xl font-chillax-regular">
                  {parseFloat(data?.main?.temp).toFixed(1)}
                  <sup>°C</sup>
                </p>
                <p className="capitalize font-chillax-regular tracking-widest text-xl">
                  {data?.weather[0]?.description}
                </p>
                <div className="container flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faWater} className="text-4xl" />
                    <div>
                      <p className="font-chillax">{data?.main?.humidity}%</p>
                      <span className="font-chillax">Humidity</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faWind} className="text-4xl" />
                    <div>
                      <p className="font-chillax">
                        {parseInt(data?.wind?.speed)}Km/h
                      </p>
                      <span className="font-chillax">Wind Speed</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  className="text-[#263747] sm:text-9xl text-8xl mt-16 mb-5 sm:mt-20 sm:mb-10"
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

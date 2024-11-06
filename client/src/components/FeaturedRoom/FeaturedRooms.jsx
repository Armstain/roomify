import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import axios from "axios";
import FeaturedRoom from "./FeaturedRoom.jsx";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_URL}/rooms`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="relative my-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
          type: "bullets",
          bulletClass:
            "swiper-pagination-bullet bg-indigo-500 w-4 h-4 rounded-full opacity-50 hover:opacity-100",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room._id}>
            <FeaturedRoom room={room} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default FeaturedRooms;

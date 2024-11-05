import React, { useState } from "react";
import { Map } from "pigeon-maps";
import Carousel from "../components/Carousel.jsx";
import FeaturedRooms from "../components/FeaturedRoom/FeaturedRooms.jsx";
import { useLoaderData } from "react-router-dom";
import NewsSignUp from "../components/NewsSignUp.jsx";

const Home = () => {
  const [center, setCenter] = useState([24.8949, 91.8687]);
  const [zoom, setZoom] = useState(15);
  const rooms = useLoaderData();

  return (
    <div>
      <Carousel />
      <div>
        <FeaturedRooms rooms={rooms}></FeaturedRooms>
      </div>

      <div>
        <Map
          height={400}
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
        />
      </div>
      <div>
        <NewsSignUp></NewsSignUp>
      </div>
    </div>
  );
};

export default Home;

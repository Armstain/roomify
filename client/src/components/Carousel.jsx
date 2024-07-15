import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import bgimg1 from '../assets/images/olexandr-ignatov-w72a24brINI-unsplash.jpg'
import bgimg2 from '../assets/images/reisetopia-aI6Su7Mu9Ro-unsplash.jpg'
import bgimg3 from '../assets/images/sasha-kaunas-67-sOi7mVIk-unsplash.jpg'
import bgimg4 from '../assets/images/steven-ungermann-aRT5UCf2MYY-unsplash.jpg'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide.jsx';

const Carousel = () => {
    return (
        <div className='py-10'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><Slide image={bgimg1} text={'Get the best deal'}></Slide></SwiperSlide>
                <SwiperSlide><Slide image={bgimg2} text={'Stunning View'}></Slide></SwiperSlide>
                <SwiperSlide><Slide image={bgimg3} text={'Affordable Price'}></Slide></SwiperSlide>
                <SwiperSlide><Slide image={bgimg4} text={'Best Offers'}></Slide></SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Carousel;
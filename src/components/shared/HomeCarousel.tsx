"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { CarouselSlide } from '../../app/types';
import { Button } from '../ui/button';
import Link from 'next/link';

const slides: CarouselSlide[] = [
    {
      featuredText: "Featured",
      title: "Clearance Sales This Season",
      subtitle: "Save up to 25% on all products",
      buttonText: "Shop Now",
      buttonLink: "/products/sales",
      backgroundColor: "bg-purple-400",
      buttonTextColor: "text-purple-400",
      buttonHoverColor: "hover:bg-purple-100",
    },
    {
      featuredText: "New Arrivals",
      title: "Check Out The New Collection",
      subtitle: "The best of the best is here",
      buttonText: "Shop Now",
      buttonLink: "/products/new",
      backgroundColor: "bg-pink-400",
      buttonTextColor: "text-pink-400",
      buttonHoverColor: "hover:bg-pink-100",
    },
    {
      featuredText: "Best Sellers",
      title: "Our Most Popular Products",
      subtitle: "See what everyone is talking about",
      buttonText: "Shop Now",
      buttonLink: "/products/popular",
      backgroundColor: "bg-blue-400",
      buttonTextColor: "text-blue-400",
      buttonHoverColor: "hover:bg-blue-100",
    },
  ];

export default function HomeCarousel() {
  return (
    <div className="relative wrapper">
       <Swiper
       spaceBetween={30}
       loop={true}
       autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide: CarouselSlide, index: number) => (
          <SwiperSlide key={index} className='mb-6'>
            <div className={`${slide.backgroundColor} text-white p-8 md:p-12 lg:p-16 rounded-2xl flex flex-col items-start text-left`}>
              <p className="text-sm font-semibold uppercase tracking-wider mb-2">{slide.featuredText}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{slide.title}</h2>
              <p className="text-base md:text-lg mb-6">{slide.subtitle}</p>
              <Link href={slide.buttonLink}>
                <Button className={`bg-white ${slide.buttonTextColor} ${slide.buttonHoverColor}`}>
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>     
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/images/hero1.jpg",
      title: "Get quality goods at affordable prices here.",
      description:
        "From electronics to fashion, find everything you need in one place. Sign up now and discover the convenience of villebiz.",
      buttons: [
        { href: "/sign-up", label: "Get Started" },
        { href: "/sign-in", label: "Sign in" },
      ],
    },
    {
      image: "/images/hero2.jpg",
      title: "Discover the Future of Shopping",
      description:
        "Join thousands of satisfied customers enjoying exclusive deals, fast delivery, and exceptional customer service at villebiz.",
      buttons: [
        { href: "/sign-up", label: "Join Us" },
        { href: "/features", label: "Learn More" },
      ],
    },
    {
      image: "/images/hero3.jpg",
      title: "Shop Smart, Shop villebiz",
      description:
        "Unlock the best deals and enjoy a seamless shopping experience. Sign up to start saving today.",
      buttons: [
        { href: "/sign-up", label: "Get Started" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10 * 3000); // 30 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [slides.length]);

  return (
    <div className="relative font-[family-name:var(--font-source-serif)] w-full h-[70vh]">
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
            opacity: currentSlide === index ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
          className="absolute w-full h-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
        >
          {currentSlide === index && (
            <div className="flex flex-col gap-3 items-center  text-center md:w-[480px] w-[90vw]">
              <p className="font-semibold md:text-4xl text-3xl text-white font-[family-name:var(--font-source-serif)]">
                {slide.title}
              </p>
              <p className="text-white text-sm ">
                {slide.description}
              </p>
              <div className="flex gap-2 max-md:flex-col">
                {slide.buttons.map((button, idx) => (
                  <Button
                    key={idx}
                    className={`${
                      idx === 0
                        ? "bg-[var(--primary-01)] w-[130px] max-md:w-[80vw] hover:bg-[var(--primary-01)]"
                        : "hover:text-[var(--primary-01)] w-[130px] max-md:w-[80vw] border-[1px] border-dashed border-[var(--primary-01)]"
                    }`}
                    variant={idx === 0 ? "default" : "outline"}
                    asChild
                  >
                    <Link key={idx} href={button.href}>{button.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Hero;

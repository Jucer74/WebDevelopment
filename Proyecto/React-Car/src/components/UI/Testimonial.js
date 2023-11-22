import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import img1 from "../../assets/all-images/img1.jpeg";
import img2 from "../../assets/all-images/img2.jpg";
import img3 from "../../assets/all-images/img3.jpg";
import img4 from "../../assets/all-images/img4.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
        I am happy to share my experience with the car rental service! 
        From the moment I booked to the moment I returned the vehicle, everything was flawless. 
        The booking process was quick and easy, and the staff was extremely friendly and professional.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={img1} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">The Weeknd</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        The car I rented was in perfect condition, clean and ready to use. Additionally, 
        I was pleasantly surprised by the variety of options available to choose from. 
        Vehicle delivery and return were quick and efficient, making my trip even more convenient.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={img2} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Kendrick Lamar</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        I would recommend this service to anyone looking for a hassle-free car rental with high quality service. 
        I am truly grateful for the great experience I had and will definitely use this service again in the future. 
        Thank you for making my trip even more special!
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={img3} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Ye</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        I am completely satisfied with the car rental service. They not only met, but exceeded my expectations. 
        I would definitely recommend this service to friends and family, and will consider it my first choice for future trips. 
        Thank you for making my car rental experience unforgettable!
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={img4} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Feid</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;

import { Carousel } from "flowbite-react";
import React from "react";
import "../../index.css";

const SiteCarousel = () => {
  return (
    <div className="h-56 sm:h-64  xl:h-80 2xl:h-96">
      <Carousel  leftControl=" " rightControl=" ">
        <img
          src="https://img.freepik.com/free-psd/flash-sale-offer-banner-design-template-3d-render_47987-12195.jpg?t=st=1735029311~exp=1735032911~hmac=cf6346928133c8ce6c61f61614214da32f5abdcb7bccf05e4665965eabe8ee72&w=996"
          alt="..."
        />
        <img
          src="https://img.freepik.com/premium-vector/flash-sale-banner-special-offer-template-design_621575-5.jpg?w=1380"
          alt="..."
        />
      </Carousel>
    </div>
  );
};

export default SiteCarousel;

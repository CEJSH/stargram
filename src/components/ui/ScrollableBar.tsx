import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
  },
};
import React from "react";

export default function ScrollableBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      containerClass="flex md:flex-col flex-row md:gap-0 gap-4 max-h-full no-scrollbar overflow-y-auto overflow-x-auto"
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}

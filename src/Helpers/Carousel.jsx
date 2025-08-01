 import { useEffect, useState } from "react";

const carouselData = [
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Aarushi Mehta",
    review: "The course content was top-notch and easy to follow. Learned more in 2 weeks than in 2 months!"
  },
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rahul Verma",
    review: "Amazing platform! The real-world projects helped me build my portfolio with confidence."
  },
  {
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sanya Kapoor",
    review: "Highly recommended! Great support and community. The UI is smooth and very intuitive."
  }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselData.length);
    }, 4000); // auto-move every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const current = carouselData[index];

  return (
    <div className="w-full flex flex-col items-center text-center px-4">
      <img
        src={current.image}
        alt={current.name}
        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <h3 className="text-xl font-semibold mt-4 text-white">{current.name}</h3>
      <p className="text-gray-300 mt-2 max-w-xl">{`"${current.review}"`}</p>
    </div>
  );
}

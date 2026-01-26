import { useEffect } from "react";
import WorksData from "./WorksData.json";
import { Link } from "react-router";

export default function Works() {
  const updateCanvas = (e) => {
    console.log(e);
  };

  useEffect(() => {
    const imgPixel = document.getElementById("pixelated-img");

    console.log(imgPixel);

    const ctx = imgPixel.getContext("2d");

    const img = new Image();

    img.src = "./img/excel.jpg";
    console.log(img.src);

    img.onload = () => {
      ctx.imageSmoothingEnabled = false;

      imgPixel.width = img.width;
      imgPixel.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }, []);
  const arrayWorks = WorksData.Works;

  return (
    <>
      <div className="flex flex-col gap-2 text-white px-4">
        {arrayWorks.map((el) => {
          return (
            <Link
              to={{
                pathname: `/realisations/${el.slug}`,
              }}
              className="flex group"
            >
              <div className="flex-1 flex justify-between cursor-pointer">
                <span className="relative before:content-[''] before:-z-10 before:absolute before:left-0 group-hover:before:scale-x-100 before:scale-x-0 before:h-full before:origin-left before:w-full group-hover:before:bg-white group-hover:text-blue-700 transition-all before:duration-500 ease-in-out">
                  {el.type}
                </span>
                <span className="relative before:content-[''] before:-z-10 before:absolute before:left-0 group-hover:before:scale-x-100 before:scale-x-0 before:h-full before:origin-left before:w-full group-hover:before:bg-white group-hover:text-blue-700 transition-all before:duration-500 ease-in-out">
                  {el.name}
                </span>
              </div>
              <canvas
                id="pixelated-img"
                className="w-20 flex-2 hidden"
                onClick={updateCanvas}
              ></canvas>
              <div className="flex-1 flex justify-between">
                <span className="relative before:content-[''] before:-z-10 before:absolute before:left-0 group-hover:before:scale-x-100 before:scale-x-0 before:h-full before:origin-left before:w-full group-hover:before:bg-white group-hover:text-blue-700 transition-all before:duration-500 ease-in-out">
                  {el.date}
                </span>
                <span className="relative before:content-[''] before:-z-10 before:absolute before:left-0 group-hover:before:scale-x-100 before:scale-x-0 before:h-full before:origin-left before:w-full group-hover:before:bg-white group-hover:text-blue-700 transition-all before:duration-500 ease-in-out">
                  {el.id}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

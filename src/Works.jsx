import { useEffect } from "react";

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

    img.onload = () => {
      ctx.imageSmoothingEnabled = false;

      imgPixel.width = img.width;
      imgPixel.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }, []);

  return (
    <>
      <canvas
        id="pixelated-img"
        className="w-98"
        onClick={updateCanvas}
      ></canvas>
    </>
  );
}

import { useRef, useEffect } from "react";

export default function PixelCanvas({
  src,
  alt,
  style,
  className,
  delay = 400,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let timeout;

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const w = canvas.width;
      const h = canvas.height;
      const sw = Math.max(1, Math.ceil(w / 32));
      const sh = Math.max(1, Math.ceil(h / 32));

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, sw, sh);
      ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, w, h);

      timeout = setTimeout(() => {
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
      }, delay);
    };

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [src, delay]);

  return (
    <canvas ref={canvasRef} className={className} style={style} title={alt} />
  );
}

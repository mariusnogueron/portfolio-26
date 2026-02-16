import { useEffect } from "react";

export default function useSeo({ title, description, ogImage }) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    const setMeta = (name, content) => {
      if (!content) return;
      let el =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (name.startsWith("og:")) {
          el.setAttribute("property", name);
        } else {
          el.setAttribute("name", name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    if (ogImage) setMeta("og:image", ogImage);
    setMeta("og:type", "website");

    return () => {
      document.title = prev;
    };
  }, [title, description, ogImage]);
}

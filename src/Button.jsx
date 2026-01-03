import { useState } from "react";

function Button() {
  const [value, setValue] = useState(0);

  const setNbr = () => {
    setValue(value + 1);
  };

  return (
    <>
      <button className="rounded-md border-2" onClick={setNbr}>
        hey {value}
      </button>
    </>
  );
}

export default Button;

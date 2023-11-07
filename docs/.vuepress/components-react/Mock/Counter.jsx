import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </>
  );
};

export default Counter;

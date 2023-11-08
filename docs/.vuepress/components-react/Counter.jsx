import { useState } from "react";

console.log("imported");

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Count: {count}
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
};

export default Counter;

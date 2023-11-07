import Counter from "./Counter";

const Test = ({ className }) => {
  return (
    <>
      <p className={className}>Hello World</p>
      <Counter />
    </>
  );
};

export default Test;

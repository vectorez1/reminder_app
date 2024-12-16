import { useRef } from "react";
import { Button } from "./Button";

export const FormSubmit = ({ onSubmit, children, className = "" }) => {
  const ref = useRef();
  return (
    <form ref={ref} className={`flex flex-col gap-2` + className}>
      {children}
      <Button
        onClick={(e) => {
          e.preventDefault();
          onSubmit(ref);
          ref.current.reset();
        }}
      >
        Submit
      </Button>
    </form>
  );
};

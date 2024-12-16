import { Icons } from "../assets/Icons";
import { useRef } from "react";

export const SearchBar = ({
  onClick,
  onChange,
  className = "",
  placeHolder = "Search...",
}) => {
  const ref = useRef();
  function handleSearch() {
    onClick(ref);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch(); // Trigger the same search function
    }
  }
  return (
    <div
      className={`searchBar flex items-center  bg-white px-4 py-2 rounded-3xl gap-2 ${className}`}
    >
      <button
        className=" w-fit h-fit flex items-center justify-center z-[1]"
        onClick={handleSearch}
      >
        <Icons.Search width="25px" height="25px" color="var(--main)" />
      </button>
      <input
        type="text"
        className="bg-transparent border-b-2 focus:outline-none focus:border-b-[var(--secondary)] w-[100%]"
        placeholder={placeHolder}
        ref={ref}
        onKeyDown={handleKeyDown}
        onChange={() => {
          onChange(ref);
        }}
      />
    </div>
  );
};

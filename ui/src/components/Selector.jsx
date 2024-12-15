import { useEffect, useState } from "react";

export const Selector = ({
  items,
  onItemSelected,
  defaultText = "Elije un Inquilino",
}) => {
  const [title, setTitle] = useState(defaultText);
  const [selection, setSelection] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  // Update the title and notify the parent when a selection is made
  useEffect(() => {
    if (selection) {
      setTitle(`${selection.NOMBRE} ${selection.APELLIDO}`);
      onItemSelected(selection);
    }
  }, [selection, onItemSelected]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".selectionBar")) {
        setIsSelected(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="selectionBar flex flex-col gap-2 w-[200px] relative">
      {/* Selector Title */}
      <div
        className={`bg-[var(--main)] px-2 py-1 text-white rounded-lg text-center hover:cursor-pointer ${
          isSelected
            ? "bg-white border-[1px] border-solid border-[var(--main)] text-black"
            : ""
        }`}
        onClick={() => setIsSelected((prev) => !prev)}
      >
        <h2>{title}</h2>
      </div>

      {/* Options Dropdown */}
      {isSelected && (
        <Options
          options={items}
          onSelected={(option) => {
            setSelection(option);
            setIsSelected(false);
          }}
          className="cursor-pointer p-1 rounded-md text-center w-[100%] hover:bg-[var(--main)] hover:text-white"
        />
      )}
    </div>
  );
};

const Options = ({ options = [], onSelected, className = "", ...props }) => {
  if (!Array.isArray(options) || options.length === 0) {
    return <div {...props}>No Hay Opciones</div>;
  }

  return (
    <ul
      className={`
        w-full bg-white border-[1px] border-solid border-[var(--main)]
        p-2 rounded-lg max-h-[300px] overflow-auto absolute top-[40px] options-container
      `}
    >
      {options.map((option) => (
        <li
          key={option.ID}
          onClick={() => onSelected(option)}
          className={`${className}`}
          {...props}
        >
          {`${option.NOMBRE} ${option.APELLIDO}`}
        </li>
      ))}
    </ul>
  );
};

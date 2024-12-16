export const InputText = ({
  title = "Input",
  name,
  required = false,
  onChange,
  ...props
}) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <label
        htmlFor={name}
        className="font-semibold bg-[var(--main)] w-fit rounded-md px-2 text-white flex items-center justify-center text-center "
      >
        {title}
      </label>
      <input
        onChange={(e) => {
          onChange(e);
        }}
        {...props}
        type="text"
        name={name}
        required={required}
        id={name}
        className="border-[1px] border-solid border-[var(--main)] rounded-md h-[40px] px-2"
      />
    </div>
  );
};

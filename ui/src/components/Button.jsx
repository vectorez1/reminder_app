export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={(e) => {
        onClick(e);
      }}
      className="flex px-2 py-1 bg-[var(--main)] text-white w-fit rounded-lg"
    >
      {children}
    </button>
  );
};

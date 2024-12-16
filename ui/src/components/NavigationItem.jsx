import { NavLink } from "react-router-dom";

export const NavigationItem = ({ to = "/", children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive && "border-[2px] rounded-[10px] border-[var(--main)]"} p-2`
      }
    >
      {children}
    </NavLink>
  );
};

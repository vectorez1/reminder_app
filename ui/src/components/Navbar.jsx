import { Icons } from "../assets/Icons";
import { NavigationItem } from "./NavigationItem";

export const Navbar = () => {
  return (
    <div className="flex flex-col gap-7 border-r-[2px] border-r-[var(--main)] px-4 py-5">
      <NavigationItem to="/">
        <Icons.House />
      </NavigationItem>
      <NavigationItem to="/inquilinos">
        <Icons.User />
      </NavigationItem>
      <NavigationItem to="/acuerdos">
        <Icons.HandShake />
      </NavigationItem>
    </div>
  );
};

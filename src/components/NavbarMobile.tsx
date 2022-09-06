import { useRouter } from "next/router";
// hooks
import { useTypedSelector } from "hooks/useTypedSelector";
// utils/icons
import Plus from "../utils/svg/plus.svg";
import User from "../utils/svg/user.svg";
import Menu from "../utils/svg/menu.svg";

const NavbarMobile = () => {
  const { status, user } = useTypedSelector((state) => state.user);

  const router = useRouter();

  const isUser = () => {
    if (status === "authorized" && user?.id) {
      return `/profile/${user?.id}`;
    }

    return "/auth";
  };

  const getActiveUser = () => {
    if (router.asPath === `/profile/${user?.id}`) {
      return "#4971FF";
    }

    if (router.pathname === "/auth") {
      return "#4971FF";
    }

    return "#71716e";
  };

  return (
    <div className="shadow-nav_mob fixed left-[50%] bottom-[10px] z-50 w-[96%] h-[52px] flex items-center justify-around rounded-[10px] bg-white translate-x-[-50%] sm:hidden">
      <button
        onClick={() => router.push("/")}
        className="flex h-full flex-col items-center justify-center bg-none border-none rounded"
      >
        <Menu
          width={22}
          height={22}
          fill={router.pathname === "/" ? "#4971FF" : "#71716e"}
        />
        <span
          style={{
            color: router.pathname === "/" ? "#4971FF" : "#71716e",
          }}
          className="text-[14px] font-bold font-nunito leading-4"
        >
          Главная
        </span>
      </button>

      <button
        onClick={() => router.push("/ask")}
        className="border-none hover:shadow-none rounded-[17px] bg-[#4971FF] outline-none cursor-pointer text-white flex items-center justify-center h-[36px] w-[36px] shadow-create"
      >
        <Plus fill="white" width={26} height={26} />
      </button>

      <button className="flex flex-col items-center justify-center bg-none border-none rounded">
        <User width={22} height={22} fill={getActiveUser()} />
        <span
          onClick={() => router.push(isUser())}
          style={{
            color: getActiveUser(),
          }}
          className="text-[14px] font-bold font-nunito leading-4"
        >
          {status === "authorized" ? "Профиль" : "Войти"}
        </span>
      </button>
    </div>
  );
};

export default NavbarMobile;

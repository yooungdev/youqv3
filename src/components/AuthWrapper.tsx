import { ReactNode, useEffect } from "react";
//
import useActions from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
//
import Image from "next/image";
//
import loading from "../utils/gift/loading.gif";
import $api from "config";
import Admin from "./Admin";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { setUser, setStatus } = useActions();
  const { status, user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      setStatus("loading");
      try {
        if (localStorage.getItem("userId")) {
          const res = await $api.get(
            `user/getAuth?id=${localStorage.getItem("userId")}`
          );

          if (res.status === 200) {
            setUser(res.data);
            setStatus("authorized");
          } else {
            setStatus("unauthorized");
          }
        } else {
          setStatus("unauthorized");
        }
      } catch (error) {
        setStatus("error");
      }
    })();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white">
        <Image height={200} objectFit="contain" src={loading} alt="loading" />
      </div>
    );
  }

  return (
    <>
      {children}
      {status === "authorized" && user.isAdmin && <Admin />}
    </>
  );
};

export default AuthWrapper;

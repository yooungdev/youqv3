import * as Yup from "yup";
import { useFormik } from "formik";
//
import { useRouter } from "next/router";
//
import Button from "components/UI/Button";
//
import $api from "config";

const Registration = ({ toGoLogin }: any) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      repeat_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      name: Yup.string().required().min(3).max(25),
      password: Yup.string().required().min(4),
      repeat_password: Yup.string().required().min(4),
    }),
    onSubmit: async (values) => {
      try {
        if (values.password === values.repeat_password) {
          const res = await $api.post("/auth/local/signup", {
            email: values.email,
            name: values.name,
            password: values.password,
          });
          console.log(res);
          if (res.status === 201) {
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("userId", res.data.userId);
            router.reload();
          }
        }
      } catch (e) {}
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <input
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Почта"
        className="border-neutral-300  mt-[15px] rounded-[5px] border-[1px] outline-none py-[3px] px-[10px]"
        type="email"
      />
      <input
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Имя"
        className="border-neutral-300  mt-[15px] rounded-[5px] border-[1px] outline-none py-[3px] px-[10px]"
        type="text"
      />
      <input
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Пароль"
        className="border-neutral-300  mt-[15px] rounded-[5px] border-[1px] outline-none py-[3px] px-[10px]"
        type="password"
      />
      <input
        id="repeat_password"
        name="repeat_password"
        value={formik.values.repeat_password}
        onChange={formik.handleChange}
        placeholder="Повторить пароль"
        className="border-neutral-300  mt-[15px] rounded-[5px] border-[1px] outline-none py-[3px] px-[10px]"
        type="password"
      />
      <Button
        type="submit"
        className="bg-[#4971ff] mt-[15px] rounded-[10px] py-[3px] text-[17px] font-bold text-white font-nunito"
      >
        Зарегистрироваться
      </Button>
      <span
        onClick={toGoLogin}
        className="text-[#4971ff] hover:underline cursor-pointer"
      >
        войти
      </span>
    </form>
  );
};

export default Registration;

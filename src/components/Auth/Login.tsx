import { useFormik } from "formik";
import { useRouter } from "next/router";
//
import * as Yup from "yup";
//
import Button from "components/UI/Button";
//
import $api from "config";

const Login = ({ toGoRegistration }: any) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(4),
    }),
    onSubmit: async (values) => {
      try {
        const res = await $api.post("/auth/local/signin", {
          email: values.email,
          password: values.password,
        });
        console.log(res);

        if (res.status === 201) {
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("userId", res.data.userId);
          router.reload();
        }
      } catch (error) {}
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
        className="border-neutral-300 mt-[15px] rounded-[5px] border-[1px] outline-none py-[3px] px-[10px]"
        type="email"
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
      <Button
        type="submit"
        className="bg-[#4971ff] mt-[15px] rounded-[10px] py-[3px] text-[17px] font-bold text-white font-nunito"
      >
        Войти
      </Button>
      <span
        onClick={toGoRegistration}
        className="text-[#4971ff] hover:underline cursor-pointer"
      >
        Зарегистрироваться
      </span>
    </form>
  );
};

export default Login;

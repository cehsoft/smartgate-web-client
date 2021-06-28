import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { queryInitialing } from "@/libs/server";

import { loadStore } from "@/store/index";
import { useSelector, useDispatch } from "@/store/hooks";
import { updateUserInfo, doLogin } from "@/store/slices/session";
import { Loads } from "@/store/slices/load";

import { Page } from "@/components/layout/Page";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useGuest } from "@/libs/hooks";

export const Login = () => {
  useGuest("/");

  const dispatch = useDispatch();
  const status = useSelector((state) => state.session.status);
  const error = useSelector((state) => state.session.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const handleFormSubmit = (values) => {
    dispatch(doLogin(values));
  };

  return (
    <Container className="mt-8">
      <Section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(handleFormSubmit)();
          }}
        >
          <Input
            {...register("username", { required: true })}
            placeholder="Tên đăng nhập"
          ></Input>
          <Input
            {...register("password", { required: true })}
            className="mt-2"
            type="password"
            placeholder="Mật khẩu"
          ></Input>
          <Button className="mt-2" type="submit" kind="primary" size="small">
            Đăng nhập
          </Button>
        </form>
      </Section>
      <Section>
        <p>{error}</p>
      </Section>
    </Container>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { initialProps } = queryInitialing(context.query, loadStore(), {
//     [Loads.TOKEN_FROM_SERVER]: (dispatch) => {
//       dispatch(
//         updateUserInfo({
//           name: "Prerender by Server",
//           token: "example-token-from-sever",
//         })
//       );

//       return ["session"];
//     },
//   });

//   return {
//     props: {
//       ...initialProps,
//     },
//   };
// };

export default Login;

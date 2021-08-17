import { TextInput, Button, Form, FormGroup } from "carbon-components-react";
import { useForm } from "react-hook-form";
import { css } from "linaria";

import { useSelector, useDispatch } from "@/store/hooks";
import { doLogin } from "@/store/slices/session";

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
    <div className={["w-full flex flex-row", styleFullHeight] as any}>
      <div className={["w-full lg:w-1/4 p-4 h-full", styleBgLoginPanel] as any}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(handleFormSubmit)();
          }}
        >
          <FormGroup legendText="">
            <TextInput
              className="mb-4"
              id="username"
              labelText="Tên đăng nhập"
              placeholder="thinhnguyen@spitc.vn"
              {...register("username", { required: true })}
            ></TextInput>
            <TextInput.PasswordInput
              id="password"
              labelText="Mật khẩu"
              placeholder="password"
              {...register("password", { required: true })}
            ></TextInput.PasswordInput>
          </FormGroup>
          <div className="float-right">
            <Button size="field" type="submit">
              Đăng nhập
            </Button>
          </div>
          <div className="clear-both"></div>
        </Form>
      </div>
      <div className="hidden  w-3/4 lg:flex flex-row justify-center items-center">
        <img className={styleBgEmptyPanel} src="/imgs/login-bg-2.png" alt="" />
      </div>
    </div>
  );
};

const styleBgLoginPanel = css`
  background: url("/imgs/login-bg-1.jpeg") rgba(21, 41, 53, 0.9);
  background-size: cover;
  background-blend-mode: multiply;

  & .bx--label {
    @apply text-white;
  }
`;

const styleBgEmptyPanel = css`
  background: url("/imgs/login-bg-2.png");
  @apply bg-contain bg-no-repeat w-1/2;
`;

const styleFullHeight = css`
  height: 100vh;
  background: url("/imgs/login-bg-3.jpeg");
  @apply bg-contain;
`;

export default Login;

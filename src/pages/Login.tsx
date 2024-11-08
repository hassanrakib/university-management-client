import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

export default function Login() {
  const dispatch = useAppDispatch();

  // get the register & handleSubmit function from react-hook-form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });

  // the first variable is the function to do the mutation
  const [login, { error }] = useLoginMutation();

  // data : {userId: string, password: string} because of using react-hook-form
  const onSubmit = async (data: { userId: string; password: string }) => {
    const loginCredentials = {
      id: data.userId,
      password: data.password,
    };

    // instead of getting the result like this {data: {...data}} get this {...data} actual data using unwrap()
    const result: { data: { accessToken: string } } = await login(
      loginCredentials
    ).unwrap();

    // decode token to get the user: {userId: "", role: ""}
    const user = verifyToken(result.data.accessToken);

    // set the user to the local state
    dispatch(setUser({ user, token: result.data.accessToken }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
}

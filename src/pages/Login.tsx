import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, User } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";

export default function Login() {
  const dispatch = useAppDispatch();

  // navigate function is taken from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // get the register function from react-hook-form
  const { register } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });

  // the first variable is the function to do the mutation
  const [login] = useLoginMutation();

  // data : {userId: string, password: string} because of using react-hook-form
  const onSubmit = async (data: { userId: string; password: string }) => {
    console.log(data);
    // // show the loading toast
    // const loadingToastId = toast.loading("Logging in...");

    // try {
    //   const loginCredentials = {
    //     id: data.userId,
    //     password: data.password,
    //   };

    //   // instead of getting the result like this {data: {...data}} get this {...data} actual data using unwrap()
    //   const result: { data: { accessToken: string } } = await login(
    //     loginCredentials
    //   ).unwrap();

    //   // decode token to get the user: {userId: "", role: ""}
    //   const user = verifyToken(result.data.accessToken) as User;

    //   // set the user to the local state
    //   dispatch(setUser({ user, token: result.data.accessToken }));

    //   // redirect after login
    //   navigate(`/${user.role}/dashboard`);

    //   // replace the loading toast using the second argument
    //   toast.success("Logged in successfully!", {
    //     id: loadingToastId,
    //     duration: 2000,
    //   });
    // } catch (err) {
    //   toast.error("Something went wrong!", {
    //     id: loadingToastId,
    //     duration: 2000,
    //   });
    // }
  };

  return (
    <PHForm onSubmit={onSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </PHForm>
  );
}

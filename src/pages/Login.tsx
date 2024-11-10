import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, User } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";

export default function Login() {
  // define login form default values
  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const dispatch = useAppDispatch();

  // navigate function is taken from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // the first variable is the function to do the mutation
  const [login] = useLoginMutation();

  // data : {userId: string, password: string} because of using react-hook-form
  const onSubmit = async (data: FieldValues) => {
    // show the loading toast
    const loadingToastId = toast.loading("Logging in...");

    try {
      const loginCredentials = {
        id: data.userId,
        password: data.password,
      };

      // instead of getting the result like this {data: {...data}} get this {...data} actual data using unwrap()
      const result: { data: { accessToken: string } } = await login(
        loginCredentials
      ).unwrap();

      // decode token to get the user: {userId: "", role: ""}
      const user = verifyToken(result.data.accessToken) as User;

      // set the user to the local state
      dispatch(setUser({ user, token: result.data.accessToken }));

      // redirect after login
      navigate(`/${user.role}/dashboard`);

      // replace the loading toast using the second argument
      toast.success("Logged in successfully!", {
        id: loadingToastId,
        duration: 2000,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message, {
        id: loadingToastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="password" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
}

import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TResponseRedux } from "../types";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    const res = (await changePassword(data)) as TResponseRedux<any>;

    if (res.data?.success) {
      toast.success('Thank you for changing your password!');
      dispatch(logout());
      navigate("/login");
    } else {
      console.log(res.error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password:" />
        <PHInput type="password" name="newPassword" label="New Password:" />
        <Button htmlType="submit">Change Password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;

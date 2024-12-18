import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type PHInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: PHInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: {error} }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
            {error && <small style={{color: 'red'}}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;

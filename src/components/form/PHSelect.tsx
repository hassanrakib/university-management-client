import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options }: PHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: {error} }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            options={options}
          />
          {error && <small>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
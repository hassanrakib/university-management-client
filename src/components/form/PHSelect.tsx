import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  mode?: "multiple";
};

const PHSelect = ({ label, name, disabled, options, mode }: PHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select {...field} mode={mode} options={options} disabled={disabled} />
          {error && <small style={{ color: "red"}}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;

import { Form, Select } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";

type PHSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  mode?: "multiple";
  onValueChange: Dispatch<SetStateAction<string>>;
};

const PHSelectWithWatch = ({
  label,
  name,
  disabled,
  options,
  mode,
  onValueChange,
}: PHSelectProps) => {
  const inputValue = useWatch({ name });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={mode}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;

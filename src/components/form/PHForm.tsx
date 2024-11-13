import { Form } from "antd";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
};

type PHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
} & FormConfig;

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: PHFormProps) => {
  const formConfig: FormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);

    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;

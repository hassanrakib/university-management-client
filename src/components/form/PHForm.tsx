import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, unknown>
}

type PHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
} & FormConfig;

const PHForm = ({ onSubmit, children, defaultValues }: PHFormProps) => {
  const formConfig: FormConfig = {};
  if(defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;

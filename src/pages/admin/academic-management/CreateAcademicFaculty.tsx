import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { AcademicFaculty, TResponseRedux } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const res = (await addAcademicFaculty(
      data
    )) as TResponseRedux<AcademicFaculty>;

    if (res.error) {
      toast.error('Failed to create!', { id: toastId });
    } else {
      toast.success("Academic Faculty created successfully!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput name="name" type="text" label="Academic Faculty Name:" />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;

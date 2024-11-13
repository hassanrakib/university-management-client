import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { AcademicFaculty } from "../../../types";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  // generate academic faculties option
  const { data: academicFaculties } = useGetAcademicFacultiesQuery(undefined);
  console.log(academicFaculties);

  const academicFacultiesOptions = academicFaculties?.data.map(
    (item: AcademicFaculty) => ({
      label: item.name,
      value: item._id,
    })
  );

  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating...");
    console.log(data);

    const res = await addAcademicDepartment(data);

    if (res.error) {
      toast.error("Failed!", { id: toastId });
    } else {
      toast.success("Created successfully!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput name="name" type="text" label="Academic Department Name:" />
          <PHSelect
            label="Academic Faculty:"
            name="academicFaculty"
            options={academicFacultiesOptions}
          />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;

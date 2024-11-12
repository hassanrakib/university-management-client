import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { academicSemestersNames } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const currentYear = new Date().getFullYear();

const academicYears = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const name = academicSemestersNames[Number(data.name) - 1]?.label;
    const newAcademicSemester = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      // unwrap exposes errors directly
      const res = await addAcademicSemester(newAcademicSemester) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created!", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Semester Name:"
            name="name"
            options={academicSemestersNames}
          />
          <PHSelect label="Year:" name="year" options={academicYears} />
          <PHSelect
            label="Start Month:"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month:" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;

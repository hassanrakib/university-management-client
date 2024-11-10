import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { academicSemestersNames } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod';

const currentYear = new Date().getFullYear();

const academicYears = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const academicSemesterSchema = z.object({
  name: z.string({required_error: 'Semester name is required!'}),
  code: z.string(),
  year: z.string(),
  startMonth: z.string(),
  endMonth: z.string(),
})

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = academicSemestersNames[Number(data.name) - 1]?.label;
    const newAcademicSemester = {
      name: name,
      code: data.name,
      year: data.year,
    };

    console.log(newAcademicSemester);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <PHSelect
            label="Semester Name:"
            name="name"
            options={academicSemestersNames}
          />
          <PHSelect
            label="Year:"
            name="year"
            options={academicYears}
          />
          <PHSelect
            label="Start Month:"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect
            label="End Month:"
            name="endMonth"
            options={monthOptions}
          />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;

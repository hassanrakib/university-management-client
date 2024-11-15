import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: academicSemesters } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemestersOptions = academicSemesters?.data.map((item) => ({
    label: `${item.name} ${item.year}`,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterRegistrationData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    }

    try {
      // unwrap exposes errors directly
      const res = await addSemesterRegistration(semesterRegistrationData);
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester Registration created!", { id: toastId });
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
          // resolver={zodResolver(semesterRegistrationSchema)}
        >
          <PHSelect
            label="Academic Semester:"
            name="academicSemester"
            options={academicSemestersOptions}
          />
          <PHDatePicker name="startDate" label="Start Date:" />
          <PHDatePicker name="endDate" label="End Date:" />
          <PHInput name="minCredit" type="text" label="Min Credit:" />
          <PHInput name="maxCredit" type="text" label="Max Credit:" />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;

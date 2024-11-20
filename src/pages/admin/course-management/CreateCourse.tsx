import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { Course } from "../../../types/courseManagement.type";
import { TResponseRedux } from "../../../types";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  const [addCourse] = useAddCourseMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const preRequisiteCourses =
      data.preRequisiteCourses?.map((courseId: string) => ({
        course: courseId,
        isDeleted: false,
      })) || [];

    const newCourse = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses,
    };

    try {
      // unwrap exposes errors directly
      const res = (await addCourse(newCourse)) as TResponseRedux<Course>;
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
        <PHForm onSubmit={onSubmit}>
          <PHInput name="title" type="text" label="Title:" />{" "}
          <PHInput name="prefix" type="text" label="Prefix:" />
          <PHInput name="code" type="text" label="Code:" />
          <PHInput name="credits" type="text" label="Credits:" />
          <PHSelect
            name="preRequisiteCourses"
            label="Pre-Requisite Courses:"
            options={preRequisiteCoursesOptions}
            mode="multiple"
          />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;

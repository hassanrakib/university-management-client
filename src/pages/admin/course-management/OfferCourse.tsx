import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const coursesOptions = courses?.data.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  const { data: courseFaculties, isFetching: isCourseFacultiesFetching } =
    useGetCourseFacultiesQuery(courseId, {
      skip: Boolean(!courseId),
      refetchOnMountOrArgChange: true,
    });

  const courseFacultiesOptions = courseFaculties?.data?.faculties?.map(
    (faculty) => ({
      label: faculty.name.firstName + " " + faculty.name.lastName,
      value: faculty._id,
    })
  ) || [];

  console.log(courseFaculties?.data?.faculties);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            label="Course:"
            name="course"
            options={coursesOptions}
            onValueChange={setCourseId}
          />
          <PHSelect
            label="Faculty:"
            name="faculty"
            disabled={isCourseFacultiesFetching || !courseId}
            options={courseFacultiesOptions}
          />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;

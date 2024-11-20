import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

const OfferCourse = () => {
    const { data: courses } = useGetAllCoursesQuery(undefined);

    const coursesOptions = courses?.data.map((item) => ({
      label: item.title,
      value: item._id,
    }));

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Course:"
            name="course"
            options={coursesOptions}
          />
          <PHSelect
            label="Academic Semester:"
            name="academicSemester"
            options={[]}
          />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;

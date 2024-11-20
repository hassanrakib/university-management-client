import { Button, Modal, Table } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import { Course } from "../../../types/courseManagement.type";
import PHForm from "../../../components/form/PHForm";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { TResponseRedux } from "../../../types";
import { toast } from "sonner";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (course: Course) => {
        return <AssignFacultyModal course={course} />;
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

const AssignFacultyModal = ({ course }) => {
  const [assignFaculties] = useAssignFacultiesMutation();
  const { data: faculties } = useGetAllFacultiesQuery(undefined);

  const facultiesOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: item.name.firstName,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const courseWithFaculties = {
      courseId: course.key,
      data,
    };

    const res = (await assignFaculties(
      courseWithFaculties
    )) as TResponseRedux<any>;

    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success("Faculties are assigned successfully!");
    }

    closeModal();
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Assign Faculties"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions}
            label="Choose faculties to assign to the course:"
            name="faculties"
          />
          <Button htmlType="submit">Assign</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;

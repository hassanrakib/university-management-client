import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupsOptions, gendersOptions } from "../../../constants/user";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const studentDefaultValue = {
  name: {
    firstName: "John",
    middleName: "Abedin",
    lastName: "Doe",
  },
  gender: "male",
  // dateOfBirth: "2000-01-01",
  email: "student2@example.com",
  contactNo: "1234567890",
  emergencyContactNo: "0987654321",
  bloodGroup: "O+",
  presentAddress: "123 Main St, City, Country",
  permanentAddress: "456 Another St, City, Country",
  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1122334455",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "6677889900",
  },
  localGuardian: {
    name: "Alice Smith",
    occupation: "Nurse",
    contactNo: "2233445566",
    address: "789 Local St, City, Country",
  },
  // admissionSemester: "672430dba3dfd48ff18a9a26",
  // academicDepartment: "67242e788fbd455d83a5728c",
};

export default function CreateStudent() {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  // create semester options
  const { data: academicSemesters, isLoading: isAcademicSemestersLoading } =
    useGetAllSemestersQuery(undefined);

  const academicSemestersOptions = academicSemesters?.data.map((item) => ({
    label: `${item.name} ${item.year}`,
    value: item._id,
  }));

  // don't call this query until isAcademicSemesterLoading true
  const { data: academicDepartments, isLoading: isAcademicDepartmentsLoading } =
    useGetAcademicDepartmentsQuery(undefined, {
      skip: isAcademicSemestersLoading,
    });

  const academicDepartmentOptions = academicDepartments?.data.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const { image, ...student } = data;

    const formData = new FormData();

    // send student data in the data of FormData => to the backend
    formData.append("data", JSON.stringify({password: 'student123', student }));

    // send profile picture in the 'file' field of FormData => to the backend
    formData.append("file", image);

    // save to db
    const res = await addStudent(formData);

    if (res.error) {
      toast.error(res.error?.data?.message, { id: toastId });
    } else {
      toast.success(res.data.message, { id: toastId });
    }

    // just to see
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={studentDefaultValue}
          // resolver={zodResolver()}
        >
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.firstName" type="text" label="First Name:" />
            </Col>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.middleName"
                type="text"
                label="Middle Name:"
              />
            </Col>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.lastName" type="text" label="Last Name:" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture:">
                    <Input
                      type="file"
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Gender:"
                name="gender"
                options={gendersOptions}
              />
            </Col>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth:" />
            </Col>
            <Col span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group:"
                name="bloodGroup"
                options={bloodGroupsOptions}
              />
            </Col>
          </Row>
          <Divider>Contact Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicSemestersOptions}
                disabled={isAcademicSemestersLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicDepartmentOptions}
                disabled={isAcademicDepartmentsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Row>
  );
}

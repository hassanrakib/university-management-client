import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { AcademicDepartment as TAcademicDepartment } from "../../../types";

type DataType = { key: React.Key; name: string; academicFaculty: string };

const AcademicDepartment = () => {
  const { data: academicDepartments, isFetching } =
    useGetAcademicDepartmentsQuery(undefined);

  // remove some of the properties to show precised data in the table
  const tableData = academicDepartments?.data.map(
    ({ _id, name, academicFaculty }: TAcademicDepartment) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Academic Department",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      render: () => (
        <div>
          <Button>Update</Button>
        </div>
      ),
    },
  ];

  return (
    <Table<DataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;

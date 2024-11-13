import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { AcademicFaculty as TAcademicFaculty } from "../../../types";

type DataType = Pick<TAcademicFaculty, "name"> & { key: React.Key };

const AcademicFaculty = () => {
  const { data: academicFaculties, isFetching } = useGetAcademicFacultiesQuery(undefined);

  const tableData = academicFaculties?.data.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Academic Faculty Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
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

export default AcademicFaculty;

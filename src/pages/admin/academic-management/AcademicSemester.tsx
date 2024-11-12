import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

export default function AcademicSemester() {
  const { data: academicSemesters } = useGetAllSemestersQuery();

  //   remove some of the properties to show precised data in the table
  const tableData = academicSemesters?.data.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  // antd

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // antd

  return (
    <Table<DataType>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

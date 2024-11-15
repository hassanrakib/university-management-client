import { Button, Table, TableColumnsType } from "antd";
import { TSemesterRegistration } from "../../../types/courseManagement.type";
import { useGetSemesterRegistrationsQuery } from "../../../redux/features/admin/courseManagement.api";

type DataType = Pick<
  TSemesterRegistration,
  "status" | "startDate" | "endDate"
> & { key: React.Key; name: string };

export default function RegisteredSemester() {
  const { data: semesterRegistrations, isFetching } =
    useGetSemesterRegistrationsQuery(undefined);
  const tableData = semesterRegistrations?.data.map(
    ({ academicSemester, status, startDate, endDate }) => ({
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate,
      endDate,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
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
}

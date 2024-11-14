import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParam, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

type DataType = Pick<TStudent, "id", "email"> & {
  name: string;
  key: React.Key;
};

export default function StudentData() {
  const [params, setParams] = useState<TQueryParam[]>([]);

  const [page, setPage] = useState(1);

  const {
    data: students,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    { name: "sort", value: "id" },
    { name: "limit", value: 2 },
    { name: "page", value: page },
    ...params,
  ]);

  const meta = students?.meta;

  // remove some of the properties to show precised data in the table
  const tableData = students?.data?.map(({ _id, name, id, email }) => ({
    key: _id,
    id,
    name: `${name.firstName} ${name.lastName}`,
    email,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      dataIndex: "email",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Button>Update</Button>
            <Link to={`/admin/student-data/${item.key}`}>
            <Button>Details</Button>
            </Link>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams = [] as TQueryParam[];

      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });

      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });

      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table<DataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(pageNumber) => setPage(pageNumber)}
        pageSize={meta?.limit}
        total={meta?.totalDocuments}
      />
    </>
  );
}

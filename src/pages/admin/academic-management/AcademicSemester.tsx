import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import {
  AcademicSemester as TAcademicSemester,
  TQueryParam,
} from "../../../types";
import { useState } from "react";

type DataType = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
> & { key: React.Key };

export default function AcademicSemester() {
  const [params, setParams] = useState<TQueryParam[]>([]);

  const { data: academicSemesters, isFetching } =
    useGetAllSemestersQuery(params);

  // remove some of the properties to show precised data in the table
  const tableData = academicSemesters?.data.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
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
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
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

  return (
    <Table<DataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

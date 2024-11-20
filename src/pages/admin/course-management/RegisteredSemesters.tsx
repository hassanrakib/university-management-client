import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TSemesterRegistration } from "../../../types/courseManagement.type";
import {
  useGetSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

type DataType = Pick<
  TSemesterRegistration,
  "status" | "startDate" | "endDate"
> & { key: React.Key; name: string };

export default function RegisteredSemester() {
  const [semesterRegistrationId, setSemesterRegistrationId] = useState("");

  const { data: semesterRegistrations, isFetching } =
    useGetSemesterRegistrationsQuery(undefined);

  const tableData = semesterRegistrations?.data.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const [updateSemesterRegistration] =
    useUpdateSemesterRegistrationMutation();

  const handleStatusUpdate = (data) => {
    const updatedData = {
      semesterRegistrationId,
      data: {
        status: data.key,
      },
    };

    updateSemesterRegistration(updatedData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color = "blue";

        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button
            onClick={() => {
              setSemesterRegistrationId(item.key);
            }}
          >
            Update
          </Button>
        </Dropdown>
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

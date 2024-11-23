import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

export default function OfferedCourse() {
  const { data: offeredCourses } = useGetAllOfferedCoursesQuery(undefined);

  const singleCourseObject = offeredCourses?.data.reduce((acc, item) => {
    // get the offered course title
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
    });

    return acc;
  }, {});

  console.log(singleCourseObject);
  console.log(Object.values(singleCourseObject ?? {}));

  return <div>This is offered course component.</div>;
}

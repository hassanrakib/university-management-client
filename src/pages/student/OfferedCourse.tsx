import {
  useAddEnrolledCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";

export default function OfferedCourse() {
  const [addEnrolledCourse] = useAddEnrolledCourseMutation();
  const { data: offeredCourses } = useGetAllOfferedCoursesQuery(undefined);

  const offeredCoursesObject = offeredCourses?.data.reduce((acc, item) => {
    // get the offered course title
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  const modifiedOfferedCourses = Object.values(offeredCoursesObject || {});

  const handleEnroll = async (sectionId) => {
    const res = await addEnrolledCourse({
      offeredCourse: sectionId,
    });

    console.log(res);
  };


  if(!modifiedOfferedCourses.length) {
    return <h1 style={{fontSize: '35px'}}>No courses available to enroll!</h1>
  }

  return (
    <div style={{ padding: "20px" }}>
      {modifiedOfferedCourses.map((course, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "20px",
            padding: "10px",
          }}
        >
          <h2>{course.courseTitle || "Untitled Course"}</h2>
          <ul>
            {course.sections.map((section) => (
              <li
                key={section._id}
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <strong>Section:</strong> {section.section}
                </p>
                <p>
                  <strong>Time:</strong> {section.startTime} - {section.endTime}
                </p>
                <p>
                  <strong>Days:</strong> {section.days.join(", ")}
                </p>
                <button onClick={() => handleEnroll(section._id)}>
                  Enroll
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

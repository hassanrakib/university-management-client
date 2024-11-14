import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const params = useParams();

    console.log(params?.studentId);
  return (
    <div>
      This is a StudentDetails component.
    </div>
  );
};

export default StudentDetails;
import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi"

export default function AcademicSemester() {
    const {data} = useGetAllSemestersQuery();
    console.log(data);
    return <div>Academic Semester</div>
}
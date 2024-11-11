import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

export default function AcademicSemester() {
    const {data} = useGetAllSemestersQuery();
    console.log(data);
    return <div>Academic Semester</div>
}
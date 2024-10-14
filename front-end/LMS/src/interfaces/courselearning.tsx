import ICourse from '../interfaces/course';
import ISessionLearning from '../interfaces/sessionlearning';
interface CourseLearning{
    _id: number;
    ClassName: string;
    SessionLearningID: ISessionLearning[];
    CourseID: ICourse;
}


export default CourseLearning;
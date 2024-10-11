import ICourse from '../interfaces/course';
interface CourseLearning{
    _id: number;
    ClassName: string;
    SessionLearningID: number[];
    CourseID: ICourse;
}


export default CourseLearning;
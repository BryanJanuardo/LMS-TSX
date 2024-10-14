import IUser from "../interfaces/user";

interface Forum {
    _id: number;
    ForumTitle: string;
    ForumDescription: string;
    CreatedDate: Date;
    FilePath: string;
    SessionLearningID: number;
    ForumID: Forum;
    ForumRepliesID: Forum[];
    UserID: IUser;
  }
  
  export default Forum;
import ISession from '../interfaces/session';
import IMaterial from '../interfaces/material';
import ITask from '../interfaces/task';

interface SessionLearning {
    _id: number;
    SessionID: ISession;
    MaterialID: IMaterial[];
    TaskID: ITask[];
}

export default SessionLearning;
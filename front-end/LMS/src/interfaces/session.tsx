import IMaterial from "./material";

interface Session {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  materials: IMaterial[];
}

export default Session;
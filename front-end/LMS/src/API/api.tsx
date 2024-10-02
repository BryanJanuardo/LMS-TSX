import axios from 'axios';

const fetchCourses = async () => {
  const response = await axios.get('/api/courses');
  console.log(response.data);
};
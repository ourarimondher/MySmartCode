import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Étudiants
export const getStudents = () => {
  return axios.get(`${API_URL}/students`);
};

// Cours
export const getCourses = () => {
  return axios.get(`${API_URL}/courses`);
};

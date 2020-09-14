import axios from "axios";
import { IEmployeeDTO, ELevels, EPositions } from "../models/IEmployee";

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const getAllEmployees = async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/employees`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployee = async (id: string) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/employees/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addEmployee = async (employee: IEmployeeDTO) => {
  try {
    const { data } = await axios.post(`${SERVER_URL}/employees`, employee);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (id: string, employee: IEmployeeDTO) => {
  try {
    const { data } = await axios.patch(
      `${SERVER_URL}/employees/${id}`,
      employee
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const { data } = await axios.delete(`${SERVER_URL}/employees/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const levelsValues: { [key: number]: string } = {
  [ELevels.JUNIOR]: "Junior",
  [ELevels.MID]: "Mid",
  [ELevels.SENIOR]: "Senior",
  [ELevels.TRAINEE]: "Trainee",
};

export const levelsMap = (param: number) => {
  return {
    value: levelsValues[param],
    key: param,
  };
};

export const positionsValues: { [key: number]: string } = {
  [EPositions.PROJECT_MANAGER]: "Project Manager",
  [EPositions.QA]: "QA",
  [EPositions.SOFTWARE_DEVELOPER]: "Software Developer",
};

export const positionsMap = (param: EPositions) => {
  return {
    value: positionsValues[param],
    key: param,
  };
};
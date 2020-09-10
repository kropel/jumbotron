import React, { useState, useEffect } from "react";

import CEmployeesTable from "../components/CEmployeesTable/CEmployeesTable";

import { getAllEmployees } from "../services/employeesSvc";
import { IEmployee } from "../models/IEmployee";

export const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [flag, setFlag] = useState(false);
  const flagHandler = () => {
    setFlag(true);
  };

  useEffect(() => {
    (async () => {
      const employeesData: IEmployee[] = await getAllEmployees();
      setEmployees(employeesData);
    })();
    setFlag(false);
  }, [flag]);

  return (
    <>
      <CEmployeesTable employees={employees} flagHandler={flagHandler} />
    </>
  );
};

export default Employees;

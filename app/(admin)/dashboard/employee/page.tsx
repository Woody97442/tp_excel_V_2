import EmployeeContent from "@/components/page/employee-content";
import { getEmployees } from "@/data/employee";

const Employee = async () => {
  const pupils = await getEmployees();
  return <EmployeeContent allEmployee={pupils}></EmployeeContent>;
};

export default Employee;

import { GetAllUsers } from "@/action/user";
import SettingsContent from "@/components/page/settings-content";
import { User } from "@prisma/client";

const Employee = async () => {
  const Users = await GetAllUsers();

  return <SettingsContent allUser={Users as User[]}></SettingsContent>;
};

export default Employee;

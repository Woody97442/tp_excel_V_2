import FacturationContent from "@/components/page/facturation-content";
import { getEmployees } from "@/data/employee";

const Factures = async () => {
  const pupils = await getEmployees();
  return <FacturationContent></FacturationContent>;
};

export default Factures;

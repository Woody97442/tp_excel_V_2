import DashboardContent from "@/components/page/dashboard-content";
import { getProducts } from "@/data/product";

const Dashboard = async () => {
  const products = await getProducts();

  return <DashboardContent allProducts={products}></DashboardContent>;
};

export default Dashboard;

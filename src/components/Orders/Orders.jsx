import Header from "../Header/Header";
import { Box } from "@mui/system";
import OrdersTable from "./OrdersTable";
import OrdersForm from "./OrdersForm/OrdersForm";

const BarGraph = () => {
  return (
    // HEADER
    <Box m="20px">
      <Header title="ORDERS" subtitle="All of your orders" />
      <Box display="flex" justifyContent="space-between">
        <OrdersTable />
        <OrdersForm />
      </Box>
    </Box>
  );
};

export default BarGraph;

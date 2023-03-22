import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SalesByMonthBarGraph() {
  const dispatch = useDispatch;
  const sales = useSelector((store) => store.sales);
}

export default SalesByMonthBarGraph;

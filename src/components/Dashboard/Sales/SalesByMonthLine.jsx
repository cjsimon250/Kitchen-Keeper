import React from "react";
import { Box, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function SalesByMonthLine() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Database sales data
  const sales = useSelector((store) => store.sales);
  //Data for query
  let today = dayjs().format("YYYY-MM-DD");
  let oneYearAgo = dayjs().add(-1, "year").format("YYYY-MM-DD");

  //Formatting dates that came back from the database
  let formattedData = sales.map((monthlySales) => {
    let month = monthlySales.month;
    return {
      month: dayjs(month).format("MMMM, YYYY"),
      totalMonthlySales: monthlySales.totalSales,
    };
  });
  //Variable to hold data to be displayed on chart
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    dispatch({
      type: "FETCH_SALES",
      payload: {
        minDate: `${oneYearAgo}`,
        maxDate: `${today}`,
      },
    });
  }, []);

  useEffect(() => {
    setSalesData({
      labels: formattedData?.map((data) => data.month),
      datasets: [
        {
          label: "Total Sales Last 12 Months",
          data: formattedData?.map((data) => data.totalMonthlySales),
          backgroundColor: colors.orangeAccent[400],
        },
      ],
    });
  }, [sales]);

  console.log(salesData);

  return (
    <Box
      width="50vw"
      height="50vh"
      sx={{
        border: `10px solid ${colors.khakiAccent[700]}`,
        backgroundColor: `${colors.khakiAccent[500]}`,
        borderRadius: "10px",
      }}
    >
      <Line data={salesData} />
    </Box>
  );
}

export default SalesByMonthLine;

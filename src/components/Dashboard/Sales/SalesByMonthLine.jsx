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
  //Database year's sales data
  const sales = useSelector((store) => store.sales.yearSales);
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

  //Fetch this year's total sales on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_YEARS_SALES",
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
          label: "Total Revenue",
          data: formattedData?.map((data) => data.totalMonthlySales),
          borderWidth: 4,
          backgroundColor: colors.orangeAccent[500],
        },
      ],
    });
  }, [sales]);

  return (
    <Box
      width="50vw"
      height="50vh"
      mb="5%"
      p="10px"
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.35) 0px 19px 38px, rgba(0, 0, 0, 0.35) 0px 15px 12px",
        backgroundColor: `${colors.khakiAccent[500]}`,
        borderRadius: "10px",
      }}
    >
      <Line
        data={salesData}
        options={{
          plugins: {
            legend: {
              labels: {
                font: {
                  size: "16px",
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default SalesByMonthLine;

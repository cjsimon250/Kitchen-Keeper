import { Box, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function SalesByWeekBar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Database week's sales data
  const sales = useSelector((store) => store.sales.weekSales);
  //Data for query
  let today = dayjs().format("YYYY-MM-DD");
  let oneWeekAgo = dayjs().add(-7, "day").format("YYYY-MM-DD");

  //Formatting dates that came back from the database
  let formattedData = sales.map((dailySales) => {
    let day = dailySales.day;
    return {
      day: dayjs(day).format("dddd, MMMM D"),
      totalDailySales: dailySales.totalSales,
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
      type: "FETCH_WEEKS_SALES",
      payload: {
        minDate: `${oneWeekAgo}`,
        maxDate: `${today}`,
      },
    });
  }, []);

  useEffect(() => {
    setSalesData({
      labels: formattedData?.map((data) => data.day),
      datasets: [
        {
          label: "Total Revenue",
          data: formattedData?.map((data) => data.totalDailySales),
          backgroundColor: [colors.orangeAccent[500], colors.greenAccent[600]],
        },
      ],
    });
  }, [sales]);

  return (
    <Box
      width="50vw"
      height="50vh"
      p="10px"
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.35) 0px 19px 38px, rgba(0, 0, 0, 0.35) 0px 15px 12px",
        backgroundColor: `${colors.khakiAccent[500]}`,
        borderRadius: "10px",
      }}
    >
      <Bar
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

export default SalesByWeekBar;

import Header from "../Header/Header";
import { Box } from "@mui/system";

const Calendar = () => {
  return (
    // HEADER
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CALENDAR" subtitle="Busy, busy, busy" />
      </Box>
    </Box>
  );
};

export default Calendar;

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

export const formatDateRelatively = (
  dateString: string | null,
  ifNull: string = "Never",
) => {
  if (!dateString) {
    return ifNull;
  }

  return dayjs(dateString).calendar(null, {
    sameDay: "[Today]", // The text to display if it's today
    lastDay: "[Yesterday]", // The text to display if it's yesterday
    lastWeek: "D days ago", // You can customize this logic or keep standard 'dddd'
    sameElse: "MMM D, YYYY", // Anything older than a week
  });
};

import dayjs, { type Dayjs } from "dayjs";
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
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: (now: Dayjs) => `${now.diff(dayjs(dateString), "day")} days ago`,
    sameElse: "MMM D, YYYY",
  });
};

export const formatPrice = (
  value: number | string,
  currency: string = "USD",
  maximumFractionDigits: number = 2,
  minimumFractionDigits: number = 2,
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value as number);
};

export const formatNumber = (
  value: number | string,
  maximumFractionDigits: number = 2,
  minimumFractionDigits: number = 2,
) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value as number);
};

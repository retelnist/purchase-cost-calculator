export type SalaryPeriod = "week" | "month" | "year";

export interface WorkMetrics {
  hours: number;
  hourlyRate: number;
  days: number;
  weeks: number;
}

export const PERIOD_OPTIONS: ReadonlyArray<{
  readonly value: SalaryPeriod;
  readonly label: string;
}> = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
] as const;

const HOURS_PER_PERIOD: Record<SalaryPeriod, number> = {
  week: 40,
  month: 160,
  year: 2080,
};

const STANDARD_WORK_DAY_HOURS = 8;
const STANDARD_WORK_WEEK_HOURS = 40;

const isPositiveNumber = (value: number) => Number.isFinite(value) && value > 0;

const parsePositiveNumber = (value: string) => {
  const parsed = Number.parseFloat(value.replace(/,/g, ""));

  return isPositiveNumber(parsed) ? parsed : null;
};

interface CalculateWorkMetricsParams {
  salary: string;
  period: SalaryPeriod;
  purchaseCost: string;
}

export const calculateWorkMetrics = ({
  salary,
  period,
  purchaseCost,
}: CalculateWorkMetricsParams): WorkMetrics | null => {
  const salaryValue = parsePositiveNumber(salary);
  const purchaseValue = parsePositiveNumber(purchaseCost);

  if (!salaryValue || !purchaseValue) {
    return null;
  }

  const hoursPerPeriod = HOURS_PER_PERIOD[period];
  const hourlyRate = salaryValue / hoursPerPeriod;

  if (!isPositiveNumber(hourlyRate)) {
    return null;
  }

  const hours = purchaseValue / hourlyRate;

  return {
    hours,
    hourlyRate,
    days: hours / STANDARD_WORK_DAY_HOURS,
    weeks: hours / STANDARD_WORK_WEEK_HOURS,
  };
};

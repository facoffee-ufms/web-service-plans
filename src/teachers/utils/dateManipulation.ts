export function differenceInDays(date1: Date, date2: Date): number {
  const utcDate1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
  );

  const utcDate2 = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
  );

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const timeDifference = utcDate2 - utcDate1;

  return Math.floor(timeDifference / millisecondsPerDay);
}

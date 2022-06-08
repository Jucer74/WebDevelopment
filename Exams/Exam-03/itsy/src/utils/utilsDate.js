
function pad(n) {
  return n < 10 ? "0" + n : n;
}

/**
 * 
 * @returns Current date in format (yyyy-MM-dd)
 */
export function getCurrentDate() {
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return `${year}-${pad(month)}-${pad(dayOfMonth)}`;
}
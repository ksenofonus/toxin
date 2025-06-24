export default function daysBetween(array) {
  if (array.length > 1) {
    const startDate = array[0];
    const endDate = array[1];
    const diffTime = Math.abs(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
    );
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return null;
}

export default function declination(num, [one, two, plural]) {
  if (num % 10 === 1 && num !== 11) {
    return one;
  }
  if (num % 10 > 1 && num % 10 < 5) {
    return two;
  }
  return plural;
}

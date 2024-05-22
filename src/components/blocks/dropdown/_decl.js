const declination = (num, [one, two, plural]) => {
  if (num%10 === 1 && num !== 11) {
    return one;
  } else if (num >= 5 && num <= 20) {
    return plural;
  } else if (num % 10 > 1 && num % 10 < 5) {
    return two;
  } else {
    return plural;
  }
}
module.exports= declination
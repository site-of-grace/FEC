const calculateAverage = (metaData) => {
  var total = 0;
  var reviewAmount = 0;
  for (var i = 1; i <= 5; i++) {
    total += Number(metaData.ratings[i]) * i;
    reviewAmount += Number(metaData.ratings[i]);
  }
  var longAverage = (total/reviewAmount);
//Rounds to nearest .25
  return (Math.round(longAverage * 4) / 4);
};

module.exports = { calculateAverage };
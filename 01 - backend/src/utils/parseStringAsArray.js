module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map((farm) => farm.trim());
};

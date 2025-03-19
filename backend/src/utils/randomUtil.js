//10-Days-Project\backend\src\utils\randomUtil.js
function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

module.exports = {
  getRandomIndex,
};
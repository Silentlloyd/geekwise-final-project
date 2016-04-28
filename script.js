// function createTable(numCols, numRows) {
//   var begin = "<table>";
//   var middle = "";
//   var end = "</table>";
//   for (var r = 0; r < numRows; r++) {
//       middle += "<tr>";
//       for (var c = 0; c < numCols; c++) {
//           middle += "<td></td>";
//       }
//       middle += "</tr>";
//   }
//   return begin + middle + end;
// }
// document.body.innerHTML = createTable(10,10);


// var me = {
//   key: "value";
//   age: 10;
//   hobbies: ["coding", "Boarding"],
//   favoriteQuote: function(){
//     alert("Hello Everybody!!");
//   },
//   height:"kinda tall"
// };
// var newHobbies = ["knifethrowing", "skydiving"];
// me.hobbies.push(newHobbies);
// console.log(me.hobbies);


// var me = {
//   key: "value",
//   age: 10,
//   hobbies: ["coding", "Boarding"],
//   favoriteQuote: function(){
//     alert("Hello Everybody!!");
//     return function () {
//       alert("Goodbye!");
//    };
//  },
//   height:"kinda tall"
// };
// document.querySelector("#mybutton").addEventListener("click", me.function ());
//
// var myEvents = {
//   events: ["mouseover", "mouseout"],
//   mouseover: function (evt) {
//     this.style.fontWeight = "bold";
//   },
//   mouseout: function (evt) {
//       this.style.fontWeight = "normal";
//   }
// };
// myEvents.events.forEach(function (event) {
//     document.querySelector("#button").addEventListener(event, myEvents[event]);
// });


// var ClickCounterViewModel = function() {
//     this.numberOfClicks = ok.observable(0);
//
//     this.registerClick = function() {
//         this.numberOfClicks(this.numberOfClicks() + 1);
//     };
//
//     this.resetClicks = function() {
//         this.numberOfClicks(0);
//     };
//
//     this.hasClickedTooManyTimes = ok.pureComputed(function() {
//         return this.numberOfClicks() >= 3;
//     }, this);
// };

var clicks = 0;
function linkClick() {
  clicks += 1;
    document.getElementById('clicks').innerHTML= clicks;
}
document.onclick=linkClick;

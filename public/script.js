// Server:
var url = window.location.host; // hàm trả về url của trang hiện tại kèm theo port
var ws = new WebSocket('ws://' + url + '/ws'); // mở 1 websocket với port 3000 
function getReadings(){
  var xhr = new XMLHttpRequest();
  var temp =50.5;
  var hum = 20.5;
  gaugeTemp.value = temp;
  gaugeHum.value = hum;
}

function GetButtonData(data) {
  switch (data)
  {
      case 2:
        var tx = "2"
        document.getElementById('myImage').src='/pic_bulbon.gif'
        console.log('2');
        ws.send(tx);
        break;
      case 3:
        var tx = "3"
        document.getElementById('myImage').src='/pic_bulboff.gif'
        console.log('3');
        ws.send(tx);
        break;
    case 4:
      var tx = "4"
      document.getElementById('myImage2').src='/pic_bulbon.gif'
      console.log('4');
      ws.send(tx);
      break;
      case 5:
      var tx = "5"
      document.getElementById('myImage2').src='/pic_bulboff.gif'
      console.log('5');
      ws.send(tx);
      break;
  }
}
// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);
// window.addEventListener('load', function () {
//   ws.send('initial_request'); // Gửi yêu cầu ban đầu
// });
// Create Temperature Gauge
var gaugeTemp = new LinearGauge({
  renderTo: 'gauge-temperature',
  width: 120,
  height: 400,
  units: "Temperature C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 40,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40"
  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 30,
          "to": 40,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();
  
// Create Humidity Gauge
var gaugeHum = new RadialGauge({
  renderTo: 'gauge-humidity',
  width: 300,
  height: 300,
  units: "Humidity (%)",
  minValue: 0,
  maxValue: 100,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "20",
      "40",
      "60",
      "80",
      "100"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 80,
          "to": 100,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();



if (!!window.EventSource) {
  var source = new EventSource('/events');
  
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
  
  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);
  
  source.addEventListener('new_readings', function(e) {
    console.log("new_readings", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeTemp.value = myObj.temperature;
    gaugeHum.value = myObj.humidity;
  }, false);
}
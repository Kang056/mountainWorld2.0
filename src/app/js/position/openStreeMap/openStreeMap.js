let mymap;
let circleArray = [];
let polygonArray = [];
let markArray = [];
let iconArray = [];
let markIconArray = [];

function mapInit() {
  mymap = L.map('mapid').setView([23.735069, 120.964966], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(mymap);
  mymap.on('click', onMapClick);
  // mymap.on('zoomend', () => console.log(mymap.getZoom()));
  mymap.zoomControl.setPosition('bottomright');
}

function moveToGeofence(data) {
  if (data?.geofenceType) {
    data?.geofenceType === 'circle'
      ? mymap.setView([data.shape.x, data.shape.y], 17)
      : mymap.setView(data.shape.coordinate[0], 17);
  }
}

// 地圖上畫標記 (coordinate: {x: number, y: number})
function drawMarker(data) {
  const marker = L.marker([data.latitude, data.longitude]).addTo(mymap);
  marker.bindPopup(data.name);
  marker.bindPopup(`
    <h5>${data.name}</h5>
    <hr>
    <p>排名 : ${data.id}</p>
    <p>標高 : ${data.elevation}</p>
    <p>等級 : ${data.grade}</p>
    <p>地點 : ${data.position}</p>
    <p>國家公園 : ${data.nationalPark}</p>
    <p>稱號 : ${data.designation}</p>
  `);
  marker.bindTooltip(`<h5>${data.name}</h5>`);
  marker.on('click', function () {
    focusMark(data);
  });
  markArray.push(marker);
}

// 歷史紀錄
function drawRecordMark(data) {
  data.forEach((item, idx) => {
    item.time = item.time.replace('T', ' ');
    const marker = L.circle([item.latitude, item.longitude], {radius: 2, color: 'red'}).addTo(mymap);
    // let coordinates = data.map(item =>[item.latitude, item.longitude]);
    // const marker = L.polyline(coordinates, { weight: 6, color: 'darkred' }).addTo(mymap);
    marker.bindPopup(`
    <p>Latitude : ${item.latitude}</p>
    <p>Longitude : ${item.longitude}</p>
    <p>Time : ${item.time}</p>`); //.openPopup()
    marker.bindTooltip(`<h5>👣${idx+1} ⌚${item.time}</h5>`);
    iconArray.push(marker);
  })
}

function focus(data) {
  iconArray[0] ? iconArray.forEach((item) => item.remove()) : false;
  iconArray = [];
  const icon = L.icon({
    iconUrl: 'assets/img/gpwear/map/focus.png',
    iconSize: [30, 48], // 座標圖大小
    iconAnchor: [15, 47], // 座標的相對位置
  });
  const marker = L.marker([data.latitude, data.longitude], {
    icon: icon,
    autoPan: true,
  }).addTo(mymap);
  iconArray.push(marker);
  marker.bindPopup(`
  <h5>${data.name}</h5>
  <hr>
  <p>排名 : ${data.id}</p>
  <p>標高 : ${data.elevation}</p>
  <p>等級 : ${data.grade}</p>
  <p>地點 : ${data.position}</p>
  <p>國家公園 : ${data.nationalPark}</p>
  <p>稱號 : ${data.designation}</p>
   `);// <p>Status : ${data.status}</p>
  marker.bindTooltip(`<h5>${data.name}</h5>`);
  mymap.setView([data.latitude, data.longitude], 17);
}

function focusMark(data) {
  iconArray[0] ? iconArray.forEach((item) => item.remove()) : false;
  iconArray = [];
  const icon = L.icon({
    iconUrl: 'assets/img/gpwear/map/focus.png',
    iconSize: [30, 48], // 座標圖大小
    iconAnchor: [15, 47], // 座標的相對位置
  });
  const marker = L.marker([data.latitude, data.longitude], {
    icon: icon,
    autoPan: true,
  }).addTo(mymap);
  iconArray.push(marker);
  marker.bindPopup(`
    <h5>${data.name}</h5>
    <hr>
    <p>排名 : ${data.id}</p>
    <p>標高 : ${data.elevation}</p>
    <p>等級 : ${data.grade}</p>
    <p>地點 : ${data.position}</p>
    <p>國家公園 : ${data.nationalPark}</p>
    <p>稱號 : ${data.designation}</p>
   `);// <p>Status : ${data.status}</p>
  marker.bindTooltip(`<h5>${data.name}</h5>`);
  window.getGPX.zone.run(() => { // 發送點擊到的模型fid給頁面顯示該區域的device資料
    window.getGPX.loadAngularFunction(data.elevation);
  });
}

function focusRecord(data) {
  markIconArray[0] ? markIconArray.forEach((item) => item.remove()) : false;
  markIconArray = [];

  const icon = L.icon({
    iconUrl: 'assets/img/gpwear/map/focus.png',
    iconSize: [30, 48], // 座標圖大小
    iconAnchor: [15, 47], // 座標的相對位置
  });
  const marker = L.marker([data.latitude, data.longitude], {
    icon: icon,
    autoPan: true,
  }).addTo(mymap);
  markIconArray.push(marker);
  marker.bindPopup(`
    <p>Latitude : ${data.latitude}</p>
    <p>Longitude : ${data.longitude}</p>
    <p>Time : ${data.time}</p>`); //.openPopup()
  marker.bindTooltip(`<h5>${data.time}</h5>`);
  mymap.setView([data.latitude, data.longitude], 17);
}

// v地圖上畫圓 (shape: {x: number, y: number, radius: number, title: string})
function drawCircle(shape) {
  // console.log('shape', shape);
  // mymap.setView([shape.x, shape.y], 17);
  const circle = L.circle([shape.x, shape.y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: shape.radius,
  }).addTo(mymap);
  circle.bindPopup(shape.name);
  circle.bindTooltip(shape.name);
  circleArray.push(circle);
  // console.log('circleArray',circleArray);
}
// v地圖上畫多邊形 (shape: {coordinate: array[array1[number,number], array2[number,number], ...], title: string})
function drawPolygon(shape) {
  // mymap.setView(shape.coordinate[0], 17);
  // console.log(shape);
  const polygon = L.polygon(shape.coordinate, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.3,
  }).addTo(mymap);
  polygon.bindPopup(shape.name);
  polygon.bindTooltip(shape.name);
  polygonArray.push(polygon);
  // console.log('polygonArray',polygonArray);
}
// 移除所有形狀
function shapeRemove() {
  circleArray[0] ? circleArray.forEach((item) => item.remove()) : false;
  circleArray = [];
  polygonArray[0] ? polygonArray.forEach((item) => item.remove()) : false;
  polygonArray = [];
  markArray[0] ? markArray.forEach((item) => item.remove()) : false;
  markArray = [];
  iconArray[0] ? iconArray.forEach((item) => item.remove()) : false;
  iconArray = [];
  markIconArray[0] ? markIconArray.forEach((item) => item.remove()) : false;
  markIconArray = [];
}
// 點擊事件獲取座標v
function onMapClick(e) {
  console.log('You clicked the map at ' + e.latlng);
}

function getPopupContent(layer) {
  if (layer instanceof L.Circle) {
    return {
      area: 'circle',
      shape: {
        x: layer.getLatLng().lat,
        y: layer.getLatLng().lng,
        radius: layer.getRadius(),
      },
    };
  } else if (layer instanceof L.Polygon) {
    let latlngs = layer._defaultShape
      ? layer._defaultShape()
      : layer.getLatLngs();
    let polygonText = '';
    latlngs.map((item, idx, array) => {
      idx === array.length - 1
        ? (item.text = `${item.lat} ${item.lng}`)
        : (item.text = `${item.lat} ${item.lng}, `);
      polygonText += item.text;
    });
    return { area: 'polygon', shape: polygonText };
  }
  return null;
}


function drawRecordMark(data) {
  data.forEach((item, idx)=> {
    const marker = L.circle([item.lat, item.lon], {radius: 2, color: 'red'}).addTo(mymap);
    // let coordinates = data.map(item =>[item.lat, item.lon]);
    // const marker = L.polyline(coordinates, { weight: 2, color: 'darkred' }).addTo(mymap);
    marker.bindTooltip(`<h5>👣${idx+1} 海拔: ${item.ele}</h5>`);
    iconArray.push(marker);
  })
}

function resetOpenStreeMap() {
  console.log('resetOpenStreeMap');
  mymap = null;
  circleArray = [];
  polygonArray = [];
  markArray = [];
  iconArray = [];
  markIconArray = [];
  mymapEdit = null;
  circleArrayEdit = [];
  polygonArrayEdit = [];
  adminmymapEdit = null;
  admincircleArrayEdit = [];
  adminpolygonArrayEdit = [];
  map8Edit = null;
  map8circleArrayEdit = [];
  map8polygonArrayEdit = [];
}

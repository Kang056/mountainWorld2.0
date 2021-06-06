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
    <p>IMEI : ${data.imei}</p>
    <p>Model : ${data.deviceModelName}</p>
    <p>Latitude : ${data.latitude}</p>
    <p>Longitude : ${data.longitude}</p>
    <p>GPS Update Time : ${data.time}</p>
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
    <p>IMEI : ${data.imei}</p>
    <p>Model : ${data.deviceModelName}</p>
    <p>Latitude : ${data.latitude}</p>
    <p>Longitude : ${data.longitude}</p>
    <p>GPS Update Time : ${data.time}</p>
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
    <p>IMEI : ${data.imei}</p>
    <p>Model : ${data.deviceModelName}</p>
    <p>Latitude : ${data.latitude}</p>
    <p>Longitude : ${data.longitude}</p>
    <p>GPS Update Time : ${data.time}</p>
   `);// <p>Status : ${data.status}</p>
  marker.bindTooltip(`<h5>${data.name}</h5>`);
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

// 新增圍籬
drawnItemsArray = [];
function mapAddInit() {
  mymapAdd = L.map('mapidAdd').setView([25.059225, 121.268495], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(mymapAdd);
  drawnItems = L.featureGroup().addTo(mymapAdd);
  mymapAdd.addControl(
    new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
      },
    })
  );
  mymapAdd.on(L.Draw.Event.CREATED, function (event) {
    let layer = event.layer;
    let content = getPopupContent(layer);
    drawnItems.addLayer(layer);
    drawnItemsArray.push(layer);
    window.mapMymapAdd.zone.run(() =>
      window.mapMymapAdd.loadAngularFunction(content)
    );
  });
}

// 清空新增圍籬畫布
function mymapAddRemove() {
  drawnItemsArray[0] ? drawnItemsArray.forEach((item) => item.remove()) : false;
  drawnItemsArray = [];
}

let mymapEdit;
let circleArrayEdit = [];
let polygonArrayEdit = [];
function mapEditInit() {
  mymapEdit = L.map('mapidEdit').setView([25.059225, 121.268495], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(mymapEdit);
  mymapEdit.on('click', onMapClick);
}

function drawCircleEdit(shape) {
  const circle = new L.circle([shape.x, shape.y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: shape.radius,
  });
  circle.editing.enable();
  mymapEdit.addLayer(circle);
  circleArrayEdit.push(circle);

  let content = getPopupContent(circle);
  window.mapMymapEdit.zone.run(() =>
    window.mapMymapEdit.loadAngularFunction(content)
  );
  circle.on('edit', function () {
    content = getPopupContent(circle);
    // console.log('content', content)
    window.mapMymapEdit.zone.run(() =>
      window.mapMymapEdit.loadAngularFunction(content)
    );
  });
}

function drawPolygonEdit(shape) {
  const polygon = new L.Polygon(shape.coordinate, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.3,
  });
  polygon.editing.enable();
  mymapEdit.addLayer(polygon);
  polygonArrayEdit.push(polygon);
  let content = getPopupContent(polygon);
  window.mapMymapEdit.zone.run(() =>
    window.mapMymapEdit.loadAngularFunction(content)
  );
  polygon.on('edit', function () {
    content = getPopupContent(polygon);
    // console.log('content', content)
    window.mapMymapEdit.zone.run(() =>
      window.mapMymapEdit.loadAngularFunction(content)
    );
  });
}
function moveToEditGeofence(data) {
  data.geofenceType == 'circle'
    ? mymapEdit.setView([data.shape.x, data.shape.y], 17)
    : mymapEdit.setView(data.shape.coordinate[0], 17);
}
// 清空修改圍籬畫布
function mymapEditRemove() {
  polygonArrayEdit[0]
    ? polygonArrayEdit.forEach((item) => {
      console.log('polygonArrayEdit', item);
      item.remove();
    })
    : false;
  polygonArrayEdit = [];

  circleArrayEdit[0]
    ? circleArrayEdit.forEach((item) => {
      console.log('circleArrayEdit', item);
      item.remove();
    })
    : false;
  circleArrayEdit = [];

  //   circleArrayEdit[0] ? circleArrayEdit.forEach(item => item.remove()) : false;
  //   circleArrayEdit = [];
}

// 管理頁面新增圍籬
admindrawnItemsArray = [];
function adminmapAddInit() {
  adminmymapAdd = L.map('adminmapidAdd').setView([25.059225, 121.268495], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(adminmymapAdd);
  admindrawnItems = L.featureGroup().addTo(adminmymapAdd);
  adminmymapAdd.addControl(
    new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
      },
    })
  );
  adminmymapAdd.on(L.Draw.Event.CREATED, function (event) {
    let layer = event.layer;
    let content = getPopupContent(layer);
    admindrawnItems.addLayer(layer);
    admindrawnItemsArray.push(layer);
    window.adminmapMymapAdd.zone.run(() =>
      window.adminmapMymapAdd.loadAngularFunction(content)
    );
  });
}

// 清空新增圍籬畫布
function adminmymapAddRemove() {
  admindrawnItemsArray[0]
    ? admindrawnItemsArray.forEach((item) => item.remove())
    : false;
  admindrawnItemsArray = [];
}

// 管理修改圍籬
let adminmymapEdit;
let admincircleArrayEdit = [];
let adminpolygonArrayEdit = [];
function adminmapEditInit() {
  adminmymapEdit = L.map('adminmapidEdit').setView([25.059225, 121.268495], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(adminmymapEdit);
  adminmymapEdit.on('click', onMapClick);
}

function admindrawCircleEdit(shape) {
  const circle = new L.circle([shape.x, shape.y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: shape.radius,
  });
  circle.editing.enable();
  adminmymapEdit.addLayer(circle);
  admincircleArrayEdit.push(circle);

  let content = getPopupContent(circle);
  window.adminmapMymapEdit.zone.run(() =>
    window.adminmapMymapEdit.loadAngularFunction(content)
  );
  circle.on('edit', function () {
    content = getPopupContent(circle);
    // console.log('content', content)
    window.adminmapMymapEdit.zone.run(() =>
      window.adminmapMymapEdit.loadAngularFunction(content)
    );
  });
}

function admindrawPolygonEdit(shape) {
  const polygon = new L.Polygon(shape.coordinate, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.3,
  });
  polygon.editing.enable();
  adminmymapEdit.addLayer(polygon);
  adminpolygonArrayEdit.push(polygon);
  let content = getPopupContent(polygon);
  window.adminmapMymapEdit.zone.run(() =>
    window.adminmapMymapEdit.loadAngularFunction(content)
  );
  polygon.on('edit', function () {
    content = getPopupContent(polygon);
    // console.log('content', content)
    window.adminmapMymapEdit.zone.run(() =>
      window.adminmapMymapEdit.loadAngularFunction(content)
    );
  });
}
function adminmoveToEditGeofence(data) {
  data.geofenceType == 'circle'
    ? adminmymapEdit.setView([data.shape.x, data.shape.y], 17)
    : adminmymapEdit.setView(data.shape.coordinate[0], 17);
}
// 清空修改圍籬畫布
function adminmymapEditRemove() {
  adminpolygonArrayEdit[0]
    ? adminpolygonArrayEdit.forEach((item) => {
      console.log('adminpolygonArrayEdit', item);
      item.remove();
    })
    : false;
  adminpolygonArrayEdit = [];

  admincircleArrayEdit[0]
    ? admincircleArrayEdit.forEach((item) => {
      console.log('admincircleArrayEdit', item);
      item.remove();
    })
    : false;
  admincircleArrayEdit = [];

  //   circleArrayEdit[0] ? circleArrayEdit.forEach(item => item.remove()) : false;
  //   circleArrayEdit = [];
}


// ========================map8用👇=========================
var map8Add;
var map8Edit;
var map8drawnItems;
var map8drawnItemsArray = [];
var map8circleArrayEdit = [];
var map8polygonArrayEdit = [];
// 管理頁面新增圍籬
function map8mapAddInit() {
  map8Add = L.map('map8Add').setView([25.059225, 121.268495], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(map8Add);
  map8drawnItems = L.featureGroup().addTo(map8Add);
  map8Add.addControl(
    new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
      },
    })
  );
  map8Add.on(L.Draw.Event.CREATED, function (event) {
    let layer = event.layer;
    let content = getPopupContent(layer);
    map8drawnItems.addLayer(layer);
    map8drawnItemsArray.push(layer);
    window.map8mymapAdd.zone.run(() =>
      window.map8mymapAdd.loadAngularFunction(content)
    );
  });
}

// 清空新增圍籬畫布
function map8AddRemove() {
  map8drawnItemsArray[0]
    ? map8drawnItemsArray.forEach((item) => item.remove())
    : false;
  map8drawnItemsArray = [];
}

function map8EditInit() {
  map8Edit = L.map('map8Edit').setView([25.059225, 121.268495], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
  }).addTo(map8Edit);
  map8Edit.on('click', onMapClick);
}

function map8drawCircleEdit(shape) {
  const circle = new L.circle([shape.x, shape.y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: shape.radius,
  });
  // console.log('map8Edit',map8Edit)
  circle.editing.enable();
  map8Edit.addLayer(circle);
  map8circleArrayEdit.push(circle);

  let content = getPopupContent(circle);
  window.map8mymapEdit.zone.run(() =>
    window.map8mymapEdit.loadAngularFunction(content)
  );
  circle.on('edit', function () {
    content = getPopupContent(circle);
    // console.log('content', content)
    window.map8mymapEdit.zone.run(() =>
      window.map8mymapEdit.loadAngularFunction(content)
    );
  });
}

function map8drawPolygonEdit(shape) {
  const polygon = new L.Polygon(shape.coordinate, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.3,
  });
  polygon.editing.enable();
  map8Edit.addLayer(polygon);
  map8polygonArrayEdit.push(polygon);
  let content = getPopupContent(polygon);
  window.map8mymapEdit.zone.run(() =>
    window.map8mymapEdit.loadAngularFunction(content)
  );
  polygon.on('edit', function () {
    content = getPopupContent(polygon);
    // console.log('content', content)
    window.map8mymapEdit.zone.run(() =>
      window.map8mymapEdit.loadAngularFunction(content)
    );
  });
}

function map8moveToEditGeofence(data) {
  data.geofenceType == 'circle'
    ? map8Edit.setView([data.shape.x, data.shape.y], 17)
    : map8Edit.setView(data.editShape.coordinate[0], 17);
}

// 清空新增圍籬畫布
function map8AddRemove() {
  map8drawnItemsArray[0] ? map8drawnItemsArray.forEach((item) => item.remove()) : false;
  map8drawnItemsArray = [];
}

// 清空修改圍籬畫布
function map8EditRemove() {
  map8polygonArrayEdit[0]
    ? map8polygonArrayEdit.forEach((item) => {
      console.log('map8polygonArrayEdit', item);
      item.remove();
    })
    : false;
  map8polygonArrayEdit = [];

  map8circleArrayEdit[0]
    ? map8circleArrayEdit.forEach((item) => {
      console.log('map8circleArrayEdit', item);
      item.remove();
    })
    : false;
  map8circleArrayEdit = [];

  //   circleArrayEdit[0] ? circleArrayEdit.forEach(item => item.remove()) : false;
  //   circleArrayEdit = [];
}
// ========================map8用☝=========================

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

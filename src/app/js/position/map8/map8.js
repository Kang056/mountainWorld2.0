
let map;
let markerPointMap8 = [];
let popup;
let sourceMap8 = [];
let layerMap8 = [];
let markerImgArray = [];
let markerDivArray = [];

function map8Init(){
  const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwOlwvXC93d3cuY2h5bHluZy5jb21cLyIsIm5hbWUiOiJicm91c2VAY2h5bHluZy5jb20iLCJpYXQiOjE2MTYyMjQ2NjYsIm9iamVjdHMiOlsiXC9kYXRhIiwiXC9tYXBzXC9qcyIsIlwvc3R5bGVzIiwiXC9wbGFjZVwvZmluZHBsYWNlZnJvbXRleHQiLCJcL3BsYWNlXC9uZWFyYnlzZWFyY2giLCJcL3BsYWNlXC90ZXh0c2VhcmNoIiwiXC9wbGFjZVwvYXV0b2NvbXBsZXRlIiwiXC9wbGFjZVwvZ2VvY29kZSIsIlwvbWFwc1wvc3RhdGljIiwiXC9yb3V0ZVwvZGlyZWN0aW9ucyIsIlwvcm91dGVcL2Rpc3RhbmNlbWF0cml4IiwiXC9yb3V0ZVwvdHJpcCIsIlwvcm9hZFwvbmVhcmVzdFJvYWRzIiwiXC9yb2FkXC9zbmFwVG9Sb2FkcyJdLCJleHAiOjE2ODA1MDYyNjZ9.tQk1GCKUo9kLOaGrQ2wP6hzXhdwyM00U21jWbrkdRTQ'
  gomp.accessToken = key;
  map = new gomp.Map({
    container: 'map', // 地圖容器 ID
    style: 'https://api.map8.zone/styles/go-life-maps-tw-style-std/style.json', // 地圖樣式檔案位置
    maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
    center: [121.268495, 25.059225], // 初始中心座標，格式為 [lng, lat]
    zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
    minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
    maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
    pitch: 50, // 攝影機仰角, 可省略, [0-60]
    bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
    attributionControl: false
  });
  map.addControl(new gomp.NavigationControl(), 'bottom-right');
  console.log(map);
}



// 繪製圓形圍籬
function drawCircleGeofenceMap8(shape){
  console.log('shape', shape)
    var circle = turf.circle(turf.point([shape.y, shape.x]), shape.radius/1000, {});
    // 圓形
    layerMap8.push(shape.name);
    map.addLayer({
      id: shape.name,
      type: 'fill',
      source: {
        type: 'geojson',
        data: circle
      },
      paint: {
        "fill-color": '#F15A24',
        "fill-opacity": 0.7
      }
    });
    // 半徑範圍說明文字
    // map.addLayer({
    //   id: shape.name+'text',
    //   type: "symbol",
    //   source: {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [shape.y, shape.x]
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
}

// 繪製多邊形圍籬
function drawPolyGeofenceMap8(poly){
  console.log('poly', poly);
  sourceMap8.push(poly.name);
  map.addSource(poly.name, {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
              poly.coordinate
          ]
        }
      }]
    }
  });
  map.addLayer({
    id: poly.name,
    type: 'fill',
    source: poly.name,
    paint: {
      "fill-color": '#4472EA',
      "fill-opacity": 0.7
    },
    filter: ['==', '$type', 'Polygon']
  });
}


// map8基本調用功能(繪製mark, 移除mark, 移動至指定座標)
// point = {lat: 25.03625, lng: 121.54885, text: '文字'}
function markMap8(point) {
  console.log('markerPointMap8', markerPointMap8);
  // if(markerPointMap8.length!=0){
    removeMarkMap8();
  // }
  let popup = new gomp.Popup().setHTML(point.text);
  const pointMap8 = new gomp.Marker().setLngLat(point).setPopup(popup).addTo(map);
  markerPointMap8.push(pointMap8);
}

function recordMarkMap8(data) {
  // console.log('data', data);
  const point = {lat: data.latitude, lng: data.longitude, text: data.num};


  const img = document.createElement('img');
  img.src = 'assets/img/gpwear/map/record.png';
  const markerImg = new gomp.Marker(img, {offset: [0, -10]}).setLngLat(point).addTo(map);
  markerImgArray.push(markerImg);
  const div = document.createElement('div');
  div.style.backgroundImage = 'url(assets/img/gpwear/map/record.png)';
  const markerDiv = new gomp.Marker(div, {offset: [0, -10]}).setLngLat({lng: point.lng, lat: point.lat}).addTo(map);
  markerDivArray.push(markerDiv);
}

// 文字框
function textBox(point){
  popup = new gomp.Popup()
  .setLngLat(point)
  .setHTML(point.text)
  .addTo(map);
}

// 移動至指定座標
function focusMap8(point){
  markMap8(point);
  map.setCenter(point); // focus到座標點
}

function focusRecordMap8(data) {
  console.log('focusRecordMap8', data);
  const point = {lat: data.latitude, lng: data.longitude, text: data.num};
  let popup = new gomp.Popup().setHTML(point.text);
  const pointMap8 = new gomp.Marker().setLngLat(point).setPopup(popup).addTo(map);
  markerPointMap8.push(pointMap8);
  map.setCenter(point);
}

function moveToGeofenceMap8(data){
  console.log(data);
  if (data.setting) {
    if (data.geofenceType === 'circle') {
      console.log('circle', data.shape);
      const point = {lat: data.shape.x, lng: data.shape.y, text: data.shape.name};
      map.setCenter(point);
    } else {
      console.log('poly', data.shape);
      const point = {lat: data.shape.coordinate[0][1], lng: data.shape.coordinate[0][0], text: data.shape.name};
      map.setCenter(point);
    }
  }
}

// 移除所有mark
function removeMarkMap8(){
  console.log('============markerPointMap8', markerPointMap8);

   markerPointMap8.forEach(item => {
     item.remove();
  });

  removeGeofenceMap8();
  removeRecordMap8();
}


function removeGeofenceMap8(){
  console.log('============layerMap8', layerMap8);
  layerMap8.forEach(item => {
    map.removeLayer(item);
    map.removeSource(item);
    removeWork(item);
  });
  console.log('============sourceMap8', sourceMap8);
  sourceMap8.forEach(item => {
    map.removeLayer(item);
    map.removeSource(item);
    removeWork(item);
  });
}

function removeWork(item) {
  layerMap8 = layerMap8.filter(data => {
    return data != item
  });
  sourceMap8 = sourceMap8.filter(data => {
    return data != item
  });
}

function removeRecordMap8(){
  markerDivArray.forEach(item => {
    item.remove();
  });
  markerImgArray.forEach(item => {
    item.remove();
  });
}
function resetMap8() {
  console.log('resetMap8');
  map = null;
  markerPointMap8 = [];
  popup = null;
  sourceMap8 = [];
  layerMap8 = [];
}

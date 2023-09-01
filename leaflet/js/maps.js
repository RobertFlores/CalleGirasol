var congColors = [
    "#d8d8d8",
    "#fbb3fc",
    "#c7fcda",
    "#fcd4d6",
    "#b6c9fc",
    "#99ffff",
    "#b3b3ff"
];

engLabelData = [
    [], // place holder
    [33.609,-117.142], // rh
    [33.597,-117.103], // fv
    [33.395,-116.802], // th
    [33.525,-116.975], // tv
    [33.569,-117.047] // w
];
spanLabelData = [
    [], // place holder
    [33.59,-117.125], //em
    [33.555,-117.0137]
]

var rightPanel = document.getElementById("rightPanel")
var rightHeader = document.getElementById("rightPanelHeader");
var rightChevron = document.getElementById("rightChevronIcon");
var chevron = document.getElementById("chevron");
var bmChevron = document.getElementById("bmchevron");
var rightBody = document.getElementById("rightPanelBody");
var bmPanel = document.getElementById("baseMapPanel");
var bmHeader = document.getElementById("bmHeader");
var bmChevron = document.getElementById("bmChevronIcon");
var bmBody = document.getElementById("bmPanelBody");
var engList = document.getElementById("englishCongList");
var spanList = document.getElementById("spanishCongList");
var allEng = document.getElementById("allEngRadio");
var allSpan = document.getElementById("allSpanRadio");
var congButton = document.getElementById("optionCong");
var styleButton = document.getElementById("optionStyle");
var englishRadio = document.getElementById("englishRadio");
var spanishRadio = document.getElementById("spanishRadio");
var fvRadio = document.getElementById("fvRadio");
var rhRadio = document.getElementById("rhRadio");
var thRadio = document.getElementById("thRadio");
var tvRadio = document.getElementById("tvRadio");
var willRadio = document.getElementById("willRadio");
var esmRadio = document.getElementById("esmRadio");
var gsRadio = document.getElementById("gsRadio");
var allEngDiv = document.getElementById("allEngDiv");
var allSpanDiv = document.getElementById("allSpanDiv");
var fvDiv = document.getElementById("fvDiv");
var rhDiv = document.getElementById("rhDiv");
var thDiv = document.getElementById("thDiv");
var tvDiv = document.getElementById("tvDiv");
var willDiv = document.getElementById("willDiv");
var esmDiv = document.getElementById("esmDiv");
var gsDiv = document.getElementById("gsDiv");

var map = L.map('map').setView([40.258, -97.294], 4);

// var lastBackground = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
//     maxZoom: 18
// }).addTo(map);
var lastBackground = L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map);

var engCongLabels = new L.featureGroup();
var spanCongLabels = new L.featureGroup();
var engButtons = [allEng, fvRadio, rhRadio, thRadio, tvRadio, willRadio];
var spanButtons = [allSpan, esmRadio, gsRadio];
var engDivs = [allEngDiv, fvDiv, rhDiv, thDiv, tvDiv, willDiv];
var spanDivs = [allSpanDiv, esmDiv, gsDiv]
var englishLayers = [];
mergeLayer = L.geoJson(newBoundaryData, {style: areaStyle, onEachFeature: onAddEnglishCong}).addTo(map);
englishLayers.push(mergeLayer);
RHLayer = L.geoJson(newBoundaryData, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "Rolling Hills") {
            useIt = true
        }
    return useIt;
} });
englishLayers.push(RHLayer);
FVLayer = L.geoJson(newBoundaryData, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "French Valley") {
            useIt = true
        }
    return useIt;
} });
englishLayers.push(FVLayer);
WLayer = L.geoJson(newBoundaryData, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "Willows") {
            useIt = true
        }
    return useIt;
} });
englishLayers.push(WLayer);
THLayer = L.geoJson(newBoundaryData, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "Temecula Hills") {
            useIt = true
        }
    return useIt;
} });
englishLayers.push(THLayer);
TVLayer = L.geoJson(newBoundaryData, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "Temecula Valley") {
            useIt = true
        }
    return useIt;
} });
englishLayers.push(TVLayer);

var spanishLayers = [];
spanLayer = L.geoJson(spanCongs, {style: areaStyle, onEachFeature: onAddSpanishCong});
spanishLayers.push(spanLayer);
ESLayer = L.geoJson(spanCongs, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "East Murrieta Spanish") {
            useIt = true
        }
    return useIt;
} });
spanishLayers.push(ESLayer);
GSLayer = L.geoJson(spanCongs, { style: congStyle, filter: function (feature, layer) {
    var useIt = false;
        if (feature.properties.CongName == "Girasol Spanish") {
            useIt = true
        }
    return useIt;
} });
spanishLayers.push(GSLayer);


function areaStyle(feature) {
    var prop = feature.properties;
    var hex = congColors[prop.OBJECTID_1];
    return {
        weight: 4,
        opacity: 1,
        color: '#999999',
        dashArray: '',
        fillOpacity: 0.35,
        fillColor: hex
    };

}
function onAddEnglishCong(feature, layer){
    var prop = feature.properties;
    //layer.bindTooltip(prop.Congregati);
    var polygonCenter = engLabelData[prop.OBJECTID_1]
    var myIcon = L.divIcon({className: 'congLabelMarker', html: prop.CongName}); 
    L.marker(polygonCenter, {icon: myIcon}).addTo(engCongLabels);
}

function onAddSpanishCong(feature, layer){
    var prop = feature.properties;
    //layer.bindTooltip(prop.Congregati);
    var polygonCenter = spanLabelData[prop.OBJECTID_1]
    var myIcon = L.divIcon({className: 'congLabelMarker', html: prop.CongName}); 
    L.marker(polygonCenter, {icon: myIcon}).addTo(spanCongLabels);
}

function congStyle(feature) {
    var prop = feature.properties;
    var hex = congColors[prop.OBJECTID_1];
    return {
        weight: 10,
        opacity: 0.25,
        color: "#ff00ff",
        dashArray: '',
        fillOpacity: 0.1,
        fillColor: "#ffffff"
    };    
}

function switchEnglishCongs(layer, index) {
    removeEnglishCongs();
    map.addLayer(layer);
    if (layer == mergeLayer) {
        map.addLayer(engCongLabels);
    }
    engDivs[index].classList.add('selectedCong');
    engButtons[index].checked = true;
    map.flyToBounds(layer);
}

function removeEnglishCongs () {
    for (var i=0;i<englishLayers.length;i++) {
        if (map.hasLayer(englishLayers[i])) {
            map.removeLayer(englishLayers[i]);
        }
        engDivs[i].classList.remove('selectedCong');
    }
    if (map.hasLayer(engCongLabels)){
        map.removeLayer(engCongLabels);
    }
}

function switchSpanishCongs(layer, index) {
    removeSpanishCongs();
    map.addLayer(layer);
    if (layer == spanLayer) {
        map.addLayer(spanCongLabels);
    }
    spanDivs[index].classList.add('selectedCong');
    spanButtons[index].checked = true;
    map.flyToBounds(layer);
}

function removeSpanishCongs () {
    for (var i=0;i<spanishLayers.length;i++) {
        if (map.hasLayer(spanishLayers[i])) {
            map.removeLayer(spanishLayers[i]);
        }
        spanDivs[i].classList.remove('selectedCong');
    }
    if (map.hasLayer(spanCongLabels)){
        map.removeLayer(spanCongLabels);
    }
}

function switchLanguage(newLang) {
    if (newLang == "english") {
        engList.style.display = "block";
        spanList.style.display = "none";
        spanishRadio.checked = false;
        englishRadio.checked = true;
        removeSpanishCongs();
        removeEnglishCongs();
        map.addLayer(mergeLayer);
        map.addLayer(engCongLabels);
        engDivs[0].classList.add('selectedCong');
        allEng.checked = true;
        englishRadio.checked = true;
        map.flyToBounds(mergeLayer);
    } else {
        engList.style.display = "none";
        spanList.style.display = "block";
        englishRadio.checked = false;
        spanishRadio.checked = true;
        removeEnglishCongs();
        removeSpanishCongs();
        map.addLayer(spanLayer);
        map.addLayer(spanCongLabels);
        spanDivs[0].classList.add('selectedCong');
        allSpan.checked = true;
        spanishRadio.checked = true;
        map.flyToBounds(spanLayer);
    }
}

rightHeader.addEventListener("click", function(e) { 
    var open = rightBody.classList.contains("in");      
    rightChevron.classList.toggle("glyphicon-chevron-up");
    rightChevron.classList.toggle("glyphicon-chevron-down");
    rightBody.classList.toggle("in");
    if (open) {
        chevron.title = lang["expand"];
    } else {
        chevron.title = lang["collapse"];
    }
});

bmHeader.addEventListener("click", function(e) {
    var open = bmBody.classList.contains("in");       
    bmChevron.classList.toggle("glyphicon-chevron-up");
    bmChevron.classList.toggle("glyphicon-chevron-down");
    bmBody.classList.toggle("in");
    if (open) {
        bmChevron.title = lang["expand"];
    } else {
        bmChevron.title = lang["collapse"];
    }
});

function onMenuChange (choice) {
    //var choice = elem.value;
    switch (choice) {
        case "Congregations" :
            rightPanel.style.display = "block";
            bmPanel.style.display = "none";
            congButton.style.display = "none";
            styleButton.style.display = "block";
             break;
        case "Map Styles" :
            rightPanel.style.display = "none";
            bmPanel.style.display = "block";
            congButton.style.display = "block";
            styleButton.style.display = "none";
            break;

    }

}

//map.flyToBounds(mergeLayer);

//[-117.109318,33.540399]
//khMarker = L.marker([33.540399, -117.109318]).addTo(map);
khMarker = L.marker([33.540399, -117.109318], {
    icon: L.icon({
        iconUrl: "images/WT_1.png",
        iconSize: [24,22],
        iconAnchor: [12,11],
        popupAnchor: [0,-12]
    })}).addTo(map);


function setLanguage(choice) {
    lang = languageText[choice];
    for (var i=0; i< locIds.length; i++) {
        var item = document.getElementById(locIds[i]);
        var itemLangId = item.dataset.langid;
        var itemId = item.id;
        item.innerHTML = lang[itemLangId];
    }
    chevron.title = lang["collapse"];
    bmChevron.title = lang["collapse"];
}

function switchCurrentLanguage() {
    var newLang = appLang == 'english' ? 'spanish' : 'english';
    appLang = newLang;
    setLanguage(newLang);
    switchLanguage(newLang);
    //khMarker._popup.setContent('<b>' + lang['kingdomHall'] + '</b>');
    khMarker._tooltip.setContent(lang['kingdomHall']);
}

function getMouseLatLng(e) {
	var cSpan = document.getElementById('coords');
	if (cSpan) {
		var valStr = (e.latlng.lat).toFixed(5) + ", " + (e.latlng.lng).toFixed(5) ;
		cSpan.textContent = valStr;
	}
}

// add scalebars
L.control.scale({ position: "bottomleft" }).addTo(map);

//khMarker.bindPopup('<b>' + languageText[appLang]['kingdomHall'] + '</b>');
khMarker.bindTooltip(languageText[appLang]['kingdomHall']);

// language text
if (appLang == 'spanish') {
    setLanguage(appLang);
    switchLanguage(appLang);
}

// make adjustments to current size
var wHeight = $(window).height();
var bmHeight = wHeight - 100;
bmBody.style.maxHeight = bmHeight + "px";

// set up map style list
setUpBasemapList();
if (appLang == 'english') {
    map.fitBounds(mergeLayer.getBounds());
    engCongLabels.addTo(map);
} else {
    map.fitBounds(spanLayer.getBounds());
}

map.addEventListener('mousemove', getMouseLatLng);




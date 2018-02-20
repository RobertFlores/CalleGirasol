var backgroundMapImagePath = "images/BaseMaps/";
var lastBackgroundIndex = -1;

var backgroundMaps = [
    { name: "GoogleRoad", basemap: L.gridLayer.googleMutant({ type: 'roadmap' }), title: "Google Roadmap", image: "Google_Road.png"}
    ,{ name: "GoogleSatellite", basemap: L.gridLayer.googleMutant({ type: 'satellite' }), title: "Google Satellite", image: "Google_Aerial.png"}
    ,{ name: "GoogleHybrid", basemap: L.gridLayer.googleMutant({ type: 'hybrid' }), title: "Google Hybrid", image: "Google_Hybrid.png"}
    ,{ name: "GoogleTerrain", basemap: L.gridLayer.googleMutant({ type: 'terrain' }), title: "Google Terrain", image: "Google_Terrain.png"}
   // Esri
    ,{ name: "EsriWorldTopoMap", basemap: L.tileLayer.provider('Esri.WorldTopoMap'), title: "Esri World Topo Map", image: "Esri_World_Topo_Map.png" } // 0
    ,{ name: "EsriWorldStreetMap", basemap: L.tileLayer.provider('Esri.WorldStreetMap'), title: "Esri World Street Map", image: "Esri_World_Street_Map.png" } // 1
    ,{ name: "EsriGrayCanvasMap", basemap: L.tileLayer.provider('Esri.WorldGrayCanvas'), title: "Esri Gray Canvas Map", image: "Esri_Gray_Canvas.png" } // 2
    ,{ name: "EsriDarkGrayCanvasMap", basemap: L.tileLayer.provider('Esri.WorldDarkGrayCanvas'), title: "Esri Dark Gray Canvas Map", image: "Esri_Dark_Gray_Canvas.png" } // 2
    ,{ name: "EsriWorldImagery", basemap: L.tileLayer.provider('Esri.WorldImagery'), title: "Esri World Imagery Map", image: "Esri_World_Imagery.png" } // 3
    ,{ name: "EsriNatGeoMap", basemap: L.tileLayer.provider('Esri.NatGeoWorldMap'), title: "Esri Nat Geographic Map", image: "Esri_National_Geographic.png" } // 4
    //,{ name: "EsriDeLorme", basemap: L.tileLayer.provider('Esri.DeLorme'), title: "Esri DeLorme", image: "Esri_DeLorme.png" } // 5
    // ,{ name: "NokiaNormalDay", basemap: L.tileLayer.provider('HERE.normalDay'), title: "HERE Normal Day", image: "Nokia_Normal_Day.png" }
    // ,{ name: "NokiaNormalGreyDay", basemap: L.tileLayer.provider('HERE.normalDayGrey'), title: "HERE Normal Day Grey", image: "Nokia_Normal_Day_Gray.png" }
    // ,{ name: "NokiaTerrain", basemap: L.tileLayer.provider('HERE.terrainDay'), title: "HERE Terrain", image: "Nokia_Terrain.png" }
    // ,{ name: "NokiaSatellite", basemap: L.tileLayer.provider('HERE.satelliteDay'), title: "HERE Satellite", image: "Nokia_Satellite_Labeled.png" }
    ,{ name: "OpenStreetMapDefault", basemap: L.tileLayer.provider('OpenStreetMap.Mapnik'), title: "OpenStreetMap", image: "OpenStreetMap_Default.png" } // 6
    ,{ name: "OpenStreetMapGerman", basemap: L.tileLayer.provider('OpenStreetMap.DE'), title: "OSM German Style", image: "OpenStreetMap_German_Style.png" } // 7
    ,{ name: "OpenStreetMapBW", basemap: L.tileLayer.provider('OpenStreetMap.BlackAndWhite'), title: "OSM B&W", image: "OpenStreetMap_Black_White.png" } // 8
    ,{ name: "OpenStreetMapHOT", basemap: L.tileLayer.provider('OpenStreetMap.HOT'), title: "OSM H.O.T", image: "OpenStreetMap_HOT.png" } // 9
    ,{ name: "StamenToner", basemap: L.tileLayer.provider('Stamen.Toner'), title: "Stamen Toner", image: "Stamen_Toner.png" } // 10
    ,{ name: "StamenTonerLite", basemap: L.tileLayer.provider('Stamen.TonerLite'), title: "Stamen Toner Lite", image: "Stamen_Toner_Lite.png" } // 11
    ,{ name: "StamenTerrain", basemap: L.tileLayer.provider('Stamen.Terrain'), title: "Stamen Terrain", image: "Stamen_Terrain.png" } // 12
    ,{ name: "StamenWatercolor", basemap: L.tileLayer.provider('Stamen.Watercolor'), title: "Stamen Watercolor", image: "Stamen_Watercolor.png" } // 13
    ,{ name: "ThunderforestOpenCycleMap", basemap: L.tileLayer.provider('Thunderforest.OpenCycleMap'), title: "Thunderforest OpenCycle", image: "Thunderforest_OpenCycleMap.png" } // 14
    ,{ name: "ThunderforestTransport", basemap: L.tileLayer.provider('Thunderforest.Transport'), title: "Thunderforest Transport", image: "Thunderforest_Transport.png" } // 15
    ,{ name: "ThunderforestLandscape", basemap: L.tileLayer.provider('Thunderforest.Landscape'), title: "Thunderforest Landscape", image: "Thunderforest_Landscape.png" } // 16
    ,{ name: "ThunderforestOutdoors", basemap: L.tileLayer.provider('Thunderforest.Outdoors'), title: "Thunderforest Outdoors", image: "Thunderforest_Outdoors.png" } // 17
     //, { name: "", basemap: L.tileLayer.provider(''), title: "", image: ".png" }
     // google maps layers
];

function setUpBasemapList() {
    var code = "";
    for (var i = 0; i < backgroundMaps.length; i++) {
        var backgroundMap = backgroundMaps[i];
        code += "<li class='baseMapLiStyle'><div style='text-align: center;' >"
			+ "<span style='padding: 3px;'>" + backgroundMap.title + "</span><br/>"
            + "<img src='" + backgroundMapImagePath + backgroundMap.image + "' class='fm_basemap_image'  />"
        + "</div></li>";
    }
    $("#basemapUL").html(code);
    $('#basemapUL').selectable({
        selected: function (event, ui) {
            $(".ui-selected", this).each(function () {
                var index = $("#basemapUL li").index(this);

                //alert(backgroundMaps[index].title);
                if (lastBackgroundIndex != index)
                    switchBaseMap(index);
            });
        }
    });
    $('#basemapUL li:first').addClass('ui-selected');
}

function switchBaseMap(index) {
    //alert(backgroundMaps[index].title);
    var newBackground = backgroundMaps[index].basemap;
    map.removeLayer(lastBackground);
    map.addLayer(newBackground, true);
    lastBackground = newBackground;
    lastBackgroundIndex = index;
    newBackground.bringToBack();

}

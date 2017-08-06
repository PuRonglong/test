<template>
    <div id='map'>
    </div>
</template>

<script>
import { basemapLayer, featureLayer } from 'esri-leaflet';
export default {
    name: 'leaflet-map',
    data() {
        return {

        };
    },
    mounted: function () {
        let map = L.map('map').setView([45.528, -122.680], 13);
        basemapLayer('Gray').addTo(map);

        let parks = featureLayer({
            url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0',
            style: function () {
                return { color: '#70ca49', weight: 2 };
            }
        }).addTo(map);

        let popupTemplate = '<h3>{NAME}</h3>{ACRES} Acres<br><small>Property ID: {PROPERTYID}<small>';

        parks.bindPopup(function (e) {
            return L.Util.template(popupTemplate, e.feature.properties);
        });
    }
};
</script>

<style>
#map {
    width: 800px;
    height: 800px
}
</style>

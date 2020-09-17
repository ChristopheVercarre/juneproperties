import GMaps from 'gmaps/gmaps';
import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    this.load();
  }

  load() {
    this.initMap();
    this.addMarkers();
    this.addEventListeners();
    this.fitToBounds();
  }

  initMap() {
    const startPositionBrussels = { lat: 50.8467, lng: 4.3547 };
    this.coordinates = JSON.parse(this.data.get('coordinates'));
    this.config = {
      el: this.element,
      lat: startPositionBrussels.lat,
      lng: startPositionBrussels.lng,
      mapTypeControl: false,
      scrollwheel: false,
      fullscreenControl: false,
      maxZoom: 18
    };

    this.map = new GMaps(this.config);
  }

  addMarkers() {
    this.coordinates.forEach(marker => {
      marker.icon = {
        size: new google.maps.Size(32, 32), // eslint-disable-line no-undef
        url: this.markerUrl
      };
    });
    this.markers = this.map.addMarkers(this.coordinates);
  }

  addEventListeners() {
    this.markers.forEach((marker, index) => {
      marker.addListener('click', () => {
        // map.setCenter(markers[index]);
        this.markers[index].infoWindow.open; // eslint-disable-line no-unused-expressions
      });
    });
  }

  fitToBounds() {
    if (this.coordinates.length === 0) {
      this.map.setZoom(8);
    } else if (this.coordinates.length === 1) {
      this.map.setCenter(this.coordinates[0].lat, this.coordinates[0].lng);
      this.map.setZoom(14);
    } else {
      this.map.fitLatLngBounds(this.coordinates);
    }
  }

  get markerUrl() {
    if (this.data.has('markerUrl')) {
      return this.data.get('markerUrl');
    }
    return null;
  }
}

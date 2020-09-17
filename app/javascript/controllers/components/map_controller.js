import GMaps from 'gmaps/gmaps';
import { Controller } from 'stimulus';
import mapStyle from './map-style.json';

export default class extends Controller {
  static targets = ['map', 'highlighter', 'marker', 'mapControl'];

  connect() {
    this.load();
  }

  load() {
    this.setCoordinates();
    this.initGMaps();
    this.addDistrict();
    this.addMarkers();
    this.fitToBounds();
  }

  initGMaps() {
    const startPositionBrussels = { lat: 50.8467, lng: 4.3547 };
    this.config = {
      ...startPositionBrussels,
      el: this.mapTarget,
      mapTypeControl: true,
      scrollwheel: true,
      fullscreenControl: false,
      styles: mapStyle,
      maxZoom: 18
    };
    this.map = new GMaps(this.config);
  }

  addMarkers() {
    this.markersCoordinates.forEach(marker => {
      if (marker.content) {
        this.map.drawOverlay(marker);
      } else {
        this.map.addMarker(marker);
      }
    });
  }

  centerOnMarker(e) {
    const { marker, markerId } = e.target.dataset;
    this.markerTargets.forEach(el => {
      el.parentNode.style.zIndex = '100';
      el.classList.remove('active');
    });

    const element = markerId ? document.querySelector(markerId) : e.target;

    element.classList.add('active');
    element.parentNode.style.zIndex = '101';
    this.map.panTo(JSON.parse(marker));
  }

  setCoordinates() {
    this.markersCoordinates =
      JSON.parse(this.mapTarget.dataset.mapCoordinates) || [];
  }

  updateMarkers(e) {
    e.preventDefault();
    e.stopPropagation();

    this.markersCoordinates = JSON.parse(e.target.dataset.mapCoordinates);
    this.map.removeOverlays();
    this.addMarkers();
    this.fitToBounds();
    this.setActiveIcon(e.target);
  }

  fitToBounds() {
    if (this.allCoordinates.length === 0) {
      this.map.setZoom(8);
    } else if (this.allCoordinates.length === 1) {
      this.map.fitLatLngBounds(this.allCoordinates);
      this.map.panTo(this.allCoordinates[0]);
      this.map.setZoom(13);
    } else {
      this.map.fitLatLngBounds(this.allCoordinates);
    }
  }

  addDistrict() {
    const { mapDistrictCoordinates, mapDistrictColor } = this.mapTarget.dataset;

    this.districtCoordinates = JSON.parse(mapDistrictCoordinates);

    if (!Array.isArray(this.districtCoordinates)) {
      return;
    }

    const path = this.districtCoordinates.map(el => [el.lat, el.lng]);

    this.map.drawPolygon({
      paths: path, // pre-defined polygon shape
      strokeColor: mapDistrictColor,
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: mapDistrictColor,
      fillOpacity: 0.3
    });
  }

  setActiveIcon(link) {
    this.mapControls.forEach(el => {
      el.classList.remove('active');
    });
    link.classList.add('active');
  }

  get mapControls() {
    return this.mapControlTargets;
  }

  get allCoordinates() {
    if (this.districtCoordinates) {
      return this.markersCoordinates.concat(this.districtCoordinates);
    }

    return this.markersCoordinates;
  }

  get markerHighlighters() {
    return this.highlighterTargets;
  }
}

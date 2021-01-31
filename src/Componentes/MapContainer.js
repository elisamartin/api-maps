import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import CurrentLocation from './CurrentLocation';
import SearchBox from './SearchBox'
require('dotenv').config()


const APIMaps = process.env.MAPS_API_KEY;


const mapStyles = {
    width: '70%',
    height: '90%',
    zIndex: '-1'
  };
  
export class MapContainer extends Component {
state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
});

onClose = (props) => {
    if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
    }
};

render() {
    return (
        <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
        >
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                    lat: 41.3851,
                    lng: 2.1734
                    }
                }
            >
                <SearchBox props={this.state}></SearchBox>
                
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current Locations'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
apiKey: APIMaps
})(MapContainer);
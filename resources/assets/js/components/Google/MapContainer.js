import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const {GOOGLE_MAPS_SECRET} = process.env.ENV;

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    render() {
        return (
            <Map google={this.props.google}
                 zoom={18}
                 initialCenter={{
                     lat: 49.2358564,
                     lng: -123.1597431
                 }}>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAPS_SECRET)
})(MapContainer)
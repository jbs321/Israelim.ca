import React, {Component} from 'react';
import {compose} from 'recompose'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const {GOOGLE_MAPS_SECRET} = process.env.ENV;

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map google={this.props.google}
                 style={this.props.style}
                 zoom={18}
                 initialCenter={this.props.location}
                 onClick={this.onMapClicked}>

                <Marker
                onClick={this.onMarkerClick}
                label={this.props.label}
                name={this.props.name}
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

const enhance = compose(
    GoogleApiWrapper({
        apiKey: (GOOGLE_MAPS_SECRET),
    })
)(MapContainer);

export default enhance;
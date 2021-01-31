import React from 'react';
import ReactDOM from 'react-dom';
import StandaloneSearchBox from 'react-google-maps'
// const {
//     StandaloneSearchBox
//   } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
  

export class SearchBox extends React.Component {
    state = {
        position: null
      };
    
      componentDidMount() {
        this.renderAutoComplete();
      }
    
      componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
      }
    
      onSubmit(e) {
        e.preventDefault();
      }
    
      renderAutoComplete() {
        const { google, map } = this.props;
    
        if (!google || !map) return;
    
        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
        autocomplete.bindTo('bounds', map);
    
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
    
          if (!place.geometry) return;
    
          if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
          else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
    
          this.setState({ position: place.geometry.location });
        });
      }
    
      render() {
        const { position } = this.state;
    
        return (
          <div className="search-box" style={{zIndex: 3}}>
            <div >
              <form onSubmit={this.onSubmit}>
                <input
                  placeholder="Enter a location"
                  ref={ref => (this.autocomplete = ref)}
                  type="text"
                />
    
                <input  type="submit" value="Go" />
              </form>
            </div>
          </div>
        );
      }
}
export default SearchBox;
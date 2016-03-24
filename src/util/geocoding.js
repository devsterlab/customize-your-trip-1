
class Geocoding {
    constructor() {
        if (Geocoding.instance) return Geocoding.instance;
        Geocoding.instance = this;

        this.geocoder = new google.maps.Geocoder();
    }

    geocodeAddress(address) {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results);
                } else {
                    reject(status);
                }
            });
        });
    }
}

export default (new Geocoding());

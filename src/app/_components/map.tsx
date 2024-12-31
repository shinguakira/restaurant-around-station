import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import type { Station, Restaurant } from "~/common/types/restaurant";

interface MapProps {
  center: google.maps.LatLngLiteral;
  stations: Station[];
  filteredRestaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  onLoad: (map: google.maps.Map) => void;
  onUnmount: () => void;
}

export function Map({
  center,
  stations,
  filteredRestaurants,
  selectedRestaurant,
  setSelectedRestaurant,
  onLoad,
  onUnmount,
}: MapProps) {
  return (
    <GoogleMap
      mapContainerClassName="w-full h-[400px]"
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {stations.map((station) => (
        <Marker
          key={station.place_id}
          position={station.geometry.location}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      ))}
      {filteredRestaurants.map((restaurant) => (
        <Marker
          key={restaurant.place_id}
          position={restaurant.geometry.location}
          onClick={() => setSelectedRestaurant(restaurant)}
        />
      ))}
      {selectedRestaurant && (
        <InfoWindow
          position={selectedRestaurant.geometry.location}
          onCloseClick={() => setSelectedRestaurant(null)}
        >
          <div>
            <h3 className="font-bold">{selectedRestaurant.name}</h3>
            <p>{selectedRestaurant.vicinity}</p>
            {selectedRestaurant.rating && (
              <p>
                Rating: {selectedRestaurant.rating} (
                {selectedRestaurant.user_ratings_total} reviews)
              </p>
            )}
            <p>Categories: {selectedRestaurant.categories.join(", ")}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

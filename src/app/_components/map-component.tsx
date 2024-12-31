"use client";

import { useState, useCallback, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { SearchBar } from "@components/search-bar";
import { RestaurantList } from "@components/restaurant-list";
import { Map } from "@components/map";
import {
  mockRestaurants,
  mockStations,
  mockStationsJa,
} from "@/utils/mockData";
import type { Station, Restaurant } from "~/common/types/restaurant";
import { mockRestaurantsJa } from "../../utils/mockData";

const libraries = ["places"];

const MapComponent = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 35.6812, lng: 139.7671 }); // Tokyo Station
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [useMockData, setUseMockData] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as any,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (useMockData) {
        setRestaurants(mockRestaurantsJa);
        setStations(mockStationsJa);
        setCenter(mockStations[0].geometry.location);
      } else {
        getCurrentLocation();
      }
    }
  }, [isLoaded, useMockData]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          findNearbyStations(pos);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        },
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  };

  const findNearbyStations = (location: google.maps.LatLngLiteral) => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: location,
          radius: 2000,
          type: "subway_station",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setStations(results.slice(0, 3) as Station[]);
            setCenter(results[0].geometry!.location.toJSON());
            map.panTo(results[0].geometry!.location);
            results
              .slice(0, 3)
              .forEach((station) => searchRestaurants(station));
          }
        },
      );
    }
  };

  const searchRestaurants = (station: google.maps.places.PlaceResult) => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: station.geometry!.location,
          radius: 500,
          type: "restaurant",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setRestaurants(
              (prev) =>
                [
                  ...prev,
                  ...results.map((result) => ({
                    ...result,
                    stationId: station.place_id!,
                    categories: getRandomCategories(), // This is a placeholder for real data
                  })),
                ] as Restaurant[],
            );
          }
        },
      );
    }
  };

  // Placeholder function to generate random categories for real data
  const getRandomCategories = () => {
    const allCategories = [
      "sushi",
      "ramen",
      "tempura",
      "yakitori",
      "udon",
      "cafe",
    ];
    const numCategories = Math.floor(Math.random() * 3) + 1; // 1 to 3 categories
    return allCategories
      .sort(() => 0.5 - Math.random())
      .slice(0, numCategories);
  };

  const handleSearch = () => {
    if (useMockData) {
      // For mock data, just update the center of the map
      const newCenter = {
        lat: center.lat + Math.random() * 0.01,
        lng: center.lng + Math.random() * 0.01,
      };
      setCenter(newCenter);
      if (map) map.panTo(newCenter);
    } else if (map) {
      const service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(
        {
          query: searchInput,
          fields: ["name", "geometry"],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const location = results[0].geometry?.location;
            if (location) {
              findNearbyStations({ lat: location.lat(), lng: location.lng() });
            }
          }
        },
      );
    }
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    if (map) {
      map.panTo(restaurant.geometry.location);
    }
  };

  const toggleMockData = () => {
    setUseMockData(!useMockData);
    setRestaurants([]);
    setStations([]);
  };

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      selectedCategory === "all" ||
      restaurant.categories.includes(selectedCategory),
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-4xl">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        getCurrentLocation={getCurrentLocation}
        toggleMockData={toggleMockData}
        useMockData={useMockData}
      />

      <RestaurantList
        stations={stations}
        filteredRestaurants={filteredRestaurants}
        handleRestaurantClick={handleRestaurantClick}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Map
        center={center}
        stations={stations}
        filteredRestaurants={filteredRestaurants}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </div>
  );
};

export default MapComponent;

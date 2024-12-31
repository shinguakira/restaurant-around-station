export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
}

export interface GoogleMapsPlace {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: Geometry;
}

export interface Restaurant extends GoogleMapsPlace {
  categories: string[];
  stationId: string; // id for neraest station
}

export interface Station {
  place_id: string;
  name: string;
  geometry: Geometry;
}

export interface NearbyRestaurantsInput {
  lat: number;
  lng: number;
  radius?: number;
}

export interface SearchRestaurantsInput {
  query: string;
  lat: number;
  lng: number;
  radius?: number;
}

export interface NearbyStationsInput {
  lat: number;
  lng: number;
  radius?: number;
}

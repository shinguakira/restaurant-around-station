import type { Station } from "~/common/types/restaurant";

export const mockStations: Station[] = [
  {
    place_id: "1",
    name: "Tokyo Station",
    geometry: {
      location: { lat: 35.6812, lng: 139.7671 },
    },
  },
  {
    place_id: "2",
    name: "Shinjuku Station",
    geometry: {
      location: { lat: 35.6896, lng: 139.7006 },
    },
  },
  {
    place_id: "3",
    name: "Shibuya Station",
    geometry: {
      location: { lat: 35.658, lng: 139.7016 },
    },
  },
];

export const mockRestaurants = [
  {
    place_id: "1",
    name: "Sushi Paradise",
    vicinity: "123 Tokyo St, Chiyoda",
    rating: 4.5,
    user_ratings_total: 200,
    geometry: {
      location: { lat: 35.6822, lng: 139.7681 },
    },
    stationId: "1",
    categories: ["sushi", "japanese"],
  },
  {
    place_id: "2",
    name: "Ramen House",
    vicinity: "456 Shinjuku Ave, Shinjuku",
    rating: 4.2,
    user_ratings_total: 150,
    geometry: {
      location: { lat: 35.6906, lng: 139.7016 },
    },
    stationId: "2",
    categories: ["ramen", "japanese"],
  },
  {
    place_id: "3",
    name: "Tempura Delight",
    vicinity: "789 Shibuya Rd, Shibuya",
    rating: 4.7,
    user_ratings_total: 300,
    geometry: {
      location: { lat: 35.659, lng: 139.7026 },
    },
    stationId: "3",
    categories: ["tempura", "japanese"],
  },
  {
    place_id: "4",
    name: "Yakitori Grill",
    vicinity: "101 Tokyo Central, Chiyoda",
    rating: 4.0,
    user_ratings_total: 100,
    geometry: {
      location: { lat: 35.6802, lng: 139.7661 },
    },
    stationId: "1",
    categories: ["yakitori", "japanese"],
  },
  {
    place_id: "5",
    name: "Matcha Cafe",
    vicinity: "202 Shinjuku Green, Shinjuku",
    rating: 4.8,
    user_ratings_total: 250,
    geometry: {
      location: { lat: 35.6886, lng: 139.6996 },
    },
    stationId: "2",
    categories: ["cafe", "japanese"],
  },
  {
    place_id: "6",
    name: "Udon Noodle Shop",
    vicinity: "303 Shibuya Center, Shibuya",
    rating: 4.3,
    user_ratings_total: 180,
    geometry: {
      location: { lat: 35.657, lng: 139.7006 },
    },
    stationId: "3",
    categories: ["udon", "japanese"],
  },
];

export const mockStationsJa: Station[] = [
  {
    place_id: "1",
    name: "東京駅",
    geometry: {
      location: { lat: 35.6812, lng: 139.7671 },
    },
  },
  {
    place_id: "2",
    name: "新宿駅",
    geometry: {
      location: { lat: 35.6896, lng: 139.7006 },
    },
  },
  {
    place_id: "3",
    name: "渋谷駅",
    geometry: {
      location: { lat: 35.658, lng: 139.7016 },
    },
  },
];

export const mockRestaurantsJa = [
  {
    place_id: "1",
    name: "寿司パラダイス",
    vicinity: "123 東京ストリート, 千代田区",
    rating: 4.5,
    user_ratings_total: 200,
    geometry: {
      location: { lat: 35.6822, lng: 139.7681 },
    },
    stationId: "1",
    categories: ["寿司", "日本食"],
  },
  {
    place_id: "2",
    name: "ラーメンハウス",
    vicinity: "456 新宿アベニュー, 新宿区",
    rating: 4.2,
    user_ratings_total: 150,
    geometry: {
      location: { lat: 35.6906, lng: 139.7016 },
    },
    stationId: "2",
    categories: ["ラーメン", "日本食"],
  },
  {
    place_id: "3",
    name: "天ぷらデライト",
    vicinity: "789 渋谷ロード, 渋谷区",
    rating: 4.7,
    user_ratings_total: 300,
    geometry: {
      location: { lat: 35.659, lng: 139.7026 },
    },
    stationId: "3",
    categories: ["天ぷら", "日本食"],
  },
  {
    place_id: "4",
    name: "焼き鳥グリル",
    vicinity: "101 東京セントラル, 千代田区",
    rating: 4.0,
    user_ratings_total: 100,
    geometry: {
      location: { lat: 35.6802, lng: 139.7661 },
    },
    stationId: "1",
    categories: ["焼き鳥", "日本食"],
  },
  {
    place_id: "5",
    name: "抹茶カフェ",
    vicinity: "202 新宿グリーン, 新宿区",
    rating: 4.8,
    user_ratings_total: 250,
    geometry: {
      location: { lat: 35.6886, lng: 139.6996 },
    },
    stationId: "2",
    categories: ["カフェ", "日本食"],
  },
  {
    place_id: "6",
    name: "うどん屋",
    vicinity: "303 渋谷センター, 渋谷区",
    rating: 4.3,
    user_ratings_total: 180,
    geometry: {
      location: { lat: 35.657, lng: 139.7006 },
    },
    stationId: "3",
    categories: ["うどん", "日本食"],
  },
];

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";
import type { GoogleMapsPlace } from "@/common/types/restaurant";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const restaurantRouter = createTRPCRouter({
  getNearbyRestaurants: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        radius: z.number().optional().default(1000),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${input.lat},${input.lng}&radius=${input.radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`,
        );

        return response.data.results.map((place: GoogleMapsPlace) => ({
          id: place.place_id,
          name: place.name,
          vicinity: place.vicinity,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          geometry: place.geometry,
          categories: ["restaurant"], // Google API doesn't provide detailed categories, so we're using a default
        }));
      } catch (error) {
        console.error("Error fetching nearby restaurants:", error);
        throw new Error("Failed to fetch nearby restaurants");
      }
    }),

  getNearbyStations: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        radius: z.number().optional().default(2000),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${input.lat},${input.lng}&radius=${input.radius}&type=subway_station&key=${GOOGLE_MAPS_API_KEY}`,
        );

        return response.data.results.map((place: GoogleMapsPlace) => ({
          id: place.place_id,
          name: place.name,
          geometry: place.geometry,
        }));
      } catch (error) {
        console.error("Error fetching nearby stations:", error);
        throw new Error("Failed to fetch nearby stations");
      }
    }),

  searchRestaurants: publicProcedure
    .input(
      z.object({
        query: z.string(),
        lat: z.number(),
        lng: z.number(),
        radius: z.number().optional().default(1000),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${input.query}&location=${input.lat},${input.lng}&radius=${input.radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`,
        );

        return response.data.results.map((place: GoogleMapsPlace) => ({
          id: place.place_id,
          name: place.name,
          vicinity: place.vicinity,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          geometry: place.geometry,
          categories: ["restaurant"], // Google API doesn't provide detailed categories, so we're using a default
        }));
      } catch (error) {
        console.error("Error searching restaurants:", error);
        throw new Error("Failed to search restaurants");
      }
    }),
});

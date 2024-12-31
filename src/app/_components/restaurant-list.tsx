import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/shadcn/card";
import { ScrollArea } from "@components/shadcn/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/shadcn/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadcn/select";

interface Restaurant {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  stationId: string;
  categories: string[];
}

interface Station {
  place_id: string;
  place_code: string;

  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface RestaurantListProps {
  stations: Station[];
  filteredRestaurants: Restaurant[];
  handleRestaurantClick: (restaurant: Restaurant) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  "all",
  "sushi",
  "ramen",
  "tempura",
  "yakitori",
  "udon",
  "cafe",
];

export function RestaurantList({
  stations,
  filteredRestaurants,
  handleRestaurantClick,
  selectedCategory,
  setSelectedCategory,
}: RestaurantListProps) {
  console.log(stations);
  console.log(filteredRestaurants);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>近くの飲食店</CardTitle>
        <CardDescription>最寄り駅リスト</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index: number) => (
                <SelectItem key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[400px] w-full">
          <Accordion type="single" collapsible className="w-full">
            {stations.map((station) => (
              <AccordionItem value={station.place_id} key={station.place_id}>
                <AccordionTrigger>{station.name}</AccordionTrigger>
                <AccordionContent>
                  {filteredRestaurants
                    .filter(
                      (restaurant) => restaurant.stationId === station.place_id,
                    )
                    .map((restaurant, index: number) => (
                      <div
                        key={`${restaurant.place_id} - ${index}`}
                        className="mb-2 cursor-pointer rounded p-2 hover:bg-gray-100"
                        onClick={() => handleRestaurantClick(restaurant)}
                      >
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600">
                          {restaurant.vicinity}
                        </p>
                        {restaurant.rating && (
                          <p className="text-sm">
                            Rating: {restaurant.rating} (
                            {restaurant.user_ratings_total} reviews)
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          カテゴリー: {restaurant.categories.join(", ")}
                        </p>
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

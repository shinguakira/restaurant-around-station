import { Button } from "@components/shadcn/button";
import { Input } from "@components/shadcn/input";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: () => void;
  getCurrentLocation: () => void;
  toggleMockData: () => void;
  useMockData: boolean;
}

export function SearchBar({
  searchInput,
  setSearchInput,
  handleSearch,
  getCurrentLocation,
  toggleMockData,
  useMockData,
}: SearchBarProps) {
  return (
    <div className="mb-4 flex gap-2">
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter a location"
        className="flex-grow"
      />
      <Button onClick={handleSearch}>検索</Button>
      <Button onClick={getCurrentLocation} disabled={useMockData}>
        現在地を使用
      </Button>
      <Button onClick={toggleMockData}>
        {useMockData ? "現在地を使用" : "テストデータを使用"}
      </Button>
    </div>
  );
}

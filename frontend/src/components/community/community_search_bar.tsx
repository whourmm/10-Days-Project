import Image from "next/image";
import search from "@public/images/Search.svg";
import { useState, ChangeEvent } from "react";

interface CommunitySearchBarProps {
  onSearch?: (query: string) => void;
}

export default function CommunitySearchBar({ onSearch }: CommunitySearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Call the onSearch prop if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative w-full flex">
      <input
        type="text"
        required
        id="search-input"
        name="search-input"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        className={`bg-white border-[2px] rounded-full w-full pr-4 pl-12 py-1 sm:py-3 text-gray-700 text-tag $`}
      />
      <div className="absolute left-4 top-5 transform -translate-y-1/2 cursor-pointer">
        <Image src={search} alt="Search icon" width={20} height={20} />
      </div>
    </div>
  );
}

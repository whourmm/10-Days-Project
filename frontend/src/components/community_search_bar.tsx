import Image from "next/image";
import search from "@public/images/Search.svg";

export default function CommunitySearchBar() {
  return (
    <div className="relative w-full">
      <input
        // type={passConOpen ? "text" : "password"}
        required
        id="confirm-password"
        name="confirm-password"
        placeholder="Search"
        // value={confirmPassword}
        className={`bg-white border-[2px] rounded-full w-full pr-4 pl-12 py-1 sm:py-3 text-gray-700 text-md  pr-12 $`}
      />
      <div className="absolute left-4 top-8 transform -translate-y-1/2 cursor-pointer">
        <Image src={search} alt="Hide password" width={20} height={20} />
      </div>
    </div>
  );
}

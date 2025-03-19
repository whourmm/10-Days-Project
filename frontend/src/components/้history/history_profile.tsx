import Image from "next/image";
import profile from "@public/images/Profile.svg";
import CommunityBlog from "../community/community_blog";
import { Blog } from "../../../interface";

export default function HistoryProfile() {
  return (
    <div className="w-full">
      <Image src={profile} alt="" />
      <div className="bg-white w-full h-[12vh] rounded-2xl mt-[-6vh]  pt-6 pb-3 px-5 flex flex-col justify-between">
        <div className="text-black text-xxl text-end font-semibold">Beelucky</div>
        <div className="text-black text-lg flex justify-between font-medium">
          <div className="">Beelucky Love you</div>
          <div className="">4 Posts</div>
        </div>
      </div>
    </div>
  );
}

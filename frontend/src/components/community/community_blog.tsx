import { Blog, COLOR } from "../../../interface";
import User from "@public/images/User.svg";
import Image from "next/image";
import { Tag, tags } from "../../../interface";
import { CommunityTag } from "./community_tag";
import Example from "@public/images/tarot/ace-of-cups.png";
import heart from "@public/images/Heart.svg";
import comment from "@public/images/Comment.svg";

export default function CommunityBlog({ blog }: { blog: Blog }) {
  // Function to get color for a specific tag name
  const getTagColor = (tagName: string): COLOR => {
    // Find matching tag from the tags array
    const matchedTag = tags.find((t) => t.name === tagName);
    // Return the matched tag color or a default if not found
    return matchedTag ? matchedTag.color : "gray";
  };

  return (
    <div className="text-black w-full h-full bg-white py-4 px-5 rounded-2xl">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image src={User} alt="" />
          <div className="text-tag font-semibold">{blog.author}</div>
        </div>
        <div className="flex gap-2">
          {blog.tags.map((tagName, idx) => (
            <CommunityTag
              key={idx}
              tag={{ name: tagName, color: getTagColor(tagName) }}
              variant="on_post"
              onClick={() => console.log("Button clicked!")}
            />
          ))}
        </div>
      </div>
      <div className="my-5 h-[30vh] bg-gray-100 "></div>
      <div className="text-sm">{blog.content}</div>
      <div className="mt-3 flex justify-between text-sm">
        <div className="flex gap-2 items-center text-vidva ">
          <Image src={heart} alt="heart" />
          <div className="">{blog.likes}</div>
          <div className="">Likes</div>
        </div>
        <div className="flex gap-2 items-center text-raw-umber ">
          <Image src={comment} alt="heart" />
          <div className="">{blog.comments_count}</div>
          <div className="">Comments</div>
        </div>
      </div>
    </div>
  );
}

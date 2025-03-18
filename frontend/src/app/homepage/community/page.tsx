"use client";

import { useState } from "react";

import CommunityBlog from "@/components/community_blog";
import CommunitySearchBar from "@/components/community_search_bar";
import CommunityTag from "@/components/community_tag";
import { Tag, Blog } from "../../../../interface";

export default function page() {
  const [chosenTags, setChosenTag] = useState<string>("");

  const tags: Tag[] = [
    {
      name: "ความรัก",
      color: "pink",
    },
    {
      name: "การงาน",
      color: "purple",
    },
    {
      name: "โชคลาภ",
      color: "orange",
    },
    {
      name: "สุขภาพ",
      color: "green",
    },
    {
      name: "การเงิน",
      color: "yellow",
    },
    {
      name: "อื่นๆ",
      color: "blue",
    },
  ];
  const blog: Blog = {
    title: "Title",
    author: "Author",
    likes: 100,
    comments_count: 12305,
    tags: [
      {
        name: "ความรัก",
        color: "pink",
      },
      {
        name: "การเงิน",
        color: "yellow",
      },
    ],
    created_at: "2021-12-22",
    updated_at: "2025-11-20",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
  return (
    <div className="bg-cosmic-latte h-full w-full bg-opacity-90">
      <div className=" w-full  p-5 text-5xl text-white flex flex-col items-center justify-center ">
        <CommunitySearchBar />
        <div className="w-full overflow-x-auto scrollbar-hide flex flex-row gap-2 py-2w-full overflow-x-auto hide-scrollbar flex flex-row gap-2 py-2">
          <div className="flex flex-row gap-2 min-w-max">
            {tags.map((tag, idx) => (
              <CommunityTag key={idx} tag={tag} />
            ))}
          </div>
        </div>
        <section className="flex flex-col gap-5 mb-[10vh] mt-5">
          <CommunityBlog blog={blog} />
          <CommunityBlog blog={blog} />
          <CommunityBlog blog={blog} />
        </section>
      </div>
    </div>
  );
}

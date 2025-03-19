"use client";

import { useState } from "react";

import CommunityBlog from "@/components/community_blog";
import CommunitySearchBar from "@/components/community_search_bar";
import { CommunityTag, ClickableTag } from "@/components/community_tag";
import { Tag, Blog, tags } from "../../../../interface";

export default function page() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const handleTagSelection = (tag: Tag, isSelected: boolean) => {
    if (isSelected) {
      // Add the tag to selected tags
      setSelectedTags((prev) => [...prev, tag]);

      // Apply any filters or effects based on this tag
      // applyTagFilter(tag);
    } else {
      // Remove the tag from selected tags
      setSelectedTags((prev) => prev.filter((t) => t.name !== tag.name));

      // Remove any filters or effects based on this tag
      // removeTagFilter(tag);
    }
  };

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
    <div className="bg-cosmic-latte h-full w-full ">
      <div className=" w-full  p-5 text-5xl text-white flex flex-col items-center justify-center ">
        <CommunitySearchBar />
        <div className="w-full overflow-x-auto scrollbar-hide flex flex-row gap-2 py-2w-full overflow-x-auto hide-scrollbar flex flex-row gap-2 py-2">
          <div className="flex flex-row gap-2 min-w-max">
            {tags.map((tag, idx) => (
              <ClickableTag
                key={tag.name}
                tag={tag}
                onSelect={(tag, isSelected) => handleTagSelection(tag, isSelected)}
              />
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

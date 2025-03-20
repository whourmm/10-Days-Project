"use client";

import { useState } from "react";
import { Blog } from "../../../../interface";

import HistoryProfile from "@/components/history/history_profile";
import CommunityBlog from "@/components/community/community_blog";

const blogs: Blog[] = [
  {
    id: 0,
    title: "Title 1",
    author: "BeeLucky",
    likes: 100,
    comments_count: 12305,
    tags: ["ความรัก", "การเงิน"],
    created_at: "2021-12-22",
    updated_at: "2025-11-20",
    content: "",
    image_url: "",
    user_id: "1",
  },
  {
    id: 1,
    title: "Title 2",
    author: "Author 2",
    likes: 50,
    comments_count: 1205,
    tags: ["การเงิน", "สุขภาพ"],
    created_at: "2022-01-15",
    updated_at: "2025-10-10",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image_url: "",
    user_id: "1",
  },
  {
    id: 3,
    title: "Title 3",
    author: "Author 3",
    likes: 75,
    comments_count: 8050,
    tags: ["สุขภาพ", "อาหาร"],
    created_at: "2022-02-05",
    updated_at: "2025-09-25",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image_url: "",
    user_id: "1",
  },
  {
    id: 4,
    title: "Other Blog",
    author: "BeeLucky",
    likes: 30,
    comments_count: 420,
    tags: ["ท่องเที่ยว"], // This tag is not in the predefined list
    created_at: "2022-03-10",
    updated_at: "2025-08-15",
    content: "This blog has tags that aren't in the predefined tag list.",
    image_url: "",
    user_id: "1",
  },
];

export default function page() {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  // Assume this is your username or ID
  const currentUser = "BeeLucky";

  // Filter blogs to show only your own
  const myBlogs = blogs.filter((blog) => blog.author === currentUser);

  return (
    <div className="w-full text-5xl text-white flex items-center justify-center flex-col">
      <div className="mt-6 flex w-full justify-end "></div>
      <HistoryProfile />

      <div className="flex flex-col gap-5 mt-5 mb-20 ">
        {myBlogs.map((blog, idx) => (
          <div key={idx} className="shadow-lg">
            <CommunityBlog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

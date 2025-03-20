"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommunityBlog from "@/components/community/community_blog";
import CommunitySearchBar from "@/components/community/community_search_bar";
import { CommunityTag, ClickableTag } from "@/components/community/community_tag";
import { Tag, Blog, tags } from "../../../../interface";
import create_post from "@public/images/CreatePost.svg";
import Image from "next/image";
import getBlogs from "@/libs/getBlogs";

export default function page() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOthers, setShowOthers] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>();

  // Sample blogs data for demonstration
  // const blogs: Blog[] = [
  //   {
  //     id: "0",
  //     title: "Title 1",
  //     author: "BeeLucky",
  //     likes: 100,
  //     comments_count: 12305,
  //     tags: ["ความรัก", "การเงิน"],
  //     created_at: "2021-12-22",
  //     updated_at: "2025-11-20",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     id: "1",
  //     title: "Title 2",
  //     author: "Author 2",
  //     likes: 50,
  //     comments_count: 1205,
  //     tags: ["การเงิน", "สุขภาพ"],
  //     created_at: "2022-01-15",
  //     updated_at: "2025-10-10",
  //     content:
  //       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   },
  //   {
  //     id: "3",
  //     title: "Title 3",
  //     author: "Author 3",
  //     likes: 75,
  //     comments_count: 8050,
  //     tags: ["สุขภาพ", "อาหาร"],
  //     created_at: "2022-02-05",
  //     updated_at: "2025-09-25",
  //     content:
  //       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  //   },
  //   {
  //     id: "4",
  //     title: "Other Blog",
  //     author: "BeeLucky",
  //     likes: 30,
  //     comments_count: 420,
  //     tags: ["ท่องเที่ยว"], // This tag is not in the predefined list
  //     created_at: "2022-03-10",
  //     updated_at: "2025-08-15",
  //     content: "This blog has tags that aren't in the predefined tag list.",
  //   },
  // ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getBlogs();
        console.log(blogs);
        setBlogs(blogs);
        // Remove the alert as it's not needed and disruptive to UX
      } catch (error) {
        console.error("Error getting blogs", error);
        // Consider using a toast notification instead of an alert
        // or setting an error state to display in the UI
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array so it only runs once on component mount

  // Get all predefined tag names
  const predefinedTagNames = tags.map((tag) => tag.name);

  // Function to check if a blog has any tags not in the predefined list
  const hasOtherTags = (blog: Blog): boolean => {
    return blog.tags.some((tag) => !predefinedTagNames.includes(tag));
  };

  // Handle tag selection
  const handleTagSelection = (tag: Tag, isSelected: boolean) => {
    if (tag.name === "อื่นๆ") {
      // Handle the "Others" tag specially
      setShowOthers(isSelected);
      return;
    }

    if (isSelected) {
      // Add the tag to selected tags
      setSelectedTags((prev) => [...prev, tag]);
      // Turn off "Others" filter when selecting specific tags
      setShowOthers(false);
    } else {
      // Remove the tag from selected tags
      setSelectedTags((prev) => prev.filter((t) => t.name !== tag.name));
    }
  };

  // Filter blogs based on selected tags, search query, and "Others" filter
  const filterBlogs = (blogs: Blog[]): Blog[] => {
    return blogs.filter((blog) => {
      // If the "Others" filter is active, only show blogs with tags not in the predefined list
      if (showOthers) {
        return hasOtherTags(blog) && matchesSearch(blog);
      }

      // If no tags are selected, include all blogs (except "Others" if not selected)
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => blog.tags.includes(selectedTag.name));

      return matchesTags && matchesSearch(blog);
    });
  };

  // Function to check if a blog matches the search query
  const matchesSearch = (blog: Blog): boolean => {
    return (
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get filtered blogs
  if (!blogs) return null;
  const filteredBlogs = filterBlogs(blogs);

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Create an "Others" tag
  const othersTag: Tag = { name: "อื่นๆ", color: "blue" };

  // Handle create post button click
  const handleCreatePostClick = () => {
    router.push("/homepage/community/create");
  };

  if (!blogs) return null;

  return (
    <div className="w-full sm:mt-20">
      <div className="w-full text-5xl text-white flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-2 h-full mb-2">
          <CommunitySearchBar onSearch={handleSearchChange} />
          <div className="cursor-pointer" onClick={handleCreatePostClick}>
            <Image src={create_post} alt="Create Post" />
          </div>
        </div>

        <div className="w-full overflow-x-auto flex flex-row gap-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none]">
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex flex-row gap-2 min-w-max">
            {tags.map((tag) => (
              <ClickableTag
                key={tag.name}
                tag={tag}
                onSelect={(tag, isSelected) => handleTagSelection(tag, isSelected)}
              />
            ))}
            {/* Add the "Others" tag */}
            <ClickableTag
              key="others"
              tag={othersTag}
              onSelect={(tag, isSelected) => handleTagSelection(tag, isSelected)}
            />
          </div>
        </div>
        <section className="flex flex-col gap-5 mb-[10vh] mt-5">
          {filteredBlogs.map((blog, index) => (
            <CommunityBlog key={index} blog={blog} />
          ))}
        </section>
      </div>
    </div>
  );
}

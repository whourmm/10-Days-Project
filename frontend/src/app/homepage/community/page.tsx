"use client";

import { useState } from "react";

import CommunityBlog from "@/components/community_blog";
import CommunitySearchBar from "@/components/community_search_bar";
import { CommunityTag, ClickableTag } from "@/components/community_tag";
import { Tag, Blog, tags } from "../../../../interface";

export default function page() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOthers, setShowOthers] = useState<boolean>(false);

  // Sample blogs data for demonstration
  const blogs: Blog[] = [
    {
      title: "Title 1",
      author: "Author 1",
      likes: 100,
      comments_count: 12305,
      tags: ["ความรัก", "การเงิน"],
      created_at: "2021-12-22",
      updated_at: "2025-11-20",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Title 2",
      author: "Author 2",
      likes: 50,
      comments_count: 1205,
      tags: ["การเงิน", "สุขภาพ"],
      created_at: "2022-01-15",
      updated_at: "2025-10-10",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Title 3",
      author: "Author 3",
      likes: 75,
      comments_count: 8050,
      tags: ["สุขภาพ", "อาหาร"],
      created_at: "2022-02-05",
      updated_at: "2025-09-25",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      title: "Other Blog",
      author: "Author 4",
      likes: 30,
      comments_count: 420,
      tags: ["ท่องเที่ยว"], // This tag is not in the predefined list
      created_at: "2022-03-10",
      updated_at: "2025-08-15",
      content: "This blog has tags that aren't in the predefined tag list.",
    },
  ];

  // Get all predefined tag names
  const predefinedTagNames = tags.map((tag) => tag.name);

  // Function to map tag names to tag objects with colors
  // const mapTagsWithColors = (tagNames: string[]): Tag[] => {
  //   return tagNames.map((tagName) => {
  //     // Find matching tag from the tags array
  //     const matchedTag = tags.find((t) => t.name === tagName);
  //     // Return the matched tag or create a default one if not found
  //     return matchedTag || { name: tagName, color: "gray" };
  //   });
  // };

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
  const filteredBlogs = filterBlogs(blogs);

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Create an "Others" tag
  const othersTag: Tag = { name: "อื่นๆ", color: "blue" };

  return (
    <div className="w-full sm:mt-20">
      <div className="w-full p-5 text-5xl text-white flex flex-col items-center justify-center">
        <CommunitySearchBar onSearch={handleSearchChange} />
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

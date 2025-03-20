"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CommunityTag, ClickableTag } from "@/components/community/community_tag";
import { Tag, tags } from "../../../interface";

export default function CreatePostPage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle tag selection
  const handleTagSelection = (tag: Tag, isSelected: boolean) => {
    if (isSelected) {
      // Add the tag to selected tags (limit to 3 tags)
      if (selectedTags.length < 3) {
        setSelectedTags((prev) => [...prev, tag]);
      }
    } else {
      // Remove the tag from selected tags
      setSelectedTags((prev) => prev.filter((t) => t.name !== tag.name));
    }
  };

  // Handle file selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle post creation
  const handleCreatePost = () => {
    // Here you would typically save the post to your backend
    // For now, we'll just navigate back to the community page
    router.push("/community");
  };

  return (
    <div className="flex flex-col h-screen bg-[#FFF9E5]">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => router.back()} className="mr-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xl font-medium flex-1 text-center">Create Post</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Tags */}
        <div className="mb-4">
          <label className="block mb-2">Tags :</label>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <CommunityTag
                key={tag.name}
                tag={tag}
                variant="on_post"
                onClick={() => handleTagSelection(tag, false)}
              />
            ))}
            <button
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
              onClick={() => document.getElementById("tag-selector")?.classList.toggle("hidden")}
            >
              <span>+</span>
            </button>
          </div>

          {/* Tag selector dropdown */}
          <div id="tag-selector" className="mt-2 p-2 border rounded-lg hidden">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <CommunityTag tag={tag} />
              ))}
            </div>
          </div>
        </div>

        {/* Image upload */}
        <div
          className="mb-4 h-64 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <div className="w-full h-full relative">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
            </div>
          ) : (
            <span className="text-gray-500">Click To Add Photo</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>

        {/* Text input */}
        <textarea
          className="w-full p-2 border rounded-lg"
          rows={5}
          placeholder="เขียนโพสต์..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Footer */}
      <div className="p-4">
        <button
          className="w-full py-3 bg-[#8B6D4F] text-white rounded-lg"
          onClick={handleCreatePost}
          disabled={!content.trim() && !imagePreview}
        >
          Post
        </button>
      </div>
    </div>
  );
}

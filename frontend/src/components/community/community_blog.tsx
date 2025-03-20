import { Blog, COLOR } from "../../../interface";
import User from "@public/images/User.svg";
import Image from "next/image";
import { Tag, tags } from "../../../interface";
import { CommunityTag } from "./community_tag";
import heart from "@public/images/Heart.svg";
import comment from "@public/images/Comment.svg";
import { useState, useRef, useEffect } from "react";

export default function CommunityBlog({ blog }: { blog: Blog }) {
  // State to control comment panel visibility
  const [showComments, setShowComments] = useState(false);
  // State to keep track of current comment index
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  const comments = [
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
    {
      author: "Arthor",
      text: "เย้ๆๆๆเสือโคร่งวินแต๋ว วาทกรรม แจ็กพ็อตติวเตอร์โอเปร่า เพียวแซลมอนทอม ธรรมาภิบาลหงวน หงวนรุสโซช็อค โพลารอยด์เช็กสตรอว์เบอร์รีรีดไถแช่แข็ง ไมเกรนเยอบีร่า ",
      likes: 100000,
    },
  ];

  // Function to get color for a specific tag name
  const getTagColor = (tagName: string): COLOR => {
    // Find matching tag from the tags array
    const matchedTag = tags.find((t) => t.name === tagName);
    // Return the matched tag color or a default if not found
    return matchedTag ? matchedTag.color : "gray";
  };

  // Function to handle comment icon click
  const handleCommentClick = () => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    setShowComments(true);
  };

  // Function to close comment panel
  const handleCloseComments = () => {
    document.body.style.overflow = "auto"; // Re-enable scrolling
    setShowComments(false);
  };

  // Update body overflow based on comments panel state
  useEffect(() => {
    document.body.style.overflow = showComments ? "hidden" : "auto";

    // Cleanup function to ensure body scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showComments]);

  return (
    <div className="text-black w-full h-full bg-white py-4 px-5 rounded-2xl relative">
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

      {blog.image_url ? (
        <div className="my-5 h-[30vh] ">
          <img src={blog.image_url} alt="" className="object-cover" />{" "}
        </div>
      ) : null}

      <div className="text-sm mt-5">{blog.content}</div>
      <div className="mt-3 flex justify-end text-sm">
        {/* <div className="flex gap-2 items-center text-vidva ">
          <Image src={heart} alt="heart" />
          <div className="">{blog.likes}</div>
          <div className="">Likes</div>
        </div> */}
        <div
          className="flex gap-2 items-center text-raw-umber cursor-pointer"
          onClick={handleCommentClick}
        >
          <Image src={comment} alt="comment" />
          {/* <div className="">{blog.comments_count}</div> */}
          <div className="">Comments</div>
        </div>
      </div>

      {/* Sliding Comments Panel with Fixed Header */}
      <div
        className={`fixed left-0 right-0 bottom-0 bg-[#FAF3E0] rounded-t-2xl shadow-lg transition-transform duration-300 transform ${
          showComments ? "translate-y-0" : "translate-y-full"
        } z-50 flex flex-col max-h-[90vh]`}
      >
        {/* Fixed Header and Input */}
        <div className="sticky top-0 bg-[#FAF3E0] p-5 border-b border-gray-200 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Comment</h3>
            <button onClick={handleCloseComments} className="text-md p-1">
              ✕
            </button>
          </div>

          {/* Comment input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Add a comment"
              className="flex-grow p-2 text-sm border rounded-lg mr-2"
            />
            <button className="bg-gray-200 p-2 rounded-lg">→</button>
          </div>
        </div>

        {/* Scrollable Comments Area */}
        <div className="overflow-y-auto p-5 pt-2 flex-grow">
          {comments && comments.length > 0 ? (
            <div>
              {comments.map((commentItem, index) => (
                <div key={index} className="mb-6 last:mb-2">
                  <div className="flex items-start">
                    <div className="mr-2">
                      <Image src={User} alt="user" width={24} height={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{commentItem.author}</p>
                      <p className="text-sm">{commentItem.text}</p>
                      <div className="flex items-center mt-1">
                        <Image src={heart} alt="heart" width={16} height={16} />
                        <span className="text-xs ml-1">{commentItem.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">No comments yet</div>
          )}
        </div>
      </div>

      {/* Overlay when comments are shown */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseComments} />
      )}
    </div>
  );
}

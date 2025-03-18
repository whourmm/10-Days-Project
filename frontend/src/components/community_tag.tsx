import { Tag } from "../../interface";

const colorMap: Record<string, string> = {
  pink: "#FF2D55",
  green: "#34C759",
  blue: "#34C759",
  orange: "#FF9500",
  yellow: "#FFCC00",
  purple: "#AF52DE",
};

export default function CommunityTag({ tag }: { tag: Tag }) {
  return (
    <div
      className="text-sm rounded-2xl px-3 py-[0.8vh] font-semibold"
      style={{
        color: hexToRgba(colorMap[tag.color] || "#CCCCCC", 1.0),
        backgroundColor: hexToRgba(colorMap[tag.color] || "#CCCCCC", 0.2), // Default to light gray if undefined
      }}
    >
      {tag.name}
    </div>
  );
}

// Function to convert hex to RGBA with opacity
function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace(/^#/, ""); // Remove #
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

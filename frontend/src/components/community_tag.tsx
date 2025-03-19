import React, { useState } from "react";
import { Tag, TagProps, TagVariant } from "../../interface";

// Define button variants

// Props for the main button component

// Props for the clickable wrapper

const colorMap: Record<string, string> = {
  pink: "#FF2D55",
  green: "#34C759",
  blue: "#007AFF",
  orange: "#FF9500",
  yellow: "#FFCC00",
  purple: "#AF52DE",
  red: "#FF3B30",
  gray: "#8E8E93",
};

interface ClickableTagProps {
  tag: Tag;
  initialVariant?: TagVariant;
  onSelect?: (tag: Tag, isSelected: boolean) => void;
  disabled?: boolean;
  className?: string;
}

// The base button component with switch case styling
export function CommunityTag({
  tag,
  variant = "default",
  onClick,
  disabled = false,
  className = "",
}: TagProps) {
  // Apply styles based on variant
  const getStyles = () => {
    const baseColor = colorMap[tag.color] || "#CCCCCC";

    const styles = {
      container: {
        color: "",
        backgroundColor: "",
        border: "",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transform: "",
        boxShadow: "",
      },
    };

    switch (variant) {
      case "select":
        styles.container.color = "#FFFFFF";
        styles.container.backgroundColor = baseColor;
        styles.container.transform = "scale(1.05)";
        styles.container.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        break;
      case "on_post":
        styles.container.color = baseColor;
        styles.container.backgroundColor = hexToRgba(baseColor, 0.2);
        break;

      default: // "default"
        styles.container.color = baseColor;
        styles.container.backgroundColor = "#FFFFFF";
        break;
    }

    return styles;
  };

  const styles = getStyles();

  return (
    <button
      className={`text-sm rounded-2xl px-4 py-[0.9vh] font-medium transition-all duration-200 ${className}`}
      style={styles.container}
      onClick={onClick}
      disabled={disabled}
    >
      {tag.name}
    </button>
  );
}

// The wrapper component that handles state
export function ClickableTag({
  tag,
  initialVariant = "default",
  onSelect,
  disabled = false,
  className = "",
}: ClickableTagProps) {
  const [variant, setVariant] = useState<TagVariant>(initialVariant);
  const [isSelected, setIsSelected] = useState(initialVariant === "select");

  const handleClick = () => {
    if (disabled) return;

    // Toggle between variants
    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);
    setVariant(newIsSelected ? "select" : "default");

    // Call the callback if provided
    if (onSelect) {
      onSelect(tag, newIsSelected);
    }
  };

  return (
    <CommunityTag
      tag={tag}
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      className={`hover:opacity-90 active:scale-95 ${className}`}
    />
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

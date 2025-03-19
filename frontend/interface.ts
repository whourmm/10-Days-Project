export interface Icon {
    src: string;
    src_click: string;
    alt: string;
    path: string;
  }
  
export interface Position {
    left: number;
    top: number;
  }

export interface Tag {
    name : string,
    color : COLOR
}

export const colorMap: Record<string, string> = {
  pink: "#FF2D55",
  green: "#34C759",
  blue: "#007AFF",
  orange: "#FF9500",
  yellow: "#FFCC00",
  purple: "#AF52DE",
  red: "#FF3B30",
  gray: "#8E8E93",
};

export interface ClickableTagProps {
  tag: Tag;
  initialVariant?: string;
  onSelect?: (tag: Tag, isSelected: boolean) => void;
}


export const tags: Tag[] = [
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

export interface TagProps {
  tag: Tag;
  variant?: TagVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export type TagVariant = "default" | "select" | "on_post";

export type COLOR  = 'pink' | 'green' | 'blue' | 'yellow' | 'purple' | 'red' | 'gray' | 'orange';


// Props for the clickable wrapper


export interface Blog {
    title : string,
    author : string,
    likes : number,
    comments_count : number,
    tags: Tag[],
    created_at : string,
    updated_at : string,
    content: string,

}
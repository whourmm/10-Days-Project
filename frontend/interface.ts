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
    color : string
}


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
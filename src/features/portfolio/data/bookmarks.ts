export type Bookmark = {
    bookmarkedAt: string;
    url: string;
    title: string;
    domain?: string;
    description?: string;
}

export const BOOKMARKS: Bookmark[] = []

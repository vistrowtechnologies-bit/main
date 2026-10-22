// Blog index paging, shared by the server pages and the client hub.
export const POSTS_PER_PAGE = 12;
// Page 1 shows the featured block (the newest post plus the next three) above the grid.
export const FEATURED_COUNT = 4;

export function blogPageCount(total: number) {
  return Math.max(1, Math.ceil(Math.max(0, total - FEATURED_COUNT) / POSTS_PER_PAGE));
}

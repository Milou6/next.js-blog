export function getSearchParamAsInt(page: string | null | undefined): number | undefined {
  return page ? parseInt(page) : undefined;
}

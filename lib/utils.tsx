export function getSearchParamAsInt(page: string | null | undefined): number | undefined {
  return page ? parseInt(page) : undefined;
}

export function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

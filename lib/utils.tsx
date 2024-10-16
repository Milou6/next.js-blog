export function getSearchParamAsInt(page: string | null | undefined): number | undefined {
  return page ? parseInt(page) : undefined;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(func: (...args: any[]) => unknown, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

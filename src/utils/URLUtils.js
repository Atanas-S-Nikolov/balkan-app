export function createQueryString(name, value, searchParams) {
  const params = searchParams ? new URLSearchParams(searchParams) : new URLSearchParams();
  params.set(name, value);
  return params.toString();
}

export const VIEW_TYPE_COOKIE = 'manga-view-type';

export function getViewTypeCookie(request: Request): 'card' | 'list' {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return 'card';

  const cookies = cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const viewType = cookies[VIEW_TYPE_COOKIE];
  return viewType === 'list' ? 'list' : 'card';
}

export function setViewTypeCookie(viewType: 'card' | 'list'): string {
  // 30日間有効なcookieを設定
  const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
  return `${VIEW_TYPE_COOKIE}=${viewType}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

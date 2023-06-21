export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const localStorageDarkModeKey = 'darkMode'

export const localStorageStyleKey = 'style'

export const containerMaxW = 'w-full mx-auto'

export const appTitle = 'Lbapp'

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitle} — ${appTitle}`

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const localStorageDarkModeKey = 'darkMode'

export const localStorageStyleKey = 'style'

export const containerMaxW = 'xl:max-w-full xl:mx-auto'

export const appTitle = 'Lbapp'

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitle} — ${appTitle}`

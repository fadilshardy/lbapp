import { Toaster } from '@/components/ui/toaster';
import { mdiBackburger, mdiForwardburger } from '@mdi/js';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import AsideMenu from '../components/AsideMenu';
import BaseIcon from '../components/BaseIcon';
import FooterBar from '../components/FooterBar';
import NavBar from '../components/NavBar';
import NavBarItemPlain from '../components/NavBarItemPlain';
import menuAside from '../menuAside';
import menuNavBar from '../menuNavBar';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { setUser } from '../stores/mainSlice';

type Props = {
  children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setUser({
        name: 'Fadil S Hardy',
        email: 'fadilshrdy@gmail.com',
        avatar: 'https://fadilshardy.vercel.app/avatar.svg',
      })
    );
  });

  const darkMode = useAppSelector((state) => state.style.darkMode);

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(true);

  const router = useRouter();

  const menuSidebar = menuAside();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false);
      setIsAsideLgActive(true);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events, dispatch]);

  const layoutAsidePadding = isAsideLgActive ? 'xl:pl-60' : '';

  return (
    <div className={`${darkMode ? 'dark' : ''} overflow-hidden lg:overflow-visible`}>
      <div
        className={`${layoutAsidePadding} ${
          isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
        } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
      >
        <NavBar
          menu={menuNavBar}
          className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
        >
          <NavBarItemPlain
            display="flex lg:hidden"
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <BaseIcon
              path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger}
              className="w-4 h-4"
            />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden lg:flex"
            onClick={() => setIsAsideLgActive(!isAsideLgActive)}
          >
            <BaseIcon
              path={isAsideLgActive ? mdiBackburger : mdiForwardburger}
              className="w-6 h-6"
            />
          </NavBarItemPlain>
        </NavBar>
        {isAsideLgActive && (
          <AsideMenu
            isAsideMobileExpanded={isAsideMobileExpanded}
            isAsideLgActive={isAsideLgActive}
            menu={menuSidebar}
            onAsideLgClose={() => setIsAsideMobileExpanded(false)}
          />
        )}

        {children}
        <Toaster />

        <FooterBar>
          Theme made by{' '}
          <a
            href="https://tailwind-react.justboil.me/dashboard"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            justboil.me
          </a>
        </FooterBar>
      </div>
    </div>
  );
}

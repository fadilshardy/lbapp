import { mdiBackburger, mdiForwardburger, mdiMenu } from '@mdi/js';
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
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://fadilshardy.vercel.app/avatar.svg',
      })
    );
  });

  const darkMode = useAppSelector((state) => state.style.darkMode);

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  const router = useRouter();

  const menuSidebar = menuAside();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false);
      setIsAsideLgActive(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events, dispatch]);

  const layoutAsidePadding = 'xl:pl-60';

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
            <BaseIcon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden lg:flex xl:hidden"
            onClick={() => setIsAsideLgActive(true)}
          >
            <BaseIcon path={mdiMenu} size="24" />
          </NavBarItemPlain>
        </NavBar>
        <AsideMenu
          isAsideMobileExpanded={isAsideMobileExpanded}
          isAsideLgActive={isAsideLgActive}
          menu={menuSidebar}
          onAsideLgClose={() => setIsAsideLgActive(false)}
        />
        {children}
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

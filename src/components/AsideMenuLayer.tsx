import { appTitle } from '@config';
import { MenuAsideItem } from '@interfaces';
import { mdiClose, mdiLogout } from '@mdi/js';
import { useAppSelector } from '@stores/hooks';
import React from 'react';
import AsideMenuItem from './AsideMenuItem';
import AsideMenuList from './AsideMenuList';
import BaseIcon from './BaseIcon';

type Props = {
  menu: MenuAsideItem[];
  className?: string;
};

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const asideStyle = useAppSelector((state) => state.style.asideStyle);
  const asideBrandStyle = useAppSelector((state) => state.style.asideBrandStyle);
  const asideScrollbarsStyle = useAppSelector((state) => state.style.asideScrollbarsStyle);
  const darkMode = useAppSelector((state) => state.style.darkMode);

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  };

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <aside
      className={`${className} w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div className={` flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}>
        <div
          className={`flex flex-row h-14 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="font-black">{appTitle}</b>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <BaseIcon path={mdiClose} className="w-4 h-4" />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden no-scrollbar ${
            darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  );
}

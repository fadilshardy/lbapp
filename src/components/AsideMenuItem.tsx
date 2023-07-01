import { mdiMinus, mdiPlus } from '@mdi/js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getButtonColor } from '../colors';
import { MenuAsideItem } from '../interfaces';
import { useAppSelector } from '../stores/hooks';
import AsideMenuList from './AsideMenuList';
import BaseIcon from './BaseIcon';

type Props = {
  item: MenuAsideItem;
  isDropdownList?: boolean;
};

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const asideMenuItemStyle = useAppSelector((state) => state.style.asideMenuItemStyle);
  const asideMenuDropdownStyle = useAppSelector((state) => state.style.asideMenuDropdownStyle);
  const asideMenuItemActiveStyle = useAppSelector((state) => state.style.asideMenuItemActiveStyle);

  const activeClassAddon = !item.color && isLinkActive ? asideMenuItemActiveStyle : '';

  const { asPath, isReady } = useRouter();

  useEffect(() => {
    if (item.href && isReady) {
      const linkPathName = new URL(item.href, location.href).pathname;

      const activePathname = new URL(asPath, location.href).pathname;

      setIsLinkActive(linkPathName === activePathname);
    }
  }, [item.href, isReady, asPath]);

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <div className="w-8 ml-2">
          <BaseIcon path={item.icon} className={`h-4 w-4 ${activeClassAddon}`} />
        </div>
      )}
      <span
        className={`grow text-ellipsis line-clamp-1 text-sm ${
          item.menu ? '' : 'pr-12'
        } ${activeClassAddon}`}
      >
        {item.label}
      </span>
      {item.menu && (
        <div className="mr-2">
          <BaseIcon
            path={isDropdownActive ? mdiMinus : mdiPlus}
            className={`h-4 w-4 ${activeClassAddon}`}
          />
        </div>
      )}
    </>
  );

  const componentClass = [
    'flex cursor-pointer ',
    isDropdownList ? 'py-3 px-6 text-sm ' : 'py-3',
    item.color
      ? getButtonColor(item.color, false, true)
      : `${asideMenuItemStyle} dark:text-slate-300 dark:hover:text-white`,
  ].join(' ');

  return (
    <li>
      {item.href && (
        <Link href={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {!item.href && (
        <div className={componentClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`${asideMenuDropdownStyle} ${
            isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden'
          }`}
          isDropdownList
        />
      )}
    </li>
  );
};

export default AsideMenuItem;

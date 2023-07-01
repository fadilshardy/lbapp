import { MenuAsideItem } from '../interfaces';
import AsideMenuLayer from './AsideMenuLayer';

type Props = {
  menu: MenuAsideItem[];
  isAsideMobileExpanded: boolean;
  isAsideLgActive: boolean;
  onAsideLgClose: () => void;
};

export default function AsideMenu({
  isAsideMobileExpanded = false,
  isAsideLgActive = false,
  ...props
}: Props) {
  return (
    <>
      <AsideMenuLayer
        menu={props.menu}
        className={`${isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0'} ${
          !isAsideLgActive ? 'lg:hidden xl:flex' : ''
        }`}
      />
    </>
  );
}

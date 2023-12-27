import { containerMaxW } from '@config';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className="block md:flex items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <b>
            &copy;{year}
            {` `}
          </b>
          {` `}
          {children}
        </div>
        <div className="md:py-2">
        </div>
      </div>
    </footer>
  );
}

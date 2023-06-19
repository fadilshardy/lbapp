import { containerMaxW } from '@config';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function SectionMain({ children }: Props) {
  return <section className={`p-6 ${containerMaxW}`}>{children}</section>;
}

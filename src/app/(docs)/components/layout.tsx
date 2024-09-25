import { sidebarItemsData } from '@/constants/sidebarItemsData';
import Layout from '../../_components/layout';
import Sidebar from '../../_components/sidebar';

type Props = {
  children: React.ReactNode;
};

export default function ComponentsLayout({ children }: Props) {
  return <Layout sidebar={<Sidebar items={sidebarItemsData} />} children={children} />;
}

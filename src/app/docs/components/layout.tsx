import Layout from '../../_components/layout';
import Sidebar from '../../_components/sidebar';
import { docsConfig } from '@/config/docs';

type Props = {
  children: React.ReactNode;
};

export default function ComponentsLayout({ children }: Props) {
  return (
    <Layout
      sidebar={<Sidebar config={docsConfig} />}
      children={children}
    // toc={<TableOfContents />}
    />
  );
}

export function getBannerExampleCode(state: Record<string, any>)  {
    const { variant, position, size, title, icon, link, showArrow, dismissible } = state;

    return `import { Banner } from '@/components/extendui/banner';

export function BannerDemo() {
  return (
    <Banner
      variant={'${variant}'}
      position={'${position}'}
      size={'${size}'}
      title={'${title}'}
      icon={${icon}}
      link={'${link}'}
      showArrow={${showArrow}}
      dismissible={${dismissible}}
    />
  );
}`;
}

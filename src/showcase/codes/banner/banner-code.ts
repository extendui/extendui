export function getBannerExampleCode(state: Record<string, any>) {
  const { variant, position, size, title, icon, link } = state;

  return `import { Banner } from '@/components/extendui/banner';

export function BannerDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border">
     <Banner
        variant={'${variant}'}
        position={'${position}'}
        size={'${size}'}
        link={'${link}'}
      >
        <Banner.Description position="center">
          <div className="flex justify-center items-center">
            ${icon} ${title}
          </div>
        </Banner.Description>
        <Banner.Dismiss />
      </Banner>
      <div className="flex h-full min-h-[150px] items-center justify-center"/>
    </div>
  );
}`;
}

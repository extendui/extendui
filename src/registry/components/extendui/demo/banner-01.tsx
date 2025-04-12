import { Banner } from '@/components/extendui/banner';

export function BannerDemo() {
  return (
    <Banner variant={'default'} position={'top'} size={'default'} link="#">
      <Banner.Description position="center">
        <div className="flex items-center justify-center gap-2">
          <div>🚀</div>
          Banner component
        </div>
      </Banner.Description>
      <Banner.Dismiss />
    </Banner>
  );
}

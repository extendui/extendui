import SchowcaseSection from './_components/components-showcase-section';
import FeaturesSection from './_components/features-section';
import HeroSection from './_components/hero-section';
import InputShowcaseSection from './_components/input-showcase-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <InputShowcaseSection />
      <SchowcaseSection />
    </main>
  );
}

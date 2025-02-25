import FadeUp from '@/components/fadeup';
import PricingTable from '@/components/pricing-table';

export default function PricingPage() {
  return (
    <main>
      <section id="pricing" className="space-y-4">
        <div className="min-h-dvh md:space-y-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4 px-8 py-[18dvh] text-center">
            <div className="relative mx-auto max-w-2xl text-center lg:max-w-4xl">
              <FadeUp delay={0.2} duration={0.8}>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  Transforming Ideas Into
                  <br></br>
                  <span className="relative z-10 bg-linear-to-t from-emerald-600 to-emerald-600/[0.8] bg-clip-text text-transparent dark:text-white">
                    Powerful {''}
                  </span>
                  Software Solutions
                </h1>
              </FadeUp>
              <FadeUp delay={0.4} duration={0.8}>
                <p className="mx-2 my-6 max-w-2xl text-base font-light tracking-tight dark:text-zinc-300 sm:text-xl">
                  From individual elements to entire sites built to your
                  specifications—transparent pricing with no hidden fees.
                </p>
              </FadeUp>
              <div className="gradient pointer-events-none absolute inset-0 -z-10 block opacity-30 blur-3xl"></div>
            </div>
            <PricingTable />
          </div>
        </div>
      </section>
    </main>
  );
}

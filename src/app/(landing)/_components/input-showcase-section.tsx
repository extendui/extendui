import FadeUp from '@/components/fadeup';

export default function InputShowcaseSection() {
  return (
    <section id="input-showcase" className="container mx-auto max-w-7xl px-4 py-16">
      <FadeUp delay={0.1} duration={0.8}>
        <h2 className="mb-8 text-center text-3xl font-bold">Simplify Your UI</h2>
      </FadeUp>
      <FadeUp delay={0.1} duration={0.8}>
        <p className="mt-6 max-w-2xl text-center mx-auto text-base font-light tracking-tight dark:text-zinc-300 sm:text-xl">
          Effortlessly build stunning, flexible interfaces with our UI library—powered by compound components to make everything simpler and more composable.
        </p>
      </FadeUp>
      <FadeUp delay={0.1} duration={0.8}>
        <div className="relative rounded-lg  mx-auto mt-16 max-w-3xl">
          <div className="group relative z-10 rounded-x">
            <video
              autoPlay
              loop
              playsInline
              preload="auto"
              muted
              className="rounded-md border transition-all duration-200 ease-out"
            >
              <source
                src={
                  "https://toczmji9rl.ufs.sh/f/zGi357RvYr0HOHiDhT3fduPnrcqNlRhjxIi1CkH4WzaDQeMt"
                }
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

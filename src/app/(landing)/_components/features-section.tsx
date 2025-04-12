import { Globe, Recycle, Zap } from 'lucide-react';

import FadeUp from '@/components/fadeup';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Recycle,
    title: 'Reusable Components',
    description:
      'Build your UI faster with our pre-built, customizable components.',
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description:
      'Enjoy improved application performance with our optimized component library.',
  },
  {
    icon: Globe,
    title: 'Easy Integration',
    description:
      'Seamlessly integrate with your existing React and Next.js projects.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto max-w-7xl px-4 py-16">
      <FadeUp delay={0.1} duration={0.8}>
        <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
      </FadeUp>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FadeUp key={feature.title} delay={0.2 + index * 0.2} duration={0.8}>
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <feature.icon className="text-accent-foreground h-12 w-12" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

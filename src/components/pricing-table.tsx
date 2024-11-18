import PricingCard from './extendui/pricing-card';

export default function PricingTable() {
  const pricingPlans = [
    {
      title: 'Existing Components',

      description:
        'Access our library of pre-built components to kickstart your project. Perfect for developers and hobbyists looking to explore and learn.',
      buttonText: 'Browse Components',
      href: '/docs/components/button',
      features: [
        'Access to a growing library of pre-built components to kickstart your project',
        'React / Next.js / Tailwind CSS code provided',
        'Serves a wide range of users and audiences',
        'MIT License for personal or commercial projects',
        'Direct chat support available',
      ],
      price: 'Free',
      interval: '',
      priceTagline: 'lifetime access',
    },
    {
      title: 'Custom Components',
      description:
        'Get bespoke components designed and developed to fit your specific needs. Ideal for businesses wanting to enhance their existing websites.',
      buttonText: 'Contact Us',
      features: [
        'Bespoke components designed and developed to your specific needs',
        'React / Next.js / Tailwind CSS code provided',
        'Design and development services',
        'Unlimited revisions',
        '24-hour support response time',
        'Private communication channel',
        '4-7 day turnaround time',
        'Pause or cancel anytime',
      ],
      price: '$1499',
      interval: '/mo',
      priceTagline: 'pause or cancel anytime',
    },
    {
      title: 'Pages',

      description:
        'Full-page designs and development for a complete web presence. Perfect for startups and small businesses launching their online platform.',
      buttonText: 'Contact Us',
      features: [
        'Full-page designs and development for a complete web presence',
        'One request / page at a time',
        'React / Next.js / Tailwind CSS code provided',
        'Design and development services',
        'Unlimited revisions',
        'Search Engine Optimization',
        '24-hour support response time',
        'Private communication channel',
        '7-10 day turnaround time',
        'Pause or cancel anytime',
      ],
      price: '$2899',
      interval: '/mo',
      priceTagline: 'pause or cancel anytime',
      featured: true,
    },
    {
      title: 'Multi Page Website',
      description:
        'Comprehensive website development including advanced features and integrations. Ideal for established businesses seeking a robust online solution.',
      buttonText: 'Contact Us',
      features: [
        'Comprehensive website development including advanced features and integrations',
        'Multi-page landing page website',
        'Web Apps and SaaS Development',
        'AI Apps development',
        'Design and development services',
        '24-hour support response time',
        'Private communication channel',
        'Unlimited revisions',
        'Negotiable delivery time',
      ],
      price: '$9,999',
      interval: '',
      priceTagline: 'starts at',
    },
  ];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-4">
      {pricingPlans.map((plan) => (
        <PricingCard plan={plan} key={plan.title} />
      ))}
    </div>
  );
}

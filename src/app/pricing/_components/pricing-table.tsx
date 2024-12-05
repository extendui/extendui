import PricingCard02 from '../../../components/extendui/pricing-card';

export default function PricingTable() {
  const pricingPlans = [
    {
      title: 'Custom Components',
      description:
        'Get bespoke components designed and developed to fit your specific needs. Ideal for businesses wanting to enhance their existing websites.',
      buttonText: 'Contact Us',
      features: [
        'Bespoke components designed and developed to your specific needs',
        'React / Next.js / Tailwind CSS code provided',
        'Design and development services',
        '24-hour support response time',
        '4-7 day turnaround time',
        'Pause or cancel anytime',
      ],
      price: '499',
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
        'Search Engine Optimization',
        '24-hour support response time',
        '7-10 day turnaround time',
        'Pause or cancel anytime',
      ],
      price: '1899',
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
      price: 'Custom',
      interval: '',
      priceTagline: 'Let us know your needs',
    },
  ];

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
      {pricingPlans.map((plan) => (
        <PricingCard02 plan={plan} key={plan.title} />
      ))}
    </div>
  );
}

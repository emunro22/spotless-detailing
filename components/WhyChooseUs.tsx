'use client';

import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, Truck, Award, Clock, Wrench } from 'lucide-react';
import { SectionHeader } from './Services';

const FEATURES = [
  {
    icon: Truck,
    title: 'Fully mobile across Glasgow',
    body: 'Your driveway, your office, your spot. We arrive self-sufficient — water, power, every cloth, every product.',
  },
  {
    icon: Droplets,
    title: 'Two-bucket safe wash',
    body: 'Prewash, snow foam, two-bucket method. No swirl marks. No grit. The way it should always be done.',
  },
  {
    icon: ShieldCheck,
    title: 'Ceramic-grade protection',
    body: 'Hydrophobic ceramic sealant on every detail. Beads water, repels dirt, makes future washes faster.',
  },
  {
    icon: Wrench,
    title: 'Pro tools, not supermarket kit',
    body: 'Steam machines, extractors, dual-action polishers, plush microfibres. The right tool for every panel.',
  },
  {
    icon: Award,
    title: 'Showroom-level finish',
    body: 'We treat every car like our own — Range Rovers, Teslas, daily runabouts. Same standard.',
  },
  {
    icon: Clock,
    title: 'On-time, every time',
    body: 'Slot booked is slot honoured. Real arrival window, real updates. Glasgow tradesman, not a no-show.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Why Spotless"
          title={
            <>
              Detailing that holds up to the{' '}
              <span className="gradient-text italic">closest look.</span>
            </>
          }
          subtitle="No supermarket valets. No corner-cutting. The methods, products and care your car actually deserves."
        />

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl glass border-gradient p-7 hover:border-cyan/30 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan/15 to-cyan/5 border border-cyan/20 flex items-center justify-center mb-5 group-hover:shadow-glow-cyan transition-all">
                <feature.icon className="w-5 h-5 text-cyan" strokeWidth={1.6} />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-cream mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-cream/65 leading-relaxed">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { CalendarCheck, MapPin, Sparkles, ThumbsUp } from 'lucide-react';
import { SectionHeader } from './Services';

const STEPS = [
  {
    icon: CalendarCheck,
    n: '01',
    title: 'Book your slot',
    body: 'Pick a service and a time that suits you. We confirm a fixed quote — no surprises on the day.',
  },
  {
    icon: MapPin,
    n: '02',
    title: 'We come to you',
    body: 'Driveway, car park or workplace. We bring water, power, kit and pro-grade products. You don\'t lift a finger.',
  },
  {
    icon: Sparkles,
    n: '03',
    title: 'Spotless treatment',
    body: 'Safe wash, deep interior steam clean, paint decontamination, ceramic sealant — to a standard you\'ll feel as soon as you step in.',
  },
  {
    icon: ThumbsUp,
    n: '04',
    title: 'Walk-around & pay',
    body: 'We walk you around the finished car. Pay by card or transfer when you\'re happy. Maintenance plan customers get priority next time.',
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-32 bg-midnight-900">
      <div className="absolute inset-0 hex-overlay opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="How it works"
          title={
            <>
              Four steps. Zero hassle.{' '}
              <span className="gradient-text italic">One spotless car.</span>
            </>
          }
          subtitle="Booking is simple. Our service is meticulous. Your experience should feel that way too."
        />

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group"
            >
              <div className="relative h-full rounded-2xl glass border-gradient p-6 md:p-7 hover:border-cyan/30 transition-all">
                <div className="flex items-start justify-between mb-7">
                  <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-cyan" strokeWidth={1.6} />
                  </div>
                  <span className="font-display text-3xl font-bold text-cream/10 group-hover:text-cyan/30 transition-colors">
                    {step.n}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-cream/65 leading-relaxed">
                  {step.body}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-cyan/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

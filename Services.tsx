import { useEffect, useRef, useState } from 'react';
import { Stethoscope, FillDrip, Scissors, AlignCenter, Sparkles, Droplets, CircleDot, Crown, Plug, ChevronRight } from 'lucide-react';

const services = [
  { icon: Stethoscope, title: 'Dental Consultation', description: 'Comprehensive exams & personalized treatment plans tailored to your needs.' },
  { icon: FillDrip, title: 'Fillings & Root Canal', description: 'Stop pain and save natural teeth with our advanced procedures.' },
  { icon: Scissors, title: 'Extractions & Minor Surgery', description: 'Safe, gentle procedures with quick recovery times.' },
  { icon: AlignCenter, title: 'Braces & Alignment', description: 'Straighten smiles with modern orthodontic solutions.' },
  { icon: Sparkles, title: 'Teeth Whitening', description: 'Brighten your smile in just one visit with professional care.' },
  { icon: Droplets, title: 'Dental Cleaning (FMS)', description: 'Professional cleaning for healthy gums and fresh breath.' },
  { icon: CircleDot, title: 'Partial & Complete Dentures', description: 'Custom-fitted dentures for a natural, comfortable fit.' },
  { icon: Crown, title: 'Crown & Bridge', description: 'Restore damaged teeth and replace missing ones seamlessly.' },
  { icon: Plug, title: 'Dental Implants', description: 'Replace missing teeth with lasting, natural-looking results.' },
];

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative w-full py-20 lg:py-28 bg-warm-sand">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 lg:mb-16">
          <div>
            <span className="font-label text-xs text-clinical-red uppercase tracking-[0.12em] mb-2 block">What We Offer</span>
            <h2 className="font-display font-bold text-text-primary leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}>Our Services</h2>
          </div>
          <button className="flex items-center gap-2 text-clinical-red font-medium hover:gap-3 transition-all text-sm">
            View all services <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.has(index);
            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative bg-white rounded-card p-6 lg:p-8 shadow-soft-sm hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="absolute -top-3 -right-3 w-14 h-14 bg-clinical-red rounded-full flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="pr-8">
                  <h3 className="font-display font-semibold text-text-primary text-lg lg:text-xl mb-3">{service.title}</h3>
                  <p className="font-body text-text-secondary text-sm lg:text-base leading-relaxed">{service.description}</p>
                </div>
                <div className="absolute bottom-6 left-6 w-8 h-0.5 bg-clinical-red/20 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-clinical-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

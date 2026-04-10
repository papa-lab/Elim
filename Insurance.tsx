import { useEffect, useRef, useState } from 'react';
import { Shield, Check } from 'lucide-react';

const insurancePartners = [
  { name: 'AAR Insurance', abbr: 'AAR' },
  { name: 'CIC Group', abbr: 'CIC' },
  { name: 'Kenbright', abbr: 'KEN' },
  { name: 'Cigna', abbr: 'CIG' },
  { name: 'UAP', abbr: 'UAP' },
];

const Insurance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="insurance" className="relative w-full py-20 lg:py-28 bg-warm-sand">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={`text-center max-w-2xl mx-auto mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-white rounded-pill px-4 py-2 shadow-soft-sm mb-6">
            <Shield className="w-4 h-4 text-clinical-red" />
            <span className="font-label text-xs text-text-secondary uppercase tracking-wider">Insurance Accepted</span>
          </div>
          <h2 className="font-display font-bold text-text-primary leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}>We Accept Your Insurance</h2>
          <p className="font-body text-text-secondary text-base lg:text-lg">We work with major providers to keep your visit simple and stress-free.</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {insurancePartners.map((partner, index) => (
            <div key={index} className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="bg-white rounded-card px-8 py-6 lg:px-10 lg:py-8 shadow-soft-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-clinical-red/10 rounded-full flex items-center justify-center group-hover:bg-clinical-red transition-colors">
                    <span className="font-display font-bold text-clinical-red group-hover:text-white text-sm transition-colors">{partner.abbr}</span>
                  </div>
                  <span className="font-display font-semibold text-text-primary text-sm lg:text-base">{partner.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 lg:mt-16 flex flex-wrap justify-center gap-4 lg:gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.5s' }}>
          {['Direct Billing', 'Cash Payments', 'Mobile Money'].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-clinical-red rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="font-body text-text-secondary text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insurance;

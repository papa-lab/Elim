import { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WorkingHours = () => {
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
    <section ref={sectionRef} id="hours" className="relative w-full py-20 lg:py-28 bg-warm-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className={`bg-white rounded-card-lg p-8 lg:p-10 shadow-soft transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-clinical-red/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-clinical-red" />
              </div>
              <h2 className="font-display font-bold text-text-primary text-2xl lg:text-3xl">Working Hours</h2>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-warm-sand">
                <span className="font-body text-text-primary font-medium">Monday – Saturday</span>
                <span className="font-display font-semibold text-clinical-red">7:30 AM – 6:00 PM</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-body text-text-primary font-medium">Sunday</span>
                <span className="font-display font-semibold text-clinical-red">10:00 AM – 4:00 PM</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-warm-sand">
              <p className="font-label text-xs text-text-secondary uppercase tracking-wider mb-3">Need urgent care?</p>
              <a href="tel:0712662293" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-clinical-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-label text-xs text-text-secondary">Call us</p>
                  <p className="font-display font-semibold text-text-primary group-hover:text-clinical-red transition-colors">0712 662 293</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '0.15s' }}>
            <div className="bg-white rounded-card-lg overflow-hidden shadow-soft">
              <div className="p-6 lg:p-8 border-b border-warm-sand">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-clinical-red/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-clinical-red" />
                  </div>
                  <h2 className="font-display font-bold text-text-primary text-2xl lg:text-3xl">Our Location</h2>
                </div>
                <p className="font-body text-text-secondary leading-relaxed">
                  Macjo Arcade (behind Cleanshelf Supermarket),<br />
                  3rd Floor, Rooms 9D & 10D, Ongata Rongai, Kenya
                </p>
              </div>
              
              <div className="relative h-[300px] lg:h-[350px] bg-warm-sand">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8186!2d36.7667!3d-1.3964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f0f1e3e1e3e1e%3A0x1e3e1e3e1e3e1e3e!2sMacjo%20Arcade%2C%20Ongata%20Rongai!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Elim Dental Clinic Location" className="absolute inset-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10">
                  <div className="relative">
                    <div className="w-12 h-12 bg-clinical-red rounded-full flex items-center justify-center shadow-soft animate-bounce">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-clinical-red rotate-45" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 lg:p-8 flex flex-col sm:flex-row gap-4">
                <a href="https://www.google.com/maps/dir/?api=1&destination=Macjo+Arcade+Ongata+Rongai+Kenya" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill py-5">
                    <Navigation className="w-5 h-5 mr-2" />Get Directions
                  </Button>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Macjo+Arcade+Ongata+Rongai+Kenya" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full border-2 border-text-primary/20 text-text-primary hover:bg-text-primary hover:text-white rounded-pill py-5">
                    <MapPin className="w-5 h-5 mr-2" />Open in Maps
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;

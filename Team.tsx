import { useEffect, useRef, useState } from 'react';
import { Calendar, Award, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Team = () => {
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

  const stats = [
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: Users, value: '5000+', label: 'Happy Patients' },
    { icon: Heart, value: '100%', label: 'Patient Care' },
  ];

  return (
    <section ref={sectionRef} id="team" className="relative w-full py-20 lg:py-28 bg-warm-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="relative w-full lg:w-1/2 h-[500px] lg:h-[600px]">
            <div className={`absolute left-0 lg:left-[5%] top-[10%] w-[55%] lg:w-[45%] aspect-[3/4] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="w-full h-full rounded-pill overflow-hidden shadow-soft">
                <img src="/images/team-portrait-back.jpg" alt="Dental professional" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className={`absolute right-0 lg:right-[10%] top-0 w-[60%] lg:w-[50%] aspect-[3/4] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-28'}`} style={{ transitionDelay: '0.15s' }}>
              <div className="w-full h-full rounded-pill overflow-hidden shadow-soft-lg">
                <img src="/images/team-portrait-front.jpg" alt="Lead dentist" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-clinical-red text-white px-5 py-3 rounded-pill shadow-soft">
                <p className="font-display font-bold text-lg">10+ Years</p>
                <p className="font-label text-xs uppercase tracking-wider opacity-90">Experience</p>
              </div>
            </div>
          </div>
          
          <div className={`flex-1 max-w-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{ transitionDelay: '0.2s' }}>
            <span className="font-label text-xs text-clinical-red uppercase tracking-[0.12em] mb-3 block">Meet Our Team</span>
            <h2 className="font-display font-bold text-text-primary leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}>
              Experienced,<br /><span className="text-clinical-red">Gentle Care</span>
            </h2>
            <p className="font-body text-text-secondary leading-relaxed text-base lg:text-lg mb-8">
              Our team combines modern techniques with a calm, patient-first approach—so you feel heard, not rushed. We believe in creating a comfortable environment where every patient receives personalized attention.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-4 bg-warm-sand/50 rounded-card">
                    <Icon className="w-5 h-5 text-clinical-red mx-auto mb-2" />
                    <p className="font-display font-bold text-text-primary text-lg lg:text-xl">{stat.value}</p>
                    <p className="font-label text-xs text-text-secondary uppercase tracking-wider">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill px-8 py-6 text-base font-medium shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-0.5">
                  <Calendar className="w-5 h-5 mr-2" />Book an Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">Book an Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input placeholder="Your Name" className="rounded-card" />
                  <Input placeholder="Phone Number" className="rounded-card" />
                  <Textarea placeholder="Message (optional)" className="rounded-card" />
                  <Button className="w-full bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill">Request Appointment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

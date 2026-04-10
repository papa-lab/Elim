import { useEffect, useRef, useState } from 'react';
import { Phone, MessageCircle, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute;
      
      let open = false;
      if (day >= 1 && day <= 6) {
        open = currentTime >= 450 && currentTime <= 1080;
      } else if (day === 0) {
        open = currentTime >= 600 && currentTime <= 960;
      }
      setIsOpenNow(open);
    };
    
    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full bg-warm-white grain-overlay overflow-hidden"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-warm-sand/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-clinical-red rounded-full flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm lg:text-base">E</span>
              </div>
              <span className="font-display font-semibold text-text-primary text-lg lg:text-xl">Elim Dental</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('services')} className="font-body text-text-secondary hover:text-clinical-red transition-colors text-sm">Services</button>
              <button onClick={() => scrollToSection('team')} className="font-body text-text-secondary hover:text-clinical-red transition-colors text-sm">Team</button>
              <button onClick={() => scrollToSection('testimonials')} className="font-body text-text-secondary hover:text-clinical-red transition-colors text-sm">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="font-body text-text-secondary hover:text-clinical-red transition-colors text-sm">Contact</button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill px-4 lg:px-6 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Book Appointment</span>
                  <span className="sm:hidden">Book</span>
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
                  <Button className="w-full bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill">
                    Request Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-8 lg:py-12">
          
          {/* Left - Portrait Pill */}
          <div 
            className={`relative w-full lg:w-[42vw] lg:max-w-[500px] transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="relative aspect-[3/4] lg:aspect-[3/4] w-full max-w-[380px] lg:max-w-none mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-pill overflow-hidden shadow-soft-lg">
                <img 
                  src="/images/hero-portrait.jpg" 
                  alt="Smiling patient at Elim Dental Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isOpenNow && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-pill text-xs font-label uppercase tracking-wider flex items-center gap-1.5 shadow-soft">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Open Now
                </div>
              )}
            </div>
            
            {/* Contact Pills - Desktop */}
            <div className="hidden lg:block absolute -right-8 top-[60%] space-y-3">
              <a 
                href="tel:0712662293"
                className={`flex items-center gap-3 bg-white rounded-pill px-5 py-3 shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                <div className="w-10 h-10 bg-clinical-red/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-clinical-red" />
                </div>
                <div>
                  <p className="font-label text-xs text-text-secondary uppercase tracking-wider">Call us</p>
                  <p className="font-display font-semibold text-text-primary">0712 662 293</p>
                </div>
              </a>
              
              <a 
                href="https://wa.me/254712662293"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 bg-white rounded-pill px-5 py-3 shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
                style={{ transitionDelay: '0.5s' }}
              >
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-label text-xs text-text-secondary uppercase tracking-wider">Chat on</p>
                  <p className="font-display font-semibold text-text-primary">WhatsApp</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Right - Content */}
          <div className="flex-1 max-w-xl lg:max-w-[40vw] text-center lg:text-left">
            <h1 
              className={`font-display font-bold text-text-primary leading-[0.95] tracking-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Your Smile,<br />
              <span className="text-clinical-red">Our Priority</span>
            </h1>
            
            <p 
              className={`mt-6 text-text-secondary font-body leading-relaxed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', transitionDelay: '0.1s' }}
            >
              Modern dental care in Ongata Rongai—gentle, honest, and on time. 
              Experience professional dental services with a patient-first approach.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill px-8 py-6 text-base font-medium shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-0.5">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
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
                    <Button className="w-full bg-clinical-red hover:bg-clinical-red-dark text-white rounded-pill">
                      Request Appointment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('location')}
                className="border-2 border-text-primary/20 text-text-primary hover:bg-text-primary hover:text-white rounded-pill px-8 py-6 text-base font-medium transition-all"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            {/* Mobile Contact Buttons */}
            <div 
              className={`flex lg:hidden flex-col sm:flex-row gap-3 mt-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              <a 
                href="tel:0712662293"
                className="flex items-center justify-center gap-2 bg-white rounded-pill px-5 py-3 shadow-soft text-text-primary font-medium"
              >
                <Phone className="w-5 h-5 text-clinical-red" />
                Call Now
              </a>
              <a 
                href="https://wa.me/254712662293"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-pill px-5 py-3 shadow-soft font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

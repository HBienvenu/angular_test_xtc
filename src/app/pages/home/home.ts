import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  isScrolled = false;
  menuOpen = false;
  darkMode = true;
  activeTestimonial = 0;
  private testimonialInterval: any;

  stats = [
    { value: '120+', label: 'Projets livrés' },
    { value: '98%', label: 'Clients satisfaits' },
    { value: '5M+', label: 'Vues générées' },
  ];

  // ✅ Plus de champ "icon" — les SVG sont directement dans le template
  services = [
    {
      title: 'Stratégie de contenu',
      description:
        'Nous analysons votre audience, vos objectifs et votre marché pour construire une stratégie éditoriale percutante.',
      items: ['Audit de contenu', 'Calendrier éditorial', 'Positionnement', 'SEO & distribution'],
    },
    {
      title: 'Production vidéo & photo',
      description:
        'Du tournage à la post-production, nous créons des visuels qui captivent et racontent votre histoire.',
      items: ['Tournage pro', 'Motion design', 'Reels & short-form', 'Photographie édi.'],
    },
    {
      title: 'Gestion réseaux sociaux',
      description:
        'Nous prenons en charge votre présence digitale pour construire une communauté engagée autour de votre marque.',
      items: ['Community mgmt', 'Publicité sociale', 'Reporting mensuel', 'Veille concurrentielle'],
    },
  ];

  projects = [
    { title: 'Campagne Été — Maison Dorée',     category: 'Production vidéo'  },
    { title: 'Refonte Social Media — TechFlow',  category: 'Stratégie & Social' },
    { title: 'Brand Content — Natura Studio',    category: 'Photographie'       },
    { title: 'Série documentaire — Artisans',    category: 'Production'         },
  ];

  values = [
    { title: 'Authenticité', desc: 'Chaque contenu reflète fidèlement votre ADN de marque.' },
    { title: 'Impact mesurable', desc: 'Nous pilotons par les données, pas par les suppositions.' },
    { title: 'Excellence', desc: "Aucun compromis sur la qualité, quelle que soit l'échelle." },
  ];

  testimonials = [
    {
      quote:
        '« Xave The Creator a transformé notre présence digitale. En 6 mois, notre engagement a triplé et nos ventes en ligne ont bondi de 40%. »',
      name: 'Sophie Moreau',
      role: 'Directrice Marketing, Maison Dorée',
    },
    {
      quote:
        '« Une équipe créative et stratégique à la fois. Rares sont les agences capables de produire du contenu aussi qualitatif tout en respectant les délais. »',
      name: 'Alexandre Petit',
      role: 'CEO, TechFlow',
    },
    {
      quote:
        "« Ils ont su saisir l'essence de notre marque et la retranscrire en contenu qui résonne vraiment avec notre audience. Résultat exceptionnel. »",
      name: 'Camille Durand',
      role: 'Fondatrice, Natura Studio',
    },
  ];

  footerCols = [
    {
      title: 'Services',
      links: ['Stratégie contenu', 'Production vidéo', 'Social media', 'Copywriting'],
    },
    { title: 'Agence', links: ['À propos', 'Portfolio', 'Blog', 'Contact'] },
    { title: 'Suivez-nous', links: ['Instagram', 'LinkedIn', 'YouTube', 'TikTok'] },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('xave-theme');
      this.darkMode = saved ? saved === 'dark' : true;
      this.applyDark();
    }
    this.testimonialInterval = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initAnimations();
  }

  ngOnDestroy(): void {
    clearInterval(this.testimonialInterval);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 60;
  }

  toggleDark(): void {
    this.darkMode = !this.darkMode;
    this.applyDark();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('xave-theme', this.darkMode ? 'dark' : 'light');
    }
  }

  private applyDark(): void {
    document.documentElement.classList.toggle('dark', this.darkMode);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  setTestimonial(index: number): void {
    this.activeTestimonial = index;
    clearInterval(this.testimonialInterval);
    this.testimonialInterval = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
  }

  private initAnimations(): void {
    gsap.set('.reveal-line', { y: 60, opacity: 0 });
    gsap.to('.reveal-line', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.14,
      ease: 'power3.out',
      delay: 0.25,
    });

    gsap.to('.scroll-hint', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '25% top', scrub: true },
      opacity: 0,
      y: -16,
    });

    gsap.to('.hero-glow', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      y: 180,
      scale: 1.15,
    });

    const sections = ['#services', '#work', '#about', '#contact'];
    sections.forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.from(el.querySelectorAll('h2, p, article, form, .grid > *'), {
        scrollTrigger: { trigger: el, start: 'top 82%' },
        y: 48,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out',
      });
    });
  }
}
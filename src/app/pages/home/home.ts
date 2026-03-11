import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare const gsap: any;
declare const AOS: any;
declare const anime: any;
declare const ScrollTrigger: any;

interface Service {
  icon: string;
  title: string;
  description: string;
  tag: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  current: number;
}

interface Work {
  category: string;
  title: string;
  views: string;
  color: string;
  emoji: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('cursorDot') cursorDot!: ElementRef;
  @ViewChild('navEl') navEl!: ElementRef;

  isBrowser: boolean;
  menuOpen = false;
  private mouseMoveHandler!: (e: MouseEvent) => void;
  private scrollHandler!: () => void;
  private statsObserver!: IntersectionObserver;
  statsAnimated = false;

  navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Réalisations', href: '#works' },
    { label: 'Stats', href: '#stats' },
    { label: 'Contact', href: '#contact' },
  ];

  stats: Stat[] = [
    { value: 850, suffix: 'M+', label: 'Vues générées', current: 0 },
    { value: 120, suffix: '+', label: 'Marques partenaires', current: 0 },
    { value: 98, suffix: '%', label: 'Taux de satisfaction', current: 0 },
    { value: 4, suffix: 'ans', label: "D'expérience TikTok", current: 0 },
  ];

  services: Service[] = [
    {
      icon: '🎬',
      title: 'Création de Contenu',
      description:
        "Scripts viraux, tournage et montage optimisés pour l'algorithme TikTok. Chaque vidéo est conçue pour accrocher dans les 3 premières secondes.",
      tag: 'Viral First',
    },
    {
      icon: '📈',
      title: 'Growth Hacking',
      description:
        'Stratégie de croissance organique combinant trends analysis, posting schedule et optimisation des hashtags pour maximiser votre reach.',
      tag: 'Organique',
    },
    {
      icon: '🤝',
      title: 'Influence & UGC',
      description:
        'Réseau de créateurs TikTok triés sur le volet. Campagnes UGC authentiques qui convertissent mieux que la pub traditionnelle.',
      tag: '500+ Créateurs',
    },
    {
      icon: '🎯',
      title: 'TikTok Ads',
      description:
        'Gestion complète de vos campagnes publicitaires TikTok. ROAS optimisé, creatives A/B testés et reporting temps réel.',
      tag: 'Performance',
    },
    {
      icon: '🔊',
      title: 'Son & Tendances',
      description:
        "Veille permanente sur les sons viraux, challenges et trends. On surfe la vague avant qu'elle n'arrive sur le feed grand public.",
      tag: 'Avant-garde',
    },
    {
      icon: '📊',
      title: 'Analytics & Audit',
      description:
        "Audit complet de votre présence TikTok avec roadmap d'optimisation personnalisée. Data-driven, toujours.",
      tag: 'Data',
    },
  ];

  works: Work[] = [
    {
      category: 'Mode & Lifestyle',
      title: '@zenith_paris',
      views: '12.4M vues',
      color: '#ff0050',
      emoji: '👗',
    },
    {
      category: 'Food & Resto',
      title: '@le_petit_chef',
      views: '8.7M vues',
      color: '#00f2ea',
      emoji: '🍜',
    },
    {
      category: 'Tech & Gadgets',
      title: '@techwave_fr',
      views: '21M vues',
      color: '#ff0050',
      emoji: '📱',
    },
    {
      category: 'Beauté & Skincare',
      title: '@glow_studio',
      views: '15.2M vues',
      color: '#00f2ea',
      emoji: '✨',
    },
    {
      category: 'Sport & Fitness',
      title: '@fit_republic',
      views: '9.1M vues',
      color: '#ff0050',
      emoji: '💪',
    },
    {
      category: 'E-commerce',
      title: '@shop_viral',
      views: '18.6M vues',
      color: '#00f2ea',
      emoji: '🛍️',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      this.initAOS();
      this.initGSAP();
      this.initAnime();
      this.initCursor();
      this.initNavScroll();
      this.initStatsObserver();
    }, 100);
  }

  private initAOS(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 80,
      });
    }
  }

  private initGSAP(): void {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero title — split par lettre
    const titleEl = document.querySelector('.hero-title');
    if (titleEl) {
      const text = titleEl.textContent || '';
      titleEl.innerHTML = text
        .split('')
        .map((char: string) =>
          char === ' '
            ? '<span class="char">&nbsp;</span>'
            : `<span class="char">${char}</span>`
        )
        .join('');

      gsap.fromTo(
        '.hero-title .char',
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'back.out(1.7)',
          delay: 0.3,
        }
      );
    }

    gsap.fromTo(
      '.hero-subtitle',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.6, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.phone-mockup',
      { x: 80, opacity: 0, rotate: 5 },
      { x: 0, opacity: 1, rotate: 0, duration: 1.2, delay: 0.8, ease: 'power4.out' }
    );

    // Flottement infini du téléphone
    gsap.to('.phone-mockup', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    });

    gsap.fromTo(
      '.nav-logo',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.nav-link',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
    );

    // Parallax orbs
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.orb-1', {
        y: -100,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.orb-2', {
        y: -60,
        x: 40,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  }

  private initAnime(): void {
    if (typeof anime === 'undefined') return;

    // Ticker défilant
    anime({
      targets: '.ticker-track',
      translateX: [0, '-50%'],
      duration: 20000,
      easing: 'linear',
      loop: true,
    });

    // Points de grille animés
    anime({
      targets: '.grid-dot',
      opacity: [0.1, 0.5],
      scale: [1, 1.5],
      duration: 2000,
      delay: anime.stagger(100, { grid: [10, 10], from: 'center' }),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    });

    // Pulsation du bouton CTA
    anime({
      targets: '.cta-btn-primary',
      boxShadow: [
        '0 0 20px rgba(255,0,80,0.4)',
        '0 0 40px rgba(255,0,80,0.8)',
        '0 0 20px rgba(255,0,80,0.4)',
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine',
      delay: 2000,
    });
  }

  private initCursor(): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
    if (!cursor || !cursorDot || typeof gsap === 'undefined') return;

    this.mouseMoveHandler = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' });
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };

    document.addEventListener('mousemove', this.mouseMoveHandler);

    const hoverEls = document.querySelectorAll('a, button, .service-card, .work-card');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2.5, opacity: 0.6, duration: 0.3 });
        gsap.to(cursorDot, { scale: 0, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(cursorDot, { scale: 1, duration: 0.3 });
      });
    });
  }

  private initNavScroll(): void {
    const nav = document.querySelector('.navbar') as HTMLElement;
    if (!nav) return;

    this.scrollHandler = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', this.scrollHandler);
  }

  private initStatsObserver(): void {
    const statsSection = document.querySelector('#stats');
    if (!statsSection) return;

    this.statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.statsAnimated) {
            this.statsAnimated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    this.statsObserver.observe(statsSection);
  }

  private animateCounters(): void {
    this.stats.forEach((stat, i) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const current = Math.min(Math.round(increment * step), stat.value);
        this.stats[i] = { ...stat, current };

        if (current >= stat.value) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (typeof gsap !== 'undefined') {
      if (this.menuOpen) {
        gsap.fromTo('.mobile-menu', { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to('.mobile-menu', { x: '100%', duration: 0.3, ease: 'power3.in' });
      }
    }
  }

  scrollTo(href: string): void {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.menuOpen = false;
    }
  }

  // ✅ CORRIGÉ : MouseEvent au lieu de HTMLElement
  onServiceHover(event: MouseEvent): void {
    if (typeof anime === 'undefined') return;
    const el = event.currentTarget as HTMLElement;
    anime({ targets: el, translateY: -8, duration: 300, easing: 'easeOutCubic' });
  }

  onServiceLeave(event: MouseEvent): void {
    if (typeof anime === 'undefined') return;
    const el = event.currentTarget as HTMLElement;
    anime({ targets: el, translateY: 0, duration: 300, easing: 'easeOutCubic' });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      if (this.mouseMoveHandler) document.removeEventListener('mousemove', this.mouseMoveHandler);
      if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
      if (this.statsObserver) this.statsObserver.disconnect();
    }
  }
}
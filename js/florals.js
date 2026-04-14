/* Decorative floral SVGs injected via JS to avoid duplicating across every HTML page */

const FLOWERS = {
    daisy: (color, center) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50,50)">
            ${[0,45,90,135,180,225,270,315].map(a =>
                `<ellipse cx="0" cy="-22" rx="10" ry="20" fill="${color}" transform="rotate(${a})" opacity="0.85"/>`
            ).join('')}
            <circle cx="0" cy="0" r="10" fill="${center}"/>
        </g>
    </svg>`,

    tulip: (color, stem) => `<svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 45 C30 45 10 30 12 15 C14 5 25 0 30 8 C35 0 46 5 48 15 C50 30 30 45 30 45Z" fill="${color}" opacity="0.8"/>
        <line x1="30" y1="45" x2="30" y2="95" stroke="${stem}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M30 70 Q22 60 15 65" fill="none" stroke="${stem}" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    leaf: (color) => `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 25 Q25 0 75 10 Q55 25 75 40 Q25 50 5 25Z" fill="${color}" opacity="0.6"/>
        <path d="M10 25 Q40 22 70 24" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
    </svg>`,

    rosette: (color, inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50,50)">
            ${[0,60,120,180,240,300].map(a =>
                `<ellipse cx="0" cy="-18" rx="13" ry="18" fill="${color}" transform="rotate(${a})" opacity="0.7"/>`
            ).join('')}
            <circle cx="0" cy="0" r="8" fill="${inner}"/>
        </g>
    </svg>`,

    petal: (color) => `<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5 Q35 20 30 45 Q20 55 10 45 Q5 20 20 5Z" fill="${color}" opacity="0.6"/>
    </svg>`,

    blossom: (color, center) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50,50)">
            ${[0,72,144,216,288].map(a =>
                `<ellipse cx="0" cy="-20" rx="14" ry="20" fill="${color}" transform="rotate(${a})" opacity="0.75"/>`
            ).join('')}
            <circle cx="0" cy="0" r="9" fill="${center}"/>
            <circle cx="0" cy="0" r="4" fill="${color}" opacity="0.5"/>
        </g>
    </svg>`
};

const COLORS = {
    sky: '#7FB9E6',
    lavender: '#D6BEEA',
    butter: '#F4D77A',
    matcha: '#B7C96A',
    pink: '#F98BA9',
    tangerine: '#FF8F45',
    white: '#ffffff',
    cream: '#fef9f4',
    stem: '#8ab87a'
};

const PLACEMENTS = [
    /* ── Hero flowers ── */
    { section: '.hero', flower: 'daisy', colors: [COLORS.pink, COLORS.butter], size: 'lg', style: 'top:12%;left:8%', classes: 'floral--soft floral--float', rotate: 15 },
    { section: '.hero', flower: 'tulip', colors: [COLORS.lavender, COLORS.stem], size: 'lg', style: 'bottom:18%;left:5%', classes: 'floral--vivid floral--float-delay', rotate: -10 },
    { section: '.hero', flower: 'leaf', colors: [COLORS.matcha], size: 'md', style: 'top:25%;right:6%', classes: 'floral--soft floral--float-slow', rotate: 30 },
    { section: '.hero', flower: 'blossom', colors: [COLORS.sky, COLORS.white], size: 'md', style: 'bottom:25%;right:10%', classes: 'floral--soft floral--float', rotate: 0 },
    { section: '.hero', flower: 'petal', colors: [COLORS.pink], size: 'sm', style: 'top:40%;left:15%', classes: 'floral--faint floral--float-delay', rotate: 45 },
    { section: '.hero', flower: 'rosette', colors: [COLORS.butter, COLORS.tangerine], size: 'sm', style: 'top:18%;right:15%', classes: 'floral--faint floral--spin', rotate: 0 },

    /* ── Page headers ── */
    { section: '.page-header', flower: 'daisy', colors: [COLORS.lavender, COLORS.butter], size: 'md', style: 'top:15%;right:10%', classes: 'floral--soft floral--float', rotate: -20 },
    { section: '.page-header', flower: 'tulip', colors: [COLORS.pink, COLORS.stem], size: 'md', style: 'bottom:10%;left:8%', classes: 'floral--soft floral--float-delay', rotate: 8 },
    { section: '.page-header', flower: 'leaf', colors: [COLORS.matcha], size: 'sm', style: 'top:30%;left:15%', classes: 'floral--faint floral--float-slow', rotate: -15 },

    /* ── Home intro section ── */
    { section: '.home-intro', flower: 'tulip', colors: [COLORS.sky, COLORS.stem], size: 'lg', style: 'top:8%;right:3%', classes: 'floral--soft floral--float', rotate: 5 },
    { section: '.home-intro', flower: 'rosette', colors: [COLORS.pink, COLORS.white], size: 'sm', style: 'bottom:12%;left:3%', classes: 'floral--faint floral--float-delay', rotate: 0 },
    { section: '.home-intro', flower: 'leaf', colors: [COLORS.matcha], size: 'md', style: 'bottom:5%;right:8%', classes: 'floral--soft floral--float-slow', rotate: -25 },

    /* ── Bio section ── */
    { section: '.bio-layout', flower: 'blossom', colors: [COLORS.lavender, COLORS.cream], size: 'md', style: 'top:-20px;right:-20px', classes: 'floral--soft floral--float', rotate: 12 },
    { section: '.bio-layout', flower: 'petal', colors: [COLORS.pink], size: 'sm', style: 'bottom:10%;left:-15px', classes: 'floral--faint floral--float-slow', rotate: -30 },

    /* ── Statement section ── */
    { section: '.statement-container', flower: 'daisy', colors: [COLORS.butter, COLORS.pink], size: 'md', style: 'top:-25px;right:-15px', classes: 'floral--soft floral--float', rotate: 10 },
    { section: '.statement-container', flower: 'leaf', colors: [COLORS.matcha], size: 'sm', style: 'bottom:-10px;left:20px', classes: 'floral--faint floral--float-delay', rotate: 20 },

    /* ── Contact section ── */
    { section: '.contact-layout', flower: 'tulip', colors: [COLORS.pink, COLORS.stem], size: 'md', style: 'top:-20px;left:48%', classes: 'floral--soft floral--float', rotate: 0 },
    { section: '.contact-layout', flower: 'rosette', colors: [COLORS.sky, COLORS.white], size: 'sm', style: 'bottom:-15px;right:10%', classes: 'floral--faint floral--float-slow', rotate: 15 },

    /* ── Footer ── */
    { section: '.footer', flower: 'daisy', colors: [COLORS.pink, COLORS.butter], size: 'sm', style: 'top:-12px;left:10%', classes: 'floral--soft', rotate: 0 },
    { section: '.footer', flower: 'leaf', colors: [COLORS.matcha], size: 'sm', style: 'top:-10px;right:12%', classes: 'floral--faint', rotate: -20 },
    { section: '.footer', flower: 'blossom', colors: [COLORS.lavender, COLORS.white], size: 'sm', style: 'top:-14px;left:50%', classes: 'floral--faint', rotate: 30 },

    /* ── Works tabs area ── */
    { section: '.works-tabs', flower: 'petal', colors: [COLORS.lavender], size: 'sm', style: 'top:-18px;right:20%', classes: 'floral--faint floral--float', rotate: 60 },

    /* ── Resume ── */
    { section: '.resume-container', flower: 'blossom', colors: [COLORS.pink, COLORS.cream], size: 'md', style: 'top:-25px;right:-10px', classes: 'floral--soft floral--float', rotate: -5 },
    { section: '.resume-container', flower: 'leaf', colors: [COLORS.matcha], size: 'sm', style: 'bottom:5%;left:-15px', classes: 'floral--faint floral--float-delay', rotate: 35 },
];

document.addEventListener('DOMContentLoaded', () => {
    PLACEMENTS.forEach(p => {
        const section = document.querySelector(p.section);
        if (!section) return;

        // ensure parent can hold absolute children
        const pos = getComputedStyle(section).position;
        if (pos === 'static') section.style.position = 'relative';
        if (!section.style.overflow) section.style.overflow = 'hidden';

        const el = document.createElement('div');
        el.className = `floral floral--${p.size} ${p.classes}`;
        el.setAttribute('aria-hidden', 'true');
        el.style.cssText = p.style;
        if (p.rotate) el.style.transform = `rotate(${p.rotate}deg)`;

        const svg = FLOWERS[p.flower](...p.colors);
        el.innerHTML = svg;
        section.appendChild(el);
    });
});

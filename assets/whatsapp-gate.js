(function () {
  'use strict';
  const PHONE = '201009756619';
  const COPY = {
    en: {
      needSignup: 'SIGN UP FIRST!! Please create an account before contacting Saheil or booking.',
      booking: (name, service) => `Hello SAHEIL ACADEMY!${name ? ` My name is ${name}.` : ''} I would like to book ${service || 'an experience at the club'}. Please contact me to confirm availability and the time.`,
      services: { 'free riding': 'Free Riding', 'jumping': 'Jumping', 'desert trip': 'a Desert Trip', 'desert trips': 'a Desert Trip', 'monthly training': 'Monthly Training', 'training': 'Training' }
    },
    ar: {
      needSignup: 'لازم تعمل حساب الأول!! سجّل حساب قبل التواصل مع صهيل أو الحجز.',
      booking: (name, service) => `مرحبًا SAHEIL ACADEMY،${name ? ` اسمي ${name}.` : ''} أريد حجز ${service || 'تجربة في النادي'}. من فضلكم تواصلوا معي لتأكيد التوفر والموعد.`,
      services: { 'free riding': 'ركوب حر', 'jumping': 'القفز', 'desert trip': 'رحلة صحراوية', 'desert trips': 'رحلة صحراوية', 'monthly training': 'التدريب الشهري', 'training': 'التدريب' }
    },
    fr: {
      needSignup: 'INSCRIVEZ-VOUS D’ABORD ! Créez un compte avant de contacter Saheil ou de réserver.',
      booking: (name, service) => `Bonjour SAHEIL ACADEMY !${name ? ` Je m’appelle ${name}.` : ''} Je souhaite réserver ${service || 'une activité au club'}. Merci de me contacter pour confirmer les disponibilités et l’horaire.`,
      services: { 'free riding': 'une balade libre', 'jumping': 'une séance de saut', 'desert trip': 'une sortie dans le désert', 'desert trips': 'une sortie dans le désert', 'monthly training': 'un entraînement mensuel', 'training': 'un entraînement' }
    },
    de: {
      needSignup: 'BITTE ZUERST REGISTRIEREN! Erstelle ein Konto, bevor du Saheil kontaktierst oder buchst.',
      booking: (name, service) => `Hallo SAHEIL ACADEMY!${name ? ` Mein Name ist ${name}.` : ''} Ich möchte ${service || 'ein Erlebnis im Club'} buchen. Bitte kontaktiert mich zur Bestätigung der Verfügbarkeit und Uhrzeit.`,
      services: { 'free riding': 'freies Reiten', 'jumping': 'Springreiten', 'desert trip': 'eine Wüstentour', 'desert trips': 'eine Wüstentour', 'monthly training': 'monatliches Training', 'training': 'Training' }
    },
    es: {
      needSignup: '¡REGÍSTRATE PRIMERO! Crea una cuenta antes de contactar con Saheil o reservar.',
      booking: (name, service) => `¡Hola SAHEIL ACADEMY!${name ? ` Me llamo ${name}.` : ''} Me gustaría reservar ${service || 'una experiencia en el club'}. Por favor, contacten conmigo para confirmar la disponibilidad y el horario.`,
      services: { 'free riding': 'una sesión de monta libre', 'jumping': 'una sesión de salto', 'desert trip': 'una excursión al desierto', 'desert trips': 'una excursión al desierto', 'monthly training': 'entrenamiento mensual', 'training': 'entrenamiento' }
    }
  };
  function getLang() {
    const stored = (localStorage.getItem('saheil_lang') || document.documentElement.lang || 'en').toLowerCase();
    const base = stored.split('-')[0];
    return COPY[base] ? base : 'en';
  }
  function getUser() {
    try {
      const user = JSON.parse(localStorage.getItem('saheil_user') || 'null');
      return user && typeof user.name === 'string' && user.name.trim() ? user : null;
    } catch (_) { return null; }
  }
  function localizedService(raw, lang) {
    if (!raw) return '';
    let value = String(raw).replace(/\+/g, ' ').trim();
    try { value = decodeURIComponent(value); } catch (_) {}
    const dict = COPY[lang].services;
    const key = value.toLowerCase();
    return dict[key] || value;
  }
  document.addEventListener('click', function (event) {
    const link = event.target && event.target.closest ? event.target.closest('a[href*="wa.me/"]') : null;
    if (!link) return;
    event.preventDefault();
    const lang = getLang();
    const copy = COPY[lang];
    const user = getUser();
    const url = new URL(link.href, window.location.href);
    const fromLink = url.searchParams.get('service');
    const fromPage = new URLSearchParams(window.location.search).get('service');
    const service = localizedService(fromLink || fromPage, lang);
    // Signing up is optional: let visitors contact the club directly.
    const name = user && user.name ? user.name.trim() : '';
    const message = copy.booking(name, service);
    const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();

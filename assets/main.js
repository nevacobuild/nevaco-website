  // Footer year, always current — no hardcoded date
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var open = primaryNav.classList.toggle('mobile-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    primaryNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { primaryNav.classList.remove('mobile-open'); });
    });
  }

  // Elegant scroll reveal — sections and text fade/rise into place; grouped
  // items (service cards, stats, process steps, credentials) stagger in
  // one after another rather than popping in all at once.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.stagger').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add('reveal');
      child.style.transitionDelay = reduceMotion ? '0ms' : (i * 160) + 'ms';
    });
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) {
      if (!el.classList.contains('hero-enter')) io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Cinematic first-load entrance for the header and hero: logo, nav, phone/
  // book button, eyebrow, headline, copy, buttons, and the hero graphic each
  // cascade in with their own quiet delay (set inline per element above).
  var heroEntered = false;
  function playHeroEntrance() {
    if (heroEntered) return;
    heroEntered = true;
    document.querySelectorAll('.hero-enter').forEach(function (el) { el.classList.add('in'); });
  }

  // Intro overlay — homepage only. Fully automatic cinematic splash: logo
  // fades/scales in, holds for ~2s total, then the whole overlay fades away
  // on its own to reveal the homepage underneath — no click required.
  //
  // Shown once per browser session: the first homepage load in a session
  // plays the full intro and sets a sessionStorage flag; any later load in
  // that same session (refresh, back button, or returning to "/" after
  // browsing other pages) sees the homepage immediately with no overlay.
  // A new tab/window counts as a new session, matching sessionStorage's
  // own scope.
  var welcome = document.getElementById('welcome');
  if (welcome) {
    var alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('nevaco_welcome_seen') === '1'; } catch (e) {}

    if (!alreadySeen) {
      try { sessionStorage.setItem('nevaco_welcome_seen', '1'); } catch (e) {}
      welcome.hidden = false;

      if (reduceMotion) {
        welcome.hidden = true;
        playHeroEntrance();
      } else {
        // Logo fades/scales in (~900ms), overlay holds so the whole intro
        // reads on-screen for ~2s, then everything fades out together over
        // ~900ms while the homepage cascades in beneath it.
        setTimeout(function () {
          welcome.classList.add('fade-out');
          playHeroEntrance();
          setTimeout(function () { welcome.hidden = true; }, 900);
        }, 2000);
      }
    } else {
      welcome.hidden = true;
      requestAnimationFrame(function () { setTimeout(playHeroEntrance, 200); });
    }
  } else {
    // Secondary pages have no overlay — play the page entrance right away
    requestAnimationFrame(function () { setTimeout(playHeroEntrance, 150); });
  }

  // Header gains a hairline + slightly deeper shadow once the page scrolls
  var siteHeader = document.querySelector('header.site');
  var lastScrolled = false;
  function updateHeaderState() {
    var scrolled = window.scrollY > 8;
    if (scrolled !== lastScrolled) {
      siteHeader.classList.toggle('is-scrolled', scrolled);
      lastScrolled = scrolled;
    }
  }
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // Before/after drag sliders
  document.querySelectorAll('[data-ba]').forEach(function (slider) {
    var after = slider.querySelector('.after');
    var handle = slider.querySelector('.handle');
    var dragging = false;

    function setPos(clientX) {
      var rect = slider.getBoundingClientRect();
      var pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      after.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
    }

    slider.addEventListener('pointerdown', function (e) { dragging = true; setPos(e.clientX); slider.setPointerCapture(e.pointerId); });
    slider.addEventListener('pointermove', function (e) { if (dragging) setPos(e.clientX); });
    slider.addEventListener('pointerup', function () { dragging = false; });
    slider.addEventListener('pointerleave', function () { dragging = false; });
  });

  // ---------------------------------------------------------------------
  // Service Areas — cinematic animated map (homepage only)
  // ---------------------------------------------------------------------
  // Four stacked SVG layers (space -> Canada -> Ontario -> the Toronto-
  // Barrie corridor) crossfade/zoom into place once the section scrolls
  // into view, then settle on the corridor with softly pulsing markers.
  // Plays once per page load; reduced-motion visitors get the settled
  // corridor view immediately with no animation.
  var serviceMap = document.getElementById('serviceMap');
  if (serviceMap) {
    var smPlayed = false;

    function smShowStatic() {
      serviceMap.classList.add('no-anim', 'settled');
    }

    function smPlaySequence() {
      if (smPlayed) return;
      smPlayed = true;
      if (reduceMotion) { smShowStatic(); return; }
      setTimeout(function () { serviceMap.classList.add('stage-2'); }, 1300);
      setTimeout(function () { serviceMap.classList.add('stage-3'); }, 2700);
      setTimeout(function () { serviceMap.classList.add('stage-4'); }, 4100);
      setTimeout(function () { serviceMap.classList.add('settled'); }, 5000);
    }

    if ('IntersectionObserver' in window) {
      var smIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            smPlaySequence();
            smIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      smIo.observe(serviceMap);
    } else {
      smShowStatic();
    }
  }

  // ---------------------------------------------------------------------
  // Featured project cards + gallery lightbox (Projects page only)
  // ---------------------------------------------------------------------
  // Cards are rendered from the data in assets/projects-data.js so adding a
  // new completed project is just adding one object to that array — no HTML
  // to edit. Clicking a card opens the shared modal with that project's
  // photos: arrow buttons / arrow keys on desktop, swipe on touch devices.
  var projectsGrid = document.getElementById('projectsGrid');
  var projectModal = document.getElementById('projectModal');

  if (projectsGrid && projectModal && window.NEVACO_PROJECTS) {
    var projects = window.NEVACO_PROJECTS;
    var modalImg = document.getElementById('projectModalImg');
    var modalTitle = document.getElementById('projectModalTitle');
    var modalCounter = document.getElementById('projectModalCounter');
    var prevBtn = projectModal.querySelector('[data-modal-prev]');
    var nextBtn = projectModal.querySelector('[data-modal-next]');
    var activeProject = null;
    var activeIndex = 0;
    var lastFocused = null;

    // -- Render cards --------------------------------------------------
    projects.forEach(function (project, projectIndex) {
      var hasPhotos = project.cover && project.photos && project.photos.length > 0;
      var card = document.createElement(hasPhotos ? 'div' : 'div');
      card.className = 'project-card' + (hasPhotos ? '' : ' project-card-placeholder');

      // Cards auto-crossfade through a handful of that project's photos once
      // scrolled into view (see the slideshow controller below) — capped at
      // SLIDESHOW_MAX photos per card so a large gallery doesn't force the
      // page to load every image just to render the grid.
      var SLIDESHOW_MAX = 8;
      var mediaHtml;
      if (hasPhotos) {
        var slidePhotos = project.photos.slice(0, SLIDESHOW_MAX);
        var slidesHtml = slidePhotos.map(function (photo, i) {
          return '<img class="card-slide' + (i === 0 ? ' is-active' : '') + '" src="' + photo.src + '" alt="' +
            (photo.alt || (project.title + ' — photo ' + (i + 1))) + '"' +
            (i === 0 ? '' : ' loading="lazy"') + '>';
        }).join('');
        mediaHtml = '<div class="project-card-media" data-slideshow>' + slidesHtml + '</div>';
      } else {
        mediaHtml = '<div class="project-card-media placeholder"><span>Photos Coming Soon</span></div>';
      }

      card.innerHTML =
        mediaHtml +
        '<div class="project-card-body">' +
          '<h3>' + project.title + '</h3>' +
          '<p class="project-card-desc">' + project.description + '</p>' +
          '<p class="project-card-address">' + project.address + '</p>' +
        '</div>';

      if (hasPhotos) {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', 'Open photo gallery for ' + project.title);
        var open = function () { openModal(projectIndex, 0, card); };
        card.addEventListener('click', open);
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
      }

      projectsGrid.appendChild(card);
    });

    // These cards are rendered after the page's initial stagger/reveal-
    // observer setup already ran (the grid was empty at that point), so
    // apply the same fade-in-on-scroll treatment to them here.
    Array.prototype.forEach.call(projectsGrid.children, function (child, i) {
      child.classList.add('reveal');
      child.style.transitionDelay = reduceMotion ? '0ms' : (i * 160) + 'ms';
      if ('IntersectionObserver' in window && !reduceMotion) {
        var cardIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { entry.target.classList.add('in'); cardIo.unobserve(entry.target); }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        cardIo.observe(child);
      } else {
        child.classList.add('in');
      }
    });

    // -- Card cover slideshow --------------------------------------------
    // Each card auto-crossfades through its own photos on a 2s interval —
    // starting the moment it scrolls into view, pausing the instant it
    // scrolls out (so off-screen cards aren't quietly ticking away), and
    // looping for as long as it's visible. Reduced-motion visitors get a
    // static cover photo instead, matching the rest of the site.
    if (!reduceMotion && 'IntersectionObserver' in window) {
      var CARD_SLIDE_MS = 2000;
      projectsGrid.querySelectorAll('[data-slideshow]').forEach(function (media) {
        var slides = media.querySelectorAll('.card-slide');
        if (slides.length < 2) return;
        var current = 0;
        var timer = null;

        function advance() {
          var next = (current + 1) % slides.length;
          slides[current].classList.remove('is-active');
          slides[next].classList.add('is-active');
          current = next;
        }
        function play() {
          if (timer) return;
          timer = setInterval(advance, CARD_SLIDE_MS);
        }
        function pause() {
          clearInterval(timer);
          timer = null;
        }

        var slideIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) play(); else pause();
          });
        }, { threshold: 0.2 });
        slideIo.observe(media);
      });
    }

    // -- Modal control ---------------------------------------------------
    function renderSlide() {
      var photo = activeProject.photos[activeIndex];
      modalImg.src = photo.src;
      modalImg.alt = photo.alt || activeProject.title;
      modalTitle.textContent = activeProject.title + (photo.label ? ' — ' + photo.label : '');
      modalCounter.textContent = (activeIndex + 1) + ' / ' + activeProject.photos.length;
    }

    function openModal(projectIndex, startIndex, triggerEl) {
      activeProject = projects[projectIndex];
      activeIndex = startIndex || 0;
      lastFocused = triggerEl || document.activeElement;
      renderSlide();
      projectModal.hidden = false;
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      projectModal.querySelector('.project-modal-close').focus();
    }

    function closeModal() {
      projectModal.hidden = true;
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      activeProject = null;
      if (lastFocused) lastFocused.focus();
    }

    function showNext() {
      if (!activeProject) return;
      activeIndex = (activeIndex + 1) % activeProject.photos.length;
      renderSlide();
    }

    function showPrev() {
      if (!activeProject) return;
      activeIndex = (activeIndex - 1 + activeProject.photos.length) % activeProject.photos.length;
      renderSlide();
    }

    projectModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    document.addEventListener('keydown', function (e) {
      if (projectModal.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Swipe support for touch devices
    var touchStartX = null;
    var stage = projectModal.querySelector('.project-modal-stage');
    stage.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) { deltaX < 0 ? showNext() : showPrev(); }
      touchStartX = null;
    }, { passive: true });
  }

  // ---------------------------------------------------------------------
  // HubSpot lead capture
  // ---------------------------------------------------------------------
  // Every lead form on the site (homepage + Contact page) submits straight
  // to HubSpot using HubSpot's public Forms API. The Portal ID and Form
  // GUID below are NOT secrets — they're the same public identifiers
  // HubSpot's own embed code uses — so it's safe for them to live here in
  // the front-end. No private API key or access token is used anywhere in
  // this file; keep it that way.
  //
  // To activate: create a form in HubSpot (Marketing > Lead Capture >
  // Forms), then paste its Portal ID and Form GUID below. See the setup
  // guide for exactly where to find these.
  var HUBSPOT_PORTAL_ID = '343618823';
  var HUBSPOT_FORM_GUID = 'b8f80dba-7df4-4fc1-8c47-e0b1b29ab612';

  // Maps this form's data-hs-field markers to the exact internal (API)
  // property names connected to each field on the HubSpot form — confirmed
  // via each field's "Connected property" panel in the HubSpot form editor.
  var HUBSPOT_FIELD_NAME_MAP = {
    full_name: 'firstname',
    phone: 'phone',
    email: 'email',
    project_type: 'project_type',
    address: 'city_address',
    message: 'project_description',
    preferred_site_visit_date: 'preferred_site_visit_date'
  };

  function submitLeadToHubSpot(form) {
    var fields = [];
    form.querySelectorAll('[data-hs-field]').forEach(function (el) {
      var fieldKey = el.getAttribute('data-hs-field');
      var propertyName = HUBSPOT_FIELD_NAME_MAP[fieldKey] || fieldKey;
      fields.push({ name: propertyName, value: el.value });
    });
    var endpoint = 'https://api.hsforms.com/submissions/v3/integration/submit/' + HUBSPOT_PORTAL_ID + '/' + HUBSPOT_FORM_GUID;
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: fields,
        context: { pageUri: window.location.href, pageName: document.title }
      })
    }).then(function (res) { return res.ok; }).catch(function () { return false; });
  }

  document.querySelectorAll('form.lead-form').forEach(function (form) {
    var statusEl = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');

      if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.textContent = 'This form is built and ready to go live — it just needs your HubSpot Portal ID and Form GUID added in assets/main.js.';
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      submitLeadToHubSpot(form).then(function (ok) {
        if (submitBtn) submitBtn.disabled = false;
        if (!statusEl) return;
        statusEl.hidden = false;
        if (ok) {
          statusEl.textContent = 'Thank you — your request has been received. We\'ll be in touch shortly to confirm your site visit.';
          form.reset();
        } else {
          statusEl.textContent = 'Something went wrong sending your request — please call or email us directly and we\'ll get you booked in.';
        }
      });
    });
  });
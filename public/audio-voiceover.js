/* Voix off française — « Une journée à Bamako » + leçons + message d'accueil canonique.
   Technique : synthèse vocale de l'appareil (window.speechSynthesis), gratuite, sans service payant, fonctionne hors ligne selon les voix installées.
   Limites honnêtes :
   - La qualité dépend des voix installées sur l'appareil (Android/Chrome proposent des voix françaises fiables).
   - L'audio Bamanankan N'EST PAS fourni : aucune voix bambara fiable n'existe aujourd'hui dans les navigateurs.
     Décision CTO du 4 novembre 2026 : audio bambara = « fonctionnalité à venir », intégrable plus tard via
     un modèle TTS bambara open source (ex. MALIBA-AI sur HuggingFace, auto-hébergeable gratuitement)
     ou un service malien (Kooma.ai, DJELIA) — service payant exigeant l'accord explicite du porteur du projet. */
(function () {
  'use strict';
  var synth = window.speechSynthesis;
  if (!synth) return;

  function pickFrenchVoice() {
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (/fr[-_]/i.test(voices[i].lang) && /google/i.test(voices[i].name)) return voices[i];
    }
    for (var j = 0; j < voices.length; j++) {
      if (/fr[-_]/i.test(voices[j].lang)) return voices[j];
    }
    return null;
  }

  function speak(text, onEnd) {
    if (!text) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var v = pickFrenchVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'fr-FR'; }
    u.rate = 0.95;
    u.pitch = 1;
    if (onEnd) u.onend = onEnd;
    synth.speak(u);
  }

  window.MBK_SPEAK = {
    speak: speak,
    stop: function () { synth.cancel(); },
    supported: true,
    langAvailable: function (lang) {
      var voices = synth.getVoices();
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf(lang) === 0) return true;
      }
      return false;
    },
    // Audio Bamanankan : non intégré tant que non validé (décision CTO 4 nov. 2026)
    bamanankanAudio: 'coming-soon'
  };

  // 1) Bouton d'écoute du message canonique sur l'accueil
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      var callout = document.getElementById('mbk-canonical-home');
      if (!callout || document.getElementById('mbk-listen-btn')) return;
      var btn = document.createElement('button');
      btn.id = 'mbk-listen-btn';
      btn.className = 'btn primary';
      btn.type = 'button';
      btn.innerHTML = '🔊 Écouter le message';
      btn.setAttribute('aria-label', 'Écouter le message de sensibilisation en français');
      btn.onclick = function () {
        var isOn = btn.dataset.on === '1';
        if (isOn) { window.MBK_SPEAK.stop(); btn.dataset.on = '0'; btn.innerHTML = '🔊 Écouter le message'; return; }
        btn.dataset.on = '1'; btn.innerHTML = '⏹ Arrêter';
        var p = callout.querySelectorAll('.mbk-callout p');
        var text = '';
        p.forEach(function (el) { text += el.textContent.trim() + '. '; });
        speak(text, function () { btn.dataset.on = '0'; btn.innerHTML = '🔊 Écouter le message'; });
      };
      callout.appendChild(btn);
    }, 600);
  });

  // 2) Voix off des étapes du parcours « Une journée à Bamako »
  var observer = new MutationObserver(function () { injectJourneyButtons(); });
  function injectJourneyButtons() {
    var scene = document.querySelector('#journee .jn-scene');
    if (!scene || scene.querySelector('.jn-audio')) return;
    var s = window.MBK_JOURNEY_STEPS && window.MBK_JOURNEY_STEPS[0];
    var place = scene.querySelector('.jn-place');
    var text = scene.querySelector('.jn-text');
    var q = scene.querySelector('.jn-q');
    var opts = scene.querySelectorAll('.jn-opt');
    if (!place || !text) return;
    var btn = document.createElement('button');
    btn.className = 'btn outline jn-audio';
    btn.type = 'button';
    btn.innerHTML = '🔊 Écouter la scène';
    btn.setAttribute('aria-label', 'Écouter la narration de la scène en français');
    btn.onclick = function () {
      var isOn = btn.dataset.on === '1';
      if (isOn) { window.MBK_SPEAK.stop(); btn.dataset.on = '0'; btn.innerHTML = '🔊 Écouter la scène'; return; }
      btn.dataset.on = '1'; btn.innerHTML = '⏹ Arrêter';
      var t = place.textContent + '. ' + text.textContent + '. ' + (q ? q.textContent : '');
      opts.forEach(function (o) { t += ' Option : ' + o.textContent + '.'; });
      speak(t, function () { btn.dataset.on = '0'; btn.innerHTML = '🔊 Écouter la scène'; });
    };
    scene.insertBefore(btn, scene.querySelector('.jn-q') || scene.firstChild);
  }
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(injectJourneyButtons, 900);
    var journee = document.getElementById('journee');
    if (journee) observer.observe(journee, { childList: true, subtree: true });
  });

  // 3) Lecture vocale des leçons (panneaux) — bouton global dans la barre de leçons
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      var grid = document.getElementById('lesson-grid');
      var lessonsView = document.getElementById('lessons');
      if (!lessonsView || document.getElementById('mbk-lessons-audio-btn')) return;
      var btn = globalAudioBtn();
      lessonsView.insertBefore(btn, lessonsView.firstChild);
      btn.onclick = function () { window.MBK_SPEAK.stop(); };
    }, 700);
  });

  function globalAudioBtn() {
    var btn = document.createElement('button');
    btn.id = 'mbk-lessons-audio-btn';
    btn.className = 'btn outline';
    btn.type = 'button';
    btn.innerHTML = '🔊 Écouter une leçon';
    btn.title = 'Ouvre une leçon puis appuie sur son bouton 🔊';
    btn.disabled = true;
    return btn;
  }

  // Lecture d'une leçon ouverte : intercepter les ouvertures de leçon via délégation
  document.addEventListener('click', function (e) {
    var card = e.target.closest('#lesson-grid article, .lesson, [data-lesson]');
    if (!card) return;
    setTimeout(function () {
      var open = document.querySelector('.lesson-detail, #lesson-detail, .detail:not([hidden])');
      if (!open || open.querySelector('.mbk-lesson-audio')) return;
      var title = open.querySelector('h2, h3');
      var body = open.querySelector('p');
      if (!title || !body) return;
      var btn = document.createElement('button');
      btn.className = 'btn outline mbk-lesson-audio';
      btn.type = 'button';
      btn.innerHTML = '🔊 Écouter cette leçon';
      btn.setAttribute('aria-label', 'Écouter la leçon en français');
      btn.onclick = function () {
        var isOn = btn.dataset.on === '1';
        window.MBK_SPEAK.stop();
        if (isOn) { btn.dataset.on = '0'; btn.innerHTML = '🔊 Écouter cette leçon'; return; }
        btn.dataset.on = '1'; btn.innerHTML = '⏹ Arrêter';
        var t = title.textContent + '. ' + body.textContent;
        speak(t, function () { btn.dataset.on = '0'; btn.innerHTML = '🔊 Écouter cette leçon'; });
      };
      open.insertBefore(btn, open.children[1] || open.firstChild);
    }, 300);
  }, true);

  // Compatibilité chargement des voix (Chrome charge async)
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = function () {};
  }
})();

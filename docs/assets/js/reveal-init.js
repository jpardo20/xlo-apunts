// reveal-init.js (controls forced visible)
document.addEventListener("DOMContentLoaded", () => {
  if (window.Reveal) {
    Reveal.initialize({
      hash: true,
      slideNumber: true,
      controls: true,
      controlsTutorial: true,
      controlsLayout: 'edges',      // show arrows on edges
      controlsBackArrows: 'visible',// allow back arrow on first slide
      progress: true,
      center: true,
      transition: 'slide',
      plugins: [ RevealMarkdown ]
    });
  } else {
    console.warn("Reveal.js not found");
  }
});

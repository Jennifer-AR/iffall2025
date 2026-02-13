document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  /* ===============================
     SELECTORS
  =============================== */

  const wrapper = document.querySelector(".horizontal-wrapper");

  const typedContainer = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  const milePanel = document.querySelector(".mile-panel");
  const twenty = document.querySelector(".twenty-trigger");
  const scatterLayer = document.querySelector(".scatter-layer");

  const tiredPanel = document.querySelector(".tired-panel");
  const tiredText = document.querySelector(".tired-text");

  const finalPanel = document.querySelector(".final-panel");
  const finalText = document.querySelector(".final-text");
  const finalZero = document.querySelector(".final-zero");

  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");

  /* ===============================
     HORIZONTAL SCROLL
  =============================== */

  let horizontalTween;

  if (wrapper) {
    horizontalTween = gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  }

  /* ===============================
     TYPEWRITER
  =============================== */

  const message = "Thought I'd send a card with my condolences.";
  const failure = "But I ran out of time.";

  function typeText(el, text, speed, callback) {
    let i = 0;
    el.textContent = "";

    function type() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, speed);
      } else if (callback) {
        setTimeout(callback, 1000);
      }
    }

    type();
  }

  function deleteText(el, callback) {
    function erase() {
      if (el.textContent.length > 0) {
        el.textContent = el.textContent.slice(0, -1);
        setTimeout(erase, 40);
      } else if (callback) {
        callback();
      }
    }
    erase();
  }

  if (typedContainer && cursor) {
    typeText(typedContainer, message, 80, () => {
      deleteText(typedContainer, () => {
        typeText(typedContainer, failure, 80, () => {
          cursor.style.display = "none";
        });
      });
    });
  }

  /* ===============================
     ROTATING RINGS
  =============================== */

  const ringText = "I'm always running out of time. ";

  function createRing(container, radius, size) {
    if (!container) return;

    const chars = ringText.split("");
    const angleStep = 360 / chars.length;

    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.fontSize = size;
      span.style.fontFamily = "Cosmico";

      const angle = i * angleStep;
      span.style.transform =
        `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`;

      container.appendChild(span);
    });
  }

  createRing(document.querySelector(".ring-1"), 120, "1.2vw");
  createRing(document.querySelector(".ring-2"), 240, "2vw");
  createRing(document.querySelector(".ring-3"), 360, "2.8vw");

  /* ===============================
     CLICK 20 → SCATTER + REVEAL
  =============================== */

  let triggered = false;

  if (twenty && scatterLayer && milePanel) {
    twenty.addEventListener("click", () => {

      if (triggered) return;
      triggered = true;

      gsap.to(twenty, { filter: "blur(0px)", duration: 0.4 });

      const rect = milePanel.getBoundingClientRect();

      for (let i = 0; i < 20; i++) {
        const span = document.createElement("span");
        span.classList.add("number");
        span.textContent = "20";

        span.style.top = Math.random() * rect.height + "px";
        span.style.left = Math.random() * rect.width + "px";
        span.style.transform = `rotate(${Math.random() * 360}deg)`;

        scatterLayer.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          duration: 0.5,
          delay: i * 0.05
        });
      }
    });
  }

  /* ===============================
     REVEAL TIRED PANEL
  =============================== */

  if (horizontalTween && tiredPanel && tiredText) {
    ScrollTrigger.create({
      trigger: tiredPanel,
      start: "left center",
      containerAnimation: horizontalTween,
      onEnter: () => {
        gsap.to(tiredText, {
          opacity: 1,
          y: -10,
          duration: 1.2,
          ease: "power3.out"
        });
      }
    });
  }

  /* ===============================
     FINAL PANEL ANIMATION
  =============================== */

  if (horizontalTween && finalPanel && finalText && finalZero) {
    ScrollTrigger.create({
      trigger: finalPanel,
      start: "left center",
      containerAnimation: horizontalTween,
      onEnter: () => {

        gsap.to(finalText, {
          fontSize: "3vw",
          duration: 1.4,
          ease: "power3.inOut",
          onComplete: () => {

            gsap.to(finalText, {
              opacity: 0,
              duration: 0.5
            });

            gsap.to(finalZero, {
              opacity: 1,
              duration: 1
            });

          }
        });

      }
    });
  }


  let isPlaying = false;

  if (music && musicToggle && musicIcon) {

    music.volume = 0.6;
    music.pause();

    musicToggle.addEventListener("click", () => {

      if (!isPlaying) {
        music.play().then(() => {
          musicIcon.src = "audio/red-note.png";
          isPlaying = true;
        }).catch(err => {
          console.log("Playback blocked:", err);
        });

      } else {
        music.pause();
        musicIcon.src = "audio/black-note.png";
        isPlaying = false;
      }

    });
  }

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

});


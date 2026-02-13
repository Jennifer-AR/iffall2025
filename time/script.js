document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

  /* ===================================
     SELECTORS
  =================================== */

  const ranTexts = document.querySelectorAll(".ran-text");
  const flowersText = document.querySelector(".flowers-text");
  const container = document.querySelector(".letter-container");
  const trigger = document.querySelector(".trigger-word");
  const partyLine = document.querySelector(".party-line");
  const partyScramble = document.querySelector(".party-scramble");
  const partyWords = document.querySelectorAll(".party-line span:not(.trigger-word)");
  const wrapper = document.querySelector(".horizontal-wrapper");
  const mileLine = document.querySelector(".mile-trigger-line");
  const mileExtra = document.querySelector(".mile-extra");
  const milePanel = document.querySelector(".mile-panel");
  const mileRow = document.querySelector(".mile-row");
  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");

  /* ===================================
     FLOWERS APPEAR FIRST
  =================================== */

  if (flowersText) {
    gsap.from(flowersText, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  }

  /* ===================================
     DELAY BEFORE RAN TEXT
  =================================== */

  if (ranTexts.length) {
    gsap.delayedCall(2.0, () => {

      ranTexts.forEach((el, i) => {

        gsap.to(el, {
          opacity: 1,
          duration: 0.8,
          delay: i * 0.6
        });

        gsap.to(el, {
          duration: 1.2,
          delay: i * 0.6 + 0.4,
          scrambleText: {
            text: "BUT I RAN OUT OF TIME",
            chars: "■▪",
            speed: 0.3
          },
          ease: "none"
        });

      });

    });
  }

  /* ===================================
     HORIZONTAL SCROLL
  =================================== */

gsap.to(wrapper, {
  x: () => -(wrapper.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    start: "top top",
    end: () => "+=" + wrapper.scrollWidth,
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true
  }
});

  /* ===================================
     PARTY LETTER BACKGROUND
  =================================== */

  if (container) {

    const characters = "DIDNTWANTTOSHOWUPTOTHEPARTYEMPTYHANDED";

    for (let i = 0; i < 40; i++) {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent =
        characters[Math.floor(Math.random() * characters.length)];

      span.style.top = Math.random() * 100 + "vh";
      span.style.left = Math.random() * 100 + "vw";

      container.appendChild(span);
    }

    const letters = document.querySelectorAll(".letter");

    gsap.to(letters, {
      opacity: 1,
      duration: 0.4,
      stagger: {
        each: 0.05,
        repeat: -1,
        yoyo: true
      },
      ease: "power1.inOut"
    });
  }

  /* ===================================
     PARTY WORD STAGGER
  =================================== */

  if (partyWords.length) {
    gsap.from(partyWords, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.5
    });
  }

 /* ===================================
   PARTY SEQUENCE
=================================== */

if (trigger && partyLine) {

  // Show EMPTYHANDED after delay
  gsap.delayedCall(2, () => {
    gsap.to(trigger, {
      opacity: 1,
      duration: 1
    });
  });

  // Click EMPTYHANDED
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();

    // Turn background black
    gsap.to("body", {
      backgroundColor: "#000",
      duration: 1
    });

    // Hide rest of sentence
    gsap.to(partyLine.querySelectorAll("span:not(.trigger-word)"), {
      opacity: 0,
      duration: 0.5
    });

    // Scramble EMPTYHANDED into final text
    gsap.to(trigger, {
      duration: 1.8,
      scrambleText: {
        text: "BUT I RAN OUT OF TIME",
        chars: "■▪",
        speed: 0.3
      },
      ease: "none"
    });
  });
}


if (mileLine && mileExtra && milePanel) {

  mileLine.addEventListener("click", () => {

    // Extend line to full viewport width
    gsap.to(mileLine, {
      width: "150vw",
      duration: 1.3,
      ease: "power4.out"
    });

    // Slide entire row left so sentence disappears
    gsap.to(".mile-row", {
      x: "-200vw",
      duration: 1.6,
      ease: "power3.inOut"
    });

    // Flip background to white
    gsap.to(milePanel, {
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 1,
      delay: 0.9
    });

    // Make line black after flip
    gsap.to(mileLine, {
      backgroundColor: "#000000",
      duration: 0.5,
      delay: 0.9
    });

    // Reveal THE EXTRA MILE
    gsap.to(mileExtra, {
      opacity: 1,
      duration: 1,
      delay: 1.4
    });

  });

}

function revealFailure() {

  cursor.style.display = "none";

  const fail = document.createElement("div");
  fail.className = "final-line";
  fail.textContent = "BUT I RAN OUT OF TIME";

  document.querySelector(".letter-page").appendChild(fail);

  gsap.from(fail, {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power3.out"
  });
}

    // Click EXTRA MILE → go to new page
    mileExtra.addEventListener("click", () => {
      window.location.href = "type.html";
    });

let isPlaying = false;

if (musicToggle && music && musicIcon) {

  music.volume = 0.6; // optional
  music.pause(); // ensure off by default

  musicToggle.addEventListener("click", () => {

    if (!isPlaying) {
      music.play().then(() => {
        musicIcon.src = "audio/red-note.png";
        isPlaying = true;
      }).catch(err => {
        console.log("Audio play blocked:", err);
      });

    } else {
      music.pause();
      musicIcon.src = "audio/black-note.png";
      isPlaying = false;
    }

  });

}

    })



// Time Countdown
  const grid = document.getElementById("grid");
  const totalTiles = 207; // adjust for density

  for (let i = 0; i < totalTiles; i++) {
    const span = document.createElement("span");
    span.textContent = "0";
    grid.appendChild(span);

    let count = 10;

    const delay = Math.random() * 2000; // staggered anxiety

    setTimeout(() => {
      const interval = setInterval(() => {
        span.textContent = count;
        count--;

        if (count < 0) {
          clearInterval(interval);
          span.textContent = "0";
        }
      }, 400);
    }, delay);
  }

  const lines = document.querySelectorAll(".line");

  document.body.addEventListener("click", () => {
    gsap.to(lines, {
      width: 420,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.06
    });
  });

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});


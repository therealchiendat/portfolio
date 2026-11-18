/**
 * Scroll "threshold" between the intro and the portfolio.
 *
 * At the top of the page, wheel/touch movement doesn't scroll. It fills a
 * progress indicator (the --p custom property) and, once it crosses the
 * threshold, the page flips down to the portfolio. Let go early and the
 * progress drains back. The mirror gesture at the top of the portfolio
 * flips back to the intro. Keyboard users flip straight away.
 */
const WHEEL_PX = 450; // wheel travel needed to fill the indicator
const TOUCH_PX = 220; // swipe travel needed to fill the indicator
const DRAIN_PER_SEC = 1.4;

interface Options {
  stage: HTMLElement; // receives --p while flipping forward
  backEl: HTMLElement; // receives --p while flipping back
}

export function createScrollGate({ stage, backEl }: Options) {
  let p = 0;
  let dir: 1 | -1 = 1;
  let lastInput = 0;
  let lastFrame = 0;
  let raf = 0;
  let animating = false;
  let touchY = 0;

  const stageH = () => stage.offsetHeight;
  // Only gate when the whole intro fits on screen, otherwise people could
  // never scroll to see the rest of it (e.g. a phone in landscape).
  const fits = () => stageH() <= window.innerHeight + 2;
  const atIntro = () => window.scrollY <= 1;
  const atBoundary = () => Math.abs(window.scrollY - stageH()) <= 2;

  function apply() {
    stage.style.setProperty('--p', String(dir === 1 ? p : 0));
    backEl.style.setProperty('--p', String(dir === -1 ? p : 0));
  }

  function setDir(d: 1 | -1) {
    if (dir !== d) { dir = d; p = 0; }
  }

  function drain(t: number) {
    raf = 0;
    if (!animating && t - lastInput > 140 && p > 0) {
      p = Math.max(0, p - ((t - lastFrame) / 1000) * DRAIN_PER_SEC);
      apply();
    }
    lastFrame = t;
    if (p > 0 && !animating) raf = requestAnimationFrame(drain);
  }

  function startDrain() {
    if (raf) return;
    lastFrame = performance.now();
    raf = requestAnimationFrame(drain);
  }

  function commit(direction: 1 | -1) {
    if (animating) return;
    animating = true;
    setDir(direction);
    p = 1;
    apply();
    const target = direction === 1 ? stageH() : 0;
    window.scrollTo({ top: target, behavior: 'smooth' });
    const started = performance.now();
    const wait = () => {
      if (Math.abs(window.scrollY - target) <= 2 || performance.now() - started > 1600) {
        animating = false;
        p = 0;
        apply();
      } else {
        setTimeout(wait, 50);
      }
    };
    setTimeout(wait, 50);
  }

  // Returns true when the gesture was used up by the gate (so the caller
  // should stop the browser from scrolling).
  function push(dy: number, px: number): boolean {
    if (!fits()) return false;
    if (animating) return atIntro() || atBoundary();
    if (atIntro()) {
      setDir(1);
      p = Math.min(1, Math.max(0, p + dy / px));
    } else if (atBoundary() && dy < 0) {
      setDir(-1);
      p = Math.min(1, p + -dy / px);
    } else {
      return false;
    }
    lastInput = performance.now();
    apply();
    if (p >= 1) commit(dir); else startDrain();
    return true;
  }

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey) return; // pinch-zoom
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
    if (push(dy, WHEEL_PX) && e.cancelable) e.preventDefault();
  };
  const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
  const onTouchMove = (e: TouchEvent) => {
    const y = e.touches[0].clientY;
    const dy = touchY - y;
    touchY = y;
    if (push(dy, TOUCH_PX) && e.cancelable) e.preventDefault();
  };
  const onKey = (e: KeyboardEvent) => {
    if (animating || document.activeElement !== document.body || !fits()) return;
    const forward = ['ArrowDown', 'PageDown', 'End', ' '].includes(e.key) && !e.shiftKey;
    const back = ['ArrowUp', 'PageUp', 'Home'].includes(e.key) || (e.key === ' ' && e.shiftKey);
    if (forward && atIntro()) { e.preventDefault(); commit(1); }
    else if (back && atBoundary()) { e.preventDefault(); commit(-1); }
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('keydown', onKey);

  return () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKey);
    cancelAnimationFrame(raf);
    p = 0;
    apply();
  };
}

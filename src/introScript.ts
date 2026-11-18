import { education, experience, profile, projects } from './content';

// The page "writes" this CSS live. Selectors only touch the intro stage so
// nothing leaks into the portfolio below.
export const cssA = `/**
 * Hello, I'm Dat.
 * I am an engineer by degree,
 * a developer by profession,
 * and an artist by heart.
 *
 * I build websites, and pretty things.
 *
 * Let's build this page... from scratch!
 */

.stage, .stage pre, .windows, .windows > div {
  transition: background-color 1s, color 1s, grid-template-columns 1s,
    max-height 1s, opacity 1s, gap 1s, transform 1s;
}

/**
 * That didn't do anything. Yet!
 *
 * Oh wait... almost forgot. Front end doesn't suck.
 */

#sucks span {
  display: none;
}

#sucks:before {
  text-decoration: line-through;
  content: 'Sucks';
}

#sucks:after {
  content: ' Is Awesome!';
  color: rgb(0, 175, 255);
}

/**
 * Ah, that's better!
 */

.stage {
  background: rgb(63, 82, 99);
  color: white;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}

/**
 * This looks like some kind of CSS code, doesn't it?
 */

.stage pre {
  border: 1px solid #ccc;
  background: rgb(48, 48, 48);
  color: #fff;
  font-size: 14px;
  padding: 1vh 0.5vw;
  box-shadow: -4px 4px 2px 0 rgba(0, 0, 0, 0.3);
}

#code-window-container:before {
  content: ' index.css';
}

/**
 * Impressed?... Now let's get ready to do some "movement".
 * Make some room for a second window.
 */

.windows {
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

#resume-window-container {
  opacity: 1;
  max-height: 80vh;
  overflow: visible;
}

/**
 * This is good, but the code is not formatted.
 * Let's make it more readable!
 */

.tk-comment  { color: #857F6B; font-style: italic; }
.tk-selector { color: #E69F0F; }
.tk-key      { color: #64D5EA; }
.tk-value    { color: #BE84F2; }

/**
 * Now we're getting somewhere.
 * Time for some change in perspective.
 */

.windows {
  perspective: 1000px;
}

#code-window-container {
  transform-origin: right;
  transform: rotateY(calc(-15deg + var(--tilt-x, 0deg))) rotateX(var(--tilt-y, 0deg));
}

/**
 * This is supposed to be my portfolio
 * but I have nothing.
 * Actually... I do have something!
 * So I am making my resume here, because why not!
 */

#resume-window-container {
  transform-origin: left;
  transform: rotateY(calc(15deg + var(--tilt-x, 0deg))) rotateX(var(--tilt-y, 0deg));
}

#resume-window-container:before {
  content: ' resume.md';
}
`;

export const cssB = `
/**
 * That markdown on the left doesn't look great.
 * Let's render it.
 */

@keyframes render {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

#resume-window .rendered {
  animation: render 2s forwards;
}

/**
 * Alright. We're ready.
 *
 * 3...
 * 2...
 * 1...
 *
 * Okay here we go!
 */
`;

export const cssC = `
/**
 * The text could use some tweaks.
 */

#md {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}

#md ul, #md p {
  margin: 0;
}

#md h1, #md h2 {
  margin: 8px 0 4px;
  display: inline-block;
  color: #ddd;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

/**
 * One last thing. Let the windows follow your mouse.
 */

.windows > div {
  transition: transform 0.15s ease-out;
}

/**
 * We're almost done.
 */

.stage pre:hover {
  box-shadow: 0 0 40px 5px rgba(255, 255, 255, 0.4);
}

/**
 * I hope you enjoyed this. The real portfolio is just below.
 */
`;

export const resumeMd = `# Dat's Resume

${profile.name}
${profile.role}

## Contact

* ${profile.email}
* github.com/therealchiendat
* linkedin.com/in/chiendat

## Experience

${experience.map((j) => `* ${j.company}: ${j.title} (${j.period})`).join('\n')}

## Projects

${projects.map((p) => `* ${p.name}`).join('\n')}

## Education

* ${education.school}, ${education.period}
`;

export const fullCss = cssA + cssB + cssC;

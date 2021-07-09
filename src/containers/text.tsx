export const textContent = new Array(`<span class="comment">/**
 * Hello, I'm Dat.
 * I am an engineer by degree,
 * a developer by profession,
 * and an artist by heart.
 *
 * I build websites, and pretty things.
 *
 * Let's build this website... from scratch!
 */</span>

<span class="selector">*</span> {
  <span class="key">transition</span>:<span class="value"> all 1s</span>;
}

<span class="comment"> 
/**
 * That didn't do anything. Yet!
 * 
 * Oh Wait... almost forgot. Front end doesn't suck.
 */</span> 

<span class="selector">#sucks span</span> {
  <span class="key">display</span>:<span class="value"> none</span>;
}

<span class="selector">#sucks:before</span> {
  <span class="key">text-decoration</span>:<span class="value"> line-through</span>;
  <span class="key">content</span>:<span class="value"> 'Sucks'</span>;
}

<span class="selector">#sucks:after</span> {
  <span class="key">content</span>:<span class="value"> ' Is Awesome!'</span>;
  <span class="key">color</span>:<span class="value"> rgb(0, 175, 255)</span>;
}

<span class="comment"> 
/**
 * Ah, that's better!
 */</span>

<span class="selector">html</span> {
  <span class="key">background</span>:<span class="value"> rgb(63, 82, 99)</span>;
}

<span class="selector">pre, a, #title, #code-window-container, #resume-window-container</span> {
  <span class="key">color</span>:<span class="value"> white</span>;
}

<span class="comment"> 
/**
 * This looked like some kind of CSS code, doesn't it?
 */</span>

<span class="selector">pre:not(:empty)</span> {
  <span class="key">overflow</span>:<span class="value"> auto</span>;
  <span class="key">border</span>:<span class="value"> 1<span class="px">px</span> solid #ccc</span>;
  <span class="key">background</span>:<span class="value"> rgb(48, 48, 48)</span>;
  <span class="key">max-height</span>:<span class="value"> 50<span class="px">vh !important</span></span>;
  <span class="key">width</span>:<span class="value"> 48<span class="px">vw !important</span></span>;
  <span class="key">font-family</span>:<span class="value"> monospace</span>;
  <span class="key">font-size</span>:<span class="value"> 14<span class="px">px</span></span>;
  <span class="key">overflow-wrap</span>:<span class="value"> break-word</span>;
  <span class="key">padding</span>:<span class="value"> 1<span class="px">vh</span> 0.5<span class="px">vw</span></span>;
  <span class="key">white-space</span>:<span class="value"> pre-wrap</span>;
  <span class="key">outline</span>:<span class="value"> 0</span>;
  <span class="key">margin</span>:<span class="value"> 1<span class="px">vh</span> 0.5<span class="px">vw</span></span>;
  <span class="key">box-shadow</span>:<span class="value"> -4<span class="px">px</span> 4<span class="px">px</span> 2<span class="px">px</span> 0 rgba(0,0,0,0.3)</span>;
}

<span class="selector">#code-window-container:before</span> {
  <span class="key">content</span>:<span class="value"> ' index.css'</span>;
}
<span class="comment"> 
/**
 * Impressed?...
 * Okay... Now let's get ready to do some "movement".
 */</span>

<span class="selector">#code-window-container</span> {
    <span class="key">position</span>:<span class="value"> absolute</span>;
    <span class="key">transform</span>:<span class="value"> translateX(95<span class="px">%</span>)</span>;
}

<span class="comment"> 
/**
 * This is good, but the code is not formated.
 * Let's make it more readable!
 */</span>

<span class="selector">.comment      </span> { <span class="key">color</span>:<span class="value"> #857F6B</span>; <span class="key">font-style</span>:<span class="value"> italic</span>;}
<span class="selector">.selector     </span> { <span class="key">color</span>:<span class="value"> #E69F0F</span>;}
<span class="selector">.key          </span> { <span class="key">color</span>:<span class="value"> #64D5EA</span>;}
<span class="selector">.value        </span> { <span class="key">color</span>:<span class="value"> #BE84F2</span>;}
<span class="selector">.value .px    </span> { <span class="key">color</span>:<span class="value"> #F92772</span>;}

<span class="comment"> 
/**
 * Now we're getting somewhere.
 * Time for some change in perspective.
 */</span>

<span class="selector">.Home</span> {
  <span class="key">perspective</span>:<span class="value"> 1000<span class="px">px</span></span>;
}

<span class="selector">#code-window-container</span> {
  <span class="key">transform-origin</span>:<span class="value"> right</span>;
  <span class="key">transform</span>:<span class="value"> translateX(95<span class="px">%</span>) rotateY(-15<span class="px">deg</span>)</span>;
}
<span class="selector">pre:not(:empty)</span> {
  <span class="key">max-height</span>:<span class="value"> 75<span class="px">vh !important</span></span>;
}

<span class="comment"> 
/**
 * This is supposed to be my portfolio
 * but I have nothing.
 * actually...
 * I do have something!
 * Just, let's say, not good...
 * So I am making my resume here, because why not!
 */</span>

 
<span class="selector">#resume-window-container</span> {
  <span class="key">transform-origin</span>:<span class="value"> left</span>;
  <span class="key">transform</span>:<span class="value"> rotateY(15<span class="px">deg</span>)</span>;
  <span class="key">width</span>:<span class="value"> 48<span class="px">vw</span></span>;
}

<span class="selector">#resume-window-container:before</span> {
  <span class="key">content</span>:<span class="value"> ' resume.md'</span>;
}`);

export const textContent1 = new Array(`
<span class="comment"> 
/**
 * That markdown on the left doesn't look great. Let's render it.
 */</span>


<span class="selector">#resume-window #md:before</span> {
  <span class="key">content</span>:<span class="value"> ''</span>;
  <span class="key">width</span>:<span class="value"> 100<span class="px">%</span></span>;
  <span class="key">height</span>:<span class="value"> 93<span class="px">%</span></span>;
  <span class="key">position</span>:<span class="value"> absolute</span>;
  <span class="key">animation</span>:<span class="value"> render 2<span class="px">s</span> forwards</span>;
}

<span class="key">@keyframes</span> <span class="selector">render</span> {
  <span class="selector">0</span><span class="px">%</span> {
    <span class="key">background-color</span>:<span class="value"> white</span>;
    <span class="key">opacity</span>:<span class="value"> 0</span>;
  }
  <span class="selector">10</span><span class="px">%</span> {
    <span class="key">background-color</span>:<span class="value"> white</span>;
    <span class="key">opacity</span>:<span class="value"> 1</span>;
  }
  <span class="selector">99</span><span class="px">%</span> {
    <span class="key">opacity</span>:<span class="value"> 0</span>;
  }
  <span class="selector">100</span><span class="px">%</span> {
    <span class="key">z-index</span>:<span class="value">-1</span>;
  }
}

<span class="comment"> 
/**
 * Alright. We're ready.
 *
 * 3...
 * 2...
 * 1...
 *
 *
 * Okay here we go!`)
export const textContent2 = new Array(`
 *
 */</span>


<span class="comment"> 
/**
 * The text could use some tweaks.
 */</span>

<span class="selector">#md</span> {
    <span class="key">font-family</span>:<span class="value"> "Helvetica Neue", Helvetica, sans-serif</span>;
}

<span class="selector">#md ul, #md p</span> {
  <span class="key">margin</span>:<span class="value"> 0<span class="px">px</span></span>;
}

<span class="selector">#md h1, #md h2, #md h3, #md h4, #md h5, #md h6</span> {
  <span class="key">margin</span>:<span class="value"> 0<span class="px">px</span></span>;
  <span class="key">display</span>:<span class="value"> inline-block</span>;
  <span class="key">color</span>:<span class="value"> #ddd</span>;
  <span class="key">border-bottom</span>:<span class="value"> 1<span class="px">px</span> solid #ccc</span>;
  <span class="key">padding-bottom</span>:<span class="value"> 5<span class="px">px</span></span>;
}


<span class="comment"> 
/**
 * We're almost done.
 */</span>

<span class="selector">pre:hover</span> {
  <span class="key">box-shadow</span>:<span class="value"> 0<span class="px">px</span> 0<span class="px">px</span> 40<span class="px">px</span> 5<span class="px">px</span> rgba(255,255,255,0.4)</span>;
}

<span class="selector">#skip-animation, #pause-resume</span> {
  <span class="key">display</span>:<span class="value"> none</span>;
}

<span class="comment"> 
/**
 * I hope you enjoyed this.
 *
 * Thanks to Jake Albaugh, who was the first (that I know of) to do
 * a page like this. Some of the code is adapted from work.
 *
 * See more of Jake's work at http://codepen.io/jakealbaugh/
 */</span>
`);

export default {textContent, textContent2};
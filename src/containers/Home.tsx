import { useEffect } from 'react';
import { textContent, textContent1, textContent2 } from './text';
import { resumeContent, resumeContentRenderred } from './resume';

let iSpeed = 30; // time delay of print out
let iIndex = 0; // start printing array at this posision
let iTextPos = 0; // initialise text position
let textContents = ''; // initialise contents letiable
let resumeContents = ''; // initialise contents letiable
let textLength = 0; // the length of the text array
let bracketFlag = 0; // keep track of brackets
let htmlElem = '';
let spanFlag = false;

export default function Home() {

    const longHold = ['.', '?', '/']
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = '';
        document.head.appendChild(styleSheet);
        setTimeout(() => begin(), 1000);
    })

    async function begin() {
        textLength = textContent[0].length;
        typewriterText(textContent);

    }

    function typewriterText(code: Array<string>) {
        let destination = document.getElementById("code-window")
        if (!destination) return '';
        const lastChar = code[iIndex].substring(iTextPos - 1, iTextPos);
        if (spanFlag || lastChar === '<') {
            htmlElem += lastChar;
            spanFlag = true;
            if (lastChar === '>') {
                textContents += htmlElem;
                htmlElem = '';
                spanFlag = false;
            }
        } else {
            textContents += lastChar;
            destination.innerHTML = textContents + "_";
            const text = destination.innerText;
            const styleSheet = document.createElement("style");
            styleSheet.innerText = text;
            document.head.replaceChild(styleSheet, document.head.childNodes[0])
        }


        if (lastChar === "{") {
            bracketFlag++;
        } else if (lastChar === "}") {
            bracketFlag--;
        }
        if (iTextPos++ === textLength) {
            iTextPos = 0;
            iIndex = 0;
            textLength = resumeContent[0].length;
            if (code === textContent) {
                typewriterResume();
            } else if (code === textContent1) {
                renderResume();
            }
        } else if (bracketFlag === 0 && lastChar === '.') {
            setTimeout(_ => typewriterText(code), 20 * iSpeed)
        } else if (bracketFlag === 1) {
            setTimeout(_ => typewriterText(code), 5)
        }
        else if (spanFlag) {
            setTimeout(_ => typewriterText(code), 0);
        } else {
            setTimeout(_ => typewriterText(code), iSpeed);
        }
        destination.scroll(0, destination.scrollHeight);
    }

    function typewriterResume() {
        let destination = document.getElementById("resume-window")
        if (!destination) return '';
        const lastChar = resumeContent[iIndex].substring(iTextPos - 1, iTextPos);
        if (spanFlag || lastChar === '<') {
            htmlElem += lastChar;
            spanFlag = true;
            if (lastChar === '>') {
                resumeContents += htmlElem;
                htmlElem = '';
                spanFlag = false;
            }
        } else {
            resumeContents += lastChar;
            destination.innerHTML = resumeContents + "_";
        }
        if (iTextPos++ === textLength) {
            iTextPos = 0;
            iIndex = 0;
            textLength = textContent1[0].length;
            typewriterText(textContent1);
        } else {
            setTimeout(typewriterResume, iSpeed);
        }
        destination.scroll(0, destination.scrollHeight);
    }

    function renderResume() {
        let destination = document.getElementById("resume-window")
        if (!destination) return '';
        const renderredContent = resumeContentRenderred[iIndex].substring(0, resumeContentRenderred[0].length);
        destination.innerHTML = renderredContent;
        iTextPos = 0;
        iIndex = 0;
        textLength = textContent2[0].length;
        typewriterText(textContent2);
    }

    return (
        <div className="Home">
            <div id="page-container">
                <span>
                    <h1 id="title">
                        Front End&nbsp;
                        <b id="sucks">
                            <span>Sucks</span>
                        </b>
                    </h1>
                </span>
                <div id="code-window-container">
                    <pre id="code-window"></pre>
                </div>
                <div id="resume-window-container">
                    <pre id="resume-window">

                    </pre>

                </div>
            </div>
            <div id="other-window">
            </div>
        </div>
    );

}
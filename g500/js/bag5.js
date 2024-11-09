
function safeSetInnerHTML(elementId, innerHTMLContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = innerHTMLContent;
    } else {
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}

safeSetInnerHTML("btb_title_1", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 193-204: Engine Top Assembly</h1></div>`);
safeSetInnerHTML("btb_icon_1_1", `<div class="icon-container"><i class="fas fa-lock"></i></div><div class="title-container"></div><div class="content-container"></div>`);
safeSetInnerHTML("btb_icon_1_2", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container"></div><div class="content-container"></div>`);
safeSetInnerHTML("btb_maintext_1", `<div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the top of the engine, which is represented as a 6-cylinder configuration in the LEGO model. As mentioned earlier, the real Mercedes-Benz G500 has transitioned to a <strong>turbocharged 3.0-liter inline-six engine</strong> for the 2025 model year, replacing the previous V8 configuration. This change reflects advancements in performance and efficiency, with the inline-six producing <strong>443 horsepower</strong> while maintaining robust power delivery.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">The engine top we're building includes representations of key components such as the cylinder heads, valve covers, and intake manifolds.</p></div>`);
safeSetInnerHTML("btb_image_1", `<img src="https://github.com/behind-the-builds/btb/g500/images/Mercedes-AMG_M_177_Typ_205.jpg" alt="AMG V8 Engine - A representation of earlier high-performance variants.">`);
safeSetInnerHTML("btb_caption_1", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">AMG V8 Engine - A representation of earlier high-performance variants.</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-AMG_M_177_Typ_205.jpg" target="_blank">source</a></p></div>`);

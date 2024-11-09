
function safeSetInnerHTML(elementId, innerHTMLContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = innerHTMLContent;
    } else {
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}

safeSetInnerHTML("btb_title_1", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 316-327: Driver's Side</h1></div>`);
safeSetInnerHTML("btb_icon_1_1", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container"></div><div class="content-container"></div>`);
safeSetInnerHTML("btb_icon_1_2", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container"></div><div class="content-container"></div>`);
safeSetInnerHTML("btb_maintext_1", `<div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we complete the <strong>driver's side</strong> of the cabin frame. The driver’s side is designed with ergonomics in mind, ensuring that controls are easily accessible while maintaining a commanding view of the road. This thoughtful design reflects Mercedes-Benz's commitment to driver comfort and functionality.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">The G-Class has historically been praised for its spacious interior and high driving position, which enhances visibility both on-road and off-road. As part of its evolution, modern models have incorporated luxury features without sacrificing practicality, making it a versatile choice for various driving conditions.</p></div>`);
safeSetInnerHTML("btb_image_1", `<img src="https://github.com/behind-the-builds/btb/g500/images/G-Class_assembly,_2009_(43).JPG" alt="Fully assembled G-Class in factory">`);
safeSetInnerHTML("btb_caption_1", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Fully assembled G-Class in factory</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:G-Class_assembly,_2009_(43).JPG" target="_blank">source</a></p></div>`);
safeSetInnerHTML("btb_title_2", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 8: Rear Seats Construction</h1></div>`);
safeSetInnerHTML("btb_icon_2_1", `<div class="icon-container"><i class="fas fa-eye"></i></div><div class="title-container"></div><div class="content-container"></div>`);
safeSetInnerHTML("btb_icon_2_2", `<div class="icon-container"><i class="fas fa-chair"></i></div><div class="title-container"></div><div class="content-container"></div>`);
safeSetInnerHTML("btb_maintext_2", `<div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 8, we focus on constructing the <strong>rear seats</strong> of the G-Class model. These seats are designed to be fully functional, allowing them to fold down just like in the real vehicle. This feature enhances the versatility of the model, reflecting the practicality that the G-Class offers in real-world applications.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">The rear seating area of the G-Class has evolved significantly since its inception. Originally designed for military use, the G-Class's rear seats were utilitarian, focusing on durability and functionality. Over time, as the G-Class transitioned into a luxury SUV, the rear seating area has been upgraded to provide enhanced comfort and convenience for passengers.</p></div>`);
safeSetInnerHTML("btb_image_2", `<img src="https://github.com/behind-the-builds/btb/g500/images/Hard_Weather_-_Cold_Response_2009_(cropped).jpg" alt="G-Class in snow">`);
safeSetInnerHTML("btb_caption_2", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">G-Class in snow</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Hard_Weather_-_Cold_Response_2009_(cropped).jpg" target="_blank">source</a></p></div>`);

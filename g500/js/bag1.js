const styleElement = document.createElement("style");

// Define your CSS as a string
styleElement.textContent = `
  .primary-title-container h1 {
    color: black;
  }
  .title-container h1 {
    color: red;
  }
  .icon-container {
    color: red;
  }
  .caption-container p {
    color: red;
  }
  /* Hide the chapter title and lesson title on the lesson page */
  .course-item__chapter-title,
  .course-item__lesson-title {
      display: none;
  }
`;

// Append the <style> element to the document head
document.head.appendChild(styleElement);






function safeSetInnerHTML(elementId, innerHTMLContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = innerHTMLContent;
    } else {
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}

safeSetInnerHTML("btb_title_1", `<div class="primary-title-container"><h1 style="white-space:pre-wrap;">Bag 1: Front Differential and Drivetrain</h1></div>`);
safeSetInnerHTML("btb_icon_1_1", `<div class="icon-container"><i class="fas fa-clock"></i></div><div class="title-container">Enduring Legacy</div><div class="content-container">From 1979 military origins to luxury icon, the G-Wagen maintains its distinctive boxy design and off-road prowess.</div>`);
safeSetInnerHTML("btb_icon_1_2", `<div class="icon-container"><i class="fas fa-truck"></i></div><div class="title-container">Professional Grade</div><div class="content-container">The Professional Line emphasizes utility and extreme capability, returning the G-Class to its rugged roots.</div>`);
safeSetInnerHTML("btb_maintext_1", `<div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">In this first stage, we begin assembling the <strong>front differential</strong> and <strong>drivetrain</strong> of our Mercedes-Benz G500 Professional Line model. The G-Class, affectionately known as the <strong>G-Wagen</strong>, has a storied history dating back to 1979. Originally conceived as a <strong>military vehicle</strong> at the suggestion of the Shah of Iran, it was developed for both civilian and military use. Over four decades, the G-Class has evolved from a utilitarian off-roader to an iconic <strong>luxury SUV</strong>, all while maintaining its core DNA and boxy silhouette.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Professional Line</strong>, introduced in 2016, represents a return to the G-Class's rugged roots. This variant emphasizes <strong>utility and off-road capability</strong> over luxury, featuring stripped-down interiors, robust body panels, and specialized equipment for extreme conditions. The <strong>G500 Professional Line</strong> combines the power of a V8 engine with the practicality of a workhorse vehicle, catering to industries like forestry, mining, and emergency services. Its front differential and drivetrain are engineered to tackle the most challenging terrains, embodying the G-Class philosophy of "Stronger Than Time."</p></div>`);
safeSetInnerHTML("btb_image_1", `<img src="https://behind-the-builds.github.io/btb/g500/images/Differential_Gear_(PSF).png" alt="A diagram of a differential gear">`);
safeSetInnerHTML("btb_caption_1", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">A diagram of a differential gear</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Differential_Gear_(PSF).png" target="_blank">source</a></p></div>`);
safeSetInnerHTML("btb_title_2", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 1-8: Front Differential</h1></div>`);
safeSetInnerHTML("btb_icon_2_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Differential Function</div><div class="content-container">Allows front wheels to rotate at different speeds during turns, crucial for both on-road handling and off-road traction.</div>`);
safeSetInnerHTML("btb_icon_2_2", `<div class="icon-container"><i class="fas fa-lock"></i></div><div class="title-container">Locking Capability</div><div class="content-container">Part of the G-Class's unique three locking differentials system, enhancing extreme off-road performance.</div>`);
safeSetInnerHTML("btb_maintext_2", `<div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>front differential</strong> of our model. The front differential is a crucial component of the G-Class's advanced <strong>four-wheel-drive system</strong>, allowing the front wheels to rotate at different speeds during turns while maintaining optimal traction.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">The G-Class stands out in the luxury SUV segment with its unique <strong>three locking differentials</strong> system – front, center, and rear. When engaged, the <strong>locking front differential</strong> locks the front wheels together, forcing them to rotate at the same speed. This feature proves invaluable in extreme <strong>off-road situations</strong>, allowing the G500 to maintain forward momentum even when one wheel loses traction. Such engineering contributes to the G-Wagen's ability to conquer diverse terrains, from rocky mountain trails to desert dunes, reinforcing its reputation as a go-anywhere vehicle.</p></div>`);

document.getElementById("btb_image_2").parentElement.style.display = "none";
document.getElementById("btb_caption_2").parentElement.style.display = "none";


safeSetInnerHTML("btb_title_3", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 9-16: Front Hubs and Suspension</h1></div>`);
safeSetInnerHTML("btb_icon_3_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Independent Front Suspension</div><div class="content-container">Introduced in 2019, aiming to improve on-road comfort and handling while maintaining off-road capability.</div>`);
safeSetInnerHTML("btb_icon_3_2", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Design Trade-offs</div><div class="content-container">The new suspension offers better articulation, but some argue it may compromise extreme off-road performance.</div>`);
safeSetInnerHTML("btb_maintext_3", `<div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>front hubs</strong> and <strong>suspension</strong> of our G-Class model. In 2019, Mercedes-Benz introduced an <strong>independent front suspension</strong>, replacing the solid front axle that had been a feature of the G-Class since 1979.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">This change aimed to improve the G-Class's <strong>on-road handling</strong> and ride comfort, addressing criticisms of the vehicle's sometimes harsh ride on paved roads. Mercedes-Benz states they worked to ensure this change didn't compromise the <strong>G-Wagen's off-road capabilities</strong>. The new design allows for better wheel articulation and more precise control, potentially enhancing both on-road stability and off-road performance.</p></div><div class="maintext-container"><p class="sqsrte-large" style="white-space:pre-wrap;">This modern setup uses a <strong>double-wishbone design</strong>, which allows for better wheel travel and improved ride quality. However, some purists argue that the solid axle design was superior for extreme off-road use.</p></div>`);
safeSetInnerHTML("btb_image_3", `<img src="https://github.com/behind-the-builds/btb/g500/images/Off-RoadPreparation.jpg" alt="A G500 off road">`);
safeSetInnerHTML("btb_caption_3", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">A G500 off road</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Off-RoadPreparation.jpg" target="_blank">source</a></p></div>`);

    // Select all elements with data-test="page-section"
    const sections = document.querySelectorAll('section[data-test="page-section"]');
    
    // Set the nth element's visibility to hidden (e.g., third element)
    const nthElement = 2; // Adjust this to target the nth instance you need
    if (sections.length >= nthElement) {
        sections[nthElement].style.display = "none";
    }

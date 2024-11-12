
function isDesktopView() {
    return window.innerWidth > 750;
}


function safeSetInnerHTML(sectionIndex, className, innerHTMLContent) {
    console.log(`safeSetInnerHTML called with sectionIndex: ${sectionIndex} and className: ${className}`);

    // Use the helper function to get elements within the specified section and class
    const sectionElements = getElementsInSection(sectionIndex, className);

    if (sectionElements.length > 0) {
        // Set innerHTML for the first matched element in the section
        sectionElements[0].innerHTML = innerHTMLContent;
        console.log(`Set innerHTML for element with class '${className}' in section index '${sectionIndex}'.`);
    } else {
        console.warn(`Element with class '${className}' not found in section index '${sectionIndex}'.`);
    }
}

function toggleAudio(event, audioId, iconId, progressBarId) {
  event.preventDefault();
  const audio = document.getElementById(audioId);
  const playPauseIcon = document.getElementById(iconId);
  const progressBar = document.getElementById(progressBarId);

  if (audio.paused) {
    audio.play();
    playPauseIcon.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    playPauseIcon.classList.replace("fa-pause", "fa-play");
  }

  audio.ontimeupdate = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  };

  audio.onended = () => {
    playPauseIcon.classList.replace("fa-pause", "fa-play");
    progressBar.value = 0;
  };

  progressBar.addEventListener("input", (e) => {
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
  });
}

function getElementsInSection(sectionIndex, className) {
    // Locate all section elements
    const sections = document.querySelectorAll("section");
    
    // Ensure the sectionIndex is within bounds
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
        const section = sections[sectionIndex];
        
        // Find and return all elements within this section with the specified class name
        return section.querySelectorAll(`.${className}`);
    } else {
        console.warn(`Section index '${sectionIndex}' is out of bounds or section not found.`);
        return [];
    }
}

function applyGridLayout() {
    console.log("applyGridLayout called");

    if (typeof gridChanges === 'undefined') {
        console.warn("gridChanges is not defined. Skipping applyGridLayout.");
        return;
    }

    const isDesktop = isDesktopView();
    console.log("isDesktop:", isDesktop);
    console.log("gridChanges:", gridChanges);

    gridChanges.forEach((change, index) => {
        console.log(`Processing gridChange ${index + 1}:`, change);

        // Use the helper function to get elements within the specified section and class
        const sectionElements = getElementsInSection(change.sectionIndex, change.elementClass);
        console.log(`Elements found in section ${change.sectionIndex} with class '${change.elementClass}':`, sectionElements);

        sectionElements.forEach((element, elemIndex) => {
            console.log(`Processing element ${elemIndex + 1} of ${sectionElements.length}`);

            let target = element;
            for (let i = 0; i < 3; i++) {
                target = target.parentElement;
                if (!target) {
                    console.warn(`Stopped traversing: no parent element at level ${i + 1}`);
                    break;
                }
            }

            if (target) {
                console.log(`Applying styles to target for element with class '${change.elementClass}' in section ${change.sectionIndex}`);
                if (isDesktop) {
                    // Apply desktop-specific styles
                    for (const [property, value] of Object.entries(change.desktop)) {
                        console.log(`Setting ${property} to '${value}'`);
                        target.style[property] = value;
                    }
                } else {
                    // Remove desktop-specific styles by clearing them
                    for (const property in change.desktop) {
                        console.log(`Clearing ${property}`);
                        target.style[property] = "";
                    }
                }
            } else {
                console.warn(`Could not find target (great-grandparent) for element with class '${change.elementClass}' in section ${change.sectionIndex}`);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event fired");
    applyGridLayout();  // Apply initial layout
    window.addEventListener("resize", applyGridLayout);  // Adjust layout on resize
    console.log("Resize event listener added");
});

function hideExtraSections(totalSections) {
    const sections = document.querySelectorAll("section");

    // Loop over all sections starting from index 1 up to the second-last element
    for (let i = 1; i < sections.length - 1; i++) {
        // If this section index exceeds the number of written sections, hide it
        if (i > totalSections) {
            sections[i].style.display = "none";
        }
    }
}

function hideElement(className, sectionIndex) {
    console.log(`hideElement called with className: ${className} and sectionIndex: ${sectionIndex}`);

    // Use the helper function to get elements within the specified section and class
    const sectionElements = getElementsInSection(sectionIndex, className);
    console.log(`Number of elements found with class '${className}' in section ${sectionIndex}: ${sectionElements.length}`);

    sectionElements.forEach((element, index) => {
        console.log(`Processing element ${index + 1} of ${sectionElements.length}`);

        // Traverse up three levels to reach the great-grandparent
        let target = element;
        for (let i = 0; i < 3; i++) {
            if (!target) {
                console.warn(`Stopped traversing: no parent element at level ${i + 1}`);
                break;
            }
            target = target.parentElement;
        }

        // Apply display: none if the great-grandparent element exists
        if (target) {
            target.style.display = 'none';
            console.log(`Set display: none on great-grandparent of element with class '${className}' in section ${sectionIndex}`);
        } else {
            console.warn(`Could not find great-grandparent for ${className} in section ${sectionIndex}`);
        }
    });
}
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 20-31: Steering System</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Steering Evolution</div><div class="content-container">G-Class transitioned from recirculating ball to rack and pinion steering in 2019, improving on-road handling.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Off-Road to On-Road</div><div class="content-container">The new steering system balances the G-Class's legendary off-road prowess with improved everyday drivability.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_20_31.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this stage, we assemble the <strong>steering mechanism</strong> of our G-Class model. The G-Wagen's <strong>steering system</strong> has undergone significant changes over its long production history. For decades, the G-Class utilized a <strong>recirculating ball steering system</strong>, known for its durability and ability to handle heavy loads. This system was particularly well-suited to off-road use, providing good feedback and reliability in rugged conditions.</p><p class="sqsrte-large" style="white-space:pre-wrap;">However, with the <strong>2019 redesign</strong>, Mercedes-Benz made a significant change by switching to a <strong>rack and pinion steering system</strong>. This transition aimed to improve <strong>on-road handling</strong> and provide a more precise steering feel. Rack and pinion systems generally offer more direct steering response and better road feedback, enhancing the G-Class's performance on paved roads without compromising its off-road capabilities.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/RecirculatingBall.png" alt="Recirculating ball steering system">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Recirculating ball steering system</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:RecirculatingBall.png" target="_blank">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 2: Steering and Engine Assembly</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container">Iconic V8 Engine</div><div class="content-container">The G500 traditionally features a powerful 4.0-liter twin-turbo V8.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Compact Inline-Six Model</div><div class="content-container">The new inline-six engine allows for a compact and efficient design.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_2.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Mercedes-Benz G500</strong> engine is known for its robust power and off-road capability. Traditionally, the G500 has been equipped with a <strong>4.0-liter twin-turbo V8</strong> engine, delivering impressive power for both on-road and off-road performance. This V8 configuration has been a hallmark of the G-Class, providing the torque and durability necessary to navigate difficult terrains with ease.</p><p class="sqsrte-large" style="white-space:pre-wrap;">However, starting with the 2025 model year, the G500 has transitioned to a <strong>turbocharged 3.0-liter inline-six engine</strong>, which offers enhanced performance and efficiency while maintaining the vehicle's legendary capabilities.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/G_500_exterior,_silver_(Mercedes-Benz)_left_side,_exterior,_V8_logo_Mercedes-Benz.jpg" alt="V8 logo on a G500">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">V8 logo on a G500</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:G_500_exterior,_silver_(Mercedes-Benz)_left_side,_exterior,_V8_logo_Mercedes-Benz.jpg" target="_blank">source</a></p></div>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 32-51: Steering System</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Ackermann Steering</div><div class="content-container">Advanced geometry reduces tire wear and improves handling in tight turns.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Off-Road Precision</div><div class="content-container">Enhances maneuverability on rugged terrain, crucial for the G-Class's capabilities.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_32_51.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these instructions, we build the functional steering system of the model which, impressively for a LEGO model, incorporates <strong>Ackermann steering geometry</strong>. This design principle, used in almost all real vehicles, ensures that the inner wheel turns at a sharper angle than the outer wheel during cornering.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Ackermann steering geometry provides several benefits in full-size vehicles. It reduces tire scrub during turns, which decreases wear and improves handling, especially at lower speeds and in tight spaces. For off-road vehicles like the G-Class, this steering design enhances maneuverability on rugged terrain, allowing for precise navigation around obstacles.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Ackermann.jpg" alt="Diagram of Ackermann steering principle">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Diagram of Ackermann steering principle</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Ackermann.svg" target="_blank">source</a></p></div>`);
hideExtraSections(3);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

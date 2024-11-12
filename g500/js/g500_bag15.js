
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 622-636: Hood Assembly</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Functional Aesthetics</div><div class="content-container">The hood serves to protect the engine while maintaining the G-Class’s iconic and timeless look.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-award"></i></div><div class="title-container">Lasting Appeal</div><div class="content-container">G-Class’s design balance led to exclusive releases, like the G63 AMG 6x6 and G650 Maybach.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_622_636.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this final stage of hood assembly, we bring together the central hood panel, completing the engine cover. The hood itself serves both functional and stylistic purposes, protecting the engine from harsh environments while enhancing the G-Class’s recognizable look.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Despite the G-Class’s iconic status, Mercedes-Benz has carefully balanced updates to meet modern standards while preserving its heritage. The G-Class was revamped in 2018 with a new platform for improved handling, but the exterior—including the hood—remained largely unchanged, preserving the look that enthusiasts love. This combination of timeless design with cutting-edge engineering has contributed to the G-Class’s lasting appeal, leading to special editions and limited releases, such as the G63 AMG 6x6, and even the ultra-exclusive G650 Maybach Landaulet.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-Maybach_G_650_Landaulet_IMG_0753.jpg" alt="G650 Maybach Landaulet">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">G650 Maybach Landaulet</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-Maybach_G_650_Landaulet_IMG_0753.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 15: Front Wheel Wells, Headlights, and Rear Bumper</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Functional Design</div><div class="content-container">Designed with off-road adaptability, allowing extra suspension room for smooth operation.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Classic G-Class Style</div><div class="content-container">Signature features echo the G-Class’s durable military origins and modern luxury.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_15.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 15, we assemble the <strong>front wheel wells</strong>, <strong>headlights</strong>, and <strong>rear bumper</strong> with taillights for our G-Class model. In this LEGO version, the front wheel wells have been designed with extra room to accommodate the suspension’s movement. This adaptation allows the model’s suspension to travel more freely during play, reflecting the off-road capability of the real G-Class.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The G-Class components, from its boxy headlights to its rugged rear bumper, showcase Mercedes-Benz’s blend of durability and style. Initially developed for military use, the G-Wagen's features are now icons of luxury. These parts stay true to the G-Class aesthetic, bridging its practical roots and upscale evolution.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes_G_500.jpg" alt="Mercedes-Benz G500">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Mercedes-Benz G500</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes_G_500.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 637-664: Front Wheel Wells and Headlights</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-lightbulb"></i></div><div class="title-container">Iconic Headlights</div><div class="content-container">Square headlights have been a defining feature of the G-Class since its launch.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Off-Road Capability</div><div class="content-container">Extra room in wheel wells reflects suspension travel for navigating rugged terrain.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_637_664.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we build the <strong>front wheel wells</strong> and <strong>headlights</strong>. The G-Class’s distinctive headlights have remained a defining feature since the vehicle’s debut. When the G-Class was redesigned in 2018, Mercedes-Benz preserved the headlight shape, symbolizing its rugged heritage and timeless appeal.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The headlights were initially all about durability, built to withstand rough conditions. With technological upgrades, they now incorporate advanced lighting without losing their iconic shape. The LEGO model’s raised wheel wells also allow more suspension travel, echoing the G-Class’s off-road resilience and adapting it for play.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/G_500_exterior,_silver_(Mercedes-Benz)_left_side,_exterior,_front.jpg" alt="G500 front headlight">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">G500 front headlight</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:G_500_exterior,_silver_(Mercedes-Benz)_left_side,_exterior,_front.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideExtraSections(3);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

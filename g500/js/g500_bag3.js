
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 52-93: Engine Housing and Pistons</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Inline-Six Engine Design</div><div class="content-container">Compact and balanced, ideal for performance and efficient use of engine bay space.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Power in a Small Space</div><div class="content-container">The inline-six engine enables powerful performance without requiring a large space.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_52_93.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this part of the build, we assemble the <strong>engine housing</strong> and the <strong>working pistons</strong> of the model’s engine. The real Mercedes-Benz G500 has transitioned to a <strong>turbocharged 3.0-liter inline-six engine</strong> for the 2025 model year, emphasizing both power and efficiency in a compact design.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Mercedes-Benz has historically used both <strong>V-type and inline engines</strong> in its lineup, with V engines, such as the V6 and V8, becoming increasingly popular for their space efficiency and power. Unlike inline engines, which align cylinders in a single row, the <strong>V configuration</strong> arranges cylinders in two angled rows, creating a “V” shape. This design keeps the engine shorter in length and lower in height, optimizing it for a lower center of gravity and efficient packaging.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/V-engine.gif" alt="Diagram of a V-type engine">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Diagram of a V-type engine</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:V-engine.gif" target="_blank">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 3: Center Differential and Gearbox</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-exchange-alt"></i></div><div class="title-container">Power Distribution</div><div class="content-container">The center differential divides engine power between the front and rear axles.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container">Versatile Gearbox</div><div class="content-container">Manages speed and torque for both off-road power and highway cruising.</div>`);
hideElement("btb_icon_3", 2);
hideElement("btb_image", 2);
hideElement("btb_caption", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_3.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In <strong>Bag 3</strong>, we assemble the <strong>center differential</strong> and <strong>gearbox</strong> of the G500 model, both crucial elements that manage power distribution and vehicle control. The <strong>center differential</strong> plays a key role in the G-Class's legendary off-road ability by dividing engine power between the front and rear axles, allowing wheels to rotate at different speeds. This capability is essential when navigating uneven terrain, as it prevents wheel slippage and ensures that traction is maintained across all four wheels.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>gearbox</strong>, or transmission, manages the engine's power output to provide the right balance of speed and torque for each driving situation. In the G-Class, the transmission is engineered for versatility, providing low-range gears for off-road power and high-range gears for efficient highway cruising. Together, the center differential and gearbox allow the G500 to adapt to a wide variety of terrains and conditions, balancing power and control in any environment.</p>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 94-119: Center Differential</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Center Differential</div><div class="content-container">Distributes power between front and rear axles for balanced handling.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-lock"></i></div><div class="title-container">Triple-Locking System</div><div class="content-container">Introduced in the 1980s, it enables independent locks on all differentials for superior traction.</div>`);
hideElement("btb_icon_3", 3);
hideElement("btb_image", 3);
hideElement("btb_caption", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_94_119.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In <strong>Instructions 94-119</strong>, we build the <strong>center differential</strong>, which helps manage power between the front and rear axles, a key feature of the G-Class's off-road stability. The G-Class introduced its <strong>triple-locking differential system</strong> in the late 1980s with the W463 model, setting a standard in off-road capability. This advanced feature allows drivers to lock the center, rear, and front differentials independently, providing exceptional traction in extreme conditions....</p><p class="sqsrte-large" style="white-space:pre-wrap;">This system remains one of the defining elements of the G-Class's design, solidifying its reputation as one of the most capable luxury off-road vehicles available.</p>`);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 120-134: Transmission</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Power Transfer</div><div class="content-container">Transmits engine power to wheels through multiple gear ratios.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Low-Range Mode</div><div class="content-container">Boosts torque for off-road performance, ideal for steep and rough terrain.</div>`);
hideElement("btb_icon_3", 4);
hideElement("btb_image", 4);
hideElement("btb_caption", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_120_134.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In <strong>Instructions 120-134</strong>, we build the first part of the <strong>transmission</strong>, a crucial system responsible for transferring power from the engine to the wheels. In the G-Class, the transmission is designed to handle both on-road cruising and rigorous off-road demands. It uses multiple gear ratios to balance torque and speed, which is essential for a vehicle that needs to perform reliably on highways as well as rugged trails.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The G500's transmission includes a <strong>low-range mode</strong>, activated for challenging off-road conditions, providing greater torque to handle steep inclines and uneven terrain. This versatility is a hallmark of the G-Class, enabling it to adapt seamlessly to both luxury driving and intense off-road scenarios.</p>`);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 134-154: Transmission Completion & Engine Connection</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Manual to Automatic</div><div class="content-container">G-Class moved from manual to automatic transmissions with the W463 model in the late 1980s.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container">9-Speed Transmission</div><div class="content-container">Multi-gear system optimizes both on-road efficiency and off-road power.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instr_134_154.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In <strong>Instructions 134-154</strong>, we complete the <strong>transmission system</strong> and attach it to the engine. Early G-Class models were available with manual transmissions, but with the introduction of the W463 model in the late 1980s, Mercedes-Benz transitioned to <strong>automatic transmissions</strong> to enhance driving comfort.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Modern G500 models now feature a <strong>9-speed automatic transmission</strong>, providing smooth shifts across a wide range of gear ratios. This allows for efficient highway cruising in higher gears while maintaining strong torque in low-range settings for off-road challenges.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/G55_Schöckl_2009.jpg" alt="Two class G-class wagons in Austria">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Two class G-class wagons in Austria</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:G55_%2B_G_%2B_Sch%C3%B6ckl,_2009.JPG" target="_blank">source</a></p></div>`);
hideExtraSections(5);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

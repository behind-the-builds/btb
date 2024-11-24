
function isDesktopView() {
    return window.innerWidth > 767;
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

    // Video resizing logic
    const containers = document.querySelectorAll('.btb_video_embed'); // Select all divs with the fixed class

    containers.forEach(container => {
        const iframe = container.querySelector('iframe'); // Get the iframe inside the container
        if (iframe) {
            const containerWidth = container.offsetWidth; // Get the width of the container
            const aspectRatio = 16 / 9; // Video aspect ratio

            // Calculate and set the height of the iframe
            iframe.style.width = '100%'; // Ensure iframe fills the width of the container
            iframe.style.height = `${containerWidth / aspectRatio}px`; // Adjust height to maintain aspect ratio
        }
    });

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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 4: Transmission Completion and Engine Assembly</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">9-Speed Transmission</div><div class="content-container">Advanced gearbox optimizes power for diverse driving conditions.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container">Advanced Inline-Six Engine</div><div class="content-container">The new inline-six delivers power and efficiency with hybrid technology.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_4.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 4, we complete the working transmission and assemble the upper portion of the engine. We also add structural elements around the engine and transmission block.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The transmission in this step represents the sophisticated <strong>9-speed automatic transmission</strong> found in modern G500 models. This advanced gearbox provides smooth shifts across a wide range of ratios, optimizing power delivery for both highway cruising and off-road challenges.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The engine in the latest <strong>2025 Mercedes-Benz G500 Professional Line</strong> has moved from the previous V8 to a new <strong>3.0-liter inline-six engine</strong> with <strong>48-volt mild-hybrid technology</strong>. This change improves both performance and efficiency, delivering 443 horsepower and 413 lb-ft of torque. The mild hybrid system provides an additional electric boost, contributing to smoother acceleration and better fuel economy.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Canadian_Forces_G-wagen.jpg" alt="Canadian Forces G-Wagen">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Canadian Forces G-Wagen</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Canadian_Forces_G-wagen.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 160-192: Transmission Controls and Differential Lock</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Versatile Transmission</div><div class="content-container">F-N-R selector and two-speed gear control simulate the G500's adaptable drivetrain.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-lock"></i></div><div class="title-container">Differential Lock</div><div class="content-container">Center differential lock control replicates a key feature for enhanced off-road traction.</div>`);
hideElement("btb_icon_3", 2);
hideElement("btb_image", 2);
hideElement("btb_caption", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instr_160_192.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we complete the transmission system and add functional controls for the model's drivetrain features. We install the <strong>Forward-Neutral-Reverse (F-N-R) selector</strong> and a <strong>two-speed gear control</strong>, replicating the G-Class's ability to adapt to various driving conditions. These controls allow the model to simulate the real vehicle's versatility in both on-road and off-road scenarios.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Additionally, we incorporate a control to <strong>lock the center differential</strong>, a key feature that enhances the G500's off-road capability. In the actual vehicle, locking the center differential ensures equal power distribution between the front and rear axles, crucial for maintaining traction in challenging terrain. This feature, part of the G-Class's triple-locking differential system, significantly contributes to its legendary off-road prowess.</p>`);
safeSetInnerHTML(2, "btb_video_header", `<div class="video-header">Watch the LEGO model designer demonstrate the model's control features:</div>`);
safeSetInnerHTML(2, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/fJawD19K5b4?si=RP6zi1MbZZAe4fB4&amp;start=516&amp;end=545" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 193-204: Engine Top Assembly</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container">Inline-Six Power</div><div class="content-container">The new G500 features a turbocharged inline-six for enhanced performance and efficiency.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Engine Components</div><div class="content-container">The model represents key engine parts like cylinder heads and valve covers.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_193_204.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the top of the engine, which is represented as a 6-cylinder configuration in the LEGO model. As mentioned earlier, the real Mercedes-Benz G500 has transitioned to a <strong>turbocharged 3.0-liter inline-six engine</strong> for the 2025 model year, replacing the previous V8 configuration. This change reflects advancements in performance and efficiency, with the inline-six producing <strong>443 horsepower</strong> while maintaining robust power delivery.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The engine top we're building includes representations of key components such as the cylinder heads, valve covers, and intake manifolds.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-AMG_M_177_Typ_205.jpg" alt="AMG V8 Engine - A representation of earlier high-performance variants.">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">AMG V8 Engine - A representation of earlier high-performance variants.</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-AMG_M_177_Typ_205.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
hideExtraSections(3);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);


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
    const containers = document.querySelectorAll('.video-container'); // Select all divs with the fixed class

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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Section Title 1</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-clock"></i></div><div class="title-container">Enduring Legacy</div><div class="content-container">From 1979 military origins to luxury icon, the G-Wagen maintains its distinctive boxy design and off-road prowess.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-truck"></i></div><div class="title-container">Professional Grade</div><div class="content-container">The Professional Line emphasizes utility and extreme capability, returning the G-Class to its rugged roots.</div>`);
hideElement("btb_icon_3", 1);
hideElement("btb_image", 1);
hideElement("btb_caption", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/maintemplate/audio/maintemplate_section_title_1.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this first stage, we begin assembling the <strong>front differential</strong> and <strong>drivetrain</strong> of our Mercedes-Benz G500 Professional Line model. The G-Class, affectionately known as the <strong>G-Wagen</strong>, has a storied history dating back to 1979. Originally conceived as a <strong>military vehicle</strong> at the suggestion of the Shah of Iran, it was developed for both civilian and military use. Over four decades, the G-Class has evolved from a utilitarian off-roader to an iconic <strong>luxury SUV</strong>, all while maintaining its core DNA and boxy silhouette.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Professional Line</strong>, introduced in 2016, represents a return to the G-Class's rugged roots. This variant emphasizes <strong>utility and off-road capability</strong> over luxury, featuring stripped-down interiors, robust body panels, and specialized equipment for extreme conditions. The <strong>G500 Professional Line</strong> combines the power of a V8 engine with the practicality of a workhorse vehicle, catering to industries like forestry, mining, and emergency services. Its front differential and drivetrain are engineered to tackle the most challenging terrains, embodying the G-Class philosophy of "Stronger Than Time."</p>`);
safeSetInnerHTML(1, "btb_video_header", `<div class="video-header">Watch an animation of the M256 engine used in the new G500:</div>`);
safeSetInnerHTML(1, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/wKz58vLmoyc?si=IqN3ttRVf7VjN3Vx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Section Title 2</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Differential Function</div><div class="content-container">Allows front wheels to rotate at different speeds during turns, crucial for both on-road handling and off-road traction.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-lock"></i></div><div class="title-container">Locking Capability</div><div class="content-container">Part of the G-Class's unique three locking differentials system, enhancing extreme off-road performance.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/maintemplate/audio/maintemplate_section_title_2.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>front differential</strong> of our model. The front differential is a crucial component of the G-Class's advanced <strong>four-wheel-drive system</strong>, allowing the front wheels to rotate at different speeds during turns while maintaining optimal traction.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The G-Class stands out in the luxury SUV segment with its unique <strong>three locking differentials</strong> system – front, center, and rear. When engaged, the <strong>locking front differential</strong> locks the front wheels together, forcing them to rotate at the same speed. This feature proves invaluable in extreme <strong>off-road situations</strong>, allowing the G500 to maintain forward momentum even when one wheel loses traction. Such engineering contributes to the G-Wagen's ability to conquer diverse terrains, from rocky mountain trails to desert dunes, reinforcing its reputation as a go-anywhere vehicle.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/maintemplate/images/Terrängbil_5_Revinge_2015-1.jpg" alt="A military G-Class outfitted for off-road conditions">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A military G-Class outfitted for off-road conditions</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Terr%C3%A4ngbil_5_Revinge_2015-1.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
hideExtraSections(3);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);


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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 9: Rear Doors</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Copper Orange</div><div class="content-container">Special color option for the 2025 Professional Line enhances aesthetic appeal.</div>`);
hideElement("btb_icon_2", 1);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_9.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 9, we construct the <strong>fully functional rear doors</strong> of the G-Class model. These doors are the first components of the model to feature the <strong>copper orange</strong> color, which is a special option available for the <strong>2025 Professional Line</strong> of the G-Class. This vibrant color not only enhances the vehicle's aesthetic appeal but also signifies its unique identity within the G-Class lineup.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The use of copper orange began with the introduction of the Professional Line, which aimed to offer a more rugged and distinctive look while maintaining the luxury and functionality that Mercedes-Benz is known for. This color choice reflects a blend of modern design sensibilities and traditional off-road capability, making it a standout feature for those seeking both style and performance.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-Benz_W_463_(2018)_Professional_Line_IAA_2021_1X7A0207.jpg" alt="2018 G-Class Pro Line">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">2018 G-Class Pro Line</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-Benz_W_463_(2018)_Professional_Line_IAA_2021_1X7A0207.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 361-388: Driver's Side Door Assembly</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-clock"></i></div><div class="title-container">Military Durability</div><div class="content-container">Built to withstand impacts and harsh conditions from military origins.</div>`);
hideElement("btb_icon_2", 2);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_361_388.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we focus on assembling the <strong>driver's side rear door</strong>. The inclusion of a fully functional door mechanism in this LEGO model replicates the real vehicle’s attention to detail.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Historically, G-Class doors have been built to withstand harsh conditions, reflecting their military origins. The robust construction ensures that they can handle impacts and maintain integrity during off-road adventures.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes_Benz_G-Class_Timboektoe-1.jpg" alt="G-Class in Timbuktu, Mali">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">G-Class in Timbuktu, Mali</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes_Benz_G-Class_Timboektoe-1.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 389-416: Passenger Side Door Assembly</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-chair"></i></div><div class="title-container">Comfort and Accessibility</div><div class="content-container">Passenger side rear door designed for easy entry and exit.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Modern Luxury</div><div class="content-container">Combines ruggedness with high-quality materials for passenger comfort.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_389_416.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>passenger side rear door</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The design of the passenger side rear door reflects modern luxury standards while maintaining ruggedness. Historically, G-Class vehicles have been known for their spacious interiors and high-quality materials, providing passengers with comfort during both on-road and off-road journeys.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-AMG_G_63_Crazy_Colors_sunsetbeam.jpg" alt="Copper orange G-Class">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Copper orange G-Class</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-AMG_G_63_Crazy_Colors_sunsetbeam.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
hideExtraSections(3);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

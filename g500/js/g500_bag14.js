
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 570-586: Front Bumper Assembly</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Impact Absorption</div><div class="content-container">Front bumper designed to absorb impacts while enhancing rugged aesthetics.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-arrows-alt"></i></div><div class="title-container">Off-Road Features</div><div class="content-container">Modern bumpers include features for both safety and off-road utility.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_570_586.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble and attach the <strong>front bumper</strong> to complete this segment of the build. The bumper is designed to absorb impacts while providing a rugged look that complements the overall design of the G-Class.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The front bumper has seen significant advancements since its introduction. Originally designed for basic protection, modern bumpers incorporate advanced materials and designs that enhance safety without compromising style. The integration of features like fog lights and winch mounts has made it a versatile component for both urban driving and off-road excursions.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-Benz_W460_250_GD_IMG_4536.jpg" alt="W460 G-Class showcasing its rugged design.">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">W460 G-Class showcasing its rugged design.</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-Benz_W460_250_GD_IMG_4536.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 14: Hood Construction</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Functional Hinges</div><div class="content-container">Hood hinges allow easy access to the engine compartment for maintenance.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-medkit"></i></div><div class="title-container">Humanitarian Missions</div><div class="content-container">Used by the Red Cross and UN for resilience in conflict zones and rough terrain.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_14.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 14, we build the <strong>working hood</strong> of the G-Class model. The hinge mechanism is essential for allowing the hood to open and close smoothly, providing access to the engine compartment.</p><p class="sqsrte-large" style="white-space:pre-wrap;">An interesting aspect of the G-Class's history is its use in various humanitarian missions. In the 1990s, the G-Class was utilized by organizations such as the Red Cross and UN peacekeeping forces in conflict zones due to its reliability and off-road capabilities. This reputation for resilience has made it a preferred choice for those needing a dependable vehicle in challenging environments.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-Benz_G-Class_(17146029221).jpg" alt="A UN G-Class">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A UN G-Class</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-Benz_G-Class_(17146029221).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 587-590: Hinge Mechanism Assembly</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Durable Design</div><div class="content-container">Built for longevity and rugged use, essential for the G-Class’s demanding off-road and military roots.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-clock"></i></div><div class="title-container">Iconic Heritage</div><div class="content-container">G-Class development started in 1973, leading to its iconic 1979 launch.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_587_590.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>hinge mechanism</strong> that allows the G-Class’s hood to open smoothly, providing easy access to the engine compartment. Hinge mechanisms may seem straightforward, but in vehicles built for rugged use, they must balance durability with ease of operation.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The development of the G-Class began in <strong>1972-1973</strong>, when Mercedes-Benz, in collaboration with Steyr-Daimler-Puch, designed it for military needs, prioritizing durability across all components. After years of testing and refinement, the vehicle officially launched in <strong>1979</strong>. Even as the model evolved into a luxury vehicle, its core design, including features like the hood and hinges, retained a rugged quality. The G-Class became iconic not only for its capability but also for its style, earning fans like Pope John Paul II, who chose a G-Wagen as his Popemobile in the early 1980s.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Luxembourg,_visite_officielle_Pape_François_26.09.2024_(128).jpg" alt="G500 Popemobile in Luxembourg">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">G500 Popemobile in Luxembourg</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Luxembourg,_visite_officielle_Pape_Fran%C3%A7ois_26.09.2024_(128).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 591-621: Hood Sides Assembly</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Iconic Profile</div><div class="content-container">Straight lines and flat surfaces contribute to the unmistakable G-Class aesthetic and rugged look.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wind"></i></div><div class="title-container">Aerodynamic Refinement</div><div class="content-container">Slight updates over time improved airflow, enhancing the G-Class’s performance without altering its look.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_591_621.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this phase, we assemble the <strong>sides of the hood</strong>, which help frame the engine compartment above the wheel wells. The G-Class's angular hood design is part of its iconic profile, emphasizing straight lines and flat surfaces. These features, originally intended to simplify manufacturing and reinforce strength, became a hallmark of the G-Class’s aesthetic appeal.</p><p class="sqsrte-large" style="white-space:pre-wrap;">From a design perspective, the G-Class has remained virtually unchanged since its debut in 1979. This boxy, utilitarian look was essential in off-road conditions, but it has also helped the G-Class endure as a symbol of rugged elegance in the luxury market. The side panels of the hood, like much of the vehicle, have seen minor refinements to improve aerodynamics, yet the fundamental silhouette and sturdy construction endure, a testament to the “form follows function” ethos that shaped the original model.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Blue_Mercedes_G_55_AMG,_Berlin.jpg" alt="G55 AMG in Berlin">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">G55 AMG in Berlin</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Blue_Mercedes_G_55_AMG,_Berlin.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideExtraSections(4);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

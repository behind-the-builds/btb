
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 790-800: Completing Tailgate and Rearview Mirror</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-clock"></i></div><div class="title-container">Royal Beginnings</div><div class="content-container">Suggested by the Shah of Iran, the G-Class evolved from military roots to luxury icon.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">International Appeal</div><div class="content-container">First marketed as the Puch G in Austria and parts of Eastern Europe.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_790_800.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this final stage, we complete the <strong>tailgate assembly</strong> and add the <strong>rearview mirror</strong>. The origins of the G-Class trace back to a proposal from the <strong>Shah of Iran</strong> in the early 1970s. A major shareholder in Mercedes-Benz, the Shah suggested creating a durable, off-road military vehicle, which led to the development of the G-Class.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The G-Class was initially marketed under the <strong>Puch brand</strong> in Austria and some Eastern European countries due to the collaboration with Steyr-Daimler-Puch. This durable, versatile vehicle was officially launched in 1979 and quickly gained popularity across global markets, transforming from a military icon into a luxury off-road vehicle.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Puch_300GD_Serbian_military_3.jpg" alt="A Serbian military Puch G-Class">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Serbian military Puch G-Class</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Puch_300GD_Serbian_military_3.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 19: External Accessories</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-box"></i></div><div class="title-container">Essential Add-Ons</div><div class="content-container">Adds realistic features like the spare tire and top storage for durability.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Tailgate Design</div><div class="content-container">Tailgate-mounted spare tire maximizes space and easy access.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_19.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 19, we add several <strong>external accessories</strong> to our G-Class model: the roof steerer, spare tire, top storage bin, mud flaps, and a rear bar. While the roof steerer enhances playability, the tailgate-mounted spare tire mirrors the real G-Class design, balancing accessibility with practicality. The top storage bin adds functional utility, and the rear bar protects the spare and back area. These accessories enhance both play and realism, echoing the G-Class’s practical, rugged heritage.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Canadian_Land_Forces_Mercedes-Benz_G-Class.JPG" alt="A convoy of military G-Class vehicles">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A convoy of military G-Class vehicles</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Canadian_Land_Forces_Mercedes-Benz_G-Class.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 801-803: Roof Steerer and Spare Tire</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-circle"></i></div><div class="title-container">Accessible Spare</div><div class="content-container">Tailgate mount makes spare tire easy to reach, ideal for off-road use.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-door-open"></i></div><div class="title-container">Side-Opening Tailgate</div><div class="content-container">Tailgate opens sideways, maximizing space and handling heavier loads.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_801_803.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we add the <strong>roof steerer</strong> (to control the model’s front wheels) and mount the <strong>spare tire</strong> on the tailgate. This exterior mounting keeps interior space available and ensures easy access in rugged conditions. The tailgate’s side-opening design also accommodates the tire’s weight, which would be cumbersome if mounted on a roof or trunk, making it a practical and iconic feature of the G-Class.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/MP-ISAF.jpg" alt="A G-Class in German MP service">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A G-Class in German MP service</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:MP-ISAF.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 804-819: Top Storage Bin</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-box"></i></div><div class="title-container">Extra Storage</div><div class="content-container">The top bin adds practical, accessible storage space for gear and equipment.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-box"></i></div><div class="title-container">Versatile Utility</div><div class="content-container">Inspired by Pro Line options, the bin provides extra room for adventure essentials.</div>`);
hideElement("btb_icon_3", 4);
hideElement("btb_image", 4);
hideElement("btb_caption", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_804_819.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Here we add the <strong>top storage bin</strong>, inspired by the real G-Class’s <strong>Professional Line</strong> options. In adventure-ready models, the top storage compartment is ideal for stowing extra equipment without taking up rear cargo space. This feature enhances the G-Class’s versatility in both off-road and urban environments.</p>`);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 820-823: Mud Flaps</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-tint"></i></div><div class="title-container">Protective Flaps</div><div class="content-container">Shields vehicle’s undercarriage from mud and debris, crucial for off-road travel.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Durable Design</div><div class="content-container">Reinforced materials ensure lasting protection during rugged adventures.</div>`);
hideElement("btb_icon_3", 5);
hideElement("btb_image", 5);
hideElement("btb_caption", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_820_823.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this step, we add <strong>mud flaps</strong> to the model. Designed to protect the vehicle’s undercarriage from mud, rocks, and debris, mud flaps are essential for maintaining the vehicle’s durability, especially during off-road travel. The G-Class mud flaps are constructed from reinforced materials, ensuring longevity and keeping the vehicle’s body panels safe from damage on rough terrain.</p>`);
hideExtraSections(5);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

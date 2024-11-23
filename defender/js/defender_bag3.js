
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 3: Main Frame and Exterior Body Panels</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cube"></i></div><div class="title-container">Frame Construction</div><div class="content-container">Building out the Defender’s main frame emphasizes structural strength.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-columns"></i></div><div class="title-container">Exterior Panels</div><div class="content-container">Side and roof panels define the Defender’s shape, using durable materials that protect occupants and cargo.</div>`);
safeSetInnerHTML(1, "btb_icon_3", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Rear Bumper</div><div class="content-container">The rear bumper adds resilience, safeguarding the vehicle’s back end in challenging terrain.</div>`);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/defender/audio/defender_bag_3.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 3, we assemble the Defender’s <strong>main structural frame</strong> and <strong>exterior body panels</strong>, reinforcing the vehicle’s backbone from the dashboard to the rear. This includes attaching the <strong>side panels</strong>, <strong>rear bumper</strong>, and <strong>roof sections</strong>, creating the Defender’s <strong>iconic silhouette</strong> and durable framework. The model’s modular design mirrors the real Defender’s construction, which uses a <strong>high-strength, aluminum-based structure</strong> to maintain rigidity while supporting the functional needs of an off-road vehicle.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Landrover_Defender_ATAR.jpg" alt="Defender 110 in action in Bolivia">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender 110 in action in Bolivia</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Landrover_Defender_ATAR.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 400-432: Rear Bumper</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Off-Road Protection</div><div class="content-container">The Defender’s rear bumper is designed to minimize overhang, reducing the chance of snagging on obstacles during steep descents.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-exclamation-triangle"></i></div><div class="title-container">Safety Standards</div><div class="content-container">Balancing off-road readiness with safety, the bumper supports modern regulations as do other elements of the Defender’s design.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_400_432.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>rear bumper design</strong> involves trade-offs between off-road capability and compliance with modern safety regulations, as do other elements of the Defender’s design. To optimize off-road performance, the Defender uses a bumper with <strong>minimal overhang</strong> to reduce the chance of snagging obstacles during steep descents or climbs. However, this design must still meet on-road <strong>safety standards</strong>, including providing adequate impact protection and supporting recovery points. <strong>Aftermarket options</strong> are popular for enthusiasts seeking reinforced bumpers for extreme off-road use, often incorporating stainless steel materials and extra recovery features. These <strong>rugged designs</strong> focus more on functionality for severe terrain rather than sleek aesthetics, illustrating the balance between the Defender’s <strong>iconic look</strong>, safety, and off-road readiness.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_Defender_110_L316_2001_(2).jpg" alt="A high-function aftermarket bumper on a Defender">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A high-function aftermarket bumper on a Defender</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_Defender_110_L316_2001_(2).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 433-459: Door Frame and Roof Frame</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-bars"></i></div><div class="title-container">Classic Frame Design</div><div class="content-container">The original Defender used a body-on-frame design, favored for rugged off-road use but limited in on-road comfort.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-columns"></i></div><div class="title-container">Monocoque Strength</div><div class="content-container">The new D7x aluminum monocoque frame improves handling, safety, and passenger comfort, balancing off-road ability with urban drivability.</div>`);
hideElement("btb_icon_3", 3);
hideElement("btb_image", 3);
hideElement("btb_caption", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_433_459.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Constructing the <strong>door frame</strong> and <strong>cabin body structure</strong> forms the Defender’s <strong>rugged base</strong>. The <strong>D7x aluminum monocoque platform</strong>, three times stiffer than traditional designs, is built for <strong>durability</strong> and <strong>stability</strong> in rough terrain. <strong>Reinforced door frames</strong> and <strong>magnesium beams</strong> add aesthetic appeal and practical strength, merging classic ruggedness with modern technology. The Defender’s move from the old <strong>body-on-frame design</strong> to a modern <strong>monocoque layout</strong> reflects its evolution toward meeting contemporary <strong>safety standards</strong> and driver expectations.</p>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 460-506: Rear Swing-Out Tailgate</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-door-open"></i></div><div class="title-container">Functional Design</div><div class="content-container">The side-opening tailgate accommodates the rear-mounted spare, keeping it accessible and practical.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-circle"></i></div><div class="title-container">Iconic Element</div><div class="content-container">The swing-out tailgate is a hallmark of the Defender, designed to support off-road utility and urban convenience.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_460_506.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these steps, we construct the <strong>rear swing-out tailgate</strong>—a functional feature that opens to the side, essential for accommodating the Defender’s <strong>rear-mounted spare tire</strong>. Unlike a traditional liftgate, this <strong>side-hinge design</strong> allows for easy access even with the added weight of the spare tire. The <strong>swing-out tailgate</strong> has become an iconic element of the Defender’s design, blending <strong>rugged practicality</strong> with <strong>ease of use</strong> for both off-road and urban environments.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_Defender,_South_Africa.jpg" alt="A Land Rover Defender in South Africa">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Land Rover Defender in South Africa</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_Defender,_South_Africa.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 507-520: Rear Seat Frame and Cargo Area Frame</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-boxes"></i></div><div class="title-container">Flexible Cargo Space</div><div class="content-container">The Defender’s cargo area can expand to 78.8 cubic feet, accommodating gear and essentials for long journeys.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Practical Layout</div><div class="content-container">The rear frame structure supports easy access to storage, blending daily convenience with off-road functionality.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_507_520.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we build the frame around the <strong>rear seats</strong> and <strong>cargo area</strong>, defining the Defender’s <strong>spacious and adaptable</strong> rear interior. The Defender 110 offers up to <strong>78.8 cubic feet</strong> of cargo space with the rear seats folded down, providing ample room for equipment and supplies. The design prioritizes <strong>accessibility</strong> and <strong>flexibility</strong>, catering to both everyday storage needs and the demands of off-road travel.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Building_an_Icon-_Defender_2,000,000_(18889311718).jpg" alt="Defender production line">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender production line</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Building_an_Icon-_Defender_2,000,000_(18889311718).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 521-543: Rear Wheel Wells</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-circle"></i></div><div class="title-container">Wheel Protection</div><div class="content-container">Rear wheel wells guard the Defender’s underbody, shielding against mud and debris on rugged terrain.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">Off-Road Durability</div><div class="content-container">Designed for resilience, the wheel wells support the Defender’s off-road capability by adding protection for critical components.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_521_543.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>rear wheel wells</strong>, an essential component for <strong>shielding</strong> the Defender’s rear wheels from debris and road conditions. The <strong>wheel wells</strong> play a practical role by preventing <strong>mud, rocks, and other materials</strong> from impacting the vehicle’s underbody, helping to protect both the wheels and surrounding structures during off-road excursions.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/1991_Land_Rover_Defender_90.jpg" alt="A 1991 Land Rover Defender 90">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A 1991 Land Rover Defender 90</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:1991_Land_Rover_Defender_90.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 544-584: Roof Assembly</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Load Capacity</div><div class="content-container">The Defender’s roof can hold up to 168 kg dynamically and 300 kg when stationary, supporting gear for off-road travel.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-toolbox"></i></div><div class="title-container">Roof Rack Compatibility</div><div class="content-container">Roof racks provide stable, even weight distribution, maintaining vehicle stability across challenging terrains.</div>`);
hideElement("btb_icon_3", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_544_584.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we complete the <strong>roof assembly</strong>, which is designed to handle both <strong>dynamic and static loads</strong> for practical off-road travel. The Defender’s <strong>roof</strong>, when paired with a roof rack, supports up to <strong>370 lbs (168 kg)</strong> in motion and up to <strong>661 lbs (300 kg)</strong> when stationary, accommodating equipment like <strong>roof tents</strong> and <strong>storage boxes</strong>. <strong>Roof racks</strong> distribute weight effectively, ensuring the Defender remains stable, even in rugged environments.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/1993_Land_Rover_Defender_110_NAS.JPG" alt="1993 Defender 110 with loaded roof rack">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">1993 Defender 110 with loaded roof rack</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:1993_Land_Rover_Defender_110_NAS.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 585-620: Passenger Side Door</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-door-open"></i></div><div class="title-container">Passenger Access</div><div class="content-container">The passenger door provides stable entry, with hinges and handles built to handle rugged conditions.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Reinforced Design</div><div class="content-container">Improved door materials and weather sealing offer protection and noise insulation for a more secure experience.</div>`);
hideElement("btb_icon_3", 8);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_585_620.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">This section builds the <strong>passenger side door</strong>, crafted with durability in mind. Early Defenders featured <strong>two-piece doors</strong> with separate upper and lower panels, using <strong>sliding windows</strong> and <strong>aluminum construction</strong> to resist rust and endure rugged conditions. This lightweight, utilitarian design suited the Defender’s original off-road role but limited comfort and insulation. Over time, Land Rover transitioned to <strong>single-piece doors</strong> with improved weatherproofing, a key development in making the vehicle more versatile.</p>`);
safeSetInnerHTML(8, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Building_an_Icon-_Defender_2,000,000_(18454451414).jpg" alt="A Defender passenger door under construction">`);
safeSetInnerHTML(8, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Defender passenger door under construction</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Building_an_Icon-_Defender_2,000,000_(18454451414).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 8);
hideElement("btb_video_embed", 8);
safeSetInnerHTML(9, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 621-656: Driver’s Side Door</h1></div>`);
safeSetInnerHTML(9, "btb_icon_1", `<div class="icon-container"><i class="fas fa-key"></i></div><div class="title-container">Driver’s Access</div><div class="content-container">With strengthened locks and hinges, the driver’s side door enhances security and ease of use.</div>`);
safeSetInnerHTML(9, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bars"></i></div><div class="title-container">Structural Upgrades</div><div class="content-container">Reinforced materials provide stability and insulation, balancing off-road resilience with passenger comfort.</div>`);
hideElement("btb_icon_3", 9);
safeSetInnerHTML(9, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio9', 'playPauseIcon9', 'progressBar9')"><i id="playPauseIcon9" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar9" class="progress-bar" value="0" max="100"><audio id="audio9" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_621_656.mp3"></audio></div>`);
safeSetInnerHTML(9, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>driver’s side door</strong> continues this blend of practicality and durability while highlighting Land Rover’s ongoing improvements. By the 1980s, the Defender’s <strong>single-piece door design</strong> included <strong>wind-up windows</strong> and better insulation, making daily use more comfortable. Early designs, however, came with quirks, such as door handles placed in a way that frequently caught elbows, a characteristic that was later redesigned to improve functionality without sacrificing the vehicle’s rugged heritage.</p>`);
safeSetInnerHTML(9, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Building_an_Icon-_Defender_2,000,000_(18889303170).jpg" alt="A Defender door under construction">`);
safeSetInnerHTML(9, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Defender door under construction</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Building_an_Icon-_Defender_2,000,000_(18889303170).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 9);
hideElement("btb_video_embed", 9);
hideExtraSections(9);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 8, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 9, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

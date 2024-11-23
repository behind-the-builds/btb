
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 4: Completing the Exterior</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Finishing Touches</div><div class="content-container">In Bag 4, key exterior elements complete the Defender's rugged design.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-road"></i></div><div class="title-container">Off-Road Essentials</div><div class="content-container">Bag 4 includes details like the roof storage box, side storage box, and ladder.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/defender/audio/defender_bag_4.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 4, we finish the Defender model by adding key exterior elements, including the <strong>front bumper</strong>, <strong>bonnet/hood</strong>, <strong>front wheel wells</strong>, and other external accessories. The front bumper strengthens the Defender’s rugged front profile while offering built-in <strong>recovery points</strong> and added protection for off-road excursions. The bonnet, crafted from lightweight aluminum, provides easy access to the <strong>engine bay</strong> and enhances <strong>heat management</strong>, an essential feature for any off-road vehicle tackling varied environments. The front wheel wells are fitted next, designed to shield the underbody from debris and allow clearance for larger tires often used in off-road conditions. Finally, a selection of external accessories, including roof racks and side steps, gives the Defender a versatile setup, ideal for tackling both adventures and everyday use.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Landrover130.jpg" alt="A Defender 130 outfitted for adventure">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Defender 130 outfitted for adventure</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Landrover130.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 657-676: Front Bumper Assembly</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Durable Front Bumper</div><div class="content-container">The front bumper enhances the Defender’s off-road capabilities with features designed for impact protection and durability.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Accessory Mounting</div><div class="content-container">The front bumper supports attachments like winches, preparing the Defender for challenging off-road tasks.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_657_676.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this step, we assemble and attach the <strong>front bumper</strong>, providing <strong>impact protection</strong> and a mounting point for essential <strong>off-road accessories</strong> like recovery points and winches. Built with durability in mind, the bumper ensures the Defender is equipped to handle difficult terrain while safeguarding the vehicle’s structure.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_Defender_(13284445295).jpg" alt="A Defender with a loaded aftermarket front bumper">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Defender with a loaded aftermarket front bumper</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_Defender_(13284445295).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 677-700: Headlight Assembly</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-lightbulb"></i></div><div class="title-container">Adaptive Lighting</div><div class="content-container">Matrix LEDs with Adaptive Driving Beam adjust brightness and patterns based on road and traffic conditions.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-eye"></i></div><div class="title-container">Enhanced Visibility</div><div class="content-container">These headlights illuminate the road while reducing glare for oncoming drivers, crucial for off-road safety.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_677_700.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this phase, we attach the <strong>Matrix LED headlights</strong> with <strong>Adaptive Driving Beam</strong> technology, one of the Defender’s most advanced lighting features. Unlike traditional headlights, these Matrix LEDs adjust their beam patterns automatically based on the driving environment, enhancing <strong>visibility</strong> while minimizing glare for oncoming drivers. This adaptability is particularly useful for <strong>off-road conditions</strong>, where maintaining clear sightlines without disrupting natural night vision is essential for safety. The modern Defender’s headlights are not only <strong>brighter</strong> but also more <strong>energy-efficient</strong> than older models, reflecting the vehicle’s balance of rugged functionality and cutting-edge technology.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_DEFENDER_90_HSE_URBAN_PACK_(3BA-LE62XCA)_front.jpg" alt="Modern Land Rover Defender headlight design">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Modern Land Rover Defender headlight design</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_DEFENDER_90_HSE_URBAN_PACK_(3BA-LE62XCA)_front.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 701-737: Hood Assembly</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Lightweight Durability</div><div class="content-container">The aluminum hood provides durability with easy engine access, reflecting the Defender’s blend of strength and practicality.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-temperature-high"></i></div><div class="title-container">Efficient Heat Management</div><div class="content-container">Aluminum construction allows heat dissipation, supporting engine performance under challenging conditions.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_701_737.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this step, we construct and attach the <strong>hood (bonnet)</strong>, enclosing the <strong>engine compartment</strong> from above. Crafted from <strong>aluminum</strong> for strength and durability, the hood is lightweight, making it easier to access the engine bay while also aiding in <strong>heat dissipation</strong>. This is especially important for off-road driving, where engine components can quickly heat up under tough conditions. The hood design maintains the Defender’s <strong>traditional appearance</strong> while incorporating modern materials and improved insulation to handle the demands of both rugged trails and daily use.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/2015_Land_Rover_Defender_(L316_MY15)_90_3-door_wagon_(2015-10-24)_01.jpg" alt="2015 Land Rover Defender 90">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">2015 Land Rover Defender 90</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:2015_Land_Rover_Defender_(L316_MY15)_90_3-door_wagon_(2015-10-24)_01.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 738-787: Front Wheel Wells</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">WWII Influence</div><div class="content-container">Early Land Rovers used aluminum due to post-war steel shortages, a choice that became key to the Defender’s legacy.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">Agricultural Roots</div><div class="content-container">Originally designed for farmers, the Defender’s components embody resilience and practicality.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_738_787.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this step, we assemble the <strong>front wheel wells</strong>. The Defender’s history reflects a legacy of rugged design choices, many of which were born out of necessity. Following <strong>World War II</strong>, the first Land Rovers, built in 1947, used aluminum panels due to steel shortages. Aluminum offered corrosion resistance, light weight, and durability, ideal for off-road vehicles meant to endure rough conditions. This material became a hallmark of the Defender’s resilience, shaping the vehicle’s identity as a capable all-terrain workhorse. The evolution of its wheel wells reflects these practical roots, evolving to enhance durability for both agricultural and recreational use.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/-2020-08-25_Landrover_defender,_Trimingham.JPG" alt="A Defender on a farm in England">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Defender on a farm in England</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:-2020-08-25_Landrover_defender,_Trimingham.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 788: Roof Steerer Assembly</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Roof Steerer</div><div class="content-container">The roof steerer lets you easily guide the model, adding another interactive element to this complex build.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Authentic Collaboration</div><div class="content-container">Developed with Land Rover, this model includes realistic details that highlight the Defender’s renowned functionality.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_788.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this step, we add the <strong>roof-mounted steerer</strong>—a unique feature that allows the model to be guided from above during manual play. This simple, functional addition reflects the thoughtfulness behind the model’s design, with its array of working parts, from a sophisticated <strong>4-speed gearbox</strong> to moving pistons and a detailed suspension system. LEGO collaborated with Land Rover to ensure that the model captures the spirit of the Defender, creating an immersive experience that showcases the engineering behind one of the world’s most iconic off-road vehicles.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/160303-Falkland_Islands-14_copy_(25939913946).jpg" alt="Defenders in the Falkland Islands">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defenders in the Falkland Islands</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:160303-Falkland_Islands-14_copy_(25939913946).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 789-845: Roof Rack Assembly</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">Expedition Ready</div><div class="content-container">Built from anodized aluminum, the roof rack is designed to withstand rugged conditions without added weight.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wind"></i></div><div class="title-container">Aerodynamic Design</div><div class="content-container">The rack’s structure reduces wind noise and aerodynamic drag.</div>`);
safeSetInnerHTML(7, "btb_icon_3", `<div class="icon-container"><i class="fas fa-campground"></i></div><div class="title-container">Overlanding Accessories</div><div class="content-container">Compatible with gear like roof tents, the rack supports adventure-ready setups for expeditions.</div>`);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_789_845.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The Land Rover Defender’s <strong>expedition roof rack</strong> has a unique history and functional design, built to handle both urban and rugged environments. The rack is made from <strong>anodized aluminum</strong> with a cast alloy frame, making it lightweight yet robust enough to handle challenging overland expeditions. Specifically designed to reduce wind noise and improve aerodynamics, the expedition rack can hold up to 291 lbs., supporting a range of accessories and equipment for travel. Land Rover’s collaboration with companies like Autohome has also led to specialized accessories, including roof tents compatible with the Defender’s expedition rack, making it a popular choice for overlanders and adventurers.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/1993_Land_Rover_Defender_110_NAS.JPG" alt="1993 Defender 110 with loaded roof rack">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">1993 Defender 110 with loaded roof rack</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:1993_Land_Rover_Defender_110_NAS.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 846-857: Ladder and Storage Boxes</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-box"></i></div><div class="title-container">Side Storage Box</div><div class="content-container">Designed for quick access, the side box is ideal for stowing wet or muddy gear.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-sort-up"></i></div><div class="title-container">Roof Ladder</div><div class="content-container">The ladder provides secure roof access, allowing for easy loading and unloading of rooftop gear.</div>`);
safeSetInnerHTML(8, "btb_icon_3", `<div class="icon-container"><i class="fas fa-boxes"></i></div><div class="title-container">Roof Storage Box</div><div class="content-container">Offering extra space for equipment, the roof storage box increases cargo capacity.</div>`);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_846_857.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The Land Rover Defender’s <strong>side-mounted storage box</strong> is a practical and rugged addition for quick-access storage of items you may want to keep outside the main cabin, such as wet or muddy gear. Designed to complement the Defender’s exterior style, this storage box is made from durable materials to withstand harsh conditions.</p><p class="sqsrte-large" style="white-space:pre-wrap;">In some configurations, it can also accommodate a <strong>Portable Rinse System</strong>, which includes a small water tank and a hose, perfect for rinsing off gear or boots before packing them up. The roof storage box and ladder complete the Defender’s exterior functionality.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The ladder provides secure access to the roof, making it easy to load or unload items, while the storage box on the roof offers additional space for bulky equipment, reinforcing the Defender's readiness for extended expeditions.</p>`);
safeSetInnerHTML(8, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_DEFENDER_90_HSE_EXPLORER_PACK_(3BA-LE62XCA)_rear.jpg" alt="Defender 90 Explorer Pack">`);
safeSetInnerHTML(8, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender 90 Explorer Pack</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_DEFENDER_90_HSE_EXPLORER_PACK_(3BA-LE62XCA)_rear.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 8);
hideElement("btb_video_embed", 8);
safeSetInnerHTML(9, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 858-859: Roof-Mounted Recovery Tracks</h1></div>`);
safeSetInnerHTML(9, "btb_icon_1", `<div class="icon-container"><i class="fas fa-road"></i></div><div class="title-container">Traction Recovery</div><div class="content-container">Recovery tracks provide essential grip in mud, sand, and snow, helping the Defender escape difficult conditions.</div>`);
safeSetInnerHTML(9, "btb_icon_2", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">Roof Access</div><div class="content-container">Mounted on the roof rack, the recovery tracks are easily accessible during off-road adventures.</div>`);
safeSetInnerHTML(9, "btb_icon_3", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Expedition Essentials</div><div class="content-container">These traction boards enhance the Defender’s readiness for all-terrain journeys, reinforcing its rugged profile.</div>`);
safeSetInnerHTML(9, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio9', 'playPauseIcon9', 'progressBar9')"><i id="playPauseIcon9" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar9" class="progress-bar" value="0" max="100"><audio id="audio9" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_858_859.mp3"></audio></div>`);
safeSetInnerHTML(9, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this step, we secure the <strong>recovery tracks</strong> on the Defender’s roof rack, adding a practical off-road feature. Recovery tracks, also known as <strong>traction boards</strong>, are designed to provide grip in challenging conditions like mud, sand, and snow. By placing these heavy-duty boards under the wheels, drivers can regain traction and free the vehicle when it’s stuck. Mounted on the roof for easy access, these tracks are essential tools for serious off-road expeditions, enhancing the Defender’s capability to tackle unpredictable terrains.</p>`);
safeSetInnerHTML(9, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/traction_boards.jpg" alt="Recovery Tracks">`);
safeSetInnerHTML(9, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Recovery Tracks</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 9);
hideElement("btb_video_embed", 9);
safeSetInnerHTML(10, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 860: Wheels and Tires</h1></div>`);
safeSetInnerHTML(10, "btb_icon_1", `<div class="icon-container"><i class="fas fa-circle"></i></div><div class="title-container">Steel to Alloy Evolution</div><div class="content-container">From early steel to modern alloy, Defender wheels evolved to balance ruggedness with performance.</div>`);
safeSetInnerHTML(10, "btb_icon_2", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">All-Terrain Tires</div><div class="content-container">Modern Defenders use wider, all-terrain tires, offering improved grip on varied surfaces.</div>`);
safeSetInnerHTML(10, "btb_icon_3", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Military-Grade Strength</div><div class="content-container">“Wolf” steel wheels, developed for military use, reinforced the Defender’s reputation in off-road durability.</div>`);
safeSetInnerHTML(10, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio10', 'playPauseIcon10', 'progressBar10')"><i id="playPauseIcon10" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar10" class="progress-bar" value="0" max="100"><audio id="audio10" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_860.mp3"></audio></div>`);
safeSetInnerHTML(10, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The Land Rover Defender’s <strong>wheels and tires</strong> have a storied evolution. Early Defenders used steel wheels fitted with narrow tires, designed for rugged durability rather than comfort. These were often tube tires mounted on wheels built for simplicity and resilience, favoring off-road performance over sleek aesthetics. Over time, <strong>“Wolf” steel wheels</strong> were developed, offering greater width and strength to support larger tires. These wheels became famous for their use in military Defenders, and their robust design contributed to the Defender's off-road reputation.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Modern Defenders feature larger alloy wheels and all-terrain tires, improving grip on diverse surfaces. The latest models have multiple tire configurations for road or off-road applications, combining durability with improved ride comfort and handling. Today’s Defender tires, with wider widths and improved treads, reflect the vehicle's evolution from an agricultural tool to a versatile off-road icon, capable of tackling any terrain with style and performance.</p>`);
safeSetInnerHTML(10, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_Defender_90_2.2_TD4.jpg" alt="Restored Defender 90 with steel wheels">`);
safeSetInnerHTML(10, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Restored Defender 90 with steel wheels</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_Defender_90_2.2_TD4.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 10);
hideElement("btb_video_embed", 10);
safeSetInnerHTML(11, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Thank you!</h1></div>`);
safeSetInnerHTML(11, "btb_icon_1", `<div class="icon-container"><i class="fas fa-heart"></i></div><div class="title-container">We Love LEGO</div><div class="content-container">Build on!</div>`);
hideElement("btb_icon_2", 11);
hideElement("btb_icon_3", 11);
hideElement("btb_image", 11);
hideElement("btb_caption", 11);
safeSetInnerHTML(11, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio11', 'playPauseIcon11', 'progressBar11')"><i id="playPauseIcon11" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar11" class="progress-bar" value="0" max="100"><audio id="audio11" src="https://behind-the-builds.github.io/btb/defender/audio/defender_thank_you_.mp3"></audio></div>`);
safeSetInnerHTML(11, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">We hope you enjoyed using this companion guide as much as we enjoyed creating it!</p><p class="sqsrte-large" style="white-space:pre-wrap;">We really appreciate your feedback on what you love, what we can do better, and what model you'd like to see us do next.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Send us a note at https://www.behindthebuilds.com/contact.</p>`);
hideElement("btb_video_header", 11);
hideElement("btb_video_embed", 11);
hideExtraSections(11);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 11, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 11, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

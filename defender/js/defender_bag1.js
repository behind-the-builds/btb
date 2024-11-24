
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 1: Gearbox, Rear Drivetrain, and Hubs</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Design Note</div><div class="content-container">In the model, the gearbox is positioned toward the rear, likely to allow space for a working mechanism in the compact structure.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-road"></i></div><div class="title-container">Defender Legacy</div><div class="content-container">The real Defender’s gearbox sits in the front, a hallmark of its four-wheel-drive layout, built to handle challenging terrains worldwide.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/defender/audio/defender_bag_1.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this first stage, we lay the foundation for the <strong>Defender’s drivetrain</strong>, assembling the <strong>gearbox</strong>, <strong>rear drivetrain</strong>, and <strong>hubs</strong>. In the model, the <strong>gearbox</strong> is positioned toward the rear, likely to allow space for a working mechanism in the compact structure. The real Defender’s <strong>gearbox</strong> sits in the front, a hallmark of its <strong>four-wheel-drive layout</strong>, built to handle challenging terrains worldwide.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_Defender_90_(L663)_IMG_9441.jpg" alt="A modern Land Rover Defender 90">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A modern Land Rover Defender 90</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_Defender_90_(L663)_IMG_9441.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 1-9: Rear Differential</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Differential Function</div><div class="content-container">The rear differential allows independent wheel rotation for smooth turning on uneven ground.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-shield-alt"></i></div><div class="title-container">Durability Factor</div><div class="content-container">Built for rugged use, the rear differential is essential for the Defender’s off-road reliability.</div>`);
hideElement("btb_icon_3", 2);
hideElement("btb_image", 2);
hideElement("btb_caption", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_1_9.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we begin constructing the <strong>rear differential</strong>, a vital part of the <strong>Defender’s drivetrain</strong> that allows the rear wheels to rotate at different speeds. This capability is essential for smooth turning, preventing the wheels from slipping or binding on sharp corners—a crucial feature for both road handling and off-road navigation.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Land Rover has long utilized rugged differential designs, contributing to the Defender’s <strong>versatility</strong> and <strong>durability</strong> across uneven terrains. Originally engineered for <strong>off-road reliability</strong>, the Defender’s differentials evolved to meet <strong>military</strong> and <strong>expedition</strong> needs, combining robustness with field-serviceable components.</p>`);
safeSetInnerHTML(2, "btb_video_header", `<div class="video-header">Watch a locking rear differential in action:</div>`);
safeSetInnerHTML(2, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/4fu4GmzpFmA?si=xYQdMLNBmPfnV3Bh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 10-19: Rear Independent Suspension</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-road"></i></div><div class="title-container">Enhanced Stability</div><div class="content-container">The rear independent suspension boosts control over rough terrain, allowing each wheel to move separately.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">Trail Adaptability</div><div class="content-container">Land Rover’s coil springs and suspension design offer improved comfort and performance on rough trails.</div>`);
hideElement("btb_icon_3", 3);
hideElement("btb_image", 3);
hideElement("btb_caption", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_10_19.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">With these steps, we set up the <strong>rear independent suspension</strong>—a crucial feature that enhances the Defender’s <strong>handling</strong> across rugged landscapes. Unlike solid-axle systems that connect both wheels rigidly, an independent suspension system allows each wheel to move separately, improving <strong>stability</strong> and <strong>traction</strong> on uneven ground.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Land Rover introduced coil springs and advanced suspension designs in the 1980s to elevate both comfort and <strong>performance</strong>. This setup reflects those innovations, allowing the Defender to offer a smoother ride while maintaining the durability required for challenging environments.</p>`);
safeSetInnerHTML(3, "btb_video_header", `<div class="video-header">Watch a Range Rover navigate a muddy rutted road during a Camel Trophy event in the 1980s:</div>`);
safeSetInnerHTML(3, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/QtK_jnqGaLg?si=xWmQF0MUtCGpEChn&amp;start=148&amp;end=163.4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 20-32: Rear Axle Assembly</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-truck-monster"></i></div><div class="title-container">Rear Axle Strength</div><div class="content-container">The rear axle assembly integrates suspension and differential components, supporting the drivetrain.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Expedition Ready</div><div class="content-container">Durable axle design proved crucial for Defenders in global expeditions, enduring extreme terrains.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_20_32.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this segment, we complete the <strong>rear axle assembly</strong> by installing the <strong>rear hubs</strong>, connecting the <strong>suspension</strong>, and housing the <strong>rear differential</strong>. This assembly integrates key drivetrain elements, allowing independent movement for each rear wheel, enhancing adaptability. With the <strong>rear axle assembly</strong> in place, we prepare for connecting the <strong>gearbox</strong>, enabling the Defender’s <strong>four-wheel drive</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Land Rover’s <strong>rear axle design</strong>, including the heavy-duty Salisbury axle, set a standard for <strong>durability</strong> in demanding environments. This was crucial to the Defender's success in global expeditions, such as the Cambridge Trans-America Expedition, where a Defender crossed from Argentina to the Arctic Circle. The vehicle’s <strong>axle</strong> and other key components withstood the journey, showcasing its reputation for handling <strong>extreme terrain</strong> and field repairs.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Defender_90_Getting_Wet_(100354841).jpeg" alt="Defender 90 getting wet">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender 90 getting wet</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Defender_90_Getting_Wet_(100354841).jpeg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 33-67: 4-Speed Gearbox</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Manual Transmission Design</div><div class="content-container">The 4-speed gearbox assembly will connect to the gear shift, offering precision and control.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Evolving Technology</div><div class="content-container">Early Defenders used manual gearboxes, while modern models feature advanced automatic transmissions.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_33_67.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>4-speed gearbox</strong>, which will later connect to the <strong>gear shift</strong> in the cab. This gearbox mirrors the functionality of the Defender’s real-life transmission, designed for precise control on both rugged terrain and regular roads. Land Rover’s early Defender models featured durable <strong>4- and 5-speed manual gearboxes</strong> drivers to shift between power and efficiency needs.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Modern Defenders have transitioned to an <strong>8-speed automatic transmission</strong> developed by ZF. This gearbox is designed for smooth, adaptive shifting and works in tandem with Land Rover’s Terrain Response system to select the best gearing for different terrains. While the automatic setup offers more convenience and versatility, many enthusiasts still value the tactile connection of the original manual transmission in classic Defenders.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Graziano_transmission.jpg" alt="A ZF transmission similar to that used in the Defender">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A ZF transmission similar to that used in the Defender</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Graziano_transmission.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 68-92: Center Differential and Gearshift Linkage</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-balance-scale"></i></div><div class="title-container">Power Distribution</div><div class="content-container">The center differential allows the front and rear axles to rotate independently, ensuring balanced handling.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-compass"></i></div><div class="title-container">Off-Road Adaptability</div><div class="content-container">The Defender’s drivetrain is designed for versatility, adapting power distribution for rugged landscapes.</div>`);
hideElement("btb_icon_3", 6);
hideElement("btb_image", 6);
hideElement("btb_caption", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_68_92.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this segment, we build the <strong>center differential</strong>, which allows the Defender’s front and rear axles to rotate independently, a crucial feature for smooth handling across both paved and uneven surfaces, preventing wheel binding during turns. Alongside this, we start the connection to the <strong>gear shift</strong>, setting up for gear control. The Defender’s off-road capability is rooted in its rugged drivetrain system, built to withstand tough conditions worldwide. The original <strong>“Land Rover”</strong> debuted in 1948, but it wasn’t until the early 1980s that the Defender line as we know it began, establishing itself as a premier choice for off-road enthusiasts and expedition teams around the globe.</p>`);
safeSetInnerHTML(6, "btb_video_header", `<div class="video-header">Watch a Defender driver lock the center differential to overcome an obstacle:</div>`);
safeSetInnerHTML(6, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/6VlKZ4VxDAM?si=LuoBquL_tYVx6DUF&amp;start=5&amp;end=30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 93-123: Gearbox Housing and Structural Reinforcements</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-hammer"></i></div><div class="title-container">Reinforced Structure</div><div class="content-container">Structural elements enhance stability, distributing stress across the Defender’s rugged frame.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bars"></i></div><div class="title-container">Durability in Design</div><div class="content-container">High-strength steel crossmembers ensure the Defender maintains integrity in challenging conditions.</div>`);
hideElement("btb_icon_3", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instr_93_123.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we complete the <strong>gearbox housing</strong> and add key lateral structural elements essential for stability and support. In the real Defender, these <strong>crossmembers</strong> are made from high-strength steel, integrated into the ladder-frame chassis to handle the strain of off-road driving and heavy loads. The steel crossmembers work in tandem with longitudinal members to distribute stress evenly, allowing the Defender to maintain structural integrity over rugged terrain. This focus on reinforced durability is a hallmark of the Defender’s design, enabling it to withstand the rigors of demanding environments and making it a favorite among off-road enthusiasts worldwide.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Defender_in_Los_Andes.jpg" alt="Defender in Los Andes">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender in Los Andes</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Defender_in_Los_Andes.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
hideExtraSections(7);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

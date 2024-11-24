
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 2: Seats, Engine, and Front Drivetrain</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-chair"></i></div><div class="title-container">Interior Comfort</div><div class="content-container">The Defender’s seats prioritize durability and comfort for long journeys.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Engine Assembly</div><div class="content-container">This stage includes building the engine, capturing the Defender’s rugged performance.</div>`);
safeSetInnerHTML(1, "btb_icon_3", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Front Drivetrain</div><div class="content-container">Adding the front drivetrain connects the engine to the wheels, establishing four-wheel drive.</div>`);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/defender/audio/defender_bag_2.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 2, we focus on essential elements for both the <strong>interior and drivetrain</strong> of the Defender. This stage includes assembling the  <strong>seats</strong>, <strong>engine</strong>, and <strong>front drivetrain</strong>. The seating setup reflects the Defender’s design focus on <strong>durability and comfort</strong>, built to withstand rugged off-road conditions.</p><p class="sqsrte-large" style="white-space:pre-wrap;">We also construct the <strong>engine</strong>, known for its robust performance and adaptability across various terrains. Completing the <strong>front drivetrain</strong> links the engine to the front wheels, establishing the Defender’s <strong>four-wheel-drive</strong> system.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Classic_Land_Rover_(191357671).jpeg" alt="Classic Land Rover">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Classic Land Rover</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Classic_Land_Rover_(191357671).jpeg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 124-138: Front Differential</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Independent Motion</div><div class="content-container">The front differential allows each wheel to rotate independently, improving stability on rough terrain.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Advanced Axle Design</div><div class="content-container">Modern Defenders use high-strength Spicer axles, combining durability with reduced noise and vibration.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_124_138.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these instructions, we assemble the <strong>front differential</strong>, completing another key component of the Defender’s drivetrain. This differential allows the front wheels to rotate independently, crucial for stability and grip when tackling off-road conditions. Historically, Land Rover began using Spicer axles in the early 1980s to increase durability and performance for off-road adventures.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Today, modern Defenders incorporate advanced Spicer AdvanTEK® axles, developed to offer high strength in a compact form, reducing noise and vibration even under demanding conditions. This attention to axle and differential design has kept Land Rover at the forefront of rugged vehicle engineering, providing models that balance toughness with improved efficiency and driving comfort.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Differential_Gear_(PSF).jpg" alt="A diagram of a differential gear">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A diagram of a differential gear</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Differential_Gear_(PSF).png" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 139-157: Front Wheels and Suspension</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-circle"></i></div><div class="title-container">Front Wheel Assembly</div><div class="content-container">The front wheels form the base for the Defender’s steering and stability, essential for navigating varied terrain.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-compress-alt"></i></div><div class="title-container">Suspension Design</div><div class="content-container">The softer front suspension introduces a forward tilt, mirroring the stance of the real Defender.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_139_157.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we add the <strong>front wheels</strong> and <strong>suspension</strong> to the Defender model. The LEGO design includes a softer front suspension compared to the rear, giving the model a slight forward tilt—reflecting the frontward-down tilt found in real Defenders. This subtle detail captures the classic stance of the Defender, designed to handle both road and off-road conditions with equal ease.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Defender_-_panoramio_(3).jpg" alt="Defender off-road">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender off-road</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Defender_-_panoramio_(3).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 158-191: Steering Mechanism</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Steering Precision</div><div class="content-container">The Defender’s steering mechanism balances simplicity with durability, ideal for rugged off-road use.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bolt"></i></div><div class="title-container">Power-Assisted Steering</div><div class="content-container">By the late 1980s, power-assisted steering became standard, enhancing control at low speeds on tough terrain.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_158_191.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this stage, we assemble the <strong>steering mechanism</strong> of the Defender model. The real-life Defender’s steering system has been simple yet effective, prioritizing durability for off-road use. Originally, Defenders were equipped with a manual steering box, allowing for reliability in remote environments.</p><p class="sqsrte-large" style="white-space:pre-wrap;">By the late 1980s, <strong>power-assisted steering</strong> became standard, which made low-speed steering easier, especially useful for off-road maneuvering. This design ensures ease of repair and longevity, essential for handling rugged landscapes.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/MB-5_Power_Steering.jpg" alt="Diagram of a power steering system">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Diagram of a power steering system</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:MB-5_Power_Steering.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 192-205: Engine Pistons</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Inline-6 Configuration</div><div class="content-container">This engine features an inline-6 piston layout, reflecting the power and reliability found in many real Defender models.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bolt"></i></div><div class="title-container">Engine Evolution</div><div class="content-container">Defenders have used both inline-4 and inline-6 engines, with modern models featuring the Ingenium inline-6, designed for balance across diverse terrains.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_192_205.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these instructions, we assemble the <strong>engine pistons</strong> for the Defender model, designed in an <strong>inline 6 configuration</strong>. Real-life Defenders have historically used inline engines, including both <strong>inline-4</strong> and <strong>inline-6</strong> options. The latest models feature the <strong>Ingenium inline-6</strong>, known for its compact design and smooth power delivery. These engines have been integral to the Defender’s reputation for rugged performance and reliability on various terrains, balancing power and efficiency in demanding conditions.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Building_an_Icon-_Defender_2,000,000_(18889379808).jpg" alt="A Land Rover Defender engine at the factory">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">A Land Rover Defender engine at the factory</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Building_an_Icon-_Defender_2,000,000_(18889379808).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 206-278: Rear Drivetrain Power and Front/Rear Connect</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-road"></i></div><div class="title-container">Permanent 4WD</div><div class="content-container">Later models adopted permanent 4WD, ensuring steady power to all four wheels for enhanced off-road traction.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-mountain"></i></div><div class="title-container">Terrain Response</div><div class="content-container">Modern Defenders include the Terrain Response system, adapting to conditions like mud and snow for improved control.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instr_206_278.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these steps, we build the gearing that transfers power to the <strong>rear drivetrain</strong>. Early Defender models featured a selectable <strong>four wheel drive system</strong>, allowing drivers to switch between two or four wheel drive. This design was practical for adapting between on-road efficiency and off-road power. The <strong>rear drivetrain gearing</strong> in early Defenders was engineered for durability and minimal maintenance, making it reliable on rugged terrains.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Next, we connect the front and rear drivetrains, completing the core of the Defender’s <strong>four wheel drive system</strong>. Over time, the Defender introduced <strong>permanent wheel drive</strong> for enhanced traction and ease of use, allowing continuous power to both axles. Modern models feature Land Rover’s <strong>Terrain Response system</strong>, which adjusts power distribution automatically for efficient handling across mud, sand, and snow.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/Land_Rover_Defender_90_At_Salisbury_Plain_(100354839).jpeg" alt="Defender 90 at Salisbury Plain">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender 90 at Salisbury Plain</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Land_Rover_Defender_90_At_Salisbury_Plain_(100354839).jpeg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 279-290: Steering Wheel and Gearshift Mechanicals</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Interactive Steering</div><div class="content-container">Connecting the steering wheel adds realistic control, reflecting the Defender's responsive handling.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Gearshift Linkage</div><div class="content-container">The gearshift assembly mirrors the hands-on feel of the Defender’s rugged and direct driving experience.</div>`);
hideElement("btb_icon_3", 7);
hideElement("btb_image", 7);
hideElement("btb_caption", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instr_279_290.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these instructions, we assemble and connect the working <strong>steering wheel</strong> and <strong>gearshift</strong> to their respective mechanisms, creating an interactive linkage between the controls and the model’s internal components.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The real Defender’s steering and gear-shifting systems, known for their straightforward and durable design, were crafted to withstand challenging environments.</p>`);
safeSetInnerHTML(7, "btb_video_header", `<div class="video-header">Watch the model designer demonstrate the completed transmission system of the Defender:</div>`);
safeSetInnerHTML(7, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/p3DPvbhjX-M?si=cBQdONzG1Dka_Hb2&amp;start=79&amp;end=114" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 291-321: Engine Components, Housing, and Winch</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Engine Housing</div><div class="content-container">Completing engine components and housing reinforces the model’s core structure, reflecting the Defender’s powerful setup.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Essential Winch</div><div class="content-container">A winch is vital for off-roading, enabling recovery from difficult terrain and assisting other vehicles in need.</div>`);
hideElement("btb_icon_3", 8);
hideElement("btb_image", 8);
hideElement("btb_caption", 8);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instr_291_321.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this phase, we complete additional elements of the <strong>engine</strong> and its <strong>housing</strong>, building out the heart of the Defender’s power system. This stage also includes the assembly of a working <strong>winch</strong>, an essential feature for off-road enthusiasts. Winches provide a crucial safety measure in real off-roading, as they allow the vehicle to pull itself out of tough situations—whether it’s a steep incline, deep mud, or rocky terrain. A factory-installed option on newer Defenders, this feature adds capability for both the vehicle and to assist others.</p>`);
safeSetInnerHTML(8, "btb_video_header", `<div class="video-header">Watch the LEGO model designer demonstrate the working winch:</div>`);
safeSetInnerHTML(8, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/p3DPvbhjX-M?si=3mKdgl025DaE8s52&amp;start=199&amp;end=225" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(9, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 322-335: Dashboard</h1></div>`);
safeSetInnerHTML(9, "btb_icon_1", `<div class="icon-container"><i class="fas fa-tachometer-alt"></i></div><div class="title-container">Analog to Digital</div><div class="content-container">Early Defender dashboards prioritized durability and function with analog gauges, evolving to today’s digital Pivi Pro system.</div>`);
safeSetInnerHTML(9, "btb_icon_2", `<div class="icon-container"><i class="fas fa-satellite-dish"></i></div><div class="title-container">Modern Connectivity</div><div class="content-container">The Pivi Pro system brings advanced connectivity, including phone mirroring and over-the-air updates for real-time functionality.</div>`);
hideElement("btb_icon_3", 9);
safeSetInnerHTML(9, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio9', 'playPauseIcon9', 'progressBar9')"><i id="playPauseIcon9" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar9" class="progress-bar" value="0" max="100"><audio id="audio9" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_322_335.mp3"></audio></div>`);
safeSetInnerHTML(9, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these instructions, we build the <strong>dashboard</strong>, completing the Defender’s internal <strong>control center</strong>. Historically, the Defender’s dashboard was renowned for its <strong>simplicity</strong> and <strong>rugged utility</strong>, featuring minimalistic controls tailored for <strong>durability</strong> in challenging conditions. Early Defenders used <strong>analog gauges</strong> and straightforward dials to prioritize <strong>function over comfort</strong>, reflecting the vehicle’s off-road focus.</p><p class="sqsrte-large" style="white-space:pre-wrap;">With the redesigned Defender in <strong>2020</strong>, Land Rover introduced the <strong>Pivi Pro dashboard system</strong>, a fully electronic interface that brings the model into the digital era. The Pivi Pro system offers quick access to <strong>navigation</strong>, <strong>off-road performance metrics</strong>, and <strong>entertainment</strong> while seamlessly integrating <strong>phone mirroring</strong>, <strong>over-the-air updates</strong>, and <strong>advanced connectivity</strong>.</p>`);
safeSetInnerHTML(9, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/2023_Land_Rover_Defender_interior.jpg" alt="2023 Land Rover Defender interior">`);
safeSetInnerHTML(9, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">2023 Land Rover Defender interior</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:2023_Land_Rover_Defender_interior.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 9);
hideElement("btb_video_embed", 9);
safeSetInnerHTML(10, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 336-368: Door Frame and Main Cabin Body Structure</h1></div>`);
safeSetInnerHTML(10, "btb_icon_1", `<div class="icon-container"><i class="fas fa-door-closed"></i></div><div class="title-container">Structural Integrity</div><div class="content-container">The reinforced door frame and D7x platform provide a stable base, ensuring durability across challenging terrain.</div>`);
safeSetInnerHTML(10, "btb_icon_2", `<div class="icon-container"><i class="fas fa-hammer"></i></div><div class="title-container">Modern Body Design</div><div class="content-container">The monocoque design offers high strength while reducing weight, maintaining the Defender’s off-road capability with enhanced safety.</div>`);
hideElement("btb_icon_3", 10);
safeSetInnerHTML(10, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio10', 'playPauseIcon10', 'progressBar10')"><i id="playPauseIcon10" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar10" class="progress-bar" value="0" max="100"><audio id="audio10" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instr_336_368.mp3"></audio></div>`);
safeSetInnerHTML(10, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this segment, we construct the <strong>door frame</strong> and part of the <strong>main cabin body structure</strong>, creating a rigid base for the Defender’s cabin. The latest Defender is built on the <strong>D7x platform</strong>, a high-strength aluminum monocoque that’s three times stiffer than traditional body-on-frame designs. This structure not only enhances durability for off-roading but also supports independent suspension on all four wheels. Exposed elements like reinforced door frames and magnesium beams across the cabin add both aesthetic appeal and practical resilience, reflecting Land Rover’s approach to integrating ruggedness with modern technology.</p>`);
safeSetInnerHTML(10, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/ENGAGE4X4-Defender-GB.jpg" alt="An aftermarket winch on a classic Defender">`);
safeSetInnerHTML(10, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">An aftermarket winch on a classic Defender</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:ENGAGE4X4-Defender-GB.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 10);
hideElement("btb_video_embed", 10);
safeSetInnerHTML(11, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 369-385: Front Seats</h1></div>`);
safeSetInnerHTML(11, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Enhanced Comfort</div><div class="content-container">The Defender’s front seats offer durability with features like leather and heated options for added comfort in varied conditions.</div>`);
safeSetInnerHTML(11, "btb_icon_2", `<div class="icon-container"><i class="fas fa-wrench"></i></div><div class="title-container">Practical Design</div><div class="content-container">Seat design focuses on functionality, balancing the Defender’s need for rugged use with everyday adaptability.</div>`);
hideElement("btb_icon_3", 11);
safeSetInnerHTML(11, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio11', 'playPauseIcon11', 'progressBar11')"><i id="playPauseIcon11" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar11" class="progress-bar" value="0" max="100"><audio id="audio11" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_369_385.mp3"></audio></div>`);
safeSetInnerHTML(11, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this stage, we construct the <strong>front seats</strong>, building out a key part of the Defender’s cabin. Modern Defender models emphasize both comfort and functionality in their seat design, incorporating premium materials like leather and offering adjustable, heated seating options for improved passenger comfort on long journeys.</p>`);
safeSetInnerHTML(11, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/More_Rugged_Appeal_With_the_Land_Rover_Defender_Special_Edition_(7541307006).jpg" alt="Defender Special Edition front seats">`);
safeSetInnerHTML(11, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Defender Special Edition front seats</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:More_Rugged_Appeal_With_the_Land_Rover_Defender_Special_Edition_(7541307006).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 11);
hideElement("btb_video_embed", 11);
safeSetInnerHTML(12, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 386-399: Rear Seats</h1></div>`);
safeSetInnerHTML(12, "btb_icon_1", `<div class="icon-container"><i class="fas fa-users"></i></div><div class="title-container">Adaptable Seating</div><div class="content-container">The Defender’s rear seats offer flexible configurations, meeting both storage and passenger needs.</div>`);
safeSetInnerHTML(12, "btb_icon_2", `<div class="icon-container"><i class="fas fa-suitcase"></i></div><div class="title-container">Ready for Adventure</div><div class="content-container">Rear seats can be folded or reclined to make room for gear and improve long-trip comfort.</div>`);
hideElement("btb_icon_3", 12);
safeSetInnerHTML(12, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio12', 'playPauseIcon12', 'progressBar12')"><i id="playPauseIcon12" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar12" class="progress-bar" value="0" max="100"><audio id="audio12" src="https://behind-the-builds.github.io/btb/defender/audio/defender_instructions_386_399.mp3"></audio></div>`);
safeSetInnerHTML(12, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we assemble the <strong>rear seats</strong>, adding versatility to the cabin layout. The Defender’s <strong>rear seating</strong> has evolved from simple jump seats to full bench seats and forward-facing options. Newer models, such as the Defender 110, offer <strong>flexible configurations</strong>, including folding and reclining options for rear passengers, catering to both off-road adventures and family travel. The <strong>rear seating arrangements</strong> underscore the Defender’s versatility, making it as suitable for rough trails as for urban commutes.</p>`);
safeSetInnerHTML(12, "btb_image", `<img src="https://behind-the-builds.github.io/btb/defender/images/More_Rugged_Appeal_With_the_Land_Rover_Defender_Special_Edition_(7541306802).jpg" alt="An interior view of the Defender Special Edition">`);
safeSetInnerHTML(12, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">An interior view of the Defender Special Edition</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:More_Rugged_Appeal_With_the_Land_Rover_Defender_Special_Edition_(7541306802).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 12);
hideElement("btb_video_embed", 12);
hideExtraSections(12);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 8, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 9, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 10, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 10, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 11, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 11, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 12, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 12, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

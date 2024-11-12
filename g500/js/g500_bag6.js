
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 5: Undercarriage and Rigid Axle Suspension</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-truck"></i></div><div class="title-container">Rigid Axle Design</div><div class="content-container">Non-independent suspension provides strength and durability for off-road conditions.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Enhanced Traction</div><div class="content-container">Rigid axles ensure both wheels maintain ground contact, improving stability on rough terrain.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_5.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we extend the undercarriage structure to the rear axle, laying the groundwork for a robust and functional model. This step is crucial as it provides the necessary support for the vehicle's drivetrain and suspension systems.</p><p class="sqsrte-large" style="white-space:pre-wrap;">We begin constructing the <strong>rigid axle suspension</strong>, which is a non-independent suspension system commonly found in off-road vehicles like the G-Class. This type of suspension connects both rear wheels via a solid axle, allowing them to move together. While this design may limit individual wheel movement compared to independent systems, it offers significant advantages in durability and strength, especially in rugged terrains.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/21196907634_9ba9e8e28c_o.jpg" alt="G500 from the rear, showcasing its robust undercarriage design.">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">G500 from the rear, showcasing its robust undercarriage design.</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://www.flickr.com/photos/klimenko/21196907634/" target="_blank">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 6: Rear Drivetrain Completion and Wheel Assembly</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-cog"></i></div><div class="title-container">Rear Drivetrain</div><div class="content-container">Completes power transmission to rear wheels for realistic movement.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-cogs"></i></div><div class="title-container">Steering Control</div><div class="content-container">Adding a steering wheel enhances interactive features and control.</div>`);
safeSetInnerHTML(2, "btb_icon_3", `<div class="icon-container"><i class="fas fa-circle"></i></div><div class="title-container">Off-Road Wheels</div><div class="content-container">Tires designed for stability and traction on various terrains.</div>`);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/g500/audio/g500_bag_6.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we complete the <strong>rear drivetrain</strong>, ensuring that power is effectively transmitted to the rear wheels.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Next, we add the <strong>steering wheel</strong> to enhance the model's interactive features. The steering wheel connects to the steering system we built earlier, allowing for smooth maneuvering of the vehicle.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Finally, we put on the <strong>wheels and tires</strong>, completing the assembly of the G-Class model. The wheels are designed to replicate the iconic look of the G-Class while providing stability and traction. The tires are crafted to mimic off-road capabilities, ensuring that the model can navigate various terrains with ease.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-Benz_G-Class_G300CDI_W461_Swiss_Army_1.jpg" alt="Swiss Army G-Class variant showcasing its rugged design and capabilities.">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Swiss Army G-Class variant showcasing its rugged design and capabilities.</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-Benz_G-Class_G300CDI_W461_Swiss_Army_1.png" target="_blank">source</a></p></div>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 241-251: Rear Locking Differential</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-lock"></i></div><div class="title-container">Functional Locking Ability</div><div class="content-container">Engages both rear wheels for improved traction in challenging conditions.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-trophy"></i></div><div class="title-container">Rally Heritage</div><div class="content-container">The G-Class's performance in events like the Moroccan Rally showcases its off-road capabilities.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_241_251.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we focus on the <strong>rear locking differential</strong>, which features functional locking ability. This differential allows both rear wheels to rotate at the same speed when engaged, providing essential traction in challenging off-road conditions. The ability to lock the rear differential is particularly beneficial when navigating slippery or uneven terrain, ensuring that power is effectively distributed to both wheels.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The G-Class has a storied history as a capable off-road vehicle, famously participating in events like the <strong>Moroccan Rally</strong>. Its robust design and advanced features, including the rear locking differential, have made it a favorite among rally drivers and off-road enthusiasts alike. The vehicle's ability to tackle extreme conditions has solidified its reputation as not just a luxury SUV but also a formidable competitor in rally racing.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/52549189710_6f9f3ceabb_o.jpg" alt="A rally-ready G500 showcasing its off-road capabilities.">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">A rally-ready G500 showcasing its off-road capabilities.</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://www.flickr.com/photos/thomas_vogt/52549189710/" target="_blank">source</a></p></div>`);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 252-275: Rigid Rear Axle & Rear Suspension Connection</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-truck"></i></div><div class="title-container">Rigid Axle Benefits</div><div class="content-container">Provides strength and durability for off-road performance.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Enhanced Traction</div><div class="content-container">Keeps both wheels in contact with the ground for improved stability on uneven surfaces.</div>`);
hideElement("btb_icon_3", 4);
hideElement("btb_image", 4);
hideElement("btb_caption", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instr_252_275.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we build out the <strong>rigid rear axle</strong> and connect it to the rear suspension system. The rigid axle design is a key feature in off-road vehicles like the G-Class, providing several advantages that enhance performance in challenging environments.</p><p class="sqsrte-large" style="white-space:pre-wrap;">A <strong>rigid rear axle</strong> connects both rear wheels directly, allowing them to move together as a single unit. This setup offers improved durability and strength, making it ideal for off-road conditions where obstacles and uneven surfaces are common. By ensuring that both wheels maintain contact with the ground, a rigid axle enhances traction and stability, which is crucial when navigating rugged terrain.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Additionally, the simplicity of a rigid axle design means fewer moving parts compared to independent suspension systems, leading to increased reliability and ease of maintenance. This makes the G-Class not only a luxurious vehicle but also a robust performer capable of tackling extreme conditions.</p>`);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 276-281: Steering Wheel and Column</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-clock"></i></div><div class="title-container">Evolution of Design</div><div class="content-container">From military utility to luxury refinement, the steering wheel reflects the G-Class's heritage.</div>`);
hideElement("btb_icon_2", 5);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/g500/audio/g500_instructions_276_281.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Mercedes-Benz G-Class</strong>, originally developed as a military vehicle in the 1970s, has evolved significantly over the decades. The steering wheel has also seen changes reflecting this evolution—from a utilitarian design in early military models to the more refined and ergonomic options found in modern luxury versions. The G-Class is known for its commanding driving position, which provides excellent visibility and control, essential for navigating challenging terrains.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/Mercedes-Benz_Geländewagen_Norwegian_miltary_MB240GD_int.jpg" alt="Interior of a Norwegian military G-Class showcasing its functional design.">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">Interior of a Norwegian military G-Class showcasing its functional design.</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Mercedes-Benz_Gel%C3%A4ndewagen_Norwegian_miltary_MB240GD_int.jpg" target="_blank">source</a></p></div>`);
hideExtraSections(5);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

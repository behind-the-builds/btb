
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bags 31-34: Finishing Touches and Legacy of Renewal</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Restoration</div><div class="content-container">Restoration since 1163; 19th century revival by Eugène Viollet-le-Duc, modern work post-2019 fire aims for 2024 completion.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tools"></i></div><div class="title-container">Gothic Features & Techniques</div><div class="content-container">Each phase, using traditional methods & modern tech, enhances Notre-Dame's Gothic elements and structural integrity.</div>`);
hideElement("btb_icon_3", 1);
hideElement("btb_image", 1);
hideElement("btb_caption", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_bags_31_34.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">As we add the final details to our model, it's worth reflecting on <strong>Notre-Dame's</strong> long history of <strong>restoration and renewal</strong>. The cathedral has undergone numerous renovations since its construction began in 1163.</p><p class="sqsrte-large" style="white-space:pre-wrap;">A major restoration occurred in the 19th century, led by architect <strong>Eugène Viollet-le-Duc</strong>. This project, lasting from 1844 to 1864, added the iconic spire and revitalized much of the cathedral's <strong>Gothic elements</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The current restoration, following the devastating fire of April 2019, is set to be completed by <strong>December 8, 2024</strong>. This ambitious project has involved intricate work on the roof, spire, and interior, using traditional techniques alongside modern technology.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Throughout its history, <strong>Notre-Dame</strong> has symbolized <strong>resilience and rebirth</strong>. Each restoration has not only repaired damage but also added to the cathedral's rich architectural legacy, ensuring that it continues to inspire future generations.</p>`);
safeSetInnerHTML(1, "btb_video_header", `<div class="video-header">Watch a time lapse of the scaffolding removal after spire renovation:</div>`);
safeSetInnerHTML(1, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/s2mwa-K-0ds?si=vphguietGQFXKbJQ&amp;start=39&amp;end=47" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 370 Buttress Piers</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-building"></i></div><div class="title-container">Notre-Dame Buttress Piers</div><div class="content-container">Vertical stone pillars between nave windows, enhancing structural support and aesthetic of the Gothic design.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-balance-scale"></i></div><div class="title-container">Function and Form</div><div class="content-container">These piers distribute the cathedral’s weight, have decorative tops, and emphasize the rhythmic architecture of Gothic style.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_370_buttress_piers.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Between the nave windows at the ground level on the exterior of <strong>Notre-Dame de Paris</strong>, there are <strong>buttress piers</strong> or engaged columns. These vertical stone pillars are integral to the cathedral's <strong>structural and aesthetic design</strong>, positioned between each window to provide additional wall support and reinforce the Gothic emphasis on verticality.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These <strong>buttress piers</strong> are attached to the outer walls and help distribute the weight of the building. They are capped with decorative elements like small pinnacles or coped tops, enhancing the façade’s visual appeal. Though less prominent than the flying buttresses above, these ground-level supports contribute to the stability of the cathedral walls and underscore the rhythmic architectural pattern that characterizes <strong>Gothic cathedrals</strong> like Notre-Dame.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Gargoyles on the piers act as water spouts, directing rainwater away from the building to reduce erosion of the stone walls and prevent damage to the structure.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Gargoyles_(Notre-Dame_de_Paris_-_South_Façade).jpg" alt="Gargoyles on the south facade buttress piers of Notre-Dame de Paris.">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Gargoyles on the south facade buttress piers of Notre-Dame de Paris.</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Gargoyles_(Notre-Dame_de_Paris_-_South_Fa%C3%A7ade).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Insructions 371-374 Pinnacles</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Pinnacles</div><div class="content-container">Key Gothic elements on Notre-Dame, pinnacles add structural support and ornamental value, enhancing verticality and aesthetic.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Pinnacle Artistry</div><div class="content-container">Combining function with decoration, pinnacles feature carvings and finials, showcasing the craftsmanship of medieval artisans.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_insructions_371_374_pinnacles.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The decorative <strong>pinnacles</strong> on <strong>Notre-Dame de Paris</strong> are iconic <strong>Gothic elements</strong> that enhance both the cathedral’s aesthetic and structural integrity. Found throughout the structure, these slender, pointed stone ornaments are most prominent atop the <strong>flying buttresses</strong> and along the facades. On the flying buttresses, pinnacles add weight, counteracting the lateral forces from the roof vaults and stabilizing the buttresses against outward pressure.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Beyond their structural role, <strong>pinnacles</strong> are highly ornamental, often featuring intricate carvings, crockets (hooked leaves or flowers), and finials that elevate Notre-Dame’s grandeur. Their upward-pointing design accentuates the cathedral's verticality, a key characteristic of Gothic architecture, and draws the eye toward the heavens. The pinnacles embody both function and artistry, illustrating the skill of medieval craftsmen who combined engineering with decorative detail.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/North_facade_of_Notre-Dame_de_Paris,_22_June_2014.jpg" alt="Pinnacles on the north facade of Notre-Dame de Paris.">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Pinnacles on the north facade of Notre-Dame de Paris.</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:North_facade_of_Notre-Dame_de_Paris,_22_June_2014.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 375 Tabernacles</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Tabernacles</div><div class="content-container">Ornate niches on flying buttresses house saint statues, enhancing Gothic style and verticality.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Artistic & Spiritual Fusion</div><div class="content-container">Tabernacles blend structure with decoration, symbolizing life and reverence within the cathedral's design.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_375_tabernacles.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>tabernacles</strong> on the <strong>flying buttresses</strong> of <strong>Notre-Dame de Paris</strong> are small, ornate niches or miniature canopies integrated into the buttress design. These tabernacles often house statues of saints or other religious figures, adding layers of symbolic meaning to the structure. Positioned along the soaring flying buttresses, these tabernacles blend artistry with the architectural function, enhancing the cathedral’s visual appeal while contributing to the <strong>Gothic style's</strong> emphasis on decoration.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These miniature shrines serve as focal points, drawing the eye up along the buttresses toward the pinnacles and further accentuating the verticality of Notre-Dame. The addition of statues within the tabernacles gives the structure a sense of life and reverence, with each saintly figure symbolically guarding and supporting the cathedral. This fusion of structure, decoration, and spirituality is a hallmark of Gothic design, showcasing the medieval belief in creating spaces that inspire awe and elevate the mind.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/P1180494_Paris_IV_Notre-Dame_détail_sud_rwk.jpg" alt="Tabernacles on the south facade of Notre-Dame de Paris.">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Tabernacles on the south facade of Notre-Dame de Paris.</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:P1180494_Paris_IV_Notre-Dame_d%C3%A9tail_sud_rwk.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 376 Western Tower Spires</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame's Western Towers</div><div class="content-container">Planned grand spires were replaced by flat tops due to structural concerns, creating the cathedral's iconic silhouette.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bolt"></i></div><div class="title-container">Modern Lightning Rods</div><div class="content-container">Subtle lightning rods atop the western towers protect Notre-Dame while preserving its historic aesthetic.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_376_western_tower_spires.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Notre-Dame’s western towers were originally intended to be crowned with large, elaborate <strong>spires</strong> that would echo the dramatic verticality of Gothic cathedrals across Europe. However, due to <strong>structural concerns</strong> and <strong>resource limitations</strong>, these grand spires were never constructed. This left the towers with flat tops, creating a distinctive silhouette for Notre-Dame.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The flat roofs of the towers feature <strong>lightning rods</strong>, essential modern additions to protect the cathedral from electrical strikes. These rods, while practical, are subtle enough to blend with the architectural aesthetic. Their presence highlights the ongoing balance between preserving Notre-Dame's historic character and ensuring its safety in a modern context.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Facade-notre-dame-paris-ciel-bleu.jpg" alt="The west facade of Notre-Dame de Paris">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The west facade of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Facade-notre-dame-paris-ciel-bleu.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 377 Roof Apostles</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-landmark"></i></div><div class="title-container">Apostles on the Roof</div><div class="content-container">19th-century restoration by Viollet-le-Duc added copper statues of apostles around the central spire.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Patina and Preservation</div><div class="content-container">Oxidized copper statues developed a green patina, blending beauty with long-term protection.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_377_roof_apostles.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">During the 19th-century restoration of <strong>Notre-Dame de Paris</strong>, led by architect <strong>Eugène Viollet-le-Duc</strong>, the cathedral's roof was adorned with copper statues of the <strong>twelve apostles</strong>. These statues were positioned around the base of the central spire, symbolizing spiritual guardianship over the cathedral. Crafted with meticulous detail, the statues were made of copper, which over time oxidized to develop a characteristic green patina. This patina not only adds a unique aesthetic but also serves as a protective layer, preserving the copper from further corrosion. The apostles were removed just days before the 2019 fire for restoration, sparing them from damage.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre-Dame_de_Paris_DSC_0917w.jpg" alt="The apostles surrounding the central spire of Notre-Dame de Paris">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The apostles surrounding the central spire of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre-Dame_de_Paris_DSC_0917w.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 378-380 Trees Along Square Jean XXIII</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-tree"></i></div><div class="title-container">Notre-Dame Greenery</div><div class="content-container">Trees along Square Jean XXIII enhance the cathedral's gothic allure, offering shade and a serene viewing spot.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Architectural Highlights</div><div class="content-container">The greenery frames the famous flying buttresses and stained glass, emphasizing the historic grandeur.</div>`);
hideElement("btb_icon_3", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_378_380_trees_along_square_jean_xxiii.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The trees lining the south side of <strong>Notre-Dame de Paris</strong> add a serene natural contrast to the grandeur of the <strong>Gothic architecture</strong>. These trees, primarily located along the Square Jean XXIII park, create a peaceful, green space for visitors to admire the cathedral’s intricate stonework, including the famous <strong>flying buttresses</strong> and <strong>stained glass windows</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Planted as part of 19th and 20th-century urban planning efforts, the trees provide shade and a contemplative setting, softening the view of the cathedral’s stone facade. The leafy canopy highlights Notre-Dame’s southern transept and apse, especially in spring and summer when the greenery contrasts beautifully with the stone. This green belt has become an integral part of the cathedral’s environment, creating a cherished spot for locals and tourists alike to experience the harmony between nature and <strong>Notre-Dame’s historic architecture</strong>.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Square_Jean_XXIII,_Paris_23_April_2012.jpg" alt="The chancel of Notre-Dame de Paris from Square Jean XXIII">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The chancel of Notre-Dame de Paris from Square Jean XXIII</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Square_Jean_XXIII,_Paris_23_April_2012.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 381-393 The Spire</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Spire History</div><div class="content-container">Constructed in the 13th century, replaced in the 19th by Viollet-le-Duc, collapsed in 2019. Set for restoration.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-city"></i></div><div class="title-container">Symbol of Gothic Architecture</div><div class="content-container">The spire emphasized verticality and housed apostle statues, representing Parisian identity and aspirations.</div>`);
hideElement("btb_icon_3", 8);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_381_393_the_spire.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The main spire of <strong>Notre-Dame de Paris</strong>, known as the fleche or "arrow," was a defining feature of the cathedral until its tragic collapse during the <strong>2019 fire</strong>. Originally built in the 13th century, the spire had deteriorated over time and was ultimately removed in the 18th century. In the 19th century, architect <strong>Eugène Viollet-le-Duc</strong> undertook a major restoration, recreating the spire as part of his vision to restore Notre-Dame’s <strong>Gothic splendor</strong>. Completed in 1859, this spire rose over 300 feet and was crafted from oak, covered with lead to protect it from the elements.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Decorated with statues of the apostles and a copper rooster containing relics, the spire symbolized both the cathedral’s spiritual aspirations and <strong>Parisian identity</strong>. Its towering height, set above the crossing of the nave and transept, emphasized the vertical reach of Gothic architecture. Following meticulous reconstruction based on Viollet-le-Duc’s design, the spire has been fully restored, once again gracing the Parisian skyline as a symbol of resilience and heritage.</p>`);
safeSetInnerHTML(8, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre_Dame,_Paris_30_September_2015.jpg" alt="Notre-Dame de Paris viewed from the Seine">`);
safeSetInnerHTML(8, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame de Paris viewed from the Seine</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre_Dame,_Paris_30_September_2015.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 8);
hideElement("btb_video_embed", 8);
safeSetInnerHTML(9, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Thank you!</h1></div>`);
safeSetInnerHTML(9, "btb_icon_1", `<div class="icon-container"><i class="fas fa-heart"></i></div><div class="title-container">We Love LEGO</div><div class="content-container">Build on!</div>`);
hideElement("btb_icon_2", 9);
hideElement("btb_icon_3", 9);
hideElement("btb_image", 9);
hideElement("btb_caption", 9);
safeSetInnerHTML(9, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio9', 'playPauseIcon9', 'progressBar9')"><i id="playPauseIcon9" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar9" class="progress-bar" value="0" max="100"><audio id="audio9" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_thank_you_.mp3"></audio></div>`);
safeSetInnerHTML(9, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">We hope you enjoyed using this companion guide as much as we enjoyed creating it!</p><p class="sqsrte-large" style="white-space:pre-wrap;">We really appreciate your feedback on what you love, what we can do better, and what model you'd like to see us do next.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Send us a note at https://www.behindthebuilds.com/contact.</p>`);
hideElement("btb_video_header", 9);
hideElement("btb_video_embed", 9);
hideExtraSections(9);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 8, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

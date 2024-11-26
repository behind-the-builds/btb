
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bags 10-14: The First Level of the Nave and Transept</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Layout of Gothic Cathedrals</div><div class="content-container">Nave for congregations, the transept forming a cross, and the chancel the center of religious ceremonies</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Gothic Architectural Features</div><div class="content-container">Highlights verticality and light, blending functionality with the grandeur of Gothic design.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_bags_10_14.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>nave</strong>, <strong>transept</strong>, and <strong>chancel</strong> together form the primary structure of Notre-Dame Cathedral. We have just built the chancel - in the next sections we build the nave and transept.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>nave</strong> serves as the central area, designed to accommodate large congregations and featuring multiple aisles that enhance the sense of space. The <strong>transept</strong> intersects with the nave, creating a cross-shaped layout typical of Gothic cathedrals, and is adorned with striking rose windows at each end.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>chancel</strong>, or choir, extends from the transept and houses the altar, serving as a focal point for worship.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Paris_and_environs,_with_routes_from_London_to_Paris_-_handbook_for_travellers_(1913)_(14594939820).jpg" alt="Notre-Dame de Paris floorplan, from 1913 travel guide">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame de Paris floorplan, from 1913 travel guide</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Paris_and_environs,_with_routes_from_London_to_Paris_-_handbook_for_travellers_(1913)_(14594939820).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 120-137: Paving the Exterior Surrounding the Nave</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-landmark"></i></div><div class="title-container">Notre-Dame Pedestrian Zone</div><div class="content-container">Focuses on accessibility and aesthetics of the nave's exterior, serving as a vibrant pedestrian avenue in Paris.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-map-marker-alt"></i></div><div class="title-container">Historical Significance</div><div class="content-container">Home to Point Zero, the paving stone marking Paris's geographic center, vital for historical and symbolic value.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_120_137.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">This section focuses on the <strong>paving around the exterior of the nave</strong> at Notre-Dame Cathedral, an important aspect of the cathedral's <strong>accessibility</strong> and <strong>aesthetic</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The area surrounding the nave serves as a bustling <strong>pedestrian avenue</strong>, reflecting the vibrant heart of Paris. It is a key thoroughfare for both locals and tourists, providing access to the cathedral and connecting visitors to nearby attractions. This lively atmosphere enhances the experience of approaching this <strong>iconic monument</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The area surrounding the nave has been a significant site for various historical events. Notably, it is home to <strong>Point Zero</strong>, a paving stone located just in front of Notre-Dame that marks the geographic center of Paris. From this point, all distances in France are measured, making it a symbolic landmark for both locals and visitors.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Maximilien_Luce_-_The_Quai_Saint-Michel_and_Notre-Dame_-_Google_Art_Project.jpg" alt="Maximilien Luce - The Quai Saint-Michel and Notre-Dame (1901)">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Maximilien Luce - The Quai Saint-Michel and Notre-Dame (1901)</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Maximilien_Luce_-_The_Quai_Saint-Michel_and_Notre-Dame_-_Google_Art_Project.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 138-140: Tiling and Pillar Foundations in the Nave</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Cathedral Foundations</div><div class="content-container">Laying black and white tiles and pillar foundations to support the nave's vaulted ceilings, enhancing visual rhythm.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Transept Structure</div><div class="content-container">Utilizes flying buttresses for an open feel, supporting vaulted ceilings without internal pillars for liturgical space.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_138_140.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">This section focuses on the <strong>installation</strong> of the black and white tiling in, along with the <strong>foundations</strong> of the interior pillars within the nave.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The striking black and white patterned tiles not only enhance the <strong>visual appeal</strong> but also guide <strong>movement</strong> through the cathedral, creating a sense of rhythm in the space. As we lay this flooring, we also establish the foundations for the interior pillars that will support the nave's <strong>vaulted ceilings</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The transept features no internal pillar foundations. Instead, its structure relies on robust <strong>flying buttresses</strong> that manage lateral forces from the vaulted ceilings. This design choice allows for a more open and expansive feel in the transept, enhancing its role as a central space for liturgical celebrations.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre-Dame_Intérieur.jpg" alt="Notre-Dame interior">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame interior</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre-Dame_Int%C3%A9rieur.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 141-160: Transept Portals</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Notre-Dame Transept Portals</div><div class="content-container">Highlights the Portal of Saint Stephen and Portal of the Cloister, each adorned with sculptures depicting biblical narratives.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bible"></i></div><div class="title-container">Biblical Scenes Illustrated</div><div class="content-container">Features scenes from the life of Saint Stephen and the infancy of Christ, educating a medieval audience.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_141_160.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">This section focuses on the <strong>construction</strong> of the elaborate <strong>portals</strong> at each side of the transept of Notre-Dame Cathedral.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The north and south transept <strong>portals</strong>, known as the <strong>Portal of Saint Stephen</strong> and the <strong>Portal of the Cloister</strong>, are distinguished by their intricate designs and serve as significant entrances to the transept. These portals are adorned with detailed sculptures that depict important biblical scenes. The Portal of Saint Stephen illustrates the life of the first Christian martyr, while the Portal of the Cloister features scenes from the infancy of Christ, making these narratives accessible to a largely illiterate medieval audience.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre-Dame_-_Portail_du_transept_sud,_partie_centrale_-_Paris_04_-_Médiathèque_de_l'architecture_et_du_patrimoine_-_APMH00014092.jpg" alt="Portal of St. Stephen (south transept portal)">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Portal of St. Stephen (south transept portal)</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre-Dame_-_Portail_du_transept_sud,_partie_centrale_-_Paris_04_-_M%C3%A9diath%C3%A8que_de_l%27architecture_et_du_patrimoine_-_APMH00014092.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">161-163: Arcade Windows</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Arcade Windows</div><div class="content-container">First level windows with pointed arches gently illuminate the nave, featuring stained glass that narrates biblical stories and saints.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Structural Harmony</div><div class="content-container">The cathedral's columns and ribbed vaulting enhance structural integrity and create a serene atmosphere for worship.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_161_163.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The first level windows in the nave of <strong>Notre-Dame Cathedral</strong> are integral to its design, allowing in natural light while enhancing the overall aesthetic. Often referred to as <strong>arcade windows</strong>, they feature pointed arches, a hallmark of <strong>Gothic architecture</strong>, and are adorned with intricate stained glass that depicts biblical narratives and saints. This artistic choice not only beautifies the space but also serves a didactic purpose, conveying religious stories to a largely illiterate medieval audience.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These windows are complemented by the cathedral's structural elements, including robust columns and <strong>ribbed vaulting</strong> that support the nave. The interplay of light and architectural features creates a harmonious atmosphere conducive to worship and reflection. The first level windows play a crucial role in illuminating the nave, enhancing its grandeur and inviting visitors to engage with its <strong>spiritual significance</strong>.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Paris_Notre-Dame_cathedral_side_aisle_arcades_towards_tribune_(30445792).jpg" alt="Side aisle arcades towards the tribune at Notre-Dame de Paris">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Side aisle arcades towards the tribune at Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Paris_Notre-Dame_cathedral_side_aisle_arcades_towards_tribune_(30445792).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 164-172: Nave Pillars and Western Entrance</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Cathedral Interior</div><div class="content-container">Incorporation of internal supporting pillars in the nave enhances structural integrity and supports vaulted ceilings.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Cathedral's Main Entrance</div><div class="content-container">The western façade forms a focal point, embodying the grand entrance for visitors.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instr_164_172.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The construction of <strong>internal supporting pillars</strong> in the nave marks a significant step in reinforcing the <strong>structural integrity</strong> of <strong>Notre-Dame Cathedral</strong>. These round pillars, are strategically placed to support the <strong>vaulted ceilings</strong> and create a sense of verticality throughout the nave. The rhythm established by these pillars, along with the arches and pilasters, contributes to the overall harmony of the interior space.</p><p class="sqsrte-large" style="white-space:pre-wrap;">At the western end of the cathedral, the main entrance features an impressive façade that serves as a <strong>focal point</strong> for visitors. We will discuss this in greater detail as we continue to build the western entrance.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre_Dame_nave_1,_Paris_June_2014.jpg" alt="Notre-Dame nave looking east toward the chancel">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame nave looking east toward the chancel</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre_Dame_nave_1,_Paris_June_2014.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
hideExtraSections(6);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

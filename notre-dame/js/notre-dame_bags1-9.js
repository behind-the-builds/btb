
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bags 1-9: The Chancel and Chevet of Notre-Dame</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Chevet</div><div class="content-container">A semi-circular extension at the eastern end of Gothic cathedrals, housing the apse, ambulatory, and radiating chapels.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-pray"></i></div><div class="title-container">Chancel</div><div class="content-container">The sacred area around the altar, within the apse, reserved for clergy, and used for liturgical ceremonies.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_bags_1_9.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">We begin our exploration of <strong>Notre-Dame de Paris</strong> by constructing its <strong>chevet</strong>, the eastern end of the cathedral that includes the chancel. Work on this section began in 1163, beginning a project that would span nearly two centuries.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The chevet of Notre-Dame exemplifies <strong>Gothic architecture</strong>, characterized by soaring heights, expansive windows, and intricate stone structures. This complex eastern end comprises the chancel (or choir), the apse, an ambulatory, and radiating chapels. The chancel serves as the liturgical heart of the church, housing the high altar and providing space for clergy and choir members.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The chevet features tall pointed arches and slender columns that draw the eye upward, symbolizing spiritual ascension. Large stained glass windows, supported by <strong>ribbed vaults</strong> and <strong>flying buttresses</strong>, allow abundant light and enhance acoustics.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre_Dame_chevet.jpg" alt="The Chevet of Notre-Dame de Paris">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The Chevet of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre_Dame_chevet.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 1-12: Foundations of the Chevet</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-landmark"></i></div><div class="title-container">Notre-Dame Foundations</div><div class="content-container">Laid in 1163 on Île de la Cité in central Paris.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tools"></i></div><div class="title-container">Engineering Innovations</div><div class="content-container">Advanced deep-pile foundation techniques were developed to secure Notre-Dame on the marshy Seine riverbank.</div>`);
hideElement("btb_icon_3", 2);
hideElement("btb_image", 2);
hideElement("btb_caption", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_1_12.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In these instructions, we begin construction of <strong>Notre-Dame de Paris</strong> by laying the foundation for its eastern section, the <strong>chevet</strong>. This iconic <strong>Gothic cathedral</strong> commenced construction in 1163 under the direction of Bishop Maurice de Sully. The cathedral's foundations were intricately laid on the small <strong>Île de la Cité</strong> in Paris, presenting a significant engineering challenge due to the marshy ground of the Seine riverbank.</p><p class="sqsrte-large" style="white-space:pre-wrap;">To overcome this obstacle, workers excavated nearly 30 feet (9 meters) into the earth, well below the island's waterline. They constructed massive stone footings to support the immense weight of the planned structure. This process spurred the development of advanced <strong>deep-pile foundation techniques</strong>, which anchored the massive cathedral securely to the ground.</p>`);
safeSetInnerHTML(2, "btb_video_header", `<div class="video-header">Watch a short discussion of Notre-Dame's central location on the Île de la Cité</div>`);
safeSetInnerHTML(2, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/Hijg5XG6yg8?si=kcoIBP0mDAFZuHVo&amp;start=6&amp;end=56" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 13-16: Eastern Courtyard Paving</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Cathedral Construction</div><div class="content-container">In 12th century Paris, limestone paving around the chancel prepared the site for Notre-Dame's construction and public use.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-city"></i></div><div class="title-container">Medieval Paris Development</div><div class="content-container">Narrow streets and small buildings were cleared for cathedral expansion, creating the parvis, a key public space.</div>`);
hideElement("btb_icon_3", 3);
hideElement("btb_image", 3);
hideElement("btb_caption", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_13_16.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">We now focus on <strong>paving</strong> the exterior area around the <strong>chancel</strong>. This space, which would later become part of the cathedral's <strong>parvis</strong> (forecourt), was central to the life of medieval Paris.</p><p class="sqsrte-large" style="white-space:pre-wrap;">In the 12th century, this area was densely populated with narrow streets and small buildings, many of which were cleared to make way for the <strong>cathedral</strong>. The paving provided a stable surface for construction activities and helped manage drainage, essential due to the cathedral's proximity to the <strong>Seine River</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The original paving likely consisted of <strong>limestone slabs</strong>, durable enough to withstand heavy foot traffic. As construction progressed, this paved area evolved into a significant public space for gatherings, markets, and civic events. While the current parvis is larger and dates from later periods, the initial paving around the chancel laid the groundwork for connecting the cathedral with the vibrant life of the city.</p>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 17-20: Black and White Tiling</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Chancel Floor Tiling</div><div class="content-container">Installed from 1771-1773, the floor’s pattern overlays medieval tombs, merging symbolism and preservation</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-chess-board"></i></div><div class="title-container">Checkerboard Design</div><div class="content-container">The chancel’s black and white tiles symbolize light and darkness.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_17_20.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The distinctive <strong>black and white tiled floor</strong> of <strong>Notre-Dame's chancel</strong> was not part of the original 12th-century design but was added during significant renovations in the 18th century.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Between 1771 and 1773, the cathedral's floor was repaved with alternating black and white marble tiles, creating a dramatic <strong>checkerboard pattern</strong>. This renovation covered most of the existing medieval tombs, effectively preserving them beneath the new flooring.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Symbolically, the contrasting colors represented the duality of light and darkness, a common theme in Christian iconography, often reflecting the interplay of divine illumination and worldly shadow.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre_Dame_Altar_July_2005.jpg" alt="The chancel of Notre-Dame de Paris">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The chancel of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre_Dame_Altar_July_2005.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 21: High Altar</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame High Altar</div><div class="content-container">Positioned at the choir's eastern end, the altar blends modern design with Gothic architecture, emphasizing its liturgical significance.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-calendar-alt"></i></div><div class="title-container">Historical Transformations</div><div class="content-container">Evolving from medieval to Baroque, the altar was redesigned in the 19th century and modernized in 1989.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_21.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we construct the <strong>high altar</strong> area of Notre-Dame. The altar is located at the eastern end of the <strong>choir</strong>, where it meets the <strong>apse</strong>, underscoring its spiritual and architectural importance. Crafted from <strong>marble</strong>, it serves as the focal point for <strong>liturgical ceremonies</strong> and the celebration of the <strong>Eucharist</strong>. The altar's design has transformed over centuries—from its medieval origins to a Baroque redesign in the 18th century, a 19th-century renovation by <strong>Eugène Viollet-le-Duc</strong>, and its current modern form installed in <strong>1989</strong>.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathedrale_Notre-Dame_de_Paris_maitre-autel.jpg" alt="The High Altar of Notre-Dame de Paris">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The High Altar of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cathedrale_Notre-Dame_de_Paris_maitre-autel.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 22-37: Base of the Apse Wall</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Construction of Notre-Dame Apse</div><div class="content-container">Building the outer wall of the apse, focusing on support for flying buttresses and chapels.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">French Gothic Architecture</div><div class="content-container">The apse's design permits taller walls and wide windows, embodying key Gothic elements.</div>`);
hideElement("btb_icon_3", 6);
hideElement("btb_image", 6);
hideElement("btb_caption", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_22_37.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Here we being constructing the <strong>outer wall</strong> of the <strong>apse</strong>. The <strong>apse</strong>, located at the eastern end of the cathedral, is a semicircular or polygonal structure that houses the altar and choir.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Notre-Dame's apse is notable for its harmonious blend of form and function. Its curved shape creates a focal point for worship and symbolizes the embrace of the <strong>divine</strong>. The outer wall we're building will support a series of radiating chapels, a distinctive feature of <strong>French Gothic architecture</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The apse's outer wall also serves as the foundation for the <strong>flying buttresses</strong> that will support the structure's weight, allowing for taller, thinner walls and larger windows. This innovative architectural feature is key to achieving the soaring heights and luminous interiors characteristic of Gothic cathedrals.</p>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 38-39: Apse Ambulatory</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Ambulatory</div><div class="content-container">Covered walkway encircling the apse and choir, allows unrestricted movement and connects to radiating chapels.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Architectural Features</div><div class="content-container">Ambulatory designed with arched openings and slender columns, enhancing light and space interaction.</div>`);
hideElement("btb_icon_3", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_38_39.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we build the <strong>ambulatory</strong> that encircles the <strong>apse</strong> of Notre-Dame. Later we will extend it around the <strong>choir</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The ambulatory is a covered walkway that forms a complete circuit around the choir and apse. It serves as a passage for clergy and pilgrims, allowing movement behind the high altar without disturbing services. This feature is characteristic of larger <strong>Gothic churches</strong> and cathedrals, facilitating the flow of people and enhancing the building's functionality.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Construction of the ambulatory involves creating a series of arched openings supported by <strong>slender columns</strong>. These arches form the inner wall of the ambulatory, while the outer wall connects to radiating chapels. This design creates a harmonious blend of spaces, allowing light to filter through and providing access to various areas of the cathedral's eastern end.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Panorama_of_the_interior_of_the_Cathédrale_Notre_Dame_de_Paris-LR1_(22457676932).jpg" alt="Ambulatory and Chapels of the Chevet of Notre-Dame de Paris">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Ambulatory and Chapels of the Chevet of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Panorama_of_the_interior_of_the_Cath%C3%A9drale_Notre_Dame_de_Paris-LR1_(22457676932).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 38-39: Apse Windows</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-window-maximize"></i></div><div class="title-container">Rayonnant Gothic Windows</div><div class="content-container">Large clerestory windows added between 1235 and 1270 highlight Rayonnant Gothic style, emphasizing light and height in Notre-Dame's apse.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Structural and Artistic Design</div><div class="content-container">Supported by flying buttresses, the windows' extensive glasswork and tracery enhance natural lighting and spiritual ambiance, featuring biblical scenes.</div>`);
hideElement("btb_icon_3", 8);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_38_39.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The apse features large <strong>clerestory windows</strong>, added between 1235 and 1270. These windows are a key element of the <strong>Rayonnant Gothic style</strong>, characterized by an emphasis on light and vertical lines. The design allows for larger openings, flooding the interior with natural light and enhancing the spiritual atmosphere.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The windows are supported by <strong>flying buttresses</strong>, which provide structural stability while enabling the expansive glasswork. The intricate tracery within the windows forms beautiful patterns that frame the stained glass, depicting biblical scenes and saints. This combination of light and artistry not only illuminates the apse but also serves to inspire worshippers, creating a transcendent experience within the cathedral.</p>`);
safeSetInnerHTML(8, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Paris_Notre-Dame_Apse_Windows_01.JPG" alt="Windows of Notre-Dame's Apse">`);
safeSetInnerHTML(8, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Windows of Notre-Dame's Apse</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Paris_Notre-Dame_Apse_Windows_01.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 8);
hideElement("btb_video_embed", 8);
safeSetInnerHTML(9, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 46: Chancel Pillars Construction</h1></div>`);
safeSetInnerHTML(9, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Notre-Dame's Gothic Pillars</div><div class="content-container">Supporting the vaulted ceilings, these pillars typify Gothic style with vertical designs and space for luminous windows.</div>`);
safeSetInnerHTML(9, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Historical Architecture Impact</div><div class="content-container">Built by Pierre de Chelles in the 13th century, these pillars integrate flying buttresses for increased interior light.</div>`);
hideElement("btb_icon_3", 9);
hideElement("btb_image", 9);
hideElement("btb_caption", 9);
safeSetInnerHTML(9, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio9', 'playPauseIcon9', 'progressBar9')"><i id="playPauseIcon9" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar9" class="progress-bar" value="0" max="100"><audio id="audio9" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_46.mp3"></audio></div>`);
safeSetInnerHTML(9, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we build the <strong>interior pillars</strong> of <strong>Notre-Dame's chancel</strong> and <strong>choir</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These limestone pillars, standing among the black and white tiled floor, are crucial to the cathedral's structure. They support the weight of the <strong>vaulted ceilings</strong>, transferring the load to the foundation. The pillars' design reflects the <strong>Gothic style's</strong> emphasis on verticality and light.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Master Pierre de Chelles, who directed the structural work in the late 13th century, ensured systematic stone carving for these columns. Their capitals feature classicized designs. The use of <strong>flying buttresses</strong> outside allowed for these slender interior pillars, creating more space for windows and enhancing the interior's luminosity. This architectural innovation contributes to the soaring, ethereal atmosphere that defines Notre-Dame's chancel.</p>`);
safeSetInnerHTML(9, "btb_video_header", `<div class="video-header">Watch an explanation of Notre-Dame's vertical architecture</div>`);
safeSetInnerHTML(9, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/Hijg5XG6yg8?si=cK26Qx9FTvPKRTDg&amp;start=216&amp;end=274" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(10, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 47-57: Walls of the Choir</h1></div>`);
safeSetInnerHTML(10, "btb_icon_1", `<div class="icon-container"><i class="fas fa-building"></i></div><div class="title-container">Rayonnant Gothic Walls</div><div class="content-container">Early 13th-century side walls with large clerestory windows and slender mullions, characteristic of the Rayonnant Gothic style.</div>`);
safeSetInnerHTML(10, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Triforium Gallery Details</div><div class="content-container">A narrow passageway below the clerestory, featuring smaller arched openings that enhance depth and provide access.</div>`);
hideElement("btb_icon_3", 10);
safeSetInnerHTML(10, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio10', 'playPauseIcon10', 'progressBar10')"><i id="playPauseIcon10" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar10" class="progress-bar" value="0" max="100"><audio id="audio10" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_47_57.mp3"></audio></div>`);
safeSetInnerHTML(10, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we build the <strong>side walls</strong> and <strong>windows</strong> of the choir, focusing on the rectangular portion of the chancel.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The choir's side walls, constructed in the early 13th century, exemplify the <strong>Rayonnant Gothic style</strong>. These walls feature large clerestory windows that allow abundant light into the interior. The windows are divided by slender stone mullions and tracery, forming intricate patterns that support the glass panels.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Below the clerestory, a <strong>triforium gallery</strong> runs along the length of the choir. This narrow passageway, with its own series of smaller arched openings, adds depth to the wall structure and provides access for maintenance. The combination of clerestory windows and triforium creates a visually striking elevation, emphasizing the vertical lines characteristic of <strong>Gothic architecture</strong> and enhancing the sense of height within the cathedral.</p>`);
safeSetInnerHTML(10, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Choeur_de_ND_de_Paris_1669.jpg" alt="Chœur de Notre-Dame de Paris (1669)">`);
safeSetInnerHTML(10, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Chœur de Notre-Dame de Paris (1669)</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Choeur_de_ND_de_Paris_1669.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 10);
hideElement("btb_video_embed", 10);
safeSetInnerHTML(11, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 58-73: Chancel Roof Supports</h1></div>`);
safeSetInnerHTML(11, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Chancel Roof Structure</div><div class="content-container">"La Forêt" is a 13th-century timber frame with trusses, purlins, and king posts supporting the roof and vaulting.</div>`);
safeSetInnerHTML(11, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tools"></i></div><div class="title-container">Restoration Techniques</div><div class="content-container">Post-2019 fire, traditional carpentry methods are crucial for preserving the structural integrity of the roof.</div>`);
hideElement("btb_icon_3", 11);
safeSetInnerHTML(11, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio11', 'playPauseIcon11', 'progressBar11')"><i id="playPauseIcon11" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar11" class="progress-bar" value="0" max="100"><audio id="audio11" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_58_73.mp3"></audio></div>`);
safeSetInnerHTML(11, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The chancel roof is supported by an intricate timber frame structure known as "la Forêt" (the forest). This network of wooden <strong>trusses</strong>, dating back to the 13th century, distributes the roof's weight and protects the stone <strong>vaulting</strong> below.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Key components of the <strong>roof support</strong> include principal rafters, which form the basic triangular shape; <strong>purlins</strong> that run horizontally for added support; collar ties connecting opposite rafters to prevent spreading; and <strong>king posts</strong> extending from the apex to provide stability.</p><p class="sqsrte-large" style="white-space:pre-wrap;">This wooden framework, while hidden from view, is essential for maintaining the <strong>structural integrity</strong> of the chancel. Following the 2019 fire, traditional carpentry techniques have been used to carefully preserve and reconstruct this vital element.</p>`);
safeSetInnerHTML(11, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Charpentes_Notre_Dame_2018_5.jpg" alt="Charpentes (timber frames) of Notre-Dame">`);
safeSetInnerHTML(11, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Charpentes (timber frames) of Notre-Dame</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Charpentes_Notre_Dame_2018_5.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 11);
hideElement("btb_video_embed", 11);
safeSetInnerHTML(12, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 74-83: Upper Apse and Choir Construction</h1></div>`);
safeSetInnerHTML(12, "btb_icon_1", `<div class="icon-container"><i class="fas fa-window-restore"></i></div><div class="title-container">Triforium Window Design</div><div class="content-container">Builds include the intricate triforium windows, emphasizing Gothic layering and visual depth between lower arches and clerestory.</div>`);
safeSetInnerHTML(12, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Architectural Techniques</div><div class="content-container">Focus on vaulted ceilings and supportive frameworks typical of Gothic cathedrals, enhancing rainwater drainage and light influx.</div>`);
hideElement("btb_icon_3", 12);
safeSetInnerHTML(12, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio12', 'playPauseIcon12', 'progressBar12')"><i id="playPauseIcon12" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar12" class="progress-bar" value="0" max="100"><audio id="audio12" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_74_83.mp3"></audio></div>`);
safeSetInnerHTML(12, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we begin building the <strong>upper levels</strong> of the <strong>apse</strong> and <strong>choir</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">We start with the <strong>roof</strong> over the <strong>ambulatory</strong>, which forms the lowest level of the apse's exterior. This sloping roof allows rainwater to drain away from the building's core.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Above this, we construct the <strong>triforium windows</strong>, located between the lower level and the clerestory. These windows are smaller and more decorative, adding a sense of depth and layering to the cathedral's interior while maintaining the Gothic aesthetic.</p>`);
safeSetInnerHTML(12, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Paris_Notre-Dame_cathedral_interior_choir_south_01a.jpg" alt="Interior of Notre-Dame's Choir, South View">`);
safeSetInnerHTML(12, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Interior of Notre-Dame's Choir, South View</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Paris_Notre-Dame_cathedral_interior_choir_south_01a.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 12);
hideElement("btb_video_embed", 12);
safeSetInnerHTML(13, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 84-100: Choir Roof and Buttress Foundations</h1></div>`);
safeSetInnerHTML(13, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Gothic Architecture Features</div><div class="content-container">Features steep-pitched choir roof, flying buttresses for support, enabling larger windows and taller walls.</div>`);
safeSetInnerHTML(13, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Structural Elements</div><div class="content-container">Addition of arches provides weight distribution and sets the base for Notre-Dame's iconic vertical silhouette.</div>`);
hideElement("btb_icon_3", 13);
safeSetInnerHTML(13, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio13', 'playPauseIcon13', 'progressBar13')"><i id="playPauseIcon13" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar13" class="progress-bar" value="0" max="100"><audio id="audio13" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_84_100.mp3"></audio></div>`);
safeSetInnerHTML(13, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Now we construct the <strong>exterior roof</strong> over the choir and continue building upwards.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>choir roof</strong>, typically made of lead-covered timber, protects the vaulted ceiling below. Its steep pitch, characteristic of <strong>Gothic architecture</strong>, efficiently sheds rain and snow. We also complete the second level of roofing, which extends from the apse.</p><p class="sqsrte-large" style="white-space:pre-wrap;">We begin constructing the <strong>flying buttresses</strong>, a key feature of Gothic engineering. These arched exterior supports transfer the outward thrust of the vaulted ceiling to the outer walls, allowing for taller, thinner walls and larger windows.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Additionally, we add more arches that will support the third level. These arches, part of the building's <strong>skeletal framework</strong>, distribute weight and create the soaring vertical lines typical of Gothic cathedrals. This stage sets the foundation for the upper levels of Notre-Dame's iconic silhouette.</p>`);
safeSetInnerHTML(13, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre-Dame_de_Paris,_east_facade_by_Édouard_Baldus_c1860s.jpg" alt="Notre-Dame de Paris from the east, circa 1860s">`);
safeSetInnerHTML(13, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame de Paris from the east, circa 1860s</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre-Dame_de_Paris,_east_facade_by_%C3%89douard_Baldus_c1860s.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 13);
hideElement("btb_video_embed", 13);
safeSetInnerHTML(14, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 101-103 Clerestory Windows and Walkway</h1></div>`);
safeSetInnerHTML(14, "btb_icon_1", `<div class="icon-container"><i class="fas fa-window-restore"></i></div><div class="title-container">Clerestory Windows</div><div class="content-container">Sits above the triforium, critical for interior illumination and a key part in maintaining the Gothic ideal.</div>`);
hideElement("btb_icon_2", 14);
hideElement("btb_icon_3", 14);
safeSetInnerHTML(14, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio14', 'playPauseIcon14', 'progressBar14')"><i id="playPauseIcon14" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar14" class="progress-bar" value="0" max="100"><audio id="audio14" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_101_103_clerestory_windows_and_walkway.mp3"></audio></div>`);
safeSetInnerHTML(14, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The third level of windows, known as <strong>the clerestory</strong>, sits above the triforium gallery. These large windows are essential for <strong>illuminating the interior</strong>, embodying the <strong>Gothic ideal</strong> of a light-filled space.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The feature that resembles a balcony is actually a <strong>clerestory walkway</strong>. While not a true balcony for public access, it allows maintenance and cleaning of the upper windows.</p>`);
safeSetInnerHTML(14, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre-Dame_de_Paris-1.JPG" alt="Notre-Dame de Paris from the east at night">`);
safeSetInnerHTML(14, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame de Paris from the east at night</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre-Dame_de_Paris-1.JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 14);
hideElement("btb_video_embed", 14);
safeSetInnerHTML(15, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 104-116: Clerestory Roof</h1></div>`);
safeSetInnerHTML(15, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Roof Structure</div><div class="content-container">Lead-covered timber frame constructed with medieval techniques shields and supports the cathedral's structural integrity.</div>`);
safeSetInnerHTML(15, "btb_icon_2", `<div class="icon-container"><i class="fas fa-tree"></i></div><div class="title-container">Materials Used in Reconstruction</div><div class="content-container">Approximately 1,000 oak trees from French forests are used to recreate the dense network of trusses known as "la Forêt."</div>`);
hideElement("btb_icon_3", 15);
safeSetInnerHTML(15, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio15', 'playPauseIcon15', 'progressBar15')"><i id="playPauseIcon15" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar15" class="progress-bar" value="0" max="100"><audio id="audio15" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_104_116.mp3"></audio></div>`);
safeSetInnerHTML(15, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">This phase involves constructing the <strong>top roof of the chancel</strong>, which covers the <strong>clerestory level</strong> and is essential to Notre-Dame's <strong>iconic silhouette</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The roof features a steep, <strong>lead-covered timber frame</strong> that protects the stone vaulting below. This structure, known as "la Forêt" (the forest) due to its dense network of wooden trusses, is being recreated after the fire of 2019 using traditional medieval techniques.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Approximately 1,000 oak trees, carefully selected from French forests, are utilized for this reconstruction. The timber frame consists of main trusses and secondary supports, all designed to evenly distribute the roof's weight.</p>`);
safeSetInnerHTML(15, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/DSC00733_Notre_Dame_Paris_from_east.jpg" alt="Notre-Dame de Paris from the east, showing the chancel roof">`);
safeSetInnerHTML(15, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Notre-Dame de Paris from the east, showing the chancel roof</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://upload.wikimedia.org/wikipedia/commons/d/d2/DSC00733_Notre_Dame_Paris_from_east.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 15);
hideElement("btb_video_embed", 15);
safeSetInnerHTML(16, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 117-119: Chancel Flying Buttresses</h1></div>`);
safeSetInnerHTML(16, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Flying Buttresses</div><div class="content-container">Essential for counteracting vaulted ceilings' outward thrust, buttresses stabilize walls, supporting larger windows and taller structures.</div>`);
hideElement("btb_icon_2", 16);
hideElement("btb_icon_3", 16);
safeSetInnerHTML(16, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio16', 'playPauseIcon16', 'progressBar16')"><i id="playPauseIcon16" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar16" class="progress-bar" value="0" max="100"><audio id="audio16" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_117_119.mp3"></audio></div>`);
safeSetInnerHTML(16, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">This section focuses on the <strong>construction</strong> of the <strong>flying buttresses</strong> supporting the <strong>chancel</strong> of <strong>Notre-Dame</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Flying buttresses are essential structural elements that <strong>counteract the outward thrust</strong> generated by the cathedral's vaulted ceilings. At Notre-Dame, these buttresses were among the earliest examples of their kind, introduced in the 12th century to stabilize the walls and allow for taller structures and larger windows.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The construction involves creating arched structures that extend from the upper portions of the walls to massive piers. Each buttress is designed to absorb and redirect lateral forces downward, ensuring the stability of the chancel. The intricate design not only serves a functional purpose but also enhances the aesthetic appeal of the cathedral’s exterior.</p>`);
safeSetInnerHTML(16, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre-Dame_de_Paris_041.jpg" alt="Flying buttresses of the chancel at Notre-Dame de Paris">`);
safeSetInnerHTML(16, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Flying buttresses of the chancel at Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre-Dame_de_Paris_041.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 16);
hideElement("btb_video_embed", 16);
hideExtraSections(16);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 8, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 9, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 10, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 10, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 11, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 11, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 12, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 12, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 13, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 13, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 14, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 15, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 15, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 16, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

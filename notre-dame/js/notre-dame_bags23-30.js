
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bags 23-30: Western Towers, Nave and Transept Roofs</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Western Towers Overview</div><div class="content-container">Towers rise 69m high, housing bells and providing views over Paris. Built between 1220-1250, marking pilgrim pathways.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-building"></i></div><div class="title-container">Nave and Transept Roofs</div><div class="content-container">Steep 55-degree roofs of lead plates shape the cruciform silhouette. They intersect, highlighting Gothic architectural innovation.</div>`);
hideElement("btb_icon_3", 1);
hideElement("btb_image", 1);
hideElement("btb_caption", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_bags_23_30.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we'll construct two significant elements of <strong>Notre-Dame Cathedral</strong>:</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Western Towers</strong>: These two square towers, located on the west façade, rise to a height of 69 meters. The south tower was built around 1220-1240, and the north tower between 1235 and 1250. They house the cathedral's bells, including the famous <strong>Emmanuel bourdon</strong>. The towers offer an exceptional view over the center of Paris and their height allowed pilgrims visiting Notre-Dame Cathedral to find their way from afar.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Nave and Transept Roofs</strong>: The nave roof, extending from the western façade to the transept, is a key feature of the cathedral's profile. The transept roof intersects the nave at right angles, forming the characteristic cruciform shape of the cathedral. Both roofs were originally covered with lead plates, contributing to the building's distinctive silhouette. The roof structures are characterized by their steep pitch, with an inclination of 55 degrees.</p>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 275-283: Interior Base of the Western Towers</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame’s Western Towers</div><div class="content-container">Standing 69 meters, these medieval marvels showcase solid masonry bases for stability and bell chambers that balance integrity and utility.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-bell"></i></div><div class="title-container">Tower Engineering and Bells</div><div class="content-container">The base supports the tower's weight and houses the Emmanuel bourdon, reflecting an ingenious design for balance and function.</div>`);
hideElement("btb_icon_3", 2);
hideElement("btb_image", 2);
hideElement("btb_caption", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_275_283.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>western towers</strong> of <strong>Notre-Dame Cathedral</strong>, standing 69 meters high, are marvels of <strong>medieval engineering</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The lower sections are primarily constructed with solid masonry, providing crucial <strong>structural support</strong> for both the cathedral's façade and the immense weight of the towers above. This solid foundation ensures the <strong>stability and longevity</strong> of these iconic structures.</p><p class="sqsrte-large" style="white-space:pre-wrap;">While the bases are solid, the towers become more hollow as they ascend, accommodating the bell chambers and reducing overall weight. This ingenious design reflects the architectural expertise of the <strong>medieval builders</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These towers have stood for over 800 years, witnessing countless historical events and serving as a beacon for Parisians and visitors alike.</p>`);
safeSetInnerHTML(2, "btb_video_header", `<div class="video-header">Watch a time-lapse of the Western Towers construction and work preceding and after:</div>`);
safeSetInnerHTML(2, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/CnNB732aFwI?si=mwj6cuWiLXt_-E-x&amp;start=94&amp;end=134" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 284-288: Base of the Western Towers</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Cathedral Towers Design</div><div class="content-container">Explore the unique integration of towers with the facade, characterizing the seamless Gothic architectural transition and structural blend.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-balance-scale"></i></div><div class="title-container">Structural Balance and Design</div><div class="content-container">Understand the role of transitional zone in weight distribution and maintaining facade balance in Gothic architecture.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_284_288.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we'll construct the part of the western facade where the <strong>towers</strong> begin to emerge from the main body of the <strong>cathedral</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">At this level, the towers are still integrated with the central portion of the facade, creating a <strong>unified front</strong>. The transition from the wider lower facade to the narrower tower structures is subtle but crucial to the <strong>overall design</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">You'll notice how the vertical lines of the towers start to become more pronounced, while still maintaining a connection to the horizontal elements below. This area serves as a visual and structural bridge between the ornate lower facade and the more austere upper sections of the towers.</p><p class="sqsrte-large" style="white-space:pre-wrap;">This transitional zone plays a vital role in distributing the weight of the towers and maintaining the overall balance of the facade's composition.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/NotreDameDeParis.jpg" alt="Western facade of Notre-Dame de Paris illuminated at night">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Western facade of Notre-Dame de Paris illuminated at night</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:NotreDameDeParis.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 289-299: Bell Chambers Base and the Grande Galerie</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Bell Chambers</div><div class="content-container">Constructing Notre-Dame's western towers' base level, focusing on the bell chambers and Grande Galerie.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-binoculars"></i></div><div class="title-container">Grande Galerie & Chimeras</div><div class="content-container">Features a panoramic walkway adorned with iconic chimeras, offering views over Paris from the Gallery of Chimeras.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instr_289_299.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we'll construct the base level of the <strong>bell chambers</strong> in <strong>Notre-Dame's western towers</strong>, including the famous <strong>Grande Galerie</strong>, also known as the <strong>Gallery of Chimeras</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The Grande Galerie is an open walkway that connects the two western towers. This gallery, added during the 19th-century restoration by <strong>Eugène Viollet-le-Duc</strong>, serves both practical and aesthetic purposes. It provides a panoramic viewing platform, offering spectacular views over Paris. The gallery is adorned with Viollet-le-Duc's famous chimeras - fantastical stone creatures that, while not original to the medieval cathedral, have become iconic symbols of Notre-Dame.</p><p class="sqsrte-large" style="white-space:pre-wrap;">As you build, note the balustrade that runs along the gallery. In the actual cathedral, this balustrade is intricately carved and serves as both a safety feature and a decorative element. The most famous of the chimeras, <strong>Le Stryge</strong> (The Vampire), is positioned on this gallery, overlooking the city with a pensive expression.</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Bored_Gargoyle_at_Notre_Dame_de_Paris.jpg" alt="Le Stryge gargoyle overlooking Paris from Notre-Dame">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Le Stryge gargoyle overlooking Paris from Notre-Dame</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Bored_Gargoyle_at_Notre_Dame_de_Paris.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 300-316: Roof of the Nave and Transept</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Roof Design</div><div class="content-container">Steep 55-degree pitch using scarce old oak timber. Key for weight distribution with ribbed vaults and buttresses.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-fire-alt"></i></div><div class="title-container">2019 Fire and Restoration</div><div class="content-container">Devastating fire led to reconstruction using 1,000+ oaks, preserving historical integrity and traditional techniques.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_300_316.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we will focus on the <strong>roof structure</strong> covering the <strong>nave and transept</strong> of <strong>Notre-Dame Cathedral</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The roof of Notre-Dame is characterized by its <strong>steep pitch</strong>, with an inclination of 55 degrees. This steep angle was partly a result of using smaller sections of wood due to the scarcity of large timber in the 13th century. The impressive "forest" of oak beams that originally supported this roof included trees dating back to the 8th or 9th century. As discussed earlier, a meticulous reconstruction process was initiated after the 2019 fire.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The roof structure plays a <strong>crucial role</strong> in distributing the weight of the building. It works in conjunction with the ribbed vaults below and the external flying buttresses to create a stable and soaring structure. This design allows for the tall, light-filled interior that characterizes Gothic architecture.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre-Dame_en_feu,_20h06.jpg" alt="The nave roof on fire during the 2019 Notre-Dame blaze">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The nave roof on fire during the 2019 Notre-Dame blaze</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre-Dame_en_feu,_20h06.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 317-339: The Bell Chambers</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-bell"></i></div><div class="title-container">Notre-Dame Belfries</div><div class="content-container">Home to 10 bells, including the famous 13,000 kg 'Emmanuel' in the south tower, ringing for special events.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-city"></i></div><div class="title-container">Parisian Life and Bells</div><div class="content-container">Bells mark hours, invite prayer, and celebrate events, integral to the cathedral's voice in Paris.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_317_339.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we'll construct the <strong>bell chambers</strong> of Notre-Dame's western towers, also known as belfries, which house the cathedral's 10 bells.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The south tower holds the largest and most famous bell, the <strong>bourdon</strong> named <strong>Emmanuel</strong>, cast in 1686. Weighing 13,000 kg with a 2.62-meter diameter, Emmanuel rings in F sharp and is used for special occasions like <strong>Christmas</strong>, <strong>Easter</strong>, and national events.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The north tower contains eight bells, each weighing 2-3 tons. The largest, <strong>Gabriel</strong>, is named after the Angel Gabriel of the Annunciation. These bells handle daily cathedral office rings.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The bells mark hours, call the faithful to prayer, and commemorate important events, becoming an enduring "voice" of Paris.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Gros_Bourdon_Emmanuel.jpg" alt="The Emmanuel bourdon bell in Notre-Dame's south tower">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The Emmanuel bourdon bell in Notre-Dame's south tower</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Gros_Bourdon_Emmanuel.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 340-349: Upper Gallery and Spire Base</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Notre-Dame Upper Gallery</div><div class="content-container">Features a stone balustrade and offers panoramic views from 69m high after climbing 422 steps.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Spires on Towers</div><div class="content-container">Originally planned spires were never built, now flat tops serve as platforms for maintenance and views.</div>`);
hideElement("btb_icon_3", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_340_349.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this section, we'll construct the <strong>upper gallery</strong> and the base for planned <strong>spires</strong> atop Notre-Dame's <strong>western towers</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Above the bell chambers, there's an open gallery that runs around the top of each tower. This gallery is bordered by an intricate stone balustrade, offering a <strong>stunning panoramic view</strong> of Paris. The towers reach a height of 69 meters (226 feet), and visitors can access this level by climbing 422 steps.</p><p class="sqsrte-large" style="white-space:pre-wrap;">While spires were considered for these towers in the 13th century, they were never actually built. The flat tops we see today were not the original intention, but have become an iconic part of Notre-Dame's <strong>silhouette</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The base we're constructing could have supported these never-realized spires. Instead, it now serves as a platform for the lead-covered terraces that top each tower.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre-Dame_de_Paris_flèches.jpg" alt="Viollet-le-Duc's hypothetical spires for Notre-Dame de Paris (~1860).">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Viollet-le-Duc's hypothetical spires for Notre-Dame de Paris (~1860).</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://upload.wikimedia.org/wikipedia/commons/1/1a/Notre-Dame_de_Paris_fl%C3%A8ches.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 350-369 Oculus Windows and Transept Portal Roof</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-window-restore"></i></div><div class="title-container">Transept Oculus Windows</div><div class="content-container">Smaller rose windows above the larger ones in Notre-Dame enhance light and verticality, featuring thematic stone tracery.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Gothic Architectural Balance</div><div class="content-container">Oculi in Notre-Dame's transepts mirror main windows' motifs, emphasizing height and light in Gothic design.</div>`);
hideElement("btb_icon_3", 8);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instr_350_369_oculus_windows_and_transept_portal_roof.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Notre-Dame de Paris features smaller <strong>rose windows</strong>, or oculus windows, positioned above the <strong>larger rose windows</strong> on both the north and south <strong>transept facades</strong>. These <strong>oculi</strong> are intricately designed with stone tracery that complements the larger roses, adding elegance and architectural balance to the façade. Functionally, these smaller roses allow additional light into the upper reaches of the transepts, illuminating the space and enhancing the cathedral's <strong>verticality</strong>. The oculi often mirror themes in the main roses, featuring saints or biblical motifs, and are key elements in Notre-Dame’s Gothic emphasis on <strong>height and light</strong>.</p>`);
safeSetInnerHTML(8, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/South_facade_of_Notre-Dame_de_Paris.jpg" alt="South facade of Notre-Dame de Paris, featuring the main rose window and oculus rose window.">`);
safeSetInnerHTML(8, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">South facade of Notre-Dame de Paris, featuring the main rose window and oculus rose window.</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:South_facade_of_Notre-Dame_de_Paris.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 8);
hideElement("btb_video_embed", 8);
hideExtraSections(8);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 8, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

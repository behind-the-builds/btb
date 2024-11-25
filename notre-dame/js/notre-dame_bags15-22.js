
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
safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bags 15-22: Completing the Nave and Transept</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Historical Events in the Nave</div><div class="content-container">Hosted Napoleon Bonaparte's coronation and his son's baptism, symbolizing a new era in the spacious setting of Notre-Dame.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-crown"></i></div><div class="title-container">Symbolism of Nave Ceremonies</div><div class="content-container">Chosen for public inclusivity and historic ties, the nave's grandeur emphasized Napoleon's connection to Paris.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio1', 'playPauseIcon1', 'progressBar1')"><i id="playPauseIcon1" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar1" class="progress-bar" value="0" max="100"><audio id="audio1" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_bags_15_22.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>nave</strong> has served as the backdrop for numerous <strong>monumental events</strong>, including the <strong>coronation of Napoleon Bonaparte</strong> and the <strong>baptism of his son</strong>. These ceremonies took place in the nave rather than the choir for several reasons.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The nave's larger, more open space was ideal for grand ceremonies, accommodating a vast audience of dignitaries, clergy, and the public. Napoleon's choice to hold his <strong>coronation</strong> here was also a symbolic gesture, connecting his new imperial regime to the historical significance of Notre-Dame while emphasizing his relationship with the people of Paris. This marked a departure from tradition, as past coronations had typically occurred in Reims Cathedral.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg" alt="The Coronation of Napoleon by Jacques-Louis David (1805-1807)">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The Coronation of Napoleon by Jacques-Louis David (1805-1807)</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 1);
hideElement("btb_video_embed", 1);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 173-180: Western Entrance Portals</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame's Grand Portals</div><div class="content-container">Featuring the Portal of the Last Judgment, Virgin, and Saint Anne, each intricately carved to depict key theological narratives.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-book-reader"></i></div><div class="title-container">Gothic Architecture Insights</div><div class="content-container">The portals serve as visual stories for the illiterate, emphasizing Notre-Dame's deep spiritual and educational significance.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio2', 'playPauseIcon2', 'progressBar2')"><i id="playPauseIcon2" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar2" class="progress-bar" value="0" max="100"><audio id="audio2" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_173_180.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The western entrance of <strong>Notre-Dame Cathedral</strong> features three grand portals: the central <strong>Portal of the Last Judgment</strong>, flanked by the <strong>Portal of the Virgin</strong> on the left and the <strong>Portal of Saint Anne</strong> on the right.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The Portal of the Last Judgment depicts <strong>Christ in glory</strong>, surrounded by angels and scenes of the blessed and damned, serving as a powerful reminder of moral accountability. On the left, the Portal of the Virgin focuses on Mary’s death and assumption into heaven. The Portal of Saint Anne illustrates key moments from Mary’s lineage.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These intricately carved portals were designed as visual narratives for a largely illiterate population, welcoming visitors while reinforcing Notre-Dame's role as a spiritual center in Paris. Together, they exemplify the artistry and theological depth of <strong>Gothic architecture</strong>.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre-Dame_de_Paris_-_09.jpg" alt="Portal of the Last Judgment at Notre-Dame de Paris">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Portal of the Last Judgment at Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre-Dame_de_Paris_-_09.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 2);
hideElement("btb_video_embed", 2);
safeSetInnerHTML(3, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 181-186: Corinthian Capitals</h1></div>`);
safeSetInnerHTML(3, "btb_icon_1", `<div class="icon-container"><i class="fas fa-columns"></i></div><div class="title-container">Corinthian Capitals Design</div><div class="content-container">Features bell-shaped design with two rows of acanthus leaves and volutes, adding grandeur and sophistication.</div>`);
safeSetInnerHTML(3, "btb_icon_2", `<div class="icon-container"><i class="fas fa-building"></i></div><div class="title-container">Structural Integration in LEGO</div><div class="content-container">Four pillars combined for enhanced support and stability, mirroring medieval engineering brilliance.</div>`);
hideElement("btb_icon_3", 3);
safeSetInnerHTML(3, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio3', 'playPauseIcon3', 'progressBar3')"><i id="playPauseIcon3" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar3" class="progress-bar" value="0" max="100"><audio id="audio3" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_181_186.mp3"></audio></div>`);
safeSetInnerHTML(3, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The internal supporting <strong>pillars</strong> of the nave are adorned with <strong>Corinthian capitals</strong>, which are characterized by their elaborate, bell-shaped design. These capitals feature two rows of acanthus leaves and volutes, giving them a decorative and ornate appearance. The <strong>Corinthian style</strong> is the most elaborate of the three classical orders of architecture, combining elements that create a sense of <strong>grandeur</strong> and <strong>sophistication</strong>.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The LEGO design here effectively combines four pillars into one cohesive unit, allowing for greater structural support while also reflecting the actual construction of the nave.</p>`);
safeSetInnerHTML(3, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Paris_Notre-Dame_cathedral_interior_nave_east_01c.jpg" alt="Corinthian capitals on the nave pillars of Notre-Dame de Paris">`);
safeSetInnerHTML(3, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Corinthian capitals on the nave pillars of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Paris_Notre-Dame_cathedral_interior_nave_east_01c.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 3);
hideElement("btb_video_embed", 3);
safeSetInnerHTML(4, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 187-193: Lower Nave Roof</h1></div>`);
safeSetInnerHTML(4, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Nave Structural Design</div><div class="content-container">The nave's lower roof features a wooden frame and ribbed vaulting, enhancing height and space.</div>`);
safeSetInnerHTML(4, "btb_icon_2", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Triforium Features</div><div class="content-container">Above the arcade, the triforium includes narrow openings, adding lightness to Notre-Dame’s design.</div>`);
hideElement("btb_icon_3", 4);
safeSetInnerHTML(4, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio4', 'playPauseIcon4', 'progressBar4')"><i id="playPauseIcon4" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar4" class="progress-bar" value="0" max="100"><audio id="audio4" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_187_193.mp3"></audio></div>`);
safeSetInnerHTML(4, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>lower roof</strong> of the nave is constructed with a <strong>wooden framework</strong> and <strong>ribbed vaulting</strong>, providing structural support and an attractive appearance. This design creates a sense of <strong>height and openness</strong> in the space.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>triforium</strong>, located above the arcade, features small, narrow openings that may not be true windows but rather blind arches or decorative elements. These openings help to visually lighten the structure while maintaining the overall design aesthetic.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The combination of the lower roof and triforium enhances the overall design of the nave. These elements showcase the craftsmanship and architectural principles that define <strong>Notre-Dame Cathedral</strong>. This version focuses solely on the lower roof and triforium. Let me know if you need any further adjustments!</p>`);
safeSetInnerHTML(4, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Triforium_of_Notre-Dame_de_Paris_(10055402903).jpg" alt="Triforium of Notre-Dame de Paris">`);
safeSetInnerHTML(4, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Triforium of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Triforium_of_Notre-Dame_de_Paris_(10055402903).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 4);
hideElement("btb_video_embed", 4);
safeSetInnerHTML(5, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 194-199: Western Entrance</h1></div>`);
safeSetInnerHTML(5, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Notre-Dame's Historic Portal</div><div class="content-container">Scene of Victor Hugo's 1885 funeral procession and Henry VI's 1431 coronation, marking key French cultural events.</div>`);
safeSetInnerHTML(5, "btb_icon_2", `<div class="icon-container"><i class="fas fa-crown"></i></div><div class="title-container">Symbolic Coronations and Funerals</div><div class="content-container">The cathedral's western entrance has hosted events underlining its status in national unity and religious history.</div>`);
hideElement("btb_icon_3", 5);
safeSetInnerHTML(5, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio5', 'playPauseIcon5', 'progressBar5')"><i id="playPauseIcon5" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar5" class="progress-bar" value="0" max="100"><audio id="audio5" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_194_199.mp3"></audio></div>`);
safeSetInnerHTML(5, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The western entrance of Notre-Dame, with its three grand portals, has seen key moments in history. In 1885, Victor Hugo's funeral procession passed through, honoring his deep connection to the cathedral. In 1431, during the Hundred Years' War, Henry VI of England was crowned King of France here, underscoring Notre-Dame's national and religious significance. These portals stand as enduring markers of the cathedral's cultural and historical legacy.</p>`);
safeSetInnerHTML(5, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/ND_de_Paris_le_parvis_vers_1750.jpg" alt="Western facade of Notre-Dame de Paris circa 1730–1740">`);
safeSetInnerHTML(5, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Western facade of Notre-Dame de Paris circa 1730–1740</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:ND_de_Paris_le_parvis_vers_1750.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 5);
hideElement("btb_video_embed", 5);
safeSetInnerHTML(6, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 200-207: Base of the Clerestory</h1></div>`);
safeSetInnerHTML(6, "btb_icon_1", `<div class="icon-container"><i class="fas fa-building"></i></div><div class="title-container">Clerestory Level Structure</div><div class="content-container">Serves as a key structural area in nave architecture, with robust masonry and arch supports for weight distribution.</div>`);
safeSetInnerHTML(6, "btb_icon_2", `<div class="icon-container"><i class="fas fa-brush"></i></div><div class="title-container">Decorative Elements</div><div class="content-container">Features intricate stonework and moldings, enhancing the visual appeal and showcasing craftsmanship.</div>`);
hideElement("btb_icon_3", 6);
safeSetInnerHTML(6, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio6', 'playPauseIcon6', 'progressBar6')"><i id="playPauseIcon6" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar6" class="progress-bar" value="0" max="100"><audio id="audio6" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_200_207.mp3"></audio></div>`);
safeSetInnerHTML(6, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Above the <strong>triforium</strong>, the base of the <strong>clerestory level</strong> serves as a critical <strong>structural component</strong> in the <strong>nave's architecture</strong>. This area is designed to support the weight of the clerestory above while providing a stable transition from the triforium below.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The base is typically constructed with robust masonry and includes a series of arches or supports that distribute weight evenly. This <strong>structural integrity</strong> is essential for maintaining the overall stability of the nave, especially as it rises to greater heights.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The design of this level often features decorative elements that enhance its visual appeal, such as intricate stonework or moldings. These details not only contribute to the beauty of the cathedral but also reflect the craftsmanship involved in its construction.</p>`);
safeSetInnerHTML(6, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Clerestory,_Notre-Dame_de_Paris,_July_2014.jpg" alt="Looking up to the clerestory level of Notre-Dame de Paris">`);
safeSetInnerHTML(6, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Looking up to the clerestory level of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Clerestory,_Notre-Dame_de_Paris,_July_2014.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 6);
hideElement("btb_video_embed", 6);
safeSetInnerHTML(7, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 208-224: Rose Windows</h1></div>`);
safeSetInnerHTML(7, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Architecture</div><div class="content-container">Features rose windows for light and structural integrity, enhancing both Gothic beauty and function.</div>`);
safeSetInnerHTML(7, "btb_icon_2", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Symbolic Stained Glass</div><div class="content-container">The stained glass in rose windows adds symbolic beauty and intricate designs, creating visual impact.</div>`);
hideElement("btb_icon_3", 7);
safeSetInnerHTML(7, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio7', 'playPauseIcon7', 'progressBar7')"><i id="playPauseIcon7" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar7" class="progress-bar" value="0" max="100"><audio id="audio7" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_208_224.mp3"></audio></div>`);
safeSetInnerHTML(7, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Above the transept portals of <strong>Notre-Dame Cathedral</strong>, large <strong>rose windows</strong> are prominent architectural features that enhance the façade's beauty and functionality. These circular windows are adorned with intricate tracery and colorful <strong>stained glass</strong>, allowing natural light to filter into the interior while creating stunning visual effects.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The rose windows serve both structural and <strong>symbolic purposes</strong>. Structurally, they help distribute the weight of the stone above the portals, providing stability to the upper sections of the cathedral. The circular design of the rose window is not only visually striking but also allows for larger openings compared to traditional rectangular windows, which is essential in <strong>Gothic architecture</strong>.</p>`);
safeSetInnerHTML(7, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/North_rose_window_of_Notre-Dame_de_Paris,_Aug_2010.jpg" alt="North rose window of Notre-Dame de Paris">`);
safeSetInnerHTML(7, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">North rose window of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:North_rose_window_of_Notre-Dame_de_Paris,_Aug_2010.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 7);
hideElement("btb_video_embed", 7);
safeSetInnerHTML(8, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instr. 225-231: Clerestory Arches and Windows of the Nave</h1></div>`);
safeSetInnerHTML(8, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Clerestory</div><div class="content-container">Features tall, pointed arches with large windows, flooding the nave with natural light and enhancing the ethereal atmosphere.</div>`);
safeSetInnerHTML(8, "btb_icon_2", `<div class="icon-container"><i class="fas fa-palette"></i></div><div class="title-container">Stained Glass Artistry</div><div class="content-container">The clerestory windows are adorned with intricate stained glass, depicting religious scenes that add vibrant colors inside.</div>`);
hideElement("btb_icon_3", 8);
safeSetInnerHTML(8, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio8', 'playPauseIcon8', 'progressBar8')"><i id="playPauseIcon8" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar8" class="progress-bar" value="0" max="100"><audio id="audio8" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instr_225_231.mp3"></audio></div>`);
safeSetInnerHTML(8, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>clerestory level</strong> of Notre-Dame's nave features tall, pointed arches that support the <strong>vaulted ceiling</strong>. Within these arches are large windows designed to flood the interior with <strong>natural light</strong>. Each bay typically includes a pair of narrow, pointed lancet windows arranged side-by-side, complemented by a small rose window above them, adding both visual interest and illumination to the space.</p><p class="sqsrte-large" style="white-space:pre-wrap;">These clerestory windows are adorned with intricate <strong>stained glass</strong>, depicting various religious scenes and figures. As sunlight filters through, the colored glass creates a vibrant, <strong>ethereal atmosphere</strong> inside the cathedral.</p>`);
safeSetInnerHTML(8, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre_Dame_de_Paris_(22460169162).jpg" alt="Cathédrale Notre Dame de Paris">`);
safeSetInnerHTML(8, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Cathédrale Notre Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre_Dame_de_Paris_(22460169162).jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 8);
hideElement("btb_video_embed", 8);
safeSetInnerHTML(9, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 232-233 Flying Buttresses of the Nave</h1></div>`);
safeSetInnerHTML(9, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Gothic Architectural Design</div><div class="content-container">Flying buttresses support large window openings, emphasizing verticality and light in Gothic structures.</div>`);
safeSetInnerHTML(9, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame's Flying Buttresses</div><div class="content-container">Arched exterior supports transfer roof and wall weight to piers, enhancing structural stability with decorative elements.</div>`);
hideElement("btb_icon_3", 9);
hideElement("btb_image", 9);
hideElement("btb_caption", 9);
safeSetInnerHTML(9, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio9', 'playPauseIcon9', 'progressBar9')"><i id="playPauseIcon9" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar9" class="progress-bar" value="0" max="100"><audio id="audio9" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_232_233_flying_buttresses_of_the_nave.mp3"></audio></div>`);
safeSetInnerHTML(9, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">Structurally, the <strong>clerestory</strong> is supported by <strong>flying buttresses</strong> on the exterior, which allow for larger window openings while maintaining wall stability. This architectural innovation exemplifies <strong>Gothic design</strong>, emphasizing verticality and the interplay of light within this sacred space.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The flying buttresses of Notre-Dame's nave are a series of arched exterior supports that transfer the weight of the roof and walls to outer supports called <strong>piers</strong>. These elegant stone structures appear to "fly" from the upper walls to the ground, creating a distinctive silhouette against the sky. Each buttress consists of an arched arm that spans from a pier to the upper wall, often adorned with decorative <strong>pinnacles</strong> and statues.</p>`);
safeSetInnerHTML(9, "btb_video_header", `<div class="video-header">Watch a description of how flying buttresses support the towering inner spaces:</div>`);
safeSetInnerHTML(9, "btb_video_embed", `<iframe src="https://www.youtube.com/embed/Hijg5XG6yg8?si=LZ8ZBST0xwz69_La&amp;start=80&amp;end=108" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
safeSetInnerHTML(10, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 235-261: The Upper Narthex</h1></div>`);
safeSetInnerHTML(10, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Notre-Dame Narthex</div><div class="content-container">Grand double-height entry draws visitors in with high windows and an ethereal atmosphere, emphasizing verticality.</div>`);
safeSetInnerHTML(10, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">West Gallery Impact</div><div class="content-container">Offers elevated views into the nave, enriching acoustics and architecture, though not open for public access.</div>`);
hideElement("btb_icon_3", 10);
safeSetInnerHTML(10, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio10', 'playPauseIcon10', 'progressBar10')"><i id="playPauseIcon10" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar10" class="progress-bar" value="0" max="100"><audio id="audio10" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_235_261.mp3"></audio></div>`);
safeSetInnerHTML(10, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>narthex</strong> of Notre-Dame de Paris, located just inside the western entrance, serves as a modest transitional space between the exterior and the cathedral's sacred interior. Unlike some Gothic cathedrals with grand narthexes, Notre-Dame’s is understated, designed primarily for practical entry rather than architectural show.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Above the narthex lies the <strong>west gallery</strong>, often called a <strong>tribune</strong>, providing an elevated view toward the <strong>nave</strong>. Historically, this space was used by clergy or dignitaries, offering a discreet vantage point for observing services. Though the west gallery is not accessible to the public today, it remains an important <strong>architectural feature</strong>, connecting the entrance to the soaring scale of the nave and contributing to the cathedral’s vertical grandeur.</p>`);
safeSetInnerHTML(10, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathedrale_Notre-Dame_de_Paris_tribune_claire-voie.jpg" alt="The clerestory and tribune levels of Notre-Dame de Paris">`);
safeSetInnerHTML(10, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The clerestory and tribune levels of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cathedrale_Notre-Dame_de_Paris_tribune_claire-voie.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 10);
hideElement("btb_video_embed", 10);
safeSetInnerHTML(11, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 262-263: The Gallery of Kings</h1></div>`);
safeSetInnerHTML(11, "btb_icon_1", `<div class="icon-container"><i class="fas fa-archway"></i></div><div class="title-container">Gallery of Kings</div><div class="content-container">28 statues at Notre-Dame, symbolizing Christ's lineage, were destroyed during the French Revolution and restored in the 19th century.</div>`);
safeSetInnerHTML(11, "btb_icon_2", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Spiritual and Royal Symbol</div><div class="content-container">The restored statues blend historical and artistic styles, embodying the intertwined religious and royal heritage of France.</div>`);
hideElement("btb_icon_3", 11);
safeSetInnerHTML(11, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio11', 'playPauseIcon11', 'progressBar11')"><i id="playPauseIcon11" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar11" class="progress-bar" value="0" max="100"><audio id="audio11" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_262_263.mp3"></audio></div>`);
safeSetInnerHTML(11, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>Gallery of Kings</strong> at Notre-Dame Cathedral is an iconic feature located above the main western entrance. It consists of a row of 28 statues representing the biblical <strong>kings of Judah</strong>, symbolizing the lineage of Christ. Created in the 13th century, these statues were initially intended to honor the ancestors of Jesus.</p><p class="sqsrte-large" style="white-space:pre-wrap;">During the French Revolution, the statues were mistakenly identified as representations of French monarchs and were destroyed in a wave of revolutionary fervor. In the 19th century, architect <strong>Eugène Viollet-le-Duc</strong> oversaw their restoration, with new statues crafted by artists such as Geoffroi-Dechaume. The current figures reflect a blend of historical and artistic styles, dressed in the garb of Capetian kings.</p>`);
safeSetInnerHTML(11, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notre-Dame-Paris_west_detail_4.jpg" alt="The Gallery of Kings above the western entrance">`);
safeSetInnerHTML(11, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">The Gallery of Kings above the western entrance</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Notre-Dame-Paris_west_detail_4.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 11);
hideElement("btb_video_embed", 11);
safeSetInnerHTML(12, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instruction 264: The West Rose Window</h1></div>`);
safeSetInnerHTML(12, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">West Rose Window Design</div><div class="content-container">Features Madonna and Child, 12 tribes of Israel, vices, virtues, and zodiac signs in a 9.6m diameter structure.</div>`);
safeSetInnerHTML(12, "btb_icon_2", `<div class="icon-container"><i class="fas fa-calendar-alt"></i></div><div class="title-container">Historical Significance</div><div class="content-container">Dating back to 1225, this oldest rose window sits above the main entrance, embodying the cathedral's façade.</div>`);
hideElement("btb_icon_3", 12);
safeSetInnerHTML(12, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio12', 'playPauseIcon12', 'progressBar12')"><i id="playPauseIcon12" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar12" class="progress-bar" value="0" max="100"><audio id="audio12" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instruction_264.mp3"></audio></div>`);
safeSetInnerHTML(12, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>West Rose Window</strong> is the oldest of the cathedral's three rose windows, originally completed around 1225. Measuring 9.6 meters in diameter, it is situated above the main western entrance and serves as a focal point for the façade.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The design of the <strong>west rose window</strong> includes 24 rays radiating from a central circle, which prominently features the <strong>Madonna and Child</strong>. Surrounding this central image, the first circle represents the <strong>12 tribes of Israel</strong>, while the upper half of the window illustrates pairs of vices and virtues. The lower half depicts the <strong>12 signs of the zodiac</strong>, associated with the labors of the months.</p>`);
safeSetInnerHTML(12, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/2017_Rosetón_de_Notre-Dame_P45.jpg" alt="Western rose window of Notre-Dame de Paris">`);
safeSetInnerHTML(12, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Western rose window of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:2017_Roset%C3%B3n_de_Notre-Dame_P45.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 12);
hideElement("btb_video_embed", 12);
safeSetInnerHTML(13, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 265-271: Western Entrance Facade Elements</h1></div>`);
safeSetInnerHTML(13, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame Restoration</div><div class="content-container">Post-1830 July Revolution, major restoration by architects Eugène Viollet-le-Duc and Jean-Baptiste Lassus preserved its architectural heritage.</div>`);
safeSetInnerHTML(13, "btb_icon_2", `<div class="icon-container"><i class="fas fa-gavel"></i></div><div class="title-container">Symbol of Political Unrest</div><div class="content-container">The 1830 vandalism of Notre-Dame highlighted political tensions in France and underscored its status as a national monument.</div>`);
hideElement("btb_icon_3", 13);
safeSetInnerHTML(13, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio13', 'playPauseIcon13', 'progressBar13')"><i id="playPauseIcon13" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar13" class="progress-bar" value="0" max="100"><audio id="audio13" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_265_271.mp3"></audio></div>`);
safeSetInnerHTML(13, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">During the <strong>July Revolution of 1830</strong>, rioters stormed the cathedral, leading to widespread vandalism and damage to its interior and exterior, including the façade. The city authorities even considered the possibility of completely destroying the cathedral due to the <strong>extensive damage</strong> it suffered.</p><p class="sqsrte-large" style="white-space:pre-wrap;">This event highlighted not only the <strong>political unrest in France</strong> at the time but also underscored the cathedral's symbolic importance as a <strong>national monument</strong>. Following this upheaval, a major restoration project was initiated in the 1840s under architects <strong>Eugène Viollet-le-Duc</strong> and Jean-Baptiste Lassus, who worked to restore Notre-Dame to its former glory, including the intricate elements of the western façade that had been damaged. This restoration was crucial in preserving the cathedral's <strong>architectural heritage</strong> and ensuring its continued significance in French history.</p>`);
safeSetInnerHTML(13, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Notredame1.jpg" alt="Western facade of Notre-Dame de Paris">`);
safeSetInnerHTML(13, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Western facade of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://upload.wikimedia.org/wikipedia/commons/2/22/Notredame1.jpg" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 13);
hideElement("btb_video_embed", 13);
safeSetInnerHTML(14, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 272-274: Clerestory Walkway of the Nave</h1></div>`);
safeSetInnerHTML(14, "btb_icon_1", `<div class="icon-container"><i class="fas fa-church"></i></div><div class="title-container">Notre-Dame's Clerestory</div><div class="content-container">Features a unique walkway along the nave's upper level, with intricate stone tracery aligning with clerestory windows.</div>`);
safeSetInnerHTML(14, "btb_icon_2", `<div class="icon-container"><i class="fas fa-fire-alt"></i></div><div class="title-container">Historical Usage</div><div class="content-container">Originally used for lighting maintenance with candles and oil lamps. During the French Revolution, served for secular displays.</div>`);
hideElement("btb_icon_3", 14);
safeSetInnerHTML(14, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio14', 'playPauseIcon14', 'progressBar14')"><i id="playPauseIcon14" class="fas fa-play icon"></i>Read to Me</a><input type="range" id="progressBar14" class="progress-bar" value="0" max="100"><audio id="audio14" src="https://behind-the-builds.github.io/btb/notre-dame/audio/notre-dame_instructions_272_274.mp3"></audio></div>`);
safeSetInnerHTML(14, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">The <strong>clerestory walkway</strong> of <strong>Notre-Dame's nave</strong>, while similar in function to that of the apse, has its own unique characteristics. This narrow passageway runs along the upper level of the nave, providing access to the large <strong>clerestory windows</strong> and offering a breathtaking view of the cathedral's interior from above.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The nave's clerestory passage features intricate <strong>stone tracery</strong> that echoes the designs of the windows.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Before electricity, clerics would use these passages to <strong>tend to the hundreds of candles and oil lamps</strong> that illuminated the vast space below. During the French Revolution, when the cathedral was briefly converted into a "Temple of Reason," these walkways were used by revolutionaries to hang banners and decorations, temporarily transforming the sacred space for secular purposes.</p>`);
safeSetInnerHTML(14, "btb_image", `<img src="https://behind-the-builds.github.io/btb/notre-dame/images/Cathédrale_Notre-Dame_de_Paris,_2012,_interior_(5).jpg" alt="Interior of Notre-Dame de Paris">`);
safeSetInnerHTML(14, "btb_caption", `<div class="caption-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;">Interior of Notre-Dame de Paris</p></div><div class="source-container" style="text-align: center;"><p class="sqsrte-medium" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre-Dame_de_Paris,_2012,_interior_(5).JPG" target="_blank" style="color: #0073e6; text-decoration: underline;">source</a></p></div>`);
hideElement("btb_video_header", 14);
hideElement("btb_video_embed", 14);
hideExtraSections(14);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 3, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 3, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 4, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 4, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 5, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 5, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 6, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 6, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 7, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 7, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 8, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 8, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 9, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_maintext', 'sectionIndex': 9, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 10, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 10, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 11, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 11, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 12, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 12, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 13, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 13, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 14, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 14, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '26'}}];

applyGridLayout();  // Apply initial layout
window.addEventListener("resize", applyGridLayout);

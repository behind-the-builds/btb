
function isDesktopView() {
    return window.innerWidth > 750;
}


function safeSetInnerHTML(sectionIndex, className, innerHTMLContent) {
    // Select the section by its index
    const sections = document.querySelectorAll("section");
    
    // Ensure section exists for the given index and class
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
        const section = sections[sectionIndex];
        
        // Find the first element within this section that matches the given class name
        const element = section.querySelector(`.${className}`);
        
        if (element) {
            element.innerHTML = innerHTMLContent;
        } else {
            console.warn(`Element with class '${className}' not found in section index '${sectionIndex}'.`);
        }
    } else {
        console.warn(`Section index '${sectionIndex}' is out of bounds.`);
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

function displayNoneGGP(elementId) {
    // Get the element by ID and traverse up three levels to the great-grandparent
    const element = document.getElementById(elementId);
    const ggpElement = element?.parentElement?.parentElement?.parentElement;

    // If the great-grandparent exists, set its display to 'none'
    if (ggpElement) {
        ggpElement.style.display = "none";
    } else {
        console.warn(`Great-grandparent element for #${elementId} not found.`);
    }
}

function applyResponsiveGridLayout() {
    if (typeof gridChanges === 'undefined') {
        console.warn("gridChanges is not defined. Skipping applyResponsiveGridLayout.");
        return;
    }

    const isDesktop = isDesktopView();

    gridChanges.forEach(change => {
        const sectionElements = document.querySelectorAll(`.section-${change.sectionIndex} .${change.elementClass}`);
        
        sectionElements.forEach(element => {
            let target = element;
            for (let i = 0; i < 3; i++) {
                target = target.parentElement;
                if (!target) break;
            }

            if (target) {
                const values = isDesktop ? change.desktop : change.saved;
                for (const [property, value] of Object.entries(values)) {
                    target.style[property] = value;
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    recordInitialGridState();  // Call once to store initial values
    applyResponsiveGridLayout();  // Apply initial layout
    window.addEventListener("resize", applyResponsiveGridLayout);  // Adjust layout on resize
});

// Attach the function to the resize event
window.addEventListener("resize", applyResponsiveGridLayout);

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
    
    // Find the specific element within the section based on the class name
    const sectionElements = document.querySelectorAll(`.section-${sectionIndex} .${className}`);
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

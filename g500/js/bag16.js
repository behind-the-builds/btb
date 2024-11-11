safeSetInnerHTML(1, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Instructions 665-677: Rear Bumper and Taillights</h1></div>`);
safeSetInnerHTML(1, "btb_icon_1", `<div class="icon-container"><i class="fas fa-car"></i></div><div class="title-container">Impact-Resistant Bumper</div><div class="content-container">Built to withstand rough terrain and impacts, staying true to the G-Class design.</div>`);
safeSetInnerHTML(1, "btb_icon_2", `<div class="icon-container"><i class="fas fa-lightbulb"></i></div><div class="title-container">LED Taillights</div><div class="content-container">Enhanced visibility with LED updates while keeping the classic taillight shape.</div>`);
hideElement("btb_icon_3", 1);
safeSetInnerHTML(1, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio', 'playPauseIcon', 'progressBar')"><i class="fas fa-play icon"></i>Read to Me</a><input type="range" class="progress-bar" value="0" max="100"><audio src="https://behind-the-builds.github.io/btb/g500/audio/bag16.mp3"></audio></div>`);
safeSetInnerHTML(1, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In this stage, we build the <strong>rear bumper</strong> and <strong>taillights</strong>, both vital for the G-Class’s rugged functionality. The rear bumper has long been designed to endure impacts, a necessity for descending slopes and navigating difficult trails. Its boxy design complements the overall look and reinforces the G-Class’s durability.</p><p class="sqsrte-large" style="white-space:pre-wrap;">The taillights, originally simple in design, were updated with LEDs in recent years to improve visibility while preserving the classic squared-off shape. This blend of traditional styling and modern technology highlights the G-Class’s dual role as an off-road vehicle and a luxury icon.</p>`);
safeSetInnerHTML(1, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/G500,_rue_Bayard.jpg" alt="G500 in Paris, rear view">`);
safeSetInnerHTML(1, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">G500 in Paris, rear view</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:G500,_rue_Bayard.jpg" target="_blank">source</a></p></div>`);
safeSetInnerHTML(2, "btb_title", `<div class="title-container"><h1 style="white-space:pre-wrap;">Bag 16: Side Walls of Cargo Area</h1></div>`);
safeSetInnerHTML(2, "btb_icon_1", `<div class="icon-container"><i class="fas fa-hammer"></i></div><div class="title-container">Durable Steel Panels</div><div class="content-container">High-strength steel provides stability, reducing weight while enhancing durability.</div>`);
safeSetInnerHTML(2, "btb_icon_2", `<div class="icon-container"><i class="fas fa-globe"></i></div><div class="title-container">Built for Tough Conditions</div><div class="content-container">Galvanized and reinforced, designed to prevent corrosion in rugged environments.</div>`);
hideElement("btb_icon_3", 2);
safeSetInnerHTML(2, "btb_audio", `<div class="audio-player"><a href="#" class="read-to-me-btn" onclick="toggleAudio(event, 'audio', 'playPauseIcon', 'progressBar')"><i class="fas fa-play icon"></i>Read to Me</a><input type="range" class="progress-bar" value="0" max="100"><audio src="https://behind-the-builds.github.io/btb/g500/audio/bag16.mp3"></audio></div>`);
safeSetInnerHTML(2, "btb_maintext", `<p class="sqsrte-large" style="white-space:pre-wrap;">In Bag 16, we construct the <strong>side walls of the cargo area</strong>. These panels in the real G-Class are built for durability, using high-strength steel for structural stability. Over the years, Mercedes-Benz has updated these materials to enhance protection and reduce weight. In 2019, the G-Class received a lighter, more rigid frame, incorporating ultra-high-strength steel and aluminum to balance off-road capability with modern performance.</p><p class="sqsrte-large" style="white-space:pre-wrap;">Originally, the G-Class relied on galvanized steel to prevent rust in tough environments, an essential feature for off-road use. The combination of robust materials has made the G-Class’s cargo area suitable for heavy-duty tasks, from adventure to emergency use, while maintaining the vehicle's classic rugged look.</p>`);
safeSetInnerHTML(2, "btb_image", `<img src="https://behind-the-builds.github.io/btb/g500/images/G-Class_assembly,_2009_(20).JPG" alt="G-Class assembly">`);
safeSetInnerHTML(2, "btb_caption", `<div class="caption-container"><p class="sqsrte-large" style="white-space:pre-wrap;">G-Class assembly</p></div><div class="source-container"><p class="sqsrte-large" style="white-space:pre-wrap;"><a href="https://commons.wikimedia.org/wiki/File:G-Class_assembly,_2009_(20).JPG" target="_blank">source</a></p></div>`);
const gridChanges = [{'elementClass': 'btb_icon_1', 'sectionIndex': 1, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 1, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}, {'elementClass': 'btb_icon_1', 'sectionIndex': 2, 'default': {'gridColumnEnd': ''}, 'desktop': {'gridColumnEnd': '13'}}, {'elementClass': 'btb_icon_2', 'sectionIndex': 2, 'default': {'gridColumnStart': '', 'gridColumnEnd': ''}, 'desktop': {'gridColumnStart': '14', 'gridColumnEnd': '27'}}];
hideExtraSections(2);

// Tab functionality
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("bg-blue-50", "text-blue-700");
        tabButtons[i].classList.add("text-gray-700");
    }
    
    // Show the current tab and add active class to the button
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.remove("text-gray-700");
    evt.currentTarget.classList.add("bg-blue-50", "text-blue-700");
}

// Add skill functionality
function addSkill() {
    const skillInput = document.getElementById("new-skill");
    const skill = skillInput.value.trim();
    
    if (skill) {
        const skillsContainer = document.getElementById("skills-container");
        const skillElement = document.createElement("span");
        skillElement.className = "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center";
        skillElement.innerHTML = `${skill} <button type="button" class="ml-2 text-blue-500 hover:text-blue-700" onclick="this.parentElement.remove()">&times;</button>`;
        skillsContainer.appendChild(skillElement);
        skillInput.value = "";
    }
}

// Add location functionality
function addLocation() {
    const locationInput = document.getElementById("new-location");
    const location = locationInput.value.trim();
    
    if (location) {
        const locationsContainer = document.getElementById("locations-container");
        const locationElement = document.createElement("span");
        locationElement.className = "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center";
        locationElement.innerHTML = `${location} <button type="button" class="ml-2 text-green-500 hover:text-green-700" onclick="this.parentElement.remove()">&times;</button>`;
        locationsContainer.appendChild(locationElement);
        locationInput.value = "";
    }
}

// Initialize first tab as active
document.addEventListener("DOMContentLoaded", function() {
    const firstTabBtn = document.querySelector(".tab-btn");
    if (firstTabBtn) {
        firstTabBtn.classList.add("bg-blue-50", "text-blue-700");
        firstTabBtn.classList.remove("text-gray-700");
    }
});

const clock = document.getElementById('clock');
const dadSquare = document.querySelector('.dadSquare');
const dropZones = document.querySelectorAll('.drop-zone');
const popup = document.getElementById('popup-box');

const popupData = [
    {
        title: "Day 1",
        content: [
            "Intro and Team Formation",
            "Challenge Announcement",
            "Brainstorming",
            "Lunch Break",
            "Development of Ideas",
            "Initial Evaluation"
        ]
    },
    {
        title: "Day 2",
        content: [
            "Idea Exchange",
            "Development of Exchanged Ideas",
            "Lunch Break",
            "Final Development Sprint",
            "Submission of Projects"
        ]
    },
    {
        title: "Day 3",
        content: [
            "Final Presentations to the Jury",
            "Lunch Break",
            "Jury Deliberation",
            "Awards Ceremony and Closing"
        ]
    }
];


let lastTarget = null;

function moveClockToTarget(target, index) {
    const clockRect = clock.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const parentRect = dadSquare.getBoundingClientRect();

   
    const targetX = targetRect.left + targetRect.width / 2 - parentRect.left - clockRect.width;

    
    clock.style.left = `${targetX}px`;

    
    if (lastTarget && lastTarget !== target) {
        lastTarget.style.visibility = 'visible'; 
    }

    
    target.style.visibility = 'hidden';

    
    lastTarget = target;

    setTimeout(() => {
        showPopup(index); 
    }, 300);
}


function showPopup(index) {
    const { title, content } = popupData[index]; 

    
    const popupContent = `
        <h2 style="text-align: center; color: #2F4A60;">${title}</h2>
        ${content.map((text) => `<div class="box">${text}</div>`).join('')}
    `;

    popup.innerHTML = popupContent;
    popup.style.width = `${dadSquare.offsetWidth}px`; 
    popup.style.display = 'grid';
    popup.style.top = `${dadSquare.offsetTop + dadSquare.offsetHeight + 20}px`;
    popup.classList.remove('hidden');
}


function resetToStartingPoint() {
    clock.style.left = '0px'; 
    popup.classList.add('hidden'); 

    
    dropZones.forEach((zone) => {
        zone.style.visibility = 'visible';
    });

    lastTarget = null; 
}


dropZones.forEach((zone, index) => {
    zone.addEventListener('click', () => {
        moveClockToTarget(zone, index);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            
            if (href.startsWith("#")) {
                e.preventDefault(); 

                const targetId = href.substring(1); 
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
           
        });
    });
});


/* =========================================================
   AMMAR KAFLE PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

function updateThemeIcon() {

    if (body.classList.contains("light-mode")) {

        themeIcon.textContent = "☾";

    } else {

        themeIcon.textContent = "☀";

    }

}


function enableLightMode() {

    body.classList.add("light-mode");

    localStorage.setItem(
        "portfolio-theme",
        "light"
    );

    updateThemeIcon();

}


function enableDarkMode() {

    body.classList.remove("light-mode");

    localStorage.setItem(
        "portfolio-theme",
        "dark"
    );

    updateThemeIcon();

}


themeToggle.addEventListener(
    "click",
    () => {

        if (
            body.classList.contains(
                "light-mode"
            )
        ) {

            enableDarkMode();

        } else {

            enableLightMode();

        }

    }
);


/* Load saved theme */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "light") {

    enableLightMode();

} else {

    enableDarkMode();

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("open");

    }
);


/* Close menu when clicking link */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove("open");

        }
    );

});


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

const typingText =
    document.getElementById("typingText");


const roles = [

    "Backend Learner",
    "Java Learner",
    "Spring Boot Learner",
    "Web Learner",
    "Problem Solver"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        characterIndex++;

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        characterIndex--;

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1)
                % roles.length;

        }

    }


    const speed =
        deleting ? 45 : 90;


    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement
            .scrollHeight;

    const windowHeight =
        window.innerHeight;


    const scrollHeight =
        documentHeight -
        windowHeight;


    const progress =
        (scrollTop / scrollHeight)
        * 100;


    scrollProgress.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress
);


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add(
                    "active"
                );

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   SKILL BAR ANIMATION
   ========================================================= */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const progress =
                        entry.target
                        .querySelector(
                            ".skill-progress"
                        );


                    if (progress) {

                        const width =
                            progress.dataset.width;

                        progress.style.width =
                            width;

                    }


                    skillObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.3
        }

    );


skillCards.forEach(
    card => {

        skillObserver.observe(card);

    }
);


/* =========================================================
   NUMBER COUNTERS
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


let countersStarted = false;


function animateCounters() {

    if (countersStarted) {
        return;
    }


    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );


        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const currentValue =
                Math.floor(
                    progress * target
                );


            counter.textContent =
                currentValue;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}


const statsSection =
    document.querySelector(
        ".hero-stats"
    );


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0]
                    .isIntersecting
                ) {

                    animateCounters();

                    statsObserver.disconnect();

                }

            }
        );


    statsObserver.observe(
        statsSection
    );

}


/* =========================================================
   PROJECT FILTER
   ========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList
                       .remove("active")
            );


            button.classList.add(
                "active"
            );


            const filter =
                button.dataset.filter;


            projectCards.forEach(
                card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display =
                            "block";


                        setTimeout(
                            () => {

                                card.style.opacity =
                                    "1";

                                card.style.transform =
                                    "translateY(0)";

                            },
                            50
                        );

                    } else {

                        card.style.opacity =
                            "0";

                        card.style.transform =
                            "translateY(20px)";

                        setTimeout(
                            () => {

                                card.style.display =
                                    "none";

                            },
                            250
                        );

                    }

                }
            );

        }
    );

});


/* =========================================================
   BACK TO TOP
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   COPY EMAIL
   ========================================================= */

const copyEmail =
    document.getElementById(
        "copyEmail"
    );


if (copyEmail) {

    copyEmail.addEventListener(
        "click",
        async () => {

            const email =
                "ammarkafle.edu@gmail.com";


            try {

                await navigator.clipboard
                    .writeText(email);


                copyEmail.textContent =
                    "✓";


                setTimeout(
                    () => {

                        copyEmail.textContent =
                            "📋";

                    },
                    1500
                );


            } catch (error) {

                alert(
                    "Email: " + email
                );

            }

        }
    );

}


/* =========================================================
   NAVBAR BACKGROUND ON SCROLL
   ========================================================= */

const navbar =
    document.getElementById(
        "navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.18)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }
);


/* =========================================================
   PREVENT EMPTY PROJECT LINK ACTION
   ========================================================= */

document
    .querySelectorAll(".project-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Project details can be connected here."
                );

            }
        );

    });


/* =========================================================
   INITIALIZATION
   ========================================================= */

updateScrollProgress();

updateActiveNav();

updateThemeIcon();
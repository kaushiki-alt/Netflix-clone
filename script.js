document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    // Function to show a specific slide
    const showSlide = (index) => {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    };

    // Function to show next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Function to show previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Initialize the first slide
    showSlide(currentSlide);

    const trendingList = document.querySelector(".trending-picks ul")
    const trendNavButtons = document.querySelectorAll(".trend-nav button")
    const [leftButton, rightButton] = trendNavButtons

    // Initial Button visibility
    const buttonVisibility = () => {
        const { scrollLeft, scrollWidth, clientWidth, } = trendingList;
        const isAtStart = scrollLeft <= 0;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 20;

        leftButton.style.opacity = isAtStart ? '0' : '1';
        leftButton.style.pointerEvents = isAtStart ? 'none' : 'auto';

        rightButton.style.opacity = isAtEnd ? '0' : '1';
        rightButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }

    // handle scrollqbility
    const handleNav = (direction) => {
        const { scrollLeft, scrollWidth, clientWidth, } = trendingList;
        const scrollAmount = direction === "left" ? -300 : 300;
        const remainingScroll = scrollWidth - (scrollLeft + clientWidth);

        trendingList.scrollBy({
            left: direction === "left" ? scrollAmount : Math.min(scrollAmount, remainingScroll),
            behavior: "smooth"
        })
    }

    // Add event listeners
    trendingList.addEventListener("scroll", buttonVisibility)
    leftButton.addEventListener("click", () => handleNav('left'));
    rightButton.addEventListener("click", () => handleNav('right'));


    buttonVisibility();

})

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqAnswers = document.querySelectorAll('.faq-answer');
    const faqIcons = document.querySelectorAll('.faq-icon');

    faqQuestions.forEach((question, index) => {
        question.addEventListener("click", () => {
            // Close all other answers
            faqAnswers.forEach((answer, i) => {
                if (i !== index) {
                    answer.classList.remove('open');
                    faqIcons[i].style.transform = 'rotate(0deg)';
                }
            });

            const answer = faqAnswers[index];
            const icon = faqIcons[index];

            if (!answer.classList.contains('open')) {
                answer.classList.add('open');
                icon.style.transform = 'rotate(45deg)';
            } else {
                answer.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
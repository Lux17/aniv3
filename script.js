// Create floating hearts background
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartsContainer.appendChild(heart);
    }
}

// Music functionality
function initMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3;
    
    function updateMusicUI() {
        const playing = !bgMusic.paused;
        musicToggle.innerHTML = playing
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-music"></i>';
        musicToggle.classList.toggle('playing', playing);
    }
    
    bgMusic.addEventListener('play', updateMusicUI);
    bgMusic.addEventListener('pause', updateMusicUI);
    
    function playMusic() {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
    }
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            playMusic();
        } else {
            bgMusic.pause();
        }
    });
    
    playMusic();
    
    function startMusicOnInteraction(event) {
        if (event.target.closest && event.target.closest('.music-toggle')) {
            return;
        }
        playMusic();
        if (!bgMusic.paused) {
            document.removeEventListener('pointerdown', startMusicOnInteraction);
            document.removeEventListener('keydown', startMusicOnInteraction);
            document.removeEventListener('touchstart', startMusicOnInteraction);
            document.removeEventListener('scroll', startMusicOnInteraction);
        }
    }
    
    document.addEventListener('pointerdown', startMusicOnInteraction);
    document.addEventListener('keydown', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);
    document.addEventListener('scroll', startMusicOnInteraction, { passive: true });
}

// Start button functionality
function initStartButton() {
    const startBtn = document.getElementById('startBtn');
    const messageSection = document.getElementById('messageSection');
    
    startBtn.addEventListener('click', function() {
        messageSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const messageSection = document.getElementById('messageSection');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            messageSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Photo Gallery
function initPhotoGallery() {
    const photoGallery = document.getElementById('photoGallery');
    const photos = [
        { src: 'media/img/2.jpeg', alt: 'Kenangan 1' },
        { src: 'media/img/3.jpeg', alt: 'Kenangan 2' },
        { src: 'media/img/4.jpeg', alt: 'Kenangan 3' },
        { src: 'media/img/5.jpeg', alt: 'Kenangan 4' },
        { src: 'media/img/6.jpeg', alt: 'Kenangan 5' },
        { src: 'media/img/7.jpeg', alt: 'Kenangan 6' },
        { src: 'media/img/8.jpeg', alt: 'Kenangan 7' },
        { src: 'media/img/9.jpeg', alt: 'Kenangan 8' },
        { src: 'media/img/10.jpeg', alt: 'Kenangan 9' },
        { src: 'media/img/12.jpeg', alt: 'Kenangan 10' },
        { src: 'media/img/13.jpeg', alt: 'Kenangan 11' }
    ];
    
    photos.forEach((photo, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.setAttribute('data-bs-toggle', 'modal');
        photoCard.setAttribute('data-bs-target', '#photoModal');
        photoCard.setAttribute('data-photo', photo.src);
        photoCard.setAttribute('data-index', index);
        
        // Create image or placeholder
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.onerror = function() {
            // Replace with placeholder if image not found
            photoCard.innerHTML = `
                <div class="photo-placeholder">
                    <i class="fas fa-camera"></i>
                    <span>Foto ${index + 1}</span>
                    <small>Tambahkan foto ke folder img/</small>
                </div>
            `;
        };
        
        photoCard.appendChild(img);
        col.appendChild(photoCard);
        photoGallery.appendChild(col);
        
        // Add click event for modal
        photoCard.addEventListener('click', function() {
            const modalImage = document.getElementById('modalImage');
            const photoSrc = this.getAttribute('data-photo');
            modalImage.src = photoSrc;
            modalImage.onerror = function() {
                this.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop';
            };
        });
    });
}

// Typewriter effect for first message
function initTypewriter() {
    const messageText1 = document.getElementById('messageText1');
    if (messageText1) {
        const text = messageText1.textContent;
        messageText1.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                messageText1.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typewriter when message section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(messageText1);
    }
}

// Add sparkle effect on scroll
function initSparkleEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Add parallax effect to some elements
        const hearts = document.querySelectorAll('.heart-float');
        hearts.forEach((heart, index) => {
            heart.style.transform = `translateY(${rate * 0.1 * (index + 1)}px)`;
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initMusic();
    initStartButton();
    initScrollIndicator();
    initPhotoGallery();
    initTypewriter();
    initSparkleEffect();
});

// Smooth reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.photo-card, .message-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
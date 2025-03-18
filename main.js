document.addEventListener('DOMContentLoaded', function() {
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    // Initialize positions
    let position1 = 0;
    let position2 = 0;
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 16; // card width + gap
    const visibleWidth = document.querySelector('.testimonial-track').offsetWidth;
    const maxScroll = row1.scrollWidth - visibleWidth;
    
    // Hide row2 initially
    row2.style.display = 'none';
    
    // Current row tracking
    let currentRow = row1;
    let currentPosition = position1;
    
    // Function to update positions
    function updatePositions() {
        row1.style.transform = `translateX(${-position1}px)`;
        row2.style.transform = `translateX(${-position2}px)`;
    }
    
    // Auto sliding
    let animationId;
    let direction = 1; // 1 for right, -1 for left
    
    function animate() {
        if (currentRow === row1) {
            position1 += direction * 1;
            
            // Change direction if reaching edges
            if (position1 >= maxScroll || position1 <= 0) {
                direction *= -1;
            }
        } else {
            position2 += direction * 1;
            
            // Change direction if reaching edges
            if (position2 >= maxScroll || position2 <= 0) {
                direction *= -1;
            }
        }
        
        updatePositions();
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Toggle between rows
    let rowToggle = false;
    
    function toggleRows() {
        rowToggle = !rowToggle;
        
        if (rowToggle) {
            row1.style.display = 'none';
            row2.style.display = 'flex';
            currentRow = row2;
            currentPosition = position2;
        } else {
            row1.style.display = 'flex';
            row2.style.display = 'none';
            currentRow = row1;
            currentPosition = position1;
        }
    }
    
    // Set interval for row toggling
    setInterval(toggleRows, 8000);
    
    // Button controls
    prevBtn.addEventListener('click', () => {
        // Cancel auto animation temporarily
        cancelAnimationFrame(animationId);
        
        if (currentRow === row1) {
            position1 = Math.max(0, position1 - cardWidth);
        } else {
            position2 = Math.max(0, position2 - cardWidth);
        }
        
        updatePositions();
        
        // Restart auto animation after a delay
        setTimeout(() => {
            animate();
        }, 5000);
    });
    
    nextBtn.addEventListener('click', () => {
        // Cancel auto animation temporarily
        cancelAnimationFrame(animationId);
        
        if (currentRow === row1) {
            position1 = Math.min(maxScroll, position1 + cardWidth);
        } else {
            position2 = Math.min(maxScroll, position2 + cardWidth);
        }
        
        updatePositions();
        
        // Restart auto animation after a delay
        setTimeout(() => {
            animate();
        }, 5000);
    });
});
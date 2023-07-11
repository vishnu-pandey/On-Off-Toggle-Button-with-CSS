    // Get the container element
    const container = document.getElementById('container');

    // Initialize variables to track movement
    let isMoving = false;
    let initialX, initialY, currentX, currentY;
    let selectedElement = null;
    let offsetX, offsetY;

    // Add event listeners
    container.addEventListener('mousedown', startMove);
    container.addEventListener('touchstart', startMove);
    

    function startMove(e) {
      // Prevent default browser behavior
      e.preventDefault();

      // Check if the event is a touch event or mouse event
      if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
      } else {
        initialX = e.clientX;
        initialY = e.clientY;
      }

      selectedElement = e.target;
      offsetX = initialX - selectedElement.getBoundingClientRect().left;
      offsetY = initialY - selectedElement.getBoundingClientRect().top;

      isMoving = true;

      // Add event listeners for movement and release
      document.addEventListener('mousemove', moveElement);
      document.addEventListener('touchmove', moveElement);
      document.addEventListener('mouseup', stopMove);
      document.addEventListener('touchend', stopMove);
    }

    function moveElement(e) {
      if (!isMoving) return;

      // Check if the event is a touch event or mouse event
      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      } else {
        currentX = e.clientX;
        currentY = e.clientY;
      }

      const newX = currentX - offsetX;
      const newY = currentY - offsetY;

      selectedElement.style.left = newX + 'px';
      selectedElement.style.top = newY + 'px';
    }

    function stopMove() {
      isMoving = false;

      // Remove the event listeners
      document.removeEventListener('mousemove', moveElement);
      document.removeEventListener('touchmove', moveElement);
      document.removeEventListener('mouseup', stopMove);
      document.removeEventListener('touchend', stopMove);
    }
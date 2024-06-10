document.getElementById('form').onsubmit = function(event) {
    event.preventDefault();

    // Get the file input and bounding box from the form
    const fileInput = document.getElementById('imageFile').files[0];
    const bboxInput = document.getElementById('bbox').value;

    // Parse the bounding box coordinates
    const bbox = bboxInput.split(',').map(Number);

    if (fileInput) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Create an image element
            const img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                // Get the canvas element and its context
                const canvas = document.getElementById('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0);

                // Draw the bounding box
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.strokeRect(bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]);
            };
        };

        reader.onerror = function() {
            alert('Failed to read the file. Please try again.');
        };

        // Read the file as a data URL
        reader.readAsDataURL(fileInput);
    }
};


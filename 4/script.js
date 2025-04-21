    //   const canvas = document.getElementById("textCanvas");
    //     const ctx = canvas.getContext("2d");

    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;

    //     window.addEventListener("resize", () => {
    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;
    //         createTextPoints();
    //     });

    //     const text = "HELLO WORLD";
    //     const fontSize = 120;
    //     let dots = [];
    //     let mouse = { x: 0, y: 0 };

    //     function createTextPoints() {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         ctx.font = `${fontSize}px Arial`;
    //         ctx.fillStyle = "white";
    //         ctx.textAlign = "center";
    //         ctx.textBaseline = "middle";

    //         const textX = canvas.width / 2;
    //         const textY = canvas.height / 2;
    //         ctx.fillText(text, textX, textY);

    //         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //         const pixels = imageData.data;

    //         dots = [];
    //         for (let y = 0; y < canvas.height; y += 6) {
    //             for (let x = 0; x < canvas.width; x += 6) {
    //                 let index = (y * canvas.width + x) * 4;
    //                 if (pixels[index] > 128) {
    //                     dots.push({ x, y, originalX: x, originalY: y, vx: 0, vy: 0 });
    //                 }
    //             }
    //         }
    //     }

    //     document.addEventListener("mousemove", (e) => {
    //         mouse.x = e.clientX;
    //         mouse.y = e.clientY;
    //     });

    //     function updateDots() {
    //         dots.forEach(dot => {
    //             let dx = mouse.x - dot.x;
    //             let dy = mouse.y - dot.y;
    //             let distance = Math.sqrt(dx * dx + dy * dy);
    //             let force = Math.max(100 - distance, 0) / 100;

    //             dot.vx += (dot.originalX - dot.x) * 0.1 + force * (Math.random() - 0.5);
    //             dot.vy += (dot.originalY - dot.y) * 0.1 + force * (Math.random() - 0.5);

    //             dot.x += dot.vx;
    //             dot.y += dot.vy;
    //             dot.vx *= 0.9;
    //             dot.vy *= 0.9;
    //         });
    //     }

    //     function drawDots() {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         ctx.fillStyle = "white";
    //         dots.forEach(dot => {
    //             ctx.beginPath();
    //             ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
    //             ctx.fill();
    //         });
    //     }

    //     function animate() {
    //         updateDots();
    //         drawDots();
    //         requestAnimationFrame(animate);
    //     }

    //     createTextPoints();
    //     animate();

  





    // const canvas = document.getElementById("paintCanvas");
    // const ctx = canvas.getContext("2d");
    
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    
    // const text = "PAINT";  // The word to display
    // const fontSize = 200;  // Adjust for bigger or smaller text
    // const dotSpacing = 8;  // Smaller value = more dots
    
    // const particles = [];
    // const mouse = { x: null, y: null, radius: 80 };
    
    // // **Create text-to-dots conversion**
    // function createParticles() {
    //     ctx.fillStyle = "white";
    //     ctx.font = `${fontSize}px Arial bold`;
    //     ctx.textAlign = "center";
    //     ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    //     for (let y = 0; y < canvas.height; y += dotSpacing) {
    //         for (let x = 0; x < canvas.width; x += dotSpacing) {
    //             const index = (y * canvas.width + x) * 4;
    //             if (imageData[index + 3] > 128) {  // Check if pixel is not transparent
    //                 particles.push(new Particle(x, y));
    //             }
    //         }
    //     }
    // }
    
    // class Particle {
    //     constructor(x, y) {
    //         this.x = x;
    //         this.y = y;
    //         this.baseX = x;
    //         this.baseY = y;
    //         this.size = 3; // Dot size
    //         this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    //         this.dx = 0;
    //         this.dy = 0;
    //     }
    
    //     update() {
    //         const dx = mouse.x - this.x;
    //         const dy = mouse.y - this.y;
    //         const distance = Math.sqrt(dx * dx + dy * dy);
    
    //         if (distance < mouse.radius) {
    //             const forceDirectionX = dx / distance;
    //             const forceDirectionY = dy / distance;
    //             const force = (mouse.radius - distance) / mouse.radius;
    //             this.dx += forceDirectionX * force * 10;
    //             this.dy += forceDirectionY * force * 10;
    //         }
    
    //         this.dx *= 0.9;  // Damping effect
    //         this.dy *= 0.9;
    
    //         this.x += this.dx;
    //         this.y += this.dy;
    
    //         // Return to original position
    //         const homeDx = this.baseX - this.x;
    //         const homeDy = this.baseY - this.y;
    //         this.x += homeDx * 0.05;
    //         this.y += homeDy * 0.05;
    //     }
    
    //     draw() {
    //         ctx.fillStyle = this.color;
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    //         ctx.closePath();
    //         ctx.fill();
    //     }
    // }
    
    // // **Mouse movement event**
    // window.addEventListener("mousemove", (event) => {
    //     mouse.x = event.x;
    //     mouse.y = event.y;
    // });
    
    // // **Animation loop**
    // function animate() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //     particles.forEach((particle) => {
    //         particle.update();
    //         particle.draw();
    //     });
    
    //     requestAnimationFrame(animate);
    // }
    
    // // **Initialize everything**
    // createParticles();
    // animate();
    
 
 
 
 
 
    // document.addEventListener("DOMContentLoaded", () => {
    //     const canvas = document.getElementById("paintCanvas");
    //     if (!canvas) {
    //         console.error("Canvas not found!");
    //         return;
    //     }
    
    //     const ctx = canvas.getContext("2d");
    
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    
    //     const text = "PAINT";
    //     const fontSize = Math.min(canvas.width * 0.2, 250); // Adjust font size based on screen size
    //     const dotSize = 2; // Smaller dots = more detailed text
    //     const spacing = 6; // Controls distance between dots
    //     const particles = [];
        
    //     // Draw text to canvas (hidden layer)
    //     ctx.fillStyle = "white";
    //     ctx.font = `${fontSize}px Arial bold`;
    //     ctx.textAlign = "center";
    //     ctx.fillText(text, canvas.width / 2, canvas.height / 1.8);
    
    //     // Get pixel data
    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     const pixels = imageData.data;
    
    //     // Extract dot positions from text pixels
    //     for (let y = 0; y < canvas.height; y += spacing) {
    //         for (let x = 0; x < canvas.width; x += spacing) {
    //             const index = (y * canvas.width + x) * 4;
    //             if (pixels[index + 3] > 128) { // Check alpha channel (only select visible pixels)
    //                 particles.push({
    //                     x: x,
    //                     y: y,
    //                     originalX: x,
    //                     originalY: y,
    //                     color: "white",
    //                     vx: 0,
    //                     vy: 0
    //                 });
    //             }
    //         }
    //     }
    
    //     // Mouse interaction
    //     const mouse = { x: 0, y: 0, radius: 100 };
    
    //     window.addEventListener("mousemove", (event) => {
    //         mouse.x = event.clientX;
    //         mouse.y = event.clientY;
    //     });
    
    //     // Update particles
    //     function animate() {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //         particles.forEach(p => {
    //             const dx = mouse.x - p.x;
    //             const dy = mouse.y - p.y;
    //             const distance = Math.sqrt(dx * dx + dy * dy);
    
    //             if (distance < mouse.radius) {
    //                 const angle = Math.atan2(dy, dx);
    //                 p.vx = Math.cos(angle) * 5;
    //                 p.vy = Math.sin(angle) * 5;
    //                 p.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Introduce color when interacted
    //             } else {
    //                 p.vx *= 0.95; // Slow down movement
    //                 p.vy *= 0.95;
    //                 p.color = "white"; // Return to white
    //             }
    
    //             p.x += p.vx;
    //             p.y += p.vy;
    
    //             // Slowly return to original position
    //             p.x += (p.originalX - p.x) * 0.05;
    //             p.y += (p.originalY - p.y) * 0.05;
    
    //             ctx.fillStyle = p.color;
    //             ctx.beginPath();
    //             ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
    //             ctx.fill();
    //         });
    
    //         requestAnimationFrame(animate);
    //     }
    
    //     animate();
    // });
    



    // document.addEventListener("DOMContentLoaded", () => {
    //     const canvas = document.getElementById("paintCanvas");
    //     if (!canvas) {
    //         console.error("Canvas not found!");
    //         return;
    //     }
    
    //     const ctx = canvas.getContext("2d");
    
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    
    //     const text = "PAINT";
    //     const fontSize = Math.min(canvas.width * 0.3, canvas.height * 0.5); // Fill the screen
    //     const dotSize = 2; // Keep dots small for detail
    //     const spacing = 6; // Controls how dense the dots are
    //     const repulsionForce = 10; // Strength of cursor push effect
    //     const particles = [];
    
    //     // Draw text to canvas (hidden layer)
    //     ctx.fillStyle = "white";
    //     ctx.font = `bold ${fontSize}px Arial`;
    //     ctx.textAlign = "center";
    //     ctx.textBaseline = "middle";
    //     ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    //     // Get pixel data
    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     const pixels = imageData.data;
    
    //     // Extract dot positions from text pixels
    //     for (let y = 0; y < canvas.height; y += spacing) {
    //         for (let x = 0; x < canvas.width; x += spacing) {
    //             const index = (y * canvas.width + x) * 4;
    //             if (pixels[index + 3] > 128) { // Check alpha channel (only select visible pixels)
    //                 particles.push({
    //                     x: x,
    //                     y: y,
    //                     originalX: x,
    //                     originalY: y,
    //                     color: "white",
    //                     vx: 0,
    //                     vy: 0
    //                 });
    //             }
    //         }
    //     }
    
    //     // Mouse interaction
    //     const mouse = { x: 0, y: 0, radius: 100 };
    
    //     window.addEventListener("mousemove", (event) => {
    //         mouse.x = event.clientX;
    //         mouse.y = event.clientY;
    //     });
    
    //     // Update particles
    //     function animate() {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //         particles.forEach(p => {
    //             const dx = p.x - mouse.x; // Reverse direction (repel effect)
    //             const dy = p.y - mouse.y;
    //             const distance = Math.sqrt(dx * dx + dy * dy);
    
    //             if (distance < mouse.radius) {
    //                 const angle = Math.atan2(dy, dx);
    //                 const force = (mouse.radius - distance) / mouse.radius * repulsionForce;
    //                 p.vx += Math.cos(angle) * force;
    //                 p.vy += Math.sin(angle) * force;
    //                 p.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Introduce color when interacted
    //             } else {
    //                 p.vx *= 0.95; // Slow down movement
    //                 p.vy *= 0.95;
    //                 p.color = "white"; // Return to white
    //             }
    
    //             p.x += p.vx;
    //             p.y += p.vy;
    
    //             // Slowly return to original position
    //             p.x += (p.originalX - p.x) * 0.05;
    //             p.y += (p.originalY - p.y) * 0.05;
    
    //             ctx.fillStyle = p.color;
    //             ctx.beginPath();
    //             ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
    //             ctx.fill();
    //         });
    
    //         requestAnimationFrame(animate);
    //     }
    
    //     animate();
    // });
    


    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("paintCanvas");
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }
    
        const ctx = canvas.getContext("2d");
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const text = "PAINT";
        const fontSize = Math.min(canvas.width * 0.8, canvas.height * 0.9); // Larger font to fill screen
        const dotSize = 2;
        const spacing = 5;
        const repulsionForce = 20;
        const fadeTime = 3000; // 10 seconds
        const fadeSpeed = 0.02; // Speed of fading effect
        const particles = [];
    
        // Provided color palette
        const colors = [
            "#3d5fc4", "#c01d23", "#0fc3ed", "#53509e",
            "#008361", "#a04461", "#d7c004", "#e97c2d",
            "#c79700", "#bd7cae", "#026546", "#bf3c9d"
        ];
    
        // Function to pick a random color from the given list
        function getRandomColor() {
            return colors[Math.floor(Math.random() * colors.length)];
        }
    
        // Ensure font is loaded before drawing
        document.fonts.load(`${fontSize}px Sunbeat`).then(() => {
            ctx.fillStyle = "white";
            ctx.font = `${fontSize}px "Sunbeat"`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
            // Get pixel data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
    
            // Extract dot positions from text pixels
            for (let y = 0; y < canvas.height; y += spacing) {
                for (let x = 0; x < canvas.width; x += spacing) {
                    const index = (y * canvas.width + x) * 4;
                    if (pixels[index + 3] > 128) {
                        particles.push({
                            x: x,
                            y: y,
                            originalX: x,
                            originalY: y,
                            color: { r: 255, g: 255, b: 255 }, // Starts as white
                            targetColor: { r: 255, g: 255, b: 255 }, // Target color for fading
                            vx: 0,
                            vy: 0,
                            lastInteracted: 0
                        });
                    }
                }
            }
    
            animate();
        });
    
        // Mouse interaction
        const mouse = { x: 0, y: 0, radius: 50 };
    
        window.addEventListener("mousemove", (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });
    
        // Convert HEX to RGB
        function hexToRgb(hex) {
            hex = hex.replace(/^#/, "");
            let bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }
    
        // Update particles
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const currentTime = Date.now();
    
            particles.forEach(p => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - distance) / mouse.radius * repulsionForce;
                    p.vx += Math.cos(angle) * force;
                    p.vy += Math.sin(angle) * force;
    
                    // Change color to a random color from the list
                    const randomHex = getRandomColor();
                    const randomRGB = hexToRgb(randomHex);
                    p.targetColor = { r: randomRGB.r, g: randomRGB.g, b: randomRGB.b };
                    p.lastInteracted = currentTime;
                } else {
                    p.vx *= 0.95;
                    p.vy *= 0.95;
    
                    // Gradually fade back to white
                    if (currentTime - p.lastInteracted > fadeTime) {
                        p.targetColor = { r: 255, g: 255, b: 255 };
                    }
                }
    
                // Smooth color transition
                p.color.r += (p.targetColor.r - p.color.r) * fadeSpeed;
                p.color.g += (p.targetColor.g - p.color.g) * fadeSpeed;
                p.color.b += (p.targetColor.b - p.color.b) * fadeSpeed;
    
                p.x += p.vx;
                p.y += p.vy;
    
                // Slowly return to original position
                p.x += (p.originalX - p.x) * 0.05;
                p.y += (p.originalY - p.y) * 0.05;
    
                ctx.fillStyle = `rgb(${Math.round(p.color.r)}, ${Math.round(p.color.g)}, ${Math.round(p.color.b)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            });
    
            requestAnimationFrame(animate);
        }
    });
    
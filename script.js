document.addEventListener('DOMContentLoaded', () => {
    const startPopup = document.getElementById('start-popup');
    const startBtn = document.getElementById('start-btn');
    const bgMusic = document.getElementById('bg-music');

    startBtn.addEventListener('click', () => {
        // Intentar reproducir el audio. (Debe existir un archivo music.mp3 en la misma carpeta)
        bgMusic.play().catch(error => {
            console.log("No se pudo reproducir el audio automáticamente o no se encontró el archivo:", error);
        });

        // Ocultar el Pop-Up con transición suave
        startPopup.classList.add('hidden');

        // Añadir la clase 'started' al body. Esto activará todas las animaciones de CSS a la vez.
        document.body.classList.add('started');
    });

    // Elementos de los mensajes
    const messagePopup = document.getElementById('message-popup');
    const messageText = document.getElementById('message-text');
    const closeMsgBtn = document.getElementById('close-msg');

    // Lógica mágica en toda la pantalla
    document.addEventListener('mousemove', (e) => {
        // Reducimos un poco la frecuencia para no saturar la pantalla
        if (Math.random() > 0.4) return;
        
        // Verificamos si estamos tocando un tulipán para heredar su color
        const hoveredTulip = e.target.closest('.tulip-container');
        createMagicDust(e.clientX, e.clientY, hoveredTulip);
    });

    // Lógica mágica de clicks y mensajes en los tulipanes
    const tulipContainers = document.querySelectorAll('.tulip-container');

    tulipContainers.forEach(container => {
        // Al hacer clic en un tulipán, lanzamos magia y mostramos el mensaje
        container.addEventListener('click', (e) => {
            // Explosión de magia
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createMagicDust(e.clientX + (Math.random() * 40 - 20), e.clientY + (Math.random() * 40 - 20), container);
                }, i * 30);
            }

            // Mostrar el mensaje
            const message = container.getAttribute('data-message');
            if (message) {
                messageText.textContent = message;
                messagePopup.classList.add('show');
            }
        });
    });

    // Cerrar la ventana de mensaje
    closeMsgBtn.addEventListener('click', () => {
        messagePopup.classList.remove('show');
    });

    function createMagicDust(x, y, container) {
        const dust = document.createElement('div');
        dust.classList.add('magic-dust');
        
        dust.style.left = `${x}px`;
        dust.style.top = `${y}px`;

        const dx = (Math.random() - 0.5) * 150;
        const dy = (Math.random() - 0.5) * 150 - 50; 

        dust.style.setProperty('--dx', `${dx}px`);
        dust.style.setProperty('--dy', `${dy}px`);

        // Color del polvo: si estamos sobre un tulipán, toma su color, sino usa rosado por defecto.
        const color = container 
            ? (getComputedStyle(container).getPropertyValue('--c-left1').trim() || '#ffb6c1') 
            : '#ffb6c1';
            
        dust.style.boxShadow = `0 0 10px #fff, 0 0 20px ${color}`;

        document.body.appendChild(dust);

        setTimeout(() => {
            dust.remove();
        }, 1000);
    }
});

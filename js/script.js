document.addEventListener('DOMContentLoaded', () => {
    const nomeEl = document.getElementById('typing-name'), cargoEl = document.getElementById('typing-cargo');
    const txtNome = nomeEl.textContent, txtCargo = cargoEl.textContent;
    nomeEl.textContent = ''; cargoEl.textContent = '';
    function digitar(el, txt, vel, cb) {
        let i = 0;
        function escrever() {
            if (i < txt.length) { el.textContent += txt.charAt(i); i++; setTimeout(escrever, vel); }
            else if (cb) { setTimeout(cb, 500); }
        }
        escrever();
    }
    setTimeout(() => digitar(nomeEl, txtNome, 150, () => digitar(cargoEl, txtCargo, 50)), 500);

    const canvas = document.getElementById('binary-canvas'), ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = canvas.parentElement.offsetHeight; }
    window.addEventListener('resize', resize); resize();
    class Particle {
        constructor(x, y) { this.x = x; this.y = y; this.txt = Math.round(Math.random()).toString(); this.opacity = 1; this.fs = Math.random() * 12 + 10; }
        update() { this.opacity -= 0.02; }
        draw() { ctx.fillStyle = `rgba(0, 168, 255, ${this.opacity})`; ctx.font = `${this.fs}px monospace`; ctx.fillText(this.txt, this.x, this.y); }
    }
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        for(let i=0; i<2; i++) particles.push(new Particle(e.clientX - rect.left, e.clientY - rect.top + (Math.random()*15)));
    });
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => { p.update(); p.draw(); if (p.opacity <= 0) particles.splice(i, 1); });
        requestAnimationFrame(animate);
    }
    animate();
});
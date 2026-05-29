document.addEventListener('DOMContentLoaded', () => {

        /* ── Video: playback speed + seamless crossfade loop ── */
        const video = document.querySelector('.bg-video');
        if (video) {
            video.playbackRate = 1.5;
            video.addEventListener('timeupdate', () => {
                if (video.duration && video.currentTime >= video.duration - 0.5) {
                    video.style.opacity = '0';
                } else if (video.currentTime < 0.5) {
                    video.style.opacity = '1';
                }
            });
        }

        /* ── Parallax: video moves up at 0.5× scroll speed ── */
        if (video) {
            window.addEventListener('scroll', () => {
                video.style.transform = `translateY(-${window.scrollY * 0.5}px)`;
            }, { passive: true });
        }

        /* ── Tabs functionality ── */
        const tabs = document.querySelectorAll('.exp-tab');
        const panes = document.querySelectorAll('.exp-pane');
        const lampWrapper = document.getElementById('lamp-wrapper');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Ignore if already active
                if (tab.classList.contains('active')) return;

                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                
                const targetId = tab.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);

                // Wait 50ms to reset transforms, then add active
                setTimeout(() => {
                    targetPane.classList.add('active');
                }, 50);

                // Trigger lamp dim animation
                if (lampWrapper) {
                    lampWrapper.classList.add('lamp-dim');
                    setTimeout(() => {
                        lampWrapper.classList.remove('lamp-dim');
                    }, 200);
                }
            });
        });

        /* ── Sticky Nav Scroll Listener ── */
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.site-header');
            if (header) {
                if (window.scrollY > 80) {
                    header.classList.add('nav-scrolled');
                } else {
                    header.classList.remove('nav-scrolled');
                }
            }
        });

        /* ── Intersection Observer for Lamp & Initial Tab ── */
        const expSection = document.getElementById('experience');
        if (expSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (lampWrapper) lampWrapper.classList.add('lamp-active');
                        // Activate pane-1 if nothing is active yet
                        const anyActive = Array.from(panes).some(p => p.classList.contains('active'));
                        if (!anyActive) {
                            document.getElementById('pane-1').classList.add('active');
                        }
                    }
                });
            }, { threshold: 0.4 });
            observer.observe(expSection);
        }

        /* ── Intersection Observer for Final CTA ── */
        const ctaSection = document.getElementById('reserve');
        if (ctaSection) {
            let typingTimeout = null;
            let typeIndex = 0;
            const text = "Reserve Your Bottle";
            const typedEl = document.querySelector('.cta-typed');

            function startTyping() {
                if (!typedEl) return;
                clearTimeout(typingTimeout);
                typeIndex = 0;
                typedEl.textContent = '';
                typeChar();
            }

            function typeChar() {
                if (typeIndex < text.length) {
                    typedEl.textContent += text.charAt(typeIndex);
                    typeIndex++;
                    typingTimeout = setTimeout(typeChar, 60);
                }
            }

            const ctaObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        ctaSection.classList.add('visible');
                        startTyping();
                    } else {
                        clearTimeout(typingTimeout);
                        if (typedEl) typedEl.textContent = '';
                    }
                });
            }, { threshold: 0.5 });
            ctaObserver.observe(ctaSection);
        }


        /* ── Particle system ── */
        const canvas = document.getElementById('particles-canvas');
        const ctx    = canvas.getContext('2d');
        const heroArea = document.querySelector('.hero-area');
        let W, H;

        function resize() {
            W = heroArea.clientWidth;
            H = heroArea.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width  = W * dpr;
            canvas.height = H * dpr;
            ctx.scale(dpr, dpr);
        }
        window.addEventListener('resize', resize);
        resize();

        const COLORS = ['#C9A84C', '#b3d4ff'];
        const COUNT  = 50;

        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * H; // spread on load
            }
            reset() {
                this.x      = Math.random() * W;
                this.y      = H + Math.random() * 150;
                this.r      = Math.random() * 2 + 0.8;
                this.vy     = Math.random() * 0.5 + 0.2;
                this.vx     = (Math.random() - 0.5) * 0.3;
                this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.alpha  = Math.random() * 0.5 + 0.15;
            }
            update() {
                this.y -= this.vy;
                this.x += this.vx;
                if (this.y < -20) this.reset();
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle   = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur  = this.r * 3;
                ctx.fill();
                ctx.restore();
            }
        }

        const particles = Array.from({ length: COUNT }, () => new Particle());

        (function loop() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(loop);
        })();

        /* ── Hamburger toggle ── */
        const hamburger   = document.getElementById('hamburger');
        const mobileMenu  = document.getElementById('mobile-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Close menu when a link is tapped
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });

    });

    // ── Animated Dock ──

(function () {
      function initDock() {
        var dock = document.getElementById('social-dock');
        if (!dock) return;
        var items = Array.prototype.slice.call(dock.querySelectorAll('.dock-item'));
        items.forEach(function (i) {
          i.style.transformOrigin = 'bottom center';
          i.style.transition = 'transform 150ms ease';
        });

        var MAX_BONUS = 0.8;  // extra scale at cursor (1.8x total)
        var RANGE = 120;      // px of influence

        // Listen on WINDOW so nothing can intercept the move event
        window.addEventListener('mousemove', function (e) {
          items.forEach(function (item) {
            var r = item.getBoundingClientRect();
            var center = r.left + r.width / 2;
            var dist = Math.abs(e.clientX - center);
            // also require cursor to be vertically near the dock row
            var vDist = Math.abs(e.clientY - (r.top + r.height / 2));
            var near = vDist < 80 ? 1 : 0;
            var t = Math.max(0, 1 - dist / RANGE) * near;
            item.style.transform = 'scale(' + (1 + MAX_BONUS * t) + ')';
          });
        });

        console.log('Dock (window-listener) initialized with', items.length, 'items');
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDock);
      } else {
        initDock();
      }
    })();

(function() {
    function initOrbital() {
        const stages = [
            { num: 1, name: "Harvest", desc: "Hand-picked hops from Bavarian fields. The foundation of every great brew." },
            { num: 2, name: "Malt", desc: "Barley roasted slowly to coax out caramel and toast notes." },
            { num: 3, name: "Mash", desc: "Grain meets water at precise temperatures. Sugars awaken." },
            { num: 4, name: "Boil", desc: "Hops join the wort. Bitterness, aroma, character emerge." },
            { num: 5, name: "Ferment", desc: "Yeast transforms sugar into spirit. Patience over weeks." },
            { num: 6, name: "Age", desc: "Months of cold conditioning. Flavors deepen and harmonize." },
            { num: 7, name: "Bottle", desc: "Sealed at peak character. Ready for the moment of pour." }
        ];

        const container = document.getElementById('orbitalNodes');
        if (!container) return;

        const card = document.getElementById('orbitalCard');
        const cardNum = document.getElementById('cardNum');
        const cardTitle = document.getElementById('cardTitle');
        const cardDesc = document.getElementById('cardDesc');

        let rotation = -90;
        let pauseRotation = false;
        let activeNodeIndex = -1;

        const nodeEls = stages.map((stage, i) => {
            const el = document.createElement('div');
            el.className = 'orbital-node';
            el.innerHTML = `
                ${stage.num}
                <span class="orbital-node-label">${stage.name}</span>
            `;
            
            el.addEventListener('mouseenter', () => pauseRotation = true);
            el.addEventListener('mouseleave', () => {
                if (activeNodeIndex === -1) pauseRotation = false;
            });
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (activeNodeIndex === i) {
                    el.classList.remove('active');
                    card.classList.remove('show');
                    activeNodeIndex = -1;
                    pauseRotation = false;
                } else {
                    nodeEls.forEach(n => n.classList.remove('active'));
                    el.classList.add('active');
                    cardNum.textContent = `0${stage.num}`;
                    cardTitle.textContent = stage.name;
                    cardDesc.textContent = stage.desc;
                    card.classList.add('show');
                    activeNodeIndex = i;
                    pauseRotation = true;
                }
            });
            
            container.appendChild(el);
            return el;
        });

        document.addEventListener('click', () => {
            if (activeNodeIndex !== -1) {
                nodeEls.forEach(n => n.classList.remove('active'));
                card.classList.remove('show');
                activeNodeIndex = -1;
                pauseRotation = false;
            }
        });

        card.addEventListener('click', (e) => e.stopPropagation());

        function updatePositions() {
            const isMobile = window.innerWidth <= 768;
            const radius = isMobile ? 140 : 220;

            nodeEls.forEach((el, index) => {
                const angle = ((index / stages.length) * 360 + rotation) % 360;
                const radian = angle * Math.PI / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;
                el.style.setProperty('--x', `${x}px`);
                el.style.setProperty('--y', `${y}px`);
            });
        }

        setInterval(() => {
            if (!pauseRotation) {
                rotation += 0.3;
                updatePositions();
            }
        }, 50);
        
        window.addEventListener('resize', updatePositions);
        updatePositions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOrbital);
    } else {
        initOrbital();
    }
})();

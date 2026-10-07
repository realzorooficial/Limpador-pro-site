
    (() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        const saveData = Boolean(navigator.connection && navigator.connection.saveData);
        const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d', { alpha: true });

        /* Partículas inspiradas no site original, com custo reduzido */
        if (!reduceMotion && !saveData) {
            let particles = [];
            let mouseX = -9999, mouseY = -9999;
            let visible = !document.hidden;
            let resizeTimer;

            class Particle {
                constructor(){ this.reset(); }
                reset(){
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.s = Math.random() * 1.1 + .3;
                    this.vx = (Math.random() - .5) * .22;
                    this.vy = (Math.random() - .5) * .22;
                    this.o = Math.random() * .22 + .035;
                    this.life = Math.random() * 140 + 160;
                    this.max = this.life;
                }
                update(){
                    this.x += this.vx; this.y += this.vy; this.life--;
                    if (finePointer && mouseX > -9999) {
                        const dx = mouseX - this.x, dy = mouseY - this.y;
                        const d2 = dx*dx + dy*dy;
                        if (d2 < 19600) {
                            const d = Math.sqrt(d2);
                            const f = (140-d)/140;
                            this.x -= dx*f*.009;
                            this.y -= dy*f*.009;
                        }
                    }
                    if (this.life <= 0 || this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height) this.reset();
                }
                draw(){
                    const r = this.life / this.max;
                    ctx.beginPath();
                    ctx.arc(this.x,this.y,this.s,0,Math.PI*2);
                    ctx.fillStyle = `rgba(255,255,255,${this.o*r})`;
                    ctx.fill();
                }
            }

            const resize = () => {
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = Math.floor(innerWidth * dpr);
                canvas.height = Math.floor(innerHeight * dpr);
                canvas.style.width = innerWidth + 'px';
                canvas.style.height = innerHeight + 'px';
                ctx.setTransform(dpr,0,0,dpr,0,0);
                const desktopCap = lowMemory ? 20 : 30;
                const mobileCap = lowMemory ? 10 : 14;
                const count = innerWidth < 768 ? Math.min(mobileCap, Math.floor(innerWidth/55)) : Math.min(desktopCap, Math.floor(innerWidth/42));
                particles = Array.from({length:Math.max(8,count)}, () => new Particle());
            };

            const drawLines = () => {
                if (innerWidth < 768) return;
                for (let i=0;i<particles.length;i++){
                    for (let j=i+1;j<particles.length;j++){
                        const a=particles[i], b=particles[j];
                        const dx=a.x-b.x, dy=a.y-b.y;
                        if (Math.abs(dx)>110 || Math.abs(dy)>110) continue;
                        const d2=dx*dx+dy*dy;
                        if (d2<12100){
                            const d=Math.sqrt(d2);
                            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
                            ctx.strokeStyle=`rgba(255,255,255,${.03*(1-d/110)})`;
                            ctx.lineWidth=.35;ctx.stroke();
                        }
                    }
                }
            };

            let rafId = null;
            let lastFrame = 0;
            const frameInterval = 1000 / 30;
            const loop = now => {
                if (!visible) { rafId = null; return; }
                if (now - lastFrame >= frameInterval) {
                    lastFrame = now;
                    ctx.clearRect(0,0,innerWidth,innerHeight);
                    particles.forEach(p=>{p.update();p.draw()});
                    drawLines();
                }
                rafId = requestAnimationFrame(loop);
            };
            const startLoop = () => { if (rafId === null) rafId = requestAnimationFrame(loop); };

            resize();
            startLoop();

            addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(resize,160);
            }, {passive:true});

            document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible) startLoop(); else if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } });

            if (finePointer) {
                let last = 0;
                addEventListener('pointermove', e => {
                    const now = performance.now();
                    if (now-last < 45) return;
                    last=now; mouseX=e.clientX; mouseY=e.clientY;
                }, {passive:true});
            }
        }

        /* Spotlights premium */
        if (finePointer && !reduceMotion) {
            document.querySelectorAll('.home-solution,.home-brand-visual,.page-visual,.zpack-brand-showcase,.optimization-card,.founder-expanded,.app-preview,.screenshot-card,.f-card,.c-card,.evo-proof,.version-card,.price-card,.lifetime-panel,.license-option').forEach(el => {
                el.addEventListener('pointermove', e => {
                    const r = el.getBoundingClientRect();
                    el.style.setProperty('--mx', `${e.clientX-r.left}px`);
                    el.style.setProperty('--my', `${e.clientY-r.top}px`);
                }, {passive:true});
            });
        }

        /* Reveal */
        if (!reduceMotion && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, {threshold:.04,rootMargin:'0px 0px 90px 0px'});
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        } else {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('instant'));
        }

        /* Nav */
        const nav = document.querySelector('.nav');
        let ticking = false;
        addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', scrollY > 60);
                ticking = false;
            });
        }, {passive:true});

        const navLinks = document.getElementById('navLinks');
        const mobileToggle = document.getElementById('mobileToggle');

        const closeMenu = () => {
            navLinks.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded','false');
        };

        mobileToggle.addEventListener('click', e => {
            e.stopPropagation();
            const open = navLinks.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded',String(open));
        });

        navLinks.addEventListener('click', e => {
            if (e.target.closest('a')) closeMenu();
        });

        document.addEventListener('click', e => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) closeMenu();
        });

        addEventListener('resize', () => {
            if (innerWidth > 768) closeMenu();
        }, {passive:true});

        /* Navegação ativa */
        if ('IntersectionObserver' in window) {
            const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
            const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
            const navObserver = new IntersectionObserver(entries => {
                const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
                if (!visible) return;
                links.forEach(a => {
                    const active = a.getAttribute('href') === `#${visible.target.id}`;
                    a.classList.toggle('active', active);
                    if (active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
                });
            }, {rootMargin:'-35% 0px -55% 0px',threshold:[0,.1,.3]});
            targets.forEach(t => navObserver.observe(t));
        }

        /* Lightbox */
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        let lastTrigger = null;

        const openLightbox = img => {
            lastTrigger = img;
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow='hidden';
            lightboxClose.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow='';
            lightboxImage.removeAttribute('src');
            if (lastTrigger) lastTrigger.focus?.();
        };

        document.querySelectorAll('.zoom-image').forEach(img => {
            img.setAttribute('tabindex','0');
            img.setAttribute('role','button');
            img.setAttribute('aria-label',`Ampliar: ${img.alt}`);
            img.addEventListener('click',()=>openLightbox(img));
            img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(img)}});
        });

        lightboxClose.addEventListener('click',closeLightbox);
        lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
        document.addEventListener('keydown',e=>{
            if(e.key!=='Escape')return;
            if(lightbox.classList.contains('open'))closeLightbox();
            else closeMenu();
        });
    })();
    
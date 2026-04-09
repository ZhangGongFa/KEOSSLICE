const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const petAvatar = document.getElementById('pet-avatar');
        const comboDisplay = document.getElementById('combo-display');
        const recommendationPanel = document.getElementById('recommendation-panel');
        const centerLogoImage = document.getElementById('img-keos-logo');
        const saveStatusEl = document.getElementById('save-status');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const PRODUCT_CATALOG = [
            {
                id: 'keos-puppy',
                imageId: 'img-puppy',
                petType: 'dog',
                name: '[Keos] Hạt cho chó con, vị gà trứng sữa',
                intro: 'Công thức dành cho chó con mới cai sữa, có thể làm mềm với nước khi tập ăn và còn phù hợp cho chó mẹ đang mang thai hoặc cho con bú.',
                shopeeUrl: 'https://s.shopee.vn/15iWt2bur',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2emfcGWpx-ZpS78/'
            },
            {
                id: 'keos-dog-beef',
                imageId: 'img-beef',
                petType: 'dog',
                name: '[Keos] Hạt cho chó trưởng thành, vị bò rau củ',
                intro: 'Dòng hạt cho cún trưởng thành với nền dinh dưỡng toàn diện, giúp duy trì thể trạng khỏe mạnh và sự năng động trong nhịp sinh hoạt mỗi ngày.',
                shopeeUrl: 'https://s.shopee.vn/7fV9ehkPq8',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2ekDQ3jfd-MCJmm/'
            },
            {
                id: 'keos-dog-chicken',
                imageId: 'img-chicken',
                petType: 'dog',
                name: '[Keos] Hạt cho chó trưởng thành, vị gà rau củ',
                intro: 'Hương vị gà rau củ dễ ăn, phù hợp cho cún trưởng thành cần bữa hạt cân bằng, dễ làm quen và tiện dùng hằng ngày.',
                shopeeUrl: 'https://s.shopee.vn/AACUdY3y5t',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2ePM3o39E-OpJy6/'
            },
            {
                id: 'keos-cat-tuna',
                imageId: 'img-tuna',
                petType: 'cat',
                name: '[Keos] Hạt cho mèo mọi lứa tuổi, vị cá ngừ',
                intro: 'Vị cá ngừ thơm dễ ăn giúp kích thích vị giác, đồng thời bổ sung taurine để hỗ trợ thị lực và tim mạch cho bé mèo.',
                shopeeUrl: 'https://s.shopee.vn/30jK6VwTRi',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2egqoxERK-zcOaf/'
            },
            {
                id: 'keos-cat-seafood',
                imageId: 'img-seafood',
                petType: 'cat',
                name: '[Keos] Hạt cho mèo mọi lứa tuổi, vị hải sản',
                intro: 'Công thức vị hải sản giúp mèo ăn ngon miệng hơn, đồng thời cung cấp taurine cùng tỷ lệ đạm và khoáng chất cân đối.',
                shopeeUrl: 'https://s.shopee.vn/6VJCGvjthQ',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2ebuFdy4n-mSRUQ/'
            },
            {
                id: 'keos-plus-small',
                imageId: 'img-plus-small',
                petType: 'dog',
                name: '[Keos+] Dành riêng cho chó size nhỏ, vị thịt cừu & gạo',
                intro: 'Hạt nhỏ vừa miệng cho cún size nhỏ, dùng nền thịt cừu và gạo để tăng độ ngon miệng và hỗ trợ tiêu hóa tốt hơn.',
                shopeeUrl: 'https://s.shopee.vn/2g6Ti0pLZD',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2eERXb3hx-90eru/'
            },
            {
                id: 'keos-plus-protein',
                imageId: 'img-plus-protein',
                petType: 'dog',
                name: '[Keos+] High Protein cho chó trưởng thành, vị gà & cừu',
                intro: 'Dòng năng lượng cao cho cún hoạt động nhiều, bổ sung đạm chất lượng cùng glucosamine, chondroitin và L-carnitine hỗ trợ cơ xương khớp.',
                shopeeUrl: 'https://s.shopee.vn/4frY5f6G48',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2ecqQMKEH-1vVb0/'
            },
            {
                id: 'keos-plus-hairball',
                imageId: 'img-plus-hairball',
                petType: 'cat',
                name: '[Keos+] Hairball Control cho mèo trưởng thành, vị cá ngừ',
                intro: 'Công thức giàu chất xơ tự nhiên giúp giảm búi lông, đồng thời bổ sung Omega 3, 6 và kẽm hữu cơ để da lông thêm khỏe đẹp.',
                shopeeUrl: 'https://s.shopee.vn/70FSrv0reH',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2eWh4gGj3-v4S1u/'
            },
            {
                id: 'keos-plus-digestive',
                imageId: 'img-plus-digestive',
                petType: 'dog',
                name: '[Keos+] Digestive Care cho chó trưởng thành, vị thịt cừu & gạo',
                intro: 'Công thức dùng thịt cừu và gạo để tăng độ hợp khẩu vị, đồng thời hỗ trợ tiêu hóa và hấp thu tốt hơn cho cún trưởng thành.',
                shopeeUrl: 'https://s.shopee.vn/6fccTHMOcn',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2enDPBaNn-bF3MY/'
            },
            {
                id: 'keos-plus-urinary',
                imageId: 'img-plus-urinary',
                petType: 'cat',
                name: '[Keos+] Urinary Care cho mèo trưởng thành, vị cá biển',
                intro: 'Công thức được tối ưu cho mèo dễ gặp vấn đề tiết niệu, hỗ trợ cân bằng pH nước tiểu và tăng sự thoải mái khi đi vệ sinh.',
                shopeeUrl: 'https://s.shopee.vn/2BAD77Q2nX',
                tiktokUrl: 'https://vt.tiktok.com/ZS9R2d1H1Somf-bpgST/'
            }
        ];

        const productAssets = PRODUCT_CATALOG.map(p => ({ ...p, img: document.getElementById(p.imageId) }));
        const negativeImages = [
            document.getElementById('img-negative-comtam'),
            document.getElementById('img-negative-banhmi'),
            document.getElementById('img-negative-pho'),
            document.getElementById('img-negative-bunbo')
        ];

        const SCORE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbygsnnbJ5EoOfWqv0d65_z7OppHrUmuJj3s89CmkxIqS6m3gTv7C3VR97JwCwLHm6FE/exec'; // Web App Google Apps Script để lưu tập trung
        const RESULT_QUEUE_KEY = 'keosSlicePendingResults';
        const LOCAL_RESULT_HISTORY_KEY = 'keosSliceSavedResults';
        const MAX_LOCAL_RESULTS = 200;

        function normalizePhoneNumber(value) {
            return String(value || '').trim().replace(/[^\d+]/g, '');
        }

        function isValidEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
        }

        function isValidPhone(value) {
            const digits = String(value || '').replace(/\D/g, '');
            return digits.length >= 9 && digits.length <= 11;
        }

        function getPlayerFormElements() {
            return {
                fullNameInput: document.getElementById('player-full-name'),
                emailInput: document.getElementById('player-email'),
                phoneInput: document.getElementById('player-phone')
            };
        }

        function createSessionId() {
            if (window.crypto && typeof window.crypto.randomUUID === 'function') {
                return window.crypto.randomUUID();
            }
            return 'session-' + Date.now() + '-' + Math.random().toString(16).slice(2);
        }

        let currentSessionId = createSessionId();
        let resultSubmitted = false;

        function updateSaveStatus(message, isError = false) {
            if (!saveStatusEl) return;
            saveStatusEl.textContent = message || '';
            saveStatusEl.style.color = isError ? '#ff9e80' : '#ffcc80';
        }

        function readStoredArray(key) {
            try {
                return JSON.parse(localStorage.getItem(key) || '[]');
            } catch (error) {
                console.warn('Không đọc được localStorage cho', key, error);
                return [];
            }
        }

        function writeStoredArray(key, items) {
            const safeItems = items.slice(-MAX_LOCAL_RESULTS);
            localStorage.setItem(key, JSON.stringify(safeItems));
        }

        function rememberResultLocally(payload) {
            const resultHistory = readStoredArray(LOCAL_RESULT_HISTORY_KEY);
            resultHistory.push(payload);
            writeStoredArray(LOCAL_RESULT_HISTORY_KEY, resultHistory);
        }

        function queuePendingResult(payload) {
            const queue = readStoredArray(RESULT_QUEUE_KEY);
            queue.push(payload);
            writeStoredArray(RESULT_QUEUE_KEY, queue);
        }


        async function postResultToWebhook(payload) {
            const body = new URLSearchParams();
            Object.entries(payload).forEach(([key, value]) => {
                body.append(key, value == null ? '' : String(value));
            });

            const response = await fetch(SCORE_WEBHOOK_URL, {
                method: 'POST',
                body,
                redirect: 'follow',
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }

            const raw = await response.text().catch(() => '');
            let data = null;
            if (raw) {
                try {
                    data = JSON.parse(raw);
                } catch (error) {
                    data = null;
                }
            }

            if (data && data.ok === false) {
                throw new Error(data.error || 'Webhook trả về lỗi.');
            }

            return data || true;
        }

        async function flushPendingResults() {
            if (!SCORE_WEBHOOK_URL) return;
            const queue = readStoredArray(RESULT_QUEUE_KEY);
            if (!queue.length) return;
            for (const item of queue) {
                await postResultToWebhook(item);
            }
            localStorage.removeItem(RESULT_QUEUE_KEY);
        }

        function buildResultPayload(recommendedProduct) {
            return {
                sessionId: currentSessionId,
                playedAt: new Date().toISOString(),
                playerName,
                fullName: playerFullName,
                email: playerEmail,
                phone: playerPhone,
                petType: selectedPetType,
                score,
                recommendedProductId: recommendedProduct ? recommendedProduct.id : '',
                recommendedProductName: recommendedProduct ? recommendedProduct.name : '',
                pageUrl: window.location.href,
                userAgent: navigator.userAgent,
                game: 'keos-slice'
            };
        }

        async function persistCurrentResult(recommendedProduct) {
            const payload = buildResultPayload(recommendedProduct);
            rememberResultLocally(payload);

            if (!SCORE_WEBHOOK_URL) {
                updateSaveStatus('Đã lưu tạm kết quả trên trình duyệt này. Dán webhook Google Apps Script để lưu tập trung.');
                return;
            }

            queuePendingResult(payload);
            updateSaveStatus('Đang lưu điểm và thông tin nhận thưởng...');
            try {
                await flushPendingResults();
                updateSaveStatus('Đã lưu điểm và thông tin thành công.');
            } catch (error) {
                console.warn('Chưa gửi được kết quả lên webhook:', error);
                updateSaveStatus('Chưa gửi được lên server. Kết quả đã được giữ lại trên máy này để gửi lại khi bạn mở game lần sau.', true);
            }
        }

        window.addEventListener('online', () => {
            flushPendingResults().catch(error => {
                console.warn('Không đồng bộ lại được kết quả chờ:', error);
            });
        });

        function getEligibleProducts(petType = selectedPetType) {
            const filtered = productAssets.filter(product => product.petType === petType);
            return filtered.length ? filtered : productAssets;
        }

        function randomProductForSelectedPet() {
            const products = getEligibleProducts(selectedPetType);
            return products[Math.floor(Math.random() * products.length)];
        }

        function getRecommendedProduct() {
            let bestProduct = null;
            let bestCount = 0;
            for (const product of getEligibleProducts(selectedPetType)) {
                const count = caughtProductCounts[product.id] || 0;
                if (count > bestCount) {
                    bestProduct = product;
                    bestCount = count;
                }
            }
            return { product: bestProduct, count: bestCount };
        }

        let gameRunning = false;
        let animationId = null; 
        let score = 0, lives = 3;
        let playerName = '', playerFullName = '', playerEmail = '', playerPhone = '', selectedPetType = 'dog';
        let caughtProductCounts = {};
        
        let bags = [], bagHalves = [], seeds = [], particles = [], sliceTrail = [];
        let lastFrameTime = 0, spawnTimer = 0, shakeTime = 0, flashColor = null, flashOpacity = 0;
        let isSwiping = false;
        let recentSlices = 0, comboTimer = 0;

        let audioCtx;
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } 
        catch (e) { console.warn("Trình duyệt không hỗ trợ Web Audio API"); }

        function playTone(type) {
            if (!audioCtx) return;
            if (audioCtx.state === 'suspended') audioCtx.resume().catch(()=>{});
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            let dur = 0.2;
            if (type === 'slice') {
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.1);
                dur = 0.15; gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            } else if (type === 'bomb') {
                osc.type = 'square'; osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5);
                dur = 0.5; gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
            } else if (type === 'eat') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
                dur = 0.1; gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            }
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + dur);
        }

        class Bag {
            // Thêm tham số throwFromLeft để có thể ném nhiều túi cùng 1 hướng (tạo cụm)
            constructor(throwFromLeft = Math.random() > 0.5) {
                // Tỉ lệ xuất hiện bom tăng nhẹ khi điểm cao (max 30%)
                const bombChance = Math.min(0.15 + (score * 0.002), 0.3);
                this.isBomb = Math.random() < bombChance;
                
                if (this.isBomb) {
                    this.img = negativeImages[Math.floor(Math.random() * negativeImages.length)];
                    this.productId = null;
                } else {
                    const prod = randomProductForSelectedPet();
                    this.img = prod.img; this.productId = prod.id;
                }
                
                // GIẢM KÍCH THƯỚC: Thu nhỏ túi hạt để tăng độ khó (giảm từ 0.25 xuống 0.15)
                this.width = canvas.height * 0.15; 
                this.height = this.width * 1.4;
                
                // Thuật toán ném chéo
                this.x = throwFromLeft ? -this.width : canvas.width + this.width;
                this.y = canvas.height;
                
                // VẬT LÝ MỚI: Bay ngang sâu hơn, rơi nhanh hơn
                this.vx = (throwFromLeft ? 1 : -1) * (canvas.width * (0.3 + Math.random() * 0.4));
                this.vy = -(canvas.height * (1.1 + Math.random() * 0.3));
                this.gravity = canvas.height * 1.6; // Trọng lực gắt hơn, rơi lẹ hơn

                // Ghi lại vận tốc ban đầu và thời điểm xuất hiện để tính tiến trình di chuyển
                this.initialVy = this.vy;
                this.spawnTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
                
                this.angle = 0;
                this.rotSpeed = (Math.random() - 0.5) * 8; // Xoay tít hơn
                this.dead = false;
            }

            update(dt) {
                this.vy += this.gravity * dt;
                this.x += this.vx * dt;
                this.y += this.vy * dt;
                this.angle += this.rotSpeed * dt;
                if (this.y > canvas.height + this.height && !this.dead) {
                    this.dead = true;
                    if (!this.isBomb) { loseLife(); triggerFlash('#ff0000', 0.3); }
                }
            }

            draw() {
                if (this.dead) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                
                if (this.isBomb) {
                    ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 20;
                    ctx.globalAlpha = 0.8 + Math.sin(performance.now()/100) * 0.2; 
                } else {
                    ctx.shadowColor = 'rgba(255, 183, 77, 0.5)'; ctx.shadowBlur = 10;
                }

                if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
                    ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
                } else {
                    ctx.fillStyle = this.isBomb ? '#ff0000' : '#ffb74d';
                    ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
                }
                ctx.restore();
            }
        }

        class BagHalf {
            constructor(bag, isLeft) {
                this.img = bag.img;
                this.width = bag.width; this.height = bag.height;
                this.x = bag.x; this.y = bag.y;
                this.angle = bag.angle;
                this.isLeft = isLeft;
                
                this.vx = bag.vx + (isLeft ? -200 : 200);
                this.vy = bag.vy;
                this.gravity = bag.gravity;
                this.rotSpeed = bag.rotSpeed + (isLeft ? -5 : 5);
            }
            update(dt) {
                this.vy += this.gravity * dt;
                this.x += this.vx * dt; this.y += this.vy * dt;
                this.angle += this.rotSpeed * dt;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                
                ctx.beginPath();
                if (this.isLeft) { ctx.rect(-this.width/2, -this.height/2, this.width/2, this.height); } 
                else { ctx.rect(0, -this.height/2, this.width/2, this.height); }
                ctx.clip();
                
                if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
                    ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
                } else {
                    ctx.fillStyle = '#ffb74d';
                    ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
                }
                ctx.restore();
            }
        }

        class HomingSeed {
            constructor(x, y, productId) {
                this.x = x; this.y = y; this.productId = productId;
                this.vx = (Math.random() - 0.5) * 800;
                this.vy = (Math.random() - 0.5) * 800;
                this.size = Math.random() * 6 + 4;
                this.lifeTimer = 0;
                this.color = ['#ffb74d', '#e65100', '#fff3e0'][Math.floor(Math.random()*3)];
                
                const rect = petAvatar.getBoundingClientRect();
                this.targetX = rect.left + rect.width/2;
                this.targetY = rect.top + rect.height/2;
            }
            update(dt) {
                this.lifeTimer += dt;
                if (this.lifeTimer > 0.2) {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    const angle = Math.atan2(dy, dx);
                    const speed = 1500 * (this.lifeTimer);
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                    
                    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
                        this.dead = true;
                        playTone('eat');
                        petAvatar.classList.add('pet-eat-anim');
                        setTimeout(() => petAvatar.classList.remove('pet-eat-anim'), 100);
                        // ĐÃ XÓA LOGIC GHI NHẬN Ở ĐÂY, CHUYỂN SANG HÀM checkSlice()
                    }
                }
                this.x += this.vx * dt;
                this.y += this.vy * dt;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
            }
        }

        class Particle {
            constructor(x, y, color) {
                this.x = x; this.y = y; this.color = color;
                this.vx = (Math.random() - 0.5) * 500; this.vy = (Math.random() - 0.5) * 500;
                this.life = 1.0; this.size = Math.random() * 10 + 5;
            }
            update(dt) { this.x += this.vx*dt; this.y += this.vy*dt; this.life -= dt*1.5; }
            draw() {
                if (this.life <= 0) return;
                ctx.globalAlpha = this.life; ctx.fillStyle = this.color;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function addTrailPoint(x, y) {
            sliceTrail.push({x, y, time: performance.now()});
            if (sliceTrail.length > 10) sliceTrail.shift();
            checkSlice(x, y);
        }

        function handleInputStart(e) {
            isSwiping = true; sliceTrail = [];
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            addTrailPoint(x, y);
        }
        function handleInputMove(e) {
            if (!isSwiping) return;
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            addTrailPoint(x, y);
        }
        function handleInputEnd() { isSwiping = false; }

        canvas.addEventListener('mousedown', handleInputStart);
        canvas.addEventListener('mousemove', handleInputMove);
        window.addEventListener('mouseup', handleInputEnd);
        canvas.addEventListener('touchstart', handleInputStart, {passive: false});
        canvas.addEventListener('touchmove', handleInputMove, {passive: false});
        window.addEventListener('touchend', handleInputEnd);

        function checkSlice(px, py) {
            for (let i = bags.length - 1; i >= 0; i--) {
                const b = bags[i];
                if (b.dead) continue;
                
                const dist = Math.hypot(px - b.x, py - b.y);
                // Hitbox nhỏ lại tương ứng với kích thước túi mới
                if (dist < b.width * 0.6) {
                    b.dead = true;
                    if (b.isBomb) {
                        playTone('bomb'); loseLife();
                        shakeTime = 0.4; triggerFlash('#ff0000', 0.8);
                        for(let j=0; j<30; j++) particles.push(new Particle(b.x, b.y, '#333'));
                    } else {
                        playTone('slice');
                        bagHalves.push(new BagHalf(b, true), new BagHalf(b, false));
                        for(let j=0; j<15; j++) seeds.push(new HomingSeed(b.x, b.y, b.productId));
                        
                        // LOGIC MỚI: Ghi nhận trực tiếp TÚI HẠT đã bị chém
                        if (b.productId) {
                            caughtProductCounts[b.productId] = (caughtProductCounts[b.productId] || 0) + 1;
                        }

                        score++;
                        recentSlices++;
                        comboTimer = 0.5; 
                        
                        document.getElementById('score-display').innerText = score;
                    }
                }
            }
        }

        function loseLife() {
            lives--;
            document.getElementById('lives-container').innerText = '❤️'.repeat(Math.max(0, lives));
            if (lives <= 0) gameOver();
        }


        function triggerFlash(color, opacity) { flashColor = color; flashOpacity = opacity; }

        function drawCenterLogo() {
            if (!centerLogoImage || !centerLogoImage.complete || centerLogoImage.naturalWidth === 0) return;
            const ratio = centerLogoImage.naturalHeight / centerLogoImage.naturalWidth || 0.5;
            const width = Math.min(canvas.width * 0.34, 420);
            const height = width * ratio;
            const x = (canvas.width - width) / 2;
            const y = (canvas.height - height) / 2 - (height * 0.12);

            ctx.save();
            ctx.globalAlpha = 0.14;
            ctx.shadowColor = 'rgba(255,255,255,0.18)';
            ctx.shadowBlur = 20;
            ctx.drawImage(centerLogoImage, x, y, width, height);
            ctx.restore();
        }

        function update(timestamp) {
            if (!gameRunning) return;
            
            const dt = Math.max(0, Math.min((timestamp - lastFrameTime) / 1000, 0.05));
            lastFrameTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCenterLogo();

            ctx.save();
            if (shakeTime > 0) {
                ctx.translate((Math.random()-0.5)*40, (Math.random()-0.5)*40);
                shakeTime -= dt;
            }

            if (comboTimer > 0) {
                comboTimer -= dt;
                if (comboTimer <= 0) {
                    if (recentSlices >= 3) {
                        score += recentSlices; 
                        document.getElementById('score-display').innerText = score;
                        comboDisplay.innerText = `COMBO x${recentSlices}!`;
                        comboDisplay.style.opacity = 1;
                        setTimeout(() => comboDisplay.style.opacity = 0, 1000);
                    }
                    recentSlices = 0;
                }
            }

            // SPAWN LOGIC MỚI: điều chỉnh độ khó và đảm bảo không ném đợt mới khi túi hiện tại chưa bay hết 70% quãng đường
            // Thời gian chờ giữa các đợt ban đầu chậm hơn và giảm dần theo điểm để độ khó tăng từ từ.
            // Giảm tốc độ xuất hiện một chút theo phản hồi người dùng: tăng baseRate và giới hạn tối thiểu cao hơn.
            const baseRate = 2.4;
            const spawnRate = Math.max(1.0, baseRate - score * 0.02);
            spawnTimer += dt;
            // Kiểm tra xem có thể tạo đợt mới hay không
            if (spawnTimer >= spawnRate) {
                let canSpawn = true;
                // Không tạo đợt mới nếu còn túi bay chưa qua 70% thời gian chuyến bay của nó
                for (let i = 0; i < bags.length; i++) {
                    const b = bags[i];
                    if (b.dead) continue;
                    if (typeof b.initialVy === 'number' && typeof b.gravity === 'number' && typeof b.spawnTime === 'number') {
                        const totalFlight = Math.abs(2 * b.initialVy / b.gravity);
                        const nowTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
                        const elapsedSec = (nowTime - b.spawnTime) / 1000;
                        const ratio = elapsedSec / totalFlight;
                        if (ratio < 0.7) {
                            canSpawn = false;
                            break;
                        }
                    }
                }
                if (canSpawn) {
                    let itemsToSpawn = 1;
                    // Điều chỉnh số lượng túi dựa trên mốc điểm: 1 túi trước 10 điểm,
                    // 1–2 túi sau 10 điểm, 2–3 túi sau 50 điểm, 3–4 túi sau 80 điểm
                    if (score > 80) {
                        // 80 điểm trở lên: mặc định ném 3 túi, có xác suất 4 túi
                        itemsToSpawn = 3;
                        if (Math.random() > 0.6) itemsToSpawn = 4;
                    } else if (score > 50) {
                        // 51–80 điểm: mặc định ném 2 túi, có xác suất 3 túi
                        itemsToSpawn = 2;
                        if (Math.random() > 0.5) itemsToSpawn = 3;
                    } else if (score > 10) {
                        // 11–50 điểm: mặc định ném 1 túi, có xác suất 2 túi
                        itemsToSpawn = 1;
                        if (Math.random() > 0.5) itemsToSpawn = 2;
                    } else {
                        // 0–10 điểm: luôn ném 1 túi
                        itemsToSpawn = 1;
                    }

                    const throwFromLeft = Math.random() > 0.5;
                    for (let i = 0; i < itemsToSpawn; i++) {
                        // Ném các túi cùng một hướng để tạo cảm giác wave
                        bags.push(new Bag(throwFromLeft));
                    }
                    spawnTimer = 0;
                }
            }

            [bags, bagHalves, seeds, particles].forEach(arr => {
                for (let i = arr.length - 1; i >= 0; i--) {
                    arr[i].update(dt); arr[i].draw();
                    if (arr[i].dead || arr[i].y > canvas.height + 300 || arr[i].life <= 0) {
                        arr.splice(i, 1);
                    }
                }
            });

            ctx.restore(); 

            if (flashOpacity > 0) {
                ctx.fillStyle = flashColor; ctx.globalAlpha = flashOpacity;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1; flashOpacity -= dt * 2;
            }

            const now = performance.now();
            sliceTrail = sliceTrail.filter(p => now - p.time < 120);
            if (sliceTrail.length > 1) {
                ctx.beginPath(); ctx.moveTo(sliceTrail[0].x, sliceTrail[0].y);
                for (let i = 1; i < sliceTrail.length; i++) ctx.lineTo(sliceTrail[i].x, sliceTrail[i].y);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 20;
                ctx.stroke(); ctx.shadowBlur = 0;
            }

            if (gameRunning) {
                animationId = requestAnimationFrame(update);
            }
        }

        function startGame() {
            const { fullNameInput, emailInput, phoneInput } = getPlayerFormElements();
            const companionInput = document.querySelector('input[name="pet-companion"]:checked');
            const trimmedFullName = fullNameInput.value.trim();
            const trimmedEmail = emailInput.value.trim().toLowerCase();
            const normalizedPhone = normalizePhoneNumber(phoneInput.value);

            if (!trimmedFullName) {
                updateSaveStatus('');
                alert('Bạn cần nhập họ và tên trước khi bắt đầu.');
                fullNameInput.focus();
                return;
            }

            if (!trimmedEmail) {
                updateSaveStatus('');
                alert('Bạn cần nhập email để hệ thống liên hệ trao thưởng.');
                emailInput.focus();
                return;
            }

            if (!isValidEmail(trimmedEmail)) {
                updateSaveStatus('');
                alert('Email chưa đúng định dạng.');
                emailInput.focus();
                return;
            }

            if (!normalizedPhone) {
                updateSaveStatus('');
                alert('Bạn cần nhập số điện thoại để hệ thống liên hệ trao thưởng.');
                phoneInput.focus();
                return;
            }

            if (!isValidPhone(normalizedPhone)) {
                updateSaveStatus('');
                alert('Số điện thoại chưa hợp lệ.');
                phoneInput.focus();
                return;
            }

            if (!companionInput) {
                updateSaveStatus('');
                alert('Hãy chọn bé cún hoặc bé mèo nhé.');
                return;
            }

            playerFullName = trimmedFullName;
            playerName = trimmedFullName;
            playerEmail = trimmedEmail;
            playerPhone = normalizedPhone;
            selectedPetType = companionInput.value;
            petAvatar.innerText = selectedPetType === 'dog' ? '🐶' : '🐱';

            document.getElementById('start-screen').classList.add('hidden');
            document.getElementById('game-over-screen').classList.add('hidden');
            document.getElementById('hud').style.display = 'block';
            updateSaveStatus('');
            resetVars();

            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume().catch(()=>{});
            }

            flushPendingResults().catch(error => {
                console.warn('Không đồng bộ được các kết quả chờ trước đó:', error);
            });

            if (animationId) cancelAnimationFrame(animationId);
            gameRunning = false;

            const overlay = document.getElementById('countdown-overlay');
            overlay.style.display = 'flex';
            let count = 3;
            overlay.textContent = count;
            playTone('eat');

            const iv = setInterval(() => {
                count--;
                if (count > 0) {
                    overlay.textContent = count;
                    playTone('eat');
                } else if (count === 0) {
                    overlay.textContent = 'CHÉM!';
                    playTone('slice');
                } else {
                    clearInterval(iv);
                    overlay.style.display = 'none';
                    gameRunning = true;
                    lastFrameTime = performance.now();
                    animationId = requestAnimationFrame(update);
                }
            }, 800);
        }

        function resetVars() {
            score = 0;
            lives = 3;
            recentSlices = 0;
            spawnTimer = 0;
            caughtProductCounts = {};
            bags = [];
            bagHalves = [];
            seeds = [];
            particles = [];
            sliceTrail = [];
            flashColor = null;
            flashOpacity = 0;
            shakeTime = 0;
            resultSubmitted = false;
            currentSessionId = createSessionId();
            document.getElementById('score-display').innerText = '0';
            document.getElementById('lives-container').innerText = '❤️❤️❤️';
            updateSaveStatus('');
        }

        async function gameOver() {
            gameRunning = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }

            document.getElementById('hud').style.display = 'none';
            document.getElementById('game-over-screen').classList.remove('hidden');
            document.getElementById('high-score-display').innerText = score;

            const petLabel = selectedPetType === 'dog' ? 'bé cún' : 'bé mèo';
            document.getElementById('final-message').innerText = `${playerName} đã chém được ${score} túi hạt cho ${petLabel}!`;

            const { product, count } = getRecommendedProduct();
            if (product && count > 0) {
                recommendationPanel.innerHTML = `
                    <div class="recommendation-card">
                        <h3>Gợi ý đúng với ${petLabel}: ${product.name}</h3>
                        <p>Bạn đã chém <strong>${count} túi</strong> của dòng này trong ván vừa rồi.</p>
                        <p>${product.intro}</p>
                        <div class="marketplace-buttons">
                            <a class="marketplace-link shopee" href="${product.shopeeUrl}" target="_blank" rel="noopener">Mua trên Shopee</a>
                            <a class="marketplace-link tiktok" href="${product.tiktokUrl}" target="_blank" rel="noopener">Mua trên TikTok Shop</a>
                        </div>
                    </div>`;
            } else {
                recommendationPanel.innerHTML = `<div class="recommendation-card"><h3>Chưa đủ dữ liệu gợi ý</h3><p>Ván này bạn chưa chém đủ túi hạt dành cho ${petLabel}. Chơi thêm một ván nữa là có gợi ý chuẩn hơn.</p></div>`;
            }

            if (!resultSubmitted) {
                resultSubmitted = true;
                await persistCurrentResult(product || null);
            }
        }

        function resetGame() {
            document.getElementById('game-over-screen').classList.add('hidden');
            recommendationPanel.innerHTML = '';
            updateSaveStatus('');
            startGame();
        }

        function backToStart() {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            gameRunning = false;
            document.getElementById('game-over-screen').classList.add('hidden');
            document.getElementById('hud').style.display = 'none';
            recommendationPanel.innerHTML = '';
            updateSaveStatus('');
            document.getElementById('start-screen').classList.remove('hidden');
            const { fullNameInput } = getPlayerFormElements();
            if (fullNameInput) fullNameInput.focus();
        }

        ['player-full-name', 'player-email', 'player-phone'].forEach((id) => {
            const input = document.getElementById(id);
            if (!input) return;
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    startGame();
                }
            });
        });

        window.addEventListener('load', () => {
            const { fullNameInput } = getPlayerFormElements();
            if (fullNameInput) fullNameInput.focus();
            flushPendingResults().catch(error => {
                console.warn('Không gửi lại được dữ liệu chờ khi tải trang:', error);
            });
        });
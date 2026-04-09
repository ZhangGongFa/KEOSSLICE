
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const gameContainer = document.getElementById('game-container');
        const petAvatar = document.getElementById('pet-avatar');
        const comboDisplay = document.getElementById('combo-display');
        const recommendationPanel = document.getElementById('recommendation-panel');
        const centerLogoImage = document.getElementById('img-keos-logo');
        const saveStatusEl = document.getElementById('save-status');
        const startScreen = document.getElementById('start-screen');
        const startScreenShell = document.querySelector('#start-screen .screen-shell');
        const bgMusic = document.getElementById('bg-music');
        const GAME_ASPECT_RATIO = 16 / 9;
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;

        function getViewportMetrics() {
            const viewport = window.visualViewport;
            return {
                width: Math.max(320, Math.round(viewport ? viewport.width : window.innerWidth)),
                height: Math.max(240, Math.round(viewport ? viewport.height : window.innerHeight))
            };
        }

        function syncViewportCssVars(viewportWidth, viewportHeight) {
            document.documentElement.style.setProperty('--app-width', viewportWidth + 'px');
            document.documentElement.style.setProperty('--app-height', viewportHeight + 'px');
        }

        function fitStartScreenLayout() {
            if (!startScreen || !startScreenShell || startScreen.classList.contains('hidden')) return;
            startScreenShell.style.transform = 'scale(1)';
            const availableWidth = Math.max(260, gameContainer.clientWidth - 28);
            const availableHeight = Math.max(220, gameContainer.clientHeight - 28);
            const shellWidth = startScreenShell.offsetWidth;
            const shellHeight = startScreenShell.offsetHeight;
            if (!shellWidth || !shellHeight) return;
            const scale = Math.min(1, availableWidth / shellWidth, availableHeight / shellHeight);
            startScreenShell.style.transform = `scale(${scale})`;
        }

        function scheduleStartScreenFit() {
            requestAnimationFrame(() => requestAnimationFrame(fitStartScreenLayout));
        }

        function resizeCanvas() {
            const { width: viewportWidth, height: viewportHeight } = getViewportMetrics();
            syncViewportCssVars(viewportWidth, viewportHeight);

            const gameWidth = viewportWidth;
            const gameHeight = viewportHeight;

            gameContainer.style.width = gameWidth + 'px';
            gameContainer.style.height = gameHeight + 'px';
            canvas.style.width = gameWidth + 'px';
            canvas.style.height = gameHeight + 'px';
            canvas.width = gameWidth;
            canvas.height = gameHeight;
            scheduleStartScreenFit();
        }
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('orientationchange', resizeCanvas);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', resizeCanvas);
        }
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
        
        let bags = [], bagHalves = [], seeds = [], particles = [], sliceTrail = [], pendingSpawns = [];
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

        function clamp(value, min, max) {
            return Math.min(max, Math.max(min, value));
        }

        function randomBetween(min, max) {
            return min + Math.random() * (max - min);
        }

        function randomInt(min, max) {
            return Math.floor(randomBetween(min, max + 1));
        }

        function shuffleArray(items) {
            for (let i = items.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [items[i], items[j]] = [items[j], items[i]];
            }
            return items;
        }

        function average(values) {
            if (!values.length) return 0;
            return values.reduce((sum, value) => sum + value, 0) / values.length;
        }

        const DIFFICULTY_TIERS = [
            {
                maxScore: 9,
                label: 'Nhanh tay',
                spawnRate: 1.02,
                foodCountMin: 2,
                foodCountMax: 3,
                bagScale: 0.90,
                minHorizontalTravel: 0.20,
                centerSpread: 0.18,
                waveDelayStep: 0.082,
                foodApexMin: 0.26,
                foodApexMax: 0.36,
                bombApexMin: 0.22,
                bombApexMax: 0.30,
                foodGravityMin: 1.34,
                foodGravityMax: 1.46,
                bombGravityMin: 1.48,
                bombGravityMax: 1.62,
                bombChance: 0.04,
                bombDelayMin: 0.34,
                bombDelayMax: 0.46,
                foodCurve: 0.014,
                bombCurve: 0.034,
                bombTargetOffset: 0.20,
                bombSizeScale: 0.96
            },
            {
                maxScore: 24,
                label: 'Tăng tốc',
                spawnRate: 0.90,
                foodCountMin: 2,
                foodCountMax: 4,
                bagScale: 0.86,
                minHorizontalTravel: 0.22,
                centerSpread: 0.20,
                waveDelayStep: 0.070,
                foodApexMin: 0.23,
                foodApexMax: 0.33,
                bombApexMin: 0.19,
                bombApexMax: 0.28,
                foodGravityMin: 1.46,
                foodGravityMax: 1.60,
                bombGravityMin: 1.60,
                bombGravityMax: 1.76,
                bombChance: 0.06,
                bombDelayMin: 0.30,
                bombDelayMax: 0.40,
                foodCurve: 0.016,
                bombCurve: 0.037,
                bombTargetOffset: 0.22,
                bombSizeScale: 0.95
            },
            {
                maxScore: 44,
                label: 'Khó',
                spawnRate: 0.78,
                foodCountMin: 3,
                foodCountMax: 4,
                bagScale: 0.82,
                minHorizontalTravel: 0.24,
                centerSpread: 0.22,
                waveDelayStep: 0.062,
                foodApexMin: 0.19,
                foodApexMax: 0.30,
                bombApexMin: 0.17,
                bombApexMax: 0.24,
                foodGravityMin: 1.58,
                foodGravityMax: 1.74,
                bombGravityMin: 1.76,
                bombGravityMax: 1.94,
                bombChance: 0.09,
                bombDelayMin: 0.26,
                bombDelayMax: 0.36,
                foodCurve: 0.018,
                bombCurve: 0.040,
                bombTargetOffset: 0.23,
                bombSizeScale: 0.93
            },
            {
                maxScore: 69,
                label: 'Rất khó',
                spawnRate: 0.66,
                foodCountMin: 3,
                foodCountMax: 5,
                bagScale: 0.78,
                minHorizontalTravel: 0.26,
                centerSpread: 0.23,
                waveDelayStep: 0.055,
                foodApexMin: 0.16,
                foodApexMax: 0.26,
                bombApexMin: 0.14,
                bombApexMax: 0.22,
                foodGravityMin: 1.74,
                foodGravityMax: 1.92,
                bombGravityMin: 1.94,
                bombGravityMax: 2.14,
                bombChance: 0.12,
                bombDelayMin: 0.22,
                bombDelayMax: 0.30,
                foodCurve: 0.020,
                bombCurve: 0.043,
                bombTargetOffset: 0.25,
                bombSizeScale: 0.91
            },
            {
                maxScore: Number.POSITIVE_INFINITY,
                label: 'Siêu khó',
                spawnRate: 0.54,
                foodCountMin: 4,
                foodCountMax: 6,
                bagScale: 0.74,
                minHorizontalTravel: 0.28,
                centerSpread: 0.24,
                waveDelayStep: 0.048,
                foodApexMin: 0.13,
                foodApexMax: 0.22,
                bombApexMin: 0.12,
                bombApexMax: 0.18,
                foodGravityMin: 1.92,
                foodGravityMax: 2.14,
                bombGravityMin: 2.10,
                bombGravityMax: 2.34,
                bombChance: 0.16,
                bombDelayMin: 0.18,
                bombDelayMax: 0.26,
                foodCurve: 0.022,
                bombCurve: 0.046,
                bombTargetOffset: 0.27,
                bombSizeScale: 0.90
            }
        ];

        const BOTTOM_LAUNCH_ANCHORS = [0.05, 0.14, 0.25, 0.36, 0.47, 0.58, 0.69, 0.80, 0.91, 0.97];

        function getDifficultyTier(currentScore = score) {
            return DIFFICULTY_TIERS.find(tier => currentScore <= tier.maxScore) || DIFFICULTY_TIERS[DIFFICULTY_TIERS.length - 1];
        }

        function getCanvasPointFromEvent(event) {
            const source = event.touches ? event.touches[0] : event;
            const rect = canvas.getBoundingClientRect();
            return {
                x: (source.clientX - rect.left) * (canvas.width / rect.width),
                y: (source.clientY - rect.top) * (canvas.height / rect.height)
            };
        }

        class Bag {
            constructor({
                forcedType = null,
                difficulty = getDifficultyTier(score),
                launchXNorm = 0.5,
                targetXNorm = 0.5,
                apexYNorm = 0.24,
                curveBias = 1
            } = {}) {
                this.isBomb = forcedType === 'bomb'
                    ? true
                    : forcedType === 'food'
                        ? false
                        : Math.random() < difficulty.bombChance;

                if (this.isBomb) {
                    this.img = negativeImages[Math.floor(Math.random() * negativeImages.length)];
                    this.productId = null;
                } else {
                    const prod = randomProductForSelectedPet();
                    this.img = prod.img;
                    this.productId = prod.id;
                }

                const shortSide = Math.min(canvas.width, canvas.height);
                const sizeScale = difficulty.bagScale * (this.isBomb ? difficulty.bombSizeScale : 1);
                const baseWidth = shortSide * (isTouchDevice ? 0.165 : 0.145) * sizeScale;
                this.width = clamp(baseWidth, isTouchDevice ? 64 : 70, isTouchDevice ? 116 : 124);
                this.height = this.width * 1.38;

                const startX = clamp(canvas.width * launchXNorm, this.width * 0.55, canvas.width - this.width * 0.55);
                const startY = canvas.height + this.height * randomBetween(0.10, 0.20);
                const apexY = clamp(canvas.height * apexYNorm, canvas.height * 0.12, canvas.height * 0.60);
                const targetX = clamp(canvas.width * targetXNorm, this.width * 0.60, canvas.width - this.width * 0.60);

                this.x = startX;
                this.y = startY;

                const gravityMin = this.isBomb ? difficulty.bombGravityMin : difficulty.foodGravityMin;
                const gravityMax = this.isBomb ? difficulty.bombGravityMax : difficulty.foodGravityMax;
                this.gravity = canvas.height * randomBetween(gravityMin, gravityMax);

                const heightToApex = Math.max(this.height * 1.2, this.y - apexY);
                this.vy = -Math.sqrt(2 * this.gravity * heightToApex);
                const timeToApex = Math.max(0.28, -this.vy / this.gravity);
                this.vx = clamp((targetX - startX) / timeToApex, -canvas.width * 1.2, canvas.width * 1.2);

                const movementDirection = Math.sign(targetX - startX) || (startX < canvas.width / 2 ? 1 : -1);
                const curveVelocity = canvas.width * (this.isBomb ? difficulty.bombCurve : difficulty.foodCurve);
                this.curveVelocity = curveVelocity * (curveBias || movementDirection);
                this.curveSpeed = this.isBomb ? randomBetween(1.8, 2.5) : randomBetween(1.1, 1.8);
                this.curvePhase = Math.random() * Math.PI * 2;
                this.warningPulseOffset = Math.random() * 1000;
                this.rotSpeed = (Math.random() - 0.5) * (this.isBomb ? 8.2 : 6.2);
                this.travelTime = 0;
                this.angle = 0;
                this.dead = false;
            }

            update(dt) {
                this.travelTime += dt;
                this.vy += this.gravity * dt;
                this.x += this.vx * dt;
                this.y += this.vy * dt;
                this.x += Math.sin(this.travelTime * this.curveSpeed + this.curvePhase) * this.curveVelocity * dt;
                this.angle += this.rotSpeed * dt;
                if (this.y > canvas.height + this.height && !this.dead) {
                    this.dead = true;
                    if (!this.isBomb) {
                        loseLife();
                        triggerFlash('#ff0000', 0.3);
                    }
                }
            }

            draw() {
                if (this.dead) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                if (this.isBomb) {
                    const pulse = 0.78 + Math.sin((performance.now() + this.warningPulseOffset) / 100) * 0.18;
                    ctx.shadowColor = '#ff3b30';
                    ctx.shadowBlur = 26;
                    ctx.globalAlpha = pulse;
                } else {
                    ctx.shadowColor = 'rgba(255, 183, 77, 0.5)';
                    ctx.shadowBlur = 10;
                }

                if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
                    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
                } else {
                    ctx.fillStyle = this.isBomb ? '#ff0000' : '#ffb74d';
                    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                }

                if (this.isBomb) {
                    ctx.globalAlpha = 1;
                    ctx.lineWidth = Math.max(4, this.width * 0.055);
                    ctx.strokeStyle = 'rgba(255, 128, 128, 0.95)';
                    ctx.beginPath();
                    ctx.arc(0, 0, this.width * 0.54, 0, Math.PI * 2);
                    ctx.stroke();

                    const labelY = this.height * 0.36;
                    const labelW = Math.max(42, this.width * 0.54);
                    const labelH = Math.max(20, this.width * 0.18);
                    ctx.fillStyle = 'rgba(120, 0, 0, 0.82)';
                    ctx.beginPath();
                    if (typeof ctx.roundRect === 'function') {
                        ctx.roundRect(-labelW / 2, labelY - labelH / 2, labelW, labelH, 999);
                    } else {
                        ctx.rect(-labelW / 2, labelY - labelH / 2, labelW, labelH);
                    }
                    ctx.fill();
                    ctx.fillStyle = '#fff6f6';
                    ctx.font = `900 ${Math.max(12, Math.floor(this.width * 0.16))}px system-ui`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('BOM', 0, labelY + 0.5);
                }
                ctx.restore();
            }
        }

        class BagHalf {
            constructor(bag, isLeft) {
                this.img = bag.img;
                this.width = bag.width * 0.84;
                this.height = bag.height * 0.84;
                this.x = bag.x;
                this.y = bag.y;
                this.angle = bag.angle;
                this.isLeft = isLeft;
                this.opacity = 0.82;
                this.life = 0.72;
                this.dead = false;
                this.scale = 1;

                const splitSpeed = canvas.width * 0.07;
                this.vx = bag.vx * 0.10 + (isLeft ? -splitSpeed : splitSpeed);
                this.vy = Math.abs(bag.vy) * 0.08 + canvas.height * 0.03;
                this.gravity = bag.gravity * 1.35;
                this.rotSpeed = bag.rotSpeed * 0.55 + (isLeft ? -3.2 : 3.2);
            }
            update(dt) {
                this.vy += this.gravity * dt;
                this.x += this.vx * dt;
                this.y += this.vy * dt;
                this.angle += this.rotSpeed * dt;
                this.life -= dt * 1.42;
                this.opacity = clamp(this.life * 1.08, 0, 0.82);
                this.scale = 0.92 + this.opacity * 0.08;
                if (this.life <= 0 || this.y > canvas.height + this.height * 1.25) {
                    this.dead = true;
                }
            }
            draw() {
                if (this.dead || this.opacity <= 0) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.scale(this.scale, this.scale);
                ctx.globalAlpha = this.opacity;

                ctx.beginPath();
                if (this.isLeft) {
                    ctx.rect(-this.width / 2, -this.height / 2, this.width / 2, this.height);
                } else {
                    ctx.rect(0, -this.height / 2, this.width / 2, this.height);
                }
                ctx.clip();

                if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
                    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
                } else {
                    ctx.fillStyle = '#ffb74d';
                    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
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
                
                const avatarRect = petAvatar.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                this.targetX = (avatarRect.left + avatarRect.width / 2 - canvasRect.left) * (canvas.width / canvasRect.width);
                this.targetY = (avatarRect.top + avatarRect.height / 2 - canvasRect.top) * (canvas.height / canvasRect.height);
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
            const previousPoint = sliceTrail[sliceTrail.length - 1] || null;
            sliceTrail.push({x, y, time: performance.now()});
            if (sliceTrail.length > 12) sliceTrail.shift();
            if (previousPoint) {
                checkSliceSegment(previousPoint.x, previousPoint.y, x, y);
            } else {
                checkSliceSegment(x, y, x, y);
            }
        }

        function handleInputStart(e) {
            if (e.cancelable) e.preventDefault();
            isSwiping = true;
            sliceTrail = [];
            const point = getCanvasPointFromEvent(e);
            addTrailPoint(point.x, point.y);
        }
        function handleInputMove(e) {
            if (!isSwiping) return;
            if (e.cancelable) e.preventDefault();
            const point = getCanvasPointFromEvent(e);
            addTrailPoint(point.x, point.y);
        }
        function handleInputEnd() { isSwiping = false; }

        canvas.addEventListener('mousedown', handleInputStart);
        canvas.addEventListener('mousemove', handleInputMove);
        window.addEventListener('mouseup', handleInputEnd);
        canvas.addEventListener('mouseleave', handleInputEnd);
        canvas.addEventListener('touchstart', handleInputStart, {passive: false});
        canvas.addEventListener('touchmove', handleInputMove, {passive: false});
        window.addEventListener('touchend', handleInputEnd, {passive: true});
        window.addEventListener('touchcancel', handleInputEnd, {passive: true});

        function distancePointToSegment(px, py, x1, y1, x2, y2) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            if (dx === 0 && dy === 0) {
                return Math.hypot(px - x1, py - y1);
            }
            const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
            const clampedT = Math.max(0, Math.min(1, t));
            const closestX = x1 + clampedT * dx;
            const closestY = y1 + clampedT * dy;
            return Math.hypot(px - closestX, py - closestY);
        }

        function sliceBag(bag) {
            bag.dead = true;
            if (bag.isBomb) {
                playTone('bomb');
                loseLife();
                shakeTime = 0.4;
                triggerFlash('#ff0000', 0.8);
                for (let j = 0; j < 30; j++) particles.push(new Particle(bag.x, bag.y, '#333'));
                return;
            }

            playTone('slice');
            bagHalves.push(new BagHalf(bag, true), new BagHalf(bag, false));
            for (let j = 0; j < 15; j++) seeds.push(new HomingSeed(bag.x, bag.y, bag.productId));

            if (bag.productId) {
                caughtProductCounts[bag.productId] = (caughtProductCounts[bag.productId] || 0) + 1;
            }

            score++;
            recentSlices++;
            comboTimer = 0.5;
            document.getElementById('score-display').innerText = score;
        }

        function checkSliceSegment(x1, y1, x2, y2) {
            for (let i = bags.length - 1; i >= 0; i--) {
                const b = bags[i];
                if (b.dead) continue;
                const distance = distancePointToSegment(b.x, b.y, x1, y1, x2, y2);
                const hitRadius = b.width * (b.isBomb ? (isTouchDevice ? 0.52 : 0.46) : (isTouchDevice ? 0.66 : 0.58));
                if (distance < hitRadius) {
                    sliceBag(b);
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
            const shortSide = Math.min(canvas.width, canvas.height);
            const width = clamp(shortSide * (isTouchDevice ? 0.52 : 0.46), 210, 400);
            const height = width * ratio;
            const x = (canvas.width - width) / 2;
            const y = (canvas.height - height) / 2 - (height * 0.10);

            ctx.save();
            ctx.globalAlpha = 0.12;
            ctx.shadowColor = 'rgba(255,255,255,0.16)';
            ctx.shadowBlur = 18;
            ctx.drawImage(centerLogoImage, x, y, width, height);
            ctx.restore();
        }

        function buildWaveLaunchPositions(count) {
            const anchors = shuffleArray(BOTTOM_LAUNCH_ANCHORS.slice());
            const selected = anchors.slice(0, Math.min(count, anchors.length)).sort((a, b) => a - b);
            return selected.map((anchor) => clamp(anchor + randomBetween(-0.04, 0.04), 0.05, 0.95));
        }

        function buildFoodTargetXNorm(launchXNorm, index, count, difficulty) {
            const centeredOffset = (index - (count - 1) / 2) * difficulty.centerSpread;
            let target = 0.5 + centeredOffset + randomBetween(-0.025, 0.025);

            if (Math.abs(target - launchXNorm) < difficulty.minHorizontalTravel) {
                const pushDirection = launchXNorm < 0.5 ? 1 : -1;
                target = launchXNorm + pushDirection * (difficulty.minHorizontalTravel + randomBetween(0.03, 0.07));
            }

            if (launchXNorm < 0.22) {
                target = Math.max(target, 0.34 + randomBetween(0.0, 0.06));
            } else if (launchXNorm > 0.78) {
                target = Math.min(target, 0.66 - randomBetween(0.0, 0.06));
            }

            return clamp(target, 0.14, 0.86);
        }

        function buildBombTrajectory(difficulty, foodLaunches, foodTargets) {
            const avgFoodLaunch = average(foodLaunches.length ? foodLaunches : [0.5]);
            const avgFoodTarget = average(foodTargets.length ? foodTargets : [0.5]);
            const launchCandidates = BOTTOM_LAUNCH_ANCHORS
                .map((anchor) => ({ anchor, distance: Math.abs(anchor - avgFoodLaunch) }))
                .sort((a, b) => b.distance - a.distance);

            const launchXNorm = clamp(launchCandidates[0].anchor + randomBetween(-0.02, 0.02), 0.06, 0.94);
            let targetXNorm = 0.5 + (launchXNorm < 0.5 ? difficulty.bombTargetOffset : -difficulty.bombTargetOffset);
            targetXNorm += randomBetween(-0.03, 0.03);

            if (Math.abs(targetXNorm - avgFoodTarget) < 0.18) {
                targetXNorm += launchXNorm < 0.5 ? 0.16 : -0.16;
            }

            targetXNorm = clamp(targetXNorm, 0.14, 0.86);

            return {
                launchXNorm,
                targetXNorm,
                apexYNorm: randomBetween(difficulty.bombApexMin, difficulty.bombApexMax),
                curveBias: launchXNorm < 0.5 ? 1 : -1
            };
        }

        function buildWavePlan() {
            const difficulty = getDifficultyTier(score);
            const foodCount = randomInt(difficulty.foodCountMin, difficulty.foodCountMax);
            const launchPositions = buildWaveLaunchPositions(foodCount);
            const targetPositions = [];
            const plan = [];

            launchPositions.forEach((launchXNorm, index) => {
                const targetXNorm = buildFoodTargetXNorm(launchXNorm, index, foodCount, difficulty);
                targetPositions.push(targetXNorm);
                plan.push({
                    delay: index * difficulty.waveDelayStep + randomBetween(0, 0.03),
                    options: {
                        forcedType: 'food',
                        difficulty,
                        launchXNorm,
                        targetXNorm,
                        apexYNorm: randomBetween(difficulty.foodApexMin, difficulty.foodApexMax),
                        curveBias: launchXNorm < 0.5 ? 1 : -1
                    }
                });
            });

            if (Math.random() < difficulty.bombChance) {
                plan.push({
                    delay: randomBetween(difficulty.bombDelayMin, difficulty.bombDelayMax),
                    options: {
                        forcedType: 'bomb',
                        difficulty,
                        ...buildBombTrajectory(difficulty, launchPositions, targetPositions)
                    }
                });
            }

            return plan.sort((a, b) => a.delay - b.delay);
        }

        function enqueueWave() {
            pendingSpawns.push(...buildWavePlan());
        }

        function processPendingSpawns(dt) {
            for (let i = pendingSpawns.length - 1; i >= 0; i--) {
                pendingSpawns[i].delay -= dt;
                if (pendingSpawns[i].delay <= 0) {
                    bags.push(new Bag(pendingSpawns[i].options));
                    pendingSpawns.splice(i, 1);
                }
            }
        }

        function primeAudio() {
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume().catch(() => {});
            }
            if (bgMusic) {
                bgMusic.volume = 0.22;
                bgMusic.loop = true;
            }
        }

        async function startBackgroundMusic(restart = false) {
            if (!bgMusic) return;
            primeAudio();
            try {
                if (restart) {
                    bgMusic.currentTime = 0;
                }
                const playPromise = bgMusic.play();
                if (playPromise && typeof playPromise.then === 'function') {
                    await playPromise;
                }
            } catch (error) {
                console.warn('Không phát được nhạc nền:', error);
            }
        }

        function stopBackgroundMusic(reset = false) {
            if (!bgMusic) return;
            bgMusic.pause();
            if (reset) {
                try {
                    bgMusic.currentTime = 0;
                } catch (error) {
                    console.warn('Không tua lại được nhạc nền:', error);
                }
            }
        }

        if (bgMusic) {
            bgMusic.volume = 0.22;
            bgMusic.addEventListener('error', () => {
                console.warn('Không tải được bg_music.wav. Hãy chắc rằng file này đã được deploy cùng index.html.');
            });
        }

        ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
            window.addEventListener(eventName, primeAudio, { once: true, passive: eventName !== 'keydown' });
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopBackgroundMusic(false);
            } else if (gameRunning) {
                startBackgroundMusic(false);
            }
        });

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

            const currentDifficulty = getDifficultyTier(score);
            const spawnRate = currentDifficulty.spawnRate;
            spawnTimer += dt;
            while (spawnTimer >= spawnRate) {
                enqueueWave();
                spawnTimer -= spawnRate;
            }
            processPendingSpawns(dt);

            for (let i = bagHalves.length - 1; i >= 0; i--) {
                bagHalves[i].update(dt);
                if (bagHalves[i].dead) {
                    bagHalves.splice(i, 1);
                }
            }

            for (let i = bags.length - 1; i >= 0; i--) {
                bags[i].update(dt);
                if (bags[i].dead) {
                    bags.splice(i, 1);
                }
            }

            for (let i = seeds.length - 1; i >= 0; i--) {
                seeds[i].update(dt);
                if (seeds[i].dead || seeds[i].y > canvas.height + 300) {
                    seeds.splice(i, 1);
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update(dt);
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }

            bagHalves.forEach(item => item.draw());
            bags.forEach(item => item.draw());
            seeds.forEach(item => item.draw());
            particles.forEach(item => item.draw());

            ctx.restore(); 

            if (flashOpacity > 0) {
                ctx.fillStyle = flashColor; ctx.globalAlpha = flashOpacity;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1; flashOpacity -= dt * 2;
            }

            const now = performance.now();
            const trailLifetime = isTouchDevice ? 132 : 108;
            sliceTrail = sliceTrail.filter(p => now - p.time < trailLifetime);
            if (sliceTrail.length > 1) {
                ctx.beginPath(); ctx.moveTo(sliceTrail[0].x, sliceTrail[0].y);
                for (let i = 1; i < sliceTrail.length; i++) ctx.lineTo(sliceTrail[i].x, sliceTrail[i].y);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = isTouchDevice ? 8.5 : 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = isTouchDevice ? 20 : 16;
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

            primeAudio();
            startBackgroundMusic(true);

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
            pendingSpawns = [];
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
            stopBackgroundMusic(true);
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
            stopBackgroundMusic(true);
            document.getElementById('game-over-screen').classList.add('hidden');
            document.getElementById('hud').style.display = 'none';
            recommendationPanel.innerHTML = '';
            updateSaveStatus('');
            document.getElementById('start-screen').classList.remove('hidden');
            scheduleStartScreenFit();
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
            resizeCanvas();
            scheduleStartScreenFit();
            const { fullNameInput } = getPlayerFormElements();
            if (fullNameInput) fullNameInput.focus();
            flushPendingResults().catch(error => {
                console.warn('Không gửi lại được dữ liệu chờ khi tải trang:', error);
            });
        });

    
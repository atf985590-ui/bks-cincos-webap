// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const state = { 
        currentPage: 'profile', 
        user: { 
            username: '',
            email: '', 
            balance: 0.00, 
            vipLevel: 0, 
            depositPlan: 1 
        }, 
        vipPlans: [],
        withdrawalFeed: []
    };
    
    // --- DATA (نفس البيانات السابقة) ---
    state.navItems = [
        { page: 'profile', label: 'أنا', icon: 'fas fa-user' },
        { page: 'vip', label: 'VIP', icon: 'fas fa-crown' },
        { page: 'tasks', label: 'المهام', icon: 'fas fa-tasks' },
        { page: 'deposit', label: 'إيداع', icon: 'fas fa-wallet' },
        { page: 'withdraw', label: 'سحب', icon: 'fas fa-money-bill-wave' },
        { page: 'referral', label: 'الإحالات', icon: 'fas fa-user-friends' }
    ];
    state.depositAddresses = [
        { currency: 'USDT (TRC20)', address: 'TLsGeELYfexmuhK6g3TVQ44AAt5kxZN3gb', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
        { currency: 'BTC (Segwit)', address: 'bc1qlvx4tzwzvm66p0ukfykkv4zsqq7ywug65282u2', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
    ];
    state.withdrawMethods = [
        { name: 'USDT (TRC20)', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', fee: '1%' },
        { name: 'Bitcoin', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', fee: '1.5%' },
    ];
    (function generateVipPlans(){/* ... الكود كما هو ... */}());
    (function generateWithdrawalFeed(){/* ... الكود كما هو ... */}());

    // --- DOM Elements ---
    const mainContent = document.getElementById('main-content');
    const modalOverlay = document.getElementById('modal-overlay');
    const header = document.querySelector('header');
    
    // -- Login Form Inputs ---
    const loginUsernameInput = document.getElementById('login-username');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');


    // --- RENDERING ENGINE (الكود كما هو) ---
    const render = () => { /* ... الكود كما هو ... */ };
    const pageTemplates = { /* ... الكود كما هو ... */ };

    // --- ACTIONS & LOGIC ---
    const handleAction = (action, data) => {
        switch (action) {
            case 'login':
                // تم تبسيط التحقق هنا لأننا نتحقق منه قبل استدعاء الدالة
                const username = loginUsernameInput.value;
                const email = loginEmailInput.value;
                
                // التأكد من أننا لم نسجل الدخول بالفعل لتجنب التشغيل المتعدد
                if (!document.getElementById('main-app').classList.contains('active')) {
                    state.user.username = username;
                    state.user.email = email;
                    
                    document.getElementById('login-screen').classList.remove('active');
                    document.getElementById('main-app').classList.add('active');
                    render();
                }
                break;
            // ... باقي الحالات كما هي
            case 'navigate': 
                state.currentPage = data.page; 
                render(); 
                break;
            case 'copy': 
                navigator.clipboard.writeText(data.copy).then(() => { 
                    alert('تم النسخ بنجاح!'); 
                }); 
                break;
            case 'select-vip-for-deposit':
                state.user.depositPlan = parseInt(data.level);
                state.currentPage = 'deposit';
                render();
                break;
            case 'confirm-deposit':
                modalOverlay.innerHTML = `
                    <div class="modal-content" style="text-align:center;">
                        <button class="modal-close" data-action="close-modal">&times;</button>
                        <h3>تم استلام طلبك</h3>
                        <p>طلب الإيداع الخاص بك قيد المراجعة. قد يستغرق الأمر من 3 دقائق إلى 24 ساعة.</p>
                        <button class="btn" data-action="close-modal" style="margin-top: 20px;">موافق</button>
                    </div>`;
                modalOverlay.style.display = 'flex';
                break;
            case 'show-withdraw-modal':
                const method = JSON.parse(data.method);
                modalOverlay.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close" data-action="close-modal">&times;</button>
                        <h3>سحب عبر ${method.name}</h3>
                        <input type="text" id="withdraw-address" placeholder="عنوان المحفظة">
                        <input type="number" id="withdraw-amount" placeholder="المبلغ" min="10" step="0.01">
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: -10px;">الحد الأدنى للسحب: 10$</p>
                        <div class="modal-buttons">
                            <button class="btn" data-action="process-withdrawal" style="flex: 1;">تأكيد</button>
                            <button class="btn" data-action="close-modal" style="background:grey; flex: 1;">إلغاء</button>
                        </div>
                    </div>`;
                modalOverlay.style.display = 'flex';
                break;
            case 'close-modal': 
                modalOverlay.style.display = 'none'; 
                break;
        }
    };
    
    // --- WITHDRAWAL FEED ANIMATION (الكود كما هو) ---
    let feedIndex = 0;
    let feedInterval;
    const startWithdrawalFeed = () => { /* ... الكود كما هو ... */ };
    
    // --- EVENT LISTENERS ---
    document.body.addEventListener('click', (e) => {
        // ... كود تأثير النقر والأزرار الأخرى كما هو

        // تم تعديل هذا الجزء للتعامل مع زر تسجيل الدخول كخيار احتياطي
        if (e.target.id === 'login-btn') {
            const username = loginUsernameInput.value;
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            if (!username) return alert('الرجاء إدخال اسم المستخدم');
            if (!email.includes('@')) return alert('الرجاء إدخال بريد إلكتروني صالح');
            if (password.length < 6) return alert('كلمة المرور قصيرة جدًا');
            
            handleAction('login');
        } 
        
        // ... باقي مستمعي الأحداث كما هم
    });

    // =================================================================
    // ============== تعديل جديد: تسجيل الدخول التلقائي ==============
    // =================================================================
    
    /**
     * @description دالة تتحقق من مدخلات تسجيل الدخول وتقوم بالدخول تلقائيًا
     */
    const attemptAutoLogin = () => {
        const username = loginUsernameInput.value;
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        // التحقق من أن جميع الحقول مملوءة وتفي بالحد الأدنى من المتطلبات
        // 1. الاسم غير فارغ
        // 2. البريد الإلكتروني يحتوي على '@'
        // 3. كلمة المرور 6 أحرف على الأقل
        if (username.trim().length > 0 && email.includes('@') && password.length >= 6) {
            // استدعاء دالة تسجيل الدخول
            handleAction('login');
        }
    };

    // إضافة مستمع الأحداث لكل حقل من حقول الإدخال
    // سيتم تشغيل الدالة مع كل حرف يكتبه المستخدم
    loginUsernameInput.addEventListener('input', attemptAutoLogin);
    loginEmailInput.addEventListener('input', attemptAutoLogin);
    loginPasswordInput.addEventListener('input', attemptAutoLogin);
    
    // =================================================================
    // ====================== نهاية التعديل الجديد ======================
    // =================================================================

    // Handle deposit plan selector change (الكود كما هو)
    document.body.addEventListener('change', (e) => {
        if (e.target.id === 'deposit-plan-selector') {
            state.user.depositPlan = parseInt(e.target.value);
            render();
        }
    });

    // --- INITIALIZATION (الكود كما هو) ---
});

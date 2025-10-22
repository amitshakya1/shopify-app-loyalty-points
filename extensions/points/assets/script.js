// Configuration
const BASE_URL = 'https://api-thepannashop.kartlog.in/v1';

// State management
let appState = {
    currentView: 'home',
    phoneNumber: '',
    countryCode: '+91',
    isVerified: false,
    isCustomer: false,
    discountCodes: [],
    resendTimer: 0,
    resendInterval: null,
    amount: 0,
    name: '',
    email: '',
};

// DOM Elements
const btn = document.getElementById('lyBtn');
const overlay = document.getElementById('lyOverlay');
const closeBtn = document.getElementById('lyClose');
const dashCloseBtn = document.getElementById('lyDashClose');
const options = document.querySelectorAll('.ly-option');
const views = document.querySelectorAll('.ly-view');
const backBtns = document.querySelectorAll('[data-back]');
const authTriggers = document.querySelectorAll('.ly-auth-trigger');

// Utility Functions
function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('ly-toast--show');
    setTimeout(() => {
        toast.classList.remove('ly-toast--show');
    }, duration);
}

function showView(viewName) {
    views.forEach((v) => v.classList.remove('ly-active'));
    document.querySelector(`.ly-view-${viewName}`).classList.add('ly-active');
    appState.currentView = viewName;
    saveToLocalStorage();
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(elementId) {
    showError(elementId, '');
}

function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
        return { isValid: false, message: 'Phone number is required' };
    }
    if (cleanPhone.length < 10) {
        return { isValid: false, message: 'Phone number must be at least 10 digits' };
    }
    if (cleanPhone.length > 14) {
        return { isValid: false, message: 'Phone number must be less than 15 digits' };
    }
    return { isValid: true, message: '' };
}

function validateOTP(otp) {
    if (!otp || otp.length !== 4) {
        return { isValid: false, message: 'Please enter a 4-digit code' };
    }
    if (!/^\d{4}$/.test(otp)) {
        return { isValid: false, message: 'Code must contain only numbers' };
    }
    return { isValid: true, message: '' };
}

function maskPhone(phone) {
    const countryCode = appState.countryCode;
    const number = phone;
    if (number.length >= 4) {
        const masked = number.slice(0, 2) + '*'.repeat(number.length - 4) + number.slice(-2);
        return `${countryCode}-${masked}`;
    }
    return `${countryCode}-${number}`;
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

function isExpired(expiresAt) {
    const today = new Date();
    const expiryDate = new Date(expiresAt);
    return expiryDate < today;
}

// Drawer Management
btn.addEventListener('click', () => {
    overlay.classList.add('ly-show');
    checkAuth();
});

closeBtn.addEventListener('click', () => overlay.classList.remove('ly-show'));
if (dashCloseBtn) {
    dashCloseBtn.addEventListener('click', () => overlay.classList.remove('ly-show'));
}

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('ly-show');
});

// View Navigation
options.forEach((opt) => {
    opt.addEventListener('click', () => {
        const target = opt.getAttribute('data-view');
        showView(target);
    });
});

backBtns.forEach((b) =>
    b.addEventListener('click', () => {
        const targetView = b.getAttribute('data-view');
        if (targetView) {
            showView(targetView);
        } else {
            showView('home');
        }
    })
);

// Auth Triggers
authTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        showView('phone');
    });
});

// Phone Form Handler
const phoneForm = document.getElementById('phone-form');
const phoneInput = document.getElementById('phone-number');

phoneForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    clearError('phone-error');
    phoneInput.classList.remove('ly-input--error');

    const validation = validatePhone(phone);
    if (!validation.isValid) {
        showError('phone-error', validation.message);
        phoneInput.classList.add('ly-input--error');
        return;
    }

    const submitBtn = phoneForm.querySelector('button[type="submit"]');
    const formdata = new FormData();
    formdata.append('countryCode', appState.countryCode);
    formdata.append('phone', phone);

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const response = await fetch(`${BASE_URL}/send-otp`, {
            method: 'POST',
            body: formdata,
        });

        if (response.ok) {
            appState.phoneNumber = phone;
            document.getElementById('phone-display').textContent = maskPhone(phone);
            showView('otp');
            document.getElementById('otp-1').focus();
            startResendTimer();
            showToast('OTP sent successfully!');
        } else {
            showError('phone-error', 'Failed to send OTP. Please try again.');
        }
    } catch (error) {
        showError('phone-error', 'Failed to send OTP. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send OTP';
    }
});

phoneInput.addEventListener('input', (e) => {
    const value = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
    e.target.value = value;
    if (phoneInput.classList.contains('ly-input--error')) {
        clearError('phone-error');
        phoneInput.classList.remove('ly-input--error');
    }
});

// OTP Form Handler
const otpForm = document.getElementById('otp-form');
const otpInputs = document.querySelectorAll('.ly-otp-input');
const resendBtn = document.getElementById('resend-btn');

otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;

        otpInputs.forEach((inp) => inp.classList.remove('ly-otp-input--error'));
        clearError('otp-error');

        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            otpInputs[index - 1].focus();
        }
        if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '');
        if (paste.length === 4) {
            for (let i = 0; i < 4; i++) {
                if (otpInputs[i]) {
                    otpInputs[i].value = paste[i] || '';
                }
            }
            otpInputs[3].focus();
        }
    });
});

otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const otp = Array.from(otpInputs)
        .map((input) => input.value)
        .join('');
    otpInputs.forEach((input) => input.classList.remove('ly-otp-input--error'));
    clearError('otp-error');

    const validation = validateOTP(otp);
    if (!validation.isValid) {
        showError('otp-error', validation.message);
        otpInputs.forEach((input) => input.classList.add('ly-otp-input--error'));
        return;
    }

    const submitBtn = otpForm.querySelector('button[type="submit"]');
    const formdata = new FormData();
    formdata.append('countryCode', appState.countryCode);
    formdata.append('phone', appState.phoneNumber);
    formdata.append('otp', otp);

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying...';

        const response = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            body: formdata,
        });

        const data = await response.json();

        if (response.ok) {
            appState.isVerified = true;
            appState.discountCodes = data.data.discounts;
            appState.isCustomer = data.data.user.is_customer;
            appState.amount = data.data.user.amount;
            appState.name = data.data.user.name;
            appState.email = data.data.user.email;

            document.getElementById('name').value = appState.name || '';
            document.getElementById('email').value = appState.email || '';

            if (appState.isCustomer) {
                showView('dashboard');
                initializeDashboard();
            } else {
                showView('profile');
            }
            showToast('Phone verified successfully!');
        } else {
            showError('otp-error', 'Oops! OTP entered is not valid.');
        }
    } catch (error) {
        showError('otp-error', 'Oops! OTP entered is not valid.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verify OTP';
    }
});

resendBtn.addEventListener('click', async () => {
    const formdata = new FormData();
    formdata.append('countryCode', appState.countryCode);
    formdata.append('phone', appState.phoneNumber);

    try {
        resendBtn.disabled = true;
        resendBtn.textContent = 'Sending...';

        const response = await fetch(`${BASE_URL}/send-otp`, {
            method: 'POST',
            body: formdata,
        });

        if (response.ok) {
            showToast('OTP re-sent!');
            startResendTimer();
        } else {
            showToast('Failed to resend OTP');
        }
    } catch (error) {
        showToast('Failed to resend OTP');
    } finally {
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend OTP';
    }
});

function startResendTimer() {
    appState.resendTimer = 30;
    updateResendButton();

    appState.resendInterval = setInterval(() => {
        appState.resendTimer--;
        updateResendButton();

        if (appState.resendTimer <= 0) {
            clearInterval(appState.resendInterval);
            appState.resendInterval = null;
        }
    }, 1000);
}

function updateResendButton() {
    const timerElement = document.getElementById('timer');

    if (appState.resendTimer > 0) {
        resendBtn.disabled = true;
        resendBtn.textContent = `Resend OTP (${appState.resendTimer}s)`;
        timerElement.textContent = `You can request a new OTP in ${appState.resendTimer} seconds`;
    } else {
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend OTP';
        timerElement.textContent = '';
    }
}

// Profile Form Handler
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    clearError('name-error');
    clearError('email-error');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    let hasError = false;
    if (!name) {
        showError('name-error', 'Name is required');
        hasError = true;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email-error', 'Valid email is required');
        hasError = true;
    }

    if (hasError) return;

    const submitBtn = profileForm.querySelector("button[type='submit']");
    const formdata = new FormData();
    formdata.append('phone', appState.phoneNumber);
    formdata.append('name', name);
    formdata.append('email', email);

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';

        const response = await fetch(`${BASE_URL}/update-profile`, {
            method: 'POST',
            body: formdata,
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Profile updated successfully!');
            appState.discountCodes = data.data.discounts;
            appState.isCustomer = data.data.user.is_customer;
            appState.amount = data.data.user.amount;
            appState.name = data.data.user.name;
            appState.email = data.data.user.email;
            showView('dashboard');
            initializeDashboard();
        } else {
            if (data?.message) {
                showError('email-error', data.message);
            } else {
                showError('email-error', 'Failed to update profile. Try again.');
            }
        }
    } catch (error) {
        showError('email-error', 'Failed to update profile. Try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Profile';
    }
});

// Discount Form Handler
const discountForm = document.getElementById('discount-form');
const amountInput = document.getElementById('amount');

amountInput.addEventListener('keyup', function () {
    const maxAmount = appState.amount || 0;
    let value = parseInt(this.value, 10);
    if (!isNaN(value) && value > maxAmount) {
        this.value = maxAmount;
    }
});

discountForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    clearError('amount-error');
    const amount = amountInput.value.trim();

    let hasError = false;
    if (!amount) {
        showError('amount-error', 'Please enter amount.');
        hasError = true;
    }
    if (parseInt(amount) < 100) {
        showError('amount-error', 'Amount must be greater than ₹100');
        hasError = true;
    }

    if (hasError) return;

    const submitBtn = discountForm.querySelector("button[type='submit']");
    const formdata = new FormData();
    formdata.append('phone', appState.phoneNumber);
    formdata.append('amount', amount);

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating...';

        const response = await fetch(`${BASE_URL}/create-discount`, {
            method: 'POST',
            body: formdata,
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Discount created successfully!');
            appState.discountCodes = data.data.discounts;
            appState.amount = data.data.user.amount;
            amountInput.value = '';
            initializeDashboard();
        } else {
            if (data?.message) {
                showError('amount-error', data.message);
            } else {
                showError('amount-error', 'Failed to create discount. Try again.');
            }
        }
    } catch (error) {
        showError('amount-error', 'Failed to create discount. Try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Discount Code';
    }
});

// Dashboard Functions
function initializeDashboard() {
    document.getElementById('user-name').textContent = appState.name || 'User';
    document.getElementById('user-rewards').textContent = `₹${appState.amount || 0}`;
    renderCodesTable();
}

function renderCodesTable(codes = appState.discountCodes) {
    const container = document.getElementById('codes-table');
    const emptyState = document.getElementById('empty-state');

    if (!codes || codes.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const codesHTML = codes
        .map(
            (code) => `
    <div class="ly-code-card ${isExpired(code.expiresAt) ? 'ly-expired' : ''}">
      <div class="ly-code-info">
        <div class="ly-code-text">${code.code}</div>
        <div class="ly-code-expiry">
          ${isExpired(code.expiresAt) ? 'Expired on' : 'Expires on'}: ${formatDateTime(code.expiresAt)}
        </div>
      </div>
      <button class="ly-copy-btn" onclick="copyCode('${code.code}')" ${isExpired(code.expiresAt) ? 'disabled' : ''}>
        Copy
      </button>
    </div>
  `
        )
        .join('');

    container.innerHTML = `<div class="ly-codes-list">${codesHTML}</div>`;
}

window.copyCode = async function (code) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(code);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = code;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        showToast(`Copied ${code}!`);
    } catch (error) {
        showToast('Failed to copy code');
    }
};

// Logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    appState = {
        currentView: 'home',
        phoneNumber: '',
        countryCode: '+91',
        isVerified: false,
        isCustomer: false,
        discountCodes: [],
        resendTimer: 0,
        resendInterval: null,
        amount: 0,
        name: '',
        email: '',
    };

    phoneInput.value = '';
    nameInput.value = '';
    emailInput.value = '';
    amountInput.value = '';
    otpInputs.forEach((input) => (input.value = ''));

    clearError('phone-error');
    clearError('otp-error');
    clearError('name-error');
    clearError('email-error');
    clearError('amount-error');

    localStorage.removeItem('loyaltyAppState');

    if (appState.resendInterval) {
        clearInterval(appState.resendInterval);
    }

    showView('home');
    showToast('Logged out successfully');
});

// Local Storage
function saveToLocalStorage() {
    try {
        const stateToSave = {
            phoneNumber: appState.phoneNumber,
            countryCode: appState.countryCode,
            isVerified: appState.isVerified,
            isCustomer: appState.isCustomer,
            discountCodes: appState.discountCodes,
            currentView: appState.currentView,
            amount: appState.amount,
            name: appState.name,
            email: appState.email,
        };
        localStorage.setItem('loyaltyAppState', JSON.stringify(stateToSave));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

async function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('loyaltyAppState');
        if (saved) {
            const parsedState = JSON.parse(saved);
            if (parsedState.isVerified && parsedState.phoneNumber) {
                appState.phoneNumber = parsedState.phoneNumber;
                const formdata = new FormData();
                formdata.append('phone', appState.phoneNumber);

                try {
                    const response = await fetch(`${BASE_URL}/get-discounts`, {
                        method: 'POST',
                        body: formdata,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        appState.countryCode = parsedState.countryCode;
                        appState.isVerified = parsedState.isVerified;
                        appState.discountCodes = data.data.discounts;
                        appState.isCustomer = data.data.user.is_customer;
                        appState.amount = data.data.user.amount;
                        appState.name = data.data.user.name;
                        appState.email = data.data.user.email;
                        if (appState.isCustomer) {
                            showView('dashboard');
                            initializeDashboard();
                        } else {
                            showView('profile');
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch discounts:', error);
                }
                return true;
            }
        }
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
    }
    return false;
}

function checkAuth() {
    if (appState.isVerified && appState.isCustomer) {
        showView('dashboard');
        initializeDashboard();
    }
}

// Initialize on page load
loadFromLocalStorage();

// Save state before unload
window.addEventListener('beforeunload', () => {
    saveToLocalStorage();
});

// Social Media Popup Handler
function openSocialPopup(url, platform, callback) {
    const popupWidth = 600;
    const popupHeight = 700;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;

    const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    const popupWindow = window.open(url, `${platform}Popup`, popupFeatures);

    // Poll to detect when popup is closed
    const pollTimer = setInterval(() => {
        if (popupWindow.closed) {
            clearInterval(pollTimer);
            if (callback) callback();
        }
    }, 500);

    // Focus the popup window
    if (popupWindow) popupWindow.focus();
}

// Initialize social media action handlers
document.addEventListener('DOMContentLoaded', () => {
    const socialActions = document.querySelectorAll('.ly-social-action');

    socialActions.forEach((action) => {
        action.addEventListener('click', function () {
            const platform = this.dataset.platform;
            const url = this.dataset.url;
            const points = this.dataset.points;

            const messages = {
                youtube: `Thanks for subscribing! 🎉 You've earned ${points} points.`,
                linkedin: `Thanks for following on LinkedIn! 💼 You've earned ${points} points.`,
                facebook: `Thanks for following on Facebook! 👍 You've earned ${points} points.`,
                instagram: `Thanks for following on Instagram! 📸 You've earned ${points} points.`,
            };

            openSocialPopup(url, platform, () => {
                // Show toast notification
                if (typeof showToast === 'function') {
                    showToast(messages[platform] || `Thanks for connecting! You've earned ${points} points.`);
                }

                // Here you can add API call to award points
                console.log(`User completed ${platform} action - Award ${points} points`);
            });
        });
    });
});
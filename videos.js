// ==================== صفحة الفيديوهات - الوظائف المخصصة ====================
// تشغيل الكود عند تحميل صفحة HTML بشكل كامل

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== زر العودة للصفحة السابقة ==========
    // اختيار أيقونة الرجوع
    const backIcon = document.getElementById('back-icon');
    
    if (backIcon) {
        // إضافة حدث click للرجوع للصفحة السابقة
        backIcon.addEventListener('click', () => {
            window.history.back();
        });
    }

    // ========== وظائف السلة (عربة التسوق) ==========
    // اختيار أيقونة السلة والشريط الجانبي
    const cartIcon = document.getElementById('cart-icon');
    const sidebar = document.getElementById('sidebar');
    
    // فتح الشريط الجانبي عند النقر على أيقونة السلة
    if (cartIcon && sidebar) {
        cartIcon.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }

    // ========== إغلاق الشريط الجانبي ==========
    // اختيار زر إغلاق الشريط
    const closeButton = document.querySelector('.sidebar-close');
    
    if (closeButton && sidebar) {
        // إغلاق الشريط الجانبي عند النقر على زر الإغلاق
        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
});

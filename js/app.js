/* ==============================================================
   APP MODULE: WHATSAPP SHARING & NOTIFICATIONS
   ============================================================== */

function shareOnWhatsApp() {
  const currentURL = window.location.href;
  const msg = `🌅🙏 *जय छठी मैया! जय सूर्य देव!* 🙏🌅

डूबते सूरज को अर्घ्य देकर बीते दुखों को विदा करें,
उगते सूरज को अर्घ्य देकर नई खुशियों का स्वागत करें। ❤️

छठी मैया की असीम कृपा से आपके जीवन में
सुख, शांति, समृद्धि और खुशहाली का आगमन हो।

हर मनोकामना पूरी हो,
हर घर में खुशियों का उजाला हो,
और हर परिवार पर छठी मैया का आशीर्वाद बना रहे। 🌾🌺

*लोक आस्था के महापर्व छठ पूजा 2026 की आप सभी को हार्दिक शुभकामनाएँ!* 🙏

🌞 *जय छठी मैया!* 🌞

जहाँ आस्था का सागर हो, जहाँ श्रद्धा की लहर हो, वहाँ छठी मैया की कृपा से हर घर में खुशियों का सवेरा हो। ❤️🙏

— *With Best Wishes from Gunjan Kumar Gaurav (Senior Cloud & DevSecOps Consultant)*
👉 ${currentURL}`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function showToastMsg(msg) {
  const toast = document.getElementById('toastPill');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

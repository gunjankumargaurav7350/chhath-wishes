/* ==============================================================
   MAIN APPLICATION LOGIC MODULE (URL PARAMS + SHARING + TOASTS)
   ============================================================== */

const queryParams = new URLSearchParams(window.location.search);
const paramFrom = queryParams.get('from');
const paramTo = queryParams.get('to');

const defaultSender = 'Gunjan Kumar Gaurav';
const currentSender = (paramFrom && paramFrom.trim()) ? paramFrom.trim() : defaultSender;
const currentRecipient = (paramTo && paramTo.trim()) ? paramTo.trim() : '';

// Update DOM elements on load
document.addEventListener('DOMContentLoaded', () => {
  const senderDisplay = document.getElementById('signatureName');
  const inputSender = document.getElementById('inputSenderName');
  const inputRecipient = document.getElementById('inputRecipientName');
  const recipientBanner = document.getElementById('recipientBanner');

  if (senderDisplay) senderDisplay.textContent = currentSender;
  if (inputSender) inputSender.value = currentSender;
  if (inputRecipient) inputRecipient.value = currentRecipient;

  if (currentRecipient && recipientBanner) {
    recipientBanner.style.display = 'block';
    recipientBanner.innerHTML = `🌾 <strong>${currentRecipient} जी</strong>, आपके लिए छठी मैया का विशेष पावन अर्घ्य व मंगलकामनाएं! 🙏`;
  }
});

function getGeneratedURL() {
  const inputSender = document.getElementById('inputSenderName');
  const inputRecipient = document.getElementById('inputRecipientName');

  const sender = (inputSender && inputSender.value.trim()) ? inputSender.value.trim() : defaultSender;
  const recipient = (inputRecipient && inputRecipient.value.trim()) ? inputRecipient.value.trim() : '';

  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('from', sender);
  if (recipient) {
    url.searchParams.set('to', recipient);
  }
  return url.toString();
}

function copyWishLink() {
  playTempleBell();
  triggerBurst();
  const link = getGeneratedURL();

  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(() => {
      showToastMsg("🔗 आपका विश लिंक कॉपी हो गया!");
    }).catch(() => {
      prompt("यहाँ से विश लिंक कॉपी करें:", link);
    });
  } else {
    prompt("यहाँ से विश लिंक कॉपी करें:", link);
  }
}

function shareOnWhatsApp() {
  playTempleBell();
  triggerBurst();
  const inputSender = document.getElementById('inputSenderName');
  const inputRecipient = document.getElementById('inputRecipientName');

  const sender = (inputSender && inputSender.value.trim()) ? inputSender.value.trim() : defaultSender;
  const recipient = (inputRecipient && inputRecipient.value.trim()) ? inputRecipient.value.trim() : '';
  const link = getGeneratedURL();

  let text = "";
  if (recipient) {
    text = `🌅🙏 *जय छठी मैया! जय सूर्य देव!* 🙏🌅\n\nप्रिय *${recipient}* जी,\nआपको एवं आपके पूरे परिवार को *${sender}* की ओर से लोक आस्था के महापर्व *छठ पूजा 2026* की हार्दिक शुभकामनाएँ! ❤️🌾\n\n“डूबते सूरज को अर्घ्य देकर बीते दुखों को विदा करें,\nउगते सूरज को अर्घ्य देकर नई खुशियों का स्वागत करें।”\n\nछठी मैया की असीम कृपा से आपके जीवन में सुख, शांति, समृद्धि और खुशहाली का आगमन हो। हर मनोकामना पूरी हो, हर घर में खुशियों का उजाला हो! 🌾🌺\n\n👇 *छठी मैया के मधुर गीत और विशेष अर्घ्य के साथ अपनी शुभकामना यहाँ देखें:* 👇\n${link}`;
  } else {
    text = `🌅🙏 *जय छठी मैया! जय सूर्य देव!* 🙏🌅\n\nआपको एवं आपके पूरे परिवार को *${sender}* की ओर से लोक आस्था के महापर्व *छठ पूजा 2026* की हार्दिक शुभकामनाएँ! ❤️🌾\n\n“डूबते सूरज को अर्घ्य देकर बीते दुखों को विदा करें,\nउगते सूरज को अर्घ्य देकर नई खुशियों का स्वागत करें।”\n\nछठी मैया की असीम कृपा से आपके जीवन में सुख, शांति, समृद्धि और खुशहाली का आगमन हो। हर मनोकामना पूरी हो! 🌾🌺\n\n👇 *छठी मैया के मधुर गीत और विशेष अर्घ्य के साथ अपनी शुभकामना यहाँ देखें:* 👇\n${link}`;
  }

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

function copyCompleteMessage() {
  playTempleBell();
  triggerBurst();
  const inputSender = document.getElementById('inputSenderName');
  const sender = (inputSender && inputSender.value.trim()) ? inputSender.value.trim() : defaultSender;
  const link = getGeneratedURL();

  const msg = `🌅🙏 *जय छठी मैया! जय सूर्य देव!* 🙏🌅\n\nडूबते सूरज को अर्घ्य देकर बीते दुखों को विदा करें,\nउगते सूरज को अर्घ्य देकर नई खुशियों का स्वागत करें। ❤️\n\nछठी मैया की असीम कृपा से आपके जीवन में\nसुख, शांति, समृद्धि और खुशहाली का आगमन हो।\n\nहर मनोकामना पूरी हो,\nहर घर में खुशियों का उजाला हो,\nऔर हर परिवार पर छठी मैया का आशीर्वाद बना रहे। 🌾🌺\n\n*लोक आस्था के महापर्व छठ पूजा 2026 की आप सभी को हार्दिक शुभकामनाएँ!* 🙏\n\n🌞 *जय छठी मैया!* 🌞\n\nजहाँ आस्था का सागर हो, जहाँ श्रद्धा की लहर हो, वहाँ छठी मैया की कृपा से हर घर में खुशियों का सवेरा हो। ❤️🙏\n\n— *With Best Wishes from ${sender}*\n🔗 ${link}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(msg).then(() => {
      showToastMsg("📋 सम्पूर्ण शुभकामना संदेश कॉपी हो गया!");
    }).catch(() => {
      prompt("यहाँ से संदेश कॉपी करें:", msg);
    });
  } else {
    prompt("यहाँ से संदेश कॉपी करें:", msg);
  }
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

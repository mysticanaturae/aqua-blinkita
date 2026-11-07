(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  let language = "sl";
  let hasSavedLanguage = false;

  try {
    const savedLanguage = localStorage.getItem("aquaLanguage");
    if (savedLanguage === "sl" || savedLanguage === "en") {
      language = savedLanguage;
      hasSavedLanguage = true;
    }
  } catch (_) {}

  function saveLanguage() {
    try {
      localStorage.setItem("aquaLanguage", language);
    } catch (_) {}
  }
  const selectedIntentions = new Set();
  let selectedOffer = "";
  let selectedPortal = null;

  const translations = {
    sl: {
      headerNote: "Potovanje z Babico Ocean",
      eyebrow: "OCEAN SE SPOMINJA",
      heroTitle: "Prisluhni temu,<br>kar šepeta Ocean.",
      heroSubtitle: "Osebno srečanje z Babico Ocean, modrostjo vode in živimi portali morja.",
      begin: "ZAČNI SVOJE POTOVANJE ↓",
      journeyEyebrow: "ŠEPET BABICE OCEAN",
      journeyTitle: "Od tega, kar si želiš, do tega, kar želiš zaživeti.",
      journeyLead: "Vsaka sprememba se začne z nečim, kar se najprej oglasi v tebi.",
      journeyStep1Title: "ŽELJA",
      journeyStep1Text: "Kaj si želiš povabiti v svoje življenje? Kaj pogrešaš, po čem hrepeniš ali kaj si želiš spremeniti?",
      journeyStep2Title: "NAMERA",
      journeyStep2Text: "Svoji želji nameniš pozornost. Izbereš področje življenja in oblikuješ osebno namero, ki ji da smer.",
      journeyStep3Title: "POSLUŠANJE",
      journeyStep3Text: "Skozi modrost vode, simboliko časa in 13 oceanskih portalov raziskuješ sporočila, ki se dotaknejo prav tebe.",
      journeyStep4Title: "URESNIČITEV",
      journeyStep4Text: "Kar prejmeš, prineseš v vsakdanje življenje skozi zavedanje, odločitve in korake, ki jih izbereš sama.",
      journeyQuote: "Ocean ti ne pove, kdo moraš postati. Pomaga ti prisluhniti temu, kar v tebi že želi zaživeti.",
      journeySignature: "Babica Ocean",
      whisperEyebrow: "ŠEPET BABICE OCEAN",
      whisperTitle: "Ah, moje drago bitje …",
      whisperOpening: "končno si tukaj.",
      whisperLine1: "Veš, ocean nikoli ne pozabi.",
      whisperLine2: "V svojih globinah hrani pesmi zvezd, šepet davnih svetov in spomine na vse, kar je nekoč začelo živeti.",
      whisperLine3: "Tudi ti nosiš ocean v sebi.",
      whisperLine4: "Morda si prišla po odgovor. Morda po novo moč. Morda samo zato, ker te nekaj nevidnega nežno vleče sem, čeprav še ne veš, zakaj.",
      whisperLine5: "Ne bom ti povedala, kaj moraš najti. Raje ti bom odprla vrata.",
      whisperLine6: "Trinajst oceanskih portalov. Trinajst različnih valov življenja. Vsak s svojo zgodbo, svojim sporočilom in svojo čarovnijo.",
      whisperClosing: "»Prisluhni, ljuba moja. Morda je prav v tem valu skrito nekaj, kar že dolgo kliče tvoje ime.«",
      whisperSignature: "Tvoja Babica Ocean",
      personalEyebrow: "TVOJE OSEBNO OCEANSKO POTOVANJE",
      personalTitle: "Kaj te kliče?",
      personalIntro: "Vnesi svoje podatke in izberi področja življenja, ki jih želiš vključiti v svoje oceansko potovanje.",
      nameLabel: "Tvoje ime",
      birthLabel: "Datum rojstva",
      areasTitle: "Izberi svoja področja",
      areasHint: "Izbereš lahko več področij.",
      portalPickerTitle: "TVOJ TZOLK'IN OCEANSKI PORTAL",
      portalPickerButton: "IZBERI SVOJ OCEANSKI PORTAL",
      portalPickerEmpty: "Za plačljivo oceansko izkušnjo izberi enega od 13 portalnih dni. Brezplačni Prvi oceanski dotik izbire ne zahteva.",
      portalPickerSelected: "Tvoj izbrani portal",
      portalPickerChange: "SPREMENI IZBOR",
      questionLabel: "Tvoja osebna namera ali vprašanje",
      reserveButton: "POŠLJI SVOJO OSEBNO NAMERO",
      offerDeadline: "Posebna oceanska izkušnja je na voljo samo do 11. 11. 2026.",
      formNote: "Sporočilo odpre zaseben pogovor prek WhatsAppa. Tvoje potovanje se začne z namero.",
      discoverEyebrow: "RAZIŠČI OCEANSKO POT",
      discoverTitle: "Pet vrat v ocean",
      windowExplore: "RAZIŠČI",
      windowExperience: "DOŽIVI",
      windowEnter: "VSTOPI",
      windowDiscover: "SPOZNAJ",
      windowPrepare: "PRIPRAVI SE",
      windowGrandmother: "Legenda o Babici Ocean",
      windowWater: "Ritual z vodo",
      windowPortals: "13 oceanskih portalov",
      windowReiki: "AQUA LEMU Reiki",
      windowPreparation: "Kako se pripraviti",
      footerText: "Živo potovanje z Oceanom",
      portalEyebrow: "ŽIVI CIKEL VODE",
      portalTitle: "13 oceanskih portalov",
      portalIntro: "Trinajst trenutkov za poslušanje, sprejemanje in ponovno povezavo.",
      enter: "VSTOPI V OCEANSKI PORTAL",
      offersEyebrow: "TRI POTI DO OCEANA",
      offersTitle: "Izberi svoja vrata.",
      freeEyebrow: "PRVI OCEANSKI DOTIK",
      freeRegularLabel: "REDNA VREDNOST · €33",
      freePrice: "BREZPLAČNO",
      freeTag: "Prvo kratko osebno sporočilo Babice Ocean.",
      free1: "Tvoje ime in datum rojstva",
      free2: "Tvoja izbrana namera",
      free3: "Kratko osebno oceansko sporočilo",
      freeMuted: "Prvi stik z modrostjo Oceana.",
      freeButton: "SPREJMI PRVI OCEANSKI DOTIK",
      whisperEyebrow: "OCEANSKI ŠEPET™",
      whisperRegularLabel: "REDNA CENA · €110",
      whisperTag: "Nežno osebno sporočilo iz morja.",
      whisper1: "Tvoje ime in datum rojstva",
      whisper2: "Eno vprašanje ali namera",
      whisper3: "Mini Aqua Lemu Reiki",
      whisper4: "Osebno sporočilo Babice Ocean v PDF-ju",
      whisper5: "Tvoj izbrani dan Tzolk'in Oceanskega portala",
      whisperMuted: "Tvoj osebni šepet Oceana.",
      whisperButton: "IZBERI OCEANSKI ŠEPET",
      portalOfferEyebrow: "KARIBSKI OCEANSKI PORTAL™",
      portalOfferRegularLabel: "REDNA CENA · €333",
      portalOfferTag: "Posebna oceanska izkušnja",
      portal1: "Tvoje ime in datum rojstva",
      portal2: "Tvoja izbrana namera",
      portal3: "Zasebni ritual Oceanskega portala",
      portal4: "Aqua Lemu Reiki ritual",
      portal5: "Zvočni posnetek osebnega sporočila Babice Ocean",
      portal6: "Obsežno osebno oceansko sporočilo v PDF-ju",
      portal7: "Darovi, osebno zbrani ob oceanu",
      portalButton: "VSTOPI V OCEANSKI PORTAL",
      paymentMethodTitle: "Izberi način plačila",
      payPalLabel: "PayPal ali plačilna kartica",
      bankTransferLabel: "Bančno nakazilo",
      giftsEyebrow: "POT DAROV MATERE NARAVE",
      giftsIncluded: "DAR JE VKLJUČEN IZKLJUČNO V KARIBSKI OCEANSKI PORTAL™",
      giftsTitle: "Dar, ki ga Ocean izbere zate.",
      giftsText: "Na približno 30-minutni poti od svojega doma do kraja oceanskega rituala se povežem s teboj in tvojo namero. Med potjo sprejemam sporočila Babice Ocean, izvajam Aqua Lemu Reiki in ostajam odprta za to, kar mi želi pokazati Mati Narava.",
      giftsExamples: "Morda me na poti počaka Sea Heart Bean, Horse Eye, Sea Purse, košček korale ali drug morski dar. Ni vnaprej določenega predmeta. Vsak Oceanski portal ima svojo zgodbo in svoj dar.",
      giftsNote: "Darove je mogoče osebno prevzeti v Belizeju. Zaradi njihove narave jih ne pošiljam po pošti.",
      chooseLanguage: "Izberi jezik · Choose your language",
      choosePortal: "IZBERI TA PORTAL",
      full: "PORTAL JE ZASEDEN"
    },
    en: {
      headerNote: "A journey with Grandmother Ocean",
      eyebrow: "THE OCEAN REMEMBERS",
      heroTitle: "Listen to what<br>the Ocean whispers.",
      heroSubtitle: "A personal encounter with Grandmother Ocean, the wisdom of water and the living portals of the sea.",
      begin: "BEGIN YOUR JOURNEY ↓",
      journeyEyebrow: "A WHISPER FROM GRANDMOTHER OCEAN",
      journeyTitle: "From what you wish for to what you are ready to live.",
      journeyLead: "Every change begins with something that first stirs within you.",
      journeyStep1Title: "DESIRE",
      journeyStep1Text: "What would you like to invite into your life? What do you miss, long for, or wish to change?",
      journeyStep2Title: "INTENTION",
      journeyStep2Text: "You give your desire your attention. You choose an area of life and shape a personal intention that gives it direction.",
      journeyStep3Title: "LISTENING",
      journeyStep3Text: "Through the wisdom of water, the symbolism of time and 13 ocean portals, you explore messages that speak to you.",
      journeyStep4Title: "REALIZATION",
      journeyStep4Text: "You bring what you receive into everyday life through awareness, choices and the steps you decide to take.",
      journeyQuote: "The Ocean does not tell you who you must become. She helps you listen to what is already longing to come alive within you.",
      journeySignature: "Grandmother Ocean",
      whisperEyebrow: "A WHISPER FROM GRANDMOTHER OCEAN",
      whisperTitle: "Ah, my dear one …",
      whisperOpening: "you are finally here.",
      whisperLine1: "You see, the ocean never forgets.",
      whisperLine2: "Within her depths she keeps the songs of stars, the whispers of ancient worlds and the memories of all that once began to live.",
      whisperLine3: "You carry the ocean within you, too.",
      whisperLine4: "Perhaps you came for an answer. Perhaps for new strength. Perhaps something unseen has gently drawn you here, even though you do not yet know why.",
      whisperLine5: "I will not tell you what you must find. Instead, I will open the doors.",
      whisperLine6: "Thirteen Ocean Portals. Thirteen different waves of life. Each with its own story, its own message and its own magic.",
      whisperClosing: "»Listen, my dear one. Perhaps within this very wave lies something that has been calling your name for a long time.«",
      whisperSignature: "Your Grandmother Ocean",
      personalEyebrow: "YOUR PERSONAL OCEAN JOURNEY",
      personalTitle: "What is calling you?",
      personalIntro: "Enter your details and choose the areas of life you wish to bring into your ocean journey.",
      nameLabel: "Your name",
      birthLabel: "Date of birth",
      areasTitle: "Choose your areas",
      areasHint: "You may choose more than one.",
      portalPickerTitle: "YOUR TZOLK'IN OCEAN PORTAL",
      portalPickerButton: "CHOOSE YOUR OCEAN PORTAL",
      portalPickerEmpty: "Choose one of the 13 portal days for a paid Ocean experience. The free First Ocean Touch does not require a selection.",
      portalPickerSelected: "Your selected portal",
      portalPickerChange: "CHANGE SELECTION",
      questionLabel: "Your personal intention or question",
      reserveButton: "SEND MY PERSONAL REQUEST",
      offerDeadline: "This special Ocean experience is available until November 11, 2026 only.",
      formNote: "Your message opens a private WhatsApp conversation. Your journey begins with your intention.",
      discoverEyebrow: "DISCOVER THE OCEAN PATH",
      discoverTitle: "Five gateways",
      windowExplore: "EXPLORE",
      windowExperience: "EXPERIENCE",
      windowEnter: "ENTER",
      windowDiscover: "DISCOVER",
      windowPrepare: "GET READY",
      windowGrandmother: "The Legend of Grandmother Ocean",
      windowWater: "The Water Ritual",
      windowPortals: "13 Ocean Portals",
      windowReiki: "AQUA LEMU Reiki",
      windowPreparation: "How to Prepare",
      footerText: "A living journey with the Ocean",
      portalEyebrow: "THE LIVING CYCLE OF WATER",
      portalTitle: "13 Ocean Portals",
      portalIntro: "Thirteen moments to listen, receive and reconnect.",
      enter: "ENTER THE OCEAN PORTAL",
      offersEyebrow: "THREE WAYS TO ENTER THE OCEAN",
      offersTitle: "Choose your doorway.",
      freeEyebrow: "THE FIRST OCEAN TOUCH",
      freeRegularLabel: "REGULAR VALUE · €33",
      freePrice: "FREE",
      freeTag: "Your first short personal message from Grandmother Ocean.",
      free1: "Your name and date of birth",
      free2: "Your chosen intention",
      free3: "A short personal Ocean message",
      freeMuted: "Your first encounter with the wisdom of the Ocean.",
      freeButton: "RECEIVE THE FIRST OCEAN TOUCH",
      whisperEyebrow: "THE OCEAN WHISPER™",
      whisperRegularLabel: "REGULAR PRICE · €110",
      whisperTag: "A gentle personal message from the sea.",
      whisper1: "Your name and date of birth",
      whisper2: "One question or intention",
      whisper3: "Mini Aqua Lemu Reiki",
      whisper4: "Your personal message from Grandmother Ocean in PDF",
      whisper5: "Your chosen Tzolk'in Ocean Portal day",
      whisperMuted: "Your personal whisper from the Ocean.",
      whisperButton: "CHOOSE OCEAN WHISPER",
      portalOfferEyebrow: "THE CARIBBEAN OCEAN PORTAL™",
      portalOfferRegularLabel: "REGULAR PRICE · €333",
      portalOfferTag: "A special Ocean experience",
      portal1: "Your name and date of birth",
      portal2: "Your chosen intention",
      portal3: "Private Ocean Portal ritual",
      portal4: "Aqua Lemu Reiki ritual",
      portal5: "Audio recording of your personal message from Grandmother Ocean",
      portal6: "An extensive personal Ocean message in PDF",
      portal7: "Gifts personally gathered beside the Ocean",
      portalButton: "ENTER THE OCEAN PORTAL",
      paymentMethodTitle: "Choose your payment method",
      payPalLabel: "PayPal or credit/debit card",
      bankTransferLabel: "Bank transfer",
      giftsEyebrow: "THE GIFTS OF MOTHER NATURE",
      giftsIncluded: "THIS GIFT IS INCLUDED EXCLUSIVELY WITH THE CARIBBEAN OCEAN PORTAL™",
      giftsTitle: "A gift chosen by the Ocean for you.",
      giftsText: "During the approximately 30-minute walk from my home to the Ocean ritual location, I connect with you and your intention. Along the way, I receive messages from Grandmother Ocean, offer Aqua Lemu Reiki, and remain open to what Mother Nature wishes to show me.",
      giftsExamples: "Perhaps a Sea Heart Bean, Horse Eye, Sea Purse, a piece of coral, or another ocean gift will be waiting along the way. No object is predetermined. Every Ocean Portal has its own story and its own gift.",
      giftsNote: "The gifts can be collected in person in Belize. Due to their nature, I do not send them by mail.",
      chooseLanguage: "Choose your language · Izberi jezik",
      choosePortal: "CHOOSE THIS PORTAL",
      full: "PORTAL FULL"
    }
  };

  function updatePortalSelectionUI() {
    const display = $("#selectedPortalDisplay");
    const button = $("#choosePortal");

    if (!display || !button) return;

    if (!selectedPortal) {
      display.textContent = translations[language].portalPickerEmpty;
      button.textContent = translations[language].portalPickerButton;
      display.classList.remove("has-selection");
      return;
    }

    const name = language === "sl"
      ? (selectedPortal.name_sl || selectedPortal.name)
      : (selectedPortal.name || selectedPortal.name_sl);

    display.textContent =
      `${translations[language].portalPickerSelected}: ${name} · ${selectedPortal.date} · ${selectedPortal.kin}`;

    button.textContent = translations[language].portalPickerChange;
    display.classList.add("has-selection");
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    $$("[data-i18n]").forEach(el => {
      const value = translations[language][el.dataset.i18n];
      if (value) el.innerHTML = value;
    });
    $$("#intentionGrid b").forEach(el => {
      el.textContent = el.dataset[language];
    });
    $("#langSwitch").textContent = language === "sl" ? "EN" : "SI";
    $("#entryPrompt").textContent = translations[language].chooseLanguage;
    $("#enterLabel").textContent = translations[language].enter;
    $("#personalMessage").placeholder = language === "sl"
      ? "Kaj želiš deliti z Babico Ocean?"
      : "What would you like to share with Grandmother Ocean?";
    $("#personName").placeholder = language === "sl" ? "Tvoje ime" : "Your name";
    updatePortalSelectionUI();
  }

  function openEntryFlyer(lang) {
    language = lang;
    saveLanguage();
    applyLanguage();

    $("#entryScreen").classList.add("is-hidden");
    document.body.classList.remove("entry-active");

    renderPortals();
  }

  $$("[data-language]").forEach(button => {
    button.addEventListener("click", () => openEntryFlyer(button.dataset.language));
  });

  $("#flyerEnter").addEventListener("click", () => {
    $("#entryScreen").classList.add("is-hidden");
    document.body.classList.remove("entry-active");
  });

  $("#langSwitch").addEventListener("click", () => {
    language = language === "sl" ? "en" : "sl";
    saveLanguage();
    applyLanguage();
    renderBankDetails();
    renderPortals();
  });

  document.addEventListener("click", event => {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const url = new URL(link.href, window.location.href);

  const routes = {
    "grandmother-ocean.html": "grandmother-ocean-sl.html",
    "water.html": "water-sl.html",
    "aqua-lemu.html": "aqua-lemu-sl.html",
    "preparation.html": "preparation-sl.html"
  };

  const page = url.pathname.split("/").pop();
  const englishPage = page.replace(/-sl(?=\.html$)/, "");

  if (Object.prototype.hasOwnProperty.call(routes, englishPage)) {
    const targetPage = language === "sl"
      ? routes[englishPage]
      : englishPage;

    const directory = url.pathname.substring(
      0,
      url.pathname.lastIndexOf("/") + 1
    );

    url.pathname = directory + targetPage;
    url.searchParams.set("lang", language);

    link.href = url.pathname + url.search + url.hash;
  }
});

  $$(".intention-chip").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.dataset.intention;
      if (selectedIntentions.has(value)) {
        selectedIntentions.delete(value);
        button.classList.remove("selected");
        button.setAttribute("aria-pressed", "false");
      } else {
        selectedIntentions.add(value);
        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");
      }
    });
  });

  const offerButtons = $$("[data-offer]");
  const form = $("#personalForm");
  const submitButton = form.querySelector('button[type="submit"]');

  const paymentMethods = $("#paymentMethods");
  const bankDetails = $("#bankDetails");

  function renderBankDetails() {
    if (!paymentMethods || !bankDetails) return;

    const method = $('input[name="paymentMethod"]:checked');
    const showBank = !paymentMethods.hidden &&
      method &&
      method.value === "bank";

    bankDetails.hidden = !showBank;

    if (!showBank || !selectedOffer) {
      bankDetails.innerHTML = "";
      return;
    }

    const amount = selectedOffer === "whisper" ? "€55" : "€99";

    if (language === "sl") {
      bankDetails.innerHTML = `
        <h4>BANČNO NAKAZILO</h4>
        <p><strong>Znesek:</strong> ${amount}</p>
        <p><strong>Prejemnik:</strong> AKADEMIJA ŽIVLJENJA</p>
        <p><strong>Naslov:</strong> Pod hribom 22, 1000 Ljubljana</p>
        <p><strong>IBAN:</strong> SI56 1010 0006 0655 938</p>
        <p><strong>Banka:</strong> Intesa Sanpaolo Banka d.d.</p>
        <p><strong>Sklic:</strong> 00 2026</p>
        <p><strong>Namen plačila:</strong> tvoje ime in izbrana izkušnja</p>
        <p class="bank-detail-note">Po nakazilu pošlji svoje osebno naročilo prek WhatsAppa.</p>
      `;
    } else {
      bankDetails.innerHTML = `
        <h4>BANK TRANSFER · INTERNATIONAL</h4>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Beneficiary:</strong> Blanka Thomas</p>
        <p><strong>Bank:</strong> Belize Bank Limited</p>
        <p><strong>Account number:</strong> 196421010160000</p>
        <p><strong>SWIFT / BIC:</strong> BBLZBZBZ</p>
        <p><strong>Payment reference:</strong> Your full name and selected experience</p>
        <p class="bank-detail-note">After making the transfer, send your personal request through WhatsApp.</p>
      `;
    }
  }

  paymentMethods.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
    input.addEventListener("change", renderBankDetails);
  });

  function selectOffer(offer) {
    selectedOffer = offer;

    const portalPicker = $("#portalPicker");
    if (portalPicker) portalPicker.hidden = offer === "free";

    if (offer === "free") {
      selectedPortal = null;
      updatePortalSelectionUI();
    }

    offerButtons.forEach(button => {
      const selected = button.dataset.offer === offer;
      const card = button.closest(".offer");

      if (card) card.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    paymentMethods.hidden = offer === "free";

    if (offer === "free") {
      const paypalOption = paymentMethods.querySelector(
        'input[name="paymentMethod"][value="paypal"]'
      );
      if (paypalOption) paypalOption.checked = true;
    }

    renderBankDetails();
  }

  offerButtons.forEach(button => {
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      selectOffer(button.dataset.offer);
    });
  });

  const paypalLinks = {
    whisper: "https://www.paypal.com/ncp/payment/QCRX2S2B4H6N6",
    portal: "https://www.paypal.com/ncp/payment/XR8SKJCJL77DN"
  };

  function makeRequestText(data) {
    const labels = data.areas.map(value => {
      const chip = $(`[data-intention="${CSS.escape(value)}"]`);
      return chip ? $("b", chip).textContent : value;
    });

    const portalName = data.portal
      ? (data.language === "sl"
          ? (data.portal.name_sl || data.portal.name)
          : (data.portal.name || data.portal.name_sl))
      : "";

    const portalLine = data.portal
      ? (data.language === "sl"
          ? `Izbrani Tzolk'in oceanski portal: ${portalName} (${data.portal.date}, ${data.portal.kin})`
          : `Selected Tzolk'in Ocean Portal: ${portalName} (${data.portal.date}, ${data.portal.kin})`)
      : (data.language === "sl"
          ? "Tzolk'in oceanski portal: še ni izbran"
          : "Tzolk'in Ocean Portal: not selected");

    if (data.language === "sl") {
      return `Pozdravljena, Blanka. Želim začeti svoje osebno oceansko potovanje.

Izbrana izkušnja: ${data.offerName}
${portalLine}
Ime: ${data.name}
Datum rojstva: ${data.birth}
Moja področja: ${labels.join(", ")}
Moja namera / vprašanje: ${data.message}`;
    }

    return `Hello, Blanka. I would like to begin my personal ocean journey.

Selected experience: ${data.offerName}
${portalLine}
Name: ${data.name}
Date of birth: ${data.birth}
My areas: ${labels.join(", ")}
My intention / question: ${data.message}`;
  }

  const offerNames = {
    sl: {
      free: "PRVI OCEANSKI DOTIK (brezplačno)",
      whisper: "OCEANSKI ŠEPET (€55)",
      portal: "KARIBSKI OCEANSKI PORTAL (€99)"
    },
    en: {
      free: "THE FIRST OCEAN TOUCH (free)",
      whisper: "THE OCEAN WHISPER (€55)",
      portal: "THE CARIBBEAN OCEAN PORTAL (€99)"
    }
  };

  const params = new URLSearchParams(window.location.search);
  const returnedFromPayPal = params.get("payment") === "return";
  let pendingPayment = null;

  try {
    pendingPayment = JSON.parse(
      localStorage.getItem("aquaPendingPayment") || "null"
    );
  } catch (_) {}

  if (returnedFromPayPal && pendingPayment) {
    selectedPortal = pendingPayment.portal || null;
    $("#personName").value = pendingPayment.name || "";
    $("#birthDate").value = pendingPayment.birth || "";
    $("#personalMessage").value = pendingPayment.message || "";

    selectedIntentions.clear();

    (pendingPayment.areas || []).forEach(value => {
      selectedIntentions.add(value);
      const chip = $(`[data-intention="${CSS.escape(value)}"]`);
      if (chip) {
        chip.classList.add("selected");
        chip.setAttribute("aria-pressed", "true");
      }
    });

    selectOffer(pendingPayment.offer);

    const notice = document.createElement("p");
    notice.className = "payment-return-note";
    notice.textContent = language === "sl"
      ? "Vrnila si se s PayPala. Če si plačilo uspešno zaključila, zdaj pošlji svojo osebno namero prek WhatsAppa."
      : "You have returned from PayPal. If you completed the payment successfully, send your personal request through WhatsApp now.";

    submitButton.parentNode.insertBefore(notice, submitButton);
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = $("#personName").value.trim();
    const birth = $("#birthDate").value;
    const message = $("#personalMessage").value.trim();
    const areas = [...selectedIntentions];

    if (!areas.length) {
      alert(language === "sl"
        ? "Izberi vsaj eno področje, ki te kliče."
        : "Please choose at least one area that is calling you.");
      return;
    }

    if (!selectedOffer) {
      alert(language === "sl"
        ? "Prosim, izberi eno od treh oceanskih poti."
        : "Please choose one of the three Ocean experiences.");
      $("#ocean-offers").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (selectedOffer !== "free" && !selectedPortal) {
      alert(language === "sl"
        ? "Za plačljivo oceansko izkušnjo najprej izberi enega od 13 Tzolk'in Ocean Portalov."
        : "Please choose one of the 13 Tzolk'in Ocean Portals for your paid Ocean experience.");

      $("#portalPicker").scrollIntoView({ behavior: "smooth", block: "center" });
      $("#choosePortal").focus();
      return;
    }

    const data = {
      name,
      birth,
      message,
      areas,
      offer: selectedOffer,
      offerName: offerNames[language][selectedOffer],
      portal: selectedPortal,
      language
    };

    if (returnedFromPayPal && pendingPayment) {
      const text = makeRequestText(pendingPayment);
      window.open(
        "https://wa.me/5016084121?text=" + encodeURIComponent(text),
        "_blank",
        "noopener"
      );

      try {
        localStorage.removeItem("aquaPendingPayment");
      } catch (_) {}

      return;
    }

    if (selectedOffer === "free") {
      const text = makeRequestText(data);
      window.open(
        "https://wa.me/5016084121?text=" + encodeURIComponent(text),
        "_blank",
        "noopener"
      );
      return;
    }

    const paymentMethod = paymentMethods.querySelector(
      'input[name="paymentMethod"]:checked'
    );

    if (paymentMethod && paymentMethod.value === "bank") {
      const bankMessage = language === "sl"
        ? "\n\nIzbrala sem bančno nakazilo. Podatke za nakazilo sem prejela na spletni strani."
        : "\n\nI have selected bank transfer. I have received the bank details on the website.";

      window.open(
        "https://wa.me/5016084121?text=" +
          encodeURIComponent(makeRequestText(data) + bankMessage),
        "_blank",
        "noopener"
      );
      return;
    }

    try {
      localStorage.setItem("aquaPendingPayment", JSON.stringify(data));
    } catch (_) {
      alert(language === "sl"
        ? "Podatkov ni bilo mogoče shraniti. Preveri nastavitve brskalnika in poskusi znova."
        : "Your details could not be saved. Please check your browser settings and try again.");
      return;
    }

    window.location.href = paypalLinks[selectedOffer];
  });
  function renderPortals() {
    const grid = $("#portalGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const days = typeof OCEAN_DAYS !== "undefined"
      ? OCEAN_DAYS
      : window.OCEAN_DAYS;

    if (!Array.isArray(days) || !days.length) {
      grid.innerHTML = `<p>${language === "sl"
        ? "Podatki portalov trenutno niso na voljo."
        : "Portal information is currently unavailable."}</p>`;
      return;
    }

    const images = [
      "life-force", "healing-hands", "water-offering",
      "creative-thread", "growth", "vision",
      "earth-movement", "renewal-storm", "origin",
      "inner-dawn", "awakening", "love-abundance",
      "creative-transformation"
    ];

    const firstDate = new Date(days[0].date + "T12:00:00");

    $("#monthLabel").textContent = firstDate.toLocaleDateString(
      language === "sl" ? "sl-SI" : "en-US",
      { month: "long", year: "numeric" }
    ).toUpperCase();

    days.forEach((day, index) => {
      const image = `images/portal-${String(index + 1).padStart(2, "0")}-${images[index]}.webp`;
      const name = language === "sl" ? day.name_sl : day.name;
      const label = language === "sl" ? day.label_sl : day.label;
      const desc = language === "sl" ? day.desc_sl : day.desc;

      const card = document.createElement("article");
      card.className = "portal-card";

      const imgWrap = document.createElement("div");
      imgWrap.className = "portal-card-image";

      const img = document.createElement("img");
      img.src = image;
      img.alt = name || "Ocean portal";
      img.loading = "lazy";
      imgWrap.appendChild(img);

      const body = document.createElement("div");
      body.className = "portal-card-body";

      const date = document.createElement("div");
      date.className = "portal-date";
      date.textContent = `${label || day.date} · ${day.tone}`;

      const kin = document.createElement("div");
      kin.className = "portal-kin";
      kin.textContent = day.kin || "";

      const title = document.createElement("h3");
      title.textContent = name || "";

      const description = document.createElement("p");
      description.textContent = desc || "";

      const places = document.createElement("div");
      places.className = "portal-availability";

      const placesCount = document.createElement("strong");
      placesCount.textContent = "0 / 2";

      const placesLabel = document.createElement("span");
      placesLabel.textContent = language === "sl"
        ? "2 ZASEBNI MESTI"
        : "2 PRIVATE PLACES";

      places.append(placesCount, placesLabel);

      const choose = document.createElement("button");
      choose.type = "button";
      choose.textContent = translations[language].choosePortal;

      choose.addEventListener("click", () => {
        selectedPortal = {
          name: day.name || name,
          name_sl: day.name_sl || name,
          date: day.date,
          kin: day.kin || "",
          tone: day.tone || "",
          label: day.label || day.date,
          label_sl: day.label_sl || day.date
        };

        updatePortalSelectionUI();

        $("#personalMessage").value = language === "sl"
          ? `Želim se povezati s portalom ${name} (${day.date}, ${day.kin}).`
          : `I would like to connect with ${name} (${day.date}, ${day.kin}).`;

        $("#portalOverlay").classList.remove("open");
        $("#portalOverlay").setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        $("#journey").scrollIntoView({ behavior: "smooth" });
      });

      body.append(date, kin, title, description, places, choose);
      card.append(imgWrap, body);
      grid.appendChild(card);
    });
  }
  function openPortals() {
    renderPortals();
    $("#portalOverlay").classList.add("open");
    $("#portalOverlay").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  $("#openPortals").addEventListener("click", openPortals);
  $("#choosePortal").addEventListener("click", openPortals);

  function closePortals() {
    $("#portalOverlay").classList.remove("open");
    $("#portalOverlay").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $("#closePortals").addEventListener("click", closePortals);
  $("#portalOverlay").addEventListener("click", event => {
    if (event.target === $("#portalOverlay")) closePortals();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePortals();
  });

  const entryScreen = $("#entryScreen");
  const returningToPortal = ["sl", "en"].includes(params.get("lang"));

  if (entryScreen && returningToPortal) {
    entryScreen.classList.add("is-hidden");
    document.body.classList.remove("entry-active");
  } else if (entryScreen) {
    entryScreen.classList.remove("is-hidden");
  }

  applyLanguage();
  renderPortals();
})();



















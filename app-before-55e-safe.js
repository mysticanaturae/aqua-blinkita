/* =========================================================
   AQUA · BLINKITA
   Caribbean Ocean Portal™
========================================================= */


/* =========================================================
   INTENTIONS
========================================================= */

const intents = [

  ['❤','LOVE','LJUBEZEN'],
  ['∞','PARTNERSHIP','PARTNERSTVO'],
  ['✦','ABUNDANCE','OBILJE'],
  ['✧','RESTORATION','OBNOVA'],
  ['◈','PROTECTION','ZAŠČITA'],
  ['≈','RELEASE','SPUŠČANJE'],
  ['✺','NEW BEGINNING','NOV ZAČETEK'],
  ['◌','HEALTH','ZDRAVJE'],
  ['◒','MONEY','DENAR'],
  ['✧','FAMILY','DRUŽINA']

];


/* =========================================================
   PAYMENTS
========================================================= */

const PAYPAL = {

  whisper:
    'https://www.paypal.com/ncp/payment/QCRX2S2B4H6N6',

  portal:
    'https://www.paypal.com/ncp/payment/XR8SKJCJL77DN'

};


/* =========================================================
   BANK
========================================================= */

const BANK = `AKADEMIJA ŽIVLJENJA
Pod hribom 22
1000 LJUBLJANA
TRR: SI56 1010 0006 0655 938
Banka: Intesa Sanpaolo Banka d.d.
Sklic: 00 2026`;


/* =========================================================
   LANGUAGE
========================================================= */

let lang = 'en';


/* =========================================================
   STATE
========================================================= */

let selectedOffer = 'portal';
let selectedDay = null;
let selectedIntention = '';


/* =========================================================
   CAPACITY
========================================================= */

const CAPACITY_KEY =
  'aquaOceanCapacityV5';


function getCapacity(){

  try{

    const raw =
      localStorage.getItem(
        CAPACITY_KEY
      );

    if(!raw){
      return {};
    }

    const parsed =
      JSON.parse(raw);

    return parsed &&
      typeof parsed === 'object'
        ? parsed
        : {};

  }catch(error){

    console.warn(
      'AQUA capacity read error:',
      error
    );

    return {};

  }

}


function setCapacity(capacity){

  try{

    localStorage.setItem(
      CAPACITY_KEY,
      JSON.stringify(capacity)
    );

  }catch(error){

    console.warn(
      'AQUA capacity write error:',
      error
    );

  }

}


function remaining(date){

  if(!date){
    return 0;
  }

  const capacity =
    getCapacity();

  return Math.max(
    0,
    2 - Number(capacity[date] || 0)
  );

}


function reserveSlot(date){

  if(!date){
    return false;
  }

  const capacity =
    getCapacity();

  const current =
    Number(capacity[date] || 0);

  if(current >= 2){
    return false;
  }

  capacity[date] =
    current + 1;

  setCapacity(
    capacity
  );

  return true;

}


/* =========================================================
   DOM HELPERS
========================================================= */

function getEl(selector){

  return document.querySelector(
    selector
  );

}


function hasOceanDays(){

  return (
    typeof OCEAN_DAYS !== 'undefined' &&
    Array.isArray(OCEAN_DAYS)
  );

}


/* =========================================================
   INTENTIONS RENDER
========================================================= */

function renderIntents(){

  const intentGrid =
    getEl('#intentGrid');

  if(!intentGrid){
    return;
  }

  intentGrid.innerHTML = '';

  intents.forEach(
    item => {

      const button =
        document.createElement(
          'button'
        );

      button.type =
        'button';

      button.className =
        'intent' +
        (
          selectedIntention === item[1]
            ? ' active'
            : ''
        );

      button.dataset.intention =
        item[1];

      button.innerHTML = `

        <span class="intent-symbol">
          ${item[0]}
        </span>

        <strong>
          ${
            lang === 'en'
              ? item[1]
              : item[2]
          }
        </strong>

      `;

      intentGrid.appendChild(
        button
      );

    }
  );

}


/* =========================================================
   INTENTION CONFIRMATION
========================================================= */

function updateIntentionConfirmation(){

  const box =
    getEl('#intentionConfirmation');

  if(!box){
    return;
  }

  if(!selectedIntention){

    box.hidden = true;

    return;

  }

  const item =
    intents.find(
      x =>
        x[1] === selectedIntention
    );

  if(!item){

    box.hidden = true;

    return;

  }

  const label =
    lang === 'en'
      ? item[1]
      : item[2];

  box.hidden = false;

  box.innerHTML =

    lang === 'en'

      ? `Your intention:
         <strong>${label}</strong>.
         Now choose the Ocean Portal Day
         that calls you.`

      : `Tvoja namera:
         <strong>${label}</strong>.
         Zdaj izberi dan Ocean Portala,
         ki te pokliče.`;

}


/* =========================================================
   PORTAL RENDER
========================================================= */

function renderPortals(){

  const grid =
    getEl('#portalGrid');

  if(!grid){
    return;
  }

  if(!hasOceanDays()){

    console.warn(
      'AQUA: OCEAN_DAYS is not available.'
    );

    return;

  }

  grid.innerHTML = '';

  OCEAN_DAYS.forEach(
    (d,index) => {

      const left =
        remaining(d.date);

      const full =
        left <= 0;

      const card =
        document.createElement(
          'article'
        );

      card.className =
        'portal-card' +
        (
          full
            ? ' full'
            : ''
        );

      const label =
        lang === 'en'
          ? d.label
          : d.label_sl;

      const name =
        lang === 'en'
          ? d.name
          : d.name_sl;

      const desc =
        lang === 'en'
          ? d.desc
          : d.desc_sl;

      let availabilityText;

      if(left === 2){

        availabilityText =
          lang === 'en'
            ? '2 PRIVATE PLACES'
            : '2 PROSTI MESTI';

      }

      else if(left === 1){

        availabilityText =
          lang === 'en'
            ? '1 PRIVATE PLACE LEFT'
            : 'ŠE 1 PROSTO MESTO';

      }

      else{

        availabilityText =
          lang === 'en'
            ? 'FULL · PORTAL CLOSED'
            : 'POLNO · PORTAL ZAPRT';

      }

      card.innerHTML = `

        <div class="date">
          ${label} · ${d.tone}
        </div>

        <div class="kin">
          ${d.kin}
        </div>

        <h3>
          ${name}
        </h3>

        <p>
          ${desc}
        </p>

        <div
          class="availability ${full ? 'sold' : ''}"
        >

          ${2 - left} / 2

          <span>
            ${availabilityText}
          </span>

        </div>

        <button
          type="button"
          data-day="${index}"
          ${full ? 'disabled' : ''}
        >

          ${
            full

              ? (
                  lang === 'en'
                    ? 'PORTAL FULL'
                    : 'PORTAL JE POLN'
                )

              : (
                  lang === 'en'
                    ? 'CHOOSE THIS PORTAL →'
                    : 'IZBERI TA PORTAL →'
                )
          }

        </button>

      `;

      grid.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   SELECT OPTIONS
========================================================= */

function renderSelects(){

  const daySelect =
    getEl('#daySelect');

  const intentionSelect =
    getEl('#intentionSelect');


  /* -------------------------------------------------------
     DAYS
  ------------------------------------------------------- */

  if(
    daySelect &&
    hasOceanDays()
  ){

    daySelect.innerHTML = '';

    const placeholder =
      new Option(

        lang === 'en'
          ? 'Choose an Ocean Portal Day'
          : 'Izberi dan Ocean Portala',

        ''

      );

    daySelect.add(
      placeholder
    );

    OCEAN_DAYS.forEach(
      d => {

        const label =
          lang === 'en'
            ? d.label
            : d.label_sl;

        const name =
          lang === 'en'
            ? d.name
            : d.name_sl;

        daySelect.add(

          new Option(

            `${label} — ${name} (${d.kin})`,

            d.date

          )

        );

      }
    );

    if(selectedDay){

      const exists =
        OCEAN_DAYS.some(
          d =>
            d.date === selectedDay
        );

      if(exists){

        daySelect.value =
          selectedDay;

      }

    }

  }


  /* -------------------------------------------------------
     INTENTIONS
  ------------------------------------------------------- */

  if(intentionSelect){

    intentionSelect.innerHTML = '';

    intentionSelect.add(

      new Option(

        lang === 'en'
          ? 'Choose your intention'
          : 'Izberi svojo namero',

        ''

      )

    );

    intents.forEach(
      item => {

        intentionSelect.add(

          new Option(

            lang === 'en'
              ? item[1]
              : item[2],

            item[1]

          )

        );

      }
    );

    if(selectedIntention){

      intentionSelect.value =
        selectedIntention;

    }

  }

}


/* =========================================================
   SELECTED PORTAL
========================================================= */

function updateSelectedPortal(){

  const box =
    getEl('#selectedPortal');

  const daySelect =
    getEl('#daySelect');

  if(!box || !daySelect){
    return;
  }

  if(
    selectedOffer !== 'portal' ||
    !daySelect.value
  ){

    box.hidden = true;

    return;

  }

  if(!hasOceanDays()){

    box.hidden = true;

    return;

  }

  const d =
    OCEAN_DAYS.find(
      x =>
        x.date === daySelect.value
    );

  if(!d){

    box.hidden = true;

    return;

  }

  const left =
    remaining(d.date);

  const name =
    lang === 'en'
      ? d.name
      : d.name_sl;

  const date =
    lang === 'en'
      ? d.label
      : d.label_sl;

  box.hidden = false;

  let availability;

  if(left === 2){

    availability =
      lang === 'en'
        ? '2 private places available'
        : 'Na voljo sta 2 zasebni mesti';

  }

  else if(left === 1){

    availability =
      lang === 'en'
        ? '1 private place available'
        : 'Na voljo je še 1 zasebno mesto';

  }

  else{

    availability =
      lang === 'en'
        ? '2 / 2 places reserved — unavailable'
        : '2 / 2 mesti sta zasedeni — ni več na voljo';

  }

  box.innerHTML = `

    <strong>
      ${date} · ${d.kin}
    </strong>

    <br>

    <span>
      ${name}
    </span>

    <br>

    ${availability}

  `;

}


/* =========================================================
   OPEN OFFER
========================================================= */

function openOffer(
  type,
  day = null
){

  const modal =
    getEl('#modal');

  if(!modal){
    return;
  }

  selectedOffer =
    type;

  selectedDay =
    day || null;

  const portal =
    type === 'portal';


  /* -------------------------------------------------------
     OPEN
  ------------------------------------------------------- */

  modal.classList.add(
    'open'
  );

  modal.setAttribute(
    'aria-hidden',
    'false'
  );


  /* -------------------------------------------------------
     TITLE
  ------------------------------------------------------- */

  const title =
    getEl('#modalTitle');

  if(title){

    title.textContent =

      portal

        ? (
            lang === 'en'
              ? 'The Caribbean Ocean Portal™'
              : 'Karibski Ocean Portal™'
          )

        : (
            lang === 'en'
              ? 'The Ocean Whisper™'
              : 'Ocean Whisper™'
          );

  }


  /* -------------------------------------------------------
     INTRO
  ------------------------------------------------------- */

  const intro =
    getEl('#modalIntro');

  if(intro){

    intro.textContent =

      portal

        ? (
            lang === 'en'
              ? 'Choose your intention and the Ocean Portal Day that calls you.'
              : 'Izberi svojo namero in dan Ocean Portala, ki te pokliče.'
          )

        : (
            lang === 'en'
              ? 'A small message from the Caribbean Sea.'
              : 'Majhno sporočilo iz Karibskega morja.'
          );

  }


  /* -------------------------------------------------------
     DAY WRAPPER
  ------------------------------------------------------- */

  const dayWrap =
    getEl('#dayWrap');

  if(dayWrap){

    dayWrap.style.display =
      portal
        ? ''
        : 'none';

  }


  /* -------------------------------------------------------
     DAY
  ------------------------------------------------------- */

  const daySelect =
    getEl('#daySelect');

  if(
    daySelect &&
    day
  ){

    daySelect.value =
      day;

  }


  /* -------------------------------------------------------
     INTENTION
  ------------------------------------------------------- */

  const intentionSelect =
    getEl('#intentionSelect');

  if(
    intentionSelect &&
    selectedIntention
  ){

    intentionSelect.value =
      selectedIntention;

  }


  updateSelectedPortal();


  /* -------------------------------------------------------
     BANK
  ------------------------------------------------------- */

  const bankDetails =
    getEl('#bankDetails');

  if(bankDetails){

    bankDetails.hidden =
      true;

    bankDetails.textContent =
      '';

  }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(){

  const modal =
    getEl('#modal');

  if(!modal){
    return;
  }

  modal.classList.remove(
    'open'
  );

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

}


/* =========================================================
   LANGUAGE TRANSLATIONS
========================================================= */

const translations = {

  en: {

    thresholdTop:
      'AQUA · BLINKITA',

    threshold1Kicker:
      'SOMEWHERE IN THE CARIBBEAN',

    threshold1Title:
      'THE OCEAN<br><em>IS WAITING.</em>',

    threshold1Text:
      'Not for a traveler.<br>For a name.',

    threshold1Button:
      'BEGIN THE JOURNEY',

    threshold2Kicker:
      'THE FIRST KEY',

    threshold2Title:
      'YOUR<br><em>NAME.</em>',

    threshold2Text:
      'Something as simple as a name<br>can become a message carried to water.',

    thresholdNameLabel:
      'YOUR NAME',

    thresholdNamePlaceholder:
      'Enter your name',

    threshold2Button:
      'CARRY IT TO THE SEA',

    threshold3Kicker:
      'THE SECOND KEY',

    threshold3Title:
      'A SHELL.<br><em>A BREATH.</em>',

    threshold3Text:
      'I whisper your name through the spiral,<br>then let the Caribbean receive it.',

    threshold3Button:
      'OPEN THE WATER',

    threshold4Kicker:
      'THE THRESHOLD',

    threshold4Title:
      'WHAT HAPPENS<br>WHEN A NAME<br><em>ENTERS THE OCEAN?</em>',

    threshold4Text:
      'The ritual begins in the Caribbean.<br>The water has no borders.',

    threshold4Button:
      'ENTER THE CARIBBEAN OCEAN PORTAL™',

    thresholdBack:
      '← BACK',

    thresholdSkip:
      'SKIP INTRO',


    navChoose:
      'CHOOSE YOUR INTENTION',

    heroEyebrow:
      'A PRIVATE CARIBBEAN EXPERIENCE · SEPTEMBER 2026',

    heroMicro:
      'YOUR NAME. &nbsp; YOUR INTENTION. &nbsp; THE CARIBBEAN SEA.',

    heroTitle:
      'SOMEWHERE IN THE CARIBBEAN,<br><em>THE OCEAN IS WAITING FOR YOUR NAME.</em>',

    heroSub:
      "You don't have to travel to the Caribbean.<br><strong>Your name can.</strong>",

    heroButton:
      'BEGIN YOUR OCEAN PORTAL',

    intentionEyebrow:
      'CHOOSE YOUR INTENTION',

    intentionTitle:
      'What are you ready to bring to the water?',

    intentionLead:
      'Choose what you want to place into the ocean moment.',

    portalEyebrow:
      'SEPTEMBER 2026',

    portalTitle:
      '13 OCEAN PORTALS.',

    portalLead:
      "Each day carries a different Tzolk'in energy. Choose the day that calls you.",

    capacityStrong:
      'Only 2 private places',

    capacityText:
      'are available for each Ocean Portal Day.',

    howEyebrow:
      'HOW THE PORTAL WORKS',

    howTitle:
      'Your intention reaches the Caribbean.',

    howLead:
      'You choose the intention. I carry your name, intention and question to the Caribbean shore, where the Ocean Portal moment takes place.',

    step1Title:
      'YOU CHOOSE',

    step1Text:
      'Your intention and the Ocean Portal Day that calls you.',

    step2Title:
      'I CARRY IT',

    step2Text:
      'Your name, intention and question to the Caribbean shore.',

    step3Title:
      'THE PORTAL OPENS',

    step3Text:
      'The shore ritual, Shell Messenger and Aqua Lemu Reiki become part of the moment.',

    step4Title:
      'THE MESSAGE RETURNS',

    step4Text:
      'I record your personal Ocean Message from beside the Caribbean Sea.',

    shellEyebrow:
      'THE SHELL MESSENGER',

    shellTitle:
      'Your name enters the water through the shell.',

    shellLead:
      'I whisper your name through its spiral, and let the ocean receive it.',

    readWater:
      'READ THE STORY OF SPEAKING TO WATER →',

    aquaEyebrow:
      'THE AQUA LEMU CURRENT',

    aquaTitle:
      'The water carries more than your name.',

    aquaText1:
      'Alongside the shore ritual, Aqua Lemu Reiki is offered as remote energetic support for your chosen intention.',

    aquaText2:
      'You do not have to be online. You do not have to be available at the exact moment. You can simply receive.',

    aquaText3:
      'If you wish to consciously participate, you can create your own quiet moment later, whenever your day allows.',

    readAqua:
      'ENTER THE AQUA LEMU STORY →',

    messageEyebrow:
      'THE OCEAN MESSAGE',

    messageTitle:
      'Not from a script.<br>Not from a template.',

    messageLead:
      'From that moment.',

    messageText:
      'After the ritual, I stay by the sea. Before I leave the shore, I record your personal Ocean Message — speaking it to you from the Caribbean shore.',

    audioLabel:
      'YOUR PERSONAL OCEAN MESSAGE',

    offersEyebrow:
      'TWO WAYS TO ENTER',

    offersTitle:
      'Choose your doorway.',

    whisperEyebrow:
      'THE OCEAN WHISPER™',

    whisperTag:
      'A small message from the sea.',

    whisper1:
      'Your name + birth date',

    whisper2:
      'One question / intention',

    whisper3:
      'Mini Aqua Lemu Reiki',

    whisper4:
      'Ocean Whisper audio',

    whisper5:
      'One photograph from the shore',

    whisperMuted:
      'A whisper from the shore.',

    whisperButton:
      'CHOOSE OCEAN WHISPER',

    portalOfferEyebrow:
      'THE CARIBBEAN OCEAN PORTAL™',

    portalOfferRegular:
      'PRIVATE EXPERIENCE · €333',

    portalOfferTag:
      'September Ocean Season',

    portal1:
      'Your name + birth date',

    portal2:
      'Your chosen intention',

    portal3:
      "Your chosen Tzolk'in Ocean Portal Day",

    portal4:
      'Private Ocean Portal ritual',

    portal5:
      'Shell Messenger',

    portal6:
      'Aqua Lemu Reiki ritual',

    portal7:
      'Personal Ocean Message recorded beside the sea',

    portal8:
      'Photograph from the shore',

    portalButton:
      'ENTER THE OCEAN PORTAL',

    finalEyebrow:
      'THE OCEAN SEASON',

    finalTitle:
      '26 names.<br>13 Ocean Days.<br>One Caribbean Sea.',

    finalLead:
      "You don't have to travel to the Caribbean. Your name can.",

    finalButton:
      'ENTER YOUR OCEAN PORTAL',

    entryEyebrow:
      'YOUR OCEAN ENTRY',

    nameLabel:
      'Name',

    emailLabel:
      'Email',

    birthLabel:
      'Birth date',

    intentionLabel:
      'Intention',

    dayLabel:
      'Ocean Portal Day',

    questionLabel:
      'Question / message',

    questionHint:
      'The more open and precise your question, the more space it creates for reflection and listening.',

    paypalButton:
      'CONTINUE TO PAYPAL',

    bankButton:
      'RESERVE BY BANK TRANSFER',

    holdNote:
      'Your place is counted only when you confirm your reservation by clicking a payment or reservation button.'

  },


  sl: {

    thresholdTop:
      'AQUA · BLINKITA',

    threshold1Kicker:
      'NEKJE NA KARIBIH',

    threshold1Title:
      'OCEAN<br><em>ČAKA.</em>',

    threshold1Text:
      'Ne na popotnika.<br>Na ime.',

    threshold1Button:
      'ZAČNI POT',

    threshold2Kicker:
      'PRVI KLJUČ',

    threshold2Title:
      'TVOJE<br><em>IME.</em>',

    threshold2Text:
      'Nekaj tako preprostega, kot je ime,<br>lahko postane sporočilo, ki ga ponese voda.',

    thresholdNameLabel:
      'TVOJE IME',

    thresholdNamePlaceholder:
      'Vpiši svoje ime',

    threshold2Button:
      'PONESI GA DO MORJA',

    threshold3Kicker:
      'DRUGI KLJUČ',

    threshold3Title:
      'ŠKOLJKA.<br><em>DIH.</em>',

    threshold3Text:
      'Tvoje ime zašepetam skozi spiralo,<br>nato pa ga prepustim Karibskemu morju.',

    threshold3Button:
      'ODPRI VODO',

    threshold4Kicker:
      'PRAG',

    threshold4Title:
      'KAJ SE ZGODI,<br>KO IME<br><em>VSTOPI V OCEAN?</em>',

    threshold4Text:
      'Ritual se začne na Karibih.<br>Voda nima meja.',

    threshold4Button:
      'VSTOPI V KARIBSKI OCEANSKI PORTAL™',

    thresholdBack:
      '← NAZAJ',

    thresholdSkip:
      'PRESKOČI UVOD',

    navChoose:
      'IZBERI SVOJO NAMERO',

    heroEyebrow:
      'ZASEBNA KARIBSKA IZKUŠNJA · SEPTEMBER 2026',

    heroMicro:
      'TVOJE IME. &nbsp; TVOJA NAMERA. &nbsp; KARIBSKO MORJE.',

    heroTitle:
      'NEKJE NA KARIBIH<br><em>OCEAN ČAKA NA TVOJE IME.</em>',

    heroSub:
      'Ni ti treba potovati na Karibe.<br><strong>Tvoje ime lahko.</strong>',

    heroButton:
      'ZAČNI SVOJ OCEANSKI PORTAL',

    intentionEyebrow:
      'IZBERI SVOJO NAMERO',

    intentionTitle:
      'Kaj si pripravljen_a prinesti vodi?',

    intentionLead:
      'Izberi, kaj želiš položiti v oceanski trenutek.',

    portalEyebrow:
      'SEPTEMBER 2026',

    portalTitle:
      '13 OCEANSKIH PORTALOV.',

    portalLead:
      'Vsak dan nosi drugačno energijo Tzolkina. Izberi dan, ki te pokliče.',

    capacityStrong:
      'Na voljo sta samo 2 zasebni mesti',

    capacityText:
      'za vsak dan Ocean Portala.',

    howEyebrow:
      'KAKO DELUJE PORTAL',

    howTitle:
      'Tvoja namera doseže Karibe.',

    howLead:
      'Ti izbereš namero. Jaz ponesem tvoje ime, namero in vprašanje do Karibskega morja, kjer se zgodi tvoj Ocean Portal trenutek.',

    step1Title:
      'TI IZBEREŠ',

    step1Text:
      'Svojo namero in dan Ocean Portala, ki te pokliče.',

    step2Title:
      'JAZ PONESEM',

    step2Text:
      'Tvoje ime, namero in vprašanje do Karibskega morja.',

    step3Title:
      'PORTAL SE ODPRE',

    step3Text:
      'Obred ob obali, Glasnik školjke in Aqua Lemu Reiki postanejo del trenutka.',

    step4Title:
      'SPOROČILO SE VRNE',

    step4Text:
      'Ob Karibskem morju posnamem tvoje osebno Oceansko sporočilo.',

    shellEyebrow:
      'GLASNIK ŠKOLJKE',

    shellTitle:
      'Tvoje ime vstopi v vodo skozi školjko.',

    shellLead:
      'Tvoje ime zašepetam skozi njeno spiralo in pustim, da ga sprejme ocean.',

    readWater:
      'PREBERI ZGODBO O GOVORJENJU Z VODO →',

    aquaEyebrow:
      'TOK AQUA LEMU',

    aquaTitle:
      'Voda nosi več kot samo tvoje ime.',

    aquaText1:
      'Ob ritualu na obali je Aqua Lemu Reiki ponujen kot energijska podpora na daljavo za tvojo izbrano namero.',

    aquaText2:
      'Ni ti treba biti na spletu. Ni ti treba biti dosegljiv_a ob točno določenem trenutku. Lahko samo prejmeš.',

    aquaText3:
      'Če želiš zavestno sodelovati, lahko kasneje, ko ti dopušča dan, ustvariš svoj miren trenutek.',

    readAqua:
      'VSTOPI V ZGODBO AQUA LEMU →',

    messageEyebrow:
      'OCEANSKO SPOROČILO',

    messageTitle:
      'Ne iz scenarija.<br>Ne iz predloge.',

    messageLead:
      'Iz tega trenutka.',

    messageText:
      'Po ritualu ostanem ob morju. Preden zapustim obalo, posnamem tvoje osebno Oceansko sporočilo — in ti ga povem iz karibske obale.',

    audioLabel:
      'TVOJE OSEBNO OCEANSKO SPOROČILO',

    offersEyebrow:
      'DVA NAČINA VSTOPA',

    offersTitle:
      'Izberi svoja vrata.',

    whisperEyebrow:
      'THE OCEAN WHISPER™',

    whisperTag:
      'Majhno sporočilo iz morja.',

    whisper1:
      'Tvoje ime + datum rojstva',

    whisper2:
      'Eno vprašanje / namera',

    whisper3:
      'Mini Aqua Lemu Reiki',

    whisper4:
      'Ocean Whisper zvočno sporočilo',

    whisper5:
      'Ena fotografija z obale',

    whisperMuted:
      'Šepet z obale.',

    whisperButton:
      'IZBERI OCEAN WHISPER',

    portalOfferEyebrow:
      'THE CARIBBEAN OCEAN PORTAL™',

    portalOfferRegular:
      'ZASEBNA IZKUŠNJA · €333',

    portalOfferTag:
      'Septembrska oceanska sezona',

    portal1:
      'Tvoje ime + datum rojstva',

    portal2:
      'Tvoja izbrana namera',

    portal3:
      "Tvoj izbrani Tzolk'in Ocean Portal",

    portal4:
      'Zasebni ritual Ocean Portala',

    portal5:
      'Glasnik školjke',

    portal6:
      'Aqua Lemu Reiki ritual',

    portal7:
      'Osebno Oceansko sporočilo, posneto ob morju',

    portal8:
      'Fotografija z obale',

    portalButton:
      'VSTOPI V OCEANSKI PORTAL',

    finalEyebrow:
      'OCEANSKA SEZONA',

    finalTitle:
      '26 imen.<br>13 oceanskih dni.<br>Eno Karibsko morje.',

    finalLead:
      'Ni ti treba potovati na Karibe. Tvoje ime lahko.',

    finalButton:
      'VSTOPI V SVOJ OCEANSKI PORTAL',

    entryEyebrow:
      'TVOJ VSTOP V OCEAN',

    nameLabel:
      'Ime',

    emailLabel:
      'E-pošta',

    birthLabel:
      'Datum rojstva',

    intentionLabel:
      'Namera',

    dayLabel:
      'Dan Ocean Portala',

    questionLabel:
      'Vprašanje / sporočilo',

    questionHint:
      'Bolj odprto in natančno kot je tvoje vprašanje, več prostora ustvari za razmislek in poslušanje.',

    paypalButton:
      'NADALJUJ NA PAYPAL',

    bankButton:
      'REZERVIRAJ Z NAKAZILOM',

    holdNote:
      'Tvoje mesto se šteje kot rezervirano šele, ko potrdiš rezervacijo s klikom na plačilo ali gumb za rezervacijo.'

  }

};


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLang(){

  const t =
    translations[lang];

  if(!t){
    return;
  }


  /* -------------------------------------------------------
     TRANSLATED ELEMENTS
  ------------------------------------------------------- */

  document
    .querySelectorAll(
      '[data-i18n]'
    )
    .forEach(
      el => {

        const key =
          el.dataset.i18n;

        if(
          Object.prototype.hasOwnProperty.call(
            t,
            key
          )
        ){

          el.innerHTML =
            t[key];

        }

      }
    );


  /* -------------------------------------------------------
     PLACEHOLDERS
  ------------------------------------------------------- */

  document
    .querySelectorAll(
      '[data-i18n-placeholder]'
    )
    .forEach(
      el => {

        const key =
          el.dataset.i18nPlaceholder;

        if(
          Object.prototype.hasOwnProperty.call(
            t,
            key
          )
        ){

          el.placeholder =
            t[key];

        }

      }
    );


  /* -------------------------------------------------------
     MAIN LANGUAGE BUTTON
  ------------------------------------------------------- */

  const langToggle =
    getEl('#langToggle');

  if(langToggle){

    langToggle.textContent =
      lang === 'en'
        ? 'SI'
        : 'EN';

  }


  /* -------------------------------------------------------
     INTRO LANGUAGE BUTTON
  ------------------------------------------------------- */

  const thresholdLangToggle =
    getEl('#thresholdLangToggle');

  if(thresholdLangToggle){

    thresholdLangToggle.textContent =
      lang === 'en'
        ? 'SI'
        : 'EN';

  }


  document.documentElement.lang =
    lang;


  /* -------------------------------------------------------
     DYNAMIC CONTENT
  ------------------------------------------------------- */

  renderIntents();

  renderPortals();

  renderSelects();

  updateIntentionConfirmation();

  updateSelectedPortal();

}


/* =========================================================
   THRESHOLD INTRO
========================================================= */

function initThreshold(){

  const threshold =
    getEl('#threshold');

  if(!threshold){

    console.warn(
      'AQUA: #threshold not found.'
    );

    return;

  }


  const slides =
    Array.from(
      threshold.querySelectorAll(
        '.threshold-slide'
      )
    );

  const count =
    threshold.querySelector(
      '#thresholdCount'
    );

  const back =
    threshold.querySelector(
      '#thresholdBack'
    );

  const progress =
    threshold.querySelector(
      '.threshold-progress i'
    );


  let currentSlide =
    0;


  /* -------------------------------------------------------
     SHOW SLIDE
  ------------------------------------------------------- */

  function showSlide(n){

    if(!slides.length){
      return;
    }

    currentSlide =
      Math.max(
        0,
        Math.min(
          slides.length - 1,
          Number(n)
        )
      );


    slides.forEach(
      (slide,index) => {

        slide.classList.toggle(
          'active',
          index === currentSlide
        );

      }
    );


    if(count){

      count.textContent =
        `0${currentSlide + 1} / ${String(slides.length).padStart(2,'0')}`;

    }


    if(back){

      back.style.opacity =
        currentSlide > 0
          ? '1'
          : '0';

      back.style.pointerEvents =
        currentSlide > 0
          ? 'auto'
          : 'none';

    }


    if(progress){

      progress.style.width =
        (
          (
            currentSlide + 1
          )
          /
          slides.length
          *
          100
        )
        + '%';

    }

  }


  /* -------------------------------------------------------
     LEAVE INTRO
  ------------------------------------------------------- */

  function leaveThreshold(){

    if(
      threshold.dataset.leaving === 'true'
    ){

      return;

    }

    threshold.dataset.leaving =
      'true';

    threshold.classList.add(
      'leaving'
    );


    /*
       IMPORTANT:

       We unlock the page immediately.
       The visual fade can continue.
    */

    document.body.classList.remove(
      'portal-lock'
    );


    threshold.setAttribute(
      'aria-hidden',
      'true'
    );


    setTimeout(
      ()=>{

        threshold.style.display =
          'none';

      },
      850
    );

  }


  /* -------------------------------------------------------
     EVENT DELEGATION
     
     THIS IS THE IMPORTANT FIX.
     
     We do NOT attach click listeners to individual
     translated buttons anymore.
  ------------------------------------------------------- */

  threshold.addEventListener(
    'click',
    event => {

      const target =
        event.target.closest(
          'button, a'
        );

      if(!target){
        return;
      }


      /* ---------------------------------------------------
         SKIP
      --------------------------------------------------- */

      if(
        target.matches(
          '#skipThreshold'
        )
      ){

        event.preventDefault();

        leaveThreshold();

        return;

      }


      /* ---------------------------------------------------
         ENTER
      --------------------------------------------------- */

      if(
        target.matches(
          '#enterPortal'
        )
      ){

        event.preventDefault();

        leaveThreshold();

        return;

      }


      /* ---------------------------------------------------
         BACK
      --------------------------------------------------- */

      if(
        target.matches(
          '#thresholdBack'
        )
      ){

        event.preventDefault();

        showSlide(
          currentSlide - 1
        );

        return;

      }


      /* ---------------------------------------------------
         LANGUAGE
      --------------------------------------------------- */

      if(
        target.matches(
          '#thresholdLangToggle'
        )
      ){

        event.preventDefault();

        lang =
          lang === 'en'
            ? 'sl'
            : 'en';

        applyLang();

        return;

      }


      /* ---------------------------------------------------
         NEXT
      --------------------------------------------------- */

      if(
        target.matches(
          '.threshold-next'
        )
      ){

        event.preventDefault();


        /*
           Slide 2 = index 1
        */

        if(currentSlide === 1){

          const nameInput =
            threshold.querySelector(
              '#thresholdName'
            );

          if(nameInput){

            const name =
              nameInput.value.trim();

            if(name){

              localStorage.setItem(
                'aquaVisitorName',
                name
              );

            }

          }

        }


        showSlide(
          currentSlide + 1
        );

      }

    }
  );


  /* -------------------------------------------------------
     INITIAL LOCK
  ------------------------------------------------------- */

  document.body.classList.add(
    'portal-lock'
  );


  threshold.style.display =
    '';


  threshold.classList.remove(
    'leaving'
  );


  threshold.dataset.leaving =
    'false';


  threshold.setAttribute(
    'aria-hidden',
    'false'
  );


  /* -------------------------------------------------------
     INITIAL SLIDE
  ------------------------------------------------------- */

  showSlide(0);

}


/* =========================================================
   MAIN LANGUAGE TOGGLE
========================================================= */

function initLanguage(){

  /*
     Event delegation on document.
     This prevents translation/rendering from
     ever breaking the language button.
  */

  document.addEventListener(
    'click',
    event => {

      const button =
        event.target.closest(
          '#langToggle'
        );

      if(!button){
        return;
      }

      event.preventDefault();

      lang =
        lang === 'en'
          ? 'sl'
          : 'en';

      applyLang();

    }
  );

}


/* =========================================================
   GENERAL CLICK HANDLERS
========================================================= */

function initGeneralClicks(){

  /* -------------------------------------------------------
     CLOSE MODAL
  ------------------------------------------------------- */

  document.addEventListener(
    'click',
    event => {

      const close =
        event.target.closest(
          '#close'
        );

      if(close){

        event.preventDefault();

        closeModal();

        return;

      }


      /* ---------------------------------------------------
         MODAL BACKDROP
      --------------------------------------------------- */

      const modal =
        getEl('#modal');

      if(
        modal &&
        event.target === modal
      ){

        closeModal();

        return;

      }


      /* ---------------------------------------------------
         INTENTION
      --------------------------------------------------- */

      const intentionButton =
        event.target.closest(
          '[data-intention]'
        );

      if(intentionButton){

        selectedIntention =
          intentionButton.dataset.intention;

        const intentionSelect =
          getEl('#intentionSelect');

        if(intentionSelect){

          intentionSelect.value =
            selectedIntention;

        }

        renderIntents();

        updateIntentionConfirmation();

        return;

      }


      /* ---------------------------------------------------
         PORTAL CARD
      --------------------------------------------------- */

      const dayButton =
        event.target.closest(
          '[data-day]'
        );

      if(dayButton){

        event.preventDefault();

        if(!hasOceanDays()){
          return;
        }

        const index =
          Number(
            dayButton.dataset.day
          );

        const day =
          OCEAN_DAYS[index];

        if(!day){
          return;
        }

        if(
          remaining(day.date) <= 0
        ){

          return;

        }

        openOffer(
          'portal',
          day.date
        );

        return;

      }


      /* ---------------------------------------------------
         OFFER BUTTON
      --------------------------------------------------- */

      const offerButton =
        event.target.closest(
          '[data-offer]'
        );

      if(offerButton){

        event.preventDefault();

        openOffer(
          offerButton.dataset.offer
        );

      }

    }
  );

}


/* =========================================================
   SELECT EVENTS
========================================================= */

function initSelects(){

  const daySelect =
    getEl('#daySelect');

  const intentionSelect =
    getEl('#intentionSelect');


  /* -------------------------------------------------------
     DAY
  ------------------------------------------------------- */

  if(daySelect){

    daySelect.addEventListener(
      'change',
      ()=>{

        selectedDay =
          daySelect.value || null;

        updateSelectedPortal();

      }
    );

  }


  /* -------------------------------------------------------
     INTENTION
  ------------------------------------------------------- */

  if(intentionSelect){

    intentionSelect.addEventListener(
      'change',
      ()=>{

        selectedIntention =
          intentionSelect.value || '';

        renderIntents();

        updateIntentionConfirmation();

      }
    );

  }

}


/* =========================================================
   BANK DETAILS
========================================================= */

function initBankButton(){

  const bankButton =
    getEl('#bankButton');

  if(!bankButton){
    return;
  }

  bankButton.addEventListener(
    'click',
    event => {

      event.preventDefault();


      const box =
        getEl('#bankDetails');

      if(!box){
        return;
      }


      /* ---------------------------------------------------
         PORTAL
      --------------------------------------------------- */

      if(
        selectedOffer === 'portal'
      ){

        const daySelect =
          getEl('#daySelect');

        const date =
          daySelect
            ? daySelect.value
            : '';


        if(!date){

          alert(

            lang === 'en'

              ? 'Please choose an Ocean Portal Day first.'

              : 'Najprej izberi dan Ocean Portala.'

          );

          return;

        }


        if(
          remaining(date) <= 0
        ){

          alert(

            lang === 'en'

              ? 'This Ocean Portal Day is already full.'

              : 'Ta dan Ocean Portala je že poln.'

          );

          renderPortals();

          updateSelectedPortal();

          return;

        }


        const reserved =
          reserveSlot(date);


        if(!reserved){

          alert(

            lang === 'en'

              ? 'This Ocean Portal Day has just become full.'

              : 'Ta dan Ocean Portala je pravkar postal poln.'

          );

          renderPortals();

          updateSelectedPortal();

          return;

        }


        renderPortals();

        updateSelectedPortal();


        box.hidden =
          false;

        box.textContent =

          lang === 'en'

            ? `RESERVATION RECEIVED

${BANK}

Amount: €99

Please use your name as the payment description.

Your Ocean Portal place has been marked as reserved.

Please complete the bank transfer to confirm the reservation.`

            : `REZERVACIJA PREJETA

${BANK}

Znesek: €99

V namen/sklic prosim dodaj svoje ime.

Tvoje mesto v Ocean Portalu je označeno kot rezervirano.

Za potrditev rezervacije prosim izvedi bančno nakazilo.`;

        return;

      }


      /* ---------------------------------------------------
         WHISPER
      --------------------------------------------------- */

      box.hidden =
        false;

      box.textContent =

        lang === 'en'

          ? `BANK TRANSFER

${BANK}

Amount: €55

Please use your name as the payment description.`

          : `BANČNO NAKAZILO

${BANK}

Znesek: €55

V namen/sklic prosim dodaj svoje ime.`;

    }
  );

}


/* =========================================================
   BOOKING FORM
========================================================= */

function initBookingForm(){

  const bookingForm =
    getEl('#bookingForm');

  if(!bookingForm){
    return;
  }

  bookingForm.addEventListener(
    'submit',
    event => {

      event.preventDefault();


      /* ---------------------------------------------------
         WHISPER
      --------------------------------------------------- */

      if(
        selectedOffer === 'whisper'
      ){

        window.location.href =
          PAYPAL.whisper;

        return;

      }


      /* ---------------------------------------------------
         PORTAL
      --------------------------------------------------- */

      const daySelect =
        getEl('#daySelect');

      const date =
        daySelect
          ? daySelect.value
          : '';


      if(!date){

        alert(

          lang === 'en'

            ? 'Please choose an Ocean Portal Day.'

            : 'Prosim izberi dan Ocean Portala.'

        );

        return;

      }


      if(
        remaining(date) <= 0
      ){

        alert(

          lang === 'en'

            ? 'This Ocean Portal Day is already full. Please choose another day.'

            : 'Ta dan Ocean Portala je že poln. Prosim izberi drug dan.'

        );

        renderPortals();

        updateSelectedPortal();

        return;

      }


      const reserved =
        reserveSlot(date);


      if(!reserved){

        alert(

          lang === 'en'

            ? 'This Ocean Portal Day has just become full. Please choose another day.'

            : 'Ta dan Ocean Portala je pravkar postal poln. Prosim izberi drug dan.'

        );

        renderPortals();

        updateSelectedPortal();

        return;

      }


      renderPortals();


      window.location.href =
        PAYPAL.portal;

    }
  );

}


/* =========================================================
   INITIALIZE APP
========================================================= */

function initApp(){

  console.log(
    'AQUA · BLINKITA initializing...'
  );


  /*
     1. INTRO
  */

  initThreshold();


  /*
     2. LANGUAGE
  */

  initLanguage();


  /*
     3. GENERAL CLICKS
  */

  initGeneralClicks();


  /*
     4. SELECTS
  */

  initSelects();


  /*
     5. BANK
  */

  initBankButton();


  /*
     6. BOOKING
  */

  initBookingForm();


  /*
     7. CONTENT
  */

  renderIntents();

  renderPortals();

  renderSelects();

  updateIntentionConfirmation();

  updateSelectedPortal();


  /*
     8. LANGUAGE
  */

  applyLang();


  console.log(
    'AQUA · BLINKITA ready.'
  );

}


/* =========================================================
   DOM READY
========================================================= */

if(
  document.readyState === 'loading'
){

  document.addEventListener(
    'DOMContentLoaded',
    initApp,
    {
      once: true
    }
  );

}

else{

  initApp();

}
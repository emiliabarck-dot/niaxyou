'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Heart, Users, Mail, Play, FileText, Shield, Palette, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const CoverViewer = dynamic(() => import('../components/CoverViewer'), { ssr: false });

type Page = 'home' | 'patient' | 'clinician';
type Lang = 'en' | 'uk' | 'lg';
type FrontDesign = 'plain' | 'bird' | 'floral' | 'pattern';

const CONTACT_EMAIL = 'info@niatech.org';

const gallery = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
  '/images/gallery-5.jpg',
  '/images/gallery-6.jpg',
];

const coverColors = [
  '#d91f2c', '#8fd8ff', '#1f3f75', '#f85f9a',
  '#ff9f1c', '#2f9e44', '#ffe76a', '#9b83b8',
  '#111827', '#ffffff', '#f2c4a8', '#d2b48c',
  '#8b5a2b', '#4b2e1f', '#9ca3af', '#165c32',
];
const strapColors = [
  '#111827', '#ffffff', '#8b5a2b', '#d91f2c',
  '#ffe76a', '#2f9e44', '#2563eb', '#f85f9a',
];

const text = {
  en: {
    home: 'Home', patient: 'Patient View', clinician: 'Clinician View', partner: 'In Partnership with Nia Technologies',
    title: 'Nia x You', subtitle: 'Empowering amputees with customizable, 3D-printed prosthetic covers designed for comfort, protection, and personal expression.',
    missionTitle: 'Our Mission', mission: 'Nia x You partners with clinics worldwide to provide customizable, 3D-printed prosthetic covers for children and adults. We believe everyone deserves comfort, protection, and the chance to express themselves with pride.',
    ready: 'Ready to Get Started?', patients: 'For Patients & Families', patientsBody: 'Learn about prosthetic covers, explore design options, and see what to expect when working with your clinic.', explore: 'Explore as a Patient',
    clinicians: 'For Clinicians & Partners', cliniciansBody: 'Access step-by-step instructions for using Fusion 360 and creating custom covers for your patients.', guide: 'View Clinician Guide',
    gallery: 'Design Gallery', galleryBody: 'Explore different cover designs, colors, and patterns in real-world use.', involved: 'Get Involved', involvedBody: 'Interested in partnering with us or supporting this initiative? We welcome clinics, organizations, and supporters who share our vision.', contact: 'Contact us at:', about: 'About Nia Technologies:', aboutBody: 'A Canadian non-profit enterprise that produces custom prosthetic sockets for people in low-income regions.', visit: 'Visit Website',
    patientBadge: 'For Patients & Families', patientTitle: 'Your Custom Prosthetic Cover', patientSub: 'Comfortable, colorful, and completely yours', whatTitle: 'What Are Prosthetic Covers?', whatBody: 'Our prosthetic covers are lightweight outer shells that fit over a lower-limb prosthesis, designed to protect and personalize it. They help shield the prosthetic from everyday bumps and scratches while also creating a comfortable experience during daily use.\n\nBeyond protection, prosthetic covers offer something just as important: a way to express who you are. Instead of feeling purely medical or standardized, your prosthesis can reflect your personality, your style, and even your culture through colors and designs you choose. For many, this transforms the experience from a medical assist into something you can take pride in or feel comfortable and safe in.', why: 'Why Choose a Custom Cover?', comfort: 'Comfort & Protection', comfortBody: 'Soft, durable material shields your prosthetic from daily wear.', confidence: 'Confidence & Expression', confidenceBody: 'Choose colors and patterns that reflect who you are.', local: 'Local & Accessible', localBody: 'Made at your local clinic using 3D printing technology.', expect: 'What to Expect', step1: 'Step 1: Consultation', step1b: 'Visit your local partnered clinic for measurements and assessment.', step2: 'Step 2: Choose Your Design', step2b: 'Select cover colors, strap colors, and front cover designs that you love.', step3: 'Step 3: Try It On', step3b: 'Once printed, try on your custom cover and see how it fits and feels.', preview: 'Design Preview', coverColor: 'Cover Color', strapColor: 'Strap Color', frontDesign: 'Front Design', plain: 'Plain', floral: 'Floral', bird: 'Bird', pattern: 'Pattern', photo: 'Photo', close: 'Close',
    clinicianBadge: 'For Clinicians & Partners', clinicianTitle: 'Clinician Implementation Guide', clinicianSub: 'Complete workflow for creating custom prosthetic covers using Fusion 360 and 3D printing', process: 'Process Overview', processBody: 'This guide walks you through the complete workflow for creating custom prosthetic covers using Fusion 360 and 3D printing. The parametric design system allows you to input patient measurements and customize appearance quickly and reliably.', video: 'Video Tutorial', workflow: 'Step-by-Step Workflow', c1: 'Patient Assessment', c1b: 'Gather accurate measurements of the residual limb and prosthetic device. Record circumference, length, and any specific fitting requirements.', c2: 'Open Fusion 360 Menu', c2b: 'After launching Fusion 360 on your device and opening the correct cover project, open the menu by navigating to Utilities -> Add-ins -> Nia Technologies Custom Prosthetic Cover Menu on the upper tabs. All patient info, measurement, and appearance input changes can be found here.', c3: 'Input Patient Measurements', c3b: 'Update the model parameters with the patient-specific measurements. The design will automatically adjust to fit according to the adjusted parameter. Parameters include cover length, calf width, ankle width, top strap width, top strap length, pylon offset width, pylon offset height, pylon offset distance from bottom of cover, and pylon offset length.', c4: 'Customize Appearance', c4b: "Apply patient-selected colors using Fusion 360 appearance settings to display in Fusion. Either input color preferences into code beforehand and edit menu driven color options (contact for detailed instructions) or click 'A' on keyboard to open Fusion appearances menu. Drag and drop Glossy Paint enamel to the cover to apply different colors to cover exterior. Customize the colors by editing the paint settings and choosing from the color selector. Otherwise, use design preview in Patient View tab on this website.", c5: 'Export for 3D Printing', c5b: 'Export the model both as a JSON and internally in Fusion to save. Prepare the file in your slicing software with appropriate print settings for flexible (PEBA 95A) material.', c6: 'Print & Fit', c6b: 'Print the cover and conduct a fitting session with the patient. Make any necessary adjustments and ensure comfort and proper function.', enlarge: 'Click image to enlarge'
  },
  uk: {
    home: 'Головна', patient: 'Для пацієнтів', clinician: 'Для клініцистів', partner: 'У партнерстві з Nia Technologies',
    title: 'Nia x You', subtitle: 'Допомагаємо людям з ампутацією отримати індивідуальні 3D-друковані протезні накладки для комфорту, захисту та самовираження.',
    missionTitle: 'Наша місія', mission: 'Nia x You співпрацює з клініками по всьому світу, щоб надавати індивідуальні 3D-друковані протезні накладки для дітей і дорослих. Ми віримо, що кожна людина заслуговує на комфорт, захист і можливість виражати себе з гордістю.',
    ready: 'Готові почати?', patients: 'Для пацієнтів і родин', patientsBody: 'Дізнайтеся про протезні накладки, перегляньте варіанти дизайну та зрозумійте, чого очікувати під час роботи з клінікою.', explore: 'Перейти як пацієнт',
    clinicians: 'Для клініцистів і партнерів', cliniciansBody: 'Отримайте покрокові інструкції з використання Fusion 360 та створення індивідуальних накладок для пацієнтів.', guide: 'Переглянути посібник',
    gallery: 'Галерея дизайнів', galleryBody: 'Перегляньте різні дизайни, кольори та візерунки накладок у реальному використанні.', involved: 'Долучайтеся', involvedBody: 'Зацікавлені у партнерстві або підтримці ініціативи? Ми раді клінікам, організаціям і прихильникам, які поділяють наше бачення.', contact: 'Напишіть нам:', about: 'Про Nia Technologies:', aboutBody: 'Канадська неприбуткова організація, що виготовляє індивідуальні протезні гільзи для людей у регіонах з низьким рівнем доходу.', visit: 'Відвідати сайт',
    patientBadge: 'Для пацієнтів і родин', patientTitle: 'Ваша індивідуальна протезна накладка', patientSub: 'Зручна, яскрава і повністю ваша', whatTitle: 'Що таке протезні накладки?', whatBody: 'Протезні накладки — це захисні індивідуальні оболонки, які встановлюються поверх протезів нижніх кінцівок. Вони забезпечують комфорт, захист від ударів і подряпин та дозволяють виразити свою індивідуальність через обрані кольори й дизайни.', why: 'Чому варто обрати індивідуальну накладку?', comfort: 'Комфорт і захист', comfortBody: 'М’який і міцний матеріал захищає протез від щоденного зношування.', confidence: 'Упевненість і самовираження', confidenceBody: 'Оберіть кольори та візерунки, які відображають вашу особистість.', local: 'Локально й доступно', localBody: 'Виготовляється у вашій місцевій клініці за допомогою 3D-друку.', expect: 'Чого очікувати', step1: 'Крок 1: Консультація', step1b: 'Відвідайте партнерську клініку для вимірювань та оцінки.', step2: 'Крок 2: Оберіть дизайн', step2b: 'Оберіть кольори накладки, ремінців і дизайн передньої частини, який вам подобається.', step3: 'Крок 3: Примірка', step3b: 'Після друку приміряйте накладку та перевірте, як вона сидить і відчувається.', preview: 'Попередній перегляд дизайну', coverColor: 'Колір накладки', strapColor: 'Колір ремінця', frontDesign: 'Передній дизайн', plain: 'Однотонний', floral: 'Квітковий', bird: 'Птах', pattern: 'Візерунок', photo: 'Фото', close: 'Закрити',
    clinicianBadge: 'Для клініцистів і партнерів', clinicianTitle: 'Посібник для клініцистів', clinicianSub: 'Повний процес створення індивідуальних протезних накладок за допомогою Fusion 360 і 3D-друку', process: 'Огляд процесу', processBody: 'Цей посібник описує повний процес створення індивідуальних протезних накладок за допомогою Fusion 360 і 3D-друку. Параметрична система дизайну дозволяє вводити вимірювання пацієнта та швидко й надійно налаштовувати зовнішній вигляд.', video: 'Відеоінструкція', workflow: 'Покроковий процес', c1: 'Оцінка пацієнта', c1b: 'Зберіть точні вимірювання залишкової кінцівки та протезного пристрою. Запишіть окружність, довжину та особливі вимоги до посадки.', c2: 'Відкрийте шаблон Fusion 360', c2b: 'Відкрийте меню, перейшовши у верхніх вкладках до Utilities -> Add-ins -> Nia Technologies Custom Prosthetic Cover Menu.', c3: 'Введіть вимірювання пацієнта', c3b: 'Оновіть параметри моделі відповідно до вимірювань пацієнта. Дизайн автоматично адаптується до форми.', c4: 'Налаштуйте зовнішній вигляд', c4b: "Застосуйте обрані пацієнтом кольори за допомогою налаштувань Fusion 360 appearance. Можна заздалегідь ввести колірні вподобання в код і редагувати керовані меню параметри кольору (див. відеоінструкцію нижче), або натиснути 'A' на клавіатурі, щоб відкрити меню Fusion appearances. Перетягніть Glossy Paint enamel на накладку, щоб застосувати різні кольори до зовнішньої поверхні. Налаштуйте кольори, редагуючи параметри фарби та обираючи колір у селекторі. (у відеоінструкції)", c5: 'Експорт для 3D-друку', c5b: 'Експортуйте модель як STL або 3MF. Підготуйте файл у слайсері з відповідними параметрами друку для гнучкого матеріалу.', c6: 'Друк і примірка', c6b: 'Надрукуйте накладку та проведіть примірку з пацієнтом. За потреби внесіть коригування та переконайтеся в комфорті й правильній роботі.', enlarge: 'Натисніть зображення, щоб збільшити'
  },
  lg: {
    home: 'Awaka', patient: 'Eky’abalwadde', clinician: 'Eky’abasawo', partner: 'Mu kukolagana ne Nia Technologies',
    title: 'Nia x You', subtitle: 'Tuyamba abantu abakozesa amagulu ag’obulimba okufuna ebibikka ebikolebwa ku 3D printer, ebituukana n’omuntu, ebiwa obuweerero, obukuumi n’okweyoleka.',
    missionTitle: 'Ekigendererwa Kyaffe', mission: 'Nia x You ekolagana n’amalwaliro mu nsi yonna okuwa abaana n’abantu abakulu ebibikka by’amagulu ag’obulimba ebikolebwa ku 3D printer. Tukkiriza nti buli muntu asaanidde obuweerero, obukuumi, n’omukisa gw’okweyoleka n’okwenyumiriza.',
    ready: 'Mwetegefu Okutandika?', patients: 'Abalwadde n’Amaka', patientsBody: 'Yiga ku bibikka by’amagulu ag’obulimba, laba engeri z’okukola dizayini, era manya ky’olina okusuubira ng’okola n’eddwaliro lyo.', explore: 'Kebera ng’Omulwadde',
    clinicians: 'Abasawo n’Abakolagana', cliniciansBody: 'Funa ebiragiro ebigenda mutendera ku nkozesa ya Fusion 360 n’okukola ebibikka by’abalwadde.', guide: 'Laba Ebiragiro by’Abasawo',
    gallery: 'Ekifo ky’Ebifaananyi', galleryBody: 'Laba dizayini, langi, n’enkula ez’enjawulo ez’ebibikka mu nkozesa entuufu.', involved: 'Yegatte Ku Ffe', involvedBody: 'Oyagala okukolagana naffe oba okuwagira enteekateeka eno? Twaniriza amalwaliro, ebibiina, n’abawagizi abagabana naffe ekirowoozo kino.', contact: 'Tuwandiikire ku:', about: 'Ku Nia Technologies:', aboutBody: 'Ekitongole kya Canada ekitali kya magoba ekikola sockets z’obulimba ezituukana n’abantu mu bitundu ebya ssente entono.', visit: 'Kyalira Omukutu',
    patientBadge: 'Abalwadde n’Amaka', patientTitle: 'Ekibikka Kyo eky’Ekigere eky’Obulimba', patientSub: 'Kya kuweweeza, kya langi, era kikyo ddala', whatTitle: 'Ebibikka by’Amagulu ag’Obulimba kye ki?', whatBody: 'Ebibikka by’amagulu ag’obulimba biba bikola ng’olususu olukwata ku kigere ky’obulimba ekya wansi. Biwa obuweerero, bikuuma okuva ku kukosebwa n’okukubibwa, era bikuyamba okulaga omutindo gwo mu langi ne dizayini z’olonda.', why: 'Lwaki olonda ekibikka ekikukwatira?', comfort: 'Obuweerero & Obukuumi', comfortBody: 'Ekintu ekigonvu era ekigumu kikuuma prosthetic yo mu nkozesa ya buli lunaku.', confidence: 'Obwesige & Okweyoleka', confidenceBody: 'Londa langi n’enkula ezikubonereza.', local: 'Kiri kumpi era kyangu', localBody: 'Kikolebwa mu ddwaliro lyo nga bakozesa tekinologiya wa 3D printing.', expect: 'Ky’osuubira', step1: 'Omutendera 1: Okwebuuza', step1b: 'Kyalira eddwaliro erikolagana naffe bakupime era bakukebera.', step2: 'Omutendera 2: Londa Dizayini', step2b: 'Londa langi z’ekibikka, langi z’emikoba, ne dizayini y’omu maaso gy’oyagala.', step3: 'Omutendera 3: Kigezeeko', step3b: 'Bwe kimala okukubibwa ku 3D printer, kigezeeko olabe nga kikutuukana era nga kiwulira bulungi.', preview: 'Okulaba Dizayini', coverColor: 'Langi y’Ekibikka', strapColor: 'Langi y’Omukoba', frontDesign: 'Dizayini y’Omu Maaso', plain: 'Ya langi emu', floral: 'Ebimuli', bird: 'Ennyonyi', pattern: 'Enkula', photo: 'Ekifaananyi', close: 'Ggalawo',
    clinicianBadge: 'Abasawo n’Abakolagana', clinicianTitle: 'Ebiragiro by’Abasawo', clinicianSub: 'Enkola yonna ey’okukola ebibikka by’amagulu ag’obulimba nga mukozesa Fusion 360 ne 3D printing', process: 'Endabika y’Enkola', processBody: 'Ebiragiro bino bikulaga enkola yonna ey’okukola ebibikka by’amagulu ag’obulimba nga mukozesa Fusion 360 ne 3D printing. Enkola ya parametric design ekusobozesa okuyingiza ebipimo by’omulwadde n’okukyusa endabika mu bwangu era mu bwesigwa.', video: 'Vidiyo y’Ebiragiro', workflow: 'Enkola mu Mitendera', c1: 'Okukebera Omulwadde', c1b: 'Funa ebipimo ebituufu eby’ekitundu ky’omubiri ekisigadde n’ekigere ky’obulimba. Wandiika obwetoolovu, obuwanvu, n’ebintu ebyetaagisa okukwatagana obulungi.', c2: 'Ggulawo Template ya Fusion 360', c2b: 'Ggulawo menu ng’ogenda ku Utilities -> Add-ins -> Nia Technologies Custom Prosthetic Cover Menu ku tabs ez’awaggulu.', c3: 'Yingiza Ebipimo by’Omulwadde', c3b: 'Kyusa parameters za model okusinziira ku bipimo by’omulwadde. Dizayini ejja kwetereeza okukwatagana.', c4: 'Kyusa Endabika', c4b: "Teekako langi omulwadde z’alonze ng’okozesa Fusion 360 appearance settings. Osobola okuyingiza langi mu code nga tonnatandika n’okukyusa menu driven color options (vidiyo wansi), oba nyiga 'A' ku keyboard okuggulawo Fusion appearances menu. Sika Glossy Paint enamel ogiteeke ku cover okuteekako langi ez’enjawulo ku kungulu. Kyusa langi ng’okyusa paint settings era n’okolera mu color selector. (mu vidiyo)", c5: 'Fuluma ku 3D Printing', c5b: 'Fuluma model nga STL oba 3MF file. Tegeka file mu slicing software n’ensengeka entuufu ez’okukuba flexible material.', c6: 'Kuba & Kigezeeko', c6b: 'Kuba cover era okole fitting session n’omulwadde. Kola enkyukakyuka ezetaagisa era kakasa nti eri mu buweerero era ekola bulungi.', enlarge: 'Nyiga ekifaananyi okukikuza'
  }
};

export default function App() {
  const [page, setPageState] = useState<Page>('home');
  const [lang, setLang] = useState<Lang>('en');
  const [coverColor, setCoverColor] = useState(coverColors[0]);
  const [longStrapColor, setLongStrapColor] = useState(strapColors[0]);
  const [shortStrapColor, setShortStrapColor] = useState(strapColors[1]);
  const [frontDesign, setFrontDesign] = useState<FrontDesign>('plain');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const t = text[lang];

  function setPage(nextPage: Page) {
    setPageState(nextPage);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }

  return (
    <main className={page === 'clinician' ? 'min-h-screen bg-[#eef5fb]' : 'min-h-screen bg-cream'}>
      <Header page={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />
      {page === 'home' && <Home t={t} setPage={setPage} openImage={setModalImage} />}
      {page === 'patient' && <Patient t={t} coverColor={coverColor} setCoverColor={setCoverColor} longStrapColor={longStrapColor} setLongStrapColor={setLongStrapColor} shortStrapColor={shortStrapColor} setShortStrapColor={setShortStrapColor} frontDesign={frontDesign} setFrontDesign={setFrontDesign} openImage={setModalImage} />}
      {page === 'clinician' && <Clinician t={t} openImage={setModalImage} />}
      {modalImage && <ImageModal src={modalImage} t={t} close={() => setModalImage(null)} />}
    </main>
  );
}

function Header({ page, setPage, lang, setLang, t }: { page: Page; setPage: (p: Page) => void; lang: Lang; setLang: (l: Lang) => void; t: any }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button onClick={() => setPage('home')} className="flex items-center gap-3 text-left">
          <Image src="/images/niaxyou-logo.png" alt="Nia x You logo" width={46} height={46} className="rounded-full" />
          <div><div className="font-display text-lg font-extrabold">Nia x You</div><div className="text-xs text-slate-500">by Nia Technologies</div></div>
        </button>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {(['home', 'patient', 'clinician'] as Page[]).map((p) => <button key={p} onClick={() => setPage(p)} className={`rounded-full px-4 py-2 font-semibold ${page === p ? 'bg-blue text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p === 'home' ? t.home : p === 'patient' ? t.patient : t.clinician}</button>)}
        </nav>
        <div className="flex items-center gap-2">
          {(['en', 'uk', 'lg'] as Lang[]).map((l) => <button key={l} onClick={() => setLang(l)} className={`rounded-full px-3 py-1 text-xs font-bold ${lang === l ? 'bg-slate-100 text-ink' : 'text-slate-500'}`}>{l.toUpperCase()}</button>)}
          <a href="https://www.niatech.org" target="_blank" rel="noreferrer" aria-label="Visit Nia Technologies website"><Image src="/images/nia-tech-logo.png" alt="Nia Technologies logo" width={44} height={44} className="rounded-xl" /></a>
        </div>
      </div>
    </header>
  );
}

function Home({ t, setPage, openImage }: { t: any; setPage: (p: Page) => void; openImage: (src: string) => void }) {
  return <section className="mx-auto max-w-6xl px-5 py-16">
    <Hero badge={t.partner} title={t.title} subtitle={t.subtitle} />
    <InfoCard icon={<Users />} title={t.missionTitle} body={t.mission} image="/images/mission-child.png" imageAlt="Child using a prosthetic device" />
    <div className="my-20 rounded-3xl bg-sand p-8 shadow-soft"><h2 className="heading mb-8 text-center text-3xl">{t.ready}</h2><div className="grid gap-6 md:grid-cols-2 md:px-16"><Choice icon={<Heart />} title={t.patients} body={t.patientsBody} button={t.explore} onClick={() => setPage('patient')} /><Choice icon={<Users />} title={t.clinicians} body={t.cliniciansBody} button={t.guide} onClick={() => setPage('clinician')} dark /></div></div>
    <Gallery t={t} cols="md:grid-cols-3" openImage={openImage} />
    <div className="card mt-20 p-8"><div className="mb-4 flex items-center gap-3"><span className="rounded-full bg-coral p-3 text-white"><Mail /></span><h2 className="heading text-3xl">{t.involved}</h2></div><p className="mb-8 text-slate-700">{t.involvedBody}</p><p className="mb-6 text-sm">{t.contact} <a className="font-bold text-blue" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p><div className="flex gap-4 border-t pt-5"><Image src="/images/nia-tech-logo.png" alt="Nia Technologies" width={72} height={72} className="rounded-2xl" /><div><p className="font-bold">{t.about}</p><p className="text-sm text-slate-700">{t.aboutBody}</p><a className="mt-2 inline-block font-bold text-blue" href="https://www.niatech.org" target="_blank" rel="noreferrer">{t.visit} →</a></div></div></div>
  </section>;
}

function Patient({ t, coverColor, setCoverColor, longStrapColor, setLongStrapColor, shortStrapColor, setShortStrapColor, frontDesign, setFrontDesign, openImage }: { t: any; coverColor: string; setCoverColor: (c: string) => void; longStrapColor: string; setLongStrapColor: (c: string) => void; shortStrapColor: string; setShortStrapColor: (c: string) => void; frontDesign: FrontDesign; setFrontDesign: (d: FrontDesign) => void; openImage: (src: string) => void }) {
  return <section className="mx-auto max-w-6xl px-5 py-10"><Hero badge={t.patientBadge} title={t.patientTitle} subtitle={t.patientSub} />
    <InfoCard title={t.whatTitle} body={t.whatBody} image="/images/prosthetic-purple-blue.jpg" imageAlt="Purple and blue prosthetic cover" portrait />
    <h2 className="heading my-10 text-center text-3xl">{t.why}</h2><div className="grid gap-6 md:grid-cols-3"><Feature icon={<Shield />} title={t.comfort} body={t.comfortBody} bg="bg-mint text-white" /><Feature icon={<Heart />} title={t.confidence} body={t.confidenceBody} bg="bg-coral text-white" /><Feature icon={<Palette />} title={t.local} body={t.localBody} bg="bg-sand text-blue" /></div>
    <div className="card my-16 p-8 text-center"><h2 className="heading mb-8 text-center text-3xl">{t.expect}</h2><Step n="1" title={t.step1} body={t.step1b} color="bg-mint" centered showNumber={false} /><Step n="2" title={t.step2} body={t.step2b} color="bg-coral" centered showNumber={false} /><Step n="3" title={t.step3} body={t.step3b} color="bg-blue" centered showNumber={false} /></div>
    <div className="rounded-3xl bg-sand p-8 shadow-soft"><h2 className="heading mb-8 text-center text-3xl">{t.preview}</h2><div className="grid gap-8 md:grid-cols-[0.95fr_1fr]"><div><CoverViewer color={coverColor} design={frontDesign} longStrapColor={longStrapColor} shortStrapColor={shortStrapColor} /><p className="mt-3 text-center text-xs text-slate-600">3D preview: drag to rotate.</p></div><div className="space-y-6"><Picker title={t.coverColor} colors={coverColors} value={coverColor} setValue={setCoverColor} /><div 

className="grid gap-4 md:grid-cols-2">

<Picker title="Long Strap Color" colors={strapColors} value={longStrapColor} setValue={setLongStrapColor} />

<Picker title="Short Strap Color" colors={strapColors} value={shortStrapColor} setValue={setShortStrapColor} />

</div><div className="rounded-2xl bg-white p-5 shadow-soft"><h3 className="mb-4 font-display text-xl font-extrabold">{t.frontDesign}</h3><div className="grid grid-cols-2 gap-3">{([{ id: 'plain', label: t.plain }, { id: 'floral', label: t.floral }] as { id: FrontDesign; label: string }[]).map((option) => <button onClick={() => setFrontDesign(option.id)} className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition ${frontDesign === option.id ? 'border-blue bg-white text-blue shadow-soft' : 'border-sand bg-sand/80 hover:border-blue'}`} key={option.id}>{option.label}</button>)}</div></div></div></div></div>
  </section>;
}

function Clinician({ t, openImage }: { t: any; openImage: (src: string) => void }) {
  const steps = [
    { title: t.c1, body: t.c1b },
    { title: t.c2, body: t.c2b, image: '/images/fusionmenuimage.png' },
    { title: t.c3, body: t.c3b, image: '/images/measurements.png' },
    { title: t.c4, body: t.c4b, image: '/images/fusion-appearance.jpg' },
    { title: t.c5, body: t.c5b },
    { title: t.c6, body: t.c6b },
  ];
  return <section className="mx-auto max-w-5xl px-5 py-10"><Hero badge={t.clinicianBadge} title={t.clinicianTitle} subtitle={t.clinicianSub} /><InfoCard icon={<FileText />} title={t.process} body={t.processBody} />
    <div className="card my-16 p-8"><div className="mb-6 flex items-center gap-3"><span className="rounded-full bg-mint p-3 text-white"><Play /></span><h2 className="heading text-3xl">{t.video}</h2></div><video className="aspect-video w-full rounded-2xl bg-slate-100" controls preload="metadata"><source src="/videos/niaxyoufinalvideo.mp4" type="video/mp4" />Your browser does not support this video.</video></div>
    <h2 className="heading mb-8 text-center text-3xl">{t.workflow}</h2><div className="space-y-6">{steps.map((step, i) => <ClinicianStep key={step.title} index={i} title={step.title} body={step.body} image={step.image} openImage={openImage} t={t} />)}</div>
    <p className="mt-10 text-center text-sm text-slate-600">{t.contact} <a className="font-bold text-blue" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
  </section>;
}

function Hero({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) { return <div className="mb-14 text-center"><span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm shadow"><Sparkles size={16}/>{badge}</span><h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-mint md:text-6xl">{title}</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">{subtitle}</p></div>; }
function InfoCard({ icon, title, body, image, imageAlt, portrait = false }: { icon?: React.ReactNode; title: string; body: string; image?: string; imageAlt?: string; portrait?: boolean }) { return <div className="card p-8"><div className={`grid gap-6 ${image ? (portrait ? 'md:grid-cols-[1fr_260px] md:items-center' : 'md:grid-cols-[1fr_280px] md:items-center') : ''}`}><div><div className="mb-4 flex items-center gap-3">{icon && <span className="rounded-full bg-mint p-3 text-white">{icon}</span>}<h2 className="heading text-3xl">{title}</h2></div><p className="whitespace-pre-line leading-8 text-slate-700">{body}</p></div>{image && <Image src={image} alt={imageAlt || title} width={portrait ? 420 : 560} height={portrait ? 640 : 420} className={`${portrait ? 'h-[440px]' : 'h-64 md:h-56'} w-full rounded-2xl object-contain shadow-soft bg-slate-50`} />}</div></div>; }
function Choice({ icon, title, body, button, onClick, dark }: any) { return <div className="card p-8"><span className={`mb-5 inline-block rounded-2xl p-4 text-white ${dark ? 'bg-blue' : 'bg-mint'}`}>{icon}</span><h3 className="font-display text-2xl font-extrabold">{title}</h3><p className="my-5 min-h-16 text-slate-700">{body}</p><button onClick={onClick} className={`rounded-full px-6 py-3 font-bold text-white ${dark ? 'bg-blue' : 'bg-mint'} hover:scale-105`}>{button}</button></div>; }
function Feature({ icon, title, body, bg }: any) { return <div className={`rounded-2xl p-8 shadow-soft ${bg}`}><span className="mb-5 inline-block rounded-full bg-white p-4 text-blue">{icon}</span><h3 className="font-display text-2xl font-extrabold">{title}</h3><p className="mt-4 font-semibold leading-7">{body}</p></div>; }
function Step({ n, title, body, color, centered, showNumber = true }: any) { return <div className={`mb-6 ${centered ? 'flex flex-col items-center text-center' : 'flex gap-5'}`}>{showNumber && <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${color}`}>{n}</span>}<div className={centered ? 'mt-3 max-w-3xl' : ''}><h3 className="font-display text-xl font-extrabold">{title}</h3><p className="text-slate-700">{body}</p></div></div>; }
function Picker({ title, colors, value, setValue }: any) { return <div className="rounded-2xl bg-white p-5 shadow-soft"><h3 className="mb-4 font-display text-xl font-extrabold">{title}</h3><div className="grid grid-cols-4 gap-3">{colors.map((c:string)=><button key={c} onClick={() => setValue(c)} className={`h-14 rounded-2xl border-4 shadow-sm ${value === c ? 'border-blue' : 'border-transparent'} ${c === '#ffffff' ? 'ring-1 ring-slate-300' : ''}`} style={{ backgroundColor: c }} aria-label={c}/>)}</div></div>; }
function Gallery({ t, cols, openImage }: { t: any; cols: string; openImage: (src: string) => void }) { return <div className="mt-20"><h2 className="heading text-center text-3xl">{t.gallery}</h2><p className="mt-4 text-center text-slate-700">{t.galleryBody}</p><div className={`mt-8 grid grid-cols-2 gap-6 ${cols}`}>{gallery.map((src, i) => <button onClick={() => openImage(src)} key={src} className="group aspect-square overflow-hidden rounded-2xl bg-sand shadow-soft"><Image src={src} alt={`${t.photo} ${i+1}`} width={600} height={600} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /></button>)}</div></div>; }
function ClinicianStep({ index, title, body, image, openImage, t }: any) { return <div className={`card grid gap-5 p-7 ${image ? 'md:grid-cols-[1fr_260px] md:items-center' : ''}`}><div className="flex gap-5"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-white ${['bg-blue','bg-mint','bg-coral','bg-sand text-ink','bg-blue','bg-mint'][index]}`}>{index+1}</span><div><h3 className="font-display text-xl font-extrabold">{index+1}. {title}</h3><p className="mt-2 text-slate-700">{body}</p></div></div>{image && <button onClick={() => openImage(image)} className="group text-left"><Image src={image} alt={title} width={520} height={360} className="h-48 w-full rounded-2xl object-cover shadow-soft transition duration-300 group-hover:scale-[1.02]" /><span className="mt-2 block text-center text-xs text-slate-500">{t.enlarge}</span></button>}</div>; }
function ImageModal({ src, close, t }: { src: string; close: () => void; t: any }) { return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={close}><div className="relative max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}><button onClick={close} className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-2 text-ink shadow-soft" aria-label={t.close}><X /></button><img src={src} alt="Expanded view" className="max-h-[90vh] w-auto rounded-2xl object-contain shadow-soft" /></div></div>; }

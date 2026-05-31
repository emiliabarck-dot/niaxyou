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
  '/images/gallery-8.jpg',
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
    missionTitle: 'Our Mission', mission: 'Nia x You partners with clinics worldwide to provide customizable, 3D-printed prosthetic covers for children and adults. We believe everyone deserves com[...]
    ready: 'Ready to Get Started?', patients: 'For Patients & Families', patientsBody: 'Learn about prosthetic covers, explore design options, and see what to expect when working with your clinic.[...]
    clinicians: 'For Clinicians & Partners', cliniciansBody: 'Access step-by-step instructions for using Fusion 360 and creating custom covers for your patients.', guide: 'View Clinician Guide',
    gallery: 'Design Gallery', galleryBody: 'Explore different cover designs, colors, and patterns in real-world use.', involved: 'Get Involved', involvedBody: 'Interested in partnering with us or[...]
    patientBadge: 'For Patients & Families', patientTitle: 'Your Custom Prosthetic Cover', patientSub: 'Comfortable, colorful, and completely yours', whatTitle: 'What Are Prosthetic Covers?', what[...]
    clinicianBadge: 'For Clinicians & Partners', clinicianTitle: 'Clinician Implementation Guide', clinicianSub: 'Complete workflow for creating custom prosthetic covers using Fusion 360 and 3D pr[...]
  },
  uk: {
    home: 'Головна', patient: 'Для пацієнтів', clinician: 'Для клініцистів', partner: 'У партнерстві з Nia Technologies',
    title: 'Nia x You', subtitle: 'Допомагаємо людям з ампутацією отримати індивідуальні 3D-друковані протезні накладки д[...]
    missionTitle: 'Наша місія', mission: 'Nia x You співпрацює з клініками по всьому світу, щоб надавати індивідуальні 3D-друк[...]
    ready: 'Готові почати?', patients: 'Для пацієнтів і родин', patientsBody: 'Дізнайтеся про протезні накладки, перегляньте [...]
    clinicians: 'Для клініцистів і партнерів', cliniciansBody: 'Отримайте покрокові інструкції з використання Fusion 360 та ст[...]
    gallery: 'Галерея дизайнів', galleryBody: 'Перегляньте різні дизайни, кольори та візерунки накладок у реальному вик[...]
    patientBadge: 'Для пацієнтів і родин', patientTitle: 'Ваша індивідуальна протезна накладка', patientSub: 'Зручна, яскрава і п[...]
    clinicianBadge: 'Для клініцистів і партнерів', clinicianTitle: 'Посібник для клініцистів', clinicianSub: 'Повний процес створен[...]
  },
  lg: {
    home: 'Awaka', patient: 'Eky'abalwadde', clinician: 'Eky'abasawo', partner: 'Mu kukolagana ne Nia Technologies',
    title: 'Nia x You', subtitle: 'Tuyamba abantu abakozesa amagulu ag'obulimba okufuna ebibikka ebikolebwa ku 3D printer, ebituukana n'omuntu, ebiwa obuweerero, obukuumi n'okweyoleka.',
    missionTitle: 'Ekigendererwa Kyaffe', mission: 'Nia x You ekolagana n'amalwaliro mu nsi yonna okuwa abaana n'abantu abakulu ebibikka by'amagulu ag'obulimba ebikolebwa ku 3D printer. Tu[...]
    ready: 'Mwetegefu Okutandika?', patients: 'Abalwadde n'Amaka', patientsBody: 'Yiga ku bibikka by'amagulu ag'obulimba, laba engeri z'okukola dizayini, era manya ky'olina okusuubira ng[...]
    clinicians: 'Abasawo n'Abakolagana', cliniciansBody: 'Funa ebiragiro ebigenda mutendera ku nkozesa ya Fusion 360 n'okukola ebibikka by'abalwadde.', guide: 'Laba Ebiragiro by'Abasawo',
    gallery: 'Ekifo ky'Ebifaananyi', galleryBody: 'Laba dizayini, langi, n'enkula ez'enjawulo ez'ebibikka mu nkozesa entuufu.', involved: 'Yegatte Ku Ffe', involvedBody: 'Oyagala okukolaga[...]
    patientBadge: 'Abalwadde n'Amaka', patientTitle: 'Ekibikka Kyo eky'Ekigere eky'Obulimba', patientSub: 'Kya kuweweeza, kya langi, era kikyo ddala', whatTitle: 'Ebibikka by'Amagulu ag'[...]
    clinicianBadge: 'Abasawo n'Abakolagana', clinicianTitle: 'Ebiragiro by'Abasawo', clinicianSub: 'Enkola yonna ey'okukola ebibikka by'amagulu ag'obulimba nga mukozesa Fusion 360 ne 3D [...]
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
      {page === 'patient' && <Patient t={t} coverColor={coverColor} setCoverColor={setCoverColor} longStrapColor={longStrapColor} setLongStrapColor={setLongStrapColor} shortStrapColor={shortStrapC[...]
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
          {(['home', 'patient', 'clinician'] as Page[]).map((p) => <button key={p} onClick={() => setPage(p)} className={`rounded-full px-4 py-2 font-semibold ${page === p ? 'bg-blue text-white' [...]
        </nav>
        <div className="flex items-center gap-2">
          {(['en', 'uk', 'lg'] as Lang[]).map((l) => <button key={l} onClick={() => setLang(l)} className={`rounded-full px-3 py-1 text-xs font-bold ${lang === l ? 'bg-slate-100 text-ink' : 'text[...]
          <a href="https://www.niatech.org" target="_blank" rel="noreferrer" aria-label="Visit Nia Technologies website"><Image src="/images/nia-tech-logo.png" alt="Nia Technologies logo" width={[...]
        </div>
      </div>
    </header>
  );
}

function Home({ t, setPage, openImage }: { t: any; setPage: (p: Page) => void; openImage: (src: string) => void }) {
  return <section className="mx-auto max-w-6xl px-5 py-16">
    <Hero badge={t.partner} title={t.title} subtitle={t.subtitle} />
    <InfoCard icon={<Users />} title={t.missionTitle} body={t.mission} image="/images/mission-child.png" imageAlt="Child using a prosthetic device" />
    <div className="my-20 rounded-3xl bg-sand p-8 shadow-soft"><h2 className="heading mb-8 text-center text-3xl">{t.ready}</h2><div className="grid gap-6 md:grid-cols-2 md:px-16"><Choice icon={<H[...]
    <Gallery t={t} cols="md:grid-cols-3" openImage={openImage} />
    <div className="card mt-20 p-8"><div className="mb-4 flex items-center gap-3"><span className="rounded-full bg-coral p-3 text-white"><Mail /></span><h2 className="heading text-3xl">{t.involve[...]
  </section>;
}

function Patient({ t, coverColor, setCoverColor, longStrapColor, setLongStrapColor, shortStrapColor, setShortStrapColor, frontDesign, setFrontDesign, openImage }: { t: any; coverColor: string; se[...]
  return <section className="mx-auto max-w-6xl px-5 py-10"><Hero badge={t.patientBadge} title={t.patientTitle} subtitle={t.patientSub} />
    <InfoCard title={t.whatTitle} body={t.whatBody} image="/images/prosthetic-purple-blue.jpg" imageAlt="Purple and blue prosthetic cover" portrait />
    <h2 className="heading my-10 text-center text-3xl">{t.why}</h2><div className="grid gap-6 md:grid-cols-3"><Feature icon={<Shield />} title={t.comfort} body={t.comfortBody} bg="bg-mint text-wh[...]
    <div className="card my-16 p-8 text-center"><h2 className="heading mb-8 text-center text-3xl">{t.expect}</h2><Step n="1" title={t.step1} body={t.step1b} color="bg-mint" centered showNumber={f[...]
    <div className="rounded-3xl bg-sand p-8 shadow-soft"><h2 className="heading mb-8 text-center text-3xl">{t.preview}</h2><div className="grid gap-8 md:grid-cols-[0.95fr_1fr]"><div><CoverViewer [...]

className="grid gap-4 md:grid-cols-2">

<Picker title="Long Strap Color" colors={strapColors} value={longStrapColor} setValue={setLongStrapColor} />

<Picker title="Short Strap Color" colors={strapColors} value={shortStrapColor} setValue={setShortStrapColor} />

</div><div className="rounded-2xl bg-white p-5 shadow-soft"><h3 className="mb-4 font-display text-xl font-extrabold">{t.frontDesign}</h3><div className="grid grid-cols-2 gap-3">{([{ id: 'plain', [...]
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
  return <section className="mx-auto max-w-5xl px-5 py-10"><Hero badge={t.clinicianBadge} title={t.clinicianTitle} subtitle={t.clinicianSub} /><InfoCard icon={<FileText />} title={t.process} body[...]
    <div className="card my-16 p-8"><div className="mb-6 flex items-center gap-3"><span className="rounded-full bg-mint p-3 text-white"><Play /></span><h2 className="heading text-3xl">{t.video}</[...]
    <h2 className="heading mb-8 text-center text-3xl">{t.workflow}</h2><div className="space-y-6">{steps.map((step, i) => <ClinicianStep key={step.title} index={i} title={step.title} body={step.b[...]
    <p className="mt-10 text-center text-sm text-slate-600">{t.contact} <a className="font-bold text-blue" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
  </section>;
}

function Hero({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) { return <div className="mb-14 text-center"><span className="inline-flex items-center gap-2 rounded-f[...]
function InfoCard({ icon, title, body, image, imageAlt, portrait = false }: { icon?: React.ReactNode; title: string; body: string; image?: string; imageAlt?: string; portrait?: boolean }) { retur[...]
function Choice({ icon, title, body, button, onClick, dark }: any) { return <div className="card p-8"><span className={`mb-5 inline-block rounded-2xl p-4 text-white ${dark ? 'bg-blue' : 'bg-mint'[...]
function Feature({ icon, title, body, bg }: any) { return <div className={`rounded-2xl p-8 shadow-soft ${bg}`}><span className="mb-5 inline-block rounded-full bg-white p-4 text-blue">{icon}</span[...]
function Step({ n, title, body, color, centered, showNumber = true }: any) { return <div className={`mb-6 ${centered ? 'flex flex-col items-center text-center' : 'flex gap-5'}`}>{showNumber && <s[...]
function Picker({ title, colors, value, setValue }: any) { return <div className="rounded-2xl bg-white p-5 shadow-soft"><h3 className="mb-4 font-display text-xl font-extrabold">{title}</h3><div c[...]
function Gallery({ t, cols, openImage }: { t: any; cols: string; openImage: (src: string) => void }) { return <div className="mt-20"><h2 className="heading text-center text-3xl">{t.gallery}</h2><[...]
function ClinicianStep({ index, title, body, image, openImage, t }: any) { return <div className={`card grid gap-5 p-7 ${image ? 'md:grid-cols-[1fr_260px] md:items-center' : ''}`}><div className=[...]
function ImageModal({ src, close, t }: { src: string; close: () => void; t: any }) { return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={close}[...]

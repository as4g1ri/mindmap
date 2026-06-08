import React, { useMemo, useState } from "react";
import { Bell, Home, BarChart3, ClipboardList, Heart, User, ChevronLeft, ChevronRight, Eye, ShieldCheck, Lock, Activity, Moon, Smartphone, Settings, FileText, Download, HelpCircle, Check, Smile, X, Zap, BookOpen, Briefcase, Coffee, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const TABS = [
  { key: "home", label: "Главная", icon: Home, screen: 5 },
  { key: "analytics", label: "Аналитика", icon: BarChart3, screen: 6 },
  { key: "diary", label: "Дневник", icon: ClipboardList, screen: 10 },
  { key: "recs", label: "Рекомендации", icon: Heart, screen: 8 },
  { key: "profile", label: "Профиль", icon: User, screen: 13 },
];

const Button = ({ children, variant = "primary", onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full h-12 rounded-xl text-[13px] font-semibold transition active:scale-[0.98] ${
      variant === "primary" ? "bg-zinc-700 text-white shadow-sm hover:bg-zinc-800" : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
    } ${className}`}
  >
    {children}
  </button>
);

const Phone = ({ children, activeTab, setScreen }) => (
  <div className="mx-auto h-[812px] w-[375px] overflow-hidden rounded-[34px] border border-zinc-200 bg-white shadow-2xl">
    <div className="flex h-full flex-col bg-gradient-to-b from-zinc-50 to-white font-sans text-zinc-950">
      <div className="flex h-9 items-end justify-between px-6 pb-1 text-[11px] font-bold">
        <span>9:41</span><span>▰ ▰ ●</span>
      </div>
      <main className="flex-1 overflow-y-auto px-5 pb-3">{children}</main>
      {activeTab && <BottomNav activeTab={activeTab} setScreen={setScreen} />}
    </div>
  </div>
);

const BottomNav = ({ activeTab, setScreen }) => (
  <nav className="grid h-[68px] grid-cols-5 border-t border-zinc-100 bg-white px-2 pt-2">
    {TABS.map(({ key, label, icon: Icon, screen }) => (
      <button key={key} onClick={() => setScreen(screen)} className={`flex flex-col items-center gap-1 text-[9px] ${activeTab === key ? "text-black" : "text-zinc-500"}`}>
        <Icon size={19} strokeWidth={activeTab === key ? 3 : 1.8} fill={activeTab === key ? "currentColor" : "none"} />
        {label}
      </button>
    ))}
  </nav>
);

const Header = ({ title, back, right, setScreen }) => (
  <div className="relative mb-6 flex h-12 items-center justify-center pt-2">
    {back && <button onClick={() => setScreen(back)} className="absolute left-0 top-3 rounded-full p-2 hover:bg-zinc-100"><ChevronLeft size={22}/></button>}
    <h1 className="text-[17px] font-bold">{title}</h1>
    {right && <div className="absolute right-0 top-3">{right}</div>}
  </div>
);

const Card = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`rounded-xl bg-zinc-100 p-4 ${onClick ? "cursor-pointer transition hover:bg-zinc-200" : ""} ${className}`}>{children}</div>
);

const MiniChart = ({ bars = false }) => bars ? (
  <div className="mt-5 flex h-28 items-end justify-between gap-3 px-2">
    {[54,72,48,84,64,59,79].map((h, i) => <div key={i} style={{height:h}} className="w-8 rounded-t bg-zinc-300" />)}
  </div>
) : (
  <svg viewBox="0 0 260 120" className="mt-3 h-28 w-full">
    <polyline points="5,86 38,55 73,91 110,46 145,96 179,71 213,26 255,43" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400" />
  </svg>
);

function Welcome({ setScreen }) {
  return <Phone><div className="flex h-full flex-col items-center justify-between pb-8 pt-20 text-center">
    <div />
    <div className="flex flex-col items-center">
      <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-zinc-500"><Activity size={58} className="text-zinc-500"/></div>
      <h1 className="text-3xl font-extrabold">MindMonitor</h1>
      <p className="mt-4 text-[13px] text-zinc-600">Мониторинг психоэмоционального<br/>состояния</p>
      <div className="mt-10 flex gap-2"><span className="h-2 w-2 rounded-full bg-zinc-700"/><span className="h-2 w-2 rounded-full bg-zinc-300"/><span className="h-2 w-2 rounded-full bg-zinc-300"/></div>
    </div>
    <Button onClick={() => setScreen(1)}>Начать работу</Button>
  </div></Phone>;
}

function Login({ setScreen }) { return <Phone><Header title="Авторизация"/><div className="flex flex-col items-center">
  <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200"><User size={58} className="text-zinc-400" fill="currentColor"/></div>
  <Input placeholder="Email"/><Input placeholder="Пароль" icon={<Eye size={16}/>}/><Button onClick={() => setScreen(5)} className="mt-4">Войти</Button>
  <button className="my-5 text-[12px] text-zinc-600">Забыли пароль?</button>
  <div className="flex w-full items-center gap-4 text-xs text-zinc-500"><span className="h-px flex-1 bg-zinc-200"/>или<span className="h-px flex-1 bg-zinc-200"/></div>
  <Button variant="secondary" onClick={() => setScreen(2)} className="mt-5">Зарегистрироваться</Button>
</div></Phone> }

const Input = ({ placeholder, icon }) => <div className="mb-4 flex h-13 w-full items-center rounded-xl border border-zinc-200 bg-white px-4 text-[13px]"><input placeholder={placeholder} className="flex-1 bg-transparent outline-none"/>{icon}</div>;

function Register({ setScreen }) { return <Phone><Header title="Регистрация"/><Input placeholder="Имя"/><Input placeholder="Email"/><Input placeholder="Пароль" icon={<Eye size={16}/>}/><Input placeholder="Подтвердите пароль" icon={<Eye size={16}/>}/><label className="mt-2 flex gap-3 text-[12px] leading-5 text-zinc-600"><input type="checkbox" className="mt-1 h-5 w-5 rounded"/>Я согласен с политикой<br/>конфиденциальности</label><Button onClick={() => setScreen(3)} className="mt-12">Создать аккаунт</Button></Phone> }

function Consent({ setScreen }) { return <Phone><Header title="Согласие на обработку данных"/><div className="flex flex-col items-center text-center">
  <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-zinc-100"><ShieldCheck size={62} className="text-zinc-600"/></div>
  <p className="mt-6 text-[13px] leading-6 text-zinc-700">Мы заботимся о вашей<br/>конфиденциальности.</p><p className="mt-5 text-[13px] leading-6 text-zinc-700">Данные используются только для<br/>анализа вашего состояния и<br/>не передаются третьим лицам.</p>
  <label className="mt-16 flex w-full gap-3 text-left text-[12px] leading-5 text-zinc-600"><input type="checkbox" className="mt-1 h-5 w-5"/>Я согласен с условиями<br/>обработки данных</label><Button onClick={() => setScreen(4)} className="mt-8">Продолжить</Button>
</div></Phone> }

function Permissions({ setScreen }) { const items = [[Activity,"Физическая активность","шаги, тренировки"],[Moon,"Сон","продолжительность и качество сна"],[Bell,"Уведомления","напоминания и рекомендации"],[Smartphone,"Данные устройства","экранное время"]]; return <Phone><Header title="Разрешения"/><p className="mb-8 text-center text-[13px] leading-5">Для работы приложения<br/>необходим доступ к данным:</p>{items.map(([Icon,t,s])=><div key={t} className="mb-4 flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100"><Icon size={22}/></div><div><b className="text-[13px]">{t}</b><p className="text-[12px] text-zinc-500">{s}</p></div></div>)}<Button onClick={() => setScreen(5)} className="mt-14">Разрешить доступ</Button><button onClick={() => setScreen(5)} className="mt-5 w-full text-[13px] text-zinc-600">Пропустить</button></Phone> }

function HomeScreen({ setScreen }) { return <Phone activeTab="home" setScreen={setScreen}><Header title="Главный экран" right={<Bell size={20}/>}/><p className="mb-6 text-[14px] font-semibold">Доброе утро, Анна!</p><Card><div className="flex justify-between"><div><p className="text-[12px]">Текущее состояние</p><h2 className="mt-7 text-2xl font-extrabold">Стабильное</h2><p className="mt-1 text-[12px] text-zinc-600">Низкий уровень риска</p></div><Smile size={42} className="mt-14 text-zinc-500"/></div></Card><Card className="mt-5"><p className="text-[12px] font-bold">Динамика за неделю</p><MiniChart/></Card><h3 className="mb-3 mt-6 text-[14px] font-bold">Быстрый доступ</h3><div className="grid grid-cols-3 gap-3">{[[BarChart3,"Аналитика",6],[PieChart,"Рекомендации",8],[FileText,"Дневник",10]].map(([I,l,s])=><button onClick={()=>setScreen(s)} className="rounded-xl bg-zinc-100 p-4 text-[11px] hover:bg-zinc-200"><I className="mx-auto mb-2" size={22}/>{l}</button>)}</div></Phone> }

function Analytics({ setScreen }) { return <Phone activeTab="analytics" setScreen={setScreen}><Header title="Аналитика"/><div className="mb-5 flex gap-2 text-[12px]"><Pill>День</Pill><Pill active>Неделя</Pill><Pill>Месяц</Pill><Pill>3 месяца</Pill></div><Card><p className="font-bold">Общее состояние</p><MiniChart/></Card><h3 className="mb-3 mt-6 font-bold">Показатели</h3>{[["Сон",76,7],["Активность",60,7],["Настроение",80,7],["Экранное время",55,7]].map(([l,v,s])=><button key={l} onClick={()=>setScreen(s)} className="mb-4 flex w-full items-center justify-between rounded-xl bg-white p-2 text-left hover:bg-zinc-50"><span className="text-[13px]">{l}</span><span className="h-2 w-28 rounded-full bg-zinc-200"><span style={{width:v+'%'}} className="block h-full rounded-full bg-zinc-700"/></span><span className="text-[12px] text-zinc-500">{v}%</span></button>)}</Phone> }
const Pill = ({children, active}) => <button className={`rounded-lg px-3 py-2 ${active?"bg-zinc-700 text-white":"bg-zinc-100"}`}>{children}</button>;

function Details({ setScreen }) { return <Phone activeTab="analytics" setScreen={setScreen}><Header title="Детали показателя" back={6} setScreen={setScreen}/><div className="mb-5 flex items-center gap-2 text-[13px]"><button className="rounded-full bg-zinc-100 p-2"><ChevronLeft size={18}/></button><span className="font-bold">Сон</span></div><div className="mb-5 flex gap-2 text-[12px]"><Pill active>Неделя</Pill><Pill>Месяц</Pill><Pill>3 месяца</Pill></div><Card><MiniChart bars/></Card><h3 className="mt-6 font-bold">О показателе</h3><p className="mt-3 text-[13px] leading-5">Достаточный сон положительно влияет на эмоциональное состояние и снижает уровень стресса.</p><h3 className="mt-6 font-bold">Ваши рекомендации</h3><ul className="mt-3 list-disc pl-5 text-[13px] leading-6"><li>Старайтесь ложиться спать до 23:00</li><li>Избегайте экранов перед сном</li></ul></Phone> }

function Recommendations({ setScreen }) { const rows = ["Нормализовать режим сна","Добавить физическую активность","Практиковать расслабление","Обратиться к специалисту"]; return <Phone activeTab="recs" setScreen={setScreen}><Header title="Рекомендации"/><div className="mb-4 flex gap-2 text-[12px]"><Pill active>Все</Pill><Pill>Сон</Pill><Pill>Активность</Pill><Pill>Эмоции</Pill></div>{rows.map((r,i)=><Card key={r} onClick={()=>setScreen(9)} className="mb-4"><div className="flex items-center justify-between"><div><b className="text-[13px]">{r}</b><p className="mt-2 text-[12px] leading-5 text-zinc-600">{i===0?"Старайтесь спать не менее 7–8 часов ежедневно.":"Рекомендация поможет улучшить состояние."}</p></div><ChevronRight size={18}/></div></Card>)}</Phone> }
function RecDetails({ setScreen }) { return <Phone activeTab="recs" setScreen={setScreen}><Header title="Детали рекомендации" back={8} setScreen={setScreen} right={<Heart size={20} fill="currentColor"/>}/><Card><h2 className="font-bold">Нормализовать режим сна</h2><p className="mt-4 text-[13px] leading-6">Регулярный сон улучшает работу мозга, настроение и уровень энергии.</p><h3 className="mt-6 font-bold">Что делать:</h3><ul className="mt-3 list-disc pl-5 text-[13px] leading-6"><li>Ложитесь спать в одно и то же время</li><li>Избегайте кофеина вечером</li><li>Отключайте гаджеты за 1 час до сна</li><li>Создайте комфортные условия</li></ul></Card><Button className="mt-8" onClick={()=>setScreen(8)}>Отметить как выполнено</Button></Phone> }

function Diary({ setScreen }) { return <Phone activeTab="diary" setScreen={setScreen}><Header title="Дневник"/><h3 className="font-bold">Как вы себя чувствуете сегодня?</h3><p className="mt-2 text-[12px]">Оцените своё состояние</p><div className="my-5 flex justify-between">{[1,2,3,4,5].map(n=><button className={`h-11 w-11 rounded-full ${n===5?'bg-zinc-700 text-white':'bg-zinc-100'}`}>{n}</button>)}</div><p className="mb-2 text-[13px] font-semibold">Комментарий (необязательно)</p><textarea className="h-28 w-full rounded-xl border border-zinc-200 p-4 text-[13px] outline-none" placeholder="Напишите, что повлияло на ваше состояние..."/><p className="mb-3 mt-6 text-[13px] font-semibold">Что было сегодня?</p><div className="grid grid-cols-5 gap-2 text-center text-[10px]">{[[Moon,"Сон"],[Smile,"Стресс"],[Briefcase,"Работа"],[BookOpen,"Учёба"],[Coffee,"Другое"]].map(([I,l])=><button className="rounded-xl bg-zinc-100 py-3"><I className="mx-auto mb-1" size={19}/>{l}</button>)}</div><Button onClick={()=>setScreen(11)} className="mt-8">Сохранить запись</Button></Phone> }
function Saved({ setScreen }) { return <Phone><div className="flex h-full flex-col items-center justify-center text-center"><div className="mb-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-zinc-500"><Check size={64}/></div><h1 className="text-xl font-bold">Ваша запись сохранена</h1><p className="mt-4 text-[13px] leading-5 text-zinc-600">Данные добавлены в историю<br/>вашего состояния.</p><Button variant="secondary" onClick={()=>setScreen(5)} className="mt-24">Вернуться на главную</Button><Button onClick={()=>setScreen(6)} className="mt-4">Перейти к аналитике</Button></div></Phone> }
function Notifications({ setScreen }) { return <Phone activeTab="profile" setScreen={setScreen}><Header title="Уведомления"/>{["Напоминание", "Изменение состояния", "Рекомендация на сегодня", "Напоминание об отчёте"].map((t,i)=><Card className="mb-3"><div className="flex gap-3"><Bell size={18}/><div><b className="text-[13px]">{t}</b><p className="mt-1 text-[12px] text-zinc-600">{i===0?'Заполните дневник самочувствия':i===1?'Ваше состояние изменилось за последние дни':i===2?'Практикуйте дыхательные упражнения':'Создайте первый отчёт'}</p></div><span className="ml-auto text-[11px] text-zinc-500">{i<3?'09:'+i+'0':'Вчера'}</span></div></Card>)}<Button className="mt-10">Настроить уведомления</Button></Phone> }
function SettingsScreen({ setScreen }) { return <Phone activeTab="profile" setScreen={setScreen}><Header title="Настройки"/>{[[Smartphone,"Источники данных"],[Bell,"Уведомления"],[Lock,"Конфиденциальность"],[Download,"Экспорт отчёта"],[HelpCircle,"О приложении"],[HelpCircle,"Поддержка"]].map(([I,l])=><button onClick={()=> l==='Экспорт отчёта' && setScreen(15)} className="mb-3 flex w-full items-center rounded-xl border border-zinc-200 bg-white p-4 text-left hover:bg-zinc-50"><I size={18}/><span className="ml-3 flex-1 text-[13px]">{l}</span><ChevronRight size={18}/></button>)}<Button variant="secondary" className="mt-16">Выйти из аккаунта</Button></Phone> }
function History({ setScreen }) { return <Phone activeTab="diary" setScreen={setScreen}><Header title="История"/><div className="mb-4 grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-[12px]"><button className="rounded-lg bg-zinc-700 py-2 text-white">Дневник</button><button>Состояние</button></div>{["12 мая 2024","11 мая 2024","10 мая 2024","9 мая 2024"].map((d,i)=><Card className="mb-3"><div className="flex items-center justify-between"><div><b className="text-[13px]">{d}</b><p className="mt-2 text-[12px] text-zinc-600">Состояние: {i===0?'Хорошее':i===2?'Удовлетворительное':'Стабильное'}</p></div><Smile size={22}/></div></Card>)}<Button onClick={()=>setScreen(15)} className="mt-8">Создать отчёт</Button></Phone> }
function Report({ setScreen }) { return <Phone activeTab="profile" setScreen={setScreen}><Header title="Отчёт" back={13} setScreen={setScreen}/><Card><b>Сводка за период</b><p className="mt-2 text-[13px]">05.05.2024 - 12.05.2024</p><MiniChart/><div className="space-y-3 text-[13px]"><p>Среднее состояние: <b>Стабильное</b></p><p>Уровень риска: <b>Низкий</b></p><p>Записей в дневнике: <b>7</b></p><p>Рекомендаций выполнено: <b>4/6</b></p></div></Card><Button className="mt-10">Сохранить отчёт (PDF)</Button></Phone> }

const screens = [Welcome, Login, Register, Consent, Permissions, HomeScreen, Analytics, Details, Recommendations, RecDetails, Diary, Saved, Notifications, SettingsScreen, History, Report];

export default function MindMonitorPrototype() {
  const [screen, setScreen] = useState(0);
  const Screen = screens[screen];
  const menu = useMemo(() => ["Приветствие", "Вход", "Регистрация", "Согласие", "Доступы", "Главная", "Аналитика", "Детали", "Рекомендации", "Детали рек.", "Дневник", "Сохранено", "Уведомления", "Настройки", "История", "Отчёт"], []);
  return <div className="min-h-screen bg-[#1d1d1d] p-6 text-white">
    <div className="mx-auto flex max-w-7xl gap-6">
      <aside className="sticky top-6 hidden h-fit w-56 shrink-0 rounded-3xl bg-zinc-900 p-5 lg:block">
        <div className="mb-5 text-sm text-zinc-400">MindMonitor / Inter</div>
        <div className="grid gap-2">{menu.map((m,i)=><button key={m} onClick={()=>setScreen(i)} className={`rounded-xl px-3 py-2 text-left text-sm transition ${screen===i?'bg-white text-black':'bg-zinc-800 hover:bg-zinc-700'}`}>Экран {i+1}: {m}</button>)}</div>
      </aside>
      <motion.div key={screen} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.18}} className="mx-auto">
        <Screen setScreen={setScreen}/>
      </motion.div>
    </div>
  </div>;
}

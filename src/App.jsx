const responseTimes = {
  deepseek: '✓ deepseek-v3 responded in 218ms via direct endpoint (Cost: $0.000042)',
  claude: '✓ claude-3-5-sonnet responded in 364ms via Bedrock (Cost: $0.000300)',
  gpt4o: '✓ gpt-4o responded in 295ms via OpenAI Azure failover route (Cost: $0.000250)',
  llama: '✓ llama-3.3-70b responded in 132ms via Groq high-speed node (Cost: $0.000079)',
}
let currentModality = 'all'
function simulatePing(key, button) {
  const box=document.getElementById('ping-alert-box'), text=document.getElementById('ping-alert-text')
  if (!box || !text) return
  box.classList.remove('hidden'); const previous=button.innerText; button.innerText='Pinging…'; button.classList.add('bg-highlighter-yellow')
  window.setTimeout(()=>{button.innerText=previous;button.classList.remove('bg-highlighter-yellow');text.innerText=responseTimes[key]||responseTimes.llama},500)
}
function setModalityFilter(modality, button) {
  currentModality=modality
  document.querySelectorAll('.modality-btn').forEach(item=>{item.className='modality-btn px-2.5 py-1 rounded-[6px] bg-bone hover:bg-paper text-ink border border-hairline text-label-caps font-label-caps uppercase transition-colors font-normal';item.setAttribute('aria-pressed','false')})
  button.className='modality-btn px-2.5 py-1 rounded-[6px] bg-ink text-paper text-label-caps font-label-caps uppercase transition-colors font-normal';button.setAttribute('aria-pressed','true');filterModelsTable()
}
function filterModelsTable() {
  const search=(document.getElementById('model-search')?.value||'').toLowerCase(), provider=document.getElementById('provider-filter')?.value||'all'
  document.querySelectorAll('.model-row').forEach(row=>{const a=row.innerText.toLowerCase().includes(search),b=provider==='all'||row.getAttribute('data-provider')===provider,c=currentModality==='all'||(row.getAttribute('data-modality')||'').includes(currentModality);row.hidden=!(a&&b&&c)})
}
function selectModelForSnippet(name) {
  const py=document.getElementById('active-model-name-py'),ts=document.getElementById('active-model-name-ts'),curl=document.getElementById('active-model-name-curl')
  if(py)py.innerText=`"${name}"`;if(ts)ts.innerText=`'${name}'`;if(curl)curl.innerText=`"${name}"`
  document.getElementById('code-snippet-container')?.scrollIntoView({behavior:'smooth',block:'nearest'})
  const label=document.getElementById('copy-btn-label');if(label){label.innerText='Model updated!';window.setTimeout(()=>{label.innerText='Copy Code'},1800)}
}
function switchCodeLang(language) {
  for(const tab of ['python','typescript','curl']){const panel=document.getElementById(`code-${tab}`),button=document.getElementById(`tab-${tab}`);if(!panel||!button)continue;const active=tab===language;panel.classList.toggle('hidden',!active);panel.classList.toggle('block',active);button.className=active?'px-2.5 py-1 rounded-[4px] bg-secondary/30 text-paper text-label-caps font-label-caps uppercase font-normal':'px-2.5 py-1 rounded-[4px] text-ash hover:text-paper text-label-caps font-label-caps uppercase font-normal transition-colors';button.setAttribute('aria-selected',String(active))}
}
async function copyCodeSnippet() {
  const label=document.getElementById('copy-btn-label'),active=document.querySelector('#code-python:not(.hidden), #code-typescript:not(.hidden), #code-curl:not(.hidden)')
  try{if(active&&navigator.clipboard)await navigator.clipboard.writeText(active.innerText);if(label)label.innerText='Copied to clipboard!'}catch{if(label)label.innerText='Select and copy the code'}
  window.setTimeout(()=>{if(label)label.innerText='Copy Code'},2000)
}
function toggleFaq(id) {
  const content=document.getElementById(id),icon=document.getElementById(`${id}-icon`),button=document.querySelector(`[aria-controls="${id}"]`);if(!content)return
  const expanded=content.classList.contains('hidden');content.classList.toggle('hidden',!expanded);if(icon)icon.innerText=expanded?'expand_less':'expand_more';if(button)button.setAttribute('aria-expanded',String(expanded))
}
function openWaitlistModal(name) {
  const modal=document.getElementById('waitlist-modal'),title=document.getElementById('waitlist-modal-title');if(!modal||!title)return
  title.innerText=name?`Join Waitlist: ${name}`:'Join AI Agents Fleet Preview';modal.classList.remove('hidden');modal.classList.add('flex');if(!modal.open)modal.showModal();window.setTimeout(()=>document.getElementById('modal-email-input')?.focus(),0)
}
function closeWaitlistModal() {const modal=document.getElementById('waitlist-modal');if(!modal)return;if(modal.open)modal.close();modal.classList.remove('flex');modal.classList.add('hidden')}
function submitWaitlist() {const input=document.getElementById('modal-email-input');if(input?.reportValidity()){window.alert(`ขอบคุณสำหรับการลงทะเบียน! เราได้ส่งลิงก์ยืนยันและ API sandbox ไปยัง ${input.value}`);closeWaitlistModal()}}
function handleGetStarted() {const email=document.getElementById('hero-email');if(email?.value&&email.reportValidity())window.alert(`ยินดีต้อนรับสู่ AI Hub! กำลังนำคุณสู่ขั้นตอนเปิดใช้งาน API key สำหรับ ${email.value}`);else openWaitlistModal('Developer Access')}
function handleTierSelect(tier) {openWaitlistModal(`${tier} Tier Provisioning`)}

function App(){return <><a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหาหลัก</a>
<header
 className={"fixed top-0 left-0 w-full z-50"}
>
<aside
 className={"h-10 bg-paper border-b border-hairline flex items-center justify-between px-margin-mobile md:px-margin select-none"}
>
<div
 className={"flex items-center gap-space-sm overflow-hidden"}
>
<span
 className={"inline-block px-1.5 py-0.5 rounded-[4px] bg-bone border border-hairline text-label-caps font-label-caps uppercase tracking-wider text-ink font-semibold"}
>
{"Release"}
</span>
<a
 className={"text-label-md font-label-md text-secondary hover:text-ink truncate transition-colors"}
 data-path={"models"}
 href={"#"}
>
{"New: Unified multi-provider failover routing is now live · Read update →"}
</a>
</div>
<button
 aria-label={"Dismiss announcement"}
 onClick={(event) => event.currentTarget.closest('aside')?.remove()}
 className={"p-1 text-ash hover:text-ink hover:bg-bone rounded transition-colors flex items-center justify-center"}
 type={"button"}
>
<span
 className={"material-symbols-outlined text-[16px]"}
 aria-hidden={"true"}
>
{"close"}
</span>
</button>
</aside>
<nav
 className={"h-[62px] bg-paper/95 backdrop-blur-md border-b border-hairline px-margin-mobile md:px-margin"}
>
<div
 className={"max-w-7xl mx-auto h-full flex items-center justify-between"}
>
<div
 className={"flex items-center gap-space-xl"}
>
<a
 className={"flex items-center gap-space-sm group focus:outline-none"}
 data-path={"models"}
 href={"#"}
>
<img
 alt={"AI Hub Logo"}
 className={"h-8 w-auto object-contain"}
 src={"https://lh3.googleusercontent.com/aida/AEtjO1VhU8VMjbS3avUT_r5WBEqZar9_InBXq2YUy4IGXpJHvHFeLSgX6VNzZb6dFCBw8Jyl_GJd-BuQ8gmAfa8lBEwn1k-rjGbFTvhx-cFZVoGXyzSIv7wXTdpNM4-fcwo9JYlzWJh6bnPTQBwuYR4JtMEkN_kj3f1Oo6jAC5GQ7Sb7HuXFZ-fXveCtDrZ0ScyYY-ZYvUQ_QGKf28UUbszkK_hkrUK_-0OcKXoStjiguxu_"}
 />

<span
 className={"font-headline-sm text-headline-sm uppercase tracking-tight text-ink font-bold"}
>
{"AI HUB"}
</span>
</a>
<div
 className={"hidden md:flex items-center gap-1"}
 data-active-classes={"bg-bone text-ink font-medium"}
>
<a
 className={"px-3 py-1.5 rounded-[6px] text-body-md font-body-md text-secondary hover:text-ink hover:bg-bone transition-colors"}
 data-path={"models"}
 href={"#"}
>
{"Models"}
</a>
<a
 className={"px-3 py-1.5 rounded-[6px] text-body-md font-body-md text-secondary hover:text-ink hover:bg-bone transition-colors"}
 data-path={"agents"}
 href={"#"}
>
{"Agents"}
</a>
<a
 className={"px-3 py-1.5 rounded-[6px] text-body-md font-body-md text-secondary hover:text-ink hover:bg-bone transition-colors"}
 data-path={"pricing"}
 href={"#"}
>
{"Pricing"}
</a>
<a
 className={"px-3 py-1.5 rounded-[6px] text-body-md font-body-md text-secondary hover:text-ink hover:bg-bone transition-colors"}
 data-path={"dashboard"}
 href={"#"}
>
{"Dashboard"}
</a>
<a
 className={"px-3 py-1.5 rounded-[6px] text-body-md font-body-md text-secondary hover:text-ink hover:bg-bone transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Documentation"}
</a>
</div>
</div>
<div
 className={"flex items-center gap-space-md"}
>
<a
 className={"hidden sm:inline-flex items-center justify-center px-space-md py-1.5 rounded-[6px] text-body-md font-body-md text-ink hover:bg-bone transition-colors"}
 data-path={"login"}
 href={"#"}
>
{"Sign in"}
</a>
<a
 className={"inline-flex items-center justify-center px-4 py-2 rounded-[6px] bg-highlighter-yellow text-ink text-body-md font-body-md font-medium tracking-tight hover:opacity-95 transition-opacity"}
 data-path={"get-started"}
 href={"#"}
>
{"Get started"}
</a>
<div
 className={"w-8 h-8 rounded-full bg-primary flex items-center justify-center"}
>
<span
 className={"material-symbols-outlined text-on-primary text-[18px]"}
 aria-hidden={"true"}
>
{"person"}
</span>
</div>
</div>
</div>
</nav>
</header>
<main id={"main-content"}
 className={"w-full pt-[102px] bg-bone flex-1"}
>
<div
 className={"flex flex-col w-full"}
>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin pt-space-lg md:pt-space-xl pb-16"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-xl"}
>
{"\n"}
{"\n"}
<div
 className={"flex items-center gap-space-xs"}
>
{"\n"}
<span
 className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-highlighter-yellow/30 border border-ink/10 text-ink text-label-caps font-label-caps uppercase tracking-wider font-normal"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-ink"}
>
</span>
{"\n          UNIFIED INFERENCE GATEWAY · V1.0\n        "}
</span>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase tracking-wider hidden sm:inline"}
>
{"\n          PROD-READY · SLA 99.99%\n        "}
</span>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start"}
>
{"\n"}
<div
 className={"lg:col-span-8 flex flex-col gap-space-md"}
>
{"\n"}
<h1
 className={"text-ink text-display-lg-mobile md:text-display-lg font-display-lg leading-[1.0] tracking-[-0.03em] font-normal"}
>
{"\n            เลือกและเรียกใช้ AI models ทุกค่าย ผ่าน API เดียว\n          "}
</h1>
{"\n"}
<p
 className={"text-ash text-headline-sm font-headline-sm leading-relaxed max-w-2xl font-normal"}
>
{"\n            เปรียบเทียบราคา สลับ provider อัตโนมัติ และทดลองใช้งานได้ทันทีก่อนเริ่ม build ลดต้นทุนและ latency สูงสุด 40% ด้วย routing architecture อัจฉริยะ\n          "}
</p>
{"\n"}
{"\n"}
<div
 className={"pt-space-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm max-w-xl"}
>
{"\n"}
<div
 className={"relative flex-1"}
>
{"\n"}
<span
 className={"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ash text-[18px]"}
 aria-hidden={"true"}
>
{"mail"}
</span>
{"\n"}
<label className="sr-only" htmlFor="hero-email">Email address</label>
<input
 className={"w-full h-11 pl-9 pr-3 rounded-[10px] bg-paper border border-hairline text-ink placeholder-ash text-body-md font-body-md focus:outline-none focus:border-ink transition-colors"}
 id={"hero-email"}
 placeholder={"ป้อนอีเมลเพื่อรับ $10 เครดิตทดลอง"}
 type={"email"}
 aria-label={"Email address"}
 />

                {"\n"}
</div>
{"\n"}
<button
 className={"h-11 px-5 rounded-[6px] bg-highlighter-yellow hover:brightness-95 text-ink text-body-md font-body-md flex items-center justify-center gap-1.5 transition-all select-none font-normal"}
 onClick={handleGetStarted}
 type={"button"}
>
{"\n"}
<span
>
{"Get started for free"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px]"}
 aria-hidden={"true"}
>
{"arrow_forward"}
</span>
{"\n"}
</button>
{"\n"}
<a
 className={"h-11 px-4 rounded-[6px] bg-paper border border-hairline hover:bg-bone text-ink text-body-md font-body-md flex items-center justify-center transition-colors font-normal whitespace-nowrap"}
 href={"#models-directory"}
>
{"\n              Explore models →\n            "}
</a>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-space-md pt-space-xs text-ash text-body-sm font-body-sm"}
>
{"\n"}
<span
 className={"flex items-center gap-1"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px] text-ink"}
 aria-hidden={"true"}
>
{"check_circle"}
</span>
{"\n              ไม่ต้องกรอกบัตรเครดิต\n            "}
</span>
{"\n"}
<span
 className={"flex items-center gap-1"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px] text-ink"}
 aria-hidden={"true"}
>
{"check_circle"}
</span>
{"\n              OpenAI SDK drop-in replacement\n            "}
</span>
{"\n"}
<span
 className={"flex items-center gap-1 hidden sm:inline-flex"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px] text-ink"}
 aria-hidden={"true"}
>
{"check_circle"}
</span>
{"\n              140+ โมเดลพร้อมใช้\n            "}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"lg:col-span-4 flex flex-col gap-space-sm bg-paper p-space-md rounded-[16px] border border-hairline"}
>
{"\n"}
<div
 className={"flex items-center justify-between border-b border-hairline pb-2.5"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"ROUTING ENGINE STATUS"}
</span>
{"\n"}
<span
 className={"inline-flex items-center gap-1 text-label-caps font-label-caps text-ink uppercase"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n              ACTIVE\n            "}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-1.5 py-1"}
>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"Instant Failover Health Check"}
</p>
{"\n"}
<div
 className={"flex items-baseline justify-between"}
>
{"\n"}
<span
 className={"text-ink text-headline-lg font-headline-lg leading-none font-normal"}
>
{"99.995%"}
</span>
{"\n"}
<span
 className={"text-label-caps font-label-caps text-ash uppercase"}
>
{"Zero dropped requests"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"w-full bg-bone h-2 rounded-full overflow-hidden flex"}
>
{"\n"}
<div
 className={"bg-ink h-full"}
 style={{width: "82%"}}
>
</div>
{"\n"}
<div
 className={"bg-highlighter-yellow h-full"}
 style={{width: "17.995%"}}
>
</div>
{"\n"}
<div
 className={"bg-ash/40 h-full"}
 style={{width: "0.005%"}}
>
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"border-t border-hairline pt-2 flex items-center justify-between text-body-sm font-body-sm text-ash"}
>
{"\n"}
<span
>
{"Global Route Latency"}
</span>
{"\n"}
<span
 className={"text-ink font-normal font-mono text-[13px]"}
>
{"12ms median overhead"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"w-full bg-paper rounded-[16px] border border-hairline overflow-hidden"}
>
{"\n"}
{"\n"}
<div
 className={"h-10 bg-bone border-b border-hairline px-space-md flex items-center justify-between"}
>
{"\n"}
<div
 className={"flex items-center gap-space-sm"}
>
{"\n"}
<div
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"w-2.5 h-2.5 rounded-full bg-hairline"}
>
</span>
{"\n"}
<span
 className={"w-2.5 h-2.5 rounded-full bg-hairline"}
>
</span>
{"\n"}
<span
 className={"w-2.5 h-2.5 rounded-full bg-hairline"}
>
</span>
{"\n"}
</div>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase tracking-wider"}
>
{"\n              MULTI-MODEL INFERENCE BENCHMARK & ROUTE TESTER\n            "}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase"}
>
{"Auto Failover:"}
</span>
{"\n"}
<span
 className={"px-2 py-0.5 rounded-[4px] bg-highlighter-yellow text-ink text-label-caps font-label-caps uppercase"}
>
{"\n              ENABLED\n            "}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md grid grid-cols-1 md:grid-cols-4 gap-space-sm"}
>
{"\n"}
{"\n"}
<div
 className={"p-space-sm rounded-[12px] bg-bone border border-hairline flex flex-col justify-between gap-space-sm hover:border-ink transition-colors group"}
>
{"\n"}
<div
 className={"flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"DEEPSEEK"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-highlighter-yellow text-ink text-label-caps font-label-caps uppercase"}
>
{"CHEAPEST"}
</span>
{"\n"}
</div>
{"\n"}
<h4
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"DeepSeek-V3"}
</h4>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"671B MoE · 128k context"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-1.5 py-2 border-y border-hairline/80 font-mono text-[12px]"}
>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"In / Out 1M:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"$0.14 / $0.28"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"Avg Latency:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"240ms"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-1.5 rounded-[6px] bg-paper border border-hairline text-ink hover:bg-highlighter-yellow hover:border-transparent text-label-caps font-label-caps uppercase transition-colors flex items-center justify-center gap-1 font-normal"}
 onClick={(event) => simulatePing('deepseek', event.currentTarget)}
 type={"button"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px]"}
 aria-hidden={"true"}
>
{"bolt"}
</span>
{"\n"}
<span
>
{"Test Route (240ms)"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-sm rounded-[12px] bg-bone border border-hairline flex flex-col justify-between gap-space-sm hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"ANTHROPIC / BEDROCK"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-paper border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"BENCHMARK #1"}
</span>
{"\n"}
</div>
{"\n"}
<h4
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Claude 3.5 Sonnet"}
</h4>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"Multimodal · 200k context"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-1.5 py-2 border-y border-hairline/80 font-mono text-[12px]"}
>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"In / Out 1M:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"$3.00 / $15.00"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"Avg Latency:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"380ms"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-1.5 rounded-[6px] bg-paper border border-hairline text-ink hover:bg-highlighter-yellow hover:border-transparent text-label-caps font-label-caps uppercase transition-colors flex items-center justify-center gap-1 font-normal"}
 onClick={(event) => simulatePing('claude', event.currentTarget)}
 type={"button"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px]"}
 aria-hidden={"true"}
>
{"bolt"}
</span>
{"\n"}
<span
>
{"Test Route (380ms)"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-sm rounded-[12px] bg-bone border border-hairline flex flex-col justify-between gap-space-sm hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"OPENAI / AZURE"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-paper border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"FLAGSHIP"}
</span>
{"\n"}
</div>
{"\n"}
<h4
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"GPT-4o"}
</h4>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"Multimodal · 128k context"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-1.5 py-2 border-y border-hairline/80 font-mono text-[12px]"}
>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"In / Out 1M:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"$2.50 / $10.00"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"Avg Latency:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"310ms"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-1.5 rounded-[6px] bg-paper border border-hairline text-ink hover:bg-highlighter-yellow hover:border-transparent text-label-caps font-label-caps uppercase transition-colors flex items-center justify-center gap-1 font-normal"}
 onClick={(event) => simulatePing('gpt4o', event.currentTarget)}
 type={"button"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px]"}
 aria-hidden={"true"}
>
{"bolt"}
</span>
{"\n"}
<span
>
{"Test Route (310ms)"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-sm rounded-[12px] bg-bone border border-hairline flex flex-col justify-between gap-space-sm hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"TOGETHER / GROQ"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-highlighter-yellow text-ink text-label-caps font-label-caps uppercase"}
>
{"FASTEST"}
</span>
{"\n"}
</div>
{"\n"}
<h4
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Llama 3.3 70B"}
</h4>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"Open Weights · 128k context"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-1.5 py-2 border-y border-hairline/80 font-mono text-[12px]"}
>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"In / Out 1M:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"$0.59 / $0.79"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex justify-between text-ash"}
>
{"\n"}
<span
>
{"Avg Latency:"}
</span>
{"\n"}
<span
 className={"text-ink font-normal"}
>
{"145ms"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-1.5 rounded-[6px] bg-paper border border-hairline text-ink hover:bg-highlighter-yellow hover:border-transparent text-label-caps font-label-caps uppercase transition-colors flex items-center justify-center gap-1 font-normal"}
 onClick={(event) => simulatePing('llama', event.currentTarget)}
 type={"button"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px]"}
 aria-hidden={"true"}
>
{"bolt"}
</span>
{"\n"}
<span
>
{"Test Route (145ms)"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"hidden px-space-md py-2.5 bg-paper border-t border-hairline text-body-sm font-body-sm flex items-center justify-between"}
 id={"ping-alert-box"}
 aria-live={"polite"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-2 h-2 rounded-full bg-highlighter-yellow animate-ping"}
>
</span>
{"\n"}
<span
 className={"text-ink font-mono text-[12px]"}
 id={"ping-alert-text"}
>
{"Simulating request payload..."}
</span>
{"\n"}
</div>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase"}
>
{"Zero Lock-in Proxy Header Verified"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full bg-obsidian text-paper py-6 border-y border-secondary/20"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto px-margin-mobile md:px-margin"}
>
{"\n"}
<div
 className={"grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-secondary/20"}
>
{"\n"}
{"\n"}
<div
 className={"pt-3 lg:pt-0 lg:px-4 first:pl-0 flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"w-2 h-2 rounded-full bg-highlighter-yellow inline-block animate-pulse"}
>
</span>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase tracking-wider"}
>
{"TOKENS ROUTED TODAY"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"text-paper text-headline-lg font-headline-lg font-normal tracking-tight font-mono"}
>
{"\n            4,892,104,210\n          "}
</div>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Traffic updated every 5s"}
</span>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"pt-3 lg:pt-0 lg:px-4 flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase tracking-wider"}
>
{"SUPPORTED MODELS"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"text-paper text-headline-lg font-headline-lg font-normal tracking-tight"}
>
{"\n            140+ "}
<span
 className={"text-body-lg font-body-lg text-ash"}
>
{"Active"}
</span>
{"\n"}
</div>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Across 12 Global Cloud Providers"}
</span>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"pt-3 lg:pt-0 lg:px-4 flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase tracking-wider"}
>
{"AVERAGE P99 LATENCY"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"text-paper text-headline-lg font-headline-lg font-normal tracking-tight font-mono"}
>
{"\n            342ms\n          "}
</div>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Routing node auto-selection"}
</span>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"pt-3 lg:pt-0 lg:px-4 last:pr-0 flex flex-col gap-1"}
>
{"\n"}
<div
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase tracking-wider"}
>
{"FAILOVER UPTIME"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"text-paper text-headline-lg font-headline-lg font-normal tracking-tight font-mono"}
>
{"\n            99.995%\n          "}
</div>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Dual-redundant gateway proxy"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl"}
 id={"models-directory"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-lg"}
>
{"\n"}
{"\n"}
<div
 className={"flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-hairline pb-space-md"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"MODEL DIRECTORY · CENTRAL REPOSITORY"}
</span>
{"\n"}
<h2
 className={"text-ink text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n            เปรียบเทียบสเปกและราคาจริงแบบโปร่งใส\n          "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-lg font-body-lg font-normal max-w-2xl"}
>
{"\n            ดึงราคาจริงจากระบบกลาง อัปเดตทุกชั่วโมง พร้อมแยกหน่วยคำนวณตาม Modality (Tokens, Images, Audio, Seconds)\n          "}
</p>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-paper border border-hairline text-ash text-body-sm font-body-sm"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n"}
<span
>
{"Sync: 12 นาทีที่แล้ว (Cached Fallback Active)"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"bg-paper p-space-md rounded-[16px] border border-hairline flex flex-col gap-space-md"}
>
{"\n"}
<div
 className={"grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center"}
>
{"\n"}
{"\n"}
<div
 className={"md:col-span-6 relative"}
>
{"\n"}
<span
 className={"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ash text-[18px]"}
 aria-hidden={"true"}
>
{"search"}
</span>
{"\n"}
<input
 className={"w-full h-10 pl-9 pr-3 rounded-[10px] bg-bone border border-hairline text-ink placeholder-ash text-body-sm font-body-sm focus:outline-none focus:border-ink transition-colors"}
 id={"model-search"}
 onInput={filterModelsTable}
 placeholder={"ค้นหาโมเดล เช่น claude-3-5, gpt-4o, deepseek, flux, llama..."}
 type={"text"}
 aria-label={"Search models"}
 />

{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"md:col-span-3"}
>
{"\n"}
<select
 className={"w-full h-10 px-3 rounded-[10px] bg-bone border border-hairline text-ink text-body-sm font-body-sm focus:outline-none focus:border-ink transition-colors cursor-pointer"}
 id={"provider-filter"}
 onChange={filterModelsTable}
 aria-label={"Filter models by provider"}
>
{"\n"}
<option
 value={"all"}
>
{"Providers: All Providers"}
</option>
{"\n"}
<option
 value={"DeepSeek"}
>
{"DeepSeek"}
</option>
{"\n"}
<option
 value={"Anthropic"}
>
{"Anthropic / Bedrock"}
</option>
{"\n"}
<option
 value={"OpenAI"}
>
{"OpenAI / Azure"}
</option>
{"\n"}
<option
 value={"Meta"}
>
{"Meta / Groq"}
</option>
{"\n"}
<option
 value={"Google"}
>
{"Google Vertex"}
</option>
{"\n"}
<option
 value={"Black Forest"}
>
{"Black Forest Labs"}
</option>
{"\n"}
</select>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"md:col-span-3"}
>
{"\n"}
<select
 className={"w-full h-10 px-3 rounded-[10px] bg-bone border border-hairline text-ink text-body-sm font-body-sm focus:outline-none focus:border-ink transition-colors cursor-pointer"}
 id={"sort-filter"}
 onChange={filterModelsTable}
 aria-label={"Sort models"}
>
{"\n"}
<option
 value={"default"}
>
{"Sort by: Default Recommended"}
</option>
{"\n"}
<option
 value={"price-asc"}
>
{"Sort by: Lowest Price First"}
</option>
{"\n"}
<option
 value={"latency-asc"}
>
{"Sort by: Lowest Latency"}
</option>
{"\n"}
<option
 value={"context-desc"}
>
{"Sort by: Largest Context"}
</option>
{"\n"}
</select>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"flex items-center gap-1.5 flex-wrap pt-1 border-t border-hairline"}
>
{"\n"}
<span
 className={"text-ash text-label-caps font-label-caps uppercase mr-2 tracking-wider"}
>
{"Modality:"}
</span>
{"\n"}
<button
 className={"modality-btn px-2.5 py-1 rounded-[6px] bg-ink text-paper text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={(event) => setModalityFilter('all', event.currentTarget)}
 type={"button"}
 aria-pressed={"true"}
>
{"\n            All Modalities\n          "}
</button>
{"\n"}
<button
 className={"modality-btn px-2.5 py-1 rounded-[6px] bg-bone hover:bg-paper text-ink border border-hairline text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={(event) => setModalityFilter('Text', event.currentTarget)}
 type={"button"}
 aria-pressed={"false"}
>
{"\n            Text / LLM\n          "}
</button>
{"\n"}
<button
 className={"modality-btn px-2.5 py-1 rounded-[6px] bg-bone hover:bg-paper text-ink border border-hairline text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={(event) => setModalityFilter('Multimodal', event.currentTarget)}
 type={"button"}
 aria-pressed={"false"}
>
{"\n            Vision / Multimodal\n          "}
</button>
{"\n"}
<button
 className={"modality-btn px-2.5 py-1 rounded-[6px] bg-bone hover:bg-paper text-ink border border-hairline text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={(event) => setModalityFilter('Code', event.currentTarget)}
 type={"button"}
 aria-pressed={"false"}
>
{"\n            Code Specialized\n          "}
</button>
{"\n"}
<button
 className={"modality-btn px-2.5 py-1 rounded-[6px] bg-bone hover:bg-paper text-ink border border-hairline text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={(event) => setModalityFilter('Image', event.currentTarget)}
 type={"button"}
 aria-pressed={"false"}
>
{"\n            Image Generation\n          "}
</button>
{"\n"}
<button
 className={"modality-btn px-2.5 py-1 rounded-[6px] bg-bone hover:bg-paper text-ink border border-hairline text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={(event) => setModalityFilter('Audio', event.currentTarget)}
 type={"button"}
 aria-pressed={"false"}
>
{"\n            Audio / Speech\n          "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"bg-paper rounded-[16px] border border-hairline overflow-x-auto"}
>
{"\n"}
<table
 className={"w-full text-left border-collapse"}
 id={"models-table"}
>

<thead
>

<tr
 className={"bg-bone border-b border-hairline text-ash text-label-caps font-label-caps uppercase tracking-wider"}
>

<th
 className={"py-3 px-4 font-normal"}
>
{"Model & Provider"}
</th>

<th
 className={"py-3 px-4 font-normal"}
>
{"Modality"}
</th>

<th
 className={"py-3 px-4 font-normal"}
>
{"Context"}
</th>

<th
 className={"py-3 px-4 font-normal"}
>
{"Input Price"}
</th>

<th
 className={"py-3 px-4 font-normal"}
>
{"Output Price"}
</th>

<th
 className={"py-3 px-4 font-normal"}
>
{"P99 Latency"}
</th>

<th
 className={"py-3 px-4 font-normal"}
>
{"Failover Tier"}
</th>

<th
 className={"py-3 px-4 text-right font-normal"}
>
{"Action"}
</th>

</tr>

</thead>

<tbody
 className={"divide-y divide-hairline text-body-sm font-body-sm"}
 id={"models-body"}
>


<tr
 className={"model-row hover:bg-bone/60 transition-colors"}
 data-context={"128"}
 data-latency={"240"}
 data-modality={"Text Code"}
 data-price={"0.14"}
 data-provider={"DeepSeek"}
>

<td
 className={"py-3.5 px-4"}
>

<div
 className={"flex flex-col"}
>

<span
 className={"text-ink font-normal font-mono text-[14px]"}
>
{"deepseek-v3"}
</span>

<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"DeepSeek Official API"}
</span>

</div>

</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"px-2 py-0.5 rounded-[4px] bg-bone border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"Text / Code"}
</span>

</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"128k tokens"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$0.14 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$0.28 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"240ms"}
</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"inline-flex items-center gap-1 text-ink text-label-caps font-label-caps uppercase"}
>

<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n                  Multi-region\n                "}
</span>

</td>

<td
 className={"py-3.5 px-4 text-right"}
>

<button
 className={"px-2.5 py-1 rounded-[6px] bg-paper border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => selectModelForSnippet('deepseek-v3')}
 type={"button"}
>
{"\n                  Use in API\n                "}
</button>

</td>

</tr>


<tr
 className={"model-row hover:bg-bone/60 transition-colors"}
 data-context={"200"}
 data-latency={"380"}
 data-modality={"Multimodal Text"}
 data-price={"3.00"}
 data-provider={"Anthropic"}
>

<td
 className={"py-3.5 px-4"}
>

<div
 className={"flex flex-col"}
>

<span
 className={"text-ink font-normal font-mono text-[14px]"}
>
{"claude-3-5-sonnet-20241022"}
</span>

<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Anthropic / AWS Bedrock"}
</span>

</div>

</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"px-2 py-0.5 rounded-[4px] bg-bone border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"Multimodal"}
</span>

</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"200k tokens"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$3.00 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$15.00 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"380ms"}
</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"inline-flex items-center gap-1 text-ink text-label-caps font-label-caps uppercase"}
>

<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n                  Direct + Bedrock\n                "}
</span>

</td>

<td
 className={"py-3.5 px-4 text-right"}
>

<button
 className={"px-2.5 py-1 rounded-[6px] bg-paper border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => selectModelForSnippet('claude-3-5-sonnet-20241022')}
 type={"button"}
>
{"\n                  Use in API\n                "}
</button>

</td>

</tr>


<tr
 className={"model-row hover:bg-bone/60 transition-colors"}
 data-context={"128"}
 data-latency={"310"}
 data-modality={"Multimodal Text"}
 data-price={"2.50"}
 data-provider={"OpenAI"}
>

<td
 className={"py-3.5 px-4"}
>

<div
 className={"flex flex-col"}
>

<span
 className={"text-ink font-normal font-mono text-[14px]"}
>
{"gpt-4o"}
</span>

<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"OpenAI / Azure Foundry"}
</span>

</div>

</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"px-2 py-0.5 rounded-[4px] bg-bone border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"Multimodal"}
</span>

</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"128k tokens"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$2.50 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$10.00 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"310ms"}
</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"inline-flex items-center gap-1 text-ink text-label-caps font-label-caps uppercase"}
>

<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n                  Direct + Azure\n                "}
</span>

</td>

<td
 className={"py-3.5 px-4 text-right"}
>

<button
 className={"px-2.5 py-1 rounded-[6px] bg-paper border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => selectModelForSnippet('gpt-4o')}
 type={"button"}
>
{"\n                  Use in API\n                "}
</button>

</td>

</tr>


<tr
 className={"model-row hover:bg-bone/60 transition-colors"}
 data-context={"128"}
 data-latency={"145"}
 data-modality={"Text Code"}
 data-price={"0.59"}
 data-provider={"Meta"}
>

<td
 className={"py-3.5 px-4"}
>

<div
 className={"flex flex-col"}
>

<span
 className={"text-ink font-normal font-mono text-[14px]"}
>
{"meta-llama/llama-3.3-70b-instruct"}
</span>

<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Meta / Groq / Together"}
</span>

</div>

</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"px-2 py-0.5 rounded-[4px] bg-bone border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"Text"}
</span>

</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"128k tokens"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$0.59 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$0.79 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"145ms"}
</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"inline-flex items-center gap-1 text-ink text-label-caps font-label-caps uppercase"}
>

<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n                  Tri-Cloud Mesh\n                "}
</span>

</td>

<td
 className={"py-3.5 px-4 text-right"}
>

<button
 className={"px-2.5 py-1 rounded-[6px] bg-paper border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => selectModelForSnippet('meta-llama/llama-3.3-70b-instruct')}
 type={"button"}
>
{"\n                  Use in API\n                "}
</button>

</td>

</tr>


<tr
 className={"model-row hover:bg-bone/60 transition-colors"}
 data-context={"2000"}
 data-latency={"420"}
 data-modality={"Multimodal Audio Text"}
 data-price={"1.25"}
 data-provider={"Google"}
>

<td
 className={"py-3.5 px-4"}
>

<div
 className={"flex flex-col"}
>

<span
 className={"text-ink font-normal font-mono text-[14px]"}
>
{"gemini-1.5-pro"}
</span>

<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Google Cloud Vertex"}
</span>

</div>

</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"px-2 py-0.5 rounded-[4px] bg-bone border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"Multimodal / Audio"}
</span>

</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"2,000k tokens"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$1.25 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$5.00 / 1M"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"420ms"}
</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"inline-flex items-center gap-1 text-ink text-label-caps font-label-caps uppercase"}
>

<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n                  GCP Direct\n                "}
</span>

</td>

<td
 className={"py-3.5 px-4 text-right"}
>

<button
 className={"px-2.5 py-1 rounded-[6px] bg-paper border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => selectModelForSnippet('gemini-1.5-pro')}
 type={"button"}
>
{"\n                  Use in API\n                "}
</button>

</td>

</tr>


<tr
 className={"model-row hover:bg-bone/60 transition-colors"}
 data-context={"0"}
 data-latency={"850"}
 data-modality={"Image"}
 data-price={"0.003"}
 data-provider={"Black Forest"}
>

<td
 className={"py-3.5 px-4"}
>

<div
 className={"flex flex-col"}
>

<span
 className={"text-ink font-normal font-mono text-[14px]"}
>
{"black-forest-labs/flux-1-schnell"}
</span>

<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"Black Forest Labs Dedicated"}
</span>

</div>

</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"px-2 py-0.5 rounded-[4px] bg-bone border border-hairline text-ink text-label-caps font-label-caps uppercase"}
>
{"Image Gen"}
</span>

</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"1024x1024"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"$0.003 / image"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ash"}
>
{"N/A (Per Image)"}
</td>

<td
 className={"py-3.5 px-4 font-mono text-ink"}
>
{"850ms"}
</td>

<td
 className={"py-3.5 px-4"}
>

<span
 className={"inline-flex items-center gap-1 text-ink text-label-caps font-label-caps uppercase"}
>

<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n                  GPU Auto-scale\n                "}
</span>

</td>

<td
 className={"py-3.5 px-4 text-right"}
>

<button
 className={"px-2.5 py-1 rounded-[6px] bg-paper border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => selectModelForSnippet('black-forest-labs/flux-1-schnell')}
 type={"button"}
>
{"\n                  Use in API\n                "}
</button>

</td>

</tr>

</tbody>

</table>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center justify-between text-body-sm font-body-sm text-ash pt-1 px-1"}
>
{"\n"}
<span
>
{"Showing 6 of 140+ real-time indexed models"}
</span>
{"\n"}
<a
 className={"text-ink hover:underline font-normal"}
 href={"#"}
>
{"View Complete 140+ Model Catalog Archive →"}
</a>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl bg-bone"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-lg"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"UNIFIED INTERFACE · ZERO RE-ENGINEERING"}
</span>
{"\n"}
<h2
 className={"text-ink text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n          เขียนโค้ดครั้งเดียว สลับได้ทุก Provider\n        "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-lg font-body-lg font-normal max-w-2xl"}
>
{"\n          ระบบรองรับมาตรฐาน OpenAI API specification ทั้งหมด คุณเพียงแค่เปลี่ยน "}
<code
 className={"bg-paper px-1.5 py-0.5 rounded border border-hairline font-mono text-[13px] text-ink"}
>
{"base_url"}
</code>
{" ไม่ต้องลง SDK ใหม่\n        "}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch"}
>
{"\n"}
{"\n"}
<div
 className={"lg:col-span-5 flex flex-col gap-space-sm justify-between"}
>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col gap-1.5"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-6 h-6 rounded-full bg-bone border border-hairline text-ink flex items-center justify-center text-label-caps font-label-caps font-normal"}
>
{"01"}
</span>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Single SDK, Zero Vendor Lock-in"}
</h3>
{"\n"}
</div>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm leading-relaxed pl-8"}
>
{"\n              สลับระหว่าง OpenAI, Anthropic, DeepSeek, Google หรือโมเดลโอเพนซอร์สบน Groq ได้ทันทีด้วยการเปลี่ยนค่า "}
<code
 className={"font-mono text-ink"}
>
{"model"}
</code>
{" เพียงสตริงเดียว\n            "}
</p>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col gap-1.5"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-6 h-6 rounded-full bg-highlighter-yellow text-ink flex items-center justify-center text-label-caps font-label-caps font-normal"}
>
{"02"}
</span>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Smart Fallback & Load Balancing"}
</h3>
{"\n"}
</div>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm leading-relaxed pl-8"}
>
{"\n              เมื่อ upstream provider เกิด rate limit (HTTP 429) หรือ server down ระบบจะ reroute ไปยัง secondary provider อัตโนมัติในระดับ sub-50ms โดยที่แอปพลิเคชันไม่สะดุด\n            "}
</p>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col gap-1.5"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-6 h-6 rounded-full bg-bone border border-hairline text-ink flex items-center justify-center text-label-caps font-label-caps font-normal"}
>
{"03"}
</span>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Unified Billing & Consolidated Invoices"}
</h3>
{"\n"}
</div>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm leading-relaxed pl-8"}
>
{"\n              จ่ายบิลเดียวรวมทุกค่าย ไม่ต้องผูกบัตรเครดิต 5 ใบ พร้อมระบบตั้งงบประมาณรายวัน รายโปรเจกต์ และ dashboard ควบคุมค่าใช้จ่ายแบบ real-time\n            "}
</p>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"lg:col-span-7 rounded-[16px] bg-obsidian text-paper border border-secondary/20 flex flex-col overflow-hidden"}
>
{"\n"}
{"\n"}
<div
 className={"h-11 px-space-md bg-obsidian border-b border-secondary/20 flex items-center justify-between"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<button
 className={"px-2.5 py-1 rounded-[4px] bg-secondary/30 text-paper text-label-caps font-label-caps uppercase font-normal"}
 id={"tab-python"}
 role={"tab"}
 aria-controls={"code-python"}
 aria-selected={true}
 onClick={() => switchCodeLang('python')}
 type={"button"}
>
{"\n                Python\n              "}
</button>
{"\n"}
<button
 className={"px-2.5 py-1 rounded-[4px] text-ash hover:text-paper text-label-caps font-label-caps uppercase font-normal transition-colors"}
 id={"tab-typescript"}
 role={"tab"}
 aria-controls={"code-typescript"}
 aria-selected={false}
 onClick={() => switchCodeLang('typescript')}
 type={"button"}
>
{"\n                TypeScript / Node\n              "}
</button>
{"\n"}
<button
 className={"px-2.5 py-1 rounded-[4px] text-ash hover:text-paper text-label-caps font-label-caps uppercase font-normal transition-colors"}
 id={"tab-curl"}
 role={"tab"}
 aria-controls={"code-curl"}
 aria-selected={false}
 onClick={() => switchCodeLang('curl')}
 type={"button"}
>
{"\n                cURL\n              "}
</button>
{"\n"}
</div>
{"\n"}
<button
 className={"flex items-center gap-1 text-ash hover:text-paper text-label-caps font-label-caps uppercase transition-colors"}
 onClick={(event) => copyCodeSnippet(event.currentTarget)}
 type={"button"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[14px]"}
 aria-hidden={"true"}
>
{"content_copy"}
</span>
{"\n"}
<span
 id={"copy-btn-label"}
>
{"Copy Code"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md flex-1 font-mono text-[13px] leading-relaxed overflow-x-auto text-bone/90"}
 id={"code-snippet-container"}
>
{"\n"}
<div
 className={"block"}
 id={"code-python"}
>
{"\n"}
<span
 className={"text-ash"}
>
{"# 1. Install official standard library"}
</span>
<br
 />

{"\n"}
<span
 className={"text-highlighter-yellow"}
>
{"from"}
</span>
{" openai "}
<span
 className={"text-highlighter-yellow"}
>
{"import"}
</span>
{" OpenAI"}
<br
 />

<br
 />

{"\n"}
<span
 className={"text-ash"}
>
{"# 2. Point base_url to AI Hub Gateway"}
</span>
<br
 />

{"\n              client = OpenAI("}
<br
 />

{"\n                api_key="}
<span
 className={"text-tertiary-fixed"}
>
{"\"aih_live_sec_9941a87b...\""}
</span>
{","}
<br
 />

{"\n                base_url="}
<span
 className={"text-tertiary-fixed"}
>
{"\"https://api.aihub.dev/v1\""}
</span>
<br
 />

{"\n              )"}
<br
 />

<br
 />

{"\n"}
<span
 className={"text-ash"}
>
{"# 3. Request any model with failover routing"}
</span>
<br
 />

{"\n              response = client.chat.completions.create("}
<br
 />

{"\n                model="}
<span
 className={"text-highlighter-yellow font-normal"}
 id={"active-model-name-py"}
>
{"\"deepseek-v3\""}
</span>
{","}
<br
 />

{"\n                messages=["}
<br
 />

{"\n                  {"}
<span
 className={"text-tertiary-fixed"}
>
{"\"role\""}
</span>
{": "}
<span
 className={"text-tertiary-fixed"}
>
{"\"user\""}
</span>
{", "}
<span
 className={"text-tertiary-fixed"}
>
{"\"content\""}
</span>
{": "}
<span
 className={"text-tertiary-fixed"}
>
{"\"Synthesize Q4 financial vector index\""}
</span>
{"}"}
<br
 />

{"\n                ],"}
<br
 />

{"\n                extra_headers={"}
<br
 />

{"\n                  "}
<span
 className={"text-tertiary-fixed"}
>
{"\"X-AIHub-Fallback\""}
</span>
{": "}
<span
 className={"text-tertiary-fixed"}
>
{"\"claude-3-5-sonnet,gpt-4o\""}
</span>
<br
 />

{"\n                }"}
<br
 />

{"\n              )"}
<br
 />

<br
 />

{"\n"}
<span
 className={"text-ash"}
>
{"print"}
</span>
{"(response.choices["}
<span
 className={"text-highlighter-yellow"}
>
{"0"}
</span>
{"].message.content)\n            "}
</div>
{"\n"}
<div
 className={"hidden"}
 id={"code-typescript"}
>
{"\n"}
<span
 className={"text-ash"}
>
{"// TypeScript / JavaScript SDK drop-in"}
</span>
<br
 />

{"\n"}
<span
 className={"text-highlighter-yellow"}
>
{"import"}
</span>
{" OpenAI "}
<span
 className={"text-highlighter-yellow"}
>
{"from"}
</span>
{" "}
<span
 className={"text-tertiary-fixed"}
>
{"'openai'"}
</span>
{";"}
<br
 />

<br
 />

{"\n"}
<span
 className={"text-highlighter-yellow"}
>
{"const"}
</span>
{" aiHub = "}
<span
 className={"text-highlighter-yellow"}
>
{"new"}
</span>
{" OpenAI({"}
<br
 />

{"\n                apiKey: process.env.AIHUB_API_KEY,"}
<br
 />

{"\n                baseURL: "}
<span
 className={"text-tertiary-fixed"}
>
{"'https://api.aihub.dev/v1'"}
</span>
{","}
<br
 />

{"\n              });"}
<br
 />

<br
 />

{"\n"}
<span
 className={"text-highlighter-yellow"}
>
{"const"}
</span>
{" completion = "}
<span
 className={"text-highlighter-yellow"}
>
{"await"}
</span>
{" aiHub.chat.completions.create({"}
<br
 />

{"\n                model: "}
<span
 className={"text-highlighter-yellow"}
 id={"active-model-name-ts"}
>
{"'deepseek-v3'"}
</span>
{","}
<br
 />

{"\n                messages: [{ role: "}
<span
 className={"text-tertiary-fixed"}
>
{"'user'"}
</span>
{", content: "}
<span
 className={"text-tertiary-fixed"}
>
{"'Analyze credit risk payload'"}
</span>
{" }],"}
<br
 />

{"\n              });"}
<br
 />

{"\n              console.log(completion.choices["}
<span
 className={"text-highlighter-yellow"}
>
{"0"}
</span>
{"].message);\n            "}
</div>
{"\n"}
<div
 className={"hidden"}
 id={"code-curl"}
>
{"\n"}
<span
 className={"text-ash"}
>
{"# cURL endpoint direct call"}
</span>
<br
 />

{"\n              curl https://api.aihub.dev/v1/chat/completions \\"}
<br
 />

{"\n                -H "}
<span
 className={"text-tertiary-fixed"}
>
{"\"Authorization: Bearer $AIHUB_API_KEY\""}
</span>
{" \\"}
<br
 />

{"\n                -H "}
<span
 className={"text-tertiary-fixed"}
>
{"\"Content-Type: application/json\""}
</span>
{" \\"}
<br
 />

{"\n                -H "}
<span
 className={"text-tertiary-fixed"}
>
{"\"X-AIHub-Fallback: claude-3-5-sonnet\""}
</span>
{" \\"}
<br
 />

{"\n                -d '{"}
<br
 />

{"\n                  "}
<span
 className={"text-tertiary-fixed"}
>
{"\"model\""}
</span>
{": "}
<span
 className={"text-highlighter-yellow"}
 id={"active-model-name-curl"}
>
{"\"deepseek-v3\""}
</span>
{","}
<br
 />

{"\n                  "}
<span
 className={"text-tertiary-fixed"}
>
{"\"messages\""}
</span>
{": [{"}
<span
 className={"text-tertiary-fixed"}
>
{"\"role\""}
</span>
{": "}
<span
 className={"text-tertiary-fixed"}
>
{"\"user\""}
</span>
{", "}
<span
 className={"text-tertiary-fixed"}
>
{"\"content\""}
</span>
{": "}
<span
 className={"text-tertiary-fixed"}
>
{"\"Hello world\""}
</span>
{"}]"}
<br
 />

{"\n                }'\n            "}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"h-10 px-space-md bg-secondary/10 border-t border-secondary/20 flex items-center justify-between text-body-sm font-body-sm"}
>
{"\n"}
<span
 className={"text-ash flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n              Gateway Endpoint: "}
<span
 className={"text-paper font-mono text-[12px]"}
>
{"api.aihub.dev/v1"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"text-highlighter-yellow text-label-caps font-label-caps uppercase"}
>
{"100% OPENAI COMPATIBLE"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-lg"}
>
{"\n"}
<div
 className={"flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-hairline pb-space-md"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"px-2 py-0.5 rounded-[4px] bg-highlighter-yellow text-ink text-label-caps font-label-caps uppercase"}
>
{"\n              PREVIEW\n            "}
</span>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"\n              ECOSYSTEM WORKFLOWS · Q2 2025\n            "}
</span>
{"\n"}
</div>
{"\n"}
<h2
 className={"text-ink text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n            AI Agents & Autonomous Workflows\n          "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-lg font-body-lg font-normal max-w-2xl"}
>
{"\n            พรีวิวระบบ Agentic Pipeline ที่ต่อเข้ากับโมเดลที่ดีที่สุดในแต่ละขั้นตอน ตั้งแต่งานวิจัย เขียนโค้ด ไปจนถึงงานปฏิบัติการลูกค้า\n          "}
</p>
{"\n"}
</div>
{"\n"}
<button
 className={"h-10 px-4 rounded-[6px] bg-paper border border-hairline hover:bg-bone text-ink text-body-sm font-body-sm flex items-center gap-1.5 transition-colors font-normal whitespace-nowrap self-start md:self-auto"}
 onClick={openWaitlistModal}
 type={"button"}
>
{"\n"}
<span
>
{"Join Agents Waitlist"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px]"}
 aria-hidden={"true"}
>
{"notifications"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"flex items-center gap-2 overflow-x-auto pb-1"}
>
{"\n"}
<span
 className={"px-3 py-1.5 rounded-[6px] bg-ink text-paper text-label-caps font-label-caps uppercase font-normal"}
>
{"All Agents (4)"}
</span>
{"\n"}
<span
 className={"px-3 py-1.5 rounded-[6px] bg-paper border border-hairline text-ash text-label-caps font-label-caps uppercase font-normal"}
>
{"Code & DevOps"}
</span>
{"\n"}
<span
 className={"px-3 py-1.5 rounded-[6px] bg-paper border border-hairline text-ash text-label-caps font-label-caps uppercase font-normal"}
>
{"Research & Data"}
</span>
{"\n"}
<span
 className={"px-3 py-1.5 rounded-[6px] bg-paper border border-hairline text-ash text-label-caps font-label-caps uppercase font-normal"}
>
{"Customer Support"}
</span>
{"\n"}
<span
 className={"px-3 py-1.5 rounded-[6px] bg-paper border border-hairline text-ash text-label-caps font-label-caps uppercase font-normal"}
>
{"FinOps Optimizer"}
</span>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-sm"}
>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col justify-between gap-space-md hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-space-sm"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"w-8 h-8 rounded-[8px] bg-bone border border-hairline flex items-center justify-center text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[18px]"}
 aria-hidden={"true"}
>
{"terminal"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-bone border border-hairline text-ash text-label-caps font-label-caps uppercase"}
>
{"DEV-FLOW"}
</span>
{"\n"}
</div>
{"\n"}
<div
>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"CodeReview Copilot"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm mt-1 leading-relaxed"}
>
{"\n                วิเคราะห์ Pull Request อัตโนมัติ ตรวจจับช่องโหว่ความปลอดภัยด้วย Claude 3.5 พร้อมเขียน Test coverage ผ่าน DeepSeek-V3\n              "}
</p>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-space-sm pt-space-sm border-t border-hairline"}
>
{"\n"}
<div
 className={"flex items-center justify-between text-label-caps font-label-caps text-ash uppercase"}
>
{"\n"}
<span
>
{"Stack: Anthropic + DeepSeek"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"Pipeline V0.9"}
</span>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-2 rounded-[6px] bg-bone border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => openWaitlistModal('CodeReview Copilot')}
 type={"button"}
>
{"\n              Preview · Join Waitlist\n            "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col justify-between gap-space-md hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-space-sm"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"w-8 h-8 rounded-[8px] bg-bone border border-hairline flex items-center justify-center text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[18px]"}
 aria-hidden={"true"}
>
{"travel_explore"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-bone border border-hairline text-ash text-label-caps font-label-caps uppercase"}
>
{"SYNTHESIS"}
</span>
{"\n"}
</div>
{"\n"}
<div
>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Deep Researcher"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm mt-1 leading-relaxed"}
>
{"\n                สำรวจข้อมูลเว็บ เจาะลึกแหล่งข่าวและการเงิน ย่อยเอกสาร 200+ ฉบับเป็นบทวิเคราะห์เชิงลึกพร้อมอ้างอิงแหล่งที่มาครบถ้วน\n              "}
</p>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-space-sm pt-space-sm border-t border-hairline"}
>
{"\n"}
<div
 className={"flex items-center justify-between text-label-caps font-label-caps text-ash uppercase"}
>
{"\n"}
<span
>
{"Stack: Gemini 2M + Perplexity"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"Pipeline V0.8"}
</span>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-2 rounded-[6px] bg-bone border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => openWaitlistModal('Deep Researcher')}
 type={"button"}
>
{"\n              Preview · Join Waitlist\n            "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col justify-between gap-space-md hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-space-sm"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"w-8 h-8 rounded-[8px] bg-bone border border-hairline flex items-center justify-center text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[18px]"}
 aria-hidden={"true"}
>
{"support_agent"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-bone border border-hairline text-ash text-label-caps font-label-caps uppercase"}
>
{"CUSTOMER L1"}
</span>
{"\n"}
</div>
{"\n"}
<div
>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Support Sentinel"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm mt-1 leading-relaxed"}
>
{"\n                บอทตอบคำถามลูกค้าแบบ Real-time หลายภาษา เชื่อมต่อ Helpdesk ticket และส่งต่อเจ้าหน้าที่เมื่อพบเคสซับซ้อน\n              "}
</p>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-space-sm pt-space-sm border-t border-hairline"}
>
{"\n"}
<div
 className={"flex items-center justify-between text-label-caps font-label-caps text-ash uppercase"}
>
{"\n"}
<span
>
{"Stack: GPT-4o + Vector Store"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"Pipeline V1.1"}
</span>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-2 rounded-[6px] bg-bone border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => openWaitlistModal('Support Sentinel')}
 type={"button"}
>
{"\n              Preview · Join Waitlist\n            "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[16px] bg-paper border border-hairline flex flex-col justify-between gap-space-md hover:border-ink transition-colors"}
>
{"\n"}
<div
 className={"flex flex-col gap-space-sm"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"w-8 h-8 rounded-[8px] bg-bone border border-hairline flex items-center justify-center text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[18px]"}
 aria-hidden={"true"}
>
{"price_change"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"px-1.5 py-0.5 rounded bg-highlighter-yellow text-ink text-label-caps font-label-caps uppercase"}
>
{"POPULAR"}
</span>
{"\n"}
</div>
{"\n"}
<div
>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"FinOps Cost Optimizer"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm mt-1 leading-relaxed"}
>
{"\n                ประเมินความซับซ้อนของ Prompt อัตโนมัติ แล้วกระจายงานง่ายไปใช้โมเดลราคาถูก ลดต้นทุน API ลงเฉลี่ย 42% โดยไม่ลดคุณภาพผลลัพธ์\n              "}
</p>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-space-sm pt-space-sm border-t border-hairline"}
>
{"\n"}
<div
 className={"flex items-center justify-between text-label-caps font-label-caps text-ash uppercase"}
>
{"\n"}
<span
>
{"Stack: Classifier + Multi-LLM"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"Pipeline V1.2"}
</span>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full py-2 rounded-[6px] bg-bone border border-hairline hover:bg-highlighter-yellow hover:border-transparent text-ink text-label-caps font-label-caps uppercase transition-colors font-normal"}
 onClick={() => openWaitlistModal('FinOps Cost Optimizer')}
 type={"button"}
>
{"\n              Preview · Join Waitlist\n            "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl bg-bone"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-lg"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"CENTRAL CONSOLE PREVIEW"}
</span>
{"\n"}
<h2
 className={"text-ink text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n          ศูนย์ควบคุมและ Telemetry ระดับองค์กร\n        "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-lg font-body-lg font-normal max-w-2xl"}
>
{"\n          ติดตามการใช้งานรายวินาที, สัดส่วนค่าใช้จ่ายต่อ Provider, ตรวจจับอัตราการเรียกใช้ที่ผิดปกติ และตั้ง Hard Budget Cap ได้ทันที\n        "}
</p>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"w-full bg-paper rounded-[16px] border border-hairline overflow-hidden"}
>
{"\n"}
{"\n"}
<div
 className={"h-12 bg-bone border-b border-hairline px-space-md flex items-center justify-between"}
>
{"\n"}
<div
 className={"flex items-center gap-space-md"}
>
{"\n"}
<span
 className={"text-ink text-label-caps font-label-caps uppercase tracking-wider font-normal"}
>
{"\n              AI HUB CONSOLE · PRODUCTION INSTANCE\n            "}
</span>
{"\n"}
<span
 className={"hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-paper border border-hairline text-ash text-label-caps font-label-caps"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n              Live Gateway Active\n            "}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-space-sm text-ash text-body-sm font-body-sm"}
>
{"\n"}
<span
>
{"Org: "}
<strong
>
{"Acme Enterprise"}
</strong>
</span>
{"\n"}
<span
 className={"text-hairline"}
>
{"|"}
</span>
{"\n"}
<span
 className={"font-mono text-[12px] text-ink"}
>
{"$4,120.40 / $10,000 Cap"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md"}
>
{"\n"}
{"\n"}
<div
 className={"lg:col-span-8 flex flex-col gap-space-md"}
>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[12px] bg-bone border border-hairline flex flex-col gap-space-sm"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<div
>
{"\n"}
<h4
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
>
{"Real-Time Ingestion Throughput"}
</h4>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"Requests per minute vs median latency (Last 24 Hours)"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-2 font-mono text-[12px] text-ink"}
>
{"\n"}
<span
 className={"flex items-center gap-1"}
>
<span
 className={"w-2 h-2 rounded bg-ink inline-block"}
>
</span>
{" Req/s"}
</span>
{"\n"}
<span
 className={"flex items-center gap-1"}
>
<span
 className={"w-2 h-2 rounded bg-highlighter-yellow inline-block"}
>
</span>
{" Latency"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"w-full h-44 pt-2"}
>
{"\n"}
<svg
 className={"w-full h-full overflow-visible"}
 viewBox={"0 0 700 160"}
>
{"\n"}
{"\n"}
<line
 stroke={"#e5e7eb"}
 strokeWidth={"1"}
 x1={"0"}
 x2={"700"}
 y1={"30"}
 y2={"30"}
>
</line>
{"\n"}
<line
 stroke={"#e5e7eb"}
 strokeWidth={"1"}
 x1={"0"}
 x2={"700"}
 y1={"70"}
 y2={"70"}
>
</line>
{"\n"}
<line
 stroke={"#e5e7eb"}
 strokeWidth={"1"}
 x1={"0"}
 x2={"700"}
 y1={"110"}
 y2={"110"}
>
</line>
{"\n"}
<line
 stroke={"#e5e7eb"}
 strokeWidth={"1"}
 x1={"0"}
 x2={"700"}
 y1={"150"}
 y2={"150"}
>
</line>
{"\n"}
{"\n"}
<polygon
 fill={"#f4f2f0"}
 opacity={"0.6"}
 points={"0,150 0,90 60,85 120,95 180,60 240,70 300,45 360,55 420,40 480,35 540,50 600,30 660,25 700,20 700,150"}
>
</polygon>
{"\n"}
{"\n"}
<polyline
 fill={"none"}
 points={"0,90 60,85 120,95 180,60 240,70 300,45 360,55 420,40 480,35 540,50 600,30 660,25 700,20"}
 stroke={"#0c0a08"}
 strokeWidth={"2"}
>
</polyline>
{"\n"}
{"\n"}
<polyline
 fill={"none"}
 points={"0,110 60,112 120,105 180,98 240,100 300,92 360,95 420,88 480,85 540,90 600,82 660,80 700,78"}
 stroke={"#c3d000"}
 strokeDasharray={"4,3"}
 strokeWidth={"2.5"}
>
</polyline>
{"\n"}
{"\n"}
<circle
 cx={"480"}
 cy={"35"}
 fill={"#e4f222"}
 r={"4"}
 stroke={"#0c0a08"}
 strokeWidth={"2"}
>
</circle>
{"\n"}
</svg>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center justify-between text-label-caps font-label-caps text-ash uppercase border-t border-hairline pt-2"}
>
{"\n"}
<span
>
{"00:00 UTC"}
</span>
{"\n"}
<span
>
{"06:00 UTC"}
</span>
{"\n"}
<span
>
{"12:00 UTC"}
</span>
{"\n"}
<span
>
{"18:00 UTC"}
</span>
{"\n"}
<span
>
{"CURRENT (PEAK 1,480 RPM)"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"rounded-[12px] bg-bone border border-hairline overflow-hidden"}
>
{"\n"}
<div
 className={"px-space-md py-2 border-b border-hairline flex items-center justify-between"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"LIVE TELEMETRY STREAM"}
</span>
{"\n"}
<span
 className={"text-body-sm font-body-sm text-ink font-mono"}
>
{"Status: 200 OK"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"divide-y divide-hairline text-body-sm font-body-sm"}
>
{"\n"}
<div
 className={"px-space-md py-2 flex items-center justify-between"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n"}
<span
 className={"font-mono text-[13px] text-ink"}
>
{"POST /v1/chat/completions"}
</span>
{"\n"}
<span
 className={"text-ash"}
>
{"deepseek-v3"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-4 text-ash font-mono text-[12px]"}
>
{"\n"}
<span
>
{"1,820 toks"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"188ms"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"$0.0003"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"px-space-md py-2 flex items-center justify-between"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-ink"}
>
</span>
{"\n"}
<span
 className={"font-mono text-[13px] text-ink"}
>
{"POST /v1/chat/completions"}
</span>
{"\n"}
<span
 className={"text-ash"}
>
{"claude-3-5-sonnet"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-4 text-ash font-mono text-[12px]"}
>
{"\n"}
<span
>
{"4,210 toks"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"345ms"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"$0.0152"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"px-space-md py-2 flex items-center justify-between"}
>
{"\n"}
<div
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n"}
<span
 className={"font-mono text-[13px] text-ink"}
>
{"POST /v1/chat/completions [FAILOVER TRIGGERED]"}
</span>
{"\n"}
<span
 className={"text-ash"}
>
{"gpt-4o → azure-east"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-4 text-ash font-mono text-[12px]"}
>
{"\n"}
<span
>
{"2,100 toks"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"290ms"}
</span>
{"\n"}
<span
 className={"text-ink"}
>
{"$0.0055"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"lg:col-span-4 flex flex-col gap-space-sm"}
>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[12px] bg-bone border border-hairline flex flex-col gap-space-sm"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"MONTHLY COST ALLOCATION"}
</span>
{"\n"}
<div
 className={"flex items-baseline justify-between"}
>
{"\n"}
<span
 className={"text-ink text-headline-lg font-headline-lg font-normal"}
>
{"$4,120.40"}
</span>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"-38% vs direct APIs"}
</span>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"w-full bg-paper h-3 rounded-[4px] border border-hairline overflow-hidden flex"}
>
{"\n"}
<div
 className={"bg-ink h-full"}
 style={{width: "42%"}}
 title={"OpenAI 42%"}
>
</div>
{"\n"}
<div
 className={"bg-ash h-full"}
 style={{width: "38%"}}
 title={"Anthropic 38%"}
>
</div>
{"\n"}
<div
 className={"bg-highlighter-yellow h-full"}
 style={{width: "20%"}}
 title={"DeepSeek 20%"}
>
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-2 pt-2 border-t border-hairline text-body-sm font-body-sm"}
>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"w-2.5 h-2.5 rounded-[2px] bg-ink"}
>
</span>
{"\n"}
<span
>
{"OpenAI / Azure"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"font-mono text-ink"}
>
{"42% ($1,730.56)"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"w-2.5 h-2.5 rounded-[2px] bg-ash"}
>
</span>
{"\n"}
<span
>
{"Anthropic Bedrock"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"font-mono text-ink"}
>
{"38% ($1,565.75)"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center justify-between"}
>
{"\n"}
<span
 className={"flex items-center gap-1.5"}
>
{"\n"}
<span
 className={"w-2.5 h-2.5 rounded-[2px] bg-highlighter-yellow"}
>
</span>
{"\n"}
<span
>
{"DeepSeek & Open Weights"}
</span>
{"\n"}
</span>
{"\n"}
<span
 className={"font-mono text-ink"}
>
{"20% ($824.09)"}
</span>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-md rounded-[12px] bg-bone border border-hairline flex flex-col gap-space-sm flex-1 justify-between"}
>
{"\n"}
<div
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"HARD BUDGET CAP & SAFETY"}
</span>
{"\n"}
<div
 className={"mt-2 space-y-1"}
>
{"\n"}
<div
 className={"flex justify-between text-body-sm font-body-sm text-ash"}
>
{"\n"}
<span
>
{"Threshold Limit"}
</span>
{"\n"}
<span
 className={"text-ink font-mono"}
>
{"41.2%"}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"w-full bg-paper h-2 rounded-full border border-hairline overflow-hidden"}
>
{"\n"}
<div
 className={"bg-ink h-full"}
 style={{width: "41.2%"}}
>
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm mt-3"}
>
{"\n                  ระบบส่ง Webhook แจ้งเตือนเมื่อค่าใช้จ่ายถึง 80% และป้องกันค่าบริการเกินลิมิตแบบ 100%\n                "}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"pt-2 border-t border-hairline flex items-center justify-between text-label-caps font-label-caps uppercase text-ash"}
>
{"\n"}
<span
>
{"Active Keys: 14"}
</span>
{"\n"}
<a
 className={"text-ink hover:underline"}
 href={"#"}
>
{"Manage Keys →"}
</a>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl"}
 id={"pricing"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-lg"}
>
{"\n"}
<div
 className={"text-left space-y-1 border-b border-hairline pb-space-md"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"TRANSPARENT PRICING · PASS-THROUGH TOKEN RATES"}
</span>
{"\n"}
<h2
 className={"text-ink text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n          โครงสร้างราคาโปร่งใส ไม่มีค่าธรรมเนียมซ่อนเร้น\n        "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-lg font-body-lg font-normal max-w-2xl"}
>
{"\n          คิดตามอัตราต้นทุนจริงของ Provider (At-cost token rates) พร้อมระบบสลับ Fallback อัตโนมัติและใบกำกับภาษีครบถ้วน\n        "}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"grid grid-cols-1 md:grid-cols-3 gap-space-md items-stretch"}
>
{"\n"}
{"\n"}
<div
 className={"p-space-lg rounded-[16px] bg-paper border border-hairline flex flex-col justify-between gap-space-lg"}
>
{"\n"}
<div
 className={"space-y-space-md"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"PAY-AS-YOU-GO"}
</span>
{"\n"}
<h3
 className={"text-ink text-headline-md font-headline-md font-normal"}
>
{"Developer"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"สำหรับนักพัฒนาและโปรเจกต์เดี่ยวที่ต้องการเริ่มทดสอบและสร้างต้นแบบ"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-baseline gap-1"}
>
{"\n"}
<span
 className={"text-ink text-display-lg-mobile font-display-lg-mobile font-normal"}
>
{"$0"}
</span>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"/ เดือน + ค่า Token ตามจริง"}
</span>
{"\n"}
</div>
{"\n"}
<ul
 className={"space-y-2.5 text-body-sm font-body-sm text-ash border-t border-hairline pt-space-md"}
>
{"\n"}
<li
 className={"flex items-center gap-2 text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                เข้าถึง 140+ โมเดลทุกค่าย\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2 text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                At-cost token pass-through\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2 text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                5 API Keys พร้อมระบบ Rate limit\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2 text-ink"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Unified Dashboard & Console\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2 text-ash"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ash"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Community Discord Support\n              "}
</li>
{"\n"}
</ul>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full h-11 rounded-[6px] bg-paper border border-hairline hover:bg-bone text-ink text-body-sm font-body-sm transition-colors font-normal"}
 onClick={() => handleTierSelect('Developer')}
 type={"button"}
>
{"\n            Start Free ($10 Credit)\n          "}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-lg rounded-[16px] bg-paper border-2 border-ink flex flex-col justify-between gap-space-lg relative"}
>
{"\n"}
<div
 className={"absolute -top-3 left-6"}
>
{"\n"}
<span
 className={"px-2.5 py-0.5 rounded-[4px] bg-highlighter-yellow text-ink text-label-caps font-label-caps uppercase font-normal"}
>
{"\n              RECOMMENDED FOR TEAMS\n            "}
</span>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-space-md"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"PRODUCTION SCALE"}
</span>
{"\n"}
<h3
 className={"text-ink text-headline-md font-headline-md font-normal"}
>
{"Growth"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"สำหรับสตาร์ทอัพและทีมพัฒนาที่ต้องการ reliability สูงและ routing failover"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-baseline gap-1"}
>
{"\n"}
<span
 className={"text-ink text-display-lg-mobile font-display-lg-mobile font-normal"}
>
{"$49"}
</span>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"/ เดือน + ค่า Token ตามจริง"}
</span>
{"\n"}
</div>
{"\n"}
<ul
 className={"space-y-2.5 text-body-sm font-body-sm text-ink border-t border-hairline pt-space-md"}
>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                ทุกฟีเจอร์ในแพ็กเกจ Developer\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Smart Failover Routing อัตโนมัติ\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                สิทธิ์เข้าถึง Agent Marketplace ก่อนใคร\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                SLA รับประกัน Gateway Uptime 99.9%\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Fast-track Priority Email & Slack Sync\n              "}
</li>
{"\n"}
</ul>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full h-11 rounded-[6px] bg-highlighter-yellow hover:brightness-95 text-ink text-body-sm font-body-sm transition-all font-normal"}
 onClick={() => handleTierSelect('Growth')}
 type={"button"}
>
{"\n            Upgrade to Growth\n          "}
</button>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"p-space-lg rounded-[16px] bg-paper border border-hairline flex flex-col justify-between gap-space-lg"}
>
{"\n"}
<div
 className={"space-y-space-md"}
>
{"\n"}
<div
 className={"space-y-1"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"ENTERPRISE CLOUD"}
</span>
{"\n"}
<h3
 className={"text-ink text-headline-md font-headline-md font-normal"}
>
{"Enterprise"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm"}
>
{"สำหรับองค์กรขนาดใหญ่ที่มีข้อกำหนด Data Governance, VPC หรือข้อกำหนด SOC2"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-baseline gap-1"}
>
{"\n"}
<span
 className={"text-ink text-display-lg-mobile font-display-lg-mobile font-normal"}
>
{"Custom"}
</span>
{"\n"}
<span
 className={"text-ash text-body-sm font-body-sm"}
>
{"/ ออกแบบตามปริมาณงาน"}
</span>
{"\n"}
</div>
{"\n"}
<ul
 className={"space-y-2.5 text-body-sm font-body-sm text-ink border-t border-hairline pt-space-md"}
>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Dedicated VPC Proxy Gateway\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Zero Data Retention (ZDR) Guarantee\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Custom Volume Discounted Token Rates\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                99.995% SLA พร้อมข้อตกลงทางการเงิน\n              "}
</li>
{"\n"}
<li
 className={"flex items-center gap-2"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px] text-ink"}
 aria-hidden={"true"}
>
{"check"}
</span>
{"\n                Dedicated Solutions Architect & 24/7 Hotline\n              "}
</li>
{"\n"}
</ul>
{"\n"}
</div>
{"\n"}
<button
 className={"w-full h-11 rounded-[6px] bg-paper border border-hairline hover:bg-bone text-ink text-body-sm font-body-sm transition-colors font-normal"}
 onClick={() => handleTierSelect('Enterprise')}
 type={"button"}
>
{"\n            Contact Sales Architecture\n          "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl bg-bone"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto flex flex-col gap-space-lg"}
>
{"\n"}
<div
 className={"space-y-1 border-b border-hairline pb-space-md"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"KNOWLEDGE BASE & ARCHITECTURE FAQ"}
</span>
{"\n"}
<h2
 className={"text-ink text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n          คำถามที่พบบ่อยเกี่ยวกับการใช้งาน AI Hub\n        "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-lg font-body-lg font-normal max-w-2xl"}
>
{"\n          ตอบข้อสงสัยด้านเทคนิค ค่าบริการ ระบบ Fallback และการเชื่อมต่อเอกสาร Documentation\n        "}
</p>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"space-y-2 max-w-3xl"}
>
{"\n"}
{"\n"}
<div
 className={"rounded-[12px] bg-paper border border-hairline overflow-hidden"}
>
{"\n"}
<button
 className={"w-full px-space-md py-4 flex items-center justify-between text-left text-ink text-headline-sm font-headline-sm font-normal focus:outline-none"}
 onClick={() => toggleFaq('faq-1')}
 type={"button"}
 aria-controls={"faq-1"}
 aria-expanded={"false"}
>
{"\n"}
<span
>
{"AI Hub คิดราคาอย่างไร มีค่าธรรมเนียมบวกเพิ่มไหม?"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-ash text-[20px] transition-transform duration-200"}
 id={"faq-1-icon"}
 aria-hidden={"true"}
>
{"expand_more"}
</span>
{"\n"}
</button>
{"\n"}
<div
 className={"hidden px-space-md pb-4 pt-1 text-ash text-body-md font-body-md border-t border-hairline/60"}
 id={"faq-1"}
>
{"\n            ระบบคิดค่า Token ตามราคาจริงที่ Provider (OpenAI, Anthropic, Google, DeepSeek) เรียกเก็บ (Pass-through rate) โดยไม่มีการ Markup แอบแฝงบนแพ็กเกจพื้นฐาน ในส่วนของแพ็กเกจ Growth หรือ Enterprise จะมีค่าธรรมเนียมโครงสร้างระบบ Routing & Failover SLA เพิ่มเติมตามที่ระบุไว้ชัดเจน\n          "}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"rounded-[12px] bg-paper border border-hairline overflow-hidden"}
>
{"\n"}
<button
 className={"w-full px-space-md py-4 flex items-center justify-between text-left text-ink text-headline-sm font-headline-sm font-normal focus:outline-none"}
 onClick={() => toggleFaq('faq-2')}
 type={"button"}
 aria-controls={"faq-2"}
 aria-expanded={"false"}
>
{"\n"}
<span
>
{"ระบบรองรับโมเดลไหนบ้าง และจะอัปเดตโมเดลใหม่อย่างไร?"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-ash text-[20px] transition-transform duration-200"}
 id={"faq-2-icon"}
 aria-hidden={"true"}
>
{"expand_more"}
</span>
{"\n"}
</button>
{"\n"}
<div
 className={"hidden px-space-md pb-4 pt-1 text-ash text-body-md font-body-md border-t border-hairline/60"}
 id={"faq-2"}
>
{"\n            เราซิงก์ข้อมูลและเพิ่มโมเดลใหม่เข้าสู่ระบบภายในไม่เกิน 2 ชั่วโมงหลังจากที่ค่ายต้นทางประกาศเปิดตัว API (เช่น Claude 3.5 Sonnet, GPT-4o, DeepSeek-V3, FLUX.1) คุณสามารถเรียกใช้โมเดลใหม่ได้ทันทีโดยไม่ต้องอัปเดตไลบรารีบนโค้ดของคุณ\n          "}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"rounded-[12px] bg-paper border border-hairline overflow-hidden"}
>
{"\n"}
<button
 className={"w-full px-space-md py-4 flex items-center justify-between text-left text-ink text-headline-sm font-headline-sm font-normal focus:outline-none"}
 onClick={() => toggleFaq('faq-3')}
 type={"button"}
 aria-controls={"faq-3"}
 aria-expanded={"false"}
>
{"\n"}
<span
>
{"ถ้า Provider ฝั่งหนึ่งล่ม ระบบจัดการอย่างไร (Fallback Policy)?"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-ash text-[20px] transition-transform duration-200"}
 id={"faq-3-icon"}
 aria-hidden={"true"}
>
{"expand_more"}
</span>
{"\n"}
</button>
{"\n"}
<div
 className={"hidden px-space-md pb-4 pt-1 text-ash text-body-md font-body-md border-t border-hairline/60"}
 id={"faq-3"}
>
{"\n            คุณสามารถระบุ Fallback chain ใน Header เช่น "}
<code
 className={"font-mono text-ink"}
>
{"X-AIHub-Fallback: claude-3-5-sonnet, gpt-4o"}
</code>
{" หาก Provider ตัวแรกตอบกลับเป็น HTTP 429, 500 หรือ Timeout เกินกว่าค่าที่กำหนด เกตเวย์จะสลับคำขอไปยัง Provider ลำดับถัดไปทันที ช่วยรับประกันว่าผู้ใช้งานปลายทางของคุณจะไม่ได้รับ Error\n          "}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"rounded-[12px] bg-paper border border-hairline overflow-hidden"}
>
{"\n"}
<button
 className={"w-full px-space-md py-4 flex items-center justify-between text-left text-ink text-headline-sm font-headline-sm font-normal focus:outline-none"}
 onClick={() => toggleFaq('faq-4')}
 type={"button"}
 aria-controls={"faq-4"}
 aria-expanded={"false"}
>
{"\n"}
<span
>
{"สามารถอ่าน Documentation ได้เลยโดยไม่ต้องสมัครสมาชิกใช่ไหม?"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-ash text-[20px] transition-transform duration-200"}
 id={"faq-4-icon"}
 aria-hidden={"true"}
>
{"expand_more"}
</span>
{"\n"}
</button>
{"\n"}
<div
 className={"hidden px-space-md pb-4 pt-1 text-ash text-body-md font-body-md border-t border-hairline/60"}
 id={"faq-4"}
>
{"\n            ใช่ เอกสารคู่มือทางเทคนิค (Documentation), รายการ Endpoint ทั้งหมด, โค้ดตัวอย่าง Python/TypeScript, และรายงาน Benchmark ของโมเดล เปิดให้อ่านแบบสาธารณะ 100% โดยไม่มี Paywall หรือการบังคับเข้าสู่ระบบตามกฎ Business Requirement BR-002\n          "}
</div>
{"\n"}
</div>
{"\n"}
{"\n"}
<div
 className={"rounded-[12px] bg-paper border border-hairline overflow-hidden"}
>
{"\n"}
<button
 className={"w-full px-space-md py-4 flex items-center justify-between text-left text-ink text-headline-sm font-headline-sm font-normal focus:outline-none"}
 onClick={() => toggleFaq('faq-5')}
 type={"button"}
 aria-controls={"faq-5"}
 aria-expanded={"false"}
>
{"\n"}
<span
>
{"การย้ายโค้ดเดิมที่ใช้ OpenAI SDK มาใช้ AI Hub ต้องแก้อะไรบ้าง?"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-ash text-[20px] transition-transform duration-200"}
 id={"faq-5-icon"}
 aria-hidden={"true"}
>
{"expand_more"}
</span>
{"\n"}
</button>
{"\n"}
<div
 className={"hidden px-space-md pb-4 pt-1 text-ash text-body-md font-body-md border-t border-hairline/60"}
 id={"faq-5"}
>
{"\n            แก้ไขเพียง 2 จุดเท่านั้น: (1) เปลี่ยน "}
<code
 className={"font-mono text-ink"}
>
{"base_url"}
</code>
{" เป็น "}
<code
 className={"font-mono text-ink"}
>
{"https://api.aihub.dev/v1"}
</code>
{" และ (2) นำ API Key ที่ได้จาก AI Hub Console มาใส่แทน ไม่ต้องแก้ Request format หรือ Response parser ใดๆ เลย\n          "}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<section
 className={"w-full px-margin-mobile md:px-margin py-space-xl"}
>
{"\n"}
<div
 className={"max-w-[1200px] mx-auto rounded-[16px] bg-obsidian text-paper p-space-lg md:p-space-xl border border-secondary/20 flex flex-col md:flex-row md:items-center justify-between gap-space-lg"}
>
{"\n"}
<div
 className={"space-y-space-xs max-w-xl"}
>
{"\n"}
<span
 className={"inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/30 text-paper text-label-caps font-label-caps uppercase tracking-wider font-normal"}
>
{"\n"}
<span
 className={"w-1.5 h-1.5 rounded-full bg-highlighter-yellow"}
>
</span>
{"\n          READY TO DEPLOY IN UNDER 2 MINUTES\n        "}
</span>
{"\n"}
<h2
 className={"text-paper text-headline-xl-mobile md:text-headline-xl font-headline-xl tracking-tight font-normal"}
>
{"\n          เริ่มใช้งาน AI Hub วันนี้ รับเครดิต $10 ฟรีทันที\n        "}
</h2>
{"\n"}
<p
 className={"text-ash text-body-md font-body-md font-normal leading-relaxed"}
>
{"\n          เชื่อมต่อโมเดลชั้นนำระดับโลก 140+ ตัวผ่านคีย์เดียว ประหยัดต้นทุน และหยุดความเสี่ยงจากระบบล่มแบบเบ็ดเสร็จ\n        "}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm whitespace-nowrap"}
>
{"\n"}
<button
 className={"h-12 px-6 rounded-[6px] bg-highlighter-yellow hover:brightness-95 text-ink text-body-md font-body-md flex items-center justify-center gap-2 transition-all font-normal"}
 onClick={handleGetStarted}
 type={"button"}
>
{"\n"}
<span
>
{"Get started with $10 free credit"}
</span>
{"\n"}
<span
 className={"material-symbols-outlined text-[16px]"}
 aria-hidden={"true"}
>
{"arrow_forward"}
</span>
{"\n"}
</button>
{"\n"}
<a
 className={"h-12 px-5 rounded-[6px] bg-secondary/20 hover:bg-secondary/40 text-paper text-body-md font-body-md flex items-center justify-center transition-colors font-normal"}
 data-path={"documentation"}
 href={"#"}
>
{"\n          View Documentation →\n        "}
</a>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</section>
{"\n"}
{"\n"}
<dialog
 className={"fixed inset-0 z-50 bg-ink/60 backdrop-blur-none hidden items-center justify-center p-4"}
 id={"waitlist-modal"}
 aria-modal={"true"}
 aria-labelledby={"waitlist-modal-title"}
 onClick={(event) => { if (event.target === event.currentTarget) closeWaitlistModal() }}
>
{"\n"}
<div
 className={"w-full max-w-md bg-paper rounded-[16px] border border-hairline p-space-lg flex flex-col gap-space-md"}
>
{"\n"}
<div
 className={"flex items-center justify-between border-b border-hairline pb-2.5"}
>
{"\n"}
<span
 className={"text-label-caps font-label-caps uppercase text-ash tracking-wider"}
>
{"EARLY ACCESS REGISTRATION"}
</span>
{"\n"}
<button
 className={"text-ash hover:text-ink"}
 onClick={closeWaitlistModal}
 type={"button"}
>
{"\n"}
<span
 className={"material-symbols-outlined text-[20px]"}
 aria-hidden={"true"}
>
{"close"}
</span>
{"\n"}
</button>
{"\n"}
</div>
{"\n"}
<div
>
{"\n"}
<h3
 className={"text-ink text-headline-sm font-headline-sm font-normal"}
 id={"waitlist-modal-title"}
>
{"Join AI Agents Preview"}
</h3>
{"\n"}
<p
 className={"text-ash text-body-sm font-body-sm mt-1"}
>
{"รับสิทธิ์เข้าทดลองใช้งาน workflow อัตโนมัติก่อนเปิดตัวสู่สาธารณะ"}
</p>
{"\n"}
</div>
{"\n"}
<div
 className={"space-y-space-sm"}
>
{"\n"}
<div
>
{"\n"}
<label
 className={"text-label-caps font-label-caps uppercase text-ash block mb-1"}
 htmlFor={"modal-email-input"}
>
{"Corporate Email"}
</label>
{"\n"}
<input
 className={"w-full h-10 px-3 rounded-[8px] bg-bone border border-hairline text-ink text-body-sm font-body-sm focus:outline-none focus:border-ink"}
 id={"modal-email-input"}
 placeholder={"developer@company.com"}
 type={"email"}
 aria-label={"Corporate email"}
 />

{"\n"}
</div>
{"\n"}
<div
>
{"\n"}
<label
 className={"text-label-caps font-label-caps uppercase text-ash block mb-1"}
 htmlFor={"modal-use-case"}
>
{"Primary Use Case"}
</label>
{"\n"}
<select
 className={"w-full h-10 px-3 rounded-[8px] bg-bone border border-hairline text-ink text-body-sm font-body-sm focus:outline-none focus:border-ink"}
 id={"modal-use-case"}
>
{"\n"}
<option
>
{"Multi-model Inference & Fallback"}
</option>
{"\n"}
<option
>
{"Autonomous AI Agent Workflows"}
</option>
{"\n"}
<option
>
{"LLM Cost Reduction & FinOps"}
</option>
{"\n"}
<option
>
{"Enterprise VPC Deployment"}
</option>
{"\n"}
</select>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
<div
 className={"flex items-center gap-space-sm pt-2"}
>
{"\n"}
<button
 className={"flex-1 h-10 rounded-[6px] bg-highlighter-yellow text-ink text-body-sm font-body-sm hover:brightness-95 transition-all font-normal"}
 onClick={submitWaitlist}
 type={"button"}
>
{"\n          Confirm Reservation\n        "}
</button>
{"\n"}
<button
 className={"px-4 h-10 rounded-[6px] bg-bone border border-hairline text-ash hover:text-ink text-body-sm font-body-sm transition-colors font-normal"}
 onClick={closeWaitlistModal}
 type={"button"}
>
{"\n          Cancel\n        "}
</button>
{"\n"}
</div>
{"\n"}
</div>
{"\n"}
</dialog>
{"\n"}
{"\n"}
</div>
</main>
<footer
 className={"w-full bg-obsidian text-paper border-t border-secondary/20 pt-space-xl pb-16"}
>
<div
 className={"max-w-7xl mx-auto px-margin-mobile md:px-margin"}
>
<div
 className={"grid grid-cols-2 md:grid-cols-5 gap-space-lg mb-space-xl"}
>
<div
 className={"col-span-2 flex flex-col justify-between pr-space-lg"}
>
<div
 className={"space-y-space-md"}
>
<div
 className={"flex items-center gap-space-sm"}
>
<img
 alt={"AI Hub Logo"}
 className={"h-7 w-auto object-contain brightness-0 invert"}
 src={"https://lh3.googleusercontent.com/aida/AEtjO1VhU8VMjbS3avUT_r5WBEqZar9_InBXq2YUy4IGXpJHvHFeLSgX6VNzZb6dFCBw8Jyl_GJd-BuQ8gmAfa8lBEwn1k-rjGbFTvhx-cFZVoGXyzSIv7wXTdpNM4-fcwo9JYlzWJh6bnPTQBwuYR4JtMEkN_kj3f1Oo6jAC5GQ7Sb7HuXFZ-fXveCtDrZ0ScyYY-ZYvUQ_QGKf28UUbszkK_hkrUK_-0OcKXoStjiguxu_"}
 />

<span
 className={"font-headline-sm text-headline-sm uppercase tracking-tight text-paper font-bold"}
>
{"AI HUB"}
</span>
</div>
<p
 className={"text-body-sm font-body-sm text-ash max-w-sm"}
>
{"High-performance intelligent routing, multi-provider model telemetry, and enterprise execution infrastructure."}
</p>
</div>
<div
 className={"flex items-center gap-space-xs mt-space-lg"}
>
<span
 className={"inline-block w-2 h-2 rounded-full bg-highlighter-yellow"}
>
</span>
<span
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
{"All Gateways Operational"}
</span>
</div>
</div>
<div
>
<p
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash mb-space-md font-semibold"}
>
{"Platform"}
</p>
<ul
 className={"space-y-2.5 text-body-sm font-body-sm"}
>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"models"}
 href={"#"}
>
{"Models API"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"agents"}
 href={"#"}
>
{"Agent Fleet"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"pricing"}
 href={"#"}
>
{"Pricing"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"dashboard"}
 href={"#"}
>
{"Dashboard"}
</a>
</li>
</ul>
</div>
<div
>
<p
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash mb-space-md font-semibold"}
>
{"Developers"}
</p>
<ul
 className={"space-y-2.5 text-body-sm font-body-sm"}
>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Documentation"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Python & Node SDKs"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Routing Gateway"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Changelog"}
</a>
</li>
</ul>
</div>
<div
>
<p
 className={"text-label-caps font-label-caps uppercase tracking-wider text-ash mb-space-md font-semibold"}
>
{"Company & Legal"}
</p>
<ul
 className={"space-y-2.5 text-body-sm font-body-sm"}
>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Terms of Service"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Privacy Policy"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Security & SOC2"}
</a>
</li>
<li
 className={"leading-none"}
>
<a
 className={"text-paper/80 hover:text-paper transition-colors"}
 data-path={"documentation"}
 href={"#"}
>
{"Compliance"}
</a>
</li>
</ul>
</div>
</div>
<div
 className={"pt-space-md border-t border-secondary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm text-label-caps font-label-caps uppercase tracking-wider text-ash"}
>
<span
>
{"© 2025 AI HUB INC. ALL RIGHTS RESERVED."}
</span>
<span
>
{"EDITORIAL EDITION · TOKYO / NEW YORK / ZURICH"}
</span>
</div>
</div>
</footer>
</>}

export default App

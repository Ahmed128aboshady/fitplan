/* FitPlan • shared offline-first UI for Android WebView and PWA */
const ICON_PATHS={"leaf":"M19 4C10 3 4 7 5 14c1 5 8 6 11 1 2-3 3-7 3-11Z M5 21c0-7 5-10 10-13","home":"m3 10 9-7 9 7 M5 9v11h5v-6h4v6h5V9","workout":"m6 4-2 2 14 14 2-2 M4 4l-2 2 4 4 2-2 M16 16l-2 2 4 4 2-2 M14 4l6 6 M16 2l6 6 M2 16l6 6 M4 14l6 6","food":"M5 3v6a3 3 0 0 0 6 0V3 M8 3v18 M17 3v9h4V3c-3 0-4 4-4 9 M21 12v9","water":"M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z M8 15a4 4 0 0 0 4 4","calendar":"M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z M7 3v4 M17 3v4 M3 10h18 M8 14h2 M14 14h2 M8 17h2","chart":"M4 3v17h17 M8 15l4-4 4 2 5-7","user":"M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M4 21v-2a8 8 0 0 1 16 0v2","arrow":"M19 12H5 m6-6-6 6 6 6","clock":"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M12 7v5l3 2","check":"m5 12 4 4L19 6","spark":"m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z","steps":"M8 3c-3-1-5 6-4 9 1 3 5 2 6-1 1-2 0-7-2-8Z M5 16l3 1-1 4-3-1Z M17 6c3-1 5 6 4 9-1 3-5 2-6-1-1-2 0-7 2-8Z M17 19l3-1 1 3-3 1Z","plus":"M12 5v14 M5 12h14","minus":"M5 12h14","play":"m9 5 11 7-11 7Z","sun":"M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1 1 M18 18l1 1 M19 5l-1 1 M6 18l-1 1","target":"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z M12 11v2","close":"m6 6 12 12 M6 18 18 6","bell":"M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10 M10 21h4","settings":"M4 7h16 M4 17h16 M8 4v6 M16 14v6","scale":"M4 5h16v15H4Z M8 9a5 5 0 0 1 8 0 M12 9l2-2","ruler":"m3 17 14-14 4 4L7 21Z M12 8l3 3 M8 12l3 3","shield":"m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z m-4 9 3 3 5-6","refresh":"M20 7v5h-5 M4 17v-5h5 M20 12a8 8 0 0 0-14-5 M4 12a8 8 0 0 0 14 5","download":"M12 3v12 m-5-5 5 5 5-5 M4 17v4h16v-4","trash":"M4 6h16 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7"};
function uiIcon(name,cls=''){return '<svg class="icon '+cls+'" aria-hidden="true" viewBox="0 0 24 24"><path d="'+(ICON_PATHS[name]||ICON_PATHS.leaf)+'"/></svg>';}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

/* ================= NATIVE BRIDGE (Android APK) ================= */
const NATIVE=window.AndroidApp||null;
function vib(ms){if(NATIVE)NATIVE.vibrate(ms);else if(navigator.vibrate)navigator.vibrate(ms);}

/* ================= ANIMATED EXERCISE SVGS ================= */
function exSvg(id){
  const g='#78925f', b='#6c9ca9', w='#345842', f='#d5ddcd', p='#a7b39b';
  const wrap=(body,floor=122)=>`<svg class="fig" viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
    <line x1="14" y1="${floor}" x2="166" y2="${floor}" stroke="${f}" stroke-width="3" stroke-linecap="round"/>
    ${body}
  </svg>`;
  const S={
    box_squat: wrap(`
      <rect x="34" y="88" width="32" height="6" rx="2" fill="${p}"/>
      <line x1="38" y1="94" x2="38" y2="122" stroke="${p}" stroke-width="4"/>
      <line x1="62" y1="94" x2="62" y2="122" stroke="${p}" stroke-width="4"/>
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="95" cy="34" r="10" fill="${w}">
          <animate attributeName="cy" values="34;58;34" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="cx" values="95;74;95" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <path stroke="${w}" stroke-width="6">
          <animate attributeName="d" values="M95 45 L95 82;M74 68 L62 88;M95 45 L95 82" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${b}" stroke-width="5">
          <animate attributeName="d" values="M95 54 L118 68;M74 74 L112 70;M95 54 L118 68" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M95 82 L95 102 L95 120;M62 88 L98 92 L95 120;M95 82 L95 102 L95 120" dur="2.2s" repeatCount="indefinite"/>
        </path>
      </g>`),
    bird_dog: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="116" cy="74" r="9" fill="${w}"/>
        <line x1="64" y1="78" x2="107" y2="78" stroke="${w}" stroke-width="6"/>
        <line x1="104" y1="78" x2="104" y2="120" stroke="${p}" stroke-width="5"/>
        <path stroke="${p}" stroke-width="5" d="M64 78 L64 118 L48 118"/>
        <path stroke="${b}" stroke-width="5">
          <animate attributeName="d" values="M106 78 L106 120;M106 78 L148 72;M106 78 L106 120" dur="2.4s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M64 78 L64 118 L48 118;M64 78 L22 74 L18 74;M64 78 L64 118 L48 118" dur="2.4s" repeatCount="indefinite"/>
        </path>
      </g>`),
    wall_pushup: wrap(`
      <rect x="132" y="18" width="12" height="104" rx="3" fill="${p}"/>
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="96" cy="36" r="9" fill="${w}">
          <animate attributeName="cx" values="92;114;92" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="36;42;36" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path stroke="${w}" stroke-width="6">
          <animate attributeName="d" values="M90 46 L68 120;M110 52 L68 120;M90 46 L68 120" dur="2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M88 54 L132 54;M107 60 L118 68 L132 54;M88 54 L132 54" dur="2s" repeatCount="indefinite"/>
        </path>
      </g>`),
    glute_bridge: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="38" cy="111" r="9" fill="${w}"/>
        <path stroke="${w}" stroke-width="6">
          <animate attributeName="d" values="M48 114 L92 114;M48 114 L94 84;M48 114 L92 114" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M92 114 L118 88 L132 120;M94 84 L124 84 L132 120;M92 114 L118 88 L132 120" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <line x1="54" y1="117" x2="96" y2="117" stroke="${b}" stroke-width="4"/>
      </g>`),
    incline_plank: wrap(`
      <rect x="112" y="74" width="44" height="48" rx="6" fill="${p}"/>
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="118" cy="52" r="9" fill="${w}"/>
        <line x1="112" y1="60" x2="40" y2="120" stroke="${w}" stroke-width="6"/>
        <path stroke="${g}" stroke-width="5" d="M105 64 L116 74 L134 74"/>
        <circle cx="80" cy="86" r="4" fill="${b}">
          <animate attributeName="r" values="3;7;3" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </g>`),
    standing_oblique: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="90" cy="30" r="9" fill="${w}"/>
        <line x1="90" y1="40" x2="90" y2="82" stroke="${w}" stroke-width="6"/>
        <line x1="88" y1="82" x2="82" y2="120" stroke="${w}" stroke-width="6"/>
        <path stroke="${b}" stroke-width="5" d="M88 46 L72 38 L78 28"/>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M92 46 L112 36 L102 28;M92 46 L114 64 L106 54;M92 46 L112 36 L102 28" dur="1.6s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M92 82 L100 120;M92 82 L114 70 L108 98;M92 82 L100 120" dur="1.6s" repeatCount="indefinite"/>
        </path>
      </g>`),
    heel_touches: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="44" cy="100" r="9" fill="${w}">
          <animate attributeName="cy" values="100;94;100" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <line x1="52" y1="106" x2="94" y2="114" stroke="${w}" stroke-width="6"/>
        <path stroke="${b}" stroke-width="6" d="M94 114 L118 86 L132 120"/>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M60 108 L106 116;M60 108 L128 118;M60 108 L106 116" dur="1.6s" repeatCount="indefinite"/>
        </path>
      </g>`),
    side_plank: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="128" cy="64" r="9" fill="${w}"/>
        <line x1="120" y1="72" x2="56" y2="114" stroke="${w}" stroke-width="6"/>
        <path stroke="${g}" stroke-width="5" d="M114 76 L114 118 L136 118"/>
        <line x1="56" y1="114" x2="36" y2="118" stroke="${b}" stroke-width="6"/>
        <path stroke="${b}" stroke-width="5" d="M108 78 L98 48"/>
        <circle cx="88" cy="92" r="4" fill="${g}">
          <animate attributeName="r" values="3;7;3" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </g>`),
    dead_bug: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="42" cy="112" r="9" fill="${w}"/>
        <line x1="52" y1="115" x2="104" y2="115" stroke="${w}" stroke-width="6"/>
        <path stroke="${b}" stroke-width="5">
          <animate attributeName="d" values="M60 112 L60 72;M60 112 L22 104;M60 112 L60 72" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M104 115 L104 82 L134 82;M104 115 L146 106 L160 106;M104 115 L104 82 L134 82" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${p}" stroke-width="5" d="M104 115 L100 84 L126 84"/>
      </g>`),
    shadow_boxing: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="86" cy="30" r="9" fill="${w}"/>
        <line x1="86" y1="40" x2="84" y2="82" stroke="${w}" stroke-width="6"/>
        <path stroke="${w}" stroke-width="6" d="M84 82 L70 102 L68 120 M84 82 L102 102 L106 120"/>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M86 50 L106 54;M86 50 L140 44;M86 50 L106 54" dur="0.9s" repeatCount="indefinite"/>
        </path>
        <path stroke="${b}" stroke-width="5">
          <animate attributeName="d" values="M86 50 L132 48;M86 50 L98 56;M86 50 L132 48" dur="0.9s" repeatCount="indefinite"/>
        </path>
      </g>`),
    reverse_tap: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="96" cy="30" r="9" fill="${w}"/>
        <line x1="96" y1="40" x2="96" y2="80" stroke="${w}" stroke-width="6"/>
        <line x1="96" y1="80" x2="100" y2="120" stroke="${w}" stroke-width="6"/>
        <path stroke="${b}" stroke-width="5" d="M96 50 L114 66"/>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M96 80 L92 120;M96 80 L54 118;M96 80 L92 120" dur="1.8s" repeatCount="indefinite"/>
        </path>
      </g>`),
    high_knee: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="90" cy="30" r="9" fill="${w}"/>
        <line x1="90" y1="40" x2="90" y2="80" stroke="${w}" stroke-width="6"/>
        <path stroke="${b}" stroke-width="5">
          <animate attributeName="d" values="M90 50 L110 66;M90 50 L72 64;M90 50 L110 66" dur="1.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M90 80 L88 120;M90 80 L118 76 L118 106;M90 80 L88 120" dur="1.2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${w}" stroke-width="6">
          <animate attributeName="d" values="M90 80 L116 78 L116 106;M90 80 L92 120;M90 80 L116 78 L116 106" dur="1.2s" repeatCount="indefinite"/>
        </path>
      </g>`),
    lat_pulldown: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="90" cy="36" r="9" fill="${w}"/>
        <line x1="90" y1="46" x2="90" y2="86" stroke="${w}" stroke-width="6"/>
        <path stroke="${w}" stroke-width="6" d="M90 86 L80 120 M90 86 L100 120"/>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M90 54 L64 20;M90 54 L64 68 L62 48;M90 54 L64 20" dur="2s" repeatCount="indefinite"/>
        </path>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M90 54 L116 20;M90 54 L116 68 L118 48;M90 54 L116 20" dur="2s" repeatCount="indefinite"/>
        </path>
      </g>`),
    side_leg_raise: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="42" cy="110" r="9" fill="${w}"/>
        <line x1="52" y1="114" x2="98" y2="114" stroke="${w}" stroke-width="6"/>
        <line x1="98" y1="114" x2="148" y2="118" stroke="${p}" stroke-width="6"/>
        <path stroke="${g}" stroke-width="6">
          <animate attributeName="d" values="M98 114 L148 114;M98 114 L142 74;M98 114 L148 114" dur="2s" repeatCount="indefinite"/>
        </path>
      </g>`),
    shoulder_taps: wrap(`
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="122" cy="64" r="9" fill="${w}"/>
        <line x1="114" y1="72" x2="54" y2="114" stroke="${w}" stroke-width="6"/>
        <line x1="54" y1="114" x2="34" y2="118" stroke="${w}" stroke-width="5"/>
        <line x1="108" y1="76" x2="108" y2="120" stroke="${p}" stroke-width="5"/>
        <path stroke="${g}" stroke-width="5">
          <animate attributeName="d" values="M112 76 L112 120;M112 76 L102 74;M112 76 L112 120" dur="1.6s" repeatCount="indefinite"/>
        </path>
      </g>`)
  };
  return (S[id]||'').replace(/<path([^>]*?)>(\s*<animate attributeName="d" values="([^;"]+))/g,(_,attrs,animation,firstFrame)=>'<path'+attrs+' d="'+firstFrame+'">'+animation);
}

/* ================= DATA ================= */
const WORKOUTS = {
  A:{title:'كامل الجسم والبطن العميقة',short:'اليوم 1',ex:[
    {id:'box_squat',n:'سكوات على الكرسي',e:'🪑',d:'اقعد على طرف الكرسي وقوم تاني، الضهر مفرود والبطن مشدودة.',s:'الركبة ما تعديش صوابع الرجل.'},
    {id:'bird_dog',n:'الطائر الكلب (Bird-Dog)',e:'🐕',d:'على الركب والإيدين، افرد إيد يمين ورجل شمال بالتوازي وبدّل.',s:'ممتاز لحماية أسفل الظهر — بالراحة.'},
    {id:'wall_pushup',n:'ضغط على الحيطة / الترابيزة',e:'🧱',d:'إيديك على الحيطة أو حافة ترابيزة ثابتة وانزل بصدرك واطلع.',s:'الجسم خط مستقيم من الراس للكعب.'},
    {id:'glute_bridge',n:'الجسر (Glute Bridge)',e:'🌉',d:'نايم على ضهرك والركب مثنية، ارفع الحوض واعصر المؤخرة.',s:'ما ترفعش لدرجة إن الضهر يتقوّس.'},
    {id:'incline_plank',n:'بلانك مائل على الكنبة',e:'🛋️',d:'ساعديك على الكنبة وجسمك خط واحد، اثبت.',s:'لو صعب: انزل على ركبك.'}
  ]},
  B:{title:'تقوية الوسط والتوازن',short:'اليوم 2',ex:[
    {id:'standing_oblique',n:'طحن جانبي وقوفاً',e:'🧍',d:'إيدك ورا راسك، ارفع ركبتك من الجنب لحد ما تقابل الكوع، وبدّل.',s:'آمن تماماً على أسفل الظهر.'},
    {id:'heel_touches',n:'لمس الكعبين (Heel Touches)',e:'👣',d:'نايم والركب مثنية، ميل يمين وشمال والمس كعبك.',s:'الراس مرفوعة شوية والرقبة مرتاحة.'},
    {id:'side_plank',n:'بلانك جانبي على الركبة',e:'📐',d:'ارتكز على الساعد والركبة من الجنب — 20 ثانية لكل جنب.',s:'الحوض لفوق، ما يقعش.'},
    {id:'dead_bug',n:'الحشرة الميتة (Dead Bug)',e:'🪲',d:'نايم على ضهرك، أسفل الضهر لازق في الأرض، حرّك إيد ورجل عكس ببطء.',s:'لو الضهر اترفع من الأرض قلّل المدى.'},
    {id:'shadow_boxing',n:'ملاكمة في المكان',e:'🥊',d:'لكمات في الهوا مع لفة خفيفة للوسط — بدون قفز.',s:'خلي ركبك مثنية شوية.'}
  ]},
  C:{title:'تحمّل وحرق عام',short:'اليوم 3',ex:[
    {id:'reverse_tap',n:'خطوة لورا خفيفة',e:'↩️',d:'رجّع رجلك لورا بالتبادل مع ثني خفيف بس.',s:'ما تنزلش عميق — الركبة الأولوية.'},
    {id:'high_knee',n:'مشي في المكان برفع الركبة',e:'🚶',d:'ارفع الركبة لمستوى الوسط واشدّ البطن مع كل رفعة — بدون قفز.',s:'إيقاع ثابت ونفس منتظم.'},
    {id:'lat_pulldown',n:'سحب الحبل الخيالي',e:'🙆',d:'إيديك لفوق واسحب الكوعين لتحت بقوة واعصر عضلات الضهر.',s:'يصلح قعدة المكتب.'},
    {id:'side_leg_raise',n:'رفع الرجل الجانبي',e:'🦵',d:'نايم على جنبك، ارفع الرجل لفوق ببطء — بدّل في نص الوقت.',s:'ما تلفّش الحوض لورا.'},
    {id:'shoulder_taps',n:'بلانك على الركبة + لمس الكتف',e:'🤚',d:'بلانك على الركب، المس الكتف العكسي بالراحة.',s:'الحوض ثابت ما يتهزش.'}
  ]}
};
const MEALS=[
  {id:'bf',title:'🍳 الفطار (8–9 ص)',opts:[
    {t:'3 بيض مسلوق أو أومليت خفيف + نص رغيف بلدي + خيار وطماطم',k:420,p:24},
    {t:'5 معالق فول بليمون وكمون + بيضة مسلوقة + نص رغيف بلدي + سلطة',k:410,p:20},
    {t:'150ج جبنة قريش بطماطم ومعلقة زيت زيتون + نص رغيف بلدي',k:380,p:26},
    {t:'4 معالق شوفان بلبن خالي الدسم + موزة صغيرة + قرفة',k:370,p:15}
  ]},
  {id:'sn',title:'🍎 سناك الشغل (12–2 ظ)',opts:[
    {t:'ثمرة فاكهة (تفاحة / برتقالة / جوافة) + قهوة أو شاي بدون سكر',k:100,p:1},
    {t:'علبة زبادي لايت + خيار أو رشة قرفة',k:120,p:8},
    {t:'حفنة صغيرة سوداني أو لوز غير مملح (15 حبة)',k:160,p:6}
  ]},
  {id:'ln',title:'🍗 الغداء (بعد الشغل)',opts:[
    {t:'ربع فرخة مشوية أو مسلوقة + 6 معالق رز + طبق سلطة كبير',k:650,p:45},
    {t:'200ج سمك مشوي + 6 معالق رز + سلطة خضراء',k:620,p:44},
    {t:'150ج لحمة مسلوقة/مشوية + خضار مطبوخ خفيف + نص رغيف بلدي',k:680,p:42},
    {t:'علبتين تونة مصفاة + طبق سلطة كبير + نص رغيف بلدي',k:560,p:48}
  ]},
  {id:'dn',title:'🥗 العشاء الخفيف (قبل النوم بـ 3 ساعات)',opts:[
    {t:'علبة زبادي + 2 بيضة مسلوقة + خيار',k:300,p:20},
    {t:'150ج جبنة قريش + طماطم وخيار + ربع رغيف بلدي',k:310,p:24},
    {t:'علبة تونة مصفاة + طبق سلطة كبير',k:280,p:26},
    {t:'120ج صدر فرخة مشوي + سلطة خضراء',k:260,p:32}
  ]}
];
const QUICK_EXTRA=[
  ['شاي بلبن',90],['قهوة بلبن',70],['3 تمرات',70],['موزة',100],['رغيف بلدي',240],['معلقة سكر',20]
];
const SWAPS=[
  ['عيش فينو أو شامي','عيش بلدي (نص رغيف)'],
  ['بيبسي أو عصير معلب','ماء أو مياه غازية بليمون'],
  ['فراخ بانيه أو مقلي','مشوي أو في الإير فراير'],
  ['شيبسي ومقرمشات','فشار بدون زيت أو خيار وجزر'],
  ['شاي بسكر كتير','بدون سكر أو سكر دايت']
];
const WARMUP=[
  {n:'مشي في المكان',d:'خطوات هادية لتسخين الجسم'},
  {n:'دوائر الذراعين',d:'لقدام ولورا'},
  {n:'لف الوسط برفق',d:'يمين وشمال بالراحة'},
  {n:'دوائر الركبة والكاحل',d:'لتجهيز المفاصل'},
  {n:'رفع الركبة ببطء',d:'لمستوى الوسط بالتبادل'}
];
const STRETCH=[
  {n:'وضعية الطفل',d:'اقعد على كعبك ومد إيديك لقدام — يريّح أسفل الضهر'},
  {n:'القطة والجمل',d:'على الركب والإيدين: قوّس الضهر لفوق ثم لتحت ببطء'},
  {n:'ضم الركبة للصدر',d:'نايم على ضهرك، حضن ركبة واحدة ثم التانية'},
  {n:'إطالة الفخذ',d:'الخلفية والأمامية لكل رجل — تحمي الركبة'}
];
const RULES=[
  'بدون مشروبات مسكّرة أو عصائر (ماء بس)',
  'نص الطبق خضار وسلطة',
  'بروتين في كل وجبة',
  'عشاء خفيف قبل النوم بـ 3 ساعات',
  'قمت واتحركت كل ساعة في الشغل'
];
const DAYNAMES=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const DAYSHORT=['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];
const WEEK_ORDER=[6,0,1,2,3,4,5]; // Saturday first
const ROUNDS=4, WORK=40, REST=20, ROUND_REST=60;

/* ================= STATE ================= */
const KEY='fitplan_v1';
const DEF={settings:{days:[6,1,3],waterGoal:3000,cup:250,stepGoal:7000,kcalGoal:1900,height:172,remind:false,remindEvery:60,sound:true},log:{},weights:[],waist:[]};
let S=load();
function load(){
  try{
    const s=JSON.parse(localStorage.getItem(KEY));
    if(!s) return JSON.parse(JSON.stringify(DEF));
    return {...JSON.parse(JSON.stringify(DEF)),...s,settings:{...DEF.settings,...s.settings}};
  }catch(e){return JSON.parse(JSON.stringify(DEF));}
}
function save(){localStorage.setItem(KEY,JSON.stringify(S));}
const pad=n=>String(n).padStart(2,'0');
const dk=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const todayK=()=>dk(new Date());
function L(k){return Object.assign({water:0,workout:false,walk:false,rules:[],autoSteps:0,manualSteps:0,meals:{},extras:[]},S.log[k]);}
function W(k){if(!S.log[k])S.log[k]={water:0,workout:false,walk:false,rules:[],autoSteps:0,manualSteps:0,meals:{},extras:[]};const l=S.log[k];if(!l.meals)l.meals={};if(!l.extras)l.extras=[];if(l.autoSteps==null)l.autoSteps=0;if(l.manualSteps==null)l.manualSteps=0;return l;}
function totalSteps(l){return (l.autoSteps||0)+(l.manualSteps||0);}
function workoutFor(date){
  const sorted=WEEK_ORDER.filter(d=>S.settings.days.includes(d));
  const i=sorted.indexOf(date.getDay());
  return i<0?null:['A','B','C'][i%3];
}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x;}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),1800);}
const $=id=>document.getElementById(id);

/* ================= NAV ================= */
let current='today';
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>go(b.dataset.s));
function go(s){
  if(!['today','workout','food','water','schedule','progress'].includes(s))return;
  current=s;
  document.querySelectorAll('main section').forEach(x=>x.classList.toggle('active',x.id==='s-'+s));
  document.querySelectorAll('#nav button').forEach(x=>{x.classList.toggle('on',x.dataset.s===s);if(x.dataset.s===s)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current');});
  $('home-heading').hidden=s!=='today';
  window.scrollTo({top:0,behavior:'instant'});renderAll();
}
/* ================= TODAY ================= */
function renderToday(){
  const now=new Date(), l=L(todayK()), wo=workoutFor(now), g=S.settings.waterGoal;
  const h=now.getHours(),name=S.settings.name||'يا بطل';
  $('hello').textContent=(h<12?'صباح الخير، ':h<18?'أهلاً بيك، ':'مساء الخير، ')+name;
  $('today-date').textContent=now.toLocaleDateString('ar-EG',{weekday:'long',day:'numeric',month:'long'});
  const st=weekStart(0);
  $('today-week').innerHTML=Array.from({length:7},(_,i)=>{const d=addDays(st,i),isToday=dk(d)===todayK();return '<div class="week-pill '+(isToday?'today ':'')+(workoutFor(d)?'workout':'')+'" '+(isToday?'aria-current="date"':'')+'><span>'+DAYSHORT[d.getDay()]+'</span><b>'+d.toLocaleDateString('ar-EG',{day:'numeric'})+'</b><i aria-hidden="true"></i></div>';}).join('');
  const hero=$('today-hero');hero.className='card hero'+(wo?'':' rest');
  const art='<div class="hero-art" aria-hidden="true"><img src="assets/movement.svg" alt="" style="width:100%;height:100%;object-fit:contain"></div>';
  if(wo){const w=WORKOUTS[wo],mins=Math.round(buildSeq(wo).reduce((a,x)=>a+x.sec,0)/60);
    hero.innerHTML='<div class="hero-copy"><span class="tag">'+uiIcon('workout')+'تمرين النهارده · '+w.short+'</span><h2>'+w.title+'</h2><div class="hero-meta"><span>'+uiIcon('clock')+mins+' دقيقة</span><span>'+uiIcon('workout')+w.ex.length+' تمارين</span><span>'+ROUNDS+' جولات</span></div>'+(l.workout?'<button class="btn" onclick="toggleTask(\'workout\')">'+uiIcon('check')+'تمرينك اتسجّل</button>':'<button class="btn" onclick="startTimer(\''+wo+'\')">نبدأ الحركة '+uiIcon('arrow')+'</button>')+'</div>'+art;
  }else{const next=[1,2,3,4,5,6,7].map(n=>addDays(now,n)).find(d=>workoutFor(d));hero.innerHTML='<div class="hero-copy"><span class="tag">'+uiIcon('leaf')+'يوم راحة واستعادة نشاط</span><h2>الراحة جزء<br>من رحلتك.</h2><p class="mut">مشي خفيف، مياه، ووقت لنفسك.</p><p class="mut">التمرين الجاي: '+(next?DAYNAMES[next.getDay()]:'اختار أيامك')+'</p><button class="btn" onclick="go(\'workout\')">استكشف التمارين '+uiIcon('arrow')+'</button></div>'+art;}
  renderStepsCard(l);
  $('mini-water-value').textContent=(l.water/1000).toLocaleString('ar-EG',{maximumFractionDigits:2});
  $('mini-water-txt').textContent='من '+(g/1000).toLocaleString('ar-EG')+' لتر';
  $('mini-water-bar').style.width=Math.min(100,l.water/g*100)+'%';
  $('mini-water-drops').innerHTML=Array.from({length:8},(_,i)=>uiIcon('water',i<Math.floor(Math.min(1,l.water/g)*8)?'filled':'')).join('');
  document.querySelectorAll('.cupml').forEach(e=>e.textContent=S.settings.cup.toLocaleString('ar-EG'));
  let html='';if(wo)html+=task('workout','كمّل تمرينك · '+WORKOUTS[wo].short,l.workout,'workout');
  html+=task('walk','خصص وقت للمشي النهارده',l.walk,'steps');
  RULES.forEach((r,i)=>html+=task('r'+i,r,l.rules.includes(i),'leaf'));
  $('tasks').innerHTML=html;
  const total=(wo?1:0)+1+RULES.length+1,done=(wo&&l.workout?1:0)+(l.walk?1:0)+l.rules.length+(l.water>=g?1:0),pct=Math.round(done/total*100);
  $('score-txt').textContent=pct.toLocaleString('ar-EG')+'٪';$('score-bar').style.width=pct+'%';
  $('score-ring').style.strokeDashoffset=314.16*(1-pct/100);
  $('score-message').textContent=pct===100?'يومك مليان إنجاز!':pct>=50?'كمّل، إنت ماشي كويس':pct>0?'بداية حلوة، كمّل عليها':'بداية جديدة مستنياك';
  $('score-detail').textContent=pct===100?'خد لحظة تفرح باللي عملته.':'كل عادة صغيرة بتقرّبك لهدفك.';
  $('score-count').textContent=done.toLocaleString('ar-EG')+' من '+total.toLocaleString('ar-EG')+' أهداف مكتملة';
  $('tasks-count').textContent=(done-(l.water>=g?1:0)).toLocaleString('ar-EG')+' / '+(total-1).toLocaleString('ar-EG');
}

function task(id,label,on,ic='leaf'){return '<button type="button" class="check '+(on?'on':'')+'" aria-pressed="'+on+'" onclick="toggleTask(&quot;'+id+'&quot;)"><span class="box" aria-hidden="true">'+(on?'✓':'')+'</span><span class="lbl">'+escapeHtml(label)+'</span>'+uiIcon(ic,'task-icon')+'</button>';}
function toggleTask(id){
  const l=W(todayK());
  if(id==='workout'){l.workout=!l.workout;if(l.workout)toast('🔥 عاش يا بطل!');}
  else if(id==='walk'){l.walk=!l.walk;if(l.walk)toast('🚶 مشي ممتاز!');}
  else{const i=+id.slice(1);l.rules=l.rules.includes(i)?l.rules.filter(x=>x!==i):[...l.rules,i];}
  save();renderAll();
}

/* ================= STEPS ================= */
function renderStepsCard(l){
 const st=totalSteps(l),sg=S.settings.stepGoal||7000,pct=Math.min(100,st/sg*100),hasSensor=NATIVE&&NATIVE.hasStepSensor&&NATIVE.hasStepSensor(),active=NATIVE&&NATIVE.isStepActive&&NATIVE.isStepActive();
 $('steps-card').innerHTML='<div class="row between"><span class="card-label"><span class="icon-tile">'+uiIcon('steps')+'</span>كل مشوار بيتحسب</span><span class="mut">خطوات اليوم</span></div><div class="metric-row"><b class="bignum">'+st.toLocaleString('ar-EG')+'</b><small>/ '+sg.toLocaleString('ar-EG')+' خطوة</small></div><div class="progress"><i style="width:'+pct+'%"></i></div><div class="step-actions"><button class="btn sec sm" onclick="addManualSteps(1000)">+ ١٠ دقايق مشي</button><button class="btn sec sm" onclick="addManualSteps(2500)">+ ٢٥ دقيقة</button><button class="btn sec sm remove-step" onclick="addManualSteps(-500)" aria-label="حذف ٥٠٠ خطوة يدوية">'+uiIcon('minus')+'</button></div>'+(hasSensor&&!active?'<button class="btn sec" style="margin-top:10px" onclick="enableSteps()">تفعيل عداد الخطوات</button>':'')+'<p class="small-note">'+(active?'عداد الجهاز متصل · يتزامن عند فتح التطبيق.':'تسجيل يدوي تقديري · كل ١٠ دقايق ≈ ١٬٠٠٠ خطوة.')+'</p>';
}

function enableSteps(){
  if(NATIVE&&NATIVE.requestSteps){NATIVE.requestSteps();toast('📡 جاري تفعيل عدّاد الخطوات');setTimeout(syncNativeSteps,1500);}
}
function addManualSteps(n){
  const l=W(todayK());
  l.manualSteps=Math.max(0,(l.manualSteps||0)+n);
  if(totalSteps(l)>=3000)l.walk=true;
  save();vib(25);
  if(n>0)toast(`👟 +${n} خطوة`);
  renderAll();
}
function onNativeSteps(n){
  const l=W(todayK());
  if(n>=0){l.autoSteps=n;if(totalSteps(l)>=3000)l.walk=true;save();renderAll();}
}
function syncNativeSteps(){
  if(NATIVE&&NATIVE.getTodaySteps){
    try{const n=NATIVE.getTodaySteps();if(n>0)onNativeSteps(n);}catch(e){}
  }
}

/* ================= FOOD ================= */
function renderFood(){
  const l=L(todayK()), g=S.settings.kcalGoal||1900;
  let kcal=0, prot=0;
  MEALS.forEach(m=>{
    const idx=l.meals&&l.meals[m.id];
    if(idx!=null&&m.opts[idx]){kcal+=m.opts[idx].k;prot+=m.opts[idx].p;}
  });
  (l.extras||[]).forEach(x=>{kcal+=x.k;});
  const left=g-kcal, pct=Math.min(100,kcal/g*100);
  $('food-hero').innerHTML=`
    <span class="tag">تغذيتك النهارده</span>
    <div class="row between" style="margin:8px 0 4px">
      <div><div class="bignum">${kcal}</div><div class="mut" style="color:#d4e0cf">من ${g} سعرة يومياً</div></div>
      <div style="text-align:left"><b style="font-size:20px;color:#dceab5">${prot}ج</b><div class="mut" style="color:#d4e0cf">بروتين مسجّل</div></div>
    </div>
    <div class="progress"><i style="width:${pct}%;${left<0?'background:var(--orange)':''}"></i></div>
    <p class="mut" style="margin-top:8px;color:#d4e0cf">${left>=0?`فاضلك حوالي ${left} سعرة النهاردة`:`أعلى من هدفك بـ ${-left} سعرة`}</p>`;
  $('meals').innerHTML=MEALS.map(m=>{
    const sel=l.meals?l.meals[m.id]:null;
    return `<div class="card"><h2>${m.title}</h2><p class="mut">اختار وجبة واحدة وسجّلها</p>
      ${m.opts.map((o,i)=>`<div class="meal-opt ${sel===i?'on':''}" onclick="pickMeal('${m.id}',${i})">
        <div class="rd"></div>
        <div class="tx">${o.t}</div>
        <div class="kc"><b>${o.k}</b> سعرة<br>${o.p}ج بروتين</div>
      </div>`).join('')}
    </div>`;
  }).join('');
  $('quick-extra').innerHTML=QUICK_EXTRA.map(([n,k])=>`<button class="chip" onclick="quickExtra('${n}',${k})">+ ${n} (${k})</button>`).join('');
  $('extra-list').innerHTML=(l.extras||[]).length
    ?(l.extras||[]).map((x,i)=>`<div class="wt"><span>${escapeHtml(x.n)}</span><span><b>${x.k}</b> سعرة <button class="mut" onclick="delExtra(${i})" style="margin-right:8px">✕</button></span></div>`).join('')
    :'';
  $('swaps').innerHTML=SWAPS.map(([no,yes])=>`<div class="swap"><span class="no">✕ ${no}</span><span>←</span><span class="yes">✓ ${yes}</span></div>`).join('');
}
function pickMeal(id,i){
  const l=W(todayK());
  l.meals[id]=l.meals[id]===i?null:i;
  save();vib(20);renderFood();
}
function addExtra(){
  const n=$('ex-name').value.trim(), k=parseInt($('ex-kcal').value,10);
  if(!n||!Number.isFinite(k)||k<1||k>10000||n.length>100){toast('اكتب الاسم والسعرات');return;}
  const l=W(todayK());l.extras.push({n,k});save();
  $('ex-name').value='';$('ex-kcal').value='';toast('🍽️ اتسجل');renderFood();
}
function quickExtra(n,k){
  const l=W(todayK());l.extras.push({n,k});save();vib(20);toast(`+${n}`);renderFood();
}
function delExtra(i){
  const l=W(todayK());l.extras.splice(i,1);save();renderFood();
}

/* ================= WATER ================= */
function addWater(ml){
  const l=W(todayK()), g=S.settings.waterGoal, before=l.water;
  l.water=Math.max(0,l.water+ml);save();
  vib(30);
  if(before<g&&l.water>=g)toast('🎉 خلّصت هدف الماء النهاردة!');
  else if(ml>0)toast(`💧 +${ml} مل`);
  renderAll();
}
function renderWater(){
  const l=L(todayK()),g=S.settings.waterGoal,c=S.settings.cup;
  $('w-amount').textContent=(l.water/1000).toFixed(2);
  $('w-goal').textContent=`من ${(g/1000).toFixed(1)} لتر`;
  const p=Math.min(1,l.water/g);
  $('ring-fg').style.strokeDashoffset=326.7*(1-p);
  const left=Math.max(0,g-l.water);
  $('w-msg').textContent=left?`فاضلك ${Math.ceil(left/c)} كوب (${left} مل)`:'🎉 هدف النهاردة اتحقق!';
  const n=Math.ceil(g/c),f=Math.floor(l.water/c);
  $('cups').innerHTML=Array.from({length:n},(_,i)=>`<div class="cup ${i<f?'full':''}"></div>`).join('');
  // bars
  let bars='';
  for(let i=6;i>=0;i--){
    const d=addDays(new Date(),-i),v=L(dk(d)).water;
    bars+=`<div class="bar"><i class="${v>=g?'ok':''}" style="height:${Math.min(100,v/g*100)}%"></i><span>${i?DAYSHORT[d.getDay()]:'اليوم'}</span></div>`;
  }
  $('w-bars').innerHTML=bars;
  // settings
  $('remind-toggle').className='check'+(S.settings.remind?' on':'');
  $('remind-toggle').querySelector('.box').textContent=S.settings.remind?'✓':'';
  $('remind-chips').innerHTML=[30,60,90,120].map(m=>`<button class="chip ${S.settings.remindEvery===m?'on':''}" onclick="S.settings.remindEvery=${m};save();setupRemind();renderWater()">${m<60?m+' د':m/60+' س'}</button>`).join('');
  $('goal-chips').innerHTML=[2000,2500,3000,3500].map(m=>`<button class="chip ${g===m?'on':''}" onclick="S.settings.waterGoal=${m};save();renderAll()">${m}</button>`).join('');
  $('cup-chips').innerHTML=[200,250,300,500].map(m=>`<button class="chip ${c===m?'on':''}" onclick="S.settings.cup=${m};save();renderAll()">${m}</button>`).join('');
}
let remindTimer=null;
async function toggleRemind(){
  if(!S.settings.remind){
    if(!NATIVE&&!('Notification' in window)){toast('المتصفح ده لا يدعم إشعارات المياه');return;}
    if(!NATIVE&&'Notification' in window&&Notification.permission!=='granted'){
      const r=await Notification.requestPermission();
      if(r!=='granted'){toast('لازم تسمح بالإشعارات');return;}
    }
    S.settings.remind=true;toast('⏰ التذكير اشتغل');
  }else S.settings.remind=false;
  save();setupRemind();renderWater();
}
function setupRemind(){
  clearInterval(remindTimer);
  if(NATIVE){NATIVE.setReminder(!!S.settings.remind,S.settings.remindEvery);return;}
  if(!S.settings.remind)return;
  remindTimer=setInterval(()=>{
    const h=new Date().getHours();
    if(h<8||h>=22)return;
    const l=L(todayK());if(l.water>=S.settings.waterGoal)return;
    notify('💧 وقت الماء!',`اشرب كوب دلوقتي — شربت ${(l.water/1000).toFixed(2)} لتر لحد دلوقتي`);
  },S.settings.remindEvery*60000);
}
function notify(title,body){
  if(!('Notification' in window)||Notification.permission!=='granted'){toast(title);return;}
  if(navigator.serviceWorker&&navigator.serviceWorker.controller){
    navigator.serviceWorker.ready.then(r=>r.showNotification(title,{body,icon:'icon.svg',badge:'icon.svg',vibrate:[200,100,200],tag:'water'}));
  }else new Notification(title,{body,icon:'icon.svg'});
}

/* ================= WORKOUT TAB ================= */
let woSel=null, exBig=null;
function renderWorkout(){
  if(!woSel)woSel=workoutFor(new Date())||'A';
  $('wo-seg').innerHTML=Object.keys(WORKOUTS).map(k=>`<button class="${woSel===k?'on':''}" onclick="woSel='${k}';exBig=null;renderWorkout()">${WORKOUTS[k].short}</button>`).join('');
  const w=WORKOUTS[woSel];
  $('wo-card').innerHTML=`<h2 style="font-size:18px">${w.title}</h2>
    <p class="mut">⏱ ${WORK} ث تمرين / ${REST} ث راحة × ${ROUNDS} جولات • اضغط على أي تمرين لتكبير الصورة</p>
    ${w.ex.map(x=>`<div class="ex ${exBig===x.id?'big':''}" onclick="exBig=exBig==='${x.id}'?null:'${x.id}';renderWorkout()" style="cursor:pointer">
      <div class="figbox">${exSvg(x.id)}</div>
      <div><h4>${x.n}</h4><small>${x.d}</small><div class="safe">⚠️ ${x.s}</div></div>
    </div>`).join('')}
    <button class="btn" style="margin-top:12px" onclick="startTimer('${woSel}')">▶ ابدأ التمرين بالمؤقت</button>`;
  $('warm-list').innerHTML=WARMUP.map((x,i)=>`<div class="ex"><div class="em">${i+1}</div><div><h4>${x.n}</h4><small>${x.d} — دقيقة</small></div></div>`).join('');
  $('stretch-list').innerHTML=STRETCH.map((x,i)=>`<div class="ex"><div class="em">🧘</div><div><h4>${x.n}</h4><small>${x.d} — دقيقتين</small></div></div>`).join('');
}

/* ================= TIMER ================= */
let seq=[],ti=0,remain=0,running=false,tick=null,endAt=0,curWo=null,audio=null,wakeLock=null;
function buildSeq(type){
  const w=WORKOUTS[type],s=[];
  WARMUP.forEach(x=>s.push({k:'warm',n:x.n,d:x.d,e:'🔥',sec:60,lab:'إحماء'}));
  for(let r=1;r<=ROUNDS;r++){
    w.ex.forEach((x,i)=>{
      s.push({k:'work',id:x.id,n:x.n,d:x.d,e:x.e,sec:WORK,lab:`الجولة ${r} من ${ROUNDS}`});
      const last=i===w.ex.length-1;
      if(r===ROUNDS&&last)return;
      const nx=last?w.ex[0]:w.ex[i+1];
      s.push({k:'rest',n:last?'راحة بين الجولات':'راحة',d:'اشرب بُق ماء وخد نفس',e:'😮‍💨',sec:last?ROUND_REST:REST,lab:`الجولة ${r} من ${ROUNDS}`,next:nx.n});
    });
  }
  STRETCH.forEach(x=>s.push({k:'stretch',n:x.n,d:x.d,e:'🧘',sec:120,lab:'إطالات'}));
  return s;
}
function startTimer(type){
  curWo=type;seq=buildSeq(type);ti=0;$('t-play').onclick=tToggle;document.querySelectorAll('.tctl button').forEach(b=>b.disabled=false);document.body.style.overflow='hidden';document.querySelector('main').inert=true;document.querySelector('header').inert=true;$('nav').inert=true;
  try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();audio.resume();}catch(e){}
  if(NATIVE)NATIVE.keepScreenOn(true);
  else if(navigator.wakeLock)navigator.wakeLock.request('screen').then(l=>wakeLock=l).catch(()=>{});
  $('timer').classList.add('show');
  loadStep(true);$('timer').querySelector('button').focus();
}
function loadStep(autoplay){
  const st=seq[ti];remain=st.sec;
  $('timer').className='show '+st.k;
  $('t-label').textContent=st.lab;
  $('t-em').innerHTML=st.id?exSvg(st.id):st.e;
  $('t-name').textContent=st.n;$('t-desc').textContent=st.d;
  const nx=st.next||(seq[ti+1]?seq[ti+1].n:'النهاية 🎉');
  $('t-next').textContent='التالي: '+nx;
  $('t-prog').style.width=(ti/seq.length*100)+'%';
  $('t-sound').textContent=S.settings.sound?'🔊':'🔇';
  speak(st.k==='rest'?'راحة. التالي '+nx:st.n);
  showNum();
  if(autoplay)play();
}
function play(){running=true;endAt=Date.now()+remain*1000;$('t-play').textContent='إيقاف مؤقت';clearInterval(tick);tick=setInterval(onTick,200);}
function pause(){running=false;clearInterval(tick);$('t-play').textContent='▶ كمّل';}
function tToggle(){running?pause():play();}
function onTick(){
  const r=Math.ceil((endAt-Date.now())/1000);
  if(r!==remain){remain=r;showNum();if(remain<=3&&remain>0)beep(660,.12);}
  if(remain<=0){beep(990,.35);vib(300);next();}
}
function showNum(){const m=Math.floor(remain/60),s=remain%60;$('t-num').textContent=m?`${m}:${pad(s)}`:pad(s);}
function next(){
  if(ti<seq.length-1){ti++;loadStep(true);}
  else finish();
}
function tStep(d){ti=Math.max(0,Math.min(seq.length-1,ti+d));loadStep(running);}
function finish(){
  pause();
  const l=W(todayK());l.workout=true;save();
  $('timer').className='show work';
  $('t-em').textContent='🏆';$('t-name').textContent='خلّصت التمرين! عاش يا بطل';
  $('t-desc').textContent='اشرب ماء كويس، ومتنساش المشي النهاردة.';$('t-num').textContent='✓';$('t-next').textContent='';
  $('t-prog').style.width='100%';$('t-play').textContent='تمام';
  document.querySelectorAll('.tctl button:not(.main)').forEach(b=>b.disabled=true);$('t-play').onclick=()=>{$('t-play').onclick=tToggle;closeTimer();};
  speak('برافو، خلصت التمرين');
}
function closeTimer(){
  pause();$('timer').className='';$('t-play').onclick=tToggle;document.body.style.overflow='';document.querySelector('main').inert=false;document.querySelector('header').inert=false;$('nav').inert=false;
  if(wakeLock){wakeLock.release().catch(()=>{});wakeLock=null;}
  if(NATIVE){NATIVE.keepScreenOn(false);NATIVE.stopSpeak();}
  else if('speechSynthesis' in window)speechSynthesis.cancel();
  renderAll();
}
function beep(f,d){
  if(!S.settings.sound||!audio)return;
  try{const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=f;o.connect(g);g.connect(audio.destination);
  g.gain.setValueAtTime(.25,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.start();o.stop(audio.currentTime+d);}catch(e){}
}
function speak(t){
  if(!S.settings.sound)return;
  if(NATIVE){try{NATIVE.speak(t);}catch(e){}return;}
  if(!('speechSynthesis' in window))return;
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ar-EG';u.rate=1;speechSynthesis.speak(u);}catch(e){}
}
function toggleSound(){S.settings.sound=!S.settings.sound;save();$('t-sound').textContent=S.settings.sound?'🔊':'🔇';}

/* ================= SCHEDULE ================= */
let weekOffset=0;
function weekStart(off){const d=new Date();d.setHours(0,0,0,0);const back=(d.getDay()+1)%7;return addDays(d,-back+off*7);}
function renderSchedule(){
  const st=weekStart(weekOffset),tk=todayK(),g=S.settings.waterGoal;
  $('week-title').textContent=weekOffset===0?'الأسبوع ده':weekOffset===-1?'الأسبوع اللي فات':weekOffset===1?'الأسبوع الجاي':st.toLocaleDateString('ar-EG',{day:'numeric',month:'short'});
  let h='';
  for(let i=0;i<7;i++){
    const d=addDays(st,i),k=dk(d),l=L(k),wo=workoutFor(d);
    let icon=wo?(l.workout?'✅':'🏋️'):(l.workout?'✅':'');
    let sub=(l.walk?'🚶':'')+(l.water>=g?'💧':'');
    h+=`<div class="day ${k===tk?'today':''} ${wo?'wo':''}"><span>${DAYSHORT[d.getDay()]}</span><b>${d.getDate()}</b><div class="t">${icon}</div><div style="font-size:11px;height:16px">${sub}</div><div style="font-size:10px;color:var(--mut)">${wo?WORKOUTS[wo].short:'راحة'}</div></div>`;
  }
  $('week').innerHTML=h;
  $('day-chips').innerHTML=WEEK_ORDER.map(d=>`<button class="chip ${S.settings.days.includes(d)?'on':''}" onclick="toggleDay(${d})">${DAYNAMES[d]}</button>`).join('');
  const isWo=!!workoutFor(new Date());
  const items=[
    ['7:30','wa','الصحيان','💧 كوبين ماء على الريق (500 مل)'],
    ['8:00','','الفطار','بيض / فول / جبنة قريش + خضار + عيش بلدي'],
    ['9:00 – 5:00','wa','الشغل','💧 كوب كل ساعة + قوم اتحرك دقيقتين كل ساعة'],
    ['11:30','','سناك','فاكهة أو زبادي'],
    ['بعد الشغل','','المشي للبيت','🚶 25–40 دقيقة بخطوة سريعة'],
    ['6:00','wa','الغدا','💧 كوبين ماء قبل الأكل بـ 20 دقيقة • نص الطبق سلطة'],
  ];
  if(isWo)items.push(['8:00','','التمرين 🏋️','45 دقيقة — إحماء + تمرين + إطالات','']);
  items.push(['9:00','','العشا الخفيف','زبادي / تونة / بيض مسلوق + سلطة']);
  items.push(['9:30','wa','آخر ماء','💧 كوب ماء — وبعدها خفّف']);
  items.push(['12:00','','النوم','7–8 ساعات نوم = حرق دهون أحسن 😴']);
  $('timeline').innerHTML=items.map(x=>`<div class="it ${x[1]}"><div class="tm">${x[0]}</div><b>${x[2]}</b><div class="mut">${x[3]}</div></div>`).join('')
    +(isWo?'':'<p class="mut">النهاردة يوم راحة — مفيش تمرين في الروتين.</p>');
}
function toggleDay(d){
  let a=S.settings.days;
  if(a.includes(d))a=a.filter(x=>x!==d);
  else{if(a.length>=3){toast('اختار 3 أيام بس — شيل يوم الأول');return;}a=[...a,d];}
  S.settings.days=a;save();renderAll();
}

/* ================= PROGRESS ================= */
function addWeight(){
  const v=parseFloat($('w-in').value);if(!v||v<30||v>300){toast('اكتب وزن صحيح');return;}
  const k=todayK();S.weights=S.weights.filter(x=>x.d!==k);S.weights.push({d:k,v});S.weights.sort((a,b)=>a.d<b.d?-1:1);
  save();$('w-in').value='';toast('⚖️ اتسجل');renderProgress();
}
function addWaist(){
  const v=parseFloat($('waist-in').value);if(!v||v<50||v>200){toast('اكتب مقاس صحيح');return;}
  const k=todayK();S.waist=S.waist.filter(x=>x.d!==k);S.waist.push({d:k,v});S.waist.sort((a,b)=>a.d<b.d?-1:1);
  save();$('waist-in').value='';toast('📏 اتسجل');renderProgress();
}
function listHtml(arr,unit){
  if(!arr.length)return '<div class="empty">لسه مفيش تسجيلات</div>';
  return arr.slice().reverse().slice(0,8).map((x,i,r)=>{
    const prev=r[i+1];let b='';
    if(prev){const df=+(x.v-prev.v).toFixed(1);b=`<span class="badge ${df>0?'up':''}">${df>0?'+':''}${df}</span>`;}
    return `<div class="wt"><span>${new Date(x.d).toLocaleDateString('ar-EG',{day:'numeric',month:'short'})}</span><span>${b} <b>${x.v}</b> ${unit}</span></div>`;
  }).join('');
}
function chart(arr){
  if(arr.length<2)return '';
  const vs=arr.map(x=>x.v),mn=Math.min(...vs)-1,mx=Math.max(...vs)+1,W_=300,H=110;
  const pts=arr.map((x,i)=>[i/(arr.length-1)*(W_-20)+10,H-10-(x.v-mn)/(mx-mn)*(H-20)]);
  const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  return `<svg viewBox="0 0 ${W_} ${H}" width="100%" style="transform:scaleX(-1)"><path d="${path} L${pts[pts.length-1][0]} ${H} L${pts[0][0]} ${H}Z" fill="#22c55e22"/><path d="${path}" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#22c55e"/>`).join('')}</svg>`;
}
function renderProgress(){
  const logs=Object.entries(S.log);
  $('st-wo').textContent=logs.filter(([,l])=>l.workout).length;
  $('st-walk').textContent=logs.filter(([,l])=>l.walk).length;
  const wd=logs.filter(([,l])=>l.water>0);
  $('st-water').textContent=wd.length?(wd.reduce((a,[,l])=>a+l.water,0)/wd.length/1000).toFixed(1):'0';
  // streak: consecutive days with walk or workout or water goal (today may be incomplete)
  let streak=0,d=new Date();
  const ok=l=>l.walk||l.workout||l.water>=S.settings.waterGoal;
  if(!ok(L(dk(d))))d=addDays(d,-1);
  while(ok(L(dk(d)))){streak++;d=addDays(d,-1);}
  $('st-streak').textContent=streak;
  // steps 7-day bars
  const sg=S.settings.stepGoal||7000;
  let sbars='';
  for(let i=6;i>=0;i--){
    const dd=addDays(new Date(),-i), v=totalSteps(L(dk(dd)));
    sbars+=`<div class="bar"><i class="${v>=sg?'ok':''}" style="height:${Math.min(100,v/sg*100)}%"></i><span>${i?DAYSHORT[dd.getDay()]:'اليوم'}</span></div>`;
  }
  $('steps-bars').innerHTML=sbars;
  $('w-chart').innerHTML=chart(S.weights.slice(-12));
  $('w-list').innerHTML=listHtml(S.weights,'كجم');
  $('waist-list').innerHTML=listHtml(S.waist,'سم');
  $('h-in').value=S.settings.height;
  if(!S.weights.length){$('bmi').textContent='سجّل وزنك أولاً';return;}
  const lw=S.weights[S.weights.length-1].v,hm=S.settings.height/100;
  const bmi=lw/(hm*hm);
  $('bmi').textContent=Number.isFinite(bmi)?bmi.toFixed(1):'راجع الطول';
}
function resetAll(){askConfirm('نبدأ من جديد؟','ده هيمسح سجل التمارين والمياه والقياسات وأهدافك من الجهاز. الخطوة دي مالهاش تراجع.','مسح كل البيانات',()=>{localStorage.removeItem(KEY);S=load();setupRemind();woSel=null;renderAll();toast('تم مسح البيانات');});}
/* ================= INIT ================= */
function renderAll(){
  renderToday();
  if(current==='workout')renderWorkout();
  if(current==='food')renderFood();
  if(current==='water')renderWater();
  if(current==='schedule')renderSchedule();
  if(current==='progress')renderProgress();
  enhanceControls();
}
// Android back button: close timer -> go to Today -> exit
function handleBack(){
  const modal=document.querySelector('.modal-backdrop:not([hidden])');if(modal){closeModal(modal.id);return true;}
  if($('timer').classList.contains('show')){closeTimer();return true;}
  if(current!=='today'){go('today');return true;}
  return false;
}

/* ================= ACCESSIBILITY & PERSONALIZATION ================= */
function enhanceControls(){
 document.querySelectorAll('.meal-opt,.ex[onclick],#remind-toggle').forEach(el=>{el.tabIndex=0;el.setAttribute('role',el.classList.contains('meal-opt')?'checkbox':el.id==='remind-toggle'?'switch':'button');if(el.classList.contains('meal-opt')||el.id==='remind-toggle')el.setAttribute('aria-checked',el.classList.contains('on'));});
 document.querySelectorAll('.chip,.seg button').forEach(el=>el.setAttribute('aria-pressed',el.classList.contains('on')));
 document.querySelectorAll('.wt button').forEach(el=>el.setAttribute('aria-label','حذف الوجبة الإضافية'));
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('svg').forEach(el=>{if(el.pauseAnimations){el.setCurrentTime(.6);el.pauseAnimations();}});
}
let modalOpener=null;
function openModal(id){modalOpener=document.activeElement;$(id).hidden=false;document.body.style.overflow='hidden';document.querySelector('main').inert=true;document.querySelector('header').inert=true;$('nav').inert=true;setTimeout(()=>$(id).querySelector('input,button').focus(),0);}
function closeModal(id){$(id).hidden=true;document.body.style.overflow='';document.querySelector('main').inert=false;document.querySelector('header').inert=false;$('nav').inert=false;if(modalOpener&&modalOpener.isConnected)modalOpener.focus();}
function openProfile(){$('profile-name').value=S.settings.name||'';$('profile-steps').value=S.settings.stepGoal;$('profile-kcal').value=S.settings.kcalGoal;openModal('profile-modal');}
function saveProfile(event){event.preventDefault();const steps=Number($('profile-steps').value),kcal=Number($('profile-kcal').value);if(!Number.isFinite(steps)||steps<500||steps>50000||!Number.isFinite(kcal)||kcal<500||kcal>10000)return;S.settings.name=$('profile-name').value.trim().slice(0,30);S.settings.stepGoal=steps;S.settings.kcalGoal=kcal;save();closeModal('profile-modal');renderAll();toast('أهدافك اتحدّثت');}
function setHeight(value){const h=Number(value);if(!Number.isFinite(h)||h<100||h>250){toast('اكتب طول بين ١٠٠ و٢٥٠ سم');$('h-in').value=S.settings.height;return;}S.settings.height=h;save();renderProgress();}
function askConfirm(title,message,label,action){$('confirm-title').textContent=title;$('confirm-message').textContent=message;$('confirm-action').textContent=label;$('confirm-action').onclick=()=>{closeModal('confirm-modal');action();};openModal('confirm-modal');}
document.addEventListener('keydown',e=>{
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('.meal-opt,.ex[onclick],#remind-toggle')){e.preventDefault();e.target.click();}
 const modal=document.querySelector('.modal-backdrop:not([hidden])')||($('timer').classList.contains('show')?$('timer'):null);
 if(e.key==='Escape'&&modal){e.preventDefault();if(modal.id==='timer')closeTimer();else closeModal(modal.id);}
 if(e.key==='Tab'&&modal){const items=[...modal.querySelectorAll('button:not(:disabled),input:not(:disabled),[tabindex="0"]')].filter(x=>x.offsetParent!==null),first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
});
document.addEventListener('click',()=>queueMicrotask(enhanceControls));
document.querySelectorAll('.modal-backdrop').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)closeModal(el.id);}));

if(NATIVE)$('remind-note').textContent='التذكير بيوصلك كإشعار حتى لو التطبيق مقفول (من 8 الصبح لـ 10 بالليل). أول مرة هيطلب منك تسمح بالإشعارات.';
renderAll();setupRemind();syncNativeSteps();
document.addEventListener('visibilitychange',()=>{if(!document.hidden){syncNativeSteps();renderAll();}});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});

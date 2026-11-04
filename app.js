
(()=>{
'use strict';

let lang=localStorage.getItem('learndns-language')||'es';
if(!['es','en'].includes(lang))lang='es';

const getData=language=>language==='en'?window.LEARNDNS_EN:window.LEARNDNS;
let data=getData(lang);

if(!data||!Array.isArray(data.articles)||!Array.isArray(data.categories)){
  if(lang==='en'){
    lang='es';
    data=window.LEARNDNS;
  }
}

if(!data||!Array.isArray(data.articles)||!Array.isArray(data.categories)){
  console.error('LearnDNS: no se pudo cargar el contenido.');
  return;
}

const ui={
  es:{
    articles:'artículos',
    article:'artículo',
    explore:'EXPLORAR SECCIÓN',
    technical:'consulta técnica',
    library:'BIBLIOTECA',
    quick:'CONSULTA RÁPIDA',
    reference:'REFERENCIA',
    glossary:'Glosario DNS',
    glossaryDescription:'Definiciones breves de términos que aparecen en la documentación. Para el desarrollo técnico, abre el artículo relacionado.',
    noSubtitles:'Este artículo no tiene subtítulos.',
    alphabetical:'Glosario alfabético',
    previous:'← ANTERIOR',
    next:'SIGUIENTE →',
    copied:'Copiado ✓',
    unavailable:'No disponible',
    results:'resultados',
    result:'resultado',
    searchDescription:'Se busca en títulos, resúmenes y contenido completo de los artículos.',
    noResults:'No encontramos coincidencias. Prueba con otro término, un registro (por ejemplo, SOA) o un comando (por ejemplo, dig).',
    openNavigation:'Abrir navegación',
    closeNavigation:'Cerrar navegación',
    documentation:'DOCUMENTACIÓN DNS',
    searchPlaceholder:'Buscar en la documentación...',
    selectArticle:'Selecciona un artículo',
    practice:'PRÁCTICA',
    home:'INICIO',
    language:'Idioma',
    homeIndex:'Inicio / índice',
heroTitle:'Entiende cómo funciona',
heroDescription:'Una biblioteca técnica para consultar cómo los dominios se convierten en direcciones IP, cómo se organizan las zonas y cómo los servidores encuentran la información que necesitamos.',
exploreDocumentation:'Explorar documentación',
technicalAreas:'áreas técnicas',
freeConsultation:'Consulta libre · Sin recorrido obligatorio',
root:'Raíz',
hierarchy:'RAÍZ → TLD → DOMINIO',
libraryEyebrow:'BIBLIOTECA DE CONSULTA',
exploreDNS:'Explora el DNS',
topicsDescription:'Encuentra el tema que necesitas y consulta cómo funciona, con ejemplos y referencias técnicas.',
areasDocumentation:'ÁREAS · DOCUMENTACIÓN TÉCNICA',
directAccess:'ACCESO DIRECTO',
essentialReferences:'Referencias esenciales',
quickDescription:'Atajos a recursos de consulta frecuente.',
recordTypes:'Tipos de registros',
toolsCommands:'Comandos y herramientas',
globalSearch:'BIBLIOTECA / BÚSQUEDA GLOBAL',
searchResults:'RESULTADOS',
searchTitle:'Buscar en LearnDNS',
pageToc:'EN ESTA PÁGINA',
quickConsultation:'CONSULTA RÁPIDA',
allAreas:'Todas las áreas',
footerDescription:'Documentación técnica para comprender el Sistema de Nombres de Dominio.',
topics:'Temas',
technicalLibrary:'DOCUMENTACIÓN TÉCNICA',
footerLibrary:'Biblioteca técnica de consulta'
  },
  en:{
    articles:'articles',
    article:'article',
    explore:'EXPLORE SECTION',
    technical:'technical reference',
    library:'LIBRARY',
    quick:'QUICK REFERENCE',
    reference:'REFERENCE',
    glossary:'DNS Glossary',
    glossaryDescription:'Brief definitions of terms used throughout the documentation. Open the related article for a detailed technical explanation.',
    noSubtitles:'This article has no subheadings.',
    alphabetical:'Alphabetical glossary',
    previous:'← PREVIOUS',
    next:'NEXT →',
    copied:'Copied ✓',
    unavailable:'Unavailable',
    results:'results',
    result:'result',
    searchDescription:'Search includes article titles, summaries, and full content.',
    noResults:'No matches found. Try another term, a record type (such as SOA), or a command (such as dig).',
    openNavigation:'Open navigation',
    closeNavigation:'Close navigation',
    documentation:'DNS DOCUMENTATION',
    searchPlaceholder:'Search the documentation...',
    selectArticle:'Select an article',
    practice:'PRACTICE',
    home:'HOME',
    language:'Language',
    homeIndex:'Home / index',
heroTitle:'Understand how the Internet works.',
heroDescription:'A technical library to explore how domains become IP addresses, how zones are organized, and how servers find the information we need.',
exploreDocumentation:'Explore documentation',
technicalAreas:'technical areas',
freeConsultation:'Open reference · No required learning path',
root:'Root',
hierarchy:'ROOT → TLD → DOMAIN',
libraryEyebrow:'REFERENCE LIBRARY',
exploreDNS:'Explore DNS',
topicsDescription:'Find the topic you need and learn how it works through examples and technical references.',
areasDocumentation:'AREAS · TECHNICAL DOCUMENTATION',
directAccess:'QUICK ACCESS',
essentialReferences:'Essential references',
quickDescription:'Shortcuts to frequently used reference resources.',
recordTypes:'Record types',
toolsCommands:'Commands and tools',
globalSearch:'LIBRARY / GLOBAL SEARCH',
searchResults:'RESULTS',
searchTitle:'Search LearnDNS',
pageToc:'ON THIS PAGE',
quickConsultation:'QUICK REFERENCE',
allAreas:'All areas',
footerDescription:'Technical documentation to understand the Domain Name System.',
topics:'Topics',
technicalLibrary:'TECHNICAL DOCUMENTATION',
footerLibrary:'Technical reference library'
  }
};

const t=key=>ui[lang][key]||key;
function applyStaticTranslations(){
  const en=lang==='en';

  const text=(selector,value)=>{
    const el=$(selector);
    if(el)el.textContent=value;
  };

  const html=(selector,value)=>{
    const el=$(selector);
    if(el)el.innerHTML=value;
  };

  const attr=(selector,name,value)=>{
    const el=$(selector);
    if(el)el.setAttribute(name,value);
  };

  // DOCUMENT TITLE AND LANGUAGE
  document.documentElement.lang=lang;

  document.title=en
    ?'LearnDNS · DNS Technical Documentation'
    :'LearnDNS · Documentación técnica de DNS';

  const description=$('meta[name="description"]');

  if(description){
    description.content=en
      ?'LearnDNS: technical library for understanding domains, zones, records, servers, resolution and DNS security.'
      :'LearnDNS: biblioteca técnica para comprender dominios, zonas, registros, servidores, resolución y seguridad DNS.';
  }

  // HEADER
  attr('#menuBtn','aria-label',en?'Open navigation':'Abrir navegación');
  attr('.brand','aria-label',en?'LearnDNS, home':'LearnDNS, inicio');
  attr('#searchInput','aria-label',en?'Search all documentation':'Buscar en toda la documentación');
  attr('#clearSearch','aria-label',en?'Clear search':'Limpiar búsqueda');
  attr('#languageSwitch','aria-label',en?'Language':'Idioma');

  if(input){
    input.placeholder=en
      ?'Search concepts, records, commands…'
      :'Buscar conceptos, registros, comandos…';
  }

  html('.practice-link',en?'PRACTICE ↗':'PRÁCTICA ↗');

  const glossaryHeader=$('header .top-link:not(.practice-link)');

  if(glossaryHeader){
    glossaryHeader.innerHTML=en
      ?'Glossary <span>↗</span>'
      :'Glosario <span>↗</span>';
  }

  const brandSmall=$('.topbar .brand small');

  if(brandSmall){
    brandSmall.textContent=en
      ?'TECHNICAL DOCUMENTATION'
      :'DOCUMENTACIÓN TÉCNICA';
  }

  // SIDEBAR
  const sideHead=$('.side-head');

  if(sideHead){
    const count=$('#articleCount');
    sideHead.firstChild.textContent=en?'LIBRARY ':'BIBLIOTECA ';
    if(count)sideHead.appendChild(count);
  }

  html('.side-home',
    `<span class="home-glyph">⌂</span> ${en?'Home / index':'Inicio / índice'}`
  );

  attr('#sidebar','aria-label',en?'Documentation navigation':'Navegación de documentación');
  attr('#sideNav','aria-label',en?'Documentation sections':'Secciones de documentación');

  html('.side-foot',en
    ?'TECHNICAL REFERENCE<br><span>DNS · RFC · OPERATIONS</span>'
    :'REFERENCIA TÉCNICA<br><span>DNS · RFC · OPERACIÓN</span>'
  );

  // HERO
  text('.hero h1',en?'Understand how the Internet works.':'Entiende cómo funciona Internet.');

  html('.hero h1',en
    ?'Understand how <span>the Internet works.</span>'
    :'Entiende cómo funciona <span>Internet.</span>'
  );

  text('.hero-copy > p',en
    ?'A technical library to explore how domains become IP addresses, how zones are organized, and how servers find the information we need.'
    :'Una biblioteca técnica para consultar cómo los dominios se convierten en direcciones IP, cómo se organizan las zonas y cómo los servidores encuentran la información que necesitamos.'
  );

  const heroButton=$('.hero-copy .button');

  if(heroButton){
    heroButton.innerHTML=en
      ?'Explore documentation <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
      :'Explorar documentación <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  }

  const meta=$$('.hero-meta span');

  if(meta[0]){
    meta[0].innerHTML=`<i></i> ${data.categories.length} ${en?'technical areas':'áreas técnicas'}`;
  }

  if(meta[1]){
    meta[1].textContent=en
      ?'Open reference · No required learning path'
      :'Consulta libre · Sin recorrido obligatorio';
  }

  // DNS DIAGRAM
  attr('.viz','aria-label',en
    ?'DNS hierarchy from root to domain'
    :'Jerarquía DNS desde la raíz hasta un dominio'
  );

  text('.viz-bar span',en?'DNS hierarchy':'jerarquía DNS');
  text('.viz .cap',en?'Root':'Raíz');

  html('.viz-caption',en
    ?'<span>01</span> ROOT <b>→</b> TLD <b>→</b> DOMAIN'
    :'<span>01</span> RAÍZ <b>→</b> TLD <b>→</b> DOMINIO'
  );

  // TOPICS
  text('.topics .eyebrow',en?'REFERENCE LIBRARY':'BIBLIOTECA DE CONSULTA');
  text('.topics h2',en?'Explore DNS':'Explora el DNS');

  text('.topics .section-head p',en
    ?'Find the topic you need and explore how it works through examples and technical references.'
    :'Encuentra el tema que necesitas y consulta cómo funciona, con ejemplos y referencias técnicas.'
  );

  text('.path-note',en
    ?`${data.categories.length} AREAS · TECHNICAL DOCUMENTATION`
    :`${data.categories.length} ÁREAS · DOCUMENTACIÓN TÉCNICA`
  );

  // QUICK LINKS
  text('.quick-links .eyebrow',en?'QUICK ACCESS':'ACCESO DIRECTO');
  text('.quick-links h2',en?'Essential references':'Referencias esenciales');

  text('.quick-links .section-head p',en
    ?'Shortcuts to frequently used reference resources.'
    :'Atajos a recursos de consulta frecuente.'
  );

  const quickLinks=$$('.quick-grid a');

  const quickLabels=en
    ?['DNS Glossary','Record types','Commands and tools']
    :['Glosario DNS','Tipos de registros','Comandos y herramientas'];

  quickLinks.forEach((link,i)=>{
    if(quickLabels[i]){
      link.innerHTML=`${quickLabels[i]} <span>↗</span>`;
    }
  });

  // SEARCH VIEW
  text('#searchView .crumb',en?'LIBRARY / GLOBAL SEARCH':'BIBLIOTECA / BÚSQUEDA GLOBAL');
  text('#searchView .eyebrow',en?'RESULTS':'RESULTADOS');
  text('#searchView h1',en?'Search LearnDNS':'Buscar en LearnDNS');

  // TABLE OF CONTENTS
  text('.toc-title',en?'ON THIS PAGE':'EN ESTA PÁGINA');

  attr('#toc','aria-label',en?'Page navigation':'Navegación de página');

  const tocRelated=$('.toc-related .eyebrow');

  if(tocRelated){
    tocRelated.textContent=en?'QUICK REFERENCE':'CONSULTA RÁPIDA';
  }

  const tocLinks=$$('.toc-related a');

  const tocLabels=en
    ?['DNS Glossary','DNS tools','All areas']
    :['Glosario DNS','Herramientas DNS','Todas las áreas'];

  tocLinks.forEach((link,i)=>{
    if(tocLabels[i]){
      link.innerHTML=`${tocLabels[i]} <b>→</b>`;
    }
  });

  // FOOTER
  text('.footer-brand p',en
    ?'Technical documentation to understand the Domain Name System.'
    :'Documentación técnica para comprender el Sistema de Nombres de Dominio.'
  );

  const footerLinks=$$('.foot-links a');

  const footerLabels=en
    ?['Home','Topics','Glossary','RFC Editor ↗']
    :['Inicio','Temas','Glosario','RFC Editor ↗'];

  footerLinks.forEach((link,i)=>{
    if(footerLabels[i])link.textContent=footerLabels[i];
  });

  const copy=$('.copy');

  if(copy){
    copy.innerHTML=en
      ?'learndns.lat <span>·</span> Technical reference library'
      :'learndns.lat <span>·</span> Biblioteca técnica de consulta';
  }
}
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const home=$('#homeView');
const searchView=$('#searchView');
const articleView=$('#articleView');
const input=$('#searchInput');
const clear=$('#clearSearch');
const searchBox=$('#searchBox');
const sidebar=$('#sidebar');
const menuBtn=$('#menuBtn');

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({
  '&':'&amp;',
  '<':'&lt;',
  '>':'&gt;',
  '"':'&quot;',
  "'":'&#39;'
}[c]));

const plain=s=>String(s??'')
  .replace(/<\/(?:p|h[1-6]|li|tr|div|pre)>/gi,' ')
  .replace(/<[^>]*>/g,' ')
  .replace(/&nbsp;/gi,' ')
  .replace(/&amp;/gi,'&')
  .replace(/&lt;/gi,'<')
  .replace(/&gt;/gi,'>')
  .replace(/&#39;/g,"'")
  .replace(/&quot;/g,'"')
  .replace(/\s+/g,' ')
  .trim();

const cat=id=>data.categories.find(c=>c[0]===id);
const article=id=>data.articles.find(a=>a.id===id);
const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const icons=[
'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
'<path d="M4 4h10l6 6v10H4z"/><path d="M14 4v6h6M8 14h8M8 18h5"/>',
'<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
'<rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><path d="M8 6.5h.01M8 17.5h.01M12 10v4"/>',
'<circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m7.4 11 9.2-4m-9.2 6 9.2 4"/>',
'<path d="M4 5h16v14H4zM8 9h8M8 13h8M8 17h4"/>',
'<path d="M4 12h16M14 6l6 6-6 6M4 5v14"/>',
'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M6 6l12 12M18 6 6 18"/>',
'<path d="M4 4h16v16H4zM8 8h8v8H8z"/><path d="M1 9h3m16 0h3M1 15h3m16 0h3"/>',
'<path d="M4 5h16M4 12h16M4 19h16M8 3v4m8 3v4m-8 3v4"/>',
'<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
'<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>'
];

function setView(which){
  home.hidden=which!=='home';
  searchView.hidden=which!=='search';
  articleView.hidden=which!=='article';
  $('.side-home').classList.toggle('active',which==='home');
}

function closeSidebar(){
  sidebar.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
  menuBtn.setAttribute('aria-label',t('openNavigation'));
}

function renderNav(){
  const nav=$('#sideNav');

  nav.innerHTML=data.categories.map(c=>{
    const items=data.articles.filter(a=>a.cat===c[0]);

    return `
      <div class="nav-group" data-group="${esc(c[0])}">
        <button class="nav-category" type="button" aria-expanded="false">
          <span class="nav-number">${esc(c[0])}</span>
          <span>${esc(c[1])}</span>
          <span class="nav-chevron" aria-hidden="true">＋</span>
        </button>
        <div class="nav-items">
          ${items.map(a=>`
            <a class="nav-item" href="#${encodeURIComponent(a.id)}" data-article="${esc(a.id)}">${esc(a.title)}</a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderHome(){
  const count=$('#articleCount');
  count.textContent=`${data.articles.length} ${t('articles')}`;

  $('#categoryGrid').innerHTML=data.categories.map((c,i)=>{
    const items=data.articles.filter(a=>a.cat===c[0]);
    const first=items[0];

    return `
      <a class="topic" href="${first?'#'+encodeURIComponent(first.id):'#temas'}">
        <div class="topic-top">
          <span class="ico">
            <svg viewBox="0 0 24 24" aria-hidden="true">${icons[i%icons.length]}</svg>
          </span>
          <span class="num">${esc(c[0])} / ${data.categories.length}</span>
        </div>
        <h3>${esc(c[1])}</h3>
        <p>${esc(c[2])}</p>
        <div class="chips">
          <span>${items.length} ${items.length===1?t('article'):t('articles')}</span>
          <span>${t('technical')}</span>
        </div>
        <div class="topic-link">
          <span>${t('explore')}</span>
          <b>→</b>
        </div>
      </a>
    `;
  }).join('');
}

function openArticle(id){
  const a=article(id);

  if(!a){
    setView('home');
    return;
  }

  const c=cat(a.cat);
  const index=data.articles.indexOf(a);
  const prev=data.articles[index-1];
  const next=data.articles[index+1];

  setView('article');

  articleView.innerHTML=`
    <div class="crumb">
      <a href="#inicio">${t('library')}</a> /
      ${esc(c?.[0]||'')} ${esc(c?.[1]?.toUpperCase()||'')}
    </div>
    <div class="eyebrow">
      ${esc(c?.[0]||'')} · ${esc(c?.[1]?.toUpperCase()||'')}
    </div>
    <h1>${esc(a.title)}</h1>
    <p class="lead">${esc(a.summary)}</p>
    <div class="article-meta">
      <span>${t('documentation')}</span>
      <span>${esc(c?.[1]||'')}</span>
      <span>${index+1} / ${data.articles.length}</span>
    </div>
    <div class="article-content">${a.body}</div>
    <div class="article-nav">
      ${prev?`
        <button type="button" data-go="${esc(prev.id)}">
          ${t('previous')}<br><b>${esc(prev.title)}</b>
        </button>
      `:'<span></span>'}
      ${next?`
        <button type="button" data-go="${esc(next.id)}">
          ${t('next')}<br><b>${esc(next.title)}</b>
        </button>
      `:''}
    </div>
  `;

  const headings=$$('.article-content h2,.article-content h3');
  const used=new Set();

  headings.forEach((h,i)=>{
    let id=h.id||`sec-${i+1}`;

    while(used.has(id)||document.getElementById(id))id+='-x';

    used.add(id);
    h.id=id;
  });

  $('#tocLinks').innerHTML=headings.length
    ?headings.map(h=>`
      <a class="${h.tagName==='H3'?'sub':''}" href="#${encodeURIComponent(h.id)}">${esc(h.textContent)}</a>
    `).join('')
    :`<span class="muted">${t('noSubtitles')}</span>`;

  $$('.copy-btn').forEach(b=>{
    b.addEventListener('click',async()=>{
      const code=b.parentElement.querySelector('pre');
      if(!code)return;

      const original=b.textContent;

      try{
        if(navigator.clipboard&&window.isSecureContext){
          await navigator.clipboard.writeText(code.innerText);
        }else{
          const area=document.createElement('textarea');
          area.value=code.innerText;
          area.style.position='fixed';
          area.style.opacity='0';
          document.body.append(area);
          area.select();

          const ok=document.execCommand('copy');
          area.remove();

          if(!ok)throw new Error('copy failed');
        }

        b.textContent=t('copied');
        b.classList.add('copied');
        b.setAttribute('aria-live','polite');

        setTimeout(()=>{
          b.textContent=original;
          b.classList.remove('copied');
        },1500);

      }catch{
        b.textContent=t('unavailable');
        setTimeout(()=>b.textContent=original,1600);
      }
    });
  });

  $$('[data-go]').forEach(b=>{
    b.addEventListener('click',()=>location.hash=b.dataset.go);
  });

  $$('.nav-item').forEach(n=>{
    n.classList.toggle('active',n.dataset.article===id);
  });

  $$('.nav-group').forEach(g=>{
    const active=!!g.querySelector('.nav-item.active');
    g.classList.toggle('open',active);

    const b=g.querySelector('.nav-category');
    b.setAttribute('aria-expanded',String(active));
    b.classList.toggle('selected',active);
    g.querySelector('.nav-chevron').textContent=active?'−':'＋';
  });

  $$('.nav-category').forEach(b=>{
    b.addEventListener('click',()=>{
      const g=b.closest('.nav-group');
      const open=g.classList.toggle('open');

      b.setAttribute('aria-expanded',String(open));
      b.querySelector('.nav-chevron').textContent=open?'−':'＋';
    });
  });

  $('#tocLinks').querySelectorAll('a').forEach(l=>{
    l.addEventListener('click',e=>{
      e.preventDefault();

      const target=document.getElementById(
        decodeURIComponent(l.getAttribute('href').slice(1))
      );

      if(target){
        history.replaceState(null,'',`#${id}`);
        target.scrollIntoView({behavior:motionOK?'smooth':'auto'});
      }
    });
  });

  closeSidebar();
  $('#main').focus({preventScroll:true});
}

function renderGlossary(){
  setView('article');

  articleView.innerHTML=`
    <div class="crumb">
      <a href="#inicio">${t('library')}</a> / ${t('quick')}
    </div>
    <div class="eyebrow">${t('reference')}</div>
    <h1>${t('glossary')}</h1>
    <p class="lead">${t('glossaryDescription')}</p>
    <div class="glossary-list">
      ${data.glossary.map(x=>`
        <div class="glossary-item">
          <b>${esc(x[0])}</b>
          <p>${esc(x[1])}</p>
        </div>
      `).join('')}
    </div>
  `;

  $('#tocLinks').innerHTML=`<span class="muted">${t('alphabetical')}</span>`;
  closeSidebar();
}

function highlight(text,terms){
  let safe=esc(text);

  for(const term of terms){
    const re=new RegExp(
      '('+term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')',
      'ig'
    );
    safe=safe.replace(re,'<mark>$1</mark>');
  }

  return safe;
}

function search(q){
  const query=q.trim().toLocaleLowerCase(lang);

  if(!query){
    setView('home');
    return;
  }

  setView('search');

  const terms=query.split(/\s+/).filter(Boolean);

  const results=data.articles.map(a=>{
    const c=cat(a.cat);
    const text=plain(a.body);
    const title=a.title.toLocaleLowerCase(lang);
    const summary=a.summary.toLocaleLowerCase(lang);
    const category=(c?.[1]||'').toLocaleLowerCase(lang);
    const hay=(title+' '+summary+' '+category+' '+text.toLocaleLowerCase(lang));

    const score=terms.reduce((n,t)=>
      n+
      (title.includes(t)?8:0)+
      (summary.includes(t)?4:0)+
      (category.includes(t)?2:0)+
      (hay.includes(t)?1:0),0
    );

    return{a,c,text,score,hay};
  })
  .filter(x=>terms.every(t=>x.hay.includes(t)))
  .sort((a,b)=>b.score-a.score);

  $('#searchSummary').textContent=
    `${results.length} ${results.length===1?t('result'):t('results')} para “${q}”. ${t('searchDescription')}`;

  $('#searchResults').innerHTML=results.length
    ?results.map(x=>{
      const lower=x.text.toLocaleLowerCase(lang);
      let pos=Infinity;

      for(const term of terms){
        const p=lower.indexOf(term);
        if(p>=0)pos=Math.min(pos,p);
      }

      const start=Math.max(0,(Number.isFinite(pos)?pos:0)-90);
      const snippet=x.text.slice(start,start+240);

      return `
        <a class="result-card" href="#${encodeURIComponent(x.a.id)}">
          <small>${esc(x.c?.[0]||'')} · ${esc(x.c?.[1]||'')}</small>
          <strong>${esc(x.a.title)}</strong>
          <p>${start>0?'…':''}${highlight(snippet,terms)}${start+240<x.text.length?'…':''}</p>
        </a>
      `;
    }).join('')
    :`<div class="empty">${t('noResults')}</div>`;
}

function applyLanguage(nextLang){
  if(!['es','en'].includes(nextLang))return;

  const newData=getData(nextLang);

  if(!newData||!Array.isArray(newData.articles)||!Array.isArray(newData.categories)){
    alert('English content is not available yet. / El contenido en inglés todavía no está disponible.');
    const selector=$('#languageSwitch');
    if(selector)selector.value=lang;
    return;
  }

  const currentHash=location.hash;
  const currentSearch=input.value;

 lang=nextLang;
data=newData;

localStorage.setItem('learndns-language',lang);

const selector=$('#languageSwitch');
if(selector)selector.value=lang;

applyStaticTranslations();
renderNav();
renderHome();

  if(currentHash==='#buscar'&&currentSearch){
    search(currentSearch);
    input.value=currentSearch;
  }else{
    route();
  }

  closeSidebar();
}

function route(){
  const raw=location.hash.slice(1);
  let id;

  try{
    id=decodeURIComponent(raw);
  }catch{
    id=raw;
  }

  if(id.startsWith('sec-'))return;

  input.value='';
  clear.classList.remove('visible');
  searchBox.classList.remove('has-value');

  if(!id||id==='inicio'||id==='temas'||id==='proyecto'){
    setView('home');
    $('#tocLinks').innerHTML=`<span class="muted">${t('selectArticle')}</span>`;

    $$('.nav-item').forEach(n=>n.classList.remove('active'));

    $$('.nav-group').forEach(g=>{
      g.classList.remove('open');
      const b=g.querySelector('.nav-category');

      if(b){
        b.setAttribute('aria-expanded','false');
        b.classList.remove('selected');
        g.querySelector('.nav-chevron').textContent='＋';
      }
    });

    closeSidebar();
    return;
  }

  if(id==='glosario'){
    renderGlossary();
    return;
  }

  if(id==='registros'){
    openArticle('registros-esenciales');
    return;
  }

  if(id==='herramientas'){
    openArticle('herramientas-dns');
    return;
  }

  if(article(id)){
    openArticle(id);
    return;
  }

  setView('home');
}
  
applyStaticTranslations();

renderNav();
renderHome();

window.addEventListener('hashchange',route);

input.placeholder=t('searchPlaceholder');

const languageSwitch=$('#languageSwitch');

if(languageSwitch){
  languageSwitch.value=lang;
  languageSwitch.addEventListener('change',()=>{
    applyLanguage(languageSwitch.value);
  });
}

input.addEventListener('input',()=>{
  const value=input.value;

  clear.classList.toggle('visible',!!value);
  searchBox.classList.toggle('has-value',!!value);

  if(value){
    if(location.hash!=='#buscar'){
      history.replaceState(null,'','#buscar');
    }
    search(value);
  }else{
    history.replaceState(null,'',location.pathname+location.search);
    route();
  }
});

clear.addEventListener('click',()=>{
  input.value='';
  clear.classList.remove('visible');
  searchBox.classList.remove('has-value');

  history.replaceState(null,'',location.pathname+location.search);
  route();
  input.focus();
});

menuBtn.addEventListener('click',()=>{
  const open=sidebar.classList.toggle('open');

  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open?t('closeNavigation'):t('openNavigation'));
});

$('.side-home').addEventListener('click',()=>{
  location.hash='inicio';
  closeSidebar();
});

document.addEventListener('click',e=>{
  if(sidebar.classList.contains('open')&&!sidebar.contains(e.target)&&!menuBtn.contains(e.target)){
    closeSidebar();
  }
});

document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){
    e.preventDefault();
    input.focus();
  }

  if(e.key==='Escape'){
    if(sidebar.classList.contains('open'))closeSidebar();

    if(document.activeElement===input){
      input.value='';
      clear.classList.remove('visible');
      searchBox.classList.remove('has-value');

      history.replaceState(null,'',location.pathname+location.search);
      route();
      input.blur();
    }
  }
});

(function(){
  const c=$('#net');
  if(!c)return;

  const ctx=c.getContext('2d');
  if(!ctx)return;

  const reduce=!motionOK;
  let pts=[],w=0,h=0,raf=0,dpr=1;

  function size(){
    const r=c.getBoundingClientRect();
    dpr=Math.min(window.devicePixelRatio||1,2);
    w=r.width;
    h=r.height;

    c.width=Math.round(w*dpr);
    c.height=Math.round(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);

    const n=Math.round(Math.min(62,w*h/17000));

    pts=Array.from({length:n},()=>({
      x:Math.random()*w,
      y:Math.random()*h,
      vx:(Math.random()-.5)*.22,
      vy:(Math.random()-.5)*.22
    }));
  }

  function draw(){
    ctx.clearRect(0,0,w,h);

    for(let i=0;i<pts.length;i++){
      const p=pts[i];

      if(!reduce){
        p.x+=p.vx;
        p.y+=p.vy;

        if(p.x<0||p.x>w)p.vx*=-1;
        if(p.y<0||p.y>h)p.vy*=-1;
      }

      for(let j=i+1;j<pts.length;j++){
        const q=pts[j];
        const dx=p.x-q.x;
        const dy=p.y-q.y;
        const d=Math.hypot(dx,dy);

        if(d<135){
          ctx.strokeStyle=`rgba(34,211,238,${.19*(1-d/135)})`;
          ctx.lineWidth=1;
          ctx.beginPath();
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(q.x,q.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle='rgba(120,220,240,.65)';
      ctx.beginPath();
      ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
      ctx.fill();
    }

    if(!reduce&&!document.hidden)raf=requestAnimationFrame(draw);
  }

  function start(){
    cancelAnimationFrame(raf);
    draw();
  }

  size();
  start();

  window.addEventListener('resize',()=>{
    size();
    start();
  },{passive:true});

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)cancelAnimationFrame(raf);
    else start();
  });
})();

document.addEventListener('pointermove',e=>{
  const target=e.target.closest('.topic');
  if(!target)return;

  const r=target.getBoundingClientRect();
  target.style.setProperty('--x',`${e.clientX-r.left}px`);
  target.style.setProperty('--y',`${e.clientY-r.top}px`);
},{passive:true});

route();

})();

// Billig Studentmat – interaktivitet
// All text på svenska. Inga externa bibliotek.

const RECIPES = [
  {
    id: "svamp-pasta",
    name: "Krämig vitlökspasta med svamp",
    image: "img/pasta.jpg",
    imageAlt: "Krämig pasta med svamp på tallrik",
    timeMinutes: 15,
    costPerPortionSEK: 18,
    baseServings: 2,
    tags: ["vegetarisk", "snabbt"],
    glutenFreePossible: true,
    ingredients: [
      { name: "spaghetti (eller glutenfri pasta)", amount: 200, unit: "g" },
      { name: "champinjoner, skivade", amount: 200, unit: "g" },
      { name: "vitlök, finhackad", amount: 2, unit: "klyftor" },
      { name: "grädde eller havregrädde", amount: 2, unit: "dl" },
      { name: "riven ost (valfritt)", amount: 0.5, unit: "dl" },
      { name: "olja eller smör", amount: 1, unit: "msk" },
      { name: "salt & peppar", amount: null, unit: "" }
    ],
    steps: [
      "Koka pastan enligt anvisningarna.",
      "Fräs svamp i olja/smör på hög värme tills den fått färg.",
      "Sänk värmen, tillsätt vitlök kort och häll i grädde. Låt småkoka 2–3 min.",
      "Blanda med pastan. Smaka av med salt, peppar och ev. riven ost."
    ]
  },
  {
    id: "kikarts-curry",
    name: "Kikärtscurry med kokosmjölk",
    image: "img/kikartscurry.jpg",
    imageAlt: "Skål med kikärtscurry och ris",
    timeMinutes: 20,
    costPerPortionSEK: 16,
    baseServings: 2,
    tags: ["vegansk", "glutenfritt", "snabbt"],
    glutenFreePossible: true,
    ingredients: [
      { name: "kokta kikärtor (1 burk), sköljda", amount: 380, unit: "g" },
      { name: "lök, hackad", amount: 1, unit: "st" },
      { name: "vitlök, finhackad", amount: 2, unit: "klyftor" },
      { name: "krossade tomater", amount: 2, unit: "dl" },
      { name: "kokosmjölk", amount: 2, unit: "dl" },
      { name: "curry eller garam masala", amount: 2, unit: "tsk" },
      { name: "olja", amount: 1, unit: "msk" },
      { name: "salt & peppar", amount: null, unit: "" },
      { name: "ris till servering", amount: null, unit: "" }
    ],
    steps: [
      "Fräs lök i olja tills mjuk. Tillsätt vitlök och kryddor 30 sek.",
      "Häll i tomater och kokosmjölk. Låt sjuda 5 min.",
      "Vänd ner kikärtorna och sjud 5 min till. Smaka av.",
      "Servera med ris."
    ]
  },
  {
    id: "aggstekt-ris",
    name: "Äggstekt ris med grönsaker",
    image: "img/stektris.jpg",
    imageAlt: "Stor skål med äggstekt ris och grönsaker",
    timeMinutes: 20,
    costPerPortionSEK: 14,
    baseServings: 2,
    tags: ["vegetarisk", "snabbt"],
    glutenFreePossible: true,
    ingredients: [
      { name: "kokt kallt ris", amount: 3, unit: "dl" },
      { name: "ägg", amount: 2, unit: "st" },
      { name: "frysta ärtor/majs/morötter", amount: 2, unit: "dl" },
      { name: "lök eller salladslök", amount: 0.5, unit: "st" },
      { name: "soja (glutenfri vid behov)", amount: 1, unit: "msk" },
      { name: "olja", amount: 1, unit: "msk" },
      { name: "salt & peppar", amount: null, unit: "" }
    ],
    steps: [
      "Hetta upp olja i stekpanna/wok.",
      "Stek grönsaker och lök någon minut.",
      "Tillsätt ris och stek tills varmt och lite knaprigt.",
      "Skjut riset åt sidan, häll i uppvispade ägg och rör runt. Blanda allt, smaka av med soja, salt och peppar."
    ]
  },
  {
    id: "chili-sin-carne",
    name: "Chili sin carne",
    image: "img/chili.jpg",
    imageAlt: "Skål med chili sin carne",
    timeMinutes: 30,
    costPerPortionSEK: 17,
    baseServings: 4,
    tags: ["vegansk", "glutenfritt"],
    glutenFreePossible: true,
    ingredients: [
      { name: "lök, hackad", amount: 1, unit: "st" },
      { name: "vitlök, finhackad", amount: 2, unit: "klyftor" },
      { name: "paprika, tärnad", amount: 1, unit: "st" },
      { name: "morot, tärnad", amount: 1, unit: "st" },
      { name: "krossade tomater", amount: 400, unit: "g" },
      { name: "svarta bönor (1 burk), sköljda", amount: 230, unit: "g" },
      { name: "kidneybönor (1 burk), sköljda", amount: 230, unit: "g" },
      { name: "majs (1 liten burk)", amount: 150, unit: "g" },
      { name: "chilipulver/spiskummin/paprika", amount: 2, unit: "tsk" },
      { name: "olja", amount: 1, unit: "msk" },
      { name: "salt & peppar", amount: null, unit: "" }
    ],
    steps: [
      "Fräs lök, vitlök, morot och paprika i olja i 4–5 minuter.",
      "Tillsätt kryddor, rör runt 30 sek.",
      "Häll i tomater och bönor/majs. Låt sjuda 15–20 min.",
      "Smaka av och servera med ris, bröd eller tortillachips."
    ]
  }
];

// --- DOM helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// --- Rendering list (bilder + titel)
function renderList(recipes){
  const container = $('#results');
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = '';
  if(!recipes.length){
    container.innerHTML = '<div class="empty">Inga träffar. Justera sök eller filter.</div>';
    container.setAttribute('aria-busy', 'false');
    return;
  }

  for(const r of recipes){
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <button class="thumb" data-open="${r.id}" aria-label="Öppna recept: ${r.name}">
        <img src="${r.image}" alt="${r.imageAlt || r.name}">
        <h3 class="title">${r.name}</h3>
      </button>
    `;
    // (valfritt) meta-taggar under bilden – kommentera bort om du vill ha superrent grid
    // const meta = document.createElement('div');
    // meta.className = 'meta';
    // meta.innerHTML = \`
    //   <span class="badge">⏱️ ${r.timeMinutes} min</span>
    //   <span class="badge">💸 ca ${r.costPerPortionSEK} kr/portion</span>
    // \`;
    // card.appendChild(meta);
    container.appendChild(card);
  }

  // klick -> öppna recept
  $$('.thumb', container).forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const recipe = RECIPES.find(x=>x.id===btn.dataset.open);
      openRecipe(recipe);
    });
  });

  container.setAttribute('aria-busy', 'false');
}

function renderTags(recipe){
  const tags = [...recipe.tags];
  if(recipe.glutenFreePossible && !tags.includes('glutenfritt')){
    tags.push('glutenfritt');
  }
  return tags.map(t => `<span class="tag">#${t}</span>`);
}

// --- Search & filters
function getActiveFilters(){
  const text = $('#search').value.trim().toLowerCase();
  const checked = $$('.filters input:checked').map(i => i.value);
  return { text, checked };
}

function applyFilters(){
  const {text, checked} = getActiveFilters();

  let rec = RECIPES.filter(r=>{
    const hay = (r.name + ' ' + r.ingredients.map(i=>i.name).join(' ') + ' ' + r.tags.join(' ') + (r.glutenFreePossible ? ' glutenfritt ' : '')).toLowerCase();
    const textMatch = !text || hay.includes(text);
    const tagMatch = !checked.length || checked.every(t => (t==='snabbt' ? r.timeMinutes < 20 : (t==='glutenfritt' ? r.glutenFreePossible : r.tags.includes(t))));
    return textMatch && tagMatch;
  });

  renderList(rec);
}

// --- Recipe modal (oförändrat)
let currentRecipe = null;
let currentServings = 0;

function openRecipe(recipe){
  currentRecipe = recipe;
  currentServings = recipe.baseServings;

  $('#modalTitle').textContent = recipe.name;
  $('#modalTime').textContent = `⏱️ ${recipe.timeMinutes} min`;
  $('#modalCost').textContent = `💸 ca ${recipe.costPerPortionSEK} kr/portion`;

  const tagsBox = $('#modalTags');
  tagsBox.innerHTML = renderTags(recipe).join('');

  $('#servingsInput').value = currentServings;

  renderIngredients();
  renderSteps();

  const dlg = $('#recipeModal');
  if(typeof dlg.showModal === 'function'){ dlg.showModal(); }
  else { dlg.setAttribute('open',''); } // fallback
}

function closeRecipe(){
  const dlg = $('#recipeModal');
  if(dlg.open) dlg.close();
}

function renderIngredients(){
  const list = $('#modalIngredients');
  list.innerHTML = '';
  const factor = currentServings / currentRecipe.baseServings;

  for(const ing of currentRecipe.ingredients){
    let txt = ing.name;
    if(ing.amount){
      const amount = roundNice(ing.amount * factor);
      txt = `${amount} ${ing.unit} ${ing.name}`.trim();
    }
    const li = document.createElement('li');
    li.textContent = txt;
    list.appendChild(li);
  }
}

function renderSteps(){
  const list = $('#modalSteps');
  list.innerHTML = '';
  for(const step of currentRecipe.steps){
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  }
}

function roundNice(num){
  const rounded = Math.round(num * 10) / 10;
  return (Math.abs(rounded - Math.round(rounded)) < 1e-9) ? Math.round(rounded) : rounded;
}

// --- Shopping list
const shopping = new Map();

function addCurrentToShopping(){
  const factor = currentServings / currentRecipe.baseServings;
  for(const ing of currentRecipe.ingredients){
    const key = (ing.name + '|' + (ing.unit||'')).toLowerCase();
    if(ing.amount){
      const prev = shopping.get(key) || 0;
      shopping.set(key, prev + ing.amount * factor);
    }else{
      if(!shopping.has(key)) shopping.set(key, null);
    }
  }
  openListDialog();
  renderShoppingList();
}

function renderShoppingList(){
  const ul = $('#shoppingList');
  ul.innerHTML = '';
  for(const [key, amt] of shopping.entries()){
    const [name, unit] = key.split('|');
    const li = document.createElement('li');
    li.textContent = amt ? `${roundNice(amt)} ${unit} ${name}`.trim() : name;
    ul.appendChild(li);
  }
}

function openListDialog(){
  const dlg = $('#listDialog');
  if(typeof dlg.showModal === 'function'){ dlg.showModal(); }
  else { dlg.setAttribute('open',''); }
}

function listToText(){
  let lines = [];
  for(const [key, amt] of shopping.entries()){
    const [name, unit] = key.split('|');
    lines.push(amt ? `${roundNice(amt)} ${unit} ${name}`.trim() : name);
  }
  return lines.join('\n');
}

// --- Events
document.addEventListener('DOMContentLoaded', ()=>{
  renderList(RECIPES);

  $('#search').addEventListener('input', applyFilters);
  $$('.filters input').forEach(i => i.addEventListener('change', applyFilters));

  // modal close
  $('.close-btn').addEventListener('click', ()=>{ 
    closeRecipe(); 
    const listDlg = $('#listDialog'); if(listDlg.open) listDlg.close();
  });

  // servings
  $('#servingsMinus').addEventListener('click', ()=>{
    const inp = $('#servingsInput');
    const val = Math.max(1, parseInt(inp.value || '1', 10) - 1);
    inp.value = val; currentServings = val; renderIngredients();
  });
  $('#servingsPlus').addEventListener('click', ()=>{
    const inp = $('#servingsInput');
    const val = Math.max(1, parseInt(inp.value || '1', 10) + 1);
    inp.value = val; currentServings = val; renderIngredients();
  });
  $('#servingsInput').addEventListener('change', (e)=>{
    let val = parseInt(e.target.value || '1', 10);
    if(isNaN(val) || val < 1) val = 1;
    currentServings = val;
    e.target.value = val;
    renderIngredients();
  });

  $('#addToListBtn').addEventListener('click', addCurrentToShopping);

  // shopping list actions
  $('#copyListBtn').addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(listToText());
      alert('Inköpslistan kopierades!');
    }catch(e){
      alert('Kunde inte kopiera. Markera texten och kopiera manuellt.');
    }
  });

  $('#downloadListBtn').addEventListener('click', ()=>{
    const blob = new Blob([listToText()], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inkopslista.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  $('#clearListBtn').addEventListener('click', ()=>{
    if(confirm('Vill du tömma inköpslistan?')){
      shopping.clear();
      renderShoppingList();
    }
  });
});

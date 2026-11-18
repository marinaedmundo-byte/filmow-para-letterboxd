(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const base = location.origin + location.pathname;
  const link = [...document.querySelectorAll('a[href]')]
    .map(a => a.getAttribute('href'))
    .find(h => /[?&](pagina|page|p)=\d+/.test(h || ''));
  const param = link ? link.match(/[?&](pagina|page|p)=\d+/)[1] : 'pagina';
  const films = new Map();
 
  const parse = doc => {
    let added = 0;
    doc.querySelectorAll('li.movie_list_item').forEach(li => {
      const id = li.getAttribute('data-movie-pk');
      if (!id || films.has(id)) return;
      const pt = (li.querySelector('.title')?.textContent || '').trim();
      const alt = (li.querySelector('a.cover img[alt]')?.getAttribute('alt') || '').trim();
      const m = alt.match(/^(.*)\s\(([^()]*)\)$/);
      const original = (m && m[2].trim()) ? m[2].trim() : pt;
      let nota = '';
      const sr = li.querySelector('.star-rating');
      if (sr) {
        const t = sr.getAttribute('data-original-title') || sr.getAttribute('title') || '';
        const n = t.match(/Nota:\s*([\d.,]+)/);
        if (n) nota = parseFloat(n[1].replace(',', '.'));
        else {
          const w = (sr.querySelector('.average')?.getAttribute('style') || '').match(/width:\s*([\d.]+)%/);
          if (w) nota = parseFloat(w[1]) / 20;
        }
        if (nota !== '') { nota = Math.round(nota * 2) / 2; if (nota === 0) nota = ''; }
      }
      films.set(id, { original, pt, nota });
      added++;
    });
    return added;
  };
 
  parse(document);
  console.log('Página 1: ' + films.size + ' filmes');
 
  for (let p = 2; p <= 120; p++) {
    await sleep(800);
    const resp = await fetch(base + '?' + param + '=' + p, { credentials: 'same-origin' });
    if (!resp.ok) { console.warn('Parei na página ' + p + ' (erro ' + resp.status + ')'); break; }
    const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
    if (parse(doc) === 0) break;
    console.log('Página ' + p + ': ' + films.size + ' filmes');
  }
 
  const esc = s => {
    s = String(s).replace(/"/g, '\\"');
    return /[",\n]/.test(s) ? '"' + s + '"' : s;
  };
  const csv = 'Title,Rating,TituloFilmow\n' +
    [...films.values()].map(f => [esc(f.original), f.nota, esc(f.pt)].join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = 'filmow-ja-vi.csv';
  a.click();

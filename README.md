# Filmow → Letterboxd (direto no navegador)
 
Script em JavaScript que lê a sua lista de filmes "Já vi" no Filmow e gera um arquivo CSV no formato do importador do Letterboxd. Roda no console do navegador, sem instalar nada.
 
## O que ele faz
- Percorre as páginas da sua lista no Filmow
- Extrai título original e a sua nota (0,5 a 5)
- Baixa um arquivo filmow-ja-vi.csv
 
## Como usar
1. Deixe o seu perfil do Filmow público e esteja logado.
2. Abra https://filmow.com/usuario/SEU_USUARIO/filmes/ja-vi/
3. Aperte F12 e abra a aba Console.
4. Copie todo o conteúdo de filmow-ja-vi.js, cole no console e aperte Enter.
   - Se o Chrome bloquear a colagem, digite "allow pasting", aperte Enter e cole de novo.
5. Aguarde. Ao terminar, o filmow-ja-vi.csv é baixado.
6. Em https://letterboxd.com/import/ envie o arquivo, revise o resumo e confirme.
 
## Limitações
- Não exporta ano, comentários, listas nem data de visualização.
- Sem o ano, filmes com o mesmo título podem ser associados ao filme errado. Revise o resumo do Letterboxd.
- Depende da estrutura atual do HTML do Filmow e pode parar de funcionar se o site mudar.
- Em um teste, foram lidos 877 de 1289 filmes (causa em investigação).
 
## Aviso
Use apenas no seu próprio perfil. O script faz uma pausa entre as páginas para não sobrecarregar o servidor. Projeto sem vínculo com o Filmow nem com o Letterboxd.
 
## Créditos
Script desenvolvido com auxílio do Claude (Anthropic).
## Licença
MIT

# Vídeos das trilhas (Remotion)

Projeto isolado que gera os vídeos explicativos de cada aula do módulo ABM.
Ele é uma ferramenta de build, **não** faz parte do deploy do Next: os MP4s
finais ficam em `../public/videos/abm/` e são servidos como estáticos.

## Conteúdo

- `src/lessons.ts` — dados de cada vídeo (título, subtítulo, bullets, capa, cor).
  Editar aqui muda o conteúdo dos vídeos.
- `src/LessonVideo.tsx` — a composição (layout e animação).
- `src/Root.tsx` — registra uma composição por aula (`lesson-<slug>`).
- Assets (fontes e capas) vêm de `../public` via `Config.setPublicDir("../public")`.

## Instalar

```bash
cd remotion
npm install
```

## Renderizar

Estúdio interativo (preview):

```bash
npm run studio
```

Render de um vídeo. Neste ambiente use o `chrome-headless-shell` já instalado
(o Chrome completo removeu o modo headless antigo que o Remotion usa):

```bash
SHELL_BIN=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
npx remotion render src/index.ts lesson-modelo ../public/videos/abm/modelo.mp4 \
  --browser-executable="$SHELL_BIN"
```

Renderizar todas as aulas:

```bash
SHELL_BIN=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
for slug in tese modelo simulador esteiras jornada orquestracao hubspot medicao piloto glossario; do
  npx remotion render src/index.ts "lesson-$slug" "../public/videos/abm/$slug.mp4" \
    --browser-executable="$SHELL_BIN"
done
```

Em máquina local comum (sem esse caminho), rode sem `--browser-executable` que
o Remotion baixa o browser certo sozinho.

## Trocar por vídeos gravados depois

Quando houver gravações reais, é só substituir o MP4 correspondente em
`../public/videos/abm/<slug>.mp4`, ou apontar `videoUrl` da aula em
`../content/abm/sections.ts` para um embed (YouTube/Vimeo). O player da aula
detecta automaticamente arquivo local x embed.

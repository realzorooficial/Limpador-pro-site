# Real Zoro — v19 Performance Mobile

Versão derivada da v18 com foco em fluidez no celular, preservando o visual de desktop.

Principais mudanças:
- Passe semanal do Limpador Pro: R$ 7,90.
- Partículas desativadas em telas pequenas e dispositivos com ponteiro touch/coarse.
- Fundo mobile simplificado para composição estática, sem orbs/beam animados pesados.
- Backdrop blur removido no mobile em navegação, cards e visualizadores mais pesados.
- Animações de reveal/hover reduzidas ou removidas no mobile.
- `content-visibility: auto` em seções abaixo da primeira dobra no mobile.
- Vídeos da página Resultados com `preload="none"`.
- Thumbnails responsivos (`srcset`) para provas da página Resultados e imagens grandes de produto.
- Arquivos originais continuam disponíveis somente para visualização ampliada.

Estrutura principal:
- `/index.html`
- `/limpador-pro/index.html`
- `/zpack/index.html`
- `/resultados/index.html`
- `/assets/`

O site continua estático e compatível com GitHub Pages. Para publicar, substitua os arquivos mantendo a estrutura de pastas.

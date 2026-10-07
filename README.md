# Real Zoro — versão otimizada

Estrutura pronta para GitHub Pages e futura migração para DISCloud.

## Otimizações aplicadas
- Imagens de interface entregues em WebP redimensionado para o tamanho real de uso.
- PNG da marca mantido apenas para metadados sociais; favicon separado e leve.
- Lazy loading e `decoding=async` em imagens abaixo da primeira dobra.
- `fetchpriority=high` nas imagens principais de cada página.
- Dimensões explícitas nas imagens para reduzir mudanças de layout.
- CSS sem seletores antigos não utilizados e com serialização compacta.
- Animação de partículas limitada a aproximadamente 30 FPS e pausada totalmente em abas ocultas.
- JavaScript carregado com `defer`.

As três páginas continuam em `/`, `/limpador-pro/` e `/zpack/`.

# Real Zoro — Production v6

Versão multipágina refinada para GitHub Pages e preparada para futura migração à DISCloud.

## Estrutura
- `/` — Home Real Zoro
- `/limpador-pro/` — Limpador Pro
- `/zpack/` — ZPack
- `/assets/` — imagens, CSS e JavaScript compartilhados

## Melhorias visuais da v6
- Design system unificado para navegação, botões, cards, seções, foco e movimento.
- Identidade neutra e premium na Home Real Zoro.
- Accent próprio por projeto: tons frios no Limpador Pro e verde no ZPack.
- Hero da Home com hierarquia tipográfica maior e composição mais editorial.
- Cards de projetos com mídia neutra, melhor espaçamento, badges alinhadas e hover mais consistente.
- Seção de confiança refinada e mais orientada ao cliente.
- Heros do Limpador Pro e ZPack padronizados com profundidade e identidade própria.
- Planos ZPack, Founder, Termos e FAQ receberam refinamento de hierarquia, bordas, espaçamento e estados de interação.
- Ajustes específicos para desktop, tablet e celular.

## Performance e qualidade
- Mantidas as imagens WebP otimizadas da v5.
- Partículas limitadas a ~30 FPS, pausadas em abas ocultas e reduzidas em dispositivos com pouca memória.
- Partículas desativadas quando o navegador sinaliza `Save-Data`.
- Spotlights/interações executados apenas em dispositivos com ponteiro preciso.
- Imagens abaixo da primeira dobra continuam com lazy loading e `decoding=async`.
- JavaScript continua carregado com `defer`.
- Dimensões explícitas das imagens preservadas para reduzir CLS.
- Suporte completo a `prefers-reduced-motion`.
- Adicionado link “Pular para o conteúdo” e estado `aria-current` na navegação ativa.
- Foco por teclado padronizado em toda a interface.

## Observação
A v6 mantém os textos, preços, planos e regras comerciais da v5. O trabalho desta versão é principalmente visual, de consistência, acessibilidade e refinamento de desempenho.

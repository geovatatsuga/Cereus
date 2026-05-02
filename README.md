# Cereus CRM

Cereus CRM e um prototipo front-end de um SaaS de gestao comercial, relacionamento com clientes, campanhas, automacoes, operacao e inteligencia de negocio.

O foco do projeto e simular um CRM completo para negocios com vendas recorrentes, delivery, canais digitais e base de clientes ativa. A aplicacao nao e apenas um painel visual: as telas foram organizadas para responder perguntas reais de gestao, como:

- Onde esta o dinheiro parado?
- Quais clientes devem ser acionados hoje?
- Qual campanha tem maior ROI previsto?
- Qual etapa da operacao esta travando?
- Quais automacoes estao gerando receita ou falhando?
- Que decisoes a IA recomenda e com base em quais dados?

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Recharts
- Lucide React

## Como executar

```bash
npm install
npm run dev
```

O servidor de desenvolvimento sobe em:

```text
http://localhost:3000
```

Para validar tipagem e build:

```bash
npm run lint
npm run build
```

## Estrutura

```text
src/
  App.tsx
  main.tsx
  index.css

  data/
    mockData.ts

  components/
    layout/
      AppLayout.tsx
      Header.tsx
      NavItem.tsx
      Sidebar.tsx
    ui/
      AutomationCard.tsx
      FadeView.tsx
      KpiCard.tsx

  views/
    HojeView.tsx
    DashboardView.tsx
    AudienciaView.tsx
    AtendimentoView.tsx
    CampaignsView.tsx
    AutomacoesView.tsx
    OperacaoView.tsx
    AnalyticsView.tsx
    IAView.tsx
    InteligenciaView.tsx
    SettingsView.tsx
```

## Modelo de dados

O arquivo `src/data/mockData.ts` centraliza a base mockada do produto:

- clientes, segmentos, tags, score e risco de churn
- funil de conversao
- receita, despesas e lucro
- campanhas, ROI previsto e orcamento
- automacoes, conversao, falhas e receita atribuida
- pedidos em operacao, responsaveis, status e tempo por etapa

Essa camada evita numeros soltos em cada tela. As abas contam a mesma historia de negocio usando uma base compartilhada.

## Abas do produto

### Hoje

Tela inicial para o dono do restaurante. Resume o que precisa de atencao agora:

- vendas do mes
- atrasos em rota
- pendencias de atendimento
- campanha indicada
- clientes em risco
- preparo do pico do jantar
- checklist operacional do dia

O objetivo e reduzir complexidade: antes de olhar graficos, o dono entende o que fazer primeiro.

### Dashboard

Visao executiva com receita, lucro bruto, CAC, LTV/CAC, chamados abertos, clientes em churn critico, caixa projetado e campanhas com impacto previsto.

Tambem inclui uma recomendacao tatica: recuperar clientes de alto risco com estimativa de receita recuperavel.

### Clientes

CRM 360 com:

- filtros por segmento
- busca por nome, e-mail ou tag
- score de engajamento
- risco de churn
- LTV
- perfil lateral do cliente
- tags dinamicas
- linha do tempo de interacoes
- acoes de mensagem e segmentacao

### Atendimento

Inbox para conversas e pendencias de relacionamento. Conecta suporte, reclamacoes, oportunidades e CRM 360.

- fila priorizada de conversas
- cliente, canal, status e contexto
- alertas para nao acionar campanha quando existe ticket aberto
- resposta rapida
- resumo para salvar no perfil do cliente

Essa aba evita que a IA ou as campanhas aumentem vendas em cima de uma operacao com cliente insatisfeito.

### Campanhas

Acoes pontuais e agendadas para vender agora. Fecha o fluxo entre analise e acao:

- publico-alvo
- canal
- custo estimado
- receita prevista
- ROI
- revisao de mensagem
- checklist de seguranca antes do envio
- envio de teste e aprovacao

Campanhas sao diferentes de automacoes: uma campanha e uma acao manual ou sazonal, criada para um momento especifico.

### Automacoes

Regras continuas que rodam sozinhas. Hub de jornadas recorrentes com:

- automacoes ativas
- receita atribuida
- falhas nas ultimas 24h
- editor logico simples
- condicoes if/else
- aprovacao humana
- dry run antes de publicar
- logs de auditoria
- templates inteligentes

Automacoes sao diferentes de campanhas: uma automacao e uma regra permanente que reage a comportamento do cliente ou evento operacional.

### Operacao

Kanban operacional em tempo real para pedidos:

- novos
- preparando
- em rota
- busca por pedido ou cliente
- responsavel interno por pedido
- tempo por etapa
- atraso e alerta visual
- gargalo operacional calculado
- entregador em rota

### Metricas

BI com leitura financeira e comercial:

- evolucao de receita, despesa e lucro
- funil de conversao
- ROI por canal
- cohorts de retencao
- leitura executiva sobre margem, canal mais rentavel e risco operacional

### Cereus

Chatbot LLM do produto. E a parte conversacional da IA, feita para o dono do restaurante perguntar em linguagem natural e receber uma resposta pratica.

- recomendacao de next best action
- fontes usadas pela IA
- criacao assistida de campanhas
- explicacao de decisoes
- bloqueio de disparos sensiveis quando ha ticket aberto

### Inteligencia

Ferramentas de inteligencia e laboratorio de modelos. Essa area nao e chat: ela mostra previsoes, modelos em andamento, metricas e auditoria.

O objetivo dessa aba e ser uma vitrine simples de modelos para leigos. Cada card explica:

- a pergunta que o modelo responde
- o status do modelo
- a metrica principal
- o impacto esperado no restaurante
- a pagina propria daquele modelo

Os cards nao possuem botoes de acao internos. O card inteiro funciona como entrada para a pagina do modelo correspondente.

Modelos disponiveis:

- **Previsao de vendas diaria**: estima quanto o restaurante deve vender por dia e horario para orientar equipe, estoque, compras e campanhas.
- **Previsao de demanda por produto**: aponta quais produtos podem faltar ou vender mais em cada turno.
- **Churn de clientes**: identifica clientes com maior risco de nao voltar e ajuda a priorizar campanhas de resgate.
- **RFM e segmentacao**: agrupa clientes por recencia, frequencia e valor gasto para escolher ofertas melhores.

Paginas internas da area de Inteligencia:

- **Modelos**: vitrine com cards clicaveis dos modelos.
- **Vendas**: pagina do modelo de previsao de vendas diaria.
- **Demanda**: pagina do modelo de previsao de demanda por produto.
- **Churn**: pagina do modelo de risco de evasao.
- **RFM**: pagina de segmentacao por comportamento.
- **Auditoria**: historico de eventos, atualizacoes e bloqueios dos modelos.

Cada pagina de modelo tambem mostra ciclo de vida operacional:

- status atual
- ultima atualizacao
- quando nao confiar no modelo
- impacto esperado ou medido

## Valor por modulo

- **Hoje**: reduz ruido e mostra a prioridade do dia.
- **Dashboard**: mostra saude financeira e risco comercial.
- **Clientes**: aumenta recompra e identifica quem merece atencao.
- **Atendimento**: protege experiencia do cliente antes de escalar vendas.
- **Campanhas**: gera receita pontual com publico, custo e ROI claros.
- **Automacoes**: economiza tempo com regras recorrentes e auditaveis.
- **Operacao**: reduz atraso, gargalo e erro de preparo.
- **Metricas**: apoia decisoes com funil, ROI e cohort.
- **Cereus**: transforma perguntas em respostas e proximos passos.
- **Inteligencia**: antecipa vendas, demanda, churn e segmentos.

## MVP e futuro

### MVP essencial

- tela Hoje como cockpit operacional
- Clientes com perfil 360 e risco de churn
- Atendimento conectado ao contexto do cliente
- Campanhas com revisao antes do envio
- Automacoes com dry run e logs
- Operacao com atrasos e responsaveis
- Inteligencia com previsao de vendas, demanda, churn e RFM

### Diferenciais

- Cereus como chatbot LLM explicavel
- Laboratorio de IA para leigos
- campanhas bloqueadas quando existe risco operacional ou ticket aberto
- modelos com ciclo de vida e quando nao confiar

### Futuro

- inbox omnichannel completo
- mais modelos preditivos por loja, produto e horario
- testes A/B de campanhas
- playbooks de atendimento
- simulador de impacto antes de disparar campanha

### Configuracoes

Central administrativa com:

- perfil da conta
- hub de integracoes
- WhatsApp API
- iFood
- Tiny ERP
- Mercado Pago
- cargos e permissoes
- LGPD e consentimento
- log de auditoria

## Componentes principais

### `KpiCard`

Card reutilizavel para metricas com:

- icone
- valor principal
- variacao
- estado positivo/negativo
- modo destacado
- mini grafico em linha

### `AutomationCard`

Card para fluxos automatizados com:

- gatilho
- acao
- status
- disparos
- conversao
- receita atribuida

### `FadeView`

Wrapper de transicao entre abas usando Motion.

### `Sidebar` e `Header`

Navegacao principal, busca global visual, indicador de saude do CRM e notificacoes criticas.

## Design

O produto usa uma interface corporativa clara, com foco em leitura rapida e tomada de decisao. A UI evita cara de landing page e prioriza telas densas, operacionais e uteis para uso recorrente.

Diretrizes usadas:

- cards compactos para metricas e itens repetidos
- tabelas e paineis para comparacao
- icones Lucide em acoes e navegacao
- graficos Recharts para BI
- layout responsivo com grids
- estados visuais para risco, sucesso, alerta e pausa

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Validacao realizada

Na ultima atualizacao:

- `npm install` executado
- `npm run lint` passou
- `npm run build` passou
- app verificado em navegador local
- paginas carregaram sem overlay de erro
- console sem erros capturados
- abas principais renderizando corretamente

## Documentacao complementar

O arquivo `PRODUCT_ANALYSIS.md` contem a analise de produto original, com lacunas, prioridades de MVP e comparacao com CRMs reais.

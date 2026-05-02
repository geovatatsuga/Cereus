# Cereus CRM

Cereus CRM e um prototipo front-end de CRM para restaurantes, delivery e negocios com venda recorrente.

O foco do produto e ajudar o dono do restaurante a abrir o sistema e entender rapidamente:

- o que esta acontecendo hoje
- quais pedidos ou atendimentos precisam de cuidado
- quais clientes merecem atencao
- como vender mais sem pressionar a operacao
- quando usar IA, previsao e automacao

A interface prioriza pouco texto, cards objetivos, listas escaneaveis e decisoes praticas.

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
    OperacaoView.tsx
    AtendimentoView.tsx
    AudienciaView.tsx
    CampaignsView.tsx
    AnalyticsView.tsx
    IAView.tsx
    InteligenciaView.tsx
    SettingsView.tsx
```

## Navegacao atual

O menu principal foi organizado por fluxo real de trabalho:

- **Hoje**: cockpit diario.
- **Pedidos**: operacao em tempo real.
- **Atendimento**: fila de conversas e tickets.
- **Clientes**: lista de clientes, segmentos, risco e LTV.
- **Crescimento**: campanhas e automacoes em uma unica area.
- **Resultados**: financeiro, funil, ROI e retencao.
- **Cereus**: chatbot LLM.
- **Lab de IA**: modelos preditivos e auditoria.
- **Configuracoes**: conta, integracoes, permissoes e LGPD.

## Abas

### Hoje

Tela inicial do dono do restaurante.

Mostra apenas o essencial:

- receita de hoje
- pedidos de hoje
- ticket medio
- atrasos
- proximo passo
- crescimento recomendado
- atalhos para Pedidos, Atendimento, Crescimento e Cereus

### Pedidos

Kanban operacional para acompanhar o fluxo do restaurante:

- novos
- preparando
- em rota
- tempo por pedido
- responsavel interno
- atrasos
- gargalo da operacao

Essa tela deve ser direta e visual, porque e usada durante o servico.

### Atendimento

Inbox priorizada para conversas e pendencias.

O objetivo e proteger a experiencia do cliente antes de aumentar vendas:

- urgente
- resgate
- venda
- pos-venda
- bloqueio de campanha quando existe ticket aberto
- resposta rapida

### Clientes

Lista central do CRM.

A tela foi simplificada para evitar painel lateral fixo e excesso de acao imediata. O foco e filtrar e encontrar clientes rapidamente.

Filtros atuais:

- Todos
- VIP
- Em Risco
- Sumidos
- Alto valor
- Reclamaram

Dados principais:

- segmento
- canal
- score
- risco
- LTV
- ultima compra

### Crescimento

Area unica para vender mais, recuperar clientes e automatizar recorrencia.

Campanhas e automacoes ficam juntas porque, para o dono do restaurante, a pergunta principal nao e "qual ferramenta usar?", e sim "qual objetivo quero atingir?".

Objetivos atuais:

- vender hoje
- recuperar clientes
- aumentar ticket
- automatizar retorno

Dentro da area existem duas divisoes:

- **Campanhas**: disparo pontual, com janela, publico, custo, receita prevista e ROI.
- **Automacoes**: fluxo recorrente por gatilho, com pausa por risco, execucoes, conversao e receita.

### Resultados

Area de analise, sem urgencia operacional.

Inclui:

- financeiro
- funil e canais
- retencao
- ROI por canal
- margem
- lucro
- conversao

### Cereus

Chatbot LLM do produto.

O Cereus responde perguntas em linguagem natural e transforma dados em passos curtos:

- resolver atraso
- recuperar clientes
- evitar campanha ampla
- mostrar fontes
- criar acao assistida

### Lab de IA

Area dos modelos preditivos.

Nao e chat. E o laboratorio visual de modelos que ajudam o restaurante a antecipar demanda, venda, churn e segmentacao.

Modelos atuais:

- **Previsao de vendas diaria**: estima venda por dia e horario.
- **Previsao de demanda por produto**: indica itens com risco de falta ou alta.
- **Churn de clientes**: aponta clientes com risco de nao voltar.
- **RFM e segmentacao**: agrupa clientes por recencia, frequencia e valor.

Cada modelo mostra status, metrica, confianca, impacto e auditoria.

### Configuracoes

Central administrativa:

- perfil
- integracoes
- WhatsApp API
- iFood
- Tiny ERP
- Mercado Pago
- cargos e permissoes
- LGPD
- log de auditoria

## Modelo de dados

O arquivo `src/data/mockData.ts` concentra os dados mockados:

- clientes
- segmentos
- tags
- score
- risco de churn
- funil de conversao
- receita, despesas e lucro
- campanhas
- automacoes
- pedidos
- totais do negocio

Essa camada evita numeros soltos nas telas e mantém a narrativa do produto consistente.

## Direcao de produto

Principios atuais:

- menos texto, mais leitura visual
- cards com numero, estado e acao curta
- CRM orientado a restaurante, nao a painel generico
- crescimento guiado por objetivo de negocio
- IA separada entre chat e laboratorio de modelos
- atendimento e operacao protegendo a experiencia antes de escalar vendas

## Componentes principais

### `KpiCard`

Card reutilizavel para metricas com icone, valor, variacao, estado e mini grafico.

### `AutomationCard`

Card para automacoes com gatilho, acao, status, execucoes, conversao e receita.

### `FadeView`

Wrapper de transicao entre abas usando Motion.

### `Sidebar` e `Header`

Navegacao principal, busca global, indicador de saude do CRM e notificacoes criticas.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Validacao

Na ultima atualizacao:

- `npm run lint` passou
- `npm run build` passou
- fluxo principal verificado em navegador local
- abas principais carregaram sem erro de console

## Observacao

Este projeto ainda e um prototipo front-end. O backend, persistencia real, autenticacao, permissoes reais, integracoes e execucao de automacoes ainda nao sao o foco desta etapa.

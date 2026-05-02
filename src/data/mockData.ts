export type ClientSegment = 'VIP' | 'Recorrente' | 'Novo' | 'Em Risco';
export type ClientChannel = 'WhatsApp' | 'iFood' | 'Site' | 'Instagram';

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: ClientSegment;
  channel: ClientChannel;
  lastOrderDays: number;
  spent: number;
  orders: number;
  score: number;
  churnRisk: number;
  tags: string[];
  avatarSeed: string;
  timeline: string[];
};

export const clients: Client[] = [
  {
    id: 'C-1021',
    name: 'Ana Costa',
    email: 'ana.costa@exemplo.com',
    phone: '+55 83 99111-2201',
    segment: 'VIP',
    channel: 'WhatsApp',
    lastOrderDays: 0,
    spent: 3240,
    orders: 24,
    score: 94,
    churnRisk: 8,
    tags: ['alto-ltv', 'familia', 'combo-premium'],
    avatarSeed: 'Ana',
    timeline: ['Comprou Combo Família hoje', 'Abriu campanha VIP', 'Respondeu pesquisa NPS 10'],
  },
  {
    id: 'C-1038',
    name: 'Carlos Mendes',
    email: 'carlos@exemplo.com',
    phone: '+55 83 99222-1103',
    segment: 'Em Risco',
    channel: 'iFood',
    lastOrderDays: 22,
    spent: 850,
    orders: 4,
    score: 41,
    churnRisk: 72,
    tags: ['sumiu', 'cupom-sensivel'],
    avatarSeed: 'Carlos',
    timeline: ['Nao compra ha 22 dias', 'Ignorou SMS de reativacao', 'Ultimo pedido atrasou 11 min'],
  },
  {
    id: 'C-1077',
    name: 'Bruna Lima',
    email: 'bruna.l@exemplo.com',
    phone: '+55 83 99333-7788',
    segment: 'Recorrente',
    channel: 'Site',
    lastOrderDays: 1,
    spent: 1420,
    orders: 12,
    score: 78,
    churnRisk: 18,
    tags: ['almoco', 'salada'],
    avatarSeed: 'Bruna',
    timeline: ['Comprou ontem pelo site', 'Entrou em segmento Recorrente', 'Clicou em upsell de bebida'],
  },
  {
    id: 'C-1104',
    name: 'Marcos Silva',
    email: 'marcos.s@exemplo.com',
    phone: '+55 83 99444-5544',
    segment: 'Novo',
    channel: 'Instagram',
    lastOrderDays: 2,
    spent: 145,
    orders: 1,
    score: 62,
    churnRisk: 24,
    tags: ['primeira-compra', 'instagram'],
    avatarSeed: 'Marcos',
    timeline: ['Primeiro pedido ha 2 dias', 'Veio de anuncio Instagram', 'Nao recebeu boas-vindas ainda'],
  },
  {
    id: 'C-1168',
    name: 'Juliana Paes',
    email: 'ju.paes@exemplo.com',
    phone: '+55 83 99555-9012',
    segment: 'VIP',
    channel: 'WhatsApp',
    lastOrderDays: 3,
    spent: 4100,
    orders: 31,
    score: 97,
    churnRisk: 5,
    tags: ['vip', 'eventos', 'catering'],
    avatarSeed: 'Juliana',
    timeline: ['Pediu orcamento para evento', 'Comprou 31 vezes', 'Indicou 3 clientes'],
  },
  {
    id: 'C-1199',
    name: 'Roberto Silva',
    email: 'roberto@exemplo.com',
    phone: '+55 83 99666-3344',
    segment: 'Em Risco',
    channel: 'WhatsApp',
    lastOrderDays: 41,
    spent: 1210,
    orders: 8,
    score: 36,
    churnRisk: 81,
    tags: ['critico', 'pedido-atrasado'],
    avatarSeed: 'Roberto',
    timeline: ['Reclamou de atraso', 'Nao abriu ultima campanha', 'LTV em risco R$ 1.210'],
  },
];

export const segmentData = [
  { name: 'VIPs', value: 450, percentage: '37,5%', trend: '+12%', color: '#0f766e' },
  { name: 'Recorrentes', value: 320, percentage: '26,6%', trend: '+5%', color: '#14b8a6' },
  { name: 'Novos', value: 280, percentage: '23,3%', trend: '+18%', color: '#38bdf8' },
  { name: 'Em Risco', value: 150, percentage: '12,5%', trend: '-4%', color: '#f43f5e' },
];

export const performanceData = [
  { name: '01/Mai', pedidos: 40, inativos: 24, receita: 1200, margem: 24 },
  { name: '02/Mai', pedidos: 45, inativos: 20, receita: 1350, margem: 25 },
  { name: '03/Mai', pedidos: 80, inativos: 18, receita: 2400, margem: 28 },
  { name: '04/Mai', pedidos: 57, inativos: 29, receita: 1710, margem: 22 },
  { name: '05/Mai', pedidos: 89, inativos: 18, receita: 2670, margem: 27 },
  { name: '06/Mai', pedidos: 95, inativos: 12, receita: 2850, margem: 29 },
  { name: '07/Mai', pedidos: 110, inativos: 15, receita: 3300, margem: 30 },
];

export const funnelData = [
  { step: 'Visitas', count: 12500, color: '#ccfbf1' },
  { step: 'Carrinho', count: 4200, color: '#99f6e4' },
  { step: 'Checkout', count: 2100, color: '#2dd4bf' },
  { step: 'Pedidos pagos', count: 840, color: '#0f766e' },
];

export const revenueData = [
  { name: 'Jan', receita: 40000, despesas: 24000, lucro: 16000 },
  { name: 'Fev', receita: 45000, despesas: 28000, lucro: 17000 },
  { name: 'Mar', receita: 38000, despesas: 29000, lucro: 9000 },
  { name: 'Abr', receita: 52000, despesas: 31000, lucro: 21000 },
  { name: 'Mai', receita: 61000, despesas: 34000, lucro: 27000 },
  { name: 'Jun', receita: 74000, despesas: 38000, lucro: 36000 },
];

export const automationStats = [
  {
    title: 'Boas-vindas VIP',
    trigger: 'Primeiro pedido > R$ 150',
    action: 'Menu secreto via WhatsApp',
    sent: 142,
    conversion: 18,
    revenue: 1840,
    failures: 2,
    status: 'Rodando',
  },
  {
    title: 'Ciclo de Reativacao',
    trigger: '30 dias sem compras',
    action: 'SMS com cupom 15%',
    sent: 890,
    conversion: 4.2,
    revenue: 3120,
    failures: 31,
    status: 'Rodando',
  },
  {
    title: 'Pesquisa NPS',
    trigger: 'Pedido entregue',
    action: 'E-mail de avaliacao',
    sent: 425,
    conversion: 32,
    revenue: 0,
    failures: 8,
    status: 'Pausa',
  },
];

export const campaigns = [
  { name: 'Resgate VIP 45 dias', audience: '125 clientes criticos', channel: 'WhatsApp', budget: 420, projectedRevenue: 6300, roi: 15, status: 'Pronta para revisar' },
  { name: 'Combo familia sexta', audience: '450 VIPs', channel: 'WhatsApp + SMS', budget: 680, projectedRevenue: 9800, roi: 14.4, status: 'Agendada' },
  { name: 'Primeira recompra', audience: '280 novos', channel: 'E-mail', budget: 190, projectedRevenue: 2100, roi: 11.1, status: 'Rascunho' },
];

export const operations = [
  { id: '1042', customer: 'Joao da Silva', items: '2x Combo Tradicional, 1x Coca 2L', time: 4, status: 'Novos', platform: 'Site', total: 84.5, owner: 'Rafa' },
  { id: '1043', customer: 'Maria Oliveira', items: '1x Salada Fit, 1x Suco Natural', time: 8, status: 'Novos', platform: 'iFood', total: 32, owner: 'Bia' },
  { id: '1038', customer: 'Carlos Mendes', items: '1x Pizza G, 2x Guarana', time: 25, status: 'Preparando', platform: 'Site', total: 95, owner: 'Dani', warning: true },
  { id: '1039', customer: 'Ana Lima', items: '1x Combo Vegano', time: 18, status: 'Preparando', platform: 'iFood', total: 45, owner: 'Rafa' },
  { id: '1031', customer: 'Roberto Silva', items: '4x X-Salada, Fritas M', time: 42, status: 'Em Rota', platform: 'Site', total: 110, owner: 'Bia', courier: 'Ze Entregas', late: true },
  { id: '1032', customer: 'Fernanda Souza', items: '1x X-Tudo', time: 35, status: 'Em Rota', platform: 'iFood', total: 30, owner: 'Dani', courier: 'Carlos Entregas' },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

export const totals = {
  revenue: 84520,
  grossProfit: 38640,
  netProfit: 18240,
  margin: 21.5,
  cac: 28,
  ltv: 1850,
  conversion: 6.72,
  openTickets: 14,
};

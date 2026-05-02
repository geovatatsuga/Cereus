import React from 'react';
import { KeyRound, Lock, MessageCircle, ShieldCheck, Store, Users, Webhook } from 'lucide-react';

export function SettingsView() {
  const roles = [
    { name: 'Super Admin', users: 2, access: 'Tudo, incluindo faturamento e exportacao' },
    { name: 'Vendedor', users: 5, access: 'Clientes, campanhas e inbox sem dados globais' },
    { name: 'Operacao', users: 8, access: 'Pedidos, entregas e chamados operacionais' },
  ];

  const integrations = [
    { name: 'WhatsApp API', status: 'Conectado', detail: '+55 83 99999-9999', icon: <MessageCircle size={17} />, color: 'bg-emerald-500' },
    { name: 'iFood', status: 'Conectado', detail: 'Loja Centro sincronizada', icon: <Store size={17} />, color: 'bg-rose-500' },
    { name: 'Tiny ERP', status: 'Pendente', detail: 'Produtos e notas fiscais', icon: <Webhook size={17} />, color: 'bg-slate-800' },
    { name: 'Mercado Pago', status: 'Pendente', detail: 'Pagamentos e chargebacks', icon: <KeyRound size={17} />, color: 'bg-sky-500' },
  ];

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-6xl mx-auto w-full space-y-8 relative z-0">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Configuracoes</h2>
        <p className="text-slate-500 font-medium">Conta, integracoes e seguranca.</p>
      </div>

      <section className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center gap-4 shrink-0">
          <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-24 h-24 rounded-full shadow-md" />
          <button className="text-teal-700 font-black text-xs bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-colors">Alterar foto</button>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-xs font-black text-slate-500 mb-1 uppercase">Nome</span>
              <input type="text" defaultValue="Maria Silva" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all" />
            </label>
            <label className="block">
              <span className="block text-xs font-black text-slate-500 mb-1 uppercase">E-mail</span>
              <input type="email" defaultValue="maria@exemplo.com.br" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all" />
            </label>
          </div>
          <button className="bg-slate-900 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-sm transition-all">Salvar alteracoes</button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <Webhook size={20} className="text-teal-600" />
            <h3 className="font-black text-xl text-slate-800">Hub de integracoes</h3>
          </div>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/60">
                <div className="flex items-center gap-4">
                  <div className={`${integration.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-700 text-sm">{integration.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{integration.detail}</p>
                  </div>
                </div>
                <button className={`font-black text-xs px-4 py-2 rounded-xl transition-colors ${
                  integration.status === 'Conectado' ? 'text-rose-600 bg-rose-50 hover:bg-rose-100' : 'text-teal-700 bg-teal-50 hover:bg-teal-100'
                }`}>
                  {integration.status === 'Conectado' ? 'Desconectar' : 'Conectar'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <Users size={20} className="text-teal-600" />
            <h3 className="font-black text-xl text-slate-800">Permissoes e cargos</h3>
          </div>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.name} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/60">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-slate-800">{role.name}</p>
                  <span className="bg-white border border-slate-100 px-2 py-1 rounded-lg text-xs font-black text-slate-500">{role.users} usuarios</span>
                </div>
                <p className="text-sm text-slate-500 font-medium mt-1">{role.access}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl">
          <ShieldCheck size={30} className="text-teal-300 mb-4" />
          <h3 className="font-black text-xl mb-2">LGPD</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">Exporte, anonimize ou exclua com trilha.</p>
          <button className="w-full bg-white text-slate-900 font-black py-3 rounded-xl">Abrir central LGPD</button>
        </div>
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <Lock size={20} className="text-teal-600" />
            <h3 className="font-black text-xl text-slate-800">Log de auditoria</h3>
          </div>
          <div className="space-y-3">
            {[
              ['18:35', 'Maria Silva alterou permissao do cargo Vendedor'],
              ['18:12', 'Token WhatsApp renovado automaticamente'],
              ['17:42', 'Exportacao CSV bloqueada para usuario sem permissao'],
            ].map(([time, action]) => (
              <div key={action} className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <p className="font-bold text-slate-700 text-sm">{action}</p>
                <span className="text-xs font-black text-slate-400">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const beneficiosPadrao = [
  'Sem taxa de instalação para a cidade',
  'Pagamento com 5 dias após instalação',
  'Não cobramos fidelidade'
];

window.siteConfig = {
  // Nome fantasia da empresa
  empresa: 'WPS TELECOM',
  // Razão social da empresa
  razaoSocial: 'WPS TELECOM',
  // CNPJ da empresa
  cnpj: '45.687.749/0001-97',
  // Domínio principal do site
  dominio: 'https://wpstelecom.com',
  // Descrição curta para SEO
  descricao: 'Internet de alta velocidade e qualidade para sua casa ou empresa. Conecte-se com a WPS TELECOM.',
  // Palavras-chave para SEO
  keywords: 'internet, fibra óptica, provedor, wps telecom, planos, conectividade',
  // Número do WhatsApp com código do país e DDD
  whatsapp: '5562984200587',
  // Telefone formatado para exibição
  phoneDisplay: '(62) 9 8420-0587',
  // E-mail de contato principal
  email: 'wpstelecomeinformatica@gmail.com',
  // Usuário do Instagram
  instagram: '',
  // Endereço da Loja (exibido no site)
  endereco: 'Rua Goiás n°60 - A Qd 42 lt 93 esquina com a transbrasiliana - centro',
  // Endereço registrado (Matriz - CNPJ)
  enderecoRegistrado: 'Rua Goiás n°60 - A Qd 42 lt 93 esquina com a transbrasiliana - centro',
  // Data de fundação
  fundacao: '17/03/2022',
  // Atividade principal
  atividadePrincipal: 'Provedores de acesso às redes de comunicações',
  // Hero Section
  hero: {
    title: 'CONECTE JA COM O MELHOR PLANO DE INTERNET DA CIDADE',
    subtitle: 'Conexão estável e rápida para você não perder nenhum detalhe.',
    description: 'WPS TELECOM - Sem taxa de instalação para a cidade.'
  },
  hero2: {
    title: 'Planos a partir de R$ 65,00!',
    subtitle: 'Sem taxa de instalação e pagamento da 1ª mensalidade com 5 dias após instalação.',
    description: 'NÃO COBRAMOS FIDELIDADE'
  },
  // Planos disponíveis separados por cidade
  planosPorCidade: {
    "Uruaçu - GO": [
      {
        nome: '5 MEGAS',
        preco: 'R$ 65,00/mês',
        detalhes: 'Plano Básico',
        beneficios: beneficiosPadrao
      },
      {
        nome: '7 MEGAS',
        preco: 'R$ 75,00/mês',
        detalhes: 'Plano Intermediário',
        beneficios: beneficiosPadrao
      },
      {
        nome: '10 MEGAS',
        preco: 'R$ 85,00/mês',
        detalhes: 'Plano Família',
        beneficios: beneficiosPadrao
      },
      {
        nome: '100 MEGAS',
        preco: 'R$ 79,90/mês',
        detalhes: 'Plano Fibra Start',
        beneficios: beneficiosPadrao
      },
      {
        nome: '200 MEGAS',
        preco: 'R$ 89,90/mês',
        detalhes: 'Plano Mais Popular',
        recomendado: true,
        beneficios: beneficiosPadrao
      },
      {
        nome: '500 MEGAS',
        preco: 'R$ 99,90/mês',
        detalhes: 'Plano Ultra',
        beneficios: beneficiosPadrao
      }
    ]
  },
  // Caminho para o logo
  logo: 'assets/img/logo_wps.png',
  // URL da Central do Assinante (opcional)
  centralAssinante: ''
};

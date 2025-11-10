/* ===========================
   1) CONSTANTES E CONFIGURAÇÕES
   =========================== */

// Chave usada no localStorage para persistir os dados da aplicação
const STORAGE_KEY = 'routineAppData_v2_multilang';

// Dados padrão usados na primeira execução (apenas exemplo/teste)
const DEFAULT_DATA = {
  // Rotinas iniciais de exemplo (ajuste como quiser)
  routines: [
    {
      id: 't1',
      title: 'Treino de força (peito e tríceps)',
      description: 'Foco em progressão de carga.',
      date: new Date().toISOString().split('T')[0], // data de hoje no formato YYYY-MM-DD
      time: '08:00',
      priority: 'high',
      tag: 'saúde',
      completed: false,
      status: 'doing'
    },
    {
      id: 't2',
      title: 'Reunião de planejamento semanal',
      description: 'Revisar metas e definir prioridades.',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      priority: 'medium',
      tag: 'trabalho',
      completed: false,
      status: 'todo'
    },
    {
      id: 't3',
      title: 'Ler 50 páginas do livro "Atomic Habits"',
      description: 'Hábito de leitura diário.',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // amanhã
      time: undefined,
      priority: 'low',
      tag: 'estudos',
      completed: false,
      status: 'todo'
    },
    {
      id: 't4',
      title: 'Pagar contas mensais',
      description: 'Água, luz, internet.',
      date: new Date().toISOString().split('T')[0],
      time: undefined,
      priority: 'high',
      tag: 'pessoal',
      completed: true,
      status: 'done'
    }
  ],
  // Etiquetas iniciais
  tags: [
    { id: 'tag1', name: 'pessoal', color: '#4f46e5' },
    { id: 'tag2', name: 'trabalho', color: '#10b981' },
    { id: 'tag3', name: 'saúde', color: '#ef4444' },
    { id: 'tag4', name: 'estudos', color: '#f59e0b' }
  ],
  // Preferências iniciais
  preferences: {
    theme: 'light',
    showCompleted: true,
    notifications: true,
    language: 'pt-BR',
    fontFamily: 'Inter',
    fontSize: '16'
  },
  // Perfil do usuário
  profile: {
    displayName: 'Carlos',
    userName: 'onror',
    email: 'exemplo@gmail.com'
  }
};

/* ===========================
   1.1) TRADUÇÕES MULTILÍNGUE (PT / EN / ES / FR)
   =========================== */

const I18N = {
  'view.hoje': {
    'pt-BR': 'Hoje',
    'en-US': 'Today',
    'es-ES': 'Hoy',
    'fr-FR': "Aujourd'hui"
  },
  'view.todasRotinas': {
    'pt-BR': 'Todas as Rotinas',
    'en-US': 'All Routines',
    'es-ES': 'Todas las Rutinas',
    'fr-FR': 'Toutes les routines'
  },
  'view.calendario': {
    'pt-BR': 'Calendário',
    'en-US': 'Calendar',
    'es-ES': 'Calendario',
    'fr-FR': 'Calendrier'
  },
  'view.graficos': {
    'pt-BR': 'Gráficos',
    'en-US': 'Charts',
    'es-ES': 'Gráficos',
    'fr-FR': 'Graphiques'
  },
  'view.config': {
    'pt-BR': 'Configurações',
    'en-US': 'Settings',
    'es-ES': 'Configuración',
    'fr-FR': 'Paramètres'
  },
  'menu.visaoGeral': {
    'pt-BR': 'Visão Geral',
    'en-US': 'Overview',
    'es-ES': 'Visión general',
    'fr-FR': 'Aperçu'
  },
  'menu.etiquetas': {
    'pt-BR': 'Etiquetas',
    'en-US': 'Tags',
    'es-ES': 'Etiquetas',
    'fr-FR': 'Étiquettes'
  },
  'menu.filtros': {
    'pt-BR': 'Filtros',
    'en-US': 'Filters',
    'es-ES': 'Filtros',
    'fr-FR': 'Filtres'
  },
  'filter.pendentes': {
    'pt-BR': 'Pendentes',
    'en-US': 'Pending',
    'es-ES': 'Pendientes',
    'fr-FR': 'En attente'
  },
  'filter.concluidas': {
    'pt-BR': 'Concluídas',
    'en-US': 'Completed',
    'es-ES': 'Completadas',
    'fr-FR': 'Terminées'
  },
  'filter.alta': {
    'pt-BR': 'Prioridade alta',
    'en-US': 'High Priority',
    'es-ES': 'Prioridad alta',
    'fr-FR': 'Priorité haute'
  },
  'filter.media': {
    'pt-BR': 'Prioridade média',
    'en-US': 'Medium Priority',
    'es-ES': 'Prioridad media',
    'fr-FR': 'Priorité moyenne'
  },
  'filter.baixa': {
    'pt-BR': 'Prioridade baixa',
    'en-US': 'Low Priority',
    'es-ES': 'Prioridad baja',
    'fr-FR': 'Priorité basse'
  },
  'filter.semData': {
    'pt-BR': 'Sem data',
    'en-US': 'No Date',
    'es-ES': 'Sin fecha',
    'fr-FR': 'Sans date'
  },
  'button.novaRotina': {
    'pt-BR': '+ Nova rotina',
    'en-US': '+ New routine',
    'es-ES': '+ Nueva rutina',
    'fr-FR': '+ Nouvelle routine'
  },
  'button.saveSettings': {
    'pt-BR': 'Salvar Configurações',
    'en-US': 'Save Settings',
    'es-ES': 'Guardar configuración',
    'fr-FR': 'Enregistrer les paramètres'
  },
  'button.resetSettings': {
    'pt-BR': 'Restaurar Padrões',
    'en-US': 'Reset to Default',
    'es-ES': 'Restaurar valores',
    'fr-FR': 'Restaurer par défaut'
  },
  'label.darkMode': {
    'pt-BR': 'Modo escuro',
    'en-US': 'Dark Mode',
    'es-ES': 'Modo oscuro',
    'fr-FR': 'Mode sombre'
  },
  'label.appLanguage': {
    'pt-BR': 'Idioma do aplicativo',
    'en-US': 'App Language',
    'es-ES': 'Idioma de la app',
    'fr-FR': "Langue de l'application"
  },
  'label.fontFamily': {
    'pt-BR': 'Fonte personalizada',
    'en-US': 'Font Family',
    'es-ES': 'Fuente',
    'fr-FR': 'Police'
  },
  'label.fontSize': {
    'pt-BR': 'Tamanho da fonte',
    'en-US': 'Font Size',
    'es-ES': 'Tamaño de fuente',
    'fr-FR': 'Taille de police'
  },
  'label.notifications': {
    'pt-BR': 'Ativar notificações do navegador',
    'en-US': 'Enable browser notifications',
    'es-ES': 'Activar notificaciones del navegador',
    'fr-FR': "Activer les notifications du navigateur"
  },

  // Profile related
  'profile.meuPerfil': {
    'pt-BR': 'Meu perfil',
    'en-US': 'My profile',
    'es-ES': 'Mi perfil',
    'fr-FR': 'Mon profil'
  },
  'profile.editarPerfil': {
    'pt-BR': 'Editar perfil de usuário',
    'en-US': 'Edit user profile',
    'es-ES': 'Editar perfil',
    'fr-FR': "Modifier le profil d'utilisateur"
  },
  'profile.nomeExibido': {
    'pt-BR': 'Nome exibido',
    'en-US': 'Display name',
    'es-ES': 'Nombre visible',
    'fr-FR': "Nom affiché"
  },
  'profile.nomeUsuario': {
    'pt-BR': 'Nome de usuário',
    'en-US': 'Username',
    'es-ES': 'Nombre de usuario',
    'fr-FR': "Nom d'utilisateur"
  },
  'profile.email': {
    'pt-BR': 'E-mail',
    'en-US': 'Email',
    'es-ES': 'Correo',
    'fr-FR': 'Email'
  },

  // Details panel
  'details.title': {
    'pt-BR': 'Título',
    'en-US': 'Title',
    'es-ES': 'Título',
    'fr-FR': 'Titre'
  },
  'details.description': {
    'pt-BR': 'Descrição',
    'en-US': 'Description',
    'es-ES': 'Descripción',
    'fr-FR': 'Description'
  },
  'details.date': {
    'pt-BR': 'Data',
    'en-US': 'Date',
    'es-ES': 'Fecha',
    'fr-FR': 'Date'
  },
  'details.time': {
    'pt-BR': 'Hora',
    'en-US': 'Time',
    'es-ES': 'Hora',
    'fr-FR': 'Heure'
  },
  'details.priority': {
    'pt-BR': 'Prioridade',
    'en-US': 'Priority',
    'es-ES': 'Prioridad',
    'fr-FR': 'Priorité'
  },
  'details.tag': {
    'pt-BR': 'Etiqueta',
    'en-US': 'Tag',
    'es-ES': 'Etiqueta',
    'fr-FR': 'Étiquette'
  },
  'details.delete': {
    'pt-BR': 'Excluir',
    'en-US': 'Delete',
    'es-ES': 'Eliminar',
    'fr-FR': 'Supprimer'
  },
  'details.duplicate': {
    'pt-BR': 'Duplicar',
    'en-US': 'Duplicate',
    'es-ES': 'Duplicar',
    'fr-FR': 'Dupliquer'
  },
  'details.save': {
    'pt-BR': 'Salvar',
    'en-US': 'Save',
    'es-ES': 'Guardar',
    'fr-FR': 'Enregistrer'
  },

  // Empty / empty state
  'empty.none': {
    'pt-BR': 'Nenhuma rotina encontrada',
    'en-US': 'No routines found',
    'es-ES': 'No se encontraron rutinas',
    'fr-FR': "Aucune routine trouvée"
  },

  // Toasts (we will use keys and pass to showToastTranslation)
  'toast.added': {
    'pt-BR': 'Rotina adicionada com sucesso!',
    'en-US': 'Routine added successfully!',
    'es-ES': '¡Rutina añadida con éxito!',
    'fr-FR': 'Routine ajoutée avec succès !'
  },
  'toast.saved': {
    'pt-BR': 'Rotina salva com sucesso!',
    'en-US': 'Routine saved successfully!',
    'es-ES': '¡Rutina guardada con éxito!',
    'fr-FR': 'Routine enregistrée avec succès !'
  },
  'toast.deleted': {
    'pt-BR': 'Rotina excluída com sucesso!',
    'en-US': 'Routine deleted successfully!',
    'es-ES': '¡Rutina eliminada con éxito!',
    'fr-FR': 'Routine supprimée avec succès !'
  },
  'toast.copied': {
    'pt-BR': 'Rotina duplicada com sucesso!',
    'en-US': 'Routine duplicated successfully!',
    'es-ES': '¡Rutina duplicada con éxito!',
    'fr-FR': 'Routine dupliquée avec succès !'
  },

  // Chart titles
  'chart.weeklyProgress': {
    'pt-BR': 'Progresso Semanal de Tarefas',
    'en-US': 'Weekly Task Progress',
    'es-ES': 'Progreso semanal de tareas',
    'fr-FR': "Progression hebdomadaire des tâches"
  },
  'chart.timeDistribution': {
    'pt-BR': 'Distribuição do Tempo',
    'en-US': 'Time Distribution',
    'es-ES': 'Distribución del tiempo',
    'fr-FR': "Répartition du temps"
  },
  'chart.habitsOverTime': {
    'pt-BR': 'Evolução de Hábitos',
    'en-US': 'Habits Over Time',
    'es-ES': 'Evolución de hábitos',
    'fr-FR': "Évolution des habitudes"
  },

  // Calendar month/day names (we'll use these programmatically)
  'months': {
    'pt-BR': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    'en-US': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'es-ES': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    'fr-FR': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  },
  'weekdays': {
    'pt-BR': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'es-ES': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    'fr-FR': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  }
};

/* ===========================
   2) ESTADO DA APLICAÇÃO (mutável)
   =========================== */

// Estado global que guarda a informação atual do app (não persistida diretamente)
let state = {
  currentView: 'hoje',          // 'hoje' | 'todasRotinas' | 'calendario' | 'config'
  currentViewMode: 'lista',     // 'lista' | 'quadro' | 'calendario' | 'config'
  selectedTask: null,           // referência ao objeto de tarefa selecionado no painel de detalhes
  currentDate: new Date(),      // data usada pelo calendário (mês/ano)
  showSidebar: true,            // se a sidebar está visível
  routines: [],                 // array de rotinas (será carregado do localStorage)
  tags: [],                     // array de tags
  preferences: {},              // preferências do usuário (tema, mostrar concluídas, etc.)
  profile: {}                   // perfil do usuário
};

// Contador simples para gerar IDs únicos (inicia em 1000 para evitar colisão com IDs de exemplo)
let nextId = 1000;

/* ===========================
   3) SELETORES DO DOM (cache de elementos)
   =========================== */

// Guardamos referências a elementos do DOM para evitar querySelector repetido
const DOM = {
  app: document.querySelector('.app'),
  sidebar: document.getElementById('sidebar'),
  btnToggleSidebar: document.getElementById('btnToggleSidebar'),
  btnQuickAdd: document.getElementById('btnQuickAdd'),
  todayDate: document.getElementById('todayDate'),
  nowTime: document.getElementById('nowTime'),
  menuLinks: document.querySelectorAll('.menu-link[data-view]'),
  filterLinks: document.querySelectorAll('.menu-link[data-filter]'),
  tagList: document.getElementById('tagList'),
  btnAddTag: document.getElementById('btnAddTag'),
  viewTitle: document.getElementById('viewTitle'),
  viewHoje: document.getElementById('viewHoje'),
  viewTodasRotinas: document.getElementById('viewTodasRotinas'),
  viewQuadro: document.getElementById('viewQuadro'),
  viewCalendario: document.getElementById('viewCalendario'),
  viewConfig: document.getElementById('viewConfig'),
  viewGraficos: document.getElementById('viewGraficos'),
  taskListToday: document.getElementById('taskListToday'),
  todoList: document.querySelector('[data-col="todo"] .card-list'),
  doingList: document.querySelector('[data-col="doing"] .card-list'),
  doneList: document.querySelector('[data-col="done"] .card-list'),
  detailsPanel: document.getElementById('detailsPanel'),
  detailsClose: document.getElementById('detailsClose'),
  detailsForm: document.getElementById('detailsForm'),
  taskTitle: document.getElementById('taskTitle'),
  taskDesc: document.getElementById('taskDesc'),
  taskDate: document.getElementById('taskDate'),
  taskTime: document.getElementById('taskTime'),
  taskPriority: document.getElementById('taskPriority'),
  taskTag: document.getElementById('taskTag'),
  btnSaveTask: document.getElementById('btnSaveTask'),
  btnDeleteTask: document.getElementById('btnDeleteTask'),
  btnDuplicateTask: document.getElementById('btnDuplicateTask'),
  toastsContainer: document.getElementById('toasts'),
  // Configurações
  btnOpenConfig: document.getElementById('btnOpenConfig'),
  themeToggle: document.getElementById('themeToggle'),
  notificationsToggle: document.getElementById('notificationsToggle'),
  appLanguage: document.getElementById('appLanguage'),
  fontFamily: document.getElementById('fontFamily'),
  fontSize: document.getElementById('fontSize'),
  fontSizeValue: document.getElementById('fontSizeValue'),
  btnSaveSettings: document.getElementById('btnSaveSettings'),
  btnResetSettings: document.getElementById('btnResetSettings'),
  btnEditProfile: document.getElementById('btnEditProfile'),
  displayName: document.getElementById('displayName'),
  userName: document.getElementById('userName'),
  userEmail: document.getElementById('userEmail'),
  showEmail: document.getElementById('showEmail'),
  // Calendário - CORREÇÃO ADICIONADA
  calTitle: document.getElementById('calTitle'),
  calendarGrid: document.querySelector('.calendar-grid'),
  calPrev: document.getElementById('calPrev'),
  calNext: document.getElementById('calNext'),
  // Período personalizado
  modalCustomPeriod: document.getElementById('modalCustomPeriod'),
  customPeriodForm: document.getElementById('customPeriodForm'),
  customTitle: document.getElementById('customTitle'),
  customDesc: document.getElementById('customDesc'),
  customStartDate: document.getElementById('customStartDate'),
  customEndDate: document.getElementById('customEndDate'),
  customTime: document.getElementById('customTime'),
  customPriority: document.getElementById('customPriority'),
  customTag: document.getElementById('customTag'),
  periodTypeRadios: document.querySelectorAll('input[name="periodType"]'),
  periodRangeSection: document.getElementById('periodRangeSection'),
  periodSpecificSection: document.getElementById('periodSpecificSection'),
  periodRecurringSection: document.getElementById('periodRecurringSection'),
  addDateBtn: document.getElementById('addDateBtn'),
  specificDatesContainer: document.getElementById('specificDatesContainer'),
  recurringFrequency: document.getElementById('recurringFrequency'),
  recurringInterval: document.getElementById('recurringInterval'),
  intervalUnit: document.getElementById('intervalUnit'),
  recurringEndRadios: document.querySelectorAll('input[name="recurringEnd"]'),
  recurringOccurrences: document.getElementById('recurringOccurrences'),
  recurringEndDate: document.getElementById('recurringEndDate'),
  recurringStartDate: document.getElementById('recurringStartDate')
};

// Templates <template> do HTML (clonamos estes quando precisamos criar elementos)
const templates = {
  taskItem: document.getElementById('tplTaskItem'),
  boardCard: document.getElementById('tplBoardCard'),
  toast: document.getElementById('tplToast')
};

/* ===========================
   4) SISTEMA DE TRADUÇÃO
   =========================== */

// Obtém idioma atual (padrão pt-BR)
function getLang() {
  return (state.preferences.language || 'pt-BR');
}

// Traduz chave (key) com fallback
function t(key) {
  const lang = getLang();
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry['pt-BR'] || key;
}

// Aplica tradução nos elementos com data-i18n
function applyLanguageToDOM() {
  const lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[key] && I18N[key][lang]) {
      el.textContent = I18N[key][lang];
    }
  });

  // Atualiza textos dinâmicos (por ex. títulos de view)
  updateViewTitle();

  // Atualiza textos do calendário e dos gráficos, se existirem
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof initCharts === 'function') initCharts();
}

// Recarrega a página ao trocar idioma
function changeLanguage(newLang) {
  state.preferences.language = newLang;
  saveData();
  window.location.reload(); // funciona localmente (file://)
}

// Toast multilíngue
function showToastTranslation(key, type = 'info') {
  const msg = t(key);
  showToast(msg, type);
}

/* ===========================
   5) INICIALIZAÇÃO
   =========================== */

// Função de inicialização que configura tudo e renderiza o estado inicial
function init() {
  // Carrega dados do localStorage (ou DEFAULT_DATA)
  loadData();

  // Garante que nextId seja maior que quaisquer IDs existentes (evita colisão)
  state.routines.forEach(t => {
    // tenta extrair número do id (assumindo formato 'tN')
    const match = String(t.id).replace(/^t/, '');
    const idNum = parseInt(match, 10);
    if (!isNaN(idNum) && idNum >= nextId) nextId = idNum + 1;
  });

  // Configura listeners de eventos (interações do usuário)
  setupEventListeners();

  // Atualiza relógio e agenda de atualização periódica
  updateClock();
  setInterval(updateClock, 60000); // atualiza a hora a cada minuto

  // Inicializa drag & drop do Kanban
  setupDragAndDrop();

  // Carrega configurações
  loadSettings();

  // Aplica traduções
  applyLanguageToDOM();

  // Inicializar gráficos se estiver na view de gráficos
  if (state.currentView === 'graficos') {
    setTimeout(initCharts, 100); // Pequeno delay para garantir que o DOM esteja pronto
  }

  // Renderiza a interface inicial de acordo com a view selecionada
  render();
}

/* ===========================
   6) PERSISTÊNCIA (localStorage)
   =========================== */

// Carrega os dados salvos no localStorage. Se não existir, usa DEFAULT_DATA
function loadData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Usa fallback para cada parte caso esteja indefinida
      state.routines = parsedData.routines || DEFAULT_DATA.routines;
      state.tags = parsedData.tags || DEFAULT_DATA.tags;
      state.preferences = parsedData.preferences || DEFAULT_DATA.preferences;
      state.profile = parsedData.profile || DEFAULT_DATA.profile;
      state.showSidebar = parsedData.showSidebar !== undefined ? parsedData.showSidebar : true;
    } else {
      // Primeiro uso — carrega os dados padrão
      state.routines = DEFAULT_DATA.routines.slice();
      state.tags = DEFAULT_DATA.tags.slice();
      state.preferences = Object.assign({}, DEFAULT_DATA.preferences);
      state.profile = Object.assign({}, DEFAULT_DATA.profile);
      state.showSidebar = true;
      // Salva imediatamente para criar a chave no localStorage
      saveData();
    }

    // Aplica preferências visuais (tema, sidebar layout)
    if (DOM.app) {
      DOM.app.setAttribute('data-theme', state.preferences.theme || 'light');
      DOM.app.setAttribute('data-layout', state.showSidebar ? 'with-sidebar' : 'without-sidebar');
    }
  } catch (err) {
    // Em caso de erro de parsing, restauramos o padrão para evitar travar a app
    console.error('Erro ao carregar dados do storage:', err);
    state.routines = DEFAULT_DATA.routines.slice();
    state.tags = DEFAULT_DATA.tags.slice();
    state.preferences = Object.assign({}, DEFAULT_DATA.preferences);
    state.profile = Object.assign({}, DEFAULT_DATA.profile);
    saveData();
  }
}

// Salva o estado relevante no localStorage
function saveData() {
  try {
    const dataToSave = {
      routines: state.routines,
      tags: state.tags,
      preferences: state.preferences,
      profile: state.profile,
      showSidebar: state.showSidebar
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    // Se estiver na view de gráficos, atualizar os gráficos
    if (state.currentView === 'graficos') {
      initCharts();
    }
  } catch (err) {
    console.error('Erro ao salvar dados no storage:', err);
  }
}

/* ===========================
   7) UTILITÁRIOS (helpers)
   =========================== */

// Gera um ID único simples para novas rotinas (prefixo 't' + contador)
function generateId() {
  return 't' + (nextId++);
}

// Mostrar um toast (notificação temporária)
// message: texto, type: 'info'|'success'|'error' (usado apenas para classes)
function showToast(message, type = 'info', duration = 3000) {
  if (!templates.toast || !DOM.toastsContainer) {
    // fallback console se os elementos não existirem
    console.log(`[${type}] ${message}`);
    return;
  }

  // Clona o template do toast
  const toastElement = templates.toast.content.cloneNode(true);
  const toast = toastElement.querySelector('.toast');
  // Insere o conteúdo e a classe de tipo
  toast.querySelector('.toast-content').textContent = message;
  toast.classList.add(type);

  // Adiciona o toast ao container (prepend para mostrar em cima)
  DOM.toastsContainer.prepend(toast);

  // Fecha ao clicar no botão 'close' interno
  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toast.remove());

  // Auto-destrói após 'duration' ms (aplica uma classe para animação, se existir)
  setTimeout(() => {
    toast.classList.add('fade-out');
    // remove depois da transição (evita remoção imediata cortando animação)
    toast.addEventListener('transitionend', () => {
      try { toast.remove(); } catch (e) { }
    });
  }, duration);
}

// Converte um objeto Date em string 'YYYY-MM-DD' para inputs do tipo date
function formatDateForInput(date) {
  if (!date) return '';
  // Se for string já no formato ISO, tenta apenas retornar a parte de data
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date.split('T')[0];
  }
  // Se for Date
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return '';
}

// Normaliza string de tag removendo '#' e espaços
function normalizeTag(tagStr) {
  if (!tagStr) return undefined;
  return tagStr.replace('#', '').trim();
}

/* ===========================
   8) CRUD DE ROTINAS (Add / Toggle / Open / Save / Delete / Duplicate)
   =========================== */

// Adiciona uma nova rotina ao estado e salva
function addNewRoutine({ title, description, date, time, priority, tag, status = 'todo', completed = false }) {
  // Validação mínima
  if (!title || !title.trim()) {
    showToastTranslation('toast.requiredTitle', 'error');
    return null;
  }

  const newRoutine = {
    id: generateId(),
    title: title.trim(),
    description: description || '',
    date: date || undefined,        // espera 'YYYY-MM-DD' ou undefined
    time: time || undefined,        // espera 'HH:MM' ou undefined
    priority: priority || 'medium', // 'low'|'medium'|'high'
    tag: tag ? normalizeTag(tag) : undefined,
    status: status,
    completed: !!completed
  };

  state.routines.push(newRoutine);
  saveData();
  render(); // atualiza UI
  showToastTranslation('toast.added', 'success');
  return newRoutine;
}

// Alterna marcação de concluída/pendente para uma rotina pelo ID
function toggleTaskCompletion(taskId) {
  const task = state.routines.find(t => t.id === taskId);
  if (!task) return;

  // Inverte o booleano completed
  task.completed = !task.completed;

  // Ajuste do status se necessário
  if (task.completed) {
    task.status = 'done';
    showToast(`Rotina "${task.title}" concluída!`, 'success');
  } else {
    // se estava 'done' e foi desmarcada, movemos para 'todo' por padrão
    if (task.status === 'done') task.status = 'todo';
    showToast(`Rotina "${task.title}" marcada como pendente.`, 'info');
  }

  saveData();
  render();
}

// Abre painel de detalhes com o conteúdo da tarefa
function openTaskDetails(taskId) {
  const task = state.routines.find(t => t.id === taskId);
  if (!task || !DOM.detailsPanel) return;

  state.selectedTask = task;

  // Preenche o formulário com os dados da tarefa
  if (DOM.taskTitle) DOM.taskTitle.value = task.title || '';
  if (DOM.taskDesc) DOM.taskDesc.value = task.description || '';
  if (DOM.taskPriority) DOM.taskPriority.value = task.priority || 'medium';
  if (DOM.taskTag) DOM.taskTag.value = task.tag ? `#${task.tag}` : '';

  // Ajuste de data para input evitando problemas de timezone
  if (task.date) {
    // cria um objeto Date a partir do string 'YYYY-MM-DD'
    const d = new Date(task.date + 'T00:00:00');
    DOM.taskDate.value = formatDateForInput(d);
  } else {
    if (DOM.taskDate) DOM.taskDate.value = '';
  }

  if (DOM.taskTime) DOM.taskTime.value = task.time || '';

  // Atualiza título do painel
  const detailsTitle = document.getElementById('detailsTitle');
  if (detailsTitle) detailsTitle.textContent = task.title;

  // Exibe painel de detalhes (aria-hidden e classes para animação)
  DOM.detailsPanel.setAttribute('aria-hidden', 'false');
  DOM.detailsPanel.classList.add('is-open');
}

// Fecha painel de detalhes e limpa seleção
function closeDetails() {
  state.selectedTask = null;
  if (!DOM.detailsPanel) return;
  DOM.detailsPanel.setAttribute('aria-hidden', 'true');
  DOM.detailsPanel.classList.remove('is-open');
  // Reseta o formulário visualmente (não altera dados não salvos)
  if (DOM.detailsForm) DOM.detailsForm.reset();
}

// Salva as alterações feitas no painel de detalhes
function saveTaskDetails(e) {
  // This function intended to be attached to detailsForm submit
  if (e && e.preventDefault) e.preventDefault();
  if (!state.selectedTask) return;

  // Recupera os valores do formulário
  const title = DOM.taskTitle ? DOM.taskTitle.value.trim() : '';
  const description = DOM.taskDesc ? DOM.taskDesc.value : '';
  const date = DOM.taskDate ? DOM.taskDate.value || undefined : undefined;
  const time = DOM.taskTime ? DOM.taskTime.value || undefined : undefined;
  const priority = DOM.taskPriority ? DOM.taskPriority.value : 'medium';
  const tag = DOM.taskTag ? normalizeTag(DOM.taskTag.value) : undefined;

  if (!title) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Atualiza o objeto no estado
  const task = state.selectedTask;
  task.title = title;
  task.description = description;
  task.date = date;
  task.time = time;
  task.priority = priority;
  task.tag = tag;

  // Persistência e re-render
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.saved', 'success');
}

// Exclui a tarefa selecionada
function deleteCurrentTask() {
  if (!state.selectedTask) return;

  const confirmed = confirm(`Deseja realmente excluir a rotina "${state.selectedTask.title}"?`);
  if (!confirmed) return;

  state.routines = state.routines.filter(t => t.id !== state.selectedTask.id);
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.deleted', 'info');
}

// Duplica a tarefa selecionada
function duplicateCurrentTask() {
  if (!state.selectedTask) return;

  const original = state.selectedTask;
  const copy = Object.assign({}, original, {
    id: generateId(),
    title: `Cópia de ${original.title}`,
    completed: false,
    status: 'todo'
  });

  state.routines.push(copy);
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.copied', 'success');
}

/* ===========================
   9) GESTÃO DE ETIQUETAS (TAGS)
   =========================== */

// Adiciona nova etiqueta ao estado (verifica duplicidade por nome)
function addNewTag({ name, color }) {
  if (!name || !name.trim()) {
    showToast('O nome da etiqueta é obrigatório.', 'error');
    return;
  }
  const normalized = name.trim().toLowerCase();

  // Verifica se já existe
  if (state.tags.some(t => t.name.toLowerCase() === normalized)) {
    showToast('Esta etiqueta já existe!', 'error');
    return;
  }

  const newTag = {
    id: `tag${state.tags.length + 1}`,
    name: normalized,
    color: color || '#888'
  };

  state.tags.push(newTag);
  saveData();
  renderTags(); // atualiza a sidebar
  showToast(`Etiqueta #${newTag.name} adicionada!`, 'success');
}

// Renderiza as tags na sidebar e no datalist do formulário
function renderTags() {
  if (!DOM.tagList) return;
  DOM.tagList.innerHTML = '';

  // datalist para sugestões no input (ex.: #pessoal)
  const datalist = document.getElementById('datalistTags');
  if (datalist) datalist.innerHTML = '';

  state.tags.forEach(tag => {
    // Cria item na sidebar
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'tag';
    a.href = '#';
    a.dataset.tag = tag.name;
    a.textContent = `#${tag.name}`;
    // Aplicação visual simples: cor da borda
    a.style.borderColor = tag.color;
    // Clique em tag filtra por essa tag
    a.addEventListener('click', (e) => {
      e.preventDefault();
      // Ativa o filtro "por tag" (simples implementação: renderiza apenas tarefas com essa tag)
      renderTaskListWithTasks(state.routines.filter(r => r.tag === tag.name));
      showToast(`Filtrado por #${tag.name}`, 'info');
    });

    li.appendChild(a);
    DOM.tagList.appendChild(li);

    // Adiciona opção ao datalist para inputs
    if (datalist) {
      const option = document.createElement('option');
      option.value = `#${tag.name}`;
      datalist.appendChild(option);
    }
  });
}

/* ===========================
   10) FILTRAGEM E LISTAGEM DE TAREFAS
   =========================== */

// Retorna um array de tarefas filtradas de acordo com a view atual e filtros rápidos
function getFilteredTasks() {
  // Começa com uma cópia de todas as tasks
  let tasks = state.routines.slice();

  // Constroi data de referência para hoje (00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtra conforme state.currentView
  switch (state.currentView) {
    case 'hoje':
      tasks = tasks.filter(task => {
        if (!task.date) return false;
        const td = new Date(task.date + 'T00:00:00');
        td.setHours(0, 0, 0, 0);
        return td.getTime() === today.getTime();
      });
      break;
    case 'todasRotinas':
      // sem filtro por data
      break;
    case 'calendario':
      // Apenas tarefas com data aparecem no calendário
      tasks = tasks.filter(task => task.date);
      break;
    default:
      break;
  }

  // Filtros rápidos ativos na sidebar (um por vez)
  const activeFilterLink = document.querySelector('.menu-link[data-filter].is-active');
  if (activeFilterLink) {
    const filter = activeFilterLink.dataset.filter;
    switch (filter) {
      case 'pendentes':
        tasks = tasks.filter(t => !t.completed);
        break;
      case 'concluidas':
        tasks = tasks.filter(t => t.completed);
        break;
      case 'alta':
        tasks = tasks.filter(t => t.priority === 'high');
        break;
      case 'media':
        tasks = tasks.filter(t => t.priority === 'medium');
        break;
      case 'baixa':
        tasks = tasks.filter(t => t.priority === 'low');
        break;
      case 'semData':
        tasks = tasks.filter(t => !t.date);
        break;
      default:
        break;
    }
  } else {
    // Se não houver filtro ativo, aplica preferência global de mostrar ou não concluídas
    if (!state.preferences.showCompleted) {
      tasks = tasks.filter(t => !t.completed);
    }
  }

  return tasks;
}

/* ===========================
   11) RENDERIZAÇÃO (Lista / Quadro / Calendário / Config)
   =========================== */

// Atualiza título da view (ex.: Hoje, Calendário)
function updateViewTitle() {
  const titles = {
    'hoje': t('view.hoje'),
    'todasRotinas': t('view.todasRotinas'),
    'calendario': t('view.calendario'),
    'config': t('view.config'),
    'graficos': t('view.graficos')
  };
  if (DOM.viewTitle) DOM.viewTitle.textContent = titles[state.currentView] || 'Rotinas';
}

// Renderiza a lista principal (usada no modo 'lista')
function renderTaskList() {
  // Decide qual container usar dependendo da view ativa.
  // Por padrão tentamos usar a .task-list dentro da view ativa.
  let targetList = null;
  const activeViewId = `view${state.currentView.charAt(0).toUpperCase()}${state.currentView.slice(1)}`; // ex: 'todasRotinas' -> 'viewTodasRotinas'
  const activeView = document.getElementById(activeViewId);
  if (activeView) {
    targetList = activeView.querySelector('.task-list');
  }
  // fallback para o container padrão (hoje)
  if (!targetList) targetList = DOM.taskListToday;
  if (!targetList) return;
  targetList.innerHTML = '';
  const tasks = getFilteredTasks();
  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t('empty.none');
    targetList.appendChild(empty);
    return;
  }
  tasks.forEach(task => targetList.appendChild(createTaskElement(task)));
}

// Renderiza lista específica (usada quando filtramos por tag, por exemplo)
function renderTaskListWithTasks(tasks) {
  // Reusa a lógica de escolher o container correto (view-aware)
  let targetList = null;
  const activeViewId = `view${state.currentView.charAt(0).toUpperCase()}${state.currentView.slice(1)}`;
  const activeView = document.getElementById(activeViewId);
  if (activeView) targetList = activeView.querySelector('.task-list');
  if (!targetList) targetList = DOM.taskListToday;
  if (!targetList) return;
  targetList.innerHTML = '';

  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t('empty.none');
    DOM.taskListToday.appendChild(empty);
    return;
  }
  tasks.forEach(task => {
    const el = createTaskElement(task);
    DOM.taskListToday.appendChild(el);
  });
}

// Render principal que decide qual modo desenhar
function render() {
  updateViewTitle();
  renderTags(); // garante que as tags estejam atualizadas

  // Oculta todas as views primeiro
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('is-active'));

  // Mostra a view ativa baseada no currentView
  switch (state.currentView) {
    case 'hoje':
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
      break;
    case 'todasRotinas':
      if (DOM.viewTodasRotinas) DOM.viewTodasRotinas.classList.add('is-active');
      renderTaskList();
      break;
    case 'calendario':
      if (DOM.viewCalendario) DOM.viewCalendario.classList.add('is-active');
      renderCalendar();
      break;
    case 'config':
      if (DOM.viewConfig) DOM.viewConfig.classList.add('is-active');
      renderProfile();
      break;
    case 'graficos':
      if (DOM.viewGraficos) DOM.viewGraficos.classList.add('is-active');
      initCharts(); // ← INICIALIZAR GRÁFICOS AQUI
      break;
    default:
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
  }
}

/* ---------------------------
   11.1) Render - Quadro Kanban
   --------------------------- */

// Renderiza o quadro Kanban preenchendo as colunas por status
function renderBoard() {
  if (!DOM.todoList || !DOM.doingList || !DOM.doneList) return;
  DOM.todoList.innerHTML = '';
  DOM.doingList.innerHTML = '';
  DOM.doneList.innerHTML = '';

  // Usa getFilteredTasks para respeitar filtros
  const tasks = getFilteredTasks();

  // Para cada tarefa, cria um card e o coloca na coluna correta
  tasks.forEach(task => {
    const card = createBoardCard(task);
    if (task.status === 'done') DOM.doneList.appendChild(card);
    else if (task.status === 'doing') DOM.doingList.appendChild(card);
    else DOM.todoList.appendChild(card);
  });

  // Atualiza contadores (se existirem no DOM)
  const todoCount = document.getElementById('todoCount');
  const doingCount = document.getElementById('doingCount');
  const doneCount = document.getElementById('doneCount');
  if (todoCount) todoCount.textContent = `${DOM.todoList.children.length} itens`;
  if (doingCount) doingCount.textContent = `${DOM.doingList.children.length} itens`;
  if (doneCount) doneCount.textContent = `${DOM.doneList.children.length} itens`;
}

/* ---------------------------
   11.2) Render - Calendário - CORREÇÃO COMPLETA
   --------------------------- */

// Renderiza o calendário do mês atual (state.currentDate)
function renderCalendar() {
  if (!DOM.calendarGrid || !DOM.calTitle) return;

  // Limpa grid
  DOM.calendarGrid.innerHTML = '';

  // Ano e mês atuais
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  // Nome do mês (em PT-BR)
  const lang = getLang();
  const monthNames = I18N.months[lang];
  DOM.calTitle.textContent = `${monthNames[month]} ${year}`;

  // Determina primeiro dia da semana do mês e quantidade de dias
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Cabeçalho (dias da semana)
  const dayNames = I18N.weekdays[lang];
  dayNames.forEach(d => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = d;
    DOM.calendarGrid.appendChild(header);
  });

  // Dias do mês anterior (preenchimento)
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const dayEl = createCalendarDay(prevMonthDays - i, true);
    DOM.calendarGrid.appendChild(dayEl);
  }

  // Dias do mês atual
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year);
    const fullDate = new Date(year, month, d);
    const dayEl = createCalendarDay(d, false, isToday, fullDate);
    DOM.calendarGrid.appendChild(dayEl);
  }

  // Preenchimento do próximo mês para completar 6 linhas (42 células)
  const totalCells = 42;
  const daysSoFar = firstDayOfMonth + daysInMonth;
  const nextMonthDays = totalCells - daysSoFar;
  for (let i = 1; i <= nextMonthDays; i++) {
    const dayEl = createCalendarDay(i, true);
    DOM.calendarGrid.appendChild(dayEl);
  }
}

/* Cria um elemento de dia para o calendário
   day: número do dia
   isOtherMonth: boolean, se o dia pertence a outro mês (visualmente diferenciado)
   isToday: boolean
   fullDate: Date (opcional) - se fornecido, busca eventos para esse dia
*/
function createCalendarDay(day, isOtherMonth, isToday = false, fullDate = null) {
  const cell = document.createElement('div');
  cell.className = 'calendar-day';
  if (isOtherMonth) cell.classList.add('other-month');
  if (isToday) cell.classList.add('today');

  // Número do dia
  const number = document.createElement('div');
  number.className = 'calendar-day-number';
  number.textContent = day;
  cell.appendChild(number);

  // Se fullDate é passado, queremos também colocar eventos desse dia
  if (fullDate) {
    // Busca tarefas cuja data corresponde ao fullDate
    const tasksForDay = state.routines.filter(task => {
      if (!task.date) return false;
      // Normaliza para midnight local
      const taskDate = new Date(task.date + 'T00:00:00');
      return taskDate.getDate() === fullDate.getDate()
        && taskDate.getMonth() === fullDate.getMonth()
        && taskDate.getFullYear() === fullDate.getFullYear();
    });

    // Para cada tarefa, adiciona um botão/evento no dia
    tasksForDay.forEach(task => {
      const ev = document.createElement('button');
      ev.className = `calendar-event priority-${task.priority || 'medium'}`;
      // Adicionar classe se a tarefa faz parte de uma rotina com múltiplas datas
      if (task.isRecurring || task.parentRoutineId) {
        ev.classList.add('has-multiple-dates');
      }
      // Pode truncar o título se for muito grande (ex.: 30 chars)
      ev.textContent = task.title.length > 30 ? task.title.slice(0, 27) + '...' : task.title;
      // Ao clicar no evento, abre detalhes
      ev.addEventListener('click', (e) => {
        e.stopPropagation(); // evita que o clique dispare outras ações
        openTaskDetails(task.id);
      });
      cell.appendChild(ev);
    });

    // Ao clicar no dia (fora de eventos), abre modal de período personalizado com a data preenchida
    cell.addEventListener('click', (e) => {
      // Se o clique for num evento, já tratamos acima
      if (e.target && e.target.matches('.calendar-event')) return;
      if (!DOM.modalCustomPeriod) return;
      const dateStr = formatDateForInput(fullDate);
      if (DOM.customStartDate) DOM.customStartDate.value = dateStr;
      if (DOM.customEndDate) DOM.customEndDate.value = dateStr;
      if (DOM.recurringStartDate) DOM.recurringStartDate.value = dateStr;
      openCustomPeriodModal();
    });
  }

  return cell;
}

/* ===========================
   12) CRIAÇÃO DE ELEMENTOS (task item e board card)
   =========================== */

// Cria e retorna um elemento li.populado para a lista usando o template tplTaskItem
function createTaskElement(task) {
  if (!templates.taskItem) {
    // fallback simples
    const li = document.createElement('li');
    li.textContent = task.title;
    return li;
  }

  // Clona o template
  const clone = templates.taskItem.content.cloneNode(true);
  const li = clone.querySelector('li');
  // Marca ID no dataset para referência
  li.dataset.taskId = task.id;
  // Adiciona classe visual se concluída
  if (task.completed) li.classList.add('is-completed');
  // Adicionar classe se a tarefa faz parte de uma rotina com múltiplas datas
  if (task.isRecurring || task.parentRoutineId) {
    li.classList.add('has-multiple-dates');
  }

  // Checkbox para concluir/toggle
  const checkbox = clone.querySelector('.checkbox input');
  if (checkbox) {
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
  }

  // Título
  const titleEl = clone.querySelector('.task-title');
  if (titleEl) titleEl.textContent = task.title || '';

  // Due / data
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString(getLang());
      // marca atraso se não concluída e data passada
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = t('filter.semData');
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority'; // reset classes
    const priorityText = {
      'high': t('filter.alta'),
      'medium': t('filter.media'),
      'low': t('filter.baixa')
    };
    prioEl.textContent = priorityText[task.priority] || t('filter.media');
    prioEl.classList.add(task.priority || 'medium'); // adiciona classe 'high'|'medium'|'low' para estilo
  }

  // Tag
  const tagEl = clone.querySelector('.tag');
  if (tagEl) {
    if (task.tag) {
      tagEl.textContent = `#${task.tag}`;
      const tagInfo = state.tags.find(t => t.name === task.tag);
      if (tagInfo) {
        // define cor de fundo levemente translúcida e cor do texto
        tagEl.style.backgroundColor = tagInfo.color + '20'; // adiciona transparência simples
        tagEl.style.color = tagInfo.color;
      }
    } else {
      tagEl.textContent = '#geral';
    }
  }

  // Botão abrir detalhes
  const openBtn = clone.querySelector('.task-open');
  if (openBtn) openBtn.addEventListener('click', () => openTaskDetails(task.id));

  // Drag start (para Kanban)
  li.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  // Retorna o fragmento (elemento li)
  return clone;
}

// Cria e retorna um card para o quadro a partir do template tplBoardCard
function createBoardCard(task) {
  if (!templates.boardCard) {
    const div = document.createElement('div');
    div.textContent = task.title;
    return div;
  }

  const clone = templates.boardCard.content.cloneNode(true);
  const card = clone.querySelector('.card');
  card.dataset.taskId = task.id;
  card.draggable = true;
  if (task.completed) card.classList.add('is-completed');
  // Adicionar classe se a tarefa faz parte de uma rotina com múltiplas datas
  if (task.isRecurring || task.parentRoutineId) {
    card.classList.add('has-multiple-dates');
  }

  // Título
  const title = clone.querySelector('.card-title');
  if (title) title.textContent = task.title;

  // Due date
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString(getLang());
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = t('filter.semData');
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority';
    const priorityText = {
      'high': t('filter.alta'),
      'medium': t('filter.media'),
      'low': t('filter.baixa')
    };
    prioEl.textContent = priorityText[task.priority] || t('filter.media');
    prioEl.classList.add(task.priority || 'medium');
  }

  // Tag
  const tagEl = clone.querySelector('.tag');
  if (tagEl) {
    if (task.tag) {
      tagEl.textContent = `#${task.tag}`;
      const tagInfo = state.tags.find(t => t.name === task.tag);
      if (tagInfo) {
        tagEl.style.backgroundColor = tagInfo.color + '20';
        tagEl.style.color = tagInfo.color;
      }
    } else {
      tagEl.textContent = '#geral';
    }
  }

  // Status visual
  const statusEl = clone.querySelector('.status');
  if (statusEl) {
    if (task.status === 'done') statusEl.style.backgroundColor = '#10b981';
    else if (task.status === 'doing') statusEl.style.backgroundColor = '#f59e0b';
    else statusEl.style.backgroundColor = '#e5e7eb';
  }

  // Ações (detalhes e concluir/desfazer)
  const actionButtons = clone.querySelectorAll('.card-actions button');
  if (actionButtons.length >= 2) {
    actionButtons[0].addEventListener('click', () => openTaskDetails(task.id)); // Detalhes
    // Botão concluir / desfazer
    actionButtons[1].textContent = task.completed ? t('details.undo') : t('details.complete');
    actionButtons[1].addEventListener('click', () => toggleTaskCompletion(task.id));
  }

  // Drag start
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  return clone;
}

/* ===========================
   13) DRAG & DROP (Kanban)
   =========================== */

// Configura eventos de drag & drop nas colunas
function setupDragAndDrop() {
  // Seleciona colunas .column
  const columns = document.querySelectorAll('.column');
  if (!columns || columns.length === 0) return;

  columns.forEach(col => {
    // Quando um item é arrastado por cima de uma coluna
    col.addEventListener('dragenter', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragover', (e) => {
      e.preventDefault(); // necessário para permitir drop
    });
    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });
    // Evento drop final que move a tarefa entre status
    col.addEventListener('drop', handleDrop);
  });

  // Garante que o documento permita drops (evita abrir arquivos arrastados)
  document.addEventListener('dragover', (e) => { e.preventDefault(); });
}

// Handler quando um item é dropado em uma coluna
function handleDrop(e) {
  e.preventDefault();
  const col = e.currentTarget;
  col.classList.remove('drag-over');

  // Recupera o taskId do dataTransfer
  const taskId = e.dataTransfer.getData('text/plain');
  if (!taskId) return;

  const newStatus = col.dataset.col; // espera 'todo' | 'doing' | 'done'
  const task = state.routines.find(t => t.id === taskId);
  if (!task) return;

  // Atualiza status e completed de acordo
  task.status = newStatus || 'todo';
  task.completed = newStatus === 'done';

  // Persistência e render
  saveData();
  render(); // chama render (ou renderBoard para menor custo)

  const statusText = {
    'todo': 'A fazer',
    'doing': 'Em progresso',
    'done': 'Concluído'
  };
  showToast(`Rotina movida para: ${statusText[newStatus] || 'A fazer'}`, 'info');
}

/* ===========================
   14) CONFIGURAÇÕES E PREFERÊNCIAS
   =========================== */

// Carrega as configurações salvas
function loadSettings() {
  if (state.preferences) {
    // Tema
    if (state.preferences.theme) {
      DOM.app.setAttribute('data-theme', state.preferences.theme);
      if (DOM.themeToggle) DOM.themeToggle.checked = state.preferences.theme === 'dark';
    }

    // Notificações
    if (DOM.notificationsToggle && state.preferences.notifications !== undefined) {
      DOM.notificationsToggle.checked = state.preferences.notifications;
    }

    // Idioma
    if (DOM.appLanguage && state.preferences.language) {
      DOM.appLanguage.value = state.preferences.language;
    }

    // Fonte
    if (DOM.fontFamily && state.preferences.fontFamily) {
      DOM.fontFamily.value = state.preferences.fontFamily;
      document.body.style.fontFamily = state.preferences.fontFamily;
    }

    // Tamanho da fonte
    if (DOM.fontSize && state.preferences.fontSize) {
      DOM.fontSize.value = state.preferences.fontSize;
      if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = state.preferences.fontSize + 'px';
      document.body.style.fontSize = state.preferences.fontSize + 'px';
    }
  }
}

// Salva as configurações
function saveSettings() {
  state.preferences = {
    theme: DOM.themeToggle && DOM.themeToggle.checked ? 'dark' : 'light',
    notifications: DOM.notificationsToggle ? DOM.notificationsToggle.checked : true,
    language: DOM.appLanguage ? DOM.appLanguage.value : 'pt-BR',
    fontFamily: DOM.fontFamily ? DOM.fontFamily.value : 'Inter',
    fontSize: DOM.fontSize ? DOM.fontSize.value : '16',
    showCompleted: state.preferences.showCompleted !== undefined ? state.preferences.showCompleted : true
  };

  // Aplica as configurações
  DOM.app.setAttribute('data-theme', state.preferences.theme);
  if (DOM.fontFamily) document.body.style.fontFamily = state.preferences.fontFamily;
  if (DOM.fontSize) {
    document.body.style.fontSize = state.preferences.fontSize + 'px';
    if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = state.preferences.fontSize + 'px';
  }

  saveData();
  showToastTranslation('toast.saved', 'success');
}

// Restaura configurações padrão
function resetSettings() {
  const confirmed = confirm('Deseja restaurar as configurações padrão?');
  if (!confirmed) return;

  state.preferences = {
    theme: 'light',
    notifications: true,
    language: 'pt-BR',
    fontFamily: 'Inter',
    fontSize: '16',
    showCompleted: true
  };

  loadSettings();
  saveData();
  applyLanguageToDOM();
  showToastTranslation('toast.saved', 'info');
}

// Alterna o tema
function toggleTheme() {
  const newTheme = DOM.themeToggle.checked ? 'dark' : 'light';
  DOM.app.setAttribute('data-theme', newTheme);
  state.preferences.theme = newTheme;
  saveData();
}

// Renderiza o perfil do usuário
function renderProfile() {
  if (DOM.displayName && state.profile.displayName) {
    DOM.displayName.textContent = state.profile.displayName;
  }
  if (DOM.userName && state.profile.userName) {
    DOM.userName.textContent = state.profile.userName;
  }
  if (DOM.userEmail && state.profile.email) {
    DOM.userEmail.textContent = state.profile.email;
  }
}

/* ===========================
   15) SISTEMA DE PERÍODO PERSONALIZADO
   =========================== */

// Abrir modal de período personalizado
function openCustomPeriodModal() {
  if (!DOM.modalCustomPeriod) return;

  // Definir data mínima como hoje
  const today = new Date().toISOString().split('T')[0];
  if (DOM.customStartDate) DOM.customStartDate.min = today;
  if (DOM.customEndDate) DOM.customEndDate.min = today;
  if (DOM.recurringStartDate) DOM.recurringStartDate.min = today;

  // Limpar formulário
  DOM.customPeriodForm.reset();

  // Mostrar seção padrão (intervalo)
  showPeriodSection('range');

  // Abrir modal
  if (DOM.modalCustomPeriod.showModal) DOM.modalCustomPeriod.showModal();
  if (DOM.customTitle) DOM.customTitle.focus();
}

// Função para fechar o modal de período personalizado
function closeCustomPeriodModal() {
  if (!DOM.modalCustomPeriod) return;

  // Limpar formulário
  if (DOM.customPeriodForm) DOM.customPeriodForm.reset();

  // Fechar modal
  if (DOM.modalCustomPeriod.close) DOM.modalCustomPeriod.close();
}

// Mostrar seção específica baseada no tipo de período selecionado
function showPeriodSection(type) {
  // Esconder todas as seções
  if (DOM.periodRangeSection) DOM.periodRangeSection.style.display = 'none';
  if (DOM.periodSpecificSection) DOM.periodSpecificSection.style.display = 'none';
  if (DOM.periodRecurringSection) DOM.periodRecurringSection.style.display = 'none';

  // Mostrar a seção selecionada
  switch (type) {
    case 'range':
      if (DOM.periodRangeSection) DOM.periodRangeSection.style.display = 'block';
      break;
    case 'specific':
      if (DOM.periodSpecificSection) DOM.periodSpecificSection.style.display = 'block';
      break;
    case 'recurring':
      if (DOM.periodRecurringSection) DOM.periodRecurringSection.style.display = 'block';
      break;
  }
}

// Adicionar campo de data para dias específicos
function addSpecificDateField() {
  if (!DOM.specificDatesContainer) return;

  const dateRow = document.createElement('div');
  dateRow.className = 'date-input-row';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'specific-date';

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn icon only remove-date';
  removeBtn.setAttribute('aria-label', 'Remover data');
  removeBtn.textContent = '✕';

  removeBtn.addEventListener('click', function () {
    dateRow.remove();
  });

  dateRow.appendChild(dateInput);
  dateRow.appendChild(removeBtn);
  DOM.specificDatesContainer.appendChild(dateRow);
}

// Atualizar unidade de intervalo baseada na frequência
function updateIntervalUnit() {
  if (!DOM.recurringFrequency || !DOM.intervalUnit) return;

  const frequency = DOM.recurringFrequency.value;
  let unit = 'dia(s)';

  switch (frequency) {
    case 'weekly':
      unit = 'semana(s)';
      break;
    case 'monthly':
      unit = 'mês(es)';
      break;
  }

  DOM.intervalUnit.textContent = unit;
}

// Habilitar/desabilitar campos de término baseado na seleção
function toggleRecurringEndFields() {
  const selectedValue = document.querySelector('input[name="recurringEnd"]:checked').value;

  if (DOM.recurringOccurrences) {
    DOM.recurringOccurrences.disabled = selectedValue !== 'after';
  }

  if (DOM.recurringEndDate) {
    DOM.recurringEndDate.disabled = selectedValue !== 'on';
  }
}

// Gerar todas as datas para uma rotina baseada no tipo de período
function generateRoutineDates(periodType, formData) {
  let dates = [];

  switch (periodType) {
    case 'range':
      // Gerar datas entre início e fim, considerando apenas os dias da semana selecionados
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const selectedDays = formData.selectedDays || [1, 2, 3, 4, 5]; // Padrão: dias de semana

      let current = new Date(start);
      while (current <= end) {
        if (selectedDays.includes(current.getDay())) {
          dates.push(formatDateForInput(current));
        }
        current.setDate(current.getDate() + 1);
      }
      break;

    case 'specific':
      // Usar as datas específicas fornecidas
      dates = formData.specificDates.filter(date => date.trim() !== '');
      break;

    case 'recurring':
      // Gerar datas baseadas na recorrência
      dates = generateRecurringDates(formData);
      break;
  }

  return dates;
}

// Gerar datas para rotinas recorrentes
function generateRecurringDates(formData) {
  const dates = [];
  const startDate = new Date(formData.startDate);
  const frequency = formData.frequency;
  const interval = parseInt(formData.interval) || 1;

  let currentDate = new Date(startDate);
  let occurrenceCount = 0;
  const maxOccurrences = formData.endType === 'after' ? parseInt(formData.occurrences) : Infinity;
  const endDate = formData.endType === 'on' ? new Date(formData.endDate) : null;

  while (
    (formData.endType === 'never' ||
      (formData.endType === 'after' && occurrenceCount < maxOccurrences) ||
      (formData.endType === 'on' && currentDate <= endDate))
  ) {
    dates.push(formatDateForInput(currentDate));
    occurrenceCount++;

    // Avançar para a próxima data baseada na frequência
    switch (frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * interval));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + interval);
        break;
    }

    // Limitar a um número razoável de ocorrências para evitar loops infinitos
    if (occurrenceCount > 365) break;
  }

  return dates;
}

// Adicionar múltiplas rotinas baseadas nas datas geradas
function addRoutinesWithCustomPeriod(formData) {
  const dates = generateRoutineDates(formData.periodType, formData);

  if (dates.length === 0) {
    showToast('Nenhuma data válida foi gerada para esta rotina.', 'error');
    return;
  }

  let createdCount = 0;

  dates.forEach(date => {
    const routineData = {
      title: formData.title,
      description: formData.description,
      date: date,
      time: formData.time,
      priority: formData.priority,
      tag: formData.tag,
      status: 'todo',
      completed: false,
      isRecurring: formData.periodType === 'recurring'
    };

    const result = addNewRoutine(routineData);
    if (result) createdCount++;
  });

  showToast(`${createdCount} rotina(s) criada(s) com sucesso!`, 'success');
}

// Processar formulário de período personalizado
function processCustomPeriodForm(e) {
  if (e && e.preventDefault) e.preventDefault();

  // Verificar se é o botão cancelar
  const submitter = e.submitter;
  if (submitter && submitter.value === 'cancel') {
    closeCustomPeriodModal();
    return;
  }

  // Coletar dados do formulário
  const title = DOM.customTitle ? DOM.customTitle.value.trim() : '';
  const description = DOM.customDesc ? DOM.customDesc.value : '';
  const time = DOM.customTime ? DOM.customTime.value || undefined : undefined;
  const priority = DOM.customPriority ? DOM.customPriority.value : 'medium';
  const tag = DOM.customTag ? normalizeTag(DOM.customTag.value) : undefined;

  if (!title) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Determinar tipo de período selecionado
  const periodType = document.querySelector('input[name="periodType"]:checked').value;
  let formData = {
    title,
    description,
    time,
    priority,
    tag,
    periodType
  };

  // Coletar dados específicos do tipo de período
  switch (periodType) {
    case 'range':
      const startDate = DOM.customStartDate ? DOM.customStartDate.value : '';
      const endDate = DOM.customEndDate ? DOM.customEndDate.value : '';

      if (!startDate || !endDate) {
        showToast('As datas de início e término são obrigatórias.', 'error');
        return;
      }

      if (new Date(startDate) > new Date(endDate)) {
        showToast('A data de início não pode ser posterior à data de término.', 'error');
        return;
      }

      // Coletar dias da semana selecionados
      const selectedDays = [];
      document.querySelectorAll('.weekday-option input[type="checkbox"]:checked').forEach(cb => {
        selectedDays.push(parseInt(cb.value));
      });

      formData.startDate = startDate;
      formData.endDate = endDate;
      formData.selectedDays = selectedDays;
      break;

    case 'specific':
      const specificDates = [];
      document.querySelectorAll('.specific-date').forEach(input => {
        if (input.value) specificDates.push(input.value);
      });

      if (specificDates.length === 0) {
        showToast('Pelo menos uma data específica deve ser fornecida.', 'error');
        return;
      }

      formData.specificDates = specificDates;
      break;

    case 'recurring':
      const recurringStartDate = DOM.recurringStartDate ? DOM.recurringStartDate.value : '';
      const frequency = DOM.recurringFrequency ? DOM.recurringFrequency.value : 'weekly';
      const interval = DOM.recurringInterval ? DOM.recurringInterval.value : '1';
      const endType = document.querySelector('input[name="recurringEnd"]:checked').value;

      if (!recurringStartDate) {
        showToast('A data de início é obrigatória para rotinas recorrentes.', 'error');
        return;
      }

      formData.startDate = recurringStartDate;
      formData.frequency = frequency;
      formData.interval = interval;
      formData.endType = endType;

      if (endType === 'after') {
        formData.occurrences = DOM.recurringOccurrences ? DOM.recurringOccurrences.value : '10';
      } else if (endType === 'on') {
        formData.endDate = DOM.recurringEndDate ? DOM.recurringEndDate.value : '';

        if (!formData.endDate) {
          showToast('A data de término é obrigatória quando selecionada.', 'error');
          return;
        }
      }
      break;
  }

  // Criar as rotinas
  addRoutinesWithCustomPeriod(formData);

  // Fechar modal
  closeCustomPeriodModal();
}

/* ===========================
   16) EVENTOS GERAIS E LIGAÇÕES
   =========================== */

// Configura todos os listeners de UI (botões, formulários, links, etc.)
function setupEventListeners() {
  // Toggle sidebar
  if (DOM.btnToggleSidebar) DOM.btnToggleSidebar.addEventListener('click', toggleSidebar);

  // Botão de adicionar rápida
  if (DOM.btnQuickAdd && DOM.modalCustomPeriod) {
    DOM.btnQuickAdd.addEventListener('click', openCustomPeriodModal);
  }

  // Navegação principal (links com data-view)
  if (DOM.menuLinks && DOM.menuLinks.length) {
    DOM.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        setCurrentView(view);
      });
    });
  }

  // Filtros rápidos (data-filter)
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const wasActive = link.classList.contains('is-active');
        // limpa todos
        DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
        // alterna
        if (!wasActive) link.classList.add('is-active');
        render();
      });
    });
  }

  // Modal adicionar tag
  if (DOM.btnAddTag && DOM.modalAddTag) {
    DOM.btnAddTag.addEventListener('click', () => {
      if (DOM.modalAddTag.showModal) DOM.modalAddTag.showModal();
      if (DOM.tagName) DOM.tagName.focus();
    });
  }

  // Fechar painel detalhes
  if (DOM.detailsClose) DOM.detailsClose.addEventListener('click', closeDetails);

  // Submit do formulário de detalhes (salvar)
  if (DOM.detailsForm) DOM.detailsForm.addEventListener('submit', saveTaskDetails);

  // Botões excluir e duplicar no painel de detalhes
  if (DOM.btnDeleteTask) DOM.btnDeleteTask.addEventListener('click', deleteCurrentTask);
  if (DOM.btnDuplicateTask) DOM.btnDuplicateTask.addEventListener('click', duplicateCurrentTask);

  // Event listeners para o modal de período personalizado
  if (DOM.periodTypeRadios) {
    DOM.periodTypeRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        showPeriodSection(this.value);
      });
    });
  }

  if (DOM.addDateBtn) {
    DOM.addDateBtn.addEventListener('click', addSpecificDateField);
  }

  if (DOM.recurringFrequency) {
    DOM.recurringFrequency.addEventListener('change', updateIntervalUnit);
  }

  if (DOM.recurringEndRadios) {
    DOM.recurringEndRadios.forEach(radio => {
      radio.addEventListener('change', toggleRecurringEndFields);
    });
  }

  if (DOM.customPeriodForm) {
    DOM.customPeriodForm.addEventListener('submit', processCustomPeriodForm);

    // Botão cancelar
    const cancelBtn = DOM.customPeriodForm.querySelector('button[value="cancel"]');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        closeCustomPeriodModal();
      });
    }
  }

  // Navegação do calendário (mudar mês) - CORREÇÃO ADICIONADA
  if (DOM.calPrev) DOM.calPrev.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
  });
  if (DOM.calNext) DOM.calNext.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Configurações
  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener('change', toggleTheme);
  }

  if (DOM.btnSaveSettings) {
    DOM.btnSaveSettings.addEventListener('click', saveSettings);
  }

  if (DOM.btnResetSettings) {
    DOM.btnResetSettings.addEventListener('click', resetSettings);
  }

  if (DOM.btnOpenConfig) {
    DOM.btnOpenConfig.addEventListener('click', (e) => {
      e.preventDefault();
      setCurrentView('config');
    });
  }

  // Controle de idioma
  if (DOM.appLanguage) {
    DOM.appLanguage.addEventListener('change', e => {
      changeLanguage(e.target.value);
    });
  }

  // Controles de configuração em tempo real
  if (DOM.fontSize) {
    DOM.fontSize.addEventListener('input', (e) => {
      document.body.style.fontSize = e.target.value + 'px';
      if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = e.target.value + 'px';
    });
  }

  if (DOM.fontFamily) {
    DOM.fontFamily.addEventListener('change', (e) => {
      document.body.style.fontFamily = e.target.value;
    });
  }

  // Perfil
  if (DOM.showEmail) {
    DOM.showEmail.addEventListener('click', (e) => {
      e.preventDefault();
      if (DOM.userEmail.textContent.includes('*')) {
        DOM.userEmail.textContent = state.profile.email;
        DOM.showEmail.textContent = 'Ocultar';
      } else {
        DOM.userEmail.textContent = '*****************@gmail.com';
        DOM.showEmail.textContent = 'Mostrar';
      }
    });
  }

  // Botões de edição do perfil
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const field = e.target.dataset.edit;
      const currentValue = state.profile[field];
      const newValue = prompt(`Editar ${field}:`, currentValue);
      if (newValue && newValue.trim()) {
        state.profile[field] = newValue.trim();
        saveData();
        renderProfile();
        showToast(`${field} atualizado com sucesso!`, 'success');
      }
    });
  });
}

/* ===========================
   17) FUNÇÕES AUXILIARES (UI/Helpers)
   =========================== */

// Alterna a sidebar visível / escondida e persiste a preferência
function toggleSidebar() {
  state.showSidebar = !state.showSidebar;
  if (DOM.app) DOM.app.setAttribute('data-layout', state.showSidebar ? 'with-sidebar' : 'without-sidebar');
  saveData();
}

// Muda a view principal (Hoje / Semana / Calendário / Todas / Config)
function setCurrentView(view) {
  // Ajusta estado
  // normalize view to string and lower-case for safety
  const v = (view || 'hoje').toString();
  state.currentView = v;

  // Atualiza classes ativas nos links do menu
  if (DOM.menuLinks && DOM.menuLinks.length) {
    DOM.menuLinks.forEach(link => {
      // compare case-insensitive to avoid mismatch between html/data-view and state
      const linkView = (link.dataset.view || '').toString();
      link.classList.toggle('is-active', linkView.toLowerCase() === String(state.currentView).toLowerCase());
    });
  }

  // Limpa filtros rápidos ao trocar de view
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
  }

  render();
}

// Atualiza relógio e data na UI
function updateClock() {
  const now = new Date();
  const lang = getLang();
  if (DOM.todayDate) DOM.todayDate.textContent = now.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
  if (DOM.nowTime) DOM.nowTime.textContent = now.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
}

/* ===========================
   18) SISTEMA DE GRÁFICOS - VERSÃO CORRIGIDA
   =========================== */

// Inicializar todos os gráficos
function initCharts() {
  console.log('Inicializando gráficos...');

  if (!state.routines || state.routines.length === 0) {
    console.log('Nenhuma rotina encontrada para gráficos');
    renderEmptyCharts();
    return;
  }

  try {
    renderWeeklyProgressChart();
    renderTimeDistributionChart();
    renderHabitsOverTimeChart();
    console.log('Gráficos inicializados com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar gráficos:', error);
    renderEmptyCharts();
  }
}

// Renderizar gráfico de progresso semanal - VERSÃO SIMPLIFICADA
function renderWeeklyProgressChart() {
  const ctx = document.getElementById('weeklyProgressChart');
  if (!ctx) {
    console.log('Elemento weeklyProgressChart não encontrado');
    return;
  }

  // Destruir gráfico anterior se existir
  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  // Dados de exemplo para teste
  const weeklyData = [5, 8, 6, 9, 7, 4, 3];

  ctx.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: I18N.weekdays[getLang()],
      datasets: [{
        label: t('chart.weeklyProgress'),
        data: weeklyData,
        backgroundColor: '#ff5454',
        borderColor: '#ff2c2c',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Renderizar gráfico de distribuição de tempo - VERSÃO SIMPLIFICADA
function renderTimeDistributionChart() {
  const ctx = document.getElementById('timeDistributionChart');
  if (!ctx) return;

  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  // Dados de exemplo
  ctx.chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [t('filter.trabalho'), t('filter.saude'), t('filter.estudos'), t('filter.pessoal')],
      datasets: [{
        data: [30, 20, 25, 25],
        backgroundColor: ['#ff5454', '#4f46e5', '#10b981', '#f59e0b'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Renderizar gráfico de hábitos ao longo do tempo - VERSÃO SIMPLIFICADA
function renderHabitsOverTimeChart() {
  const ctx = document.getElementById('habitsOverTimeChart');
  if (!ctx) return;

  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const lang = getLang();
  const monthNames = I18N.months[lang];

  ctx.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['01/03', '02/03', '03/03', '04/03', '05/03', '06/03', '07/03'],
      datasets: [{
        label: t('chart.habitsOverTime'),
        data: [3, 5, 2, 6, 4, 7, 8],
        borderColor: '#ff5454',
        backgroundColor: 'rgba(255, 84, 84, 0.1)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function renderEmptyCharts() {
  const chartIds = [
    'weeklyProgressChart',
    'timeDistributionChart',
    'habitsOverTimeChart'
  ];

  chartIds.forEach(chartId => {
    const ctx = document.getElementById(chartId);
    if (ctx) {
      if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
      }

      // Criar gráfico vazio
      ctx.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [t('empty.none')],
          datasets: [{
            label: t('empty.addRoutines'),
            data: [1],
            backgroundColor: '#e5e7eb'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  });
}

/* ===========================
   19) INICIALIZAÇÃO DA APLICAÇÃO
   =========================== */

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', init);

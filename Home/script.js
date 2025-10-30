/* =================================================================================
   script.js
   Versão: Comentada linha a linha (didática)
   Finalidade: Aplicativo de Rotinas (Lista / Quadro Kanban / Calendário)
   Nota: este arquivo assume que o HTML tem os IDs / templates apresentados anteriormente.
   ================================================================================= */

/* ===========================
   1) CONSTANTES E CONFIGURAÇÕES
   =========================== */

// Chave usada no localStorage para persistir os dados da aplicação
const STORAGE_KEY = 'routineAppData';

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
  modalQuickAdd: document.getElementById('modalQuickAdd'),
  quickAddForm: document.getElementById('quickAddForm'),
  quickTitle: document.getElementById('quickTitle'),
  quickDate: document.getElementById('quickDate'),
  quickPriority: document.getElementById('quickPriority'),
  quickTag: document.getElementById('quickTag'),
  modalAddTag: document.getElementById('modalAddTag'),
  addTagForm: document.getElementById('addTagForm'),
  tagName: document.getElementById('tagName'),
  tagColor: document.getElementById('tagColor'),
  calPrev: document.getElementById('calPrev'),
  calNext: document.getElementById('calNext'),
  calToday: document.getElementById('calToday'),
  calTitle: document.getElementById('calTitle'),
  calendarGrid: document.querySelector('.calendar-grid'),
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
  showEmail: document.getElementById('showEmail')
};

// Templates <template> do HTML (clonamos estes quando precisamos criar elementos)
const templates = {
  taskItem: document.getElementById('tplTaskItem'),
  boardCard: document.getElementById('tplBoardCard'),
  toast: document.getElementById('tplToast')
};

/* ===========================
   4) INICIALIZAÇÃO
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

  // Renderiza a interface inicial de acordo com a view selecionada
  render();
  // Inicializar gráficos se a view for 'todasRotinas' (case-insensitive)
  try {
    if (String(state.currentView).toLowerCase() === 'todasrotinas') {
      // chama initCharts com pequeno delay para garantir que o DOM da view esteja visível
      setTimeout(initCharts, 100);
    }
  } catch (err) {
    // se initCharts não existir ou der erro, não interrompe a navegação
    console.warn('initCharts não pôde ser chamado:', err);
  }
}

/* ===========================
   5) PERSISTÊNCIA (localStorage)
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
  } catch (err) {
    console.error('Erro ao salvar dados no storage:', err);
  }
}

/* ===========================
   6) UTILITÁRIOS (helpers)
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
      try { toast.remove(); } catch(e) {}
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
   7) CRUD DE ROTINAS (Add / Toggle / Open / Save / Delete / Duplicate)
   =========================== */

// Adiciona uma nova rotina ao estado e salva
function addNewRoutine({ title, description, date, time, priority, tag, status = 'todo', completed = false }) {
  // Validação mínima
  if (!title || !title.trim()) {
    showToast('O título é obrigatório.', 'error');
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
  showToast('Rotina adicionada com sucesso!', 'success');
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
    showToast('O título da rotina é obrigatório.', 'error');
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
  showToast('Rotina salva com sucesso!', 'success');
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
  showToast('Rotina excluída com sucesso!', 'info');
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
  showToast('Rotina duplicada com sucesso!', 'success');
}

/* ===========================
   8) GESTÃO DE ETIQUETAS (TAGS)
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
   9) FILTRAGEM E LISTAGEM DE TAREFAS
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
        td.setHours(0,0,0,0);
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
   10) RENDERIZAÇÃO (Lista / Quadro / Calendário / Config)
   =========================== */

// Atualiza título da view (ex.: Hoje, Calendário)
function updateViewTitle() {
  const titles = {
    'hoje': 'Hoje',
    'todasRotinas': 'Todas as Rotinas',
    'calendario': 'Calendário',
    'config': 'Configurações'
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
    empty.textContent = 'Nenhuma rotina encontrada';
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
    empty.textContent = 'Nenhuma rotina encontrada';
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
    default:
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
  }
}

/* ---------------------------
   10.1) Render - Quadro Kanban
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
   10.2) Render - Calendário
   --------------------------- */

// Renderiza o calendário do mês atual (state.currentDate)
function renderCalendar() {
  if (!DOM.calendarGrid || !DOM.calTitle) return;

  // Limpa grid
  DOM.calendarGrid.innerHTML = '';

  // Ano e mês atuais
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  // Nome do mês (em PT-BR, você pode trocar se quiser)
  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  DOM.calTitle.textContent = `${monthNames[month]} ${year}`;

  // Determina primeiro dia da semana do mês e quantidade de dias
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Cabeçalho (dias da semana)
  const dayNames = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
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
      // Pode truncar o título se for muito grande (ex.: 30 chars)
      ev.textContent = task.title.length > 30 ? task.title.slice(0, 27) + '...' : task.title;
      // Ao clicar no evento, abre detalhes
      ev.addEventListener('click', (e) => {
        e.stopPropagation(); // evita que o clique dispare outras ações
        openTaskDetails(task.id);
      });
      cell.appendChild(ev);
    });

    // Ao clicar no dia (fora de eventos), abre modal de adição rápida com a data preenchida
    cell.addEventListener('click', (e) => {
      // Se o clique for num evento, já tratamos acima
      if (e.target && e.target.matches('.calendar-event')) return;
      if (!DOM.modalQuickAdd || !DOM.quickDate) return;
      const dateStr = formatDateForInput(fullDate);
      DOM.quickDate.value = dateStr;
      if (DOM.modalQuickAdd.showModal) DOM.modalQuickAdd.showModal();
      if (DOM.quickTitle) DOM.quickTitle.focus();
    });
  }

  return cell;
}

/* ===========================
   11) CRIAÇÃO DE ELEMENTOS (task item e board card)
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
      dueEl.textContent = d.toLocaleDateString('pt-BR');
      // marca atraso se não concluída e data passada
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = 'Sem data';
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority'; // reset classes
    prioEl.textContent = task.priority === 'high' ? 'Alta' : (task.priority === 'low' ? 'Baixa' : 'Média');
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

  // Título
  const title = clone.querySelector('.card-title');
  if (title) title.textContent = task.title;

  // Due date
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString('pt-BR');
      const today = new Date(); today.setHours(0,0,0,0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = 'Sem data';
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority';
    prioEl.textContent = task.priority === 'high' ? 'Alta' : (task.priority === 'low' ? 'Baixa' : 'Média');
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
    actionButtons[1].textContent = task.completed ? 'Desfazer' : 'Concluir';
    actionButtons[1].addEventListener('click', () => toggleTaskCompletion(task.id));
  }

  // Drag start
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  return clone;
}

/* ===========================
   12) DRAG & DROP (Kanban)
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
  showToast(`Rotina movida para: ${newStatus === 'todo' ? 'A fazer' : newStatus === 'doing' ? 'Em progresso' : 'Concluído'}`, 'info');
}

/* ===========================
   13) CONFIGURAÇÕES E PREFERÊNCIAS
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
  showToast('Configurações salvas com sucesso!', 'success');
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
  showToast('Configurações restauradas para o padrão!', 'info');
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
   14) EVENTOS GERAIS E LIGAÇÕES
   =========================== */

// Configura todos os listeners de UI (botões, formulários, links, etc.)
function setupEventListeners() {
  // Toggle sidebar
  if (DOM.btnToggleSidebar) DOM.btnToggleSidebar.addEventListener('click', toggleSidebar);

  // Botão de adicionar rápida
  if (DOM.btnQuickAdd && DOM.modalQuickAdd) {
    DOM.btnQuickAdd.addEventListener('click', () => {
      if (DOM.modalQuickAdd.showModal) DOM.modalQuickAdd.showModal();
      if (DOM.quickTitle) DOM.quickTitle.focus();
    });
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

  // Quick add form (modal)
  if (DOM.quickAddForm) {
    DOM.quickAddForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Pega valores
      let dateValue = DOM.quickDate ? DOM.quickDate.value || undefined : undefined;
      // Corrige possíveis problemas de timezone ao criar ISO
      if (dateValue) {
        const [y, m, d] = dateValue.split('-');
        dateValue = new Date(y, parseInt(m,10)-1, d).toISOString().split('T')[0];
      }

      const formData = {
        title: DOM.quickTitle ? DOM.quickTitle.value.trim() : '',
        date: dateValue,
        priority: DOM.quickPriority ? DOM.quickPriority.value : 'medium',
        tag: DOM.quickTag ? normalizeTag(DOM.quickTag.value) : undefined
      };

      if (!formData.title) {
        showToast('O título é obrigatório.', 'error');
        return;
      }

      addNewRoutine(formData);
      DOM.quickAddForm.reset();
      if (DOM.modalQuickAdd.close) DOM.modalQuickAdd.close();
    });

    // Botão cancelar do modal (value="cancel")
    const cancelBtn = DOM.quickAddForm.querySelector('button[value="cancel"]');
    if (cancelBtn) cancelBtn.addEventListener('click', () => {
      DOM.quickAddForm.reset();
      if (DOM.modalQuickAdd.close) DOM.modalQuickAdd.close();
    });
  }

  // Formulário de adicionar tag
  if (DOM.addTagForm) {
    DOM.addTagForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = DOM.tagName ? DOM.tagName.value.trim() : '';
      const color = DOM.tagColor ? DOM.tagColor.value : '#888';
      if (!name) {
        showToast('O nome da etiqueta é obrigatório.', 'error');
        return;
      }
      addNewTag({ name, color });
      DOM.addTagForm.reset();
      if (DOM.modalAddTag.close) DOM.modalAddTag.close();
    });

    // Cancelar modal de tag
    const cancelTagBtn = DOM.addTagForm.querySelector('button[value="cancel"]');
    if (cancelTagBtn) cancelTagBtn.addEventListener('click', () => {
      DOM.addTagForm.reset();
      if (DOM.modalAddTag.close) DOM.modalAddTag.close();
    });
  }

  // Navegação do calendário (mudar mês)
  if (DOM.calPrev) DOM.calPrev.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
  });
  if (DOM.calNext) DOM.calNext.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
  });
  if (DOM.calToday) DOM.calToday.addEventListener('click', () => {
    state.currentDate = new Date();
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
   15) FUNÇÕES AUXILIARES (UI/Helpers)
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
  if (DOM.todayDate) DOM.todayDate.textContent = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  if (DOM.nowTime) DOM.nowTime.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
/* ===========================
   16) GRÁFICOS E VISUALIZAÇÕES
   =========================== */

// Referências aos gráficos
let weeklyChart, tagDistributionChart, habitsChart;

// Inicializar gráficos quando a view for carregada
function initCharts() {
  if (state.currentView === 'todasRotinas') {
    setTimeout(updateAllCharts, 100);
  }
}

// Atualizar todos os gráficos
function updateAllCharts() {
  updateWeeklyProgressChart();
  updateTagDistributionChart();
  updateHabitsOverTimeChart();
}

// Gráfico de Progresso Semanal
function updateWeeklyProgressChart() {
  const ctx = document.getElementById('weeklyProgressChart');
  if (!ctx) return;
  
  // Dados da semana atual
  const weekData = getWeeklyProgressData();
  
  // Destruir gráfico anterior se existir
  if (weeklyChart) {
    weeklyChart.destroy();
  }
  
  weeklyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Tarefas Concluídas',
        data: weekData,
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Tarefas Concluídas'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff'
        }
      }
    }
  });
}

// Obter dados de progresso semanal
function getWeeklyProgressData() {
  const today = new Date();
  const weekData = [0, 0, 0, 0, 0, 0, 0]; // Para cada dia da semana
  
  state.routines.forEach(task => {
    if (task.completed && task.date) {
      const taskDate = new Date(task.date + 'T00:00:00');
      const diffTime = today - taskDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Se a tarefa foi concluída nos últimos 7 dias
      if (diffDays >= 0 && diffDays < 7) {
        const dayOfWeek = taskDate.getDay(); // 0 = Domingo, 1 = Segunda, etc.
        // Ajustar para Segunda = 0, Domingo = 6
        const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        weekData[adjustedDay]++;
      }
    }
  });
  
  return weekData;
}

// Gráfico de Distribuição por Etiquetas
function updateTagDistributionChart() {
  const ctx = document.getElementById('tagDistributionChart');
  if (!ctx) return;
  
  const tagData = getTagDistributionData();
  
  if (tagDistributionChart) {
    tagDistributionChart.destroy();
  }
  
  tagDistributionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: tagData.labels,
      datasets: [{
        data: tagData.data,
        backgroundColor: tagData.colors,
        borderColor: tagData.borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true
          }
        }
      },
      cutout: '60%'
    }
  });
}

// Obter dados de distribuição por etiquetas
function getTagDistributionData() {
  const tagCounts = {};
  
  state.routines.forEach(task => {
    const tag = task.tag || 'Sem etiqueta';
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  
  // Ordenar por quantidade e pegar as principais
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6); // Máximo 6 etiquetas
  
  const labels = sortedTags.map(item => item[0]);
  const data = sortedTags.map(item => item[1]);
  
  // Cores baseadas nas etiquetas padrão
  const colorPalette = [
    'rgba(79, 70, 229, 0.8)',   // Pessoal
    'rgba(16, 185, 129, 0.8)',  // Trabalho
    'rgba(239, 68, 68, 0.8)',   // Saúde
    'rgba(245, 158, 11, 0.8)',  // Estudos
    'rgba(139, 92, 246, 0.8)',  // Extra 1
    'rgba(14, 165, 233, 0.8)'   // Extra 2
  ];
  
  const borderColors = colorPalette.map(color => color.replace('0.8', '1'));
  
  return {
    labels,
    data,
    colors: colorPalette.slice(0, labels.length),
    borderColors: borderColors.slice(0, labels.length)
  };
}

// Gráfico de Evolução de Hábitos
function updateHabitsOverTimeChart() {
  const ctx = document.getElementById('habitsOverTimeChart');
  if (!ctx) return;
  
  const habitsData = getHabitsOverTimeData();
  
  if (habitsChart) {
    habitsChart.destroy();
  }
  
  habitsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: habitsData
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Consistência (%)'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  });
}

// Obter dados de evolução de hábitos (dados simulados para demonstração)
function getHabitsOverTimeData() {
  // Para demonstração, vamos usar dados simulados
  // Em uma aplicação real, você coletaria dados históricos
  
  const currentMonth = new Date().getMonth();
  
  return [
    {
      label: 'Exercícios Físicos',
      data: generateSimulatedData(currentMonth, 65, 92),
      borderColor: 'rgba(67, 97, 238, 1)',
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Leitura',
      data: generateSimulatedData(currentMonth, 50, 85),
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Meditação',
      data: generateSimulatedData(currentMonth, 30, 80),
      borderColor: 'rgba(245, 158, 11, 1)',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.3,
      fill: true
    }
  ];
}

// Gerar dados simulados para demonstração
function generateSimulatedData(currentMonth, startValue, endValue) {
  const data = [];
  const totalMonths = 12;
  
  for (let i = 0; i < totalMonths; i++) {
    if (i <= currentMonth) {
      // Dados para meses passados (progressão linear)
      const progress = (endValue - startValue) * (i / currentMonth);
      data.push(Math.min(startValue + progress, endValue));
    } else {
      // Meses futuros (previsão)
      data.push(null);
    }
  }
  
  return data;
}

// Integrar com os filtros
function integrateChartsWithFilters() {
  // Atualizar gráficos quando filtros mudarem
  const filterLinks = document.querySelectorAll('.menu-link[data-filter]');
  filterLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(updateAllCharts, 100);
    });
  });
  
  // Botão de atualizar gráficos
  const refreshBtn = document.getElementById('btnRefreshCharts');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', updateAllCharts);
  }
  
  // Atualizar gráficos quando rotinas mudarem
  const originalSaveData = saveData;
  saveData = function() {
    originalSaveData.apply(this, arguments);
    if (state.currentView === 'todasRotinas') {
      setTimeout(updateAllCharts, 100);
    }
  };
}

init();

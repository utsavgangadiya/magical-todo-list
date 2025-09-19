document.addEventListener('DOMContentLoaded', () => {
  const orbContainer = document.getElementById('orb-container');
  const colors = ['bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-indigo-500', 'bg-cyan-400'];

  for (let i = 0; i < 12; i++) {
    const orb = document.createElement('div');
    const size = Math.random() * 120 + 60;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 20 + Math.random() * 25;
    const delay = Math.random() * 5;

    orb.classList.add(
      'absolute', 'rounded-full', 'opacity-20', 'blur-xl',
      'animate-pulse', color
    );

    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${posX}%`;
    orb.style.top = `${posY}%`;
    orb.style.transform = 'translate(-50%, -50%)';
    orb.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    orbContainer.appendChild(orb);
  }

  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('absolute', 'w-1', 'h-1', 'bg-white', 'rounded-full', 'animate-pulse');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    starsContainer.appendChild(star);
  }

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
      25% { transform: translate(-50%, -50%) translateY(-20px) rotate(3deg); }
      50% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
      75% { transform: translate(-50%, -50%) translateY(20px) rotate(-3deg); }
    }
  `;
  document.head.appendChild(style);

  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  loadTasks();

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  taskList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
      const listItem = target.closest('li');
      listItem.remove();
      saveTasks();
    } else if (target.tagName === 'LI' || target.closest('li')) {
      const listItem = target.closest('li');
      listItem.classList.toggle('line-through');
      listItem.classList.toggle('text-gray-400');
      saveTasks();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const listItem = document.createElement('li');
      listItem.className = 'flex items-center justify-between bg-white/20 p-4 rounded-xl cursor-pointer hover:bg-white/30 transition-all duration-200 text-white';
      listItem.innerHTML = `
        <span class="flex-1">${taskText}</span>
        <button class="delete-btn text-red-300 hover:text-red-100 font-bold ml-4 text-xl">
          &times;
        </button>
      `;
      taskList.appendChild(listItem);
      taskInput.value = '';
      saveTasks();
    }
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(listItem => {
      tasks.push({
        text: listItem.querySelector('span').textContent,
        completed: listItem.classList.contains('line-through')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        let classes = 'flex items-center justify-between bg-white/20 p-4 rounded-xl cursor-pointer hover:bg-white/30 transition-all duration-200 text-white';
        if (task.completed) {
          classes += ' line-through text-gray-400';
        }
        listItem.className = classes;
        listItem.innerHTML = `
          <span class="flex-1">${task.text}</span>
          <button class="delete-btn text-red-300 hover:text-red-100 font-bold ml-4 text-xl">
            &times;
          </button>
        `;
        taskList.appendChild(listItem);
      });
    }
  }
});
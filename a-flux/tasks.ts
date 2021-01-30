/**
 * реализация планировщика задач
 *
 * имеет две очереди, с высоким приоритетом и низким
 * */
export function createTaskManager(MAX_FPS = 50) {
  let lowPriority: Function[] = [];
  let highPriority: (() => Promise<void>)[] = [];

  let lowPriorityTime = performance.now()

  function addLowPriorityTask(task: Function) {
    if (!lowPriority.length) {
      lowPriorityTime = performance.now()
    }

    lowPriority.push(task);
  }

  let highPriorityStarted = false;
  let highPriorityPacketExecutionStart = performance.now();

  // выполнение высокоприоритетной задачи из очереди
  function executeHighPriority() {
    // выполнение происходит в микротасках с высоким приоритетом и если
    // его не прерывать - всё будет выглядеть зависшим. поэтому прерываем выполнение если оно длится слишком долго
    if (performance.now() - highPriorityPacketExecutionStart < (1000 / MAX_FPS)) {
      const task = highPriority.shift();

      if (task) {
        task().then(
          executeHighPriority,
          executeHighPriority,
        )
      } else {
        highPriorityStarted = false;
      }
    } else {
      setTimeout(
        () => {
          highPriorityPacketExecutionStart = performance.now();
          executeHighPriority();
        },
        0
      )
    }
  }

  function addHighPriorityTask(task: () => Promise<void>) {
    highPriority.push(task);

    if (!highPriorityStarted) {
      highPriorityStarted = true;

      //для единообразного выполнения откладываем запуск в микротаски
      new Promise(resolve => resolve()).then(
        () => {
          highPriorityPacketExecutionStart = performance.now();
          executeHighPriority();
        }
      )
    }
  }

  // таймер в котором исполняются низкоприоритетные задачи
  let timerId: ReturnType<typeof setTimeout>;

  // выполнение низкоприоритетных задач по таймеру
  function executeLowPriority() {
    try {
      if (lowPriority.length && ((performance.now() - lowPriorityTime) > (1000 / MAX_FPS))) {
        const task = lowPriority.shift() as Function;
        task();
        lowPriorityTime = performance.now()
      }
    } finally {
      timerId = setTimeout(
        executeLowPriority,
        0
      )
    }
  }

  timerId = setTimeout(
    executeLowPriority,
    0
  )

  function shutdown() {
    clearTimeout(timerId);
  }

  return {
    addHighPriorityTask,
    addLowPriorityTask,
    shutdown
  }
}

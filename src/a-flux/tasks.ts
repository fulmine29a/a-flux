/**
 * реализация планировщика задач
 *
 * имеет две очереди, с высоким приоритетом и низким
 * */
export function createTaskManager() {
  let lowPriority: Function[] = [];
  let highPriority: Function[] = [];

  function addHighPriorityTask(task: Function) {
    highPriority.push(task);
  }

  function addLowPriorityTask(task: Function) {
    lowPriority.push(task);
  }

  // таймер в котором исполняются задачи
  let timerId: ReturnType<typeof setTimeout>;

  // флаг ожидание завершения асинхронной задачи с низким приоритетом
  let highPriorityTaskInProgress = false;
  let highPriorityTaskCycles = 0;

  // действия при старте асинхронной задачи с высоким приоритетом
  function highPriorityTaskStart() {
    highPriorityTaskInProgress = true;
    highPriorityTaskCycles = 0;
  }

  // действия при завершении асинхронной задачи с высоким приоритетом
  function highPriorityTaskEnd() {
    highPriorityTaskInProgress = false;
  }

  let lowPriorityWaitCount = 0;

  // запуск низкоприоритетной задачи
  function runLowPriorityTask() {
    lowPriorityWaitCount = 0;

    const task = lowPriority.shift();
    if (task) {
      task();
    }
  }

  function executeTasks() {
    try {
      // если ждём завершения асинхронной высокоприоритетной задачи
      if (highPriorityTaskInProgress) {

        // если приоритетная задача выполняется долго, пропускаем низкоприоритетную
        if (++highPriorityTaskCycles > 3) {
          runLowPriorityTask();
          highPriorityTaskCycles = 0;
        }
      } else {
        // если слишком долго не выполняли задачи с низким приоритетом
        if (lowPriorityWaitCount > 30) {
          runLowPriorityTask();
        }

        //если есть задачи с высоким приоритетом
        if (highPriority.length) {
          for (let i = 0; i < 5; i++) {
            let task = highPriority.shift();

            if (task) {
              lowPriorityWaitCount++;

              const taskResult = task();

              // если выполняем асинхронную функцию
              if (taskResult.then && typeof taskResult.then === "function") {
                highPriorityTaskStart();

                taskResult.then(
                  highPriorityTaskEnd,
                  highPriorityTaskEnd
                )

                break;
              }
            } else {
              runLowPriorityTask();
              break
            }
          }
        } else {
          runLowPriorityTask();
        }
      }
    } finally {
      timerId = setTimeout(
        executeTasks,
        0
      )
    }
  }

  timerId = setTimeout(
    executeTasks,
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

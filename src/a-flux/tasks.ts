/**
 * реализация планировщика задач
 *
 * имеет две очереди, с высоким приоритетом и низким
 * */
export function createTaskManager(){
  let lowPriority:Function[] = [];
  let highPriority:Function[] = [];

  function addHighPriority(task: Function){
    highPriority.push(task);
  }

  function addLowPriority(task: Function){
    lowPriority.push(task);
  }
  
  let timerId: ReturnType<typeof setTimeout>;

  async function executeTasks(){
    try {
      for (let i = 0; i < 5; i++) {
        let task = highPriority.shift() || lowPriority.shift();

        if (task) {
          await task();
        } else {
          break
        }
      }
    }finally {
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

  function shutdown(){
    clearTimeout(timerId);
  }

  return {
    addHighPriority,
    addLowPriority,
    shutdown
  }
}

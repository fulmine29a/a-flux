/*
  реализация подписки
 */
export function createSubscribeNode(){
  let subscribers:(() => void)[] = [];

  function subscribe(cb: () => void){
    subscribers.push(cb);

    return () => subscribers = subscribers.filter(subscriber => subscriber != cb);
  }

  function emit(){
    subscribers.forEach(subscriber => subscriber())
  }

  return {
    subscribe,
    emit,
  }
}

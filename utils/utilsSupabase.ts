// utils/supabaseRetry.ts

// Envuelve cualquier promesa con timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("TIMEOUT"));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Intenta la función promiseFn, y si da TIMEOUT, reintenta hasta `retriesLeft` veces
async function retryOnTimeout<T>(
  promiseFn: () => Promise<T>,
  timeoutMs: number,
  retriesLeft: number = 1
): Promise<T> {
  try {
    return await withTimeout(promiseFn(), timeoutMs);
  } catch (err: any) {
    if (err.message === "TIMEOUT" && retriesLeft > 0) {
      console.warn(
        `Petición superó ${timeoutMs} ms, reintentando… (${retriesLeft} restante)`
      );
      return retryOnTimeout(promiseFn, timeoutMs, retriesLeft - 1);
    }
    // si no es timeout o ya no quedan reintentos, propaga el error
    throw err;
  }
}

export { withTimeout, retryOnTimeout };

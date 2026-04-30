import { STORAGE_KEYS } from "../utils/storageKeys";

function createAbortError() {
  const error = new Error("The request was aborted.");
  error.name = "AbortError";
  return error;
}

function cloneValue(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

export async function simulateRequest(factory, options = {}) {
  const { delay = 450, signal } = options;

  if (signal?.aborted) {
    throw createAbortError();
  }

  await new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, delay);

    function handleAbort() {
      window.clearTimeout(timeoutId);
      reject(createAbortError());
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });

  if (window.localStorage.getItem(STORAGE_KEYS.forceApiError) === "true") {
    throw new Error("Simulated API failure. Disable it in Settings and try again.");
  }

  return cloneValue(factory());
}

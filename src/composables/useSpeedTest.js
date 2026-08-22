import { reactive, toRefs } from 'vue';

const DOWN_URL = 'https://speed.cloudflare.com/__down';
const UP_URL = 'https://speed.cloudflare.com/__up';

const PING_SAMPLES = 6;
const DOWNLOAD_CHUNKS = [1_000_000, 5_000_000, 15_000_000, 30_000_000];
const UPLOAD_CHUNKS = [500_000, 2_000_000, 5_000_000, 10_000_000];

function randomBytes(n) {
  const arr = new Uint8Array(n);
  const MAX = 65536;
  for (let i = 0; i < n; i += MAX) {
    crypto.getRandomValues(arr.subarray(i, Math.min(i + MAX, n)));
  }
  return arr;
}

export function useSpeedTest() {
  const state = reactive({
    phase: 'idle', // idle | ping | download | upload | done | error
    progress: 0,
    ping: null,
    jitter: null,
    downloadMbps: null,
    uploadMbps: null,
    liveMbps: 0,
    server: null,
    error: null
  });

  let controller = null;

  async function measurePing() {
    const samples = [];
    for (let i = 0; i < PING_SAMPLES; i++) {
      const t0 = performance.now();
      await fetch(`${DOWN_URL}?bytes=0&r=${Math.random()}`, { cache: 'no-store', signal: controller.signal });
      samples.push(performance.now() - t0);
    }
    const usable = samples.slice(1);
    const avg = usable.reduce((a, b) => a + b, 0) / usable.length;
    const jitter = Math.sqrt(usable.reduce((a, t) => a + (t - avg) ** 2, 0) / usable.length);
    state.ping = Math.round(avg * 10) / 10;
    state.jitter = Math.round(jitter * 10) / 10;
  }

  async function measureDownload() {
    const overallStart = performance.now();
    let totalBytes = 0;
    for (let i = 0; i < DOWNLOAD_CHUNKS.length; i++) {
      const size = DOWNLOAD_CHUNKS[i];
      const res = await fetch(`${DOWN_URL}?bytes=${size}&r=${Math.random()}`, {
        cache: 'no-store',
        signal: controller.signal
      });
      if (!res.ok) throw new Error('download-failed');
      if (!state.server) {
        state.server = {
          ip: res.headers.get('cf-meta-ip'),
          city: res.headers.get('city'),
          country: res.headers.get('country'),
          colo: res.headers.get('colo')
        };
      }
      const reader = res.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.length;
        const elapsed = (performance.now() - overallStart) / 1000;
        if (elapsed > 0) state.liveMbps = (totalBytes * 8) / elapsed / 1e6;
      }
      state.progress = 10 + ((i + 1) / DOWNLOAD_CHUNKS.length) * 45;
    }
    const seconds = (performance.now() - overallStart) / 1000;
    state.downloadMbps = Math.round(((totalBytes * 8) / seconds / 1e6) * 10) / 10;
  }

  function uploadChunk(body, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', UP_URL, true);
      xhr.upload.onprogress = (e) => onProgress(e.loaded);
      xhr.onload = () => resolve();
      xhr.onerror = () => reject(new Error('upload-failed'));
      xhr.onabort = () => reject(new Error('aborted'));
      controller.signal.addEventListener('abort', () => xhr.abort());
      xhr.send(body);
    });
  }

  async function measureUpload() {
    const overallStart = performance.now();
    let completedBytes = 0;
    for (let i = 0; i < UPLOAD_CHUNKS.length; i++) {
      const size = UPLOAD_CHUNKS[i];
      const body = randomBytes(size);
      await uploadChunk(body, (loaded) => {
        const elapsed = (performance.now() - overallStart) / 1000;
        if (elapsed > 0) state.liveMbps = ((completedBytes + loaded) * 8) / elapsed / 1e6;
      });
      completedBytes += size;
      state.progress = 55 + ((i + 1) / UPLOAD_CHUNKS.length) * 45;
    }
    const seconds = (performance.now() - overallStart) / 1000;
    state.uploadMbps = Math.round(((completedBytes * 8) / seconds / 1e6) * 10) / 10;
  }

  async function start() {
    controller = new AbortController();
    Object.assign(state, {
      phase: 'ping',
      progress: 0,
      ping: null,
      jitter: null,
      downloadMbps: null,
      uploadMbps: null,
      liveMbps: 0,
      server: null,
      error: null
    });
    try {
      await measurePing();
      state.progress = 10;
      state.phase = 'download';
      state.liveMbps = 0;
      await measureDownload();
      state.phase = 'upload';
      state.liveMbps = 0;
      await measureUpload();
      state.phase = 'done';
      state.progress = 100;
    } catch (e) {
      if (e.name === 'AbortError' || e.message === 'aborted') {
        state.phase = 'idle';
      } else {
        state.error = 'No pudimos completar la prueba. Verifica tu conexión e inténtalo de nuevo.';
        state.phase = 'error';
      }
    }
  }

  function cancel() {
    if (controller) controller.abort();
  }

  return { ...toRefs(state), start, cancel };
}

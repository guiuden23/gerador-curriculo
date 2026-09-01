/**
 * Fetch HTTP no servidor.
 *
 * Em produção (Netlify/Node 20+) usa `fetch` nativo.
 * Em rede corporativa com proxy TLS, defina INSECURE_TLS=1 no .env.local —
 * nesse caso carrega undici em runtime (import dinâmico) para ignorar certificado.
 */
type ServerFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

let insecureFetchPromise: Promise<ServerFetch> | null = null;

async function getInsecureFetch(): Promise<ServerFetch> {
  if (!insecureFetchPromise) {
    insecureFetchPromise = (async () => {
      const { Agent, fetch: undiciFetch } = await import("undici");
      const agent = new Agent({ connect: { rejectUnauthorized: false } });
      return (input, init) =>
        undiciFetch(input as string, {
          ...init,
          dispatcher: agent,
        } as Parameters<typeof undiciFetch>[1]) as unknown as Promise<Response>;
    })();
  }
  return insecureFetchPromise;
}

export async function serverFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  if (process.env.INSECURE_TLS === "1") {
    const insecureFetch = await getInsecureFetch();
    return insecureFetch(input, init);
  }
  return fetch(input, init);
}

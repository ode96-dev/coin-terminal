'server-only'
import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY as string

if (!BASE_URL) throw new Error('Could not get the base url')
if (!API_KEY) throw new Error('Could not get the API_KEY')


/**
 * Fetches JSON from the configured API by calling the specified endpoint with optional query parameters.
 *
 * @param endpoint - Path appended to the configured BASE_URL (do not rely on leading/trailing slash).
 * @param params - Optional query parameters to include; empty strings and `null` values are omitted.
 * @param revalidate - Cache revalidation time in seconds applied to the request.
 * @returns The parsed JSON response body as `T`.
 * @throws Error if the HTTP response is not OK; the thrown message contains the status and API error detail.
 */
export async function fetcher<T>(
    endpoint: string,
    params?: QueryParams,
    revalidate: number = 60,

): Promise<T> {
    const url = qs.stringifyUrl({
        url: `${BASE_URL}/${endpoint}`,
        query: params
    }, {
        skipEmptyString: true,
        skipNull: true
    })

    const response = await fetch(url, {
        headers: {
            "x-cg-demo-api-key": API_KEY,
            "Content-Type": "application/json"
        } as Record<string, string>,
        next: { revalidate }
    });

    console.log("[response]", response)

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        // LOG THIS: It usually contains the specific reason (e.g., "invalid parameter")
        console.error("CoinGecko API Error Detail:", errorBody);

        throw new Error(`API Error: ${response.status}:${errorBody.error || response.statusText}`);
    }

    return response.json()
}
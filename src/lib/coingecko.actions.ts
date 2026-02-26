'server-only'
import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3"
const API_KEY = process.env.COINGECKO_API_KEY as string

if (!BASE_URL) throw new Error('Could not get the base url')
if (!API_KEY) throw new Error('Could not get the API_KEY')


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

export async function getPools(
    id: string,
    network?: string | null,
    contractAddress?: string | null
): Promise<PoolData> {
    const fallback: PoolData = {
        id: "",
        address: "",
        name: "",
        network: "",
    };

    if (network && contractAddress) {
        const poolData = await fetcher<{ data: PoolData[] }>(
            `onchain/networks/${network}/tokens/${contractAddress}/pools`
        );

        return poolData.data?.[0] ?? fallback;
    }

    try {
        const poolData = await fetcher<{ data: PoolData[] }>(
            "onchain/search/pools",
            { query: id }
        );

        return poolData.data?.[0] ?? fallback;
    } catch {
        return fallback;
    }
}
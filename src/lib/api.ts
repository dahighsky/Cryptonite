export async function getData(coinIds: string[]) {
  const options = { method: "GET", headers: { accept: "application/json" } };

  const params = new URLSearchParams({
    vs_currency: "usd",
    ids: coinIds.join(","),
    order: "market_cap_desc",
    per_page: coinIds.length.toString(),
    page: "1",
    sparkline: "false",
  });

  const url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

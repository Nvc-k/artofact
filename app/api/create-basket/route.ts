import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageId, username } = body;

    if (!packageId || !username) {
      return NextResponse.json(
        { error: "Missing packageId or username" },
        { status: 400 }
      );
    }

    const privateKey = process.env.TEBEX_PRIVATE_KEY;
    const accountId = process.env.TEBEX_ACCOUNT_ID;

    if (!privateKey || !accountId) {
      console.warn("Using mock checkout url because Tebex keys are missing.");
      return NextResponse.json({
        links: { checkout: "https://artifact-smp.tebex.io/checkout" }
      });
    }

    const auth = Buffer.from(`${privateKey}:`).toString("base64");
    const url = `https://headless.tebex.io/api/accounts/${accountId}/baskets`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        packages: [
          {
            id: packageId,
            quantity: 1,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Tebex API error:", errorData);
      return NextResponse.json(
        { error: "Basket creation failed" },
        { status: 500 }
      );
    }

    const basket = await response.json();
    return NextResponse.json(basket);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

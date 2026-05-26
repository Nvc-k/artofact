import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const packageId = body.packageId;

    if (!packageId) {
      return NextResponse.json(
        { error: "Missing packageId" },
        { status: 400 }
      );
    }

    const privateKey = process.env.TEBEX_PRIVATE_KEY;
    const accountId = process.env.TEBEX_ACCOUNT_ID;

    // Fallback: If Tebex credentials are not configured, return a mock checkout link
    if (!privateKey || !accountId) {
      console.warn("Tebex credentials not configured. Returning mock checkout URL.");
      return NextResponse.json({
        links: {
          checkout: `/pitch-success?packageId=${packageId}`
        }
      });
    }

    // Basic authentication with private key
    const auth = Buffer.from(`${privateKey}:`).toString("base64");
    const url = `https://headless.tebex.io/api/accounts/${accountId}/baskets`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packages: [
          {
            id: packageId,
            quantity: 1,
          },
        ],
        // Optionally configure redirect links:
        // complete_url: "https://yourdomain.com/thank-you",
        // cancel_url: "https://yourdomain.com/store",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Tebex API error response:", errorData);
      return NextResponse.json(
        { error: "Basket creation failed" },
        { status: 500 }
      );
    }

    const basket = await response.json();
    return NextResponse.json(basket);
  } catch (error) {
    console.error("Server error creating Tebex basket:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

const MOCK_PACKAGES = [
  // One-time Ranks
  {
    id: 7323479,
    name: "Artifact (Lifetime)",
    price: 10.47,
    type: "single",
    description: "Secure the base Artifact rank and stand out in the server with name tags, extra homes, and a daily kit of crate keys.",
    perks: [
      "Artifact name color & TAB priority",
      "Custom chat color",
      "3 extra homes",
      "Artifact kit every 24h (contains 2 keys)",
      "Bypass chat cooldown",
      "Access to kill effects",
      "/string cooldown: 30 seconds"
    ]
  },
  {
    id: 7323483,
    name: "Artifact+ (Lifetime)",
    price: 17.53,
    type: "single",
    description: "Get the ultimate Artifact+ rank. Enjoy faster cooldowns, exclusive Discord role integration, and daily Lumen key packages.",
    perks: [
      "Artifact+ name color & TAB priority",
      "Artifact+ Discord role",
      "Custom chat color",
      "3 extra homes",
      "Artifact+ kit every 24h (Lumen+ & Lumen key)",
      "Bypass chat cooldown",
      "Access to kill effects",
      "/string cooldown: 15 seconds"
    ]
  },
  // Subscriptions Ranks
  {
    id: 7438077,
    name: "Artifact Monthly",
    price: 5.80,
    type: "subscription",
    description: "Secure the base Artifact rank perks on a recurring monthly plan. Keep the benefits active month-over-month.",
    perks: [
      "Artifact name color & TAB priority",
      "Custom chat color",
      "3 extra homes",
      "Artifact kit every 24h (contains 2 keys)",
      "Bypass chat cooldown",
      "Access to kill effects",
      "/string cooldown: 30 seconds"
    ]
  },
  {
    id: 7438082,
    name: "Artifact+ Monthly",
    price: 10.02,
    type: "subscription",
    description: "Unlock the ultimate Artifact+ rank perks on a monthly subscription. The best value for competitive SMP survival.",
    perks: [
      "Artifact+ name color & TAB priority",
      "Artifact+ Discord role",
      "Custom chat color",
      "3 extra homes",
      "Artifact+ kit every 24h (Lumen+ & Lumen key)",
      "Bypass chat cooldown",
      "Access to kill effects",
      "/string cooldown: 15 seconds"
    ]
  },
  // Crate Keys
  {
    id: 7323582,
    name: "Playtime Key",
    price: 2.37,
    type: "single",
    description: "Get a Playtime Key, used to open the Playtime Crate!",
    perks: []
  },
  {
    id: 7323584,
    name: "AFK Key",
    price: 4.04,
    type: "single",
    description: "Get an AFK Key, used to open the AFK Crate!",
    perks: []
  },
  {
    id: 7337367,
    name: "Artifact Crate Key",
    price: 4.30,
    type: "single",
    description: "Get an Artifact Key, used to open the Artifact Crate!",
    perks: []
  }
];

export async function GET() {
  const publicToken = process.env.TEBEX_PUBLIC_TOKEN;
  const accountId = process.env.TEBEX_ACCOUNT_ID;

  // Fallback to mock packages if env keys are not provided
  if (!publicToken || !accountId) {
    console.warn("Tebex keys not configured in .env.local - returning mock fallback packages.");
    return NextResponse.json(MOCK_PACKAGES);
  }

  try {
    const res = await fetch(
      `https://headless.tebex.io/api/accounts/${accountId}/packages`,
      {
        headers: {
          "X-Tebex-Token": publicToken,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to load store products from Tebex API (status: ${res.status})`);
    }

    const data = await res.json();
    
    // Map Tebex API items to our visual models, keeping live perks matching if we can
    // If Tebex does not return perks, inject the scraped perks by name matching!
    const mapped = data.map((pkg: any) => {
      const mockPkg = MOCK_PACKAGES.find((m) => m.id === pkg.id || pkg.name.toLowerCase().includes(m.name.toLowerCase().split(" ")[0]));
      return {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        type: pkg.type === "subscription" ? "subscription" : "single",
        description: pkg.description || mockPkg?.description || "",
        perks: mockPkg?.perks || [],
        image: (mockPkg as any)?.image
      };
    });

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Tebex API error, falling back to mock packages:", error);
    return NextResponse.json(MOCK_PACKAGES);
  }
}

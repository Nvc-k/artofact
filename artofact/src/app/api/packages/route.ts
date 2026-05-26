import { NextResponse } from "next/server";

export interface Package {
  id: number;
  name: string;
  price: number;
  type: "single" | "subscription";
  description: string;
  perks?: string[];
}

const MOCK_PACKAGES: Package[] = [
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
      "Bypass chat cooldown"
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
      "Artifact+ kit every 24h (Lumen+ & Lumen key)"
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
    
    const mapped = data.map((pkg: any) => {
      const mockPkg = MOCK_PACKAGES.find((m) => m.id === pkg.id || pkg.name.toLowerCase().includes(m.name.toLowerCase().split(" ")[0]));
      return {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        type: pkg.type === "subscription" ? "subscription" : "single",
        description: pkg.description || mockPkg?.description || "",
        perks: mockPkg?.perks || [],
      };
    });

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Tebex API error, falling back to mock packages:", error);
    return NextResponse.json(MOCK_PACKAGES);
  }
}

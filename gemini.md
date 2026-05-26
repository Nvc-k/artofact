THE SERVER NAME IS ARTIFACTSMP 





## 📁 Complete File Structure

```
my-tebex-store/
├── .env.local
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── create-basket/
│           └── route.ts
└── components/
    └── ProductCard.tsx
```

Just create these files in your Next.js project (if you used `create-next-app`, many of the config files already exist – just replace or add the missing pieces).

---

## 🔧 Prerequisites

1. **Tebex account** with products already created:
   - **Subscription ranks**: set the package **Type** to `Subscription` and define the billing interval.
   - **One‑time keys**: set the package **Type** to `Single` and link it to a **Key List** (created under **Keys > Create Key List**).
2. **Your Tebex API credentials** from the [Creator Panel](https://creator.tebex.io/) → **Developers > API Keys**.
3. **A Vercel account** (to deploy the app securely).
4. **Node.js 18+** installed locally.

---

## 📦 1. Environment Variables

Create `.env.local` in the project root:

```bash
TEBEX_PUBLIC_TOKEN=your_public_token_here
TEBEX_PRIVATE_KEY=your_private_key_here
TEBEX_ACCOUNT_ID=123456
```

- **`TEBEX_PUBLIC_TOKEN`** – the token visible in the Tebex dashboard. We’ll use it **only on the server** (not exposed to the browser).
- **`TEBEX_PRIVATE_KEY`** – never leaves the server; used for basket creation.
- **`TEBEX_ACCOUNT_ID`** – your numeric account ID (you can find it in the URL when logged into Tebex: `https://creator.tebex.io/accounts/123456`).

When you deploy to Vercel, add these exact same variables in **Settings > Environment Variables** – they will be encrypted and injected into serverless functions automatically.

---

## 💻 2. All Code – Copy and Paste

### `package.json` (only essential dependencies)

```json
{
  "name": "my-tebex-store",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8"
  }
}
```

If you generated the project with `create-next-app`, this is already set. Just make sure `tailwindcss`, `autoprefixer`, and `postcss` are installed.

### `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
```

### `tsconfig.json`

Leave the default generated one – it’s fine.

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

### `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-900 text-white;
}
```

### `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minecraft Store – Ranks & Keys",
  description: "Buy ranks and keys securely",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
```

### `app/page.tsx` – The Storefront (Server Component)

This is the main page. It fetches your packages from Tebex **on the server**, then passes them to the `ProductCard` client component. The public token is used only here, never sent to the browser.

```tsx
import ProductCard from "@/components/ProductCard";

// The shape of a Tebex package
interface Package {
  id: number;
  name: string;
  price: number;
  type: "single" | "subscription";
  description: string;
  image?: string;
}

// Fetch all packages from Tebex Headless API
async function getPackages(): Promise<Package[]> {
  const res = await fetch(
    `https://headless.tebex.io/api/accounts/${process.env.TEBEX_ACCOUNT_ID}/packages`,
    {
      headers: {
        "X-Tebex-Token": process.env.TEBEX_PUBLIC_TOKEN!,
      },
      cache: "no-store", // you can change this if you want caching
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load store products");
  }

  return res.json();
}

export default async function StorePage() {
  const packages = await getPackages();

  // Separate subscription ranks and one‑time keys
  const subscriptionRanks = packages.filter((p) => p.type === "subscription");
  const oneTimeKeys = packages.filter((p) => p.type === "single");

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16">
        Minecraft Store
      </h1>

      {/* Subscription Ranks Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-2">
          🔁 Subscription Ranks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptionRanks.map((pkg) => (
            <ProductCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* One‑Time Keys Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-2">
          🔑 One‑Time Keys
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {oneTimeKeys.map((pkg) => (
            <ProductCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
    </main>
  );
}
```

### `components/ProductCard.tsx` – Client Component with Purchase Button

This component is responsible for the “Buy Now” action. It calls your **serverless API route** to create a basket and then redirects to the Tebex checkout.

```tsx
"use client";

import { useState } from "react";

interface Package {
  id: number;
  name: string;
  price: number;
  type: "single" | "subscription";
  description: string;
}

export default function ProductCard({ pkg }: { pkg: Package }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to create basket");
      }

      const basket = await res.json();

      // The checkout URL is provided by Tebex
      if (basket.links?.checkout) {
        window.location.href = basket.links.checkout;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
      <p className="text-gray-400 flex-grow mb-4">{pkg.description}</p>
      <div className="text-2xl font-bold mb-4">
        ${pkg.price}
        {pkg.type === "subscription" && (
          <span className="text-sm font-normal text-gray-400">/month</span>
        )}
      </div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`w-full py-3 px-4 rounded font-semibold transition-colors ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500"
        }`}
      >
        {loading ? "Redirecting..." : "Buy Now"}
      </button>
    </div>
  );
}
```

### `app/api/create-basket/route.ts` – The Secure Basket Endpoint

This is a Vercel serverless function that **never** exposes your private key to the client. It creates a Tebex basket and returns the checkout URL.

```ts
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

    // Basic authentication with your private key
    const auth = Buffer.from(
      `${process.env.TEBEX_PRIVATE_KEY}:`
    ).toString("base64");

    const url = `https://headless.tebex.io/api/accounts/${process.env.TEBEX_ACCOUNT_ID}/baskets`;

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
            // For subscriptions you can omit, or set "type" if needed
          },
        ],
        // Optionally, you can set redirect URLs for success/cancel
        // complete_url: "https://yourdomain.com/thank-you",
        // cancel_url: "https://yourdomain.com/store",
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
```

---

## 🧪 3. Setting Up Tebex Products (Just to Confirm)

Make sure your Tebex packages are configured like this:

- **For subscription ranks**:  
  - Package **Type** = `Subscription`  
  - Billing period = whatever you choose (e.g., monthly)  
  - Description and price as desired.

- **For one‑time keys**:  
  - Package **Type** = `Single`  
  - Under **Settings**, turn **Key Delivery** ON and select an existing key list.  
  - If you don’t have a key list, create one under **Keys > Create Key List** and upload a `.txt` file with one key per line.

After a successful payment, Tebex automatically:
- Adds the subscription to the player’s account (for ranks).
- Delivers a key from your list (for keys).

---

## 🔒 4. Security Checklist

- ✅ The **private key** is used **only** inside the API route (`create-basket`) – never exposed to the browser.
- ✅ The **public token** is used only in `page.tsx`, which runs on the server; it’s not sent to the client.
- ✅ The basket creation endpoint verifies that a `packageId` was provided. (You can add an extra validation step by checking against your package list if you want.)
- ✅ All sensitive data is stored in Vercel environment variables, encrypted at rest and in transit.
- ✅ HTTPS is automatically provided by Vercel.

**Bonus**: Disable the default Tebex storefront once your custom store is live:  
Go to **Tebex Creator Panel → Settings → Webstore → Store Status** and set it to **Disabled**. This keeps the backend active but hides the default shop from players.

---

## 🚀 5. Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Import the project into Vercel.
3. During setup, add the three environment variables (`TEBEX_PUBLIC_TOKEN`, `TEBEX_PRIVATE_KEY`, `TEBEX_ACCOUNT_ID`).
4. Deploy! Your custom store is now live.

**Local testing**:  
Run `npm run dev` and visit `http://localhost:3000`. You can use Tebex’s **sandbox mode** to test purchases without real money – enable it in the Tebex panel under **Settings > Sandbox**.

---

## 📌 How It All Works – The Flow

1. **Player visits your store** → `page.tsx` fetches all packages from Tebex using the public token (server‑side).
2. **Player clicks “Buy Now”** → the client component `ProductCard.tsx` calls your API route `/api/create-basket` with the `packageId`.
3. **API route** securely creates a Tebex basket using the private key and returns a checkout URL.
4. **Client redirects** to Tebex’s hosted checkout, where the player completes payment. Tebex handles all payment processing (PCI compliant).
5. **After payment**: Tebex delivers the subscription or key automatically to the player in‑game (you must have your Minecraft server properly linked in Tebex).

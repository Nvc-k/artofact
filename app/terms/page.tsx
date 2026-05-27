import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#0A0A09] text-[#FCFBF7] overflow-hidden">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-32 font-sans text-sm leading-relaxed text-gray-300">
        <h1 className="font-serif text-4xl text-white mb-8">Tebex Terms & Conditions</h1>
        
        <p className="mb-4">This page, together with our Privacy Policy and General Website Terms & Conditions, tells you information about us and informs you of the legal terms and conditions (the &quot;Terms&quot;) which govern your use of our (&quot;Seller&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;) webstore (the &quot;Webstore&quot;).</p>
        
        <p className="mb-4">These Terms will apply to any contract between you and the Us in respect of your purchase of video game related products, items and other content (&quot;Products&quot;) on the Webstore (&quot;Contract&quot;).</p>
        
        <p className="mb-4">Please read these Terms carefully and make sure that you understand them before ordering from the Webstore. Please note that before placing an order you will be asked to agree to these Terms. If you refuse to accept these Terms, you will not be able to place an order.</p>

        <h2 className="font-serif text-2xl text-white mt-12 mb-4">Information about us</h2>
        <p className="mb-4">We are a Licensed seller for goods for this game, game server or Discord server (&quot;Platform&quot;). We buy licenses for the use of digital goods and software from the Platform which we sell to end-customers. We are Tebex Limited t/a Tebex, a company registered in England and Wales with company number 08129184...</p>

        <h2 className="font-serif text-2xl text-white mt-12 mb-4">Contacting us</h2>
        <p className="mb-4">If you wish to contact us for technical support, you need to report fraudulent activity, or that a Platform is breaching our or a partner&apos;s AUP, you can contact us by visiting https://www.tebex.io/contact/checkout.</p>

        <h2 className="font-serif text-2xl text-white mt-12 mb-4">The Webstore and Products</h2>
        <p className="mb-4">All title, ownership rights and intellectual property rights in the Webstore are owned by Us. All title, ownership rights and intellectual property rights in the Products are owned by the Platform and licenses to use the Products are sold to Us. We, the Platform and our licensors reserve all rights in national and international law to protect such rights in the event of any violation of these terms by you.</p>

        <p className="mb-4">Purchases from Us are payments for licenses to use the digital virtual items contained in the purchase. This transaction is final and there are no refunds. If you are banned for breaking the rules of the Platform, you will not be refunded this money. Bans are subject to the full discretion of the Platform, and their rules can be changed at any time. There is no guarantee on being able to access the Platform, and if the server is no longer operated the virtual items are forfeit. All items are virtual and have no value, and cannot be exchanged for real-world currency of any kind.</p>

        <div className="mt-16 text-center text-xs text-gray-500">
          <p>Tebex Limited</p>
          <p>VAT registered GB 167 189 962</p>
        </div>
      </div>
    </main>
  );
}

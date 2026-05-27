import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#0A0A09] text-[#FCFBF7] overflow-hidden">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-32 font-sans text-sm leading-relaxed text-gray-300">
        <h1 className="font-serif text-4xl text-white mb-8">Tebex Privacy Policy</h1>
        
        <p className="mb-4">Tebex Limited respects your privacy and is committed to protecting your personal data. This privacy notice will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
        
        <h2 className="font-serif text-2xl text-white mt-12 mb-4">1. IMPORTANT INFORMATION AND WHO WE ARE</h2>
        <p className="mb-4">This privacy notice aims to give you information on how Tebex Limited collect and process your personal data through your use of www.tebex.io and www.buycraft.net (together referred to as "this website"), and also any third-party webstore (a "Webstore") which utilities the Tebex webstore platform for game servers (the "Tebex Platform"), including any data you may provide through this website when you purchase a product or service.</p>

        <h2 className="font-serif text-2xl text-white mt-12 mb-4">2. THE DATA WE COLLECT ABOUT YOU</h2>
        <p className="mb-4">Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).</p>
        <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data, Contact Data, Transaction Data, Technical Data, Profile Data, Usage Data, Marketing and Communications Data.</p>

        <h2 className="font-serif text-2xl text-white mt-12 mb-4">3. HOW IS YOUR PERSONAL DATA COLLECTED?</h2>
        <p className="mb-4">We use different methods to collect data from and about you including through: Direct interactions. You may give us your Identity and Contact Data by filling in forms or by corresponding with us through https://www.tebex.io/contact.</p>

        <h2 className="font-serif text-2xl text-white mt-12 mb-4">4. HOW WE USE YOUR PERSONAL DATA</h2>
        <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you. Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests. Where we need to comply with a legal or regulatory obligation.</p>

        <div className="mt-16 text-center text-xs text-gray-500">
          <p>Tebex Limited</p>
          <p>VAT registered GB 167 189 962</p>
        </div>
      </div>
    </main>
  );
}

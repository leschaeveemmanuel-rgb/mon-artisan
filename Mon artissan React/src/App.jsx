import React, { useState } from 'react';
import { Briefcase, Search, MapPin, LogOut } from 'lucide-react';
import { departements } from './data/departements';
import AdSlot from './components/AdSlot';

const App = () => {
  const [selectedDept, setSelectedDept] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-black text-blue-900 tracking-tighter">
          MON<span className="text-blue-600">ELECTRICIEN</span>.COM
        </div>
        <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium">
          <LogOut size={18} />
          Se déconnecter
        </button>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Trouvez un électricien <br className="hidden md:block"/> en un clic.
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          La mise en relation gratuite et directe entre professionnels qualifiés et particuliers.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          
          {/* Section ARTISANS */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 p-10 border border-slate-100 transition-transform hover:scale-[1.01]">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Vous êtes Artisan ?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Boostez votre activité. Consultez les besoins de chantiers autour de vous et proposez vos devis gratuitement.
            </p>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all mb-4">
              Je propose mes services
            </button>
            <p className="text-center text-sm text-slate-400">
              Déjà membre ? <a href="#" className="text-blue-600 font-bold hover:underline">Connexion</a>
            </p>
          </div>

          {/* Section PARTICULIERS */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 p-10 border border-slate-100 transition-transform hover:scale-[1.01]">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Besoin d'un dépannage ?</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Publiez votre projet ou trouvez l'artisan idéal dans votre département. Simple et 100% gratuit.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium text-slate-700"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="">Tous les départements</option>
                  {departements.map(d => (
                    <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>
                  ))}
                </select>
              </div>
              <button className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl transition-all">
                Lancer la recherche
              </button>
            </div>
          </div>

        </div>

        <AdSlot height="h-32" label="Espace Partenaire" />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold">MonElectricien.com</div>
          <div className="text-sm">
            © 2026 – Développé par <a href="https://www.skyboundstudio.fr" className="text-blue-400 font-bold">Skybound Studio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
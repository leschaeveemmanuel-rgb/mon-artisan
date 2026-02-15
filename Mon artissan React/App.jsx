import React, { useState } from 'react';
import { Briefcase, Search, MapPin, LogOut } from 'lucide-react';
import { departements } from './data/departements';
import AdSlot from './components/AdSlot';

const App = () => {
  const [selectedDept, setSelectedDept] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-black text-blue-900 tracking-tighter">
          MON<span className="text-blue-600">ELECTRICIEN</span>.COM
        </div>
        <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium">
          <LogOut size={18} /> Se déconnecter
        </button>
      </nav>

      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Trouvez un électricien <br className="hidden md:block"/> en un clic.</h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90">La mise en relation gratuite et directe entre professionnels qualifiés et particuliers.</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="card-premium">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Vous êtes Artisan ?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">Boostez votre activité. Consultez les besoins de chantiers autour de vous et proposez vos devis gratuitement.</p>
            <button className="btn-primary w-full">Je propose mes services</button>
          </div>

          <div className="card-premium">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Besoin d'un dépannage ?</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Publiez votre projet ou trouvez l'artisan idéal dans votre département.</p>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select className="input-field" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                  <option value="">Tous les départements</option>
                  {departements.map(d => (
                    <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>
                  ))}
                </select>
              </div>
              <button className="btn-secondary w-full">Lancer la recherche</button>
            </div>
          </div>
        </div>
        <AdSlot height="h-32" label="Espace Partenaire" />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center">
        <p>© 2026 – MonElectricien.com | Développé par Skybound Studio</p>
      </footer>
    </div>
  );
};

export default App;
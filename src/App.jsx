import React, { useState } from 'react';
import { Briefcase, Search, MapPin, LogOut, Hammer } from 'lucide-react'; // Ajout de l'icône Hammer
import { departements } from './data/departements';
import AdSlot from './components/AdSlot';

const App = () => {
  const [selectedDept, setSelectedDept] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-black text-orange-600 tracking-tighter flex items-center gap-2">
          <Hammer size={24} className="text-orange-600" />
          MON<span className="text-slate-900">ARTISAN</span>.COM
        </div>
        <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium">
          <LogOut size={18} /> Se déconnecter
        </button>
      </nav>

      {/* Hero Section - On passe sur un ton plus chaleureux (Orange/Ambre) pour l'artisanat */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Trouvez le bon artisan <br className="hidden md:block"/> au bon endroit.
        </h1>
        <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          La plateforme gratuite qui simplifie la rencontre entre les meilleurs pros locaux et vos projets de travaux.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          
          {/* Section ARTISANS */}
          <div className="card-premium border-t-4 border-t-orange-500">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Vous êtes un Professionnel ?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Développez votre activité. Accédez aux demandes de chantiers dans votre spécialité et vos départements favoris.
            </p>
            <button className="btn-primary bg-orange-600 hover:bg-orange-700 w-full">
              Je propose mes services
            </button>
          </div>

          {/* Section PARTICULIERS */}
          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Vous avez un projet ?</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Publiez votre demande de devis ou recherchez un artisan qualifié par département et par métier.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  className="input-field" 
                  value={selectedDept} 
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="">Sélectionner votre département</option>
                  {departements.map(d => (
                    <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>
                  ))}
                </select>
              </div>
              <button className="btn-secondary w-full">Rechercher un pro</button>
            </div>
          </div>

        </div>

        <AdSlot height="h-32" label="Annonces Partenaires" />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold flex items-center gap-2">
            <Hammer size={18} /> MONARTISAN.COM
          </div>
          <div className="text-sm">
            © 2026 – Une solution propulsée par <a href="#" className="text-orange-500 font-bold hover:underline">Skybound Studio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench, Search } from 'lucide-react';
import { departements } from './data/departements';
import { metiers } from './data/metiers';
import AdSlot from './components/AdSlot';

// --- 1. PAGE D'ACCUEIL ---
const Home = ({ selectedDept, setSelectedDept, selectedMetier, setSelectedMetier }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Trouvez le bon artisan <br className="hidden md:block"/> au bon endroit.
        </h1>
        <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90 italic">
          "La plateforme gratuite qui connecte pros et particuliers."
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          
          {/* CARTE ARTISAN (Pros) */}
          <div className="card-premium border-t-4 border-t-orange-500">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Espace Professionnel</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Développez votre activité. Consultez les besoins de chantiers ou proposez vos services à la communauté.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/trouver-chantiers')} 
                className="btn-primary bg-orange-600 hover:bg-orange-700 w-full flex items-center justify-center gap-2"
              >
                <List size={20} /> Voir les chantiers
              </button>
              <button 
                onClick={() => navigate('/inscription-artisan')}
                className="w-full py-4 text-orange-600 font-bold border-2 border-orange-600 rounded-2xl hover:bg-orange-50 transition-all shadow-sm active:scale-95 text-center"
              >
                Je propose mes services
              </button>
            </div>
          </div>

          {/* CARTE PARTICULIER (Clients) */}
          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Vous avez un projet ?</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Recherchez un pro par métier ou publiez votre annonce gratuitement.
            </p>
            
            <div className="space-y-4">
              {/* Sélecteur de Métier */}
              <div className="relative">
                <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  className="input-field" 
                  value={selectedMetier} 
                  onChange={(e) => setSelectedMetier(e.target.value)}
                >
                  <option value="">Quel métier recherchez-vous ?</option>
                  {metiers.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Sélecteur de Département */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  className="input-field" 
                  value={selectedDept} 
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="">Dans quel département ?</option>
                  {departements.map(d => (
                    <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <button 
                  onClick={() => navigate('/recherche')}
                  className="btn-secondary w-full"
                >
                  Rechercher mon artisan
                </button>
                <button 
                  onClick={() => navigate('/publier-chantier')}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
                >
                  <PlusCircle size={20} /> Publier mon projet (Gratuit)
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

// --- PAGES SECONDAIRES (Vides pour l'instant) ---
const PublierChantier = () => (
  <div className="p-20 text-center">
    <h2 className="text-3xl font-bold">Formulaire de publication</h2>
    <Link to="/" className="text-orange-600 underline mt-4 inline-block">Retour à l'accueil</Link>
  </div>
);

const TrouverChantiers = () => (
  <div className="p-20 text-center">
    <h2 className="text-3xl font-bold">Liste des chantiers pour les Pros</h2>
    <Link to="/" className="text-orange-600 underline mt-4 inline-block">Retour à l'accueil</Link>
  </div>
);

const InscriptionArtisan = () => (
  <div className="p-20 text-center">
    <h2 className="text-3xl font-bold">Inscription Artisan</h2>
    <Link to="/" className="text-orange-600 underline mt-4 inline-block">Retour à l'accueil</Link>
  </div>
);

// --- COMPOSANT APP PRINCIPAL ---
const App = () => {
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedMetier, setSelectedMetier] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-xl font-black text-orange-600 tracking-tighter flex items-center gap-2">
          <Hammer size={24} className="text-orange-600" />
          TROUVER<span className="text-slate-900">MON ARTISAN</span>.COM
        </Link>
        <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium">
          <LogOut size={18} /> Se déconnecter
        </button>
      </nav>

      <Routes>
        <Route path="/" element={
          <Home 
            selectedDept={selectedDept} setSelectedDept={setSelectedDept} 
            selectedMetier={selectedMetier} setSelectedMetier={setSelectedMetier} 
          />
        } />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/trouver-chantiers" element={<TrouverChantiers />} />
        <Route path="/inscription-artisan" element={<InscriptionArtisan />} />
        <Route path="/recherche" element={<div className="p-20 text-center">Résultats de recherche</div>} />
      </Routes>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold flex items-center gap-2 text-lg italic uppercase">
            <Hammer size={20} className="text-orange-500" /> MONARTISAN.COM
          </div>
          <div className="text-sm">
            © 2026 – Propulsé par <a href="https://www.skyboundstudio.fr" className="text-orange-500 font-bold hover:underline">Skybound Studio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
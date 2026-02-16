import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench, Search, CheckCircle, ShieldCheck, User, Star, ArrowLeft } from 'lucide-react';
import { departements } from './data/departements';
import { metiers } from './data/metiers';
import AdSlot from './components/AdSlot';

// --- DONNÉES DE TEST (Simulant une base de données) ---
const MOCK_ARTISANS = [
  { id: 1, nom: "Rénov'Expert 75", metiers: ["Maçon", "Carreleur"], depts: ["75", "92"], desc: "Spécialiste de la rénovation d'appartements haussmanniens depuis 12 ans. Travail soigné et respect des délais.", star: 4.8 },
  { id: 2, nom: "Élec Pro Services", metiers: ["Électricien"], depts: ["78", "91", "92"], desc: "Installation complète, mise aux normes et dépannage urgent. Intervention 7j/7.", star: 4.9 },
  { id: 3, nom: "Plomberie Ducoin", metiers: ["Plombier", "Chauffagiste"], depts: ["75", "93", "94"], desc: "Installation de salles de bain et recherche de fuites. Devis gratuit sous 24h.", star: 4.5 },
  { id: 4, nom: "Menuiserie Moderne", metiers: ["Menuisier", "Vitrier"], depts: ["77", "91"], desc: "Pose de fenêtres double vitrage et création de dressings sur mesure.", star: 4.7 }
];

// --- 1. PAGE D'ACCUEIL ---
const Home = ({ selectedDepts, setSelectedDepts, selectedMetiers, setSelectedMetiers }) => {
  const navigate = useNavigate();
  const toggle = (list, setList, item) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };
  
  return (
    <>
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Trouvez le bon artisan <br className="hidden md:block"/> au bon endroit.
        </h1>
        <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90 italic">
          "La plateforme de confiance pour vos travaux."
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="card-premium border-t-4 border-t-orange-500">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-100">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Espace Professionnel</h2>
            <p className="text-slate-600 mb-6">Référencez vos compétences gratuitement ou trouvez des chantiers.</p>
            <div className="space-y-3">
              <button onClick={() => navigate('/inscription-artisan')} className="btn-primary bg-orange-600 hover:bg-orange-700 w-full flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Je propose mes services (Gratuit)
              </button>
              <button onClick={() => navigate('/trouver-chantiers')} className="w-full py-4 text-orange-600 font-bold border-2 border-orange-600 rounded-2xl hover:bg-orange-50 transition-all text-center flex items-center justify-center gap-2">
                <List size={20} /> Voir les chantiers (Abonnés)
              </button>
            </div>
          </div>

          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Rechercher un pro</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Quels métiers ?</label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50">
                  {metiers.map(m => (
                    <button key={m} onClick={() => toggle(selectedMetiers, setSelectedMetiers, m)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${selectedMetiers.includes(m) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
                    > {m} </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Quels départements ?</label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50">
                  {departements.map(d => (
                    <button key={d.code} onClick={() => toggle(selectedDepts, setSelectedDepts, d.code)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${selectedDepts.includes(d.code) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
                    > {d.code} </button>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate('/recherche')} disabled={selectedMetiers.length === 0 || selectedDepts.length === 0} className={`btn-secondary w-full ${ (selectedMetiers.length === 0 || selectedDepts.length === 0) ? 'opacity-50' : ''}`}>
                Trouver mon artisan
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// --- 2. PAGE RÉSULTATS DE RECHERCHE ---
const ResultatsRecherche = ({ selectedDepts, selectedMetiers }) => {
  const navigate = useNavigate();
  
  // LOGIQUE DE FILTRE : On garde l'artisan si un de ses métiers ET un de ses départements matchent
  const filteredArtisans = MOCK_ARTISANS.filter(artisan => {
    const matchMetier = artisan.metiers.some(m => selectedMetiers.includes(m));
    const matchDept = artisan.depts.some(d => selectedDepts.includes(d));
    return matchMetier && matchDept;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-8 font-bold transition-colors">
        <ArrowLeft size={20} /> Retour aux filtres
      </button>

      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Artisans trouvés ({filteredArtisans.length})</h2>
        <p className="text-slate-500">Basé sur vos critères : {selectedMetiers.join(', ')} en {selectedDepts.join(', ')}.</p>
      </div>

      {filteredArtisans.length > 0 ? (
        <div className="grid gap-6">
          {filteredArtisans.map(artisan => (
            <div key={artisan.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                <User size={48} />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{artisan.nom}</h3>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2 py-1 rounded-lg self-center md:self-auto">
                    <Star size={14} fill="currentColor" /> {artisan.star}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {artisan.metiers.map(m => <span key={m} className="bg-orange-50 text-orange-700 text-[10px] font-black uppercase px-2 py-1 rounded-md border border-orange-100">{m}</span>)}
                  {artisan.depts.map(d => <span key={d} className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-1 rounded-md border border-slate-200">{d}</span>)}
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{artisan.desc}</p>
                
                <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
                  Voir le profil complet
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-100 p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold">Aucun artisan ne correspond exactement à ces critères dans notre base actuelle.</p>
        </div>
      )}
    </main>
  );
};

// --- 3. AUTRES PAGES (Restent identiques) ---
const PublierChantier = () => (
  <div className="p-20 text-center">
    <h2 className="text-3xl font-bold">Publier mon projet (Gratuit)</h2>
    <Link to="/" className="text-orange-600 underline mt-4 inline-block">Retour à l'accueil</Link>
  </div>
);

const InscriptionArtisan = () => (
  <div className="p-20 text-center font-black">
    <h2 className="text-3xl">Page Inscription Pro (Déjà prête)</h2>
    <Link to="/" className="text-orange-600 underline mt-4 inline-block">Retour à l'accueil</Link>
  </div>
);

const TrouverChantiers = () => (
  <div className="p-20 text-center font-black">
    <h2 className="text-3xl">Page Chantiers (Abonnés)</h2>
    <Link to="/" className="text-orange-600 underline mt-4 inline-block">Retour à l'accueil</Link>
  </div>
);

// --- COMPOSANT APP PRINCIPAL ---
const App = () => {
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedMetiers, setSelectedMetiers] = useState([]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-xl font-black text-orange-600 tracking-tighter flex items-center gap-2">
          <Hammer size={24} className="text-orange-600" />
          TROUVER<span className="text-slate-900">MON ARTISAN</span>.COM
        </Link>
        <button className="text-slate-400 hover:text-red-600 transition-colors"><LogOut size={18} /></button>
      </nav>

      <Routes>
        <Route path="/" element={<Home selectedDepts={selectedDepts} setSelectedDepts={setSelectedDepts} selectedMetiers={selectedMetiers} setSelectedMetiers={setSelectedMetiers} />} />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/trouver-chantiers" element={<TrouverChantiers />} />
        <Route path="/inscription-artisan" element={<InscriptionArtisan />} />
        <Route path="/recherche" element={<ResultatsRecherche selectedDepts={selectedDepts} selectedMetiers={selectedMetiers} />} />
      </Routes>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold flex items-center gap-2 text-lg uppercase italic"><Hammer size={20} className="text-orange-500" /> MONARTISAN.COM</div>
          <div className="text-sm">© 2026 – Propulsé par <a href="https://www.skyboundstudio.fr" className="text-orange-500 font-bold hover:underline">Skybound Studio</a></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
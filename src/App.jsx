import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench, Search, CheckCircle, ShieldCheck } from 'lucide-react';
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
              Développez votre activité. Proposez vos services ou accédez aux besoins de chantiers de la communauté.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/inscription-artisan')}
                className="btn-primary bg-orange-600 hover:bg-orange-700 w-full flex items-center justify-center gap-2"
              >
                <PlusCircle size={20} /> Je propose mes services (Gratuit)
              </button>
              
              <button 
                onClick={() => navigate('/trouver-chantiers')} 
                className="w-full py-4 text-orange-600 font-bold border-2 border-orange-600 rounded-2xl hover:bg-orange-50 transition-all shadow-sm active:scale-95 text-center flex items-center justify-center gap-2"
              >
                <List size={20} /> Voir les chantiers (Abonnés)
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

// --- 2. PAGE PUBLIER UN CHANTIER (Particulier) ---
const PublierChantier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMetiers, setSelectedMetiers] = useState([]);

  const toggleMetier = (m) => {
    setSelectedMetiers(prev => prev.includes(m) ? prev.filter(item => item !== m) : [...prev, m]);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Annonce publiée !</h2>
        <p className="text-slate-600 mb-8">Votre projet multi-métiers est en ligne. Les artisans concernés pourront vous contacter.</p>
        <Link to="/" className="btn-primary bg-slate-900 inline-block">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Décrivez votre projet</h2>
        <p className="text-slate-500 mb-8 italic text-sm">Service gratuit pour les particuliers.</p>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-700">Quels corps de métier recherchez-vous ?</label>
            <div className="flex flex-wrap gap-2">
              {metiers.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMetier(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedMetiers.includes(m) ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <select className="input-field pl-4" required>
              <option value="">Département du chantier...</option>
              {departements.map(d => <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>)}
            </select>
            <input type="text" className="input-field pl-4" placeholder="Titre (ex: Rénovation appartement)" required />
          </div>

          <textarea className="input-field pl-4 h-32 py-4" placeholder="Description de vos travaux..." required></textarea>

          <button type="submit" disabled={selectedMetiers.length === 0} className={`btn-primary w-full ${selectedMetiers.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
            Publier mon projet gratuitement
          </button>
        </form>
      </div>
    </main>
  );
};

// --- 3. PAGE INSCRIPTION ARTISAN (Pro) ---
const InscriptionArtisan = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedMetiersPro, setSelectedMetiersPro] = useState([]);

  const toggleDept = (code) => {
    setSelectedDepts(prev => prev.includes(code) ? prev.filter(item => item !== code) : [...prev, code]);
  };

  const toggleMetierPro = (m) => {
    setSelectedMetiersPro(prev => prev.includes(m) ? prev.filter(item => item !== m) : [...prev, m]);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Profil créé avec succès !</h2>
        <p className="text-slate-600 mb-8">Votre fiche professionnelle est prête pour vos métiers et vos départements sélectionnés.</p>
        <Link to="/" className="btn-primary bg-slate-900 inline-block">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Devenir Artisan Partenaire</h2>
        <p className="text-slate-500 mb-8 italic text-sm">Créez votre fiche multi-compétences gratuitement.</p>
        
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-700">Quels sont vos corps de métiers ? (Plusieurs choix)</label>
            <div className="flex flex-wrap gap-2">
              {metiers.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMetierPro(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedMetiersPro.includes(m) ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-orange-300'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-slate-700">Vos zones d'intervention (Départements)</label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {departements.map(d => (
                <button
                  key={d.code}
                  type="button"
                  onClick={() => toggleDept(d.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedDepts.includes(d.code) ? 'bg-orange-600 border-orange-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-orange-300'}`}
                >
                  {d.code} - {d.nom}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" className="input-field pl-4" placeholder="Nom de votre entreprise" required />
            <input type="tel" className="input-field pl-4" placeholder="Téléphone professionnel" required />
          </div>

          <button 
            type="submit" 
            disabled={selectedDepts.length === 0 || selectedMetiersPro.length === 0} 
            className={`btn-primary w-full ${ (selectedDepts.length === 0 || selectedMetiersPro.length === 0) ? 'bg-slate-300 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'}`}
          >
            Créer mon profil gratuit
          </button>
        </form>
      </div>
    </main>
  );
};

// --- 4. PAGE CHANTIERS ---
const TrouverChantiers = () => (
  <main className="max-w-6xl mx-auto px-4 py-12 text-center">
    <div className="bg-orange-50 p-12 rounded-3xl border border-orange-100">
      <h2 className="text-3xl font-bold mb-4 text-slate-800">Chantiers disponibles</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">Section réservée aux abonnés pour consulter les offres en temps réel.</p>
      <button className="btn-primary bg-orange-600 px-8 shadow-lg shadow-orange-200">Voir les abonnements</button>
    </div>
  </main>
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
        <button className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors">
          <LogOut size={18} />
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home selectedDept={selectedDept} setSelectedDept={setSelectedDept} selectedMetier={selectedMetier} setSelectedMetier={setSelectedMetier} />} />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/trouver-chantiers" element={<TrouverChantiers />} />
        <Route path="/inscription-artisan" element={<InscriptionArtisan />} />
        <Route path="/recherche" element={<div className="p-20 text-center font-bold">Résultats de recherche</div>} />
      </Routes>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="text-white font-bold flex items-center gap-2 text-lg uppercase italic">
            <Hammer size={20} className="text-orange-500" /> MONARTISAN.COM
          </div>
          <div>© 2026 – Propulsé par <a href="https://www.skyboundstudio.fr" className="text-orange-500 font-bold hover:underline">Skybound Studio</a></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
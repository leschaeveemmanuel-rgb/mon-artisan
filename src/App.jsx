import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench, Search, CheckCircle, ShieldCheck } from 'lucide-react';
import { departements } from './data/departements';
import { metiers } from './data/metiers';
import AdSlot from './components/AdSlot';

// --- 1. PAGE D'ACCUEIL (Recherche Multi-critères Illimitée) ---
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
          "La plateforme de confiance qui connecte pros et particuliers."
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          
          {/* CARTE ARTISAN */}
          <div className="card-premium border-t-4 border-t-orange-500">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Espace Professionnel</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Développez votre activité. Proposez vos services ou accédez aux besoins de chantiers.
            </p>
            <div className="space-y-3">
              <button onClick={() => navigate('/inscription-artisan')} className="btn-primary bg-orange-600 hover:bg-orange-700 w-full flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Je propose mes services (Gratuit)
              </button>
              <button onClick={() => navigate('/trouver-chantiers')} className="w-full py-4 text-orange-600 font-bold border-2 border-orange-600 rounded-2xl hover:bg-orange-50 transition-all text-center flex items-center justify-center gap-2">
                <List size={20} /> Voir les chantiers (Abonnés)
              </button>
            </div>
          </div>

          {/* CARTE PARTICULIER (Recherche Multi-critères ILLIMITÉE) */}
          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Vous avez un projet ?</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Métiers recherchés (Sélection multiple)</label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50">
                  {metiers.map(m => (
                    <button key={m} onClick={() => toggle(selectedMetiers, setSelectedMetiers, m)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${selectedMetiers.includes(m) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
                    > {m} </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Localisation (Départements multiples)</label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50">
                  {departements.map(d => (
                    <button key={d.code} onClick={() => toggle(selectedDepts, setSelectedDepts, d.code)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${selectedDepts.includes(d.code) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
                    > {d.code} </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => navigate('/recherche')} disabled={selectedMetiers.length === 0 || selectedDepts.length === 0}
                  className={`btn-secondary w-full ${ (selectedMetiers.length === 0 || selectedDepts.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Rechercher mon artisan
                </button>
                <button onClick={() => navigate('/publier-chantier')} className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95">
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

// --- 2. PAGE PUBLIER UN CHANTIER (Illimitée en métiers) ---
const PublierChantier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMetiers, setSelectedMetiers] = useState([]);
  const toggle = (m) => setSelectedMetiers(prev => prev.includes(m) ? prev.filter(i => i !== m) : [...prev, m]);

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} /></div>
      <h2 className="text-3xl font-bold mb-4 text-slate-800">Annonce publiée !</h2>
      <Link to="/" className="btn-primary bg-slate-900 inline-block px-8">Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Décrivez votre projet</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div>
            <label className="block text-sm font-bold mb-3">De quels métiers avez-vous besoin ?</label>
            <div className="flex flex-wrap gap-2">{metiers.map(m => (
              <button key={m} type="button" onClick={() => toggle(m)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedMetiers.includes(m) ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}`}>{m}</button>
            ))}</div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <select className="input-field pl-4" required><option value="">Département du chantier...</option>{departements.map(d => <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>)}</select>
            <input type="text" className="input-field pl-4" placeholder="Titre (ex: Rénovation salle de bain)" required />
          </div>
          <textarea className="input-field pl-4 h-32 py-4" placeholder="Détails des travaux..." required></textarea>
          <button type="submit" disabled={selectedMetiers.length === 0} className={`btn-primary w-full ${selectedMetiers.length === 0 ? 'bg-slate-300' : 'bg-emerald-600 hover:bg-emerald-700 shadow-xl'}`}>Publier gratuitement</button>
        </form>
      </div>
    </main>
  );
};

// --- 3. PAGE INSCRIPTION ARTISAN (BRIDEÉ À 3 CHOIX) ---
const InscriptionArtisan = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedMetiersPro, setSelectedMetiersPro] = useState([]);
  const [presentation, setPresentation] = useState("");
  const LIMIT = 3;

  const toggleMetier = (m) => {
    if (selectedMetiersPro.includes(m)) setSelectedMetiersPro(prev => prev.filter(i => i !== m));
    else if (selectedMetiersPro.length < LIMIT) setSelectedMetiersPro(prev => [...prev, m]);
  };

  const toggleDept = (code) => {
    if (selectedDepts.includes(code)) setSelectedDepts(prev => prev.filter(i => i !== code));
    else if (selectedDepts.length < LIMIT) setSelectedDepts(prev => [...prev, code]);
  };

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} /></div>
      <h2 className="text-3xl font-bold mb-4 text-slate-800">Profil enregistré !</h2>
      <Link to="/" className="btn-primary bg-slate-900 inline-block px-8">Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Devenir Artisan Partenaire</h2>
        <p className="text-slate-500 mb-8 italic text-sm">Référencez vos spécialités (Max {LIMIT} métiers / {LIMIT} départements).</p>
        
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-700 flex justify-between">Vos métiers <span>{selectedMetiersPro.length}/{LIMIT}</span></label>
            <div className="flex flex-wrap gap-2">{metiers.map(m => (
              <button key={m} type="button" onClick={() => toggleMetier(m)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedMetiersPro.includes(m) ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}`} disabled={!selectedMetiersPro.includes(m) && selectedMetiersPro.length >= LIMIT}>{m}</button>
            ))}</div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-slate-700 flex justify-between">Zones d'intervention <span>{selectedDepts.length}/{LIMIT}</span></label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-100">{departements.map(d => (
              <button key={d.code} type="button" onClick={() => toggleDept(d.code)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${selectedDepts.includes(d.code) ? 'bg-orange-600 border-orange-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`} disabled={!selectedDepts.includes(d.code) && selectedDepts.length >= LIMIT}>{d.code}</button>
            ))}</div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 flex justify-between">Présentation (500 caractères) <span>{presentation.length}/500</span></label>
            <textarea className="input-field pl-4 h-32 py-4 resize-none" value={presentation} onChange={(e) => setPresentation(e.target.value.slice(0, 500))} placeholder="Votre savoir-faire..." required></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" className="input-field pl-4" placeholder="Nom Entreprise" required />
            <input type="tel" className="input-field pl-4" placeholder="Téléphone pro" required />
          </div>

          <button type="submit" disabled={selectedDepts.length === 0 || selectedMetiersPro.length === 0} className={`btn-primary w-full ${(selectedDepts.length === 0 || selectedMetiersPro.length === 0) ? 'bg-slate-300' : 'bg-orange-600 hover:shadow-orange-200 shadow-xl'}`}>Créer mon profil gratuit</button>
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
      <button className="btn-primary bg-orange-600 px-8">Voir les abonnements</button>
    </div>
  </main>
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
        <button className="text-slate-400 hover:text-red-600"><LogOut size={18} /></button>
      </nav>

      <Routes>
        <Route path="/" element={<Home selectedDepts={selectedDepts} setSelectedDepts={setSelectedDepts} selectedMetiers={selectedMetiers} setSelectedMetiers={setSelectedMetiers} />} />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/trouver-chantiers" element={<TrouverChantiers />} />
        <Route path="/inscription-artisan" element={<InscriptionArtisan />} />
        <Route path="/recherche" element={<div className="p-20 text-center font-bold italic">Page de résultats (en cours...)</div>} />
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
import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench, Search, CheckCircle, ShieldCheck, User, Star, ArrowLeft, Mail, Phone } from 'lucide-react';
import { departements } from './data/departements';
import { metiers } from './data/metiers';
import AdSlot from './components/AdSlot';

// --- DONNÉES DE TEST ---
const MOCK_ARTISANS = [
  { id: 1, nom: "Rénov'Expert 75", metiers: ["Maçon", "Carreleur"], depts: ["75", "92"], desc: "Spécialiste de la rénovation d'appartements. Travail soigné et respect des délais.", star: 4.8 },
  { id: 2, nom: "Élec Pro Services", metiers: ["Électricien"], depts: ["78", "91", "92"], desc: "Installation complète, mise aux normes et dépannage urgent.", star: 4.9 },
  { id: 3, nom: "Plomberie Ducoin", metiers: ["Plombier", "Chauffagiste"], depts: ["75", "93", "94"], desc: "Installation de salles de bain et recherche de fuites.", star: 4.5 }
];

// --- 1. PAGE D'ACCUEIL ---
const Home = ({ searchDepts, setSearchDepts, searchMetiers, setSearchMetiers }) => {
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
            <div className="space-y-3">
              <button onClick={() => navigate('/inscription-artisan')} className="btn-primary bg-orange-600 hover:bg-orange-700 w-full flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Je propose mes services (Gratuit)
              </button>
              <button onClick={() => navigate('/trouver-chantiers')} className="w-full py-4 text-orange-600 font-bold border-2 border-orange-600 rounded-2xl hover:bg-orange-50 transition-all text-center flex items-center justify-center gap-2">
                <List size={20} /> Voir les chantiers (Abonnés)
              </button>
            </div>
          </div>

          {/* CARTE PARTICULIER */}
          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Search size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Votre projet</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50">
                {metiers.map(m => (
                  <button key={m} onClick={() => toggle(searchMetiers, setSearchMetiers, m)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${searchMetiers.includes(m) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500'}`}> {m} </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50">
                {departements.map(d => (
                  <button key={d.code} onClick={() => toggle(searchDepts, setSearchDepts, d.code)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${searchDepts.includes(d.code) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500'}`}> {d.code} </button>
                ))}
              </div>
              <button onClick={() => navigate('/recherche')} disabled={searchMetiers.length === 0 || searchDepts.length === 0} className={`btn-secondary w-full ${ (searchMetiers.length === 0 || searchDepts.length === 0) ? 'opacity-50' : ''}`}>Trouver mon artisan</button>
              <button onClick={() => navigate('/publier-chantier')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Publier mon projet (Gratuit)
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// --- 2. PAGE PUBLIER UN CHANTIER (Version Complète) ---
const PublierChantier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMetiers, setSelectedMetiers] = useState([]);
  
  const toggle = (m) => {
    setSelectedMetiers(prev => prev.includes(m) ? prev.filter(i => i !== m) : [...prev, m]);
  };

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} /></div>
      <h2 className="text-3xl font-bold mb-4">Projet publié !</h2>
      <p className="text-slate-600 mb-8">Votre demande a été envoyée aux artisans correspondants. Ils reviendront vers vous rapidement.</p>
      <Link to="/" className="btn-primary bg-slate-900 inline-block px-8">Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Décrivez votre projet</h2>
        <p className="text-slate-500 mb-8 italic">Présentez vos besoins pour recevoir des devis précis.</p>
        
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div>
            <label className="block text-sm font-bold mb-4 text-slate-700 uppercase tracking-wider">De quels métiers avez-vous besoin ?</label>
            <div className="flex flex-wrap gap-2">
              {metiers.map(m => (
                <button key={m} type="button" onClick={() => toggle(m)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedMetiers.includes(m) ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300'}`}>{m}</button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Département</label>
              <select className="input-field pl-4" required>
                <option value="">Où se situe le chantier ?</option>
                {departements.map(d => <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Titre de votre projet</label>
              <input type="text" className="input-field pl-4" placeholder="ex: Rénovation salle de bain" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">Description détaillée</label>
            <textarea className="input-field pl-4 h-32 py-4" placeholder="Surface, matériaux souhaités, contraintes..." required></textarea>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Mail size={18} className="text-emerald-600"/> Vos coordonnées (Privées)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="email" className="input-field pl-4 bg-white" placeholder="Votre Email" required />
              <input type="tel" className="input-field pl-4 bg-white" placeholder="Votre Téléphone" required />
            </div>
          </div>

          <button type="submit" disabled={selectedMetiers.length === 0} className={`btn-primary w-full ${selectedMetiers.length === 0 ? 'bg-slate-300' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 shadow-xl'}`}>
            Publier mon projet gratuitement
          </button>
          <Link to="/" className="block text-center text-slate-400 text-sm hover:underline">Annuler</Link>
        </form>
      </div>
    </main>
  );
};

// --- 3. PAGE INSCRIPTION ARTISAN (Avec Limites) ---
const InscriptionArtisan = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedMetiersPro, setSelectedMetiersPro] = useState([]);
  const [presentation, setPresentation] = useState("");
  const LIMIT = 3;

  const toggle = (list, setList, item, max) => {
    if (list.includes(item)) setList(prev => prev.filter(i => i !== item));
    else if (list.length < max) setList(prev => [...prev, item]);
  };

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} /></div>
      <h2 className="text-3xl font-bold mb-4">Profil enregistré !</h2>
      <Link to="/" className="btn-primary bg-slate-900 inline-block px-8">Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-2">Devenir Artisan Partenaire</h2>
        <p className="text-slate-500 mb-8 italic">Max {LIMIT} métiers / {LIMIT} départements.</p>
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div>
            <label className="block text-sm font-bold mb-3">Métiers ({selectedMetiersPro.length}/{LIMIT})</label>
            <div className="flex flex-wrap gap-2">{metiers.map(m => (
              <button key={m} type="button" onClick={() => toggle(selectedMetiersPro, setSelectedMetiersPro, m, LIMIT)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${selectedMetiersPro.includes(m) ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`} disabled={!selectedMetiersPro.includes(m) && selectedMetiersPro.length >= LIMIT}>{m}</button>
            ))}</div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-3">Zones ({selectedDepts.length}/{LIMIT})</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-4 bg-slate-50 rounded-xl">{departements.map(d => (
              <button key={d.code} type="button" onClick={() => toggle(selectedDepts, setSelectedDepts, d.code, LIMIT)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${selectedDepts.includes(d.code) ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`} disabled={!selectedDepts.includes(d.code) && selectedDepts.length >= LIMIT}>{d.code}</button>
            ))}</div>
          </div>
          <textarea className="input-field pl-4 h-32 py-4 resize-none" placeholder="Présentation (500 car. max)..." value={presentation} onChange={(e) => setPresentation(e.target.value.slice(0, 500))} required></textarea>
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" className="input-field pl-4" placeholder="Nom Entreprise" required />
            <input type="tel" className="input-field pl-4" placeholder="Téléphone Pro" required />
          </div>
          <button type="submit" disabled={selectedDepts.length === 0 || selectedMetiersPro.length === 0} className={`btn-primary w-full ${ (selectedDepts.length === 0 || selectedMetiersPro.length === 0) ? 'bg-slate-300' : 'bg-orange-600 shadow-xl'}`}>Créer mon profil gratuit</button>
        </form>
      </div>
    </main>
  );
};

// --- 4. PAGE RÉSULTATS ---
const ResultatsRecherche = ({ searchDepts, searchMetiers }) => {
  const navigate = useNavigate();
  const results = MOCK_ARTISANS.filter(a => a.metiers.some(m => searchMetiers.includes(m)) && a.depts.some(d => searchDepts.includes(d)));

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-8 font-bold"><ArrowLeft size={20}/> Retour</button>
      <h2 className="text-3xl font-black mb-10 text-slate-800">Résultats ({results.length})</h2>
      <div className="grid gap-6">
        {results.map(a => (
          <div key={a.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex gap-6">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><User size={40}/></div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">{a.nom}</h3>
                <span className="flex items-center gap-1 text-amber-500 font-bold text-sm"><Star size={14} fill="currentColor"/> {a.star}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {a.metiers.map(m => <span key={m} className="bg-orange-50 text-orange-700 text-[10px] font-black px-2 py-1 rounded-md border border-orange-100 uppercase">{m}</span>)}
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{a.desc}</p>
              <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-600">Voir Profil</button>
            </div>
          </div>
        ))}
        {results.length === 0 && <div className="p-12 text-center text-slate-400 font-bold border-2 border-dashed rounded-3xl">Aucun artisan ne correspond à cette recherche.</div>}
      </div>
    </main>
  );
};

// --- COMPOSANT APP PRINCIPAL ---
const App = () => {
  const [searchDepts, setSearchDepts] = useState([]);
  const [searchMetiers, setSearchMetiers] = useState([]);

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
        <Route path="/" element={<Home searchDepts={searchDepts} setSearchDepts={setSearchDepts} searchMetiers={searchMetiers} setSearchMetiers={setSearchMetiers} />} />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/recherche" element={<ResultatsRecherche searchDepts={searchDepts} searchMetiers={searchMetiers} />} />
        <Route path="/inscription-artisan" element={<InscriptionArtisan />} />
        <Route path="/trouver-chantiers" element={<div className="p-20 text-center font-bold">Espace Chantiers (Réservé abonnés)</div>} />
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
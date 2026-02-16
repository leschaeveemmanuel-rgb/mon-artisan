import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench, Search, CheckCircle, ShieldCheck, User, Star, ArrowLeft, Mail, Phone } from 'lucide-react';
// --- IMPORTATION DU CLIENT SUPABASE ---
import { supabase } from './supabaseClient'; 

import { departements } from './data/departements';
import { metiers } from './data/metiers';
import AdSlot from './components/AdSlot';

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
          "La plateforme de confiance connectée en temps réel."
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
        <AdSlot height="h-28" />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="card-premium border-t-4 border-t-orange-500">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg"><Briefcase size={28} /></div>
            <h2 className="text-2xl font-bold mb-3">Espace Professionnel</h2>
            <div className="space-y-3">
              <button onClick={() => navigate('/inscription-artisan')} className="btn-primary bg-orange-600 w-full flex items-center justify-center gap-2"><PlusCircle size={20} /> Je propose mes services</button>
              <button onClick={() => navigate('/trouver-chantiers')} className="w-full py-4 text-orange-600 font-bold border-2 border-orange-600 rounded-2xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2"><List size={20} /> Voir les chantiers</button>
            </div>
          </div>

          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg"><Search size={28} /></div>
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
              <button onClick={() => navigate('/recherche')} disabled={searchMetiers.length === 0 || searchDepts.length === 0} className="btn-secondary w-full">Trouver mon artisan</button>
              <button onClick={() => navigate('/publier-chantier')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"><PlusCircle size={20} /> Publier mon projet (Gratuit)</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// --- 2. PAGE PUBLIER UN CHANTIER (Connexion Supabase) ---
const PublierChantier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMetiers, setSelectedMetiers] = useState([]);
  const [formData, setFormData] = useState({ titre: '', description: '', dept: '', email: '', tel: '' });

  const toggle = (m) => setSelectedMetiers(prev => prev.includes(m) ? prev.filter(i => i !== m) : [...prev, m]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // ENVOI VERS SUPABASE
    const { error } = await supabase
      .from('chantiers')
      .insert([{
        titre: formData.titre,
        description: formData.description,
        metiers_requis: selectedMetiers,
        departement: formData.dept,
        email_client: formData.email,
        telephone_client: formData.tel
      }]);

    if (error) {
      alert("Erreur lors de l'envoi : " + error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} /></div>
      <h2 className="text-3xl font-bold mb-4">Projet enregistré dans la base !</h2>
      <Link to="/" className="btn-primary bg-slate-900 inline-block px-8">Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Publier votre demande</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-3">Métiers nécessaires</label>
            <div className="flex flex-wrap gap-2">{metiers.map(m => (
              <button key={m} type="button" onClick={() => toggle(m)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${selectedMetiers.includes(m) ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500'}`}>{m}</button>
            ))}</div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <select className="input-field pl-4" required onChange={(e) => setFormData({...formData, dept: e.target.value})}>
              <option value="">Département...</option>
              {departements.map(d => <option key={d.code} value={d.code}>{d.code} - {d.nom}</option>)}
            </select>
            <input type="text" className="input-field pl-4" placeholder="Titre du projet" required onChange={(e) => setFormData({...formData, titre: e.target.value})} />
          </div>
          <textarea className="input-field pl-4 h-32 py-4" placeholder="Description..." required onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          <div className="grid md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl">
            <input type="email" className="input-field pl-4 bg-white" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="tel" className="input-field pl-4 bg-white" placeholder="Téléphone" required onChange={(e) => setFormData({...formData, tel: e.target.value})} />
          </div>
          <button type="submit" disabled={loading || selectedMetiers.length === 0} className="btn-primary w-full bg-emerald-600">
            {loading ? "Envoi en cours..." : "Publier mon projet"}
          </button>
        </form>
      </div>
    </main>
  );
};

// --- 3. PAGE INSCRIPTION ARTISAN (Connexion Supabase) ---
const InscriptionArtisan = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedMetiersPro, setSelectedMetiersPro] = useState([]);
  const [formData, setFormData] = useState({ nom: '', tel: '', presentation: '' });
  const LIMIT = 3;

  const toggle = (list, setList, item, max) => {
    if (list.includes(item)) setList(prev => prev.filter(i => i !== item));
    else if (list.length < max) setList(prev => [...prev, item]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('artisans')
      .insert([{
        nom_entreprise: formData.nom,
        metiers: selectedMetiersPro,
        departements: selectedDepts,
        presentation: formData.presentation,
        telephone: formData.tel
      }]);

    if (error) alert(error.message);
    else setSubmitted(true);
    setLoading(false);
  };

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} /></div>
      <h2 className="text-3xl font-bold mb-4">Profil artisan créé !</h2>
      <Link to="/" className="btn-primary bg-slate-900 inline-block px-8">Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-6">Devenir Artisan Partenaire</h2>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-3">Métiers ({selectedMetiersPro.length}/{LIMIT})</label>
            <div className="flex flex-wrap gap-2">{metiers.map(m => (
              <button key={m} type="button" onClick={() => toggle(selectedMetiersPro, setSelectedMetiersPro, m, LIMIT)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${selectedMetiersPro.includes(m) ? 'bg-orange-600 text-white' : 'bg-white text-slate-500'}`} disabled={!selectedMetiersPro.includes(m) && selectedMetiersPro.length >= LIMIT}>{m}</button>
            ))}</div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-3">Départements ({selectedDepts.length}/{LIMIT})</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-4 bg-slate-50 rounded-xl">{departements.map(d => (
              <button key={d.code} type="button" onClick={() => toggle(selectedDepts, setSelectedDepts, d.code, LIMIT)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${selectedDepts.includes(d.code) ? 'bg-orange-600 text-white' : 'bg-white text-slate-500'}`} disabled={!selectedDepts.includes(d.code) && selectedDepts.length >= LIMIT}>{d.code}</button>
            ))}</div>
          </div>
          <textarea className="input-field pl-4 h-32 py-4" placeholder="Votre présentation..." required onChange={(e) => setFormData({...formData, presentation: e.target.value})}></textarea>
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" className="input-field pl-4" placeholder="Nom Entreprise" required onChange={(e) => setFormData({...formData, nom: e.target.value})} />
            <input type="tel" className="input-field pl-4" placeholder="Téléphone Pro" required onChange={(e) => setFormData({...formData, tel: e.target.value})} />
          </div>
          <button type="submit" disabled={loading || selectedDepts.length === 0} className="btn-primary w-full bg-orange-600">
            {loading ? "Création..." : "Enregistrer mon profil"}
          </button>
        </form>
      </div>
    </main>
  );
};

// --- 4. PAGE RÉSULTATS (Lecture en temps réel) ---
const ResultatsRecherche = ({ searchDepts, searchMetiers }) => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      // REQUÊTE SUPABASE : On récupère les artisans filtrés
      const { data, error } = await supabase
        .from('artisans')
        .select('*'); // Pour l'instant on prend tout et on filtre en local pour plus de simplicité

      if (data) {
        const filtered = data.filter(a => 
          a.metiers.some(m => searchMetiers.includes(m)) && 
          a.departements.some(d => searchDepts.includes(d))
        );
        setArtisans(filtered);
      }
      setLoading(false);
    };

    fetchArtisans();
  }, [searchDepts, searchMetiers]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/" className="flex items-center gap-2 text-slate-500 mb-8 font-bold"><ArrowLeft size={20}/> Retour</Link>
      <h2 className="text-3xl font-black mb-10 text-slate-800">Résultats ({artisans.length})</h2>
      
      {loading ? (
        <p className="text-center py-10">Recherche dans la base de données...</p>
      ) : (
        <div className="grid gap-6">
          {artisans.map(a => (
            <div key={a.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex gap-6">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><User size={40}/></div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{a.nom_entreprise}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {a.metiers.map(m => <span key={m} className="bg-orange-50 text-orange-700 text-[10px] font-black px-2 py-1 rounded-md border border-orange-100 uppercase">{m}</span>)}
                </div>
                <p className="text-slate-600 text-sm mb-4">{a.presentation}</p>
                <div className="flex gap-4">
                   <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm">Voir Profil</button>
                   <a href={`tel:${a.telephone}`} className="flex items-center gap-2 text-orange-600 font-bold text-sm"><Phone size={16}/> {a.telephone}</a>
                </div>
              </div>
            </div>
          ))}
          {artisans.length === 0 && <div className="p-12 text-center text-slate-400 font-bold border-2 border-dashed rounded-3xl">Aucun artisan trouvé en base.</div>}
        </div>
      )}
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
        <button className="text-slate-400"><LogOut size={18} /></button>
      </nav>

      <Routes>
        <Route path="/" element={<Home searchDepts={searchDepts} setSearchDepts={setSearchDepts} searchMetiers={searchMetiers} setSearchMetiers={setSearchMetiers} />} />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/recherche" element={<ResultatsRecherche searchDepts={searchDepts} searchMetiers={searchMetiers} />} />
        <Route path="/inscription-artisan" element={<InscriptionArtisan />} />
        <Route path="/trouver-chantiers" element={<div className="p-20 text-center font-bold italic">Espace Chantiers (Connexion requise)</div>} />
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
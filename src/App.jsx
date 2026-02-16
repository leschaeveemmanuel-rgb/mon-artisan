import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, LogOut, Hammer, PlusCircle, List, Wrench } from 'lucide-react';
import { departements } from './data/departements';
import { metiers } from './data/metiers';
import AdSlot from './components/AdSlot';

// --- 1. PAGE D'ACCUEIL ---
const Home = () => {
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
          {/* CARTE ARTISAN */}
          <div className="card-premium border-t-4 border-t-orange-500">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Espace Professionnel</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Consultez les chantiers disponibles dans votre zone et développez votre chiffre d'affaires.
            </p>
            <button onClick={() => navigate('/trouver-chantiers')} className="btn-primary bg-orange-600 hover:bg-orange-700 w-full flex items-center justify-center gap-2">
              <List size={20} /> Voir les chantiers
            </button>
          </div>

          {/* CARTE PARTICULIER */}
          <div className="card-premium border-t-4 border-t-slate-800">
            <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200">
              <PlusCircle size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Espace Particulier</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Besoin de travaux ? Publiez votre projet gratuitement et recevez des propositions d'artisans locaux.
            </p>
            <button onClick={() => navigate('/publier-chantier')} className="btn-secondary w-full flex items-center justify-center gap-2">
              <Hammer size={20} /> Publier mon projet
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

// --- 2. PAGE PUBLIER UN CHANTIER (Particulier) ---
const PublierChantier = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Décrivez votre projet</h2>
        <p className="text-slate-500 mb-8 text-sm italic">Service 100% gratuit pour les particuliers.</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Titre du projet</label>
            <input type="text" className="input-field pl-4" placeholder="ex: Rénovation salle de bain" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Métier</label>
              <select className="input-field pl-4">
                <option>Choisir...</option>
                {metiers.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Département</label>
              <select className="input-field pl-4">
                <option>Localisation</option>
                {departements.map(d => <option key={d.code}>{d.code} - {d.nom}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea className="input-field pl-4 h-32 py-4" placeholder="Détaillez vos besoins..."></textarea>
          </div>

          <button type="button" className="btn-primary w-full bg-orange-600">Publier mon annonce</button>
          <Link to="/" className="block text-center text-slate-400 text-sm mt-4 hover:underline">Retour à l'accueil</Link>
        </form>
      </div>
    </main>
  );
};

// --- 3. PAGE TROUVER DES CHANTIERS (Artisan) ---
const TrouverChantiers = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Chantiers disponibles</h2>
        <p className="text-slate-500 italic text-sm">Abonnement PRO requis pour contacter les clients.</p>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Plombier</span>
              <span className="text-slate-400 text-sm flex items-center gap-1"><MapPin size={14}/> 75 - Paris</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Remplacement chauffe-eau</h3>
            <p className="text-slate-600 text-sm mb-4">Urgent : suite à une fuite, je cherche un artisan pour installer un nouveau ballon...</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-orange-600 font-bold text-sm">
              S'abonner pour voir les coordonnées
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="block text-center text-slate-400 text-sm mt-8 hover:underline">Retour à l'accueil</Link>
    </main>
  );
};

// --- COMPOSANT APP PRINCIPAL ---
const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-xl font-black text-orange-600 tracking-tighter flex items-center gap-2">
          <Hammer size={24} className="text-orange-600" />
          TROUVER<span className="text-slate-900">MON ARTISAN</span>.COM
        </Link>
        <div className="flex gap-4">
            <Link to="/trouver-chantiers" className="text-sm font-bold text-slate-600 hover:text-orange-600 uppercase tracking-widest hidden md:block">Pros</Link>
            <Link to="/publier-chantier" className="text-sm font-bold text-slate-600 hover:text-orange-600 uppercase tracking-widest hidden md:block">Particuliers</Link>
            <button className="text-slate-400 hover:text-red-600 transition-colors">
              <LogOut size={18} />
            </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publier-chantier" element={<PublierChantier />} />
        <Route path="/trouver-chantiers" element={<TrouverChantiers />} />
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
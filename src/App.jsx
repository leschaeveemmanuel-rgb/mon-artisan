// Ajoute "Wrench" dans tes imports de lucide-react en haut :
// import { ..., Wrench } from 'lucide-react';

// ... à l'intérieur de ton composant, ajoute un state pour le métier :
const [selectedMetier, setSelectedMetier] = useState("");

// ... et dans le JSX de la carte "Particuliers" :
<div className="space-y-4">
  {/* Sélecteur de Métier */}
  <div className="relative">
    <Hammer className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
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

  <button className="btn-secondary w-full">Rechercher mon artisan</button>
</div>
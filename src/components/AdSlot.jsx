import React from 'react';

const AdSlot = ({ height = "h-24", label = "Publicité Google AdSense" }) => (
  <div className={`w-full ${height} bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 my-8`}>
    <span className="text-slate-500 text-xs uppercase tracking-widest">{label}</span>
  </div>
);

export default AdSlot;
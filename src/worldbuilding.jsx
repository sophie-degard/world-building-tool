import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Map, Users, Zap, Scroll, Crown, Mountain, Gem } from 'lucide-react';

const WorldbuildingTool = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [regions, setRegions] = useState([]);
  const [subcultures, setSubcultures] = useState([]);
  const [worldData, setWorldData] = useState({
    empire: {
      name: '',
      government: '',
      capital: '',
      population: '',
      notes: ''
    },
    hjarta: {
      geography: '',
      culture: '',
      crystalMagic: '',
      society: '',
      notes: ''
    },
    magicSystem: {
      thermodynamics: '',
      batteries: '',
      technologies: '',
      imbalance: '',
      notes: ''
    },
    conflict: {
      colonization: '',
      energyImbalance: '',
      consequences: '',
      resistance: '',
      notes: ''
    }
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateWorldData = (section, field, value) => {
    setWorldData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const generateRegion = () => {
    const climates = ['Temperato', 'Mediterraneo', 'Montano', 'Desertico', 'Tropicale', 'Continentale'];
    const resources = ['Ferro', 'Oro', 'Cristalli energetici', 'Grano', 'Legname', 'Pietre preziose', 'Carbone magico'];
    const specializations = ['Metallurgia', 'Agricoltura', 'Artigianato', 'Commercio', 'Ricerca magica', 'Militare'];
    const terrains = ['Pianure', 'Montagne', 'Colline', 'Coste', 'Foreste', 'Deserti', 'Paludi'];
    
    const newRegion = {
      id: Date.now(),
      name: `Regione ${regions.length + 1}`,
      climate: climates[Math.floor(Math.random() * climates.length)],
      terrain: terrains[Math.floor(Math.random() * terrains.length)],
      resources: [
        resources[Math.floor(Math.random() * resources.length)],
        resources[Math.floor(Math.random() * resources.length)]
      ],
      specialization: specializations[Math.floor(Math.random() * specializations.length)],
      population: Math.floor(Math.random() * 5000000) + 500000,
      loyalty: Math.floor(Math.random() * 100) + 1,
      notes: ''
    };
    
    setRegions([...regions, newRegion]);
  };

  const generateSubculture = () => {
    const origins = ['Tribù nomadi', 'Conquistatori antichi', 'Mercanti', 'Artigiani', 'Studiosi', 'Guerrieri'];
    const traditions = ['Culto degli antenati', 'Rituali stagionali', 'Cerimonie del fuoco', 'Danze guerriere', 'Arte narrativa'];
    const tensions = ['Autonomia vs controllo centrale', 'Tradizione vs modernità', 'Rivalità economiche', 'Conflitti religiosi'];
    
    const newSubculture = {
      id: Date.now(),
      name: `Cultura ${subcultures.length + 1}`,
      origin: origins[Math.floor(Math.random() * origins.length)],
      mainTradition: traditions[Math.floor(Math.random() * traditions.length)],
      language: Math.random() > 0.5 ? 'Dialetto locale' : 'Lingua antica',
      tension: tensions[Math.floor(Math.random() * tensions.length)],
      integration: Math.floor(Math.random() * 100) + 1,
      notes: ''
    };
    
    setSubcultures([...subcultures, newSubculture]);
  };

  const updateRegion = (id, field, value) => {
    setRegions(regions.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const updateSubculture = (id, field, value) => {
    setSubcultures(subcultures.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeRegion = (id) => {
    setRegions(regions.filter(r => r.id !== id));
  };

  const removeSubculture = (id) => {
    setSubcultures(subcultures.filter(s => s.id !== id));
  };

  const SectionHeader = ({ icon: Icon, title, section }) => (
    <div 
      className="flex items-center gap-2 cursor-pointer p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
      onClick={() => toggleSection(section)}
    >
      <Icon size={20} className="text-slate-600" />
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {expandedSections[section] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </div>
  );

  const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    />
  );

  const Input = ({ value, onChange, placeholder, type = "text" }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Organizzatore Worldbuilding</h1>
        <p className="text-slate-600">Impero Romano-Industriale e Hjarta</p>
      </div>

      <div className="space-y-6">
        {/* Impero Romano-Industriale */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Crown} title="Impero Romano-Industriale" section="empire" />
          {expandedSections.empire && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={worldData.empire.name}
                  onChange={(e) => updateWorldData('empire', 'name', e.target.value)}
                  placeholder="Nome dell'Impero"
                />
                <Input
                  value={worldData.empire.capital}
                  onChange={(e) => updateWorldData('empire', 'capital', e.target.value)}
                  placeholder="Capitale"
                />
                <Input
                  value={worldData.empire.government}
                  onChange={(e) => updateWorldData('empire', 'government', e.target.value)}
                  placeholder="Sistema di governo"
                />
                <Input
                  value={worldData.empire.population}
                  onChange={(e) => updateWorldData('empire', 'population', e.target.value)}
                  placeholder="Popolazione totale"
                />
              </div>
              <TextArea
                value={worldData.empire.notes}
                onChange={(e) => updateWorldData('empire', 'notes', e.target.value)}
                placeholder="Note generali sull'impero (struttura sociale, economia, tecnologie...)"
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Regioni */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Map} title="Regioni dell'Impero" section="regions" />
          {expandedSections.regions && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-700">Regioni Create: {regions.length}</h3>
                <button
                  onClick={generateRegion}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  Genera Regione
                </button>
              </div>
              
              <div className="space-y-4">
                {regions.map(region => (
                  <div key={region.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex justify-between items-start mb-3">
                      <Input
                        value={region.name}
                        onChange={(e) => updateRegion(region.id, 'name', e.target.value)}
                        placeholder="Nome della regione"
                      />
                      <button
                        onClick={() => removeRegion(region.id)}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Clima</label>
                        <p className="text-slate-800">{region.climate}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Terreno</label>
                        <p className="text-slate-800">{region.terrain}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Specializzazione</label>
                        <p className="text-slate-800">{region.specialization}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Risorse</label>
                        <p className="text-slate-800">{region.resources.join(', ')}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Popolazione</label>
                        <p className="text-slate-800">{region.population.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-slate-600 mb-1">Lealtà all'Impero: {region.loyalty}%</label>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${region.loyalty}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <TextArea
                      value={region.notes}
                      onChange={(e) => updateRegion(region.id, 'notes', e.target.value)}
                      placeholder="Note sulla regione (storia, cultura locale, relazioni con altre regioni...)"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sotto-culture */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Users} title="Sotto-culture dell'Impero" section="subcultures" />
          {expandedSections.subcultures && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-700">Culture Create: {subcultures.length}</h3>
                <button
                  onClick={generateSubculture}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} />
                  Genera Cultura
                </button>
              </div>
              
              <div className="space-y-4">
                {subcultures.map(culture => (
                  <div key={culture.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex justify-between items-start mb-3">
                      <Input
                        value={culture.name}
                        onChange={(e) => updateSubculture(culture.id, 'name', e.target.value)}
                        placeholder="Nome della cultura"
                      />
                      <button
                        onClick={() => removeSubculture(culture.id)}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Origine</label>
                        <p className="text-slate-800">{culture.origin}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Lingua</label>
                        <p className="text-slate-800">{culture.language}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-slate-600 mb-1">Tradizione Principale</label>
                      <p className="text-slate-800">{culture.mainTradition}</p>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-slate-600 mb-1">Tensione Principale</label>
                      <p className="text-slate-800">{culture.tension}</p>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-slate-600 mb-1">Integrazione nell'Impero: {culture.integration}%</label>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${culture.integration}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <TextArea
                      value={culture.notes}
                      onChange={(e) => updateSubculture(culture.id, 'notes', e.target.value)}
                      placeholder="Note sulla cultura (costumi, credenze, rapporti con altre culture...)"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hjarta */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Gem} title="Hjarta - L'Isola Nascosta" section="hjarta" />
          {expandedSections.hjarta && (
            <div className="p-6 space-y-4">
              <TextArea
                value={worldData.hjarta.geography}
                onChange={(e) => updateWorldData('hjarta', 'geography', e.target.value)}
                placeholder="Geografia di Hjarta (paesaggi, clima, città principali...)"
              />
              <TextArea
                value={worldData.hjarta.culture}
                onChange={(e) => updateWorldData('hjarta', 'culture', e.target.value)}
                placeholder="Cultura matriarcale (struttura sociale, tradizioni, valori...)"
              />
              <TextArea
                value={worldData.hjarta.crystalMagic}
                onChange={(e) => updateWorldData('hjarta', 'crystalMagic', e.target.value)}
                placeholder="Magia dei cristalli (come funziona, rituali, connessione con il cuore del mondo...)"
              />
              <TextArea
                value={worldData.hjarta.society}
                onChange={(e) => updateWorldData('hjarta', 'society', e.target.value)}
                placeholder="Organizzazione sociale (ruoli, gerarchie, vita quotidiana...)"
              />
              <TextArea
                value={worldData.hjarta.notes}
                onChange={(e) => updateWorldData('hjarta', 'notes', e.target.value)}
                placeholder="Note generali su Hjarta"
              />
            </div>
          )}
        </div>

        {/* Sistema Magico */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Zap} title="Sistema Magico Termodinamico" section="magic" />
          {expandedSections.magic && (
            <div className="p-6 space-y-4">
              <TextArea
                value={worldData.magicSystem.thermodynamics}
                onChange={(e) => updateWorldData('magicSystem', 'thermodynamics', e.target.value)}
                placeholder="Principi termodinamici (conservazione dell'energia, trasformazioni, limiti...)"
              />
              <TextArea
                value={worldData.magicSystem.batteries}
                onChange={(e) => updateWorldData('magicSystem', 'batteries', e.target.value)}
                placeholder="Batterie magiche (come si creano, capacità, durata, efficienza...)"
              />
              <TextArea
                value={worldData.magicSystem.technologies}
                onChange={(e) => updateWorldData('magicSystem', 'technologies', e.target.value)}
                placeholder="Tecnologie alimentate dalla magia (trasporti, macchinari, comunicazioni...)"
              />
              <TextArea
                value={worldData.magicSystem.imbalance}
                onChange={(e) => updateWorldData('magicSystem', 'imbalance', e.target.value)}
                placeholder="Scompenso energetico (cause, effetti, conseguenze sul mondo...)"
              />
              <TextArea
                value={worldData.magicSystem.notes}
                onChange={(e) => updateWorldData('magicSystem', 'notes', e.target.value)}
                placeholder="Note aggiuntive sul sistema magico"
              />
            </div>
          )}
        </div>

        {/* Conflitto Coloniale */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Mountain} title="Conflitto Coloniale" section="conflict" />
          {expandedSections.conflict && (
            <div className="p-6 space-y-4">
              <TextArea
                value={worldData.conflict.colonization}
                onChange={(e) => updateWorldData('conflict', 'colonization', e.target.value)}
                placeholder="Processo di colonizzazione (come è avvenuto, strategie, prime reazioni...)"
              />
              <TextArea
                value={worldData.conflict.energyImbalance}
                onChange={(e) => updateWorldData('conflict', 'energyImbalance', e.target.value)}
                placeholder="Scompenso energetico causato (meccanismi, progressione, punti critici...)"
              />
              <TextArea
                value={worldData.conflict.consequences}
                onChange={(e) => updateWorldData('conflict', 'consequences', e.target.value)}
                placeholder="Conseguenze dello scompenso (effetti su Hjarta, sull'Impero, sul mondo...)"
              />
              <TextArea
                value={worldData.conflict.resistance}
                onChange={(e) => updateWorldData('conflict', 'resistance', e.target.value)}
                placeholder="Resistenza e reazioni (movimenti di ribellione, alleanze, contrattacchi...)"
              />
              <TextArea
                value={worldData.conflict.notes}
                onChange={(e) => updateWorldData('conflict', 'notes', e.target.value)}
                placeholder="Note aggiuntive sul conflitto"
              />
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <SectionHeader icon={Scroll} title="Timeline & Relazioni" section="timeline" />
          {expandedSections.timeline && (
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Riepilogo Attuale</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Regioni create:</strong> {regions.length}</p>
                  <p><strong>Culture create:</strong> {subcultures.length}</p>
                  <p><strong>Lealtà media regioni:</strong> {regions.length > 0 ? Math.round(regions.reduce((acc, r) => acc + r.loyalty, 0) / regions.length) : 0}%</p>
                  <p><strong>Integrazione media culture:</strong> {subcultures.length > 0 ? Math.round(subcultures.reduce((acc, c) => acc + c.integration, 0) / subcultures.length) : 0}%</p>
                </div>
              </div>
              
              <TextArea
                placeholder="Timeline degli eventi principali (scoperta di Hjarta, prime esplorazioni, inizio colonizzazione, eventi chiave...)"
                rows={6}
              />
              
              <TextArea
                placeholder="Relazioni inter-regionali (alleanze, rivalità, rotte commerciali, conflitti...)"
                rows={4}
              />
              
              <TextArea
                placeholder="Impatti differenziati della colonizzazione (come ogni regione reagisce, benefici/danni economici...)"
                rows={4}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldbuildingTool;
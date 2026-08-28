import React, { useState } from 'react';
import { FiSave, FiAlertCircle } from 'react-icons/fi';

interface SettingsProps {
  onSettingsSave?: (settings: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ onSettingsSave }) => {
  const [settings, setSettings] = useState({
    blogTitle: 'Pipeline SAASFI',
    blogDescription: 'Um blog profissional sobre SaaS e Afiliados',
    postsPerPage: 10,
    enableComments: true,
    enableSearch: true,
    googleAnalytics: '',
    siteKeywords: 'blog, saas, afiliados',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('blog_settings', JSON.stringify(settings));
    }
    setSaved(true);
    onSettingsSave?.(settings);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações do seu blog</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-green-600 rounded-full" />
          <p className="text-green-800 text-sm">Configurações salvas com sucesso!</p>
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Informações Gerais</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título do Blog
          </label>
          <input
            type="text"
            value={settings.blogTitle}
            onChange={(e) => setSettings({ ...settings, blogTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição do Blog
          </label>
          <textarea
            value={settings.blogDescription}
            onChange={(e) => setSettings({ ...settings, blogDescription: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Palavras-chave do Site
          </label>
          <input
            type="text"
            value={settings.siteKeywords}
            onChange={(e) => setSettings({ ...settings, siteKeywords: e.target.value })}
            placeholder="Separadas por vírgula"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Exibição</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Posts por Página
          </label>
          <select
            value={settings.postsPerPage}
            onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={5}>5 posts</option>
            <option value={10}>10 posts</option>
            <option value={20}>20 posts</option>
            <option value={50}>50 posts</option>
          </select>
        </div>
      </div>

      {/* Features Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Recursos</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableComments}
              onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-700">Habilitar Comentários</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableSearch}
              onChange={(e) => setSettings({ ...settings, enableSearch: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-700">Habilitar Busca</span>
          </label>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FiAlertCircle className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Google Analytics</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID do Google Analytics
          </label>
          <input
            type="text"
            value={settings.googleAnalytics}
            onChange={(e) => setSettings({ ...settings, googleAnalytics: e.target.value })}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="text-xs text-gray-600 mt-1">
            Deixe em branco para desabilitar o Google Analytics
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          <FiSave size={20} />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Settings;
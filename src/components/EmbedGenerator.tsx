'use client';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { EmbedData } from '@/types';
import { Copy, ExternalLink, Eye } from 'lucide-react';
import AdaptiveBackground from './AdaptiveBackground';
export function EmbedGenerator() {
  const { t } = useLanguage();
  const [embedData, setEmbedData] = useState<EmbedData>({
    title: '',
    description: '',
    image: '',
    color: '#a855f7',
    url: '',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const generateUrl = () => {
    const title = embedData.title.trim() || t.defaultEmbedTitle;
    const description = embedData.description.trim() || t.defaultEmbedDescription;
    const params = new URLSearchParams({
      title: title,
      description: description,
      image: embedData.image,
      color: embedData.color,
    });
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/embed?${params.toString()}`;
    setGeneratedUrl(url);
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <AdaptiveBackground>
      <div className="min-h-screen relative z-10 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          {}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-4">
              {t.embedTitle}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t.embedDescription}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <ExternalLink className="w-6 h-6" />
                {t.configuration}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    {t.customTitle}
                  </label>
                  <input
                    type="text"
                    value={embedData.title}
                    onChange={(e) => setEmbedData({ ...embedData, title: e.target.value })}
                    className="w-full px-4 py-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all"
                    placeholder={t.titlePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    {t.customDescription}
                  </label>
                  <textarea
                    value={embedData.description}
                    onChange={(e) => setEmbedData({ ...embedData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all resize-none"
                    placeholder={t.descriptionPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    {t.customImage}
                  </label>
                  <input
                    type="url"
                    value={embedData.image}
                    onChange={(e) => setEmbedData({ ...embedData, image: e.target.value })}
                    className="w-full px-4 py-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all"
                    placeholder={t.imagePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    {t.customColor}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={embedData.color}
                      onChange={(e) => setEmbedData({ ...embedData, color: e.target.value })}
                      className="w-12 h-12 border border-white/30 rounded-xl cursor-pointer bg-white/20 backdrop-blur-md"
                    />
                    <input
                      type="text"
                      value={embedData.color}
                      onChange={(e) => setEmbedData({ ...embedData, color: e.target.value })}
                      className="flex-1 px-4 py-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all"
                    />
                  </div>
                </div>
                <button
                  onClick={generateUrl}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t.generateUrl}
                </button>
              </div>
              {}
              {generatedUrl && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    URL Generada
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={generatedUrl}
                      readOnly
                      className="flex-1 px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
                        copied 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? t.urlCopied : t.copyUrl}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  {t.previewTitle}
                </h2>
              </div>
              {}
              <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div 
                    className="w-1 rounded-full" 
                    style={{ backgroundColor: embedData.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-base mb-2">
                      {embedData.title.trim() || t.defaultEmbedTitle}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {embedData.description.trim() || t.defaultEmbedDescription}
                    </p>
                    {embedData.image && (
                      <div className="rounded-xl overflow-hidden">
                        <img 
                          src={embedData.image} 
                          alt="Preview" 
                          className="w-full max-w-sm h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdaptiveBackground>
  );
}

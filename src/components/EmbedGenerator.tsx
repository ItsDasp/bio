'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { EmbedData } from '@/types';
import { Copy, ExternalLink } from 'lucide-react';
import AdaptiveBackground from './AdaptiveBackground';
import Image from 'next/image';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateUrl = () => {
    if (!mounted) return;
    
    const title = embedData.title.trim() || t.defaultEmbedTitle;
    const description = embedData.description.trim() || t.defaultEmbedDescription;
    const params = new URLSearchParams({
      title: title,
      description: description,
      image: embedData.image,
      color: embedData.color,
    });
    
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://xdasp.me';
      
    const url = `${baseUrl}/embed?${params.toString()}`;
    setGeneratedUrl(url);
  };

  const copyToClipboard = async () => {
    if (!mounted || typeof navigator === 'undefined') return;
    
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openInNewTab = () => {
    if (!mounted || typeof window === 'undefined') return;
    window.open(generatedUrl, '_blank');
  };

  return (
    <AdaptiveBackground>
      <div className="min-h-screen relative z-10 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{t.embedTitle}</h1>
            <p className="text-gray-300 text-lg mb-8">{t.embedDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">{t.configuration}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.customTitle}
                  </label>
                  <input
                    type="text"
                    placeholder={t.titlePlaceholder}
                    value={embedData.title}
                    onChange={(e) => setEmbedData({ ...embedData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.customDescription}
                  </label>
                  <textarea
                    placeholder={t.descriptionPlaceholder}
                    value={embedData.description}
                    onChange={(e) => setEmbedData({ ...embedData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.customImage}
                  </label>
                  <input
                    type="url"
                    placeholder={t.imagePlaceholder}
                    value={embedData.image}
                    onChange={(e) => setEmbedData({ ...embedData, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.customColor}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={embedData.color}
                      onChange={(e) => setEmbedData({ ...embedData, color: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={embedData.color}
                      onChange={(e) => setEmbedData({ ...embedData, color: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <button
                  onClick={generateUrl}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  {t.generateUrl}
                </button>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">{t.previewTitle}</h2>
              
              <div className="space-y-4">
                <div className="bg-[#2f3136] rounded-lg p-4 border-l-4" style={{ borderLeftColor: embedData.color }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {embedData.title || t.defaultEmbedTitle}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {embedData.description || t.defaultEmbedDescription}
                      </p>
                      {mounted && embedData.image && (
                        <Image
                          src={embedData.image}
                          alt="Preview"
                          width={400}
                          height={200}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {generatedUrl && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-gray-300 text-sm mb-2">URL Generada:</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs text-gray-400 bg-black/20 p-2 rounded overflow-x-auto">
                          {generatedUrl}
                        </code>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? t.urlCopied : t.copyUrl}
                      </button>
                      
                      <button
                        onClick={openInNewTab}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t.visitLink}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdaptiveBackground>
  );
}
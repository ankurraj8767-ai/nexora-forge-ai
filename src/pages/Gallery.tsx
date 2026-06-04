import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Download, Share2,
  Grid, List, Search, ArrowRight, Zap,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const categories = ['All', 'Text to Image', 'Text to Video', 'Image to Video', 'AI Thumbnail', 'Logo'];
const sortOptions = ['Trending', 'Newest', 'Most Liked', 'Most Downloaded'];

export default function Gallery() {
  const { galleryItems, likeGalleryItem } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = galleryItems
    .filter((item) => {
      if (activeCategory !== 'All' && item.type !== activeCategory) return false;
      if (searchQuery && !item.prompt.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Trending') return b.likes - a.likes;
      if (sortBy === 'Newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'Most Liked') return b.likes - a.likes;
      if (sortBy === 'Most Downloaded') return b.downloads - a.downloads;
      return 0;
    });

  const handleShare = (platform: string, item: typeof galleryItems[0]) => {
    const url = `${window.location.origin}/gallery`;
    const text = `Check out this amazing AI creation: "${item.prompt}"`;
    
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">Community Gallery</span>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Trending{' '}
            <span className="text-gradient-rainbow">Creations</span>
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Explore amazing AI-generated content from our creative community. Get inspired and share your own!
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creations..."
              className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-neon-indigo text-white'
                      : 'glass text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 glass rounded-lg text-sm text-zinc-300 focus:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="flex glass rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-neon-indigo/20 text-neon-cyan' : 'text-zinc-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-neon-indigo/20 text-neon-cyan' : 'text-zinc-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group glass rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.imageUrl}
                    alt={item.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Hover actions */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => likeGalleryItem(item.id)}
                      className={`p-2 rounded-lg backdrop-blur ${item.liked ? 'bg-red-500/80 text-white' : 'bg-black/60 text-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${item.liked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white/10 backdrop-blur rounded-lg text-xs text-white flex items-center justify-center gap-1 hover:bg-white/20">
                        <Download className="w-3 h-3" /> Download
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp', item)}
                        className="flex-1 py-2 bg-white/10 backdrop-blur rounded-lg text-xs text-white flex items-center justify-center gap-1 hover:bg-white/20"
                      >
                        <Share2 className="w-3 h-3" /> Share
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-neon-cyan font-medium mb-1">{item.type}</p>
                  <p className="text-sm text-white line-clamp-2 mb-3">{item.prompt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.userAvatar ? (
                        <img src={item.userAvatar} alt="" className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-neon-indigo/30" />
                      )}
                      <span className="text-xs text-zinc-400">{item.userName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" /> {item.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4 flex gap-4"
              >
                <img src={item.imageUrl} alt="" className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-neon-cyan font-medium">{item.type}</p>
                  <p className="text-sm text-white mt-1 line-clamp-2">{item.prompt}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Heart className="w-3 h-3" /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Download className="w-3 h-3" /> {item.downloads}
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => likeGalleryItem(item.id)}
                        className={`p-2 rounded-lg ${item.liked ? 'text-red-400' : 'text-zinc-500 hover:text-red-400'}`}
                      >
                        <Heart className={`w-4 h-4 ${item.liked ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 text-zinc-500 hover:text-neon-cyan">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No creations found matching your criteria.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400 mb-4">Want to see your creations here?</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all"
          >
            <Zap className="w-4 h-4" />
            Start Creating
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

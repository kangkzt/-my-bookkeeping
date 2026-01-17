import { secureStorage } from '../utils/secureStorage';

export const THEMES = [
    { id: 'default', name: '极光绿', color: '#34D399', description: '清新自然，灵动护眼', colors: { primary: '#34D399', bg: '#F3F4F6', card: '#FFFFFF' } },
    { id: 'sky-azure', name: '晴空蓝', color: '#00B8D9', description: '广阔舒适，心旷神怡', colors: { primary: '#00B8D9', bg: '#EDF9FF', card: '#FFFFFF' } },
    { id: 'imperial-gold', name: '御尊金', color: '#B8860B', description: '皇家礼遇，奢华典雅', colors: { primary: '#D4AF37', bg: '#1A1A1A', card: '#2D2D2D', text: '#FFD700' } },
    { id: 'deep-sapphire', name: '尊享深蓝', color: '#1890FF', description: '高端商务，智慧沉稳', colors: { primary: '#1890FF', bg: '#F0F5FF', card: '#FFFFFF' } },
    { id: 'sunset-violet', name: '落日紫罗兰', color: '#722ED1', description: '优雅浪漫，潮流时尚', colors: { primary: '#722ED1', bg: '#F9F0FF', card: '#FFFFFF' } },
    { id: 'rose-quartz', name: '蔷薇石英', color: '#FF85C0', description: '温柔治愈，唯美清新', colors: { primary: '#FF85C0', bg: '#FFF9FA', card: '#FFFFFF' } },
    { id: 'forest-mint', name: '森林薄荷', color: '#52C41A', description: '生机勃勃，回归自然', colors: { primary: '#52C41A', bg: '#F6FFED', card: '#FFFFFF' } },
    { id: 'golden-glaze', name: '琥珀金釉', color: '#FAAD14', description: '华贵典雅，温暖明亮', colors: { primary: '#FAAD14', bg: '#FFFBE6', card: '#FFFFFF' } },
    { id: 'minimalist-luxe', name: '极简黑金', color: '#1A1A1A', description: '极客格调，内敛奢华', colors: { primary: '#1A1A1A', bg: '#F5F5F5', card: '#FFFFFF' } },
    { id: 'cyber-neon', name: '赛博霓虹', color: '#00F2FF', description: '未来主义，深夜律动', colors: { primary: '#13C2C2', bg: '#000C17', card: '#001529' } },
];

export const ThemeService = {
    getTheme: async () => {
        try {
            return (await secureStorage.get('app_theme')) || 'default';
        } catch (e) {
            return 'default';
        }
    },

    setTheme: async (themeId) => {
        try {
            await secureStorage.set('app_theme', themeId);
            ThemeService.applyTheme(themeId);
        } catch (e) {
            console.error('Failed to save theme:', e);
        }
    },

    applyTheme: (themeId) => {
        if (themeId === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', themeId);
        }
    },

    init: async () => {
        const theme = await ThemeService.getTheme();
        ThemeService.applyTheme(theme);
    }
};

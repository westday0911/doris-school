-- Seed articles
INSERT INTO articles (title, slug, excerpt, content, category, tags, image, date)
VALUES 
('如何用 AI 做市場研究？', 'ai-market-research', '這篇文章將深入探討 3 個高效的提示詞框架...', '<p>在資訊爆炸的時代...</p>', '實戰教學', ARRAY['Prompt Engineering', '市場分析'], 'https://images.unsplash.com/photo-1485828333669-bd5ecd0a37b0?w=600&h=400&fit=crop', '2024-03-20'),
('Vibe Coding: 2025 年的開發新範式', 'vibe-coding-2025', '探討如何利用 AI 輔助工具進入高效的開發狀態...', '<p>不僅僅是編碼...</p>', '技術趨勢', ARRAY['Vibe Coding', '開發效能'], 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop', '2024-03-05')
ON CONFLICT (slug) DO NOTHING;

-- Seed tools
INSERT INTO tools (title, description, type, image_url, access_count, status)
VALUES 
('智能市場分析助理', '自動爬取競爭對手數據並生成週報的 AI 助理。', 'AI Agent', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', 542, '上架中'),
('提示詞優化器', '將模糊的指令轉化為精確的結構化提示詞。', '小工具', 'https://images.unsplash.com/photo-1664575602554-20d7b9464b68?w=600&h=400&fit=crop', 1240, '上架中')
ON CONFLICT DO NOTHING;

-- Seed courses
INSERT INTO courses (title, slug, description, tag, level, duration, original_price, discount_price, image_url)
VALUES 
('Vibe Coding 系統實戰課', 'vibe-coding', '掌握最新的 Vibe Coding 趨勢，打造具備極致體驗的現代化應用。', '進階課', '進階', '12 小時', 12800, 8800, 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop')
ON CONFLICT (slug) DO NOTHING;



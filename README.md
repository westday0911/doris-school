# Doris AI 學院

一個現代化的 AI 學習平台，包含課程、文章、工具與服務。

## 🛠 技術棧

- **Frontend**: Next.js 14, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Auth, Database, Storage)
- **Icons**: Lucide React

## 🚀 快速開始

1.  **安裝依賴**：
    ```bash
    npm install
    ```

2.  **設定環境變數**：
    在根目錄建立 `.env.local` 檔案：
    ```env
    NEXT_PUBLIC_SUPABASE_URL=你的_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_ANON_KEY
    ```

3.  **啟動開發伺服器**：
    ```bash
    npm run dev
    ```

## 🗄️ 資料庫遷移 (Database Migration)

本專案使用 Supabase 作為後台資料庫。遷移檔案位於 `supabase/migrations` 目錄下。

### 方法一：透過 Supabase CLI (推薦)

如果你本地有安裝 Supabase CLI，可以執行：

```bash
# 連結你的專案
supabase link --project-ref 你的_PROJECT_ID

# 推送遷移到雲端資料庫
supabase db push
```

### 方法二：手動執行 SQL

1. 進入 [Supabase Dashboard](https://supabase.com/dashboard)。
2. 進入你的專案，點擊左側的 **SQL Editor**。
3. 依序開啟 `supabase/migrations/` 下的檔案，複製內容並執行。

## 📂 目錄結構

- `app/`: Next.js App Router 頁面與路由
- `components/`: 重複使用的 UI 元件
- `lib/`: 工具函式與 Supabase 客戶端配置
- `supabase/migrations/`: 資料庫遷移 SQL 檔案
- `public/`: 靜態資產 (圖片、字體)

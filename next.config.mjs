/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // 當使用者輸入這個網址（支援有無斜線）
        source: '/demo/ai-tool-library',
        // 實際上讀取的檔案路徑
        destination: '/demo/ai-tool-library/index.html',
      },
    ];
  },
};

export default nextConfig;

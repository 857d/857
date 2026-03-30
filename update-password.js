const fs = require('fs');

// 你的文章路径（我已经按你仓库写好了！）
const POST_PATH = './blogs/2026tiktok.json';

// 生成 1~9999 随机数字密码
const newPassword = Math.floor(Math.random() * 9999) + 1;

// 读取并修改 JSON
const data = JSON.parse(fs.readFileSync(POST_PATH, 'utf8'));
data.password = newPassword.toString();

// 保存
fs.writeFileSync(POST_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ 每日密码已自动更新：', newPassword);


const fs = require('fs');
const path = require('path');

// 配置文件路径
const configPath = path.join(__dirname, '../../public/blogs/2026tiktok/post_config.json');

// 生成6位随机数字密码（可自定义规则）
const generatePassword = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 更新密码
const updatePassword = () => {
  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(raw);
    const newPassword = generatePassword();
    config.password = newPassword;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ 密码已更新为: ${newPassword}`);
    // 可选：将新密码写入环境变量或发送通知
  } catch (error) {
    console.error('❌ 更新失败:', error);
    process.exit(1);
  }
};

updatePassword();

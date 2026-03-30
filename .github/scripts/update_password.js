
const fs = require('fs');
const path = require('path');

// 配置文件根目录（相对于脚本所在位置）
// 脚本在 .github/scripts/ 下，根目录为 ../../
const rootDir = path.join(__dirname, '../../public/blogs');

// 生成6位随机数字密码（可根据需要修改）
const generatePassword = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 递归查找所有 post_config.json 文件
function findConfigFiles(dir) {
  let results = [];
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // 递归进入子目录
        results = results.concat(findConfigFiles(fullPath));
      } else if (item === 'post_config.json') {
        results.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`❌ 读取目录失败 ${dir}:`, err.message);
  }
  return results;
}

// 更新单个配置文件
function updateConfig(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(raw);

    // 只处理标记了 autoUpdate === true 的文件
    if (config.autoUpdate === true) {
      const newPassword = generatePassword();
      config.password = newPassword;
      fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
      console.log(`✅ 已更新密码: ${filePath} -> ${newPassword}`);
      return true;
    } else {
      console.log(`⏭️ 跳过（未启用自动更新）: ${filePath}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ 处理文件失败 ${filePath}:`, err.message);
    return false;
  }
}

// 主函数
function main() {
  console.log('🔍 正在扫描配置文件...');
  const configFiles = findConfigFiles(rootDir);
  console.log(`📁 共找到 ${configFiles.length} 个 post_config.json`);

  let updatedCount = 0;
  for (const file of configFiles) {
    if (updateConfig(file)) {
      updatedCount++;
    }
  }

  console.log(`✨ 完成，共更新 ${updatedCount} 个密码。`);
}

main();

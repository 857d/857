import json
import random
import time
from datetime import datetime

CONFIG_FILE = "post_config.json"
WAIT_SECONDS = 86400  # 24小时


def load_config():
    with open(CONFIG_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_config(data):
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def generate_new_password():
    return random.randint(1, 9999)


def run_auto_update():
    print("🔐 24小时自动修改密码程序已启动")
    print(f"⏱  每 {WAIT_SECONDS} 秒更新一次 1~9999 随机数字密码\n")

    while True:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        new_pwd = generate_new_password()

        config = load_config()
        old_pwd = config.get("password", "")
        config["password"] = new_pwd
        save_config(config)

        print(f"[{now}] 密码已更新：{old_pwd} → {new_pwd}")
        print(f"下次更新将在 24小时后\n")

        time.sleep(WAIT_SECONDS)


if __name__ == "__main__":
    run_auto_update()

import os
import subprocess
from datetime import datetime, timedelta
import random

# Configurações do Alvo
TARGET_EMAIL = "arthurperico1212@gmail.com"
TARGET_NAME = "arthurperico"

# Datas Limite
START_DATE = datetime(2025, 3, 11)
END_DATE = datetime.now()

def create_commit(date_obj):
    date_str = date_obj.strftime('%Y-%m-%dT%H:%M:%S')
    
    with open("legacy_sync.log", "a") as f:
        f.write(f"Legacy Intel: {date_str} - Sync ID {random.randint(100, 999)}\n")
    
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = date_str
    env["GIT_COMMITTER_DATE"] = date_str
    
    subprocess.run(["git", "add", "legacy_sync.log"], check=True)
    
    msg = f"chore(intel): update global trend intelligence {date_obj.strftime('%Y.%m.%d')}"
    co_author = f"\n\nCo-authored-by: {TARGET_NAME} <{TARGET_EMAIL}>"
    
    subprocess.run(["git", "commit", "-m", msg + co_author], env=env, check=True)

delta = END_DATE - START_DATE
all_days = [START_DATE + timedelta(days=i) for i in range(delta.days + 1)]

days_to_fill = random.sample(all_days, k=min(len(all_days), 120)) 

for day in days_to_fill:
    num_commits = random.randint(5, 14)
    
    for _ in range(num_commits):
        h = random.randint(8, 20)
        m = random.randint(0, 59)
        s = random.randint(0, 59)
        commit_time = day.replace(hour=h, minute=m, second=s)
        
        create_commit(commit_time)

print(f"Histórico gerado de {START_DATE.date()} até {END_DATE.date()}.")

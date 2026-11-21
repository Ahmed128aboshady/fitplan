"""Copy the shared web UI into Android assets after editing fitplan-app."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parent
shutil.copytree(root/'fitplan-app',root/'fitplan-android/app/src/main/assets',dirs_exist_ok=True)
print('Android assets synced.')

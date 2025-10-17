# Project Name
gomadareScripts

# Project Goal
このプロジェクトは、Minecraftマルチサーバー「gomadare」のサーバーとクライアントの動作をKubeJSにてカスタマイズし、ゲームプレイを調整することを目的としています。

# Technology Stack
- KubeJS (Minecraft Modding Framework)
- JavaScript

# Project Structure
- `server_scripts/`: サーバーサイドで実行されるスクリプトが格納されています。
- `client_scripts/`: クライアントサイドで実行されるスクリプトが格納されています。
- `startup_scripts/`: ゲームの起動時に実行されるスクリプトが格納されています。
- `data/`: スクリプトが使用するデータファイル（設定など）が格納されています。
- `assets/`: リソースファイルが格納されています。

# Development Rules & Conventions
- **言語:** コメントやドキュメントは主に日本語で記述してください。
- **目的:** 作成または変更するスクリプトは、Minecraftのゲームプレイを調整・変更するという目的から逸脱しないようにしてください。
- **コードスタイル:** `README.md` にも記載されている通り、既存のコードスタイルは必ずしも一貫していない可能性があります。新しいコードを追加する際は、可読性とメンテナンス性を意識してください。
- **ライセンス:** このプロジェクトは `GNU LESSER GENERAL PUBLIC LICENSE Version 2.1` の下にあります。

# Example Scripts
- `food_heals.js`: 食べ物を食べた際の体力回復ロジックを実装しています。
- `starterKit.js`: プレイヤーが最初にログインした際に初期アイテムを配布します。
- `always_edible.js`: 満腹度に関わらず食べ物を食べられるように変更します。

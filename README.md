# Nontaro-Learn
のんたろう勉強用
あみだくじ、ルーレット、占い、などの小さくて簡素な機能をいろいろ使えるアプリにしよう

## Git開発　ルール
- タスクはissueで管理すること
- ブランチはissueごとにdevelopから切ること
- ブランチの名称は`feature-{issue番号}`とする
  - 例：”feature-6”
- コミットメッセージは、コミットで行った変更内容が端的に分かるように記載すること
- コミットメッセージには `#{issue番号}`を末尾に記載すること
  - 例：”削除ボタンを追加した #6”

### Git 開発手順
Gitでの開発は以下の手順にそって行うこと
  1. issueの発行（または取り掛かるissueを決める）
    - 発行時はgithubのIssuesタブから`New issue`ボタンを押下し、必要事項を記載する
  2. ローカルリポジトリのdevelopブランチを最新にする
     ```bash
     git switch develop
     git pull origin develop
     ```
  3. ローカルリポジトリで新たにブランチを切る
     ```bash
     git switch -c feature-{issue番号}
     ```
  4. ソースコード変更
  5. コミットしたい内容がまとまったらステージング
     ```bash
     git add {変更を加えたファイルのファイルパス}
     ```
  6. ステージングしたらコミット
     ```bash
     git commit -m "{コミットメッセージ} #{issue番号}"
     ```
  7. 手順 4, 5, 6をして、リモートリポジトリに反映したいタイミングでプッシュする
     ```bash
     git push origin feature-{issue番号}
     ```
  8. issueに示されている課題を達成したらプルリクエストを発行する（レビューを依頼をしても良い）
     1. githubのPull requestタブから`New pull request`を押下
     2. baseをdevelop、compareをfeature-{issue番号}のブランチにして`Create pull request`を押下
     3. 必要事項を記載して`Create pull request`を押下する、titleはissueのタイトルにすること
  9.  プルリクエストからマージする（プロジェクト管理者のみがマージする形でもよい）

## 環境構築手順
1. リポジトリをクローンする
   ```bash
   git clone git@github.com:N0ntar0/Nontaro-Learn.git
   ```
2. node_modulesを作成する
   ```bash
   cd Nontaro-Learn
   npm install
   ```

## サーバー起動
  ```bash
  npm run dev
  ```

## 静的ファイルに出力
  ```bash
  npm run build
  ```
# ADR 0001: ローカルLighthouse評価と画像配信最適化

- Status: Accepted
- Date: 2026-08-06
- Owners: Shogo Kitada / portfolio maintainers

## Context

shogo0x2e.comはAstroで生成しCloudflare Pagesへ配信する静的ポートフォリオである．現状のLighthouse Performanceは96で，FCP 0.4秒，LCP 1.3秒，TBT 0 ms，CLS 0と十分良好である一方，Lighthouseは画像配信について約2,466 KiBの削減余地を報告している．また，Forced reflow，LCP request discovery，Network dependency tree，cache lifetime，render-blocking requestsも候補として表示されている．

現在は手動でLighthouseを実行しており，変更前後を同じ条件で比較するコマンド，保存可能なレポート，最低品質を守る仕組みがない．開発サーバーは本番ビルドと出力条件が異なるため，性能評価の基準には適さない．

## Decision

### 1. ローカル評価基盤

`@lhci/cli`をdev dependencyとして導入し，Lighthouse CIの設定をリポジトリに置く．`npm run build`で生成した`dist/`を`astro preview`で配信し，そのURLを評価する．開発サーバーは性能評価に使用しない．

次の入口をモバイル条件で評価する．

- `/`
- `/ja/`
- `/work/`
- `/ja/work/`

各URLは原則3回測定し，単発の変動で判断しない．英語トップと日本語トップは別URLとして明示し，ブラウザーのlocale redirectに評価結果を左右させない．HTML/JSONレポートは`.lighthouseci/`に出力し，Git管理対象外とする．

次の開発者向け入口を用意する．名称は既存のnpm scriptsおよびMakefileと整合する範囲で調整してよい．

- `npm run lighthouse`
- `make lighthouse`

コマンドはbuild，preview serverの起動待ち，Lighthouse実行，server終了までを再現可能に行う．既存の`make dev`，`make build`，`make preview`を壊さない．READMEに実行方法とレポート場所を追記する．

### 2. 評価基準

初回実装では，現在値を記録できることを優先する．環境差で不安定なPerformanceの100点を要求しない．ただし明確な退行を検出するため，安定性を確認したうえで次を最低基準とする．

- Performance: 0.90以上
- Accessibility: 0.95以上
- Best Practices: 0.95以上
- SEO: 0.95以上
- CLS: 0.10以下

閾値導入によって既存ページが失敗する場合，失敗項目と実測値を報告し，基準を黙って下げない．ローカル実行を先に整備し，GitHub Actionsへの組み込みは今回の必須範囲に含めない．

### 3. 性能改善の優先順位

改善はLighthouseの表示順ではなく，実測影響と削減可能量で判断する．

1. 画像配信
2. LCP画像の発見と優先度
3. Forced reflowの発生元と所要時間
4. Network dependency / render blocking
5. cache lifetime

画像配信では，少なくとも以下の大容量画像と，トップページで実際に配信される画像を調査する．

- `public/images/rat-hunt-boogie.png`
- `public/images/you-n-flower.png`
- `public/images/shibalab-projection-mapping.png`
- `public/images/blackhole-boogie.jpeg`
- About heroおよびCurrent Workの画像

カード表示に原寸画像を配信しない．可能な範囲でWebPまたはAVIFとレスポンシブな`srcset`/`sizes`を利用し，表示品質を保ちながら転送量を削減する．既存コンテンツfrontmatterとProject/Workカードの共通化を維持し，英日で別実装を複製しない．承認済みの写真を別画像へ差し替えない．

LCP要素をトレースで特定し，ヒーロー画像である場合は適切な寸法，eager load，`fetchpriority="high"`などを検討する．preloadは実測で改善する場合だけ追加する．画面外のカード画像と詳細動画はlazy loadを基本とする．

Forced reflow，render-blocking，network dependencyは発生元と推定削減時間を記録する．影響がほぼ0 msの項目を，スコアだけを目的として変更しない．cache lifetimeはCloudflareの実配信条件とローカルpreviewの差を区別する．

## Implementation Plan

1. Lighthouse CI設定，npm script，Make target，ignore設定，READMEを追加する．
2. 変更前相当のローカルbaselineを取得し，各URLのカテゴリスコア，FCP，LCP，TBT，CLS，Speed Index，画像転送量を記録する．
3. Network requestとLCP要素を確認し，画像ごとの実配信サイズと表示寸法を対応付ける．
4. 共通画像コンポーネントまたは同等の再利用可能な仕組みでレスポンシブ画像を実装する．必要なら画像生成スクリプトを追加するが，生成手順を再現可能にする．
5. LCP画像の読み込み優先度を調整する．
6. Lighthouseを同条件で再実行し，baselineとの差を比較する．
7. `npm run build`，`npm run test:locale`，`git diff --check`を実行する．デスクトップとモバイルの主要画面でレイアウト崩れがないことを確認する．

## Evaluation Plan

最終報告には次を含める．

- 実行したコマンド
- 対象URLと計測回数
- 変更前後のカテゴリスコア
- 変更前後のFCP，LCP，TBT，CLS，Speed Index
- 変更前後の総転送量および画像転送量
- 変換または追加した画像ファイルと容量
- LCP要素，Forced reflow，render-blockingの調査結果
- 失敗したassertionまたは残課題
- `npm run build`，`npm run test:locale`，`git diff --check`の結果

性能値にはローカル環境による揺れがあるため，単一runの最高値ではなく複数runの代表値で比較する．見た目，内容，アクセシビリティを損なう変更は，スコアが上がっても採用しない．

## Alternatives

### Chrome DevToolsから毎回手動実行する

手軽だが条件と対象URLが揃わず，変更前後の比較や将来の退行検知が難しいため不採用．手動トレースは原因分析の補助として引き続き利用する．

### 開発サーバーを評価する

Astroの開発用処理を含み，本番静的出力と異なるため不採用．

### 直ちにPerformance 100を必須にする

測定揺れや低影響の指摘に時間を使い，画像転送量という大きな改善余地を見失うため不採用．

### 今回からGitHub Actionsで全PRをfailさせる

ローカルbaselineと閾値の安定性が未確認であるため保留．ローカル運用が安定した後に別判断とする．

## Consequences

- 性能改善を同じコマンドとURL群で比較できる．
- dev dependencyとローカルレポート生成時間が増える．
- 画像派生ファイルまたは画像生成処理が増える可能性がある．
- Lighthouseスコアだけでなく，転送量とCore Web Vitalsを根拠にproduction反映を判断できる．
- DeepSeekはこのADRを正本として実装し，コミット，push，production反映を行わない．完了後に主担当が差分と評価結果をレビューする．

## Production Gate

次を満たすまで`production`へpushしない．

- ローカルLighthouseが再現可能に実行できる
- 画像配信の大きな指摘について改善量または不採用理由が示されている
- Performanceが90未満へ退行していない
- Accessibility，Best Practices，SEOに重大な新規失敗がない
- LCP，CLS，TBTが現状から実質的に悪化していない
- build，locale test，diff checkが成功している
- 主要な英日・デスクトップ・モバイル表示を確認している

# Information architecture

## Principle

訪問者が予想できる分類を使う。

「未知との遭遇」はサイト固有の思想だが、`Encounters`や`Artifacts`のような抽象カテゴリには置き換えない。思想はコピー、プロジェクト本文、学び、時系列の変化として表現する。

## Primary navigation

```text
About / Work / CV / Contact
```

### Home

- 現在の人物像を表す短いコピー
- 代表的なProjects
- 最近のWriting
- 現在取り組んでいること
- About、CV、Contactへの導線

### Work

研究、プロダクト、プロトタイプ、ハッカソン、クリエイティブ制作、公開する技術記事を統合する。

北田章伍の場合、研究とプロダクト開発はどちらも「問いを立て、技術で形にし、結果を確かめる活動」である。トップレベルで分けるより、一覧では同じ成果物として扱い、種別と詳細ページの構造で違いを表す。

表示上の分類は `Project` / `Writing` の2つだけにする。論文は独立したPublicationではなく、関連する研究Projectの成果として掲載する。技術や所属などの検索語はカードに並べず、非表示の `keywords` として保持する。

### About

- 短い自己紹介
- 現在の関心
- 価値観と未知への姿勢
- 経験の変化を示す短いJourney
- 連絡先

長い自伝にはしない。詳細な経験はWork、CVへ接続する。

### CV

- 学歴
- 職歴
- 研究・プロジェクト
- 受賞
- 登壇
- 言語
- Contactへの導線

## Work discovery page

### Primary interaction

Work一覧の主役は、検索と分類フィルターを備えたカードグリッドである。

```text
[ Search work .................................... ]

[ All ] [ Project ] [ Writing ]

[ Project card ] [ Project card ] [ Project card ]
[ Project card ] [ Project card ] [ Project card ]
```

### Search

初期実装では、タイトル、要約、非表示の `keywords` をクライアント側で部分一致検索する。件数が少ない間は検索サービスを導入しない。

検索語は `?q=`、分類は `?type=` へ反映する。CVから `/work/?q=livetoon` や `/work/?q=hackathon` へ直接リンクできる。

### Filters

- Type: Project / Writing

表示タグは1つに限定する。技術、所属、イベント、テーマは検索用 `keywords` に置く。

### Sort

- Newest: default
- Oldest
- Featured: 手動の優先度が必要になった段階で追加

### Card

カードは速く走査できる情報量に絞る。

- 代表画像
- タイトル
- 年
- 一行の説明
- 種別バッジ
- 重要なタグ2〜4個

カード全体をリンクにする。タグ操作とカード遷移が衝突する場合、カード内のタグは表示専用にし、絞り込みは上部のFilterへ集約する。

## Project detail

すべてのProjectに、同じ物語を強制しない。最初の概要だけを共通化し、その後は種別に合わせる。

### Shared fields

- Title
- Summary
- Period
- Type
- Status
- Role
- Technologies
- Topics
- Collaborators / Organization
- Hero image
- Links: GitHub / Demo / Paper / Article / Slides
- Featured
- Display order

### Shared opening

```text
Overview
Problem or question
My role
System / approach
Outcome
```

### Product-oriented sections

```text
Context
User problem
System architecture
Technical decisions and trade-offs
Implementation
Outcome
What changed in my thinking
```

### Research-oriented sections

```text
Research question
Related context
System and implementation
Study design
Results
Limitations
Future work
Publication
What changed in my thinking
```

論文はProjectと重複する独立カードを原則として作らない。対応するProjectの成果物として掲載し、CVには書誌情報を一覧表示する。

## Proposed Markdown model

```yaml
---
title: Robotic Telepresence
summary: Physical robot modules for representing a remote person's embodied presence.
startDate: 2025-04
endDate: 2026-03
type: research
status: ongoing
role:
  - Researcher
  - System Developer
technologies:
  - Unity
  - Robotics
  - Projection Mapping
topics:
  - Telepresence
  - Embodiment
featured: true
order: 10
cover: /images/projects/morphcubes/cover.webp
links:
  paper: https://ipsj.ixsq.nii.ac.jp/records/2007519
---
```

想定するファイル配置:

```text
src/content/
├── projects/
│   ├── robotic-telepresence.md
│   ├── kaiwa-unity-as-a-library.md
│   └── skilldb.md
├── writing/
│   └── ...
└── pages/
    └── about.md
```

スキーマはCMSより先に決める。CMSはMarkdownを編集する手段であり、コンテンツモデルの正本にはしない。

## Publishing architecture under consideration

```text
Browser CMS
    -> Git repository containing Markdown
    -> build runner on an isolated sapphire guest
    -> static build
    -> Cloudflare Pages
    -> shogo0x2e.com
```

この分離により、sapphireが停止しても公開済みサイトは配信され続ける。停止するのは新しいビルドと公開だけである。

### Candidate stack

- Frontend: Astro
- Content: Markdown / Astro Content Collections
- CMS: Sveltia CMS or another Git-based CMS
- Repository: private GitHub repository
- Build: isolated VM or CT on sapphire
- Hosting: Cloudflare Pages Direct Upload

Sveltia CMSは軽量でMarkdown管理と相性がよい一方、2026-07時点ではベータ版である。Editorial WorkflowやOpen Authoringは未実装で、Simple Workflowでは基本的に既定ブランチへ直接commitする。この制約を許容できるか、実装前に再評価する。

ビルドrunnerはsapphireホストへ直接置かない。既存データへアクセスできない専用VMまたはCTに隔離し、repository単位、最小権限、外向き通信中心で運用する。

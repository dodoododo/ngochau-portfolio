// Draft Japanese translations — flagged for native-speaker review before launch.
import type { en as EnDict } from "./en";
type Dict = typeof EnDict;

export const ja: Dict = {
  meta: {
    name: "タン・ゴック・ハウ (Tang Ngoc Hau)",
    wordmark: "NgocHau",
    location: "ベトナム、ダナン",
    role: "フルスタック開発者志望",
    availability: "新しいプロジェクトを募集中",
  },
  nav: {
    introduction: "はじめに",
    projects: "プロジェクト",
    skills: "スキル",
    achievements: "実績",
    personal: "パーソナル",
    contact: "お問い合わせ",
  },
  intro: {
    kicker: "フルスタック開発者志望",
    headline: ["ダナンで、", "目的を持って", "創り出す。"],
    bio: "私のソフトウェア開発の目標はシンプルです。それは、毎日のルーティンを少し身軽にし、生活を少しだけ楽にすること。しかし、ただ問題を解決するだけでなく、考え抜かれた美学を通じて、目を楽しませ、心を満たす、視覚的に魅力的でクールなウェブサイトをデザインしています。それは技術的なロジックに根ざしながらも、完全に人間への共感と美しいデザインへの愛によって動かされている実践です。",
    portraitAlt: "柔らかな自然光に包まれた若き開発者、ハウのポートレート",
    deckHint: "スライドを見る",
    hintNext: "プロジェクト",
  },
  projects: {
    eyebrow: "セレクテッド・ワーク",
    heading: "最近つくったもの。",
    subheading: "フルスタックシステム、Web3統合、モバイルアプリケーションのショーケース。",
    openSite: "サイトを開く",
    items: [
      {
        title: "AnimeLearn",
        description:
          "OpenAIのWhisperを活用した正確な音声・テキスト抽出と、SudachiPyを用いた高精度な形態素解析によるカスタムAIパイプラインを搭載した高度な日本語学習プラットフォーム。インタラクティブなデュアル字幕ビデオプレーヤーを備え、視聴しながらリアルタイムで辞書を引き、単語を直接保存できます。抽出された語彙と漢字は、実際の使用頻度とJLPTレベルによって包括的に分類され、学習効率を最大化するために間隔反復システム（SRS）とシームレスに統合されています。",
        stack: [
          "React", 
          "TypeScript", 
          "Node.js", 
          "Express", 
          "MongoDB", 
          "Python (Whisper, SudachiPy)"
        ],
        url: "https://anime-learn.vercel.app",
        github: "https://github.com/dodoododo/AnimeLearn",
        image: "project-1",
      },
      {
        title: "OurNote",
        description: "グループ、恋人、友人のためのオールインワンの生産性ワークスペース。リアルタイムチャット、直感的なカンバン方式のタスク管理、インタラクティブなLeafletマップイベント、ノート作成、共同ライブホワイトボード、およびJWT認証とBcryptハッシュ化による堅牢なセキュリティを備えています。",
        stack: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS", "shadcn/ui", "OpenStreetMap"],
        url: "https://our-note-ten.vercel.app/",
        github: "https://github.com/dodoododo/our-note",
        image: "project-2",
      },
      {
        title: "ShopTalk (Convo AI Hackathon 2026)",
        description:
          "会話型AIとブロックチェーン決済を利用してオンライン販売を自動化する、フルスタックAIコマースプラットフォーム。ShopTalkは、Groq Llama 3.3とAgora Conversational AIを活用して自然言語による顧客対応を行い、ツール呼び出しによる在庫確認と注文作成、Solana Pay USDC決済リクエストの生成、多層検証によるオンチェーン取引の確認、およびWebSocketを介したリアルタイムのダッシュボード更新を提供します。",
        stack: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Socket.io",
          "Solana Web3.js",
          "Solana Pay",
          "Groq Llama 3.3 API",
          "Agora Conversational AI",
          "Agora RTC"
        ],
        url: "https://shop-talk-eta.vercel.app/",
        github: "https://github.com/dodoododo/shoptalk",
        image: "project-3",
      },
      {
        title: "FreshFruit Smart Scale",
        description:
          "コンピュータビジョン、組み込みハードウェア、リアルタイムPOSダッシュボードを統合したエンドツーエンドのIoTスマートリテールプラットフォーム。システムはスマートスケールから重量データをストリーミングし、YOLOv8搭載のAIモデルを使用してフルーツを検出し、価格を自動計算してトランザクションを管理、FastAPIバックエンドとMySQLを通じて販売データを同期します。フロントエンドはReact、TypeScript、Tailwind CSSで構築されており、リアルタイムの計量、AI認識、取引履歴、店舗分析のためのレスポンシブなダッシュボードを提供します。",
        stack: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "FastAPI",
          "Python",
          "YOLOv8",
          "WebSocket",
          "MySQL",
          "SQLAlchemy",
          "Hardware/IoT"
        ],
        url: "",
        github: "https://github.com/dodoododo/pbl4-freshfruit-smart-scale-frontend",
        image: "project-4",
      },
      {
        title: "Locket Beta",
        description:
          "FlutterとスケーラブルなNode.js/Expressバックエンドで構築されたクロスプラットフォームのソーシャルメディア。JWTベースの認証、入力インジケーターとプレゼンス同期を備えたリアルタイムWebSocketメッセージング、Cloudinaryを利用したメディアストレージ、友達推薦アルゴリズム、MongoDBデータモデリングを実装しています。フロントエンドはBLoCアーキテクチャを採用し、カスタムカメラ統合とデバイス上の画像圧縮により、予測可能な状態管理とレスポンシブなモバイルパフォーマンスを実現しています。",
        stack: [
          "Flutter",
          "Dart",
          "BLoC Pattern",
          "Node.js",
          "Express",
          "MongoDB",
          "WebSocket",
          "Cloudinary"
        ],
        url: "",
        github: "https://github.com/dodoododo/locketBeta",
        image: "project-5",
      },
      {
        title: "Medicine Distribution System",
        description:
          "コアなWeb原則を習得するため、フレームワークを一切使用せずに構築された安全なB2C医薬品eコマースプラットフォーム。Java ServletとJSPによる厳格なMVCデザインパターンで設計され、複雑な外部キー制約を持つ完全に正規化されたMySQLリレーショナルデータベースによってバックアップされています。",
        stack: ["Java Servlet", "JSP", "MySQL", "MVC Architecture", "Bootstrap"],
        url: "",
        github: "https://github.com/dodoododo/medicine-distribution-system",
        image: "project-6",
      },
      {
        title: "Japanese Dictionary",
        description:
          "高度な単語/漢字検索、カスタマイズ可能なフラッシュカード生成、PDFエクスポート機能を備えた包括的なJLPT学習ツールキット。安全なJWT認証と厳格なクライアント・サーバー間のデータ検証により、シームレスなユーザーエクスペリエンスを保証します。",
        stack: ["React", "Java Spring Boot", "Microsoft SQL Server", "Tailwind CSS"],
        url: "",
        github: "https://github.com/dodoododo/PBL3-Japanese-Dictionary",
        image: "project-7",
      },
      {
        title: "Flight Booking Management",
        description:
          "高度なオブジェクト指向プログラミング（OOP）の概念を実証する、堅牢なコンソールベースのアプリケーション。動的メモリ管理にC++ STL Vectorsを利用し、データベースに依存しない永続的なデータ保存のためのカスタムテキストファイルI/O解析を実装しています。",
        stack: ["C++", "OOP", "File I/O Persistence"],
        url: "",
        github: "https://github.com/dodoododo/Book-Flight-Console-App-C-",
        image: "project-8",
      }
    ],
  },
  skills: {
    eyebrow: "スキル",
    heading: "私の技術と道具。",
    techHeading: "テクニカル",
    languagesHeading: "言語能力",
    tech: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Python",
      "Go",
      "Git",
      "Figma",
      "Vite",
      "Docker",
    ],
    categories: [
      {
        name: "Primary Stack (MERN)",
        items: [
          "JavaScript", 
          "TypeScript", 
          "React", 
          "Node.js", 
          "Express", 
          "MongoDB", 
        ]
      },
      {
        name: "Mobile & Software",
        items: [
          "Flutter", 
          "C++", 
          "C", 
          "Python", 
          "Java",
          "Spring Boot",
          "C#", 
          ".NET",
          "PHP",
        ]
      },
      {
        name: "Databases",
        items: [
          "PostgreSQL", 
          "MySQL", 
          "SQLite", 
          "Microsoft SQL Server"
        ]
      },
      {
        name: "Cloud & DevOps",
        items: [
          "AWS", 
          "Firebase", 
          "Docker", 
          "Vercel",
          "Render",
          "Supabase"
        ]
      },
      {
        name: "IoT & Hardware",
        items: [
          "Arduino", 
          "ESP8266", 
          "Raspberry Pi",
          "Cisco Packet Tracer"
        ]
      },
      {
        name: "Tools & Workflows",
        items: [
          "GitHub", 
          "GitLab", 
          "Jira", 
          "Postman", 
          "VS Code", 
          "Android Studio"
        ]
      }
    ],
    languages: {
      vi: { name: "Tiếng Việt", proficiency: "ネイティブ" },
      en: { name: "English", proficiency: "IELTS 7.5 — 流暢" },
      ja: { name: "日本語", proficiency: "JLPT N3 — 日常会話" },
    },
  },
  achievements: {
    eyebrow: "実績",
    heading: "誇りに思う瞬間、いくつか。",
    items: [
      {
        tag: "ハッカソン · 2026",
        title: "トップ10 ファイナリスト — CONVO AI HACKATHON DANANG UNIVERSITY 2026",
        body: "ダナン工科大学の小規模チームと共に、Solana統合型の対話エージェントを構築。 #DUT #ConversationalAI #convoai #DSUC #Agora #Solana #Hackathon",
      },
      {
        tag: "スピーチコンテスト · 日本語",
        title: "第1位 — 日本語スピーチコンテスト",
        body: "在ダナン日本国総領事、森健朗氏ご臨席のもと開催されました。",
      },
      {
        tag: "スピーチコンテスト · 英語",
        title: "第3位 — 大学英語スピーチコンテスト",
        body: "ダナン工科大学（「バックコア」ダナン）。",
      },
    ],
  },
  personal: {
    eyebrow: "パーソナル",
    personalTitle: ["私という人間", "コードを書いていない時のこと。"],
    personalDescription: "このポートフォリオを、私がどれほどテクノロジーに情熱を持っているかを5分間かけて説明するだけの、よくあるページにしたくありませんでした。もちろん、私の作品を紹介するための場所ではありますが、同時に、偶然ここを訪れた未来の友人、好奇心旺盛な見知らぬ人、あるいは私が大切にしていることに共鳴してくれる人々にも届くものにしたかったのです。だからこそ、このスペースを使って、私の大好きなものについて少しお話しさせてください。",
    personalDrag: "私についてもっと知る",
    chapter1: {
      label: "第1章 — 世界への好奇心",
      intro:
        "一度も足を踏み入れたことのない国の文化、歴史、地理に、心からの関心を持っています。本を読み、ドキュメンタリーを観て、いつか自分の目で見てみたい場所のリストを少しずつ増やしています。",
      cityInteractHint: "クリックすると、各都市への私のトラベルレターが読めます。",
      moduleHeading: "いつか足を踏み入れたい国々",
      selectPrompt: "国を選ぶと、地球儀がそこへ飛びます。",
    },
    chapter2: {
      label: "音楽への愛",
      heading: "メロディの秩序",
      body: "音楽が大好きで、子供の頃は空き時間のほとんどは音楽を聴いています。その愛が高じて、ラップのビートを作り始め、その後ギターも弾き始めました。面白くてユニークなものであれば、どんなジャンルの音楽でも聴きます。1400曲入りのSpotifyプレイリストも持っています。様々なジャンルや言語から選んだ私のお気に入りの曲をいくつか紹介します。",
      footnote: "コードを書いていない時は、たぶんマニアックな音楽のウサギの穴に深く潜り込んでいます。大丈夫。大丈夫。",
      tags: ["ビート制作", "指先のギターだこ", "グローバルな周波数"],
    },
    scrapbook: {
      spine: "Vol. 04 — パーソナル・マニフェスト — 季刊 — Est. 2019",
      heroEyebrow: "私のうさぎへの執着",
      heroTitleLine1: "究極の",
      heroTitleLine2: "うさぎマニア",
      heroBoldLead: "はい、私は完全にうさぎに取り憑かれています。",
      heroBody:
        "うさぎって本当にバカバカしいほど可愛いと思うんです。静かで、少し不器用で、自分が安心できる人にしか本当の意味で心を開かない。正直なところ…それってすごく親近感が湧きませんか。もし輪廻転生があるなら、私は大切に愛される飼いうさぎとして生まれ変わりたいです。というわけで、このポートフォリオの中にはうさぎの雑誌が丸ごと隠されています。楽しんで探索して、うさぎについて何か新しい発見をしてもらえたら嬉しいです。",
      essayLabel: "うさぎに関するパーソナルエッセイ",
      essayAuthor: "文：ゴック・ハウ",
      article: {
        kicker: "サバイバルの達人",
        dropCapLetter: "茂",
        paragraph1Pre:
          "みの中で震えるか弱い獲物、という古いおとぎ話は忘れてください。現実には、うさぎは自然界で最も勇敢なサバイバル戦士です。うさぎはただ一つのことのために作られています。それは",
        paragraph1Bold: "爆発的な生存能力",
        paragraph1Post:
          "です。怯えた野うさぎはただ走るだけではありません。圧縮されたバネのように飛び出し、時速70kmに達し、捕食者を完全に置き去りにするようなヘアピンカーブをやってのけます。",
        paragraph2Pre:
          "そして、彼らが安全で幸せな時は？ 空中で重力を無視したようなひねりジャンプ、「",
        paragraph2Highlight: "ビンキー",
        paragraph2Post: "」を披露します。それは純粋な、混じり気のない喜びの動きです。",
        airborne: "ジャンプ！",
        binky: "ビンキー！",
        radarLabel: "270° レーダー",
        quoteLine1: "彼らの270°の耳は常に回転しています。",
        quoteHighlight: "あなたが気づく前に、",
        quoteLine2: "彼らは脅威の音を聞き取っています。",
        globalDominationHeading: "世界征服",
        globalDominationBody:
          "凍てつくツンドラから灼熱の砂漠まで、うさぎはほぼすべての大陸を征服してきました。彼らはその非常に敏感なヒゲを頼りに、体をトンネルに入れる前にその幅を正確に測ります。信じられないほど適応力が高いのです。彼らは基本的に、止めることが不可能です！！",
        fact1: "前歯は絶えず伸び続け、1年に最大12cmにもなります！それを削るために硬い繊維が必要です。",
        fact2: "うさぎの母親は出産後わずか数時間で再び妊娠でき、理論上は1組のペアがたった1年で3,000匹以上の子孫を残すことができます！",
        fact3: "彼らは1日に約8時間眠りますが、5分〜25分の短い昼寝を繰り返すだけです。さらに驚くべきことに、危険を見張るために目を開けたまま眠ることもよくあります！",
      },
      stats: {
        heading: "うさぎステータス",
        sprintValue: "70",
        sprintLabel: "最高時速 (km/h)",
        hearingValue: "3",
        hearingLabel: "聴覚範囲 (km)",
        speciesValue: "30+",
        speciesLabel: "うさぎの品種",
        populationValue: "700m+",
        populationLabel: "世界の推定生息数",
      },
      pullQuote: {
        text: "うさぎは、自分の楽園とはニンジンがたくさんある場所だと考えている。実際にニンジンがたくさんある場所を見つけるまでは！自分が大好きなもので溢れていて、それに飽きてしまうような場所は、天国ではなく、良くて地獄だろう！",
        attribution: "― メフメト・ムラト・イルダン",
      },
      credits: {
        label: "有料の役者たち (ご自宅で真似をしないでください)",
        specimens: [
          "リリー、ヒーロー",
          "キウイ、休憩中",
          "ホーランドロップ",
          "ミッドホップ",
          "警戒ポーズ",
          "採餌中",
          "標本 No. 8",
        ],
      },
      foldHere: "✂ ここで折る — パートIIへ続く",
      sonicRadar: {
        heading1: "The Sonic",
        heading2: "Radar",
        paragraph1Pre:
          "うさぎの聴覚は究極の早期警戒システムです。静かな草原で、捕食者が踏み外した足音 — ",
        paragraph1Bold1: "鋭い小枝の折れる音",
        paragraph1Mid: " — が空気を伝わり、うさぎは最大で",
        paragraph1Bold2: "3キロメートル先",
        paragraph2Pre: "からそれを感知します。この距離を理解するために、",
        paragraph2Bold: "3.5個のブルジュ・ハリファ",
        paragraph2Post:
          "を横に並べたところを想像してください。それがうさぎのレーダーの半径です。オオカミが目に見える脅威になるずっと前に、うさぎはすでに危険をピンポイントで特定し、その進路を計算し、逃げる準備を整えているのです。",
        heightReferenceLabel: "高さの参考",
        burjLabel: "ブルジュ・ハリファ(830m)",
        eiffelLabel: "エッフェル塔 (330m)",
        libertyLabel: "自由の女神 (93m)",
        bunnyLabel: "うさぎ",
        wolfLabel: "オオカミ",
        snap: "パキッ！",
        scaleCaptionPre: "3.5 × ブルジュ・ハリファ ≈",
        scaleCaptionHighlight: "3 キロメートル",
      },
      goldenRule: {
        huntsLine1: "目が前に",
        huntsLine2: "ある動物は、",
        huntsHighlight: "狩りを",
        huntsLine3: "する。",
        hidesLine1: "目が横に",
        hidesLine2: "ある動物は、",
        hidesHighlight: "身を",
        hidesLine3: "隠す。",
      },
      blueprint: {
        fovLabel: "視野 (FOV)",
        blindLabel: "死角",
        predatorHeading1: "Binocular",
        predatorHeading2: "Predators",
        predatorFovValue: "~120°",
        predatorBlindValue: "後方",
        predatorBody:
          "前を向いた目は重なり合い、単一の鋭く焦点の合った視野を作り出します。ライオン、オオカミ、フクロウは、強烈な奥行き知覚と引き換えに周辺視野を犠牲にし、獲物を仕留める正確な距離を計算します。完全に「追跡」のために作られた視覚です。",
        preyHeading1: "Monocular",
        preyHeading2: "Prey",
        preyFovValue: "~360°",
        preyBlindValue: "真正面",
        preyBody:
          "横に配置された目は独立して機能し、ほぼ完璧なパノラマビューを提供します。うさぎ、鹿、馬は奥行き知覚を犠牲にして、常に地平線をスキャンします。これは「逃走」という単一の目的のために作られた生物学的な早期警戒システムです。",
      },
      bunnyLens: {
        heading1: "Bunny",
        heading2: "Vision",
        paragraph1:
          "これまで見てきたように、被食者は広い視野を得るために奥行き知覚を犠牲にします。しかし、うさぎはこの生物学的な青写真を究極の限界まで押し上げています。",
        paragraph2Pre:
          "大きな目を頭蓋骨の非常に高い、そして側面の離れた位置に配置することで、うさぎは2つの別々の視覚情報をつなぎ合わせ、",
        paragraph2Bold: "ほぼ360°の視覚レーダー",
        paragraph2Post:
          "を形成します。周囲を見渡すために首を回さなければならない捕食者とは異なり、うさぎのハードウェアは絶え間ない、受動的な監視のために設計されているのです。",
        paragraph3:
          "彼らは草に鼻を埋めながら上空を旋回する鷹を監視したり、首の筋肉を一切動かすことなく、背後から忍び寄るコヨーテを検知したりすることができます。",
        tooltipMonoTitle: "単眼視野",
        tooltipMonoBody: "独立した目の動きで、ほぼ360°の動体検知を提供します。",
        tooltipBinoFrontTitle: "前方両眼視野",
        tooltipBinoFrontBody: "重なり合う視覚により、正確な奥行き知覚を得ます。",
        tooltipBinoRearTitle: "後方両眼視野",
        tooltipBinoRearBody: "頭の真後ろを追いかけてくる捕食者を追跡します。",
        tooltipBlindFrontTitle: "鼻の死角",
        tooltipBlindFrontBody:
          "顔の真正面は完全な死角です。文字通り食べているものが見えないため、代わりにヒゲを使って感覚を頼りにします。",
        tooltipBlindRearTitle: "後方の死角",
        tooltipBlindRearBody: "自分自身の体の質量によって視界が遮られます。",
        legendMono: "単眼視野",
        legendBino: "両眼視野の重なり",
        legendBlind: "死角",
      },
      footer: "うさぎの最新ニュース速報",
    },
    bunnyGacha: {
      moduleLabel: "うさぎガチャ",
      moduleHeading: "ガチャを回して、運勢を占う",
      pullButton: "回す",
      natureSuffix: "タイプ",
      rarityLabel: "レアリティ",
      blurbPrefix: "今日の運勢",
      factLabel: "豆知識",
      stats: {
        curiosity: "好奇心",
        fluffiness: "もふもふ度",
        energy: "エネルギー",
        speed: "スピード",
        friendliness: "人懐っこさ",
        totalPower: "総合力",
      },
      ui: {
        title: "うさぎガチャ",
        subtitle: "カプセル・フォーチュン・マシン",
        machineNo: "カプセルマシン No. 07",
        dept: "動物研究部門",
        specs: {
          heading: "仕様",
          dailyLimitLabel: "1日の制限",
          dailyLimitValue: "1日1回",
          capsuleRateLabel: "カプセル素材",
          capsuleRateValue: "100% オーガニック",
          visualOutputLabel: "視覚出力",
          visualOutputValue: "3Dレンダリング",
          powerSourceLabel: "動力源",
          powerSourceValue: "好奇心",
        },
        warning: {
          heading: "警告",
          body: "極度のもふもふが検出されました。注意して進んでください。カプセルに餌を与えないでください。",
        },
        machineActive: "マシン稼働中",
        machineCode: "BNUY-01",
        turnHandle: "ハンドルを回す",
        pullIdle: "ガチャを引く",
        pullProcessing: "処理中...",
        pullAgain: "もう一度引く",
        contentsTicket: {
          heading: "今日の運勢内容",
          species: "うさぎの品種",
          fortune: "毎日の運勢",
          personality: "性格プロファイル",
          fact: "科学的な豆知識",
        },
        stamp: {
          inspected: "検査済",
          passed: "合格",
          dept: "幸運部門",
        },
        collectAll: "すべて集めよう",
      },
      bunnies: {
        hollandLop: {
          name: "Holland Lop",
          blurb: "ホーランドロップのように、ただあなたらしくいるだけで人々の心を掴むでしょう。",
          type: "コンパニオン",
          personality: "甘えん坊",
          ability: "垂れ耳の魅力",
          fact: "うさぎの品種の中で最ものんびりしていておおらかだと言われており、初めて飼う人にとって特に適しています。",
        },
        netherlandDwarf: {
          name: "Netherland Dwarf",
          blurb: "思いがけないエネルギーの爆発が、今日やり始めたことを終わらせる助けになります。",
          type: "スピードスター",
          personality: "おてんば",
          ability: "ズーミートルネード",
          fact: "体重はわずか1キロ程度ですが、自分より10倍大きなうさぎのエネルギーと態度を持っています。",
        },
        lionhead: {
          name: "Lionhead",
          blurb: "今日は髪型が崩れているかもしれませんが、あなたの精神は堂々としています。",
          type: "マジェスティック",
          personality: "誇り高い",
          ability: "たてがみディフェンス",
          fact: "彼らのユニークなたてがみは、ベルギーで初めて現れた優性遺伝子の突然変異によるものです。",
        },
        flemishGiant: {
          name: "Flemish Giant",
          blurb: "長くて良い昼寝は、一生懸命働くことよりも多くの問題を解決してくれます。",
          type: "タイタン",
          personality: "優しい",
          ability: "プロの昼寝師",
          fact: "「優しい巨人」として知られ、体重は最大10キロにもなり、一部の犬と同じくらいの大きさになります。",
        },
        miniRex: {
          name: "Mini Rex",
          blurb: "ベルベットのように、今日は物事がとてもスムーズに進みます。",
          type: "コンパニオン",
          personality: "穏やか",
          ability: "ベルベットタッチ",
          fact: "彼らの毛には長い保護毛がなく、まるで本物のベルベットのような独特の質感を与えています。",
        },
        englishAngora: {
          name: "English Angora",
          blurb: "柔らかい快適さと、少しの手入れに満ちた一日を期待してください。",
          type: "ディヴァイン",
          personality: "甘やかされ気味",
          ability: "雲の迷彩",
          fact: "顔や耳を含め、全身が完全にウールで覆われている唯一のうさぎの品種で、毎日の手入れが必要です。",
        },
        dutch: {
          name: "Dutch Rabbit",
          blurb: "今日のあなたの強みはバランスです。物事をちょうど真ん中で分けて考えましょう。",
          type: "クラシック",
          personality: "バランス型",
          ability: "タキシードのエレガンス",
          fact: "最も古い既知のうさぎの品種の一つで、印象的なツートンカラーのパターンですぐにわかります。",
        },
        californian: {
          name: "Californian",
          blurb: "今日、あなたは新しい人に強烈な印象を残すでしょう。",
          type: "クラシック",
          personality: "チル",
          ability: "温度適応",
          fact: "耳と鼻にある暗い模様は温度に敏感で、寒い天候では色が濃くなります。",
        },
        harlequin: {
          name: "Harlequin",
          blurb: "ユーモアのセンスが、今日の厄介な状況からあなたを救い出してくれます。",
          type: "トリックスター",
          personality: "遊び好き",
          ability: "二重人格",
          fact: "市松模様のようなカラーリングから、「うさぎ界のピエロ」と呼ばれることもあります。",
        },
        himalayan: {
          name: "Himalayan",
          blurb: "深呼吸してください。落ち着いたアプローチが最良の結果をもたらします。",
          type: "禅",
          personality: "冷静",
          ability: "円筒ストレッチ",
          fact: "独特の円筒形の体型をしており、現存するうさぎの品種の中で最も穏やかな品種の一つです。",
        },
        polish: {
          name: "Polish Rabbit",
          blurb: "今日、あなたは何もないところから魔法のように解決策を引き出すかもしれません。",
          type: "マジカル",
          personality: "機敏",
          ability: "ハットトリック",
          fact: "歴史的にマジシャンに人気があり、小型で知能が高く、周囲への注意力が非常に高いです。",
        },
        satin: {
          name: "Satin",
          blurb: "今日、あなたは何も努力しなくても競争相手より輝いて見えるでしょう。",
          type: "ラディアント",
          personality: "ディーヴァ",
          ability: "光の屈折",
          fact: "遺伝子突然変異により毛幹が半透明になり、被毛が信じられないほど光沢があり反射します。",
        },
        silverFox: {
          name: "Silver Fox",
          blurb: "レアでユニークな機会があなたに向かっています。",
          type: "レア",
          personality: "ミステリアス",
          ability: "直立する毛",
          fact: "毛並みを逆なですると、再び前方に撫でるまで毛がまっすぐ立ち上がる唯一の品種です。",
        },
        blancDeHotot: {
          name: "Blanc de Hotot",
          blurb: "誰かがあなたの静かな優しさ（そしてあなたのスタイル）を評価してくれるでしょう。",
          type: "クラシック",
          personality: "観察者",
          ability: "アイラインの視線",
          fact: "アイラインのように見える、目の周りの独特の太い黒い輪を除いて、全身が真っ白です。",
        },
        miniLop: {
          name: "Mini Lop",
          blurb: "思いがけないおやつが今日あなたの元にやってくるかもしれません。",
          type: "コンパニオン",
          personality: "抱っこ好き",
          ability: "バスケットボールロール",
          fact: "ブリーダーたちは、彼らの体を「バスケットボールに頭がくっついているよう」だと表現します。",
        },
        jerseyWooly: {
          name: "Jersey Wooly",
          blurb: "小さな対立に対する平和的な解決が、あなたの未来に待っています。",
          type: "ディヴァイン",
          personality: "マグカップサイズ",
          ability: "ノーキックゾーン",
          fact: "手入れの簡単なウールうさぎとして交配され、その従順さから「蹴らないうさぎ」として有名です。",
        },
        americanFuzzyLop: {
          name: "American Fuzzy Lop",
          blurb: "あなたの社交的なエネルギーが、それを必要としている誰かを笑顔にするでしょう。",
          type: "コンパニオン",
          personality: "社交的",
          ability: "ウールブランケット",
          fact: "ウールのセーターを着たホーランドロップのような見た目で、血統にある劣性のウール遺伝子によるものです。",
        },
        checkeredGiant: {
          name: "Checkered Giant",
          blurb: "今日は驚くべきスピードでタスクを軽快にこなせるでしょう。",
          type: "スピードスター",
          personality: "アクティブ",
          ability: "レーシングストライプ",
          fact: "最大体重制限なしで認められている数少ない品種の一つで、鼻にある独特の蝶の形をした模様で知られています。",
        },
        havana: {
          name: "Havana",
          blurb: "背景に溶け込むことで、最も多くのものを見ることができる時があります。",
          type: "レア",
          personality: "スムーズ",
          ability: "シャドウブレンド",
          fact: "ハバナ葉巻の色に似ていると言われた、豊かでチョコレート色の毛皮にちなんで名付けられました。",
        },
        tan: {
          name: "Tan Rabbit",
          blurb: "あなたの鋭い直感が、賢い解決策へと導いてくれるでしょう。",
          type: "スピードスター",
          personality: "警戒",
          ability: "ドーベルマンスタンス",
          fact: "アーチ型の背中、印象的なブラック＆タンのカラー、そして高い知能から「うさぎ界のドーベルマン」とよく呼ばれます。",
        },
      },
    },
    outdoors: {
      label: "第3章 — 外にいる時間",
      heading: "そして、できる時は外にいます。",
      body: "長い散歩、小さな丘、冷たい川、両手で持つ温かいコーヒー。それでリセットされます。",
      spreadOne: {
        titleLine1: "OUTSIDE",
        titleMid: "is where",
        titleLine2: "You",
        titleHighlight: "will",
        titleLine3: "Find Me.",
        body: "私はほとんどの時間を外で過ごします。人々、場所、そして日常生活の小さな瞬間に囲まれていると、心がアクティブに保たれる何かがあるのです。私のノートパソコンはたいていカフェのテーブルや図書館に行き着き、ヘッドフォンも一緒です。同じ四つの壁を見つめていない時の方が、なぜかインスピレーションが湧きやすいのです。実はこの文章も、カフェにいる間に書いています。仕事をしていても、ぶらぶら歩いていても、あるいは全く何もしていなくても、私はただ世界の中で時間を過ごすのが好きなのです。",
        altHopscotch: "公園の晴れた日",
        altHorizontalShip: "風に揺れる草",
      },
      spreadTwo: {
        altPanorama: "晴れたビーチの風景",
        quote: "潮は決して急がないようだ。",
        body: "私がいつもビーチで気づくことの一つは、波が砂浜の足跡を消していく様子です。すべての足跡は、ほんの少し前までそこにいた誰かのもの。歩き、笑い、考え、彼ら自身の小さな物語を生きていた誰かのもの。そしていつものように潮が満ちてきて、次の足跡がやってくる前に、再び手つかずの海岸を残していくのです。",
        altTerraGate: "砂を洗う水",
        altBuddhaBeach: "海辺の岩",
      },
      spreadThree: {
        heading: "散歩。",
        subheading: "目的地はありません。ただ道中の小さな瞬間を集めているだけです。",
        altCurrency: "緑の葉から差し込む日光",
        altGoose: "質感のある壁に映る影",
        altFireworks: "静かな通り",
      },
      spreadFour: {
        altCoffeeHill: "山の森の木々",
        note: "高度の変化。",
        body: "丘を車で登ると、他の何よりも早く頭がクリアになります。気温が少し下がり、街の騒音が消え、壮大で遮るもののない景色が広がります。何時間も座って何もしないのに、これほど完璧な場所はありません。",
        altHillTop: "曲がりくねった道を見下ろす",
        altHillSea: "山の景色",
      },
      spreadFive: {
        heading: "まずはコーヒー。",
        body: "私はコーヒーショップでたくさんの時間を過ごします。たいていノートパソコンと一緒に、あるいはその週に勉強していることや読んでいる本と一緒に。ただ心地よい環境音、良い光、そして周りにいる素敵な人たち。それだけです。",
        altRaspCafe: "テーブルのアイスコーヒー",
        altNiuFish: "本、コーヒー、スケッチ道具",
        altShiba: "カフェのテーブルの詳細",
        altNckh: "カフェのテーブルの詳細",
      },
      spreadSix: {
        altRockCactus: "公園の小さな詳細",
        quote: "中にいるには天気が良すぎました。",
        caption: "また良い一日。",
        altSanrio: "静かな道に沈む美しい夕日",
      },
    },
  },
  contact: {
    eyebrow: "お問い合わせ",
    heading: "ここまで読んでくださって、ありがとうございます。",
    body: "もし何かしら共感していただけたなら、ぜひ繋がりましょう！ 役割や仕事について話したい場合でも、単にうさぎについて雑談したい場合でも、私の受信箱は常に開かれています。どのSNSからでもメッセージを送ってください。必ず返信します。",
    links: {
      email: "tn.hau1115@gmail.com",
      linkedin: "linkedin.com/in/ngọc-hậu-a98337299",
      instagram: "instagram.com/n.hau1115",
      facebook: "facebook.com/narwhal333",
      github: "github.com/dodoododo",
    },
  },
  countries: {
    Turkey: {
      name: "トルコ",
      flag: "tr",
      caption: "イスタンブールは二つの大陸にまたがる街 — 1600年にわたって帝国が層を成してきた場所。",
      cities: ["Istanbul", "Cappadocia", "Antalya", "İzmir"],
      letters: {
        "Istanbul": {
          title: "ボスポラス海峡を越えて",
          body: "二つの大陸を同時に占める都市はほとんどありません。イスタンブールは本質的に歴史の巨大な生きた断面図であり、ローマ、ビザンツ、オスマントルコの遺産が重なり合っています。私がイスタンブールに惹かれているのは、単に名所旧跡があるからだけではありません。かつて大帝国が立ち並んだその場所で、その精神を感じてみたいのです。",
          signature: "すぐそこへ"
        },
        "Cappadocia": {
          title: "煙突の谷",
          body: "火山浸食によって形成された風景には、まるで別の惑星にいるかのような非現実感があります。私を惹きつけるのは気球だけでなく、生き残るために柔らかい岩を直接削って家や地下都市を丸ごと作り上げた文明のアイデアです。",
          signature: "追いかける夢"
        },
        "Antalya": {
          title: "ターコイズコースト",
          body: "多くの人はビーチを求めますが、私はリキアン・ウェイが山と海をどう繋いでいるかに惹かれます。何世紀もかけて地中海へとゆっくり崩れ落ちていくローマの遺跡を見つけることは、人間が残したすべてのものを最終的に時間と自然がどう取り戻すかを理解するための、謙虚な方法のように思えます。",
          signature: "楽しみにしています"
        },
        "Adana": {
          title: "アダナケバブはただのケバブじゃない",
          body: "私のトルコへの愛は、何千マイルも離れた場所で、自分の故郷を私に鮮やかに語ってくれた誰かによって火がつきました。遠い見知らぬ人さえも兄弟のように扱う文化と、地元の人々の温かさに心が奪われたままでした。私が今、ついにその空気を吸う日を指折り数えているこの国に私を永遠に繋ぎ止めたのは、その見えない人々の精神でした。時々、太陽が降り注ぐその街で、セイハン川のそばを歩きながらアダナケバブを楽しんでいる自分を想像します。",
          signature: "未来の旅"
        }
      }
    },
    Lebanon: {
      name: "レバノン",
      flag: "lb",
      caption: "地中海に面した小さな国。何千年もの貿易、紛争、文化が信じられないほどの痕跡を残している。",
      cities: ["Beirut", "Byblos", "Baalbek", "Tripoli"],
      letters: {
        "Beirut": {
          title: "7度の再建",
          body: "7度も破壊され、その度に再建された都市を尊敬せずにはいられません。ベイルートは地中海に面し、カオスな現代のエネルギーと過去の目に見える傷跡をうまくバランスさせています。私はその頑固な回復力と、そこに関係なく人々がどう生き抜き続けているかに魅了されています。",
          signature: "訪問を願って"
        },
        "Byblos": {
          title: "文字のルーツ",
          body: "アルファベットが実際にどこから来たのか疑問に思ったことはありますか？ この港町は地球上で最も古くから継続して人が住んでいる場所の一つであり、フェニキア人が私たちが今日頼りにしている文字を開発した場所です。人間のコミュニケーションを文字通り形作った町を歩くなんて、想像するだけで圧倒されます。",
          signature: "歴史の夢"
        },
        "Baalbek": {
          title: "不可能なスケール",
          body: "古代建築といえばローマが注目されがちですが、これまでに建設された中で最も巨大なローマ神殿のいくつかは、実はここに隠されています。基礎に使われている石は数百トンもの重さがあります。過去について私たちがどれだけ本当に理解しているのかを疑わせるような、工学的な謎です。",
          signature: "いつか近いうちに"
        },
        "Tripoli": {
          title: "生きているスーク",
          body: "ほとんどの歴史的中心地がキュレーションされた博物館のように感じられるのに対し、この北部の都市は何世紀も前と全く同じように機能しています。マムルーク朝時代の古い建築は立ち入り禁止になっているわけではありません。そこは日常生活、仕立て、貿易が実際に起こる場所なのです。今も活発に使われている歴史を体験できるというアイデアが大好きです。",
          signature: "バケットリストの1つ"
        }
      }
    },
    Nepal: {
      name: "ネパール",
      flag: "np",
      caption: "垂直の風景によって定義される国。ヒマラヤの影のすぐ下に古代の精神的伝統が存在する。",
      cities: ["Kathmandu", "Pokhara", "Namche", "Bhaktapur"],
      letters: {
        "Kathmandu": {
          title: "生きている博物館",
          body: "日常生活と古代宗教の境界線が、ここではほとんど存在しません。アーティファクトをガラスの裏に閉じ込める代わりに、地元の人々は今でもカオスな交通の真ん中にある何世紀も前の祠で活発に祈りを捧げています。騒々しい現代生活と静かな精神的伝統の絶え間ない交差が、信じられないほど面白いと感じます。",
          signature: "精神的な目標"
        },
        "Pokhara": {
          title: "頂の下で",
          body: "首都の激しさの後では、この湖畔の町は究極の心理的リセットのように思えます。雪を頂いた巨大なヒマラヤ山脈がとても近くにあり、下の水面に完璧に反射します。ただ座って頭をクリアにするには、地球上で最も平和な環境の一つに見えます。",
          signature: "その日を待って"
        },
        "Namche": {
          title: "最後の前哨基地",
          body: "急峻な山の谷を何日も歩かないと、この村にはたどり着けません。高ヒマラヤへの最終プッシュ前のシェルパたちの主要な貿易ハブとして、完全にユニークな辺境の雰囲気を持っています。このような極端な高度で繁栄する孤立したコミュニティに魅了されています。",
          signature: "高地の夢"
        },
        "Bhaktapur": {
          title: "時を止める",
          body: "この街の中心部は車の乗り入れが禁止されており、それが場所の雰囲気を完全に変えています。伝統的なレンガと木彫りの建築が何百年も保存されているため、この通りを歩くことは、おそらく私たちが実際のタイムトラベルに最も近づける体験でしょう。",
          signature: "時を超えた願い"
        }
      }
    },
    Spain: {
      name: "スペイン",
      flag: "es",
      caption: "何世紀にもわたるカトリックとムーアの歴史が、驚くほど強烈で芸術的な文化を生み出した半島。",
      cities: ["Barcelona", "Sevilla", "Granada", "Madrid"],
      letters: {
        "Barcelona": {
          title: "グリッドと曲線",
          body: "完璧に厳格なグリッド状にレイアウトされていながら、直線というものを完全に無視した建築家によって定義された都市というのは、頭で理解するのが難しいです。重厚な中世の歴史がガウディのシュールレアリストな想像力のすぐ隣にあるのをこの目で見るために、ゴシック地区を歩いてみたいです。",
          signature: "未来の記憶"
        },
        "Sevilla": {
          title: "重なり合う世紀",
          body: "南スペインには、非常に魅力的に感じる深く強烈なエネルギーがあります。アルカサルのムーア様式の建築は、異なる文化が何世紀にもわたって物理的にどう混ざり合うかを示しており、芸術、歴史、そして日常生活がこんなにも大声で絡み合っている場所を体験してみたいという好奇心があります。",
          signature: "行くことを願って"
        },
        "Granada": {
          title: "最後の砦",
          body: "ここは西ヨーロッパ最後のイスラム教徒の砦であり、街には今でもその歴史的な重みを感じることができます。アルハンブラ宮殿は私にとってただの美しい宮殿ではありません。山の中で静かに生き延びた、ヨーロッパの歴史の全く異なる時代を物理的に思い出させるものです。",
          signature: "ムーア人の夢"
        },
        "Madrid": {
          title: "文化の重力",
          body: "半島の地理的中心であることは、この都市に巨大で否定できない重力を与えています。私は主に、そこに収蔵されているアートの圧倒的な量に惹かれています。ベラスケスの作品の前に直接立つことは、ヨーロッパの歴史を評価する人にとって必要な巡礼のように思えます。",
          signature: "私の旅程に"
        }
      }
    },
    Morocco: {
      name: "モロッコ",
      flag: "ma",
      caption: "アフリカ、アラブ、ベルベル文化の交差点であり、信じられないほど特徴的な都市環境を持つ。",
      cities: ["Marrakech", "Chefchaouen", "Fez", "Essaouira"],
      letters: {
        "Marrakech": {
          title: "カオスと静寂",
          body: "ここで私の注意を引くのは、そのコントラストです。メディナ（旧市街）は圧倒的にカオスで騒々しい迷路として有名ですが、伝統的なリヤドは完全に静かで、内側を向いた聖域として設計されています。これら2つの極端なものがどのように隣り合って存在しているのかを本当に体験したいです。",
          signature: "未来の冒険"
        },
        "Chefchaouen": {
          title: "色以上のもの",
          body: "青い壁を見てただ美しい写真だと思うのは簡単ですが、私を実際に引き込むのはその歴史です。スペインから逃れてきたユダヤ人やムーア人の難民によって大きく形作られ、孤立した山の前哨基地を美しく、永続的な避難所に変えたのです。",
          signature: "想像の中で迷子"
        },
        "Fez": {
          title: "中世の迷路",
          body: "ここは地球上で最大級の車が入れない都市エリアの一つです。現代のインフラが基本的に通用しない数千の路地が入り組んだ中世の迷路をナビゲートするというアイデアは、私にとって魅力的です。主要都市が何世紀も前とほぼ同じように機能しているのを見ることができる、まれなチャンスのように感じます。",
          signature: "探検の目標"
        },
        "Essaouira": {
          title: "急がない港",
          body: "強烈な砂漠の都市とは異なり、この沿岸の要塞はずっと遅く、芸術的なリズムを持つことで知られています。ヨーロッパと北アフリカの建築が衝突した主要な貿易拠点であり、歴史的に重みがありながらも全く急がない、リラックスした港町を作り出しています。",
          signature: "訪問を待って"
        }
      }
    },
    China: {
      name: "中国",
      flag: "cn",
      caption: "スケールを把握するのが難しい。巨大な古代の基盤の上に立ちながら、未来へと急ぐ国。",
      cities: ["Beijing", "Shanghai", "Chengdu", "Lijiang"],
      letters: {
        "Beijing": {
          title: "帝国の重み",
          body: "ここの建築に埋め込まれた権力の圧倒的なスケールは、理解するのが難しいです。紫禁城は、あなたを信じられないほど小さく感じさせるように設計されています。それらの巨大な帝国の建造物が、一般の人々が何世代にもわたって住んできた狭い胡同のすぐ隣にあることに魅了されます。",
          signature: "歴史の旅"
        },
        "Shanghai": {
          title: "時間の境界",
          body: "過去と超未来の摩擦を、ここほどはっきりと示している場所は他にありません。川の片側には重厚なヨーロッパ様式のコロニアルな銀行建築があり、反対側にはSFのようなスカイラインが直接見つめ合っています。まるで二つの異なる世紀の境界に立っているかのようです。",
          signature: "光の街"
        },
        "Chengdu": {
          title: "ペースを守る",
          body: "巨大で急成長しているテックハブであるにもかかわらず、この街はリラックスした茶館の文化を猛烈に守っていることで有名です。国の他の地域が前へ前へと急いでいる中で、そのゆっくりとした、意図的な生活のペースを犠牲にすることを拒む場所を尊敬します。",
          signature: "スパイシーでリラックス"
        },
        "Lijiang": {
          title: "雪解け水に形作られて",
          body: "先住民のナシ族は、伝統的な城壁を持たずにこの町を築き、代わりに山の雪解け水を引く見事な石の運河ネットワークに頼りました。地理と水によって完全に形作られ、ヒマラヤの麓で何世紀もの変化を生き延びてきた場所のアイデアが大好きです。",
          signature: "平和な願い"
        }
      }
    },
    Georgia: {
      name: "ジョージア",
      flag: "ge",
      caption: "コーカサス山脈に挟まれた険しい国。独自のアルファベットと古代の伝統を守り続けている。",
      cities: ["Tbilisi", "Kazbegi", "Mestia", "Batumi"],
      letters: {
        "Tbilisi": {
          title: "歴史の交差点",
          body: "地理的にも文化的にも、この都市は常に帝国の間に直接挟まれてきました。彫刻が施された木製のバルコニーとソビエトのブルータリズム、古代の教会が混ざり合った建築にそれを見ることができます。全く異なる世界を無理やり織り交ぜなければならない場所に惹かれます。",
          signature: "コーカサスの心"
        },
        "Kazbegi": {
          title: "石の声明",
          body: "巨大なコーカサス山脈に囲まれた険しい頂の上に、小さな石造りの教会をポツンと建てることは、孤立の大胆な声明です。それは目的地というよりも、どれだけそこにいたいかを証明するための物理的なテストのように見えます。",
          signature: "山の夢"
        },
        "Mestia": {
          title: "塔の谷",
          body: "何世紀にもわたり、スヴァン族は非常に深い山奥に孤立して住んでいたため、どの家族も基本的に防衛用の独自の石の監視塔を建てなければなりませんでした。世界の他の場所から完全に切り離された状態で独自の言語と生存文化を発展させた地域を探検するのは素晴らしいことのように思えます。",
          signature: "谷の高みで"
        },
        "Batumi": {
          title: "沿岸の矛盾",
          body: "黒海に面したエキセントリックなリゾートタウンという奇妙な評判があり、古いソビエトの団地のすぐ隣に奇妙で未来的な超高層ビルが立ち並んでいます。このような矛盾した実験的な沿岸都市が、実際の生活でどのように機能しているのかを見てみたいという好奇心が大きいです。",
          signature: "沿岸の好奇心"
        }
      }
    },
    Greece: {
      name: "ギリシャ",
      flag: "gr",
      caption: "崖を降りる白い立方体の家々、エーゲ海のオリーブ色の光、その下に3000年の哲学が層を成す。",
      cities: ["Athens", "Santorini", "Crete", "Meteora"],
      letters: {
        "Athens": {
          title: "大理石とグラフィティ",
          body: "プラカ地区を歩き、足元のすり減った大理石の敷石を感じたいです。無秩序に広がるカオスな現代都市の上に輝くアクロポリスを見ることは、私が直接目撃しなければならないものです。",
          signature: "パルテノンの下で"
        },
        "Santorini": {
          title: "カルデラの縁",
          body: "ありきたりかもしれませんが、エーゲ海と全く同じ色の青いドームを見るのは夢です。火山の崖っぷちに立ち、あの世界的に有名な夕日を見たいのです。",
          signature: "エーゲ海の夢"
        },
        "Crete": {
          title: "野生の島",
          body: "クノッソスの古代遺跡をさまよい、ミノアの迷宮を想像してみたいです。険しい峡谷、果てしないオリーブ畑、そして深い歴史の組み合わせが私を引き込みます。",
          signature: "探検を待つ神話"
        },
        "Meteora": {
          title: "空中に吊るされて",
          body: "巨大な砂岩の柱の上にありえない形で建つ修道院というアイデアは、ファンタジーのように感じられます。朝霧が岩を包む中、あの石彫りの階段を登ってみたいです。",
          signature: "空に触れる"
        }
      }
    },
    Norway: {
      name: "ノルウェー",
      flag: "no",
      caption: "水と氷によって定義される険しい風景。そこではモダンデザインが極端な地理を静かに尊重している。",
      cities: ["Oslo", "Bergen", "Lofoten", "Tromsø"],
      letters: {
        "Oslo": {
          title: "森と共に建てる",
          body: "ほとんどの首都は自然環境をコンクリートで覆ってしまいますが、オスロは森と水の中に直接組み込まれているように見えます。開発者として、近代的で機能的なデザインが自然を支配しようとするのではなく、実際に自然を補完している点にとても感銘を受けます。",
          signature: "北欧の目標"
        },
        "Bergen": {
          title: "雨を受け入れる",
          body: "ここでは1年に200日以上雨が降りますが、それでもヨーロッパで最も美しい都市の一つとされています。過酷な天候から隠れようとするのではなく、それを完全に受け入れている沿岸の町には、信じられないほど居心地の良さを感じさせる何かがあります。",
          signature: "7つの山の間で"
        },
        "Lofoten": {
          title: "ギザギザの縁",
          body: "地理的に、この諸島はほとんど意味をなしません。巨大でギザギザの山々が凍える海から真っ直ぐに突き出ており、残されたわずかな平らな岩の上に小さな漁村がひしめき合っています。ここは人が住める世界の絶対的な果てのように見えます。だからこそ、私はそこを見る必要があるのです。",
          signature: "北極圏の上で"
        },
        "Tromsø": {
          title: "暗闇に生きる",
          body: "これほど北にいると、時間と光の経験の仕方が根本的に変わります。年のかなりの部分を完全な極夜の暗闇の中で過ごし、空がオーロラで燃え上がるのを待つコミュニティの心理状態に惹かれます。",
          signature: "オーロラの下で"
        }
      }
    },
    Iran: {
      name: "イラン",
      flag: "ir",
      caption: "建築が視覚的な数学のように感じられる、巨大で古代の文明。",
      cities: ["Isfahan", "Tehran", "Shiraz", "Yazd"],
      letters: {
        "Isfahan": {
          title: "視覚的な数学",
          body: "ここの建築は基本的に視覚的な数学です。メイン広場のタイルの天井の写真を見つめたことがありますが、その幾何学的な精度は複雑すぎて、ほとんどデジタルのように見えます。人間の手が実際にそれを作ったのかどうかを確認するために、私はそのドームの中に立つ必要があります。",
          signature: "歴史に魅了されて"
        },
        "Tehran": {
          title: "山のメトロポリス",
          body: "ここで私を魅了するのは、その圧倒的なスケールです。雪を頂く山々の麓に、何百万人もの人々が住む巨大で混雑した厳格な制裁下のメトロポリスが直接座っています。実際に現地に足を運んで初めて理解できる、重い矛盾に満ちた都市のように感じます。",
          signature: "未来の探検"
        },
        "Shiraz": {
          title: "言葉への敬意",
          body: "古典的な詩人が現代のロックスターのように扱われる文化を見つけることは非常に稀です。何世紀も前に亡くなった作家の墓に、人々が詩を朗読するためだけに今も集まるというアイデアに惹かれます。それは芸術と言語に対する深い社会的敬意を示しています。",
          signature: "庭園の中で"
        },
        "Yazd": {
          title: "古代の工学",
          body: "エアコンが発明されるずっと前に、ここの人々は冷たい風を泥レンガの建物に引き込むための巨大なウィンドキャッチャー（採風塔）を設計しました。システムがどのように機能するかに興味がある者として、数千年前に持続可能な気候制御を解明した砂漠の都市を見ることは、信じられないほどクールなことです。",
          signature: "砂の中のオアシス"
        }
      }
    },
    India: {
      name: "インド",
      flag: "in",
      caption: "複数の異なる世紀が全く同時に起きているように見える、感覚的なオーバーロード。",
      cities: ["Delhi", "Varanasi", "Jaipur", "Kochi"],
      letters: {
        "Delhi": {
          title: "7層の都市",
          body: "この場所は実際には、7つの異なる歴史的都市が互いの上に直接建設されていると言われています。超近代的な地下鉄の駅から出た直後に、何世紀も前のムガル帝国の墓につまずくような、密度が高くカオスな歴史に惹かれます。",
          signature: "喧騒の中で"
        },
        "Varanasi": {
          title: "正直な川",
          body: "地球上で、死すべき運命をこの都市ほどオープンに扱う場所はほとんどありません。人々が川に来て沐浴し、祈り、死者を火葬するというすべてが同じ空間で行われる精神的な強烈さは、圧倒的に感じられます。それはあなたの視点を変えざるを得ないようなカルチャーショックです。",
          signature: "聖なる川のそばで"
        },
        "Jaipur": {
          title: "デザインとホスピタリティ",
          body: "1800年代に外国の王を歓迎するためだけに都市のコア全体がピンク色に塗られ、彼らは単にそれをそのまま維持しました。美学とホスピタリティが都市のアイデンティティにどれほど深く組み込まれているか、特に風を操るためだけに設計された複雑なファサードが大好きです。",
          signature: "ラジャスタンの日記"
        },
        "Kochi": {
          title: "静かな交差点",
          body: "古代のスパイス貿易のため、この南の海岸は全く異なる世界の磁石となりました。同じ熱帯の近所で、ポルトガルの教会、中国の漁網、ユダヤ教のシナゴーグを見つけることができます。世界の歴史の魅力的で静かな交差点です。",
          signature: "南風"
        }
      }
    },
    Malaysia: {
      name: "マレーシア",
      flag: "my",
      caption: "文化融合のマスタークラス。そこでは深いジャングルが常に高層ビルを飲み込もうと脅かしている。",
      cities: ["Kuala Lumpur", "Penang", "Malacca", "Kota Kinabalu"],
      letters: {
        "Kuala Lumpur": {
          title: "急速な上昇",
          body: "この都市は、泥だらけのスズ鉱山の町から未来的なスカイラインへと、文字通り瞬く間に変わりました。その発展のスピードは驚異的ですが、巨大なタワーのすぐ下には、深いジャングルのポケットや古いコロニアル建築が今も残っています。",
          signature: "都会のジャングルで"
        },
        "Penang": {
          title: "食を通じた歴史",
          body: "移住がどのように文化を形作るかを理解したければ、食べ物を見てください。ここでは、朽ちゆく植民地時代の港町で、マレー、中国、インドの影響が何世代にもわたって交配されてきました。そのようなどっぷりとした文化の混ざり合いが実際にどんな味がするのかを体験するためだけに行きたいです。",
          signature: "食の巡礼"
        },
        "Malacca": {
          title: "海上のチョークポイント",
          body: "何世紀にもわたり、この狭い海峡を支配する者が基本的に世界貿易を支配していました。町を歩くということは、この小さく戦略的な土地を確保するために戦ったポルトガル、オランダ、イギリス帝国が残した建築的な傷跡を見るということです。",
          signature: "海峡のそばで"
        },
        "Kota Kinabalu": {
          title: "都会の野生",
          body: "周囲のジャングルをかろうじて許容しているように感じる近代都市を見つけることはまれです。賑やかな都市の中心部に立っていながら、東南アジア最高峰の山が背景にそびえ立っているのが見えるという事実は、この場所に非常にワイルドなエッジを与えています。",
          signature: "アイランドタイム"
        }
      }
    },
    Japan: {
      name: "日本",
      flag: "jp",
      caption: "深い歴史的保存と絶え間ない技術的な勢いの究極の交差点。",
      cities: ["Kyoto", "Tokyo", "Kanazawa", "Osaka"],
      letters: {
        "Kyoto": {
          title: "言語の目標",
          body: "私はベトナムと日本の間でテクノロジーを繋ぐキャリアを目指し、何年も日本語を勉強してきました。何世紀もの戦争を生き延びて保存されてきた古都を歩き、看板を読み、地元の人々と自然に話すことができるようになることは、個人的な大きな目標の実現になります。",
          signature: "実現する夢"
        },
        "Tokyo": {
          title: "工学の奇跡",
          body: "ソフトウェア開発者として、この都市は複雑なシステムが完璧に機能する最高峰を表しています。インフラを崩壊させることなく毎日3000万人を移動させることは奇跡です。いつかそこで働き始める前に、その容赦ない勢いを直接体験したいです。",
          signature: "私の目標"
        },
        "Kanazawa": {
          title: "手つかずの時代",
          body: "戦争での爆撃をほとんど免れたため、ここは武家屋敷や芸者街全体が完全に無傷で残っている数少ない場所の一つです。私は大の歴史オタクなので、江戸時代からレイアウトが変わっていない通りを歩くというアイデアは信じられないほど魅力的です。",
          signature: "古い街並みから"
        },
        "Osaka": {
          title: "騒がしい兄弟",
          body: "私が読んだすべてのものが、ここの文化は東京の礼儀正しい控えめさの真逆だと言っています。騒がしく、食に執着し、猛烈に独立心が強い。部外者が完全に均一だと想定しがちな国の中での、その際立った地域性のコントラストを体験することにとても好奇心があります。",
          signature: "食い倒れ"
        }
      }
    },
    Mexico: {
      name: "メキシコ",
      flag: "mx",
      caption: "先住民のルーツと植民地の歴史の鮮やかな衝突。ジャングルと沈みゆく湖の上に築かれている。",
      cities: ["Mexico City", "Oaxaca", "Mérida", "Tulum"],
      letters: {
        "Mexico City": {
          title: "沈みゆくメガロポリス",
          body: "スペイン人はこの場所を建設するために、巨大な湖の真ん中にあるアステカの島都を文字通り舗装してしまいました。そのせいで、このメガロポリス全体がゆっくりと沈んでいます。それほど多くの歴史的および地理的な重荷を背負った都市が、どのようにしてこれほど文化的に支配的でいられるのかに魅了されます。",
          signature: "CDMXからの呼び声"
        },
        "Oaxaca": {
          title: "文化の錨",
          body: "メキシコ南部は国の文化的な錨のように感じます。ここの先住民の伝統は消し去られませんでした。それは進化し、芸術と信じられないほど複雑な食のシステムに多大な影響を与えました。人々が何を料理しているかに注意を払うだけで多くのことを学べる場所のように感じます。",
          signature: "南の心"
        },
        "Mérida": {
          title: "石灰岩の上の文明",
          body: "ユカタン半島の地理は完全に多孔質の石灰岩でできており、つまり川はなく、淡水を蓄える数千の地下シンクホール（セノーテ）があるだけです。マヤ人はそれを中心に文明を築きました。歴史と人々が、この奇妙で脆い地質にいかに完全に依存しているかに惹かれます。",
          signature: "ユカタンの熱"
        },
        "Tulum": {
          title: "崖の上の要塞",
          body: "ほとんどの古代遺跡はジャングルや山の奥深くに埋もれていますが、マヤ人はカリブ海に面した崖の縁に巨大な石の要塞を直接建てました。強力な古代の貿易ハブが楽園に置かれたとき、実際にどんな風に見えるのか興味があります。",
          signature: "カリブ海のそばで"
        }
      }
    },
    Colombia: {
      name: "コロンビア",
      flag: "co",
      caption: "極端な地形の変化を持つ国。アンデス山脈がカリブ海へと急激に落ち込んでいく。",
      cities: ["Bogotá", "Medellín", "Cartagena", "Salento"],
      letters: {
        "Bogotá": {
          title: "標高8000フィートの生活",
          body: "アンデス山脈の標高8000フィート以上に位置するこの首都は、ほとんどのスキーリゾートよりも高い場所にあります。密集した現代の都市のレンガ造りと、凍てつく薄い山の空気をどのように融合させ、社会全体がその極端な高度で機能しているのかにとても興味があります。",
          signature: "アンデスの高みで"
        },
        "Medellín": {
          title: "市民的転換",
          body: "30年前、ここは地球上で最も危険な都市の一つとされていました。今日では、最も貧しい山腹の近隣地域を中心部と結ぶために革新的な公共交通機関を利用したことで称賛されています。問題解決を高く評価する人間として、その種の市民的な方向転換は信じられないほどインスピレーションを与えてくれます。",
          signature: "谷の景色"
        },
        "Cartagena": {
          title: "帝国の金庫室",
          body: "ここは、スペイン人がヨーロッパに持ち帰る前に略奪した金を蓄えた主要な港でした。海賊を撃退するために建てられた巨大な石の壁は今も立っています。本質的に難攻不落の銀行の金庫室として設計されたカリブ海の都市を探検するというアイデアが大好きです。",
          signature: "カリブの魔法"
        },
        "Salento": {
          title: "巨大なヤシの木",
          body: "ここの風景はあなたのスケール感覚を狂わせます。そこは世界で最も高いヤシの木で満たされた高地の雲霧林で、霧の中へ約200フィートも伸びています。自然のバグのように見え、その中をハイキングしたいと強く思わせます。",
          signature: "温かいカップと共に"
        }
      }
    },
    Egypt: {
      name: "エジプト",
      flag: "eg",
      caption: "完全に砂漠から削り出され、ナイル川の鼓動に完全に依存する記念碑的な文明。",
      cities: ["Cairo", "Luxor", "Alexandria", "Aswan"],
      letters: {
        "Cairo": {
          title: "古代を押し迫る",
          body: "私の心を揺さぶるのは、ピラミッドが辺境の砂漠の真ん中にあるのではなく、2000万人が住むメガロポリスのスプロール（都市の広がり）がその足元まで迫っていることです。カオスな現代世界が古代の墓に直接押し迫る摩擦こそ、私が見たいものです。",
          signature: "砂漠に惹かれて"
        },
        "Luxor": {
          title: "野外博物館",
          body: "世界の古代モニュメントの約3分の1が、川のこの一つの曲がりの周りに集中しています。本質的に、都市の大きさを持つ野外博物館です。何千年も立っている巨大な柱の横をさりげなく歩けるというアイデアは、理解するのが難しいほどです。",
          signature: "過去に魅了されて"
        },
        "Alexandria": {
          title: "失われた頭脳",
          body: "ここはかつて古代世界の知的な中心であり、アレクサンドリア大図書館がありました。古いモニュメントはなくなってしまいましたが、人間の文明の「頭脳」として何世紀も機能した場所の地中海の雰囲気に惹かれます。",
          signature: "歴史的な願い"
        },
        "Aswan": {
          title: "鋭い境界",
          body: "ここでは地理がすべてを決定します。ナイル川のほとりに立ち、豊かな緑の植生が突然止まり、過酷で終わりのないサハラ砂漠が始まる正確な線を見ることができます。生命が存在できるそのはっきりとした物理的な境界を体験したいです。",
          signature: "川を待って"
        }
      }
    },
    Russia: {
      name: "ロシア",
      flag: "ru",
      caption: "圧倒的な物理的スケールと過酷な冬を利用して権力を誇示する、広大で謎めいた土地。",
      cities: ["Moscow", "Saint Petersburg", "Dagestan", "Vladivostok"],
      letters: {
        "Moscow": {
          title: "国家の重み",
          body: "ここの建築は、国家の重みを感じさせるように設計されています。地下鉄の駅でさえ、地下の宮殿のように見えるように作られました。そのインフラと物理的スケールを利用して、これほど攻撃的に権力と歴史を投影する場所に魅了されます。",
          signature: "冬の夢"
        },
        "Saint Petersburg": {
          title: "強制された首都",
          body: "ピョートル大帝は、ただ自分の主張を証明するためだけに、凍えそうな住めない沼地からヨーロッパ様式の首都を強制的に作り出しました。あまりにも計画的だったため、この街には忘れがたい、不自然な対称性があります。特に太陽が完全に沈まない夏には顕著です。",
          signature: "芸術に惹かれて"
        },
        "Dagestan": {
          title: "隠された多様性",
          body: "ほとんどの人は、コーカサス山脈が非常に小さなエリアに数十の異なる民族グループと言語を隠していることに気づいていません。これらの険しい村の孤立は、典型的な観光ルートから遠く離れて、私が直接学びたいと思う古代の生活様式を保存してきました。",
          signature: "山の中へ"
        },
        "Vladivostok": {
          title: "大陸の果て",
          body: "モスクワから列車でここまで来るのに7日間かかります。太平洋を見渡す、アジアの絶対的な端に位置する主要なヨーロッパ様式の海軍都市というアイデアは、信じられないほど好奇心をそそられる地理的異常です。",
          signature: "旅の終わり"
        }
      }
    },
    Czechia: {
      name: "チェコ",
      flag: "cz",
      caption: "何世紀もの紛争をなぜか生き延びた、ヨーロッパの中心にある高密度の建築アーカイブ。",
      cities: ["Prague", "Český Krumlov", "Mariánské Lázně", "Brno"],
      letters: {
        "Prague": {
          title: "途切れないタイムライン",
          body: "多くのヨーロッパの首都とは異なり、この都市は世界大戦をほぼ無傷で生き延びました。歩き回るということは、ゴシック、ルネサンス、バロック建築の正真正銘の、途切れないタイムラインを実際に見ることを意味します。本質的に、爆撃されたり再建されたりしていない巨大な建築アーカイブなのです。",
          signature: "ボヘミアの夢"
        },
        "Český Krumlov": {
          title: "放置による保存",
          body: "冷戦時代に無視され、大部分が忘れ去られていたため、この町は偶然にも中世のレイアウトを完璧に保存することになりました。現代の開発から完全に無視されることが、最終的にその場所の最大の歴史的資産になり得るというのは魅力的です。",
          signature: "おとぎ話で迷子"
        },
        "Mariánské Lázně": {
          title: "貴族の隠れ家",
          body: "ヨーロッパのエリートたちがミネラルウォーターを飲むためだけに辺境の森の谷へ旅したという、奇妙で豪華な19世紀の文化に興味を惹かれます。この町は基本的に、歴史的なウェルネスと古い貴族の休息の取り方の完璧に保存された記念碑です。",
          signature: "静けさを求めて"
        },
        "Brno": {
          title: "おとぎ話より機能",
          body: "首都がおとぎ話のように見えることで注目を集める一方で、この都市は生々しいモダニズム建築と巨大な地下トンネルシステムで有名です。群衆に迎合するよりも機能を優先し、実際に人が住んでいるように感じられる第二の都市を訪れるのが、私はいつも好きです。",
          signature: "知られざる道へ"
        }
      }
    }
  },
};
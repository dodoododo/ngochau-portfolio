// Draft Turkish translations — flagged for native-speaker review before launch.
import type { en as EnDict } from "./en";
type Dict = typeof EnDict;

export const tr: Dict = {
  meta: {
    name: "Thân Ngọc Hậu",
    wordmark: "NgocHau",
    location: "Da Nang, Vietnam",
    role: "Geleceğin Full-Stack Geliştiricisi",
    availability: "Yeni projelere açık",
  },
  nav: {
    introduction: "Giriş",
    projects: "Projeler",
    skills: "Yetenekler",
    achievements: "Başarılar",
    personal: "Kişisel",
    contact: "İletişim",
  },
  intro: {
    kicker: "Geleceğin Full-Stack Geliştiricisi",
    headline: ["Da Nang'da,", "amacı olan", "işler üretiyorum."],
    bio: "Yazılımları basit bir amaçla geliştiriyorum: günlük rutinleri hafifletmek ve hayatı biraz daha kolaylaştırmak. Ancak sadece sorunları çözmekle kalmıyor; düşünülmüş estetik detaylarla göze hitap eden, ruhu besleyen, görsel olarak çarpıcı ve havalı web siteleri tasarlıyorum. Bu, teknik mantığa dayanan ama tamamen insan empatisi ve güzel tasarıma olan sevgiden güç alan bir pratik.",
    portraitAlt: "Genç geliştirici Hậu'nun yumuşak doğal ışık altındaki portresi",
    deckHint: "Sunumu incele",
    hintNext: "Projeler",
  },
  projects: {
    eyebrow: "Seçilmiş işler",
    heading: "Son zamanlarda geliştirdiklerim.",
    subheading: "Full-stack sistemler, Web3 entegrasyonları ve mobil uygulamalardan oluşan bir vitrin.",
    openSite: "Siteye git",
    items: [
      {
        title: "AnimeLearn",
        description:
          "Kesin sesten metne (audio-to-text) çıkarımı için OpenAI Whisper ve doğru morfolojik analiz için SudachiPy kullanan özel bir yapay zeka hattıyla desteklenen gelişmiş bir Japonca öğrenim platformu. Platform, kullanıcıların video izlerken gerçek zamanlı sözlük aramaları yapmasına ve kelimeleri doğrudan kaydetmesine olanak tanıyan etkileşimli, çift altyazılı bir video oynatıcıya sahip. Çıkarılan kelimeler ve kanjiler, gerçek dünya kullanım sıklığına ve JLPT seviyelerine göre kapsamlı bir şekilde kategorize ediliyor ve çalışma verimliliğini en üst düzeye çıkarmak için Aralıklı Tekrar Sistemi (SRS) ile sorunsuz bir şekilde entegre çalışıyor.",
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
        description: "Gruplar, çiftler ve arkadaşlar için hepsi bir arada bir üretkenlik alanı. Gerçek zamanlı sohbet, sezgisel Kanban görev yönetimi, etkileşimli Leaflet harita etkinlikleri, not alma, ortak canlı beyaz tahta ve JWT kimlik doğrulaması ile Bcrypt şifreleme üzerinden sağlanan güçlü güvenlik özelliklerini içeriyor.",
        stack: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS", "shadcn/ui", "OpenStreetMap"],
        url: "https://our-note-ten.vercel.app/",
        github: "https://github.com/dodoododo/our-note",
        image: "project-2",
      },
      {
        title: "ShopTalk (Convo AI Hackathon 2026)",
        description:
          "Konuşma odaklı yapay zeka ve blokzincir ödemeleri kullanarak çevrimiçi satışları otomatikleştiren full-stack bir AI ticaret platformu. ShopTalk, doğal dilde müşteri etkileşimlerini yönetmek için Agora Conversational AI ile Groq Llama 3.3'ü kullanıyor. Ayrıca araç çağırma (tool calling) ile envanter sorgulama ve sipariş oluşturma, Solana Pay USDC ödeme talepleri üretme, çok katmanlı doğrulama ile on-chain işlemleri onaylama ve WebSocket'ler aracılığıyla gerçek zamanlı gösterge paneli güncellemeleri sunma özelliklerine sahip.",
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
          "Bilgisayarlı görü, gömülü donanım ve gerçek zamanlı satış noktası (POS) panelini birleştiren uçtan uca bir IoT akıllı perakende platformu. Sistem, akıllı teraziden ağırlık verilerini alıyor, YOLOv8 destekli yapay zeka modeliyle meyveleri algılıyor, fiyatlandırmayı otomatik hesaplıyor, işlemleri yönetiyor ve FastAPI arka ucu (backend) ile MySQL üzerinden satış verilerini senkronize ediyor. React, TypeScript ve Tailwind CSS ile geliştirilen ön yüz (frontend), canlı tartım, yapay zeka ile tanıma, işlem geçmişi ve mağaza analitiği için duyarlı bir kontrol paneli sunuyor.",
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
          "Flutter ve ölçeklenebilir bir Node.js/Express backend ile tasarlanmış çapraz platform (cross-platform) bir sosyal medya uygulaması. JWT tabanlı kimlik doğrulama, yazıyor bildirimleri ve durum senkronizasyonu içeren gerçek zamanlı WebSocket mesajlaşma, Cloudinary destekli medya depolama, arkadaş önerme algoritmaları ve MongoDB veri modellemesi uygulandı. Ön yüz, öngörülebilir durum yönetimi için BLoC mimarisini, duyarlı mobil performans için özel kamera entegrasyonu ve cihaz içi görüntü sıkıştırmasıyla birleştiriyor.",
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
          "Temel web prensiplerinde ustalaşmak amacıyla tamamen framework kullanılmadan (çatısız) oluşturulmuş güvenli bir B2C farmasötik e-ticaret platformu. Java Servlet'leri ve JSP kullanılarak katı bir MVC tasarım deseni ile mimarilendirildi ve karmaşık yabancı anahtar (foreign key) kısıtlamalarına sahip tamamen normalize edilmiş bir MySQL ilişkisel veritabanı ile desteklendi.",
        stack: ["Java Servlet", "JSP", "MySQL", "MVC Architecture", "Bootstrap"],
        url: "",
        github: "https://github.com/dodoododo/medicine-distribution-system",
        image: "project-6",
      },
      {
        title: "Japanese Dictionary",
        description:
          "Gelişmiş kelime/kanji aramaları, özelleştirilebilir bilgi kartı (flashcard) oluşturma ve PDF dışa aktarma özelliklerine sahip kapsamlı bir JLPT çalışma aracı. Güvenli JWT kimlik doğrulaması ve katı istemci-sunucu veri doğrulaması (validation) ile kusursuz bir kullanıcı deneyimi sağlar.",
        stack: ["React", "Java Spring Boot", "Microsoft SQL Server", "Tailwind CSS"],
        url: "",
        github: "https://github.com/dodoododo/PBL3-Japanese-Dictionary",
        image: "project-7",
      },
      {
        title: "Flight Booking Management",
        description:
          "Gelişmiş Nesne Yönelimli Programlama (OOP) konseptlerini sergileyen güçlü, konsol tabanlı bir uygulama. Dinamik bellek yönetimi için C++ STL Vector'lerini kullanır ve veritabanı gerektirmeyen, kalıcı veri depolaması için özel metin dosyası I/O (girdi/çıktı) çözümlemesi uygular.",
        stack: ["C++", "OOP", "File I/O Persistence"],
        url: "",
        github: "https://github.com/dodoododo/Book-Flight-Console-App-C-",
        image: "project-8",
      }
    ],
  },
  skills: {
    eyebrow: "Yetenekler",
    heading: "Zanaatımın araçları.",
    techHeading: "Teknik",
    languagesHeading: "Dil yetkinliği",
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
        name: "Ana Yığın (MERN)",
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
        name: "Mobil & Yazılım",
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
        name: "Veritabanları",
        items: [
          "PostgreSQL",
          "MySQL",
          "SQLite",
          "Microsoft SQL Server"
        ]
      },
      {
        name: "Bulut & DevOps",
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
        name: "IoT & Donanım",
        items: [
          "Arduino",
          "ESP8266",
          "Raspberry Pi",
          "Cisco Packet Tracer"
        ]
      },
      {
        name: "Araçlar & İş Akışları",
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
      vi: { name: "Tiếng Việt", proficiency: "Anadil" },
      en: { name: "English", proficiency: "IELTS 7.5 — Akıcı" },
      ja: { name: "日本語", proficiency: "JLPT N3 — Günlük Konuşma" },
    },
  },
  achievements: {
    eyebrow: "Başarılar",
    heading: "Gurur duyduğum birkaç an.",
    items: [
      {
        tag: "Hackathon · 2026",
        title: "İlk 10 Finalisti — CONVO AI HACKATHON DANANG ÜNİVERSİTESİ 2026",
        body: "DUT'daki küçük bir ekiple birlikte Solana entegrasyonlu bir konuşma ajanı geliştirdik. #DUT #ConversationalAI #convoai #DSUC #Agora #Solana #Hackathon",
      },
      {
        tag: "Konuşma Yarışması · Japonca",
        title: "1.lik Ödülü — Japonca konuşma yarışması",
        body: "Japonya'nın Da Nang Başkonsolosu Takero Mori'nin katılımıyla gerçekleşti.",
      },
      {
        tag: "Konuşma Yarışması · İngilizce",
        title: "3.lük Ödülü — Üniversite İngilizce konuşma yarışması",
        body: "Da Nang Bilim ve Teknoloji Üniversitesi (“Bách Khoa” Da Nang).",
      },
    ],
  },
  personal: {
    eyebrow: "Kişisel",
    personalTitle: ["KOD YAZMADIĞIM", "ZAMANLARDA BEN."],
    personalDescription: "Bu portfolyonun, zamanınızın beş dakikasını alıp teknolojiye ne kadar tutkulu olduğumu anlattığım sıradan bir sayfa olmasını istemedim. Bu portfolyonun sadece teknoloji sektöründeki insanlar için var olmasını da istemedim. Elbette işlerimi sergilemek için burada, ancak aynı zamanda buraya tesadüfen yolu düşen herkese, gelecekteki arkadaşlara, meraklı yabancılara veya sadece önemsediğim şeylerle bağ kuran insanlara da ulaşmasını istedim. Bu yüzden burayı size sevdiğim şeyleri anlatmak için kullanıyorum.",
    personalDrag: "Beni daha yakından tanıyın",
    chapter1: {
      label: "Bölüm 01 — Dünyaya duyulan merak",
      intro:
        "Hiç ayak basmadığım ülkelerin kültürüne, tarihine ve coğrafyasına karşı samimi bir ilgim var. Onlar hakkında okuyorum, belgeseller izliyorum ve şahsen görmek istediğim yerlerin yavaş yavaş büyüyen bir listesini tutuyorum.",
      cityInteractHint: "Her şehirden yazdığım seyahat mektuplarını okumak için tıklayın.",
      moduleHeading: "Ayak Basmak İstediğim Ülkeler",
      selectPrompt: "Küre üzerinde o ülkeye uçmak için bir ülke seçin.",
    },
    chapter2: {
      label: "Müzik Aşkı",
      heading: "Melodinin Düzeni",
      body: "Müziği çok seviyorum; çocukluğumdan beri boş zamanlarımın çoğunu müzik dinleyerek geçiriyorum. O kadar çok sevdim ki, rap beatleri yaparak müzik prodüksiyonuna başladım ve ardından gitar çalmaya başladım. İlginç ve benzersiz olduğu sürece müziğin her türünü dinlerim. 1400 şarkılık bir Spotify çalma listem var. İşte farklı türlerden ve dillerden en sevdiğim şarkılardan birkaçı.",
      footnote: "Eğer kod yazmıyorsam, muhtemelen bilinmedik bir müzik tavşan deliğinin derinliklerindeyimdir. Sorun değil. Her şey yolunda.",
      tags: ["Beat Prodüksiyonu", "Nasır Tutan Parmaklar", "Küresel Frekanslar"],
    },
    scrapbook: {
      spine: "Cilt 04 — Kişisel Manifesto — Üç Aylık Baskı — Kur. 2019",
      heroEyebrow: "Tavşan Takıntım",
      heroTitleLine1: "Tam Bir",
      heroTitleLine2: "Tavşan Manyağı",
      heroBoldLead: "Evet, onlara tamamen takıntılıyım.",
      heroBody:
        "Bence saçma derecede sevimliler. Sessizler, biraz sakarlar ve sadece gerçekten rahat hissettikleri insanlara güveniyorlar. Dürüst olmak gerekirse... bu bana çok tanıdık geliyor. Eğer reenkarnasyon gerçekse, çok sevilen bir ev tavşanı olarak geri dönmek isterdim. Yani evet, portfolyomun içine gizlenmiş bütün bir tavşan dergisi var. Umarım keşfederken eğlenirsiniz ve belki de onlarla ilgili yeni bir şeyler öğrenirsiniz.",
      essayLabel: "TAVŞANLAR HAKKINDA KİŞİSEL BİR DENEME",
      essayAuthor: "Yazan: Ngọc Hậu",
      article: {
        kicker: "Hayatta Kalma Ustası",
        dropCapLetter: "Ç",
        paragraph1Pre:
          "alılıkların arasında titreyen, kırılgan küçük av masallarını unutun. Gerçekte tavşanlar doğanın en cesur hayatta kalma savaşçılarıdır. Tavşanlar tek bir şey için yaratılmıştır:",
        paragraph1Bold: "patlayıcı bir hayatta kalma gücü",
        paragraph1Post:
          ". Korkan bir yaban tavşanı sadece koşmaz, sıkıştırılmış bir yay gibi fırlar, saatte 70 km hıza ulaşır ve yırtıcıları tamamen toz içinde bırakan keskin virajlar alır.",
        paragraph2Pre:
          "Peki ya güvende ve mutlu olduklarında? Havada yerçekimine meydan okuyan, bükülerek yaptıkları o zıplamaya",
        paragraph2Highlight: "BINKY (BİNKİ)",
        paragraph2Post: "denir. Bu, saf, filtrelenmemiş bir neşenin harekete dönüşmüş halidir.",
        airborne: "Havalandı!",
        binky: "Binky!",
        radarLabel: "270° Radar",
        quoteLine1: "270° dönen kulakları her an tetiktedir.",
        quoteHighlight: "Tehdidi siz daha",
        quoteLine2: "fark etmeden duyarlar.",
        globalDominationHeading: "Küresel Hakimiyet",
        globalDominationBody:
          "Dondurucu tundralardan kavurucu çöllere kadar, tavşanlar neredeyse her kıtayı fethettiler. Bedenlerini bir tünele sokmaya karar vermeden önce o tünelin genişliğini haritalandırmak için son derece hassas bıyıklarına güvenirler. İnanılmaz derecede uyumludurlar. Temel olarak durdurulamazlar!!",
        fact1: "Ön dişleri sürekli büyür, yılda 12 cm'ye kadar! Onları törpülemek için sert liflere ihtiyaç duyarlar.",
        fact2: "Bekar bir tavşan anne, doğum yaptıktan sadece saatler sonra tekrar hamile kalabilir. Teorik olarak tek bir çift, sadece bir yılda 3.000'den fazla yavru verebilir!",
        fact3: "Günde yaklaşık 8 saat uyurlar, ancak sadece 5 ila 25 dakikalık hızlı mini uykular halinde. Daha da çılgını? Tehlikeyi kollamak için genellikle gözleri tamamen açık uyurlar!",
      },
      stats: {
        heading: "TAVŞAN İSTATİSTİKLERİ",
        sprintValue: "70",
        sprintLabel: "km/s en yüksek hız",
        hearingValue: "3",
        hearingLabel: "km duyma menzili",
        speciesValue: "30+",
        speciesLabel: "tavşan türü",
        populationValue: "700m+",
        populationLabel: "dünyadaki tahmini tavşan",
      },
      pullQuote: {
        text: "Tavşan kendi cennetinin havuç dolu bir yer olduğunu düşünür, ta ki havuç dolu bir yer bulana kadar! Çok sevdiğiniz şeylerle dolu olduğu için onlardan sıkıldığınız bir yer cennet değil, en iyi ihtimalle cehennem olurdu!",
        attribution: "― Mehmet Murat İldan",
      },
      credits: {
        label: "ÜCRETLİ AKTÖRLER (BU HAREKETLERİ EVDE DENEMEYİN)",
        specimens: [
          "Lily, Kahraman",
          "Kiwi, Dinleniyor",
          "Holland Lop",
          "Orta-Sıçrama",
          "Alarm Duruşu",
          "Yiyecek Arıyor",
          "Denek No. 8",
        ],
      },
      foldHere: "✂ Buradan Katlayın — Bölüm II Devam Ediyor",
      sonicRadar: {
        heading1: "Sonik",
        heading2: "Radar",
        paragraph1Pre:
          "Bir tavşanın işitme duyusu onun nihai erken uyarı sistemidir. Sessiz bir çayırda, bir yırtıcının yanlış bir adımı — ince bir dalın",
        paragraph1Bold1: "keskin bir şekilde kırılması",
        paragraph1Mid: "— havada ilerler ve tavşan tarafından",
        paragraph1Bold2: "3 kilometre uzaktan bile algılanır.",
        // paragraph1Post: "",
        paragraph2Pre: "Bu mesafeyi kavramak için:",
        paragraph2Bold: "3.5 tane Burç Halife'yi",
        paragraph2Post:
          "uç uca eklediğinizi hayal edin. İşte tavşanın radarının yarıçapı budur. Kurt görünür bir tehdit haline gelmeden çok önce, tavşan tehlikenin yerini tam olarak tespit etmiş, yolunu hesaplamış ve kaçmaya hazırlanmıştır.",
        heightReferenceLabel: "Yükseklik Referansı",
        burjLabel: "Burç Halife (830m)",
        eiffelLabel: "Eyfel (330m)",
        libertyLabel: "Özgürlük Anıtı (93m)",
        bunnyLabel: "Tavşan",
        wolfLabel: "Kurt",
        snap: "ÇAT!",
        scaleCaptionPre: "3.5 × Burç Halife ≈",
        scaleCaptionHighlight: "3 Kilometre",
      },
      goldenRule: {
        huntsLine1: "Gözler",
        huntsLine2: "öndeyse,",
        huntsHighlight: "hayvan",
        huntsLine3: "avlar.",
        hidesLine1: "Gözler",
        hidesLine2: "yandaysa,",
        hidesHighlight: "hayvan",
        hidesLine3: "saklanır.",
      },
      blueprint: {
        fovLabel: "Görüş Alanı (FOV)",
        blindLabel: "Kör Nokta",
        predatorHeading1: "Binoküler",
        predatorHeading2: "Yırtıcılar",
        predatorFovValue: "~120°",
        predatorBlindValue: "Arka",
        predatorBody:
          "İleriye bakan gözler tek bir keskin odaklı alanda örtüşür. Aslanlar, kurtlar ve baykuşlar, saldırmak için kesin mesafeyi hesaplamak amacıyla yoğun derinlik algısı uğruna çevresel farkındalıktan vazgeçerler. Sadece kovalamaca için inşa edilmiş bir vizyon.",
        preyHeading1: "Monoküler",
        preyHeading2: "Avlar",
        preyFovValue: "~360°",
        preyBlindValue: "Tam Ön",
        preyBody:
          "Yana yerleştirilmiş gözler bağımsız çalışarak neredeyse kusursuz bir panoramik görüş sağlar. Tavşanlar, geyikler ve atlar, ufku sürekli taramak için derinlik algısını feda ederler. Bu tek bir amaç için inşa edilmiş biyolojik bir erken uyarı sistemidir: kaçış.",
      },
      bunnyLens: {
        heading1: "Tavşan",
        heading2: "Vizyonu",
        paragraph1:
          "Daha önce belirttiğimiz gibi, av hayvanları daha geniş bir görüş alanı için derinlik algısını feda ederler. Ancak tavşan, bu biyolojik planı mutlak uç noktasına taşır.",
        paragraph2Pre:
          "İri gözlerini kafatasının üzerinde alışılmadık derecede yüksek ve geniş bir konuma yerleştiren bir tavşan, iki ayrı optik akışı birleştirerek kusursuz,",
        paragraph2Bold: "neredeyse 360°'lik bir görsel radara",
        paragraph2Post:
          "dönüştürür. Çevresini taramak için kafasını çevirmesi gereken yırtıcıların aksine, tavşanın donanımı sürekli, pasif gözetleme için tasarlanmıştır.",
        paragraph3:
          "Burnu çimlere gömülüyken gökyüzünde dönen şahinleri izleyebilir veya boynundaki tek bir kası bile kıpırdatmadan tam arkasından sürünen bir çakalı fark edebilir.",
        tooltipMonoTitle: "Monoküler Alan",
        tooltipMonoBody: "Neredeyse 360° hareket algılama sağlayan bağımsız göz taraması.",
        tooltipBinoFrontTitle: "Ön Binoküler",
        tooltipBinoFrontBody: "Örtüşen görüş, saldırmak için hassas derinlik algısı sağlar.",
        tooltipBinoRearTitle: "Arka Binoküler",
        tooltipBinoRearBody: "Kafasının hemen arkasından takip eden yırtıcıları izler.",
        tooltipBlindFrontTitle: "Burun Kör Noktası",
        tooltipBlindFrontBody:
          "Yüzlerinin tam önü mutlak bir kör noktadır. Ne yediklerini kelimenin tam anlamıyla göremezler, bu yüzden etrafı hissetmek için bıyıklarını kullanırlar.",
        tooltipBlindRearTitle: "Arka Kör Nokta",
        tooltipBlindRearBody: "Kendi vücut kütlesi tarafından engellenir.",
        legendMono: "Monoküler Alan",
        legendBino: "Binoküler Örtüşme",
        legendBlind: "Kör Nokta",
      },
      footer: "SON DAKİKA TAVŞAN HABERLERİ",
    },
    bunnyGacha: {
      moduleLabel: "Tavşan Gacha",
      moduleHeading: "Bir Tavşan Çek, Falını Gör",
      pullButton: "Çevir",
      natureSuffix: "Doğası",
      rarityLabel: "Nadirlik",
      blurbPrefix: "Günün Falı",
      factLabel: "Eğlenceli Bilgi",
      stats: {
        curiosity: "Merak",
        fluffiness: "Pofudukluk",
        energy: "Enerji",
        speed: "Hız",
        friendliness: "Dostluk",
        totalPower: "Toplam Güç",
      },
      ui: {
        title: "TAVŞAN GACHA",
        subtitle: "Kapsül Fal Makinesi",
        machineNo: "Kapsül Makinesi No. 07",
        dept: "Hayvan Araştırmaları Departmanı",
        specs: {
          heading: "Özellikler",
          dailyLimitLabel: "Günlük Sınır",
          dailyLimitValue: "Günde 1 Çekiliş",
          capsuleRateLabel: "Kapsül Oranı",
          capsuleRateValue: "%100 Organik",
          visualOutputLabel: "Görsel Çıktı",
          visualOutputValue: "3D Render",
          powerSourceLabel: "Güç Kaynağı",
          powerSourceValue: "Merak",
        },
        warning: {
          heading: "Uyarı",
          body: "Aşırı pofudukluk tespit edildi. Dikkatle ilerleyin. Kapsülleri beslemeyin.",
        },
        machineActive: "Makine Aktif",
        machineCode: "BNUY-01",
        turnHandle: "Kolu Çevir",
        pullIdle: "Gacha Çek",
        pullProcessing: "İşleniyor...",
        pullAgain: "Tekrar Çek",
        contentsTicket: {
          heading: "Bugünkü Falın İçeriği",
          species: "Tavşan Türü",
          fortune: "Günlük Fal",
          personality: "Kişilik Profili",
          fact: "Bilimsel Eğlenceli Bilgi",
        },
        stamp: {
          inspected: "İncelendi",
          passed: "GEÇTİ",
          dept: "Şans Departmanı",
        },
        collectAll: "Hepsini Topla",
      },
      bunnies: {
        hollandLop: {
          name: "Holland Lop",
          blurb: "Bir Holland Lop gibi, sadece kendin olarak insanların kalbini kazanacaksın.",
          type: "Yoldaş",
          personality: "Tatlı",
          ability: "Düşük Kulak Cazibesi",
          fact: "Tavşan ırkları arasında genellikle en rahat ve uysal olanlardan biri olarak tanımlanırlar, bu da onları ilk kez tavşan sahiplenecekler için çok uygun kılar.",
        },
        netherlandDwarf: {
          name: "Netherland Dwarf (Cüce Hollanda)",
          blurb: "Beklenmedik bir enerji patlaması, bugün başladığın işi bitirmene yardımcı olacak.",
          type: "Süratli",
          personality: "Enerjik",
          ability: "Zoomie Kasırgası",
          fact: "Sadece 1 kilo civarında olmalarına rağmen, kendilerinden on kat büyük bir tavşanın enerjisine ve tavrına sahiptirler.",
        },
        lionhead: {
          name: "Lionhead (Aslanbaş)",
          blurb: "Bugün saçların dağınık olabilir, ama ruhun görkemli.",
          type: "Görkemli",
          personality: "Gururlu",
          ability: "Yele Savunması",
          fact: "Eşsiz yeleleri, ilk olarak Belçika'da ortaya çıkan baskın bir genetik mutasyondan kaynaklanır.",
        },
        flemishGiant: {
          name: "Flemish Giant (Flandre Devi)",
          blurb: "İyi ve uzun bir şekerleme, bugün çok çalışmaktan daha fazla sorunu çözecektir.",
          type: "Titan",
          personality: "Nazik",
          ability: "Profesyonel Uyuyucu",
          fact: "'Kibar Devler' olarak bilinirler, 10 kilograma kadar ağırlığa ulaşabilirler ve bazı köpekler kadar büyüktürler.",
        },
        miniRex: {
          name: "Mini Rex",
          blurb: "Bugün işler senin için kadife gibi pürüzsüz ilerleyecek.",
          type: "Yoldaş",
          personality: "Uysal",
          ability: "Kadife Dokunuşu",
          fact: "Tüylerinde uzun koruyucu kıllar bulunmaz, bu da onlara tıpkı pelüş bir kadife hissi veren eşsiz bir doku kazandırır.",
        },
        englishAngora: {
          name: "English Angora (İngiliz Angora)",
          blurb: "Yumuşak konforlar ve biraz ekstra bakımla dolu bir gün bekle.",
          type: "İlahi",
          personality: "Şımartılmış",
          ability: "Bulut Kamuflajı",
          fact: "Yüzleri ve kulakları da dahil olmak üzere tamamen yünle kaplı tek tavşan cinsidir ve günlük tımar gerektirirler.",
        },
        dutch: {
          name: "Dutch (Hollanda Tavşanı)",
          blurb: "Denge bugün senin gücün. İşleri tam ortadan ikiye bölmeye devam et.",
          type: "Klasik",
          personality: "Dengeli",
          ability: "Smokin Zarafeti",
          fact: "Çarpıcı iki tonlu renk desenleriyle hemen tanınan, bilinen en eski tavşan ırklarından biridir.",
        },
        californian: {
          name: "Californian",
          blurb: "Bugün yeni tanıştığın birinin üzerinde çarpıcı bir izlenim bırakacaksın.",
          type: "Klasik",
          personality: "Sakin",
          ability: "Termal Adaptasyon",
          fact: "Kulaklarındaki ve burunlarındaki koyu renkli işaretler sıcaklığa duyarlıdır ve soğuk havalarda daha da koyulaşır.",
        },
        harlequin: {
          name: "Harlequin",
          blurb: "Mizah anlayışın bugün seni zor bir durumdan kurtaracak.",
          type: "Düzenbaz",
          personality: "Oyuncu",
          ability: "Bölünmüş Kişilik",
          fact: "Satranç tahtasına benzeyen renkleri nedeniyle bazen 'tavşanların palyaçosu' olarak adlandırılırlar.",
        },
        himalayan: {
          name: "Himalayan",
          blurb: "Derin bir nefes al. Sakin bir yaklaşım en iyi sonuçları verecektir.",
          type: "Zen",
          personality: "Sakin",
          ability: "Silindir Esnemesi",
          fact: "Eşsiz bir silindirik vücut şekline sahiptirler ve var olan en sakin tavşan ırklarından biridir.",
        },
        polish: {
          name: "Polish (Polonya Tavşanı)",
          blurb: "Bugün sihirli bir şekilde hiç yoktan bir çözüm üretebilirsin.",
          type: "Sihirli",
          personality: "Atik",
          ability: "Şapka Numarası",
          fact: "Tarihsel olarak illüzyonistler arasında popülerdirler; küçük, oldukça zeki ve çevrelerine karşı çok dikkatlidirler.",
        },
        satin: {
          name: "Satin",
          blurb: "Bugün hiç denemeden bile rekabette öne çıkacaksın.",
          type: "Işıltılı",
          personality: "Diva",
          ability: "Işık Kırılması",
          fact: "Genetik bir mutasyon kıl gövdelerinin yarı saydam olmasına neden olur ve kürklerini inanılmaz derecede parlak ve yansıtıcı yapar.",
        },
        silverFox: {
          name: "Silver Fox (Gümüş Tilki)",
          blurb: "Nadir ve eşsiz bir fırsat senin yoluna doğru geliyor.",
          type: "Nadir",
          personality: "Gizemli",
          ability: "Dik Duran Kürk",
          fact: "Geriye doğru okşandığında, tekrar ileriye doğru okşanana kadar kürkleri dik duran tek cins onlardır.",
        },
        blancDeHotot: {
          name: "Blanc de Hotot",
          blurb: "Birisi senin sessiz nezaketini (ve tarzını) takdir edecek.",
          type: "Klasik",
          personality: "Gözlemci",
          ability: "Eyeliner Bakışı",
          fact: "Gözlerinin etrafındaki eyeliner'ı andıran belirgin, kalın siyah bir halka hariç tamamen kar beyazıdırlar.",
        },
        miniLop: {
          name: "Mini Lop",
          blurb: "Beklenmedik atıştırmalıklar bugün yolunu bulup sana gelebilir.",
          type: "Yoldaş",
          personality: "Sarılgan",
          ability: "Basketbol Yuvarlanması",
          fact: "Vücutları yetiştiriciler tarafından 'kafası olan bir basketbol topuna' benzetilir.",
        },
        jerseyWooly: {
          name: "Jersey Wooly",
          blurb: "Küçük bir anlaşmazlığın barışçıl bir şekilde çözülmesi geleceğinde var.",
          type: "İlahi",
          personality: "Kupa Boyutunda",
          ability: "Tekmesiz Bölge",
          fact: "Başlangıçta az bakım gerektiren bir yün tavşanı olmak üzere yetiştirilmişlerdir, uysallıkları nedeniyle 'tekme atmayan tavşan' olarak ünlenmişlerdir.",
        },
        americanFuzzyLop: {
          name: "American Fuzzy Lop",
          blurb: "Sosyal enerjin bugün buna ihtiyacı olan birine gülümseme getirecek.",
          type: "Yoldaş",
          personality: "Sosyal",
          ability: "Yün Battaniye",
          fact: "Soylarındaki çekinik bir yün geni nedeniyle, yün bir kazak giymiş Holland Lop'a benzerler.",
        },
        checkeredGiant: {
          name: "Checkered Giant (Damalı Dev)",
          blurb: "Bugün görevlerini etkileyici bir hızla kolayca bitireceksin.",
          type: "Süratli",
          personality: "Aktif",
          ability: "Yarış Çizgileri",
          fact: "Burunlarındaki belirgin kelebek şeklindeki işaretle tanınan, maksimum ağırlık sınırı olmadan kabul edilen birkaç cinsten biridir.",
        },
        havana: {
          name: "Havana",
          blurb: "Bazen arka plana karışmak en çok şeyi görmeni sağlar.",
          type: "Nadir",
          personality: "Pürüzsüz",
          ability: "Gölge Kamuflajı",
          fact: "Adlarını, Havana purolarının rengine benzediği söylenen zengin, çikolata rengi kürklerinden alırlar.",
        },
        tan: {
          name: "Tan (Taba Tavşanı)",
          blurb: "Keskin içgüdülerin seni akıllıca bir çözüme yönlendirecek.",
          type: "Süratli",
          personality: "Tetik",
          ability: "Doberman Duruşu",
          fact: "Kemerli sırtları, çarpıcı siyah-taba renkleri ve yüksek zekaları nedeniyle genellikle 'tavşanların Doberman'ı' olarak adlandırılırlar.",
        },
      },
    },
    outdoors: {
      label: "Bölüm 03 — Dışarıda zaman",
      heading: "Ve yapabildiğimde, dışarıdayım.",
      body: "Uzun yürüyüşler, küçük tepeler, soğuk nehirler, iki elle tutulan sıcak kahve. Bunlar beni sıfırlar.",
      spreadOne: {
        titleLine1: "DIŞARISI",
        titleMid: "Benim",
        titleLine2: "Bulunduğum",
        titleHighlight: "yerdir.",
        titleLine3: " ",
        body: "Zamanımın çoğunu dışarıda geçiririm. İnsanlar, mekanlar ve günlük hayatın küçük anlarıyla çevrili olmanın zihnimi aktif tutan bir yanı var. Dizüstü bilgisayarım genellikle bir kafe masasında veya bir kütüphanede son bulur, kulaklıklarım da benimle gelir. İlham, aynı dört duvara bakmadığımda bir şekilde daha iyi akıyor. Aslında bu paragrafı şu an bir kafedeyken yazıyorum. İster çalışıyor olayım, ister sadece dolanayım, ister hiçbir şey yapmıyor olayım, zamanımı dışarıda geçirmeyi çok seviyorum.",
        altHopscotch: "Parkta güneşli bir gün",
        altHorizontalShip: "Rüzgarda savrulan çimenler",
      },
      spreadTwo: {
        altPanorama: "Güneşli plaj manzarası",
        quote: "Gelgitin hiç acelesi yok gibi.",
        body: "Sahilde her zaman fark ettiğim bir şey, dalgaların kumdaki ayak izlerini silme şeklidir. Her iz, kısa bir süre önce orada olan birine aitti; yürüyen, gülen, düşünen, kendi küçük hikayesini yaşayan birine. Sonra her zaman olduğu gibi gelgit içeri girer ve yeni ayak izleri gelmeden önce sahili yine dokunulmamış bir şekilde bırakır.",
        altTerraGate: "Kumu yıkayan su",
        altBuddhaBeach: "Deniz kenarındaki kayalar",
      },
      spreadThree: {
        heading: "Yürüyüş.",
        subheading: "Aklımda bir varış noktası yok. Sadece yol boyunca küçük anları topluyorum.",
        altCurrency: "Yeşil yaprakların arasından parlayan güneş ışığı",
        altGoose: "Dokulu bir duvardaki gölgeler",
        altFireworks: "Sessiz bir sokak",
      },
      spreadFour: {
        altCoffeeHill: "Dağ ormanındaki ağaçlar",
        note: "İrtifa değişimi.",
        body: "Arabayla tepelere çıkmak kafamı diğer her şeyden daha hızlı temizler. Havadaki sıcaklık birkaç derece düşer, şehir gürültüsü kaybolur ve devasa, kesintisiz bir manzara elde edersiniz. Oturup saatlerce hiçbir şey yapmamak için mükemmel bir yer.",
        altHillTop: "Kıvrımlı yola yukarıdan bakış",
        altHillSea: "Dağ manzarası",
      },
      spreadFive: {
        heading: "Önce Kahve.",
        body: "Kahvecilerde çok zaman geçiririm. Genellikle dizüstü bilgisayarımla ya da o hafta ne çalışıyor veya ne okuyorsam onunla. Sadece ortam gürültüsü, iyi bir ışık ve etrafımdaki havalı insanlar.",
        altRaspCafe: "Masada buzlu kahve",
        altNiuFish: "Bir kitap, kahve ve çizim malzemeleri",
        altShiba: "Bir kafe masası detayı",
        altNckh: "Bir kafe masası detayı",
      },
      spreadSix: {
        altRockCactus: "Bir parktan küçük bir detay",
        quote: "Hava içeride kalmak için çok güzeldi.",
        caption: "Yine güzel bir gün.",
        altSanrio: "Sessiz bir yolda güzel gün batımı",
      },
    },
  },
  contact: {
    eyebrow: "İletişim",
    heading: "Buralara kadar geldiğiniz için teşekkürler.",
    body: "Eğer bunlardan herhangi biri sizinle uyuşuyorsa, gelin bağlantı kuralım! İster bir pozisyon hakkında, ister iş konuşmak isteyin, isterseniz de tavşanlar hakkında sohbet etmek isteyin, gelen kutum her zaman açıktır. Bana sosyal medya hesaplarımdan herhangi biri üzerinden bir mesaj bırakın, size mutlaka geri dönüş yapacağım.",
    links: {
      email: "tn.hau1115@gmail.com",
      linkedin: "linkedin.com/in/ngọc-hậu-a98337299",
      instagram: "instagram.com/n.hau1115",
      facebook: "facebook.com/narwhal333",
      github: "github.com/dodoododo",
    },
  },countries: {
    Turkey: {
      name: "Türkiye",
      flag: "tr",
      caption: "İstanbul aynı anda iki kıtada yer alır, imparatorlukların 1.600 yıl boyunca birbirinin üzerine katmanlaştığı bir şehir.",
      cities: ["Istanbul", "Cappadocia", "Antalya", "Adana"],
      letters: {
        "Istanbul": {
          title: "Boğaz'ı Geçmek",
          body: "Çok az şehir aynı anda iki kıtada birden yer alır. İstanbul, Roma, Bizans ve Osmanlı miraslarının tam anlamıyla üst üste dizildiği, devasa ve yaşayan bir tarih kesiti gibidir. İstanbul'a olan hayranlığım sadece tarihi mekanlarından değil; büyük imparatorlukların bir zamanlar hüküm sürdüğü o topraklardaki ruhu hissetme isteğimden geliyor.",
          signature: "Yakında oradayım"
        },
        "Cappadocia": {
          title: "Peribacaları Vadisi",
          body: "Volkanik aşınmaların şekillendirdiği, başka bir gezegene aitmiş gibi duran bu manzarada gerçeküstü bir şeyler var. Beni asıl çeken sıcak hava balonları değil; hayatta kalabilmek için evlerini ve koca yeraltı şehirlerini doğrudan yumuşak kayalara oyan o medeniyet fikri.",
          signature: "Peşinden koşulacak bir hayal"
        },
        "Antalya": {
          title: "Turkuaz Kıyılar",
          body: "Çoğu insan oraya sadece plajlar için gider, ama ben Likya Yolu'nun dağları denizle nasıl birleştirdiğine hayranım. Yüzyıllardır yavaş yavaş Akdeniz'e ufalanan Roma kalıntılarını bulmak; zamanın ve doğanın eninde sonunda insanların geride bıraktığı her şeyi nasıl geri aldığını anlamanın çok mütevazı bir yolu gibi hissettiriyor.",
          signature: "Dört gözle bekliyorum"
        },
        "Adana": {
          title: "Adana Kebap sadece sıradan bir kebap değildir",
          body: "Türkiye'ye olan sevgim, binlerce mil uzaktaki birinin kendi memleketini bana öyle içten anlatmasıyla alevlendi. Yerel halkın sıcaklığına ve uzak diyarlardan gelen yabancıları bile kardeş gibi kucaklayan o kültüre hayran kaldım. Beni şu an her gününü sayarak beklediğim bu ülkeye kalıcı olarak bağlayan şey, o hiç görmediğim insanların ruhuydu. Bazen kendimi güneşin kavurduğu o şehirde, Seyhan Nehri'nin kıyısında yürürken ve bir Adana kebap yerken hayal ediyorum.",
          signature: "Gelecekteki bir yolculuk"
        }
      }
    },
    Lebanon: {
      name: "Lübnan",
      flag: "lb",
      caption: "Akdeniz kıyısında, binlerce yıllık ticaretin, çatışmaların ve kültürün inanılmaz izler bıraktığı küçük bir ülke.",
      cities: ["Beirut", "Byblos", "Baalbek", "Tripoli"],
      letters: {
        "Beirut": {
          title: "Yedi Kez Yeniden İnşa Edilen Şehir",
          body: "Yedi kez yıkılıp yeniden inşa edilen bir şehre saygı duymamak elde değil. Beyrut, Akdeniz'in kıyısında oturup, geçmişin görünür yara izleriyle o kaotik modern enerjiyi bir dengede tutuyor. İnsanların her şeye rağmen o inatçı direnciyle orada yaşamaya devam etmeleri beni büyülüyor.",
          signature: "Ziyaret etmeyi umuyorum"
        },
        "Byblos": {
          title: "Yazının Kökleri",
          body: "Alfabenin aslında nereden geldiğini hiç merak ettiniz mi? Bu liman kenti, dünyada sürekli yaşanılan en eski yerleşim yerlerinden biri ve Fenikelilerin bugün güvendiğimiz harfleri geliştirdiği yer. İnsan iletişimini tam anlamıyla şekillendiren bir kasabada yürümek fikri bana aklımı kaçırtacak kadar inanılmaz geliyor.",
          signature: "Tarihi bir hayal"
        },
        "Baalbek": {
          title: "İmkansız Ölçek",
          body: "Antik mimari denince genelde tüm ilgiyi Roma toplar, ama şimdiye kadar inşa edilmiş en devasa Roma tapınaklarından bazıları aslında burada saklı. Temellerde kullanılan taşlar yüzlerce ton ağırlığında. Bu, geçmişi ne kadar anladığımızı sorgulatan bir mühendislik gizemi.",
          signature: "Yakında bir gün"
        },
        "Tripoli": {
          title: "Yaşayan Çarşı",
          body: "Çoğu tarihi merkez özenle düzenlenmiş müzeler gibi hissettirirken, bu kuzey şehri yüzyıllar önce nasılsa öyle işlemeye devam ediyor. Eski Memlük dönemi mimarisinin etrafına şerit çekilmemiş; orası günlük hayatın, terziliğin ve ticaretin gerçekten aktığı yer. Hâlâ aktif olarak kullanılan bir tarihi deneyimleme fikrine bayılıyorum.",
          signature: "Ölmeden önce yapılacaklar listemde"
        }
      }
    },
    Nepal: {
      name: "Nepal",
      flag: "np",
      caption: "Dikey coğrafyasıyla tanımlanan, antik ruhani geleneklerin doğrudan Himalayaların gölgesinde var olduğu bir ülke.",
      cities: ["Kathmandu", "Pokhara", "Namche", "Bhaktapur"],
      letters: {
        "Kathmandu": {
          title: "Yaşayan Bir Müze",
          body: "Burada günlük hayatla antik din arasındaki sınır neredeyse yok. Eserleri cam arkasına kilitlemek yerine, yerel halk kaotik trafiğin tam ortasındaki asırlık tapınaklarda hâlâ aktif olarak ibadet ediyor. Gürültülü modern hayatla sessiz ruhani geleneğin bu sürekli kesişimi inanılmaz derecede ilginç.",
          signature: "Ruhani bir hedef"
        },
        "Pokhara": {
          title: "Zirvelerin Altında",
          body: "Başkentin o yoğunluğundan sonra, bu göl kenarı kasabası insana nihai bir psikolojik sıfırlanma (reset) gibi geliyor. Devasa, karla kaplı Himalayalar o kadar yakında duruyor ki, aşağıdaki suya kusursuzca yansıyor. Oturup zihninizi temizlemek için dünyadaki en huzurlu ortamlardan biri gibi görünüyor.",
          signature: "O günü bekliyorum"
        },
        "Namche": {
          title: "Son Karakol",
          body: "Bu köye ulaşmak için dik dağ vadilerinde günlerce yürümeniz gerekiyor. Yüksek Himalayalar'a yapılacak son tırmanıştan önce Şerpalar (Sherpa) için ana ticaret merkezi olduğu için, burası tamamen eşsiz bir sınır kasabası atmosferine sahip. Böylesine uç bir rakımda hayatta kalan izole topluluklar beni büyülüyor.",
          signature: "Yüksek irtifa hayali"
        },
        "Bhaktapur": {
          title: "Zamanı Duraklatmak",
          body: "Bu şehrin merkezine arabaların girmesi yasak, bu da bir yerin hissini tamamen değiştiriyor. Geleneksel tuğla ve oyma ahşap mimari yüzlerce yıldır korunduğu için, bu sokaklarda yürümek muhtemelen gerçek bir zaman yolculuğuna yaklaşabileceğimiz en yakın deneyimdir.",
          signature: "Zamana meydan okuyan bir dilek"
        }
      }
    },
    Spain: {
      name: "İspanya",
      flag: "es",
      caption: "Yüzyıllar süren Katolik ve Endülüs (Moorish) tarihinin son derece yoğun, sanatsal bir kültür yarattığı bir yarımada.",
      cities: ["Barcelona", "Sevilla", "Granada", "Madrid"],
      letters: {
        "Barcelona": {
          title: "Izgara ve Kıvrım",
          body: "Kusursuz, katı bir ızgara planı (grid) üzerine kurulmuş, ama düz çizgileri tamamen reddeden bir mimar tarafından tanımlanan bir şehri kafamda oturtmak zor. Gotik Mahalle'de yürümek, o ağır Ortaçağ tarihinin, Gaudí'nin sürrealist hayal gücüyle nasıl yan yana durduğunu görmek istiyorum.",
          signature: "Gelecekten bir anı"
        },
        "Sevilla": {
          title: "Katmanlı Yüzyıllar",
          body: "Güney İspanya'nın beni çok çeken derin, yoğun bir enerjisi var. Alcázar'ın Endülüs mimarisi, farklı kültürlerin yüzyıllar boyunca fiziksel olarak nasıl harmanlandığını gösteriyor. Sanat, tarih ve günlük hayatın böylesine gürültülü bir şekilde iç içe geçtiği bir yeri deneyimlemeyi merak ediyorum.",
          signature: "Gitmeyi umuyorum"
        },
        "Granada": {
          title: "Son Kale",
          body: "Burası Batı Avrupa'daki son Müslüman kalesiydi ve şehrin üzerindeki o tarihi ağırlığı hala hissedebiliyorsunuz. Elhamra benim için sadece güzel bir saray değil; dağların arasında sessizce hayatta kalan, Avrupa tarihinin tamamen farklı bir döneminin fiziksel bir hatırlatıcısı.",
          signature: "Bir Endülüs rüyası"
        },
        "Madrid": {
          title: "Kültürel Çekim Gücü",
          body: "Yarımadanın coğrafi merkezi olması bu şehre devasa, inkar edilemez bir çekim gücü veriyor. Beni en çok çeken şey, barındırdığı sanatın devasa hacmi. Velázquez'in eserlerinin önünde şahsen durmak, Avrupa tarihini takdir eden herkes için zorunlu bir hac ziyareti gibi geliyor.",
          signature: "Seyahat programımda"
        }
      }
    },
    Morocco: {
      name: "Fas",
      flag: "ma",
      caption: "İnanılmaz derecede farklı kentsel ortamlara sahip Afrika, Arap ve Berberi kültürlerinin bir kavşağı.",
      cities: ["Marrakech", "Chefchaouen", "Fez", "Essaouira"],
      letters: {
        "Marrakech": {
          title: "Kaos ve Sessizlik",
          body: "Burada dikkatimi çeken şey zıtlıklardır. Medine (Eski Şehir), ezici derecede kaotik ve gürültülü bir labirent olmasıyla ünlüdür; ancak geleneksel riyadlar tamamen sessiz, içe dönük sığınaklar olarak tasarlanmıştır. Bu iki aşırı ucun nasıl yan yana var olabildiğini gerçekten deneyimlemek istiyorum.",
          signature: "Gelecekteki bir macera"
        },
        "Chefchaouen": {
          title: "Bir Renkten Fazlası",
          body: "O mavi duvarlara bakıp sadece güzel bir fotoğraf karesi görmek kolaydır, ama beni asıl içine çeken şey tarihidir. İzole bir dağ karakolunu, İspanya'dan kaçan Yahudi ve Endülüslü mültecilerin güzel, kalıcı bir sığınağa dönüştürerek şekillendirmiş olması büyüleyici.",
          signature: "Hayal dünyasında kaybolmuş"
        },
        "Fez": {
          title: "Ortaçağ Labirenti",
          body: "Burası gezegen üzerindeki araç trafiğine kapalı en büyük kentsel alanlardan biridir. Modern altyapının temelde işlemediği, binlerce ara sokaktan oluşan bu Ortaçağ labirentinde yolumu bulma fikri bana çok cazip geliyor. Önemli bir şehrin yüzyıllar önce olduğu gibi işlemeye devam ettiğini görmek için nadir bir şans gibi hissettiriyor.",
          signature: "Keşfedilecek bir hedef"
        },
        "Essaouira": {
          title: "Telesiz Liman",
          body: "Yoğun çöl şehirlerinin aksine, bu sahil kalesinin çok daha yavaş, sanatsal bir ritme sahip olduğu bilinir. Avrupa ve Kuzey Afrika mimarisinin çarpıştığı önemli bir ticaret merkezi olmuş, tarihsel olarak ağır ama hiç acelesi olmayan, rahat bir liman kasabası yaratmış.",
          signature: "Ziyareti bekliyor"
        }
      }
    },
    China: {
      name: "Çin",
      flag: "cn",
      caption: "Kavraması zor bir ölçek, devasa bir antik temel üzerinde dururken geleceğe doğru koşan bir ülke.",
      cities: ["Beijing", "Shanghai", "Chengdu", "Lijiang"],
      letters: {
        "Beijing": {
          title: "İmparatorluk Ağırlığı",
          body: "Buradaki mimarinin içine işlemiş gücün boyutlarını kavramak zordur. Yasak Şehir, sizi inanılmaz derecede küçük hissettirecek şekilde tasarlanmıştır. O devasa imparatorluk yapılarının, sıradan insanların nesillerdir yaşadığı daracık hutongların (eski sokaklar) hemen yanında durması beni büyülüyor.",
          signature: "Tarihi bir yolculuk"
        },
        "Shanghai": {
          title: "Zamanın Sınırları",
          body: "Geçmişle hiper-gelecek arasındaki sürtüşmeyi başka hiçbir yer burası kadar net gösteremez. Nehrin bir tarafında ağır, Avrupa tarzı kolonyal banka binaları varken, diğer tarafta doğrudan bir bilimkurgu filmi siluetine bakıyorsunuz. Sanki iki farklı yüzyılın sınırında durmak gibi.",
          signature: "Işıklar şehri"
        },
        "Chengdu": {
          title: "Hızı Korumak",
          body: "Devasa, hızla büyüyen bir teknoloji merkezi olmasına rağmen, bu şehir o rahat çay evi kültürünü şiddetle korumasıyla ünlüdür. Ülkenin geri kalanı geleceğe doğru koşarken, o yavaş, bilinçli yaşam temposundan taviz vermeyi reddeden bir yere saygı duyuyorum.",
          signature: "Baharatlı ve rahat"
        },
        "Lijiang": {
          title: "Kar Sularıyla Şekillenmiş",
          body: "Yerli Naxi halkı, geleneksel bir şehir duvarı örmek yerine, dağların kar sularıyla beslenen dahiyane bir taş kanal ağına güvenerek bu kasabayı inşa etmiştir. Yüzlerce yıllık değişimi atlatarak Himalayalar'ın eteklerinde hayatta kalan, tamamen coğrafyası ve su tarafından şekillendirilmiş bir yer fikrine bayılıyorum.",
          signature: "Huzurlu bir dilek"
        }
      }
    },
    Georgia: {
      name: "Gürcistan",
      flag: "ge",
      caption: "Kafkas dağlarına sıkışmış, benzersiz bir alfabeye ve kadim geleneklere tutunan engebeli bir ulus.",
      cities: ["Tbilisi", "Kazbegi", "Mestia", "Batumi"],
      letters: {
        "Tbilisi": {
          title: "Tarihi Kesişim",
          body: "Hem coğrafi hem de kültürel olarak, bu şehir her zaman imparatorlukların tam arasına sıkışmıştır. Oyma ahşap balkonların, Sovyet brütalizminin ve antik kiliselerin birbirine karıştığı mimaride bunu görebilirsiniz. Tamamen farklı dünyaları bir araya getirmek zorunda kalmış yerler beni her zaman çeker.",
          signature: "Kafkasların kalbi"
        },
        "Kazbegi": {
          title: "Taşta Bir İfade",
          body: "Devasa Kafkas dağlarıyla çevrili dik bir zirveye, tek başına küçük, taştan bir kilise yerleştirmek öylesine cesur bir yalnızlık ifadesidir ki... Bu, ulaşılacak bir destinasyondan çok, orada olmayı ne kadar çok istediğinizi kanıtlamak için fiziksel bir test gibi görünüyor.",
          signature: "Dağlardan bir rüya"
        },
        "Mestia": {
          title: "Kulelerin Vadisi",
          body: "Yüzyıllar boyunca Svan halkı o kadar derin dağlık bir izolasyonda yaşamış ki, esasen her aile savunma için kendi taştan gözetleme kulesini inşa etmek zorunda kalmıştır. Dünyanın geri kalanından tamamen kopuk, kendine has bir dil ve hayatta kalma kültürü geliştirmiş bir bölgeyi keşfetmek kulağa inanılmaz geliyor.",
          signature: "Vadilerin yükseklerinde"
        },
        "Batumi": {
          title: "Kıyıdaki Çelişki",
          body: "Eski Sovyet bloklarının hemen yanında garip, fütüristik gökdelenlerin yer aldığı Karadeniz'deki eksantrik bir tatil beldesi olarak tuhaf bir ünü var. Asıl merak ettiğim şey, böylesine çelişkili, deneysel bir kıyı kentinin gerçek hayatta nasıl işlediğini görmek.",
          signature: "Kıyıya dair merak"
        }
      }
    },
    Greece: {
      name: "Yunanistan",
      flag: "gr",
      caption: "Uçurumlardan inen beyaz küpler, Ege'nin zeytin rengi ışığı ve altında yatan 3.000 yıllık felsefe.",
      cities: ["Athens", "Santorini", "Crete", "Meteora"],
      letters: {
        "Athens": {
          title: "Mermer ve Grafiti",
          body: "Plaka bölgesinde yürümek ve ayaklarımın altındaki o aşınmış mermer döşeme taşlarını hissetmek istiyorum. Akropolis'in dağınık, kaotik bir modern şehrin üzerinde nasıl parladığını görmek bizzat şahit olmam gereken bir şey.",
          signature: "Parthenon'un altında"
        },
        "Santorini": {
          title: "Kalderanın Kenarı",
          body: "Kulağa klişe gelebilir ama Ege Denizi'nin rengiyle birebir aynı olan o mavi kubbeleri görmek bir rüya. Volkanik kayalıkların üzerinde durup o dünyaca ünlü gün batımını izlemek istiyorum.",
          signature: "Bir Ege rüyası"
        },
        "Crete": {
          title: "Vahşi Ada",
          body: "Knossos'un antik kalıntıları arasında dolaşmak ve o Minos labirentini hayal etmeye çalışmak istiyorum. Sarp geçitler, uçsuz bucaksız zeytinlikler ve derin bir tarih birleşimi beni içine çekiyor.",
          signature: "Keşfedilmeyi bekleyen efsane"
        },
        "Meteora": {
          title: "Havada Asılı",
          body: "Devasa kumtaşı sütunlarının tepesine imkansız bir şekilde tünemiş manastırlar fikri tam bir fantastik hikaye gibi hissettiriyor. Sabah sisi kayaların etrafını sararken, taşlara oyulmuş o merdivenleri tırmanmak istiyorum.",
          signature: "Gökyüzüne dokunmak"
        }
      }
    },
    Norway: {
      name: "Norveç",
      flag: "no",
      caption: "Modern tasarımın zorlu coğrafyaya sessizce saygı duyduğu, su ve buzla tanımlanan engebeli bir manzara.",
      cities: ["Oslo", "Bergen", "Lofoten", "Tromsø"],
      letters: {
        "Oslo": {
          title: "Ormanla Birlikte İnşa Etmek",
          body: "Çoğu başkent doğal çevresinin üzerini betonla kaplarken, Oslo sanki doğrudan ormanın ve suyun içine inşa edilmiş gibi duruyor. Bir geliştirici olarak, modern ve fonksiyonel tasarımın doğaya hükmetmeye çalışmak yerine onu nasıl tamamladığını gerçekten takdir ediyorum.",
          signature: "İskandinav hedefi"
        },
        "Bergen": {
          title: "Yağmuru Kucaklamak",
          body: "Burada yılda iki yüz günden fazla yağmur yağar, ancak yine de Avrupa'nın en güzel şehirlerinden biri olarak kabul edilir. Sert hava koşullarından saklanmaya çalışmak yerine onu tamamen benimseyen bir sahil kasabasında inanılmaz derecede huzur veren bir şey var.",
          signature: "Yedi dağın arasında"
        },
        "Lofoten": {
          title: "Pürüzlü Kenar",
          body: "Coğrafi olarak, bu takımadalar pek bir anlam ifade etmiyor. Devasa, sivri dağlar dondurucu okyanusun içinden dümdüz yükseliyor ve geriye kalan küçücük düz kayalıklara balıkçı köyleri sıkışmış durumda. Yaşanabilir dünyanın mutlak ucu gibi görünüyor, ki tam da bu yüzden onu görmem gerek.",
          signature: "Kuzey Kutup Dairesi'nin üzerinde"
        },
        "Tromsø": {
          title: "Karanlıkta Yaşamak",
          body: "Kuzeyde bu kadar uzağa gitmek zamanı ve ışığı deneyimleme şeklinizi temelden değiştirir. Yılın önemli bir bölümünü kutup karanlığında geçirerek, gökyüzünün aurorayla alev almasını bekleyen bir topluluğun psikolojisi beni büyülüyor.",
          signature: "Auroranın altında"
        }
      }
    },
    Iran: {
      name: "İran",
      flag: "ir",
      caption: "Mimarinin görsel bir matematik gibi hissettirdiği devasa, antik bir medeniyet.",
      cities: ["Isfahan", "Tehran", "Shiraz", "Yazd"],
      letters: {
        "Isfahan": {
          title: "Görsel Matematik",
          body: "Buradaki mimari temel olarak görsel bir matematiktir. Ana meydanlardaki çinili tavanların fotoğraflarına baktım; geometrik hassasiyet o kadar karmaşık ki neredeyse dijital görünüyor. Onları gerçekten insan ellerinin yapıp yapmadığını anlamak için o kubbelerin içinde durmam gerekiyor.",
          signature: "Tarihin büyüsünde"
        },
        "Tehran": {
          title: "Dağ Metropolü",
          body: "Beni burada büyüleyen şeyin boyutu. Kar kaplı dağların eteklerinde milyonlarca insanın yaşadığı bu devasa, sıkışık, yoğun ambargolar altındaki metropol, doğrudan oraya oturmuş. Sadece yerinde deneyimleyerek anlayabileceğiniz, ağır çelişkilerle dolu bir şehir gibi hissettiriyor.",
          signature: "Gelecekteki bir keşif"
        },
        "Shiraz": {
          title: "Kelimelere Saygı",
          body: "Klasik şairlerin modern rock starları gibi muamele gördüğü bir kültür bulmak inanılmaz derecede nadirdir. İnsanların sadece mısra okumak için yüzyıllar önce ölmüş yazarların mezarlarında toplanmaya devam etmesi fikri beni çok çekiyor. Bu, sanata ve dile duyulan derin bir toplumsal saygıyı gösteriyor.",
          signature: "Bahçelerde"
        },
        "Yazd": {
          title: "Antik Mühendislik",
          body: "Klimanın icadından çok önce, buradaki insanlar serin rüzgarları kerpiç binaların içine çekmek için devasa rüzgar yakalayıcıları tasarlamışlar. Sistemlerin nasıl çalıştığıyla ilgilenen biri olarak, binlerce yıl önce sürdürülebilir iklim kontrolünü çözmüş bir çöl şehrini görmek bana inanılmaz derecede havalı geliyor.",
          signature: "Kumların arasındaki vaha"
        }
      }
    },
    India: {
      name: "Hindistan",
      flag: "in",
      caption: "Birden fazla farklı yüzyılın aynı anda yaşandığı hissiyatını veren bir duyusal aşırı yüklenme (sensory overload).",
      cities: ["Delhi", "Varanasi", "Jaipur", "Kochi"],
      letters: {
        "Delhi": {
          title: "Yedi Katmanlı Şehir",
          body: "Buranın aslında birbirinin tam üzerine inşa edilmiş yedi farklı tarihi şehirden oluştuğunu söylerler. Hiper-modern bir metro istasyonundan çıkıp anında yüzyıllık bir Babür türbesine takılabileceğiniz o yoğun, kaotik tarihe doğru çekiliyorum.",
          signature: "Gürültünün ortasında"
        },
        "Varanasi": {
          title: "Dürüst Nehir",
          body: "Dünyada ölümlülük kavramını bu şehir kadar açıkça ele alan yer çok azdır. İnsanların nehre gelip yıkanması, dua etmesi ve ölülerini yakmasının aynı mekanda gerçekleşmesindeki ruhani yoğunluk çok bunaltıcı gelebilir. Ama bu, bakış açınızı değiştirmeye zorlayan türden bir kültür şokudur.",
          signature: "Kutsal nehrin kıyısında"
        },
        "Jaipur": {
          title: "Tasarım ve Misafirperverlik",
          body: "Şehrin tüm merkezi 1800'lerde sadece yabancı bir kralı karşılamak için pembeye boyanmış ve sonrasında da öyle bırakılmış. Sırf rüzgarı yönlendirmek için tasarlanmış o karmaşık cepheleri ve estetik ile misafirperverliğin şehrin kimliğine bu kadar derinden kazınmış olmasını çok seviyorum.",
          signature: "Rajasthan günlükleri"
        },
        "Kochi": {
          title: "Sessiz Kavşak",
          body: "Antik baharat ticareti yüzünden, bu güney sahili tamamen farklı dünyalar için bir mıknatıs haline gelmiş. Aynı tropikal mahallede Portekiz kiliseleri, Çin balık ağları ve bir Yahudi sinagogu bulabilirsiniz. Küresel tarihin büyüleyici, sessiz bir kavşağı.",
          signature: "Güney rüzgarı"
        }
      }
    },
    Malaysia: {
      name: "Malezya",
      flag: "my",
      caption: "Yoğun ormanın gökdelenleri sürekli yutmakla tehdit ettiği, kültürlerin harmanlandığı bir ustalık sınıfı.",
      cities: ["Kuala Lumpur", "Penang", "Malacca", "Kota Kinabalu"],
      letters: {
        "Kuala Lumpur": {
          title: "Hızlı Yükseliş",
          body: "Bu şehir, çamurlu bir kalay madeni kasabasından, göz açıp kapayıncaya kadar fütüristik bir ufuk çizgisine dönüştü. Gelişim hızı sarsıcı, ancak yine de o devasa kulelerin hemen altında derin orman cepleri ve eski kolonyal mimariyi koruyor.",
          signature: "Kentsel ormanda"
        },
        "Penang": {
          title: "Yemek Üzerinden Tarih",
          body: "Göçün kültürü nasıl şekillendirdiğini anlamak istiyorsanız yemeğe bakın. Burada Malay, Çin ve Hint etkileri çürümekte olan bir kolonyal liman kasabasında nesillerdir birbirine karışıyor. Sadece bu denli derin bir kültürel harmanın tadının gerçekten neye benzediğini deneyimlemek için oraya giderdim.",
          signature: "Mutfak hacılığı"
        },
        "Malacca": {
          title: "Deniz Geçidi",
          body: "Yüzyıllar boyunca bu dar boğazı kim kontrol ediyorsa, küresel ticareti de temel olarak o kontrol ediyordu. Kasabada yürümek, bu küçücük ama stratejik toprak parçasını elde tutmak için savaşan Portekiz, Hollanda ve İngiliz imparatorluklarının geride bıraktığı mimari yara izlerini görmek anlamına geliyor.",
          signature: "Boğaz kıyısında"
        },
        "Kota Kinabalu": {
          title: "Kentsel Vahşilik",
          body: "Etrafındaki ormanı sadece tolere ediyormuş gibi hissettiren modern bir şehir bulmak nadirdir. Hareketli bir kent merkezinde durup aynı zamanda arka planda Güneydoğu Asya'nın en yüksek zirvelerinden birinin belirdiğini görebilmeniz, bu yere çok vahşi bir hava katıyor.",
          signature: "Ada zamanı"
        }
      }
    },
    Japan: {
      name: "Japonya",
      flag: "jp",
      caption: "Derin tarihi koruma ile amansız teknolojik ivmenin buluştuğu nihai nokta.",
      cities: ["Kyoto", "Tokyo", "Kanazawa", "Osaka"],
      letters: {
        "Kyoto": {
          title: "Dil Hedefi",
          body: "Vietnam ile Japonya arasında teknoloji köprüsü kuracak bir kariyer hedefleyerek yıllarımı Japonca çalışmaya harcadım. Sonunda yüzyıllar süren savaşlardan sağ kurtulan o korunmuş eski başkenti yürüyerek geçmek, tabelaları okuyabilmek ve yerel halkla doğal bir şekilde konuşabilmek, benim için devasa bir kişisel hedefin gerçekleşmesi olacak.",
          signature: "Gerçekleşecek bir rüya"
        },
        "Tokyo": {
          title: "Mühendislik Mucizesi",
          body: "Bir yazılım geliştirici olarak bu şehir, kusursuz çalışan karmaşık sistemlerin zirvesini temsil ediyor. Altyapı çökmeden günde otuz milyon insanı taşımak bir mucizedir. Nihayetinde orada çalışmaya başlamadan önce, bu amansız ivmeyi bizzat deneyimlemek istiyorum.",
          signature: "Hedeflerimden biri"
        },
        "Kanazawa": {
          title: "Dokunulmamış Çağ",
          body: "Savaştaki bombalamalardan büyük ölçüde kurtulduğu için, burası samuray ve geyşa bölgelerinin tamamen bozulmadan kaldığı nadir yerlerden biri. Ben büyük bir tarih meraklısıyım, bu yüzden Edo döneminden beri düzeni değişmemiş sokaklarda yürüme fikri bana inanılmaz derecede çekici geliyor.",
          signature: "Eski sokaklardan"
        },
        "Osaka": {
          title: "Gürültücü Kardeş",
          body: "Okuduğum her şey, buradaki kültürün Tokyo'nun kibar çekingenliğinin tam tersi olduğunu söylüyor. Gürültülü, yemeğe takıntılı ve şiddetle bağımsız bir yer. Yabancıların genellikle tamamen tekdüze olduğunu varsaydığı bir ülkede, bu keskin bölgesel kişilik zıtlığını deneyimlemeyi gerçekten çok merak ediyorum.",
          signature: "Kuidaore (Düşene kadar ye)"
        }
      }
    },
    Mexico: {
      name: "Meksika",
      flag: "mx",
      caption: "Ormanlar ve batan göller üzerine inşa edilmiş, yerli köklerle sömürge tarihinin canlı bir çarpışması.",
      cities: ["Mexico City", "Oaxaca", "Mérida", "Tulum"],
      letters: {
        "Mexico City": {
          title: "Batan Megalopol",
          body: "İspanyollar burayı inşa etmek için, devasa bir gölün ortasında yer alan Aztek ada başkentinin kelimenin tam anlamıyla üzerini kaplamış. Bu nedenle, tüm metropol yavaş yavaş batıyor. Bu kadar tarihi ve coğrafi bagajı olan bir şehrin nasıl kültürel anlamda bu kadar baskın kalabildiği beni büyülüyor.",
          signature: "CDMX'ten çağrı"
        },
        "Oaxaca": {
          title: "Kültürel Çıpa",
          body: "Güney Meksika ülkenin kültürel çıpası gibi hissettiriyor. Buradaki yerli gelenekleri silinmemiş; evrilerek sanatı ve inanılmaz derecede karmaşık yemek sistemlerini derinden etkilemişler. Sadece insanların ne pişirdiğine dikkat ederek bile çok şey öğrenebileceğiniz bir yer gibi hissettiriyor.",
          signature: "Güneyin kalbi"
        },
        "Mérida": {
          title: "Kireçtaşı Üzerindeki Medeniyet",
          body: "Yucatán'ın coğrafyası tamamen gözenekli kireçtaşından oluşur, yani nehirler yoktur; sadece tatlı su tutan binlerce yeraltı düdeni (cenote) vardır. Mayalar uygarlıklarını bunların etrafına inşa etmişler. Tarihin ve insanların bu tuhaf, kırılgan jeolojiye ne kadar tamamen bağımlı oldukları beni çekiyor.",
          signature: "Yucatán sıcağı"
        },
        "Tulum": {
          title: "Uçurumdaki Kale",
          body: "Çoğu antik harabe ormanların veya dağların derinliklerine gömülüdür, ancak Mayalar Karayip Denizi'ne bakan bir uçurumun tam kenarına devasa bir taş kale inşa etmiştir. Güçlü bir antik ticaret merkezinin cennete yerleştirildiğinde aslında nasıl göründüğünü merak ediyorum.",
          signature: "Karayiplerin kıyısında"
        }
      }
    },
    Colombia: {
      name: "Kolombiya",
      flag: "co",
      caption: "And dağlarının aniden Karayipler'e düştüğü, aşırı topografik değişimlerin yaşandığı bir ülke.",
      cities: ["Bogotá", "Medellín", "Cartagena", "Salento"],
      letters: {
        "Bogotá": {
          title: "8.000 Fitte Yaşam",
          body: "And Dağları'nda sekiz bin fitin üzerinde oturan bu başkent, çoğu kayak merkezinden daha yüksekte. Yoğun, modern kentsel tuğla binaları o dondurucu, ince dağ havasıyla harmanlayan tüm bir toplumun o aşırı rakımda nasıl işlediğini gerçekten merak ediyorum.",
          signature: "And dağlarının yükseklerinde"
        },
        "Medellín": {
          title: "Sivil Geri Dönüş",
          body: "Otuz yıl önce burası gezegendeki en tehlikeli şehirlerden biri olarak kabul ediliyordu. Bugün ise en yoksul dağ mahallelerini merkeze bağlamak için yenilikçi toplu taşıma araçlarını kullandığı için kutlanıyor. Problem çözmeyi takdir eden biri olarak, bu tür bir sivil dönüşüm inanılmaz derecede ilham verici.",
          signature: "Vadi manzaraları"
        },
        "Cartagena": {
          title: "İmparatorluk Kasası",
          body: "Burası İspanyolların yağmaladıkları altınları Avrupa'ya geri göndermeden önce istifledikleri birincil limandı. Korsanları savuşturmak için inşa edilen devasa taş duvarlar hâlâ ayakta. Esasen aşılmaz bir banka kasası olarak tasarlanmış bir Karayip şehrini keşfetme fikrine bayılıyorum.",
          signature: "Karayip sihri"
        },
        "Salento": {
          title: "Dev Palmiyeler",
          body: "Buradaki manzara insanın ölçek duyusuyla oynuyor. Burası, sisin içine doğru neredeyse iki yüz fit uzanan, dünyanın en uzun palmiye ağaçlarıyla dolu bir yüksek irtifa bulut ormanı. Doğadaki bir hata (glitch) gibi görünüyor, ki bu da benim o ormanda yürüyüş yapmayı daha çok istememe sebep oluyor.",
          signature: "Sıcak bir kahve eşliğinde"
        }
      }
    },
    Egypt: {
      name: "Mısır",
      flag: "eg",
      caption: "Tamamen çöle oyulmuş, yaşamı tamamen Nil'in nabzına bağlı olan anıtsal bir medeniyet.",
      cities: ["Cairo", "Luxor", "Alexandria", "Aswan"],
      letters: {
        "Cairo": {
          title: "Antik Çağa Baskı Yapan Şehir",
          body: "Aklımı başımdan alan şey, Piramitlerin uzak bir çölün ortasında olmaması; yirmi milyonluk bir metropolün kentsel yayılmasının tam ayaklarına kadar ulaşması. Kaotik, modern dünyanın eski mezarlara doğrudan baskı yaptığı o sürtüşme tam olarak görmek istediğim şey.",
          signature: "Çöle kapılmış"
        },
        "Luxor": {
          title: "Açık Hava Müzesi",
          body: "Dünyadaki antik anıtların yaklaşık üçte biri nehrin bu tek kıvrımının etrafında toplanmıştır. Temelde bir şehir büyüklüğünde bir açık hava müzesi. Binlerce yıldır ayakta duran devasa sütunların yanından öylece yürüyüp geçebileceğiniz fikri, insanın aklının alması çok zor bir durum.",
          signature: "Geçmişin büyüsünde"
        },
        "Alexandria": {
          title: "Kayıp Beyin",
          body: "Burası bir zamanlar İskenderiye Kütüphanesi'ne ev sahipliği yapan antik dünyanın entelektüel merkeziydi. Eski anıtlar artık yok olmuş olsa da, yüzyıllar boyunca insan medeniyetinin beyni olarak hizmet etmiş bir yerin o Akdeniz atmosferine doğru çekiliyorum.",
          signature: "Tarihi bir dilek"
        },
        "Aswan": {
          title: "Keskin Sınır",
          body: "Burada her şeyi coğrafya dikte eder. Nil'in kıyısında durup gür, yeşil bitki örtüsünün aniden durduğu ve acımasız, sonsuz Sahra çölünün başladığı o kesin çizgiyi görebilirsiniz. Yaşamın mümkün olduğu o keskin fiziksel sınırı deneyimlemek istiyorum.",
          signature: "Nehri bekliyorum"
        }
      }
    },
    Russia: {
      name: "Rusya",
      flag: "ru",
      caption: "Gücünü yansıtmak için saf fiziksel boyutu ve acımasız kışları kullanan geniş, gizemli bir toprak.",
      cities: ["Moscow", "Saint Petersburg", "Dagestan", "Vladivostok"],
      letters: {
        "Moscow": {
          title: "Devletin Ağırlığı",
          body: "Buradaki mimari size devletin ağırlığını hissettirmek için tasarlanmıştır. Metro istasyonları bile yeraltı saraylarına benzeyecek şekilde inşa edilmiştir. Altyapısını ve fiziksel boyutunu, gücü ve tarihi bu kadar agresif bir şekilde yansıtmak için kullanan yerler beni büyülüyor.",
          signature: "Bir kış rüyası"
        },
        "Saint Petersburg": {
          title: "Zorla Kurulan Başkent",
          body: "Büyük Petro, sadece kendini kanıtlamak için dondurucu, yaşanmaz bir bataklıktan zorla Avrupa tarzı bir başkent çıkardı. Çok planlı olduğu için şehrin rahatsız edici, doğal olmayan bir simetrisi var, özellikle de yazın güneşin tam olarak batmadığı o gecelerde.",
          signature: "Sanata çekiliyor"
        },
        "Dagestan": {
          title: "Gizli Çeşitlilik",
          body: "Çoğu insan Kafkas dağlarının çok küçük bir alanda düzinelerce farklı etnik grubu ve dili sakladığının farkında değil. Bu sarp köylerin izolasyonu, tipik turist rotalarından çok uzakta, doğrudan öğrenmek isteyeceğim o eski yaşam biçimlerini korumayı başarmış.",
          signature: "Dağların içine"
        },
        "Vladivostok": {
          title: "Kıtanın Ucu",
          body: "Moskova'dan sadece buraya gelmek trenle yedi gün sürüyor. Asya'nın en uç noktasına tünemiş, Pasifik Okyanusu'na bakan devasa bir Avrupa tarzı donanma şehri fikri, inanılmaz derecede merak uyandıran bir coğrafi anomali.",
          signature: "Yolculuğun sonu"
        }
      }
    },
    Czechia: {
      name: "Çekya",
      flag: "cz",
      caption: "Yüzyıllarca süren çatışmalardan bir şekilde sağ çıkmış, Avrupa'nın kalbindeki yoğun bir mimari arşiv.",
      cities: ["Prague", "Český Krumlov", "Mariánské Lázně", "Brno"],
      letters: {
        "Prague": {
          title: "Kırılmamış Zaman Çizelgesi",
          body: "Pek çok Avrupa başkentinin aksine, bu şehir dünya savaşlarını büyük ölçüde hasarsız atlattı. Etrafta yürümek, Gotik, Rönesans ve Barok mimarisinin gerçek, kırılmamış bir zaman çizelgesini fiilen görmek anlamına geliyor. Temelde, ne bombalanmış ne de yeniden inşa edilmiş devasa bir mimari arşiv burası.",
          signature: "Bir Bohem rüyası"
        },
        "Český Krumlov": {
          title: "İhmal Edilerek Korunmuş",
          body: "Soğuk Savaş sırasında görmezden gelindiği ve büyük ölçüde unutulduğu için, bu kasaba kazara Ortaçağ düzenini kusursuz bir şekilde korudu. Modern gelişim tarafından tamamen ihmal edilmenin, eninde sonunda bir yerin en büyük tarihi varlığı haline gelebilmesi çok büyüleyici.",
          signature: "Bir masalda kaybolmuş"
        },
        "Mariánské Lázně": {
          title: "Aristokrat İnzivası",
          body: "Avrupa elitlerinin sırf maden suyu içmek için uzak orman vadilerine seyahat ettiği o tuhaf, lüks 19. yüzyıl kültürü ilgimi çekiyor. Kasaba, temelde tarihi zindeliğin (wellness) ve eski aristokratik mola verme yönteminin mükemmel bir şekilde korunmuş bir anıtı.",
          signature: "Huzur arayışı"
        },
        "Brno": {
          title: "Masallardan Ziyade Fonksiyon",
          body: "Başkent bir peri masalı gibi görünmesiyle tüm ilgiyi toplarken, bu şehir ham modernist mimarisi ve devasa yeraltı tünel sistemleriyle ünlüdür. Ben her zaman, kalabalıklara hitap etmekten ziyade işleve öncelik veren, içinde gerçekten yaşanıyormuş gibi hissettiren o ikincil şehirleri ziyaret etmeyi tercih ederim.",
          signature: "Bilinen yolların dışında"
        }
      }
    }
  }
};
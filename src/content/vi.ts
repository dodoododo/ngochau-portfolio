// Draft Vietnamese translations — flagged for native-speaker review before launch.
import type { en as EnDict } from "./en";
type Dict = typeof EnDict;

export const vi: Dict = {
  meta: {
    name: "Tăng Ngọc Hậu",
    wordmark: "NgocHau",
    location: "Đà Nẵng, Việt Nam",
    role: "Aspiring Fullstack Developer",
    availability: "Sẵn sàng cho các dự án mới",
  },
  nav: {
    introduction: "Giới thiệu",
    projects: "Dự án",
    skills: "Kỹ năng",
    achievements: "Thành tựu",
    personal: "Cá nhân",
    contact: "Liên hệ",
  },
  intro: {
    kicker: "Aspiring Fullstack Developer",
    headline: ["Lập trình", "có mục đích", " tại Đà Nẵng."],
    bio: "Tôi xây dựng phần mềm với một mục tiêu đơn giản: làm cho những công việc hàng ngày trở nên nhẹ nhàng hơn và cuộc sống dễ dàng hơn một chút. Nhưng không chỉ dừng lại ở việc giải quyết vấn đề, tôi thiết kế những trang web ấn tượng, bắt mắt, nâng cấp trải nghiệm người dùng thông qua tính thẩm mỹ chu đáo. Đó là một quá trình bắt nguồn từ tư duy kỹ thuật logic, nhưng được thúc đẩy hoàn toàn bởi sự đồng cảm và tình yêu dành cho cái đẹp.",
    portraitAlt: "Chân dung Hậu, một lập trình viên trẻ dưới ánh sáng tự nhiên dịu nhẹ",
    deckHint: "Xem slide",
    hintNext: "Dự án",
  },
  projects: {
    eyebrow: "Dự án tiêu biểu",
    heading: "Một vài dự án của tôi.",
    subheading: "Nơi trưng bày các hệ thống full-stack, tích hợp Web3 và ứng dụng di động.",
    openSite: "Mở trang web",
    items: [
      {
        title: "AnimeLearn",
        description:
          "Một nền tảng học tiếng Nhật nâng cao được vận hành bởi luồng xử lý AI tùy chỉnh, sử dụng OpenAI Whisper để trích xuất âm thanh thành văn bản một cách chính xác và SudachiPy để phân tích hình thái từ ngữ. Nền tảng nổi bật với trình phát video phụ đề kép tương tác, cho phép người dùng tra cứu từ điển theo thời gian thực và lưu từ vựng trực tiếp ngay khi đang xem. Các từ vựng và Kanji được trích xuất sẽ được phân loại và sắp xếp toàn diện theo tần suất thực tế và cấp độ JLPT, đồng thời tích hợp mượt mà với Hệ thống lặp lại ngắt quãng (Spaced Repetition System) để tối đa hóa hiệu quả học tập.",
        stack: [
          "React",
          "TypeScript",
          "Node.js",
          "Express",
          "MongoDB",
          "Python (Whisper, SudachiPy)",
        ],
        url: "https://anime-learn.vercel.app",
        github: "https://github.com/dodoododo/AnimeLearn",
        image: "project-1",
      },
      {
        title: "OurNote",
        description:
          "Một không gian làm việc đa năng dành cho các nhóm, cặp đôi và bạn bè. Tích hợp tính năng trò chuyện theo thời gian thực, quản lý công việc Kanban trực quan, các sự kiện bản đồ Leaflet tương tác, ghi chú, bảng trắng cộng tác trực tiếp và hệ thống bảo mật mạnh mẽ thông qua xác thực JWT cùng mã hóa Bcrypt.",
        stack: [
          "React",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "Socket.io",
          "Tailwind CSS",
          "shadcn/ui",
          "OpenStreetMap",
        ],
        url: "https://our-note-ten.vercel.app/",
        github: "https://github.com/dodoododo/our-note",
        image: "project-2",
      },
      {
        title: "ShopTalk (Convo AI Hackathon 2026)",
        description:
          "Một nền tảng thương mại AI full-stack tự động hóa bán hàng trực tuyến thông qua AI đàm thoại và thanh toán blockchain. ShopTalk tận dụng Groq Llama 3.3 cùng Agora Conversational AI để xử lý các tương tác khách hàng bằng ngôn ngữ tự nhiên, thực hiện tra cứu hàng tồn kho và tạo đơn hàng thông qua tool calling, tạo yêu cầu thanh toán Solana Pay USDC, xác minh các giao dịch trên chuỗi (on-chain) với xác thực đa lớp và cung cấp các bản cập nhật bảng điều khiển theo thời gian thực qua WebSockets.",
        stack: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Socket.io",
          "Solana Web3.js",
          "Solana Pay",
          "Groq Llama 3.3 API",
          "Agora Conversational AI",
          "Agora RTC",
        ],
        url: "https://shop-talk-eta.vercel.app/",
        github: "https://github.com/dodoododo/shoptalk",
        image: "project-3",
      },
      {
        title: "FreshFruit Smart Scale",
        description:
          "Một nền tảng bán lẻ thông minh IoT toàn diện kết hợp thị giác máy tính, phần cứng nhúng và bảng điều khiển điểm bán hàng (POS) theo thời gian thực. Hệ thống truyền dữ liệu trọng lượng từ cân thông minh, nhận diện trái cây bằng mô hình AI YOLOv8, tự động tính toán giá cả, quản lý giao dịch và đồng bộ hóa dữ liệu bán hàng thông qua backend FastAPI kết nối với MySQL. Được xây dựng bằng React, TypeScript và Tailwind CSS, frontend mang đến một bảng điều khiển có độ phản hồi cao cho việc cân đo trực tiếp, nhận diện AI, lịch sử giao dịch và phân tích cửa hàng.",
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
          "Hardware/IoT",
        ],
        url: "",
        github: "https://github.com/dodoododo/pbl4-freshfruit-smart-scale-frontend",
        image: "project-4",
      },
      {
        title: "Locket Beta",
        description:
          "Một nền tảng mạng xã hội đa nền tảng được phát triển bằng Flutter và backend Node.js/Express có khả năng mở rộng. Nền tảng ứng dụng xác thực dựa trên JWT, nhắn tin WebSocket theo thời gian thực với chỉ báo đang gõ và đồng bộ hóa trạng thái hoạt động, lưu trữ phương tiện trên Cloudinary, thuật toán đề xuất bạn bè và mô hình hóa dữ liệu MongoDB. Frontend sử dụng kiến trúc BLoC để quản lý trạng thái có thể dự đoán được, cùng với việc tích hợp camera tùy chỉnh và nén hình ảnh trực tiếp trên thiết bị nhằm mang lại hiệu suất phản hồi nhanh trên thiết bị di động.",
        stack: [
          "Flutter",
          "Dart",
          "BLoC Pattern",
          "Node.js",
          "Express",
          "MongoDB",
          "WebSocket",
          "Cloudinary",
        ],
        url: "",
        github: "https://github.com/dodoododo/locketBeta",
        image: "project-5",
      },
      {
        title: "Medicine Distribution System",
        description:
          "Một nền tảng thương mại điện tử dược phẩm B2C bảo mật được xây dựng hoàn toàn không sử dụng framework để nắm vững các nguyên tắc cốt lõi của web. Hệ thống được kiến trúc bằng mẫu thiết kế MVC nghiêm ngặt với Java Servlets và JSP, được hỗ trợ bởi cơ sở dữ liệu quan hệ MySQL được chuẩn hóa hoàn toàn cùng các ràng buộc khóa ngoại (foreign key) phức tạp.",
        stack: ["Java Servlet", "JSP", "MySQL", "MVC Architecture", "Bootstrap"],
        url: "",
        github: "https://github.com/dodoododo/medicine-distribution-system",
        image: "project-6",
      },
      {
        title: "Japanese Dictionary",
        description:
          "Một bộ công cụ hỗ trợ học JLPT toàn diện với tính năng tra cứu từ vựng/kanji nâng cao, tạo flashcard tùy chỉnh và xuất file PDF. Đảm bảo trải nghiệm người dùng mượt mà với tính năng xác thực JWT bảo mật và kiểm tra tính hợp lệ dữ liệu nghiêm ngặt giữa máy khách và máy chủ.",
        stack: ["React", "Java Spring Boot", "Microsoft SQL Server", "Tailwind CSS"],
        url: "",
        github: "https://github.com/dodoododo/PBL3-Japanese-Dictionary",
        image: "project-7",
      },
      {
        title: "Flight Booking Management",
        description:
          "Một ứng dụng chạy trên console mạnh mẽ thể hiện các khái niệm Lập trình Hướng đối tượng (OOP) nâng cao. Sử dụng C++ STL Vectors để quản lý bộ nhớ động và triển khai phân tích tệp văn bản I/O tùy chỉnh để lưu trữ dữ liệu vĩnh viễn mà không cần đến cơ sở dữ liệu.",
        stack: ["C++", "OOP", "File I/O Persistence"],
        url: "",
        github: "https://github.com/dodoododo/Book-Flight-Console-App-C-",
        image: "project-8",
      },
    ],
  },
  skills: {
    eyebrow: "Kỹ năng",
    heading: "Công cụ làm việc.",
    techHeading: "Công nghệ",
    languagesHeading: "Ngoại ngữ",
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
        name: "Công nghệ chính (MERN)",
        items: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB"],
      },
      {
        name: "Mobile & Phần mềm",
        items: ["Flutter", "C++", "C", "Python", "Java", "Spring Boot", "C#", ".NET", "PHP"],
      },
      {
        name: "Cơ sở dữ liệu",
        items: ["PostgreSQL", "MySQL", "SQLite", "Microsoft SQL Server"],
      },
      {
        name: "Cloud & DevOps",
        items: ["AWS", "Firebase", "Docker", "Vercel", "Render", "Supabase"],
      },
      {
        name: "IoT & Phần cứng",
        items: ["Arduino", "ESP8266", "Raspberry Pi", "Cisco Packet Tracer"],
      },
      {
        name: "Công cụ & Quy trình",
        items: ["GitHub", "GitLab", "Jira", "Postman", "VS Code", "Android Studio"],
      },
    ],
    languages: {
      vi: { name: "Tiếng Việt", proficiency: "Người bản xứ" },
      en: { name: "English", proficiency: "IELTS 7.5 — Lưu loát" },
      ja: { name: "日本語", proficiency: "JLPT N3 — Mức giao tiếp" },
    },
  },
  achievements: {
    eyebrow: "Thành tựu",
    heading: "Một vài khoảnh khắc tôi tự hào.",
    items: [
      {
        tag: "Hackathon · 2026",
        title: "Top 10 chung cuộc — CONVO AI HACKATHON ĐẠI HỌC ĐÀ NẴNG 2026",
        body: "Xây dựng một trợ lý ảo đàm thoại tích hợp Solana cùng với một nhóm nhỏ tại DUT. #DUT #ConversationalAI #convoai #DSUC #Agora #Solana #Hackathon",
      },
      {
        tag: "Cuộc thi hùng biện · Tiếng Nhật",
        title: "Giải Nhất — Cuộc thi hùng biện tiếng Nhật",
        body: "Có sự tham dự của Tổng Lãnh sự Nhật Bản tại Đà Nẵng, ngài Takero Mori.",
      },
      {
        tag: "Cuộc thi hùng biện · Tiếng Anh",
        title: "Giải Ba — Cuộc thi hùng biện tiếng Anh cấp Đại học",
        body: "Trường Đại học Bách khoa - Đại học Đà Nẵng.",
      },
    ],
  },
  personal: {
    eyebrow: "Cá nhân",
    personalTitle: ["TÔI LÀ AI", "KHI KHÔNG CODE."],
    personalDescription:
      "Tôi không muốn đây là một trang portfolio nơi tôi lấy đi năm phút của bạn chỉ để giải thích tôi đam mê công nghệ đến mức nào. Tôi muốn trang này tồn tại không chỉ dành cho những người trong ngành công nghệ. Dĩ nhiên nó ở đây để giới thiệu công việc của tôi, nhưng tôi cũng muốn nó tiếp cận với bất kỳ ai tình cờ ghé qua, những người bạn tương lai, những người lạ tò mò, hay đơn giản là những người có cùng tần số với những thứ tôi quan tâm. Vì vậy, tôi sẽ dùng không gian này để kể cho bạn nghe về những thứ tôi yêu thích.",
    personalDrag: "Tìm hiểu thêm về tôi",
    chapter1: {
      label: "Chương 01 — Sự tò mò về thế giới",
      intro:
        "Tôi có sự hứng thú đối với văn hóa, lịch sử và địa lý của những quốc gia mà tôi chưa bao giờ đặt chân tới. Tôi đọc về chúng và giữ một danh sách ngày càng dài những nơi tôi muốn tận mắt nhìn thấy.",
      cityInteractHint: "Nhấn vào để đọc những bức thư của tôi từ mỗi thành phố.",
      moduleHeading: "Những Quốc Gia Tôi Muốn Đặt Chân Tới",
      selectPrompt: "Chọn một quốc gia để xoay quả địa cầu đến đó.",
    },
    chapter2: {
      label: "Tình yêu âm nhạc",
      heading: "Trật Tự Của Giai Điệu",
      body: "Tôi yêu âm nhạc và từ khi còn bé, tôi đã dành phần lớn thời gian rảnh để nghe nhạc. Tôi yêu nó đến mức tôi bắt đầu sản xuất âm nhạc bằng cách làm các beat rap và sau đó tôi bắt đầu chơi guitar. Tôi nghe mọi thể loại nhạc, miễn là nó thú vị và độc đáo. Tôi có một playlist Spotify với 1400 bài hát. Dưới đây là một vài bài hát yêu thích của tôi từ nhiều thể loại và ngôn ngữ khác nhau.",
      footnote: "Nếu tôi không code, tôi có thể đang chìm đắm trong một cái hố sâu của âm nhạc độc lạ nào đó. Không sao cả. Vẫn ổn mà.",
      tags: ["Sản Xuất Beat", "Vết Chai Đầu Ngón Tay", "Tần Số Toàn Cầu"],
    },
    scrapbook: {
      spine: "Vol. 04 — Bản Tuyên Ngôn Cá Nhân — Xuất Bản Hàng Quý — Est. 2019",
      heroEyebrow: "Nỗi Ám Ảnh Của Tôi Với Thỏ",
      heroTitleLine1: "Kẻ Cuồng Thỏ",
      heroTitleLine2: "Tuyệt Đối",
      heroBoldLead: "TÔI YÊU THỎ",
      heroBody:
        "Thỏ dễ thương vô cùng. Nó trầm tính, nó ngốc nghếch một chút, và chỉ thực sự tin tưởng những người mà chúng cảm thấy thoải mái. Một phần nào đó tôi đồng cảm được. Nếu luân hồi là có thật, tôi muốn được đầu thai làm một chú thỏ nhà được cưng chiều. Nên đây là một cuốn tạp chí về thỏ được giấu bên trong portfolio của tôi. Tôi hy vọng bạn sẽ có khoảng thời gian vui vẻ khi khám phá và biết đâu bạn lại học được điều gì đó mới mẻ về chúng.",
      essayLabel: "BÀI TỰ LUẬN VỀ THỎ",
      essayAuthor: "Viết bởi Ngọc Hậu",
      article: {
        kicker: "Bậc Thầy Sinh Tồn",
        dropCapLetter: "Q",
        paragraph1Pre:
          "uên đi những câu chuyện cổ tích cũ kỹ về một con mồi nhỏ bé yếu ớt run rẩy trong bụi rậm. Trên thực tế, thỏ là những chiến binh sinh tồn dũng cảm nhất của tự nhiên. Thỏ được sinh ra chỉ để dành cho một việc duy nhất:",
        paragraph1Bold: "khả năng sinh tồn bùng nổ",
        paragraph1Post:
          ". Một con thỏ rừng khi bị hoảng sợ không chỉ bỏ chạy, nó lao đi như một chiếc lò xo bị nén, đạt vận tốc 70 km/h và thực hiện những cú ngoặt gắt khiến những kẻ săn mồi hoàn toàn bị hít bụi.",
        paragraph2Pre:
          "Và khi chúng an toàn và vui vẻ? Chúng thực hiện một cú xoay người trên không trung thách thức trọng lực được gọi là",
        paragraph2Highlight: "BINKY",
        paragraph2Post: "Đó là sự hiện diện của niềm vui thuần khiết.",
        airborne: "Phóng lên không trung!",
        binky: "Binky!",
        radarLabel: "Radar 270°",
        quoteLine1: "Đôi tai 270° của chúng luôn xoay liên tục.",
        quoteHighlight: "Chúng nghe thấy mối đe dọa",
        quoteLine2: "trước cả khi bạn nhận ra điều đó.",
        globalDominationHeading: "Thống Trị Toàn Cầu",
        globalDominationBody:
          "Từ vùng lãnh nguyên băng giá đến những sa mạc thiêu đốt, thỏ đã chinh phục gần như mọi lục địa. Chúng dựa vào những chiếc râu cực kỳ nhạy cảm để lập bản đồ độ rộng của một đường hầm trước cả khi cơ thể chúng quyết định chui vào. Chúng có khả năng thích nghi đáng kinh ngạc. Về cơ bản là không thể ngăn cản!!",
        fact1: "Răng cửa mọc liên tục, lên tới 12cm mỗi năm! Chúng cần vật cứng để mài mòn răng mỗi ngày.",
        fact2: "Một thỏ mẹ có thể mang thai lại chỉ vài giờ sau khi sinh, về mặt lý thuyết có thể biến một cặp thỏ duy nhất thành hơn 3.000 con chỉ trong vòng một năm!",
        fact3: "Chúng ngủ khoảng 8 giờ mỗi ngày, nhưng những giấc ngủ chỉ ngắn từ 5 đến 25 phút. Thú vị hơn nữa là chúng thường ngủ với đôi mắt mở to để canh chừng nguy hiểm!",
      },
      stats: {
        heading: "CHỈ SỐ CỦA THỎ",
        sprintValue: "70",
        sprintLabel: "km/h tốc độ nước rút",
        hearingValue: "3",
        hearingLabel: "km phạm vi thính giác",
        speciesValue: "30+",
        speciesLabel: "loài thỏ",
        populationValue: "700m+",
        populationLabel: "số lượng thỏ ước tính trên thế giới",
      },
      pullQuote: {
        text: "Con thỏ nghĩ rằng thiên đường của nó là một nơi đầy rẫy cà rốt, cho đến khi nó tìm thấy một nơi đầy cà rốt! Một nơi chứa đầy những thứ bạn vô cùng yêu thích đến mức bạn phát ngán vì chúng sẽ không phải là thiên đường, mà cùng lắm là địa ngục!",
        attribution: "― Mehmet Murat İldan",
      },
      credits: {
        label: "DIỄN VIÊN ĐƯỢC TRẢ TIỀN (VUI LÒNG KHÔNG BẮT CHƯỚC TẠI NHÀ)",
        specimens: [
          "Lily, Nhân vật chính",
          "Kiwi, Đang nghỉ ngơi",
          "Holland Lop",
          "Nhảy giữa chừng",
          "Tư thế cảnh giác",
          "Tìm thức ăn",
          "Mẫu vật số 8",
        ],
      },
      foldHere: "✂ Gấp Tại Đây — Phần II Tiếp Tục",
      sonicRadar: {
        heading1: "Radar",
        heading2: "Âm Thanh",
        paragraph1Pre:
          "Thính giác của thỏ là hệ thống cảnh báo sớm tối thượng của nó. Trong một đồng cỏ tĩnh lặng, một bước đi sai lầm của kẻ săn mồi — chỉ một",
        paragraph1Bold1: "tiếng cành cây gãy sắc gọn",
        paragraph1Mid: "— truyền qua không khí để thỏ có thể bắt được từ khoảng cách lên đến",
        paragraph1Bold2: "3 km",
        paragraph2Pre: "Để dễ hình dung về khoảng cách này: hãy tưởng tượng việc xếp chồng",
        paragraph2Bold: "3.5 tòa tháp Burj Khalifa",
        paragraph2Post:
          "lên nhau. Đó chính là bán kính radar của thỏ. Rất lâu trước khi con sói trở thành một mối đe dọa có thể nhìn thấy, thỏ đã xác định chính xác mối nguy hiểm, tính toán đường đi của nó và chuẩn bị bỏ chạy.",
        heightReferenceLabel: "Thước đo độ cao",
        burjLabel: "Burj Khalifa(830m)",
        eiffelLabel: "Eiffel (330m)",
        libertyLabel: "Tượng Nữ Thần Tự Do (93m)",
        bunnyLabel: "Thỏ",
        wolfLabel: "Sói",
        snap: "RẮC!",
        scaleCaptionPre: "3.5 × Burj Khalifa ≈",
        scaleCaptionHighlight: "3 Kilômét",
      },
      goldenRule: {
        huntsLine1: "Mắt đặt ở",
        huntsLine2: "phía trước,",
        huntsHighlight: "là động vật",
        huntsLine3: "đi săn.",
        hidesLine1: "Mắt đặt ở",
        hidesLine2: "hai bên,",
        hidesHighlight: "là động vật",
        hidesLine3: "bị săn.",
      },
      blueprint: {
        fovLabel: "Tầm Nhìn (FOV)",
        blindLabel: "Điểm Mù",
        predatorHeading1: "Tầm Nhìn",
        predatorHeading2: "Săn Mồi",
        predatorFovValue: "~120°",
        predatorBlindValue: "Phía Sau",
        predatorBody:
          "Đôi mắt hướng về phía trước tạo ra một vùng hiển thị chung, tập trung sắc nét. Sư tử, sói và cú đánh đổi nhận thức ngoại vi để lấy chiều sâu thị giác mạnh mẽ, tính toán khoảng cách chính xác để tấn công. Một tầm nhìn được xây dựng dành riêng cho việc truy đuổi.",
        preyHeading1: "Tầm Nhìn",
        preyHeading2: "Con Mồi",
        preyFovValue: "~360°",
        preyBlindValue: "Chính Diện",
        preyBody:
          "Đôi mắt đặt ở hai bên hoạt động độc lập, cung cấp một cái nhìn bao quát gần như hoàn hảo. Thỏ, nai và ngựa hy sinh nhận thức chiều sâu để liên tục quét đường chân trời. Đó là một hệ thống cảnh báo sớm sinh học được xây dựng cho một mục đích duy nhất: trốn thoát.",
      },
      bunnyLens: {
        heading1: "Tầm Nhìn",
        heading2: "Của Thỏ",
        paragraph1:
          "Như trên đã đề cập, các loài động vật bị săn mồi đánh đổi nhận thức chiều sâu để lấy một tầm nhìn rộng hơn. Nhưng thỏ đưa bản thiết kế sinh học này đến mức độ khắc nghiệt tuyệt đối của nó.",
        paragraph2Pre:
          "Bằng cách định vị đôi mắt to của nó ở vị trí đặc biệt cao và rộng trên hộp sọ, thỏ hợp nhất hai luồng quang học riêng biệt thành một",
        paragraph2Bold: "radar hình ảnh gần 360°",
        paragraph2Post:
          "liền mạch. Khác với những kẻ săn mồi phải quay đầu để quét xung quanh, phần cứng của thỏ được thiết kế để giám sát thụ động, liên tục.",
        paragraph3:
          "Nó có thể quan sát bầu trời để tìm những con diều hâu lượn vòng trong khi mũi đang vùi vào bãi cỏ, hoặc phát hiện một con sói đồng cỏ đang rình rập từ ngay phía sau, tất cả mà không cần di chuyển dù chỉ một thớ cơ trên cổ.",
        tooltipMonoTitle: "Tầm nhìn một mắt",
        tooltipMonoBody: "Hai mắt hoạt động độc lập, giúp quét chuyển động bao quát gần 360°.",
        tooltipBinoFrontTitle: "Tầm nhìn hai mắt",
        tooltipBinoFrontBody: "Góc nhìn giao nhau giúp đo lường khoảng cách và chiều sâu chính xác.",
        tooltipBinoRearTitle: "Tầm nhìn hai mắt",
        tooltipBinoRearBody: "Giúp phát hiện kẻ săn mồi bám đuôi ngay sau gáy.",
        tooltipBlindFrontTitle: "Điểm mù ở mũi",
        tooltipBlindFrontBody: "Thỏ không thể nhìn thấy đồ ngay trước mũi, nên phải dùng râu để cảm nhận thức ăn.",
        tooltipBlindRearTitle: "Điểm mù sau lưng",
        tooltipBlindRearBody: "Vùng khuất tầm nhìn do bị chính cơ thể che lấp.",
        legendMono: "Trường Đơn Nhãn",
        legendBino: "Song Nhãn Chồng Chéo",
        legendBlind: "Điểm Mù",
      },
      footer: "BẢN TIN NÓNG VỀ THỎ",
    },
    bunnyGacha: {
      moduleLabel: "Gacha Thỏ",
      moduleHeading: "Quay Thỏ, Nhận Thông Điệp",
      pullButton: "Quay",
      natureSuffix: "Người Chơi Hệ",
      rarityLabel: "Độ Hiếm",
      blurbPrefix: "Vận may hôm nay",
      factLabel: "Sự Thật Thú Vị",
      stats: {
        curiosity: "Tò Mò",
        fluffiness: "Lông Mềm",
        energy: "Năng Lượng",
        speed: "Tốc Độ",
        friendliness: "Thân Thiện",
        totalPower: "Tổng Sức Mạnh",
      },
      ui: {
        title: "GACHA THỎ",
        subtitle: "Máy Quay Trứng May Mắn",
        machineNo: "Máy Trứng Số 07",
        dept: "Sở Nghiên Cứu Động Vật.",
        specs: {
          heading: "Thông số kỹ thuật",
          dailyLimitLabel: "Giới hạn hàng ngày",
          dailyLimitValue: "1 Lượt / Ngày",
          capsuleRateLabel: "Tỷ lệ viên nang",
          capsuleRateValue: "100% Hữu cơ",
          visualOutputLabel: "Đầu ra hình ảnh",
          visualOutputValue: "Render 3D",
          powerSourceLabel: "Nguồn năng lượng",
          powerSourceValue: "Sự tò mò",
        },
        warning: {
          heading: "Cảnh báo",
          body: "Phát hiện mức độ dễ thương cực độ. Tiến hành cẩn thận. Không cho các đối tượng ăn.",
        },
        machineActive: "Máy Đang Hoạt Động",
        machineCode: "BNUY-01",
        turnHandle: "Xoay Tay Cầm",
        pullIdle: "Quay Gacha",
        pullProcessing: "Đang xử lý...",
        pullAgain: "Quay Lại",
        contentsTicket: {
          heading: "Vận May Hôm Nay Bao Gồm",
          species: "Loài Thỏ",
          fortune: "Vận May Hàng Ngày",
          personality: "Hồ Sơ Tính Cách",
          fact: "Sự Thật Khoa Học Thú Vị",
        },
        stamp: {
          inspected: "Đã Kiểm Tra",
          passed: "ĐẠT",
          dept: "Sở May Mắn",
        },
        collectAll: "Sưu Tập Tất Cả",
      },
      bunnies: {
        hollandLop: {
          name: "Holland Lop",
          blurb: "Giống như một con Holland Lop, bạn sẽ thu phục được lòng người bằng cách là chính mình.",
          type: "Bạn Đồng Hành",
          personality: "Ngọt Ngào",
          ability: "Bùa Chú Tai Cụp",
          fact: "Chúng thường được mô tả là một trong những giống thỏ thoải mái và dễ tính nhất, khiến chúng đặc biệt phù hợp cho những người nuôi lần đầu.",
        },
        netherlandDwarf: {
          name: "Netherland Dwarf",
          blurb: "Một luồng năng lượng bất ngờ sẽ giúp bạn hoàn thành những gì bạn bắt đầu hôm nay.",
          type: "Tuyển Thủ Tốc Độ",
          personality: "Năng Nổ",
          ability: "Lốc Xoáy Zoomie",
          fact: "Mặc dù chỉ nặng khoảng 1 kg, chúng lại sở hữu năng lượng và thái độ của một con thỏ lớn gấp 10 lần kích thước của chúng.",
        },
        lionhead: {
          name: "Lionhead (Đầu Sư Tử)",
          blurb: "Hôm nay tóc bạn có thể rối, nhưng tinh thần của bạn thì đầy oai vệ.",
          type: "Oai Vệ",
          personality: "Kiêu Hãnh",
          ability: "Phòng Thủ Bơm Bờm",
          fact: "Chiếc bờm độc đáo của chúng được gây ra bởi một đột biến gen trội xuất hiện lần đầu tiên ở Bỉ.",
        },
        flemishGiant: {
          name: "Flemish Giant (Khổng Lồ)",
          blurb: "Hôm nay, một giấc ngủ trưa thật ngon sẽ giải quyết nhiều vấn đề hơn là làm việc chăm chỉ.",
          type: "Khổng Lồ",
          personality: "Dịu Dàng",
          ability: "Chuyên Gia Ngủ Trưa",
          fact: "Được biết đến với cái tên 'Những Gã Khổng Lồ Hiền Lành', chúng có thể nặng tới 10 kg và to bằng một số giống chó.",
        },
        miniRex: {
          name: "Mini Rex",
          blurb: "Mọi thứ diễn ra suôn sẻ với bạn hôm nay, mềm mại giống như nhung vậy.",
          type: "Bạn Đồng Hành",
          personality: "Điềm Tĩnh",
          ability: "Chạm Như Nhung",
          fact: "Bộ lông của chúng thiếu đi những sợi lông bảo vệ dài, mang lại cho chúng một kết cấu độc đáo có cảm giác y hệt như nhung xịn.",
        },
        englishAngora: {
          name: "English Angora",
          blurb: "Hãy mong đợi một ngày tràn ngập sự thoải mái mềm mại và một chút chăm chút thêm cho bản thân.",
          type: "Thần Thánh",
          personality: "Được Cưng Chiều",
          ability: "Ngụy Trang Đám Mây",
          fact: "Chúng là giống thỏ duy nhất được bao phủ hoàn toàn bằng len, bao gồm cả khuôn mặt và đôi tai, đòi hỏi phải được chải lông hàng ngày.",
        },
        dutch: {
          name: "Dutch Rabbit",
          blurb: "Sự cân bằng là thế mạnh của bạn hôm nay. Hãy giữ cho mọi thứ chia đều ngay chính giữa.",
          type: "Cổ Điển",
          personality: "Cân Bằng",
          ability: "Sự Thanh Lịch Tuxedo",
          fact: "Là một trong những giống thỏ lâu đời nhất được biết đến, có thể nhận ra ngay lập tức nhờ bộ lông hai tông màu bắt mắt.",
        },
        californian: {
          name: "Californian",
          blurb: "Hôm nay bạn sẽ để lại một ấn tượng nổi bật với một người mới.",
          type: "Cổ Điển",
          personality: "Thư Giãn",
          ability: "Thích Ứng Nhiệt Độ",
          fact: "Các vệt tối trên tai và mũi của chúng rất nhạy cảm với nhiệt độ và sẽ trở nên đậm hơn khi thời tiết lạnh.",
        },
        harlequin: {
          name: "Harlequin",
          blurb: "Hôm nay, khiếu hài hước sẽ giúp bạn thoát khỏi một tình huống khó khăn.",
          type: "Kẻ Lừa Gạt",
          personality: "Tinh Nghịch",
          ability: "Đa Nhân Cách",
          fact: "Chúng đôi khi được gọi là 'chú hề của loài thỏ' do màu sắc giống như bàn cờ caro của mình.",
        },
        himalayan: {
          name: "Himalayan",
          blurb: "Hít một hơi thật sâu. Một cách tiếp cận điềm tĩnh sẽ mang lại kết quả tốt nhất.",
          type: "Thiền",
          personality: "Bình Tĩnh",
          ability: "Kéo Dài Hình Trụ",
          fact: "Chúng có hình dáng cơ thể hình trụ độc đáo và là một trong những giống thỏ bình tĩnh nhất tồn tại.",
        },
        polish: {
          name: "Polish Rabbit",
          blurb: "Hôm nay bạn có thể lấy ra một giải pháp từ không khí một cách kỳ diệu.",
          type: "Kỳ Diệu",
          personality: "Cảnh Giác",
          ability: "Thủ Thuật Mũ Phép",
          fact: "Trong lịch sử, chúng rất phổ biến với các ảo thuật gia, chúng nhỏ bé, cực kỳ thông minh và rất chú ý đến môi trường xung quanh.",
        },
        satin: {
          name: "Satin",
          blurb: "Bạn sẽ làm lu mờ mọi sự cạnh tranh hôm nay mà không cần phải cố gắng.",
          type: "Tỏa Sáng",
          personality: "Diva",
          ability: "Khúc Xạ Ánh Sáng",
          fact: "Một đột biến gen khiến các nang lông của chúng trở nên mờ ảo, làm cho bộ lông của chúng vô cùng bóng bẩy và phản chiếu ánh sáng.",
        },
        silverFox: {
          name: "Silver Fox (Cáo Bạc)",
          blurb: "Một cơ hội hiếm có và độc đáo đang tiến về phía bạn.",
          type: "Hiếm",
          personality: "Bí Ẩn",
          ability: "Bộ Lông Đứng",
          fact: "Chúng là giống thỏ duy nhất mà lông sẽ dựng đứng lên khi bị vuốt ngược cho đến khi được vuốt xuôi trở lại.",
        },
        blancDeHotot: {
          name: "Blanc de Hotot",
          blurb: "Sẽ có người đánh giá cao lòng tốt thầm lặng của bạn (và cả phong cách của bạn nữa).",
          type: "Cổ Điển",
          personality: "Người Quan Sát",
          ability: "Ánh Nhìn Eyeliner",
          fact: "Chúng hoàn toàn trắng như tuyết ngoại trừ một vòng đen đặc trưng, dày xung quanh mắt, trông giống như kẻ mắt.",
        },
        miniLop: {
          name: "Mini Lop",
          blurb: "Hôm nay những món ăn vặt bất ngờ có thể tìm đường đến với bạn.",
          type: "Bạn Đồng Hành",
          personality: "Thích Ôm",
          ability: "Bóng Rổ Lăn",
          fact: "Cơ thể của chúng được các nhà lai tạo mô tả là giống hệt như một quả bóng rổ gắn thêm một cái đầu.",
        },
        jerseyWooly: {
          name: "Jersey Wooly",
          blurb: "Một giải pháp hòa bình cho một cuộc xung đột nhỏ đang chờ đợi bạn trong tương lai.",
          type: "Thần Thánh",
          personality: "Kích Cỡ Bằng Cốc",
          ability: "Vùng Không Đá",
          fact: "Ban đầu được lai tạo để trở thành một giống thỏ len ít cần chăm sóc, chúng nổi tiếng với danh xưng 'chú thỏ không bao giờ đá' vì sự hiền lành của mình.",
        },
        americanFuzzyLop: {
          name: "American Fuzzy Lop",
          blurb: "Năng lượng của bạn sẽ mang lại nụ cười cho một người đang cần nó.",
          type: "Bạn Đồng Hành",
          personality: "Xã Hội",
          ability: "Chăn Len",
          fact: "Trông chúng giống như một con Holland Lop mặc áo len, kết quả từ gen lặn trong dòng máu của chúng.",
        },
        checkeredGiant: {
          name: "Checkered Giant",
          blurb: "Hôm nay bạn sẽ lướt qua các nhiệm vụ của mình với một tốc độ ấn tượng.",
          type: "Tuyển Thủ Tốc Độ",
          personality: "Năng Động",
          ability: "Sọc Đua Xế Hộp",
          fact: "Một trong số ít giống thỏ được công nhận mà không có giới hạn cân nặng tối đa, được biết đến với vệt mũi hình con bướm đặc trưng.",
        },
        havana: {
          name: "Havana",
          blurb: "Đôi khi việc chìm vào nền sẽ giúp bạn nhìn thấy được nhiều thứ nhất.",
          type: "Hiếm",
          personality: "Mượt Mà",
          ability: "Hòa Trộn Bóng Tối",
          fact: "Được đặt tên vì bộ lông màu sô cô la đậm đà, được cho là giống với màu của xì gà Havana.",
        },
        tan: {
          name: "Tan Rabbit",
          blurb: "Bản năng nhạy bén của bạn sẽ dẫn lối bạn đến một giải pháp thông minh.",
          type: "Tuyển Thủ Tốc Độ",
          personality: "Cảnh Giác",
          ability: "Tư Thế Doberman",
          fact: "Thường được gọi là 'chó Doberman của loài thỏ' do đặc điểm lưng cong, màu đen nâu nổi bật và trí thông minh cao.",
        },
      },
    },
    outdoors: {
      label: "Chương 03 — Dành thời gian ngoài trời",
      heading: "Và khi có thể, tôi sẽ ra ngoài.",
      body: "Những cuộc đi dạo dài, những ngọn đồi nhỏ, những dòng sông lạnh, cốc cà phê ấm áp cầm trên hai tay. Nó giúp tôi cân bằng lại.",

      spreadOne: {
        titleLine1: "BÊN NGOÀI",
        titleMid: "là nơi",
        titleLine2: "Bạn",
        titleHighlight: "sẽ",
        titleLine3: "Tìm Thấy Tôi.",
        body: "Tôi dành phần lớn thời gian ở ngoài. Khi được bao quanh bởi con người, những địa điểm và những khoảnh khắc nhỏ bé của cuộc sống thường ngày giúp tâm trí tôi luôn hoạt động. Laptop của tôi thường được đặt trên một chiếc bàn quán cà phê hoặc trong thư viện, tai nghe luôn mang theo bên mình, và cảm hứng bằng một cách nào đó sẽ tuôn trào tốt hơn khi tôi không nhìn chằm chằm vào bốn bức tường. Phân đoạn này thực sự đang được viết khi tôi đang ngồi ở một quán cà phê. Tôi chỉ đơn giản là tận hưởng việc dành thời gian ở ngoài thế giới, dù là tôi đang làm việc, đi lang thang, hay không làm gì cả.",
        altHopscotch: "Một ngày nắng đẹp trong công viên",
        altHorizontalShip: "Cỏ đung đưa trong gió",
      },

      spreadTwo: {
        altPanorama: "Phong cảnh bãi biển đầy nắng",
        quote: "Thủy triều dường như chẳng bao giờ vội vã.",
        body: "Có một điều tôi luôn để ý khi ở bãi biển, đó là cách những con sóng xóa nhòa đi những dấu chân trên cát. Mỗi dấu vết đều thuộc về một ai đó vừa ở đây cách đây vài khoảnh khắc, một ai đó đang đi dạo, đang cười, đang suy nghĩ, đang sống trong câu chuyện nhỏ của riêng họ. Rồi thủy triều dâng lên như thường lệ, để lại một bờ biển nguyên vẹn trở lại trước khi những bước chân tiếp theo xuất hiện.",
        altTerraGate: "Nước rửa trôi trên cát",
        altBuddhaBeach: "Những tảng đá cạnh biển",
      },

      spreadThree: {
        heading: "Cuộc Đi Dạo.",
        subheading: "Không có đích đến trong đầu. Chỉ là thu thập những khoảnh khắc nhỏ bé trên đường đi.",
        altCurrency: "Ánh nắng chiếu qua những chiếc lá xanh",
        altGoose: "Bóng râm hắt trên bức tường có kết cấu",
        altFireworks: "Một con phố yên tĩnh",
      },

      spreadFour: {
        altCoffeeHill: "Cây cối trong rừng núi",
        note: "thay đổi độ cao.",
        body: "Lái xe lên những ngọn đồi giúp tôi giải tỏa đầu óc nhanh hơn bất cứ điều gì khác. Không khí giảm đi vài độ, tiếng ồn ào của thành phố nhỏ dần, và bạn có được một khung cảnh rộng lớn, không bị cản trở. Đó là nơi hoàn hảo để ngồi và hoàn toàn không làm gì cả trong nhiều giờ liền.",
        altHillTop: "Nhìn xuống con đường ngoằn ngoèo",
        altHillSea: "Khung cảnh nhìn từ trên núi",
      },

      spreadFive: {
        heading: "Cà phê trước đã.",
        body: "Tôi dành rất nhiều thời gian ở các quán cà phê. Thường là với laptop hoặc bất cứ thứ gì tôi đang học hay đọc trong tuần đó. Chỉ là những âm thanh xung quanh, ánh sáng tốt và những người tuyệt vời bao quanh tôi.",
        altRaspCafe: "Cà phê đá trên bàn",
        altNiuFish: "Một cuốn sách, ly cà phê và dụng cụ phác thảo",
        altShiba: "Chi tiết một chiếc bàn ở quán cà phê",
        altNckh: "Chi tiết một chiếc bàn ở quán cà phê",
      },

      spreadSix: {
        altRockCactus: "Một chi tiết nhỏ từ công viên",
        quote: "Thời tiết quá đẹp để có thể ở trong nhà.",
        caption: "Lại là một ngày tốt lành.",
        altSanrio: "Hoàng hôn tuyệt đẹp trên một con đường vắng",
      },
    },
  },
  contact: {
    eyebrow: "Liên hệ",
    heading: "Cảm ơn vì đã đọc đến tận đây.",
    body: "Nếu bạn cảm thấy đồng điệu với bất kỳ điều gì ở đây, hãy kết nối nhé! Cho dù bạn muốn thảo luận về một vị trí công việc, hay chỉ muốn tán gẫu về những chú thỏ, hộp thư của tôi luôn mở. Hãy để lại tin nhắn cho tôi qua bất kỳ trang mạng xã hội nào, và tôi chắc chắn sẽ phản hồi lại bạn.",
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
      name: "Thổ Nhĩ Kỳ",
      flag: "tr",
      caption:
        "Istanbul ngự trị trên hai lục địa cùng một lúc, một thành phố nơi các đế chế đã xếp chồng lên nhau trong suốt 1.600 năm.",
      cities: ["Istanbul", "Cappadocia", "Antalya", "Adana"],
      letters: {
        "Istanbul": {
          title: "Băng qua eo biển Bosphorus",
          body: "Có rất ít thành phố nằm trên hai lục địa cùng một lúc. Istanbul về cơ bản là một mặt cắt khổng lồ, sống động của lịch sử, nơi những di sản của La Mã, Byzantine và Ottoman được xếp chồng lên nhau. Tôi đã bị Istanbul mê hoặc không chỉ bởi các địa danh lịch sử, mà còn để cảm nhận linh hồn của nơi những đế chế vĩ đại từng ngự trị.",
          signature: "Sẽ sớm có mặt ở đó"
        },
        "Cappadocia": {
          title: "Thung Lũng Ống Khói",
          body: "Có một điều gì đó thật siêu thực về một cảnh quan được hình thành bởi xói mòn núi lửa trông giống như thuộc về một hành tinh khác. Không chỉ là những quả khinh khí cầu thu hút tôi; mà còn là ý tưởng về một nền văn minh đã trực tiếp chạm khắc nhà cửa và các thành phố ngầm vào đá mềm để sinh tồn.",
          signature: "Một giấc mơ để theo đuổi"
        },
        "Antalya": {
          title: "Bờ Biển Ngọc Lam",
          body: "Hầu hết mọi người tìm kiếm những bãi biển, nhưng tôi lại bị thu hút bởi cách Con đường Lycian kết nối những ngọn núi với biển cả. Việc tìm thấy những tàn tích La Mã đã trải qua nhiều thế kỷ dần dần vỡ vụn vào Địa Trung Hải dường như là một cách đầy khiêm nhường để hiểu được thời gian và thiên nhiên cuối cùng sẽ đòi lại mọi thứ con người để lại như thế nào.",
          signature: "Đang mong chờ"
        },
        "Adana": {
          title: "Adana Kebab không chỉ là một món Kebab",
          body: "Tình yêu của tôi dành cho Thổ Nhĩ Kỳ đã được thắp sáng từ cách đây hàng ngàn dặm bởi một người đã mang quê hương của họ hiện ra sống động trước mắt tôi. Trái tim tôi đã bị quyến rũ bởi sự ấm áp của người dân địa phương và một nền văn hóa đối xử với ngay cả những người lạ từ phương xa như anh em ruột thịt. Chính linh hồn của những con người chưa từng gặp mặt ấy đã gắn kết tôi vĩnh viễn với một đất nước mà giờ đây tôi đang đếm từng ngày để cuối cùng được hít thở bầu không khí nơi đó. Đôi khi tôi tưởng tượng mình đang ở trong thành phố ngập tràn ánh nắng đó, thưởng thức món Adana kebab trong khi tản bộ bên dòng sông Seyhan.",
          signature: "Một chuyến đi trong tương lai"
        }
      }
    },
    Lebanon: {
      name: "Libăng",
      flag: "lb",
      caption: "Một quốc gia nhỏ bé trên Địa Trung Hải nơi hàng ngàn năm thương mại, xung đột và văn hóa đã để lại những dấu ấn khó tin.",
      cities: ["Beirut", "Byblos", "Baalbek", "Tripoli"],
      letters: {
        "Beirut": {
          title: "Bảy Lần Được Tái Thiết",
          body: "Thật khó để không tôn trọng một thành phố đã bị phá hủy và xây dựng lại tới bảy lần. Beirut nằm ngay trên biển Địa Trung Hải, cân bằng giữa nguồn năng lượng hiện đại hỗn loạn với những vết sẹo có thể nhìn thấy từ quá khứ. Tôi bị mê hoặc bởi sự kiên cường ngoan cố đó và cách con người tiếp tục phát triển ở đó bất chấp mọi thứ.",
          signature: "Hy vọng được ghé thăm"
        },
        "Byblos": {
          title: "Cội Nguồn Của Chữ Viết",
          body: "Bạn có bao giờ tự hỏi bảng chữ cái thực sự đến từ đâu không? Thành phố cảng này là một trong những nơi có người ở liên tục lâu đời nhất trên Trái đất, và đó là nơi người Phoenicia đã phát triển những chữ cái mà chúng ta sử dụng cho đến ngày nay. Đi bộ qua một thị trấn theo đúng nghĩa đen đã định hình nên giao tiếp của con người nghe có vẻ thật kinh ngạc đối với tôi.",
          signature: "Một giấc mơ lịch sử"
        },
        "Baalbek": {
          title: "Quy Mô Bất Khả Thi",
          body: "Rome thường thu hút mọi sự chú ý về kiến trúc cổ đại, nhưng một số ngôi đền La Mã đồ sộ nhất từng được xây dựng lại thực sự được giấu ở đây. Những tảng đá được sử dụng trong phần móng nặng hàng trăm tấn. Đó là một bí ẩn về kỹ thuật khiến bạn phải đặt câu hỏi rằng chúng ta thực sự hiểu được bao nhiêu về quá khứ.",
          signature: "Một ngày không xa"
        },
        "Tripoli": {
          title: "Khu Chợ Sống Động",
          body: "Trong khi hầu hết các trung tâm lịch sử mang lại cảm giác như những viện bảo tàng được giám tuyển kỹ lưỡng, thành phố phía bắc này vẫn hoạt động chính xác như những gì nó đã diễn ra từ nhiều thế kỷ trước. Các kiến trúc thời Mamluk cũ không bị rào lại; đó là nơi cuộc sống hằng ngày, may mặc và giao thương vẫn đang thực sự diễn ra. Tôi thích ý tưởng về việc trải nghiệm lịch sử vẫn đang được sử dụng một cách tích cực.",
          signature: "Nằm trong danh sách ước muốn"
        }
      }
    },
    Nepal: {
      name: "Nepal",
      flag: "np",
      caption: "Một quốc gia được xác định bởi cảnh quan thẳng đứng, nơi những truyền thống tâm linh cổ đại tồn tại ngay dưới bóng của dãy Himalaya.",
      cities: ["Kathmandu", "Pokhara", "Namche", "Bhaktapur"],
      letters: {
        "Kathmandu": {
          title: "Bảo Tàng Sống",
          body: "Ranh giới giữa cuộc sống hằng ngày và tôn giáo cổ đại gần như không tồn tại ở đây. Thay vì khóa các đồ tạo tác sau tủ kính, người dân địa phương vẫn tích cực thờ cúng tại các đền thờ hàng thế kỷ ngay giữa dòng xe cộ hỗn loạn. Tôi thấy sự giao thoa liên tục giữa cuộc sống hiện đại ồn ào và truyền thống tâm linh tĩnh lặng đó vô cùng thú vị.",
          signature: "Một mục tiêu tâm linh"
        },
        "Pokhara": {
          title: "Bên Dưới Những Đỉnh Núi",
          body: "Sau sự ngột ngạt của thủ đô, thị trấn ven hồ này giống như một sự tái thiết lập tâm lý tuyệt đỉnh. Dãy Himalaya đồ sộ, phủ đầy tuyết nằm ngay sát đến mức phản chiếu hoàn hảo xuống mặt nước bên dưới. Nó thực sự trông giống như một trong những môi trường yên bình nhất trên hành tinh để ngồi và thanh lọc đầu óc.",
          signature: "Chờ đợi đến ngày đó"
        },
        "Namche": {
          title: "Tiền Đồn Cuối Cùng",
          body: "Bạn chỉ có thể đến ngôi làng này bằng cách đi bộ nhiều ngày qua những thung lũng núi dốc. Là trung tâm giao dịch chính của người Sherpa trước đợt đẩy cuối cùng vào vùng Himalaya cao, nó có một bầu không khí biên giới hoàn toàn độc đáo. Tôi bị cuốn hút bởi những cộng đồng biệt lập phát triển mạnh ở độ cao khắc nghiệt như vậy.",
          signature: "Giấc mơ ở độ cao lớn"
        },
        "Bhaktapur": {
          title: "Đóng Băng Thời Gian",
          body: "Ô tô bị cấm vào trung tâm của thành phố này, điều đó làm thay đổi hoàn toàn cảm giác về một nơi. Vì kiến trúc gạch và gỗ chạm khắc truyền thống đã được bảo tồn hàng trăm năm, đi bộ trên những con phố ở đây có lẽ là điều gần gũi nhất mà chúng ta có với du hành thời gian thực sự.",
          signature: "Một điều ước vượt thời gian"
        }
      }
    },
    Spain: {
      name: "Tây Ban Nha",
      flag: "es",
      caption: "Một bán đảo nơi hàng thế kỷ lịch sử của Công giáo và người Moor đã tạo nên một nền văn hóa nghệ thuật, mãnh liệt và đáng chú ý.",
      cities: ["Barcelona", "Sevilla", "Granada", "Madrid"],
      letters: {
        "Barcelona": {
          title: "Lưới Đường Và Những Đường Cong",
          body: "Thật khó để hình dung về một thành phố được bố trí theo một mạng lưới cứng nhắc hoàn hảo, nhưng lại được định hình bởi một kiến trúc sư đã hoàn toàn phớt lờ các đường thẳng. Tôi rất muốn đi dạo qua Khu phố Gothic chỉ để xem lịch sử thời trung cổ nặng nề đó nằm ngay cạnh trí tưởng tượng theo chủ nghĩa siêu thực của Gaudí như thế nào.",
          signature: "Một ký ức tương lai"
        },
        "Sevilla": {
          title: "Những Thế Kỷ Xếp Lớp",
          body: "Miền nam Tây Ban Nha có một nguồn năng lượng sâu sắc, mãnh liệt mà tôi thấy thực sự hấp dẫn. Kiến trúc Moorish của Alcázar cho thấy các nền văn hóa khác nhau có thể pha trộn về mặt vật lý như thế nào qua nhiều thế kỷ, và tôi tò mò muốn trải nghiệm một nơi mà nghệ thuật, lịch sử và cuộc sống hằng ngày dường như hòa quyện vào nhau một cách ồn ào.",
          signature: "Hy vọng sẽ được đi"
        },
        "Granada": {
          title: "Thành Trì Cuối Cùng",
          body: "Đây là thành trì cuối cùng của người Hồi giáo ở Tây Âu, và bạn vẫn có thể cảm nhận được sức nặng lịch sử đó trong thành phố. Đối với tôi, Alhambra không chỉ là một cung điện tuyệt đẹp; nó là một lời nhắc nhở vật lý về một thời kỳ hoàn toàn khác của lịch sử châu Âu đã lặng lẽ tồn tại trên những ngọn núi.",
          signature: "Giấc mơ của người Moor"
        },
        "Madrid": {
          title: "Lực Hấp Dẫn Văn Hóa",
          body: "Việc trở thành trung tâm địa lý của bán đảo mang lại cho thành phố này một lực hấp dẫn lớn, không thể phủ nhận. Tôi chủ yếu bị thu hút bởi khối lượng nghệ thuật khổng lồ được lưu giữ ở đó. Đứng trước các tác phẩm của Velázquez ngoài đời thực giống như một cuộc hành hương cần thiết cho bất kỳ ai trân trọng lịch sử Châu Âu.",
          signature: "Đã có trên lịch trình"
        }
      }
    },
    Morocco: {
      name: "Ma-rốc",
      flag: "ma",
      caption: "Ngã tư đường của các nền văn hóa Châu Phi, Ả Rập và Berber với những môi trường đô thị cực kỳ khác biệt.",
      cities: ["Marrakech", "Chefchaouen", "Fez", "Essaouira"],
      letters: {
        "Marrakech": {
          title: "Hỗn Loạn Và Tĩnh Lặng",
          body: "Sự tương phản ở đây là điều thu hút sự chú ý của tôi. Medina nổi tiếng là một mê cung ồn ào, hỗn loạn đến choáng ngợp, nhưng những ngôi nhà riad truyền thống lại được thiết kế để hoàn toàn tĩnh lặng, là những khu bảo tồn hướng nội. Tôi thực sự muốn trải nghiệm cách hai thái cực đó tồn tại song song với nhau.",
          signature: "Một chuyến phiêu lưu tương lai"
        },
        "Chefchaouen": {
          title: "Hơn Cả Một Màu Sắc",
          body: "Thật dễ dàng để chỉ nhìn vào những bức tường màu xanh và thấy một bức ảnh đẹp, nhưng lịch sử mới là điều thực sự cuốn hút tôi. Nó được định hình mạnh mẽ bởi những người tị nạn Do Thái và Moor chạy trốn khỏi Tây Ban Nha, biến một tiền đồn miền núi hẻo lánh thành một nơi ẩn náu xinh đẹp, lâu dài.",
          signature: "Lạc trong trí tưởng tượng"
        },
        "Fez": {
          title: "Mê Cung Thời Trung Cổ",
          body: "Đây là một trong những khu vực đô thị cấm ô tô lớn nhất hành tinh. Ý tưởng điều hướng một mê cung thời trung cổ gồm hàng ngàn con hẻm, nơi cơ sở hạ tầng hiện đại cơ bản không được áp dụng, làm tôi rất tò mò. Cảm giác như một cơ hội hiếm có để xem một thành phố lớn hoạt động gần giống y hệt như những gì nó đã làm cách đây hàng thế kỷ.",
          signature: "Một mục tiêu để khám phá"
        },
        "Essaouira": {
          title: "Hải Cảng Không Vội Vã",
          body: "Khác với những thành phố sa mạc dữ dội, pháo đài ven biển này có tiếng là có nhịp độ nghệ thuật chậm rãi hơn nhiều. Nơi đây từng là trung tâm thương mại lớn, nơi kiến trúc Châu Âu và Bắc Phi va chạm nhau, tạo nên một thị trấn cảng thư thái mang đậm dấu ấn lịch sử nhưng hoàn toàn không vội vã.",
          signature: "Chờ đợi để ghé thăm"
        }
      }
    },
    China: {
      name: "Trung Quốc",
      flag: "cn",
      caption: "Một quy mô rất khó để nắm bắt, một quốc gia đang lao nhanh về tương lai trong khi vẫn đứng trên một nền tảng cổ đại đồ sộ.",
      cities: ["Beijing", "Shanghai", "Chengdu", "Lijiang"],
      letters: {
        "Beijing": {
          title: "Sức Nặng Hoàng Gia",
          body: "Quy mô quyền lực tuyệt đối được nhúng trong kiến trúc ở đây thật khó để hiểu được. Tử Cấm Thành được thiết kế để khiến bạn cảm thấy mình vô cùng nhỏ bé. Tôi bị mê hoặc bởi cách những công trình kiến trúc hoàng gia đồ sộ đó nằm ngay sát những con ngõ hồ đồng nhỏ hẹp, nơi những người dân bình thường đã sinh sống qua nhiều thế hệ.",
          signature: "Một hành trình lịch sử"
        },
        "Shanghai": {
          title: "Ranh Giới Của Thời Gian",
          body: "Không ở đâu cho thấy sự cọ xát giữa quá khứ và siêu tương lai rõ ràng như nơi này. Bạn có những tòa nhà ngân hàng kiểu thuộc địa châu Âu nặng nề ở một bên sông, nhìn thẳng vào một đường chân trời theo phong cách khoa học viễn tưởng ở bên kia. Nó giống như việc đứng ở ranh giới của hai thế kỷ khác nhau.",
          signature: "Thành phố của những ánh đèn"
        },
        "Chengdu": {
          title: "Bảo Vệ Nhịp Sống",
          body: "Mặc dù là một trung tâm công nghệ khổng lồ, đang phát triển nhanh chóng, thành phố này lại nổi tiếng vì bảo vệ quyết liệt văn hóa quán trà thư giãn của mình. Tôi tôn trọng một nơi từ chối hy sinh nhịp sống chậm rãi, thong thả của mình, ngay cả khi phần còn lại của đất nước đang hối hả tiến về phía trước.",
          signature: "Cay nồng và thư thái"
        },
        "Lijiang": {
          title: "Định Hình Bởi Tuyết Tan",
          body: "Người dân tộc Nạp Tây bản địa đã xây dựng thị trấn này mà không cần tường thành truyền thống, thay vào đó dựa vào một mạng lưới tuyệt vời các kênh đào bằng đá được nuôi dưỡng bởi tuyết tan từ trên núi. Tôi thích ý tưởng về một nơi hoàn toàn được định hình bởi địa lý và nguồn nước của nó, sống sót qua hàng thế kỷ thay đổi ở vùng chân núi Himalaya.",
          signature: "Một điều ước bình yên"
        }
      }
    },
    Georgia: {
      name: "Gruzia",
      flag: "ge",
      caption: "Một quốc gia hiểm trở nằm nép mình trong dãy núi Kavkaz, gìn giữ một bảng chữ cái độc đáo và những truyền thống cổ xưa.",
      cities: ["Tbilisi", "Kazbegi", "Mestia", "Batumi"],
      letters: {
        "Tbilisi": {
          title: "Giao Lộ Lịch Sử",
          body: "Về mặt địa lý và văn hóa, thành phố này luôn bị kẹp giữa các đế chế. Bạn có thể thấy điều đó trong kiến trúc, nơi những ban công bằng gỗ chạm khắc được trộn lẫn với chủ nghĩa thô mộc của Liên Xô và những nhà thờ cổ kính. Tôi bị thu hút bởi những nơi buộc phải dệt nên những thế giới hoàn toàn khác nhau lại với nhau.",
          signature: "Trái tim của Kavkaz"
        },
        "Kazbegi": {
          title: "Một Tuyên Bố Bằng Đá",
          body: "Đặt một nhà thờ nhỏ bằng đá đứng đơn độc trên một đỉnh núi dốc được bao quanh bởi dãy núi Kavkaz đồ sộ là một tuyên bố táo bạo về sự cô lập. Trông nó ít giống một điểm đến mà giống một bài kiểm tra thể chất để chứng minh bạn muốn đến đó đến mức nào.",
          signature: "Giấc mơ núi non"
        },
        "Mestia": {
          title: "Thung Lũng Của Những Tòa Tháp",
          body: "Trong nhiều thế kỷ, người Svan đã sống trong sự cô lập sâu thẳm trên núi đến mức mọi gia đình về cơ bản phải tự xây dựng tháp canh bằng đá của riêng mình để phòng thủ. Khám phá một khu vực phát triển ngôn ngữ riêng biệt và văn hóa sinh tồn hoàn toàn bị cắt đứt với phần còn lại của thế giới nghe có vẻ thật khó tin.",
          signature: "Tít trên những thung lũng"
        },
        "Batumi": {
          title: "Sự Mâu Thuẫn Ven Biển",
          body: "Thành phố này có một danh tiếng kỳ lạ như một thị trấn nghỉ mát lập dị trên Biển Đen, chứa đầy những tòa nhà chọc trời kỳ lạ, mang tính tương lai nằm ngay cạnh các khối nhà cũ của Liên Xô. Tôi chủ yếu chỉ tò mò muốn xem làm thế nào một thành phố ven biển thử nghiệm, mâu thuẫn như vậy thực sự hoạt động trong đời thực.",
          signature: "Sự tò mò ven biển"
        }
      }
    },
    Greece: {
      name: "Hy Lạp",
      flag: "gr",
      caption: "Những khối lập phương trắng bước xuống từ vách đá, ánh sáng màu ô liu trên biển Aegean, và 3.000 năm triết học được xếp thành từng lớp bên dưới.",
      cities: ["Athens", "Santorini", "Crete", "Meteora"],
      letters: {
        "Athens": {
          title: "Cẩm Thạch và Graffiti",
          body: "Tôi muốn đi bộ qua quận Plaka và cảm nhận những viên đá lát bằng cẩm thạch đã mòn dưới chân mình. Nhìn thấy thành cổ Acropolis rực sáng trên một thành phố hiện đại hỗn loạn, rộng lớn là điều tôi phải chứng kiến.",
          signature: "Dưới bóng đền Parthenon"
        },
        "Santorini": {
          title: "Mép Miệng Núi Lửa",
          body: "Có thể hơi rập khuôn, nhưng nhìn thấy những mái vòm màu xanh đó khớp chính xác với màu của biển Aegean là một giấc mơ. Tôi muốn đứng trên vách đá núi lửa và ngắm nhìn cảnh hoàng hôn nổi tiếng thế giới đó.",
          signature: "Một giấc mơ Aegean"
        },
        "Crete": {
          title: "Hòn Đảo Hoang Dã",
          body: "Tôi muốn đi lang thang trong tàn tích cổ đại của Knossos và cố gắng tưởng tượng ra mê cung Minoan. Sự kết hợp của những hẻm núi hiểm trở, những rặng ô liu trải dài bất tận và lịch sử sâu sắc đã lôi cuốn tôi.",
          signature: "Một huyền thoại đang chờ được khám phá"
        },
        "Meteora": {
          title: "Lơ Lửng Giữa Không Trung",
          body: "Ý tưởng về những tu viện ngự trị một cách không tưởng trên đỉnh những cột đá sa thạch khổng lồ giống như một điều kỳ ảo. Tôi muốn leo lên những bậc thang khắc trong đá khi sương mù buổi sáng quấn quanh những tảng đá.",
          signature: "Chạm vào bầu trời"
        }
      }
    },
    Norway: {
      name: "Na Uy",
      flag: "no",
      caption: "Một cảnh quan hiểm trở được định hình bởi nước và băng, nơi thiết kế hiện đại lặng lẽ tôn trọng địa lý khắc nghiệt.",
      cities: ["Oslo", "Bergen", "Lofoten", "Tromsø"],
      letters: {
        "Oslo": {
          title: "Xây Dựng Cùng Với Rừng",
          body: "Hầu hết các thủ đô đều lấp đi môi trường tự nhiên xung quanh bằng những con đường rải nhựa, nhưng Oslo dường như đã được xây dựng ngay vào giữa những khu rừng và mặt nước. Là một lập trình viên, tôi thực sự đánh giá cao khi thiết kế hiện đại, nhiều chức năng không cố gắng thống trị thiên nhiên mà thực sự bổ sung cho nó.",
          signature: "Một mục tiêu Bắc Âu"
        },
        "Bergen": {
          title: "Ôm Lấy Những Cơn Mưa",
          body: "Ở đây mưa hơn hai trăm ngày một năm, thế nhưng nó vẫn được coi là một trong những thành phố đẹp nhất châu Âu. Có điều gì đó vô cùng ấm cúng về một thị trấn ven biển hoàn toàn chấp nhận thời tiết khắc nghiệt của mình thay vì cố gắng trốn tránh nó.",
          signature: "Giữa bảy ngọn núi"
        },
        "Lofoten": {
          title: "Rìa Đá Lởm Chởm",
          body: "Về mặt địa lý, quần đảo này gần như không hợp lý. Những ngọn núi đồ sộ, lởm chởm nhô thẳng ra khỏi đại dương đóng băng, với những làng chài nhỏ bé chen chúc trên bất cứ tảng đá bằng phẳng nào còn sót lại. Nó trông giống như rìa xa tuyệt đối của thế giới có thể sinh sống được, đó chính xác là lý do tại sao tôi cần phải xem nó.",
          signature: "Bên trên Vòng Cực Bắc"
        },
        "Tromsø": {
          title: "Sống Trong Bóng Tối",
          body: "Ở xa đến mức này về phía bắc làm thay đổi cơ bản cách bạn trải nghiệm thời gian và ánh sáng. Tôi bị cuốn hút bởi tâm lý của một cộng đồng sống trong một phần đáng kể của năm trong bóng tối vùng cực hoàn toàn, chờ đợi bầu trời bùng cháy với cực quang.",
          signature: "Dưới ánh Cực Quang"
        }
      }
    },
    Iran: {
      name: "Iran",
      flag: "ir",
      caption: "Một nền văn minh đồ sộ, cổ đại nơi kiến trúc có cảm giác giống như toán học trực quan.",
      cities: ["Isfahan", "Tehran", "Shiraz", "Yazd"],
      letters: {
        "Isfahan": {
          title: "Toán Học Trực Quan",
          body: "Kiến trúc ở đây về cơ bản là toán học trực quan. Tôi đã nhìn chằm chằm vào những bức ảnh về trần nhà lát gạch ở các quảng trường chính, và độ chính xác hình học quá phức tạp đến mức nó gần như trông giống kỹ thuật số. Tôi cần phải đứng bên trong những mái vòm đó để xem bàn tay con người có thực sự xây dựng nên chúng hay không.",
          signature: "Mê mẩn bởi lịch sử"
        },
        "Tehran": {
          title: "Siêu Đô Thị Núi",
          body: "Điều thu hút tôi ở đây chính là quy mô tuyệt đối của nó. Bạn có một siêu đô thị đồ sộ, tắc nghẽn, bị trừng phạt nặng nề với hàng triệu người sống ngay dưới chân những ngọn núi phủ tuyết. Cảm giác như một thành phố chứa đầy những mâu thuẫn lớn mà bạn chỉ có thể hiểu được khi thực sự đặt chân đến đó.",
          signature: "Một cuộc thám hiểm tương lai"
        },
        "Shiraz": {
          title: "Tôn Kính Ngôn Từ",
          body: "Thật hiếm thấy một nền văn hóa nào mà các nhà thơ cổ điển lại được đối xử như những ngôi sao nhạc rock hiện đại. Tôi bị thu hút bởi ý tưởng rằng mọi người vẫn tụ tập tại lăng mộ của những nhà văn đã khuất hàng thế kỷ trước chỉ để ngâm thơ. Điều đó cho thấy sự tôn trọng sâu sắc của xã hội đối với nghệ thuật và ngôn ngữ.",
          signature: "Trong những khu vườn"
        },
        "Yazd": {
          title: "Kỹ Thuật Cổ Đại",
          body: "Rất lâu trước khi có máy điều hòa không khí, người dân ở đây đã thiết kế những tháp đón gió khổng lồ để kéo những làn gió mát xuống những tòa nhà bằng gạch bùn. Là một người quan tâm đến cách các hệ thống hoạt động, việc nhìn thấy một thành phố sa mạc đã tìm ra cách kiểm soát khí hậu bền vững từ hàng nghìn năm trước thực sự rất ngầu đối với tôi.",
          signature: "Ốc đảo trong cát"
        }
      }
    },
    India: {
      name: "Ấn Độ",
      flag: "in",
      caption: "Sự bùng nổ của các giác quan, nơi mà nhiều thế kỷ dường như đang diễn ra cùng một lúc.",
      cities: ["Delhi", "Varanasi", "Jaipur", "Kochi"],
      letters: {
        "Delhi": {
          title: "Bảy Tầng Thành Phố",
          body: "Người ta nói rằng nơi này thực chất là bảy thành phố lịch sử khác nhau được xây dựng chồng lên nhau. Tôi bị lôi cuốn bởi bề dày lịch sử dày đặc và hỗn loạn đó, nơi bạn có thể bước ra khỏi một nhà ga tàu điện ngầm siêu hiện đại và ngay lập tức vấp phải một lăng mộ Mughal hàng trăm năm tuổi.",
          signature: "Giữa những ồn ào"
        },
        "Varanasi": {
          title: "Dòng Sông Chân Thật",
          body: "Có rất ít nơi trên thế giới đối mặt với sinh tử một cách cởi mở như thành phố này. Cường độ tâm linh của những người tìm đến dòng sông để tắm gội, cầu nguyện và hỏa táng người chết trong cùng một không gian mang lại cảm giác choáng ngợp. Đó là loại cú sốc văn hóa buộc bạn phải thay đổi góc nhìn của mình.",
          signature: "Bên dòng sông linh thiêng"
        },
        "Jaipur": {
          title: "Thiết Kế Và Sự Hiếu Khách",
          body: "Toàn bộ khu trung tâm thành phố đã được sơn màu hồng vào những năm 1800 chỉ để chào đón một vị vua ngoại quốc, và họ cứ thế giữ nguyên như vậy. Tôi thích việc tính thẩm mỹ và lòng hiếu khách được in sâu vào bản sắc của thành phố đến nhường nào, đặc biệt là những mặt tiền phức tạp được thiết kế chỉ để điều hướng gió.",
          signature: "Nhật ký Rajasthan"
        },
        "Kochi": {
          title: "Ngã Tư Đường Tĩnh Lặng",
          body: "Nhờ tuyến đường giao thương gia vị cổ đại, bờ biển phía nam này đã trở thành một thỏi nam châm thu hút những thế giới hoàn toàn khác biệt. Bạn có thể tìm thấy các nhà thờ Bồ Đào Nha, những chiếc lưới đánh cá của người Hoa và một giáo đường Do Thái ngay trong cùng một khu phố nhiệt đới. Đây là một ngã tư giao thoa yên tĩnh, đầy hấp dẫn của lịch sử toàn cầu.",
          signature: "Cơn gió phương nam"
        }
      }
    },
    Malaysia: {
      name: "Malaysia",
      flag: "my",
      caption: "Bậc thầy trong việc pha trộn văn hóa, nơi rừng rậm liên tục đe dọa nuốt chửng các tòa nhà chọc trời.",
      cities: ["Kuala Lumpur", "Penang", "Malacca", "Kota Kinabalu"],
      letters: {
        "Kuala Lumpur": {
          title: "Sự Thăng Tiến Nhanh Chóng",
          body: "Thành phố này đã đi từ một thị trấn khai thác thiếc lầy lội trở thành một đường chân trời tương lai chỉ trong chớp mắt. Tốc độ phát triển của nó thật đáng kinh ngạc, nhưng nó vẫn giữ lại những mảng rừng rậm sâu thẳm và kiến trúc thuộc địa cũ ngay dưới những tòa tháp khổng lồ.",
          signature: "Trong khu rừng đô thị"
        },
        "Penang": {
          title: "Lịch Sử Thông Qua Ẩm Thực",
          body: "Nếu bạn muốn hiểu sự di cư định hình văn hóa như thế nào, hãy nhìn vào đồ ăn. Ở đây, ảnh hưởng của người Mã Lai, Trung Quốc và Ấn Độ đã giao thoa qua nhiều thế hệ trong một thị trấn cảng thuộc địa đang mục nát. Tôi muốn đến đó chỉ để trải nghiệm sự pha trộn văn hóa sâu sắc đó thực sự có hương vị như thế nào.",
          signature: "Một cuộc hành hương ẩm thực"
        },
        "Malacca": {
          title: "Điểm Nghẽn Hàng Hải",
          body: "Trong nhiều thế kỷ, bất cứ ai kiểm soát eo biển hẹp này về cơ bản đều kiểm soát thương mại toàn cầu. Đi bộ qua thị trấn đồng nghĩa với việc nhìn thấy những vết sẹo kiến trúc để lại bởi các đế chế Bồ Đào Nha, Hà Lan và Anh, những người đều đã chiến đấu để nắm giữ mảnh đất chiến lược nhỏ bé này.",
          signature: "Bên eo biển"
        },
        "Kota Kinabalu": {
          title: "Vùng Hoang Dã Đô Thị",
          body: "Rất hiếm khi tìm thấy một thành phố hiện đại mang lại cảm giác như nó chỉ đang chịu đựng khu rừng bao quanh. Thực tế là bạn có thể đang đứng trong một trung tâm đô thị sầm uất mà vẫn nhìn thấy một trong những đỉnh núi cao nhất Đông Nam Á hiện lờ mờ ở phía sau, mang lại cho nơi này một vẻ hoang dã rất ấn tượng.",
          signature: "Thời gian trên đảo"
        }
      }
    },
    Japan: {
      name: "Nhật Bản",
      flag: "jp",
      caption: "Điểm giao thoa tối thượng giữa việc bảo tồn lịch sử sâu sắc và động lực công nghệ không ngừng nghỉ.",
      cities: ["Kyoto", "Tokyo", "Kanazawa", "Osaka"],
      letters: {
        "Kyoto": {
          title: "Mục Tiêu Ngôn Ngữ",
          body: "Tôi đã dành nhiều năm học tiếng Nhật, hướng đến sự nghiệp kết nối công nghệ giữa Việt Nam và Nhật Bản. Cuối cùng được dạo bước qua cố đô được bảo tồn qua bao thế kỷ chiến tranh, và thực sự có thể đọc được các bảng hiệu cũng như nói chuyện với người dân địa phương một cách tự nhiên, sẽ là sự hiện thực hóa của một mục tiêu cá nhân khổng lồ.",
          signature: "Một giấc mơ để hiện thực hóa"
        },
        "Tokyo": {
          title: "Phép Màu Kỹ Thuật",
          body: "Là một nhà phát triển phần mềm, thành phố này đại diện cho đỉnh cao của các hệ thống phức tạp hoạt động hoàn hảo. Việc di chuyển ba mươi triệu người mỗi ngày mà cơ sở hạ tầng không bị sụp đổ là một phép màu. Tôi muốn trực tiếp trải nghiệm động lực không ngừng nghỉ đó trước khi tôi bắt đầu làm việc tại đó.",
          signature: "Một mục tiêu của tôi"
        },
        "Kanazawa": {
          title: "Kỷ Nguyên Nguyên Vẹn",
          body: "Vì phần lớn được tha khỏi các cuộc ném bom trong chiến tranh, đây là một trong số ít những nơi mà toàn bộ khu vực của các samurai và geisha vẫn còn nguyên vẹn hoàn toàn. Tôi là một người đam mê lịch sử to lớn, vì vậy ý tưởng đi bộ xuống những con phố chưa hề thay đổi bố cục kể từ thời Edo cực kỳ hấp dẫn đối với tôi.",
          signature: "Từ những khu phố cổ"
        },
        "Osaka": {
          title: "Người Anh Em Ồn Ào",
          body: "Mọi thứ tôi đọc được đều nói rằng văn hóa ở đây hoàn toàn trái ngược với sự dè dặt, lịch sự của Tokyo. Nó ồn ào, ám ảnh với đồ ăn và độc lập một cách quyết liệt. Tôi thực sự tò mò muốn trải nghiệm sự tương phản rõ rệt đó trong tính cách khu vực của một quốc gia mà những người bên ngoài thường cho là hoàn toàn đồng nhất.",
          signature: "Kuidaore (Ăn cho đến sập)"
        }
      }
    },
    Mexico: {
      name: "Mexico",
      flag: "mx",
      caption: "Sự va chạm rực rỡ giữa nguồn gốc bản địa và lịch sử thuộc địa, được xây dựng trên những khu rừng rậm và những hồ nước đang chìm.",
      cities: ["Mexico City", "Oaxaca", "Mérida", "Tulum"],
      letters: {
        "Mexico City": {
          title: "Siêu Đô Thị Đang Chìm",
          body: "Người Tây Ban Nha thực sự đã lấp đi một hòn đảo thủ đô của người Aztec nằm ngay giữa một hồ nước rộng lớn để xây dựng nơi này. Cũng bởi vậy, toàn bộ siêu đô thị đang chìm dần xuống. Tôi cảm thấy mê mẩn với việc làm thế nào một thành phố gánh chịu nhiều di sản lịch sử và địa lý như thế lại có thể giữ vị thế thống trị về văn hóa.",
          signature: "CDMX Vẫy Gọi"
        },
        "Oaxaca": {
          title: "Mỏ Neo Văn Hóa",
          body: "Miền Nam Mexico giống như mỏ neo văn hóa của cả đất nước. Những truyền thống bản địa ở đây không hề bị xóa nhòa; chúng tiến hóa và tác động mạnh mẽ lên nghệ thuật cũng như hệ thống ẩm thực cực kỳ phức tạp. Cảm giác như đây là một nơi mà bạn có thể học được rất nhiều thứ chỉ bằng cách quan sát người dân đang nấu gì.",
          signature: "Trái Tim Miền Nam"
        },
        "Mérida": {
          title: "Nền Văn Minh Trên Đá Vôi",
          body: "Địa lý vùng Yucatán hoàn toàn là đá vôi xốp, nghĩa là không hề có sông suối — chỉ có hàng ngàn hố sụt ngầm chứa nước ngọt (cenotes). Người Maya đã xây dựng nền văn minh của họ xoay quanh những hố nước đó. Tôi bị cuốn hút bởi việc lịch sử và con người nơi đây phụ thuộc hoàn toàn vào kiểu địa chất kỳ lạ, mỏng manh này.",
          signature: "Cái Nóng Yucatán"
        },
        "Tulum": {
          title: "Pháo Đài Trên Vách Đá",
          body: "Hầu hết các tàn tích cổ đại đều bị vùi sâu trong những khu rừng rậm hoặc núi cao, nhưng người Maya lại xây dựng một pháo đài bằng đá đồ sộ ngay sát mép vách đá hướng ra biển Caribe. Tôi rất tò mò muốn xem một trung tâm giao thương cổ đại hùng mạnh trông thực sự như thế nào khi được đặt ở một nơi tựa như thiên đường.",
          signature: "Bên Bờ Caribe"
        }
      }
    },
    Colombia: {
      name: "Colombia",
      flag: "co",
      caption: "Đất nước của những biến đổi địa hình khắc nghiệt, nơi dãy Andes đổ dốc thẳng xuống vùng biển Caribe.",
      cities: ["Bogotá", "Medellín", "Cartagena", "Salento"],
      letters: {
        "Bogotá": {
          title: "Sống Ở Độ Cao 8.000 Feet",
          body: "Nằm ở độ cao hơn tám nghìn feet trên dãy Andes, thủ đô này còn cao hơn hầu hết các khu nghỉ dưỡng trượt tuyết. Tôi thực sự tò mò về cách toàn bộ một xã hội có thể vận hành ở độ cao khắc nghiệt như vậy, hòa quyện giữa những tòa nhà gạch đô thị hiện đại, san sát nhau với bầu không khí núi cao lạnh giá, loãng nhạt.",
          signature: "Tít Trên Dãy Andes"
        },
        "Medellín": {
          title: "Sự Chuyển Mình Của Thành Phố",
          body: "Ba mươi năm trước, nơi này được coi là một trong những thành phố nguy hiểm nhất hành tinh. Ngày nay, nó được tôn vinh vì sử dụng hệ thống giao thông công cộng sáng tạo để kết nối các khu dân cư nghèo nhất trên sườn núi với trung tâm thành phố. Với tư cách là một người luôn đánh giá cao việc giải quyết vấn đề, một sự chuyển mình về mặt dân sự như vậy thực sự truyền rất nhiều cảm hứng.",
          signature: "Góc Nhìn Thung Lũng"
        },
        "Cartagena": {
          title: "Hầm Chứa Hoàng Gia",
          body: "Đây từng là cảng chính nơi người Tây Ban Nha tích trữ số vàng cướp bóc được trước khi chuyển về Châu Âu. Những bức tường đá khổng lồ được xây dựng để đẩy lùi cướp biển vẫn còn sừng sững. Tôi thích ý tưởng khám phá một thành phố Caribe được thiết kế về cơ bản giống như một hầm chứa ngân hàng không thể xuyên thủng.",
          signature: "Phép Màu Caribe"
        },
        "Salento": {
          title: "Những Cây Cọ Khổng Lồ",
          body: "Cảnh quan nơi đây làm đảo lộn hoàn toàn cảm nhận của bạn về không gian. Đó là một khu rừng sương mù ở độ cao lớn với những cây cọ cao nhất thế giới, vươn cao gần hai trăm feet vút lên trong sương. Trông như một lỗi hiển thị (glitch) của tự nhiên, điều này càng khiến tôi muốn một lần được cất bước đi qua nơi đó.",
          signature: "Bên Tách Cà Phê Ấm"
        }
      }
    },
    Egypt: {
      name: "Ai Cập",
      flag: "eg",
      caption: "Nền văn minh kỳ vĩ được chạm khắc hoàn toàn từ sa mạc, phụ thuộc hoàn toàn vào nhịp đập của sông Nile.",
      cities: ["Cairo", "Luxor", "Alexandria", "Aswan"],
      letters: {
        "Cairo": {
          title: "Chèn Ép Lên Quá Khứ",
          body: "Điều làm tôi kinh ngạc là các Kim Tự Tháp không hề nằm lẻ loi giữa sa mạc hoang vu; mà sự ngổn ngang của một siêu đô thị hai mươi triệu dân lại vươn tới ngay sát chân của chúng. Sự cọ xát giữa thế giới hiện đại hỗn loạn áp sát trực tiếp vào những lăng mộ cổ đại chính là điều tôi muốn tận mắt nhìn thấy.",
          signature: "Bị Cuốn Vào Sa Mạc"
        },
        "Luxor": {
          title: "Bảo Tàng Ngoài Trời",
          body: "Khoảng một phần ba các di tích cổ đại của thế giới tập trung quanh đúng một khúc quanh này của dòng sông. Về cơ bản, nó là một bảo tàng ngoài trời có quy mô bằng cả một thành phố. Ý tưởng rằng bạn có thể thong thả bước ngang qua những cây cột khổng lồ đã đứng sừng sững hàng thiên niên kỷ thật khó để mà lĩnh hội được.",
          signature: "Say Mê Quá Khứ"
        },
        "Alexandria": {
          title: "Bộ Não Đã Mất",
          body: "Nơi đây từng là trung tâm tri thức của thế giới cổ đại, quê hương của Thư viện vĩ đại. Dù cho những tàn tích lịch sử không còn, tôi vẫn bị thu hút bởi bầu không khí Địa Trung Hải của một nơi đã dành hàng thế kỷ để làm bộ não của nền văn minh nhân loại.",
          signature: "Ước Nguyện Lịch Sử"
        },
        "Aswan": {
          title: "Ranh Giới Sắc Nét",
          body: "Địa lý quyết định mọi thứ ở đây. Bạn có thể đứng trên bờ sông Nile và nhìn thấy ranh giới chính xác nơi thảm thực vật xanh tươi đột ngột kết thúc và sa mạc Sahara khắc nghiệt, vô tận bắt đầu. Tôi muốn trải nghiệm ranh giới vật lý sắc nét đó, nơi giới hạn sự sống còn có thể tồn tại.",
          signature: "Đứng Đợi Dòng Sông"
        }
      }
    },
    Russia: {
      name: "Nga",
      flag: "ru",
      caption: "Một vùng đất rộng lớn, bí ẩn sử dụng quy mô vật lý tuyệt đối và những mùa đông khắc nghiệt để phô trương sức mạnh.",
      cities: ["Moscow", "Saint Petersburg", "Dagestan", "Vladivostok"],
      letters: {
        "Moscow": {
          title: "Sức Nặng Của Nhà Nước",
          body: "Kiến trúc ở đây được thiết kế để khiến bạn cảm nhận được sức nặng của nhà nước. Ngay cả các trạm tàu điện ngầm cũng được xây dựng để trông giống như những cung điện dưới lòng đất. Tôi bị cuốn hút bởi những nơi sử dụng cơ sở hạ tầng và quy mô vật lý của mình để phô trương quyền lực và lịch sử một cách mạnh mẽ như vậy.",
          signature: "Giấc Mơ Mùa Đông"
        },
        "Saint Petersburg": {
          title: "Thủ Đô Bị Ép Buộc",
          body: "Peter Đại đế về cơ bản đã ép buộc một thủ đô kiểu châu Âu mọc lên từ một khu đầm lầy đóng băng, không thể ở được chỉ để chứng minh một quan điểm. Vì được lên kế hoạch quá chi tiết, thành phố có một sự đối xứng đầy ám ảnh, không tự nhiên, đặc biệt là vào mùa hè khi mặt trời không bao giờ lặn hoàn toàn.",
          signature: "Bị Thu Hút Bởi Nghệ Thuật"
        },
        "Dagestan": {
          title: "Sự Đa Dạng Bị Ẩn Giấu",
          body: "Hầu hết mọi người không nhận ra rằng dãy núi Kavkaz che giấu hàng chục nhóm dân tộc và ngôn ngữ riêng biệt trong một khu vực rất nhỏ. Sự cô lập của những ngôi làng dốc đứng này đã bảo tồn những lối sống cổ xưa mà tôi rất muốn học hỏi trực tiếp, tránh xa các tuyến đường du lịch thông thường.",
          signature: "Tiến Vào Dãy Núi"
        },
        "Vladivostok": {
          title: "Rìa Của Lục Địa",
          body: "Mất đến bảy ngày đi tàu từ Moscow chỉ để đến được đây. Ý tưởng về một thành phố hải quân kiểu châu Âu lớn nằm vắt vẻo ở rìa tận cùng của châu Á, nhìn ra Thái Bình Dương, là một sự bất thường về địa lý mà tôi thấy vô cùng tò mò.",
          signature: "Cuối Chặng Đường"
        }
      }
    },
    Czechia: {
      name: "Cộng Hòa Séc",
      flag: "cz",
      caption: "Một kho lưu trữ kiến trúc dày đặc ở trung tâm Châu Âu bằng cách nào đó đã sống sót qua nhiều thế kỷ xung đột.",
      cities: ["Prague", "Český Krumlov", "Mariánské Lázně", "Brno"],
      letters: {
        "Prague": {
          title: "Dòng Thời Gian Không Bị Phá Vỡ",
          body: "Khác với nhiều thủ đô châu Âu, thành phố này phần lớn đã sống sót nguyên vẹn qua các cuộc chiến tranh thế giới. Đi dạo xung quanh đồng nghĩa với việc thực sự nhìn thấy một dòng thời gian chân thực, không bị đứt đoạn của kiến trúc Gothic, Phục hưng và Baroque. Nó về cơ bản là một kho lưu trữ kiến trúc khổng lồ chưa từng bị ném bom hay xây dựng lại.",
          signature: "Một Giấc Mơ Bohemian"
        },
        "Český Krumlov": {
          title: "Được Bảo Tồn Nhờ Bị Bỏ Quên",
          body: "Vì bị phớt lờ và phần lớn bị lãng quên trong Chiến tranh Lạnh, thị trấn này vô tình bảo tồn hoàn hảo cách bố trí thời trung cổ của mình. Thật hấp dẫn khi việc hoàn toàn bị phát triển hiện đại bỏ quên cuối cùng lại có thể trở thành tài sản lịch sử lớn nhất của một nơi.",
          signature: "Lạc Trong Truyện Cổ Tích"
        },
        "Mariánské Lázně": {
          title: "Khu Nghỉ Dưỡng Của Giới Quý Tộc",
          body: "Tôi bị hấp dẫn bởi nền văn hóa kỳ lạ, xa hoa của thế kỷ 19, nơi giới tinh hoa châu Âu sẽ đi du lịch đến những thung lũng rừng hẻo lánh chỉ để uống nước khoáng. Thị trấn này về cơ bản là một tượng đài được bảo tồn hoàn hảo cho sức khỏe lịch sử và cách nghỉ ngơi của giới quý tộc cũ.",
          signature: "Tìm Kiếm Sự Yên Tĩnh"
        },
        "Brno": {
          title: "Chức Năng Hơn Truyện Cổ Tích",
          body: "Trong khi thủ đô thu hút mọi sự chú ý vì trông giống như một câu chuyện cổ tích, thành phố này lại nổi tiếng với kiến trúc hiện đại thô mộc và các hệ thống đường hầm ngầm khổng lồ. Tôi luôn thích đến thăm những thành phố hạng hai thực sự mang lại cảm giác sống động và ưu tiên chức năng hơn là phục vụ đám đông.",
          signature: "Nơi Ít Người Qua Lại"
        }
      }
    }
  }
};
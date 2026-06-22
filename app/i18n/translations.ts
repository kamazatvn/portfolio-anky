export type Lang = "en" | "vi";

// ─── English ──────────────────────────────────────────────────────────────────
const en = {
  seo: {
    title: "Anky | Music Producer & DJ",
    description:
      "Official portfolio of Anky — music producer and DJ specializing in hip-hop, R&B, and electronic music. Based in Prague, Czech Republic.",
  },
  nav: {
    about: "About",
    portfolio: "Portfolio",
    book: "Book",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    label: "Anky",
    heading: "MUSIC PRODUCER · DJ",
    p1: "I MAKE MUSIC IN TWO WORLDS, ON ONE SIDE, THERE'S HIPHOP AND R&B WITH THE VIBE, 808s, AND BEATS BUILT TO GIVE ARTISTS ROOM TO PERFORM. MY JOB IS TO CREATE A SPACE WHERE YOU CAN EXPRESS YOURSELF FREELY AND TRULY. ON THE OTHER SIDE, THERE'S ELECTRONIC MUSIC WITH A LOT OF SOUND DESIGNS AND HEAVY BASS. TWO DIFFERENT ENERGIES, BUT THE SAME GOAL: MUSIC THAT YOU CAN F*CKING FEEL, NOT SOME AI BULLSH*T",
    p2: "Whatever I'm working on, it always comes back to atmosphere. When you listen to one of my tracks or catch one of my sets, I want you to instantly picture the world you're standing in — the lights, the space, the mood. I've always loved the cinematic side of sound, the way a single texture or tone can tell a whole story before the first lyric even lands. That feeling is what I chase in every project.",
    contactMe: "Contact Me",
    fullStory: "Full Story",
  },
  footer: {
    tagline: "Music Producer & DJ — Praha",
    poweredBy: "Powered by Lohi5 Production",
  },
  releases: {
    sectionTitle: "Latest Releases",
    viewAll: "View All →",
    track: "Track",
    tracks: "Tracks",
  },
  newsletter: {
    eyebrow: "Stay Connected",
    headingLine1: "STAY IN",
    headingLine2: "THE LOOP",
    body: "New drops, tour dates, and exclusive content — direct to your inbox.",
    subscribe: "Subscribe →",
    success: "You're on the list. Stay tuned for the next drop. ✓",
  },
  about: {
    eyebrow: "About",
    headingLine1: "DO",
    headingLine2: "WHAT YOU",
    headingLine3: "FEEL",
    p1: "ANKY is a multi-genre music producer, DJ, and sound engineer originally from Vietnam and now based in Prague, Czech Republic. With over eight years in the music industry, he has built a reputation for versatility, moving comfortably between hip-hop, R&B, and electronic music. Whether in the studio or behind the decks, his focus stays the same: crafting sound that connects with people instantly.",
    p2: "In person, ANKY is naturally calm, with a clean and minimalistic style, but his music tells a different story. On stage and in the studio, he delivers a colorful, high-energy experience that gets crowds moving and keeps them there. Over the years, he has collaborated with many well-known artists in both Vietnam and the Czech Republic. That mix of quiet confidence and bold sound has become his signature.",
    p3: "ANKY's mission goes beyond making great tracks. His ultimate goal is to beautifully blend modern electronic music with traditional Vietnamese styles and elements, creating a sound that belongs to him alone. He believes these two worlds aren't opposites. They're a perfect match waiting to happen. Through every release and every set, he's working to bring that unique sound to the global stage.",
    philosophy: "Philosophy",
    philosophyQuote:
      "“Good music creates a world of its own. My focus is entirely on atmosphere and feeling. I design sounds and produce tracks meant to be experienced fully, giving the listener a cinematic space where they can instantly imagine themselves and just let go.”",
    philosophyBody:
      "To build these spaces, I rely on contrast. I love blending the heavy, modern energy of electronic music with the deep, traditional textures of my Vietnamese roots. While my personal approach in the studio is calm and minimalist, the sound itself is designed to be colorful and full of life, giving the audience a wonderful place where they can move freely, feel the bass, and completely connect with the moment.",
    poweredBy: "Powered by",
    yearsActive: "Years Active",
    tracksProduced: "Tracks Produced",
    livePerformances: "Live Performances",
  },
  career: {
    eyebrow: "Career",
    stats: {
      yearsActive: "Years Active",
      tracksProduced: "Tracks Produced",
      livePerformances: "Live Performances",
      studioAlbums: "Studio Albums",
    },
    milestones: [
      { year: "2017", event: "Debut EP released — immediate reception from the underground circuit." },
      { year: "2019", event: "First international booking at [Festival Name], [Country]." },
      { year: "2021", event: "Collaborative LP with [Artist Name] — critically acclaimed release." },
      { year: "2023", event: "Headlined [Venue / Event Name] — sold out in 48 hours." },
      { year: "2024", event: "Released Dark Continuum — 10-track studio album." },
    ],
  },
  book: {
    eyebrow: "Bookings & Collaborations",
    headingLine1: "WORK",
    headingLine2: "WITH",
    headingLine3: "ANKY",
    djDesc:
      "Hip-hop DJ performing at events and venues across Prague — blending hip-hop, R&B, and street culture into high-energy live sets built for the room.",
    producerDesc:
      "Music producer working with a wide range of artists across Vietnam and the Czech Republic. Available for studio sessions, co-productions, beatmaking, mixing, and creative direction.",
    getInTouch: "Get In Touch",
  },
  artists: {
    sectionTitle: "Featured Artists",
    andMore: "…and many more",
    listenOnSpotify: "Listen on Spotify",
    close: "Close",
    bios: {
      LOWG: "One of Vietnam's most dynamic rap artists, LOWG blends sharp lyricism with melodic sensibility. Anky's production crafted the atmospheric undertones that have become a hallmark of LOWG's studio sound.",
      "7DNIGHT":
        "7DNIGHT is a multi-layered R&B act known for emotionally charged vocals and cinematic production. Their collaboration with Anky spans multiple releases, each pushing the boundaries of Vietnamese contemporary R&B.",
      BLACKA:
        "BLACKA is one of Vietnam's foremost hip-hop voices, delivering hard-hitting tracks with undeniable presence. Anky's production brings a dark, textured backdrop that amplifies BLACKA's commanding delivery.",
      "MARTIN MATYS":
        "Prague-based Martin Matys is a forward-thinking electronic artist whose work sits at the intersection of deep house and contemporary techno. His collaboration with Anky reflects a shared commitment to dancefloor craft.",
      "52HZ":
        "Named after the loneliest whale, 52HZ crafts introspective electronic music that resonates deeply with a generation searching for connection. Anky's contributions add textural depth and rhythmic precision to their releases.",
      "SA MILO":
        "SA MILO is a Vietnamese artist known for blending pop sensibility with electronic edge. Their collaboration with Anky spans both studio productions and live arrangements, building a distinctive crossover sound.",
      TAGE: "TAGE is an emerging voice in Vietnam's rap scene, known for raw energy and an unfiltered approach to storytelling. Anky's production gives TAGE's visceral delivery a polished, hard-hitting sonic foundation.",
    } as Record<string, string>,
  },
  events: {
    sectionTitle: "Past Events",
    shows: "shows",
    columns: {
      date: "Date",
      event: "Event",
      with: "With",
      venue: "Venue",
    },
  },
  portfolio: {
    eyebrow: "Portfolio",
    headingLine1: "MULTI-GENRE",
    headingLine2: "PRODUCER",
    headingLine3: "& DJ",
  },
  contact: {
    eyebrow: "Get In Touch",
    headingLine1: "FIND",
    headingLine2: "THE",
    headingLine3: "STUDIO",
  },
  contactDetails: {
    studioAddress: "Studio Address",
    phone: "Phone",
    email: "Email",
    getDirections: "Get Directions",
  },
  booking: {
    eyebrow: "Bookings & Inquiries",
    headingLine1: "LET’S",
    headingLine2: "WORK",
    body: "Available for DJ sets, studio sessions, co-productions, and creative collaborations. Fill in the form and I’ll get back to you within 48 hours.",
    labels: {
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service Type",
      message: "Message",
    },
    placeholders: {
      name: "Your full name",
      email: "you@example.com",
      phone: "773 115 935",
      service: "Select a service…",
      message: "Tell me about your project, event, or idea…",
    },
    services: [
      "DJ Performance",
      "Music Production",
      "Co-Production",
      "Mixing & Mastering",
      "Beat Licensing",
      "Creative Consultation",
      "Other",
    ],
    validation: {
      nameRequired: "Full name is required.",
      emailRequired: "Email address is required.",
      emailInvalid: "Please enter a valid email address.",
      phoneRequired: "Phone number is required.",
      serviceRequired: "Please select a service.",
      messageRequired: "Message is required.",
      allRequired: "Please fill out all required fields before sending.",
      errorSend: "Something went wrong — please try again or email",
      directly: "directly.",
    },
    submit: {
      send: "Send Message",
      sending: "Sending…",
      another: "Send another message",
    },
    success: {
      heading: "Message Sent.",
      body: "Thank you! Your message has been sent directly to Anky. Expect a reply within 48 hours.",
    },
    studio: "Studio",
    phone: "Phone",
    responseTime: "Response within 48 hours",
  },
};

// ─── Vietnamese ───────────────────────────────────────────────────────────────
const vi: typeof en = {
  seo: {
    title: "Anky | Nhạc Sĩ Sản Xuất & DJ",
    description:
      "Portfolio chính thức của Anky — nhạc sĩ sản xuất và DJ chuyên về hip-hop, R&B và âm nhạc điện tử. Đặt tại Prague, Cộng hòa Séc.",
  },
  nav: {
    about: "Giới Thiệu",
    portfolio: "Portfolio",
    book: "Book",
    contact: "Liên Hệ",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
  },
  hero: {
    label: "Anky",
    heading: "NHẠC SĨ SẢN XUẤT · DJ",
    p1: "MÌNH LÀM NHẠC CHO HAI THẾ GIỚI, MỘT BÊN LÀ HIPHOP VÀ R&B, CÓ 808 VÀ CÁC ĐOẠN BEAT ĐƯỢC TẠO RA ĐỂ CHO NGHỆ SĨ CÓ ĐỦ KHÔNG GIAN THỂ HIỆN. NHIỆM VỤ CỦA MÌNH LÀ TẠO RA MỘT KHÔNG GIAN NƠI BẠN CÓ THỂ ĐƯỢC THỂ HIỆN BẢN THÂN MÌNH MỘT CÁCH TỰ DO. BÊN KIA LÀ ÂM NHẠC ĐIỆN TỬ, TẬP CHUNG VÀO SOUND DESIGN VÀ BASS. HAI NGUỒN NĂNG LƯỢNG KHÁC NHAU, NHƯNG CÙNG MỘT MỤC TIÊU ĐÓ LÀ: ÂM NHẠC MÀ BẠN CÓ THỂ THỰC SỰ CẢM NHẬN ĐƯỢC.",
    p2: "DÙ ĐANG LÀM GÌ, MÌNH LUÔN QUAY VỀ VỚI CHIỀU SÂU CỦA BẦU KHÔNG KHÍ, KHI BẠN NGHE MỘT BÀI NHẠC CỦA MÌNH HAY BẤT CỨ KHI NÀO MÌNH DIỄN, MÌNH LUÔN MUỐN BẠN CÓ THỂ HÌNH DUNG RA THẾ GIỚI MÌNH ĐANG ĐỨNG TRONG ĐÓ: ÁNH ĐÈN, KHÔNG GIAN, TÂM TRẠNG. MÌNH LUÔN YÊU THÍCH CHIỀU SÂU CỦA ÂM THANH, CÁCH MÀ MỘT KẾT CẤU HAY ÂM SẮC CÓ THỂ KỂ CẢ MỘT CÂU CHUYỆN TRƯỚC KHI CÓ VOCAL. ĐÓ LÀ CẢM GIÁC TÔI LUÔN THEO ĐUỔI TRONG MỖI DỰ ÁN.",
    contactMe: "Contact me",
    fullStory: "Câu Chuyện",
  },
  footer: {
    tagline: "Nhạc Sĩ Sản Xuất & DJ — Praha",
    poweredBy: "Vận Hành Bởi Lohi5 Production",
  },
  releases: {
    sectionTitle: "Phát Hành Mới Nhất",
    viewAll: "Xem Tất Cả →",
    track: "Bài Hát",
    tracks: "Bài Hát",
  },
  newsletter: {
    eyebrow: "Kết Nối",
    headingLine1: "CẬP NHẬT",
    headingLine2: "MỚI NHẤT",
    body: "Phát hành mới, lịch diễn, và nội dung độc quyền — thẳng đến hộp thư của bạn.",
    subscribe: "Đăng Ký →",
    success: "Bạn đã được thêm vào danh sách. Đón chờ những điều sắp tới. ✓",
  },
  about: {
    eyebrow: "Giới Thiệu",
    headingLine1: "HÃY",
    headingLine2: "LÀM THEO",
    headingLine3: "CẢM XÚC",
    p1: "ANKY LÀ MỘT NHẠC SĨ SẢN XUẤT ĐA THỂ LOẠI, DJ VÀ KỸ SƯ ÂM THANH CÓ GỐC GÁC TỪ VIỆT NAM VÀ HIỆN ĐANG SINH SỐNG TẠI PRAGUE, CỘNG HÒA SÉC. VỚI HƠN TÁM NĂM TRONG NGÀNH ÂM NHẠC, ANH ĐÃ XÂY DỰNG DANH TIẾNG VỀ SỰ ĐA NĂNG, DI CHUYỂN THOẢI MÁI GIỮA HIPHOP, R&B VÀ ÂM NHẠC ĐIỆN TỬ. DÙ TRONG PHÒNG THU HAY SAU BÀN DJ, MỤC TIÊU CỦA ANH VẪN NHẤT QUÁN: TẠO RA ÂM THANH KẾT NỐI MỌI NGƯỜI VỚI NHAU.",
    p2: "TRONG CUỘC SỐNG, ANKY VỐN ĐIỀM TĨNH VỚI PHONG CÁCH GỌN GÀNG, TỐI GIẢ, NHƯNG ÂM NHẠC CỦA ANH LẠI KỂ MỘT CÂU CHUYỆN KHÁC. TRÊN SÂN KHẤU VÀ TRONG PHÒNG THU, ANH MANG ĐẾN MỘT TRẢI NGHIỆM SỐNG ĐỘNG, ĐẦY NĂNG LƯỢNG. QUA NHIỀU NĂM, ANH ĐÃ HỢP TÁC VỚI NHIỀU NGHỆ SĨ NỔI TIẾNG Ở CẢ VIỆT NAM LẪN CỘNG HÒA SÉC. SỰ KẾT HỢP CÓ PHẦN TƯƠNG PHẢN ĐÓ ĐÃ TRỞ THÀNH DẤU ẤN RIÊNG CỦA ANH.",
    p3: "SỨ MỆNH CỦA ANKY KHÔNG CHỈ DỪNG LẠI Ở VIỆC TẠO RA NHỮNG BẢN NHẠC HAY. MỤC TIÊU CUỐI CÙNG CỦA ANH LÀ HÒA QUYỆN ÂM NHẠC ĐIỆN TỬ HIỆN ĐẠI VỚI CÁC PHONG CÁCH VÀ YẾU TỐ TRUYỀN THỐNG VIỆT NAM MỘT CÁCH TINH TẾ, TẠO NÊN MỘT ÂM THANH CHỈ THUỘC VỀ ANH. ANH TIN RẰNG HAI THẾ GIỚI NÀY KHÔNG ĐỐI LẬP NHAU, CHÚNG LÀ MỘT CẶP HOÀN HẢO ĐANG CHỜ ĐƯỢC KẾT HỢP. QUA MỖI SẢN PHẨM VÀ MỖI BUỔI BIỂU DIỄN, ANH ĐANG TỪNG BƯỚC ĐƯA ÂM THANH ĐỘC ĐÁO ĐÓ LÊN SÂN KHẤU TOÀN CẦU.",
    philosophy: "Triết Lý",
    philosophyQuote:
      "“Âm nhạc hay tạo ra một thế giới riêng. Mình tập trung hoàn toàn vào bầu không khí và cảm xúc. Mình thiết kế âm thanh và sản xuất những bản nhạc được tạo ra để trải nghiệm trọn vẹn, mang đến cho người nghe một không gian cinematic, nơi họ có thể ngay lập tức tưởng tượng bản thân và buông thả hoàn toàn.”",
    philosophyBody:
      "Để tạo ra những không gian đó, mình dựa vào sự tương phản. Mình thích pha trộn năng lượng điện tử hiện đại với những âm thanh truyền thống của nguồn gốc Việt Nam. Trong khi phong cách cá nhân trong phòng thu của mình bình tĩnh và tối giản, bản thân âm thanh lại được thiết kế đầy màu sắc và sinh động, mang đến cho khán giả một không gian tuyệt vời để họ có thể tự do chuyển động, cảm nhận và hoàn toàn hòa mình vào khoảnh khắc.",
    poweredBy: "Vận Hành Bởi",
    yearsActive: "Năm Hoạt Động",
    tracksProduced: "Bản Nhạc Sản Xuất",
    livePerformances: "Buổi Biểu Diễn",
  },
  career: {
    eyebrow: "Sự Nghiệp",
    stats: {
      yearsActive: "Năm Hoạt Động",
      tracksProduced: "Bản Nhạc Sản Xuất",
      livePerformances: "Buổi Biểu Diễn",
      studioAlbums: "Album Phòng Thu",
    },
    milestones: [
      { year: "2017", event: "Ra mắt EP đầu tiên — được đón nhận ngay lập tức từ cộng đồng underground." },
      { year: "2019", event: "Booking quốc tế đầu tiên tại [Tên Festival], [Quốc Gia]." },
      { year: "2021", event: "LP hợp tác với [Tên Nghệ Sĩ] — được giới phê bình đánh giá cao." },
      { year: "2023", event: "Headlined [Tên Địa Điểm / Sự Kiện] — bán hết vé trong 48 giờ." },
      { year: "2024", event: "Phát hành Dark Continuum — album phòng thu 10 bài hát." },
    ],
  },
  book: {
    eyebrow: "Đặt Lịch & Hợp Tác",
    headingLine1: "HỢP TÁC",
    headingLine2: "CÙNG",
    headingLine3: "ANKY",
    djDesc:
      "DJ hip-hop biểu diễn tại các sự kiện và địa điểm khắp Prague ; pha trộn hip-hop, R&B và văn hóa đường phố thành những set live đầy năng lượng được xây dựng cho không gian đó.",
    producerDesc:
      "Nhạc sĩ sản xuất làm việc với nhiều nghệ sĩ đa dạng tại Việt Nam và Cộng hòa Séc. Sẵn sàng cho các buổi thu âm, đồng sản xuất, làm beat, mixing và chỉ đạo sáng tạo.",
    getInTouch: "Liên Hệ Ngay",
  },
  artists: {
    sectionTitle: "Nghệ Sĩ Nổi Bật",
    andMore: "…và nhiều hơn nữa",
    listenOnSpotify: "Nghe Trên Spotify",
    close: "Đóng",
    bios: {
      LOWG: "Một trong những rapper năng động nhất của Việt Nam, LOWG kết hợp lời rap sắc bén với giai điệu tinh tế. Phần sản xuất của Anky tạo nên những nét không khí đặc trưng đã trở thành dấu ấn trong âm thanh phòng thu của LOWG.",
      "7DNIGHT":
        "7DNIGHT là một nghệ sĩ R&B đa chiều, nổi tiếng với giọng hát đầy cảm xúc và phần sản xuất điện ảnh. Sự hợp tác với Anky trải dài nhiều sản phẩm, mỗi tác phẩm đều đẩy xa ranh giới của R&B đương đại Việt Nam.",
      BLACKA:
        "BLACKA là một trong những tiếng nói hàng đầu của hip-hop Việt Nam, mang đến những bài hát đầy uy lực với sức hút không thể phủ nhận. Phần sản xuất của Anky tạo ra một nền âm thanh tối tăm, dày dặn, làm nổi bật phong cách trình diễn mạnh mẽ của BLACKA.",
      "MARTIN MATYS":
        "Martin Matys, nghệ sĩ điện tử có trụ sở tại Prague, là một nghệ sĩ tư duy tiến bộ với tác phẩm nằm ở giao điểm giữa deep house và techno đương đại. Sự hợp tác với Anky thể hiện cam kết chung về nghệ thuật trình diễn trên sàn nhảy.",
      "52HZ":
        "Được đặt theo tên của con cá voi cô đơn nhất thế giới, 52HZ tạo ra những bản nhạc điện tử hướng nội chạm đến trái tim của thế hệ đang tìm kiếm sự kết nối. Những đóng góp của Anky thêm chiều sâu kết cấu và độ chính xác nhịp điệu vào các sản phẩm của họ.",
      "SA MILO":
        "SA MILO là nghệ sĩ Việt Nam nổi tiếng với việc pha trộn cảm giác pop cùng chất điện tử sắc bén. Sự hợp tác với Anky trải dài cả sản xuất phòng thu và dàn dựng live, xây dựng nên âm thanh crossover đặc trưng.",
      TAGE: "TAGE là tiếng nói mới nổi trong làng rap Việt Nam, nổi bật với năng lượng mạnh mẽ và cách kể chuyện không che đậy. Phần sản xuất của Anky mang đến nền tảng âm thanh tinh tế, đầy uy lực cho giọng hát đầy sức sống của TAGE.",
    } as Record<string, string>,
  },
  events: {
    sectionTitle: "Sự Kiện Đã Qua",
    shows: "buổi diễn",
    columns: {
      date: "Ngày",
      event: "Sự Kiện",
      with: "Đơn Vị",
      venue: "Địa Điểm",
    },
  },
  portfolio: {
    eyebrow: "Danh Mục",
    headingLine1: "ĐA THỂ LOẠI",
    headingLine2: "NHẠC SĨ",
    headingLine3: "SẢN XUẤT & DJ",
  },
  contact: {
    eyebrow: "Liên Hệ",
    headingLine1: "TÌM",
    headingLine2: "ĐẾN",
    headingLine3: "STUDIO",
  },
  contactDetails: {
    studioAddress: "Địa Chỉ Studio",
    phone: "Điện Thoại",
    email: "Email",
    getDirections: "Chỉ Đường",
  },
  booking: {
    eyebrow: "Đặt Lịch & Yêu Cầu",
    headingLine1: "HÃY",
    headingLine2: "HỢP TÁC",
    body: "Sẵn sàng cho các set DJ, buổi thu âm, đồng sản xuất và các hợp tác sáng tạo. Điền vào form và tôi sẽ phản hồi trong vòng 48 giờ.",
    labels: {
      fullName: "Họ và Tên",
      email: "Địa Chỉ Email",
      phone: "Số Điện Thoại",
      service: "Loại Dịch Vụ",
      message: "Tin Nhắn",
    },
    placeholders: {
      name: "Họ và tên của bạn",
      email: "ban@email.com",
      phone: "773 115 935",
      service: "Chọn dịch vụ…",
      message: "Hãy cho tôi biết về dự án, sự kiện hoặc ý tưởng của bạn…",
    },
    services: [
      "Biểu Diễn DJ",
      "Sản Xuất Âm Nhạc",
      "Đồng Sản Xuất",
      "Mixing & Mastering",
      "Cấp Phép Beat",
      "Tư Vấn Sáng Tạo",
      "Khác",
    ],
    validation: {
      nameRequired: "Họ và tên là bắt buộc.",
      emailRequired: "Địa chỉ email là bắt buộc.",
      emailInvalid: "Vui lòng nhập địa chỉ email hợp lệ.",
      phoneRequired: "Số điện thoại là bắt buộc.",
      serviceRequired: "Vui lòng chọn dịch vụ.",
      messageRequired: "Tin nhắn là bắt buộc.",
      allRequired: "Vui lòng điền đầy đủ tất cả các trường bắt buộc trước khi gửi.",
      errorSend: "Đã xảy ra lỗi — vui lòng thử lại hoặc email trực tiếp",
      directly: ".",
    },
    submit: {
      send: "Gửi Tin Nhắn",
      sending: "Đang Gửi…",
      another: "Gửi tin nhắn khác",
    },
    success: {
      heading: "Đã Gửi Thành Công.",
      body: "Cảm ơn bạn! Tin nhắn của bạn đã được gửi trực tiếp đến Anky. Đợi phản hồi trong vòng 48 giờ.",
    },
    studio: "Studio",
    phone: "Điện Thoại",
    responseTime: "Phản hồi trong vòng 48 giờ",
  },
};

export const translations: Record<Lang, typeof en> = { en, vi };
export type Translations = typeof en;

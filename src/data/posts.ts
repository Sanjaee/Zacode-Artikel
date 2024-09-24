export const posts = [
  {
    id: 1,
    title: "Cara Membuat Auth Login Dengan Laravel",
    content: "Cara Membuat Auth Login Dengan Laravel, ",
    description:
      "Untuk membuat login Google menggunakan Laravel Socialite, kita akan mengikuti beberapa langkah kunci untuk mengintegrasikan Google OAuth ke dalam aplikasi Laravel. Berikut adalah tutorial lengkap tentang cara melakukannya:",
    image: "/images/nextjs-intro.png",
    category: "Laravel",
    contentSections: [
      {
        type: "text",
        content: "1. Install Laravel dan Socialite",
      },

      {
        type: "code",
        content: `composer require laravel/socialite`,
      },

      {
        type: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/408px-Google_2015_logo.svg.png",
      },

      {
        type: "code",
        content: `useEffect(() => {
  // Pastikan Prism hanya dijalankan di sisi client
  if (typeof window !== "undefined") {
    Prism.highlightAll();
  }
}, [post]);
`,
      },
    ],
  },

  {
    id: 2,
    title: "Cara Membuat Login Dengan OTP Di Express.js",
    content:
      "Cara Membuat Auth Login Dengan OTP Dengan Express.js, Menggunakan Email.",
    description:
      "Tutorial ini akan membahas langkah-langkah untuk membuat sistem login yang aman menggunakan One-Time Password (OTP) di aplikasi Express.js. Kita akan menggunakan Nodemailer untuk mengirim email, JSON Web Token (JWT) untuk otentikasi, dan mengatur CORS untuk mengizinkan permintaan dari domain lain. Berikut adalah panduan lengkap yang mencakup pengaturan server, pengiriman OTP melalui email, serta proses verifikasi OTP oleh pengguna.",
    image: "/images/nextjs-intro.png",
    category: "Express",
    contentSections: [
      {
        type: "text",
        content: "1. Install Dependencies",
      },

      {
        type: "code",
        content: `npm i @prisma/client express jsonwebtoken nodemailer bcryptjs cors dotenv nodemon`,
      },

      {
        type: "text",
        content: "2. Buat Struktur direktori",
      },

      {
        type: "code",
        content: `your-project/
│
├── src/
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── index.js
│
├── package.json
└── .env

`,
      },

      {
        type: "text",
        content: "3. Buat Schema Prisma",
      },

      {
        type: "code",
        content: `
        model User {
  id          String       @id @default(cuid())
  username    String    
  email       String    @unique
  password    String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  verificationToken String?
  isVerified  Boolean   @default(false)
}
        `,
      },
    ],
  },
];

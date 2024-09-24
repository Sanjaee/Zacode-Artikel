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
        content: "1. Migrasi dulu database user yang sudah di sediakan laravel",
      },

      {
        type: "code",
        content: "php artisan migrate",
      },

      {
        type: "text",
        content:
          "2. Set up google OAuth Di Google console.cloud.google.com Dan Ikuti vidio di bawah ini",
      },

      {
        type: "video",
        src: "https://res.cloudinary.com/dgmlqboeq/video/upload/v1727217420/folder%20BLOG%20ZACODE/laravel/laravelgoogle_sat188.mp4",
      },

      {
        type: "text",
        content: "3. ubah localhost jadi nama domain jika sudah di hosting",
      },

      {
        type: "text",
        content: "4. install laravel/socialite",
      },

      {
        type: "code",
        content: `composer require laravel/socialite`,
      },

      {
        type: "text",
        content: "5. Tambahkan di config/app.php code di bawah ini",
      },

      {
        type: "code",
        content: `
'google' => [
    'client_id' => env('GOOGLE_CLIENT_ID'),
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'redirect' => env('GOOGLE_REDIRECT_URL'),
],`,
      },

      {
        type: "text",
        content:
          "6. Tambahkan di .env code di bawah ini, jangan di ubah GOOGLE_REDIRECT_URL",
      },

      {
        type: "code",
        content: `
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google/callback`,
      },

      {
        type: "text",
        content: "7. Buat controller untuk login google nya",
      },

      {
        type: "code",
        content: `php artisan make:controller Auth/GoogleController`,
      },

      {
        type: "text",
        content:
          "8. tambahkan code ini di Auth/GoogleController.php ",
      },

      {
        type: "code",
        content: `<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller 
{
   
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->user();

        
            $existingUser = User::where('email', $user->getEmail())->first();

            if ($existingUser) {
               
                Auth::login($existingUser);
            } else {
               
                $newUser = User::create([
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'google_id' => $user->getId(),
                    'password' => bcrypt('random-password') 
                ]);

                Auth::login($newUser);
            }

            
            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/login');
        }
    }
}

`,
      },

      {
        type: "text",
        content:
          "9. Buat page login nya dengan blade di folder resources/views/login.blade.php",
      },

      {
        type: "code",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container vh-100 d-flex flex-column justify-content-center">
        <h1 class="text-center mb-4">Login</h1>

        <!-- Tombol Login Google -->
        <div class="d-flex justify-content-center">
            <a href="{{ url('auth/google') }}" class="btn btn-primary">
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo"/>
                Login with Google
            </a>
        </div>
    </div>
</body>
</html>

        `,
      },


      {
        type: "text",
        content:
          "10. buat juga halaman yang ingin di redirect kedalam setelah login berhasil, buat file resources/views/dashboard.blade.php",
      },

      {
        type: "code",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa; /* Warna latar belakang */
        }
        .dashboard-container {
            margin-top: 50px; /* Jarak atas untuk kontainer */
        }
    </style>
</head>
<body>
    <div class="container dashboard-container text-center">
        <h1 class="display-4">Welcome to the Dashboard, {{ Auth::user()->name }}!</h1>
        <p class="lead">You are successfully logged in.</p>
        <a href="{{ route('logout') }}" class="btn btn-danger">Logout</a>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

        `,
      },

      

      {
        type: "text",
        content: "11. terakhir buatkan route nya di routes/web.php",
      },

      {
        type: "code",
        content: `//jangan lupa import GoogleController dari Auth
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Auth;
        
        Route::get('/', function () {
    return view('welcome');
});


Route::get('/login', function () {
    return view('login');
})->name('login');


Route::get('auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware('auth');

Route::get('/logout', function () {
    Auth::logout();
    return redirect('/login');
})->name('logout');
        `,
      }, 

      {
        type: "text",
        content: "12. masuk ke http://127.0.0.1:8000/login, jangan lupa follow https://www.tiktok.com/@ahmadafriza25",
      } 
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

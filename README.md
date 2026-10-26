# Aqil — Personal Portfolio

Website portfolio **Nurman Aqil Wicaksono**, mahasiswa Informatika Universitas Sebelas Maret dengan fokus project management dan koordinasi tim.

Desain dominan putih, navigasi floating dengan efek glass, galeri kolaborasi 3D yang bergerak naik mengikuti scroll, dan jejak piksel kursor. Selected Work mengarah langsung ke GitHub. Konteks organisasi: **Project Controlling Manager (PCM), AIESEC in UNS**.

## Jalankan lokal

Gunakan **Node.js 22+**. Tidak perlu `npm install` karena tidak ada dependency npm.

```sh
node scripts/dev.mjs
```

Buka **http://127.0.0.1:4173**. Source otomatis dibuild ulang saat berubah; refresh browser untuk melihat hasil. Tekan `Ctrl+C` untuk menghentikan server.

Di Windows, jika perintah `node` belum dikenali:

```powershell
.\start.cmd
```

Launcher mencari Node di PATH, lokasi instalasi standar, atau runtime Codex lokal jika tersedia. Pada komputer lain, install Node.js dahulu. Launcher tidak mengubah PATH sistem.

Jika port terpakai: `node scripts/dev.mjs --port 3000`.

## Build dan tes

```sh
node scripts/build.mjs
node --test tests/*.test.mjs
node scripts/dev.mjs --preview
```

Deploy **hanya folder `dist/`**, bukan root repository. Alternatif dengan npm: `npm run dev`, `npm run build`, `npm test`, `npm run preview`.

## Struktur project

```text
src/
  components/page.mjs       Template HTML dan metadata
  data/content.mjs          Profil, tautan, narasi, manifest gambar
  scripts/main.js           Navigasi, scroll, hover, dan dialog
  scripts/archive-motion.js Geometri galeri 3D
  scripts/pixel-cursor.js   Partikel piksel kursor
  styles/tokens.css         Warna dan font
  styles/main.css           Layout dasar dan responsif
  styles/refinement.css     Tema putih, glass, dan animasi galeri
public/
  assets/                   WebP siap pakai
  favicon.svg
  robots.txt
scripts/
  build.mjs                 Build statis
  dev.mjs                   Server lokal dan rebuild
  prepare_assets.py         Regenerasi gambar (opsional)
tests/                      Pemeriksaan konten, asset, dan motion
asset/                      Foto dan screenshot asli lokal
dist/                       Hasil build, diabaikan oleh Git
```

HTML dirender saat build; interaksi memakai JavaScript modular dan CSS. Tidak ada framework, backend, atau tracker.

## Edit konten

Edit `src/data/content.mjs` untuk profil dan teks, `src/components/page.mjs` untuk layout, serta `src/styles/tokens.css` dan `refinement.css` untuk tampilan.

WebP di `public/assets/` sudah siap dipakai setelah clone. Untuk regenerasi dari file asli, siapkan Python + Pillow:

```sh
python -m pip install Pillow
python scripts/prepare_assets.py
node scripts/build.mjs
```

Grayscale diterapkan lewat CSS. Galeri mendukung klik, keyboard, dan touch; Escape menutup viewer, panah mengganti gambar. Reduced motion dan JavaScript nonaktif menggunakan fallback gambar statis.

## Push ke GitHub

Buat repository kosong di GitHub. Untuk folder yang belum menjadi repository Git:

```sh
git init
git add src public scripts tests package.json start.cmd README.md .gitignore
git commit -m "Build personal portfolio website"
git branch -M main
git remote add origin https://github.com/nurmanaqil/NAMA-REPOSITORY.git
git push -u origin main
```

Ganti `NAMA-REPOSITORY`. Jika repository atau remote sudah ada, cek `git status` dan `git remote -v`, lalu gunakan konfigurasi yang ada.

Perintah `git add` di atas memasukkan source dan WebP yang diperlukan. Dokumen kerja PRD, screenshot QA, dan file asli di `asset/` tidak ikut ditambahkan oleh daftar tersebut. `dist/`, cache, dan dependency lokal sudah diabaikan melalui `.gitignore`.

## Hosting gratis

Diperiksa 27 Oktober 2026. Paket gratis tetap mengikuti kuota dan ketentuan provider. Subdomain bawaan gratis; domain pribadi biasanya dibeli terpisah.

### Cloudflare Pages — rekomendasi

Hubungkan repository GitHub, lalu atur:

| Pengaturan | Nilai |
|---|---|
| Framework preset | None |
| Build command | `node scripts/build.mjs` |
| Build output directory | `dist` |
| Root directory | Root repository |
| Node version | 22 atau lebih baru |

Alternatif tanpa Git integration: build lokal dan unggah `dist/` melalui Direct Upload. Alamat bawaan: `nama-project.pages.dev`.

Sumber: [Cloudflare Pages](https://www.cloudflare.com/developer-platform/products/pages/), [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

### Vercel Hobby

Import repository, pilih framework **Other**, build command `node scripts/build.mjs`, output directory `dist`. Subdomain: `nama-project.vercel.app`.

Hobby untuk penggunaan personal nonkomersial; periksa ketentuannya jika nanti mempromosikan layanan berbayar. [Dokumentasi Vercel Hobby](https://vercel.com/docs/plans/hobby).

### GitHub Pages

Gratis untuk repository publik pada GitHub Free. Untuk source saat ini, paling mudah memakai repository **`nurmanaqil.github.io`** agar website berada di root domain. Build melalui GitHub Actions, upload `dist/` sebagai Pages artifact, dan pilih source **GitHub Actions** di Settings → Pages.

Source memakai path absolut `/assets/...`. Untuk alamat `nurmanaqil.github.io/nama-repository/`, sesuaikan base path HTML/CSS/asset terlebih dahulu. Jangan langsung menerbitkan branch source: `index.html` baru dihasilkan saat build di `dist/`.

Sumber: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Sebelum publikasi

- Konfirmasi caption/izin screenshot peserta dan informasi peran.
- Email dan CV belum ditampilkan; kontak menggunakan LinkedIn.
- Ubah `noindex, nofollow` pada template serta `Disallow: /` di `public/robots.txt` jika sudah siap diindeks. Ini bukan proteksi akses.
- Tambahkan canonical URL dan social image absolut setelah domain final tersedia.
- Periksa tampilan mobile, tautan, dan animasi di hosting tujuan.

## Kredit

Arah visual terinspirasi [Grilled Pixels](https://www.grilledpixels.com/ecommerce/), diadaptasi untuk portfolio pribadi. Foto dan screenshot berasal dari asset pemilik. Hak konten mengikuti pemilik serta pihak terkait; repository belum menetapkan lisensi open-source.

import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/config/site"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - Arisan KU",
  description: "Syarat dan ketentuan penggunaan platform Arisan KU. Baca dengan seksama sebelum menggunakan layanan kami.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Syarat & Ketentuan</h1>
        <p className="text-muted-foreground mb-8">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Penerimaan Syarat</h2>
            <p className="text-muted-foreground mb-4">
              Dengan mengakses dan menggunakan platform Arisan KU, Anda setuju untuk terikat oleh 
              Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak 
              menggunakan layanan kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Definisi</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>"Platform"</strong> mengacu pada website dan aplikasi Arisan KU</li>
              <li><strong>"Pengguna"</strong> adalah setiap orang yang menggunakan Platform</li>
              <li><strong>"Arisan"</strong> adalah sistem pengumpulan dana berkala dengan undian</li>
              <li><strong>"Grup"</strong> adalah kumpulan pengguna dalam satu arisan</li>
              <li><strong>"Admin"</strong> adalah pengelola grup arisan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Pendaftaran dan Akun</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Persyaratan Pendaftaran</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Berusia minimal 17 tahun</li>
              <li>Memiliki identitas yang valid (KTP)</li>
              <li>Memberikan informasi yang akurat dan lengkap</li>
              <li>Memiliki akses ke email dan nomor telepon yang valid</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Keamanan Akun</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Anda bertanggung jawab menjaga kerahasiaan akun Anda</li>
              <li>Segera laporkan jika terjadi penggunaan tidak sah</li>
              <li>Kami tidak bertanggung jawab atas kerugian akibat kelalaian Anda</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Verifikasi KYC</h2>
            <p className="text-muted-foreground mb-4">
              Untuk keamanan dan kepatuhan hukum, kami mewajibkan verifikasi KYC (Know Your Customer):
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Upload foto KTP yang jelas</li>
              <li>Upload foto selfie dengan KTP</li>
              <li>Verifikasi nomor telepon</li>
              <li>Proses verifikasi maksimal 2x24 jam</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Penggunaan Layanan</h2>
            <h3 className="text-xl font-semibold mb-3">5.1 Aturan Penggunaan</h3>
            <p className="text-muted-foreground mb-4">Anda setuju untuk TIDAK:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Menggunakan Platform untuk tujuan ilegal</li>
              <li>Melakukan penipuan atau manipulasi</li>
              <li>Mengganggu atau merusak sistem</li>
              <li>Menggunakan bot atau otomasi tanpa izin</li>
              <li>Menyalahgunakan data pengguna lain</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.2 Pembayaran</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Pembayaran harus dilakukan sesuai jadwal yang ditentukan</li>
              <li>Keterlambatan pembayaran dapat mengakibatkan sanksi</li>
              <li>Semua biaya transaksi ditanggung oleh pengguna</li>
              <li>Pembayaran yang sudah dilakukan tidak dapat dibatalkan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Biaya dan Komisi</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Platform Fee:</strong> {siteConfig.features.platformFee}% dari setiap transaksi</li>
              <li><strong>Admin Fee:</strong> Ditentukan oleh admin grup</li>
              <li><strong>Affiliate Commission:</strong> {siteConfig.features.affiliateCommission}% untuk referral</li>
              <li><strong>Payment Gateway Fee:</strong> Sesuai dengan metode pembayaran</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Sistem Undian</h2>
            <p className="text-muted-foreground mb-4">
              Undian dilakukan secara otomatis dengan sistem commit-reveal yang fair:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Undian dilakukan setelah semua anggota membayar</li>
              <li>Sistem menggunakan algoritma random yang tidak dapat dimanipulasi</li>
              <li>Hasil undian bersifat final dan tidak dapat diganggu gugat</li>
              <li>Pemenang akan menerima dana sesuai dengan perhitungan sistem</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Penarikan Dana</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Penarikan dana dapat dilakukan setelah memenangkan undian</li>
              <li>Proses penarikan maksimal 2x24 jam kerja</li>
              <li>Minimum penarikan: Rp 50.000</li>
              <li>Rekening tujuan harus atas nama pemilik akun</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Sanksi dan Pelanggaran</h2>
            <p className="text-muted-foreground mb-4">
              Pelanggaran terhadap syarat ini dapat mengakibatkan:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Peringatan tertulis</li>
              <li>Pembekuan akun sementara</li>
              <li>Pembekuan dana</li>
              <li>Penutupan akun permanen</li>
              <li>Tindakan hukum jika diperlukan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Pengembalian Dana</h2>
            <p className="text-muted-foreground mb-4">
              Pengembalian dana hanya dapat dilakukan dalam kondisi tertentu:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Grup arisan dibatalkan sebelum periode dimulai</li>
              <li>Terjadi kesalahan sistem yang merugikan</li>
              <li>Atas kebijakan manajemen dalam kasus khusus</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Batasan Tanggung Jawab</h2>
            <p className="text-muted-foreground mb-4">
              Arisan KU tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Kerugian akibat kelalaian pengguna</li>
              <li>Gangguan layanan di luar kendali kami</li>
              <li>Perselisihan antar anggota grup</li>
              <li>Keputusan admin grup yang tidak sesuai</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Hak Kekayaan Intelektual</h2>
            <p className="text-muted-foreground mb-4">
              Semua konten, logo, dan materi di Platform adalah milik Arisan KU dan dilindungi 
              oleh hukum hak cipta. Penggunaan tanpa izin dilarang keras.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Perubahan Syarat</h2>
            <p className="text-muted-foreground mb-4">
              Kami berhak mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan diberitahukan 
              melalui email atau notifikasi di Platform. Penggunaan berkelanjutan setelah perubahan 
              berarti Anda menerima syarat yang baru.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Hukum yang Berlaku</h2>
            <p className="text-muted-foreground mb-4">
              Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap perselisihan 
              akan diselesaikan melalui pengadilan yang berwenang di Jakarta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Hubungi Kami</h2>
            <p className="text-muted-foreground mb-4">
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
            </p>
            <ul className="list-none text-muted-foreground space-y-2">
              <li><strong>Email:</strong> {siteConfig.contact.email}</li>
              <li><strong>Telepon:</strong> {siteConfig.contact.phone}</li>
              <li><strong>Alamat:</strong> {siteConfig.contact.address}</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

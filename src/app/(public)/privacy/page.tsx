import { Metadata } from "next"
import { siteConfig } from "@/lib/config/site"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Arisan KU",
  description: "Kebijakan privasi Arisan KU menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="container max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-12">
        <h1 className="text-4xl font-bold mb-4">Kebijakan Privasi</h1>
        <p className="text-muted-foreground mb-8">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Pendahuluan</h2>
            <p className="text-muted-foreground mb-4">
              Arisan KU ("kami", "kita", atau "milik kami") berkomitmen untuk melindungi privasi Anda. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, 
              dan melindungi informasi pribadi Anda ketika Anda menggunakan platform kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Informasi yang Kami Kumpulkan</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Informasi yang Anda Berikan</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Informasi akun (nama, email, nomor telepon)</li>
              <li>Informasi KYC (nomor KTP, foto KTP, foto selfie)</li>
              <li>Informasi pembayaran (rekening bank, metode pembayaran)</li>
              <li>Informasi profil (alamat, tanggal lahir, bio)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Informasi yang Dikumpulkan Otomatis</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Informasi perangkat (jenis perangkat, sistem operasi, browser)</li>
              <li>Informasi lokasi (alamat IP, lokasi geografis)</li>
              <li>Data penggunaan (halaman yang dikunjungi, waktu akses)</li>
              <li>Cookies dan teknologi pelacakan serupa</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Menyediakan dan memelihara layanan kami</li>
              <li>Memproses transaksi dan pembayaran</li>
              <li>Verifikasi identitas (KYC) untuk keamanan</li>
              <li>Mengirim notifikasi dan komunikasi penting</li>
              <li>Mencegah penipuan dan aktivitas ilegal</li>
              <li>Meningkatkan layanan dan pengalaman pengguna</li>
              <li>Mematuhi kewajiban hukum</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Berbagi Informasi</h2>
            <p className="text-muted-foreground mb-4">
              Kami tidak menjual informasi pribadi Anda. Kami hanya membagikan informasi Anda dalam situasi berikut:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Penyedia Layanan:</strong> Payment gateway (Midtrans), layanan notifikasi (WhatsApp)</li>
              <li><strong>Kepatuhan Hukum:</strong> Ketika diwajibkan oleh hukum atau proses hukum</li>
              <li><strong>Perlindungan Hak:</strong> Untuk melindungi hak, properti, atau keamanan kami</li>
              <li><strong>Dengan Persetujuan:</strong> Ketika Anda memberikan persetujuan eksplisit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Keamanan Data</h2>
            <p className="text-muted-foreground mb-4">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi 
              informasi pribadi Anda, termasuk:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Enkripsi data saat transit dan saat disimpan</li>
              <li>Kontrol akses berbasis peran</li>
              <li>Audit keamanan reguler</li>
              <li>Sistem deteksi penipuan</li>
              <li>Backup data reguler</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Hak Anda</h2>
            <p className="text-muted-foreground mb-4">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Mengakses informasi pribadi Anda</li>
              <li>Memperbaiki informasi yang tidak akurat</li>
              <li>Menghapus informasi Anda (dengan batasan tertentu)</li>
              <li>Membatasi pemrosesan informasi Anda</li>
              <li>Memindahkan data Anda (portabilitas data)</li>
              <li>Menolak pemrosesan tertentu</li>
              <li>Menarik persetujuan kapan saja</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Penyimpanan Data</h2>
            <p className="text-muted-foreground mb-4">
              Kami menyimpan informasi pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam 
              kebijakan ini, kecuali periode penyimpanan yang lebih lama diperlukan atau diizinkan oleh hukum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Kami menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda. 
              Anda dapat mengontrol penggunaan cookies melalui pengaturan browser Anda.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Perubahan Kebijakan</h2>
            <p className="text-muted-foreground mb-4">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda 
              tentang perubahan dengan memposting kebijakan baru di halaman ini dan memperbarui tanggal 
              "Terakhir diperbarui".
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Hubungi Kami</h2>
            <p className="text-muted-foreground mb-4">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
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
      <Footer />
    </div>
  )
}

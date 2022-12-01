import Link from "next/link";

export default function RecordTable({
  records
}) {
  return (
    <div className="col-12 record-card">
        <table class="table table-striped table-hover">
            <thead>
                <tr class="table-primary">
                <th scope="col">Tanggal</th>
                <th scope="col">Nominal</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr>
                        <td>{record.date}</td>
                        <td>{record.amount}</td>
                        <td>{record.notes}</td>
                        <td>
                            <Link href='/dompet/tambah-catatan'>
                                <a className="btn btn-warning me-2">Ubah</a>
                            </Link>
                            <Link href='/dompet/tambah-catatan'>
                                <a className="btn btn-danger me-2">Hapus</a>
                            </Link>
                        </td>
                    </tr>
                ))}
                {!records.length && (
                    <tr>
                    <td colspan="4" className="text-center">Belum ada riwayat keuangan</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}
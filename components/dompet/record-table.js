import Link from "next/link";

export default function RecordTable({
  records
}) {
  return (
    <div className="col-12 record-card">
        <table className="table table-striped table-hover">
            <thead>
                <tr className="table-primary">
                <th scope="col">Tanggal</th>
                <th scope="col">Nominal</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr key={record.id}>
                        <td>{record.date}</td>
                        {record.is_income ?
                        (<td style={{'color':'green'}}>{record.amount}</td>) : (<td style={{'color':'red'}}>-{record.amount}</td>)
                        }
                        <td>{record.notes}</td>
                        <td>
                            <Link href={"/dompet/ubah-catatan/" + String(record.id)}>
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
                    <td colSpan="4" className="text-center">Belum ada riwayat keuangan</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}
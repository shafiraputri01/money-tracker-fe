import Link from "next/link";
import { useRouter } from "next/router";

export default function RecordTable({ records }) {
    const router = useRouter();

    const deleteRecord = async (e, id_record) => {
        let _data = {
            "id": id_record,
        }

        try {
            console.log(_data);
            const res = await fetch(
                'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/record',
                {
                    method: 'DELETE',
                    body: JSON.stringify(_data),
                    headers: {
                    'Content-Type': 'application/json',
                    },
                }
            );

            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

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
                        (<td style={{'color':'green'}}>+Rp{record.amount.toLocaleString("id-ID", {valute: "IDR"})}</td>) : (<td style={{'color':'red'}}>-Rp{record.amount.toLocaleString("id-ID", {valute: "IDR"})}</td>)
                        }
                        <td>{record.notes}</td>
                        <td>
                            <Link href={"/dompet/ubah-catatan/" + String(record.id)}>
                                <a className="btn btn-warning me-2">Ubah</a>
                            </Link>
                            <a className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteRecord">Hapus</a>

                            <div class="modal fade" id="deleteRecord" tabindex="-1" aria-labelledby="deleteRecordLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="deleteRecordLabel">Hapus Catatan</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Apakah Anda yakin ini menghapus catatan ini?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={e => deleteRecord(e, record.id)}>Hapus</button>
                                </div>
                                </div>
                            </div>
                            </div>
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
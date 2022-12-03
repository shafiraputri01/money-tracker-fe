import Link from "next/link";

export default function TableStatistik({
    records
  }) {
    return (
      <div className="col-12 record-card">
          <table class="table table-striped table-hover">
              <thead>
                  <tr class="table-primary">
                  <th scope="col">Bulan</th>
                  <th scope="col">Pendapatan</th>
                  <th scope="col">Pengeluaran</th>
                  </tr>
              </thead>
              <tbody>
                  {records.map(record => (
                      <tr>
                          <td>{record.bulan}</td>
                          <td>{record.pendapatan}</td>
                          <td>{record.pengeluaran}</td>
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
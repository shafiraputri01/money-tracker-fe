import Link from "next/link";

export default function TableStatistik({
    records
  }) {
    return (
      <div className="col-12 record-card">
          <table className="table table-striped table-hover">
              <thead>
                  <tr className="table-primary">
                  <th scope="col">Bulan</th>
                  <th scope="col">Pendapatan</th>
                  <th scope="col">Pengeluaran</th>
                  </tr>
              </thead>
              <tbody>
                  {records.map(record => (
                      <tr key={record.month}>
                          <td>{record.month}</td>
                          <td>{record.income}</td>
                          <td>{record.expense}</td>
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
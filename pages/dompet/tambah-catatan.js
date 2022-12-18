import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'

import Footer from "../../components/footer-section";
import Navbar from "../../components/navbar-section";

export default function TambahCatatan() {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isIncome, setIsIncome] = useState(0);

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    let _data = {
      "date": date,
      "amount": parseInt(amount, 10),
      "notes": notes,
      "is_income": isIncome,
    }

    try {
      const res = await fetch(
          'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/record',
          {
            method: 'POST',
            body: JSON.stringify(_data),
            headers: {
              'Content-Type': 'application/json',
          },
          }
        );

      const data = await res.json();
      console.log(data);

      router.push('/dompet')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Tambah Catatan Keuangan</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={submit}>

        <section className="form-add mb-50">
          <div className="container" style={{ width: "80%" }}>
            <div className="">
              <div className="mb-3">
                <div className="mb-2">Jenis</div>
                <div className="row justify-content-start ml-5">
                  <div className="col-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="isIncome"
                      id="isIncomeTrue"
                      onChange={() => setIsIncome(true)}
                    />
                    <label className="form-check-label" htmlFor="isIncomeTrue">
                      Pemasukan
                    </label>
                  </div>
                  <div className="col-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="isIncome"
                      id="isIncomeFalse"
                      onChange={() => setIsIncome(false)}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="isIncomeFalse">
                      Pengeluaran
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Tanggal
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nominal" className="form-label">
                  Nominal
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="nominal"
                  placeholder="Masukkan jumlah nominal"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deskripsi" className="form-label">
                  Deskripsi
                </label>
                <input
                  className="form-control"
                  id="deskripsi"
                  maxLength={200}
                  placeholder="Tuliskan deskripsi maks 200 karakter"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <br></br>
              <div className="row justify-content-md-center">
                <div className="mb-3 col-1">
                  <Link href="/dompet">
                    <a className=" btn btn-danger text-center ms-3">
                      Batal
                    </a>
                  </Link>
                </div>
                <div className="mb-3 col-1">
                  <input
                    className="btn button-primary buttonCatatan buttonCatatanHover me-3"
                    type="submit"
                    value="Simpan"
                    style={{ "backgroundColor": "#37C2CC" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>

      <section>
        <Footer />
      </section>
    </>
  );
}

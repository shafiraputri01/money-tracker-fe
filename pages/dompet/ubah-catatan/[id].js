import Link from "next/link";

import Footer from "../../../components/footer-section";

import { useState, useEffect } from 'react'

export default function UbahCatatan({ record }) {
  const [amount, setAmount] = useState(record? record.amount : 0);
  const [notes, setNotes] = useState(record? record.notes : '');
  const [isIncome, setIsIncome] = useState(record? record.is_income : 0);

  const submit = async (e) => {
    e.preventDefault();

    let _data = {
      "id": record.id,
      "date": record.date,
      "amount": parseInt(amount, 10),
      "notes": notes,
      "is_income": isIncome
    }

    try {
      const res = await fetch(
          'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/record',
          {
            method: 'PUT',
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
    <>
      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Ubah Catatan Keuangan</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/statistik">
                      <a>Lihat Statistik</a>
                    </Link>
                  </li>
                </ul>
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
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      defaultChecked={isIncome ? true : false}
                      onChange={e => setIsIncome(true)}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Pemasukan
                    </label>
                  </div>
                  <div className="col-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked={isIncome ? false : true}
                      onChange={e => setIsIncome(false)}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Pengeluaran
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Nominal
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="nominal"
                  placeholder="Masukkan jumlah nominal"
                  defaultValue={amount ? amount : 0}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  Deskripsi
                </label>
                <input
                  className="form-control"
                  id="deskripsi"
                  maxLength={200}
                  placeholder="Tuliskan deskripsi maks 200 karakter"
                  defaultValue={notes ? notes : ''}
                  onChange={e => setNotes(e.target.value)}
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

export async function getStaticProps({ params }) {
  const getRecord = await fetch(
    'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/record?id=' + params.id.toString(),
    {
        method: 'GET',
    }
  )
  const record = await getRecord.json()

  return {
    props: {
      record: record,
    }
  };
}

export async function getStaticPaths() {
  try {
      const getRecords = await fetch(
        'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/records',
        {
            method: 'GET',
        }
      )

      const records = await getRecords.json()

      return {
          paths: records.map((record) => `/dompet/ubah-catatan/${record.id}`),
          fallback: true
      };
  } catch (e) {
      console.error(`Couldn't load records.`, e)

      return {
          paths: [],
          fallback: false
      }
  }
}


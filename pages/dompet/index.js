import Link from "next/link";

import Footer from "../../components/footer-section";
import Navbar from "../../components/navbar-section";
import RecordTable from "@/components/dompet/record-table";
import { useState, useEffect } from 'react'

export default function Dompet() {
  const [balance, setBalance] = useState(0);
  const [isBalanceNegatif, setIsBalanceNegatif] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(
      'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/balance',
      {
          method: 'GET'
      }
    ).then(
      res => res.json()
    ).then(
      data => {
        setIsBalanceNegatif(data.balance < 0 ? true : false)
        setBalance(Math.abs(data.balance))
      }
    )

    fetch(
      'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/records ',
      {
          method: 'GET'
      }
    ).then(
      res => res.json()
    ).then(
      data => setRecords(data)
    )
  });

  return (
    <>
      <Navbar />

      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Dompet</h2>
                {/* <ul className="breadcrumb-nav">
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
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-posts dompet-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 record-card">
              <div className="dompet-section">
                <div className="dompet-section-head">
                  <h3>Saldo</h3>
                </div>
                <div className="amount-section">
                  { isBalanceNegatif ?
                    <p style={{'color':'red'}} className="amount">-Rp{balance.toLocaleString("id-ID", {valute: "IDR"})}</p> :
                    <p style={{'color':'green'}} className="amount">Rp{balance.toLocaleString("id-ID", {valute: "IDR"})}</p>
                  }
                </div>
              </div>

              <div className="dompet-section">
                <div className="d-flex dompet-section-head">
                  <h3>Riwayat Keuangan</h3>
                  <Link href="/dompet/tambah-catatan">
                    <a className="btn button-custom-other button-primary me-3 buttonHover">
                      Tambah catatan
                    </a>
                  </Link>
                </div>
                <RecordTable records={records} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const getBalance = await fetch(
    'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/balance',
    {
        method: 'GET'
    }
  )
  const balance = await getBalance.json()

  let amount = await (balance['balance']).toLocaleString("id-ID", {
    valute: "IDR",
  });

  const getRecords = await fetch(
    'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/records ',
    {
        method: 'GET'
    }
  )
  const records = await getRecords.json()

  return {
    props: {
      records: records,
      amount: amount,
    }
  };
}

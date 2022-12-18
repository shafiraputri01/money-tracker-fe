import Link from "next/link";

import Footer from "../../components/footer-section";
import Navbar from "../../components/navbar-section";
import TableStatistik from "@/components/statistik/table-statistik";

export default function Statistik({ records }) {
  return (
    <>
      <Navbar />

      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Statistik Keuangan</h2>
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
                <TableStatistik records={records} />
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
  const getStatistics = await fetch(
      'http://money-tracker-be.13.114.233.184.sslip.io/api/v1/statistic',
      {
          method: 'GET'
      }
  )
  const statistic = await getStatistics.json()

  return {
      props: {
          records: statistic,
      }
  };
}
import Link from "next/link";

import Footer from "../../components/footer-section";
import TableStatistik from "@/components/statistik/table-statistik";

export default function Statistik({ records }) {
  return (
    <>
      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Statistik Keuangan</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dompet">
                      <a>Lihat Dompet</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
      <br></br>
        <TableStatistik records={records} />
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
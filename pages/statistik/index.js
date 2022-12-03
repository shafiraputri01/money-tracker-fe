import Link from "next/link";

import camelcaseKeys from "camelcase-keys";
import Footer from "../../components/footer-section";
import { getPostsData, getCategories } from "@/lib/api";
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
  const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;

  if (butterToken) {
    try {
      const blogPosts = (await getPostsData()).posts;
      const categories = await getCategories();

      return { props: { posts: camelcaseKeys(blogPosts), categories } };
    } catch (e) {
      console.log("Could not get posts", e);

      return {
        props: { posts: [], categories: [] },
      };
    }
  }

  const dummy_records = [
    {
      id: 1,
      bulan: "Januari",
      pendapatan: "500000",
      pengeluaran: "100000",
    },
    {
      id: 2,
      bulan: "Februari",
      pendapatan: "400000",
      pengeluaran: "250000",
    },
    {
      id: 3,
      bulan: "Maret",
      pendapatan: "750000",
      pengeluaran: "75000",
    },
  ];

  return { props: { records: dummy_records } };
}

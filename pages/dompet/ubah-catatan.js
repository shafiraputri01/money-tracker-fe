import Link from "next/link";

import camelcaseKeys from "camelcase-keys";
import { getPostsData, getCategories } from "@/lib/api";
import Footer from "../../components/footer-section";

export default function UbahCatatan({ posts, categories }) {
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

      <form>
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
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Pemasukan
                  </label>
                </div>
                <div className="col-4 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Pengeluaran
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Nominal
              </label>
              <input
                type="number"
                className="form-control"
                id="nominal"
                placeholder="Masukkan jumlah nominal"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Deskripsi
              </label>
              <input
                className="form-control"
                id="deskripsi"
                maxLength={200}
                placeholder="Tuliskan deskripsi maks 200 karakter"
              />
            </div>

            <br></br>
            <div className="row justify-content-md-center">
              <div className="mb-3 col-1">
                <a href="/dompet" className=" btn btn-danger text-center ms-3">
                  Batal
                </a>
              </div>
              <div className="mb-3 col-1">
                <input
                  className="btn button-primary buttonCatatan buttonCatatanHover me-3"
                  type="submit"
                  value="Simpan"
                  style={{ "background-color": "#37C2CC" }}
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

  return { props: { posts: [], categories: [] } };
}

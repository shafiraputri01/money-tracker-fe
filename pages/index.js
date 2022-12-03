import Link from "next/link";

import camelcaseKeys from "camelcase-keys";
import { getPostsData, getCategories } from "@/lib/api";
import Footer from "../components/footer-section";

export default function Index() {
  return (
    <>
      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center mt-4">
                <h2>MONEY TRACKER</h2>
                <h3>Solution for tracking your money</h3>
                <br></br>
                <div class="d-flex justify-content-center w-100">
                  <a
                    class="btn button-custom button-primary me-3 buttonHover"
                    href="/statistik"
                    role="button"
                  >
                    Lihat Statistik
                  </a>
                  <a
                    class="btn button-custom button-primary ms-3 buttonHover"
                    href="/dompet"
                    role="button"
                  >
                    Lihat Dompet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Footer isTinggiFooter />
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

import Link from "next/link";

import camelcaseKeys from 'camelcase-keys';

import PostsList from "@/components/blog/posts-list";

import { getPostsData, getCategories } from '@/lib/api'
import CategoriesWidget from "@/components/blog/categories-widget";
import SearchWidget from "@/components/blog/search-widget";

export default function UbahCatatan({ posts, categories }) {
  return (
    <>
      <section id="blog-roll" className="blog-roll-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Ubah Catatan</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link></li>
                  <li>Ubah Catatan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="form-add mb-50">
        <div className="container" style={{width:'80%'}}>
          <div className="">
            <div class="mb-3">
              <div className="mb-2">Jenis</div>
              <div className="row justify-content-start ml-5" >
                <div class="col-4 form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label class="form-check-label" for="flexRadioDefault1">
                    Pemasukan
                  </label>
                </div>
                <div class="col-4 form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                  <label class="form-check-label" for="flexRadioDefault2">
                    Pengeluaran
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Nominal</label>
              <input type="number" class="form-control" id="nominal" placeholder="Masukkan jumlah nominal"/>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
              <input class="form-control" id="deskripsi" maxLength={200} placeholder="Tuliskan deskripsi maks 200 karakter"/>
            </div>
            <div className="mb-3 row justify-content-center">
              <input className="col-3 btn btn-primary" type="submit" value="Simpan" style={{'background-color':'#37C2CC'}}/>
            </div>
            <div className="mb-3 row justify-content-center">
              <a href="/dompet" class="col-3 text-center" style={{color:"red"}}>Batal</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY

  if (butterToken) {
    try {
      const blogPosts = (await getPostsData()).posts
      const categories = await getCategories()

      return { props: { posts: camelcaseKeys(blogPosts), categories } };
    } catch (e) {
      console.log("Could not get posts", e)

      return {
        props: { posts: [], categories: [] }
      }
    }
  }

  return { props: { posts: [], categories: [] } }
}


import Link from "next/link";

export default function NavbarSection() {
  return (
    <nav class="navbar navbar-expand-md navbar-light" style={{'background-color': '#C2FBFF'}}>
        <div class="container-fluid">
          <Link href="/">
            <a class="navbar-brand">Money Tracker</a>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item mx-1">
                <Link href="/statistik">
                  <a class="nav-link active" aria-current="page">Lihat Statistik</a>
                </Link>
              </li>
              <li class="nav-item mx-1">
                <Link href="/dompet">
                  <a class="nav-link active" aria-current="page">Lihat Dompet</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  );
}

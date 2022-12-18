import Link from "next/link";

export default function NavbarSection() {
  return (
    <nav className="navbar navbar-expand-md navbar-light" style={{'background-color': '#C2FBFF'}}>
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">Money Tracker</a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-1">
                <Link href="/statistik">
                  <a className="nav-link active" aria-current="page">Lihat Statistik</a>
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link href="/dompet">
                  <a className="nav-link active" aria-current="page">Lihat Dompet</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  );
}

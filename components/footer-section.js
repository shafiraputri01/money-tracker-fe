import Image from "next/image";

export default function FooterSection({ isTinggiFooter }) {
  return (
    <div className={isTinggiFooter ? "footerHome" : "footerOther"}>
      <h5>Created by Student of Fakultas Ilmu Komputer UI</h5>
    </div>
  );
}

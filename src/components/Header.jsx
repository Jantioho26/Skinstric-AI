import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          SKINSTRIC
        </Link>
        <span className="text-xs text-gray-500">[ INTRO ]</span>
      </div>

      <button className="bg-black px-4 py-2 text-xs font-semibold text-white">
        ENTER CODE
      </button>
    </header>
  );
}

export default Header;

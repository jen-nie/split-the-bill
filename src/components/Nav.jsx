export default function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            {/* fetch currently logged in user */}
            <a href="#">User Vinz</a>
          </li>
          <li className="flex-right" id="nav-logout">
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

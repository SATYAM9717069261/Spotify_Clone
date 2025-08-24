function Sidebar() {
  return (
    <div className="container h-full">
      <div className="sidebar-header">
        <img src="/images/logo.png" alt="Spotify Logo" />
      </div>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-home"></i>
              Home
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-search"></i>
              Search
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-user"></i>
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;

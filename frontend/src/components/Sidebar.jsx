import {
  LayoutDashboard,
  Siren,
  ClipboardList,
  BarChart3,
  Network,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Emergency Control",
      icon: Siren,
    },
    {
      label: "Request Monitor",
      icon: ClipboardList,
    },
    {
      label: "Analytics",
      icon: BarChart3,
    },
    {
      label: "Architecture",
      icon: Network,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-mark">U</div>

        <div>
          <h2>UrbanGrid</h2>
          <span>AI Traffic System</span>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`nav-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => setActivePage(item.label)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <span className="status-dot"></span>

        <div>
          <strong>System Online</strong>
          <small>SUMO Ready</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
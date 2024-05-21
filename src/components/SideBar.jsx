import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import GetAppIcon from '@mui/icons-material/GetApp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
function SideBar() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken } =
    useProSidebar();
  return (
    <Sidebar
      breakPoints="sm"
      transitionDuration="800"
      style={{ height: "100vh",display: "flex", flexDirection: "column"}}
    >
      <Menu>
        <MenuItem
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2>Admin</h2>
        </MenuItem>
        <Link to="/"><MenuItem icon={<ShowChartIcon />}>Dashboard</MenuItem></Link>
        <MenuItem icon={<PersonIcon />}>Profile</MenuItem>
        <MenuItem icon={<GetAppIcon />}>Exports</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;

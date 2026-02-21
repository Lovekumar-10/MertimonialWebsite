
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { LogOut, Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const [activePos, setActivePos] = useState({
//     left: 0,
//     top: 0,
//     width: 0,
//     height: 0,
//   });
//   const [hoverPos, setHoverPos] = useState({
//     left: 0,
//     top: 0,
//     width: 0,
//     height: 0,
//   });
//   const [isHovering, setIsHovering] = useState(false);

//   const linksRef = useRef([]);
//   // ✅ Only these links for Navbar
//   const publicLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Pricing", path: "/pricing" },
//   ];

//   const privateLinks = [
//     { name: "Home", path: "/" },
//     // { name: "Dashboard", path: "/dashboard" },
//     { name: "Connection", path: "/connection" },
//     { name: "About", path: "/about" },
//     { name: "Pricing", path: "/pricing" },

//     // { name: "Chat", path: "/pricing" },
//   ];

//   const links = user ? privateLinks : publicLinks;

//   useEffect(() => {
//     const activeLink = linksRef.current.find(
//       (el) => el && el.getAttribute("href") === location.pathname,
//     );

//     if (activeLink) {
//       setActivePos({
//         left: activeLink.offsetLeft,
//         top: activeLink.offsetTop,
//         width: activeLink.offsetWidth,
//         height: activeLink.offsetHeight,
//       });
//     }
//   }, [location.pathname, user]);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav
//       className="fixed w-full z-[100] border-b"
//       style={{
//         backgroundColor: "var(--bg-card)",
//         borderColor: "var(--border)",
//         fontFamily: "var(--ff-primary)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img className="h-10 w-auto" src="/logoo.png" alt="Logo" />
//         </Link>

//         {/* Desktop */}
//         <div className="hidden md:flex items-center relative gap-1">
//           {isHovering && (
//             <div
//               className="absolute rounded-full transition-all duration-200 pointer-events-none"
//               style={{
//                 backgroundColor: "var(--bg-soft)",
//                 width: `${hoverPos.width}px`,
//                 height: `${hoverPos.height}px`,
//                 left: `${hoverPos.left}px`,
//                 top: `${hoverPos.top}px`,
//               }}
//             />
//           )}

//           <div
//             className="absolute rounded-full transition-all duration-300 pointer-events-none"
//             style={{
//               backgroundColor: "var(--color-primary)",
//               width: `${activePos.width}px`,
//               height: `${activePos.height}px`,
//               left: `${activePos.left}px`,
//               top: `${activePos.top}px`,
//             }}
//           />

//           {links.map((link, idx) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               ref={(el) => (linksRef.current[idx] = el)}
//               onMouseEnter={(e) => {
//                 setHoverPos({
//                   left: e.currentTarget.offsetLeft,
//                   top: e.currentTarget.offsetTop,
//                   width: e.currentTarget.offsetWidth,
//                   height: e.currentTarget.offsetHeight,
//                 });
//                 setIsHovering(true);
//               }}
//               onMouseLeave={() => setIsHovering(false)}
//               className="relative z-10 px-4 py-1.5 text-[13px] rounded-full transition-colors duration-300"
//               style={{
//                 color:
//                   location.pathname === link.path
//                     ? "#ffffff"
//                     : "var(--text-secondary)",
//                 fontWeight: "var(--fw-medium)",
//               }}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Auth Buttons */}
//           <div
//             className="ml-4 flex items-center gap-2 border-l pl-4"
//             style={{ borderColor: "var(--border)" }}
//           >
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-1.5 text-[13px] text-white cursor-pointer rounded-[var(--radius-sm)] transition-all hover:opacity-90"
//                 style={{ backgroundColor: "var(--color-secondary)" }}
//               >
//                 <LogOut size={14} /> Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-1.5 text-[13px] cursor-pointer font-(--fw-semibold) transition-colors"
//                   style={{ color: "var(--text-primary)" }}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-1.5 text-[13px] cursor-pointer text-white rounded-sm transition-all shadow-sm"
//                   style={{ backgroundColor: "var(--color-primary)" }}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden p-1 text-[var(--text-primary)]"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden fixed inset-0 top-14 bg-white z-[90] flex flex-col p-6 gap-4 animate-in fade-in slide-in-from-top-4">
//           {links.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               onClick={() => setIsOpen(false)}
//               className="text-[var(--fs-h5)] font-[var(--fw-bold)] border-b pb-2"
//               style={{
//                 color:
//                   location.pathname === link.path
//                     ? "var(--color-primary)"
//                     : "var(--text-primary)",
//               }}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <div className="mt-auto flex flex-col gap-3">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="w-full py-3 text-center cursor-pointer rounded-[var(--radius-md)] text-white bg-[var(--error)] font-bold"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full py-3 text-center border cursor-pointer rounded-[var(--radius-md)] font-bold"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full py-3 text-center cursor-pointer text-white bg-[var(--color-primary)] rounded-[var(--radius-md)] font-bold"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ChevronRight, LogOut, User, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Find Your Soulmate", path: "/MatrimonyFilter" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsOpen(false);
    setDropdownOpen(false);
  };

  // Helper for active link styles using your CSS variables
  const getLinkStyle = (path) => 
    location.pathname === path 
      ? "text-white bg-[var(--color-primary)]" 
      : "text-[var(--text-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-2)]";

  return (
    <nav 
      className="fixed w-full top-0 z-50 border-b bg-[var(--bg-card)] border-[var(--border)] shadow-[var(--shadow-card)]"
      style={{ fontFamily: "var(--ff-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        {/* <Link to="/" className="text-[var(--fs-h4)] font-[var(--fw-bold)] text-[var(--color-primary)] tracking-tight">
          BRAND
        </Link> */}

        <Link to="/" className="flex items-center">
          <img className="h-10 w-auto" src="/logoo.png" alt="Logo" />
        </Link>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-[var(--radius-sm)] transition-all duration-300 font-[var(--fw-medium)] ${getLinkStyle(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center">
          {!user ? (
            <Link
              to="/login"
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:brightness-110 transition shadow-md"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full  cursor-pointer bg-[var(--color-primary)] text-white flex items-center justify-center font-bold border-2 border-[var(--color-base)]"
              >
                {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-white border border-[var(--border)] shadow-[var(--shadow-hover)] rounded-[var(--radius-md)] overflow-hidden z-50"
                  >
                    <Link to="/connection" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 hover:bg-[var(--bg-soft)] text-[var(--text-primary)]">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 hover:bg-[var(--bg-soft)] text-[var(--text-primary)]">
                      <User size={18} /> Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-[var(--error)] font-bold border-t">
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--bg-soft)] rounded-full transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 top-16 bg-[var(--bg-main)] z-40 flex flex-col p-6"
          >
            <div className="flex flex-col gap-3">
              <p className="text-[var(--text-light)] text-xs uppercase tracking-widest font-bold mb-2">Navigation</p>
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex justify-between items-center py-4 px-5 rounded-[var(--radius-md)] text-[var(--fs-h6)] font-[var(--fw-semibold)] transition-all ${getLinkStyle(link.path)}`}
                >
                  {link.name} <ChevronRight size={18} />
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-10">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full block py-4 text-center bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-bold text-lg shadow-lg"
                >
                  Login to Account
                </Link>
              ) : (
                <div className="bg-[var(--bg-card)] p-4 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm">
                  <div className="flex items-center gap-3 mb-4 p-2">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xl font-bold">
                      {user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{user.displayName || "User"}</p>
                      <p className="text-xs text-[var(--text-light)]">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-[var(--bg-soft)] rounded-[var(--radius-sm)] text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-[var(--bg-soft)] rounded-[var(--radius-sm)] text-sm font-medium">
                      Profile
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-3 py-3 text-center text-[var(--error)] font-bold border-t border-[var(--border)] pt-4 flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
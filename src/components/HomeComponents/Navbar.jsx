import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { LogContext } from "../../Context/AuthContext";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const desktopLinksRef = useRef([]);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { users, currentUser, setUsers, setCurrentUser } =
    useContext(LogContext);

  const LogOutHandler = () => {
    if (!currentUser) return;
    setUsers((prevUsers) => {
      const idx = prevUsers.findIndex((u) => u.email === currentUser.email);
      if (idx === -1) return [...prevUsers, currentUser];
      const updated = [...prevUsers];
      updated[idx] = currentUser;
      return updated;
    });
    setCurrentUser(null);
  };

  // Initial navbar entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(logoRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(
        desktopLinksRef.current.filter(Boolean),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
        "-=0.3"
      )
      .fromTo(buttonRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, "-=0.35");
  });

  // Toggle mobile menu
  const toggleMenu = () => {
    if (!menuRef.current) return;

    if (!menuOpen) {
      // Lock background scroll
      document.body.style.overflow = "hidden";

      gsap.set(menuRef.current, { display: "flex" });
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: 0, duration: 0.45, ease: "power3.out" }
      );

      const anchors = menuRef.current.querySelectorAll("a");
      gsap.fromTo(
        anchors,
        { x: 16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.08, delay: 0.05 }
      );

      setMenuOpen(true);
    } else {
      document.body.style.overflow = "";

      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => gsap.set(menuRef.current, { display: "none" }),
      });

      setMenuOpen(false);
    }
  };

  // Close menu on route change
  useEffect(() => {
    if (!menuRef.current) return;
    setMenuOpen(false);
    document.body.style.overflow = "";
    gsap.set(menuRef.current, { display: "none", x: "100%" });
  }, [location.pathname]);

  const navLinks = [
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
    { path: "/cart", label: "Cart 🛒" },
    { path: "/guide", label: "Guide 📕" },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 flex items-center justify-between px-6 min-h-[75px] bg-emerald-600 text-black font-medium">
      {/* Logo */}
      <Link ref={logoRef} to="/" className="text-3xl font-extrabold select-none">
        BasketFiller
      </Link>

      {/* Desktop Links + Logout */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-6 text-2xl ml-6">
       
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              ref={(el) => (desktopLinksRef.current[i] = el)}
              className={`transition hover:text-white ${
                location.pathname === link.path ? "underline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
           <button
          onClick={LogOutHandler}
          className="bg-red-500 text-white active:bg-red-700 rounded-full px-4 py-2"
        >
          Log Out
        </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="lg:hidden text-3xl z-50"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Fullscreen Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className="absolute top-0 left-0 w-screen h-screen bg-emerald-700 text-white flex flex-col items-center justify-center gap-8 text-2xl z-40"
        style={{ display: "none", transform: "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={toggleMenu}
            className={`hover:text-gray-200 ${
              location.pathname === link.path ? "underline" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={LogOutHandler}
          className="bg-red-500 text-white active:bg-red-700 rounded-full px-4 py-2"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;






// import { Link, useLocation } from "react-router-dom";
// import { useRef, useState, useEffect, useContext } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { LogContext } from "../../Context/AuthContext";
// gsap.registerPlugin(useGSAP);

// const Navbar = () => {
//   const logoRef = useRef(null);
//   const buttonRef = useRef(null);
//   const desktopLinksRef = useRef([]);
//   const menuRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const { users, currentUser, setUsers, setCurrentUser } =
//     useContext(LogContext);

//   const LogOutHandler = () => {
//     if (!currentUser) return;
//     setUsers((prevUsers) => {
//       const idx = prevUsers.findIndex((u) => u.email === currentUser.email);
//       if (idx === -1) return [...prevUsers, currentUser];
//       const updated = [...prevUsers];
//       updated[idx] = currentUser;
//       return updated;
//     });
//     setCurrentUser(null);
//   };

//   // Animate entrance
//   useGSAP(() => {
//     const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
//     tl.fromTo(logoRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
//       .fromTo(
//         desktopLinksRef.current.filter(Boolean),
//         { x: 30, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
//         "-=0.3"
//       )
//       .fromTo(buttonRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, "-=0.35");
//   });

//   // Toggle mobile menu
//   const toggleMenu = () => {
//     if (!menuRef.current) return;

//     if (!menuOpen) {
//       // Lock background scroll
//       document.body.style.overflow = "hidden";

//       gsap.set(menuRef.current, { display: "flex" });
//       gsap.fromTo(
//         menuRef.current,
//         { x: "100%" },
//         { x: 0, duration: 0.45, ease: "power3.out" }
//       );

//       // Animate links
//       const anchors = menuRef.current.querySelectorAll("a");
//       gsap.fromTo(
//         anchors,
//         { x: 16, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.35, stagger: 0.08, delay: 0.05 }
//       );

//       setMenuOpen(true);
//     } else {
//       // Unlock scroll
//       document.body.style.overflow = "";

//       gsap.to(menuRef.current, {
//         x: "100%",
//         duration: 0.4,
//         ease: "power3.in",
//         onComplete: () => gsap.set(menuRef.current, { display: "none" }),
//       });
//       setMenuOpen(false);
//     }
//   };

//   // Close on route change
//   useEffect(() => {
//     if (!menuRef.current) return;
//     setMenuOpen(false);
//     document.body.style.overflow = ""; // reset scroll
//     gsap.set(menuRef.current, { display: "none", x: "100%" });
//   }, [location.pathname]);

//   const navLinks = [
//     { path: "/about", label: "About" },
//     { path: "/products", label: "Products" },
//     { path: "/contact", label: "Contact" },
//     { path: "/cart", label: "Cart 🛒" },
//   ];

//   return (
//     <nav className="sticky top-0 left-0 right-0 z-40 flex items-center justify-between px-6 min-h-[75px] bg-emerald-600 text-black font-medium">
//       {/* Logo */}
//       <Link ref={logoRef} to="/" className="text-3xl font-extrabold select-none">
//         BasketFiller
//       </Link>

//       {/* Desktop Links */}
//       <div className="flex">
//         <button
//           onClick={LogOutHandler}
//           className="bg-red-500 text-white active:bg-red-700 rounded-full px-4 py-2"
//         >
//           Log Out
//         </button>
//         <div className="hidden md:flex items-center gap-6 text-2xl ml-6">
//           {navLinks.map((link, i) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               ref={(el) => (desktopLinksRef.current[i] = el)}
//               className={`transition hover:text-white ${
//                 location.pathname === link.path ? "underline" : ""
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Toggle Button */}
//       <button
//         ref={buttonRef}
//         onClick={toggleMenu}
//         aria-expanded={menuOpen}
//         aria-controls="mobile-menu"
//         className="md:hidden text-3xl z-50"
//       >
//         {menuOpen ? "✖" : "☰"}
//       </button>

//       {/* Mobile Fullscreen Menu */}
//       <div
//         id="mobile-menu"
//         ref={menuRef}
//         className="sticky w-screen h-screen bg-emerald-700 text-white flex flex-col items-center justify-center gap-8 text-2xl z-40"
//         style={{ display: "none", transform: "translateX(100%)" }}
//         role="dialog"
//         aria-modal="true"
//       >
//         {navLinks.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             onClick={toggleMenu}
//             className={`hover:text-gray-200 ${
//               location.pathname === link.path ? "underline" : ""
//             }`}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

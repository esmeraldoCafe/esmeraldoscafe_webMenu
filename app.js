const { useState, useEffect, useRef } = React;

/* ================= ICONS ================= */
const Svg = ({ size = 24, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const IconUser = (p) => (
  <Svg {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);

const IconEye = (p) => (
  <Svg {...p}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

const IconEyeOff = (p) => (
  <Svg {...p}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Svg>
);

const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

const IconFb = (p) => (
  <Svg {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Svg>
);

const IconIg = (p) => (
  <Svg {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </Svg>
);

/* ================= HELPERS ================= */
const fmt = (n) => `₱${n}`;
const priceLabel = (p) => {
  if (!p.prices || p.prices.length === 0) return "Malaman";
  if (p.prices.length === 1) return fmt(p.prices[0]);
  return `Regular ${fmt(p.prices[0])} | Large ${fmt(p.prices[1])}`;
};

/* ================= HEADER ================= */
function Header({ view, setView, currentStaff, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    if (
      window.confirm(
        "Are you sure you want to log out? Any unsaved changes might be lost.",
      )
    ) {
      setIsDropdownOpen(false);
      onLogout();
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-emerald-brand shadow-md py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 relative">
        {/* Left Spacer to keep the title centered */}
        <div className="w-10"></div>

        {/* Centered Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1
            className="text-cream font-bold text-xl md:text-2xl whitespace-nowrap cursor-pointer"
            onClick={() => setView("customer")}
          >
            Esmeraldo's Café
          </h1>
        </div>

        {/* Right Side: Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="rounded-full bg-emerald-dark/50 p-2 text-cream hover:bg-gold hover:text-emerald-brand transition-colors flex items-center gap-2 border border-cream/30"
          >
            <IconUser size={20} />
            {currentStaff && (
              <span className="text-xs font-bold pr-2 hidden sm:block">
                {currentStaff.name}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden text-sm z-50">
              <div className="bg-gray-50 p-3 border-b">
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Current View
                </p>
                <p className="font-bold text-emerald-brand">
                  {view === "staff" ? "Staff Dashboard" : "Customer View"}
                </p>
              </div>
              {view === "customer" && (
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setView("login");
                  }}
                  className="w-full text-left px-4 py-3 text-emerald-brand hover:bg-cream font-bold border-b"
                >
                  Staff Login
                </button>
              )}
              {view === "staff" && (
                <>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setView("staff");
                    }}
                    className="w-full text-left px-4 py-3 text-emerald-brand hover:bg-cream font-bold border-b"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-bold"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

/* ================= HERO SECTION ================= */
function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-cream pt-20"
      style={{
        background:
          "radial-gradient(circle at center, #0a5436 0%, #042b1c 100%)",
      }}
    >
      <div className="text-center px-4 flex flex-col items-center">
        {!imageError ? (
          <img
            src="logo.png"
            alt="Esmeraldo's Cafe"
            className="mx-auto w-64 md:w-96 lg:w-[500px] mb-8 drop-shadow-2xl"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-64 md:w-96 lg:w-[500px] mb-8 border-4 border-dashed border-emerald-dark p-10 flex items-center justify-center">
            <span className="text-cream/50 font-bold text-xl">
              LOGO.PNG MISSING
            </span>
          </div>
        )}
        <p className="text-xl md:text-2xl font-bold text-gray-200 drop-shadow-md">
          partnership ni angkol
        </p>
      </div>
    </section>
  );
}

/* ================= CUSTOMER COMPONENTS ================= */
function ProductCard({ product }) {
  const { name, image_url, is_available, is_new } = product;
  return (
    <div
      className={`product-card relative flex flex-col overflow-hidden rounded-lg bg-white border border-gray-200 ${!is_available ? "opacity-60" : ""}`}
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-gray-50 relative">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="placeholder-text">SALPAK MO RITO</span>
          </div>
        )}
      </div>
      {is_new && (
        <span className="absolute left-2 top-2 rounded bg-gold px-2 py-0.5 text-xs font-semibold text-emerald-dark">
          New
        </span>
      )}
      {!is_available && (
        <span className="absolute right-2 top-2 rounded bg-charcoal px-2 py-0.5 text-xs text-white">
          Sold Out
        </span>
      )}
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-800">{name}</h3>
        <p className="mt-1 text-sm price-text">{priceLabel(product)}</p>
      </div>
    </div>
  );
}

function MenuGrid({ products }) {
  const [category, setCategory] = useState("All");
  const shown =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-center text-3xl font-bold mb-6 text-black">Menu</h2>

      <div className="sticky top-[68px] z-20 bg-[#f6f5f4] py-3 -mx-4 px-4 shadow-sm flex gap-2 overflow-x-auto hide-scrollbar">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${c === category ? "border-emerald-brand bg-emerald-brand text-cream" : "border-gray-300 text-gray-600 hover:border-gold hover:text-gold bg-white"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ================= STAFF COMPONENTS ================= */
function StaffLogin({ onLogin, onBack }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validStaff = staffDatabase.find(
      (staff) =>
        staff.name.toLowerCase() === name.toLowerCase() &&
        staff.password === password,
    );
    if (validStaff) onLogin(validStaff);
    else setError("Invalid Name or Password.");
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 py-20 pt-32">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-t-4 border-emerald-brand">
        <h2 className="text-2xl font-bold text-center text-emerald-brand mb-6">
          STAFF LOGIN
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-600 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Maria Clara"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-brand"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-brand pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-brand"
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm font-bold text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-emerald-brand text-white py-3 rounded font-bold hover:bg-emerald-dark transition mt-2"
          >
            Access Dashboard
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-gray-500 text-sm underline mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

function StaffDashboard({ menuData, setMenuData, currentStaff }) {
  const [newItem, setNewItem] = useState({
    category: CATEGORIES[0],
    name: "",
    regPrice: "",
    largePrice: "",
  });

  const toggleAvailability = (id) => {
    setMenuData(
      menuData.map((item) =>
        item.id === id ? { ...item, is_available: !item.is_available } : item,
      ),
    );
  };

  const deleteItem = (id) => {
    if (
      window.confirm(
        "Are you sure you want to DELETE this dish? This cannot be undone.",
      )
    ) {
      setMenuData(menuData.filter((item) => item.id !== id));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.regPrice)
      return alert("Please fill in name and regular price.");

    if (
      window.confirm(
        `Are you sure you want to add ${newItem.name} to the menu?`,
      )
    ) {
      const newId = (
        Math.max(...menuData.map((i) => parseInt(i.id) || 0)) + 1
      ).toString();

      const prices = [parseInt(newItem.regPrice)];
      if (newItem.largePrice) prices.push(parseInt(newItem.largePrice));

      setMenuData([
        ...menuData,
        {
          id: newId,
          name: newItem.name,
          prices: prices,
          category: newItem.category,
          image_url: null,
          is_available: true,
          is_new: true,
          options: [],
        },
      ]);

      setNewItem({ ...newItem, name: "", regPrice: "", largePrice: "" });
      alert("Item added successfully!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 md:p-8 pt-32">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-emerald-brand">
          STAFF DASHBOARD
        </h1>
        <p className="text-gray-600">
          Welcome,{" "}
          <span className="font-bold text-gold">{currentStaff?.name}</span>!
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-gold">
        <h2 className="text-xl font-bold mb-4 text-emerald-brand">
          Add New Dish
        </h2>
        <form
          onSubmit={handleAddItem}
          className="flex flex-col md:flex-row gap-4"
        >
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="border p-2 rounded flex-1"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Dish Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Regular Price"
            value={newItem.regPrice}
            onChange={(e) =>
              setNewItem({ ...newItem, regPrice: e.target.value })
            }
            className="border p-2 rounded w-full md:w-32"
          />
          <input
            type="number"
            placeholder="Large Price (Optional)"
            value={newItem.largePrice}
            onChange={(e) =>
              setNewItem({ ...newItem, largePrice: e.target.value })
            }
            className="border p-2 rounded w-full md:w-32"
          />
          <button
            type="submit"
            className="bg-emerald-brand text-white px-6 py-2 rounded font-bold hover:bg-emerald-dark"
          >
            Add
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-8 pb-20">
        {CATEGORIES.map((category) => {
          const items = menuData.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div
              key={category}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-emerald-brand border-b pb-2 mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col p-3 border rounded ${!item.is_available ? "bg-gray-100" : ""}`}
                  >
                    <div className="mb-2">
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs font-bold text-black">
                        {item.prices && item.prices.length === 2
                          ? `Reg ₱${item.prices[0]} | Lrg ₱${item.prices[1]}`
                          : item.prices && item.prices.length === 1
                            ? `₱${item.prices[0]}`
                            : "Malaman"}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-auto pt-2 border-t border-gray-200">
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        className={`px-2 py-1 text-xs rounded text-white flex-1 ${item.is_available ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}
                      >
                        {item.is_available ? "Out of Stock" : "Mark Available"}
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded flex-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer className="bg-emerald-brand py-10 text-center text-cream mt-12">
      <p className="text-lg italic font-bold">
        "Care no less char, ewan ko, baka may tagline sila"
      </p>
      <div className="mt-4 flex items-center justify-center gap-5">
        <a
          href="https://www.facebook.com/share/19r92beb3W/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-gold transition-colors"
        >
          <IconFb />
        </a>
        <a
          href="https://www.instagram.com/esmeraldoscafe?rpxt=dTFlM3R4MzRyYXg="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-gold transition-colors"
        >
          <IconIg />
        </a>
        <a
          href="tel:09567993648"
          className="flex items-center gap-1 hover:text-gold font-bold transition-colors"
        >
          <IconPhone size={18} /> 0956-799-3648
        </a>
      </div>
      <p className="mt-4 text-xs text-cream/60">© Esmeraldo's Cafe</p>
    </footer>
  );
}

/* ================= MAIN APP ================= */
function App() {
  const [view, setView] = useState("customer");
  const [currentStaff, setCurrentStaff] = useState(null);

  // BUMPED TO v10 TO LOAD THE NEW STANDARDIZED FILENAMES
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem("esmeraldos_menu_v10");
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem("esmeraldos_menu_v10", JSON.stringify(menuData));
  }, [menuData]);

  const handleLogin = (staff) => {
    setCurrentStaff(staff);
    setView("staff");
  };

  const handleLogout = () => {
    setCurrentStaff(null);
    setView("customer");
  };

  const featured = FEATURED_IDS.map((id) =>
    menuData.find((p) => p.id === id),
  ).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header
        view={view}
        setView={setView}
        currentStaff={currentStaff}
        onLogout={handleLogout}
      />

      {view === "customer" && (
        <main className="flex-grow">
          <Hero />
          <section
            id="about"
            className="mx-auto max-w-3xl px-4 py-12 text-center"
          >
            <h2 className="text-3xl font-bold text-black">About Us</h2>
            <p className="mt-4 text-lg">BAHALA MUNA SI BATMAN</p>
          </section>
          <section className="mx-auto max-w-6xl px-4 pb-4">
            <h2 className="text-center text-3xl font-bold mb-6 text-black">
              Featured Items
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
          <MenuGrid products={menuData} />
        </main>
      )}

      {view === "login" && (
        <main className="flex-grow bg-[#f6f5f4]">
          <StaffLogin
            onLogin={handleLogin}
            onBack={() => setView("customer")}
          />
        </main>
      )}

      {view === "staff" && currentStaff && (
        <main className="flex-grow bg-[#f6f5f4]">
          <StaffDashboard
            menuData={menuData}
            setMenuData={setMenuData}
            currentStaff={currentStaff}
          />
        </main>
      )}

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

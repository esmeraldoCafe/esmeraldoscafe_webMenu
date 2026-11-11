const { useState, useEffect, useRef } = React;

/* SUPABASE CONFIGURATION */
const SUPABASE_URL = "https://wvesfkcmtvfubvkcirrk.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZXNma2NtdHZmdWJ2a2NpcnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MDYxMTgsImV4cCI6MjEwOTQ4MjExOH0.SdA0LVvhTZpjHcZXUc6FBOM0K_gUbC6wBVynbIb3Yho";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ICONS */
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
const IconX = (p) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
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

/* HELPERS */
const fmt = (n) => `₱${n}`;
const priceLabel = (p) => {
  let pArr = p.prices;
  if (typeof pArr === "string") {
    try {
      pArr = JSON.parse(pArr);
    } catch (e) {
      pArr = [];
    }
  }
  if (!pArr || pArr.length === 0) return "Price Unavailable";
  if (pArr.length === 1) return fmt(pArr[0]);
  return `Regular ${fmt(pArr[0])} | Large ${fmt(pArr[1])}`;
};

/* FLOATING INPUT */
function FloatingInput({ label, className, ...props }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative w-full">
      <input
        className={`peer w-full px-4 py-3 border rounded-lg bg-transparent outline-none border-gray-300 focus:border-emerald-brand transition-colors ${className || ""}`}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      />
      <label
        className={`absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-emerald-brand ${focused || hasValue ? "-top-2.5 left-3 text-xs bg-white px-1" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}

/* HEADER */
function Header({ view, setView, currentStaff, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsDropdownOpen(false);
      onLogout();
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-emerald-brand shadow-md py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 relative">
        <div className="w-10"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1
            className="text-cream font-bold text-xl md:text-2xl whitespace-nowrap cursor-pointer"
            onClick={() => setView("customer")}
          >
            Esmeraldo's Café
          </h1>
        </div>
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
                  {view === "staff"
                    ? "Staff Dashboard"
                    : view === "settings"
                      ? "Store Settings"
                      : "Customer View"}
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
                      setView("settings");
                    }}
                    className="w-full text-left px-4 py-3 text-emerald-brand hover:bg-cream font-bold border-b"
                  >
                    Store Settings
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-bold"
                  >
                    Logout
                  </button>
                </>
              )}

              {view === "settings" && (
                <>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setView("staff");
                    }}
                    className="w-full text-left px-4 py-3 text-emerald-brand hover:bg-cream font-bold border-b"
                  >
                    Back to Dashboard
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

/* HERO SECTION */
function Hero() {
  const [imageError, setImageError] = useState(false);
  return (
    <section className="relative w-full flex items-center justify-center bg-emerald-brand py-12">
      <div className="text-center px-4 flex flex-col items-center w-full max-w-4xl mx-auto">
        {!imageError ? (
          <img
            src="logo.png"
            alt="Logo"
            className="w-full max-w-[300px] md:max-w-[500px] object-contain drop-shadow-2xl"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full max-w-[300px] md:max-w-[500px] aspect-square border-4 border-dashed border-emerald-dark flex items-center justify-center bg-emerald-dark/30">
            <span className="text-cream/50 font-bold text-xl">
              ESMERALDO'S CAFE LOGO
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

/* PRODUCT CARD */
function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name, description, image_url, is_available, is_new } = product;
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer relative h-64 overflow-hidden rounded-xl border border-gray-200 group shadow-sm bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${!is_available ? "opacity-60" : ""}`}
      >
        {image_url ? (
          <img
            src={image_url}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <span className="placeholder-text">Image Unavailable</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

        {is_new && (
          <span className="absolute left-2 top-2 rounded bg-gold px-2 py-0.5 text-xs font-semibold text-emerald-dark z-10">
            New
          </span>
        )}
        {!is_available && (
          <span className="absolute right-2 top-2 rounded bg-charcoal px-2 py-0.5 text-xs text-white z-10">
            Sold Out
          </span>
        )}

        {/* CARD PRICE TAG*/}
        <div className="absolute bottom-0 left-0 p-4 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10 flex flex-col items-start gap-2">
          <span className="inline-block bg-black/25 backdrop-blur-sm text-[#dbb83f] text-base sm:text-base font-bold tracking-wide uppercase px-3 py-1 rounded-md shadow-sm">
            {priceLabel(product)}
          </span>

          <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {name}
          </h3>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden border border-gray-200 z-10 flex flex-col shadow-xl animate-modal">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-white/80 hover:bg-gray-100 rounded-full text-gray-800 transition-colors backdrop-blur-sm"
            >
              <IconX size={16} />
            </button>
            <div className="relative h-64 w-full shrink-0 overflow-hidden">
              {image_url ? (
                <img src={image_url} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-50">
                  <span className="placeholder-text">Image Unavailable</span>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col overflow-y-auto max-h-[40vh] custom-scrollbar">
              <p className="text-[#9e801f] text-lg font-semibold tracking-wide uppercase mb-2">
                {priceLabel(product)}
              </p>

              <h3 className="text-2xl font-bold text-emerald-brand mb-4 pb-4 border-b border-gray-200">
                {name}
              </h3>

              <div className="text-gray-700 text-base leading-relaxed grow">
                {description ? (
                  <p>{description}</p>
                ) : (
                  <p className="text-gray-400">No description available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* MENU GRID */
function MenuGrid({ products, loading }) {
  const [category, setCategory] = useState("All");
  const shown =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-bold text-emerald-brand">
        Loading menu from database...
      </div>
    );

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 pt-6 pb-12">
      <h2 className="text-center text-3xl font-bold mb-6 text-black">Menu</h2>

      <div className="sticky top-[68px] z-20 bg-[#f6f5f4] py-3 -mx-4 px-4 shadow-sm flex gap-2 overflow-x-auto custom-scrollbar-horizontal pb-3">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-5 py-2 text-base font-bold transition-all duration-300 transform ${c === category ? "border-emerald-brand bg-emerald-brand text-cream scale-105 shadow-md" : "border-gray-300 text-gray-700 hover:border-gold hover:text-gold bg-white hover:-translate-y-0.5"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* STAFF LOGIN */
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
        <h2 className="text-2xl font-bold text-center text-emerald-brand mb-8">
          STAFF LOGIN
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FloatingInput
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="relative">
            <FloatingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-brand z-10"
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
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
            className="text-gray-500 text-sm underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

/* STAFF DASHBOARD */
function StaffDashboard({ menuData, fetchMenu, currentStaff }) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    category: CATEGORIES[0],
    name: "",
    regPrice: "",
    largePrice: "",
    description: "",
    image_url: "",
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const resetForm = () => {
    setFormData({
      id: null,
      category: CATEGORIES[0],
      name: "",
      regPrice: "",
      largePrice: "",
      description: "",
      image_url: "",
    });
    setIsEditing(false);
  };

  const handleEditClick = (item) => {
    const parsedPrices =
      typeof item.prices === "string" ? JSON.parse(item.prices) : item.prices;
    setFormData({
      id: item.id,
      category: item.category,
      name: item.name,
      regPrice: parsedPrices[0] || "",
      largePrice: parsedPrices[1] || "",
      description: item.description || "",
      image_url: item.image_url || "",
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabaseClient.storage
        .from("dish-images")
        .upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data } = supabaseClient.storage
        .from("dish-images")
        .getPublicUrl(fileName);
      setFormData({ ...formData, image_url: data.publicUrl });
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regPrice)
      return alert("Please fill in name and regular price.");
    if (
      window.confirm(
        isEditing
          ? "Save changes to this dish?"
          : `Are you sure you want to add ${formData.name}?`,
      )
    ) {
      const prices = [parseInt(formData.regPrice)];
      if (formData.largePrice) prices.push(parseInt(formData.largePrice));
      const payload = {
        name: formData.name,
        category: formData.category,
        prices: prices,
        description: formData.description,
        image_url: formData.image_url || null,
      };

      if (isEditing) {
        const { error } = await supabaseClient
          .from("menu_items")
          .update(payload)
          .eq("id", formData.id);
        if (error) alert("Error updating: " + error.message);
        else {
          alert("Item updated!");
          fetchMenu();
        }
      } else {
        const { error } = await supabaseClient
          .from("menu_items")
          .insert([{ ...payload, is_available: true, is_new: true }]);
        if (error) alert("Error adding: " + error.message);
        else {
          alert("Item added!");
          fetchMenu();
        }
      }
      resetForm();
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    const { error } = await supabaseClient
      .from("menu_items")
      .update({ is_available: !currentStatus })
      .eq("id", id);
    if (!error) fetchMenu();
  };

  const deleteItem = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to DELETE this dish? This cannot be undone.",
      )
    ) {
      const { error } = await supabaseClient
        .from("menu_items")
        .delete()
        .eq("id", id);
      if (!error) fetchMenu();
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 md:p-8 pt-32">
      <div className="mb-8 border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-brand">
            STAFF DASHBOARD
          </h1>
          <p className="text-gray-600">
            Welcome,{" "}
            <span className="font-bold text-gold">{currentStaff?.name}</span>!
          </p>
        </div>
      </div>

      <div
        className={`bg-white p-4 md:p-6 rounded-lg shadow-md mb-8 border-t-4 w-full overflow-hidden ${isEditing ? "border-blue-500" : "border-gold"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-brand">
            {isEditing ? "Edit Dish" : "Add New Dish"}
          </h2>
          {isEditing && (
            <button
              onClick={resetForm}
              className="text-sm text-red-500 underline font-bold"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSaveItem} className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <input
              type="text"
              name="name"
              placeholder="Dish Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full md:col-span-2"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="regPrice"
              placeholder="Reg Price"
              value={formData.regPrice}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <input
              type="number"
              name="largePrice"
              placeholder="Large Price (Optional)"
              value={formData.largePrice}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="md:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
              <input
                type="text"
                name="image_url"
                placeholder="Image URL (auto-fills)"
                value={formData.image_url}
                readOnly
                className="border p-2 rounded w-full bg-gray-50 text-gray-500 text-sm flex-1 min-w-0"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="bg-gray-800 text-white px-4 py-2 rounded font-bold text-sm hover:bg-gray-900 whitespace-nowrap shrink-0 w-full sm:w-auto"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Dish Description (Optional)"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full h-20"
          ></textarea>

          <button
            type="submit"
            disabled={uploading}
            className={`text-white px-6 py-3 rounded font-bold w-full md:w-auto md:self-end mt-2 ${isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-brand hover:bg-emerald-dark"}`}
          >
            {isEditing ? "Save Changes" : "Add Dish"}
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
                {items.map((item) => {
                  const parsedPrices =
                    typeof item.prices === "string"
                      ? JSON.parse(item.prices)
                      : item.prices;
                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col p-3 border rounded ${!item.is_available ? "bg-gray-100" : ""}`}
                    >
                      <div className="mb-2">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs font-bold text-black">
                          {parsedPrices.length === 2
                            ? `Reg ₱${parsedPrices[0]} | Lrg ₱${parsedPrices[1]}`
                            : `₱${parsedPrices[0]}`}
                        </p>
                      </div>
                      <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2 mt-auto pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 text-[10px] sm:text-xs rounded flex-1 whitespace-nowrap"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            toggleAvailability(item.id, item.is_available)
                          }
                          className={`px-1 py-1 text-[10px] sm:text-xs rounded text-white flex-1 whitespace-nowrap ${item.is_available ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"}`}
                        >
                          {item.is_available ? "Available" : "Out of Stock"}
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 text-[10px] sm:text-xs rounded flex-1 whitespace-nowrap"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* SETTINGS VIEW */
function SettingsView({ storeSettings, setStoreSettings, onBack }) {
  const [formData, setFormData] = useState(storeSettings);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStoreSettings(formData);
    alert("Store settings saved successfully!");
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pt-32">
      <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-emerald-brand">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-brand">
            Store Settings
          </h1>
          <button
            onClick={onBack}
            className="text-sm text-gray-500 underline font-bold"
          >
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold mb-2 text-gray-700">
              About Us Text
            </label>
            <textarea
              value={formData.aboutUs}
              onChange={(e) =>
                setFormData({ ...formData, aboutUs: e.target.value })
              }
              className="border p-2 rounded w-full h-24"
            />
          </div>
          <div>
            <label className="block font-bold mb-2 text-gray-700">
              Footer Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-bold mb-2 text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-brand text-white py-3 rounded font-bold mt-4 hover:bg-emerald-dark"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

/* FOOTER */
function Footer({ settings }) {
  return (
    <footer className="bg-emerald-brand py-10 text-center text-cream mt-12 w-full">
      <p className="text-xl italic font-bold px-4">"{settings.tagline}"</p>
      <div className="mt-4 flex items-center justify-center gap-5">
        <a
          href="https://www.facebook.com/share/19r92beb3W/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          <IconFb />
        </a>
        <a
          href="https://www.instagram.com/esmeraldoscafe?rpxt=dTFlM3R4MzRyYXg="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          <IconIg />
        </a>
        <a
          href={`tel:${settings.phone}`}
          className="flex items-center gap-1 hover:text-gold font-bold transition-colors"
        >
          <IconPhone size={18} /> {settings.phone}
        </a>
      </div>
      <p className="mt-4 text-xs text-cream/60">© Esmeraldo's Cafe</p>
    </footer>
  );
}

/* MAIN APP */
function App() {
  const [view, setView] = useState(() => {
    const savedStaff = localStorage.getItem("esmeraldo_current_staff");
    return savedStaff ? "staff" : "customer";
  });

  const [currentStaff, setCurrentStaff] = useState(() => {
    const savedStaff = localStorage.getItem("esmeraldo_current_staff");
    return savedStaff ? JSON.parse(savedStaff) : null;
  });

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  // STORE SETTINGS STATE
  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem("esmeraldo_store_settings");
    return saved
      ? JSON.parse(saved)
      : {
          aboutUs:
            "Welcome To esmeraldo's cafe, your cozy corner for comfort and connection. We serve freshly brewed coffee, handcrafted pastries, and hearty meals",
          tagline: "Every bite here is made to make you smile",
          phone: "0956-799-3648",
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "esmeraldo_store_settings",
      JSON.stringify(storeSettings),
    );
  }, [storeSettings]);

  // FETCH MENU FROM SUPABASE
  const fetchMenu = async () => {
    const { data, error } = await supabaseClient
      .from("menu_items")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setMenuData(data || []);
  };

  // INITIAL MIGRATION LOGIC
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      const isMigrated = localStorage.getItem("esmeraldo_menu_migrated_v3");

      if (!isMigrated) {
        const { data: existingData } = await supabaseClient
          .from("menu_items")
          .select("name");
        const existingNames = existingData
          ? existingData.map((d) => d.name)
          : [];

        const toInsert = PRODUCTS.filter(
          (p) => !existingNames.includes(p.name),
        ).map((p) => ({
          name: p.name,
          category: p.category,
          prices: p.prices,
          description: p.description || "",
          image_url: p.image_url || null,
          is_available: true,
          is_new: p.is_new || false,
        }));

        if (toInsert.length > 0) {
          await supabaseClient.from("menu_items").insert(toInsert);
        }
        localStorage.setItem("esmeraldo_menu_migrated_v3", "true");
      }

      await fetchMenu();
      setLoading(false);
    };

    initializeApp();
  }, []);

  const handleLogin = (staff) => {
    setCurrentStaff(staff);
    setView("staff");
    localStorage.setItem("esmeraldo_current_staff", JSON.stringify(staff));
  };

  const handleLogout = () => {
    setCurrentStaff(null);
    setView("customer");
    localStorage.removeItem("esmeraldo_current_staff");
  };

  return (
    <div className="min-h-screen flex flex-col relative w-full">
      <Header
        view={view}
        setView={setView}
        currentStaff={currentStaff}
        onLogout={handleLogout}
      />

      {view === "customer" && (
        <main className="flex-grow pt-[68px]">
          <Hero />

          <section
            id="about"
            className="mx-auto max-w-3xl px-4 pt-12 pb-4 text-center"
          >
            <h2 className="text-4xl font-bold text-black mb-4">About Us</h2>
            <p className="mt-4 text-xl text-gray-800 leading-relaxed">
              {storeSettings.aboutUs}
            </p>
          </section>

          <MenuGrid products={menuData} loading={loading} />
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
            fetchMenu={fetchMenu}
            currentStaff={currentStaff}
          />
        </main>
      )}

      {view === "settings" && currentStaff && (
        <main className="flex-grow bg-[#f6f5f4]">
          <SettingsView
            storeSettings={storeSettings}
            setStoreSettings={setStoreSettings}
            onBack={() => setView("staff")}
          />
        </main>
      )}

      <Footer settings={storeSettings} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import { useMemo, useState } from "react";
import "./App.css";

const menuItems = [
  ["Milliy palov", "Milliy taomlar", 50000, "An’anaviy usulda tayyorlangan xushbo‘y palov.", "🍛"],
  ["Maxsus kabob", "Kaboblar", 70000, "Ko‘mirda pishirilgan shirali go‘sht.", "🍢"],
  ["Sezar salati", "Salatlar", 35000, "Yangi sabzavotlar va maxsus sous.", "🥗"],
  ["Lag‘mon", "Milliy taomlar", 45000, "Uy usulida tayyorlangan mazali lag‘mon.", "🍜"],
  ["Toshkent shashligi", "Kaboblar", 65000, "Yumshoq go‘sht va maxsus ziravorlar.", "🥩"],
  ["Achichuk salati", "Salatlar", 25000, "Pomidor, piyoz va yangi ko‘katlar.", "🥒"],
  ["Mastava", "Milliy taomlar", 30000, "Issiq va mazali milliy sho‘rva.", "🍲"],
  ["Qanotcha", "Kaboblar", 55000, "Maxsus sousda tayyorlangan tovuq qanotlari.", "🍗"],
].map(([name, category, price, description, emoji], index) => ({
  id: index + 1,
  name,
  category,
  price,
  description,
  emoji,
}));

const tables = [
  ["Oddiy", 2, "left"],
  ["Oilaviy", 6, "center"],
  ["VIP", 8, "right"],
  ["Oilaviy", 6, "left"],
  ["Oddiy", 2, "center"],
  ["Premium", 10, "right"],
  ["Oilaviy", 8, "left"],
  ["Oddiy", 4, "center"],
  ["VIP", 12, "right"],
  ["Premium", 10, "left"],
  ["Oddiy", 4, "center"],
  ["Premium", 10, "right"],
].map(([type, capacity, position], index) => ({
  id: index + 1,
  name: `Stol ${index + 1}`,
  type,
  capacity,
  position,
  status: [2, 5, 9].includes(index + 1) ? "reserved" : "available",
}));

const categories = ["Barchasi", "Milliy taomlar", "Kaboblar", "Salatlar"];
const today = new Date().toISOString().split("T")[0];
const emptyBooking = { name: "", phone: "", date: "", time: "", comment: "" };

export default function App() {
  const [category, setCategory] = useState("Barchasi");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState("Barcha sig‘imlar");
  const [tableType, setTableType] = useState("Barchasi");
  const [booking, setBooking] = useState(emptyBooking);
  const [success, setSuccess] = useState(false);

  const filteredItems = useMemo(
    () =>
      category === "Barchasi"
        ? menuItems
        : menuItems.filter((item) => item.category === category),
    [category]
  );

  const filteredTables = useMemo(
    () =>
      tables.filter((table) => {
        const capacityMatch =
          guestCount === "Barcha sig‘imlar" ||
          table.capacity >= Number(guestCount);

        const typeMatch =
          tableType === "Barchasi" || table.type === tableType;

        return capacityMatch && typeMatch;
      }),
    [guestCount, tableType]
  );

  const openBooking = () => {
    setBookingOpen(true);
    setStep(1);
    setSuccess(false);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedTable(null);
    setStep(1);
    setSuccess(false);
    setGuestCount("Barcha sig‘imlar");
    setTableType("Barchasi");
    setBooking(emptyBooking);
  };

  const changeBooking = ({ target: { name, value } }) => {
    setBooking((old) => ({ ...old, [name]: value }));
  };

  const submitBooking = (event) => {
    event.preventDefault();

    if (!selectedTable) {
      alert("Avval stol tanlang.");
      return;
    }

    if (!booking.name || !booking.phone || !booking.date || !booking.time) {
      alert("Iltimos, barcha majburiy maydonlarni to‘ldiring.");
      return;
    }

    if (booking.date < today) {
      alert("Iltimos, bugungi yoki kelajakdagi sanani tanlang.");
      return;
    }

    const orderData = {
      name: booking.name,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      comment: booking.comment,
      table: selectedTable.name,
      tableType: selectedTable.type,
      capacity: selectedTable.capacity,
    };

    const telegram = window.Telegram?.WebApp;

    if (telegram) {
      telegram.ready();
      telegram.sendData(JSON.stringify(orderData));
      telegram.close();
      return;
    }

    setSuccess(true);
    setStep(3);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container navbar">
          <a href="#home" className="logo">
            RESTAURANT<span>.</span>
          </a>

          <nav className="nav-links">
            <a href="#home">Bosh sahifa</a>
            <a href="#about">Biz haqimizda</a>
            <a href="#menu">Menyu</a>
            <a href="#contact">Aloqa</a>
          </nav>

          <button className="header-button" onClick={openBooking}>
            Joy bron qilish
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay">
            <div className="container hero-content">
              <p className="eyebrow">RESTAURANT EXPERIENCE</p>
              <h1>
                Mazali taomlar,
                <br />
                <span>yoqimli lahzalar</span>
              </h1>
              <p className="hero-text">
                Milliy va zamonaviy taomlarning o‘ziga xos uyg‘unligi.
                Har bir mehmonimiz uchun unutilmas ta’m va qulay muhit.
              </p>
              <div className="hero-actions">
                <a href="#menu" className="primary-button">
                  Menyuni ko‘rish
                </a>
                <button className="secondary-button" onClick={openBooking}>
                  Joy bron qilish
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">BIZ HAQIMIZDA</p>
              <h2>
                Har bir taomda
                <br />
                <span>mehr va sifat</span>
              </h2>
              <p className="section-text">
                Restaurant — mazali taomlar, qulay muhit va samimiy xizmat
                uyg‘unlashgan zamonaviy restoran platformasi.
              </p>
              <a href="#contact" className="text-link">
                Biz bilan bog‘lanish →
              </a>
            </div>

            <div className="about-card">
              <div className="about-card-icon">✦</div>
              <h3>Yuqori sifat</h3>
              <p>
                Faqat yangi va sifatli mahsulotlardan foydalanishga e’tibor
                qaratamiz.
              </p>
            </div>
          </div>
        </section>

        <section className="menu section" id="menu">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">MAZALI TANLOV</p>
              <h2>
                Bizning <span>menyu</span>
              </h2>
              <p className="section-text">
                O‘zingizga yoqqan taomni tanlang.
              </p>
            </div>

            <div className="category-buttons">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {filteredItems.map((item) => (
                <article className="menu-card" key={item.id}>
                  <div className="food-image">{item.emoji}</div>
                  <div className="menu-card-content">
                    <p className="food-category">{item.category}</p>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <strong className="food-price">
                      {new Intl.NumberFormat("uz-UZ").format(item.price)} so‘m
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-section section">
          <div className="container booking-banner">
            <div>
              <p className="eyebrow">OLDINDAN JOY TANLANG</p>
              <h2>
                Restoranda o‘zingizga
                <br />
                <span>mos joyni band qiling</span>
              </h2>
              <p>
                Oddiy, oilaviy, VIP va Premium joylardan birini tanlang.
              </p>
            </div>

            <button className="primary-button" onClick={openBooking}>
              Restoran xaritasini ochish
            </button>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container contact-box">
            <div>
              <p className="eyebrow">ALOQA</p>
              <h2>Biz sizni kutamiz</h2>
              <p>
                Mazali taomlar va yoqimli muhit uchun restoranimizga tashrif
                buyuring.
              </p>
            </div>

            <div className="contact-info">
              <p>📍 Sizning shahringiz</p>
              <p>📞 +998 90 000 00 00</p>
              <p>🕒 Har kuni 09:00–22:00</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Restaurant. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

      {bookingOpen && (
        <div className="modal-overlay" onClick={closeBooking}>
          <div
            className="booking-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={closeBooking}>
              ×
            </button>

            <div className="booking-steps">
              <span className={step >= 1 ? "active" : ""}>1. Stol</span>
              <span className={step >= 2 ? "active" : ""}>2. Ma’lumot</span>
              <span className={step >= 3 ? "active" : ""}>3. Yakun</span>
            </div>

            {step === 1 && (
              <>
                <div className="modal-heading">
                  <p className="eyebrow">JOY TANLASH</p>
                  <h2>Restoran xaritasi</h2>
                  <p>O‘zingizga mos joyni filtr orqali tanlang.</p>
                </div>

                <div className="booking-filters">
                  <label>
                    Mehmonlar soni
                    <select
                      value={guestCount}
                      onChange={(event) => {
                        setGuestCount(event.target.value);
                        setSelectedTable(null);
                      }}
                    >
                      <option value="Barcha sig‘imlar">
                        Barcha sig‘imlar
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((count) => (
                        <option value={count} key={count}>
                          {count} kishilik
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Joy turi
                    <select
                      value={tableType}
                      onChange={(event) => {
                        setTableType(event.target.value);
                        setSelectedTable(null);
                      }}
                    >
                      {["Barchasi", "Oddiy", "Oilaviy", "VIP", "Premium"].map(
                        (type) => (
                          <option key={type}>{type}</option>
                        )
                      )}
                    </select>
                  </label>
                </div>

                <div className="map-legend">
                  <span>🟢 Bo‘sh</span>
                  <span>🔴 Band</span>
                  <span>🟡 Tanlangan</span>
                </div>

                <div className="restaurant-map">
                  <div className="entrance">KIRISH</div>

                  <div className="tables-grid">
                    {filteredTables.map((table) => (
                      <button
                        key={table.id}
                        disabled={table.status === "reserved"}
                        className={`table-card ${
                          table.status === "reserved" ? "reserved" : ""
                        } ${
                          selectedTable?.id === table.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedTable(table)}
                      >
                        <strong>{table.name}</strong>
                        <small>{table.type} joy</small>
                        <small>{table.capacity} kishilik</small>
                        <b>
                          {table.status === "reserved"
                            ? "Band"
                            : selectedTable?.id === table.id
                            ? "Tanlandi"
                            : "Bo‘sh"}
                        </b>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTable && (
                  <div className="selected-table-info">
                    <h3>{selectedTable.name}</h3>
                    <p>
                      Joy turi: <strong>{selectedTable.type}</strong>
                    </p>
                    <p>
                      Sig‘imi: <strong>{selectedTable.capacity} kishi</strong>
                    </p>
                    <p className="booking-price">
                      Bron qilish to‘lovi: <strong>20,000 so‘m</strong>
                    </p>
                    <button
                      className="primary-button"
                      onClick={() => setStep(2)}
                    >
                      Shu joyni tanlash
                    </button>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <form className="booking-form" onSubmit={submitBooking}>
                <div className="modal-heading">
                  <p className="eyebrow">MA’LUMOTLAR</p>
                  <h2>Bron qilish</h2>
                  <p>
                    Tanlangan joy: <strong>{selectedTable?.name}</strong>
                  </p>
                </div>

                <label>
                  Ismingiz *
                  <input
                    required
                    name="name"
                    value={booking.name}
                    onChange={changeBooking}
                    placeholder="Ismingizni kiriting"
                  />
                </label>

                <label>
                  Telefon raqamingiz *
                  <input
                    required
                    name="phone"
                    value={booking.phone}
                    onChange={changeBooking}
                    placeholder="+998 90 000 00 00"
                  />
                </label>

                <div className="form-row">
                  <label>
                    Sana *
                    <input
                      required
                      min={today}
                      type="date"
                      name="date"
                      value={booking.date}
                      onChange={changeBooking}
                    />
                  </label>

                  <label>
                    Vaqt *
                    <input
                      required
                      type="time"
                      name="time"
                      value={booking.time}
                      onChange={changeBooking}
                    />
                  </label>
                </div>

                <label>
                  Qo‘shimcha izoh
                  <textarea
                    name="comment"
                    value={booking.comment}
                    onChange={changeBooking}
                    placeholder="Qo‘shimcha istaklaringiz..."
                  />
                </label>

                <div className="booking-form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setStep(1)}
                  >
                    Ortga
                  </button>
                  <button className="primary-button">Bronni tasdiqlash</button>
                </div>
              </form>
            )}

            {step === 3 && success && (
              <div className="success-screen">
                <div className="success-icon">✓</div>
                <h2>Bron so‘rovi tayyor!</h2>
                <p>
                  {selectedTable?.name} uchun bron ma’lumotlaringiz qabul
                  qilindi.
                </p>

                <div className="success-details">
                  <p><strong>Ism:</strong> {booking.name}</p>
                  <p><strong>Telefon:</strong> {booking.phone}</p>
                  <p><strong>Sana:</strong> {booking.date}</p>
                  <p><strong>Vaqt:</strong> {booking.time}</p>
                </div>

                <p className="demo-warning">
                  Bu hozircha demo rejim. API ulangandan keyin ma’lumotlar
                  administratorga yuboriladi.
                </p>

                <button className="primary-button" onClick={closeBooking}>
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

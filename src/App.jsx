import { useState } from "react";
import "./App.css";

const menuItems = [
  {
    id: 1,
    name: "Milliy palov",
    category: "Milliy taomlar",
    price: 50000,
    description: "An’anaviy o‘zbek palovi, sabzi va mayiz bilan",
    emoji: "🍛",
  },
  {
    id: 2,
    name: "Navbahor kabobi",
    category: "Kaboblar",
    price: 70000,
    description: "Ko‘mirda pishirilgan shirali go‘sht",
    emoji: "🍢",
  },
  {
    id: 3,
    name: "Sezar salati",
    category: "Salatlar",
    price: 35000,
    description: "Yangi sabzavotlar va maxsus sous bilan",
    emoji: "🥗",
  },
  {
    id: 4,
    name: "Lag‘mon",
    category: "Milliy taomlar",
    price: 45000,
    description: "Uy usulida tayyorlangan mazali lag‘mon",
    emoji: "🍜",
  },
  {
    id: 5,
    name: "Toshkent shashligi",
    category: "Kaboblar",
    price: 65000,
    description: "Ko‘mirda pishirilgan shirali shashlik",
    emoji: "🥩",
  },
  {
    id: 6,
    name: "Achichuk salati",
    category: "Salatlar",
    price: 25000,
    description: "Pomidor, piyoz va ko‘katlardan tayyorlanadi",
    emoji: "🥒",
  },
];

const tables = [
  {
    id: 1,
    name: "Stol 1",
    type: "Oddiy",
    capacity: 2,
    status: "available",
    price: 20000,
  },
  {
    id: 2,
    name: "Stol 2",
    type: "Oilaviy",
    capacity: 6,
    status: "reserved",
    price: 60000,
  },
  {
    id: 3,
    name: "Stol 3",
    type: "VIP",
    capacity: 8,
    status: "available",
    price: 120000,
  },
  {
    id: 4,
    name: "Stol 4",
    type: "Oilaviy",
    capacity: 6,
    status: "available",
    price: 60000,
  },
  {
    id: 5,
    name: "Stol 5",
    type: "Oddiy",
    capacity: 2,
    status: "reserved",
    price: 20000,
  },
  {
    id: 6,
    name: "Stol 6",
    type: "Premium",
    capacity: 10,
    status: "available",
    price: 180000,
  },
  {
    id: 7,
    name: "Stol 7",
    type: "Oilaviy",
    capacity: 8,
    status: "available",
    price: 80000,
  },
  {
    id: 8,
    name: "Stol 8",
    type: "Oddiy",
    capacity: 4,
    status: "available",
    price: 40000,
  },
  {
    id: 9,
    name: "Stol 9",
    type: "VIP",
    capacity: 10,
    status: "reserved",
    price: 150000,
  },
  {
    id: 10,
    name: "Stol 10",
    type: "Premium",
    capacity: 4,
    status: "available",
    price: 90000,
  },
  {
    id: 11,
    name: "Stol 11",
    type: "Oddiy",
    capacity: 1,
    status: "available",
    price: 10000,
  },
  {
    id: 12,
    name: "Stol 12",
    type: "Premium",
    capacity: 8,
    status: "available",
    price: 140000,
  },
];

const categories = [
  "Barchasi",
  "Milliy taomlar",
  "Kaboblar",
  "Salatlar",
];

const tableTypes = [
  "Barchasi",
  "Oddiy",
  "Oilaviy",
  "VIP",
  "Premium",
];

function formatPrice(price) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so‘m";
}

function App() {
  const [category, setCategory] = useState("Barchasi");

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const [capacityFilter, setCapacityFilter] = useState("Barchasi");
  const [typeFilter, setTypeFilter] = useState("Barchasi");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    comment: "",
  });

  const filteredItems =
    category === "Barchasi"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  const filteredTables = tables.filter((table) => {
    const capacityMatch =
      capacityFilter === "Barchasi" ||
      table.capacity === Number(capacityFilter);

    const typeMatch =
      typeFilter === "Barchasi" || table.type === typeFilter;

    return capacityMatch && typeMatch;
  });

  function openBooking() {
    setBookingOpen(true);
    setSelectedTable(null);
    setStep(1);
    setSuccess(false);
  }

  function closeBooking() {
    setBookingOpen(false);
    setSelectedTable(null);
    setStep(1);
    setSuccess(false);
  }

  function changeForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function nextStep(event) {
    event.preventDefault();

    if (!form.name || !form.phone || !form.date || !form.time) {
      alert("Iltimos, barcha majburiy maydonlarni to‘ldiring.");
      return;
    }

    if (Number(form.guests) > selectedTable.capacity) {
      alert(
        `Bu joy ${selectedTable.capacity} kishilik. Mehmonlar sonini kamaytiring.`
      );
      return;
    }

    setStep(3);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container navbar">
          <a href="#home" className="logo">
            NAVBAHOR<span>.</span>
          </a>

          <nav className="nav-links">
            <a href="#home">Bosh sahifa</a>
            <a href="#about">Biz haqimizda</a>
            <a href="#menu">Menyu</a>
            <a href="#booking">Joy band qilish</a>
          </nav>

          <button className="gold-button" onClick={openBooking}>
            Joy band qilish
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <p className="eyebrow">NAVBAHOR RESTAURANT</p>

            <h1>
              Mazali taomlar,
              <br />
              <span>yoqimli lahzalar</span>
            </h1>

            <p className="hero-description">
              Milliy va zamonaviy taomlarning o‘ziga xos uyg‘unligi.
              Har bir mehmonimiz uchun unutilmas ta’m.
            </p>

            <button className="gold-button" onClick={openBooking}>
              Joy band qilish
            </button>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container two-columns">
            <div>
              <p className="eyebrow">BIZ HAQIMIZDA</p>

              <h2>
                Har bir taomda
                <br />
                <span>mehr va sifat</span>
              </h2>

              <p className="muted">
                Navbahor — milliy taomlar, qulay muhit va samimiy
                xizmat uyg‘unlashgan restoran. Biz mehmonlarimizga
                har kuni yangi va mazali taomlarni taqdim etamiz.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">✦</div>

              <h3>Qulay bron qilish</h3>

              <p>
                Restoranga kelishdan oldin o‘zingizga mos stolni
                tanlang va joyingizni oldindan band qiling.
              </p>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">MAZALI TANLOV</p>

              <h2>
                Bizning <span>menyu</span>
              </h2>

              <p className="muted">
                Taomlarimiz bilan oldindan tanishib chiqing.
              </p>
            </div>

            <div className="categories">
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

                  <div className="card-content">
                    <small>{item.category}</small>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <strong>{formatPrice(item.price)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking-promo" id="booking">
          <div className="container two-columns">
            <div>
              <p className="eyebrow">OLDINDAN BAND QILING</p>

              <h2>
                O‘zingizga qulay
                <br />
                <span>stolni tanlang</span>
              </h2>

              <p className="muted">
                Restoran xaritasidan bo‘sh joyni tanlang.
                Oddiy, oilaviy, VIP va premium joylar mavjud.
              </p>
            </div>

            <div className="promo-action">
              <button className="gold-button" onClick={openBooking}>
                Restoran xaritasini ochish
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        © 2026 Navbahor Restaurant. Barcha huquqlar himoyalangan.
      </footer>

      {bookingOpen && (
        <div className="overlay" onClick={closeBooking}>
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="close-button" onClick={closeBooking}>
              ×
            </button>

            {success ? (
              <div className="success">
                <div className="success-icon">✓</div>

                <h2>Joyingiz band qilindi!</h2>

                <p>
                  Rahmat, {form.name}. Demo bron muvaffaqiyatli
                  yakunlandi.
                </p>

                <button className="gold-button" onClick={closeBooking}>
                  Yopish
                </button>
              </div>
            ) : (
              <>
                <div className="steps">
                  <span className={step >= 1 ? "current" : ""}>
                    1. Stol
                  </span>

                  <span className={step >= 2 ? "current" : ""}>
                    2. Ma’lumot
                  </span>

                  <span className={step >= 3 ? "current" : ""}>
                    3. To‘lov
                  </span>
                </div>

                {step === 1 && (
                  <>
                    <h2>Restoran xaritasi</h2>

                    <p className="muted">
                      O‘zingizga mos joyni filtr orqali tanlang.
                    </p>

                    <div className="filter-panel">
                      <div className="filter-group">
                        <label>Mehmonlar soni</label>

                        <select
                          value={capacityFilter}
                          onChange={(event) =>
                            setCapacityFilter(event.target.value)
                          }
                        >
                          <option value="Barchasi">
                            Barcha sig‘imlar
                          </option>

                          {Array.from(
                            { length: 10 },
                            (_, index) => index + 1
                          ).map((number) => (
                            <option key={number} value={number}>
                              {number} kishilik
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-group">
                        <label>Joy turi</label>

                        <select
                          value={typeFilter}
                          onChange={(event) =>
                            setTypeFilter(event.target.value)
                          }
                        >
                          {tableTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="map-legend">
                      <span>
                        <i className="legend available-color"></i>
                        Bo‘sh
                      </span>

                      <span>
                        <i className="legend reserved-color"></i>
                        Band
                      </span>

                      <span>
                        <i className="legend selected-color"></i>
                        Tanlangan
                      </span>
                    </div>

                    <div className="map">
                      <div className="entrance">KIRISH</div>

                      {filteredTables.length === 0 ? (
                        <div className="no-tables">
                          Bu filtr bo‘yicha joy topilmadi.
                        </div>
                      ) : (
                        <div className="table-grid">
                          {filteredTables.map((table) => (
                            <button
                              key={table.id}
                              disabled={table.status === "reserved"}
                              className={`table ${
                                table.status === "reserved"
                                  ? "reserved"
                                  : ""
                              } ${
                                selectedTable?.id === table.id
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => setSelectedTable(table)}
                            >
                              <span className="table-number">
                                {String(table.id).padStart(2, "0")}
                              </span>

                              <b>{table.name}</b>

                              <small>{table.type} joy</small>

                              <small>{table.capacity} kishilik</small>

                              <strong>
                                {table.status === "reserved"
                                  ? "Band"
                                  : "Bo‘sh"}
                              </strong>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedTable && (
                      <div className="selected-info">
                        <div className="selected-header">
                          <div>
                            <p className="eyebrow">TANLANGAN JOY</p>

                            <h3>{selectedTable.name}</h3>
                          </div>

                          <span className="selected-badge">
                            {selectedTable.type}
                          </span>
                        </div>

                        <div className="selected-details">
                          <p>
                            <b>Joy turi:</b> {selectedTable.type}
                          </p>

                          <p>
                            <b>Sig‘imi:</b> {selectedTable.capacity} kishi
                          </p>

                          <p>
                            <b>Holati:</b>{" "}
                            <span className="available-text">
                              Bo‘sh
                            </span>
                          </p>
                        </div>

                        <div className="image-placeholder">
                          🖼️ Bu joyning rasmi mavjud
                        </div>

                        <div className="booking-price">
                          <span>Band qilish to‘lovi</span>

                          <b>{formatPrice(selectedTable.price)}</b>
                        </div>

                        <button
                          className="gold-button"
                          onClick={() => setStep(2)}
                        >
                          Shu joyni tanlash
                        </button>
                      </div>
                    )}
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>Ma’lumotlaringiz</h2>

                    <p className="muted">
                      {selectedTable.name} — {selectedTable.type},{" "}
                      {selectedTable.capacity} kishilik.
                    </p>

                    <form onSubmit={nextStep}>
                      <label>
                        Ismingiz

                        <input
                          name="name"
                          value={form.name}
                          onChange={changeForm}
                          placeholder="Ismingiz"
                        />
                      </label>

                      <label>
                        Telefon raqamingiz

                        <input
                          name="phone"
                          value={form.phone}
                          onChange={changeForm}
                          placeholder="+998 90 000 00 00"
                        />
                      </label>

                      <div className="form-row">
                        <label>
                          Sana

                          <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={changeForm}
                          />
                        </label>

                        <label>
                          Vaqt

                          <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={changeForm}
                          />
                        </label>
                      </div>

                      <label>
                        Mehmonlar soni

                        <select
                          name="guests"
                          value={form.guests}
                          onChange={changeForm}
                        >
                          {Array.from(
                            { length: selectedTable.capacity },
                            (_, index) => index + 1
                          ).map((number) => (
                            <option key={number} value={number}>
                              {number} kishi
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Qo‘shimcha izoh

                        <textarea
                          name="comment"
                          value={form.comment}
                          onChange={changeForm}
                          placeholder="Masalan: deraza yonidagi joy kerak"
                        ></textarea>
                      </label>

                      <div className="actions">
                        <button
                          type="button"
                          className="back-button"
                          onClick={() => setStep(1)}
                        >
                          Orqaga
                        </button>

                        <button className="gold-button">
                          To‘lovga o‘tish
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2>Demo to‘lov</h2>

                    <p className="muted">
                      Hozircha haqiqiy pul yechilmaydi. Keyinchalik
                      Click yoki Payme ulanadi.
                    </p>

                    <div className="summary">
                      <p>
                        Stol: <b>{selectedTable.name}</b>
                      </p>

                      <p>
                        Turi: <b>{selectedTable.type}</b>
                      </p>

                      <p>
                        Sana: <b>{form.date}</b>
                      </p>

                      <p>
                        Vaqt: <b>{form.time}</b>
                      </p>

                      <p>
                        Mehmonlar: <b>{form.guests} kishi</b>
                      </p>

                      <p>
                        Jami:{" "}
                        <b>{formatPrice(selectedTable.price)}</b>
                      </p>
                    </div>

                    <input
                      className="demo-card-input"
                      placeholder="Karta raqami — demo"
                    />

                    <div className="actions">
                      <button
                        className="back-button"
                        onClick={() => setStep(2)}
                      >
                        Orqaga
                      </button>

                      <button
                        className="gold-button"
                        onClick={() => setSuccess(true)}
                      >
                        To‘lovni tasdiqlash
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;